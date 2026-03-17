import React, { useState } from 'react';
const SeerDashboard = () => {
  const [isLive, setIsLive] = useState(false);
  const base = "px-10 py-4 rounded-full font-black text-lg transition-all ";
  const status = isLive ? "bg-green-500 animate-bounce" : "bg-red-600";
  return (
    <div className="p-8 bg-slate-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-purple-400 mb-6">Lyra Command Center</h1>
      <button onClick={() => setIsLive(!isLive)} className={base + status}>
        {isLive ? 'VIOLET IS LIVE' : 'GO LIVE'}
      </button>
    </div>
  );
};
export default SeerDashboard;

