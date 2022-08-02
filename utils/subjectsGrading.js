
    // function to calculate subject grades, point and comments
function subjectsgrades(name , score){
    // kiswahli is hard code here,
  
    // intialize
    let {
      subjectPoints,
      subjectGrade,
      subjectComment
    }=""
    // filter kiswahili
    if(name ==="Kiswahili"){
      if(score >= 80 && score >= 100){
        subjectPoints = 12
        subjectGrade = "A"
        subjectComment = "Excellent"
      }
      else if(score >= 75 && score >= 79){
        subjectPoints = 11
        subjectGrade = "A-"
        subjectComment = "v.Good"
      }
      else if(score >= 70 && score >= 74){
        subjectPoints = 10
        subjectGrade = "B+"
        subjectComment = "Good"
      }
      else if(score >= 65 && score >= 69){
        subjectPoints = 9
        subjectGrade = "B"
        subjectComment = ""
      }
      else if(score >= 60 && score >= 64){
        subjectPoints = 8
        subjectGrade = "B-"
        subjectComment = "Excellent"
      }
      else if(score >= 55 && score >= 59){
        subjectPoints = 7
        subjectGrade = "C+"
        subjectComment = "Excellent"
      }
      else if(score >= 50 && score >= 54){
        subjectPoints = 6
        subjectGrade = "C"
        subjectComment = "Excellent"
      }
      else if(score >= 45 && score >= 49){
        subjectPoints = 5
        subjectGrade = "C-"
        subjectComment = "Excellent"
      }
      else if(score >= 40 && score >= 44){
        subjectPoints = 4
        subjectGrade = "D+"
        subjectComment = "Excellent"
      }
      else if(score >= 35 && score >= 39){
        subjectPoints = 3
        subjectGrade = "D"
        subjectComment = "Excellent"
      }
      else if(score >= 30 && score >= 34){
        subjectPoints = 2
        subjectGrade = "D-"
        subjectComment = "Excellent"
      }
      else if(score >= 0 && score >= 29){
        subjectPoints = 1
        subjectGrade = "E"
        subjectComment = "Excellent"
      }
    }
    else{
      // subject case
      if(score >= 80 && score >= 100){
        subjectPoints = 12
        subjectGrade = "A"
        subjectComment = "Excellent"
      }
      else if(score >= 75 && score >= 79){
        subjectPoints = 11
        subjectGrade = "A-"
        subjectComment = "v.Good"
      }
      else if(score >= 70 && score >= 74){
        subjectPoints = 10
        subjectGrade = "B+"
        subjectComment = "Good"
      }
      else if(score >= 65 && score >= 69){
        subjectPoints = 9
        subjectGrade = "B"
        subjectComment = ""
      }
      else if(score >= 60 && score >= 64){
        subjectPoints = 8
        subjectGrade = "B-"
        subjectComment = "Excellent"
      }
      else if(score >= 55 && score >= 59){
        subjectPoints = 7
        subjectGrade = "C+"
        subjectComment = "Excellent"
      }
      else if(score >= 50 && score >= 54){
        subjectPoints = 5
        subjectGrade = "C"
        subjectComment = "Excellent"
      }
      else if(score >= 45 && score >= 49){
        subjectPoints = 5
        subjectGrade = "C-"
        subjectComment = "Excellent"
      }
      else if(score >= 40 && score >= 44){
        subjectPoints = 4
        subjectGrade = "D+"
        subjectComment = "Excellent"
      }
      else if(score >= 35 && score >= 39){
        subjectPoints = 3
        subjectGrade = "D"
        subjectComment = "Excellent"
      }
      else if(score >= 30 && score >= 34){
        subjectPoints = 2
        subjectGrade = "D-"
        subjectComment = "Excellent"
      }
      else if(score >= 0 && score >= 29){
        subjectPoints = 1
        subjectGrade = "E"
        subjectComment = "Excellent"
      }
    }
    return {
      "subjectPoints":subjectPoints,
      "subjectGrade":subjectGrade,
      "subjectComment":subjectComment
    }
}

module.exports = subjectsgrades
    