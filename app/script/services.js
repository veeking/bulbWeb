/**
 * Created by king on 2015/9/13.
 */
var bulbService = angular.module('bulbService',['ngResource']);
bulbService.factory('New',function($resource){
    return $resource('data/news/:newsType.json/:id',{},{
        get: {isArray: true }
    }); // 注意路径也是相对于main.html位置来定位的
});
bulbService.factory('Pager',function($routeParams,$location){
    return function(pageData,pageCount){
        var Pager = {
            currPage : parseInt($routeParams.page),
            sizePage : pageCount,
            dataLen : pageData.length,
            pageLen : 0,
            currentPageItems : 0, // 当前页数数
            pageItem : null,  // 页数数据，用于生成数字连接
            pageDataTemp : null,  // 暴露 临时页数的列表数据
            _calLoad : function(){
             this.pageLen = Math.ceil(this.dataLen / pageCount)
             this.currentPageItems = pageData.slice(0,this.pageLen)
             this.pageItem = this.currentPageItems;

             var _calLoadPage = (this.currPage - 1) * pageCount; // 读取规律0 , 2 , 4
             this.pageDataTemp = pageData.slice(_calLoadPage, _calLoadPage + pageCount);  // 0,2  2,4  4,6
            },
            indexPage : function(){
                $location.search('page',1);
            },
            lastPage : function(){
                $location.search('page',this.pageLen);
            },
            nextPage : function(){
                if(this.currPage < this.pageLen){
                    $location.search('page',++this.currPage);
                }
            },
            prevPage : function(){
                if(this.currPage > 1){
                    $location.search('page',--this.currPage);
                }
            },
            loadPage : function(pageIndex){
                $location.search('page',pageIndex);
            },
            pageActive : function(index){
                return this.currPage === index;
            }
       } // end pages
        Pager._calLoad();  // 默认调用一次 加载第一页
        return Pager;
    } // end function
});
//bulbService.factory('news')
//



