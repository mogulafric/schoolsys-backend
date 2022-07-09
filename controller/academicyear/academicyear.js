
const AcademicYear = require('../../model/academicyear/academicyear');
const catchAsyn = require('../../utils/catchAsync')

const getAllYear = catchAsyn(async(req,res,next)=>{
    const academicYears = await AcademicYear.find();
    if (!academicYears) return res.status(204).json({status:`failed`, 'message': 'No Subject found.' });
    res.status(200).json({status:`success`,result:academicYears.length, data:academicYears});
})
const registerYear = catchAsyn(async(req,res,next)=>{  
    const {beginsAt, endsAt} =req.body
    const result = await AcademicYear.create({
        endsAt:endsAt,
        beginsAt:beginsAt
    })
    if(!result) return res.status(204).json({status:'success', data:result})
    res.status(201).json({status:'success',result:result.length, data:result})
})
const getYear = catchAsyn(async(req,res,next)=>{
    const _id = req.params.id
    if (!_id ) return res.status(400).json({ status:'failed',message: 'The id supplied does not match our record.' });
    const academicYear = await AcademicYear.findOne({ _id:_id }).exec();
    if (!academicYear) {
        return res.status(204).json({status:'failed',message: `We are sorry, we coul not retried a match year.` });
    }
    res.status(200).json({status:'success', result:academicYear.length, data:academicYear});
})
const updateYear = catchAsyn(async(req,res,next)=>{
    const _id = req.body._id
    if(!_id) return res.status(400).json({status:'failed', message:'id must be provided'})
    let beginsAt = req.body?.beginsAt
    let endsAt = req.body?.endsAt
    
    if(!beginsAt > !endsAt) {
        return res.status(400).json({status:'failed', message:'A year cannot end before it begins!' });
    }
  const yearExist = await AcademicYear.findOne({ _id:_id}).exec();
  if(!req.body?.beginsAt) beginsAt= yearExist.beginsAt
  if(!req.body?.endsAt) endsAt= yearExist.endsAt
    const result = await AcademicYear.updateOne({_id:_id},{
        beginsAt:beginsAt,
        endsAt: endsAt
    },{upsert:true});
    res.status(201).json({status:'success',result:result.length, data:result});
})
const archiveYear = catchAsyn(async(req,res,next)=>{
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Subject ID required.' });
    const academicYear = await AcademicYear.findOne({ _id: req.body.id }).exec();
    if (!academicYear) {
        return res.status(204).json({ "message": `No Subject matches ID ${req.body.id}.` });
    }
    const result = await AcademicYear.deleteOne(); 
    res.json(result);  
})
const deactivateYear = catchAsyn(async(req,res,next)=>{
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Subject ID required.' });

    const academicYear = await AcademicYear.findOne({ _id: req.body.id }).exec();
    if (!academicYear) {
        return res.status(204).json({ "message": `No Subject matches ID ${req.body.id}.` });
    }
    const result = await AcademicYear.deleteOne(); //{ _id: req.body.id }
    res.json(result);
})
module.exports = {
    getAllYear,
    registerYear,
    getYear,
    updateYear,
    archiveYear,
    deactivateYear

}