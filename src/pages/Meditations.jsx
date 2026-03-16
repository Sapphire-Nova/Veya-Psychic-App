import React from 'react';

const Meditations = () => {
  const sessions = [
    { title: "Grounding into Gaia", length: "10 min", type: "Root Chakra", icon: "🌳" },
    { title: "Manifesting Abundance", length: "15 min", type: "Solar Plexus", icon: "☀️" },
    { title: "Connecting with Guides", length: "20 min", type: "Intuition", icon: "👁️" },
    { title: "Shadow Integration", length: "12 min", type: "Shadow Work", icon: "🌑" }
  ];

  return (
    <div style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', padding: '20px', paddingBottom: '100px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#FFD700' }}>Veya Sanctuary</h1>
        <p style={{ color: '#aaa' }}>Guided journeys in Violet's cloned voice.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {sessions.map((session, i) => (
          <div key={i} style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '20px', textAlign: 'center', border: '1px solid #333' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{session.icon}</div>
            <h4 style={{ margin: '5px 0' }}>{session.title}</h4>
            <div style={{ fontSize: '0.7rem', color: '#FFD700' }}>{session.length} • {session.type}</div>
            <button style={{ marginTop: '15px', padding: '8px 15px', backgroundColor: '#333', border: '1px solid #FFD700', color: 'white', borderRadius: '10px', fontSize: '0.8rem' }}>
              ▶ Play
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', padding: '20px', border: '1px dashed #FFD700', borderRadius: '20px' }}>
        <p style={{ fontSize: '0.9rem' }}>Unlock the Full Moon Meditations</p>
        <button 
          onClick={() => window.location.href='/Sanctuary'}
          style={{ backgroundColor: '#FFD700', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold' }}
        >
          Join the Circle
        </button>
      </div>
    </div>
  );
};

export default Meditations;
