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
router.route('/remove/:examinableSubjectID')
    .get(examinableSubjects.remove)
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
router.route('/capturedmarks/updatescorebyexambysubject')
   .patch(marksController.captureScoreByExamBySubject)
 router.route('/capturedmarks/getmarksbyexamid/:examID')
    .get(marksController.getCapturedMarksByExamID)
router.route('/capturedmarks/getmarksbyexamitementryid/:entryID')
    .get(marksController.getCapturedMarksByItemEntryID)


// subject grades and comments
router.route('/subjectgradesandcomments')
  .patch(marksController.subjectGradesAndComments)
//  router.route('/marks/process/senior')
//    .patch(marksController.senior)

// //results
//  router.route('/results/processresults')

module.exports = router;





