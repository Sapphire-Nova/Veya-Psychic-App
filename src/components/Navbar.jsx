import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: '👁️', path: '/' },
    { name: 'Services', icon: '🔮', path: '/Services' },
    { name: 'Learn', icon: '📖', path: '/Chakra-Guide' },
    { name: 'Tools', icon: '🛠️', path: '/Tools/ChakraCheck' },
    { name: 'Sanctuary', icon: '✨', path: '/Login' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      backgroundColor: 'rgba(26, 26, 26, 0.95)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid #FFD700',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px 0',
      zIndex: 2000,
      height: '70px'
    }}>
      {navItems.map((item) => (
        <div 
          key={item.name} 
          onClick={() => navigate(item.path)}
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            color: location.pathname === item.path ? '#FFD700' : '#888',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '2px' }}>{item.icon}</div>
          <div style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.name}</div>
          {location.pathname === item.path && (
            <div style={{ width: '4px', height: '4px', backgroundColor: '#FFD700', borderRadius: '50%', margin: '2px auto 0' }}></div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
