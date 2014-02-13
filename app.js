var express = require("express");
var logger = require("log4js").getLogger("app.js");
//var fs = require("fs"); 
var http = require("http");
var nodejieba = require("nodejieba");
var app = express();

nodejieba.loadDict("./node_modules/nodejieba/dict/jieba.dict.utf8", "./node_modules/nodejieba/dict/hmm_model.utf8");

app.use(express.bodyParser());

app.get('/cppjieba', function(req, res){
    res.send("hhehe");
    //fs.readFile("./public/index.html", function(err, data){
    //    if(err){
    //        return err;
    //    }
    //    res.set("Content-Type", "text/html;charset=utf-8");
    //    res.send(data);
    //});
});

app.post('/', function(req, res) {
    var options = {
        host : 'localhost',
        port : '11200',
        path : '/?key=' + req.body.sentence,
        method : 'GET'
    };
    var words = nodejieba.cut(req.body.sentence);
    res.send(words);
    console.log("%s -> %s", req.body.sentence, words);
});

var port = 5000;

app.listen(port);

logger.info("Listening on port %d", port);

module.exports = app;
