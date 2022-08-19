const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const examinableSubjects = new Schema({ 
    subjectID:{type:mongoose.Schema.ObjectId,ref:"Subject", 
    required:true, 
    uniue:true},
    subjectTeacherID:[{
      type: mongoose.Schema.ObjectId,
      ref:"SubjectTeachers"}],
    subjectGroupID:{
      type: mongoose.Schema.ObjectId,
      ref:"SubjectGroup"},
    name: {type:String},
    points: {type:Number},
    grade: {type:String},
    outOf:{type:Number,Default:null},                                                                                                                              
    weight:{type:Number,Default:null},
    p1:{
      outOf:{type:Number,Default:null},
      weight:{type:Number,Default:null}},
    p2:{outOf:{type:Number,Default:null},
      weight:{type:Number,Default:null}},
    p3:{outOf:{type:Number,Default:null},
      weight:{type:Number, Default:null}},
    cat1:{outOf:{type:Number,defaults: null},
      weight:{type:Number, default:null}},
    cat2:{outOf:{type:Number,default:null},
      weight:{type:Number}},
    main:{score:{type:Number},
      outOf:{type:Number,default: null},
      weight:{type:Number, default:null}},
  isArchived: {type: Boolean, Default: false},
  isActive: {type: Boolean, Default: true},
});
module.exports = mongoose.model("ExaminableSubjects", examinableSubjects);
