
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const academicYearSchema = new Schema({
    beginsAt: {
        type: Date,
        required: true 
    },
    endsAt:{
        type: Date,
        required: true
    }
});
module.exports = mongoose.model('AcademicYear', academicYearSchema);
