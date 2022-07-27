const SubjectGroup = require('../../model/subjects/subjectGroup')
const catchAsyn = require('../../utils/catchAsync')

const getAllSubjectGroup = catchAsyn(async (req, res, next) => {
    const result = await SubjectGroup.find()
    res.status(200).json({
        status: 'success',
        result: result.length,
        data: result
    })
})

const registerSubjectGroup = catchAsyn(async (req, res, next) => {
    let { subjectID, groupName, groupShortName } = req.body;
    const duplicate = await SubjectGroup.findOne({
        subjectID: subjectID
    }).exec();
    if (duplicate) return res.status(409).json({
        status: "success",
        message: "Duplicate , the subject selected already exist"
    });
    const result = await SubjectGroup.insertOne({
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

const getSubjectGroupById = catchAsyn(async (req, res, next) => {
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
const updateSubjectGroup = catchAsyn(async (req, res, next) => {
    let {subjectID,groupName,groupShortName, _id} = req.body
    if (!_id) {
        return res.status(400).json({
            status: 'failed',
            message: 'Sorry, we could find a match for your query, Id is required'
        })
    }
    const getSubjectGroupById = await SubjectGroup.findOne({
        _id: _id
    })
    if (!getSubject) {
        res.status(204).json({
            status: 'success',
            result: getSubject.length,
            data: getSubject
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
    getAllSubjectGroup,
    registerSubjectGroup,
    getSubjectGroupById,
    updateSubjectGroup,
    archive,
    deactivate

}