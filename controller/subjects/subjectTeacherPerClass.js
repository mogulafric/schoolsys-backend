const SubjecTeacherPerClass = require('../../model/subjects/subjectTeachersPerClass')
const catchAsyn = require('../../utils/catchAsync')

const getAllSubjectTeachersPerClass = catchAsyn(async (req, res, next) => {
    const result = await SubjecTeacherPerClass.find()
    res.status(200).json({
        status: 'success',
        result: result.length,
        data: result
    })
})

const registerSubjectTeacherPerClass = catchAsyn(async (req, res, next) => {
    let {subjectID,teacherID} = req.body;
    const duplicate = await SubjecTeacherPerClass.findOne({
        isActive: {$in:true}, subjectID:subjectID, teacherID:teacherID
    }).exec();
    if (duplicate) return res.status(409).json({
        status: "failed",
        message: "Kindly, check if the previous active settings have been iniactived then try again"
    });
    const result = await SubjecTeacherPerClass.insertOne({
        subjectID: subjectID,
        groupName: groupName,
        groupShortName: groupShortName
    });
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
    const getSubject = await SubjectGroup.findOne({
        _id: _id
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
    let {subjectID,groupName,groupShortName, _id} = req.body
    if (!_id) {
        return res.status(400).json({
            status: 'failed',
            message: 'Sorry, we could find a match for your query, Id is required'
        })
    }
    const exist = await SubjectGroup.findOne({
        _id: _id
    })
    if (!exist) {
        res.status(204).json({
            status: 'success',
            result: exist.length,
            data: exist
        })
    }
    if (!req.body?.subjectID) subjectID = getSubject.subjectID
    if (!req.body?.groupName) groupName = getSubject.groupName
    if (!req.body?.groupShortName) groupShortName = getSubject.groupShortName
    let query = {
        subjectID: subjectID,
        groupName: groupName,
        groupShortName: groupShortName
    }
    const result = await SubjectGroup.updateOne(
        { _id: _id },
        query,
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