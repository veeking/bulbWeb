/**
 * Created by king on 2015/9/13.
 */
var bulbService = angular.module('bulbService',['ngResource']);
bulbService.factory('New',function($resource){
    return $resource('data/news/:newsType.json/:id',{},{
        get: {isArray: true }
    }); // 注意路径也是相对于main.html位置来定位的
});