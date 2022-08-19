const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectGroupSchema = new Schema({
    groupName: {type: String,required: true},
    groupShortName: {type: String,required: true,},
    subjects:[{type:mongoose.Schema.ObjectId,ref:'Subject'}],
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true}
});
module.exports = mongoose.model('SubjectGroup', subjectGroupSchema);



