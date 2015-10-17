/**
 * Created by king on 2015/9/13.
 */
var bulbService = angular.module('bulbService',['ngResource']);
bulbService.factory('DataLoad',function($resource){
    return $resource('data/:type/:typeData.json',{},{
        get: {isArray: true ,cache:true}
    }); // 注意路径也是相对于main.html位置来定位的
});

//bulbService.factory('bulbData',function($q,DataLoad){
//    var loaded = false;
//
//    var saveKey = function(keyWord){
//        keyWord
//    }
//    var getData = function(type,dataType){
//        console.log(dataType)
//        var promises = dataType.map(function(eachData){
//            return DataLoad.get({type:type,typeData:eachData.navType}).$promise;
//        });
//        return $q.all(promises);
//    }
//    return{
//      loaded : loaded,
//      getData :getData
//    }
//});

//Pager服务三大要素:
// @var pageItem 是分页页数
// @var pageDataTemp 是当前页的列表数据
// @fun _calLoad() 是处理数据方法
bulbService.factory('Pager',function($routeParams,$route,$location){
    return function(pageData,pageCount){
        var Pager = {
            currPage : 1,
            sizePage : pageCount,
            dataLen : pageData.length,
            pageLen : 0,
            pageItem : null,  // 页数：总列表数据，用于生成数字连接
            pageDataTemp : null,  //页数据： 临时显示的列表数据
            isPageParams:false, //  如果url有page参数的话 page参数也跟着一起变化
            _changeIndex : function(pageIndex){
                this.currPage = pageIndex;
                if(this.isPageParams){
                    $location.search('page',this.currPage);  //url跳转，会调用一次calLoad
                }else{
                    this._calLoad();  //  不是url跳转的话，直接调用更新数据
                }
            },
            _calLoad : function(){
//                console.log($location.search().page);
                if($location.search().page){ //如果url有page参数的话,那么curr索引将变成page参数值
                     this.currPage = parseInt($routeParams.page); // curr更新为跳转值
                     this.isPageParams = true;
                };

                var _calLoadPage = (this.currPage - 1) * pageCount; // 读取规律0 , 2 , 4
                this.pageLen = Math.ceil(this.dataLen / pageCount);
                this.pageItem = pageData.slice(0,this.pageLen);

                this.pageDataTemp = pageData.slice(_calLoadPage, _calLoadPage + pageCount);  // 0,2  2,4  4,6

            },
            indexPage : function(){
                this._changeIndex(1);
            },
            lastPage : function(){
                this._changeIndex(this.pageLen);
            },
            nextPage : function(){
                if(this.currPage < this.pageLen){
                    this._changeIndex(++this.currPage);
                }
            },
            prevPage : function(){
                if(this.currPage > 1){
                  this._changeIndex(--this.currPage);
                }
            },
            loadPage : function(pageIndex){
               this._changeIndex(pageIndex);
            },
            pageActive : function(index){
                return this.currPage === index;
            }
        } // end pages
        Pager._calLoad();  // 默认调用一次 加载第一页
        return Pager;
    } // end function
});

// 备份
//bulbService.factory('Pager',function($routeParams,$location){
//    return function(pageData,pageCount){
//        var Pager = {
//            currPage : parseInt($routeParams.page),
//            sizePage : pageCount,
//            dataLen : pageData.length,
//            pageLen : 0,
//            currentPageItems : 0,
//            pageItem : null,  // 页数：总列表数据，用于生成数字连接
//            pageDataTemp : null,  //页数据： 临时显示的列表数据
//            _calLoad : function(){
//
//             this.pageLen = Math.ceil(this.dataLen / pageCount)
//             this.currentPageItems = pageData.slice(0,this.pageLen)
//             this.pageItem = this.currentPageItems;
//
//             var _calLoadPage = (this.currPage - 1) * pageCount; // 读取规律0 , 2 , 4
//             this.pageDataTemp = pageData.slice(_calLoadPage, _calLoadPage + pageCount);  // 0,2  2,4  4,6
//
//            },
//            indexPage : function(){
//                $location.search('page',1);
//            },
//            lastPage : function(){
//                $location.search('page',this.pageLen);
//            },
//            nextPage : function(){
//                if(this.currPage < this.pageLen){
//                    $location.search('page',++this.currPage);
//                }
//            },
//            prevPage : function(){
//                if(this.currPage > 1){
//                    $location.search('page',--this.currPage);
//                }
//            },
//            loadPage : function(pageIndex){
//                $location.search('page',pageIndex);
//            },
//            pageActive : function(index){
//                return this.currPage === index;
//            }
//       } // end pages
//        Pager._calLoad();  // 默认调用一次 加载第一页
//        return Pager;
//    } // end function
//});
//bulbService.factory('news')
//



