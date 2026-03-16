import React, { useEffect } from 'react';

const BookReading = () => {
  // We need to load the Stripe script when the page opens
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const stripeKey = "pk_live_51T9HLg5w4AWvPvWAuDNFrKbZ9xQrCigIKwkUPV9DBrxBdkHj5HN31rs3gfzNY3vCeFOs09nXyQFO8pnitK1ALUZ600d7LtBW2s";

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '40px 20px', paddingBottom: '120px' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ color: '#FFD700', textShadow: '0 0 10px rgba(255,215,0,0.3)' }}>Sacred Offerings</h1>
        <p style={{ color: '#cbd5e1' }}>Choose the guidance that resonates with your soul's journey.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Full Tarot Reading */}
        <div style={{ background: '#1e1b4b', padding: '30px', borderRadius: '25px', border: '1px solid #FFD700', textAlign: 'center' }}>
          <h3 style={{ color: '#FFD700' }}>Full Tarot Reading</h3>
          <p style={{ fontSize: '1.5rem', margin: '10px 0' }}></p>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '20px' }}>Comprehensive tarot spread revealing energies surrounding your path and relationships.</p>
          <stripe-buy-button buy-button-id="buy_btn_1TBTol5w4AWvPvWAXVnnfosS" publishable-key={stripeKey}></stripe-buy-button>
        </div>

        {/* Mediumship Reading */}
        <div style={{ background: '#1e1b4b', padding: '30px', borderRadius: '25px', border: '1px solid #FFD700', textAlign: 'center' }}>
          <h3 style={{ color: '#FFD700' }}>Mediumship Reading</h3>
          <p style={{ fontSize: '1.5rem', margin: '10px 0' }}></p>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '20px' }}>Connect with loved ones who have crossed over. Receive messages, healing, and closure.</p>
          <stripe-buy-button buy-button-id="buy_btn_1TBTpu5w4AWvPvWAlMHxqA49" publishable-key={stripeKey}></stripe-buy-button>
        </div>

        {/* Distant Reiki */}
        <div style={{ background: '#1e1b4b', padding: '30px', borderRadius: '25px', border: '1px solid #FFD700', textAlign: 'center' }}>
          <h3 style={{ color: '#FFD700' }}>Distant Reiki Healing</h3>
          <p style={{ fontSize: '1.5rem', margin: '10px 0' }}></p>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '20px' }}>Distant energy healing to clear blockages, restore balance, and activate natural healing.</p>
          <stripe-buy-button buy-button-id="buy_btn_1TBTr45w4AWvPvWAV0UnAuNT" publishable-key={stripeKey}></stripe-buy-button>
        </div>

        {/* Astrological Life Path (Special Request) */}
        <div style={{ background: 'rgba(255,215,0,0.05)', padding: '30px', borderRadius: '25px', border: '1px dashed #FFD700', textAlign: 'center' }}>
          <h3 style={{ color: '#FFD700' }}>Astrological Life Path</h3>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '20px' }}>Special Request Only: A deep-dive 4-6 page PDF analysis of your soul contracts.</p>
          <button 
            onClick={() => window.location.href='/Violet-Admin-Portal'} 
            style={{ width: '100%', padding: '15px', borderRadius: '10px', backgroundColor: 'transparent', color: '#FFD700', border: '1px solid #FFD700', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Message Violet to Request
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookReading;
