const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const streamSchema = new Schema({
    streamName: {
        type: String,
        required: true
    },
    streamCode: {
        type: Number,
        required: true
    },
    unitID:[reference]
  
});

module.exports = mongoose.model('Stream', streamSchema);