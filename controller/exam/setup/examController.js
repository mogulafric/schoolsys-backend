const ExamSetup = require("../../../model/exam/setup");
const catchAsync = require("../../utils/catchAsync.js");

const   getAllExams = catchAsync(async (req, res, next) => {
  const examSetup = await ExamSetup.find();
  if (!examSetup) return res.status(204).json({status:'success',  data:examSetup });
  res.status(200).json({
    status: "success",
    result: students.length,
    data: examSetup,
  });
});
const registerExam = catchAsync(async (req, res, next) => {
  const {examName, examCode, termID, yearID, examDescription} = req.body;
  const duplicate = await Student.findOne({
    examCode: examCode,
  }).exec();
  if (duplicate)
    return res.status(409).json({
      status: "success",
      message: "Duplicate , Examcode must be unique",
    }); //Conflict
  const result = await ExamSetup.create({
    examName:examName,
     examCode:examCode,
     termID:termID, 
     yearID:yearID,
     examDescriptionexamName:examDescriptionexamName,
     examCode:examCode,
     termID:termID,
     yearID:yearID,
     examDescription:examDescription
  });
  res.status(201).json({
    status: "success",
    result: result.length,
    data: result,
  });
});
const updateExam = catchAsync(async (req, res, next) => {
    let {examName, examCode, termID, yearID, examDescription} = req.body;
  if (!req?.body?._id) {
    return res
      .status(400)
      .json({ status: "failed", message: "ID parameter is required." });
  }
  const examSetup = await ExamSetup.findOne({ _id:_id }).exec();
  if (!examSetup) {
    return res.status(400).json({
      status: "failed",
      message: `No student matches ID ${req.body._id}.`,
    });
  }
  if (!req.body?.examName) examName = examSetup.examName;
  if (!req.body?.examCode) examCode = examSetup.examCode;
  if (!req.body?.termID) termID = examSetup.termID;
  if (!req.body?.yearID) yearID = examSetup.yearID;
  if (!req.body?.examDescription) examDescription = examSetup.examDescription;

  const result = await ExamSetup.updateOne(
    { _id: _id },
    {
        examName:examName,
        examCode:examCode,
        termID:termID, 
        yearID:yearID,
        examDescriptionexamName:examDescriptionexamName,
        examCode:examCode,
        termID:termID,
        yearID:yearID,
        examDescription:examDescription
    }
  );
  res
    .status(200)
    .json({ status: "success", result: result.length, data: result });
});

const getExamById = catchAsync(async (req, res, next) => {
  const _id = req.params.id
    if (!_id )
    return res.status(400).json({ status:'success',message: "Exam ID required." });

  const examSetup = await ExamSetup.findOne({ _id: req.params.id }).exec();
  if (!examSetup) {
    return res
      .status(204)
      .json({ status:'success',message: `No exam matches ID ${req.params.id}.` });
  }
  res.json(examSetup);
});
// const archive = catchAsync(async (req, res, next) => {
//   const {_id} = req.body;
//   if (!req?.body?.id)
//     return res.status(400).json({ message: " ID required." });

//   const student = await Student.findOne({ _id: id }).exec();
//   if (!student) {
//     return res
//       .status(204)
//       .json({ message: `No Student matches ID ${req.body.id}.` });
//   }
//   const result = await Student.deleteOne(); //{ _id: req.body.id }
//   res
//     .status(200)
//     .json({ status: "success", result: result.length, data: result });
// });
// const deactivate= catchAsync(async (req, res, next) => {
//  const _id = req.body.params.id
//   if (_id)
//     return res.status(400).json({status:'', message: "Exam ID required." });
//   const examSetup = await ExamSetup.findOne({_id: _id}).exec();
//   if (!examSetup){
//     return res
//       .status(204)
//       .json({
//         status:'success',
//         message: `No Exam matching ID ${req.params.id}.` });
//   }
//   res.status(200).json({status:'success', result:length.examSetup, data:result});
// });
module.exports = {
  getAllExams,
  registerExam,
  updateExam,
  getexambyid,
  archive,
  deactivate
};
