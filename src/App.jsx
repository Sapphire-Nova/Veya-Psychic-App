import React, { useState } from 'react';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import CelestialHeader from './components/CelestialHeader';
import LearnLibrary from './components/LearnLibrary';
import SeerDashboard from './components/SeerDashboard';

const veyaTheme = {
  name: 'veya-mystic-theme',
  tokens: {
    colors: {
      background: { primary: { value: '#0a0a2e' } },
      font: { interactive: { value: '#FFD700' } },
      brand: {
        primary: {
          10: { value: '#1e1b4b' },
          80: { value: '#FFD700' },
          100: { value: '#E6C200' },
        },
      },
    },
  },
};

function App() {
  const [isVioletLive, setIsVioletLive] = useState(true); // You can toggle this from your admin panel later!

  return (
    <ThemeProvider theme={veyaTheme}>
      <Authenticator>
        {({ signOut, user }) => (
          <main style={{ backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
            <CelestialHeader isLive={isVioletLive} onSignOut={signOut} />
            
            <div style={{ padding: '20px' }}>
              <h2 style={{ color: '#FFD700', fontFamily: 'serif', textAlign: 'center' }}>Welcome, Seeker {user?.username}</h2>
              
              {/* Only show the Seer Portal if it's you! */}
              {user?.username === 'Violet' && <SeerDashboard />}
              
              <LearnLibrary />
            </div>
          </main>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;
