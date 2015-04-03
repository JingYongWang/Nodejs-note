/*
var http = require("http");  //請求（require）Node.js自帶的 http 模組，並且把它賦值給 http 變數
 
http.createServer(function(request, response){  //http模組提供的函數： createServer 我們向 createServer 函數傳遞了一個匿名函數。
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World!");
  response.end();

}).listen(8888);

*/

/*  一樣的效果
var http = require("http");

function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);


*/

/*
var http = require("http");

function onRequest(request, response) {  //onRequest （我們的回呼(callback)函數）觸發的地方
  console.log("Request received.");      //我用 console.log 輸出了一段文字。在HTTP伺服器開始工作之後，也輸出一段文字。
  response.writeHead(200, {"Content-Type": "text/plain"});  //函數發送一個HTTP狀態200和HTTP頭的內容類型（content-type）
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);

console.log("Server has started.");

*/

/*

var http = require("http");   //Node.js中自帶了一個叫做 "http" 的模組，我們在我們的程式碼中請求它並把回傳值賦給一個區域變數。
  function start(){
    function onRequest(request, response){
      consle.log("Request received");
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Hello World");
      response.end();
          }
      http.createServer(onRequest).listen(8888);
      console.log("Server has start.");
}

  exports.start = start;


*/

//把某段程式碼變成模組意味著我們需要把我們希望提供其功能的部分 匯出 到請求這個模組的腳本。

//處理不同的HTTP請求在我們的程式碼中是一個不同的部分，叫做 "路由選擇" 


//用來找出瀏覽器請求的URL路徑
//我們的應用現在可以透過請求的URL路徑來區別不同請求了

/*
var http = require("http");
var url = require("url");

function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;


*/

//上面下面差在start()裡面有無放入route函數作為參數傳遞過去


/*

var http = require("http");
var url = require("url");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;


*/


//這樣我們就在start()函數裡增加了handle參數，並且把handle物件作為第一個參數傳遞給了route()回呼(callback)函數。

/*

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(handle, pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}


*/

/*

exports.start = start;

var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        response.writeHead(200, {
            "Content-Type": "text/plain"
        });
        var content = route(handle, pathname)
        response.write(content);
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;

*/

/*
var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;

*/


/*
var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });

  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;

*/

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;