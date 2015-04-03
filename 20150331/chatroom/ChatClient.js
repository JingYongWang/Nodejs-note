var net = require('net');
var readline = require('readline').createInterface(process.stdin, process.stdout);

var client = new net.Socket();

readline.on('line', function(line) {
  client.write(line);
  readline.prompt();
});

client.connect(5757, process.argv[2], function() { //原本第二個參數為'127.0.0.1',目前改為process.arvg[2]可自行定義op
  console.log('連接 ' + client.remoteAddress + ':' + client.remotePort);
  readline.setPrompt('');
  readline.prompt();
});

client.on('data', function(data) {
    console.log('收到:' + data);
});

