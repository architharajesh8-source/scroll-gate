// app.js - Core App State and Screen Router

// 1. Tracks the user's progress and quiz results
let appState = {
    currentScreen: 'quiz', // Starts on the quiz screen
    userLearningStyle: null, // Will be set to 'visual', 'auditory', or 'kinesthetic'
    userObstacle: null // Will track what blocks them (e.g., 'perfectionism', 'distraction')
};

// 2. Function to handle when the user finishes the quiz
function handleQuizCompletion(style, obstacle) {
    appState.userLearningStyle = style;
    appState.userObstacle = obstacle;
    
    console.log(`Quiz complete! User style: ${style}, Obstacle: ${obstacle}`);
    
    // Switch screens instantly
    navigateTo('videoFeed');
}

// 3. Simple router to swap what is visible on the screen
function navigateTo(screenName) {
    appState.currentScreen = screenName;
    
    if (screenName === 'videoFeed') {
        // Hide the quiz, show the video feed, and pass the user's profile to filter videos
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('feed-container').style.display = 'block';
        
        // Trigger the video feed to load content matching their specific obstacle
        if (typeof renderVideoFeed === 'function') {
            renderVideoFeed(appState.userObstacle);
        }
    }
}

// Make functions globally available for your other files to call
window.handleQuizCompletion = handleQuizCompletion;
window.navigateTo = navigateTo;
