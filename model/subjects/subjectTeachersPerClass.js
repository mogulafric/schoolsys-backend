const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectTeacherPerClassSchema = new Schema({
    subjectID:{type:mongoose.Schema.ObjectId,ref:'Subject'},
    TeacherID:[{type:mongoose.Schema.ObjectId,ref:'Teacher'}], 
    createdAt:{type:Date, Default:Date.now()},
    lastUpdated:{type:Date, Default:Date.now()},
    isArchived:{type:Boolean,Default:false},
    isActive:{type:Boolean,Default:true}
});
module.exports = mongoose.model('SubjectTeacherPerClass', subjectTeacherPerClassSchema);

