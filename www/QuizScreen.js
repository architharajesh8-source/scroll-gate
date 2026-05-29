// QuizScreen.js - Complete Quiz Logic with Custom Goal Tracking

// 1. Storage for the user's custom goal and quiz answers
let userGoal = ""; 
let quizAnswers = {
    question1: null, 
    question2: null,
    question3: null
};

let currentQuestionIndex = 1;

// 2. New function: Capture whatever unique goal they type in (weight loss, chairs, coding, etc.)
function saveUserGoal(textInput) {
    userGoal = textInput;
    console.log(`User's active goal saved: ${userGoal}`);
}

// 3. Tracks regular quiz answers
function selectAnswer(questionNumber, chosenOption) {
    quizAnswers[`question${questionNumber}`] = chosenOption;
    console.log(`Saved question ${questionNumber}: ${chosenOption}`);
}

// 4. Advances the quiz or finishes it
function handleNextQuestion() {
    const totalQuestions = 3; 
    if (currentQuestionIndex < totalQuestions) {
        currentQuestionIndex++;
        updateQuizUI(); 
    } else {
        calculateQuizResults();
    }
}

// 5. Calculates results and passes everything—including the goal—to app.js
function calculateQuizResults() {
    let finalStyle = 'visual'; 
    let finalObstacle = 'distraction'; 

    // Score Learning Style
    if (quizAnswers.question1 === 'A') {
        finalStyle = 'visual';
    } else if (quizAnswers.question1 === 'B') {
        finalStyle = 'auditory';
    }

    // Score Obstacle
    if (quizAnswers.question2 === 'A') {
        finalObstacle = 'perfectionism';
    } else if (quizAnswers.question2 === 'B') {
        finalObstacle = 'distraction';
    }

    // Pass style, obstacle, AND the custom goal over to app.js
    if (typeof window.handleQuizCompletion === 'function') {
        window.handleQuizCompletion(finalStyle, finalObstacle, userGoal);
    } else {
        console.error("Could not find handleQuizCompletion function in app.js");
    }
}

function updateQuizUI() {
    console.log(`Visually switching to question screen: ${currentQuestionIndex}`);
}
