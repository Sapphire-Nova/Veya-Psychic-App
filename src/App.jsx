import React from 'react';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import LearnLibrary from './components/LearnLibrary';

// Veya Brand Colors - Standard JavaScript Version
const veyaTheme = {
  name: 'veya-mystic-theme',
  tokens: {
    colors: {
      background: {
        primary: { value: '#0a0a2e' }, // Deep Indigo
      },
      font: {
        interactive: { value: '#FFD700' }, // Gold
      },
      brand: {
        primary: {
          10: { value: '#1e1b4b' },
          80: { value: '#FFD700' },
          100: { value: '#E6C200' },
        },
      },
    },
    components: {
      authenticator: {
        router: {
          borderWidth: { value: '2px' },
          borderColor: { value: '#FFD700' },
          backgroundColor: { value: '#0a0a2e' },
        },
      },
      button: {
        primary: {
          backgroundColor: { value: '#FFD700' },
          color: { value: '#000' },
          _hover: {
            backgroundColor: { value: '#E6C200' },
          },
        },
      },
      fieldcontrol: {
        borderColor: { value: '#312e81' },
        color: { value: '#fff' },
        _focus: {
          borderColor: { value: '#FFD700' },
        },
      },
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={veyaTheme}>
      <Authenticator>
        {({ signOut, user }) => (
          <main style={{ backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
            <header style={{ padding: '15px', borderBottom: '2px solid #FFD700', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a0a2e' }}>
              <h1 style={{ color: '#FFD700', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>VEYA</h1>
              <button onClick={signOut} style={{ background: 'transparent', color: '#FFD700', border: '1px solid #FFD700', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                Sign Out
              </button>
            </header>
            
            <div style={{ padding: '20px' }}>
              <h2 style={{ color: '#FFD700' }}>Blessed be, {user?.username}</h2>
              <LearnLibrary />
            </div>
          </main>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;
