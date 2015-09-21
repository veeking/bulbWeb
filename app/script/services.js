/**
 * Created by king on 2015/9/13.
 */
var bulbService = angular.module('bulbService',['ngResource']);
bulbService.factory('New',function($resource){
    return $resource('data/news/:newsType.json/:id',{},{
        get: {isArray: true }
    }); // 注意路径也是相对于main.html位置来定位的
});
bulbService.service('Pager',function(data,showCount){
         // do some
})
bulbService.factory('githubServices',function($http){
   var doRequest = function(userName,path){
      return $http({
         method:'JSONP',
         url : 'https://api.github.com/users/' + userName + '/' + path + '?callback=JSON_CALLBACK'
      });
   }// end doRequest
   return{ // 暴露接口
      events : function(username){return doRequest(username,'events')}
   }
});