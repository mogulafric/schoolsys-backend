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
    subjects:[
        
        {
            subjectCode:{type:String,Default:null},
            subjectCode:{type:String,Default:null},
            subjectCode:{type:String,Default:null},
            subjectName:{type:String,Default:null},
            subjectScore:{type:Number,default:null},
            subjectGrade:{type:String, select:false,default:null},
            subjectCategory:{type:String, select:false,default:null},
            subjectPoints:{type:String, select:false,default:null},
            subjectTeacher:{type:String, select:false,default:null},
            subjectTeacherComment:{type:String, select:false,default:null}
        }
    ]
    ,
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