const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roleSchema = new Schema({
    rolename: {
        type: String,
        required: true
    },
    rolecode: {
        type: Number,
        required: true
    },
    description:{type:String}
});
module.exports = mongoose.model('Role', roleSchema);