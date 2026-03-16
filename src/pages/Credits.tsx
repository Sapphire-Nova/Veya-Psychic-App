import React from 'react';

const STRIPE_LINKS = {
  GOLD: "https://buy.stripe.com/eVqaEQ8bEaRx9WrcPUd3i0c",
  PLATINUM: "https://buy.stripe.com/28EfZa3Vo1gXc4z2bgd3i0b",
  SILVER: "https://buy.stripe.com/6oE7sE9fIdVB0lRbLId3i02",
  MYSTIC: "https://buy.stripe.com/cNi6oA3Voe3Jb0vbLQd3i0a",
  STARTER: "https://buy.stripe.com/14A9AM8bE8Jl3u3cPVd3i05"
};

export const CreditsPage: React.FC = () => {
  // Replace this with your actual user ID logic when ready
  const userId = "USER_ID_123"; 

  const handleDirectBuy = (url: string) => {
    // This bypasses any popups and goes STRAIGHT to Stripe
    window.location.href = `?client_reference_id=`;
  };

  const cardStyle: React.CSSProperties = {
    background: '#1e1e1e',
    padding: '20px',
    borderRadius: '15px',
    border: '1px solid #9c27b0',
    textAlign: 'center',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const buttonStyle: React.CSSProperties = {
    background: '#9c27b0',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '15px'
  };

  return (
    <div style={{ padding: '40px', background: '#000', minHeight: '100vh' }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '40px' }}>Select Your Crystal Bundle</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={cardStyle}>
          <h3>Starter Bundle</h3>
          <p>Ideal for a quick session</p>
          <button onClick={() => handleDirectBuy(STRIPE_LINKS.STARTER)} style={buttonStyle}>Purchase Now</button>
        </div>

        <div style={{ ...cardStyle, border: '2px solid #ff9800', transform: 'scale(1.05)' }}>
          <h3 style={{ color: '#ff9800' }}>? Gold Credits ?</h3>
          <p>Most Popular for deep readings</p>
          <button onClick={() => handleDirectBuy(STRIPE_LINKS.GOLD)} style={{ ...buttonStyle, background: '#ff9800' }}>Purchase Now</button>
        </div>

        <div style={cardStyle}>
          <h3>Platinum Bundle</h3>
          <p>Unlimited spiritual growth</p>
          <button onClick={() => handleDirectBuy(STRIPE_LINKS.PLATINUM)} style={buttonStyle}>Purchase Now</button>
        </div>

      </div>
    </div>
  );
};
