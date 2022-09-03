
const Teachers = require('../../model/teachers/teachers')
const catchAsync = require('../../utils/catchAsync')
const getAllTeachers = catchAsync(async(req, res, next)=>{
    const result = await Teachers.find()
    if(!result) return res.status(204).json({
        status:'succes',
        result:result.length,
        data:result
    })
    res.status(200).json({
        status:'success',
        result:result.length,
        data:result
    })
})
const registerTeacher = catchAsync(async(req, res, next)=>{
    let {_id,teacherTitle,teacherName,teacherAbbr,teacherNumber,teacherRole,teacherContact,teacherEmail,classTeacher} = req.body
    const result = await Teachers.create({
        teacherTitle:teacherTitle, 
        teacherName:teacherName,
        teacherAbbr:teacherAbbr,
        teacherNumber:teacherNumber,
        teacherRole:teacherRole,
        teacherContact:teacherContact,
        teacherEmail:teacherEmail,
        classTeacher:classTeacher
    })
    if(!result) return res.status(204).json({
        status:'success',
        result:result.length,
        data:result
    })
    res.status(200).json({
        status:'success',
        result:result.length,
        data:result
    })
})
const updateTecaher = catchAsync(async(req,res,next)=>{
    let {_id,teacherTitle,teacherName,teacherAbbr,teacherNumber,teacherRole,teacherContact,teacherEmail,classTeacher} = req.body
    const teachers = await Teachers.findOne({ _id:_id}).exec();
    if(!req.body?.teacherTitle) teacherTitle = teachers.teacherTitle
    if(!req.body?.teacherName) teacherName = teachers.teacherName
    if(!req.body?.teacherAbbr) teacherAbbr = teachers.teacherAbbr
    if(!req.body?.teacherRole) teacherRole = teachers.teacherRole
    if(!req.body?.teacherContact) teacherContact = teachers.teacherContact
    if(!req.body?.teacherEmail) teacherEmail = teachers.teacherEmail
    if(!req.body?.classTeacher) classTeacher = teachers.classTeacher
    const result = await Teachers.updateOne({_id:_id},{
        teacherTitle:teacherTitle, 
        teacherName:teacherName,
        teacherAbbr:teacherAbbr,
        teacherNumber:teacherNumber,
        teacherRole:teacherRole,
        teacherContact:teacherContact,
        teacherEmail:teacherEmail,
        classTeacher:classTeacher
    })
    res.status(200).json({
        status:'success',
        result:result.length,
        data:result
    })
})
const deactivate = catchAsync(async(req, res, next)=>{
    let _id = req.params._id
    let isActive = re.body.isActive
    const result = await Teachers.updateOne({_id:_id},{
        isActive:isActive
    })
    res.status(201).json({
        status:'success',
        result:result.length,
        data:result
    })
})
const archive = catchAsync(async(req, res, next)=>{
    let _id = req.params._id
    const result = await Teachers.updateOne({_id:_id},{
        isArchived:true
    })
    res.status(201).json({
        status:'success',
        result:result.length,
        data:result
    })
})
const  getTeacherById= catchAsync(async(req, res, next)=>{
    let _id = req.params.id
    const result = await Teachers.findOne({_id:_id}) 
    if(!result) return res.status(204).json({
        status:'success',
        result:result.length,
        data:result
    }) 
    res.status(200).json({
        status:'success',
        result:result.length,
        data:result
    })
})

module.exports ={
    getAllTeachers,
    registerTeacher,
    getTeacherById,
    deactivate,
    archive,
    updateTecaher
}