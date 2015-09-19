/**
 * Created by Yuan
 */
'use strict';

lc.controller('userCtrl', function($scope,$location,Auth, User) {
    $scope.searchtext='';

    $scope.search = function(kword){
        console.log(kword)

        User.searchitem(kword)
            .success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('search success: ', data);
            console.log('search success status: ', status);
            $scope.results = data.results;
        })
        .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('search error: ', data);
            console.log('search error status: ', status);
            $scope.results = data.results;
        });

        $location.path('/results').search({keyword: $scope.searchtext});
    };

    $scope.user_logout = function(){
        //Session.destroy();
        Auth.user_logout();
    };
})