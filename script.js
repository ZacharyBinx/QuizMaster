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
        text: "You were able to choose 1 of 2 characters in Resident Evil 1. What were their names?",
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
        text: "What was the name of the virus in Resident Evil 4?",
        answers: ["Las Plagas", "Del Lago", "El Salvador"],
        correctIndex: 0,
    },
    {
        text: "What is the name of Chris Redfield's companion in Resident Evil 5?",
        answers: ["Jill Valentine", "Sheva Alomar", "Barry Burton"],
        correctIndex: 1,
    },
    {
        text: "In Resident Evil 2, if you were to check Albert Wesker's desk in the police department 50 times, what picture would you find on the film?",
        answers: ["Albert's child from another woman", "Rebecca Chambers in a basketball uniform", "Picture of Jill Valentine in her home, through a window"],
        correctIndex: 1,
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
// submit button
function subUserScore(e) {
    e.preventDefault();

    // const userInit = userInit.value.trim();
    let user = {
        inits: userInit.value.trim(),
        initsScore: score,
    };
    let players = JSON.parse(localStorage.getItem('myPlayers')) || [];

    players.push(user);

    localStorage.setItem('myPlayers', JSON.stringify(players));

    
    window.location.replace("score.html")
    renderScoreBoard();
}

// loaded on score pageload
function renderScoreBoard(e) {
    let players = JSON.parse(localStorage.getItem('myPlayers')) || [];
    // players.push({

    // })
    // console.log(players);

    if (players) {

        // players.sort(function (a, b) {
        //     return b.userscore - a.userscore;
        // });

        for (let i = 0; i < players.length; i++) {

            var row = document.createElement("tr");
            const table = document.querySelector("#leaderboard");
            var initials = document.createElement("td");
            var finalScore = document.createElement("td");

            initials.textContent = players[i].inits;
            finalScore.textContent = players[i].initsScore;

            console.log(initials.textContent);
            console.log(finalScore.textContent);
            row.appendChild(initials);
            row.appendChild(finalScore);
            table.appendChild(row);
        }
    } else {
    players = [];
}
}