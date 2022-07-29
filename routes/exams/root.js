const express = require('express');
const router = express.Router();
const setupController = require('../../controller/exam/setup/examLinesController');
const marksController = require('../../controller/exam/setup/examinableSubjects')


// set up
router.route('/setup/getallexams')
    .get(setupController.getAllExams)
router.route('/setup/registerexam')
    .post(setupController.registerExam) 
router.route('/setup/getexambyid/:id')
    .get(setupController.getExamByid)

// manage subject
router.route('setup/getallexaminablesubjects')
    .patch(marksController.getAllExaminableSubjects)
router.route('setup/pushexaminablesubject')
    .patch(marksController.pushExaminableSubject)
router.route('setup/pullexaminablesubject')
    .patch(marksController.pullExaminableSubject)
router.route('setup/getexaminablesubjectbyexamcode')
    .patch(marksController.getexaminableSubjectsByexamCode)

//class marks Capture
// router.route('/classexam/getallmarks')
//      .get(marksController.getAllMarks)
// router.route('/classexam/registerexam')
//     .post(marksController.registerMarks) 
// router.route('/class/capturemarks')
//   .patch(marksController.captureMarks)
// router.route('/class/classexamgetbyid/:examID')
//    .get(marksController.getClassExamById)

// router.route('/marks/capturemarks')
//     .patch(marksController.captureMarks)


//results
// router.route('/results/processresults')
// .patch(marksController.processResults)
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





