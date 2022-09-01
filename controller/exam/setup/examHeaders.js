const ExamHeader = require("../../../model/exam/examHeader");
const catchAsync = require("../../../utils/catchAsync");
const Units = require("../../../model/units/unit");
const Subjects = require("../../../model/exam/examinableSubjects");
const { json } = require("body-parser");
const getAllExams = catchAsync(async (req, res, next) => {
  const result = await ExamHeader.find() 
  res.status(200).json({
    status:'success',
    result:result.lenght,
    data:result
  })
})

const getExamById = catchAsync(async (req, res, next) => {
  let _id = req.param.id
  const examHeaders = await ExamHeader.find({_id:_id}).populate({
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
  if (!examHeaders) return res.status(204).json({
    status: 'success',
    data: examHeaders
  });
  res.status(200).json({
    status: "success",
    result: examHeaders.length,
    data: examHeaders,
  });
});

const registerExam = catchAsync(async (req, res, next) => {
  let data= req.body;
  let examCode = data.examCode
  const duplicate = await ExamHeader.findOne({
    examCode: examCode,
  }).exec();
  if (duplicate) {
    return res.status(400).json({
      status: 'failed',
      message: 'A duplicate exam code exist'
    })
  }
  let subjects = await Subjects.find()

  data.examinableSubjects = subjects
  data.totalSubjects = subjects.length
  if(data.totalSubjects < data.gradedSubjects)
  {
    return res.status(400).json({
      status:'failed',
      message:'graded subject cannot be more than total subjects'
    })
  }
 
  const result = await ExamHeader.create(data)
  res.status(200).json({
    status:"success",
    result:result.length,
    data:result
  })
});
const updateExam = catchAsync(async (req, res, next) => {
  let {
    examName,
    termID,
    yearID,
    examDescription,
    _id
  } = req.body;
  if (!_id){
    return res
      .status(400)
      .json({
        status: "failed",
        message: " Specify the exam you want to update."
      });
  }
  const examHeader = await ExamHeader.findOne({
    _id: _id
  }).exec();
  if (!examHeader){
    return res.status(400).json({
      status: "failed",
      message: `mismatched of entered field!`,
    });
  }

  if (!req.body?.examName) examName = examHeader.examName;
  if (!req.body?.termID) termID = examHeader.termID;
  if (!req.body?.yearID) yearID = examHeader.yearID;
  if (!req.body?.examDescription) examDescription = examHeader.examDescription;
  const result = await ExamHeader.updateMany(
    { _id: _id },
    {
      examName: examName,
      termID: termID,
      yearID: yearID,
      examDescription: examDescription,
    }
  );
  
     return   res.status(200).json({ 
      status: "success", result: result.length, data: result 
    });


})


const getExamByid = catchAsync(async (req, res, next) => {
  const _id = req.params.id
  if (!_id)
    return res.status(400).json({ status: 'success', message: "Exam ID required." });

  const examSetup = await ExamHeader.findById({ _id: _id }).populate({
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
  if (!examSetup){
    return res.status(200).json({ 
    status: 'success',
    data: examSetup 
  })
}
  res.status(200).json({
    status: "success",
    result: examSetup.length,
    data: examSetup,
  });
  if (!examSetup) {
    return 
    res.status(204).json({
       status: 'success', 
       message: `No exam matches ID `
       });
  }
  res.json(examSetup);
});
module.exports = {
  getAllExams,
  registerExam,
  updateExam,
  getExamByid
}
