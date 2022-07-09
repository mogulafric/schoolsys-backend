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
router.route('/getuserbyid/:id')
.get(userController.getAllUser)
router.route('/updatebio')
.patch(userController.updateBio)
router.route('/archive')
.patch(userController.archive)
router.route('/passwordreset')
.patch(userController.passwordreset)

module.exports = router;