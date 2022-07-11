const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marksSchema = new Schema({
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
            subjectCode:String,
            subjectName:String,
            subjectScore:Number,
            subjectGrade:String,
            subjectCategory:String,
            subjectPoints:Number,
            subjectTeacher:String,
            subjectTeacherComment:String
        }
    ],
    classTeacherName:String,
    classTeacherComment:String,
    principalName:String,
    principalComment:String,
    points:Number,
    position:Number,
    isArchived:{type:Boolean,default:false, select:false},
    isActive:{type:Boolean,default:true, select:false}
});
module.exports = mongoose.model('Marks', marksSchema);