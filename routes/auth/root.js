const express = require('express')
const router = express.Router()
const verifyJWT = require('../../middleware/verifyJWT');
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
const auth = require('../../controller/auth/login')

const register = require('../../controller/auth/registerController')
const loginController = require('../../controller/auth/users');

router.route('/login')
    .post(auth.handleLogin)
router.route('/signup')
    .post(register.handleNewUser)
module.exports = router;