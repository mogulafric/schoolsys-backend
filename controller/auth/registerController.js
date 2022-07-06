const User = require("../../model/auth/users");
const bcrypt = require("bcrypt");
const catchAsync = require("../../utils/catchAsync");
const handleNewUser = catchAsync(async (req, res, next) => {
  let queryUser = { email: req.body.email };

  const duplicate = await User.findOne(queryUser).exec();
  if (duplicate)
    return res.status(409).json({
      status: "failed",
      message: "User with same credentials exist",
    });
  if (req.body.password !== req.body.passwordConfirm) {
    return res
      .status(402)
      .json({ status: "failed", message: "Password must match" });
  } else {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const insertQuery = {
      userName: req.body.userName,
      password: hashedPwd,
      passwordConfirm: hashedPwd,
      email: req.body.email,
    };
    console.log(insertQuery);
    const result = await User.create(insertQuery);
    console.log(result);
    res.status(201).json({
      status: "success",
      result: result.length,
      data: result,
    });
  }
});
module.exports = { handleNewUser };
