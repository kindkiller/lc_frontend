/**
 * Created by yaoyuan
 */
'use strict';

lc.controller('AuthCtrl',authController);

function authController($scope,$mdDialog,$location,$anchorScroll,Auth,$rootScope,$cookieStore) {
    $scope.user = {};

    $scope.auth_signup = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/lc-auth-menu/signup_tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            hasBackdrop: true
        })
    };
    $scope.auth_login = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/lc-auth-menu/login_tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            hasBackdrop: true
        })
    };

    $scope.goto = function(){
        $location.hash('login');
        $anchorScroll();
    };

    $scope.user_login = function(user){

        Auth.login(user)
            .success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('login success: ', data);

                $rootScope.currentuser = data;
                //$window.sessionStorage["userInfo"] = JSON.stringify(data);
                $cookieStore.put('lcuser', $rootScope.currentuser);
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

    function DialogController($scope,$rootScope, $mdDialog, $http, $location,$cookieStore, $q, $window, Auth) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.user_login = function(user){

            Auth.login(user)
                .success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                     console.log('login success: ', data);

                     $rootScope.currentuser = data;
                     $window.sessionStorage["userInfo"] = JSON.stringify(data);
                     $cookieStore.put('lcuser', $rootScope.currentuser);
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
                Auth.signup(user)
                .success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log('signup success: ', data);
                    Auth.setUser(data);
                    $mdDialog.hide();
                    $location.path("/main");
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