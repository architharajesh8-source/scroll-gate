// VideoPost.js - Master Video Database and Filtering Feed Engine

// 1. The master database of videos for Scroll Gate
const masterVideoDatabase = [
    {
        id: "v1",
        title: "Overcoming Perfectionism: Just Start!",
        duration: "0:45",
        obstacleTag: "perfectionism",
        videoUrl: "videos/perfectionism_tip.mp4"
    },
    {
        id: "v2",
        title: "The 5-Minute Rule for Extreme Distraction",
        duration: "1:00",
        obstacleTag: "distraction",
        videoUrl: "videos/distraction_fix.mp4"
    },
    {
        id: "v3",
        title: "Why Messy Progress Beats Perfect Planning",
        duration: "0:30",
        obstacleTag: "perfectionism",
        videoUrl: "videos/messy_action.mp4"
    },
    {
        id: "v4",
        title: "How to Lock Focus When Your Brain Wants to Scroll",
        duration: "0:50",
        obstacleTag: "distraction",
        videoUrl: "videos/focus_hack.mp4"
    }
];

// 2. The core function called by app.js when switching screens
function renderVideoFeed(userObstacle, userGoal) {
    console.log(`Filtering video feed for obstacle: ${userObstacle}`);

    // Update the HTML badge at the top to show their actual custom goal
    const goalBadge = document.getElementById('current-user-goal');
    if (goalBadge) {
        goalBadge.innerText = userGoal;
    }

    // Find the stream container on your HTML page where videos should go
    const videoStream = document.getElementById('video-stream');
    
    // Clear out any old videos or loading text
    videoStream.innerHTML = '';

    // Filter down the master array to only match what the user is struggling with
    const filteredVideos = masterVideoDatabase.filter(video => video.obstacleTag === userObstacle);

    if (filteredVideos.length === 0) {
        videoStream.innerHTML = '<p class="no-videos">No custom videos found for your profile yet!</p>';
        return;
    }

    // 3. Loop through the filtered list and inject them visually into the HTML
    filteredVideos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video-card';
        videoElement.innerHTML = `
            <h3>${video.title}</h3>
            <p>Duration: ${video.duration} | Tag: <span>#${video.obstacleTag}</span></p>
            <div class="video-placeholder">
                <p>🎥 [Video Playing: Content designed to help you with "${userGoal}"]</p>
            </div>
        `;
        videoStream.appendChild(videoElement);
    });
}

// Make the function available globally so app.js can trigger it
window.renderVideoFeed = renderVideoFeed;
