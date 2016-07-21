var rp = require('request-promise');
var API_KEY = require('../../config/config').API_KEY;

module.exports = {

  getCardsInCollection: function(req, res) {
    var options = {
      uri: 'https://api.wrap.co/api/cards/collections/search',
      qs: {
        'card_collection_ids': req.params.id
      },
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json'
      },
      json: true
    };

    rp(options).then(function(cards) {
      res.json(cards);
    });
  }

}