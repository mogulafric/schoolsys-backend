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
      let { _id, subjectObjectID, score, index } = req.body
      const findExamList = await CaptureMarks.findOne({ _id: _id })
      if (!findExamList){
            return res.status(400).json({
                  status: 'failed',
                  message: 'we could not retried a matching id for the selected item'
            })
      }
      const querySelector = JSON.parse(`{
      "_id": "${_id}","examinableSubjects.${index}._id": "${subjectObjectID}"
}`)
      const query = JSON.parse(`{"examinableSubjects.${index}.score": "${score}"}`)
      let updateSubjectScore = await CaptureMarks.updateOne(querySelector,
            {
                  $set: query
            },
            {
                  multi: true
            })
      res.status(200).json({
            status: 'success',
            result: updateSubjectScore.length,
            data: updateSubjectScore
      })
})
const getCapturedMarksByItemEntryID = catchAsync(async (req, res, next) => {
      let entryID = req.params.entryID
      const examEntries = await CaptureMarks.findOne({_id: entryID })
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
const getCapturedMarksByExamID=catchAsync(async (req, res, next) => {
      let examID = req.params.examID
      const examEntries = await CaptureMarks.find({examID:examID})
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
const subjectGradesAndComments=catchAsync(async (req, res, next) => {
      let {examID, SubjectID, isKiwaswahili} = req.body

      let score = 80
      let grade = ""
      let comment = ""
      let points = 0
      // calculate subject grade
      if(score >=80 || score <=100){
            grade = "A"
            comment = "Excellent"
            points = 12
      } 
      else if(score >=75 || score <= 79.99){
            grade = "A-"
            comment = "V.Good"
            points = 11 
      }
      else if(score >=70 || score <=75.99){
            grade = "B+"
            comment = "Good"
            points = 9
      }
      else if(score >=65 || score <=69.99){
            grade = "B+"
            comment = "Good"
            points =8
      }
      else if(score >=60 || score <= 64.99 ){
            grade = "B+"
            comment = "Good"
            points =8
      }
      else if(score >= 55 || score <= 59.99){
            grade = "B+"
            comment = "Good"
            points =7
      }
      else if(score >= 50 || score <= 54.99){
            grade = "B+"
            comment = "Good"
            points =6
      }
      else if(score >= 45 || score <= 49.99){
            grade = "B+"
            comment = "Good"
            points =5
      }
      else if(score >= 40 || score <= 44.99){
            grade = "B+"
            comment = "Good"
            points =4
      }
      else if(score >=35 || score <= 39.99){
            grade = "B+"
            comment = "Good"
            points =3
      }
      else if (score >= 30 || score <= 34.99){
            grade = "B+"
            comment = "Good"
            points =2
      }
      else if(score >= 0 || score <= 29.99){
            grade = "B+"
            comment = "Good"
            points =1
      }
      else{

      }
      // add comments
      // update teachers details

      const examEntries = await CaptureMarks.find({examID:examID})
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
      getCapturedMarksByItemEntryID,
      subjectGradesAndComments

};
