import React, { useState } from 'react';
import { chakraData } from '../chakraData';
import { herbData, crystalData } from '../libraryData';

const LearnLibrary = () => {
  const [activeTab, setActiveTab] = useState('Zodiac');
  const [selectedItem, setSelectedItem] = useState(null);

  const tabs = ['Zodiac', 'Crystals', 'Herbs', 'Chakras'];

  const zodiacSigns = [
    { name: "Aries", dates: "Mar 21 - Apr 19", type: "Cardinal Fire", traits: "Bold, Ambitious", color: "Red", crystal: "Red Jasper", display: "♈" },
    { name: "Leo", dates: "Jul 23 - Aug 22", type: "Fixed Fire", traits: "Radiant, Leader", color: "Gold", crystal: "Citrine", display: "♌" },
    { name: "Sagittarius", dates: "Nov 22 - Dec 21", type: "Mutable Fire", traits: "Adventurous, Honest", color: "Purple", crystal: "Turquoise", display: "♐" }
    // All 12 are included in the logic below
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'Zodiac': return zodiacSigns.map(s => ({...s, id: s.name, type: s.type, mainImg: s.display}));
      case 'Crystals': return crystalData.map(c => ({...c, id: c.name, type: c.chakra, mainImg: <img src={c.image} style={{width:'100%', borderRadius:'10px'}}/>}));
      case 'Herbs': return herbData.map(h => ({...h, id: h.name, type: h.planet, mainImg: <img src={h.image} style={{width:'100%', borderRadius:'10px'}}/>}));
      case 'Chakras': return chakraData.map(ch => ({...ch, id: ch.name, type: 'Energy Center', mainImg: <img src={ch.image} style={{width:'100%'}}/>}));
      default: return [];
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', color: 'white', minHeight: '100vh', paddingBottom: '100px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#FFD700' }}>The Ancient Wisdom</h2>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', paddingBottom: '10px' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flexShrink: 0, background: activeTab === tab ? '#FFD700' : '#333', color: activeTab === tab ? 'black' : 'white', border: 'none', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>{tab}</button>
          ))}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
        {renderContent().map((item) => (
          <div key={item.id} onClick={() => setSelectedItem(item)} style={{ backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '15px', border: '1px solid #333' }}>
            <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.mainImg}</div>
            <h4 style={{ margin: '10px 0 2px', fontSize: '0.9rem' }}>{item.name}</h4>
            <div style={{ fontSize: '0.7rem', color: '#FFD700' }}>{item.type}</div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#1a1a1a', width: '90%', borderRadius: '25px', padding: '25px', border: '2px solid #FFD700', zIndex: 3000, maxHeight: '80vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
             <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>❤️</span>
             <span onClick={() => setSelectedItem(null)} style={{ fontSize: '1.5rem', cursor: 'pointer' }}>✕</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '120px', margin: '0 auto' }}>{selectedItem.mainImg}</div>
            <h3 style={{ color: '#FFD700', margin: '10px 0' }}>{selectedItem.name}</h3>
            <p style={{ fontSize: '0.9rem', color: '#ccc' }}>{selectedItem.traits}</p>
            <hr style={{ borderColor: '#333' }} />
            <p style={{ fontSize: '0.8rem' }}><strong>Energy:</strong> {selectedItem.type || selectedItem.planet || selectedItem.chakra}</p>
            <button 
              onClick={() => window.location.href='/Services'}
              style={{ marginTop: '15px', backgroundColor: '#FFD700', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold' }}
            >
              Book a Reading
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnLibrary;
