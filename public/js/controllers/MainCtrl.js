angular.module('MainCtrl', []).controller('MainController', function($scope, Main) {

  var draftWrapForPersonalization;
  Main.getDraftWraps().then(function(drafWraps) {
    draftWrapForPersonalization = drafWraps.filter(function(wrap) {
      return wrap.id === 'e117e2f3-babe-48da-a071-c63cc6e80618';
    })[0];

    Main.getCollections().then(function(collections){
      var count = 0;
      collections.forEach(function(collection, i) {
        (function(i) {
          Main.getCardsInCollection(collection.id).then(function(cards) {
            $scope[collection.name] = cards;
            count++;
            if (count === collections.length) {
              $scope.ready = true;
            }
          })
        })(i);
      });
    });
  });

  $scope.createWrap = function() {
    $scope.wrapCreated = false;
    var personalizationInfo = {
      draftWrap: draftWrapForPersonalization,
      selectedHomePage: JSON.parse($scope.selectedHomePage),
      selectedCoversationPage: JSON.parse($scope.selectedCoversationPage),
      selectedPhone: JSON.parse($scope.selectedPhone),
      selectedPlan: JSON.parse($scope.selectedPlan),
      selectedAccessory: JSON.parse($scope.selectedAccessory),
      selectedContactPage: JSON.parse($scope.selectedContactPage)
    };

    Main.createWrap(personalizationInfo).then(function(wrap) {
      $scope.wrapCreated = true;
      $scope.newPersonalizedWrap = wrap.canonicalUrl;
    });
  };

});