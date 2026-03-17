import React from 'react';
import { fullMoonCircles } from '../data/fullMoonData';

const NextMoonEvent = () => {
  // Logic to find the next upcoming event based on today's date
  const now = new Date();
  const nextEvent = fullMoonCircles.find(event => new Date(event.date) >= now) || fullMoonCircles[0];

  return (
    <div className="my-8 p-6 rounded-3xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-purple-500/30 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="px-3 py-1 text-xs font-bold tracking-widest text-purple-300 uppercase bg-purple-500/20 rounded-full">
            Next Live Ritual
          </span>
          <h2 className="mt-2 text-3xl font-black text-white">{nextEvent.name} Meditation</h2>
          <p className="text-indigo-200 mt-1 font-medium">{nextEvent.date} @ {nextEvent.time}</p>
        </div>
        
        <div className="flex-1 max-w-md">
          <p className="text-sm text-slate-300 italic">"{nextEvent.meaning}"</p>
        </div>

        <a 
          href={nextEvent.zoom} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative px-8 py-4 bg-purple-600 rounded-2xl font-bold text-white transition-all hover:bg-purple-500 hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25"
        >
          Join Ritual
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:animate-pulse group-hover:opacity-100"></div>
        </a>
      </div>
      <div className="mt-4 text-center text-xs text-slate-500 uppercase tracking-tighter">
        Passcode: <span className="text-purple-400 font-bold">{nextEvent.passcode}</span>
      </div>
    </div>
  );
};

export default NextMoonEvent;