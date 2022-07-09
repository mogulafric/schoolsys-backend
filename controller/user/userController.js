const { CommandFailedEvent } = require("mongodb");
const bcrypt = require("bcrypt");
const User = require("../../model/auth/users.js");
const catchAsync = require("../../utils/catchAsync");
const { find } = require("../../model/auth/users.js");

const selfPasswordReset = catchAsync(async (req, res, next) => {
  console.log(req.body.id);
  const userID = { _id: req.body.id };
  const checkEmailExist = await User.find(userID);
  if (!checkEmailExist)
    return res
      .status(400)
      .json({ status: "failed", message: "Error, Not found, try laiter" });
  if (req.body.password !== req.body.passwordConfirm)
    return res
      .status(400)
      .json({
        status: "failed",
        message: "Error,password must match password Confirm",
      });
  const oldPassword = await bcrypt.hash(req.body.oldPassword, 10);
  const oldPasswordQuery = { password: oldPassword };
  const hashedPwd = await bcrypt.hash(req.body.password, 10);
  const updatePassword = await User.updateOne(
    { _id: req.body.id },
    { password: hashedPwd, passwordConfirm: hashedPwd },
    { upsert: true }
  );
  if (!updatePassword){
    return res
      .status(400)
      .res.json({ status: failed, message: "Error, try again later" })};
  res.status(201).json({
    status: "success",
    result: updatePassword.length,
    data: updatePassword
  })
})
const selfArchive = catchAsync(async (req, res, next) => {})

const selfBioUpdate = catchAsync(async (req, res, next) => {
  let { email, userName } = req.body;
  let getUserId = req.body._id;
  const getUserIdQuery = { _id: getUserId };
  if (!getUserId){
    return res
      .status(400)
      .json({
        status: "failed",
        message: "Error, we could not get a matching ID for the user account",
      })
    }
  const findUser = await User.findOne(getUserIdQuery,);
  if (!req.body?.email) email = findUser.email;
  if (!req.body?.userName) userName = findUser.userName;
  let userUpdateQuery = {email:email,userName:userName}
  const result = await User.updateOne(getUserIdQuery,userUpdateQuery,{upsert:true})
  res.status(201).json({
    status:'success',
    result:result.length,
    data:result

  })
  
});
const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users){
    return res
      .status(204)
      .json({ status: "success", result: users.length, data: users });
  res.status(200).json({
    status: "success",
    result: users.length,
    data: users,
  })};
  res.status(200).json({
    status:'success',
    result:users.length,
    data:users
  })
});
const getAllUser = catchAsync(async (req, res, next) => {
  const userID = { _id:req.params.id};
  console.log(userID);
  if (!userID)
    return res
      .status(400)
      .json({ status: "failed", message: "user id does not exist" });
  const getUser = await User.find(userID);
  res.status(200).json({
    status: "success",
    result: getUser.length,
    data: getUser,
  });
});
const updateBio = catchAsync(async(req, res, next) =>{
    let userID= req.body._id
    let {email, userName}= req.body
    if(!userID){
        return res
        .status(400)
        .json({
            status:'failed',
            message:'User id not found, try laiter'
        }) 
    }
    const getCurrentUserData = await User.findById({_id:userID})
    if(!req.body?.email){
        email =  getCurrentUserData.email
    }
    if(!req.body?.userName){
        userName = getCurrentUserData.userName
    }
    console.log(email)
    let userDataToUpdate = {email:email,userName:userName}
    const updateBio = await User.updateOne({_id:userID},userDataToUpdate,{upsert:true})
    res.status(201).json({status:'success',result:updateBio.length,data:updateBio})
});

const archive = catchAsync(async(req, res, next) => {});
const passwordreset = catchAsync(async(req, res, next) => {
    const userID = { _id: req.body._id };
    const checkEmailExist = await User.find(userID);
    if (!checkEmailExist)
      return res
        .status(400)
        .json({ status: "failed", message: "Error, Not found, try laiter" });
    if (req.body.password !== req.body.passwordConfirm)
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Error,password must match password Confirm",
        });
    const oldPassword = await bcrypt.hash(req.body.oldPassword, 10);
    const oldPasswordQuery = { password: oldPassword };
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
  
    const updatePassword = await User.updateOne(
      { _id: req.body._id },
      { password: hashedPwd, passwordConfirm: hashedPwd },
      { upsert: true }
    );
    if (!updatePassword){
      return res
        .status(400)
        .res.json({ status: failed, message: "Error, try again later" })};
    res.status(201).json({
      status: "success",
      result: updatePassword.length,
      data: updatePassword
    })
});
module.exports = {
  selfPasswordReset,
  selfArchive,
  selfBioUpdate,
  getAllUsers,
  getAllUser,
  updateBio,
  archive,
  passwordreset
};
