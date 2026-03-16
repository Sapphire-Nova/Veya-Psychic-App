import React, { useState } from 'react';

const TRACKS = [
  { title: 'Grounding Meditation', url: 'https://meditationvaultcali.s3.us-west-1.amazonaws.com/Grounding%20Meditation.mp3' },
  { title: 'The Celestial Sleep Journey', url: 'https://meditationvaultcali.s3.us-west-1.amazonaws.com/The%20Celestial%20Sleep%20Journey.wav' },
  { title: 'The Ocean of Emotional Release', url: 'https://meditationvaultcali.s3.us-west-1.amazonaws.com/The%20Ocean%20of%20Emotional%20Release.mp3' },
  { title: 'The Seven Gates (Full Chakra Alignment)', url: 'https://meditationvaultcali.s3.us-west-1.amazonaws.com/The%20Seven%20Gates%20%28Full%20Chakra%20Alignment%29.mp3' },
  { title: 'The Temple of the Higher Self', url: 'https://meditationvaultcali.s3.us-west-1.amazonaws.com/The%20Temple%20of%20the%20Higher%20Self.mp3' }
];

export const MeditationPlayer: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState(TRACKS[0]);

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '20px auto', background: '#121212', color: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
      <h2 style={{ textAlign: 'center', color: '#9c27b0', marginBottom: '20px' }}>Meditation Station</h2>
      
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '15px', textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Now Playing: {currentTrack.title}</h3>
        <audio controls src={currentTrack.url} key={currentTrack.url} style={{ width: '100%' }}>
          Your browser does not support the audio element.
        </audio>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {TRACKS.map((track) => (
          <button 
            key={track.title}
            onClick={() => setCurrentTrack(track)}
            style={{ 
              padding: '15px', 
              textAlign: 'left', 
              background: currentTrack.title === track.title ? '#9c27b0' : '#2a2a2a',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: '0.3s'
            }}
          >
            {track.title}
          </button>
        ))}
      </div>
    </div>
  );
};
