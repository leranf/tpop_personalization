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
    },

    getDraftWraps: function() {
      return $http.get('/api/wraps/drafts/').then(function(wraps) {
        return wraps.data;
      });
    },

    createWrap: function(personalizationInfo) {
      return $http({
        method: 'POST',
        url: '/api/wraps/personalize',
        data: personalizationInfo
      }).then(function(wrap) {
        return wrap.data[0];
      });
    }

  }       

}]);