var CollectionController = require('./controllers/collectionController');
var CardController = require('./controllers/cardController');

module.exports = function(app) {

  // server routes
  app.get('/api/collections', CollectionController.getCollections);
  app.get('/api/cards/collections/:id', CardController.getCardsInCollection);

};
