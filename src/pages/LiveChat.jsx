import React, { useState } from 'react';

const LiveChat = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [formData, setFormData] = useState({ name: '', sign: '', intention: '' });

  const handleEntry = (e) => {
    e.preventDefault();
    if (formData.name && formData.intention) {
      setHasEntered(true);
      // This sends a "Ding" to your Admin Office (we'll wire that next!)
      localStorage.setItem('last_seeker', JSON.stringify({...formData, time: new Date().toLocaleTimeString()}));
    }
  };

  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="bg-zinc-900 border border-purple-500/30 p-8 rounded-3xl w-full max-w-md shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">Enter the Sanctuary</h2>
          <form onSubmit={handleEntry} className="space-y-4">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-widest">Your Name</label>
              <input required className="w-full bg-black border border-zinc-800 rounded-xl p-3 mt-1 focus:border-purple-500 outline-none" 
                onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-widest">Sun Sign</label>
              <select className="w-full bg-black border border-zinc-800 rounded-xl p-3 mt-1 focus:border-purple-500 outline-none"
                onChange={e => setFormData({...formData, sign: e.target.value})}>
                <option>Aries</option><option>Taurus</option><option>Gemini</option><option>Cancer</option>
                <option>Leo</option><option>Virgo</option><option>Libra</option><option>Scorpio</option>
                <option>Sagittarius</option><option>Capricorn</option><option>Aquarius</option><option>Pisces</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-widest">Your Intention</label>
              <textarea required placeholder="e.g. Love, Career, Spiritual Growth..." className="w-full bg-black border border-zinc-800 rounded-xl p-3 mt-1 h-24 focus:border-purple-500 outline-none"
                onChange={e => setFormData({...formData, intention: e.target.value})} />
            </div>
            <button className="w-full bg-purple-600 py-4 rounded-2xl font-bold hover:bg-purple-500 transition-all shadow-lg">CONNECT WITH VIOLET</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-purple-400 mb-4">The Portal is Open</h1>
      <p className="text-zinc-500">Violet has received your intention for {formData.intention}. Please wait for her to begin the session...</p>
    </div>
  );
};

export default LiveChat;