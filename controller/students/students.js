const Students = require('../../model/students/students.js');
const getAllStudents = async (req, res, next) => {
    const students = await Students.find();
    if (!students) return res.status(204).json({"message":"error" });
    res.json(students);
}
const registerNewStudent = (req, res, next)=>{
}
const updateStudentDetails = (req, res, next)=>{    
}
const deleteDetails = (req, res, next)=>{
    
}
const getStudentById = (req, res, next)=>{
    
}
module.exports = {
    getAllStudents,
    registerNewStudent,
    updateStudentDetails,
    deleteDetails,
    getStudentById
}

