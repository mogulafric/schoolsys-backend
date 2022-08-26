const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const examLineSchema = new Schema({
  examID:{type: mongoose.Schema.ObjectId,ref: "ExamHeader"},
  examinableSubjects:
  [{subjectID:{type: mongoose.Schema.ObjectId,ref: "Subject"}},
  {subjectName: String, default:null},
  {score: Number,default:null},
  {points: Number,default:null},
  {grade: String,default:null},
  {subjectTeacher:{type: mongoose.Schema.ObjectId,ref: "SubjectTeachers"}},
  {subjectTeacherName:{type:String,default:null}},
  {outOf:{type: Number,default:100}},
  {weight:{type:Number}},
  {p1:{score: Number, outOf: {type: Number,Default: 60},weight:Number }},
  {p2:{score: Number, outOf: {type: Number,Default: 60},weight:Number }},
  {p3:{score: Number, outOf: {type: Number,Default: 100},weight:Number }},
  {cat1:{score:Number, outOf:{type:Number,defaults: 30, weight:Number}}},
  {cat2:{score:Number, outOf:{type:Number,defaults: 30, weight:Number}}},
  {main:{score:Number, outOf:{type:Number,defaults: 40, weight:Number}}}],
  classTecher:{type: mongoose.Schema.ObjectId,ref: "classTeacher"},
  classTeacherRemarks:{type: mongoose.Schema.ObjectId,ref: "classTeacherRemarks"},
  principal:{type: mongoose.Schema.ObjectId,ref: "Principal"},
  principalRemarks:{type: mongoose.Schema.ObjectId,ref: "PrincipalRemarks"},
  isArchived: { type: Boolean, Default: false },
  isActive: { type: Boolean, Default: true },
});
module.exports = mongoose.model("ExamLine", examLineSchema);
