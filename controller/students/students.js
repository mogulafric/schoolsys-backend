const Student = require("../../model/students/students.js");
const catchAsync = require("../../utils/catchAsync.js");

const getAllStudents = catchAsync(async (req, res, next) => {
  const students = await Student.find().populate({
    path:'parentID',
    select:
    'firstParent secondParent'
  }).populate({
    path:'stream',
    select:
    'streamName streamCode'
  });
  if (!students) return res.status(204).json({ message: "No Students found." });
  res.status(200).json({
    status: "success",
    result: students.length,
    data: students,
  });
});
const registerStudent = catchAsync(async (req, res, next) => {
  let {studentName, kcpeMarks, kcpeRank, pidNumber,yearOfAdmission,currentYear,gender,unitAdmission,unitCurrent, stream, id} = req.body;
  let admissionNumber =req.body.admissionNumber
  // check for duplicate student in the db
  const duplicate = await Student.findOne({
    admissionNumber: admissionNumber,
  }).exec();
  if (duplicate) return res.status(409).json({status:"success", message:"Duplicate , student admission numbers must be unique"}); //Conflict
  const result = await Student.create({
    studentName: studentName,
    admissionNumber: admissionNumber,
    kcpeMarks: kcpeMarks,
    kcpeRank: kcpeRank,
    pidNumber: pidNumber,
    yearOfAdmission: yearOfAdmission,
    currentYear: currentYear,
    gender: gender,
    unitAdmission: unitAdmission,
    unitCurrent: unitCurrent,
    stream: stream,
  });

  res.status(201).json({
    status:'success',
    result:result.length,
    data:result
  })
});
const updateStudent = catchAsync(async (req, res, next) => {
  let {
    studentName,
    admissionNumber,
    kcpeMarks,
    kcpeRank,
    pidNumber,
    yearOfAdmission,
    currentYear,
    gender,
    unitAdmission,
    unitCurrent,
    stream,
    _id,
  } = req.body;
  if (!req?.body?._id) {
    return res.status(400).json({status:'failed', message: "ID parameter is required." });
  }
  const student = await Student.findOne({ _id: req.body._id }).exec();
  if (!student) {
    return res
      .status(400)
      .json({status:'failed', message: `No student matches ID ${req.body._id}.` });
  }
  if (!req.body?.studentName) studentName = student.studentName;
  if (!req.body?.admissionNumber)admissionNumber = student.admissionNumber;
  if (!req.body?.kcpeMarks) kcpeMarks = student.kcpeMarks;
  if (!req.body?.kcpeRank) kcpeRank= student.kcpeRank;
  if (!req.body?.pidNumber) pidNumber= student.pidNumber;
  if (!req.body?.stream)stream= student.stream 
  if (!req.body?.yearOfAdmission) yearOfAdmission = student.yearOfAdmission;
  if (!req.body?.currentYear) currentYear = student.currentYear;
  if (!req.body?.unitAdmission) unitAdmission=student.unitAdmission 
  if (!req.body?.unitCurrent)unitCurrent= student.unitCurrent 
  if (!req.body?.gender)gender= student.gender 
  if (!req.body?.stream) stream= student.stream 

  const result = await Student.updateOne(
    { _id: _id },
    {
      studentName: studentName,
      admissionNumber: admissionNumber,
      kcpeMarks: kcpeMarks,
      kcpeRank: kcpeRank,
      pidNumber: pidNumber,
      yearOfAdmission: yearOfAdmission,
      currentYear: currentYear,
      gender: gender,
      unitAdmission: unitAdmission,
      unitCurrent: unitCurrent,
      stream: stream,
    }
  );
  res.status(200).json({status:'success',result:result.length, data:result});
});
const getStudentById = catchAsync(async (req, res, next) => {
    let _id = req.params.id
    if(!_id) return res.status(400).json({status:'failed',message:'Error, user id not found'})
    const getStudent = await Student.findOne({_id:_id}).populate({
      path:'parentID',
      select:
      'firstParent secondParent'
    }).populate({
      path:'stream',
      select:
      'streamName streamCode'
    });
    if(!getStudent){return res.status(400).json({status:'failed', message:'Error, student not found'})}
    res.status(200).json({status:'success', result:getStudent.length, data:getStudent})

});
const archiveStudent = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  if (!req?.body?.id)
    return res.status(400).json({ message: "Student ID required." });

  const student = await Student.findOne({ _id: id }).exec();
  if (!student) {
    return res
      .status(204)
      .json({ message: `No Student matches ID ${req.body.id}.` });
  }
  const result = await Student.deleteOne(); 
  res
    .status(200)
    .json({ status: "success", result: result.length, data: result });
});
const deactivateStudent = catchAsync(async (req, res, next) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Student ID required." });

  const student = await Student.findOne({ _id: req.params.id }).exec();
  if (!student) {
    return res
      .status(204)
      .json({ message: `No Student matches ID ${req.params.id}.` });
  }
  res.json(student);
});
module.exports = {
  getAllStudents,
  registerStudent,
  updateStudent,
  getStudentById,
  archiveStudent,
  deactivateStudent,
};
