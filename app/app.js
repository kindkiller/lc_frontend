'use strict';

// Declare app level module which depends on views, and components
var lc = angular.module('lookchic', [
    'ngMaterial',
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'angular-carousel-3d',
    'ngCropper',
    'ngFileUpload',
    'lookchic.home',
    'lookchic.main',
    'lookchic.results',
    'lookchic.userprofile',
    'lookchic.editprofile',
    'lookchic.version'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
    // route for the home page
       /* .when('/', {
            templateUrl : 'views/lc-home/lc-home.html',
            controller  : 'authCtrl'
        })*/
        // route for the home page
        .when('/home', {
            templateUrl : 'views/lc-home/lc-home.html',
            controller  : 'authCtrl'
        })
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
        // route for user profile edit page
        .when('/editprofile', {
            templateUrl : 'views/lc-user-profile-edit/lc-user-profile-edit.html',
            controller  : 'editprofileCtrl'
        })
        // route for the contact page
        /*.when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        })*/
        .otherwise({redirectTo: '/home'});
}]);

lc.run(function ($rootScope, $location, $window,$http,$cookieStore,$injector, $route) {
   /* $rootScope.$on("$routeChangeSuccess", function(userInfo) {
        console.log(userInfo);
    });*/
    $rootScope.lcUser = $cookieStore.get('lc_user') || {};
    if ($rootScope.lcUser.lc_userid) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.lcUser.lc_token;
    } //$window.sessionStorage["userInfo"];

    //$injector.get("$http").defaults.transformRequest = function(data, headersGetter) {

    if ($rootScope.lcUser.lc_userid) {
        if ($location.path() == ""){
            $location.path('/main');
            //if (!$rootScope.$$phase) $rootScope.$apply();
        }
        else{
            if ($location.path() != "/editprofile")
            {
                $route.reload();
            }
        }

    }
    $rootScope.$on('$routeChangeStart', function(currRoute, prevRoute) {
        // if route requires auth and user is not logged in
        if (!$rootScope.lcUser) {
            // redirects to index
            if ($location.path() != "/editprofile")
            {
                $location.path('/home');
                //if (!$rootScope.$$phase) $rootScope.$apply();
            }
        }
    });
   // };
});

angular.module('lookchic').controller('lcCtrl', function($scope) {
  // sample objects in the controller scope that gets passed to the directive
    console.log("Start Chic");
});