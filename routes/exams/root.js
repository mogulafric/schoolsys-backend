const express = require('express');
const router = express.Router();
const setupController = require('../../controller/exam/setup/examController');
const marksController = require('../../controller/exam/marks/marksController')
// const resultsController = require('../../controller/exam/')

router.route('/setup/getallexams')
    .get(setupController.getAllExams)
router.route('/setup/registerexam')
    .post(setupController.registerExam) 
router.route('/setup/getexambyid/:id')
    .get(setupController.getExamByid)

//router.route('setup/deactivate')
// //     .patch(setupController.deactivate)
// // router.route('setup/archive')
// //     .patch(setupController.archive)
// router.route('setup/updateExam')
//     .patch(setupController.updateExam)


// //class exam
router.route('/classexam/getallmarks')
     .get(marksController.getAllMarks)
router.route('/classexam/registerexam')
    .post(marksController.registerMarks) 
router.route('/class/capturemarks')
  .patch(marksController.captureMarks)
router.route('/class/classexamgetbyid/:examID')
   .get(marksController.getClassExamById)

router.route('/marks/capturemarks')
    .patch(marksController.captureMarks)
//results
router.route('/results/processresults')
.patch(marksController.processResults)
// router.route('results/registerexam')
// .post(teacherController.registerExam) 
// router.route('results/getexambyid')
// .get(teacherController.getExamById)
// router.route('results/deactivate')
// .patch(teacherController.deactivate)
// router.route('results/archive')
// .patch(teacherController.archive)
// router.route('results/updateExam')
// .patch(teacherController.updateExam)


module.exports = router;





