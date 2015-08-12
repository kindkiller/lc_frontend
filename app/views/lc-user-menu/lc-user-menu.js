/**
 * Created by Yuan
 */
'use strict';

lc.controller('userCtrl', function($scope, $window, $location) {
    $scope.searchtext='';

    $scope.search = function(kword){

        $location.path('/results');
    };

    $scope.user_logout = function(){
        //Session.destroy();
        $window.sessionStorage.removeItem("userInfo");
        $location.path('/');
    };
})