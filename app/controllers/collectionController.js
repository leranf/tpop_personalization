var rp = require('request-promise');
var API_KEY = require('../../config/config').API_KEY;

module.exports = {

  getCollections: function(req, res) {
    var options = {
      uri: 'https://api.wrap.co/api/card_collections',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json'
      },
      json: true
    };

    rp(options).then(function(collections) {
      res.json(collections);
    });
  }

}