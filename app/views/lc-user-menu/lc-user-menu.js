/**
 * Created by Yuan
 */
'use strict';

lc.controller('userCtrl', function($scope, $window,$cookieStore, $location) {
    $scope.searchtext='';

    $scope.search = function(kword){
        console.log(kword)

        $location.path('/results').search({keyword: $scope.searchtext});
    };

    $scope.user_logout = function(){
        //Session.destroy();
        $window.sessionStorage.removeItem("userInfo");
        $cookieStore.remove("lcuser");
        $location.path('/');
    };
})