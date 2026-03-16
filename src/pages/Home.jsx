import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goldGlow = '0 0 15px rgba(255, 215, 0, 0.3)';
  const deepGradient = 'linear-gradient(135.46deg, #0f172a 0%, #1e1b4b 50%, #000000 100%)';

  return (
    <div style={{ background: deepGradient, color: 'white', minHeight: '100vh', paddingBottom: '120px', fontFamily: "'Cinzel', serif" }}>
      
      {/* STARLIGHT HERO SECTION */}
      <header style={{ padding: '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', fontSize: '10rem', opacity: 0.1, zIndex: 0 }}>🌙</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3.5rem', color: '#FFD700', textShadow: goldGlow, letterSpacing: '2px', marginBottom: '20px' }}>
            Illuminate Your Spiritual Path
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto 40px', color: '#cbd5e1', fontSize: '1.2rem', lineHeight: '1.8' }}>
            Receive personalized psychic readings and spiritual guidance to navigate life's journey with clarity and confidence.
          </p>
          <button onClick={() => navigate('/Services')} style={{ backgroundColor: '#FFD700', color: '#000', padding: '18px 40px', borderRadius: '50px', fontWeight: '900', border: 'none', cursor: 'pointer', boxShadow: goldGlow, transition: '0.3s' }}>
            BOOK YOUR READING
          </button>
        </div>
      </header>

      {/* SACRED SERVICES GRID */}
      <section style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#FFD700', marginBottom: '40px', borderBottom: '1px solid #FFD700', display: 'inline-block', left: '50%', position: 'relative', transform: 'translateX(-50%)' }}>Sacred Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {[
            { title: "Full Tarot Reading", icon: "🃏" },
            { title: "Mediumship Reading", icon: "🕊️" },
            { title: "Distant Reiki Healing", icon: "✨" },
            { title: "Live Guidance", icon: "👁️" }
          ].map((s, i) => (
            <div key={i} onClick={() => navigate('/Services')} style={{ background: 'rgba(30, 27, 75, 0.4)', padding: '40px 20px', borderRadius: '20px', border: '1px solid #312e81', textAlign: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)', borderTop: '2px solid #FFD700' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{s.icon}</div>
              <h3 style={{ color: '#FFD700', marginBottom: '10px' }}>{s.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Tap to explore this soul connection</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPIRITUAL TOOLS (GLOWING CARDS) */}
      <section style={{ padding: '80px 20px', background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: '#FFD700', marginBottom: '40px' }}>Interactive Spiritual Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div onClick={() => navigate('/Tools/ChakraCheck')} style={{ padding: '30px', border: '1px solid #FFD700', borderRadius: '15px', cursor: 'pointer', background: 'linear-gradient(to bottom, #1e1b4b, #000)' }}>
              <h4>Chakra Check-In</h4>
              <span style={{ color: '#FFD700' }}>Explore →</span>
            </div>
            <div onClick={() => navigate('/Sanctuary')} style={{ padding: '30px', border: '1px solid #FFD700', borderRadius: '15px', cursor: 'pointer', background: 'linear-gradient(to bottom, #1e1b4b, #000)' }}>
              <h4>Soul Path Quiz</h4>
              <span style={{ color: '#FFD700' }}>Explore →</span>
            </div>
          </div>
        </div>
      </section>

      {/* THE VIOLET SECTION */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{ position: 'absolute', inset: -5, background: 'linear-gradient(gold, transparent)', borderRadius: '35px', filter: 'blur(10px)', opacity: 0.5 }}></div>
          <img 
            src="https://meditationvaultcali.s3.us-west-1.amazonaws.com/itsjust+pictures+of+me/me.png" 
            alt="Violet" 
            style={{ position: 'relative', maxHeight: '320px', borderRadius: '30px', border: '2px solid #FFD700' }} 
          />
        </div>
        <h2 style={{ color: '#FFD700', marginTop: '30px' }}>A Trusted Voice on Your Journey</h2>
        <p style={{ maxWidth: '750px', margin: '20px auto', color: '#cbd5e1', fontStyle: 'italic' }}>
          "With over 15 years of dedicated practice... Together, we will illuminate your path."
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', color: '#FFD700', margin: '30px 0', fontSize: '1.1rem' }}>
          <div>⭐ 15+ Years</div>
          <div>🔥 10K+ Readings</div>
        </div>
        <button onClick={() => window.open('https://linktr.ee/lunabloomtarot', '_blank')} style={{ background: 'none', border: '1px solid #FFD700', color: '#FFD700', padding: '12px 30px', borderRadius: '50px', cursor: 'pointer' }}>Learn More About Me</button>
      </section>

    </div>
  );
};

export default Home;

