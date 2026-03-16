import React, { useState } from 'react';

const ShadowJournal = () => {
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [entry, setEntry] = useState('');

  const prompts = [
    "Do you struggle with showing yourself compassion?",
    "When was the last time you truly gave yourself grace?",
    "What are your limiting beliefs and how do you plan to overcome these?",
    "What triggers you? Can you identify your main triggers?",
    "How do you process emotions now? Has this changed over time?"
    // All 100 prompts will be mapped here in the final database
  ];

  const getRandomPrompt = () => {
    const random = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(random);
    setEntry('');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', color: 'white', minHeight: '100vh', paddingBottom: '100px' }}>
      <h2 style={{ color: '#FFD700', textAlign: 'center' }}>Shadow Work Journal</h2>
      <p style={{ fontSize: '0.9rem', color: '#888', textAlign: 'center', marginBottom: '30px' }}>
        This is a sacred, private space to confront your triggers and patterns.
      </p>

      {!currentPrompt ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <button 
            onClick={getRandomPrompt}
            style={{ backgroundColor: '#333', color: '#FFD700', border: '1px solid #FFD700', padding: '20px', borderRadius: '15px', cursor: 'pointer', width: '100%' }}
          >
            ✨ Draw a Shadow Prompt ✨
          </button>
        </div>
      ) : (
        <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '20px', border: '1px solid #444' }}>
          <h4 style={{ color: '#FFD700', marginBottom: '20px' }}>{currentPrompt}</h4>
          <textarea 
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your truth here..."
            style={{ width: '100%', height: '300px', backgroundColor: '#222', color: 'white', border: 'none', borderRadius: '10px', padding: '15px', fontSize: '1rem' }}
          />
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button onClick={() => setCurrentPrompt(null)} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #444', background: 'none', color: 'white' }}>Save Entry</button>
            <button onClick={getRandomPrompt} style={{ flex: 1, padding: '10px', borderRadius: '10px', backgroundColor: '#444', color: 'white', border: 'none' }}>New Prompt</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#2a1a2a', borderRadius: '15px', textAlign: 'center', border: '1px solid #6b21a8' }}>
        <p style={{ fontSize: '0.85rem' }}>Feeling heavy after this session?</p>
        <button 
          onClick={() => window.location.href='/Services'}
          style={{ background: 'none', color: '#FFD700', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Book a Support Reading with Violet
        </button>
      </div>
    </div>
  );
};

export default ShadowJournal;
