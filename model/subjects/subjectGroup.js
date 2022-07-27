const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectGroupSchema = new Schema({
    subjectID: {type:mongoose.Schema.ObjectId,ref:'Subject'},
    groupName: {type: String,required: true},
    groupShortName: {type: String,required: true,},
    subjectGroup:{type:String,enum:['Category1','Category2', 'Category3','Category4']},
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true}
});
module.exports = mongoose.model('SubjectGroup', subjectGroupSchema);



