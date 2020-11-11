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
        text: "Which famous twitch streamer succeeded in a No-Hit Run in Resident Evil 2 in relation to a bet about shaving his/her head?",
        answers: ["Cahlaflour", "Fruitbats", "The_Happy_Hob"],
        correctIndex: 2,
    },
    {
        text: "If attacked by a zombie, which virus do you contract?",
        answers: ["T-Virus", "Z-Virus", "Wombo-Zombo-Combo"],
        correctIndex: 0,
    },
    {
        text: "What was the original name for 'Resident Evil' before coming to America?",
        answers: ["The Virus", "Infected", "Biohazard"],
        correctIndex: 2,
    },
    {
        text: "When was the zombie 'Nemesis' introduced to the series?",
        answers: ["Resident Evil: 0", "Resident Evil 3", "Resident Evil"],
        correctIndex: 1,
    },
    {
        text: "You were able to choose 1 of 2 characters in Resident Evil. What were their names?",
        answers: ["Rebecca Chambers and Billy Coen", "Leon Kennedy and Jill Valentine", "Jill Valentine and Chris Redfield"],
        correctIndex: 2,
    },
    {
        text: "What is the name of the corporation responsible for the outbreak of the virus?",
        answers: ["Umbrella", "Tricell", "MedSmart"],
        correctIndex: 0,
    },
    {
        text: "Name the creepy crawly which sensed your movements in the Resident Evil series!",
        answers: ["Crawler", "Hook Man", "Licker"],
        correctIndex: 2,
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

if (startBtn) {
    startBtn.addEventListener("click", handleStartClick);
}
if (answersDiv) {
    answersDiv.addEventListener("click", handleAnswerClick);
}
if (scoreSubmit) {
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

        btn.setAttribute("class", "btn btn-text border border-danger");
        btn.textContent = answer;
        answersDiv.appendChild(btn);
    }
}

function healthStart() {

    timerEl.style.display = "block";

    var timeInterval = setInterval(function () {

        timerEl.textContent = "Health: " + timeLeft;
        if (timerOn) {
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

    window.location.replace("score.html")
    renderScoreBoard();
}

function renderScoreBoard() {
    let storedUser = window.localStorage.getItem("User");
    let storedScore = localStorage.getItem("finalscore");

    if (storedUser) {
        userInitFinal = JSON.parse(storedUser);
    }
    if (storedScore) {
        userScoreFinal = JSON.parse(storedScore);
    }

    console.log(userInitFinal);
    console.log(userScoreFinal);

    highScores.sort(function (a, b) {
        return b.userscore - a.userscore;
    });

    for (let i = 0; i < highScores.length; i++) {

        var row = document.createElement("tr");
        for (let i = 0; i < highScores.length; i++) {
            const table = document.querySelector("#leaderboard");
            var cell = document.createElement("td");
            var userText = document.createTextNode(userInitFinal, userScoreFinal);
            cell.appendChild(userText);
            row.appendChild(cell);
            table.appendChild(row);
        }
    }

}