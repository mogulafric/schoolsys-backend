const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maSchema = new Schema({
    examName: {
        type: String,
        required: true
    },
    examCode: {
        type: Number,
        required: true
    },
    studentName: {
        type: Number,
        required: true
    },
    StudentID: {
        type: Number,
        required: true
    },
    subjects:
        [
        {
            subjectCode:String,
            subjectName:String,
            subjectScore:Number,
            subjectGrade:String,
            subjectGrade:String,
            subjectPoints:Number,
            subjectTeacher:String,
            Comment:String
        }
    ],

    points:Number,
    position:Number,
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true}
});

module.exports = mongoose.model('Exam', examSchema);