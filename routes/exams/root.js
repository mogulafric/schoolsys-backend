const express = require('express');
const router = express.Router();
const setupController = require('../../controller/exam/setup/examLinesController');
const subjectController = require('../../controller/exam/setup/examinableSubjects')
const marksController = require('../../controller/exam/marks/examLines')
// setup
router.route('/setup/getallexams')
    .get(setupController.getAllExams)
router.route('/setup/getallexams/:examCode')
    .get(setupController.getAllExam)
router.route('/setup/registerexam')
    .post(setupController.registerExam) 
router.route('/setup/getexambyid/:id')
    .get(setupController.getExamByid)
router.route('/setup/updateexambyexamcode')
    .get(setupController.updateExam)
// manage subject
router.route('/subject/getallexaminablesubjects')
    .get(subjectController.getAllExaminableSubjects)
router.route('/subject/addexaminablesubject')
    .get(subjectController.addExaminableSubject)
router.route('/subject/deleteExaminableSubject')
    .get(subjectController.deleteExaminableSubject)
router.route('/subject/updateexaminablesubject')
    .get(subjectController.updateExaminableSubject)


//class marks Capture
router.route('/capturedmarks/getallcapturedmarksbyexamcode/:examcode')
     .get(marksController.getAllCaptureMarksByExamCode)
router.route('/capturedmarks/updatemarksperstudentpersubject')
    .post(marksController.UpdateMarksPerStudentPerSubject) 
router.route('/capturedmarks/capturemarks')
   .patch(marksController.UpdateMarksPerStudentPerSubject)
 router.route('/capturedmarks/updatemutiplestudents')
    .get(marksController.updateMutipleStudents)


// //marks process
router.route('/marks/Sprocess/junior')
  .patch(marksController.junior)
 router.route('/marks/process/senior')
   .patch(marksController.senior)

// //results
//  router.route('/results/processresults')

module.exports = router;





