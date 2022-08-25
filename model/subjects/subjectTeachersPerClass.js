const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectTeacherPerClassSchema = new Schema({
    subjectID:{type:mongoose.Schema.ObjectId,ref:'Subject', required:true},
    teacherID:[{type:mongoose.Schema.ObjectId,ref:'Teacher',required:true}], 
    unitID:{type:mongoose.Schema.ObjectId,ref:'Unit',required:true},
    createdAt:{type:Date, Default:Date.now()},
    lastUpdated:{type:Date, Default:Date.now()},
    isArchived:{type:Boolean,Default:false},
    isActive:{type:Boolean,Default:true}
});
module.exports = mongoose.model('SubjectTeacherPerClass', subjectTeacherPerClassSchema);

