const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const streamTeacherSchema = new Schema({
    streamID:{type:mongoose.Schema.ObjectId,ref:'Stream'},
    teacherID:{type:mongoose.Schema.ObjectId,ref:'Teacher'},
    isActive:{type:Boolean, Default:true},
    isArchived:{type:Boolean, Default:false},
    createAt:{type:Date, Default:Date.now}
});
module.exports = mongoose.model('StreamTeacher', streamTeacherSchema);