const ExaminbleSubjects = require("../../../model/exam/examinableSubjects");
const catchAsync = require("../../../utils/catchAsync");
const units = require("../../../model/units/unit")
const getAllExaminableSubjects = catchAsync(async (req, res, next) => {
  const examinbleSubjects = await ExaminbleSubjects.find()
  if (!examinbleSubjects) return res.status(204).json({
    status: 'success',
    data: examinbleSubjects
  });
  res.status(200).json({
    status: "success",
    result: examinbleSubjects.length,
    data: examinbleSubjects
  });
});
const addExaminableSubject = catchAsync(async (req, res, next) => {
  let data = req.body
  if (!data) {
    res.status(400).json({
      status: 'failed',
      message: 'Error occurred, we uld not post examinable subjects'
    })
  }

  let resultPerItem = await ExaminbleSubjects.create(
    data)
});
const deleteExaminableSubject = catchAsync(async (req, res, next) => {
  let _id = req.body;
});
const updateExaminableSubject = catchAsync(async (req, res, next) => {
  const examCode = req.params.examCode
  if (!examCode)
    return res.status(400).json({
      status: 'success',
      message: "Examcode required."
    });
  const examinbleSubjects = await ExaminbleSubjects.findOne({
    examCode: req.params.examCode
  }).populate({
    path: 'subject.$.subjectID'
  })
  if (!examinbleSubjects) return res.status(204).json({
    status: 'success',
    data: ExaminbleSubjects
  });
  res.status(200).json({
    status: "success",
    result: examSetup.length,
    data: examinbleSubjects,
  });
  if (!examinbleSubjects) {
    return res
      .status(204)
      .json({
        status: 'success', message: `No exam matches ID ${req.params.id}.`
      });
  }
  res.json(examinbleSubjects);
});
module.exports = {
  getAllExaminableSubjects,
  addExaminableSubject,
  deleteExaminableSubject,
  updateExaminableSubject

};
