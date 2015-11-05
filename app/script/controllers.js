
// controller

var bulbCtrl = angular.module('bulbCtrl',[]);
bulbCtrl.controller('bulbMainCtrl',function($scope,$cacheFactory,$location,$routeParams,$timeout,$q,ReqLoader,Pager){
    $scope.moveCurrent = 0;
    $scope.newsType = [  // 新闻分类数据  与news文件夹文件名和数量耦合
        {
            "navName":"新闻分类1",
            "navType":"news1",
            "navUrl":"#/news/news1?page=1"
        },
        {
            "navName":"新闻分类2",
            "navType":"news2",
            "navUrl":"#/news/news2?page=1"
        },
        {
            "navName":"新闻分类3",
            "navType":"news3",
            "navUrl":"#/news/news3?page=1"
        }
    ];
    $scope.productsType = [  // 产品分类数据
        {
            "navName":"LED灯源",
            "navType":"p1",
            "navUrl":"#/products/p1?page=1"
        },
        {
            "navName":"传统灯源",
            "navType":"p2",
            "navUrl":"#/products/p2?page=1"
        },
        {
            "navName":"家居灯源",
            "navType":"p3",
            "navUrl":"#/products/p3?page=1"
        },
        {
            "navName":"室外灯源",
            "navType":"p4",
            "navUrl":"#/products/p4?page=1"
        },
        {
            "navName":"照明电器",
            "navType":"p5",
            "navUrl":"#/products/p5?page=1"
        }
    ];


    $scope.navMenus = [
        {"navIdv":1,"navName":"首 页","navUrl":"/","navChild":[]},
        {"navId":2,"navName":"概 况","navUrl":"intro","navChild":[]},
        {"navId":3,"navName":"资 讯","navUrl":"news","navChild":$scope.newsType},
        {"navId":4,"navName":"产 品","navUrl":"products","navChild":$scope.productsType},
        {"navId":5,"navName":"关于我们","navUrl":"about","navChild":[]}
    ];
   //数据依赖说明
    // [searchOption搜索数据依赖 分类数据和列表数据]
    // [分类数据-》依赖列表数据文件名]
    // 列表数据 无依赖
     //搜索
    $scope.tabs = [];
    var oldWord = null;
    var cache = $cacheFactory('cache');
    $scope.hotWords = ["LED","新闻","产品","家居产品","传统灯光","服务","照明方案","新型灯泡"]; // 默认列表
    $scope.search = function(){
      if($scope.searchWord ==" ") return false;
      if(arguments[0] != undefined){ //页面刷新的时候传入的参数值
         $scope.searchWord = arguments[0];
      };
      var keyWord = $scope.searchWord;
      $location.path('search').search({'word':keyWord});

      var newsType = $scope.newsType;
      var productsType = $scope.productsType;

      var searchOption = [ // 搜素配置参数对象
         {
           showType:'news',
           showTypeName:"新闻",
           showTypeData:newsType
         },
         {
           showType:'products',
           showTypeName:"产品",
           showTypeData:productsType
         }
      ];
//        localStorage.clear();
      function _startSearch(options){   // 执行搜索 :1、获取数据  2、匹配数据
           $scope.loaded = false; // 加载中图标
           options.map(function(option,index){
                //缓存  还是推荐用localStorge吧  $cacheFactory不建议存储大容量的内容
                var cacheData = localStorage.getItem('searchData'+index);
                if(!cacheData){
                    console.log('没缓存')
                    getData(option.showType,option.showTypeData).then(function(singleFile){
                        var stringData = JSON.stringify(singleFile);  //
                        localStorage.setItem('searchData'+index,stringData); // 0,1分别对应像一个的新闻和产品缓存
                        _matchData(option,singleFile,index)
                    });
                }else{
                    console.log("有缓存")
                    $timeout(function(){  // 模拟加载
                        cacheData = JSON.parse(cacheData);
                        _matchData(option,cacheData,index);
                    },1000)
                }
            })
      };// END _startSearch();
         //singleFile 为每个文件的数组对象
      function _matchData(bigType,singleFile,posIndex){
              if(typeof bigType != "object") return false;

              $scope.loaded = true; // 成功后 删掉加载图

              var tmpTab = {
                  typeTitle : bigType.showTypeName,
                  listCount : 0,
                  listData : [],
                  pages : []
              };

              var listBigType =  bigType.showType;
              var listDataType;
              var listPager;
           singleFile.forEach(function(rowsData,singleIndex){
               listDataType = bigType.showTypeData[singleIndex].navType;
               rowsData.forEach(function(data){
                   // 搜索核心: ->简单关键词标题匹配，当然还有更高级的算法
                   if(data.title.indexOf(keyWord) != -1){
                       tmpTab.listData.push(data);
                       tmpTab.listData.forEach(function(data,listIndex){
                           // 为了避免后面的覆盖前面 所以筛选出没有设置的才进行url设置
                            if(!data.url){
                               data.url = "#/" + listBigType + "/" + listDataType + "/" + data.id;
                            }
                       })
                   } // END 匹配
               })
           });  // END singleFile

          tmpTab.listCount = tmpTab.listData.length; // 先将搜索总数统计下
          // listData为总数据
          // pageItem为分页每页数据
          // pageDataTemp为当前显示的临时数据

          listPager = Pager(tmpTab.listData,5);

          tmpTab.pages = listPager; // 分页大对象

          tmpTab.listData = listPager.pageDataTemp;//将数据更新为分页列表数据
          tmpTab.pages._pageLoad = function(index){
              listPager.loadPage(index);  // 每点击一下就读取一次
              tmpTab.listData = listPager.pageDataTemp; // 更新数据
          }


          if($scope.tabs.length < (posIndex+1)){  // 第一次时推入
              $scope.tabs.push(tmpTab);  // 为空时
          }else{  // 如果已存在 则更新替换
              $scope.tabs.splice(posIndex,1,tmpTab)
          }


     }// end _match

      function getData(type,dataType){
         if(Object.prototype.toString.call(dataType) != "[object Array]"){
             alert("参数类型错误");
             return false;
         };


        var promises = dataType.map(function(eachData){  // 循环处理
          return ReqLoader.get({type:type,typeData:eachData.navType}).$promise;
        });  // 单个返回$promise对象以便于all处理 ，不写$promise的话返回的是整个$resource资源 无法获取到正确的数据
        return $q.all(promises);
      }; // end getData


        if(keyWord !== oldWord){  // 新旧对比 如果关键词不变 则按原样子 不执行搜索
           _startSearch(searchOption);
        }
        if(!hasInArray($scope.searchWord,$scope.hotWords)){
            $scope.hotWords.splice(0,0,$scope.searchWord); // 没重复值 插入
            $scope.hotWords.splice($scope.hotWords.length-1,1); // 去掉末尾项
        };
        console.log( $scope.hotWords)
        oldWord = keyWord; // 更新旧关键词
    } // end $scope.search
    function hasInArray(word,item){  // 判断是否存在某数是否存在某数组中
        for(var i=0;i< item.length;i++){
            if(word == item[i]){
                return true;
            }
        }
        return false;
    } // end hasInArray
});

