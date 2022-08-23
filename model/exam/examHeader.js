const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examHeaderSchema = new Schema({
    examName: {type: String,required: true},
    examCode: {type: Number,required: true},
    termID: {type: mongoose.Schema.ObjectId,ref: "AcademicTerm", required:true},
    yearID: {type: mongoose.Schema.ObjectId,ref: "AcademicYear",required:true},
    unitID: {type: mongoose.Schema.ObjectId,ref: "Unit", required:true},
    examDescription: {type: String,required: true},
    totalSubjects:{type: Number,required: true},
    gradedSubjects:{type: Number,required: true},
    examinableSubjects:[{
    subjectGroupID:{type: mongoose.Schema.ObjectId,ref: "SubjectTeachers"},
    name: String,
    score: Number,
    points: Number,
    grade: String,
    outOf:{type: Number},
    weight:{type:Number},
    p1:{ score: Number, outOf: {type:Number},weight:Number},
    p2:{ score: Number, outOf: {type:Number},weight:Number},
    p3:{ score: Number, outOf: {type:Number},weight:Number},
    cat1:{score:Number, outOf:{type:Number}, weight:Number},
    cat2:{score:Number, outOf:{type:Number}, weight:Number},
    main:{score:Number, outOf:{type:Number}, weight:Number},
}]
});
module.exports = mongoose.model('ExamHeader', examHeaderSchema);