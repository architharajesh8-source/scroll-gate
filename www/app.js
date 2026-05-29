// app.js - Updated Core App State with Custom Goal Tracking

// 1. Added userGoal to track what the user is working toward
let appState = {
    currentScreen: 'quiz', 
    userLearningStyle: null, 
    userObstacle: null,
    userGoal: "" // Stores unique goals like "lose weight" or "learn about chairs"
};

// 2. Updated to catch the "goal" parameter from QuizScreen.js
function handleQuizCompletion(style, obstacle, goal) {
    appState.userLearningStyle = style;
    appState.userObstacle = obstacle;
    appState.userGoal = goal || "My Personal Goal"; // Fallback if they left it blank
    
    console.log(`Quiz complete! Goal: ${appState.userGoal}, Style: ${style}, Obstacle: ${obstacle}`);
    
    navigateTo('videoFeed');
}

// 3. Simple router to swap what is visible on the screen
function navigateTo(screenName) {
    appState.currentScreen = screenName;
    
    if (screenName === 'videoFeed') {
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('feed-container').style.display = 'block';
        
        // Pass BOTH the obstacle and the custom goal to the video feed renderer
        if (typeof renderVideoFeed === 'function') {
            renderVideoFeed(appState.userObstacle, appState.userGoal);
        }
    }
}

window.handleQuizCompletion = handleQuizCompletion;
window.navigateTo = navigateTo;
