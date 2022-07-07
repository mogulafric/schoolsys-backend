
const AcademicYear = require('../model/academicYear');

const getAllYear = catchAsyn(async(req,res,next)=>{
    const academicYears = await AcademicYear.find();
    if (!academicYears) return res.status(204).json({ 'message': 'No Subject found.' });
    res.json(academicYears);

})
const registerYear = catchAsyn(async(req,res,next)=>{
    
})
const getYear = catchAsyn(async(req,res,next)=>{
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Subject ID required.' });

    const academicYear = await AcademicYear.findOne({ _id: req.params.id }).exec();
    if (!academicYear) {
        return res.status(204).json({ "message": `No Subject matches ID ${req.params.id}.` });
    }
    res.json(academicYear);
})
const updateYear = catchAsyn(async(req,res,next)=>{
    const {beginsAt, endsAt } = req.body;
    //check if  fields empty
    if(beginsAt==="undefined"  || beginsAt===null || beginsAt==="" ){    
        return res.status(404).json({'message':'Somefileds are  undefined'})
    }
    if(!beginsAt || !endsAt) {
        return res.status(400).json({ 'message': 'Some fields are empty!' });
    }
     // check for duplicate roles in the db

  const duplicate = await AcademicYear.findOne({  beginsAt: beginsAt, endsAt:endsAt }).exec();
  if(duplicate) return res.status(409).json({'message':'Duplication of unique fields not allowed! {subjectCode,subjectName}'}); //Conflict 
    try {
        const result = await AcademicYear.create({
            beginsAt:beginsAt,
            endsAt: endsAt
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    } 
})
const archiveYear = catchAsyn(async(req,res,next)=>{
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Subject ID required.' });
    const academicYear = await AcademicYear.findOne({ _id: req.body.id }).exec();
    if (!academicYear) {
        return res.status(204).json({ "message": `No Subject matches ID ${req.body.id}.` });
    }
    const result = await AcademicYear.deleteOne(); //{ _id: req.body.id }
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