import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import LearnLibrary from './components/LearnLibrary';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main style={{ backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
          <header style={{ padding: '10px', borderBottom: '1px solid #FFD700', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ color: '#FFD700', margin: 0 }}>Veya Sanctuary</h1>
            <button onClick={signOut} style={{ background: 'transparent', color: '#FFD700', border: '1px solid #FFD700', padding: '5px 10px', borderRadius: '5px' }}>
              Sign Out
            </button>
          </header>
          
          <div style={{ padding: '20px' }}>
            <h2>Welcome back, {user?.username}</h2>
            <p>Your spiritual journey continues...</p>
            <LearnLibrary />
          </div>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
