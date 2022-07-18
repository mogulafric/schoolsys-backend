const classExam = require("../../../model/exam/marks");
const catchAsync = require("../../../utils/catchAsync");
const ExamSetup = require("../../../model/exam/setup");
const Student = require("../../../model/students/students")
const   getAllMarks = catchAsync(async (req, res, next) => {
  const ClassExam = await classExam.find().populate({
    path:'examID',
    select:'examName examCode description'
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
  let examID = examID
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
  const examID= req.params.examID
  console.log(examID)
  const result = await classExam.find({examID:examID}).populate({
    path : 'examID',
    select:'examName examCode',
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
    status:'success',
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
  let ENGLISH= req.body.ENGLISH
  let KISWAHILI = req.body.KISWAHILI
  let MATHEMATICS = req.body.MATHEMATICS
  let BIOLOGY = req.body.BIOLOGY
  let PHYSICS = req.body.PHYSICS
  let CHEMISTRY = req.body.CHEMISTRY
  let HISTORY = req.body.HISTORY
  let CRE = req.body.CRE
  let GEOGRAPHY = req.body.GEOGRAPHY
  let AGRICULTURE = req.body.AGRICULTURE
  let BUSINESS = req.body.BUSINESS
 
  let queryClassExamID = await classExam.find({_id:classExamID}).exec() 
  if(!queryClassExamID) return res.status(400).json({
    status:'failed',
    message:'We sorry could not retrieve related information'
  })
if (!req.body?.ENGLISH) ENGLISH = queryClassExamID.ENGLISH;
if (!req.body?.KISWAHILI) KISWAHILI = queryClassExamID.KISWAHILI;
if (!req.body?.MATHEMATICS) MATHEMATICS = queryClassExamID.MATHEMATICS;
if (!req.body?.BIOLOGY) BIOLOGY = queryClassExamID.BIOLOGY;
if (!req.body?.PHYSICS) PHYSICS = queryClassExamID.PHYSICS;
if (!req.body?.CHEMISTRY) CHEMISTRY = queryClassExamID.CHEMISTRY;
if (!req.body?.HISTORY) HISTORY = queryClassExamID.HISTORY;
if (!req.body?.CRE) CRE = queryClassExamID.CRE;
if (!req.body?.GEOGRAPHY) GEOGRAPHY = queryClassExamID.GEOGRAPHY;
if (!req.body?.AGRICULTURE) AGRICULTURE = queryClassExamID.AGRICULTURE;
if (!req.body?.BUSINESS) BUSINESS = queryClassExamID.BUSINESS;
console.log(ENGLISH)
let queryMarcksCapture = {
  ENGLISH:ENGLISH,
  KISWAHILI:KISWAHILI,
  MATHEMATICS:MATHEMATICS,
  BIOLOGY:BIOLOGY,
  PHYSICS:PHYSICS,
  CHEMISTRY:CHEMISTRY,
  HISTORY:HISTORY,
  CRE:CRE,
  GEOGRAPHY:GEOGRAPHY,
  AGRICULTURE:AGRICULTURE,
  BUSINESS:BUSINESS
}
const result = await classExam.updateMany(
  {_id:classExamID},queryMarcksCapture,{upsert:false}
)  
res.status(201).json({
  status:'success',
  result:result.length,
  data:result
})
})


const getMarksByExamID = catchAsync(async (req, res, next) => {
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
  getMarksByExamID,
  getExamByid,
  captureMarks,
  getClassExamById
  
};
