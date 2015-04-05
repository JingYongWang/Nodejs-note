/*
var socketio = require('socket.io');

var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server){

  io = socketio.listen(server); //啟動socket.io的伺服器,讓它在既有的http伺服器上
  io.set =('log level',1);

  io.sockets.on('connection', function(socket){ //定義每個使用連接將如何被處理
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed ); //使用者連線時，為他指定名稱

  joinRoom(socket, 'Lobby');  //使用者連接時，將它讓入Lobby聊天室

  handleMessageBroadcasting(socket, nickNames);
  handleNameChangeAttemps(socket, nickNames, namesUsed);
  handleRoomJoining(socket);

  socket.on('room', function(){  //提供使用者聊天清單
    socket.emit('room', io.sockets.manager.rooms);
  });

  handleClientDisconnection(socket, nickNames, nickNames); //定義使用者斷線的處理

  });
};

//訪客名稱指定

function assignGuestName(socket, guestNumber, nickNames, namesUsed){

  var name = 'Guest'+guestNumber; //產生新的訪客名子
  nickNames[socket.id] = name;   //將訪客名子與客戶端連接ID關聯起來
  socket.emit('nameResult',{ //讓使用者知道他的訪客名稱
    success: true,
    name: name
  });

  namesUsed.push(name);  //指名這個名稱目前正使用中
  return guestNumber +1; 
}

//加入聊天室

function joinRoom(socket, room){
  socket.join(room);  //讓使用者加入room
  currentRoom[socket.id] = room; //註名使用者現在在這個聊天室裡
  socket.emit('joinResult', {room: room}); //讓使用者知道他現在正新的聊天室;
  socket.broadcast.to(room).emit('message',{ //讓聊天室的其他使用者,知道使用者已經加入
    text: nickNames[socket.id]+ 'has joined' + room +'.'
  });

  var  userInRoom = io.sockets.clients(room);  //判斷有哪些人跟使用者存在在同一個聊天室
  if(userInRoom.length > 1)  //如果有其他使用者存在,總結有哪些人
    {
      var usersInRoomSummary = 'Users currently in' + room + ': ';
      for( var index in usersInRoom){
        var userSocketId = userInRoom[index].id;
          if(userSocketId !=socket.id)
          {
            if(index >0)
            {
              usersInRoomSummary += ', ';
            }
            usersInRoomSummary += nickNames[userSocketId];
          }
      }

      usersInRoomSummary += '.';
      socket.emit('message', {text: usersInRoomSummary});  //告訴還有哪些人相同的聊天室
    }

}

//處理名稱變更請求

function handleNameChangeAttempts(socket, nickNames, namesUsed){

  socket.on('nameAttempt', function(){ //增加nameAttempt的事件偵聽器
    if(name.indexOf['Guest'] == 0){  //新增使用者不許以Guest作為開頭
      socket.emit('nameResult', {
        success: false,
        message: 'Names cannot begin with "Guest".'
      });
    }
    else{
      if(nameUsed.indexOf(name) ==-1 ){  //如果名稱沒有被註冊，就註冊它
        var previousName = nickNames[socket.id];
        var previousNameIndex = namesUsed.indexOf(previousName);
        namesUsed.push(name);
        nickNames[socket.id] = name;
        delete namesUsed[previousNameIndex]; //移除之前的名稱，讓其他人可以使用
        socket.emit('nameResult',{
          success: true,
          name: name
        });

        socket.broadcast.to(currentRoom[socket.id]).emit('message',{
          text: previousName + 'is now know as ' + name + '.'
        });
      }
      else{
        socket.emit('nameResult',{
          success: false,
          message: 'That name is already in use.'
        });
      }
    }
  });
}


//傳遞聊天訊息

function handleMessageBroadcasting(socket){
  socket.on('message', function (message){
    socket.broadcast.to(message.room).emit('message',{
      text: nickNames[socket.id] + ': '+message.text
    });
  });
}

//建立聊天室

function handleRoomJoining(socket){
  socket.on('join', function(room){
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  });
}

//處理使用者斷線

function handleClientDisconnection(socket){
  socket.on('disconnect', function(){
    var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
    delete namesUsed[nameIndex];
    delete nickNames[socket.id];
  });
}




*/

var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server) {
  io = socketio.listen(server);
  io.set('log level', 1);
  io.sockets.on('connection', function (socket) {
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
    joinRoom(socket, 'Lobby');
    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttempts(socket, nickNames, namesUsed);
    handleRoomJoining(socket);
    socket.on('rooms', function() {
      socket.emit('rooms', io.sockets.manager.rooms);
    });
    handleClientDisconnection(socket, nickNames, namesUsed);
  });
};

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
  var name = 'Guest' + guestNumber;
  nickNames[socket.id] = name;
  socket.emit('nameResult', {
    success: true,
    name: name
  });
  namesUsed.push(name);
  return guestNumber + 1;
}

function joinRoom(socket, room) {
  socket.join(room);
  currentRoom[socket.id] = room;
  socket.emit('joinResult', {room: room});
  socket.broadcast.to(room).emit('message', {
    text: nickNames[socket.id] + ' has joined ' + room + '.'
  });

  var usersInRoom = io.sockets.clients(room);
  if (usersInRoom.length > 1) {
    var usersInRoomSummary = 'Users currently in ' + room + ': ';
    for (var index in usersInRoom) {
      var userSocketId = usersInRoom[index].id;
      if (userSocketId != socket.id) {
        if (index > 0) {
          usersInRoomSummary += ', ';
        }
        usersInRoomSummary += nickNames[userSocketId];
      }
    }
    usersInRoomSummary += '.';
    socket.emit('message', {text: usersInRoomSummary});
  }
}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {
  socket.on('nameAttempt', function(name) {
    if (name.indexOf('Guest') == 0) {
      socket.emit('nameResult', {
        success: false,
        message: 'Names cannot begin with "Guest".'
      });
    } else {
      if (namesUsed.indexOf(name) == -1) {
        var previousName = nickNames[socket.id];
        var previousNameIndex = namesUsed.indexOf(previousName);
        namesUsed.push(name);
        nickNames[socket.id] = name;
        delete namesUsed[previousNameIndex];
        socket.emit('nameResult', {
          success: true,
          name: name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit('message', {
          text: previousName + ' is now known as ' + name + '.'
        });
      } else {
        socket.emit('nameResult', {
          success: false,
          message: 'That name is already in use.'
        });
      }
    }
  });
}

function handleMessageBroadcasting(socket) {
  socket.on('message', function (message) {
    socket.broadcast.to(message.room).emit('message', {
      text: nickNames[socket.id] + ': ' + message.text
    });
  });
}

function handleRoomJoining(socket) {
  socket.on('join', function(room) {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  });
}

function handleClientDisconnection(socket) {
  socket.on('disconnect', function() {
    var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
    delete namesUsed[nameIndex];
    delete nickNames[socket.id];
  });
}
