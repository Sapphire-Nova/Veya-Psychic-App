import React, { useState, useEffect } from 'react';

const AdminLive = () => {
  const [isLive, setIsLive] = useState(localStorage.getItem('violet_live') === 'true');
  const [lastSeeker, setLastSeeker] = useState(null);

  useEffect(() => {
    const checkQueue = () => {
      const seekerData = localStorage.getItem('last_seeker');
      if (seekerData) {
        const seeker = JSON.parse(seekerData);
        if (!lastSeeker || lastSeeker.time !== seeker.time) {
          setLastSeeker(seeker);
          // Play the Crystal Bowl Chime
          new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3').play();
        }
      }
    };
    const interval = setInterval(checkQueue, 2000);
    return () => clearInterval(interval);
  }, [lastSeeker]);

  const toggleOnline = () => {
    const newState = !isLive;
    setIsLive(newState);
    localStorage.setItem('violet_live', newState);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-10 p-6 bg-zinc-900/50 rounded-3xl border border-purple-500/20">
        <h1 className="text-3xl font-bold">Violet's Sanctuary Office</h1>
        <button onClick={toggleOnline} className={`px-10 py-4 rounded-full font-bold transition-all ${isLive ? 'bg-red-500/20 text-red-500 border border-red-500' : 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'}`}>
          {isLive ? '🛑 GO OFFLINE' : '✨ GO ONLINE'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900/30 rounded-3xl border border-zinc-800 p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-ping"></span> Live Seeker Queue
          </h2>
          {lastSeeker ? (
            <div className="bg-purple-600/10 border border-purple-500/40 p-6 rounded-2xl animate-pulse">
              <div className="flex justify-between mb-4">
                <span className="font-bold text-xl">{lastSeeker.name}</span>
                <span className="bg-purple-600 px-3 py-1 rounded-full text-xs font-bold">{lastSeeker.sign}</span>
              </div>
              <p className="text-zinc-400 italic mb-2">" {lastSeeker.intention} "</p>
              <p className="text-[10px] text-zinc-600">Arrived at: {lastSeeker.time}</p>
            </div>
          ) : (
            <p className="text-zinc-600 italic">No one in the queue. Your energy is clear.</p>
          )}
        </div>

        <div className="bg-zinc-900/30 rounded-3xl border border-zinc-800 p-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-zinc-500 mb-4 uppercase tracking-tighter">Energy Balance</h3>
          <p className="text-5xl font-bold text-purple-400">-- : --</p>
          <p className="text-xs text-zinc-600 mt-4">Waiting for session to start...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLive;