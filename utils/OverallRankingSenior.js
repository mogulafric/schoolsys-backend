
// form one and two
let totalMarks= 0
let points =0
let {averagePoints,meanMark}=0
let cat1Points =0
let meanGrade= ""
 let c1 =0
  let cat1 = "cat1"
function addMarks(_id, subject){
    for (let i = 0; i < subject.length; i++) {
        totalMarks+=subject[i].score;
    }
    meanMark = (totalMarks/subject.length)
    for(let i = 0; i< subject.length; i++){
        if(cat1 ===subject[i].cat){
            c1+=1
            if(subject[i].cat===cat1){
               cat1Points= cat1Points + subject[i].points
               console.log(cat1Points)
            }
        }
    }
   // console.log({"Cat1":cat1Points})
    averagePoints = points/11
    if(points > 40) meanGrade = "A"
    return {"studentID":_id,
        "subject":{
        "totalMarks":totalMarks,
        "averagePoints":averagePoints,
        "meanMark":meanMark,
        "meanGrade":meanGrade,
        "points":points
    }}
    return {"score":score}
}

let subject = [{
        subjectID:"subjectID",
        cat:"cat1",
        name:"Eng",
        score:80,
        points:12
    },
    {
        subjectID:"subjectID",
        cat:"cat1",
        name:"Math",
        score:80,
        points:12
    },
    {
        subjectID:"subjectID",
        cat:"cat2",
        name:"bio",
        score:70,
        points:7
    },
    {
        subjectID:"subjectID",
        cat:"cat2",
        name:"bio",
        score:60,
        points:7
    }, 
    {
        subjectID:"subjectID",
        cat:"cat2",
        name:"bio",
        score:55,
        points:7
    }, 
    {
        subjectID:"subjectID",
        cat:"cat1",
        name:"Math",
        score:80,
        points:12
    }, 
    {
        subjectID:"subjectID",
        cat:"cat1",
        name:"Math",
        score:80,
        points:12
    }, 
    {
        subjectID:"subjectID",
        cat:"cat3",
        name:"Math",
        score:80,
        points:12
    },
    {
        subjectID:"subjectID",
        cat:"cat3",
        name:"Math",
        score:80,
        points:12
    }
    , 
    {
        subjectID:"subjectID",
        cat:"cat3",
        name:"Math",
        score:80,
        points:12
    },
    {
        subjectID:"subjectID",
        cat:"cat4",
        name:"Math",
        score:80,
        points:12
    }
    ,
    {
        subjectID:"subjectID",
        cat:"cat4",
        name:"Math",
        score:80,
        points:12
    }]
    
console.log(addMarks(12, subject))