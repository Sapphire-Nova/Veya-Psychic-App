import React from 'react';
import { useNavigate } from 'react-router-dom';

const Readings = () => {
  const navigate = useNavigate();
  
  const boutiqueServices = [
    { 
      id: 'tarot', 
      title: 'Tarot Reading', 
      price: '25', 
      icon: '🃏', 
      color: 'from-purple-500/20',
      desc: 'Unlock the mysteries of your current path with a classic spread.'
    },
    { 
      id: 'zoom', 
      title: 'Zoom Reading', 
      price: '50', 
      icon: '🎥', 
      color: 'from-blue-500/20',
      desc: 'A live, face-to-face spiritual consultation from the comfort of your home.'
    },
    { 
      id: 'mediumship', 
      title: 'Mediumship', 
      price: '75', 
      icon: '🕯️', 
      color: 'from-amber-500/20',
      desc: 'Connecting with the vibrations of loved ones in the spirit realm.'
    },
    { 
      id: 'reiki', 
      title: 'Reiki Healing', 
      price: '40', 
      icon: '🙌', 
      color: 'from-emerald-500/20',
      desc: 'Distance energy work to balance your chakras and restore peace.'
    },
    { 
      id: 'full', 
      title: 'Full Reading', 
      price: '100', 
      icon: '🌟', 
      color: 'from-indigo-500/20',
      desc: 'The ultimate seer experience—combining tarot, mediumship, and guidance.'
    },
    { 
      id: 'ritual', 
      title: 'Blessing Ritual', 
      price: '60', 
      icon: '🔥', 
      color: 'from-red-500/20',
      desc: 'A custom lightworker ceremony to manifest your intentions.'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-48 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-6xl font-bold uppercase tracking-tighter text-white italic">The Boutique</h1>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.5em] mt-4">Select your sacred exchange</p>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-8"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {boutiqueServices.map((s) => (
          <div 
            key={s.id} 
            onClick={() => navigate(`/Login`)}
            className="group relative cursor-pointer bg-zinc-900/30 border border-white/5 p-10 rounded-[50px] overflow-hidden hover:border-purple-500/40 transition-all duration-700 shadow-2xl"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${s.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
            
            <div className="relative z-10">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">{s.icon}</div>
              <h3 className="text-3xl font-bold text-white uppercase tracking-tighter leading-tight">{s.title}</h3>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-purple-400 text-[10px] font-black uppercase tracking-widest">{s.price} Luna Credits</span>
              </div>

              <p className="mt-4 text-zinc-500 text-sm leading-relaxed min-h-[60px]">{s.desc}</p>

              <div className="mt-8 pt-6 border-t border-white/5">
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white transition-colors font-bold">Book Entrance →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Readings;