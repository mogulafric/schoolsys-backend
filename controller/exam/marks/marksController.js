const classExam = require("../../../model/exam/marks");
const catchAsync = require("../../../utils/catchAsync");
const ExamSetup = require("../../../model/exam/setup");
const Student = require("../../../model/students/students")
const   getAllMarks = catchAsync(async (req, res, next) => {
  const ClassExam = await classExam.find().populate({
    path:'examID',
    select:'examName description'
  }).populate({
    path:'studentID',
    select:'studentName studentAdmissionNumber'
  })
  if (!ClassExam) return res.status(204).json({status:'success',  data:examMarks});
  res.status(200).json({
    status: "success",
    result: ClassExam.length,
    data: ClassExam
  });
});
const registerMarks = catchAsync(async(req, res, next)=>{
  const {_id,unitCode,unitID,examCode,examName}= req.body
  let examID = _id
  const findExam = await ExamSetup.findOne({_id:examID})  
  const findStudents = await Student.find({unitCurrent:unitCode})
  const checkExamExist = await classExam.findOne({examID:examID}).exec()
  if(checkExamExist) return res.status(400).json({status:'failed', message:'Exam already exist'})
  let result = [];
    findStudents.forEach(async(item , index, arr)=>{
      let studentName = item.studentName
      let studentID = item._id
      let studentAdmission = item.admissionNumber
      
      const unitExam = await classExam.create({
        examName:examName,
        examCode:examCode,
        examID:examID,
        studentName:studentName,
        studentAdmission:studentAdmission,
        studentID: studentID
      })
      result.push(unitExam)
      console.log(index + 1 +" "+ arr.length )
      if(index + 1 === arr.length) return res.status(200).json({
        status:'succss',
        result:result.length,
        data:result
      })
    })
})
const getClassExamById = catchAsync(async(req,res, next)=>{
  const _id = req.params.id
  const result = await classExam.findById({_id:_id}).populate({
    path : 'examID',
    select:'examName',
    populate : {
      path : 'termID',
      select:'termName termCode',
      populate:{
        path:'yearID',
        select:'beginsAt endsAt'
      }
    }
  }).populate({
    path:'studentID',
    select:'studentName admissionNumber'
  })
  if(!result) return res.status(204).json({
    status:'',
    message:'no data found'
  })
  res.status(200).json({
    status:'success',
    result:result.length,
    data:result
  })
 
})

const captureMarks= catchAsync(async(req, res,next)=>{
  const classExamID = req.body._id
  const ENGILISH = req.body.ENGILISH
  const KISWAHILI = req.body.KISWAHILI
  const MATHEMATICS = req.body.MATHEMATICS
  const BIOLOGY = req.body.BIOLOGY
  const PHYSICS = req.body.PHYSICS
  const CHEMISTRY = req.body.CHEMISTRY
  const HISTORY = req.body.HISTORY
  const CRE = req.body.CRE
  const GEOGRAPHY = req.body.GEOGRAPHY
  const AGRICULTURE = req.body.AGRICULTURE
  const BUSINESS = req.body.BUSINESS
  const subjectCategory = req.body.subjectCategory
  const subjectName = req.body.subjectName
  const subjectscore = null
  const queryClassExamID = await classExam.find({_id:classExamID}).exec() 
  if(!queryClassExamID) return res.status(400).json({
    status:'failed',
    message:'The exam id provided has not been initiated'
  })
if (!req.body?.ENGILISH) ENGILISH = queryClassExamID.ENGILISH;
if (!req.body?.KISWAHILI) KISWAHILI = queryClassExamID.KISWAHILI;
if (!req.body?.MATHEMATICS) MATHEMATICS = queryClassExamID.MATHEMATICS;
if (!req.body?.BIOLOGY) BIOLOGY = queryClassExamID.BIOLOGY;
if (!req.body?.PHYSICS) PHYSICS = queryClassExamID.PHYSICS;
if (!req.body?.CHEMISTRY) PHYSCHEMISTRYICS = queryClassExamID.CHEMISTRY;
if (!req.body?.CHEMISTRY) CHEMISTRY = queryClassExamID.CHEMISTRY;
if (!req.body?.HISTORY) HISTORY = queryClassExamID.HISTORY;
if (!req.body?.CRE) CRE = queryClassExamID.CRE;
if (!req.body?.CRE) GEOGRAPHY = queryClassExamID.GEOGRAPHY;
if (!req.body?.CRE) AGRICULTURE = queryClassExamID.AGRICULTURE;
const result = await updateOne  
})
const unsetExaminableSubject = catchAsync(async(req, res,next)=>{
  const {examID, subjectIndex}= req.params 


 const queryExamID = await classExam.find().exec() 
 queryExamID.forEach((item, index, arr)=>{
  console.log(item.subjects[2].subjectCategory)
 })
 
})
const updateSubjectMarks = catchAsync(async(req, res,next)=>{
  const examID = req.body.examID
  const subjectID = req.body.subjectID
  const subjectscore = null
  const subjectCategory = req.body.subjectCategory
  const subjectName = req.body.subjectName
  
  const queryExamID = await classExam.find().exec() 
  if(!queryExamID) return res.status(400).json({
    status:'failed',
    message:'The exam id provided has not been initiated'
  })
  
  queryExamID.forEach((item,index, arr)=>{
        let _id = item._id
        let values= {subjectName:subjectName,subjectCategory:subjectCategory }
    let query = {subjectCategory:subjectCategory,subjectName:subjectName,subjectscore:subjectscore}
  const result =classExam.findOneAndDelete({_id: _id}, { $pop: {subjects: query}}).exec()
  if(index + 1 ===arr.length) return res.status(200).json({
    status:'success',
    data:result
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
module.exports = {
  getAllMarks,
  registerMarks,
  updateMarks,
  getExamByid,
  captureMarks,
  getClassExamById,
  unsetExaminableSubject,
};
