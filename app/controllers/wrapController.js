var rp = require('request-promise');
var API_KEY = 'df57e9a5e9388115806ba189c50b6eab5eb984a1f6176254fe2ae73588ab965a';

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

    rp(options).then(function(wraps) {
      res.json(wraps);
    });
  },

  createWrap: function(req, res) {
    var draftWrapId;
    var personalized_json = {};
    for (var key in req.body) {
      if (key === 'draftWrap') {
        draftWrapId = req.body[key].id;
      } else {
        var cardId = req.body[key].id;
        personalized_json[cardId] = {};
      }
    }

    var createWrapOptions = {
      uri: 'https://api.wrap.co/api/wraps/' + draftWrapId + '/personalize',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json'
      },
      body: {
        'personalized_json': personalized_json
      },
      json: true
    };

    rp(createWrapOptions).then(function(wrap) {
      var shareWrapOptions = {
        uri: 'https://api.wrap.co/api/wraps/' + wrap[0].id + '/share',
        headers: {
          'Authorization': 'Bearer ' + API_KEY,
          'Content-Type': 'application/json'
        },
        qs: {
          type: 'sms',
          phone_number: '4155890053'
        },
        body: {
          'personalized_json': personalized_json
        },
        json: true
      };

      rp(shareWrapOptions).then(function() {
        res.json(wrap);
      });
    });
  }

}