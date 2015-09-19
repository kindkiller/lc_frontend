'use strict';

// Declare app level module which depends on views, and components
var lc = angular.module('lookchic', [
    'ngMaterial',
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'flow',
    'ngFileUpload',
    'lookchic.main',
    'lookchic.results',
    'lookchic.userprofile',
    'lookchic.version'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
        // route for the home page
        /*.when('/', {
            templateUrl : 'views/home.html'
            //controller  : 'mainController'
        })*/

        // route for the main page
        .when('/main', {
            templateUrl : 'views/lc-main/lc-main.html',
            controller  : 'mainCtrl'
        })

        // route for results page
        .when('/results', {
            templateUrl : 'views/lc-search-results/lc-search-results.html',
            controller  : 'resultsCtrl'
        })

        // route for user profile page
        .when('/userprofile', {
            templateUrl : 'views/lc-user-profile/lc-user-profile.html',
            controller  : 'userprofileCtrl'
        })
        // route for the contact page
        /*.when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        })*/
        .otherwise({redirectTo: '/'});
}]);

lc.run(function ($rootScope, $location, $window,$http,$cookieStore,$injector, $route) {
   /* $rootScope.$on("$routeChangeSuccess", function(userInfo) {
        console.log(userInfo);
    });*/
    $injector.get("$http").defaults.transformRequest = function(data, headersGetter)
    { if ($rootScope.oauth) headersGetter()['Authorization'] = "Bearer "+$rootScope.oauth.access_token; if (data) { return angular.toJson(data); } };
    $rootScope.currentuser = $cookieStore.get('lcuser'); //$window.sessionStorage["userInfo"];
    if ($rootScope.currentuser) {
        $location.path('/main');
        //$route.reload();
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