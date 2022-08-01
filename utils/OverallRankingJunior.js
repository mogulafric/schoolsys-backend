
// form one and two
let {
    totalMarks,
    averagePoints,
    meanMark,
    meanGrade,
    points
}= ""
function addMarks(_id, arrscore, arrpoints){
    for (let i = 0; i < arrscore.length; i++) {
        totalMarks+= arrscore[i];
    }
    meanMark = totalMarks/11
    for (let i = 0; i < arrpoints.length; i++) {
        points+= arrpoints[i];
    }
    averagePoints = points/11

    return {
        "totalMarks":totalMarks,
        "averagePoints":averagePoints,
        "meanMark":meanMark,
        "meanGrade":meanGrade,
        "points":points
    }

}