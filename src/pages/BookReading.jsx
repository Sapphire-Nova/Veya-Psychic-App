import React, { useState } from 'react';

const BookReading = () => {
  const [showConnect, setShowConnect] = useState(false);

  const services = [
    { 
      title: "Full Psychic Reading", 
      price: "", 
      desc: "Comprehensive deep-dive into your energy. Includes photos of spreads and detailed message guidance.",
      stripeUrl: "https://buy.stripe.com/8x200c8bE6Bh4C7eY2" 
    },
    { 
      title: "Astrological Life Path", 
      price: "", 
      desc: "Requires DOB, Time, and Place. Receive a 4-6 page PDF on your soul contracts and personality traits.",
      stripeUrl: "https://buy.stripe.com/8x200c8bE6Bh4C7eY2" 
    }
  ];

  return (
    <div style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ color: '#FFD700', fontSize: '2.5rem' }}>Sacred Services</h1>
        <p style={{ color: '#ccc' }}>Illuminate your path with ancient wisdom and modern clarity.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
        {services.map((service, i) => (
          <div key={i} style={{ border: '1px solid #333', padding: '30px', borderRadius: '20px', backgroundColor: '#1a1a1a', textAlign: 'center' }}>
            <h3 style={{ color: '#FFD700' }}>{service.title}</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{service.price}</p>
            <p style={{ color: '#aaa', minHeight: '60px' }}>{service.desc}</p>
            <button 
              onClick={() => window.location.href = service.stripeUrl}
              style={{ backgroundColor: '#FFD700', color: 'black', padding: '12px 30px', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Connect with Violet Button */}
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <button 
          onClick={() => setShowConnect(true)}
          style={{ backgroundColor: 'transparent', color: '#FFD700', border: '2px solid #FFD700', padding: '15px 40px', borderRadius: '50px', fontSize: '1.2rem', cursor: 'pointer' }}
        >
          Connect with Violet Now!
        </button>
      </div>

      {/* Instant Message Popup */}
      {showConnect && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#1a1a1a', padding: '40px', borderRadius: '20px', maxWidth: '500px', width: '90%', border: '1px solid #FFD700' }}>
            <button onClick={() => setShowConnect(false)} style={{ float: 'right', color: 'white', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>X</button>
            <h3 style={{ color: '#FFD700' }}>Instant Connection</h3>
            <p style={{ color: '#ccc' }}>Please share your first name and names of anyone involved.</p>
            <textarea placeholder="Your message here..." style={{ width: '100%', height: '100px', margin: '15px 0', padding: '10px', borderRadius: '10px', backgroundColor: '#333', color: 'white', border: 'none' }}></textarea>
            <input type="file" style={{ color: '#ccc', marginBottom: '15px' }} />
            <button style={{ width: '100%', backgroundColor: '#FFD700', padding: '15px', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>Send Message (3 Luna Credits)</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookReading;
