/**
 * Created by yaoyuan on 7/2/2015.
 */
'use strict';

angular.module('lookchic.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/main', {
        templateUrl: 'views/lc-main/lc-main.html',
        controller: 'mainCtrl'
    });
}])
.controller('mainCtrl', function($scope,$window,$http,$route, $mdDialog, Auth, User) {

        var currentuserid = Auth.getUser().lc_userid; //$window.sessionStorage["userID"];
/*        console.log ( 'start get feeds ', currentuserid);
        console.log (Auth.getUser());*/

        $scope.initFirst=function(){
            User.getFeeds(currentuserid)
                .success(function (data, status, headers, config) {
                    $scope.feeds = data.feeds;
                    //$route.reload();
                })
                .error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                });
        };

        $scope.postcomment = function(txt,feedid) {
            //$scope.feeds.comments.push(txt);
            if(txt !='') {

                var comm = {
                    picid: feedid,
                    userid: currentuserid,
                    comment: txt
                };

                User.postComment(comm)
                .success(function (data, status, headers, config) {
                    console.log('post comments ' + txt + ', feedid: ' + feedid);
                    console.log(data);
                    //$route.reload();
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                    //return data;
                });
            }
        };

        $scope.likephoto = function(txt,feedid) {

            var likedata = {
                picid: feedid,
                userid: currentuserid
            };

            User.like(likedata)
                .success(function (data, status, headers, config) {
                    console.log('post comments ' + txt + ', feedid: ' + feedid);
                    console.log(data);
                    //$route.reload();
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                    //return data;
                });
        };

});
/*
.controller('postCtrl', function ($scope, $timeout,$window,$http) {

});*/
