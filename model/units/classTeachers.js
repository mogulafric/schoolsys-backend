const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const classTeacherSchema = new Schema({
   classTeacher:{type:mongoose.Schema.ObjectId,ref:'Teacher'}
});
module.exports = mongoose.model('ClassTeacher', classTeacherSchema);
