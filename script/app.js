/**
 * Created by veeking on 2015/7/27.
 */
var bulbApp = angular.module('bulbApp',['ui.bootstrap']);
bulbApp.controller('carouselDemoCtrl',function($scope){
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];
    $scope.addSlide = function(){
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image : "//placekitten.com/" + newWidth + "/300",
            text : ['More','Extra','Lost of','Surplus'][slides.length % 4] + '' + ['Cats','Kittys','Felines','Cutes'][slides.length % 4]
        });
    };
    for(var i=0;i<4;i++){
        $scope.addSlide();
    }
});  // end controller