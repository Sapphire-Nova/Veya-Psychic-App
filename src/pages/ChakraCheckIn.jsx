import React, { useState } from 'react';

const chakraData = [
  { name: 'Root', color: 'bg-red-600', element: 'Earth', balanced: 'Secure, grounded, physically healthy', under: 'Fearful, anxious, underweight', over: 'Greedy, sluggish, overweight' },
  { name: 'Sacral', color: 'bg-orange-500', element: 'Water', balanced: 'Creative, sexual health, emotional flow', under: 'Stiff, lack of desire, closed off', over: 'Over-emotional, addictive behaviors' },
  { name: 'Solar Plexus', color: 'bg-yellow-400', element: 'Fire', balanced: 'Confident, strong will, purposeful', under: 'Low self-esteem, passive, weak digestion', over: 'Aggressive, controlling, arrogant' },
  { name: 'Heart', color: 'bg-green-500', element: 'Air', balanced: 'Compassionate, loving, peaceful', under: 'Lonely, antisocial, critical', over: 'Jealous, codependent, demanding' },
  { name: 'Throat', color: 'bg-blue-400', element: 'Ether', balanced: 'Good communicator, truthful, expressive', under: 'Fear of speaking, secretive, shy', over: 'Talkative, gossiping, loud' },
  { name: 'Third Eye', color: 'bg-indigo-600', element: 'Light', balanced: 'Intuitive, perceptive, imaginative', under: 'Poor memory, denial, lack of vision', over: 'Delusional, nightmares, obsessed' },
  { name: 'Crown', color: 'bg-purple-500', element: 'Thought', balanced: 'Spiritually connected, wise, mindful', under: 'Cynical, disconnected, rigid', over: 'Addicted to spirituality, ungrounded' }
];

const ChakraCheckIn = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-black pt-24 pb-48 px-6 text-white">
      <h1 className="text-4xl font-bold text-center uppercase tracking-tighter mb-12">Chakra Check-In</h1>
      
      <div className="flex flex-col items-center gap-4">
        {chakraData.slice().reverse().map((c) => (
          <button 
            key={c.name}
            onClick={() => setSelected(c)}
            className={`w-16 h-16 rounded-full border-4 border-white/10 ${c.color} shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-110 transition-all`}
          />
        ))}
      </div>

      {selected && (
        <div className="mt-12 p-8 bg-zinc-900/50 border border-white/10 rounded-[40px] max-w-md mx-auto animate-fade-in">
          <h2 className="text-2xl font-bold uppercase text-center" style={{color: selected.color.replace('bg-', '')}}>{selected.name}</h2>
          <p className="text-center text-[10px] uppercase tracking-widest text-zinc-500 mb-6">Element: {selected.element}</p>
          <div className="space-y-4">
            <div><h4 className="text-green-400 text-[10px] uppercase font-bold">Balanced</h4><p className="text-sm">{selected.balanced}</p></div>
            <div><h4 className="text-yellow-400 text-[10px] uppercase font-bold">Underactive</h4><p className="text-sm">{selected.under}</p></div>
            <div><h4 className="text-red-400 text-[10px] uppercase font-bold">Overactive</h4><p className="text-sm">{selected.over}</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChakraCheckIn;