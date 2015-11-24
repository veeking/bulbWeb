/**
 * Created by king on 2015/8/31.
 */

// directive

 var bulbDirective = angular.module('bulbDirective',[]);

 bulbDirective.directive('carousel',function(){
    return{
        restrict:"AE",
        replace : true,
        transclude:true,
        template:"<div class=\"carousel\">" +
            "<ul class=\"carousel-inner\" ng-transclude></ul>"+
            "<div class=\"carousel-index row\">" +
            "<a ng-class=\"{selectActive:slideActive($index)}\" ng-repeat=\"slide in slides track by $index\" ng-click=\"select($index)\" style='cursor: pointer;'>■</a>" +
            "</div>" +
            "</div>",
        controller : function($scope,$timeout,$attrs){
            var carousel = this;
            carousel.currIndex = 0;
            carousel.interval = $attrs.interval;
            carousel.select = $scope.select = function(index){
                carousel.currIndex = index;
            } // end select
            carousel.slideActive = $scope.slideActive = function(index){
                return (index === carousel.currIndex);
            }// end indexIsActive

            function startNext(){
                $timeout(function(){
                    goNext();
                    startNext();
                },carousel.interval)
            } // end startTimeout
            function goNext(){
                if(carousel.currIndex < $scope.slides.length-1){
                    carousel.currIndex++;
                }else{
                    carousel.currIndex = 0
                }
            }  // end goNext
            startNext();
        }
    }
 });
 bulbDirective.directive('slide',function(){
    return{
        restrict:"AE",
        replace : true,
        transclude:true,
        require:"^carousel",
        template:"<li ng-class=\"{slideActive:slideActive($index)}\" ng-transclude></li>"
    }
 });

bulbDirective.directive('formatSection',function(){  // 格式化文章内容
    return{
       restrict:"A",
       replace : true,
       transclude : true,
       template:"<div ng-transclude>{{cont}}</div>",
       scope:{
           cont:"=formatSection" // 对应指令结果值
       },
       controller : function($scope,$attrs){
           this.parseDom = function(strDom){  // 将没有p标签包围的文字围起来
               var domDiv = document.createElement('div');
               var nodeBox = [];  // 转换成数组 ，以便使用splice等数组操作API
               var i;
               domDiv.innerHTML = strDom;
               nodeBox = [].slice.apply(domDiv.childNodes); //将NodeList转换成数组
               for(i=0;i<nodeBox.length;i++){
                  if(nodeBox[i].nodeName.toLowerCase() != "p"){  //p标签包围普通
                      var tmpP = document.createElement('p');
                      var textIndex = i;
                      tmpP.appendChild(nodeBox[i]);
                      nodeBox.splice(textIndex,1,tmpP); // 替换掉原来没有p标签的DOM对象
                  }
               };  // end for
               return nodeBox;
           }
       },
       link : function(scope,element,attrs,sectionCtrl){
              // 因为是接收内容是异步请求，所以需要监控变量是否发生变化
              var unwatch = scope.$watch('cont',function(content){
                    if(content){ //一共会执行两次  为了避免第一次出现undefined，需要判断是否不为undefined，接收到时取消监控
                      unwatch();//第一次是异步还没返回内容的时候undefined，第二次是成功接收到内容后
                      var sections = sectionCtrl.parseDom(content);
                        angular.forEach(sections,function(section){  //遍历并插入数据到DOM中
                          element.append(section);
                      });
                    }  // end if
                });
       }// end link
    } // end return
});

bulbDirective.directive('adaptHeight',function($rootScope){
    var pageHeight;
    var searchTab;
    var maxHeight = 0;
    $rootScope.$on('$locationChangeStart',function(){
        maxHeight = 0; // 如果路由发生了变化，则清空最大值，以便用于下一组的对比
    });
    return{
        restrict:"A",
        link : function(scope,element,attr){
            scope.$watch('$last',function(oldEle){
                if(scope.$last){ // 筛选出 每组最后元素
                    searchTab = angular.element(element[0].parentNode.parentNode.parentNode.parentNode.querySelector('.tab'))[0];
                    if(pageHeight == undefined){  // 分页高度
                        pageHeight = parseInt(angular.element(element[0].parentNode.parentNode.querySelector('.search-page'))[0].offsetHeight);
                    };
                    var aHeight = (element[0].scrollHeight + 50) + element[0].offsetTop +pageHeight;
                    if(aHeight > maxHeight){
                       maxHeight = aHeight;  // 两组 对比 找出最大值
                    };
                    searchTab.style['height'] = maxHeight + 'px';
                }
            })

        }
    }
});


