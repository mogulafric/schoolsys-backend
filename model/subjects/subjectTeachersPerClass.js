const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectTeacherSchema = new Schema({
    subjectCode: {type: String,required: [true, "This field is required"]},
    subjectName: {type: String,required: true},
    subjectShortForm: {type: String,required: true,},
    subjectCategory:{type:String,enum:['Category1','Category2', 'Category3','Category4']},
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true}
});
module.exports = mongoose.model('SubjectTeacher', subjectTeacherSchema);