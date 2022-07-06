const { CommandFailedEvent } = require('mongodb');
const User = require('../../model/auth/users.js');
const catchAsync = require('../../utils/catchAsync')

const selfPasswordReset = catchAsync(async (req, res, next) => {
    const emailQuery = {email:req.body.email}
    const checkEmailExist = await User.find(emailQuery)
    if(!checkEmailExist) return res.status(403).json({status:'failed', message:'Error, email not found, try laiter'})
    if(passwoard!==passwordConfirm) return res.status(408).json({status:'failed', message:'Error,must match'})
    
    })
const selfArchive = (req, res, next)=>{

}
const selfBioUpdate = catchAsync(async(req, res, next)=>{
    const user = await User.create(req.body)
    if(!user) res.json({status:failed,message:"Your request failed!"})
    res.json({
        status:'success',
        data:user
    })
})
const getAllUsers = (req, res, next)=>{   
}
const getAllUser = (req, res, next)=>{   
}
const updateBio = (req, res, next)=>{   
}
const archive = (req, res, next)=>{   
}
module.exports = {
    selfPasswordReset,
    selfArchive,
    selfBioUpdate,

    getAllUsers,
    getAllUser,
    updateBio,
    archive
}

