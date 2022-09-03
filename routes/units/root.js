const express = require('express');
const router = express.Router();
const unitsController = require('../../controller/units/units');
const classTeacherController = require('../../controller/units/classTeacher')
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/getallunits')
    .get(unitsController.getAllUnits)
router.route('/registerunit')
    .post(unitsController.registerunit) 
router.route('/getunit/:id')
    .get(unitsController.getUnitById)
router.route('/updateunit')
    .patch(unitsController.updateUnit)
router.route('/archive')
    .get(unitsController.archive)
router.route('/deactivate')
    .get(unitsController.deactivateUnit)
router.route('/remove/:unitID')
    .get(unitsController.remove)

module.exports = router;



// class teacher

router.route('/getallclassteachers')
    .get(classTeacherController.getAllClassTeachers)
router.route('/addclassceacher')
    .post(classTeacherController.addAclassTeacher) 
router.route('/getclassteacherbyid/:id')
    .get(classTeacherController.getClassteacherById)
router.route('/updateclassteacher')
    .patch(classTeacherController.editClassTeacher)
router.route('/archive')
    .get(classTeacherController.archive)
router.route('/deactivate')
    .get(classTeacherController.deactivate)
module.exports = router;



