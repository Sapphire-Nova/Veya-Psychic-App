import React, { useState } from 'react';
import { chakraData } from '../chakraData';

const ChakraQuiz = () => {
  const [result, setResult] = useState(null);

  const questions = [
    { text: "I feel disconnected from my purpose 🔌", chakra: "crown" },
    { text: "I struggle to speak my truth 🗣️", chakra: "throat" },
    { text: "I feel anxious about money or safety 💰", chakra: "root" },
    { text: "I feel creative blocks or emotional numbness 🌊", chakra: "sacral" },
    { text: "I lack confidence and feel powerless ⚡", chakra: "solar" },
    { text: "I find it hard to forgive or trust others ❤️", chakra: "heart" },
    { text: "I feel my intuition is clouded 👁️", chakra: "thirdeye" }
  ];

  const handleResult = (chakraId) => {
    const found = chakraData.find(c => c.id === chakraId);
    setResult(found);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', minHeight: '80vh', backgroundColor: '#121212', color: 'white' }}>
      {!result ? (
        <>
          <h2 style={{ color: '#FFD700' }}>Chakra Check-In</h2>
          <p>Which of these resonate with you right now?</p>
          <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
            {questions.map((q, index) => (
              <button 
                key={index}
                onClick={() => handleResult(q.chakra)}
                style={{ width: '300px', padding: '15px', borderRadius: '10px', border: '1px solid #FFD700', background: 'transparent', color: 'white', cursor: 'pointer' }}
              >
                {q.text}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div style={{ padding: '20px' }}>
          <h2 style={{ color: '#FFD700' }}>Your {result.name} needs attention</h2>
          <img src={result.image} alt={result.name} style={{ width: '150px', margin: '20px 0' }} />
          <p>{result.underactive}</p>
          <button 
            onClick={() => setResult(null)} 
            style={{ marginTop: '20px', padding: '10px', background: 'gray', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ChakraQuiz;
