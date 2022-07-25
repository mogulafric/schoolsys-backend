const classExam = require("../../../model/exam/marks");
const catchAsync = require("../../../utils/catchAsync");
const ExamSetup = require("../../../model/exam/setup");
const Student = require("../../../model/students/students")
const   getAllMarks = catchAsync(async (req, res, next) => {
  const ClassExam = await classExam.find().populate({
    path : 'examID',
    populate : {
      path : 'termID',
      populate:{
        path:'yearID',
        select:'beginsAt endsAt'
      }
    }
  }).populate({
    path:'studentID',
    model:'Student',
  }).populate({
    path:'examID',
    populate:{
      path:'yearID'
    }
  })
  if (!ClassExam) return res.status(204).json({status:'success',  data:examMarks});
  res.status(200).json({
    status: "success",
    result: ClassExam.length,
    data: ClassExam
  }).exec();
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
  const result = await classExam.find({examID:examID}).populate({
    path : 'examID',
    populate : {
      path : 'termID',
      populate:{
        path:'yearID',
        select:'beginsAt endsAt'
      }
    }
  }).populate({
    path:'studentID',
    model:'Student'
  }).populate({
    path:'examID',
    populate:{
      path:'yearID'
    }
  })
  if(!result) return res.status(204).json({
    status:'success',
    message:'no data found'
  })
  res.status(200).json({
    status:'success',
    result:result.length,
    data:result
  }).exec()
 
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

  const examSetup = await classExam.findOne({ _id: req.params.id }).exec();
  if (!examSetup) {
    return res
      .status(204)
      .json({ status:'success',message: `No exam matches ID ${req.params.id}.` });
  }
  res.json(examSetup);
});

