/**
 * Created by Yuan
 */
'use strict';

angular.module('lookchic.editprofile', ['ngRoute'])
    .controller('editprofileCtrl', function($scope,Upload,$timeout,User,Auth,Cropper) {

        $scope.afiles={};
        $scope.preCrop={};

        var currentuserid = Auth.getUser().lc_userid;

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
                    console.log ( 'get profile success' );
                    $scope.userprofile = data.profile.userProfile;
                    $scope.userProfileUrl = data.profile.userProfileUrl;
                })
                .error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                });
        };

        $scope.isEmpty = function (obj) {
            for (var i in obj) if (obj.hasOwnProperty(i)) return false;
            return true;
        };

        //Update User Profile
        $scope.update_profile = function (files) {
            var file={};
            file.name='';
            if (files && files.length) {
                file = files[0];
                file.name=$scope.filename;
            }

            Upload.upload({
                method: 'POST',
                url: 'http://localhost:6543/updateprofile',
                fields: {
                    'userid': currentuserid,
                    'username': $scope.userprofile.username,
                    'email': $scope.userprofile.Email,
                    'location': $scope.userprofile.location,
                    'gender': $scope.userprofile.Gender,
                    'brithday': $scope.userprofile.brithday,
                    'occupation': $scope.userprofile.Occupation,
                    'height': $scope.userprofile.Height,
                    'weight': $scope.userprofile.Weight
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
                    $scope.initProfile();
                });
            }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
            });

        };

        //Image Cropper
        var file, data;
        $scope.options = {
            //maximize: true,
            aspectRatio: 1,
            autoCropArea: 0.8,

            strict: false,
            guides: false,
            /*highlight: false,

             cropBoxMovable: false,*/
            dragCrop: false,
            cropBoxResizable: false,
            preview: '.img-preview',
            crop: function(dataNew) {
                data = dataNew;
            }
        };

        $scope.isCropped=false;
        $scope.confirm=false;

        $scope.$watch("afiles",function(newValue, oldValue) {
            $scope.filename=$scope.afiles[0].name;
            $(".cropper-view-box").css("border-radius", "50%");
            $(".cropper-face").css("border-radius", "50%");
            var blob = newValue;
            
            $scope.isCropped=false;
            if (!$scope.isEmpty(blob)){
                Cropper.encode((file = blob[0])).then(function(dataUrl) {
                    $scope.dataUrl = dataUrl;
                    $(".cropper-canvas img").attr('src', dataUrl);
                    $(".cropper-view-box img").attr('src', dataUrl);
                    $timeout(showCropper);  // wait for $digest to set image's src
                });
                $scope.confirm = true;
                
            }
        });
        $scope.preview = function() {
            if (!file || !data) return;

            Cropper.crop(file, data).then(Cropper.encode).then(function(dataUrl) {
                ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
            });
        };
        $scope.avatar_cropper = function(){
            if (!file || !data) return;

            $('#lc_avatar').cropper('getCroppedCanvas');

            $('#lc_avatar').cropper('getCroppedCanvas', {
                width: 150,
                height: 150
            });

            var durl = $('#lc_avatar').cropper('getCroppedCanvas').toDataURL();
            var blob = dataURItoBlob(durl);

            $scope.isCropped=true;

            $scope.preview();

            //$scope.afiles[0]=blob;
            $scope.afiles[0]=blob;
            $scope.confirm=false;
        };

        $scope.cropper = {};
        $scope.cropperProxy = 'cropper.first';

        $scope.showEvent = 'show';
        $scope.hideEvent = 'hide';

        function showCropper() {

            $(".cropper-view-box").css("border-radius", "50%");
            $(".cropper-face").css("border-radius", "50%");
            $scope.$broadcast($scope.showEvent);
        }
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

        //Datepicker
        $scope.today = function() {
            $scope.brithday = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.brithday = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
        $scope.maxDate = new Date(2020, 5, 22);

        $scope.open = function($event) {
            $scope.status.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.brithday = new Date(year, month, day);
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        /*$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];*/

        $scope.status = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i=0;i<$scope.events.length;i++){
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };
    });