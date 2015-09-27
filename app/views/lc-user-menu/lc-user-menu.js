/**
 * Created by Yuan
 */
'use strict';

lc.controller('userCtrl', function($scope,$location,$mdDialog,Auth,User,Cropper) {
    $scope.searchtext='';

    $scope.search = function(kword){

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

    $scope.user_logout = function(){
        //Session.destroy();
        Auth.user_logout();
    };

    function DialogController($scope,Upload, $mdDialog,$timeout,$compile,$location,$route,Auth) {
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
            //$location.path('/main');
            $scope.hide();
            $route.reload();
            //$scope.initFirst();
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
            $scope.tagtxt=''; //remove tag text text
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
                            'desc': $scope.post.desc,
                            'tags':$scope.tags,
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

        var file, data;
        $scope.options = {
            //maximize: true,
            aspectRatio: 9 / 16,
            autoCropArea: 0.75,

            /*strict: false,
            guides: false,
            highlight: false,

            cropBoxMovable: false,*/
            dragCrop: false,
            cropBoxResizable: false,
            crop: function(dataNew) {
                data = dataNew;
            }
        };

        $scope.$watch("files",function(newValue, oldValue) {

            var blob = newValue;
            if (!$scope.isEmpty(blob)){
                Cropper.encode((file = blob[0])).then(function(dataUrl) {
                    $scope.dataUrl = dataUrl;
                    $timeout(showCropper);  // wait for $digest to set image's src
                });
            }
        });
        /*$scope.preview = function() {
            if (!file || !data) return;

            Cropper.crop(file, data).then(Cropper.encode).then(function(dataUrl) {
                ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
            });
        };*/
        $scope.lc_cropper = function(){
            //if (!file || !data) return;
            //return Cropper.crop(file);
            /*Cropper.crop(file, data).then(Cropper.encode).then(function(dataUrl) {
                ($scope.lc_cropper || ($scope.lc_cropper = {})).dataUrl = dataUrl;
            });*/
            $('#lc_photo').cropper('getCroppedCanvas');

            $('#lc_photo').cropper('getCroppedCanvas', {
                width: 90,
                height: 160
            });

            $('#lc_photo').cropper('getCroppedCanvas').toBlob(function (blob) {
                var formData = new FormData();
                formData.append('croppedImage', blob);
            });
        };

        $scope.onFile = function(blob) {
            //var blob = $scope.files[0];
            //if (!$scope.isEmpty(blob)){
            Cropper.encode((file = blob)).then(function(dataUrl) {
                $scope.dataUrl = dataUrl;
                $timeout(showCropper);  // wait for $digest to set image's src
            });
            //}
        };
        $scope.cropper = {};
        $scope.cropperProxy = 'cropper.first';

        $scope.showEvent = 'show';
        $scope.hideEvent = 'hide';

        function showCropper() { $scope.$broadcast($scope.showEvent); }
        function hideCropper() { $scope.$broadcast($scope.hideEvent); }
    }
});