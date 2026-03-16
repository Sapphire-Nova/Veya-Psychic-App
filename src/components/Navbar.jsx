import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = ({ user }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const menuItems = {
    learn: [
      { name: 'Crystals', path: '/Learn/Crystals', icon: '💎' },
      { name: 'Chakras', path: '/Learn/Chakras', icon: '☸️' },
      { name: 'Herbs', path: '/Learn/Herbs', icon: '🌿' },
      { name: 'Tarot', path: '/Learn/Tarot', icon: '🃏' }
    ],
    tools: [
      { name: 'Chakra Check', path: '/Tools/ChakraCheck', icon: '🧘' },
      { name: 'Soul Quiz', path: '/Tools/SoulQuiz', icon: '🌀' }
    ]
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '0', right: '0', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* UPWARD MENU */}
      {activeMenu && (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '25px', padding: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {menuItems[activeMenu].map((item) => (
            <Link key={item.name} to={item.path} onClick={() => setActiveMenu(null)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', textDecoration: 'none', color: 'white' }}>
              <span>{item.icon}</span>
              <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>{item.name}</span>
            </Link>
          ))}
        </div>
      )}

      {/* MAIN FLAT BAR */}
      <nav style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px', padding: '10px 30px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <Link to="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
          <span style={{ fontSize: '20px' }}>👁️</span>
          <span style={{ fontSize: '8px', textTransform: 'uppercase', color: '#666' }}>Home</span>
        </Link>
        <Link to="/Readings" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
          <span style={{ fontSize: '20px' }}>🔮</span>
          <span style={{ fontSize: '8px', textTransform: 'uppercase', color: '#666' }}>Boutique</span>
        </Link>
        <button onClick={() => setActiveMenu(activeMenu === 'learn' ? null : 'learn')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
          <span style={{ fontSize: '20px', color: activeMenu === 'learn' ? '#a855f7' : 'white' }}>📚</span>
          <span style={{ fontSize: '8px', textTransform: 'uppercase', color: '#666' }}>Learn</span>
        </button>
        <button onClick={() => setActiveMenu(activeMenu === 'tools' ? null : 'tools')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
          <span style={{ fontSize: '20px', color: activeMenu === 'tools' ? '#10b981' : 'white' }}>🛠️</span>
          <span style={{ fontSize: '8px', textTransform: 'uppercase', color: '#666' }}>Tools</span>
        </button>
        <Link to="/Login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
          <span style={{ fontSize: '20px' }}>{user ? '🌙' : '✨'}</span>
          <span style={{ fontSize: '8px', textTransform: 'uppercase', color: '#666' }}>{user ? 'Vault' : 'Entry'}</span>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;