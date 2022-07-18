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
    ENGLISH: {type:Number, default:null},
    MATHEMATICS:{type:Number, default:null},
    KISWAHILI:{type:Number, default:null},
    BIOLOGY:{type:Number, default:null},
    PHYSICS:{type:Number, default:null},
    CHEMESTRY:{type:Number, default:null},
    HISTORY:{type:Number, default:null},
    CRE:{type:Number, default:null},
    GEOGRAPHY:{type:Number, default:null},
    BUSINESS:{type:Number, default:null},
    AGRICULTURE:{type:Number, default:null},
   

    ENGLISHGRADE:{String},
    MATHEMATICSGRADE:{String},
    KISWAHILISGRADE:{String},
    BIOLOGYGRADE:{String},
    PHYSICSGRADE:{String},
    CHEMISTRYGRADE:{String},
    HISTORYGRADE:{String},
    CREGRADE:{String},
    GEOGRAPHYGRADE:{String},
    BUSINESSGRADE:{String},
    AGRICULTUREGRADE:{String},







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