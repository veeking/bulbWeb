
/**
 * BULB APP
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var Q = require('q');
var app = express();

// all environments
app.set('port', process.env.PORT || 8081);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/app/'))); // 所有静态文件的根目录，这里设为根目录下的文件夹

app.get('/',function(req,res){
    res.sendfile(__dirname + '/app/main.html');
});

var liveMsgBox = [];
var filePath = __dirname + '/app/data/message/msg.json';
function writeFile(filePath,writeData){
    var defer = Q.defer();
    fs.writeFile(filePath,writeData,function(err){
        if(err){
            defer.reject(err.message);
            return;
        }
        defer.resolve('OK.file has write');
    })
    return defer.promise;
}
function readFile(filePath){
   var defer = Q.defer();
   fs.readFile(filePath,'utf-8',function(err,data){
      if(err){
         defer.reject(errMsg);
         throw err;
      }
       console.log(data)
       defer.resolve(data);
   });
    return defer.promise;
}
function hasInArray(item,arr){
    for(var i=0;i<arr.length;i++) {
        if(JSON.stringify(arr[i]) === JSON.stringify(item)){
            return true;
        }
    }
    return false;
}
app.get('/getMessage',function(req,res){
    readFile(filePath).then(function(data){
        res.send(data);
    },function(errMsg){
        res.end(errMsg);
    })
})
app.post('/sendMessage',function(req,res){
    if(liveMsgBox.length > 0){
        if(!hasInArray(req.body,liveMsgBox)){
            liveMsgBox.push(req.body);
        }else{
            var repeatErr = new Error();
            repeatErr.message = "重复";
            throw repeatErr.message;
        }
    }else{
        liveMsgBox.push(req.body);
    };
    writeFile(filePath,JSON.stringify(liveMsgBox)).then(function(successMsg){
        console.log(successMsg);
        res.end(successMsg);
    });
    req.on('error', function(e){
        res.end(e.message);
    });
});
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});


