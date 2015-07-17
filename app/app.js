'use strict';

// Declare app level module which depends on views, and components
var lc = angular.module('lookchic', [
    'ngMaterial',
    'ngRoute',
    'ui.bootstrap',
    'ngFileUpload',
    'lookchic.main',
    'lookchic.results',
    'lookchic.version'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'views/home.html',
            //controller  : 'mainController'
        })

        // route for the main page
        .when('/main', {
            templateUrl : 'views/lc-main/lc-main.html',
            controller  : 'mainCtrl'
        })

        // route for results page
        .when('/results', {
            templateUrl : 'views/lc-search-results/lc-search-results.html',
            controller  : 'mainCtrl'
        })
        // route for the contact page
        /*.when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        })*/
        .otherwise({redirectTo: '/'});
}]).config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

lc.run(function ($rootScope, $location, $window,$http, Auth) {
   /* $rootScope.$on("$routeChangeSuccess", function(userInfo) {
        console.log(userInfo);
    });*/
    $rootScope.currentuser = $window.sessionStorage["userInfo"];
    if ($rootScope.currentuser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.currentuser.msg; // jshint ignore:line
        console.log('logined info: ', $rootScope.currentuser);
    }
    $rootScope.$on('$routeChangeStart', function(currRoute, prevRoute) {

            // if route requires auth and user is not logged in
            if (!$rootScope.currentuser) {
                // redirects to index
                $location.path('/');
            }

    });
});

angular.module('lookchic').controller('lcCtrl', function($scope) {
  // sample objects in the controller scope that gets passed to the directive
    console.log("Start Chic");
});