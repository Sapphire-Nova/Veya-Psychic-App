import React from 'react';

const UserProfile = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <div className="bg-zinc-900/40 border border-purple-500/20 rounded-3xl p-10 backdrop-blur-md">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-3xl shadow-lg">✨</div>
          <div>
            <h1 className="text-3xl font-bold">Your Soul Profile</h1>
            <p className="text-zinc-400 italic">"Energy flows where intention goes."</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800">
            <p className="text-zinc-500 text-sm uppercase tracking-widest">Luna Credits</p>
            <p className="text-4xl font-bold text-purple-400 mt-2">100</p>
          </div>
          <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800">
            <p className="text-zinc-500 text-sm uppercase tracking-widest">Current Status</p>
            <p className="text-xl font-bold text-green-400 mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Seekers Path
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Reading History</h2>
        <div className="space-y-4">
          <p className="text-zinc-600 italic">No previous readings found. Book your first session to begin your journey!</p>
          <button onClick={() => window.location.href="/Services"} className="mt-4 px-6 py-3 bg-purple-600 rounded-xl font-bold hover:bg-purple-500 transition-all">
            BOOK A READING
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
