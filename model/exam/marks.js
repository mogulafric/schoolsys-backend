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
        type:mongoose.Schema.ObjectId,
        ref:'ExamSetup'
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
        type:mongoose.Schema.ObjectId,
        ref:'Student'
    },
    ENGLISH: 
        {
            subjectCode:{type:String,Default:null},
            subjectName:{type:String,Default:null},
            subjectScore:{type:Number,default:null},
            subjectGrade:{type:String, select:false,default:null},
            subjectCategory:{type:String, select:false,default:null},
            subjectPoints:{type:String, select:false,default:null},
            subjectTeacher:{type:String, select:false,default:null},
            subjectTeacherComment:{type:String, select:false,default:null}
        }
    ,
    MATHEMATICS:{
        subjectCode:{type:String,Default:null},
        subjectName:{type:String,Default:null},
        subjectScore:{type:Number,default:null},
        subjectGrade:{type:String, select:false,default:null},
        subjectCategory:{type:String, select:false,default:null},
        subjectPoints:{type:String, select:false,default:null},
        subjectTeacher:{type:String, select:false,default:null},
        subjectTeacherComment:{type:String, select:false,default:null}
    },
    KISWAHILI:{
        subjectCode:{type:String,Default:null},
        subjectName:{type:String,Default:null},
        subjectScore:{type:Number,default:null},
        subjectGrade:{type:String, select:false,default:null},
        subjectCategory:{type:String, select:false,default:null},
        subjectPoints:{type:String, select:false,default:null},
        subjectTeacher:{type:String, select:false,default:null},
        subjectTeacherComment:{type:String, select:false,default:null}
    },
    BIOLOGY:{
        subjectCode:{type:String,Default:null},
        subjectName:{type:String,Default:null},
        subjectScore:{type:Number,default:null},
        subjectGrade:{type:String, select:false,default:null},
        subjectCategory:{type:String, select:false,default:null},
        subjectPoints:{type:String, select:false,default:null},
        subjectTeacher:{type:String, select:false,default:null},
        subjectTeacherComment:{type:String, select:false,default:null}
    },
    PHYSICS:{
        subjectCode:{type:String,Default:null},
        subjectName:{type:String,Default:null},
        subjectScore:{type:Number,default:null},
        subjectGrade:{type:String, select:false,default:null},
        subjectCategory:{type:String, select:false,default:null},
        subjectPoints:{type:String, select:false,default:null},
        subjectTeacher:{type:String, select:false,default:null},
        subjectTeacherComment:{type:String, select:false,default:null}
    },
    CHEMESTRY:{
        subjectCode:{type:String,Default:null},
        subjectName:{type:String,Default:null},
        subjectScore:{type:Number,default:null},
        subjectGrade:{type:String, select:false,default:null},
        subjectCategory:{type:String, select:false,default:null},
        subjectPoints:{type:String, select:false,default:null},
        subjectTeacher:{type:String, select:false,default:null},
        subjectTeacherComment:{type:String, select:false,default:null}
    },
    HISTORY:{
        subjectCode:{type:String,Default:null},
        subjectName:{type:String,Default:null},
        subjectScore:{type:Number,default:null},
        subjectGrade:{type:String, select:false,default:null},
        subjectCategory:{type:String, select:false,default:null},
        subjectPoints:{type:String, select:false,default:null},
        subjectTeacher:{type:String, select:false,default:null},
        subjectTeacherComment:{type:String, select:false,default:null}
    },
    CRE:{
        subjectCode:{type:String,Default:null},
        subjectName:{type:String,Default:null},
        subjectScore:{type:Number,default:null},
        subjectGrade:{type:String, select:false,default:null},
        subjectCategory:{type:String, select:false,default:null},
        subjectPoints:{type:String, select:false,default:null},
        subjectTeacher:{type:String, select:false,default:null},
        subjectTeacherComment:{type:String, select:false,default:null}
    },
    GEOGRAPHY:{
        subjectCode:{type:String,Default:null},
        subjectName:{type:String,Default:null},
        subjectScore:{type:Number,default:null},
        subjectGrade:{type:String, select:false,default:null},
        subjectCategory:{type:String, select:false,default:null},
        subjectPoints:{type:String, select:false,default:null},
        subjectTeacher:{type:String, select:false,default:null},
        subjectTeacherComment:{type:String, select:false,default:null}
    },
    BUSINESS:{
        subjectCode:{type:String,Default:null},
        subjectName:{type:String,Default:null},
        subjectScore:{type:Number,default:null},
        subjectGrade:{type:String, select:false,default:null},
        subjectCategory:{type:String, select:false,default:null},
        subjectPoints:{type:String, select:false,default:null},
        subjectTeacher:{type:String, select:false,default:null},
        subjectTeacherComment:{type:String, select:false,default:null}
    },
    AGRICULTURE:{
        subjectCode:{type:String,Default:null},
        subjectName:{type:String,Default:null},
        subjectScore:{type:Number,default:null},
        subjectGrade:{type:String, select:false,default:null},
        subjectCategory:{type:String, select:false,default:null},
        subjectPoints:{type:String, select:false,default:null},
        subjectTeacher:{type:String, select:false,default:null},
        subjectTeacherComment:{type:String, select:false,default:null}
    },
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