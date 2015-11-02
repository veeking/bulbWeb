/**
 * Created by king on 2015/10/31.
 */

   var testCtrl = angular.module('testCtrl',[]);
//    testCtrl.controller('mainCtrl',function($scope){
//        $scope.navs = [
//            {
//               name:"首页",
//               url:"#/"
//            },
//            {
//                name:"新闻",
//                url:"#/news"
//            }
//        ];
//    });
     testCtrl.controller('indexCtrl',function($scope){
         $scope.navs = [
             {
                 name:"首页",
                 url:"#/"
             },
             {
                 name:"新闻",
                 url:"#/news"
             }
         ];
     });
testCtrl.controller('newsCtrl',function($scope){
        $scope.lists = [
            {
              id:1,
              name:'列表1'
            },
            {
                id:2,
                name:'列表2'
            },
            {
                id:3,
                name:'列表3'
            }
        ];
});
testCtrl.controller('newsDetailCtrl',function($scope,$routeParams){
       $scope.contentId = $routeParams.id;
});