
/*
	var server = require("./server.js");
	var router = require("./router");
	
	server.start(router.route);

*/

/*

這樣，我們現在就可以建立我們的主檔案 index.js 並在其中啟動我們的HTTP了，雖然伺服器的程式碼還在 server.js 中。

建立 index.js 檔案並寫入以下內容：

我們可以像使用任何其他的內置模組一樣使用server模組：請求這個檔案並把它指向一個變數，其中已匯出的函數就可以被我們使用了。

var server = require("./server");

server.start();

*/

//handle並不僅僅是一個 "東西" （一些請求處理程序的集合）
//將不同的URL映射到相同的請求處理程序上是很容易的：只要在物件中增加一個鍵為"/"的屬性，對應requestHandlers.start即可
//這樣我們就可以乾淨簡潔地配置/start和/的請求都交由start這一處理程序處理。

/*
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);



*/


var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);






