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

bulbDirective.directive('sectionFormat',function(){  // 格式化文章内容
    return{
       restrict:"A",
       replace : true,
       transclude : true,
       template : "<div ng-transclude>{{cont}}</div>",
       scope:{
           cont:"=sectionFormat"
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
    var maxHeight = 0;
    $rootScope.$on('$locationChangeStart',function(){
        maxHeight = 0; // 如果路由发生了变化，则清空最大值，以便用于下一组的对比
    });
    return{
        restrict:"A",
        link : function(scope,element,attr){
            scope.$watch('$last',function(oldEle){
                 if(pageHeight == undefined){
                    pageHeight = parseInt($('.search-page').css('height'));
                 };

                if(scope.$last){ // 筛选出 每组最后元素
                    var aHeight = (element[0].offsetHeight + 50) + element[0].offsetTop +pageHeight;
                    console.log('我是aheight' + aHeight)
                    if(aHeight > maxHeight){
                       maxHeight = aHeight;  // 两组 对比 找出最大值
                    };
                    console.log('我是maxHeight' + maxHeight)
                    $('.tab').css('height',maxHeight); //取最大值作为高度

                }
            })

        }
    }
})