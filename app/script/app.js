/**
 * Created by veeking on 2015/7/27.
 */
var bulbApp = angular.module('bulbApp',['ngRoute','bulbCtrl','bulbDirective','bulbService']);
bulbApp.config(['$routeProvider',function($routeProvider){
      $routeProvider.
      when('/',{
        templateUrl:'views/index.html',  // 相对于main的位置
        controller:'bulbIndexCtrl'
      }).
      when('/intro',{
        templateUrl : 'views/intro/intro.html',
        controller:'bulbIntroCtrl'
      }).
      when('/news',{
         templateUrl : 'views/news/news-type.html',
         controller:'bulbNewsCtrl'
      }).
      when('/news/:newsType',{
          templateUrl : 'views/news/news-list.html',
          controller:'bulbNewsListCtrl'
      }).
      when('/news/:newsType/:id',{
              templateUrl : 'views/news/news-detail.html',
              controller:'bulbNewsDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
     });
}]);
