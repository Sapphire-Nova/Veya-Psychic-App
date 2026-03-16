import React, { useState } from 'react';
import { zodiacSigns, crystalData, herbData, chakraVault, tarotVault } from '../libraryData';

const LearnLibrary = () => {
  const [activeTab, setActiveTab] = useState('Zodiac');
  const [selectedItem, setSelectedItem] = useState(null);

  const tabs = ['Zodiac', 'Crystals', 'Herbs', 'Chakras', 'Tarot'];

  const renderContent = () => {
    switch(activeTab) {
      case 'Zodiac': return zodiacSigns.map(s => ({...s, id: s.name, type: s.dates, img: null, display: s.display}));
      case 'Crystals': return crystalData.map(c => ({...c, id: c.name, type: c.chakra, img: c.image}));
      case 'Herbs': return herbData.map(h => ({...h, id: h.name, type: h.traits, img: h.image}));
      case 'Chakras': return chakraVault.map(ch => ({...ch, id: ch.name, type: ch.traits, img: null}));
      case 'Tarot': return tarotVault.map(t => ({...t, id: t.name, type: t.traits, img: t.image}));
      default: return [];
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: 'white', minHeight: '100vh', paddingBottom: '120px' }}>
      <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', marginBottom: '20px', padding: '10px' }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: activeTab === tab ? '#FFD700' : '#1e1b4b', color: activeTab === tab ? 'black' : 'white', border: '1px solid #FFD700', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold' }}>{tab}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
        {renderContent().map((item) => (
          <div key={item.id} onClick={() => setSelectedItem(item)} style={{ backgroundColor: '#1e1b4b', borderRadius: '15px', border: '1px solid #312e81', overflow: 'hidden', textAlign: 'center', paddingBottom: '10px' }}>
             {item.img ? <img src={item.img} style={{ width: '100%', height: '120px', objectFit: 'cover' }} /> : <div style={{fontSize: '3rem', padding: '20px'}}>{item.display || '✨'}</div>}
             <div style={{color: '#FFD700', marginTop: '10px', fontSize: '0.9rem'}}>{item.name}</div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 4000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e1b4b', width: '100%', maxWidth: '450px', borderRadius: '30px', padding: '30px', border: '2px solid #FFD700', maxHeight: '80vh', overflowY: 'auto' }}>
            <div onClick={() => setSelectedItem(null)} style={{ textAlign: 'right', cursor: 'pointer', color: '#FFD700' }}>✕ Close</div>
            <h2 style={{ color: '#FFD700', textAlign: 'center' }}>{selectedItem.name}</h2>
            <hr style={{ borderColor: '#312e81' }} />
            
            {/* Dynamic Info based on Category */}
            <div style={{ textAlign: 'left', marginTop: '20px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {selectedItem.dates && <p><strong>Dates:</strong> {selectedItem.dates}</p>}
              {selectedItem.strengths && <p><strong>Strengths:</strong> {selectedItem.strengths}</p>}
              {selectedItem.weaknesses && <p><strong>Weaknesses:</strong> {selectedItem.weaknesses}</p>}
              {selectedItem.properties && <p><strong>Magical Properties:</strong> {selectedItem.properties}</p>}
              {selectedItem.folklore && <p><strong>Folklore:</strong> {selectedItem.folklore}</p>}
              {selectedItem.underactive && <p><strong>Underactive:</strong> {selectedItem.underactive}</p>}
              {selectedItem.overactive && <p><strong>Overactive:</strong> {selectedItem.overactive}</p>}
              {selectedItem.affirmation && <p style={{color: '#FFD700'}}><strong>Affirmation:</strong> {selectedItem.affirmation}</p>}
              {selectedItem.upright && <p><strong>Upright:</strong> {selectedItem.upright}</p>}
              {selectedItem.reversed && <p><strong>Reversed:</strong> {selectedItem.reversed}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnLibrary;
