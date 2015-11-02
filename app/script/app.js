/**
 * Created by veeking on 2015/7/27.
 */
var bulbApp = angular.module('bulbApp',['ngRoute','ngAnimate','bulbCtrl','bulbDirective','bulbService']);
bulbApp.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){
//      $httpProvider.defaults.cache = true; // 缓存http请求 ，同类型请求只触发一次
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
      when('/products',{
              templateUrl : 'views/product/product-type.html',
              controller:'bulbProductsCtrl'
      }).
      when('/products/:productsType',{
              templateUrl : 'views/product/product-list.html',
              controller:'bulbProductsListCtrl'
      }).
      when('/products/:productsType/:id',{
              templateUrl : 'views/product/product-detail.html',
              controller:'bulbProductsDetailCtrl'
      }).
      when('/search',{
              templateUrl : 'views/search/search.html',
              controller:'bulbSearchCtrl'
      }).
      otherwise({
        redirectTo: '/'
     });
}]);
