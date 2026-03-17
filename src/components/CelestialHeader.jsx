import React from 'react';

const CelestialHeader = ({ isLive, onSignOut }) => {
  return (
    <header style={{
      background: 'linear-gradient(to bottom, #0a0a2e, #1e1b4b)',
      padding: '20px',
      borderBottom: '3px solid #FFD700',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
    }}>
      {/* Animated Stars */}
      <div className="star" style={{ position: 'absolute', top: '10%', left: '5%', color: '#FFD700', animation: 'twinkle 2s infinite' }}>✦</div>
      <div className="star" style={{ position: 'absolute', top: '40%', left: '85%', color: '#FFD700', animation: 'twinkle 3s infinite' }}>★</div>
      <div className="star" style={{ position: 'absolute', top: '70%', left: '15%', color: '#FFD700', animation: 'twinkle 1.5s infinite' }}>✦</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', zIndex: 10 }}>
        {/* The Crescent Moon */}
        <div style={{ fontSize: '2rem', color: '#FFD700', textShadow: '0 0 10px #FFD700' }}>🌙</div>
        <div>
          <h1 style={{ color: '#FFD700', margin: 0, fontSize: '1.8rem', letterSpacing: '3px', fontWeight: 'bold', fontFamily: 'serif' }}>VEYA</h1>
          <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.7rem', letterSpacing: '1px' }}>SPIRITUAL SANCTUARY</p>
        </div>
      </div>

      {isLive && (
        <div className="pulsate-container" style={{ zIndex: 10 }}>
          <button style={{
            background: 'linear-gradient(45deg, #FFD700, #E6C200)',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 0 15px #FFD700',
            animation: 'pulse-gold 2s infinite',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '1.2rem' }}>✨</span> 
            CONNECT WITH VIOLET NOW!
          </button>
        </div>
      )}

      <button onClick={onSignOut} style={{ 
        background: 'transparent', 
        color: '#FFD700', 
        border: '1px solid #312e81', 
        padding: '5px 12px', 
        borderRadius: '20px', 
        fontSize: '0.8rem',
        zIndex: 10 
      }}>
        Leave Sanctuary
      </button>

      <style>{
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes pulse-gold {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(255, 215, 0, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
        }
      }</style>
    </header>
  );
};

export default CelestialHeader;
