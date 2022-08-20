const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const examinableSubjects = new Schema({ 
    subjectID:{type:mongoose.Schema.ObjectId,ref:"Subject", 
    required:true, unique:true},
    unitID:{type:mongoose.Schema.ObjectId,ref:"Unit", 
    required:true},
    subjectTeacherID:[{
      type: mongoose.Schema.ObjectId,
      ref:"SubjectTeacherPerClass", reuquired:true}],
    subjectGroupID:{
      type: mongoose.Schema.ObjectId,
      ref:"SubjectGroup",required:true},
    examType:{type:String,required:true,enum:['Default','Standard', 'Normal']},
    outOf:{type:Number},                                                                                                                              
    weight:{type:Number},
    p1:{
      outOf:{type:Number},
      weight:{type:Number}},
    p2:{outOf:{type:Number},
      weight:{type:Number}},
    p3:{outOf:{type:Number},
      weight:{type:Number}},
    cat1:{outOf:{type:Number},
      weight:{type:Number}},
    cat2:{outOf:{type:Number},
      weight:{type:Number}},
    main:{score:{type:Number},
      outOf:{type:Number},
      weight:{type:Number}},
  isArchived: {type: Boolean, default: false},
  isActive: {type: Boolean, default: true},
});
module.exports = mongoose.model("ExaminableSubjects", examinableSubjects);
