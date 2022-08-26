const express = require('express')
const router = express.Router()
const rolesController = require('../../controller/roles/roles')

const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')


router.route('/getroles')
.get(rolesController.getAllRoles)
router.route('/registerrole')
.post(rolesController.createNewRole)
router.route('/updaterole')
.patch(rolesController.updateRole)
router.route('/deleterole')
.patch(rolesController.deleteRole)
router.route('/getrolebyid/:id')
.get(rolesController.getRole)

module.exports = router;

