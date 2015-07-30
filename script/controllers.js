
  testApp.controller('listCtrl',function($scope,$http,getJson){
          var promise = getJson.getData();
          promise.then(function(data){
              $scope.newObjs = data;
          });

  });
 testApp.controller('detailCtrl',function($scope,$routeParams,getJson){
     $scope.newList = {};
     $scope.newList.id = $routeParams.id;
     var promise = getJson.getData();
     promise.then(function(data){
         $scope.newList.content = data[$routeParams.id - 1].content;  //问题： 不会及时更新
     });
 });


testApp.service('getJson',function($http,$q){
       var defferred = $q.defer();
       $http.get('json/list.json').success(function(data){
             defferred.resolve(data);
       });
       this.getData = function(){
            return defferred.promise;
       };
});