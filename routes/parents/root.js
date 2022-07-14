const express = require('express');
const router = express.Router();
const parentsController = require('../../controller/parents/parents');
router.route('/getallparents')
    .get(parentsController.getAllParents)
router.route('/registerparent')
    .post(parentsController.registerParent) 
router.route('/getparent/:id')
    .get(parentsController.getParentById)
router.route('/deactivate')
    .patch(parentsController.deactivate)
router.route('/archive')
    .patch(parentsController.archive)
router.route('/updateparent')
    .patch(parentsController.updateParent)
module.exports = router;

