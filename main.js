let countSpan = document.querySelector(".count span.all-question-num"); //select span of question counter
btnStart = document.querySelector(".Start"); //select start button
let quizArea = document.querySelector(".quiz-area"); //select div of quiz area
let allAnswerArea = document.querySelector(".answers-area"); //select div of answers area
function getQuestions() {
  //get question api
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionObject = JSON.parse(this.responseText);
      let questionCount = questionObject.results.length;
      randomQues(questionObject.results); // display random question
      allQuesNum(arrayQues.length); // update question counter
      let theNum = -1;
      //   console.log(arrayQues);
      function showFirstQues() {
        answerResult(theNum, arrayQues); // check answers
        removeSelect(); //remove radio check
        theNum++; // update variable theNum
        if (theNum < 10) {
          let quesNum = document.querySelector(".quiz-info .count span");
          quesNum.innerHTML = `${theNum + 1}`;
        }
        let firstH2 = document.querySelector(".quiz-area h2");
        firstH2.innerHTML = arrayQues[0];
        arrayQues.shift();
        console.log("!!11");
        console.log(arrayQues);
        for (let i = 0; i < 4; i++) {
          answer = document.querySelector(`#answer-${i + 1}`);
          //   if (i <= 2) {
          //     textAnswer = arrayQues[theNum].incorrect_answers[i];
          //   } else {
          //     textAnswer = arrayQues[theNum].correct_answer;
          //   }
          answer.innerHTML = arrayQues[0];
          arrayQues.shift();
        }
        btnStart.classList.add("disable");
        quizArea.classList.remove("disable");
        allAnswerArea.classList.remove("disable");
        if (theNum <= arrayQues.length - 2) {
          btn.classList.remove("disable"); // if the quiz is not finish the submit button will still display
        } else {
          //   console.log();
          btnStart.classList.remove("disable"); // show start btn and transfer to result button
          btnStart.innerHTML = `Your result is ${pointResult}/10`; // show results
          //results grades
          if (pointResult >= 9) {
            btnStart.classList.add("perfect");
          }
          if (pointResult < 9 && pointResult >= 5) {
            btnStart.classList.add("good");
          } else {
            btnStart.classList.add("bad");
          }
          btn.classList.add("disable"); // disable submit answer button
          quizArea.classList.add("disable"); // disable quiz area
          allAnswerArea.classList.add("disable"); // disable answers area
        }
      }
      btnStart.onclick = showFirstQues;
      let btn = document.querySelector(".submit-button.submit");
      btn.onclick = showFirstQues;
    }
  };
  myRequest.open(
    "GET",
    "https://opentdb.com/api.php?amount=50&category=18&difficulty=medium&type=multiple",
    true
  );
  myRequest.send();
}
getQuestions();

function allQuesNum(num) {
  countSpan.innerHTML = `${num}`;
}

function randomQues(question) {
  arrayQues = [];
  answers = [];
  correct_answer = [];
  for (let i = 0; i < 10; i++) {
    var randomElement = question[Math.floor(Math.random() * question.length)];
    arrayQues.push(randomElement.question);
    answers.push(randomElement.correct_answer);
    correct_answer.push(randomElement.correct_answer);
    for (let i = 0; i < 3; i++) {
      answers.push(randomElement.incorrect_answers[i]);
    }
    for (let i = 0; i < 4; i++) {
      var randomAnswers = answers[Math.floor(Math.random() * answers.length)];
      arrayQues.push(randomAnswers);
      answers = answers.filter((element) => element !== randomAnswers); // [1,2,4,5,7]
    }
  }
  arrayQues.push(correct_answer);
  console.log(arrayQues[-1]);
  return arrayQues;
}

let pointResult = 1;
function answerResult(theNum, arrayQues) {
  let answerArea = document.querySelectorAll(".answers-area input");
  answerArea.forEach((ele, index) => {
    if (ele.checked) {
      if (
        document.getElementById(`answer-${index + 1}`).innerHTML ==
        arrayQues[theNum].correct_answer
      ) {
        pointResult++;
      }
    }
  });
  return pointResult;
}

function removeSelect() {
  for (let i = 1; i < 5; i++) {
    document.getElementById(`number-${i}`).checked = false;
  }
}

// var mins=.1;
// var secs=mins*60;
// let done=true;
// function countdown() {
//     setTimeout('Decrement()',120);
// }
// function Decrement() {
//     minutes=document.getElementById("minutes");
//     seconds=document.getElementById("seconds");
//     if(seconds<59) {
//         seconds.value=secs;
//     }
//     else {
//         minutes.value=getminutes();
//         seconds.value=getseconds();
//     }
//     if(mins<1) {
//         minutes.style.color="red";
//         seconds.style.color="red";
//     }
//     if(mins<0) {
//         minutes.value=0;
//         seconds.value=0;
//     }
//     else {
//         secs--;
//         setTimeout('Decrement()',1000);
//     }
// }

// function getminutes() {
//     mins=Math.floor(secs/60);
//     return mins;
// }

// function getseconds() {
//     return secs-Math.round(mins*60);
// }
