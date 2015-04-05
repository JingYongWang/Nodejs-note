
var http = require('http'); // 內建http模組 提供http賜福端與客戶端功能

var fs = require('fs');   //內建fs模組,提供檔案系統功能

var path = require('path');  //內建path模組,提供檔案系統路徑

var mime = require('mime');



var cache = {}; //cache物件是快取檔案內容的地方



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




function serveStatic(response, cache, absPath ){  //回應, 快取, 檔案位置(絕對位置)

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

//serveStatic的步驟為:(1)檢查檔案是否有在快取中=>有的話從記憶體提供檔案
//(2)快取無檔案=>傳檔案位置跟一函數(錯誤,資料)檢查檔案是否存在{不存在及snd404()} 。
//(3)如果err  send404()
//(4)存在的話  把資料放進從記憶體放置快取




var server = http.createServer(function(request, response){

  var filePath = false;  //一開始為預設(檔案路徑)

  if(request.url == '/')  
  {
    filePath = 'public/index.html';  // 決定預設的html黨
    }else{
      filePath = 'public' + request.url;  //把URL路徑轉換成相對檔案路徑
    }

    var absPath = './' + filePath;
    serveStatic(response, cache, absPath);  //提供靜態檔案
});
server.listen(3000, function(){
  console.log("Server listening on port 3000.");
});



var chatServer = require('./lib/chat_server');
chatServer.listen(server);