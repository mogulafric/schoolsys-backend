const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subjectCode: {type: String,required: [true, "This field is required"]},
    subjectName: {type: String,required: true},
    subjectShortForm: {type: String,required: true,},
    subjectGroup:{type:mongoose.Schema.ObjectId,ref:'subjectGroup'},
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true}
});
module.exports = mongoose.model('Subject', subjectSchema);
