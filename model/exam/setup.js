const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examSetupSchema = new Schema({
    examName: {
        type: String,
        required: true
    },
    examCode:{
        type: String,
        required: true,
        unique:true
    },
    termID:{
        type:mongoose.Schema.ObjectId,
        ref:'AcademicTerm'
    },
    yearID: {
        type:mongoose.Schema.ObjectId,
        ref: 'AcademicYear'
    },
    unitID:{
        type:mongoose.Schema.ObjectId,
        ref: 'Unit'
    },
    examDescription: {  
        type: String,
        required: true
    }, 
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true}
});
module.exports = mongoose.model('ExamSetup',examSetupSchema);