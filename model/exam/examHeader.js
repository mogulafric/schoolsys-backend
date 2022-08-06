const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examHeaderSchema = new Schema({
    examName: {type: String,required: true},
    examCode: {type: Number,required: true},
    studentID:{type: mongoose.Schema.ObjectId,ref: "Student",required:true},
    termID: {type: mongoose.Schema.ObjectId,ref: "AcademicTerm", required:true},
    yearID: {type: mongoose.Schema.ObjectId,ref: "AcademicYear",required:true},
    unitID: {type: mongoose.Schema.ObjectId,ref: "Unit", required:true},
    examDescription: {type: String,required: true},
    subjects:[{
    subjectID:{type: mongoose.Schema.ObjectId,ref: "Subject"},
    subjectTeacher:{type: mongoose.Schema.ObjectId,ref: "SubjectTeachers", },
    subjectGroupID:{type: mongoose.Schema.ObjectId,ref: "SubjectTeachers"},
    name: String,
    score: Number,
    points: Number,
    grade: String,
    outOf:{type: Number,default: 100 },
    weight:{type:Number},
    p1:{ score: Number, outOf: {type:Number,Default:60},weight:Number},
    p2:{ score: Number, outOf: {type:Number,Default:60},weight:Number},
    p3:{ score: Number, outOf: {type:Number,Default:80},weight:Number},
    cat1:{score:Number, outOf:{type:Number,defaults: 30, weight:Number}},
    cat2:{score:Number, outOf:{type:Number,defaults: 30, weight:Number}},
    main:{score:Number, outOf:{type:Number,defaults: 40, weight:Number}},
}]
});
module.exports = mongoose.model('ExamHeader', examHeaderSchema);