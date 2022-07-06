const express = require('express');
const router = express.Router();
const generalReportController = require('../../controller/general/reports.js');
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');


//must have user account admin role
router.route('/getallregisteredusers')
    .post(generalReportController.sigin)
router.route('/getallarchiveduserS')
    .post(generalReportController.createNewUser)
router.route('/getalldisabledusers')
    .patch(generalReportController.updateNewUser)
router.route('/getuseraccountreport/:id')
    .get(generalReportController.getUserById)
// roles report here


module.exports = router;

