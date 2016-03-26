/**
 * Created by Yuan on 8/23/2015.
 */

'use strict';

lc.factory('User',function ($http, $q) {
    var userService = {};
    var serviceURL = "http://localhost:6543";

    userService.postComment = function postComment(comment){
        return $http({
            method: 'POST',
            url: serviceURL + '/addcomment',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: comment
        })
    };

    userService.delComment = function delComment(comment){
        return $http({
            method: 'POST',
            url: serviceURL + '/delcomment',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: comment
        })
    };

    userService.getFeeds = function getFeeds(userid){
        return $http({
            method: 'POST',
            url: serviceURL + '/main',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                userid: userid
            }
        });
    };

    userService.editProfile = function editProfile(userid,data){
        return $http({
            method: 'POST',
            url: serviceURL + '/editprofile',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                userid: userid,
                userdata: data
            }
        });
    };

    userService.searchitem = function searchitem(kword){
        return $http({
            method: 'GET',
            url: serviceURL + '/search',
            params: {
                keyword: kword
            }
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };

    userService.like = function like(data){
        return $http({
            method: 'POST',
            url: serviceURL + '/addlike',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: data
        })
    };

    userService.addFavor = function addFavor(data){
        return $http({
            method: 'POST',
            url: serviceURL + '/addfavorite',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: data
        })
    };

    userService.delPost = function delPost(data){

    };

    userService.follow = function follow(uid,fuid){

    };

    userService.getUserProfile = function getUserProfile(uid){
        return $http({
            method: 'GET',
            url: serviceURL + '/userprofile',
            params: {
                userid: uid
            }
        });
    };

    userService.getUserPosts = function getUserPosts(uid){
        return $http({
            method: 'GET',
            url: serviceURL + '/userposts',
            params: {
                userid: uid
            }
        });
    };

    userService.getUserFav = function getUserFav(uid){
        return $http({
            method: 'GET',
            url: serviceURL + '/userfav',
            params: {
                userid: uid
            }
        });
    };

    return userService;
});