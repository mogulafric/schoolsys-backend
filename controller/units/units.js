const Unit = require("../../model/units/unit");
const catchAsync = require("../../utils/catchAsync.js");
const getAllUnits = catchAsync(async (req, res, next) => {
  const units = await Unit.find();
  if (!units) return res.status(204).json({ message: "No Subject found." });
  res.json(units);
});
const registerunit = catchAsync(async (req, res, next) => {
  const { unitID, unitName } = req.body;
  //check if  fields empty
  if (unitID === "undefined" || unitID === null || unitID === "") {
    return res.status(404).json({ message: "Somefileds are  undefined" });
  }
  if (!unitID || !unitName) {
    return res.status(400).json({ message: "Some fields are empty!" });
  }
    const duplicate = await Unit.findOne({
      unitID: unitID,
      unitName: unitName,
    }).exec();
    if (duplicate)
      return res
        .status(409)
        .json({
          message:
            "Duplication of unique fields not allowed! {subjectCode,subjectName}",
        }); //Conflict
    const result = await Unit.create({
      unitID: unitID,
      unitName: unitName,
    });
    res.status(201).json(result);
 
});
const getUnitById = catchAsync(async (req, res, next) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const unit = await Unit.findOne({ _id: req.body._id }).exec();
  if (!unit) {
    return res
      .status(204)
      .json({ message: `No student matches ID ${req.body._id}.` });
  }
  if (req.body?.unitID) unit.unitID = req.body.unitID;
  if (req.body?.unitName) unit.unitName = req.body.unitName;
  const result = await Unit.updateOne({
    unitID: req.body.unitID,
    unitName: req.body.unitName,
  });
  res.json(result);
});
const updateUnit = catchAsync(async (req, res, next) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Subject ID required." });

  const unit = await Unit.findOne({ _id: req.params.id }).exec();
  if (!unit) {
    return res
      .status(204)
      .json({ message: `No Subject matches ID ${req.params.id}.` });
  }
  res.json(unit);
});
const deactivateUnit = catchAsync(async (req, res, next) => {});
const archve = catchAsync(async (req, res, next) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Subject ID required." });

  const unit = await Unit.findOne({ _id: req.body.id }).exec();
  if (!unit) {
    return res
      .status(204)
      .json({ message: `No Subject matches ID ${req.body.id}.` });
  }
});
const result = await Unit.deleteOne(); //{ _id: req.body.id }
res.json(result);

module.exports = {
  getAllUnits,
  registerunit,
  getUnitById,
  updateUnit,
  deactivateUnit,
};
