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
      return $http.get('/api/wraps/drafts').then(function(wraps) {
        return wraps.data;
      });
    },

    createWrap: function(personalizationInfo) {
      return $http.post('/api/wraps/personalize', personalizationInfo).then(function(wrap) {
        return wrap.data;
      });
    },

    shareWrap: function(wrap, phoneNumber) {
      var data = {
        wrap: wrap,
        phoneNumber: phoneNumber
      };
      return $http.post('/api/wraps/share', data).then(function() {
        var numbers = phoneNumber.split('');
        var areaCode = numbers.slice(0,3).join('');
        var prefix = numbers.slice(3,6).join('');
        var lineNumber = numbers.slice(-4).join('');
        var formattedNumber = '(' + areaCode + ') ' + prefix + '-' + lineNumber;
        return 'Wrap sent to ' + formattedNumber + '. Check it out';
      });
    }

  }       

}]);