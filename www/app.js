// 1. Data Bank of Diagnostic Questions
const quizQuestions = [
    {
        text: "What is your main point of focus right now?",
        options: [
            { text: "🚀 Launching a business/side hustle", tag: "business" },
            { text: "💪 Health, gym, & physical energy", tag: "fitness" },
            { text: "🧠 Mastery of technical coding skills", tag: "coding" }
        ]
    },
    {
        text: "How does your brain absorb information fastest?",
        options: [
            { text: "👁️ Visually watching a breakdown", tag: "visual" },
            { text: "🏃 Immediately trying an actionable challenge", tag: "action" }
        ]
    }
];

// 2. Mock Database of Actionable Video Feeds
const videoDatabase = [
    { url: "https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-lap-top-closely-43236-large.mp4", category: "coding", style: "visual", creator: "@CodeHacks", desc: "How to layout CSS Grid in 30 seconds.", action: "Open your terminal and write three lines of display: grid now." },
    { url: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-dumbbells-pointing-his-muscles-48866-large.mp4", category: "fitness", style: "action", creator: "@FitSteps", desc: "Stop procrastinating your movement.", action: "Drop and give the room 10 pushups immediately. No excuses." },
    { url: "https://assets.mixkit.co/videos/preview/mixkit-financial-analyst-working-on-a-laptop-43183-large.mp4", category: "business", style: "visual", creator: "@BizLaunch", desc: "The micro-saas validation strategy.", action: "Write down 3 problems you faced this week on an index card." }
];

let currentQuestionIndex = 0;
let userProfile = { category: "", style: "" };

// 3. Render the Quiz Questions
function loadQuestion() {
    const questionTextEl = document.getElementById("question-text");
    const optionsContainerEl = document.getElementById("options-container");
    
    optionsContainerEl.innerHTML = "";
    let currentQuestion = quizQuestions[currentQuestionIndex];
    questionTextEl.innerText = currentQuestion.text;

    currentQuestion.options.forEach(option => {
        let button = document.createElement("button");
        button.className = "option-btn";
        button.innerText = option.text;
        button.onclick = () => handleAnswer(option.tag);
        optionsContainerEl.appendChild(button);
    });
}

// 4. Track Profile Selections
function handleAnswer(selectedTag) {
    if (currentQuestionIndex === 0) {
        userProfile.category = selectedTag;
    } else if (currentQuestionIndex === 1) {
        userProfile.style = selectedTag;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        compileCustomFeed();
    }
}

// 5. Build and Filter the Anti-Doom Scroll Video Layout
function compileCustomFeed() {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("feed-screen").classList.remove("hidden");

    const feedContainer = document.getElementById("video-feed");
    
    // Filter videos to give them personalized priority matching their goals
    let filteredVideos = videoDatabase.filter(video => 
        video.category === userProfile.category || video.style === userProfile.style
    );

    // If no exact match, use the fallback data pool
    if(filteredVideos.length === 0) filteredVideos = videoDatabase;

    filteredVideos.forEach(item => {
        const postElement = document.createElement("div");
        postElement.className = "video-post";
        postElement.innerHTML = `
            <video src="${item.url}" loop muted playsinline></video>
            <div class="sidebar-actions">
                <div class="action-icon" style="pointer-events: auto;" onclick="alert('Goal Saved!')">🔥</div>
                <div class="action-icon" style="pointer-events: auto;" onclick="alert('Shared!')">➡️</div>
            </div>
            <div class="video-overlay">
                <div class="creator-tag">${item.creator}</div>
                <div class="video-desc">${item.desc}</div>
                <div class="action-steps">⚡ TODAY'S TASK: ${item.action}</div>
            </div>
        `;
        feedContainer.appendChild(postElement);
    });

    // Setup auto-play handling for mobile scrolling
    initVideoObserver();
}

function initVideoObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector("video");
            if (video) {
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log("User interaction required"));
                } else {
                    video.pause();
                }
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll(".video-post").forEach(post => observer.observe(post));
}

// Kickoff on application boot
window.onload = loadQuestion;
