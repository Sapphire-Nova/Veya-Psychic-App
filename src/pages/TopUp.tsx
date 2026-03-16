import React from 'react';
const PAYMENT_LINKS = {
  GOLD: "https://buy.stripe.com/eVqaEQ8bEaRx9WrcPUd3i0c",
  PLATINUM: "https://buy.stripe.com/28EfZa3Vo1gXc4z2bgd3i0b",
  SILVER: "https://buy.stripe.com/6oE7sE9fIdVB0lRbLId3i02",
  MYSTIC: "https://buy.stripe.com/cNi6oA3Voe3Jb0vbLQd3i0a"
};
const TopUp: React.FC = () => {
  const userId = "USER_ID_123"; 
  const handlePurchase = (url: string) => {
    const checkoutUrl = `?client_reference_id=`;
    window.location.href = checkoutUrl;
  };
  return (
    <div style={{ padding: '40px', textAlign: 'center', background: '#121212', color: 'white', minHeight: '100vh' }}>
      <h1>Crystal Credits Store</h1>
      <p>Each tarot message costs 25 credits.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px', margin: '20px auto' }}>
        <button onClick={() => handlePurchase(PAYMENT_LINKS.SILVER)} style={{ padding: '15px', cursor: 'pointer', background: '#9c27b0', color: 'white', border: 'none', borderRadius: '5px' }}>Buy Silver Bundle</button>
        <button onClick={() => handlePurchase(PAYMENT_LINKS.GOLD)} style={{ padding: '15px', cursor: 'pointer', background: '#ff9800', color: 'white', border: 'none', borderRadius: '5px' }}>Buy Gold Bundle</button>
        <button onClick={() => handlePurchase(PAYMENT_LINKS.PLATINUM)} style={{ padding: '15px', cursor: 'pointer', background: '#2196f3', color: 'white', border: 'none', borderRadius: '5px' }}>Buy Platinum Bundle</button>
      </div>
    </div>
  );
};
export default TopUp;
