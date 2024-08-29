const mongoose = require('mongoose');

const broadcastStatsSchema = new mongoose.Schema({
  bcast_id: {
    type: Number,
    required: ['Must include a broadcastID number']
  }

}, { collection: 'broadcastStatsCollection' })

const BroadcastStats = mongoose.model('broadcastStatsModel', broadcastStatsSchema);
module.exports = BroadcastStats;