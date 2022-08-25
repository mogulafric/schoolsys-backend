const SubjecTeacherPerClass = require('../../model/subjects/subjectTeachersPerClass')
const catchAsyn = require('../../utils/catchAsync')
const Teacher = require('../../model/teachers/teachers')

const getAllSubjectTeachersPerClass = catchAsyn(async (req, res, next) => {
    const result = await SubjecTeacherPerClass.find().populate({
      path:'teacherID'  
    }).populate({
        path:'unitID'
    }).populate({
        path:'subjectID'
    })
    res.status(200).json({
        status: 'success',
        result: result.length,
        data: result
    })
})

const registerSubjectTeacherPerClass = catchAsyn(async (req, res, next) => {
    let {subjectID,teacherID, unitID} = req.body;
    const duplicate = await SubjecTeacherPerClass.findOne({
        subjectID:subjectID,unitID:unitID
    }).exec();
    if (duplicate) return res.status(409).json({
        status: "failed",
        message: "Kindly, ensure no duplication of class or subject, you can use update to add more  teachers per class"
    });
    let data = {
        subjectID: subjectID,
        teacherID:teacherID,
        unitID:unitID
    }
    const result = await SubjecTeacherPerClass.create(data);
    res.status(201).json({
        status: 'success',
        result: result.length,
        data: result
    })
})

const getSubjectTeacherPerClassById = catchAsyn(async (req, res, next) => {
    const _id = req.params.id
    if (!_id) {
        return res.status(400).json({
            status: 'failed',
            message: 'Sorry, we could find a match for your query, Id is required'
        })
    }
    const getSubject = await SubjecTeacherPerClass.findOne({
        _id: _id
    }).populate({
        path:'teacherID'  
      }).populate({
          path:'unitID'
      }).populate({
          path:'subjectID'
      })
    if (!getSubject) {
        res.status(204).json({
            status: 'success',
            result: getSubject.length,
            data: getSubject
        })
    }
    res.status(200).json({
        status: 'success',
        result: getSubject.length,
        data: getSubject
    })
})
const updateSubjectTeacherPerClass = catchAsyn(async (req, res, next) => {
    let {subjectID,teacherID,unitID,_id} = req.body
    if (!_id) {
        return res.status(400).json({
            status: 'failed',
            message: 'Sorry, we could find a match for your query, Id is required'
        })
    }
    const exist = await Teacher.findOne({
        _id: _id
    })
    if (!exist) {
        res.status(204).json({
            status: 'success',
            result: exist.length,
            data: exist
        })
    }
    let teacherIDArr = exist.teacherID
    let newTeacherIDArr = [...teacherIDArr,teacherID]
    
    const result = await SubjecTeacherPerClass.updateOne(
        { _id: _id },
        {$addToSet:{teacherID:newTeacherIDArr}},
        { upsert: true }
    )
    res.status(200).json({
        status: 'success',
        result: result.length,
        data: result
    })
})
const archive = catchAsyn(async (req, res, next) => { })
const deactivate = catchAsyn(async (req, res, next) => { })

module.exports = {
    getAllSubjectTeachersPerClass,
    registerSubjectTeacherPerClass,
    getSubjectTeacherPerClassById,
    updateSubjectTeacherPerClass,
    archive,
    deactivate

}