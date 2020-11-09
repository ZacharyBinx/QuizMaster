const startBtn = document.querySelector("#start");
const startPrompt = document.querySelector("#start-prompt");
const questionContainer = document.querySelector("#question-container");
const questionText = document.querySelector("#question-text");
const answersDiv = document.querySelector("#answers");

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
        text: "question?",
        answers: ["answer 1", "answer 2", "answer 2"],
        correctIndex: 0,
    }
];
let questionIndex = 0;

startBtn.addEventListener("click", handleStartClick);
answersDiv.addEventListener("click", handleAnswerClick);


function handleStartClick(e) {

    startPrompt.style.display = "none";

    questionContainer.style.display = "block";

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

    }

    questionIndex++;
    renderQuestion();
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
