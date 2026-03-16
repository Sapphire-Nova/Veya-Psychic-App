import React from 'react';

const CHAKRAS = [
  { name: 'Root', color: '#FF0000', img: 'https://chakraimages-310133718673-us-west-1-an.s3.us-west-1.amazonaws.com/rootchakra.png' },
  { name: 'Sacral', color: '#FF7F00', img: 'https://chakraimages-310133718673-us-west-1-an.s3.us-west-1.amazonaws.com/sacralchakra.png' },
  { name: 'Solar Plexus', color: '#FFFF00', img: 'https://chakraimages-310133718673-us-west-1-an.s3.us-west-1.amazonaws.com/solarplexuschakra.png' },
  { name: 'Heart', color: '#00FF00', img: 'https://chakraimages-310133718673-us-west-1-an.s3.us-west-1.amazonaws.com/heartchakra.png' },
  { name: 'Throat', color: '#0000FF', img: 'https://chakraimages-310133718673-us-west-1-an.s3.us-west-1.amazonaws.com/thethroatchakra.png' },
  { name: 'Third Eye', color: '#4B0082', img: 'https://chakraimages-310133718673-us-west-1-an.s3.us-west-1.amazonaws.com/thirdeyechakra.png' },
  { name: 'Crown', color: '#9400D3', img: 'https://chakraimages-310133718673-us-west-1-an.s3.us-west-1.amazonaws.com/crownchakra.png' }
];

export const ChakraList: React.FC = () => {
  return (
    <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', background: '#000' }}>
      {CHAKRAS.map((c) => (
        <div key={c.name} style={{ textAlign: 'center', background: '#1a1a1a', padding: '20px', borderRadius: '20px', border: '2px solid ' + c.color, boxShadow: '0 0 10px ' + c.color }}>
          <img src={c.img} alt={c.name} style={{ width: '150px', height: '150px', objectFit: 'contain' }} 
               onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=Check+Permissions'; }} />
          <h2 style={{ color: c.color, marginTop: '15px', fontFamily: 'serif' }}>{c.name}</h2>
        </div>
      ))}
    </div>
  );
};
