const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSetupSchema = new Schema({
    examName: {
        type: String,
        required: true
    },
    examCode: {
        type: String,
        required: true,
        unique:true
       
    },
    termID: {
        type: String,
        required: true
    },
    yearID: {
        type: String,
        required: true
    },
    unitID:{
        type:String,
        required:true
    },
    examDescription: {  
        type: String,
        required: true
    }, 
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true}
});

module.exports = mongoose.model('ExamSetup',examSetupSchema);