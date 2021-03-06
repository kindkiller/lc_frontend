/**
 * Created by Yuan on 7/3/2015.
 */
'use strict';

angular.module('lookchic.results', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/results', {
            templateUrl: 'views/lc-search-results/lc-search-results.html',
            controller: 'resultsCtrl'
        });
    }])
    .controller('resultsCtrl', function($scope,$routeParams,$http, User) {
        $scope.layout = 'list';

        var kword = $routeParams.keyword;
        console.log(kword);
        //$scope.results = User.searchitem(kword);

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



        console.log($scope.results);

        /*$scope.results = [
            {
                productname: 'Manolo Blahnik Hangisi Satin Pump',
                price: '$965',
                link: '#',
                imgurl: 'images/test_img/sample4.jpg',
                desc: '40% Off Select'
            },
            {
                productname: 'Manolo Blahnik Hangisi Satin Pump',
                price: '$965',
                link: '#',
                imgurl: 'images/test_img/sample4.jpg',
                desc: '40% Off Select'
            }
        ];*/
    });