const classExam = require("../../../model/exam/marks");
const catchAsync = require("../../../utils/catchAsync");
const ExamSetup = require("../../../model/exam/setup");
const Student = require("../../../model/students/students")

const   getAllMarks = catchAsync(async (req, res, next) => {
  const ClassExam = await classExam.find();
  if (!ClassExam) return res.status(204).json({status:'success',  data:examMarks});
  res.status(200).json({
    status: "success",
    result: ClassExam.length,
    data: ClassExam,
  });
});
const registerMarks = catchAsync(async(req, res, next)=>{
  const {_id,unitCode,unitID,examCode,examName}= req.body
  let examID = _id

  const findExam = await ExamSetup.findOne({_id:examID})  
  const findStudents = await Student.find({unitCurrent:unitCode})
  const checkExamExist = await classExam.findOne({examID:examID}).exec()
  if(checkExamExist) return res.status(400).json({status:'failed', message:'Exam already exist'})
  
    findStudents.forEach((item , index, arr)=>{
      let studentName = item.studentName
      let studentID = item._id
      let studentAdmission = item.admissionNumber
      
      const unitExam = classExam.create({
        examName:examName,
        examCode:examCode,
        examID:examID,
        studentName:studentName,
        studentAdmission:studentAdmission,
        studentID: studentID
      })
      console.log(index + 1 +" "+ arr.length )
      if(index + 1 === arr.length) return res.status(201).json({
        status:"success",
        
        data:"created"
      })
    })
})
const addSubject = catchAsync(async(req,res, next)=>{
  const examID = req.body.examID
  const subjectName = req.body.subjectName
  const subjectID= req.body._id
  const unitID = req.body.unitID
  const subjectCategory = req.body.subjectCategory
  const subject = {subjectID:subjectID,subjectID:subjectName,subjectCategory:subjectCategory}
  const subjects = [...all]
  
  const findStudents = await classExam.find({examID:examID}).exec()
  if(!findStudents) return res.status(400).res.json({
    status:'failed',
    messages:'We could not find a matching uit for the object unit id supplied'
  })
  findStudents.forEach((item , index, arr)=>{
    subjects.push(subject)
    let subjectPush = classExam.updateMany({examID:examID},{
      subjects:subjects
    },{upsert:true})
    if(index +1 ===arr.length){
      res.status(200).json({
        status:'Success',
        messages:"Subject was created successfully",
        data:subjectPush
      })
    }
  })
})

const setExaminableSubject = catchAsync(async(req, res,next)=>{
  const examID = req.body.examID
  const subjectID = req.body.subjectID
  const subjectCategory = req.body.subjectCategory
  const subjectName = req.body.subjectName
  const subjectscore = null
  const queryExamID = await classExam.find({examID:examID}).exec() 
  if(!queryExamID) return res.status(400).json({
    status:'failed',
    message:'The exam id provided has not been initiated'
  })
  
  queryExamID.forEach((item,index, arr)=>{
        item.subjects.subjectCategory = subjectCategory;
        item.subjects.subjectName = subjectName;
        let _id = item._id
        let subjectIndex = item.subjects.length
        let values= {subjectName:subjectName,subjectCategory:subjectCategory }
    
       
   classExam.findOneAndUpdate({_id: _id}, { '$set': {"subjects[subjectIndex].$" : values}});

    
  //   let query = {subjectName:subjectName,subjectCategory:subjectCategory, subjectscore:subjectscore}
  //   console.log(query)
  //  classExam.updateMany({"subjects.examID": query.ExamID}, {'$set': {"subjects.0.$": query}},{"multi": true }).exec()
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
  setExaminableSubject,
};
