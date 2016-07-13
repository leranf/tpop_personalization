//constants
var wrapclient = new Wrap("e81c479a59c6fb872378335763acb0cb820d5497150a955d7d90fe0792502ea3", "https://wrapi.wrap.co/api");

var introCardID = "f1c99b38-bf26-4be1-8cf3-e631c1b017c7";
var templateCardID = "bc848e2f-915c-4748-b3a3-2842f19481fe";
var collectionID = "051b9bf1-af21-4b79-a916-612edf4cd4f1";
var defaultImagePath = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSeHsSVJDlFidnTTRx8iFgs-C0e9uVjggPmXv81QofCy3oMDlY8bAMjVDs"
var wrapName, postContent;
var linkObjectArray = [];
var createdWrap;

function getWrapSheetData() {
  linkObjectArray = [];
  $.getJSON("https://blog.wrap.co/wp-json/posts/" + $("#post_id").val(), function(data) {
    wrapName = data.title;
    postContent = data.content;
    parseContent(postContent)
  })
}

function parseContent(content) {
  $("#postholder").append(content)
  
  //turn the content into HTML and show it on screen
  var contentSection = $("#postholder");
  as = contentSection.find("a").each(function() {
    var linkObject = {}
    linkObject.href = this.href;
    linkObject.text = this.text;
    linkObject.image_path = defaultImagePath;
    linkObject.selector = this;
    
    try {
      //Get the description 
     linkObject.description = $(this.closest("p", $("#postholder"))).next().text()
     linkObject.descriptionSelector = $(this.closest("p", $("#postholder"))).next()
    }
    catch (e) {
       console.log(e);
    }
    linkObjectArray.push(linkObject)
  })
  getImagesFromURLLinks()
}

function getImagesFromURLLinks() {
  var contentSection = $("#postholder");
  var promiseArray = [];

  for (id in linkObjectArray) {
    (function(id) {
      d = linkObjectArray[id];
      promiseArray.push($.getJSON("https://widgets.wrap.co/imageFromURL?path=" + d.href, function(data, {id:d} ) {
        $("#status").text("Getting Image Links");
        // console.log("D: ", id);
        // console.log("data.path: ", data.path);
        linkObjectArray[id].image_path = data.path;
        //Add some visual updates to the content to show that cards are being created. 
        $(linkObjectArray[id].selector).css("color", "green");
        $(linkObjectArray[id].selector).css("font-size", "125%");
        $(linkObjectArray[id].descriptionSelector).css("color", "green");
    }))
    })(id);
  }
  Promise.all(promiseArray).then(function(values) {
    // console.log("Values ", values);
    buildCards()
  })

  //
}

function buildCards() {
  var promiseArray = []
  for (id in linkObjectArray) {
    $("#status").text("Building Cards");
    d = linkObjectArray[id];
    promiseArray.push(createCard(d.text, d.description, d.href, d.image_path));
  }
  makeWrap(promiseArray);
}

var tokenVal;
var retryNumber = 0;
var totalRetries = 200;

function checkToken(token=tokenVal) {
  $("#status").text("Publishing");
  console.log("token: ", token)
  console.log(createdWrap.canonicalUrl)
  wrapclient.jobs.status({"token":token.token})
    .then(function(result) {
      console.log(result);
      $("#status").text("");
      $(".loader").hide("fast");
      $("#postholder").hide().empty();
      $("#wrap_list").append("<li><a href='" + createdWrap.canonicalUrl + " ' target='_blank'>Wrap<a/></li>")
    })
    .catch(function(error){
      console.log(error);
      retryNumber++;
      console.log(retryNumber);
      var publishText = "Publish Check: " + retryNumber; 
      $("#status").text(publishText);
      if (retryNumber == totalRetries) {
        console.log("Publish checks have exceeded retry limit. ",totalRetries)
        return;
      } 
      // Doing this with a setTimeout to slow it down a bit 
      // and allow time for the status text to update. 
      setTimeout(checkToken, 250);
    })
}


function makeWrap(promiseArray) {
  //Cards are done building
  Promise.all(promiseArray).then(function(values) { 
    $("#status").text("Building Wrap");
    //Get Card IDs together in an array
    var cardArray = [introCardID]
    for (v in values) {
      cardArray.push(values[v].id)  
    }

    //Build Wrap
    wrapclient.wraps.createWrapFromCards({"card_ids":cardArray.toString()})
    .then(function(wrap) {
      //Publish Wrap
      createdWrap = wrap;
      wrapclient.wraps.publish(wrap.id)
      .then(function(token) {
        tokenVal = token;
        retryNumber = 0;
        checkToken(token);
      })
    })
  });
}



function createCard(title, description, link, image_path) {
  var data = {
    "collection_id": collectionID,
    "data": {
      "card_name":"Wrap Sheet" + moment().format(),
      "title": title,
      "description": description,
      "link": link,
      "image_path": image_path
    },
    "mapping": {
      "card_name":"card_name",
      "Header": "title",
      "Description": "description",
      "Article Link": "link",
      "Story Image": "image_path"
    },
    "tags": (moment().format("MMDDYY"), "AA")
  };

  return wrapclient.cards.clone(templateCardID, data)
}

$(function() {
    $(".loader").hide();
    // jQuery .ready() function
    $("#makewrap_btn").on("click", function() {
        $(".loader").show();
        getWrapSheetData()
        return false;
    })
});
