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
      // return $http({
      //   method: 'POST',
      //   url: '/api/wraps/personalize',
      //   data: personalizationInfo
      // }).then(function(wrap) {
      //   return wrap.data;
      // });  
      var API_KEY = '4b92e586d087ef6e23dac3d59c456f4c8b471df4fd34d37f2b5c57bc072b6c75';
      var draftWrapId;
      var personalized_json = [];
      for (var key in personalizationInfo) {
        if (key === 'draftWrap') {
          draftWrapId = personalizationInfo[key].id;
        } else {
          var cardId = personalizationInfo[key].id;
          personalized_json.push({
            id: cardId,
            data: { d: 'd' }
          });
        }
      }

      return $http({
        method: 'POST',
        url: 'https://wrapi.qa.wrapdev.net/api/wraps/' + draftWrapId + '/personalize/v2',
        headers: {
          'Authorization': 'Bearer ' + API_KEY,
          'Content-Type': 'application/json'
        },
        data: {
          'personalized_json': personalized_json
        }
      }).then(function(wrap) {
        return wrap.data;
      });  
    }

  }       

}]);