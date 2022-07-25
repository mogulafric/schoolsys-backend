const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roleSchema = new Schema({
    roleName: {type: String,required: true},
    roleCode: {type: Number,required: true},
    description:{type:String},
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true},
});
module.exports = mongoose.model('Role', roleSchema);