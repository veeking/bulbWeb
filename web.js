
/**
 * BULB APP
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/'))); // 其他静态文件的目录，这里设为根目录下的文件夹

app.get('/',function(req,res){
    res.sendfile(__dirname + '/views/index.html');
})
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});