bulbDirective.directive('realSrc',function($window,$timeout,ResManage){
    var loadClass = "loadingImg";
    var hideloadClass = "hideLoadingImg";
    function onLoad(element){ // src每成功加载一次 就替换掉隐藏加载图标
        angular.element(element[0].parentNode.querySelector('.' + loadClass)).addClass(hideloadClass);
        element.css('opacity',1);
    }  // end onLoad
    return{
        restrict:"A",
        scope:{
            realSrc:"@"  // 将realSrc值单项绑定到控制器里
        },
        link:function(scope,element){
            var parentEle = element.parent();
            var laodEle = document.createElement('img');
            laodEle.src = "img/loading.gif";
            laodEle.className = loadClass;
            parentEle.append(laodEle);
            element.bind('load',function(){
                // 不能用this,this指向了html标签本身，而我们需要传入的是jqlite对象
                onLoad(element); //src更新一次传入当前element，以便删掉原先未加载element
            });
            scope.$watch('realSrc',function(){ // 监听控制器异步加载的图片列表数据的更新
               element.attr('src',scope.realSrc); // 成功加载图片后设置真实图片地址
            });
            //说明:当DOM元素从页面中被移除时,将会在scope中触发$destory事件
            scope.$on('$destroy', function(){
                element.unbind('load');
            });
        } // end link
    }
});
bulbDirective.directive('slideExpand',function($timeout){
    return{
        restrict:"A",
        link:function(scope,element,attr){
            var toggle = false;
            var slideBtn = angular.element(element[0].parentNode.querySelector('.' + attr.slideExpand));
            slideBtn.bind('click',function(){
                toggle = !toggle;
                element[0].style['height'] = toggle?element[0].scrollHeight + 'px':0;
               });
        }
    }
});

bulbDirective.directive('accordion',function(){
    return {
        restrict:"EA",
        replace:true,
        transclude:true,
        template:"<div ng-transclude></div>",
        controller:function($scope){
            var expands = [];
            this.addExpand = function(expand){
                 expands.push(expand);
            }
        } // end controller
    }
});
bulbDirective.directive('expander',function(){
    return {
        restrict:"EA",
        replace:true,
        transclude:true,
        require:"^?accordion",
        scope:{
            title:"=expanderTitle"
        },
        template:"<div class='expand'>" +
            "<div class='expand-top'><span class='expand-top-point' ng-class='{active:toggleShow}' ng-click='toggleExpand()'>+</span><h4>{{title}}</h4></div>" +
            "<div class='expand-content' ng-model='toggleShow' ng-transclude>" +
            "</div><!--end expand-content-->" +
            "</div>",
        link:function(scope,element,attr,accrodionCtrl){
             scope.toggleShow = false;
             var slideCont = angular.element(element[0].querySelector('.expand-content'));
             var slidePoint = angular.element(element[0].querySelector('.expand-top-point'));
             accrodionCtrl.addExpand(scope);
             scope.toggleExpand = function(){
                 scope.toggleShow = !scope.toggleShow;
                 scope.toggleShow?slidePoint.html('-'):slidePoint.html('+'); // 切换+-图标
                 slideCont[0].style['height'] = scope.toggleShow?slideCont[0].scrollHeight + 'px':0;
             }
        } // end link
    }
});

bulbDirective.directive('backTop',function() {
    return{
        restrict: "A",
        link:function(scope,element,attr){
            element.bind('click',function(){
                window.scrollTo(0,0);
           })
        }
    }
});
bulbDirective.directive('contactMap',function($q,$window,$http,angularMap){
    return{
        restrict: "E",
        transclude: true,
        replace: true,
        template: "<div id='mapBox' ng-transclude></div>",
        controller: function () {
            this.initMap = angularMap.initMap;
        },
        link: function (scope, element, attr, mapCtrl) {
            var pos = {
                lng:113.121191,
                lat:23.024436
            };
            var loadMapScript = function(){
                      var mapScript = document.createElement('script');
                      var mapScriptDom;
                      mapScriptDom = document.getElementById('mapScript');
                      mapScript.type = 'text/javascript';
                      mapScript.id = "mapScript";
                      mapScript.src = "http://api.map.baidu.com/api?v=1.5&ak=uRQK0TQ85K4IZUKzFqLsiLz7&callback=mapInit";
                     if(mapScriptDom != null){  // 有重复的话替换掉
                        document.body.replaceChild(mapScript,mapScriptDom);
                     }else{
                        document.body.appendChild(mapScript);
                     }
             }
            loadMapScript();
            $window.mapInit = function(){  // 定义全局地图回调方法，局部方法不会被地图api调用
               mapCtrl.initMap('mapBox',pos);
            }
        } // end link
    }
})