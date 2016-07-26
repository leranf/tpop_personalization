angular.module('MainCtrl', []).controller('MainController', function($scope, Main) {

  var draftWrapForPersonalization;
  Main.getDraftWraps().then(function(drafWraps) {
    draftWrapForPersonalization = drafWraps.filter(function(wrap) {
      return wrap.id === 'ec034e8d-1bc8-47c4-a185-61ad9c8fc0cf';
    })[0];

    Main.getCollections().then(function(collections){
      var count = 0;
      collections.forEach(function(collection, i) {
        (function(i) {
          Main.getCardsInCollection(collection.id).then(function(cards) {
            $scope[collection.name] = cards;
            if (collection.name === 'tmoDevices' || collection.name === 'tmoAccessories') {
              $scope[collection.name].sort(function(a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              });
            } else if (collection.name === 'tmoPlans') {
              $scope[collection.name].sort(function(a, b) {
                return Math.abs(Number(a.name.slice(0, -2))) > Math.abs(Number(b.name.slice(0, -2)));
              });
            }
            if (++count === collections.length) {
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
      selectedDevice: $scope.selections.selectedDevice,
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