const express = require('express');
const router = express.Router();
const subjectsController = require('../../controller/subjects/subjects');
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/getallsubjects')
    .get(subjectsController.getAllSubjects)
router.route('/registersubject')
    .post(subjectsController.registerSubject) 
router.route('/getsubjectbuid')
    .get(subjectsController.getSubjectById)
router.route('/updatesubject')
    .patch(subjectsController.updateSubject)
router.route('/archive')
    .get(subjectsController.archive)
router.route('/deactivate')
    .get(subjectsController.deactivate)

module.exports = router;

