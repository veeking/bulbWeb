
// controller

var bulbCtrl = angular.module('bulbCtrl',[]);

bulbCtrl.controller('bulbMainCtrl',function($scope,$timeout){
    $scope.num=0;
    function countNum(){
        $timeout(function(){
            $scope.num++;
            countNum()
        },100)
    }
    countNum()
    $scope.moveCurrent = 0;
    $scope.navMenus = [
        {"navIdv":1,"navName":"首 页","navUrl":"/","navChild":[]},
        {"navId":2,"navName":"概 况","navUrl":"/intro","navChild":[]},
        {"navId":3,"navName":"服 务","navUrl":"/service","navChild":[
            {"navId":31,"navName":"服务1","navUrl":"/service-1"},
            {"navId":32,"navName":"服务2","navUrl":"/service-2"},
            {"navId":33,"navName":"服务3","navUrl":"/service-3"},
            {"navId":34,"navName":"服务4","navUrl":"/service-4"}
        ]},
        {"navId":4,"navName":"产 品","navUrl":"/product","navChild":[
            {"navId":41,"navName":"产品1","navUrl":"/product-1"},
            {"navId":42,"navName":"产品2","navUrl":"/product-2"},
            {"navId":43,"navName":"产品3","navUrl":"/product-3"},
            {"navId":44,"navName":"产品4","navUrl":"/product-4"}
        ]},
        {"navId":5,"navName":"关于我们","navUrl":"/about","navChild":[]}
    ];

    $scope.moveSelect = function(index){
        $scope.moveCurrent = index;
    }
});
bulbCtrl.controller('bulbIndexCtrl',function($scope,$timeout){
    $scope.num=0;
    function countNum(){
        $timeout(function(){
            $scope.num++;
            countNum()
        },100)
    }
    countNum()
    $scope.slides = [
        {
            "src":"../img/slide-1.jpg",
            "txt":"图片说明测试1"
        },
        {
            "src":"../img/slide-2.jpg",
            "txt":"图片说明测试2"
        },{
            "src":"../img/slide-3.jpg",
            "txt":"图片说明测试3"
        }
    ];
    $scope.infoConts = [
        {
            "src":"../img/info/i1.jpg",
        },
        {
            "src":"../img/info/i2.jpg",
        },
        {
            "src":"../img/info/i3.jpg",
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
        "img":"../img/index-product/p1.jpg",
        "txt":"玄关过道"
    };
    $scope.pRights = [
        {
            "img":"../img/index-product/p2.jpg",
            "txt":"厨房"
        },
        {
            "img":"../img/index-product/p3.jpg",
            "txt":"卧室"
        },
        {
            "img":"../img/index-product/p4.jpg",
            "txt":"客厅"
        },
        {
            "img":"../img/index-product/p5.jpg",
            "txt":"餐厅"
        }
    ]

});  // end controller
