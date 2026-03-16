import React, { useState } from 'react';

const Community = () => {
  const [posts] = useState([
    { user: "SoulSeeker", topic: "Chakras", content: "Just did the Chakra Check-In and found out my Root is blocked. Any herb tips?", likes: 12 },
    { user: "Violet", topic: "Rituals", content: "The Full Moon is approaching! Get your crystals ready for charging. ✨", likes: 45 }
  ]);

  return (
    <div style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', padding: '20px', paddingBottom: '100px' }}>
      <h2 style={{ color: '#FFD700', textAlign: 'center' }}>Veya Community</h2>
      <p style={{ textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>A sacred space for holistic living.</p>

      <div style={{ marginTop: '30px' }}>
        {posts.map((post, i) => (
          <div key={i} style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '20px', marginBottom: '15px', border: '1px solid #333' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#FFD700', fontWeight: 'bold' }}>@{post.user}</span>
              <span style={{ fontSize: '0.7rem', backgroundColor: '#333', padding: '3-8px', borderRadius: '10px' }}>{post.topic}</span>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{post.content}</p>
            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#888' }}>❤️ {post.likes} souls resonated</div>
          </div>
        ))}
      </div>

      <button style={{ position: 'fixed', bottom: '90px', right: '20px', backgroundColor: '#FFD700', color: 'black', border: 'none', width: '60px', height: '60px', borderRadius: '50%', fontSize: '24px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>+</button>
    </div>
  );
};

export default Community;
