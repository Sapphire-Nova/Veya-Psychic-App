import React from 'react';

const Services = () => {
  const offerings = [
    { 
      title: "Full Tarot Reading", 
      price: "$44", 
      desc: "A comprehensive tarot spread revealing the energies surrounding your path, relationships, and soul's journey.",
      link: "https://buy.stripe.com/9B69AMajMe3JfgLdTYd3i08" 
    },
    { 
      title: "Mediumship Reading", 
      price: "$88", 
      desc: "Connect with loved ones who have crossed over. Receive messages, healing, and closure from the other side.",
      link: "https://buy.stripe.com/28E7sEgIa0cT2tZcPUd3i07" 
    },
    { 
      title: "Distant Reiki Healing", 
      price: "$33", 
      desc: "A distant energy healing session to clear blockages, restore balance, and activate your body's natural healing.",
      link: "https://buy.stripe.com/00wbIUeA24t9c4z6rwd3i06" 
    },
    { 
      title: "Lightworker Ritual Candle", 
      price: "$22", 
      desc: "A sacred candle ritual performed on your behalf ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â choose your intention and share your story.",
      link: "https://buy.stripe.com/cN26oAgIaf7N4WabJ1d3i05" 
    },
    { 
      title: "Live Personal Guidance", 
      price: "Credits", 
      desc: "Receive direct personal guidance from me during a live session. Only available while I am online.",
      link: "/Login" 
    },
    { 
      title: "First Chat Session", 
      price: "FREE", 
      desc: "Your first chat message is FREE ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â one question answered with a 3-card tarot draw.",
      link: "/LiveChat" 
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen bg-black text-white">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Spiritual Services</h1>
        <p className="text-zinc-500 italic">Select the path that calls to your soul today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {offerings.map((s, i) => (
          <div key={i} className="bg-zinc-900/30 p-8 rounded-[40px] border border-zinc-800 hover:border-purple-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold group-hover:text-purple-300 transition-colors">{s.title}</h2>
                <span className="text-purple-400 font-bold font-mono">{s.price}</span>
              </div>
              <p className="text-zinc-500 leading-relaxed mb-8">{s.desc}</p>
            </div>
            
            <button 
              onClick={() => window.location.href=s.link}
              className="w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-purple-600 hover:text-white transition-all transform active:scale-95"
            >
              {s.price === "FREE" ? "CLAIM FREE SESSION" : s.price === "Credits" ? "USE CREDITS" : "BOOK NOW"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20 p-10 rounded-[40px] bg-purple-900/10 border border-purple-500/20 text-center">
        <h3 className="text-xl font-bold mb-4 text-purple-300">Need a Custom Ritual?</h3>
        <p className="text-zinc-500 mb-6 max-w-2xl mx-auto">If you are seeking a specialized working or a long-form mentorship, please reach out via live chat or during my office hours.</p>
        <button onClick={() => window.location.href='/LiveChat'} className="text-purple-400 font-bold hover:underline tracking-widest uppercase text-xs">Contact the Priestess ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢</button>
      </div>
    </div>
  );
};

export default Services;