/**
 * Created by Yuan on 9/1/2015.
 */
'use strict';

angular.module('lookchic.userprofile', ['ngRoute'])

    .controller('userprofileCtrl', function($scope,$routeParams,$location,User,Auth) {
        $scope.layout = 'grid';

        var uid = $routeParams.keyword;
        console.log(uid);
        var currentuserid = Auth.getUser().lc_userid;

        $scope.images = [
            {'url': 'img/feed-01.jpg'},
            {'url': 'img/feed-02.jpg'},
            {'url': 'img/feed-03.jpg'},
            {'url': 'img/feed-04.jpg'},
            {'url': 'img/feed-05.jpg'},
            {'url': 'img/feed-06.jpg'},
            {'url': 'img/feed-07.jpg'},
            {'url': 'img/feed-08.jpg'},
            {'url': 'img/feed-09.jpg'}
        ];

        $scope.options = {
            visible: 3,
            startSlide: 0,
            border: 3,
            width: 300,
            height: 400,
            space: 300,
            perspective: 35
        };

        $scope.userp_initFirst=function(){
            User.getUserProfile(currentuserid)
            .success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available

                $scope.user = data.profile;
                $scope.posts = data.profile.favorites;
                console.log('user profile success: ', $scope.user);
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