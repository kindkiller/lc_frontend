/**
 * Created by Yuan on 8/23/2015.
 */

'use strict';

lc.factory('User',function ($http, $q) {
    var userService = {};

    userService.searchitem = function searchitem(kword){
        $http({
            method: 'GET',
            url: 'http://localhost:6543/search',
            params: {
                keyword: kword
            }
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('search success: ', data);
            console.log('search success status: ', status);
            return data.results;
        })
        .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('search error: ', data);
            console.log('search error status: ', status);
            return data.results;
        });
    }

    return userService;
});