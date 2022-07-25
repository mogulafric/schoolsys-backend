const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const unitSchema = new Schema({
    unitCode: {type: Number,required: true}, 
    unitName: {type: String,required: true}, 
    streams: [{type:mongoose.Schema.ObjectId,ref:'Stream'}],
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true}
});
module.exports = mongoose.model('Unit', unitSchema);