const processResults = catchAsync(async(req,res, next)=>{
  const examID= req.body.examID
  const unit = req.body.unit
  const findStudentSubjectMarks = await classExam.find({examID:examID})
  let {ENGLISHGRADE,MATHEMATICSGRADE,KISWAHILISGRADE,BIOLOGYGRADE,PHYSICSGRADE,CHEMISTRYGRADE,HISTORYGRADE,CREGRADE,GEOGRAPHYGRADE,BUSINESSGRADE,AGRICULTUREGRADEGRADE} = null
  let {ENGLISHPOINTS,MATHEMATICSPOINTS,KISWAHILISPOINTS,BIOLOGYPOINTS,PHYSICSPOINTS,CHEMISTRYPOINTS,HISTORYPOINTS,CREPOINTS,GEOGRAPHYPOINTS,BUSINESSPOINTS,AGRICULTUREPOINTS} = null
 if(!findStudentSubjectMarks) return res.status(200).json({
    status:'failed',
    message:'We could not find a matching exam in our database, try again or contact your ict support'
  })
  if(unit ===1 || unit ===2){
    // form one and two
    findStudentSubjectMarks.forEach(async(item, index , arr)=>{
      let _id = item._id
      let english = item.ENGLISH
      let kiswahili = item.KISWAHILI
      let mathematics = item.MATHEMATICS
      let biology = item.BIOLOGY
      let physics = item.PHYSICS
      let chemistry = item.CHEMISTRY
      let history = item.HISTORY
      let geography = item.GEOGRAPHY
      let cre = item.CRE
      let agriculture = item.AGRICULTURE
      let business = item.BUSINESS
     // english
      if(english >= 80 && english <= 100){  ENGLISHGRADE = "A"; ENGLISHPOINTS= 12}
      if(english >= 75 && english <= 79){  ENGLISHGRADE = "A-"; ENGLISHPOINTS= 11}
      if(english >= 70 && english <= 74){  ENGLISHGRADE = "B+"; ENGLISHPOINTS= 10}
      if(english >= 65 && english <= 69){  ENGLISHGRADE = "B";  ENGLISHPOINTS= 9}
      if(english >= 60 && english <= 64){  ENGLISHGRADE = "B-";ENGLISHPOINTS= 8}
      if(english >= 55 && english <= 59){  ENGLISHGRADE = "C+"; ENGLISHPOINTS= 7}
      if(english >= 50 && english <= 54){  ENGLISHGRADE = "C";  ENGLISHPOINTS= 6}
      if(english >= 45 && english <= 49){  ENGLISHGRADE = "C-"; ENGLISHPOINTS= 5}
      if(english >= 40 && english <= 44){  ENGLISHGRADE = "D+";ENGLISHPOINTS= 4}
      if(english >= 35 && english <= 39){  ENGLISHGRADE = "D";  ENGLISHPOINTS= 3}
      if(english >= 30 && english <= 34){  ENGLISHGRADE = "D-"; ENGLISHPOINTS= 2}
      if(english >= 0 && english <= 29){  ENGLISHGRADE = "E";  ENGLISHPOINTS= 1}


      // kisw
      if(kiswahili >= 80 && kiswahili <= 100){  KISWAHILISGRADE = "A"; KISWAHILISPOINTS= 12}
      if(kiswahili >= 75 && kiswahili <= 79){  KISWAHILISGRADE = "A-"; KISWAHILISPOINTS= 11}
      if(kiswahili >= 70 && kiswahili <= 74){  KISWAHILISGRADE = "B+"; KISWAHILISPOINTS= 10}
      if(kiswahili >= 65 && kiswahili <= 69){  KISWAHILISGRADE = "B"; KISWAHILISPOINTS= 9}
      if(kiswahili >= 60 && kiswahili <= 64){  KISWAHILISGRADE = "B-"; KISWAHILISPOINTS= 8}
      if(kiswahili >= 55 && kiswahili <= 59){  KISWAHILISGRADE = "C+"; KISWAHILISPOINTS= 7}
      if(kiswahili >= 50 && kiswahili <= 54){  KISWAHILISGRADE = "C"; KISWAHILISPOINTS= 6}
      if(kiswahili >= 45 && kiswahili <= 49){  KISWAHILISGRADE = "C-"; KISWAHILISPOINTS= 5}
      if(kiswahili >= 40 && kiswahili <= 44){  KISWAHILISGRADE = "D+"; KISWAHILISPOINTS= 4}
      if(kiswahili >= 35 && kiswahili <= 39){  KISWAHILISGRADE = "D"; KISWAHILISPOINTS= 3}
      if(kiswahili >= 30 && kiswahili <= 34){  KISWAHILISGRADE = "D-"; KISWAHILISPOINTS= 2}
      if(kiswahili >= 0 && kiswahili <= 29){  KISWAHILISGRADE = "E"; KISWAHILISPOINTS= 1}
      // math
      if(mathematics >= 80 && mathematics <= 100){  MATHEMATICSGRADE = "A"; MATHEMATICSPOINTS= 12}
      if(mathematics >= 75 && mathematics <= 79){  MATHEMATICSGRADE = "A-"; MATHEMATICSPOINTS= 11}
      if(mathematics >= 70 && mathematics <= 74){  MATHEMATICSGRADE = "B+"; MATHEMATICSPOINTS= 10}
      if(mathematics >= 65 && mathematics <= 69){  MATHEMATICSGRADE = "B"; MATHEMATICSPOINTS= 9}
      if(mathematics >= 60 && mathematics <= 64){  MATHEMATICSGRADE = "B-"; MATHEMATICSPOINTS= 8}
      if(mathematics >= 55 && mathematics <= 59){  MATHEMATICSGRADE = "C+"; MATHEMATICSPOINTS= 7}
      if(mathematics >= 50 && mathematics <= 54){  MATHEMATICSGRADE = "C"; MATHEMATICSPOINTS= 6}
      if(mathematics >= 45 && mathematics <= 49){  MATHEMATICSGRADE = "C-"; MATHEMATICSPOINTS= 5}
      if(mathematics >= 40 && mathematics <= 44){  MATHEMATICSGRADE = "D+"; MATHEMATICSPOINTS= 4}
      if(mathematics >= 35 && mathematics <= 39){  MATHEMATICSGRADE = "D"; MATHEMATICSPOINTS= 3}
      if(mathematics >= 30 && mathematics <= 34){  MATHEMATICSGRADE = "D-"; MATHEMATICSPOINTS= 2}
      if(mathematics >= 0 && mathematics <= 29){  MATHEMATICSGRADE = "E"; MATHEMATICSPOINTS= 1}
      // bio
      if(biology >= 80 && biology <= 100){  BIOLOGYGRADE = "A"; BIOLOGYPOINTS= 12}
      if(biology >= 75 && biology <= 79){  BIOLOGYGRADE = "A-"; BIOLOGYPOINTS= 11}
      if(biology >= 70 && biology <= 74){  BIOLOGYGRADE = "B+"; BIOLOGYPOINTS= 10}
      if(biology >= 65 && biology <= 69){  BIOLOGYGRADE = "B"; BIOLOGYPOINTS= 9}
      if(biology >= 60 && biology <= 64){  BIOLOGYGRADE = "B-"; BIOLOGYPOINTS= 8}
      if(biology >= 55 && biology <= 59){  BIOLOGYGRADE = "C+"; BIOLOGYPOINTS= 7}
      if(biology >= 50 && biology <= 54){  BIOLOGYGRADE = "C"; BIOLOGYPOINTS= 6}
      if(biology >= 45 && biology <= 49){  BIOLOGYGRADE = "C-"; BIOLOGYPOINTS= 5}
      if(biology >= 40 && biology <= 44){  BIOLOGYGRADE = "D+"; BIOLOGYPOINTS= 4}
      if(biology >= 35 && biology <= 39){  BIOLOGYGRADE = "D"; BIOLOGYPOINTS= 3}
      if(biology >= 30 && biology <= 34){  BIOLOGYGRADE = "D-"; BIOLOGYPOINTS= 2}
      if(biology >= 0 && biology <= 29){  BIOLOGYGRADE = "E"; BIOLOGYPOINTS= 1}

      //phy
      if(chemistry >= 80 && chemistry <= 100){  CHEMISTRYGRADE = "A"; CHEMISTRYPOINTS= 12}
      if(chemistry >= 75 && chemistry <= 79){  CHEMISTRYGRADE = "A-"; CHEMISTRYPOINTS= 11}
      if(chemistry >= 70 && chemistry <= 74){  CHEMISTRYGRADE = "B+"; CHEMISTRYPOINTS= 10}
      if(chemistry >= 65 && chemistry <= 69){  CHEMISTRYGRADE = "B"; CHEMISTRYPOINTS= 9}
      if(chemistry >= 60 && chemistry <= 64){  CHEMISTRYGRADE = "B-"; CHEMISTRYPOINTS= 8}
      if(chemistry >= 55 && chemistry <= 59){  CHEMISTRYGRADE = "C+"; CHEMISTRYPOINTS= 7}
      if(chemistry >= 50 && chemistry <= 54){  CHEMISTRYGRADE = "C"; CHEMISTRYPOINTS= 6}
      if(chemistry >= 45 && chemistry <= 49){  CHEMISTRYGRADE = "C-"; CHEMISTRYPOINTS= 5}
      if(chemistry >= 40 && chemistry <= 44){  CHEMISTRYGRADE = "D+"; CHEMISTRYPOINTS= 4}
      if(chemistry >= 35 && chemistry <= 39){  CHEMISTRYGRADE = "D"; CHEMISTRYPOINTS= 3}
      if(chemistry >= 30 && chemistry <= 34){  CHEMISTRYGRADE = "D-"; CHEMISTRYPOINTS= 2}
      if(chemistry >= 0 && chemistry <= 29){  CHEMISTRYGRADE = "E"; CHEMISTRYPOINTS= 1}
      let totalMarks = (english + kiswahili + mathematics + biology + physics + chmistry + geography + cre + agriculture + business)
      
      let subjectGrades = await classExam.updateMany({_id:_id},{

      },{upsert:false})
      let totalMarksResult = await classExam.updateMany({_id:_id},{
          totalMarks:totalMarks
      }, {upsert:false})

     if(index + 1 === arr.length) console.log(arr.length)
      return 
    })
  }
  else{
    
  }

 
})
module.exports = {
  getAllMarks,
  registerMarks,
  getMarksByExamID,
  getExamByid,
  captureMarks,
  getClassExamById,
  processResults
  
};
