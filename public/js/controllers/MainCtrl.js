angular.module('MainCtrl', []).controller('MainController', function($scope, Main) {

  // Main.getCollections().then(function(collections){
    
  //   var count = 0;
  //   collections.forEach(function(collection, i) {
  //     (function(i) {
  //       Main.getCardsInCollection(collection.id).then(function(cards) {
  //         $scope[collection.name] = cards;
  //         count++;
  //         if (count === collections.length) {
  //           $scope.ready = true;
  //         }
  //       })
  //     })(i);
  //   });

  // });

  $scope.plans = ['PREPAID', 'POST PAID'];
  $scope.details = ['2GB', '6GB', '10GB', 'UNLIMITED']
  $scope.phones = [
    'LG G5',
    'iPhone 5s',
    'LG G Stylo',
    'Samsung GALAXY Grand PRIME',
    'Samsung GALAXY Core PRIME',
    'Coolpad Rogue',
    'iPhone 6',
    'iPhone 6s',
  ];
  $scope.accessories = [
  'OtterBox Commuter Series',
  'Beats Solo 2 Headphones',
  'OtterBox Defender Series'
  ];

  $scope.createWrap = function() {

  };



});