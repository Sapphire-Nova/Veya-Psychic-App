import React, { useState } from 'react';
import { chakraData } from '../chakraData';

const LearnLibrary = () => {
  const [activeTab, setActiveTab] = useState('Zodiac');
  const [selectedItem, setSelectedItem] = useState(null);

  const tabs = ['Zodiac', 'Crystals', 'Herbs', 'Chakras'];

  const zodiacSigns = [
    { name: "Aries", dates: "Mar 21 - Apr 19", type: "Cardinal Fire", traits: "Bold, Ambitious, Pioneer", color: "Red", crystal: "Red Jasper", image: "♈" },
    { name: "Taurus", dates: "Apr 20 - May 20", type: "Fixed Earth", traits: "Steady, Sensual, Persistent", color: "Green", crystal: "Emerald", image: "♉" },
    { name: "Gemini", dates: "May 21 - Jun 20", type: "Mutable Air", traits: "Curious, Adaptable, Social", color: "Yellow", crystal: "Tiger's Eye", image: "♊" },
    { name: "Cancer", dates: "Jun 21 - Jul 22", type: "Cardinal Water", traits: "Nurturing, Intuitive, Protective", color: "Silver/White", crystal: "Moonstone", image: "♋" },
    { name: "Leo", dates: "Jul 23 - Aug 22", type: "Fixed Fire", traits: "Confident, Radiant, Leader", color: "Gold", crystal: "Citrine", image: "♌" },
    { name: "Virgo", dates: "Aug 23 - Sep 22", type: "Mutable Earth", traits: "Practical, Analytical, Grounded", color: "Brown/Olive", crystal: "Amazonite", image: "♍" },
    { name: "Libra", dates: "Sep 23 - Oct 22", type: "Cardinal Air", traits: "Harmonious, Just, Diplomatic", color: "Pink/Blue", crystal: "Lapis Lazuli", image: "♎" },
    { name: "Scorpio", dates: "Oct 23 - Nov 21", type: "Fixed Water", traits: "Intense, Deep, Transformative", color: "Maroon", crystal: "Obsidian", image: "♏" },
    { name: "Sagittarius", dates: "Nov 22 - Dec 21", type: "Mutable Fire", traits: "Adventurous, Honest, Expansive", color: "Purple", crystal: "Turquoise", image: "♐" },
    { name: "Capricorn", dates: "Dec 22 - Jan 19", type: "Cardinal Earth", traits: "Disciplined, Strategic, Patient", color: "Dark Grey", crystal: "Garnet", image: "♑" },
    { name: "Aquarius", dates: "Jan 20 - Feb 18", type: "Fixed Air", traits: "Innovative, Independent, Humanitarian", color: "Electric Blue", crystal: "Amethyst", image: "♒" },
    { name: "Pisces", dates: "Feb 19 - Mar 20", type: "Mutable Water", traits: "Dreamy, Compassionate, Artistic", color: "Seafoam Green", crystal: "Aquamarine", image: "♓" }
  ];

  const renderContent = () => {
    if (activeTab === 'Zodiac') return zodiacSigns.map(s => ({...s, id: s.name, display: s.image, subtitle: s.dates}));
    if (activeTab === 'Chakras') return chakraData.map(c => ({...c, display: <img src={c.image} width="50"/>, subtitle: c.name}));
    return []; // Crystals and Herbs will be added here next
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', color: 'white', minHeight: '100vh', paddingBottom: '100px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#FFD700' }}>The Ancient Wisdom</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: activeTab === tab ? '#FFD700' : '#333', color: activeTab === tab ? 'black' : 'white', border: 'none', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>{tab}</button>
          ))}
        </div>
      </header>

      {activeTab === 'Zodiac' && (
        <div style={{ backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '15px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid #444' }}>
          <p><strong>Cardinal:</strong> Initiators. <strong>Fixed:</strong> Stabilizers. <strong>Mutable:</strong> Adaptors.</p>
          <button onClick={() => window.location.href='/Services'} style={{ color: '#FFD700', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>Book an Astrological Life Path Reading Now!</button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {renderContent().map((item) => (
          <div key={item.id} onClick={() => setSelectedItem(item)} style={{ backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '15px', textAlign: 'center', border: '1px solid #333' }}>
            <div style={{ fontSize: '2rem' }}>{item.display}</div>
            <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '5px' }}>{item.subtitle}</div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#1a1a1a', width: '85%', borderRadius: '25px', padding: '25px', border: '2px solid #FFD700', zIndex: 3000 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>❤️</button>
            <button onClick={() => setSelectedItem(null)} style={{ color: 'white', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>{selectedItem.display}</div>
            <h3 style={{ color: '#FFD700' }}>{selectedItem.name}</h3>
            <p style={{ color: '#ccc' }}>{selectedItem.type || selectedItem.affirmation}</p>
            <hr style={{ borderColor: '#333' }} />
            <p><strong>Strengths:</strong> {selectedItem.traits || selectedItem.underactive}</p>
            <p><strong>Crystal:</strong> {selectedItem.crystal || selectedItem.balance?.crystal}</p>
            <p><strong>Color:</strong> {selectedItem.color || selectedItem.balance?.color}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnLibrary;
