const net = require('node:net');
const dgram = require('dgram');
const querystring = require('querystring');



// ackHandler object - handles incoming commands
const ackHandler = net.createServer((socket) => {
  // 'connection' listener.
  console.log('target client connected');

  socket.on('end', () => {
    console.log('target client disconnected');
  });


  socket.on('data', (data) => {  
    console.log('target client received: ', data.toString());
    myObj = JSON.parse(data);
    var cmdMap = new Map(Object.entries(myObj));
    console.log('commandMap: ', cmdMap);

    // once data is received save to command history collection
    
    const respData = {
      "cmd_id": commandMap.get("cmd_id"),
      "time_sent" : commandMap.get("time_sent")
    };

    saveData(respData);

  }); 
});

ackHandler.on('error', (err) => {
  throw err;
});

ackHandler.listen(3006, () => {
  console.log('target client waiting for connection...'); 
});


function saveData(respData){
  console.log("save data to command history collection:", respData);

}
























