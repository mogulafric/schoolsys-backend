const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });
const examLineSchema = new Schema({
  examID:{type: mongoose.Schema.ObjectId,ref: "ExamHeader"},
  studentID:{type: mongoose.Schema.ObjectId,ref: "Subject"},
  examinableSubjects:
  [{
  subjectID:{type: mongoose.Schema.ObjectId,ref: "Subject"},
  subjectGroupID:{type: mongoose.Schema.ObjectId,ref: "SubjectGroup"},
  subjectName: String,
  score: Number,
  points: Number,
  grade: String,
  subjectTeacherID:{type: mongoose.Schema.ObjectId,ref: "Teacher"},
  subjectTeacherName:String,
  outOf:Number,
  weight:Number,
  p1:{score: Number, outOf:Number,weight:Number },
  p2:{score: Number, outOf:Number,weight:Number },
  p3:{score: Number, outOf: Number,weight:Number },
  cat1:{score:Number, outOf:Number, weight:Number},
  cat2:{score:Number, outOf:Number, weight:Number},
  main:{score:Number, outOf:Number, weight:Number}
}],
  classTecher:{type: mongoose.Schema.ObjectId,ref: "classTeacher"},
  classTeacherRemarks:{type: mongoose.Schema.ObjectId,ref: "classTeacherRemarks"},
  principal:{type: mongoose.Schema.ObjectId,ref: "Principal"},
  principalRemarks:{type: mongoose.Schema.ObjectId,ref: "PrincipalRemarks"},
  isArchived: { type: Boolean, Default: false },
  isActive: { type: Boolean, Default: true },
});
module.exports = mongoose.model("ExamLine", examLineSchema);
