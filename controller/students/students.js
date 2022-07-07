const Student = require('../../model/students/students.js');
const catchAsync = require('../../utils/catchAsync.js');
const getAllStudents = catchAsync(async (req, res, next) => {
    const students = await Student.find();
    if (!students) return res.status(204).json({ 'message': 'No Students found.' });
    res.status(200).json({
        status:'success',
        result:students.length,
        data:students
    });
})
const registerStudent = catchAsync(async(req, res, next)=>{
    const {studentName,admissionNumber,kcpeMarks,kcpeRank,pidNumber,yearOfAdmission,currentYear, gender, unitAdmission, unitCurrent, stream ,id} = req.body
    if ( !studentName ||!admissionNumber ||!kcpeMarks ) {
        return res.status(400).json({ 'message': 'all fileds are required' });
    }

      // check for duplicate student in the db
  const duplicate = await Student.findOne({ admissionNumber:admissionNumber }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict 
        const result = await Student.create({
            studentName:studentName,
            admissionNumber:admissionNumber,
            kcpeMarks:kcpeMarks,
            kcpeRank: kcpeRank,
            pidNumber: pidNumber,
            yearOfAdmission:yearOfAdmission,
            currentYear:currentYear,
            gender:gender,
            unitAdmission: unitAdmission,
            unitCurrent:unitCurrent,
            stream:stream
        });

        res.status(201).json(result);
    
})
const updateStudent = catchAsync(async(req, res, next)=>{   
    const {studentName,admissionNumber,kcpeMarks,kcpeRank,pidNumber,yearOfAdmission,currentYear, gender, unitAdmission, unitCurrent, stream ,_id} = req.body
    if (!req?.body?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const student = await Student.findOne({ _id: req.body._id }).exec();
    if (!student) {
        return res.status(204).json({ "message": `No student matches ID ${req.body._id}.` });
    }
    if (req.body?.studentName) student.studentName = req.body.studentName;
    
    if (req.body?.admissionNumber) student.admissionNumber = req.body.admissionNumber;
    if (req.body?.kcpeMarks) student.kcpeMarks = req.body.kcpeMarks;
    if (req.body?.kcperank) student.kcperank = req.body.kcperank;
    if (req.body?.pidNumber) student.pidNumber = req.body.pidNumber;
    if (req.body?.stream) student.stream = req.body.stream;
    if (req.body?.yearOfAdmission) student.yearOfAdmission = req.body.yearOfAdmission;
    if (req.body?.currentYear) student.currentYear = req.body.currentYear;
    if (req.body?.unitAdmission) student.unitAdmission = req.body.unitAdmission;
    if (req.body?.unitCurrent) student.unitCurrent = req.body.unitCurrent;
    if (req.body?.gender) student.gender = req.body.gender;
    if (req.body?.stream) student.stream = req.body.stream;
   
    const result = await Student.updateOne({_id:_id},{
        studentName:studentName,
        admissionNumber:admissionNumber,
        kcpeMarks:kcpeMarks,
        kcpeRank: kcpeRank,
        pidNumber: pidNumber,
        yearOfAdmission:yearOfAdmission,
        currentYear:currentYear,
        gender:gender,
        unitAdmission: unitAdmission,
        unitCurrent:unitCurrent,
        stream:stream
    });
    res.json(result);
})
const  getStudentById = catchAsync(async(req, res,next)=>{
    
})
const archiveStudent = catchAsync(async(req, res, next)=>{
    const {id} = req.body
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Student ID required.' });

    const student = await Student.findOne({ _id:id }).exec();
    if (!student) {
        return res.status(204).json({ "message": `No Student matches ID ${req.body.id}.` });
    }
    const result = await Student.deleteOne(); //{ _id: req.body.id }
    res.status(200).json({status:'success',result:result.length,data:result});
})
const deactivateStudent = catchAsync(async(req, res, next)=>{
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Student ID required.' });

    const student = await Student.findOne({ _id: req.params.id }).exec();
    if (!student) {
        return res.status(204).json({ "message": `No Student matches ID ${req.params.id}.` });
    }
    res.json(student);
})
module.exports = {
    getAllStudents,
    registerStudent,
    updateStudent,
    getStudentById,
    archiveStudent,
    deactivateStudent,
}


