const startBtn = document.querySelector("#start");
const startPrompt = document.querySelector("#start-prompt");
const questionContainer = document.querySelector("#question-container");
const questionText = document.querySelector("#question-text");
const answersDiv = document.querySelector("#answers");
const timerEl = document.querySelector("#timer");
const finalResult = document.querySelector(".finalresult");
const userScore = document.querySelector("#userscore");
const scoreSubmit = document.querySelector("#submit");
var userInit = document.querySelector("#userInit");
var timeLeft = 100;
var score = 0;
let timerOn = true;

const questions = [
    {
        text: "question?",
        answers: ["answer 1", "answer 2", "answer 2"],
        correctIndex: 0,
    },
    {
        text: "question?",
        answers: ["answer 1", "answer 2", "answer 2"],
        correctIndex: 0,
    },
    {
        text: "question?",
        answers: ["answer 1", "answer 2", "answer 2"],
        correctIndex: 0,
    },
    {
        text: "question?",
        answers: ["answer 1", "answer 2", "answer 2"],
        correctIndex: 0,
    },
    {
        text: "question?",
        answers: ["answer 1", "answer 2", "answer 2"],
        correctIndex: 0,
    },
    {
        text: "question?",
        answers: ["answer 1", "answer 2", "answer 2"],
        correctIndex: 0,
    },
    {
        text: "question?",
        answers: ["answer 1", "answer 2", "answer 2"],
        correctIndex: 0,
    },
    {
        text: "question?",
        answers: ["answer 1", "answer 2", "answer 2"],
        correctIndex: 0,
    },
    {
        text: "question?",
        answers: ["answer 1", "answer 2", "answer 2"],
        correctIndex: 0,
    },
    {
        text: "bing bong",
        answers: ["yoohoo", "woohoo", "answer 2"],
        correctIndex: 0,
    }
];
let questionIndex = 0;

if(startBtn){
    startBtn.addEventListener("click", handleStartClick);
}
if(answersDiv){
answersDiv.addEventListener("click", handleAnswerClick);
}
if(scoreSubmit){
scoreSubmit.addEventListener("click", subUserScore);
}

function handleStartClick(e) {

    startPrompt.style.display = "none";

    questionContainer.style.display = "block";

    healthStart();

    renderQuestion();
};
function handleAnswerClick(e) {

    e.preventDefault();

    if (!e.target.matches("button")) return;

    const question = questions[questionIndex];
    const correctAnswer = question.answers[question.correctIndex];
    const userAnswer = e.target.textContent;

    if (userAnswer === correctAnswer) {

    } else {
        timeLeft -= 10;
    }

    questionIndex++;

    if (questionIndex == questions.length) {
        quizOver();

    } else {
        renderQuestion();
    }


};
function renderQuestion() {
    const currentQuestion = questions[questionIndex];

    questionText.textContent = currentQuestion.text;

    answersDiv.innerHTML = "";

    for (let i = 0; i < currentQuestion.answers.length; i++) {

        const answer = currentQuestion.answers[i];

        const btn = document.createElement("button");

        btn.setAttribute("class", "btn btn-primary");
        btn.textContent = answer;
        answersDiv.appendChild(btn);
    }
}

function healthStart() {

    timerEl.style.display = "block";

    var timeInterval = setInterval(function () {

        timerEl.textContent = "Health: " + timeLeft;
        if (timerOn){
        timeLeft--;
        }
        if (timeLeft <= 0 || !timerOn) {
            clearInterval(timeInterval);
        }
    }, 1000);
}

function quizOver() {
    timerOn = false;
    questionContainer.style.display = "none";
    timerEl.style.display = "none";
    finalResult.style.display = "block";
    score = timeLeft;
    userScore.textContent = `${score}`;
}

function subUserScore(e) {
    e.preventDefault();
    var userInitials = userInit.value.trim();
    if (userInitials === "") {
        return;
    }
    localStorage.setItem("User", userInitials);

    const highScore = JSON.stringify(score);

    localStorage.setItem("finalscore", highScore);
    console.log(highScore);
    console.log(userInitials);
   
    renderScoreBoard();
}

function renderScoreBoard(){
    window.location.replace("score.html")
    let storedUser = localStorage.getItem("User");
    let storedScore = localStorage.getItem("finalscore");

    if (storedUser) {
        userInitFinal = JSON.parse(storedUser);
    }
    if (storedScore) {
        userScoreFinal = JSON.parse(storedScore);
    }
    console.log(userScoreFinal);
    console.log(userInitFinal);
}