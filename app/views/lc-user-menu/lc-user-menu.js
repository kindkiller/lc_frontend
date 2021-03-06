/**
 * Created by Yuan
 */
'use strict';

lc.controller('userCtrl', function($scope,$location,$route,$mdDialog,Auth,User,Cropper) {
    $scope.searchtext='';
    $scope.currentuserid = Auth.getUser().lc_userid;

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
        //$location.path('/home');
        //$route.reload();
    };

    function DialogController($scope,Upload, $mdDialog,$timeout,$compile,$location,$route,Auth) {
        $scope.post={};
        $scope.files={};
        $scope.tags=[];
        $scope.isAddTag=false;
        $scope.mouseX=0;
        $scope.mouseY=0;

        $scope.isEmpty = function (obj) {
            for (var i in obj) if (obj.hasOwnProperty(i)) return false;
            return true;
        };

        $scope.hide = function () {
            $mdDialog.hide();
        };
        //Upload photo to server
        $scope.lc_post = function (files){

            if($scope.upload(files))
            {
                $scope.hide();
                $route.reload();
            }
            //$location.path('/main');
            else{

                $scope.hide();
            }
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
            $('#tagit').remove(); // remove any tagit div first
            $('#c-menu').remove();
            $scope.tagtxt=''; //remove tag text text
            //insert an input box with save and cancel operations.
            $('#imgtag').append( $compile('<div class="menu" id="c-menu">' +

                '<div class="btn trigger" ng-click="cmenu()" > <span class="fa fa-bars" ></span> </div>' +
                '<div class="rotater"><div class="btn btn-icon" ng-click="addTagB(\'bags\')"> <img ng-src="images/fashion-category-icons/bags.png"> </div></div>' +
                '<div class="rotater"><div class="btn btn-icon" ng-click="addTagB(\'shoe\')"> <img ng-src="images/fashion-category-icons/shoe7.png"> </div></div>' +
                '<div class="rotater"><div class="btn btn-icon" ng-click="addTagB(\'dress\')"> <img ng-src="images/fashion-category-icons/dress2.png"> </div></div>' +
                '<div class="rotater"><div class="btn btn-icon" ng-click="addTagB(\'jacket\')"> <img ng-src="images/fashion-category-icons/jacket2.png"> </div></div>' +
                '<div class="rotater"><div class="btn btn-icon" ng-click="addTagB(\'pents\')"> <img ng-src="images/fashion-category-icons/long35.png"></i> </div></div>' +
                '<div class="rotater"><div class="btn btn-icon" ng-click="addTagB(\'accessory\')"> <img ng-src="images/fashion-category-icons/scarf.png"></i> </div></div>' +
                '<div class="rotater"><div class="btn btn-icon" ng-click="addTagB(\'skirt\')"> <img ng-src="images/fashion-category-icons/skirt.png"> </div></div>' +
                '<div class="rotater"><div class="btn btn-icon" ng-click="addTagB(\'tshirt\')"> <img ng-src="images/fashion-category-icons/t-shirt4.png"> </div></div>' +
                '</div>' )($scope) );

            //$('#imgtag').append( $compile('<div id="tagit"><div class="box"></div><div class="name"><div class="text">Type tag</div><input type="text" ng-model="tagtxt" name="txtname" id="tagname" /><input type="button" name="btnsave" ng-click="save_tag(tagtxt,mouseY,mouseX)" value="Save" id="btnsave" /><input type="button" name="btncancel" value="Cancel" ng-click="cancel_tag()" id="btncancel" /></div></div>')($scope) );
            $('#c-menu').css({ top:$scope.mouseY+"%", left:$scope.mouseX+"%" });
            //$('#tagit').css({ top:$scope.mouseY+"%", left:$scope.mouseX+"%" });

            //$('#tagname').focus();
        };
        $scope.addTagB = function (cata){
            $('#c-menu').remove();
            $scope.tagcata = cata;
            $('#imgtag').append( $compile('<div id="tagit">' +

                '<div class="box"></div>' +
                '<div class="name">' +
                '<input type="text" ng-model="tagbrand" placeholder="品牌" uib-typeahead="state for state in brands | filter:$viewValue | limitTo:8" class="form-control">' +
                '<input type="text" ng-model="tagtxt" placeholder="Tag" id="tagname" class="form-control" />' +
                '<input type="button" class="btn-xs" ng-click="save_tag(tagcata,tagbrand,tagtxt,mouseY,mouseX)" value="Save" id="btnsave" />' +
                '<input type="button" class="btn-xs" value="Cancel" ng-click="cancel_tag()" id="btncancel" />' +
                '</div>' +
                '</div>' )($scope) );
            $('#tagit').css({ top:$scope.mouseY+"%", left:$scope.mouseX+"%" });
        };
        //TODO: get brands list from backend
        $scope.brands = ["Burberry",
            "Theory",
            "Vince",
            "Christian Louboutin",
            "Nike"];

        var counter=0;
        $scope.save_tag = function(tagcata,tagbrand,tagtxt,mouseY,mouseX){
            var txt = $('#tagname').val();

            counter++;
            $('#taglist ol').append('<li rel="'+counter+'"><a>'+txt+'</a> (<a class="remove" ng-click="">Remove</a>)</li>');
            $('#imgtag').append( $compile('<div class="tagview" id="view_'+counter+'">'+txt+'</a><span ng-click="remove_tag('+counter+','+txt+')" class="glyphicon glyphicon-remove-sign tag-del" ></span></div>')($scope));
            $('#view_' + counter).css({top:mouseY+"%",left:mouseX+"%"});
            //var tag={"left":mouseX+"%","top":mouseY+"%","text":txt};
            $scope.tags.push({"left":mouseX+"%","top":mouseY+"%","text":txt, "tagid":0, "cata":tagcata,"brand":tagbrand });
            $('#tagit').fadeOut();
        };

        $scope.cancel_tag = function(){
            $('#tagit').fadeOut();
        };

        $scope.remove_tag = function(counter,txt){
            console.log($scope.tags);
            $('#view_'+counter).remove();
            $scope.tags.splice( $scope.tags.indexOf(txt), 1);
            console.log($scope.tags);
        };

        $scope.cmenu = function(){
            $(".menu").toggleClass("active");
        };

        $scope.upload = function (files) {

            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    file.name=$scope.filename;
                    Upload.upload({
                        method: 'POST',
                        url: 'http://localhost:6543/post',
                        fields: {
                            'userid': Auth.getUser().lc_userid,
                            'desc': $scope.post.desc,
                            'tags':$scope.tags
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
                            return true;
                        });
                    }).error(function (data, status, headers, config) {
                        console.log('error status: ' + status);
                        return false;
                    });
                }
            }
        };

        var file, data;
        $scope.options = {
            //maximize: true,
            aspectRatio: 3/4,
            autoCropArea: 0.75,

            strict: false,
            /*guides: false,
            highlight: false,

            cropBoxMovable: false,*/
            dragCrop: false,
            cropBoxResizable: false,
            preview: '.img-preview',
            crop: function(dataNew) {
                data = dataNew;
            }
        };

        $scope.isCropped=false;
        $scope.$watch("files",function(newValue, oldValue) {
            $scope.filename=$scope.files[0].name;
            var blob = newValue;
            if (!$scope.isEmpty(blob)&&!$scope.isCropped){
                Cropper.encode((file = blob[0])).then(function(dataUrl) {
                    $scope.dataUrl = dataUrl;
                    $timeout(showCropper);  // wait for $digest to set image's src
                });
            }
        });
        $scope.preview = function() {
            if (!file || !data) return;

            Cropper.crop(file, data).then(Cropper.encode).then(function(dataUrl) {
                ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
            });
        };
        $scope.lc_cropper = function(){
            if (!file || !data) return;

            $('#lc_photo').cropper('getCroppedCanvas');

            $('#lc_photo').cropper('getCroppedCanvas', {
                width: 480,
                height: 640
            });

            var durl = $('#lc_photo').cropper('getCroppedCanvas').toDataURL();
            var blob = dataURItoBlob(durl);

            $scope.isCropped=true;
            $scope.preview();

            $scope.files[0]=blob;

        };

        $scope.cropper = {};
        $scope.cropperProxy = 'cropper.first';

        $scope.showEvent = 'show';
        $scope.hideEvent = 'hide';

        function showCropper() { $scope.$broadcast($scope.showEvent); }
        function hideCropper() { $scope.$broadcast($scope.hideEvent); }
        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type:mimeString});
        }
    }

});