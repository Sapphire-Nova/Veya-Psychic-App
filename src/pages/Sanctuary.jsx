import React from 'react';
import ShadowJournal from '../components/ShadowJournal';

const Sanctuary = () => {
  const credits = 50; // This will be dynamic from your backend later

  return (
    <div style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', padding: '20px', paddingBottom: '100px' }}>
      {/* Luna Credits Dashboard */}
      <section style={{ textAlign: 'center', padding: '30px', backgroundColor: '#1a1a1a', borderRadius: '25px', marginBottom: '30px', border: '1px solid #FFD700' }}>
        <div className="luna-coin-pulse" style={{ margin: '0 auto 15px' }}></div>
        <h2 style={{ margin: 0 }}>{credits} Luna Credits</h2>
        <p style={{ color: '#FFD700', fontSize: '0.8rem' }}>+50 Bonus Credits Active!</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          <button onClick={() => window.open('https://buy.stripe.com/8x200c8bE6Bh4C7eY2', '_blank')} style={{ padding: '10px 15px', backgroundColor: '#FFD700', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>Buy Sparkle ()</button>
          <button onClick={() => window.open('https://buy.stripe.com/5kQcMY63wf7N4C76rw', '_blank')} style={{ padding: '10px 15px', backgroundColor: '#FFD700', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>Glow Bundle ()</button>
        </div>
      </section>

      {/* Shadow Journal Section */}
      <ShadowJournal />
    </div>
  );
};

export default Sanctuary;
