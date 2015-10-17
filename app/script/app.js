/**
 * Created by veeking on 2015/7/27.
 */
var bulbApp = angular.module('bulbApp',['ngRoute','bulbCtrl','bulbDirective','bulbService']);
//bulbApp.run(function($rootScope,bulbData){
//    if(bulbData.loaded == false){  // 总数据只允许请求依次
//        bulbData.loaded = true;
//        bulbData.getData('news',[{navType:"news1"},{navType:"news2"},{navType:"news3"}]).then(function(datas){
//            $rootScope.newsData = datas;
//        });
//    }else {
//        return false;
//    }
//})
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
//              resolve:{
//                newsData : function(bulbData){
//                   if(bulbData.loaded == false){  // 总数据只允许请求依次
//                      bulbData.loaded = true;
//                       alert('loaded')
//                        return bulbData.getData('news',[{navType:"news1"},{navType:"news2"},{navType:"news3"}]);
//                   }else {
//                       alert('false')
//                       return false;
//                   }
//                }
//              }
      }).
      otherwise({
        redirectTo: '/'
     });
}]);
