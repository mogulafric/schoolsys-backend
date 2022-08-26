const express = require('express');
const router = express.Router();
const subjectsController = require('../../controller/subjects/subjects');
const subjectsGroups = require('../../controller/subjects/subjectGroup');
const subjectTeacher = require('../../controller/subjects/subjectTeacherPerClass')
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/getallsubjects')
    .get(subjectsController.getAllSubjects)
router.route('/registersubject')
    .post(subjectsController.registerSubject) 
router.route('/getsubjectbuid/:id')
    .get(subjectsController.getSubjectById)
router.route('/updatesubject')
    .patch(subjectsController.updateSubject)
router.route('/archive')
    .get(subjectsController.archive)
router.route('/deactivate')
    .get(subjectsController.deactivate)


// subject groups
router.route('/getallsubjectgroup')
    .get(subjectsGroups.getAllSubjectGroup)
router.route('/registergroup')
    .post(subjectsGroups.registerSubjectGroup) 
router.route('/getsubjectgroupbyid/:id')
    .get(subjectsGroups.getSubjectGroupById)
router.route('/updatesubjectgroup')
    .patch(subjectsGroups.updateSubjectGroup)
router.route('/addsubjecttoagroup')
    .patch(subjectsGroups.addSubjectToGroup)
    
router.route('/archive')
    .get(subjectsGroups.archive)
router.route('/deactivate')
    .get(subjectsGroups.deactivate)

// subject teacher per classs
router.route('/getallsubjectteacherspersclass')
    .get(subjectTeacher.getAllSubjectTeachersPerClass)
router.route('/registersubjectteacherperclass')
    .post(subjectTeacher.registerSubjectTeacherPerClass) 
router.route('/getsubjectteacherperclassbyid/:id')
    .get(subjectTeacher.getSubjectTeacherPerClassById)
router.route('/updatesubjectteacherperclass')
    .patch(subjectTeacher.updateSubjectTeacherPerClass)
router.route('/archive')
    .get(subjectTeacher.archive)
router.route('/deactivate')
    .get(subjectTeacher.deactivate)
module.exports = router;