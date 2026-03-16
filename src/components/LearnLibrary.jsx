import React, { useState } from 'react';
import { masterData } from '../libraryData';

const LearnLibrary = () => {
  const [activeTab, setActiveTab] = useState('Crystals');
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: 'white', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Tab Navigation */}
      <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', marginBottom: '20px', padding: '10px 0' }}>
        {Object.keys(masterData).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ 
            background: activeTab === tab ? '#FFD700' : '#1e1b4b', 
            color: activeTab === tab ? 'black' : 'white', 
            border: '1px solid #FFD700', 
            padding: '10px 20px', 
            borderRadius: '20px', 
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}>{tab}</button>
        ))}
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {masterData[activeTab]?.map((item) => (
          <div key={item.name} onClick={() => setSelectedItem(item)} style={{ 
            backgroundColor: '#1e1b4b', 
            borderRadius: '15px', 
            border: '1px solid #312e81', 
            overflow: 'hidden' 
          }}>
            <div style={{ height: '120px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.img ? (
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '3rem' }}>{item.display || '✨'}</span>
              )}
            </div>
            <div style={{ padding: '10px', textAlign: 'center', color: '#FFD700', fontSize: '0.9rem', fontWeight: 'bold' }}>
              {item.name}
            </div>
          </div>
        ))}
      </div>

      {/* Wisdom Modal */}
      {selectedItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 5000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e1b4b', width: '100%', maxWidth: '450px', borderRadius: '30px', padding: '30px', border: '2px solid #FFD700', maxHeight: '80vh', overflowY: 'auto' }}>
            <div onClick={() => setSelectedItem(null)} style={{ textAlign: 'right', cursor: 'pointer', color: '#FFD700', fontWeight: 'bold' }}>✕ CLOSE</div>
            <h2 style={{ color: '#FFD700', textAlign: 'center' }}>{selectedItem.name}</h2>
            <div style={{ marginTop: '20px', fontSize: '0.95rem', lineHeight: '1.6', color: '#cbd5e1' }}>
              {selectedItem.dates && <p><strong>Dates:</strong> {selectedItem.dates}</p>}
              {selectedItem.strengths && <p><strong>Strengths:</strong> {selectedItem.strengths}</p>}
              {selectedItem.properties && <p><strong>Properties:</strong> {selectedItem.properties}</p>}
              {selectedItem.folklore && <p><strong>Folklore:</strong> {selectedItem.folklore}</p>}
              {selectedItem.underactive && <p><strong>If Underactive:</strong> {selectedItem.underactive}</p>}
              {selectedItem.affirmation && <p style={{color: '#FFD700', marginTop: '10px'}}><strong>Affirmation:</strong> {selectedItem.affirmation}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnLibrary;
