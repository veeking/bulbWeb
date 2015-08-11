/**
 * Created by veeking on 2015/7/27.
 */
var bulbApp = angular.module('bulbApp',[]);
bulbApp.controller('mainCtrl',function($scope){
        $scope.moveCurrent = 0;
        $scope.navMenus = [
            {"navId":1,"navName":"首 页","navChild":[]},
            {"navId":2,"navName":"概 况","navChild":[]},
            {"navId":3,"navName":"服 务","navChild":[
               {"navId":31,"navName":"服务1"},
               {"navId":32,"navName":"服务2"},
               {"navId":33,"navName":"服务3"},
               {"navId":34,"navName":"服务4"}
            ]},
            {"navId":4,"navName":"产 品","navChild":[
                {"navId":41,"navName":"产品1"},
                {"navId":42,"navName":"产品2"},
                {"navId":43,"navName":"产品3"},
                {"navId":44,"navName":"产品4"}
            ]},
            {"navId":5,"navName":"关于我们","navChild":[]}
        ];

    $scope.moveSelect = function(index){
        $scope.moveCurrent = index;
    }
});  // end controller
bulbApp.controller('sliderCtrl',function($scope){
     $scope.slides = [
         {
           "src":"img/slide-1.jpg",
           "txt":"图片测试1"
         },
         {
           "src":"img/slide-2.jpg",
           "txt":"图片测试2"
         },{
           "src":"img/slide-3.jpg",
           "txt":"图片测试3"
         }
     ];
});
bulbApp.directive('carousel',function(){
    return{
        restrict:"AE",
        replace : true,
        transclude:true,
        template:"<div class=\"carousel\">" +
                 "<ul class=\"carousel-inner\" ng-transclude></ul>"+
                 "<div class=\"carousel-index\">" +
                 "<a href=\"###\" ng-class=\"{selectActive:slideActive($index)}\" ng-repeat=\"slide in slides\" ng-click=\"select($index)\">{{$index}}</a>" +
                 "</div>" +
                 "</div>",
        controller : function($scope){
             var carousel = this;
             carousel.currIndex = 0;
             carousel.select = $scope.select = function(index){
                 carousel.currIndex = index;
             } // end select
             carousel.indexActive = $scope.indexIsActive = function(index){
                 return (index === carousel.currIndex);
             }// end indexIsActive
        }
    }
});
bulbApp.directive('slide',function(){
    return{
        restrict:"AE",
        replace : true,
        transclude:true,
        require:"^carousel",
        template:"<li ng-class=\"{slideActive:slideActive($index)}\" ng-transclude></li>"
    }
});