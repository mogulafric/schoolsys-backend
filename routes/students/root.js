const express = require('express');
const router = express.Router();
const studentController = require('../../controller/students/students.js');
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/getallstudents')
    .get(studentController.getAllStudents)
router.route('/registerstudent')
    .post(studentController.registerNewStudent) 
router.route('/getstudentbyid/:id')
    .get(studentController.getStudentById)
router.route('/updatestudentbio')
    .get(studentController.getStudentById)
router.route('/archivestudent')
    .get(studentController.getStudentById)
router.route('/archivestudent')
    .get(studentController.getStudentById)


// promote students


// demote students


module.exports = router;

