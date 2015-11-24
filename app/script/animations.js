/**
 * Created by king on 2015/11/8.
 */
  var bulbAnimate = angular.module('bulbAnimate',['ngAnimate']);
   bulbAnimate.animation('.slideImg', function($timeout) {
       var slideIn = function(element, className, done) {
           if(className != 'active') {
               return;
           }  // -600 - 0 - 600 滑动
//           element.css('display','block');
           move(element[0]).set('display','block').translate(600,0,0).end();
           move(element[0]).translate(0,0,0).end();
       }

       var slideOut = function(element, className, done) {
           if(className != 'active') {
               return;
           }
           move(element[0]).translate(0,0,0).end();
           move(element[0]).translate(-600,0,0).end(function(){
               move(element[0]).set('display','none').translate(600,0,0).end();
           });

       }
       return {
           addClass: slideIn,
           removeClass: slideOut
       };
   });
