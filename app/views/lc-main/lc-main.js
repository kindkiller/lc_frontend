/**
 * Created by yaoyuan on 7/2/2015.
 */
'use strict';

angular.module('lookchic.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/main', {
        templateUrl: 'views/lc-main/lc-main.html',
        controller: 'mainCtrl'
    });
}])
.controller('mainCtrl', function($scope, $mdDialog) {
    $scope.feeds = [
        {
            postername: 'Yuan',
            avatorurl: '',
            postdate: 'June 18 2015',
            imgurl: 'images/test_img/sample4.jpg',
            desc: 'Fantastic'
        },
        {
            postername: 'Yao',
            avatorurl: '',
            postdate: 'July 2 2015',
            imgurl: 'images/test_img/sample1.jpg',
            desc: 'New Day'
        }
    ];

        $scope.showPost = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/lc-main/dg_post.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                hasBackdrop: true
            })
        };
        function DialogController($scope,Upload, $mdDialog, $http,$timeout, $location, $q, $window, Auth) {
            $scope.post={};
            $scope.files={};
            $scope.$watch('files', function () {
                //$scope.upload($scope.files);
            });

            $scope.isEmpty = function (obj) {
                for (var i in obj) if (obj.hasOwnProperty(i)) return false;
                return true;
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.upload = function (files) {
                console.log('upload image');
                //var file = files[0];
                console.log(file);
                //console.log($scope.files);

               /* var fdata = new FormData;
                fdata.append('file', file);
                fdata.append('username', $window.sessionStorage["userInfo"]);
                fdata.append('desc', $scope.post.desc);

                var pobj = new Object();
                pobj.file = file;
                pobj.username = $window.sessionStorage["userInfo"];
                pobj.desc = $scope.post.desc;*/

                /*$http.post('http://localhost:6543/post', fdata, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': 'multipart/form-data'},
                    dataType: 'json'
                });*/
                /*$http({
                 method: 'POST',
                 url: 'http://localhost:6543/post',
                 /!*headers : {
                 'Content-Type': file.type
                 },*!/


                 headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                 data: fdata
                 }).success(function (data, status, headers, config) {
                 $timeout(function() {
                 console.log ( 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) )
                 });
                 }).error(function (data, status, headers, config) {
                 console.log('error status: ' + status);
                 });
*/

                if (files && files.length) {
                 for (var i = 0; i < files.length; i++) {
                    var file = files[i];

                    Upload.upload({
                         method: 'POST',
                         url: 'http://localhost:6543/post',
                         fields: {
                         'username': $window.sessionStorage["userInfo"],
                         'desc': $scope.post.desc
                        },
                        file: file,
                        headers: {'Content-Type': 'application/json; charset=UTF-8'}

                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' +
                        evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        $timeout(function() {
                            console.log('file: ' + config.file.name + ', Response: ' + JSON.stringify(data));
                        });
                    }).error(function (data, status, headers, config) {
                        console.log('error status: ' + status);
                    });
                 }
                }
            };
            $scope.lc_post = function (files){
                console.log('post img');
                console.log(files);
                console.log(files[0]);
                $scope.upload(files);
                $mdDialog.hide();
            };
        }
});
/*
.controller('postCtrl', function ($scope, $timeout,$window,$http) {

});*/
