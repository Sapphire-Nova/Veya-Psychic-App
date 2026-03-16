import React from 'react';

const herbs = [
  { name: 'Basil', element: 'Fire', img: 'https://lunabloom.s3.us-east-2.amazonaws.com/basil.jpg', folklore: 'Sacred to Erzulie and used to attract love and money.', ritual: 'Keep in your wallet for wealth.' },
  { name: 'Mugwort', element: 'Earth/Air', img: 'https://lunabloom.s3.us-east-2.amazonaws.com/mugwort.jpg', folklore: 'Associated with Artemis; used to prevent traveler fatigue.', ritual: 'Drink as tea before sleep for lucid dreams.' },
  { name: 'Lavender', element: 'Air', img: 'https://lunabloom.s3.us-east-2.amazonaws.com/lavender.jpg', folklore: 'Historically used to calm "melancholy" and attract peace.', ritual: 'Burn in a space to clear anxiety.' }
  // ... adding your full list of 47 herbs
];

const Herbs = () => {
  return (
    <div className="min-h-screen bg-black pt-24 pb-48 px-6 text-white">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-black uppercase tracking-tighter italic">Herbal Magic</h1>
        <div className="h-1 w-24 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {herbs.map((h) => (
          <div key={h.name} className="bg-zinc-900/30 border border-white/5 rounded-[40px] overflow-hidden group">
            <div className="h-64 overflow-hidden bg-zinc-800">
               <img src={h.img} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700" onError={(e) => e.target.src = 'https://via.placeholder.com/400?text=Herb+Coming+Soon'} />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold uppercase">{h.name}</h3>
              <p className="text-zinc-500 text-xs italic mt-4">"{h.folklore}"</p>
              <div className="mt-6 pt-6 border-t border-white/5">
                <span className="text-emerald-400 text-[9px] uppercase font-black tracking-widest">Ritual: {h.ritual}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Herbs;