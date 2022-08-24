const express = require('express');
const router = express.Router();
const examinableSubjects = require('../../controller/exam/setup/examinableSubjects')
const setupController = require('../../controller/exam/setup/examHeaders');
const marksController = require('../../controller/exam/marks/examLines')
//examinable subjects

router.route('/setup/getallexaminablesubjects')
    .get(examinableSubjects.getAllExaminableSubjects)
router.route('/setup/registerexaminablesubject')
    .post(examinableSubjects.addExaminableSubject) 
router.route('/setup/getexaminablesubjectbyid/:id')
    .get(examinableSubjects.getExaminableSubjectById)
router.route('/setup/updateexaminablesubject')
    .patch(examinableSubjects.updateExaminableSubject)
// setup
router.route('/setup/getallexams')
    .get(setupController.getAllExams)
router.route('/setup/registerexam')
    .post(setupController.registerExam) 
router.route('/setup/getexambyid/:id')
    .get(setupController.getExamByid)
router.route('/setup/update')
    .patch(setupController.updateExam)

//class marks Capture
router.route('/capturedmarks/initatemarkscapture')
      .post(marksController.initiateMarks)
// router.route('/capturedmarks/getallcapturedmarksbyexamcode/:examcode')
//       .get(marksController.getAllCaptureMarksByExamCode)
// router.route('/capturedmarks/updatemarksperstudentpersubject')
//     .post(marksController.UpdateMarksPerStudentPerSubject) 
// router.route('/capturedmarks/capturemarks')
//    .patch(marksController.UpdateMarksPerStudentPerSubject)
//  router.route('/capturedmarks/updatemutiplestudents')
//     .get(marksController.updateMutipleStudents)


// //marks process
// router.route('/marks/Sprocess/junior')
//   .patch(marksController.junior)
//  router.route('/marks/process/senior')
//    .patch(marksController.senior)

// //results
//  router.route('/results/processresults')

module.exports = router;





