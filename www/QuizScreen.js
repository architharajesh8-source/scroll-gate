// QuizScreen.js - Quiz State and Scoring Logic

// 1. Temporary storage to keep track of the user's answers as they click through
let quizAnswers = {
    question1: null, // e.g., 'A', 'B', 'C'
    question2: null,
    question3: null
};

// 2. Track what question number the user is currently looking at
let currentQuestionIndex = 1;

// 3. Called every time a user clicks an answer button
function selectAnswer(questionNumber, chosenOption) {
    // Save the answer (e.g., quizAnswers.question1 = 'A')
    quizAnswers[`question${questionNumber}`] = chosenOption;
    console.log(`Saved question ${questionNumber}: ${chosenOption}`);
}

// 4. Run this when they click the "Next" or "Submit" button
function handleNextQuestion() {
    const totalQuestions = 3; // Total number of quiz questions you have

    if (currentQuestionIndex < totalQuestions) {
        // Move to the next question visually
        currentQuestionIndex++;
        updateQuizUI(); 
    } else {
        // If they just finished the last question, calculate the results!
        calculateQuizResults();
    }
}

// 5. The brain of the quiz: translates ABC answers into actual user profiles
function calculateQuizResults() {
    let finalStyle = 'visual'; // Default fallback
    let finalObstacle = 'distraction'; // Default fallback

    // --- SCORING LOGIC EXAMPLE ---
    // Let's say Question 1 tracks Learning Style: A = Visual, B = Auditory
    if (quizAnswers.question1 === 'A') {
        finalStyle = 'visual';
    } else if (quizAnswers.question1 === 'B') {
        finalStyle = 'auditory';
    }

    // Let's say Question 2 tracks the Obstacle: A = Perfectionism, B = Lack of Motivation
    if (quizAnswers.question2 === 'A') {
        finalObstacle = 'perfectionism';
    } else if (quizAnswers.question2 === 'B') {
        finalObstacle = 'distraction';
    }

    // 6. Send the final results straight to the appState we just made in app.js!
    if (typeof window.handleQuizCompletion === 'function') {
        window.handleQuizCompletion(finalStyle, finalObstacle);
    } else {
        console.error("Could not find handleQuizCompletion function in app.js");
    }
}

// 7. Stub function to handle changing the questions on screen
function updateQuizUI() {
    console.log(`Visually switching to question screen: ${currentQuestionIndex}`);
    // Your UI layout rendering code will plug in here later!
}
