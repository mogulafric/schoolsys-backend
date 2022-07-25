const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teacherSchema = new Schema({
    teacherTitle:{type:String,required:true},
    teacherName: {type: String,required: true},
    teacherAbbr:{type:String},
    teacherNumber: {type: String},
    teacherRole: {type:String},
    teacherContact:{type:Number},
    teacherEmail:{type:String, required:[true, 'Email is required']},
    createAt:{type:Date, Default:Date.now()},
    lateUpdated:{type:Date, Default:Date.now()},
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true}
});
module.exports = mongoose.model('Teacher', teacherSchema);