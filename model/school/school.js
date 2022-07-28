const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schoolSchema = new Schema({
    schoolName: {type: String,required: true, unique:true},
    schoolCode: {type: Number,required: true},
    schoolMotto:{type:String, required:true},
    schoolLogo:{type:String},
    schoolID: {type: Number,required: true},
    schoolCounty:{type: Number,required: true},
    schoolPrincipal:{type:String},
    schoolDeputy:{type:String},
    schoolSeniorTeacher:{type:String},
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true}
});
module.exports = mongoose.model('School', schoolSchema);