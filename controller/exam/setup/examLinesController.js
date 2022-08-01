const ExamLines = require("../../../model/exam/examLines");
const catchAsync = require("../../../utils/catchAsync");
const Units = require("../../../model/units/unit");
const Student = require("../../../model/students/students")

const getAllExams = catchAsync(async (req, res, next) => {
  const examLines = await ExamLines.find().populate({
    path: 'unitID',
    select:
      'unitName unitCode',
  }).populate({
    path: 'termID',
    select:
      'termName',
  }).populate({
    path: 'yearID',
    select:
      'beginsAt endsAt',
  });
  if (!examLines) return res.status(204).json({
    status: 'success',
    data: examLines
  });
  res.status(200).json({
    status: "success",
    result: examLines.length,
    data: examLines,
  });
});

const registerExam = catchAsync(async (req, res, next) => {
  let {
    examName,
    examCode,
    termID,
    yearID,
    examDescription,
    unitID
  } = req.body;
  let studentID = "";
  const duplicate = await ExamLines.findOne({
    examCode: examCode,
  }).exec();
  if (duplicate) {
    return res.status(400).json({
      status: 'failed',
      message: 'A duplicate exam code exist'
    })
  }
  const findUnitExaist = await Units.findOne({
    _id: unitID
  })
  let unitCurrent = findUnitExaist.unitCode
  let findStudentsInClass = await Student.find({
    unitCurrent: unitCurrent
  })
  if (!findStudentsInClass) {
    return res.status(400).json({
      status: 'error',
      message: 'we could not find a matching classs contact your admin for assistance'
    })
  }

  let result = [];
  findStudentsInClass.forEach(async (item, index, arr) => {
    studentID = item.studentID;
    let resultPerItem = await ExamLines.create({
      studentID: studentID,
      examName: examName,
      examCode: examCode,
      termID: termID,
      yearID: yearID,
      unitID:unitID,
      examDescription: examDescription 
  })
  result.push(resultPerItem)
  if(index + 1 === arr.length){
    res.status(200).json( {
      status:'success',
      result:result.length,
      data:result
    })
  }
})



});
const updateExam = catchAsync(async (req, res, next) => {
  let {
    examName,
    termID,
    yearID,
    examDescription,
    examCode,
  } = req.body;
  if (!examCode){
    return res
      .status(400)
      .json({
        status: "failed",
        message: "ID parameter is required."
      });
  }
  const examline = await ExamLine.findOne({
    _id: _id
  }).exec();
  if (!examlines) {
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
  if (!req.body?.unitID) unitID = examSetup.unitID;

  const result = await ExamLines.updateOne(
    { _id: _id },
    {
      examName: examName,
      examCode: examCode,
      termID: termID,
      yearID: yearID,
      examDescriptionexamName: examDescriptionexamName,
      examCode: examCode,
      termID: termID,
      yearID: yearID,
      examDescription: examDescription
    }
  );
  res
    .status(200)
    .json({ status: "success", result: result.length, data: result });
});

const getExamByid = catchAsync(async (req, res, next) => {
  const _id = req.params.id
  if (!_id)
    return res.status(400).json({ status: 'success', message: "Exam ID required." });

  const examSetup = await ExamLines.findById({ _id: req.params.id }).populate({
    path: 'unitID',
    select:
      'unitName unitCode',
  }).populate({
    path: 'termID',
    select:
      'termName',
  }).populate({
    path: 'yearID',
    select:
      'beginsAt endsAt',
  });
  if (!examSetup) return res.status(204).json({ status: 'success', data: examSetup });
  res.status(200).json({
    status: "success",
    result: examSetup.length,
    data: examSetup,
  });
  if (!examSetup) {
    return res
      .status(204)
      .json({ status: 'success', message: `No exam matches ID ${req.params.id}.` });
  }
  res.json(examSetup);
});
module.exports = {
  getAllExams,
  registerExam,
  updateExam,
  getExamByid,
}
