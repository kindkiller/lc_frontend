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
.controller('mainCtrl', function($scope,$window,$http,$route, $mdDialog, Auth, User) {

        var currentuserid = Auth.getUser().userid; //$window.sessionStorage["userID"];
        console.log ( 'start get feeds ', currentuserid);
        console.log (Auth.getUser());

        $scope.initFirst=function(){
            User.getFeeds(currentuserid)
                .success(function (data, status, headers, config) {
                    console.log ( 'get feeds ' + ', Response: ' + JSON.stringify(data) );
                    console.log ( data.feeds);
                    $scope.feeds = data.feeds;
                    //$route.reload();
                })
                .error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                });
        };
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

        $scope.postcomment = function(txt,feedid) {
            //$scope.feeds.comments.push(txt);
            if(txt !='') {

                var comm = {
                    picid: feedid,
                    userid: currentuserid,
                    comment: txt
                };

                User.postComment(comm)
                .success(function (data, status, headers, config) {
                    console.log('post comments ' + txt + ', feedid: ' + feedid);
                    console.log(data);
                    //$route.reload();
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                    //return data;
                });
            }
        };

        $scope.likephoto = function(txt,feedid) {

            var likedata = {
                picid: feedid,
                userid: currentuserid
            };

            User.like(likedata)
                .success(function (data, status, headers, config) {
                    console.log('post comments ' + txt + ', feedid: ' + feedid);
                    console.log(data);
                    //$route.reload();
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                    //return data;
                });
        };

        function DialogController($scope,Upload, $mdDialog,$timeout,$compile,Auth) {
            $scope.post={};
            $scope.files={};
            $scope.tags=[];
            $scope.isAddTag=false;
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
            //Upload photo to server
            $scope.lc_post = function (files){
                /*console.log('post img');
                console.log(files);
                console.log(files[0]);*/
                $scope.upload(files);
                $mdDialog.hide();
                $scope.initFirst();
            };

            $scope.st_addTag = function (event){
                $scope.isAddTag=!$scope.isAddTag;
                //alert(event.offsetX/document.getElementById('lc-photo').offsetWidth+', '+event.offsetY/document.getElementById('lc-photo').offsetHeight);
            };

            $scope.addTag = function (event){
                //alert(event.offsetX/$(event.target).width()+', '+event.offsetY/$(event.target).height());
                $scope.mouseX=(event.offsetX/$(event.target).width())*100;
                $scope.mouseY=(event.offsetY/$(event.target).height())*100;
                //alert(mouseX+","+ mouseY);
                $('#tagit').remove( ); // remove any tagit div first
                //insert an input box with save and cancel operations.
                $('#imgtag').append( $compile('<div id="tagit"><div class="box"></div><div class="name"><div class="text">Type tag</div><input type="text" ng-model="tagtxt" name="txtname" id="tagname" /><input type="button" name="btnsave" ng-click="save_tag(tagtxt,mouseY,mouseX)" value="Save" id="btnsave" /><input type="button" name="btncancel" value="Cancel" ng-click="cancel_tag()" id="btncancel" /></div></div>')($scope) );

                $('#tagit').css({ top:$scope.mouseY+"%", left:$scope.mouseX+"%" });

                $('#tagname').focus();
            };
            var counter=0;
            $scope.save_tag = function(tagtxt,mouseY,mouseX){
                var txt = $('#tagname').val();

                counter++;
                $('#taglist ol').append('<li rel="'+counter+'"><a>'+txt+'</a> (<a class="remove">Remove</a>)</li>');
                $('#imgtag').append( $compile('<div class="tagview" id="view_'+counter+'">'+txt+'</div>')($scope));
                $('#view_' + counter).css({top:mouseY+"%",left:mouseX+"%"});
                //var tag={"left":mouseX+"%","top":mouseY+"%","text":txt};
                $scope.tags.push({"left":mouseX+"%","top":mouseY+"%","text":txt, "tagid":0});
                $('#tagit').fadeOut();
                console.log($scope.tags);
            };

            $scope.cancel_tag = function(){
                $('#tagit').fadeOut();
            };

            $scope.upload = function (files) {

                if (files && files.length) {
                 for (var i = 0; i < files.length; i++) {
                    var file = files[i];

                    Upload.upload({
                         method: 'POST',
                         url: 'http://localhost:6543/post',
                         fields: {
                         'userid': Auth.getUser().userid,//$cookieStore.get('lcuser'), //$window.sessionStorage["userInfo"],
                         'desc': $scope.post.desc
                        },
                        file: file,
                        tags:$scope.tags,
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

        }
});
/*
.controller('postCtrl', function ($scope, $timeout,$window,$http) {

});*/
