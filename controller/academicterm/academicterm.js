const AcademicTerm = require('../../model/academicterm/academicterm');
const catchAsync = require('../../utils/catchAsync')

const getAllTerm = catchAsync(async(req,res,next)=>{
    const AcademicTerms = await AcademicTerm.find().populate({
        path:'yearID',
        select:
        'beginsAt endsAt'
    });
    if (!AcademicTerms) return res.status(204).json({ 'message': 'No Subject found.' });
    res.status(200).json({status:'sucess',result:AcademicTerms.length,data:AcademicTerms});
})
const registerterm = catchAsync(async(req,res,next)=>{
    const {termName, termID , yearID} = req.body;
    const result = await AcademicTerm.create({
        termName:termName,
        termID: termID,
        yearID:YearID
    });
    res.status(201).json({status:'success',data:result});
})
const getTerm = catchAsync(async(req,res,next)=>{
    const _id=req.params.id
    if (!_id) return res.status(400).json({status:'failed',message:'Subject ID required.' });
    const academicTerm = await AcademicTerm.findOne({ _id:_id }).populate({
        path:'yearID',
        select:
        'beginsAt endsAt'
    });
    if (!academicTerm){
    const academicTerm = await AcademicTerm.findOne({ _id: _id }).exec();
        return res.status(204).json({status:'succes' , data: academicTerm });
    }
    res.status(201).json({status:'success',result:academicTerm.length, data:academicTerm});
})
const updateTerm = catchAsync(async(req,res,next)=>{
    const _id = req.body._id
    if(!_id) return res.status(400).json({status:'failed', message:'id must be provided'})
    let termName = req.body?.termName
    let termID = req.body?.termID
   
  const termExist = await AcademicTerm.findOne({ _id:_id}).exec();
  if(!req.body?.termName) termName= termExist.termName
  if(!req.body?.termID) termID= termExist.termID
    const result = await AcademicTerm.updateOne({_id:_id},{
        termName:termName,
        termID: termID
    },{upsert:true});
    res.status(201).json({status:'success',result:result.length, data:result});
})
const archiveterm = catchAsync(async(req,res,next)=>{
    
})
const deactivateTerm = catchAsync(async(req,res,next)=>{
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Subject ID required.' });

    const academicTerm = await AcademicTerm.findOne({ _id: req.body.id }, {upsert: true, new: true}).exec();
    if (!academicTerm) {
        return res.status(204).json({ "message": `No Subject matches ID ${req.body.id}.` });
    }
    const result = await AcademicTerm.deleteOne(); //{ _id: req.body.id }
    res.json(result);
    
})
module.exports = {
    getAllTerm,
    registerterm,
    getTerm,
    updateTerm,
    archiveterm,
    deactivateTerm
}

