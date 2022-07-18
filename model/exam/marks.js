const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unitExamSchema = new Schema({
   
    examID: {
        type:mongoose.Schema.ObjectId,
        ref:'ExamSetup'
    },
   
    studentID: {
        type:mongoose.Schema.ObjectId,
        ref:'Student'
    },

    // ENGLISH: {type:Number, default:null},
    // MATHEMATICS:{type:Number, default:null},
    // KISWAHILI:{type:Number, default:null},
    // BIOLOGY:{type:Number, default:null},
    // PHYSICS:{type:Number, default:null},
    // CHEMESTRY:{type:Number, default:null},
    // HISTORY:{type:Number, default:null},
    // CRE:{type:Number, default:null},
    // GEOGRAPHY:{type:Number, default:null},
    // BUSINESS:{type:Number, default:null},
    // AGRICULTURE:{type:Number, default:null},
   

   
    // ENGLISHGRADE:{String,default:null},
    // MATHEMATICSGRADE:{String,default:null},
    // KISWAHILISGRADE:{String,default:null},
    // BIOLOGYGRADE:{String,default:null},
    // PHYSICSGRADE:{String,default:null},
    // CHEMISTRYGRADE:{String,default:null},
    // HISTORYGRADE:{String,default:null},
    // CREGRADE:{String,default:null},
    // GEOGRAPHYGRADE:{String,default:null},
    // BUSINESSGRADE:{String,default:null},
    // AGRICULTUREGRADE:{String,default:null},

    // ENGLISHCATEGORY:{String,default:null},
    // MATHEMATICSCATEGORY:{String,default:null},
    // KISWAHILISCATEGORY:{String,default:null},
    // BIOLOGYCATEGORY:{String,default:null},
    // PHYSICSCATEGORY:{String,default:null},
    // CHEMISTRYCATEGORY:{String,default:null},
    // HISTORYCATEGORY:{String,default:null},
    // CRECATEGORY:{String,default:null},
    // GEOGRAPHYCATEGORY:{String,default:null},
    // BUSINESSCATEGORY:{String,default:null},
    // AGRICULTURECATEGORY:{String,default:null},
    
    



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