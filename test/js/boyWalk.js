/**
 * Created by king on 2015/9/24.
 */

 function BoyWalk(){
    var container = $('.container');
    var visualWidth = container.width(); // 可视区域
    var visualHeight = container.height();

    var boy = $('#boy');
    var boyWidth = boy.width();
    var boyHeight = boy.height();

    var getValue = function(className){
        var element = $(className);
        return{
            top:element.position().top,
            height:element.height()
        }
    }// end getValue

    var pathY = function(){  // 用于初始化人物在道路上的位置
        var pathEle = getValue('.middle')
        return pathEle.top + pathEle.height/ 2
    }();
    boy.css({  //  初始化人物位置
        top: pathY - boyHeight
    });

    var startRun = function(option,runTime){
        var $q = $.Deferred();
        boy.transition(option,runTime,'linear',function(){
            $q.resolve();
        });
        return $q;
    }
    var walkRun = function(distX,distY,time){
        time = time | 2000;
        var runAni = startRun({
            'left':distX + 'px',
            'top' :distY ? distY + 'px' : undefined
        },time)
        return runAni;
    }
    var calculateDist = function(directions,proportion){
       return (directions === 'x'?visualWidth:visualHeight) * proportion;
    };  // 人物相对页面的位置  移动到中间的话1/2 也就是0.5
    return{
        walkTo:function(time,propX,propY){
            var distX = calculateDist("x",propX);
            var distY = calculateDist("x",propY);
            return walkRun(distX,distY,time)
        }
    }
} // end BoyWalk