/**
 * Created by Yuan on 8/23/2015.
 */

'use strict';

lc.factory('User',function ($http, $q) {
    var userService = {};

    userService.postComment = function postComment(comment){
        return $http({
            method: 'POST',
            url: 'http://localhost:6543/addcomment',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: comment
        })
    }

    userService.getFeeds = function getFeeds(userid){
        return $http({
            method: 'POST',
            url: 'http://localhost:6543/main',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                userid: userid
            }
        });
    }

    userService.searchitem = function searchitem(kword){
        return $http({
            method: 'GET',
            url: 'http://localhost:6543/search',
            params: {
                keyword: kword
            }
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };

    userService.like = function like(data){
        return $http({
            method: 'POST',
            url: 'http://localhost:6543/addlike',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: data
        })
    };

    userService.addFavor = function addFavor(data){

    };

    userService.delPost = function delPost(data){

    };

    return userService;
});