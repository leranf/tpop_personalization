var rp = require('request-promise');
var API_KEY = 'df57e9a5e9388115806ba189c50b6eab5eb984a1f6176254fe2ae73588ab965a';

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