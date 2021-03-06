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
.controller('mainCtrl', function($scope,$window,$http,$route, $mdDialog,$filter, Auth, User) {

        var currentuserid = Auth.getUser().lc_userid; //$window.sessionStorage["userID"];
        //TODO: var currentuserAvator = Auth.getUser().lc_userAvator;
/*        console.log ( 'start get feeds ', currentuserid);
        console.log (Auth.getUser());*/
        $scope.cuserid = currentuserid;

        $scope.initFirst=function(){
            User.getFeeds(currentuserid)
                .success(function (data, status, headers, config) {
                    $scope.feeds = data.feeds;
                    //console.log(feeds);
                    //$route.reload();
                })
                .error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                });
        };

        $scope.postcomment = function(keyevent,txt,feedid) {

            //$scope.feeds.comments.push(txt); txt !=''
            if(keyevent.which === 13 && txt.length > 0) {

                var comm = {
                    picid: feedid,
                    userid: currentuserid,
                    comment: txt
                };

                User.postComment(comm)
                .success(function (data, status, headers, config) {
                    console.log('post comments ' + txt + ', feedid: ' + feedid);
                    console.log(data);
                    $filter('filter')($scope.feeds, {picid: feedid}).comments.push(txt);
                    $('#cmmt-'+feedid).val('');
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                    //return data;
                });
            }
        };

        $scope.deletecomment = function(uid,cid,feedid) {

            var comm = {
                picid: feedid,
                userid: uid,
                commentid: cid
            };

            User.delComment(comm)
                .success(function (data, status, headers, config) {
                    console.log('post comments ' + txt + ', feedid: ' + feedid);
                    console.log(data);
                    $filter('filter')($scope.feeds, {picid: feedid}).comments.pop(cid);
                    $('#cmmt-'+feedid).val('');
                }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
                //return data;
            });
        };

        $scope.changeLikeStatus = function(feedid, likeStatus) {
            if (likeStatus == 1)
                $filter('filter')($scope.feeds, {picid: feedid})[0].liked = 0;//!likeStatus;
            else
                $filter('filter')($scope.feeds, {picid: feedid})[0].liked = 1;
            var likedata = {
                picid: feedid,
                userid: currentuserid
            };

            User.like(likedata)
                .success(function (data, status, headers, config) {
                    console.log(data.likeCount + ', feedid: ' + feedid);
                    $filter('filter')($scope.feeds, {picid: feedid})[0].likeCount = data.likeCount;
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                    //return data;
                });
            $scope.feeds.$apply();
        };

        $scope.toggle_visibility = function(id) {
            var e = document.getElementById(id);
            if(e.style.display == 'block')
                e.style.display = 'none';
            else
                e.style.display = 'block';
        };

});
/*
.controller('postCtrl', function ($scope, $timeout,$window,$http) {

});*/
