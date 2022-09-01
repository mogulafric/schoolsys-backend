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

      let students = []
      let StudentID = studentsUnit.map((el) => {
            students.push(el)
      })

      let result = []
      let studentsMarks = students.map((el) => {

            let studentID = el
            let examLinesQuery = {
                  examID: examID,
                  studentID: studentID
            }
            result.push(examLinesQuery)
      })
      const finalResult = await CaptureMarks.create(result)
      const examlinesEntries = await CaptureMarks.find({ examID: examID })
      examlinesEntries.forEach(async (item, index, arr) => {
            let addMarksID = item._id
            let addSubject = await CaptureMarks.updateOne({
                  _id: addMarksID
            },
                  {
                        $addToSet: {
                              examinableSubjects:
                                    { $each: examinableSubjects }
                        }
                  }
            )

      })
      res.status(200).json({
            status: 'success',
            result: finalResult.length,
            data: finalResult
      })
})
const captureScoreByExamBySubject = catchAsync(async (req, res, next) => {
      let { _id, subjectObjectID, score } = req.body
      const findExamList = await CaptureMarks.findOne({ _id: _id })
      if (!findExamList) {
            return res.status(400).json({
                  status: 'failed',
                  message: 'we could not retried a matching id for the selected item'
            })
      }
     
      let updateSubjectScore = await CaptureMarks.updateOne({
            _id: _id,"examinableSubjects.$[]._id": subjectObjectID
      },
            {
                  "$set":{"examinableSubjects.$[].score": score}
            },
            {
                  multi:true
            })
      res.status(200).json({
            status: 'success',
            result: updateSubjectScore.length,
            data: updateSubjectScore
      })

})
const getCapturedMarksByItemEntryID = catchAsync(async (req, res, next) => {
      let entryID = req.params.entryID
      const examEntries = await CaptureMarks.findOne({entryID:entryID })
      if (!examEntries) {
            return res.status(400).json({
                  status: 'failed',
                  message: 'We could find a matching data for your request'
            })
      }
      res.status(200).json({
            status: 'success',
            result: examEntries.length,
            data: examEntries
      })
})
const getCapturedMarksByExamID = catchAsync(async (req, res, next) => {
      let examID = req.params.examID
      const examEntries = await CaptureMarks.find({examID:examID })
      if (!examEntries){
            return res.status(400).json({
                  status: 'failed',
                  message: 'We could find a matching data for your request'
            })
      }
      res.status(200).json({
            status: 'success',
            result: examEntries.length,
            data: examEntries
      })
})
module.exports = {
      initiateMarks,
      captureScoreByExamBySubject,
      getCapturedMarksByExamID,
      getCapturedMarksByItemEntryID

};
