const express = require('express');
const router = express.Router();
const streamController = require('../../controller/streams/streams');
//const streamTeacherControler = require('../../controller/streams/streamTeacher')
router.route('/getallstreams')
    .get(streamController.getAllStreams)
router.route('/registerstream')
    .post(streamController.registerStream)
router.route('/getstreambyid/:id')
    .get(streamController.getStreamById)
router.route('/updateStream')
    .patch(streamController.updateStream)
router.route('/archive')
    .patch(streamController.archive)
router.route('/deactivate')
    .patch(streamController.deactivate)
router.route('/remove/:streamID')
    .get(streamController.remove)

// sream teacher
module.exports = router;

