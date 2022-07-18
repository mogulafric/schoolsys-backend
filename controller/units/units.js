const Unit = require("../../model/units/unit");
const catchAsync = require("../../utils/catchAsync.js");
const getAllUnits = catchAsync(async (req, res, next) => {
  const units = await Unit.find().populate({
    path:'streams'
  });
  if (!units) return res.status(204).json({ status:'success',data:units});
  res.status(200).json({status:'success',result:units.length,data:units});
});
const registerunit = catchAsync(async (req, res, next) => {
  const { unitCode, unitName ,streams} = req.body;
    const duplicate = await Unit.findOne({
      unitCode: unitCode
    }).exec();
    if(duplicate)
      return res
        .status(409)
        .json({
          message:
            "Duplication of unique fields not allowed!",
        }); //Conflict
    const result = await Unit.create({
      unitCode: unitCode,
      unitName: unitName,
      streams:streams
    });
    res.status(201).json(result);
});
const getUnitById = catchAsync(async (req, res, next) => {
  const _id = req.params.id
  if (!_id) {
    return res.status(400).json({staus:'failed', message:"The id used did not match any unit ID" });
  }
  const unit = await Unit.findOne({ _id: _id }).exec();
  if (!unit){
    return res
      .status(204)
      .json({ message: `Sorry, we could retrive data with provided ID ${req.body._id}.` });
  }
  res.status(200).json({status:'success',result:unit.length,data:unit});
});
const updateUnit = catchAsync(async (req, res, next) => {
  const _id = req.body._id
  let {unitID, unitName,streams} = req.body
  if (!_id)
    return res.status(400).json({status:'failed',message:"Subject ID required" });
  const unit = await Unit.findOne({ _id:_id }).exec();
  if (!unit){
    return res
      .status(204)
      .json({ status:'failed',message: `The supplied Id did not matches any unit ${_id}.`,data:unit });
  }
  if (req.body?.unitName) unit.unitName = req.body.unitName;
  if (req.body?.unitName) unit.unitName = req.body.unitName;
  if (req.body?.streams) unit.streams = req.body.streams;
  const query = {unitID:unitID,unitName:unitName,streams:streams}
  const result = await Unit.updateOne({_id:_id},query,{upsert:true});
  res.status(200).json({status:'success', result:result.length, data:result});
});
const deactivateUnit = catchAsync(async (req, res, next) => {});
const archive = catchAsync(async (req, res, next) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Subject ID required." });

  const unit = await Unit.findOne({ _id: req.body.id }).exec();
  if (!unit) {
    return res
      .status(204)
      .json({ message: `No Subject matches ID ${req.body.id}.` });
  }
  const result = await Unit.deleteOne(); //{ _id: req.body.id }
res.json(result);
});


module.exports = {
  getAllUnits,
  registerunit,
  getUnitById,
  updateUnit,
  deactivateUnit,
  archive
};
