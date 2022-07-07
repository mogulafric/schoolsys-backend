const express = require('express')
const router = express.Router()
const userController = require('../../controller/user/userController')

const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')


//self service
router.route('/self/resetpassword')
.patch(userController.selfPasswordReset)
router.route('/self/archive')
.patch(userController.selfArchive)
router.route('/self/bioupdate')
.patch(userController.selfBioUpdate)

//user-system-account-admin routes
router.route('/getusers')
.get(userController.getAllUsers)
router.route('/getuserbyid')
.get(userController.getAllUser)
router.route('/updateuserbio')
.patch(userController.getAllUsers)
router.route('/archive')
.patch(userController.getAllUsers)



module.exports = router;