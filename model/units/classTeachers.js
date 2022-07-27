const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const classTeacherSchema = new Schema({
   classID:{type:mongoose.Schema.ObjectId,ref:''},
   teacherID:[{type:mongoose.Schema.ObjectId,ref:'Teacher'}],
   createdAt:{type:Date, Default:Date.now()},
   lastUpdated:{type:Date, Default:Date.now()},
   isArchived:{type:Boolean,Default:false},
   isActive:{type:Boolean,Default:true}
});
module.exports = mongoose.model('ClassTeacher', classTeacherSchema);
