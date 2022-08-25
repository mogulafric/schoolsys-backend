const CaptureMarks = require("../../../model/exam/examLines");
const SetUpExam = require("../../../model/exam/examHeader");
const catchAsync = require("../../../utils/catchAsync");
const Students = require("../../../model/students/students")
const Unit = require("../../../model/units/unit")
const initiateMarks = catchAsync(async (req, res, next) => {
      let data = req.body
      let examID = data._id
      const checkExist = await CaptureMarks.findOne({
            examID: examID
      })
      if (checkExist) {
            return res.status(400).json({
                  status: 'failed',
                  message: 'The exam has already been initiated'
            })
      }
      let unitID = data.unitID
      let getUnitID = await Unit.findById({
            _id: unitID
      })
      let unitCurrent = getUnitID.unitCode
      const studentsUnit = await Students.find({
            unitCurrent: unitCurrent
      })
      let setUpExam = await SetUpExam.findOne({
            _id: examID
      })
    
      let examinableSubjects = setUpExam.examinableSubjects
    // console.log(examinableSubjects)
      let StudentID = studentsUnit.map((el) => {
            return el._id
      })
      let result = []
      let studentsMarks = StudentID.map((el) => {
            let studentID = el
            
            let examLinesQuery = {
                  examID: examID,
                  studentID: studentID,
                  examinableSubjects:examinableSubjects
            }
            result.push(examLinesQuery) 
      })
      let finalResult = await CaptureMarks.create(result)
    res.status(200).json({
      status:'success',
      result:finalResult.length,
      data:finalResult
    })     


})
const captureMarks = catchAsync(async (req, res, next) => {
})
const getCapturedMarksByExamCode = catchAsync(async (req, res, next) => {
})
const getCapturedMarksByEntryID = catchAsync(async (req, res, next) => {
})
module.exports = {
      initiateMarks,
      captureMarks,
      getCapturedMarksByExamCode,
      getCapturedMarksByEntryID,
};
