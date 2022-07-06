const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subjectCode: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    subjectShortForm: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Subject', subjectSchema);
