const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = new Schema({
    firstparent: {
        type: String,
        required: true
    },
   
    firstparentnumber: {
        type: Number,
        required: true
    },
    secondparent: {
        type: String 
    },
    secondparentnumber: {
        type: Number 
    },
    isArchived:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true},
   
    studentadmissionnumber:[reference]
});

module.exports = mongoose.model('Parent', parentSchema);