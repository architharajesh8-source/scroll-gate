import React, { useState } from 'react';
import QuizScreen from './QuizScreen';
import VideoPost from './VideoPost'; // <-- Import the view container
import { mockVideoDatabase } from './mockVideos'; // <-- Import sample database

export default function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [filteredFeed, setFilteredFeed] = useState([]);

  const handleQuizFinished = (finalAnswers) => {
    setUserProfile(finalAnswers);
    
    // Grab the primary tags the user selected
    const selectedGoal = finalAnswers.goals?.tag;
    const selectedStyle = finalAnswers.learning_style?.tag;

    // Filter our video array to find assets matching their profile rules
    const matches = mockVideoDatabase.filter(video => 
      video.tags.includes(selectedGoal) || video.tags.includes(selectedStyle)
    );

    // Fallback if they put custom 'Other' inputs: show everything available for now
    setFilteredFeed(matches.length > 0 ? matches : mockVideoDatabase);
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        
        {!userProfile ? (
          <QuizScreen onQuizComplete={handleQuizFinished} />
        ) : (
          <div>
            <header style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h1 style={{ color: '#007AFF', margin: '0' }}>Scroll Gate Feed</h1>
              <p style={{ color: '#666', fontSize: '14px' }}>Goal-oriented streams active</p>
            </header>

            {/* Loop through filtered match items and list them */}
            {filteredFeed.map(video => (
              <VideoPost 
                key={video.id}
                videoUrl={video.videoUrl}
                title={video.title}
                description={video.description}
                tags={video.tags}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
