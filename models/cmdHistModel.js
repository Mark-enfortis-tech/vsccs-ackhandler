const mongoose = require('mongoose');

const cmdHistSchema = new mongoose.Schema({
  cmd_id: {
    type: Number,
    required: ['Must include a cmd_id number']
  },
  sequence: {
    type: Number,
    required: ['Must include a sequence number']
  },
  cmd_name: {
    type: String,
    required: ['Must include a commmand name']
  },
  time_sent: {
    type: String,
    required: ['Must include a time_sent']
  },
  time_recd: {
    type: String
  },
  apid: {
    type: Number
  },
  platform: {
    type: String
  },
  remarks: {
    type: String
  }

}, { collection: 'cmdHistCollection' })

const CmdHistory = mongoose.model('cmdHistoryModel', cmdHistSchema);
module.exports = CmdHistory;