import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    { title: "Full Tarot Reading", desc: "A comprehensive spread revealing energies of your path and soul's journey.", path: "/Services" },
    { title: "Mediumship Reading", desc: "Connect with loved ones who have crossed over for healing and closure.", path: "/Services" },
    { title: "Distant Reiki Healing", desc: "Energy healing to clear blockages and activate natural healing.", path: "/Services" },
    { title: "Lightworker Ritual Candle", desc: "A sacred candle ritual performed on your behalf for your intention.", path: "/Services" }
  ];

  return (
    <div style={{ backgroundColor: '#121212', color: 'white', fontFamily: 'serif', paddingBottom: '100px' }}>
      
      {/* HERO SECTION */}
      <header style={{ padding: '80px 20px', textAlign: 'center', background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)' }}>
        <h1 style={{ fontSize: '3rem', color: '#FFD700', marginBottom: '10px' }}>Illuminate Your Spiritual Path</h1>
        <p style={{ maxWidth: '700px', margin: '0 auto 30px', color: '#ccc', fontSize: '1.2rem' }}>
          Receive personalized psychic readings and spiritual guidance to navigate life's journey with clarity and confidence.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/Services')} style={{ backgroundColor: '#FFD700', color: 'black', padding: '15px 30px', borderRadius: '50px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Book Your Reading</button>
          <button onClick={() => navigate('/Meditations')} style={{ backgroundColor: 'transparent', color: '#FFD700', padding: '15px 30px', borderRadius: '50px', fontWeight: 'bold', border: '2px solid #FFD700', cursor: 'pointer' }}>Daily Guidance</button>
        </div>
      </header>

      {/* TYPES OF READINGS */}
      <section style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#FFD700' }}>Types of Readings</h2>
        <p style={{ color: '#888', marginBottom: '40px' }}>Choose the guidance that resonates with your soul's needs</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {services.map((s, i) => (
            <div key={i} onClick={() => navigate(s.path)} style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '20px', border: '1px solid #333', cursor: 'pointer' }}>
              <h3 style={{ color: '#FFD700' }}>{s.title}</h3>
              <p style={{ color: '#ccc', fontSize: '0.9rem' }}>{s.desc}</p>
            </div>
          ))}
        </div>
        
        {/* LIVE SECTION */}
        <div style={{ marginTop: '40px', padding: '30px', border: '2px solid #FFD700', borderRadius: '20px', backgroundColor: 'rgba(255,215,0,0.05)' }}>
          <h3 style={{ color: '#FFD700' }}>Live Personal Guidance</h3>
          <p>Direct personal guidance from me while I am online.</p>
          <div style={{ margin: '15px 0', fontWeight: 'bold', color: '#4ade80' }}>First Chat Session is FREE — 3-card draw gift.</div>
          <button onClick={() => navigate('/Services')} style={{ backgroundColor: '#FFD700', color: 'black', padding: '10px 25px', borderRadius: '50px', border: 'none', fontWeight: 'bold' }}>Connect with Violet Now!</button>
        </div>
      </section>

      {/* INTERACTIVE TOOLS */}
      <section style={{ padding: '60px 20px', backgroundColor: '#000' }}>
        <h2 style={{ textAlign: 'center', color: '#FFD700' }}>Interactive Spiritual Tools</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <h4>Chakra Check-In</h4>
            <button onClick={() => navigate('/Tools/ChakraCheck')} style={{ color: '#FFD700', background: 'none', border: '1px solid #FFD700', padding: '10px 20px', borderRadius: '10px' }}>Explore</button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4>Soul Path Quiz</h4>
            <button onClick={() => navigate('/Sanctuary')} style={{ color: '#FFD700', background: 'none', border: '1px solid #FFD700', padding: '10px 20px', borderRadius: '10px' }}>Explore</button>
          </div>
        </div>
      </section>

      {/* ABOUT VIOLET SECTION */}
      <section style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#1a1a1a' }}>
        <img 
          src="https://via.placeholder.com/400" 
          alt="Psychic Violet" 
          style={{ maxHeight: '300px', width: 'auto', borderRadius: '30px', marginBottom: '20px' }} 
        />
        <h2 style={{ color: '#FFD700' }}>A Trusted Voice on Your Journey</h2>
        <p style={{ maxWidth: '800px', margin: '0 auto', color: '#ccc', lineHeight: '1.6' }}>
           With over 15 years of dedicated practice... Together, we will illuminate your path.
        </p>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '30px', color: '#FFD700', fontWeight: 'bold' }}>
          <div>15+ Years</div>
          <div>10K+ Readings</div>
          <div>5.0 Rating</div>
        </div>
        <button onClick={() => window.open('https://linktr.ee/lunabloomtarot', '_blank')} style={{ marginTop: '30px', padding: '12px 30px', borderRadius: '50px', background: 'none', border: '2px solid #FFD700', color: '#FFD700' }}>Learn More About Me</button>
      </section>

      {/* DAILY MESSAGE */}
      <section style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid #FFD700' }}>
        <h3>Daily Message</h3>
        <p style={{ fontSize: '0.8rem', color: '#888' }}>Sunday, March 15, 2026</p>
        <blockquote style={{ fontStyle: 'italic', margin: '20px auto', maxWidth: '600px' }}>
          "I trust the flow of life and release all that I no longer need to carry."
        </blockquote>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px 20px', textAlign: 'center', borderTop: '1px solid #333' }}>
        <h2 style={{ color: '#FFD700' }}>VEYA</h2>
        <p>Illuminating your soul path through ancient wisdom.</p>
        <p>© 2026 VIOLET FLAME HOLISTICS, LLC</p>
      </footer>
    </div>
  );
};

export default Home;
