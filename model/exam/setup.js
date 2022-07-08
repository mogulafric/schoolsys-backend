const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
    examName: {
        type: String,
        required: true
    },
    examCode: {
        type: Number,
        required: true
    },
    termID: {
        type: Number,
        required: true
    },
    yearID: {
        type: Number,
        required: true
    },
    examDescription: {  
        type: Number,
        required: true
    }, 
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true}
});

module.exports = mongoose.model('Exam', examSchema);