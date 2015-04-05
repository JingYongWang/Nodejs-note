/*
var Chat = function(socket){
  this.socket = socket;
};
//傳遞聊天訊息

Chat.prototype.sendMessage = function (room, text){
  var message = {
    room: room,
    text: text
  };
  this.socket.emit('message', message);
};

//改變聊天室

Chat.prototype.changeRoom = function(room){
  this.socket.emit('join',{
    newRoom: room
  });
};


Chat.prototype.preocessCommand = function(command) {
  var words = command.split(' ');
  var command = word[0]
            .substring(1, words[0].length) //從第一個單字開始解析
            .toLowerCase();
  var message = false;

  switch (command){
    case 'join':
      words.shift();
      var room = words.join(' ');
      this.changeRoom(room); 
      break;

    case 'nick':
      words.shift();
      var name = words.join(' ');
      this.socket.emit('nameAttempt', name);
      break;
    default:
      message = 'Unrecognized command.';
      break;
  } 

  return message;
};
*/


var Chat = function(socket) {
  this.socket = socket;
};

Chat.prototype.sendMessage = function(room, text) {
  var message = {
    room: room,
    text: text
  };
  this.socket.emit('message', message);
};

Chat.prototype.changeRoom = function(room) {
  this.socket.emit('join', {
    newRoom: room
  });
};

Chat.prototype.processCommand = function(command) {
  var words = command.split(' ');
  var command = words[0]
                .substring(1, words[0].length)
                .toLowerCase();
  var message = false;

  switch(command) {
    case 'join':
      words.shift();
      var room = words.join(' ');
      this.changeRoom(room);
      break;
    case 'nick':
      words.shift();
      var name = words.join(' ');
      this.socket.emit('nameAttempt', name);
      break;
    default:
      message = 'Unrecognized command.';
      break;
  };

  return message;
};
