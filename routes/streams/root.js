const express = require('express');
const router = express.Router();
const streamController = require('../../controller/streams/streams');

router.route('/getallstreams')
    .get(streamController.getAllStreams)
router.route('/registerstream')
    .post(streamController.registerStream) 
router.route('/getstudentbyid')
    .get(streamController.getStreamById)
router.route('/updateStream')
    .patch(streamController.deactivate)
router.route('/archive')
    .patch(streamController.archive)
router.route('/deactivate')
    .patch(streamController.archive)

module.exports = router;

