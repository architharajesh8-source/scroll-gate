// QuizScreen.js
import React, { useState } from 'react';
import { quizQuestions } from './quizData'; // Imports the questions we made above

export default function QuizScreen({ onQuizComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [customText, setCustomText] = useState("");

  const currentQuestion = quizQuestions[currentIndex];

  const handleSelectOption = (option) => {
    // If they picked "Other", don't auto-advance. Wait for them to type.
    if (option.requiresInput) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: { tag: option.tag, customText: "" }
      });
      return; 
    }

    // Standard card path: save data and move forward
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: { tag: option.tag, customText: null }
    };
    setAnswers(updatedAnswers);
    moveToNext(updatedAnswers);
  };

  const handleCustomSubmit = () => {
    if (!customText.trim()) return; // Don't allow empty text
    
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: { 
        tag: answers[currentQuestion.id].tag, 
        customText: customText 
      }
    };
    
    setAnswers(updatedAnswers);
    setCustomText(""); // Clear the text box for the next question if needed
    moveToNext(updatedAnswers);
  };

  const moveToNext = (latestAnswers) => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Quiz is totally finished! Pass the final data up to the app
      onQuizComplete(latestAnswers);
    }
  };

  // UI rendering logic for the rectangle cards
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>{currentQuestion.title}</h2>
      
      {/* Container for the rectangle cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {currentQuestion.options.map((option, index) => {
          const isSelected = answers[currentQuestion.id]?.tag === option.tag;
          return (
            <button
              key={index}
              onClick={() => handleSelectOption(option)}
              style={{
                padding: '15px',
                borderRadius: '8px',
                border: isSelected ? '2px solid #007AFF' : '1px solid #ccc',
                backgroundColor: isSelected ? '#E3F2FD' : '#fff',
                textAlign: 'left',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Conditionally show the text box ONLY if they tapped an 'Other' option */}
      {answers[currentQuestion.id]?.tag.includes('custom') && (
        <div style={{ marginTop: '15px' }}>
          <input
            type="text"
            placeholder="Type your goal/obstacle here..."
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            style={{ padding: '10px', width: '80%', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button 
            onClick={handleCustomSubmit}
            style={{ padding: '10px 15px', backgroundColor: '#007AFF', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
