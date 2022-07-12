const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unitExamSchema = new Schema({
    examName: {
        type: String,
        required: true
    },
    examCode: {
        type: String,
        required: true
    },
    examID: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentAdmission:{
        type:Number,
        required:true
    },
    studentID: {
        type:String,
        required: true
    },
    subjects:
        [
        {
            subjectCode:{type:String},
            subjectName:String,
            subjectScore:Number,
            subjectGrade:{type:String, select:false},
            subjectCategory:{type:String, select:false},
            subjectPoints:{type:String, select:false},
            subjectTeacher:{type:String, select:false},
            subjectTeacherComment:{type:String, select:false}
        }
    ],
    totalMars:Number,
    classTeacherName:String,
    classTeacherComment:String,
    principalName:String,
    principalComment:String,
    points:Number,
    position:Number,
    isArchived:{type:Boolean,default:false, select:false},
    isActive:{type:Boolean,default:true, select:false}
});
module.exports = mongoose.model('unitExam', unitExamSchema);