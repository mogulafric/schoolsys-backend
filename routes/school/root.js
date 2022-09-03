const express = require('express');
const router = express.Router();
const schoolController = require('../../controller/school/school');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/getallschools')
    .get(schoolController.getAllSchool)
router.route('/registerschool')
    .post(schoolController.registerSchool)
router.route('/getSchoolbyid/:id')
    .get(schoolController.getSchoolById)
router.route('/updateschool')
    .patch(schoolController.updateSchool)
router.route('/isactive')
    .get(schoolController.isActive)
router.route('/isarchived')
    .get(schoolController.isArchived)
router.route('/remove/:schoolID')
    .delete(schoolController.remove)

module.exports = router;



