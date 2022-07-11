const ExamMarks = require("../../../model/exam/marks");
const catchAsync = require("../../../utils/catchAsync");
const ExamSetup = require("../../../model/exam/setup");
const Student = require("../../../model/students/students")

const   getAllMarks = catchAsync(async (req, res, next) => {
  const examMarks = await ExamMarks.find();
  if (!examMarks) return res.status(204).json({status:'success',  data:examMarks});
  res.status(200).json({
    status: "success",
    result: examMarks.length,
    data: examMarks,
  });
});
const registerMarks = catchAsync(async(req, res, next)=>{
  const {_id}= req.body
  const findExam = await ExamSetup.findOne({_id:_id})  
  if(!findExam) return res.status(400).json({
    status:'failed',
    message:'Error, we could not find a matach for the id supplied!, conatct your system administor'
  })
  let unit = findExam.unitID
  let examCode = findExam.examCode
  let examName = findExam.examName 
    const findStudents = await Student.find({unitCurrent:unit})
    findStudents.forEach((item , index, arr)=>{
      let studentName = item.studentName
      let studentId = item._id
      let studentAdmission = item.admissionNumber
      console.log(studentId)
      const examMarks = ExamMarks.create({
        examName:examName,
        examCode:examCode,
        examID:_id, 
        studentName:studentName,
        studentAdmission:studentAdmission,
        studentID: studentId
      })
    })
   
 

})
const updateMarks = catchAsync(async (req, res, next) => {
    let marks= {English, examCode, termID, yearID, examDescription} = req.body;
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

  const result = await ExamMarks.updateOne(
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

const getExamByid = catchAsync(async (req, res, next) => {
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
  getAllMarks,
  registerMarks,
  updateMarks,
  getExamByid,
};
// archive,
//   deactivate
