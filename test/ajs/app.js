/**
 * Created by king on 2015/10/31.
 */
var testApp = angular.module('testApp',['ngRoute','ngAnimate','testCtrl']);
testApp.config(['$routeProvider',function($routeProvider){
    $routeProvider.
        when('/',{
            templateUrl:'view/index.html',  // 相对于main的位置
            controller:'indexCtrl'
        }).
        when('/news',{
            templateUrl : 'view/news.html',
            controller:'newsCtrl'
        }).
        when('/news/:id', {
            templateUrl: 'view/newsDetail.html',
            controller: 'newsDetailCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);