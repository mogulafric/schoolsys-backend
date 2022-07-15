const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const parentSchema = new Schema({
    firstParent: {
        type: String,
        required: true
    },
    secondParent: {
        type: String,
        
    },
    firstParentNumber: {
        type: Number,
        required: true
    },
    secondParentNumber: {
        type: Number
       
    },
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true},
    studentID:{type:String, required:true}
});
module.exports = mongoose.model('Parent', parentSchema);