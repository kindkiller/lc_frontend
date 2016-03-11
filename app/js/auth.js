/**
 * Created by Yuan
 */
'use strict';

lc.factory('Auth',function ($http, $rootScope, $window,$location, $cookieStore) {
    var user;
    var authService = {};
    var serviceURL = "http://localhost:6543";

    //check if the user is authenticated
    authService.isAuthenticated = function() {
        return !!$window.sessionStorage["userInfo"]
    };

    //check if the user is logged in
    authService.isLoggedIn = function(){
        //return($window.sessionStorage["userInfo"])? true : false;
        return($cookieStore.get('lc_user'))? true : false;
    };

    //new user signup request
    authService.signup = function (user) {
        return $http({
            method: 'POST',
            url: serviceURL + '/signup',
            data: {
                email: user.email,
                username: user.username,
                password: user.password1
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };

    //user login request
    authService.login = function(user) {
        //var userInfo;
        //var deferred = $q.defer();
        return $http({
            method: 'POST',
            url: serviceURL + '/login',
            data: {
                email: user.email,
                password: user.password
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

    };

    //log out the user and broadcast the logoutSuccess event
    authService.user_logout = function(){
        //Session.destroy();
        $location.path('/home');
        $window.sessionStorage.removeItem("userInfo");
        $cookieStore.remove("lc_user");
        $cookieStore.remove("lcuser");
        $cookieStore.remove("lc_token");

       /* $location.path('/').replace();
        $rootScope.$apply();*/
    };

    authService.setUser = function(aUser){
        user = aUser;

        $rootScope.lcUser = {
            lc_userid: user.userid,
            lc_token: user.accessToken
        };
        //$window.sessionStorage["userID"] = aUser.userid;
        $cookieStore.put('lc_user',  $rootScope.lcUser);
    };
    authService.getUser = function(){
        return($rootScope.lcUser.lc_userid)? $rootScope.lcUser : $cookieStore.get('lc_user');
    };

    authService.getAccessToken=function(){
        return ("123456789");
            //$cookieStore.get('accessToken'));
    };

    return authService;
});

/*[ '$http', '$rootScope', '$window'
    function($http, $rootScope, $window) {
        var authService = {};

        //the login function
        authService.login = function(user, success, error) {
            //$http.post('users.json').success(function(data) {
            $http({
                method: 'POST',
                url: serviceURL + '/login',
                data: {
                    email: user.email,
                    password: user.password
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function(data, status) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log('login success: ', data);
                    console.log('login success status: ', status);
                    $scope.swLogin();
                    $location.path("/main");
                    $mdDialog.hide();
                }).
                error(function(data, status) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('login error: ', data);
                    console.log('login error status: ', status);
                });

            /!*var data = usersJson;
            //this is my dummy technique, normally here the
            //user is returned with his data from the db
            var users = data.users;
            if(users[user.username]){
                var loginData = users[user.username];
                //insert your custom login function here
                if(user.username == loginData.username && user.password == loginData.username){
                    //set the browser session, to avoid relogin on refresh
                    $window.sessionStorage["userInfo"] = JSON.stringify(loginData);

                    //delete password not to be seen clientside
                    delete loginData.password;

                    //update current user into the Session service or $rootScope.currentUser
                    //whatever you prefer
                    Session.create(loginData);
                    //or
                    $rootScope.currentUser = loginData;

                    //fire event of successful login
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    //run success function
                    success(loginData);
                } else{
                    //OR ELSE
                    //unsuccessful login, fire login failed event for
                    //the according functions to run
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    error();
                }
            }*!/

        };

        //check if the user is authenticated
        authService.isAuthenticated = function() {
            return !!Session.user;
        };

        //check if the user is authorized to access the next route
        //this function can be also used on element level
        //e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
        authService.isAuthorized = function(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
            authorizedRoles.indexOf(Session.userRole) !== -1);
        };

        //log out the user and broadcast the logoutSuccess event
        authService.logout = function(){
            Session.destroy();
            $window.sessionStorage.removeItem("userInfo");
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        }

        return authService;
    }
]);

 lc.factory('Auth',function () {
 var user;
 var authService = {};

 return{
 setUser : function(aUser){
 user = aUser;

 },
 isLoggedIn : function(){
 return(user)? user : false;
 }
 }
 });*/