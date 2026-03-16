import React, { useState } from 'react';

const Meditations = () => {
  const tracks = [
    {
      title: "The Seven Gates",
      subtitle: "Full Chakra Alignment",
      url: "https://veya-meditation-audio.s3.us-east-2.amazonaws.com/The+Seven+Gates+(Full+Chakra+Alignment)+meditation.mp3",
      desc: "A journey through the seven energy centers to restore balance and flow.",
      color: "from-purple-600 to-indigo-900"
    },
    {
      title: "The Celestial Sleep",
      subtitle: "Deep Rest Journey",
      url: "https://veya-meditation-audio.s3.us-east-2.amazonaws.com/The+Celestial+Sleep+Journey+(Deep+Rest)+meditation.wav",
      desc: "Surrender to the stars and drift into a profound, restorative slumber.",
      color: "from-blue-900 to-black"
    },
    {
      title: "Ocean of Emotional Release",
      subtitle: "Shadow Work",
      url: "https://veya-meditation-audio.s3.us-east-2.amazonaws.com/The+Ocean+of+Emotional+Release+(Shadow+Work)+meditation.mp3",
      desc: "Wash away heavy emotions and embrace the healing tides of the shadow.",
      color: "from-teal-900 to-emerald-950"
    },
    {
      title: "Grounding Meditation",
      subtitle: "Earth Connection",
      url: "https://veya-meditation-audio.s3.us-east-2.amazonaws.com/GroungingMeditation.mp3",
      desc: "Anchor your energy deep into the Earth to find stability and presence.",
      color: "from-orange-900 to-red-950"
    },
    {
      title: "Temple of the Higher Self",
      subtitle: "Divine Connection",
      url: "https://veya-meditation-audio.s3.us-east-2.amazonaws.com/The+Temple+of+the+Higher+Self+meditation.mp3",
      desc: "Step into your inner temple to hear the whispers of your soul's wisdom.",
      color: "from-purple-500 to-pink-900"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <h1 className="text-5xl font-bold uppercase tracking-tighter text-white mb-6">Guided Meditations</h1>
        <p className="text-zinc-500 italic max-w-2xl mx-auto text-lg">"Close your eyes, breathe into the present, and let my voice guide you home."</p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {tracks.map((track, i) => (
          <div key={i} className={`relative overflow-hidden p-8 md:p-12 rounded-[50px] border border-white/10 bg-gradient-to-r ${track.color} shadow-2xl group`}>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black mb-2">{track.subtitle}</h3>
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">{track.title}</h2>
                <p className="text-white/70 max-w-md text-sm leading-relaxed">{track.desc}</p>
              </div>

              <div className="w-full md:w-auto bg-black/30 p-4 rounded-3xl backdrop-blur-md border border-white/10">
                <audio controls className="w-full md:w-72 accent-purple-500">
                  <source src={track.url} type={track.url.endsWith('.wav') ? 'audio/wav' : 'audio/mpeg'} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            {/* Subtle light effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -mr-20 -mt-20 group-hover:bg-white/10 transition-all duration-700"></div>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.5em] mb-8 font-bold text-white/40">Exclusive for Sanctuary Members</p>
        <button onClick={() => window.location.href='/Login'} className="px-10 py-4 border border-purple-500/40 text-purple-400 rounded-full hover:bg-purple-500/10 transition-all font-bold tracking-widest text-xs">UNLOCK THE FULL VAULT</button>
      </div>
    </div>
  );
};

export default Meditations;