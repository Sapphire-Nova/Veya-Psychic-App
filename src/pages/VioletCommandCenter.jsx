import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

const VioletCommandCenter = () => {
  const [isLive, setIsLive] = useState(false);
  const [activeQueue, setActiveQueue] = useState([]);

  // This function flips the switch in the AWS Database
  const toggleLiveStatus = async () => {
    const newStatus = !isLive;
    setIsLive(newStatus);

    try {
      // Update the VioletStatus model in the backend
      // We use a hardcoded ID of 'MASTER' for your single status toggle
      await client.models.VioletStatus.create({
        id: 'MASTER_STATUS',
        isLive: newStatus,
        statusMessage: newStatus ? "Violet is now in the circle." : "Violet is currently resting.",
        currentRate: 3
      });
      
      if(newStatus) {
        alert("BROADCAST SENT: Your followers have been notified!");
      }
    } catch (error) {
      // If it already exists, we update it instead of creating
      await client.models.VioletStatus.update({
        id: 'MASTER_STATUS',
        isLive: newStatus
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
      <header className="flex justify-between items-center mb-8 bg-slate-900 p-6 rounded-3xl border border-purple-500/30">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">VIOLET COMMAND CENTER</h1>
          <p className="text-slate-400">Sole Operator: Violet Flame Holistics</p>
        </div>
        <button 
          onClick={toggleLiveStatus}
          className={'px-8 py-4 rounded-2xl font-bold transition-all shadow-lg ' + 
            (isLive ? 'bg-green-500 shadow-green-500/50 animate-pulse' : 'bg-red-600 shadow-red-600/50')}
        >
          {isLive ? 'SYSTEM LIVE' : 'SYSTEM OFFLINE'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <h2 className="text-xl font-bold mb-4">Live Queue</h2>
          <p className="text-slate-500 italic text-sm">Real-time waitlist will appear here as users join.</p>
        </div>
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <h2 className="text-xl font-bold mb-4">Luna Credit Analytics</h2>
          <p className="text-green-400 font-mono text-2xl">0 Credits Today</p>
        </div>
      </div>
    </div>
  );
};

export default VioletCommandCenter;
