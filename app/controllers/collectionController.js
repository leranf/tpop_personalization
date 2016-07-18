var rp = require('request-promise');
var API_KEY = '4b92e586d087ef6e23dac3d59c456f4c8b471df4fd34d37f2b5c57bc072b6c75';

module.exports = {

  getCollections: function(req, res) {
    var options = {
      uri: 'https://wrapi.qa.wrapdev.net/api/card_collections',
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