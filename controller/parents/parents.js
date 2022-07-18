
const Parents = require('../../model/parents/parents')
const catchAsync = require('../../utils/catchAsync')
const getAllParents = catchAsync(async(req, res, next)=>{
    const result = await Parents.find().populate({
        path:'studentID',
        select:
        'studentName studentAdmissionNumbe'
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
const registerParent = catchAsync(async(req, res, next)=>{
    let {firstParent,secondParent,firstParentNumber,secondParentNumber,studentID} = req.body
    const result = await Parents.create({
        firstParent:firstParent, 
        secondParent:secondParent,
        firstParentNumber:firstParentNumber,
        secondParentNumber:secondParentNumber,
        studentID:studentID
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
const updateParent = catchAsync(async(req,res,next)=>{
    let {_id,firstParent,secondParent,firstParentNumber,secondParentNumber,studentID} = req.body
    const parents = await Parents.findOne({ _id:_id}).exec();
    if(!req.body?.firstParent) firstParent = parents.firstParent
    if(!req.body?.secondParent) secondParent = parents.secondParent
    if(!req.body?.firstParentNumber) firstParentNumber = parents.firstParentNumber
    if(!req.body?.secondParentNumber) secondParentNumber = parents.secondParentNumber
    if(!req.body?.studentID) studentID = parents.studentID
    const result = await Parents.updateOne({_id:_id},{
        firstParent:firstParent,
        secondParent:secondParent,
        firstParentNumber:firstParentNumber,
        secondParentNumber:secondParentNumber,
        studentID:studentID
    })
    res.status(200).json({
        status:'success',
        result:result.length,
        data:result
    })
    
})
const deactivate = catchAsync(async(req, res, next)=>{
    let _id = req.params._id
    const result = await Parents.updateOne({_id:_id},{
        isActive:true
    })
    res.status(201).json({
        status:'success',
        result:result.length,
        data:result
    })
})
const archive = catchAsync(async(req, res, next)=>{
    let _id = req.params._id
    const result = await Parents.updateOne({_id:_id},{
        isArchived:true
    })
    res.status(201).json({
        status:'success',
        result:result.length,
        data:result
    })
})
const  getParentById= catchAsync(async(req, res, next)=>{
    let _id = req.params.id
    const result = await Parents.findById({_id:_id}).populate({
        path:'studentID',
        select:
        'studentName studentAdmissionNumbe'
    }) 
    if(!result) return res.status(204).json({
        status:'success',
        data:result
    }) 
    res.status(201).json({
        status:'success',
        result:result.length,
        data:result
    })
})
module.exports ={
    getAllParents,
    registerParent,
    getParentById,
    deactivate,
    archive,
    updateParent
}

