const Stream = require("../../model/streams/streams");
const catchAsync = require("../../utils/catchAsync.js");
const getAllStreams = catchAsync(async (req, res, next) => {
  const streams = await Stream.find().populate({
    path: 'unitID',
    select: 'unitName unitCode'
  });
  if (!streams) return res.status(204).json({ status: 'success', data: streams });
  res.status(200).json({ status: 'success', result: streams.length, data: streams });
});
const registerStream = catchAsync(async (req, res, next) => {
  const { streamName, streamCode, unitID } = req.body;
  const duplicate = await Stream.findOne({
    streamCode: streamCode
  }).exec();
  if (duplicate)
    return res
      .status(409)
      .json({
        message:
          "Duplication of unique fields not allowed!",
      }); //Conflict
  const result = await Stream.create({
    unitID: unitID,
    streamName: streamName,
    streamCode: streamCode
  });
  res.status(201).json({ status: 'success', result: result.length, data: result });

});
const getStreamById = catchAsync(async (req, res, next) => {
  const _id = req.params.id
  if (!_id) {
    return res.status(400).json({ staus: 'failed', message: "The id used did not match any unit ID" });
  }
  const stream = await Stream.findOne({ _id: _id }).populate({
    path: 'unitID',
    select: 'unitName unitCode'
  });
  if (!stream) {
    return res
      .status(204)
      .json({ message: `Sorry, we could retrive data with provided ID ${req.body._id}.` });
  }

  res.status(200).json({ status: 'success', result: stream.length, data: stream });
});
const updateStream = catchAsync(async (req, res, next) => {
  const _id = req.body._id
  let { streamName, streamCode, unitID } = req.body
  if (!_id)
    return res.status(400).json({ status: 'failed', message: "Subject ID required" });
  const stream = await Stream.findOne({ _id: _id }).exec();
  if (!stream) {
    return res
      .status(204)
      .json({ status: 'failed', message: `The supplied Id did not matches any stream ${_id}.`, data: stream });
  }
  if (!req.body?.streamName) streamName = stream.streamName;
  if (!req.body?.streamCode) streamCode = stream.streamCode;
  if (!req.body?.unitID) unitID = stream.unitID;
  console.log(streamName)
  const query = { unitID: unitID, streamName: streamName, streamCode: streamCode }
  const result = await stream.updateOne({ _id: _id }, query, { upsert: true });
  res.status(200).json({ status: 'success', result: result.length, data: result });
});
const deactivate = catchAsync(async (req, res, next) => { });
const archive = catchAsync(async (req, res, next) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Subject ID required." });

  const stream = await Stream.findOne({ _id: req.body.id }).exec();
  if (!stream) {
    return res
      .status(204)
      .json({ message: `No Subject matches ID ${req.body.id}.` });
  }
  const result = await Unit.deleteOne(); //{ _id: req.body.id }
  res.json(result);
});
const remove = catchAsync(async (req, res, next) => {
  let streamID = res.parama.streamID
  if (!streamID) {
    return res.status(400).json({
      status: 'failed',
      message: 'Id must be provided for this request'
    })
  }
  await Stream.findByIdAndRemove({ _id: streamID })
  res.status(200).json({
    status: 'success',
    message: 'Removed successfully'
  })
})


module.exports = {
  getAllStreams,
  registerStream,
  getStreamById,
  updateStream,
  deactivate,
  archive,
  remove
};

