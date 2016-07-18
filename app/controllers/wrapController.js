var rp = require('request-promise');
var API_KEY = '4b92e586d087ef6e23dac3d59c456f4c8b471df4fd34d37f2b5c57bc072b6c75';

module.exports = {

  getDraftWraps: function(req, res) {
    var options = {
      uri: 'https://wrapi.qa.wrapdev.net/api/wraps',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json'
      },
      json: true
    };

    rp(options).then(function(wraps) {
      res.json(wraps);
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
          data: { d: 'd' }
        });
      }
    }

    var createWrapOptions = {
      method: 'POST',
      uri: 'https://wrapi.qa.wrapdev.net/api/wraps/' + draftWrapId + '/personalize/v2',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json'
      },
      form: {
        'personalized_json': personalized_json
      }
      // json: true
    };

    rp(createWrapOptions).then(function(wrap) {
      // var shareWrapOptions = {
      //   uri: 'https://api.wrap.co/api/wraps/' + wrap[0].id + '/share',
      //   headers: {
      //     'Authorization': 'Bearer ' + API_KEY,
      //     'Content-Type': 'application/json'
      //   },
      //   qs: {
      //     type: 'sms',
      //     phone_number: '4155890053'
      //   }
      // };

      // rp(shareWrapOptions).then(function() {
      //   res.json(wrap);
      // });
      console.log(wrap[0]);
      res.json(wrap[0]);
    });
  }

}