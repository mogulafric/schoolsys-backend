const express = require('express');
const router = express.Router();
const teacherController = require('../../controller/teachers/teachers');
router.route('/getallteachers')
    .get(teacherController.getAllTeachers)
router.route('/registerteacher')
    .post(teacherController.registerTeacher) 
router.route('/getteacher/:id')
    .get(teacherController.getTeacherById)
router.route('/deactivate/:id')
    .patch(teacherController.deactivate)
router.route('/archive')
    .patch(teacherController.archive)
router.route('/updateteacher')
    .patch(teacherController.updateTecaher)
module.exports = router;

