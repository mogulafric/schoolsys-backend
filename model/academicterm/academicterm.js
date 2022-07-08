const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const academicTermSchema = new Schema({
    termName: {
        type: String,
        required: true   
    },
    termID:{
        type: Number,
        required: true
    },
    yearID:String
});
module.exports = mongoose.model('AcademicTerm', academicTermSchema);

