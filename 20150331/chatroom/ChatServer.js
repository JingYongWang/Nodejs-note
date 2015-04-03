var net = require('net');  //net模組，有關於TCP
var readline = require('readline').createInterface(process.stdin, process.stdout);

var server = net.createServer();  //創一個server

server.on('connection', function(sock) {   //網路處理,等待連線
  console.log(sock.remoteAddress +':'+ sock.remotePort+' 連進來了');

  readline.setPrompt('HAHA我是提示字元噢(類似你的名稱的概念)');//設定提示字元
  readline.prompt(); //輸入

  readline.on('line', function(line) {   //要求輸入每一行按下ＥＮＴＥＲ後的功能,每次一行輸入就執行這個函式
    sock.write(line);
    readline.prompt();
  });

  sock.on('data', function(data) {   //server收到client的資料
    console.log('收到:' + sock.remoteAddress + ': ' + data);
  });
});


server.listen(5757);
console.log('server 啟動');