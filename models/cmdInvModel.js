const mongoose = require('mongoose');

const cmdInvSchema = new mongoose.Schema({
  cmd_id: {
    type: Number,
    required: ['Must include a cmd_id number']
  },
  cmd_name: {
    type: String,
    required: ['Must include a cmd_name']
  },
  cmd_string: {
    type: String,
    required: ['Must include a cmd_string']
  },
  hazlock: {
    type: Boolean,
    required: ['Must include a hazlock']
  },
  target_ip: {
    type: String,
    required: ['Must include a target_ip']
  },
  target_port: {
    type: String,
    required: ['Must include a target_port']
  },
  cmd_protocol: {
    type: String,
    required: ['Must include a cmd_protocol']
  },
  platform: {
    type: String,
    required: ['Must include a platform']
  },
  remarks: {
    type: String
  }

}, {collection: 'cmdInvCollection'});

const CmdInventory = mongoose.model('cmdInvModel', cmdInvSchema);
module.exports = CmdInventory;