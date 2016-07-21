var CollectionController = require('./controllers/collectionController');
var CardController = require('./controllers/cardController');
var WrapController = require('./controllers/wrapController');

module.exports = function(app) {

  // get routes
  app.get('/api/collections', CollectionController.getCollections);
  app.get('/api/cards/collections/:id', CardController.getCardsInCollection);
  app.get('/api/wraps/drafts', WrapController.getDraftWraps);
  
  // post routes
  app.post('/api/wraps/personalize', WrapController.createWrap);
  app.post('/api/wraps/share', WrapController.shareWrap);
};
