const express = require('express');
const router = express.Router();
const studentReportController = require('../../controller/students/reports.js');
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

//user-system-account-role
router.route('/getallstudent')
    .get(studentController.getAllStudents)
router.route('/getallarchivedstudents')
    .post(studentController.registerNewStudent)
router.route('/getstudentaccountlogs/:id')
    .patch(studentController.registerNewStudent)  
router.route('/:id')
    .get(studentController.getStudentById)
router.route('/resetpassword')
router.route('/users')
router.route('/users/:id')
router.route('/user_settings')

module.exports = router;

