import React, { useState } from 'react';
import { chakraData } from '../chakraData';

const ChakraLibrary = () => {
  const [selectedChakra, setSelectedChakra] = useState(null);

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#1a1a1a', color: 'white' }}>
      <h2 style={{ color: '#FFD700' }}>Chakra Guide</h2>
      <p>Select a chakra to illuminate its wisdom.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {chakraData.map((chakra) => (
          <div 
            key={chakra.id} 
            onClick={() => setSelectedChakra(chakra)}
            style={{ cursor: 'pointer', padding: '10px', border: '1px solid #333', borderRadius: '15px' }}
          >
            <img src={chakra.image} alt={chakra.name} style={{ width: '80px', marginBottom: '10px' }} />
            <h4>{chakra.name}</h4>
          </div>
        ))}
      </div>

      {selectedChakra && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#2a2a2a', padding: '30px', borderRadius: '20px', zIndex: 1000, maxWidth: '90%', border: '2px solid #FFD700' }}>
          <button onClick={() => setSelectedChakra(null)} style={{ float: 'right', background: 'none', color: 'white', border: 'none', fontSize: '20px', cursor: 'pointer' }}>X</button>
          <img src={selectedChakra.image} alt={selectedChakra.name} style={{ width: '120px' }} />
          <h3 style={{ color: '#FFD700' }}>{selectedChakra.name}</h3>
          <p><i>"{selectedChakra.affirmation}"</i></p>
          <hr style={{ borderColor: '#444' }} />
          <p><strong>Underactive:</strong> {selectedChakra.underactive}</p>
          <p><strong>Overactive:</strong> {selectedChakra.overactive}</p>
          <p><strong>Balance with:</strong> {selectedChakra.balance.crystal} ({selectedChakra.balance.color})</p>
          <button 
             style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#FFD700', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
             onClick={() => window.location.href = '/Services'}
          >
            Book a Balancing Reading
          </button>
        </div>
      )}
    </div>
  );
};

export default ChakraLibrary;
