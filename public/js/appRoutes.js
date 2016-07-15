angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainController'
        });

        // .when('/phones', {
        //     templateUrl: 'views/phone.html',
        //     controller: 'PhoneController'
        // })

        // .when('/plans', {
        //     templateUrl: 'views/plan.html',
        //     controller: 'PlanController'
        // })

        // .when('/accessories', {
        //     templateUrl: 'views/accessory.html',
        //     controller: 'AccessoriesController'
        // })

        // .when('/overview', {
        //     templateUrl: 'views/overview.html',
        //     controller: 'OverviewController'
        // });

    $locationProvider.html5Mode(true);

}]);