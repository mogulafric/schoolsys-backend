const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const classTeacherSchema = new Schema({
   unitID:{type:mongoose.Schema.ObjectId,ref:'Unit'},
   teacherID:[{type:mongoose.Schema.ObjectId,ref:'Teacher'}],
   createdAt:{type:Date, default:Date.now()},
   lastUpdated:{type:Date, default:Date.now()},
   isArchived:{type:Boolean,default:false},
   isActive:{type:Boolean,default:true}
});
module.exports = mongoose.model('ClassTeacher', classTeacherSchema);
