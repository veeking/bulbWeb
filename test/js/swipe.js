/**
 * Created by king on 2015/9/24.
 */
// 页面

 function Swipe(container){
    var slideEle = container.find(':first');
    var swipe = {};

    var slides = slideEle.find('li');

    var width = container.width();
    var height = container.height();

    var slideIndex = 0;
    //设置总宽度
    slideEle.css({
        width:(slides.length * width) + 'px',
        height:height + 'px'
    })
   //设置每一个li宽度
    $.each(slides,function(index){
        var slide = slides.eq(index)
        slide.css({
            width:width + 'px',
            height:height + 'px'
        });
    });

    //暴露出来的接口
    swipe.scrollTo = function(x,speed){
        if(slideIndex < slides.length-1){
           slideIndex++;
        }
        slideEle.css({
          'transition-timing-function':'linear',
          'transition-duration':speed + 'ms',
          'transform':'translate3d(-' + (x*slideIndex) + 'px,0px,0px)'
        });
      return this;
    }; // end scrollTo
    return swipe;
}