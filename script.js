const questions = [
    { question: "What is CSS?", options: ["CSS is a style sheet language", "CSS is designed to separate the presentation and content, including layout, colors, and fonts", "CSS is the language used to style the HTML documents", "All of the mentioned"], answer: "D" },
    { question: "HTML uses ______?", options: ["User-defined tags", "Predefined tags", "Fixed tags defined by the language", "Tags for links only"], answer: "C" },
    { question: "Which of the following has introduced text, list, box, margin, border, color, and background properties?", options: ["HTML", "PHP", "CSS", "Ajax"], answer: "C" },
    { question: "Which of the following CSS selectors are used to specify a group of elements?", options: ["tag", "id", "class", "both class and tag"], answer: "C" },
    { question: "Which of the following CSS framework is used to create a responsive design?", options: ["Bootstrap", "Rails", "Laravel", "Django"], answer: "A" },
    { question: "Which of the following CSS selector is used to specify a rule to bind a particular unique element?", options: ["tag", "id", "class", "both class and tag"], answer: "B" },
    { question: "If we want to set the style for just one element, which css selector will we use?", options: ["id", "text", "class", "name"], answer: "A" },
    { question: "Which of the following CSS style property is used to specify an italic text?", options: ["style", "font", "font-style", "@font-face"], answer: "C" },
    { question: "Which of the following are the CSS Extension Prefixes for Webkit?", options: ["-webkit", "-web", "-o-", "-chrome"], answer: "A" },
    { question: "Which of the following function defines a linear gradient as a CSS image?", options: ["gradient()", "linear-gradient()", "grayscale(", "image()"], answer: "B" }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

// DOM Elements
const timerElement = document.getElementById('timer');
const questionContainer = document.getElementById('questionContainer');
const nextButton = document.getElementById('nextButton');
const submitButton = document.getElementById('submitButton');
const resultElement = document.getElementById('result');
const questionCount = document.getElementById('questionCount');

// Load a question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <p>${currentQuestionIndex + 1}. ${question.question}</p>
        <div class="options">
            ${question.options
                .map(
                    (option, i) =>
                        `<label class="option-item"><input type="radio" name="q${currentQuestionIndex}" value="${String.fromCharCode(65 + i)}"> ${option}</label>`
                )
                .join("")}
        </div>
    `;
    questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    resetTimer();
    startTimer();
}

// Handle the "Next" button click
function handleNextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
    if (!selectedOption) {
        alert("Please select an answer.");
        return;
    }

    if (selectedOption.value === questions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Show the final result
function showResult() {
    clearInterval(timer); // Stop the timer
    questionContainer.innerHTML = "";
    resultElement.classList.remove("hidden");
    
    // Show the score in the feedback section
    const feedbackMessage = generateFeedback(score);
    
    resultElement.innerHTML = `
        <p id="scoreFeedback" class="feedback">${feedbackMessage.score}</p>
        <p>${feedbackMessage.feedback}</p>
    `;
    
    timerElement.style.display = "none"; // Hide the timer in the score section
    nextButton.style.display = "none"; // Hide the next button in the result section
    submitButton.style.display = "none"; // Hide the submit button in the result section
}

// Generate feedback based on score
function generateFeedback(score) {
    let feedbackMessage = {
        score: `You scored ${score} out of ${questions.length}.`,
        feedback: ""
    };
    
    if (score === questions.length) {
        feedbackMessage.feedback = "Excellent! Perfect score!";
    } else if (score >= questions.length / 2) {
        feedbackMessage.feedback = "Good job! You scored above average.";
    } else {
        feedbackMessage.feedback = "Keep trying! You can do better.";
    }

    return feedbackMessage;
}

// Retry the quiz
function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30; // Reset the timer
    resultElement.classList.add("hidden"); // Hide the result section
    nextButton.style.display = "block"; // Show the next button again
    submitButton.style.display = "none"; // Hide the submit button
    timerElement.style.display = "block"; // Show the timer again
    loadQuestion(); // Load the first question again
    clearInterval(timer); // Clear any existing timer
    startTimer(); // Restart the timer
}

// Timer functions
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `${timeLeft} seconds left`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleNextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerElement.textContent = "30 seconds left";
}

// Event Listeners
nextButton.addEventListener("click", handleNextQuestion);
submitButton.addEventListener("click", showResult);
resultElement.addEventListener("click", retryQuiz);

// Initialize the quiz
loadQuestion();
