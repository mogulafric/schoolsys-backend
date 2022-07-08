const AcademicTerm = require('../../model/academicterm/academicterm');
const catchAsync = require('../../utils/catchAsync')


const getAllTerm = catchAsync(async(req,res,next)=>{
    const AcademicTerms = await AcademicTerm.find();
    if (!AcademicTerms) return res.status(204).json({ 'message': 'No Subject found.' });
    res.status(200).json({status:'sucess',result:AcademicTerms.length,data:AcademicTerms});
})
const registerterm = catchAsync(async(req,res,next)=>{
    const {termName, termID } = req.body;
    //check if  fields empty
    if(termName==="undefined"  || termName===null || termName==="" ){    
        return res.status(404).json({'message':'Somefileds are  undefined'})
    }
    if(!termName || !termID) {
        return res.status(400).json({ 'message': 'Some fields are empty!' });
    }
     // check for duplicate roles in the db
   const duplicate = await AcademicTerm.findOne({  termName: termName, termID:termID }).exec();
    if(duplicate) return res.status(409).json({'message':'Duplication of unique fields not allowed! {subjectCode,subjectName}'}); //Conflict 
    try {
        const result = await AcademicTerm.create({
            termName:termName,
            termID: termID
           
          
          
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
    
})
const getTerm = catchAsync(async(req,res,next)=>{
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Subject ID required.' });

    const academicYear = await AcademicTerm.findOne({ _id: req.params.id }).exec();
    if (!academicYear) {
        return res.status(204).json({ "message": `No Subject matches ID ${req.params.id}.` });
    }
    res.json(academicYear);
})
const updateTerm = catchAsync(async(req,res,next)=>{
    if (!req?.body?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    try{
    const academicTerm = await AcademicTerm.findOne({ _id: req.body._id }).exec();
    if (!academicTerm) {
        return res.status(204).json({ "message": `No student matches ID ${req.body._id}.` });
    }
    if (req.body?.termName) academicTerm.termName = req.body.termName;
    if (req.body?.termID) academicTerm.termID = req.body.termID;
}
   catch(error) { 
       if (error instanceof MongoServerError) {
      next({status:500, message:"internal server error" })
  }
  else{
    next({status:500, message:"" })
  }

  
}

    
    const result = await AcademicTerm.updateOne({_id:req.body._id},{
        termName: req.body.termName,
        termID: req.body.termID
       
    });
    res.json(result);
    
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

