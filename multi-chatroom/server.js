var http = require("http"); // 內建http模組 提供http賜福端與客戶端功能

var fs = require("fs");   //內建fs模組,提供檔案系統功能

var path = require("path");  //內建path模組,提供檔案系統路徑

var mime = require("mime");

var chatServer = require('./lib/chat_server');

var cache = {}; //cache物件是快取檔案內容的地方

chatServer.listen(server);

//傳輸檔案資料以及錯誤回應


//再請求的檔案不存在的時候傳輸404錯誤
function send404(response){
	response.writeHead(404, {'content-Type': 'text/plain'});
	response.write('Error 404: resource not found');
	response.end();
}

//適當的http標頭,在傳輸檔案內容
function sendFile(response, filePath, fileContents){
	response.writeHead(200, {"content-type": mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}
//決定檔案是否被快取,如果是就提供它,如果不是就從磁碟存取,在提供它
//假如檔案不存在,HTTP404錯誤就會被當作反應返回




function serveStatic(response, cache, absPath ){

	if(cache[absPath]){  //檢查檔案是否被快取在記憶體中
		sendFile(response, absPath, cache[absPath]);  //從記憶體提供檔案
	}
		else{
			fs.exists(absPath, function(exists){ //檢查檔案是否存在
				if(exists){
					fs.readFile(absPath, function(err, data) //從磁碟讀取檔案
						{
							if(err){
								send404(response);
							}
							else{
								cache[absPath] = data;
								sendFile(response, absPath, data); //提供從磁碟讀取的檔案
							}
						});
				}
				else{
					send404(response);  //傳送HTTP404回應
				}

			});
		}
}


var server = http.createServer(function(request, response){

	var filePath = false;

	if(request.url == '/')
	{
		filePath = 'public/index.html';
		}else{
			filePath = 'public' + request.url;
		}

		var absPath = './' + filePath;
		serveStatic(response, cache, absPath);
});
server.listen(3100, function(){
	console.log("Server listening on port 3100.");
});