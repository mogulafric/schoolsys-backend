const ExaminbleSubjects = require("../../../model/exam/examLines");
const catchAsync = require("../../../utils/catchAsync");
const units = require("../../../model/units/unit")

const getAllExaminableSubjects = catchAsync(async (req, res, next) => {
  let examCode = req.params
  const examinbleSubjects = await ExaminbleSubjects.find({examCode:examCode}).populate({
    path: 'subjects.$.subjectID',
  })
  if (!examinbleSubjects) return res.status(204).json({
    status: 'success',
    data: examinbleSubjects
  });
  res.status(200).json({
    status: "success",
    result: examinbleSubjects.length,
    data: examinbleSubjects,
  });
});
const pushExaminableSubject = catchAsync(async (req, res, next) => {
  let {examCode,subjectID, subjectName, subjectCode}= req.body
  const findStudentsInClass = await ExaminbleSubjects.find({
    examCode:examCode
  })
  console.log(subjectID)
  let result = [];
  findStudentsInClass.forEach(async(item,index, arr)=>{
    let _id = item._id
    let resultPerItem = await ExaminbleSubjects.updateOne({
        _id:_id
    },
    {
        $addToSet:{
            "subject":[{"subjectID":subjectID}]
        }
    },
    {
        upsert:false
    });

    result.push(resultPerItem)
    if(index + 1 === arr.length){
      return  res.status(201).json({
    status: "success",
    result: result.length,
    data: result,
  });
  }
  })
});
const pullExaminableSubject = catchAsync(async (req, res, next) => {
    let {
        examCode,
        subject_id
      } = req.body;
     
     
      const findStudentsInClass = await ExaminbleSubjects.find({
        examCode:examCode
      })
      let result = [];
      findStudentsInClass.forEach(async(item,index, arr)=>{
        let _id = item._id
        let resultPerItem = await ExaminbleSubjects.updateMany({
            _id:_id
        },
        {
            $pull:{
              "subject":[{"_id":subject_id}]
            }
        },
        {
            upsert:false
        });
        result.push(resultPerItem)
        if(index + 1 === arr.length){
          res.status(201).json({
            status: "success",
            result: result.length,
            data: result,
          });
        }
      })
      
});
const getexaminableSubjectsByexamCode = catchAsync(async (req, res, next) => {
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
  if(!examinbleSubjects) return res.status(204).json({ 
    status: 'success', 
    data: ExaminbleSubjects 
  });
  res.status(200).json({
    status: "success",
    result: examSetup.length,
    data: examinbleSubjects,
  });
  if(!examinbleSubjects){
    return res
      .status(204)
      .json({ status: 'success', message: `No exam matches ID ${req.params.id}.` 
    });
  }
  res.json(examinbleSubjects);
});
module.exports = {
  getAllExaminableSubjects,
  pushExaminableSubject,
  pullExaminableSubject,
  getexaminableSubjectsByexamCode,

};
