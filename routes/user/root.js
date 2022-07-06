const express = require('express')
const router = express.Router()
const verifyJWT = require('../../middleware/verifyJWT');
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
const loginController = require('../../controller/auth/users');

// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/resetpassword')
router.route('/selfaccountarchive')
//user-system-account-admin routes
router.route('/getallregisteredusers')
    .get(verifyRoles(ROLES_LIST.Admin),loginController.getAllUsers)
router.route('/getuserbiobyid/:id')
router.route('/updateuserbio')
router.route('/archiveuser')

// user roles user system admin role
router.route('getallroles')
router.route('getallrolebyid')
router.route('registernewrole')
router.route('disablerole')


module.exports = router;