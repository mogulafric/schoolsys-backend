const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const examSetupSchema = new Schema({
  examName: {type: String,required: true,},
  examCode: {type: String,required: true,unique: true,},
  termID: {type: mongoose.Schema.ObjectId,ref: "AcademicTerm"},
  yearID: {type: mongoose.Schema.ObjectId,ref: "AcademicYear"},
  unitID: {type: mongoose.Schema.ObjectId,ref: "Unit"},
  examDescription: {type: String,required: true},
  subject:[{
    subjectID:{type: mongoose.Schema.ObjectId,ref: "Subject"},
    subjectTeacher:{type: mongoose.Schema.ObjectId,ref: "SubjectTeachers"},
    subjectGroupID:{type: mongoose.Schema.ObjectId,ref: "SubjectTeachers"},
    name: String,
    score: Number,
    points: Number,
    grade: String,
    outOf: { type: Number, Default: 100 },
    weight:{type:Number}
  }],
  subjectPapers: [{
    subjectID:{type: mongoose.Schema.ObjectId,ref: "Subject"},
    p1: { score: Number, outOf: { type: Number, Default: 60 }, weight:Number },
    p2: { score: Number, outOf: { type: Number, Default: 60 }, weight:Number },
    p3: { score: Number, outOf: { type: Number, Default: 100 }, weight:Number },
  }],
  subjectCatMain:[{
    subjectID:{type: mongoose.Schema.ObjectId,ref: "Subject"},
    cat1:{score:Number, outOf:{type:Number,Defaults: 30, weight:Number}},
    cat1:{score:Number, outOf:{type:Number,Defaults: 30, weight:Number}}
  }],
  subjectDefault:[{
    subjectID:{type: mongoose.Schema.ObjectId,ref: "Subject"},
  }],
  classTecher:{type: mongoose.Schema.ObjectId,ref: "classTeacher"},
  classTeacherRemarks:{type: mongoose.Schema.ObjectId,ref: "classTeacherRemarks"},
  principal:{type: mongoose.Schema.ObjectId,ref: "Principal"},
  principalRemarks:{type: mongoose.Schema.ObjectId,ref: "PrincipalRemarks"},
  isArchived: { type: Boolean, Default: false },
  isActive: { type: Boolean, Default: true },
});
module.exports = mongoose.model("ExamSetup", examSetupSchema);
