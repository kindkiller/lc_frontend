/**
 * Created by Yuan
 */
'use strict';

lc.controller('userCtrl', function($scope, $window) {
    $scope.searchtext='';

    $scope.user_logout = function(){
        //Session.destroy();
        $window.sessionStorage.removeItem("userInfo");
    };
})