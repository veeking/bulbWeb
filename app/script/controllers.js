
// controller

var bulbCtrl = angular.module('bulbCtrl',[]);
bulbCtrl.controller('bulbMainCtrl',function($scope,$location,$timeout,$http){
    $scope.moveCurrent = 0;
    $scope.newsTypeMenus = [
        {
            "navName":"新闻分类1",
            "navUrl":"#/news/news1?page=1"
        },
        {
            "navName":"新闻分类2",
            "navUrl":"#/news/news2?page=1"
        },
        {
            "navName":"新闻分类3",
            "navUrl":"#/news/news3?page=1"
        }

    ];

    $scope.navMenus = [
        {"navIdv":1,"navName":"首 页","navUrl":"/","navChild":[]},
        {"navId":2,"navName":"概 况","navUrl":"intro","navChild":[]},
        {"navId":3,"navName":"资 讯","navUrl":"news","navChild":$scope.newsTypeMenus},
        {"navId":4,"navName":"产 品","navUrl":"product","navChild":[
            {"navId":41,"navName":"产品1","navUrl":"#/product-1"},
            {"navId":42,"navName":"产品2","navUrl":"#/product-2"},
            {"navId":43,"navName":"产品3","navUrl":"#/product-3"},
            {"navId":44,"navName":"产品4","navUrl":"#/product-4"}
        ]},
        {"navId":5,"navName":"关于我们","navUrl":"about","navChild":[]}
    ];

    $scope.moveSelect = function(index){
        $scope.moveCurrent = index;
    }



});

bulbCtrl.controller('bulbIndexCtrl',function($scope,$timeout){
    $scope.slides = [
        {
            "src":"img/slide-1.jpg",
            "txt":"图片说明测试1"
        },
        {
            "src":"img/slide-2.jpg",
            "txt":"图片说明测试2"
        },{
            "src":"img/slide-3.jpg",
            "txt":"图片说明测试3"
        }
    ];
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


    $scope.otherNews = [
        {
            "content":"灯体是金属漆加烤漆喷涂,外观上精致简约,设计细腻,流畅线条勾勒出灯泡的质感,富有时尚的科技气息1"
        },
        {
            "content":"灯体是金属漆加烤漆喷涂,外观上精致简约,设计细腻,流畅线条勾勒出灯泡的质感,富有时尚的科技气息2"
        },
        {
            "content":"灯体是金属漆加烤漆喷涂,外观上精致简约,设计细腻,流畅线条勾勒出灯泡的质感,富有时尚的科技气息3"
        }
    ]

    $scope.hotNews = [
        {
            "name":"飞利浦灯泡1"
        },
        {
            "name":"飞利浦漆漆灯泡1"
        },
        {
            "name":"飞利浦漆漆加烤漆灯泡1"
        },
        {
            "name":"加烤漆灯泡灯泡1"
        },
        {
            "name":"飞利飞利浦漆漆加烤漆灯的绯闻绯闻二个人个人泡泡1"
        },
        {
            "name":"利浦漆漆加烤漆灯泡灯泡1"
        },
        {
            "name":"飞利浦灯飞烤漆灯泡泡1"
        },
        {
            "name":"飞利浦灯泡1"
        }
    ];


    $scope.pLeft = {
        "img":"img/index-product/p1.jpg",
        "txt":"玄关过道"
    };
    $scope.pRights = [
        {
            "img":"img/index-product/p2.jpg",
            "txt":"厨房"
        },
        {
            "img":"img/index-product/p3.jpg",
            "txt":"卧室"
        },
        {
            "img":"img/index-product/p4.jpg",
            "txt":"客厅"
        },
        {
            "img":"img/index-product/p5.jpg",
            "txt":"餐厅"
        }
    ]

});  // end controller
bulbCtrl.controller('bulbIntroCtrl',function($scope){

});
bulbCtrl.controller('bulbNewsCtrl',function($scope){
    var i;
    var imgPreSrc = 'img/list-type/';
    var imgType = '.jpg';
    for(i=0;i < $scope.newsTypeMenus.length;i++){ // 加载分类图片
        $scope.newsTypeMenus[i].img = imgPreSrc + "l" + (i+1) + imgType;
    }
});
bulbCtrl.controller('bulbSideCtrl',function($scope,$routeParams,$location){
    var sideNavIndex = 0;
    $scope.Side = {
        typeIcon : "glyphicon-bookmark",
        typeTxt : "新闻中心NEWS",
        sideNavs : $scope.newsTypeMenus
    };

    $scope.activeSideNav = function(index){
        sideNavIndex = index;
        var nowPath = $routeParams.newsType;
        var nowUrl = $scope.Side.sideNavs[index].navUrl;
        if(nowUrl.indexOf(nowPath) !=-1){  // 根据url和path是否匹配来定位当前
            return true;
        }else{
            return false;
        }
  } // end activeSlideNav
});
bulbCtrl.controller('bulbNewsListCtrl',function($scope,$routeParams,$location,New,Pager){
    var newsType = $routeParams.newsType;
    var pageData = []; // 用于临时存放当前页的所有数据列表，便于模拟显示数据列表
    $scope.Pages = {};  // 与Pager 构造对象对应

    pageData = New.get({newsType:newsType},function(news){
        $scope.newsTypeUrl = newsType;
        $scope.Pages = Pager(news,6);
        $scope.newLists = $scope.Pages.pageDataTemp;
    });
});
bulbCtrl.controller('bulbNewsDetailCtrl',function($scope,$routeParams,$q,New){
    var _loadDetail = function(){  // promise封装
       var deferred = $q.defer();
       New.get({newsType:$routeParams.newsType},function(news){
         deferred.resolve(news[$routeParams.id-1]);
       });
       return deferred.promise;
    }; // end _loadDetail

    var detailPromise = _loadDetail().then(function(data){
          $scope.newDetails = data;
          if($scope.newDetails.content){
             $scope.content = $scope.newDetails.content;
          }
    });
});
