const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examHeaderSchema = new Schema({
    examID:{type: mongoose.Schema.ObjectId,ref: "ExamLine"}, 
});
module.exports = mongoose.model('ExamHeader', examHeaderSchema);