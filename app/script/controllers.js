
// controller

var bulbCtrl = angular.module('bulbCtrl',[]);
bulbCtrl.controller('bulbMainCtrl',function($scope,$location,$timeout,$q,Pager,GetData){
    $scope.moveCurrent = -1;
    $scope.moveSelect = function(index){ // 移动导航
        $scope.moveCurrent = index;
        $scope.showNav = false; //  每次点击导航后 导航栏隐藏
    };

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
        {"navId":2,"navName":"简 介","navUrl":"about","navChild":[]},
        {"navId":3,"navName":"资 讯","navUrl":"news","navChild":$scope.newsType},
        {"navId":4,"navName":"产 品","navUrl":"products","navChild":$scope.productsType},
        {"navId":5,"navName":"联系我们","navUrl":"contact","navChild":[]}
    ];
   //数据依赖说明
    // [searchOption搜索数据依赖 分类数据和列表数据]
    // [分类数据-》依赖列表数据文件名]
    // 列表数据 无依赖
     //搜索
    $scope.tabs = [];
    $scope.hotWords = ["LED","新闻","产品","家居产品","传统灯光","服务","照明方案","新型灯泡"]; // 默认列表
    $scope.search = function(){
      if($scope.searchWord ==" ") return false;
      if(arguments[0] != undefined){ //页面刷新的时候传入的参数值
         $scope.searchWord = arguments[0];
      };
      var keyWord = $scope.searchWord;
      var oldWord = null;
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
      localStorage.clear();
      function _startSearch(options){   // 执行搜索 :1、获取数据  2、匹配数据
           $scope.loaded = false; // 加载中图标
           options.map(function(option,index){
                //缓存  还是推荐用localStorge吧  $cacheFactory不建议存储大容量的内容
                var cacheData = localStorage.getItem('searchData_'+option.showType);
                if(!cacheData){
                    console.log('搜索数据没缓存')
                    GetData.getAllData(option.showType,option.showTypeData).then(function(singleFile){
                        var stringData = JSON.stringify(singleFile);  //
                        localStorage.setItem('searchData_'+option.showType,stringData); // 0,1分别对应像一个的新闻和产品缓存
                        _matchData(option,singleFile,index)
                    });
                }else{
                    console.log("搜索数据有缓存")
//                    $timeout(function(){  // 模拟加载
                        cacheData = JSON.parse(cacheData);
                        _matchData(option,cacheData,index);
//                    },1000)
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


          if($scope.tabs.length < (posIndex+1)){  // 第一次为空时推入
              $scope.tabs.push(tmpTab);
          }else{  // 如果已存在 则更新替换
              $scope.tabs.splice(posIndex,1,tmpTab)
          }


     }// end _match



        if(keyWord !== oldWord){  // 新旧对比 如果关键词不变 则按原样子 不执行搜索
           _startSearch(searchOption);
        }
        if(!hasInArray($scope.searchWord,$scope.hotWords)){
            $scope.hotWords.splice(0,0,$scope.searchWord); // 没重复值 插入
            $scope.hotWords.splice($scope.hotWords.length-1,1); // 去掉末尾项
        };
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
bulbCtrl.controller('bulbIndexCtrl',function($scope,$timeout,GetData){
    var bigType = 'news';
    var twoType;
    var loadCache = localStorage.getItem('searchData_'+ bigType);
    var indexHotData = [];
    var indexOtherData = [];
    var indexSlideData = [];
    var preUrl;

    localStorage.clear();
    if(!loadCache){
        console.log('首页数据无缓存');
        GetData.getAllData(bigType,$scope.newsType).then(function(singleDirData){
           var stringData = JSON.stringify(singleDirData);
           localStorage.setItem('searchData_'+bigType,stringData);
           _setIndexData(singleDirData);
        });
    }else {
        console.log('首页数据有缓存');
        loadCache = JSON.parse(loadCache);
        _setIndexData(loadCache);
//        console.log(loadCache);
    } // end loadCahe


    function _setIndexData(dirData){
        dirData.forEach(function(singleFileData,dIndex){
            twoType = $scope.newsType[dIndex].navType;
            preUrl = "#/" + bigType + "/" + twoType + "/";
            indexOtherData.push({content:singleFileData[0].content});
            indexSlideData.push(
                {
                    src:singleFileData[0].imgCollect[0],
                    txt:singleFileData[0].title,
                    url:preUrl + singleFileData[0].id
                });
            singleFileData.forEach(function(eacheData,sIndex){
                if(dIndex == 0){
                    var url = preUrl + eacheData.id;
                    indexHotData.push({
                       title:eacheData.title,
                       url:url
                    })
                }
            })// end singleFileData for

        }); // end dirData for

        $scope.otherNews = indexOtherData;
        $scope.hotNews = indexHotData;
        $scope.slides = indexSlideData;
    } //end setIndexData

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

    $scope.pItems = [
        {
            "img":"img/index-product/p1.jpg",
            "txt":"传统",
            "url":"#/products/p2?page=1"
        },
        {
            "img":"img/index-product/p2.jpg",
            "txt":"户外",
            "url":"#/products/p4?page=1"
        },
        {
            "img":"img/index-product/p3.jpg",
            "txt":"卧室",
            "url":"#/products/p5?page=1"
        },
        {
            "img":"img/index-product/p4.jpg",
            "txt":"公共",
            "url":"#/products/p1?page=1"
        },
        {
            "img":"img/index-product/p5.jpg",
            "txt":"家居",
            "url":"#/products/p3?page=1"
        }
    ]

});  // end controller
bulbCtrl.controller('bulbAboutCtrl',function($scope){
        $scope.aboutInfos = [
            {
              title:"企业文化",
              content:"企业文化是企业传承和发展的基因。今天我们正面临愈加激烈的全球化竞争，企业不仅要在技术、产品、市场、资本等方面展开竞争，更要形成有竞争力的人文优势，不断的通过吸收与融合，使组织进行系统的提升和修正，以适应更加复杂多变的竞争环境并获得持续的发展空间。bulb倡导具有的包容性和开放性的企业文化，强调团队协作，同时激励创新。"
            },
            {
                title:"技术实力",
                content:"bulb照明专注于LED应用领域关键技术研发，独步创新多项专利技术，打造符合国际水准的高效LED照明系列产品，已实现多项业界领先核心技术突破，拥有最先进的关键LED照明专利技术,目前已申请20余项专利，在灯具结构、散热系统、发光角度等方面均实现行业领先。"
            },
            {
                title:"品牌理念",
                content:"光环境专家”是bulb的品牌核心理念，bulb以专业、专注的精神，为客户创造优美、舒适、安全、节能的光环境，为客户提供优质的照明应用解决方案，并以已之力，推动照明产业健康、快速的向前发展。持续、有效的品牌推广不断积累和提高bulb的品牌价值，bulb品牌被社会各界广泛认知、认同和喜爱，在国际国内各大专业展会上。bulb的高端品牌形象，吸引了行业以及社会各界的目光。"
            },
            {
                title:"生产基地",
                content:"强大的生产制造能力是bulb的核心竞争优势，产品丰富、品类齐全、规模庞大的bulb制造体系形成，支撑bulb的产业扩张和市场拓展。广东惠州bulb工业园、重庆万州bulb工业园、浙江江山基地和上海青浦基地相继投入使用，bulb照明完成在全国的战略布局。"
            }
        ];
    $scope.aboutPrimarys= [
        {
           name:"LED",
           count:80
        },
        {
            name:"室内灯泡",
            count:90
        },
        {
            name:"室外灯泡",
            count:85
        },
        {
            name:"照明电器",
            count:70
        }
    ]
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
    $scope.isMenuHide = true;
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
    var nowType = $routeParams.type;
    $scope.newsType.forEach(function(n){
        if(n.navType == nowType){
            $scope.newsTypeName = n.navName;  //取标题
            $scope.newsTypeUrl = nowType;
            return false;
        }
    });
    $scope.Pages = Pager(newsData,8); // 分页数据
    $scope.newLists = $scope.Pages.pageDataTemp; // 列表数据
});
bulbCtrl.controller('bulbNewsDetailCtrl',function($scope,$routeParams,newsData){
          $scope.newDetails = newsData[$routeParams.id - 1];
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
    $scope.Pages = Pager(productsData,16)
    $scope.pLists = $scope.Pages.pageDataTemp;
    $scope.productsType.forEach(function(p){
            if(p.navType == nowType){
               $scope.nowTypeName = p.navName;  //取标题
               $scope.nowType = nowType;
               return false;
            }
    });
});
bulbCtrl.controller('bulbProductsDetailCtrl',function($scope,$routeParams,productsData){
        $scope.pDetail = productsData[$routeParams.id - 1];
        $scope.mainImg = $scope.pDetail.imgCollect[0];//默认主图显示第一章
        $scope.setImage = function(img) {
              $scope.mainImg = img;
        };
});

bulbCtrl.controller('bulbContactCtrl',function($scope,$timeout,$http){
    $scope.sendStatus = {
          success : false,
          error : false,
          disOn:false,
      }

    $scope.sendMsg = function(){
          $scope.sendStatus.disOn = true;
          $http.post('/sendMessage',$scope.contactForm).success(function(msg){
              $scope.sendStatus.success = true;
              $scope.sendStatus.disOn = false;
          }).error(function(errData){
              $scope.sendStatus.error = true;
              $scope.sendStatus.disOn = false;
              $scope.errMsg = errData;
          });
          $timeout(function(){
            $scope.sendStatus.success = false;
            $scope.sendStatus.error = false;
          },800);
      }
});
//
bulbCtrl.controller('bulbMessageCtrl',function($scope,loadMsg){
    loadMsg().then(function(msgData){
         $scope.msgs = msgData;
    },function(errData){
         $scope.msgErrData = errData;
    });
});
