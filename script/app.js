/**
 * Created by veeking on 2015/7/27.
 */
var bulbApp = angular.module('bulbApp',['ngRoute','bulbCtrl','bulbDirective']);
bulbApp.config(['$routeProvider',function($routeProvider){
      $routeProvider.
      when('/',{
        templateUrl:'template/index.html',  // 相对于main的位置
        controller:'bulbIndexCtrl'
      }).
      when('/intro',{
        templateUrl : 'template/intro.html',
        controller:'bulbIntroCtrl'
      }).
      otherwise({
        redirectTo: '/'
     });
}]);
