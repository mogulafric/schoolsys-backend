const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const streamTeacherSchema = new Schema({
    streamID:{type:mongoose.Schema.ObjectId,ref:'Stream'},
    teacherID:{type:mongoose.Schema.ObjectId,ref:'Teacher'},
});
module.exports = mongoose.model('StreamTeacher', streamTeacherSchema);