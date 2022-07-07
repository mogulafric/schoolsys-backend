const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    teachername: {
        type: String,
        required: true
    },
    teachernumber: {
        type: String,
        required: true
    },
    teacherrole: {type:String},
    teachercontact:{type:String},
    teacherEmail:{type:String, required:[true, 'Email is required']},
    unitTeacher:[reference],
    createAt:{type:Date, Default:Date.now()},
    lateUpdated:{type:Dae, Default:Date.now()},
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true}

});

module.exports = mongoose.model('Teacher', teacherSchema);