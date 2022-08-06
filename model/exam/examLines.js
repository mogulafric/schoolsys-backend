const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const examSetupSchema = new Schema({
  examID:{type: mongoose.Schema.ObjectId,ref: "ExamHeader"},
  subjectID:{type: mongoose.Schema.ObjectId,ref: "Subject"},
  subjectTeacher:{type: mongoose.Schema.ObjectId,ref: "SubjectTeachers", },
  subjectGroupID:{type: mongoose.Schema.ObjectId,ref: "SubjectTeachers"},
  name: String,
  score: Number,
  points: Number,
  grade: String,
  outOf:{type: Number,default: 100 },
  weight:{type:Number},
  p1: { score: Number, outOf: { type: Number, Default: 60 }, weight:Number },
  p2: { score: Number, outOf: { type: Number, Default: 60 }, weight:Number },
  p3: { score: Number, outOf: { type: Number, Default: 100 }, weight:Number },
  cat1:{score:Number, outOf:{type:Number,defaults: 30, weight:Number}},
  cat2:{score:Number, outOf:{type:Number,defaults: 30, weight:Number}},
  main:{score:Number, outOf:{type:Number,defaults: 40, weight:Number}},
  classTecher:{type: mongoose.Schema.ObjectId,ref: "classTeacher"},
  classTeacherRemarks:{type: mongoose.Schema.ObjectId,ref: "classTeacherRemarks"},
  principal:{type: mongoose.Schema.ObjectId,ref: "Principal"},
  principalRemarks:{type: mongoose.Schema.ObjectId,ref: "PrincipalRemarks"},
  isArchived: { type: Boolean, Default: false },
  isActive: { type: Boolean, Default: true },
});
module.exports = mongoose.model("ExamSetup", examSetupSchema);
