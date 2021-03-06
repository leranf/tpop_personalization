var rp = require('request-promise');
var API_KEY = require('../../config/config').API_KEY;

module.exports = {

  getDraftWraps: function(req, res) {
    var options = {
      uri: 'https://api.wrap.co/api/wraps',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json'
      },
      json: true
    };

    rp(options)
      .then(function(wraps) {
        res.json(wraps);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  createWrap: function(req, res) {
    var draftWrapId;
    var personalized_json = [];
    for (var key in req.body) {
      if (key === 'draftWrap') {
        draftWrapId = req.body[key].id;
      } else {
        var cardId = req.body[key].id;
        personalized_json.push({
          id: cardId,
          data: { d: 'd' } // these need to be filled out even if not important to data binding attributes
        });
      }
    }

    var createOptions = {
      method: 'POST',
      uri: 'https://api.wrap.co/api/wraps/' + draftWrapId + '/personalize/v2',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json'
      },
      body: {
        personalized_json: personalized_json
      },
      json: true
    };

    rp(createOptions)
      .then(function(wrap) {
        res.json(wrap);
      });  
  },

  shareWrap: function(req, res) {
    var shareOptions = {
      method: 'POST',
      url: 'https://api.wrap.co/api/wraps/' + req.body.wrap.id + '/share?type=sms&phone_number=' + req.body.phoneNumber,
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json'
      }
    }

    rp(shareOptions)
      .then(function() {
        res.send('shared'); 
      });
  }

}