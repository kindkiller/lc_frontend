/**
 * Created by Yuan
 */
'use strict';

angular.module('lookchic.editprofile', ['ngRoute'])
    .controller('editprofileCtrl', function($scope,$mdSidenav,User,Auth) {
        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };

        $scope.menu = [
            {
                link : '#/editprofile',
                title: 'Edit Profile',
                icon: 'dashboard'
            },
            {
                link : '',
                title: 'Safty',
                icon: 'group'
            }
        ];
    });