import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Sanctuary = () => {
  const location = useLocation();
  const isSuccess = new URLSearchParams(location.search).get('success');

  const bundles = [
    { name: 'Starter Bundle', credits: '25', price: '$25', url: 'https://buy.stripe.com/5kQ14gdvYe3J7OjaHMd3i05' },
    { name: 'Mystic Bundle', credits: '50', price: '$45', url: 'https://buy.stripe.com/cNi6oA3Voe3Jb0vbLQd3i0a' },
    { name: 'Glow Bundle', credits: '100', price: '$85', url: 'https://buy.stripe.com/5kQcMY63wf7N4C76rwd3i09' },
    { name: 'Sparkle Bundle', credits: '150', price: '$120', url: 'https://buy.stripe.com/8x200c8bE6Bh4C7eY2d3i04' },
    { name: 'Radiance Bundle', credits: '250', price: '$200', url: 'https://buy.stripe.com/cNi5kwgIacZF7Oj6rwd3i01' }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {isSuccess && (
        <div className="mb-12 p-8 bg-green-500/10 border border-green-500 rounded-3xl text-center animate-bounce">
          <h2 className="text-3xl font-bold text-green-400">✨ Energy Received! ✨</h2>
          <p className="text-zinc-400 mt-2">Your credits have been added to your soul path. Violet is ready for you in the Office.</p>
        </div>
      )}
      
      <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">The Luna Credit Sanctuary</h1>
      <p className="text-zinc-500 mb-12">Choose your bundle to unlock live guidance.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bundles.map((b) => (
          <div key={b.name} className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 text-center hover:border-purple-500/50 transition-all">
            <h3 className="text-xl mb-2 font-bold">{b.name}</h3>
            <p className="text-4xl font-bold text-purple-400 mb-2">{b.credits} Credits</p>
            <p className="text-zinc-500 mb-6">{b.price}</p>
            <button 
              onClick={() => window.location.href = b.url}
              className="w-full bg-white text-black py-3 rounded-2xl font-bold hover:bg-purple-600 hover:text-white transition-all"
            >
              PURCHASE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sanctuary;
