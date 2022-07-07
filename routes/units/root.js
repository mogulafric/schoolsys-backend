const express = require('express');
const router = express.Router();
const unitsController = require('../../controller/units/units');
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/getallunits')
    .get(unitsController.getAllUnits)
router.route('/registerunit')
    .post(unitsController.registerunit) 
router.route('/getunit')
    .get(unitsController.getUnitById)
router.route('/updateunit')
    .patch(unitsController.updateUnit)
router.route('/archive')
    .get(unitsController.archive)
router.route('/deactivate')
    .get(unitsController.deactivateUnit)





module.exports = router;

