const SubjectGroup = require('../../model/subjects/subjectGroup')
const catchAsyn = require('../../utils/catchAsync')

const getAllSubjectGroup = catchAsyn(async (req, res, next) => {
    const result = await SubjectGroup.find().populate({
        path:'subjects'
    })
    res.status(200).json({
        status: 'success',
        result: result.length,
        data: result
    })
})

const registerSubjectGroup = catchAsyn(async (req, res, next) => {
    let { groupName, groupShortName } = req.body;
    const duplicate = await SubjectGroup.findOne({
        groupName: groupName,groupShortName:groupShortName 
    }).exec();
    if (duplicate) return res.status(409).json({
        status: "success",
        message: "Duplication of subject groups not allowed!"
    });
    const result = await SubjectGroup.create({
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
    }).populate({
        path:'subjects'
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
    let {groupName, groupShortName, _id} = req.body
    if (!_id) {
        return res.status(400).json({
            status: 'failed',
            message: 'Sorry, we could find a match for your query, Id is required'
        })
    }
    const getSubjectGroupById = await SubjectGroup.findOne({
        _id: _id
    })
    if (!getSubjectGroupById) {
        res.status(204).json({
            status: 'success',
            result: getSubject.length,
            data: getSubject
        })
    }
    if (!req.body?.groupName) groupName = getSubjectGroupById.groupName
    if (!req.body?.groupShortName) groupShortName = getSubjectGroupById.groupShortName
    let query = {

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
const addSubjectToGroup= catchAsyn(async (req, res, next) => { 
    let {subjectID, _id} = req.body
    if(!subjectID){
        res.status(400).json({
            status:'failed',
            message:'sorry, id is missing'
        })
    }
    const result = await SubjectGroup.updateOne({
        _id:_id
    },
    {$set:{
        subjects:subjectID
    }}, 
    {
        upsert:true
    })
    res.status(200).json({
        status:'sucess',
        result:result.length,
        data:result
    })
})
const archive = catchAsyn(async (req, res, next) => { })
const deactivate = catchAsyn(async (req, res, next) => { })

module.exports = {
    getAllSubjectGroup,
    registerSubjectGroup,
    getSubjectGroupById,
    addSubjectToGroup,
    updateSubjectGroup,
    archive,
    deactivate

}