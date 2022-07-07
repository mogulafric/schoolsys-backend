const { CommandFailedEvent } = require('mongodb');
const bcrypt = require("bcrypt");
const User = require('../../model/auth/users.js');
const catchAsync = require('../../utils/catchAsync');
const { find } = require('../../model/auth/users.js');

const selfPasswordReset = catchAsync(async (req, res, next) => {
    console.log(req.body.id)
    const userID = {_id:req.body.id}
    const checkEmailExist = await User.find(userID)
   
    if(!checkEmailExist) return res.status(400).json({status:'failed', message:'Error, Not found, try laiter'})
    if(req.body.password!==req.body.passwordConfirm) return res.status(400).json({status:'failed', message:'Error,password must match password Confirm'})
    const oldPassword = await bcrypt.hash(req.body.oldPassword, 10);
    const oldPasswordQuery = {password:oldPassword}
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    
    const updatePassword = await User.updateOne({_id:req.body.id},{password:hashedPwd,passwordConfirm:hashedPwd},{upsert:true})
    if(!updatePassword) return res.status(400).res.json({status:failed,message:'Error, try again later'})
    res.status(201).json({
        status:'success',
        result:updatePassword.length,
        data:updatePassword
    }) 
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
const getAllUsers = catchAsync(async(req, res, next)=>{ 
    const users = await User.find()
    if(!users)return res.status(204).json({status:'success', result:users.length,data:users})
    res.status(200).json(
        {
            status:'success',
            result:users.length,
            data:users
        }
    )
})
const getAllUser = catchAsync(async(req, res, next)=>{ 
    const userID= {_id:req.body.id}
    console.log(req.body.id)
    if(!req.body.id) return res.status(400).json({status:'failed', message:'user id does not exist'})
    const getUser = await User.find(userID)
    res.status(200).json({
        status:'success',
        result:getUser.length,
        data:getUser
    })
})
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

