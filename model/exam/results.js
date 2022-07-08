const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
    examCode: {
        type: String,
        required: true
    },
    unitID: {
        type: Number,
        required: true
    },
    examID: {
        type: Number,
        required: true
    },

    marks:[ObjectId], 
    grades:[],
    position:{Number},
    previousGrade:[],
    previousPosition:[]
});

module.exports = mongoose.model('Exam', examSchema);