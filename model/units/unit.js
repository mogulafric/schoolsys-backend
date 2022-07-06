const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const unitSchema = new Schema({
    unitID: {
        type: String,
        required: true,
        unique:true
    },
    unitName: {
        type: String,
        required: true
    }, 
    streams: [String]
});
module.exports = mongoose.model('Unit', unitSchema);
