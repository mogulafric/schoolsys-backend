const express = require('express');
const router = express.Router();
const teacherController = require('../../controller/teachers/teachers.js');
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

//must have teachers-account-admin role
router.route('/getallteachers')
    .get(teacherController.getAllTeachers)
//must have teachers-account-admin role
router.route('/registernewteacher')
    .post(teacherController.registerNewTeachers)
//must have teachers-account-admin role
router.route('/updateteacherbio')
    .patch(teacherController.registerNewTeachers)  
//must have teachers-account-admin role
router.route('/getteacherbyid/:id')
    .get(teacherController.getTeachersById)
module.exports = router;

