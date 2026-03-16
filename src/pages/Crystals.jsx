import React, { useState } from 'react';

const crystals = [
  { 
    name: 'Amazonite', 
    element: 'Water/Earth', 
    chakra: 'Heart/Throat', 
    path: 'Crystals/amazonite/tumbled-amazonite-gemstone-amazon-stone-dark-macro-shooting-natural-mineral-rock-specimen-tumbled-amazonite-gemstone-amazon-103207551.webp',
    desc: 'The Stone of Hope. It calms the brain and nervous system while aiding in maintaining optimum health.' 
  },
  { 
    name: 'Amethyst', 
    element: 'Air', 
    chakra: 'Third Eye', 
    path: 'Crystals/amethyst/amethyst-cluster.webp', 
    desc: 'A powerful and protective stone with a high spiritual vibration.' 
  },
  { 
    name: 'Black Tourmaline', 
    element: 'Earth', 
    chakra: 'Root', 
    path: 'Crystals/black_tourmaline/protection-stone.webp', 
    desc: 'The premier stone of protection, a psychic shield deflecting negative energies.' 
  }
  // We can drop the rest of the paths in here once we have your 'crystal_links.txt' names!
];

const Crystals = () => {
  const [selected, setSelected] = useState(null);
  const s3Base = "https://crystalphotosforveya.s3.us-east-2.amazonaws.com/";

  return (
    <div className="min-h-screen bg-black pt-24 pb-48 px-6 text-white">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-6xl font-black uppercase tracking-tighter italic">Crystal Vault</h1>
        <div className="h-1 w-24 bg-purple-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_#a855f7]"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {crystals.map((c) => (
          <div key={c.name} onClick={() => setSelected(c)} className="group cursor-pointer bg-zinc-900/40 border border-white/5 rounded-[40px] overflow-hidden hover:border-purple-500/50 transition-all duration-700 shadow-2xl">
            <div className="aspect-square overflow-hidden bg-zinc-800 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <img 
                src={`${s3Base}${c.path}`} 
                alt={c.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[30%] group-hover:grayscale-0"
                onError={(e) => { e.target.src = "https://via.placeholder.com/400?text=Aligning+Energy"; }}
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white">{c.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl animate-fade-in" onClick={() => setSelected(null)}>
          <div className="bg-zinc-900 max-w-lg w-full rounded-[60px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]" onClick={e => e.stopPropagation()}>
            <img src={`${s3Base}${selected.path}`} className="w-full h-80 object-cover" />
            <div className="p-10">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">{selected.name}</h2>
              <div className="flex gap-3 mb-8">
                <span className="text-[9px] font-black uppercase tracking-widest bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full border border-purple-500/30">{selected.element}</span>
                <span className="text-[9px] font-black uppercase tracking-widest bg-zinc-800 text-zinc-500 px-4 py-2 rounded-full border border-white/5">{selected.chakra}</span>
              </div>
              <p className="text-zinc-400 italic text-sm leading-relaxed mb-10">"{selected.desc}"</p>
              <button onClick={() => setSelected(null)} className="w-full py-5 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-xl">Return to Vault</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Crystals;