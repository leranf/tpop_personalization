angular.module('MainCtrl', []).controller('MainController', function($scope, Main) {

  var draftWrapForPersonalization;
  Main.getDraftWraps().then(function(drafWraps) {
    draftWrapForPersonalization = drafWraps.filter(function(wrap) {
      // return wrap.name === 'tpop';
      return wrap.id === '01c87a37-6bec-46dd-b56c-c26525156e84';
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


  // $scope.plans = ['PREPAID', 'POST PAID'];
  // $scope.details = ['2GB', '6GB', '10GB', 'UNLIMITED']
  // $scope.phones = [
  //   'LG G5',
  //   'iPhone 5s',
  //   'LG G Stylo',
  //   'Samsung GALAXY Grand PRIME',
  //   'Samsung GALAXY Core PRIME',
  //   'Coolpad Rogue',
  //   'iPhone 6',
  //   'iPhone 6s',
  // ];
  // $scope.accessories = [
  //   'OtterBox Commuter Series',
  //   'Beats Solo 2 Headphones',
  //   'OtterBox Defender Series'
  // ];

 

  $scope.createWrap = function() {
    var personalizationInfo = {
      draftWrap: draftWrapForPersonalization,
      selectedPlan: JSON.parse($scope.selectedPlan),
      selectedPlanDetails: JSON.parse($scope.selectedPlanDetails),
      selectedPhone: JSON.parse($scope.selectedPhone),
      firstSelectedAccessory: JSON.parse($scope.firstSelectedAccessory),
      secondSelectedAccessory: JSON.parse($scope.secondSelectedAccessory),
      thirdSelectedAccessory: JSON.parse($scope.thirdSelectedAccessory)
    };
    Main.createWrap(personalizationInfo).then(function(wrap) {
      console.log(wrap.canonicalUrl);
    });
  };

});