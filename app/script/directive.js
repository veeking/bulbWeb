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