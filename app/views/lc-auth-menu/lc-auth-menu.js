/**
 * Created by yaoyuan
 */
'use strict';

lc.controller('AuthCtrl',authController);

function authController($scope, $mdDialog, $rootScope) {
    $scope.user = {};

    $scope.auth_signup = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/lc-auth-menu/signup_tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            hasBackdrop: true,
        })
    };
    $scope.auth_login = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/lc-auth-menu/login_tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            hasBackdrop: true,
        })
    };

    function DialogController($scope,$rootScope, $mdDialog, $http, $location, $q, $window, Auth) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.user_login = function(user){
            //var userInfo;
             //var deferred = $q.defer();
             $http({
                 method: 'POST',
                 url: 'http://localhost:6543/login',
                 data: {
                     email: user.email,
                     password: user.password
                 },
                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             })
                .success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                     console.log('login success: ', data);
                     console.log('login success status: ', status);

                     $rootScope.currentuser = data;
                     $window.sessionStorage["userInfo"] = JSON.stringify(data);
                     Auth.setUser(data);
                     $location.path("/main");
                     $mdDialog.hide();
                })
                 .error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                     console.log('login error: ', data);
                     console.log('login error status: ', status);
                });


                 /*.then(function(result) {
             userInfo = {
             accessToken: result.data.access_token,
             userName: result.data.userName
             };
             $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
             deferred.resolve(userInfo);
             }, function(error) {
             deferred.reject(error);
             });

             return deferred.promise;*/
        };
        $scope.user_signup = function(user){
            //var userInfo;
            //var deferred = $q.defer();
            if(user.password1 == user.password2){
            $http({
                method: 'POST',
                url: 'http://localhost:6543/signup',
                data: {
                    email: user.email,
                    password: user.password1
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log('signup success: ', data);
                    console.log('signup success status: ', status);

                    Auth.setUser(data);
                    $location.path("/main");
                    $mdDialog.hide();
                })
                .error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('login error: ', data);
                    console.log('login error status: ', status);
                });
            }
            else
            {$scope.err = 'Password not match'}
        };
    };


}