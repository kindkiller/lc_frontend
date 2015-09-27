/**
 * Created by Yuan
 */
'use strict';

angular.module('lookchic.editprofile', ['ngRoute'])
    .controller('editprofileCtrl', function($scope,$mdSidenav,Upload,User,Auth) {
        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };
        $scope.files={};
        var currentuserid = Auth.getUser().userid;

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

        $scope.initProfile=function(){
            User.getUserProfile(currentuserid)
                .success(function (data, status, headers, config) {
                    console.log ( 'get profile ' + ', Response: ' + JSON.stringify(data) );
                    console.log ( data.profile.userProfile);
                    $scope.userprofile = data.profile.userProfile;
                    //$route.reload();
                })
                .error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                });
        };
    });