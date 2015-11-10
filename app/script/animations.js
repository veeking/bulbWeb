/**
 * Created by king on 2015/11/8.
 */
  var bulbAnimate = angular.module('bulbAnimate',['ngAnimate']);
   bulbAnimate.animation('.slideImg', function() {
       var slideIn = function(element, className, done) {
           if(className != 'active') {
               return;
           }
           element.css({
               left: 800,
               display:'block'
           });

           jQuery(element).animate({
               left:0
           }, done);

           return function(cancel) {
               if(cancel) {
                   element.stop();
               }
           };
       }

       var slideOut = function(element, className, done) {
           if(className != 'active') {
               return;
           }
           element.css({
               left: 0,
           });

           jQuery(element).animate({
               left: -800
           }, done);

           return function(cancel) {
               if(cancel) {
                   element.stop();
               }
           };
       }

       return {
           addClass: slideIn,
           removeClass: slideOut
       };
   });
