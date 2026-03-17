import React, { useState, useEffect } from 'react';

const SeerDashboard = () => {
  const [isLive, setIsLive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newContent, setNewContent] = useState({ title: '', type: 'meditation' });

  // Toggle Live Status
  const toggleLive = () => {
    const nextState = !isLive;
    setIsLive(nextState);
    // Lyra Backend Call: updateStatus(nextState)
    console.log("Lyra Backend: Violet is now " + (nextState ? "LIVE" : "OFFLINE"));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-slate-900 text-white min-h-screen">
      <header className="flex justify-between items-center border-b border-purple-500 pb-4 mb-8">
        <h1 className="text-3xl font-bold text-purple-400">Lyra Control Center</h1>
        <button 
          onClick={toggleLive}
          className={px-8 py-3 rounded-full font-bold transition-all }
        >
          {isLive ? 'VIOLET IS LIVE' : 'GO LIVE'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Instant Messaging Portal */}
        <section className="bg-slate-800 p-5 rounded-xl border border-indigo-500/30">
          <h2 className="text-xl mb-4 flex justify-between">
            Incoming Requests <span>(3 Luna Credits Each)</span>
          </h2>
          <div className="h-64 overflow-y-auto bg-black/30 p-4 rounded mb-4">
             <p className="text-gray-500 italic">Waiting for seekers...</p>
          </div>
          <input type="text" className="w-full p-2 bg-slate-700 rounded" placeholder="Type your guidance..." />
        </section>

        {/* Content Manager (No-Code Entry) */}
        <section className="bg-slate-800 p-5 rounded-xl border border-indigo-500/30">
          <h2 className="text-xl mb-4">Add New Offering</h2>
          <select className="w-full p-2 mb-3 bg-slate-700 rounded">
            <option>Guided Meditation</option>
            <option>Full Moon Circle</option>
          </select>
          <input type="text" className="w-full p-2 mb-3 bg-slate-700 rounded" placeholder="Title of the session..." />
          <button className="w-full bg-indigo-600 py-2 rounded font-bold hover:bg-indigo-500">
            Publish to Veya
          </button>
        </section>
      </div>
    </div>
  );
};

export default SeerDashboard;