//搜索控制
bulbCtrl.controller('bulbSearchCtrl',function($scope,$location,$routeParams){
    $scope.currIndex = 0;
    $scope.search($routeParams.word);  // 跳转/刷新 到搜索页时初始化搜索
    $scope.changeTab = function(index){
        $scope.currIndex = index;
    }
});

//首页index区域
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

    $scope.pItems = [
        {
            "img":"img/index-product/p1.jpg",
            "txt":"玄关过道"
        },
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
bulbCtrl.controller('bulbNewsCtrl',function($scope,ResManage){
    var typeImgOpt = {
        imgDir:'img/list-type/',
        imgExtName:'.jpg',
        typeData:$scope.newsType
    };
    ResManage.setTypeImg(typeImgOpt);
});
bulbCtrl.controller('bulbSideCtrl',function($scope,$routeParams,$location){
    var sideNavIndex = 0;
    var sideTypeData = {};
    if($location.path().indexOf('news') > -1){
        sideTypeData = {
            typeTxt : "新闻中心NEWS",
            sideNavs : $scope.newsType
        };
    }else{
        sideTypeData = {
            typeIcon : "glyphicon-tint",
            typeTxt : "产品中心",
            sideNavs : $scope.productsType
        };
    };
    $scope.Side = sideTypeData;
    $scope.activeSideNav = function(index){
        sideNavIndex = index;
        var nowPath = $routeParams.type;
        var nowUrl = $scope.Side.sideNavs[index].navUrl;

        if(nowUrl.indexOf(nowPath) !=-1){  // 根据url和path是否匹配来定位当前
            return true;
        }else{
            return false;
        }
  } // end activeSlideNav
});
bulbCtrl.controller('bulbNewsListCtrl',function($scope,$routeParams,newsData,Pager){
    var newsType = $routeParams.type;
    $scope.newsTypeUrl = newsType;
    $scope.Pages = Pager(newsData,2); // 分页数据
    $scope.newLists = $scope.Pages.pageDataTemp; // 列表数据
});
bulbCtrl.controller('bulbNewsDetailCtrl',function($scope,$routeParams,newsData){
          $scope.newDetails = newsData[$routeParams.id - 1];
//          if($scope.newDetails.content){
//              $scope.content = $scope.newDetails.content;
//          }
});

//产品
bulbCtrl.controller('bulbProductsCtrl',function($scope,ResManage){
    var typeImgOpt = {
        imgDir:'img/product-type/',
        imgExtName:'.jpg',
        typeData:$scope.productsType
    };
    ResManage.setTypeImg(typeImgOpt);
});
bulbCtrl.controller('bulbProductsListCtrl',function($scope,$routeParams,productsData,Pager){
    var nowType = $routeParams.type;
    $scope.Pages = Pager(productsData,4)
    $scope.pLists = $scope.Pages.pageDataTemp;
    $scope.productsType.forEach(function(p,index){
            if(p.navType.indexOf(nowType) > -1){
               $scope.nowTypeName = p.navName;  //取标题
               $scope.nowType = p.navType;
                return false;
            }
    });
});
bulbCtrl.controller('bulbProductsDetailCtrl',function($scope){

});
