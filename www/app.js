import React, { useState } from 'react';
import QuizScreen from './QuizScreen';

export default function App() {
  const [userProfile, setUserProfile] = useState(null);

  const handleQuizFinished = (finalAnswers) => {
    setUserProfile(finalAnswers);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {!userProfile ? (
        <QuizScreen onQuizComplete={handleQuizFinished} />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h1>Scroll Gate</h1>
          <p>Quiz complete! Your custom AI video feed is generating...</p>
        </div>
      )}
    </div>
  );
}
