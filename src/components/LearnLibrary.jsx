import React, { useState } from 'react';
import { masterData } from '../libraryData';

const LearnLibrary = () => {
  const [activeTab, setActiveTab] = useState('Zodiac');
  const [selectedItem, setSelectedItem] = useState(null);

  const tabs = Object.keys(masterData);

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: 'white', minHeight: '100vh', paddingBottom: '120px', width: '100%', overflowX: 'hidden' }}>
      <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', marginBottom: '20px', paddingBottom: '10px' }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: activeTab === tab ? '#FFD700' : '#1e1b4b', color: activeTab === tab ? 'black' : 'white', border: '1px solid #FFD700', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{tab}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
        {masterData[activeTab].map((item) => (
          <div key={item.name} onClick={() => setSelectedItem(item)} style={{ backgroundColor: '#1e1b4b', borderRadius: '15px', border: '1px solid #312e81', overflow: 'hidden', textAlign: 'center' }}>
             {item.img ? <img src={item.img} style={{ width: '100%', height: '140px', objectFit: 'cover' }} /> : <div style={{fontSize: '3.5rem', padding: '20px'}}>{item.display}</div>}
             <div style={{color: '#FFD700', padding: '10px', fontSize: '0.9rem', fontWeight: 'bold'}}>{item.name}</div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 5000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e1b4b', width: '100%', maxWidth: '450px', borderRadius: '30px', padding: '30px', border: '2px solid #FFD700', maxHeight: '80vh', overflowY: 'auto' }}>
            <div onClick={() => setSelectedItem(null)} style={{ textAlign: 'right', cursor: 'pointer', color: '#FFD700', fontWeight: 'bold' }}>✕ CLOSE</div>
            <h2 style={{ color: '#FFD700', textAlign: 'center', marginBottom: '5px' }}>{selectedItem.name}</h2>
            <p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic', marginBottom: '20px' }}>{selectedItem.traits}</p>
            <div style={{ textAlign: 'left', fontSize: '0.95rem', lineHeight: '1.6', color: '#cbd5e1' }}>
              {selectedItem.dates && <p><strong>Sacred Dates:</strong> {selectedItem.dates}</p>}
              {selectedItem.strengths && <p><strong>Strengths:</strong> {selectedItem.strengths}</p>}
              {selectedItem.properties && <p><strong>Magical Properties:</strong> {selectedItem.properties}</p>}
              {selectedItem.folklore && <p><strong>Folklore:</strong> {selectedItem.folklore}</p>}
              {selectedItem.underactive && <p><strong>If Underactive:</strong> {selectedItem.underactive}</p>}
              {selectedItem.overactive && <p><strong>If Overactive:</strong> {selectedItem.overactive}</p>}
              {selectedItem.affirmation && <p style={{color: '#FFD700', marginTop: '15px'}}><strong>Affirmation:</strong> "{selectedItem.affirmation}"</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnLibrary;
