const express = require('express');
const router = express.Router();
const academicyearController = require('../../controller/academicyear/academicyear');


router.route('/getallyears')
    .get(academicyearController.getAllYear)
router.route('/registeryear')
    .post(academicyearController.registerYear) 
router.route('/getyear/:id')
    .get(academicyearController.getYear)
router.route('/updateyear')
    .patch(academicyearController.updateYear)
router.route('/archive')
    .get(academicyearController.archiveYear)
router.route('/deactivate')
    .get(academicyearController.deactivateYear)

module.exports = router;

