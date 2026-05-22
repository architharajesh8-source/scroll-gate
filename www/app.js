import React, { useState } from 'react';
import QuizScreen from './QuizScreen';
import { generateAIVideoPrompt } from './promptGenerator'; // <-- 1. IMPORT THE NEW GENERATOR

export default function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [aiPrompt, setAiPrompt] = useState(""); // State to hold the final prompt string

  const handleQuizFinished = (finalAnswers) => {
    setUserProfile(finalAnswers);
    
    // 2. GENERATE THE AI PROMPT FROM THE ANSWERS
    const generatedPrompt = generateAIVideoPrompt(finalAnswers);
    setAiPrompt(generatedPrompt);
    
    // This logs it cleanly in your inspection console so you can see the string
    console.log("Generated AI Video Blueprint:", generatedPrompt);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      {!userProfile ? (
        <QuizScreen onQuizComplete={handleQuizFinished} />
      ) : (
        <div style={{ marginTop: '40px' }}>
          <h1 style={{ color: '#007AFF' }}>Scroll Gate</h1>
          <div style={{ backgroundColor: '#E3F2FD', padding: '20px', borderRadius: '8px', border: '1px solid #BBDEFB' }}>
            <h3>Quiz Captured!</h3>
            <p><strong>Your Dynamic Engine Prompt Blueprint:</strong></p>
            <p style={{ fontStyle: 'italic', color: '#333', lineHeight: '1.5' }}>"{aiPrompt}"</p>
          </div>
        </div>
      )}
    </div>
  );
}
