
// form one and two



function addMarks(_id, arrscore, arrpoints){
let totalMarks = null
let averagePoints = null
let  meanMark = null
let meanGrade = null
let  points = null
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