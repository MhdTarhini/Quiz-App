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

      randomQues(questionObject.results); // display random question
      countSpan.innerHTML = 10; // every quiz is 10 question
      let theNum = 1; // question counter
      let correct_answer = arrayQues.pop(); // pop the correct answers into a new array

      function showFirstQues() {
        answerResult(correct_answer); // check answers
        removeSelect(); //remove radio check

        let questionH2 = document.querySelector(".quiz-area h2");
        questionH2.innerHTML = arrayQues[0]; //display question into h2
        arrayQues.shift(); // remove the question already displayed from the array

        for (let i = 0; i < 4; i++) {
          answer = document.querySelector(`#answer-${i + 1}`); // get radio input by specific id
          answer.innerHTML = arrayQues[0]; // display answer
          arrayQues.shift(); // remove every answer already displayed from the array
        }
        btnStart.classList.add("disable"); // disable the start button
        quizArea.classList.remove("disable"); // show the quiz area
        allAnswerArea.classList.remove("disable"); // show answers area

        if (theNum <= 10) {
          btn.classList.remove("disable"); // if the quiz is not finish the submit button will still display
        } else {
          theNum = 10;
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
        let quesNum = document.querySelector(".quiz-info .count span");
        // update variable theNum
        quesNum.innerHTML = `${theNum++}`;
      }
      btnStart.onclick = showFirstQues; // start quiz
      let btn = document.querySelector(".submit-button.submit");
      btn.onclick = showFirstQues; // re-call the function after submit the answer
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

function randomQues(data) {
  arrayQues = []; // define array for all data
  answers = []; // for every question correct and incorrect answers
  correct_answer = []; // correct answers only
  for (let i = 0; i < 10; i++) {
    var randomElement = data[Math.floor(Math.random() * data.length)]; // get random question
    data = data.filter(
      (element) => element.question !== randomElement.question // filter the data from the questions already used
    );
    arrayQues.push(randomElement.question); // push the question
    answers.push(randomElement.correct_answer); // push the correct answers
    correct_answer.push(randomElement.correct_answer); // push the correct answers
    for (let i = 0; i < 3; i++) {
      answers.push(randomElement.incorrect_answers[i]); // push incorrect answers inside the array
    }
    for (let i = 0; i < 4; i++) {
      var randomAnswers = answers[Math.floor(Math.random() * answers.length)]; // get random answers (correct or incorrect)
      arrayQues.push(randomAnswers); // push all answers inside the array
      answers = answers.filter((element) => element !== randomAnswers); // remove the answer already pushed
    }
  }
  arrayQues.push(correct_answer); // add correct_answers (all correct answers) in the end of array
  return arrayQues;
}

let pointResult = 0;
function answerResult(correct_answer) {
  let answerArea = document.querySelectorAll(".answers-area input");
  answerArea.forEach((ele, index) => {
    if (ele.checked) {
      // check if the answers in included inside the correct answers array
      if (
        correct_answer.includes(
          document.getElementById(`answer-${index + 1}`).innerHTML
        )
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
