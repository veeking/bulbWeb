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
                 "<div class=\"carousel-index row\">" +
                 "<a href=\"###\" ng-class=\"{selectActive:slideActive($index)}\" ng-repeat=\"slide in slides track by $index\" ng-click=\"select($index)\">■</a>" +
                 "</div>" +
                 "</div>",
        controller : function($scope){
             var carousel = this;
             carousel.currIndex = 0;
             carousel.select = $scope.select = function(index){
                 carousel.currIndex = index;
             } // end select
             carousel.slideActive = $scope.slideActive = function(index){
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
bulbApp.controller('infoCtrl',function($scope){
    $scope.infoConts = [
        {
           "src":"img/info/i1.jpg",
        },
        {
            "src":"img/info/i2.jpg",
        },
        {
            "src":"img/info/i3.jpg",
        }
    ];
   $scope.infoTitle = "精湛的技术成就完美产品";
   $scope.infoCont = "采用CWA电器点灯线路，可以减少因电流波动过大对灯电极的损耗，从而提高光源的使用寿命.可以减少因电流波动过大对灯电极的损耗。";
   $scope.infoContMain = "采用CWA电器点灯线路，可以减少因电流波动过大对灯电极的损耗，从而提高光源的使用寿命.采用CWA电器点灯线路，可以减少因电流波动过大对灯电极的损耗。采用CWA电器点灯线路，可以减少因电流波动过大对灯电极的损耗，从而提高光源的使用寿命.采用CWA电,采用CWA电器点灯线路...";
});
bulbApp.controller('pointCtrl',function($scope){
      $scope.points = [
          {
            "title":"精致工艺",
            "icon":"glyphicon-asterisk",
            "intro":"外观上精致简约,设计细腻,流畅线条勾勒出灯泡的质感,富有时尚的科技气息.",
            "desc":"灯体是金属漆加烤漆喷涂,外观上精致简约,设计细腻,流畅线条勾勒出灯泡的质感,富有时尚的科技气息"
          },
          {
              "title":"先进设备",
              "icon":"glyphicon-cog",
              "intro":"外观上精致简约,设计细腻,流畅线条勾勒出灯泡的质感,富有时尚的科技气息.",
              "desc":"灯体是金属漆加烤漆喷涂,外观上精致简约,设计细腻,流畅线条勾勒出灯泡的质感,富有时尚的科技气息"
          },
          {
              "title":"现代技术",
              "icon":"glyphicon-cd",
              "intro":"外观上精致简约,设计细腻,流畅线条勾勒出灯泡的质感,富有时尚的科技气息.",
              "desc":"灯体是金属漆加烤漆喷涂,外观上精致简约,设计细腻,流畅线条勾勒出灯泡的质感,富有时尚的科技气息"
          },
          {
              "title":"质量控制",
              "icon":"glyphicon-repeat",
              "intro":"外观上精致简约,设计细腻,流畅线条勾勒出灯泡的质感,富有时尚的科技气息.",
              "desc":"灯体是金属漆加烤漆喷涂,外观上精致简约,设计细腻,流畅线条勾勒出灯泡的质感,富有时尚的科技气息"
          }
      ];
})