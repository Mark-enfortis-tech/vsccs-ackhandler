const net = require('node:net');
const dgram = require('dgram');
const querystring = require('querystring');
const CmdHistory = require('./models/cmdHistModel');
const CmdInventory = require('./models/cmdInvModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


// connect to database
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
}).then(con => {
  console.log(con.connection);
  console.log('DB connection successful')
});


// ackHandler object - handles incoming commands
const ackHandler = net.createServer((socket) => {
  // 'connection' listener.
  console.log('target client connected');

  socket.on('end', () => {
    console.log('target client disconnected');
  });


  socket.on('data', (data) => {  
    console.log('ack handler received: ', data.toString());
    myObj = JSON.parse(data);
    var cmdMap = new Map(Object.entries(myObj));
    console.log('commandMap: ', cmdMap);

    // once data is received save to command history collection
    
    const respData = {
      "bcast_id": cmdMap.get("bcast_id")
    };

    updateCmdHistCollection(respData);

  }); 
});

ackHandler.on('error', (err) => {
  throw err;
});

ackHandler.listen(3006, () => {
  console.log('ack handler waiting for connection...'); 
});


async function updateCmdHistCollection(respData){

  const _bcast_id = respData.bcast_id * 1;

  try{

    var _cmdHistDoc = await CmdHistory.findOne({"bcast_id":_bcast_id}).lean();  // works for cmd_id
    //var _cmdHistDoc = await CmdHistory.findOne({"time_sent":_time_sent}).lean();

    const { _id, cmd_id, cmd_name, time_sent, apid, platform, remarks } = _cmdHistDoc;
    console.log("deconstructed cmdHistCollection objects: ", _id, cmd_id, cmd_name, time_sent, apid, platform, remarks);

    //console.log("length resp.time_sent: %d, _cmdHistDoc.time_sent: %d", respData._time_sent.length, time_sent);

    const _time_recd = new Date();
    const _time_recd_str = new String(_time_recd);

    const cmdRes = await CmdHistory.updateOne({bcast_id:{$eq:_bcast_id}}, {time_recd:_time_recd_str});
  }
  catch (err) {
    console.log("error: ", err);
  }

}
























