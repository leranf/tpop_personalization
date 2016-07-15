angular.module('MainService', []).factory('Main', ['$http', function($http) {

  return {
    
    getCollections: function() {
      return $http.get('/api/collections').then(function(plans) {
        return plans.data;
      });
    },

    getCardsInCollection: function(id) {
      return $http.get('/api/cards/collections/' + id).then(function(cards) {
        return cards.data;
      });
    }

  }       

}]);