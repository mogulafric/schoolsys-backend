const updateScoreByExamBySubject = catchAsync(async (req, res, next) => {
      let { _id, subjectObjectID, score , index} = req.body
      
     const querySelector = `{
      _id: ${_id},examinableSubjects.${index}._id: ${subjectObjectID}

}`
    const query =`{examinableSubjects.${index}.score: ${score}}`
    
      let updateSubjectScore = await CaptureMarks.updateOne({querySelector},
            {
                  $push:{query}
            },
            {
                   multi:true
            })
      res.status(200).json({
            status: 'success',
            result: updateSubjectScore.length,
            data: updateSubjectScore
      })

})
