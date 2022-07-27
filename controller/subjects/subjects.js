const { findOne, find } = require('../../model/subjects/subjects')
const Subject = require('../../model/subjects/subjects')
const catchAsyn = require('../../utils/catchAsync')

const getAllSubjects = catchAsyn(async (req, res, next) => {
    const result = await Subject.find()
    res.status(200).json({
        status: 'success',
        result: result.length,
        data: result
    })
})

const registerSubject = catchAsyn(async (req, res, next) => {
    let { subjectCode, subjectName, subjectShortForm, subjectCategory } = req.body;
    const duplicate = await Subject.findOne({
        subjectCode: subjectCode
    }).exec();
    if (duplicate) return res.status(409).json({
        status: "success",
        message: "Duplicate , code number must be unique"
    }); //Conflict
    const result = await Subject.create({
        subjectCode: subjectCode,
        subjectName: subjectName,
        subjectShortForm: subjectShortForm,
        subjectCategory: subjectCategory
    });
    res.status(201).json({
        status: 'success',
        result: result.length,
        data: result
    })
})

const getSubjectById = catchAsyn(async (req, res, next) => {
    const _id = req.params.id
    if (!_id) {
        return res.status(400).json({
            status: 'failed',
            message: 'Sorry, we could find a match for your query, Id is required'
        })
    }
    const getSubject = await Subject.findOne({
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
const updateSubject = catchAsyn(async (req, res, next) => {
    const _id = req.body._id
    let { subjectCode, subjectName, subjectShortForm } = req.body
    if (!_id) {
        return res.status(400).json({
            status: 'failed',
            message: 'Sorry, we could find a match for your query, Id is required'
        })
    }
    const getSubject = await Subject.findOne({
        _id: _id
    })
    if (!getSubject) {
        res.status(204).json({
            status: 'success',
            result: getSubject.length,
            data: getSubject
        })
    }
    if (!req.body?.subjectCode) subjectCode = getSubject.subjectCode
    if (!req.body?.subjectName) subjectName = getSubject.subjectName
    if (!req.body?.subjectShortForm) subjectShortForm = getSubject.subjectShortForm
    let query = {
        subjectCode: subjectCode,
        subjectName: subjectName,
        subjectShortForm: subjectShortForm
    }
    const result = await Subject.updateOne(
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
const archive = catchAsyn(async (req, res, next) => {})
const deactivate = catchAsyn(async (req, res, next) => {})

module.exports = {
    getAllSubjects,
    registerSubject,
    getSubjectById,
    updateSubject,
    archive,
    deactivate

}