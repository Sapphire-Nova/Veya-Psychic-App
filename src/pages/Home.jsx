import React from 'react';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#121212', color: 'white', textAlign: 'center', paddingBottom: '100px' }}>
      {/* Profile Section */}
      <section style={{ padding: '40px 20px' }}>
        <img 
          src="https://via.placeholder.com/400" 
          alt="Violet" 
          style={{ maxHeight: '350px', width: 'auto', borderRadius: '50px', boxShadow: '0 4px 20px rgba(255, 215, 0, 0.2)', marginBottom: '20px' }} 
        />
        <h2 style={{ color: '#FFD700' }}>A Trusted Voice on Your Journey</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', lineHeight: '1.6', color: '#ccc' }}>
          "With over 15 years of dedicated practice in psychic readings, tarot, and spiritual counseling, I have helped thousands of seekers find clarity, peace, and direction in their lives."
        </p>
        <div style={{ margin: '20px 0', fontSize: '0.9rem', color: '#FFD700' }}>
          15+ Years Experience | 10K+ Readings Given | 5.0 Average Rating
        </div>
        
        <button 
          onClick={() => window.open('https://linktr.ee/lunabloomtarot', '_blank')}
          style={{ backgroundColor: 'transparent', color: '#FFD700', border: '2px solid #FFD700', padding: '12px 30px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Learn more about Violet
        </button>
      </section>

      {/* Pathways Footer */}
      <footer style={{ marginTop: '50px', padding: '20px', borderTop: '1px solid #333', fontSize: '0.8rem', color: '#888' }}>
        <h3>VEYA</h3>
        <p>Illuminating your soul path through ancient wisdom.</p>
        <p>© 2026 VIOLET FLAME HOLISTICS, LLC</p>
      </footer>
    </div>
  );
};

export default Home;
