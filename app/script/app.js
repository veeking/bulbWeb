/**
 * Created by veeking on 2015/7/27.
 */
var bulbApp = angular.module('bulbApp',['ngRoute','bulbAnimate','bulbCtrl','bulbDirective','bulbService']);
bulbApp.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){
//      $httpProvider.defaults.cache = true; // 缓存http请求 ，同类型请求只触发一次
      $routeProvider.
      when('/',{
        templateUrl:'views/index.html',  // 相对于main的位置
        controller:'bulbIndexCtrl'
      }).
      when('/about',{
        templateUrl : 'views/about/about.html',
        controller:'bulbAboutCtrl'
      }).
      when('/contact',{
        templateUrl : 'views/contact/contact.html',
        controller:'bulbContactCtrl'
      }).
      when('/news',{
         templateUrl : 'views/news/news-type.html',
         controller:'bulbNewsCtrl'
      }).
      when('/news/:type',{
          templateUrl : 'views/news/news-list.html',
          controller:'bulbNewsListCtrl',
          resolve:{
              newsData : function(ReqLoader){
                  return ReqLoader('news');
              }
          } // end resolve
      }).
      when('/news/:type/:id',{
              templateUrl : 'views/news/news-detail.html',
              controller:'bulbNewsDetailCtrl',
              resolve:{
                  newsData : function(ReqLoader){
                      return ReqLoader('news');
                  }
              } // end resolve
      }).
      when('/products',{
              templateUrl : 'views/product/product-type.html',
              controller:'bulbProductsCtrl'
      }).
      when('/products/:type',{
              templateUrl : 'views/product/product-list.html',
              controller:'bulbProductsListCtrl',
              resolve:{
                  productsData : function(ReqLoader){
                      return ReqLoader('products');
                  }
              } // end resolve
      }).
      when('/products/:type/:id',{
              templateUrl : 'views/product/product-detail.html',
              controller:'bulbProductsDetailCtrl',
              resolve:{
                  productsData : function(ReqLoader){
                      return ReqLoader('products');
                  }
              } // end resolve
      }).
      when('/search',{
              templateUrl : 'views/search/search.html',
              controller:'bulbSearchCtrl'
      }).
      when('/message',{
              templateUrl : 'views/message/message.html',
              controller:'bulbMessageCtrl',
              resolve:{
                  loadMsg:function($q,$http){
                    return function(){
                      var defer = $q.defer();
                      $http.get('/getMessage').success(function(data){
                          defer.resolve(data);
                      },function(err){
                          defer.reject(err);
                      })
                      return defer.promise;
                    }
                  } // end loadMsg
              }
      }).
      otherwise({
        redirectTo: '/'
     });
}]);
