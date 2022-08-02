const CaptureMarks = require("../../../model/exam/examLines");
const catchAsync = require("../../../utils/catchAsync");
const subjectGrading = require("../../../utils/subjectsGrading");
const getAllCaptureMarksByExamCode = catchAsync(async (req, res, next) => {
  let examCode = req.params
  const captureMarks = await CaptureMarks.find({examCode:examCode}).populate({
    path: 'subjects.$.subjectID',
  })
  if (!captureMarks) return res.status(204).json({
    status: 'success',
    data: captureMarks
  });
  res.status(200).json({
    status: "success",
    result: captureMarks.length,
    data: captureMarks,
  });
});

const UpdateMarksPerStudentPerSubject = catchAsync(async (req, res, next) => {
  let {
    _id,
    subjectID,
    name,
    score
  } = req.body;
  
  let points = grades.subjectPoints
  let grade = grades.subjectGrade
  let comment = grades.subjectComment
 let result =  await CaptureMarks.updateMany(
  {_id:_id, "subject.subjectID":subjectID}, 
  {$set: {"subject.$.score": score, "subject.$.points":points, "subject.$.grade":grade, "subject.$.comment":comment}
})
  res.status(201).json({
    status: "success",
    result: result.length,
    data: result,
  });
});

const updateMutipleStudents = catchAsync(async (req, res, next) => {
  let {
    data
  } = req.body;
  if(!data){
    return res.json({
      status:'failed',
      message: "No data was submitted"
    })
  }
  let result = [];
  data.forEach(async(item,index, arr)=>{
    let _id = item._id
    let score = item.subject.$.score
    let name = item.subject.$.score
    let grades = subjectGrading(name , score)
    let points = grades.subject.$.subjectPoints 
    let grade = grades.subject.$.subjectGrade
    let comments = grades.subject.$.subjectComments

   let resultPerItem = await CaptureMarks.updateMany(
      {_id:_id, "subject.subjectID":subjectID}, 
      {$set: {"subject.$.score": score, "subject.$.points":points, "subject.$.grade":grade, "subject.$.comment":comment}
    })
    result.push(resultPerItem)
   if(index + 1 === arr.length){
    return res.status(201).json({
      status: "success",
      result: result.length,
      data: result,
    });
   }
  })
});
const junior= catchAsync(async (req, res, next)=>{
  let examCode =req.body
  let findStudentList = await CaptureMarks.find({
    examCode:examCode
  })
  let result = []
  findStudentList.forEach(async(item, index, arr)=>{
  let _id = item._id
  let marksArray = []
  let pointsArray = []
  let subject = item.subject
  subject.forEach(async( el, i, ar)=>{
    marksArray.push(el.subject.$.score)
    pointsArray.push(el.subject.$.points)
  })
  let itemResult = await overalJuniorRanking(_id, marksArray, pointsArray)
  result.push(itemResult)
  })
})
const senior = catchAsync(async(req, res, next)=>{
  let examCode =req.body
  let findStudentList = await CaptureMarks.find({
    examCode:examCode
  })
  let result = []
  findStudentList.forEach(async(item, index, arr)=>{
  let _id = item._id
  let marksArray = []
  let pointsArray = []
  let subject = item.subject
  subject.forEach(async( el, i, ar)=>{
    marksArray.push(el.subject.$.score)
    pointsArray.push(el.subject.$.points)
  })
  let itemResult = await overalJuniorRanking(_id, marksArray, pointsArray)
  result.push(itemResult)
  })
})
module.exports = {
  getAllCaptureMarksByExamCode,
  UpdateMarksPerStudentPerSubject,
  updateMutipleStudents,
  junior,
  senior
};
