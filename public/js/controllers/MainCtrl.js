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
            $scope[collection.name] = cards.sort(function(a, b) {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            });
            count++;
            if (count === collections.length) {
              $scope.ready = true;
            }
          })
        })(i);
      });
    });
  });
  
  $scope.selections = {};
  $scope.createWrap = function() {
    $scope.wrapCreated = false;
    var personalizationInfo = {
      draftWrap: draftWrapForPersonalization,
      selectedHomePage: $scope.selections.selectedHomePage,
      selectedCoversationPage: $scope.selections.selectedCoversationPage,
      selectedPhone: $scope.selections.selectedPhone,
      selectedPlan: $scope.selections.selectedPlan,
      selectedAccessory: $scope.selections.selectedAccessory,
      selectedContactPage: $scope.selections.selectedContactPage
    };

    Main.createWrap(personalizationInfo).then(function(wrap) {
      var numberToSendWrapTo = $scope.areaCode + $scope.prefix + $scope.lineNumber;
      $scope.newPersonalizedWrap = wrap.canonicalUrl;
      
      Main.shareWrap(wrap, numberToSendWrapTo).then(function(message) {
        $scope.wrapCreated = true;
        $scope.newWrapMessage = message;
      });
    });

  };

});