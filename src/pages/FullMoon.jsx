import React from 'react';

const FullMoon = () => {
  return (
    <div className="min-h-screen pt-20 pb-20 px-6 flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black -z-10"></div>
      
      <div className="max-w-3xl bg-zinc-900/40 border border-purple-500/30 p-12 rounded-[60px] backdrop-blur-xl">
        <h1 className="text-4xl font-bold mb-6 text-white uppercase tracking-tighter">Full Moon Circle</h1>
        <p className="text-zinc-400 text-lg mb-10 italic">"Gather with the collective under the lunar glow for ritual, release, and manifestation."</p>
        
        <div className="bg-purple-600/10 border border-purple-500/20 p-8 rounded-3xl mb-10">
          <h3 className="text-purple-300 font-bold mb-2">Next Live Gathering</h3>
          <p className="text-white text-xl font-serif">Aries Full Moon Ritual</p>
          <p className="text-zinc-500 text-sm mt-2">Check your email for the specific Zoom password.</p>
        </div>

        <button 
          onClick={() => window.open('https://zoom.us/j/YOUR_MEETING_ID', '_blank')}
          className="px-12 py-5 bg-white text-black rounded-full font-bold hover:bg-purple-600 hover:text-white transition-all shadow-2xl"
        >
          ENTER ZOOM CIRCLE
        </button>
      </div>
    </div>
  );
};

export default FullMoon;