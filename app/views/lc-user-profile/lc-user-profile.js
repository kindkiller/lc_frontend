/**
 * Created by Yuan on 9/1/2015.
 */
'use strict';

angular.module('lookchic.userprofile', ['ngRoute'])

    .controller('userprofileCtrl', function($scope,$routeParams,$location,User,Auth) {
        $scope.layout = 'grid';

        var uid = $routeParams.keyword;
        console.log(uid);
        var currentuserid = Auth.getUser().userid;

        $scope.userp_initFirst=function(){
            User.getUserProfile(currentuserid)
            .success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('user profile success: ', data);
                $scope.user = data.profile;
                $scope.posts = data.profile.favorites;
            })
            .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('user profile error: ', data);
                console.log('user profile status: ', status);
                $scope.err = data.msg;
            });

            /*User.getFeeds(currentuserid)
            .success(function (data, status, headers, config) {
                $scope.posts = data.feeds;
                //$route.reload();
            })
            .error(function (data, status, headers, config) {
                console.log('error status: ' + status);
            });*/
        };

        $scope.user_follow = function(fuid){

            User.follow(currentuserid, fuid)
                .success(function (data, status, headers, config) {
                    $scope.posts = data.feeds;
                    //$route.reload();
                })
                .error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                });
        };
        $scope.user_edit = function(fuid){

            $location.path('editprofile');
        };
    });