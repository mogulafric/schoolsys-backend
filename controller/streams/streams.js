const catchAsync = require("../../utils/catchAsync")

const getAllStreams = catchAsync(async(req,res,next)=>{
    const streams = await Stream.find();
    if (!streams) return res.status(204).json({ 'message': 'No Streams found.' });
    res.json(streams);
})
const registerStream = catchAsync(async(req,res,next)=>{
    const {streamName, streamCode} = req.body;
    if (!streamName|| !streamCode) {
        return res.status(400).json({ 'message': 'Stream name, code  are required' });
    }

  // check for duplicate roles in the db
  const duplicate = await Stream.findOne({ streamCode: streamCode}).exec();
  console.log(duplicate)
  if(duplicate)return res.sendStatus(409); //Conflict 
    
        const result = await Stream.create({
            streamName: req.body.streamName,
            streamCode: req.body.streamCode, 
        });

        res.status(201).json(result);
})
const getStreamById = catchAsync(async(req,res,next)=>{
    if(!req?.body?.id) return res.status(400).json({ 'message': 'stream ID required.' });

    const stream = await Stream.findOne({ _id: req.body.id }).exec();
    if (!stream) {
        return res.status(204).json({ "message": `No role matches ID ${req.body.id}.` });
    }
    const result = await Stream.deleteOne(); //{ _id: req.body.id }
    res.json(result);
    
})
const updateById = catchAsync(async(req,res,next)=>{
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const stream = await Stream.findOne({ _id: req.body._id }).exec();
    if (!stream) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body._id}.` });
    }
    if (req.body?.streamName) stream.streamName = req.body.streamName;
    if (req.body?.streamCode) stream.streamCode = req.body.streamCode;
    const result = await stream.updateOne();
    res.json(result);
    
})
const archive = catchAsync(async(req,res,next)=>{
    
})
const deactivate = catchAsync(async(req,res,next)=>{
    
})
module.exports = {
    getAllStreams,
    registerStream,
    getStreamById,
    updateById,
    deactivate,
    archive
}


