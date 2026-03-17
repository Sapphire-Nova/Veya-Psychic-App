import React, { useState } from 'react';

const SeerDashboard = () => {
  const [isLive, setIsLive] = useState(false);
  const [s3Url, setS3Url] = useState('');
  const [offeringTitle, setOfferingTitle] = useState('');

  const handlePublish = () => {
    console.log("Publishing to Veya Library:", { title: offeringTitle, url: s3Url });
    alert("Offering Published! Check your Learn Library.");
    setS3Url('');
    setOfferingTitle('');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-slate-900 text-white min-h-screen font-sans">
      <header className="flex justify-between items-center border-b border-purple-500 pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Lyra Command Center</h1>
          <p className="text-gray-400 mt-1">Manage Veya Psychic App & Luna Credits</p>
        </div>
        <button 
          onClick={() => setIsLive(!isLive)}
          className={px-10 py-4 rounded-full font-black text-lg transition-all shadow-lg \}
        >
          {isLive ? 'VIOLET IS LIVE' : 'GO LIVE'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="bg-slate-800/50 p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6 text-purple-300">Content & Media Manager</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Offering Title</label>
              <input 
                value={offeringTitle}
                onChange={(e) => setOfferingTitle(e.target.value)}
                type="text" 
                className="w-full p-3 bg-slate-700 rounded-lg border border-slate-600 focus:border-purple-500 outline-none" 
                placeholder="e.g., Full Moon in Aries Ritual" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">S3 Image/Audio URL</label>
              <input 
                value={s3Url}
                onChange={(e) => setS3Url(e.target.value)}
                type="text" 
                className="w-full p-3 bg-slate-700 rounded-lg border border-slate-600 focus:border-purple-500 outline-none" 
                placeholder="https://your-s3-bucket.s3.amazonaws.com/image.jpg" 
              />
            </div>
            <button 
              onClick={handlePublish}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-lg font-bold text-xl hover:from-indigo-500 hover:to-purple-500 transition-all transform hover:scale-[1.02]"
            >
              Publish to Veya Library
            </button>
          </div>
        </section>

        <section className="bg-slate-800/50 p-8 rounded-2xl border border-indigo-500/20 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6 text-indigo-300">Live Reading Portal</h2>
          <div className="h-48 flex items-center justify-center border-2 border-dashed border-slate-700 rounded-xl mb-4">
            <p className="text-gray-500 italic">No active requests. Toggle LIVE to attract seekers.</p>
          </div>
          <div className="bg-indigo-900/30 p-4 rounded-lg">
             <p className="text-sm text-indigo-200">Current Rate: <span className="font-bold text-white">3 Luna Credits</span> per message</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SeerDashboard;
