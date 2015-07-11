/**
 * Created by Yuan on 6/28/2015.
 */
'use strict';

lc.controller('headerCtrl', function($scope, Auth){
    $scope.loggedin = function() {
        return Auth.isLoggedIn();
    };
})