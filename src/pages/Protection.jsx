import React from 'react';

const Protection = () => {
  const guides = [
    {
      title: "Home Cleansing",
      level: "Beginner",
      subtitle: "Smoke Cleansing Your Home",
      desc: "A sacred ritual to clear negative energy from your living space.",
      time: "20-30 minutes",
      steps: ["Open all windows", "Light your bundle (Sage, Palo Santo, or Cedar)", "Walk clockwise starting from the front door", "Focus on corners and mirrors"]
    },
    {
      title: "Grounding Practices",
      level: "Essential",
      subtitle: "Emergency Grounding Technique",
      desc: "Quick practice for when you feel overwhelmed or anxious.",
      time: "5 minutes",
      steps: ["5 things you see", "4 things you can touch", "3 things you hear", "2 things you smell", "1 thing you can taste"]
    },
    {
      title: "Empath Protection",
      level: "Daily",
      subtitle: "The Empath's Shield",
      desc: "Daily practice to protect sensitive souls from absorbing others' energy.",
      time: "Ongoing",
      steps: ["Visualize a sphere of white light", "Affirm: 'I am safe within my own energy'", "Filter incoming vibrations through the shield"]
    },
    {
      title: "Energy Boundaries",
      level: "Advanced",
      subtitle: "Cord Cutting Ceremony",
      desc: "Release unhealthy energetic attachments to people or situations.",
      time: "15 minutes",
      steps: ["Identify the person/situation", "Visualize the cord connecting you", "Use a mental or ritual blade to sever the bond", "Seal the ends with golden light"]
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-48 px-6 text-white">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold uppercase tracking-tighter italic">Protection & Cleansing</h1>
        <div className="h-px w-24 bg-purple-500 mx-auto mt-4 opacity-50"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {guides.map((g) => (
          <div key={g.title} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[40px] hover:border-purple-500/30 transition-all group">
            <span className="text-[8px] uppercase font-black tracking-[0.3em] text-purple-500">{g.level}</span>
            <h2 className="text-2xl font-bold uppercase mt-2">{g.title}</h2>
            <h3 className="text-sm text-zinc-400 italic mb-4">{g.subtitle}</h3>
            <p className="text-sm text-zinc-500 mb-6">{g.desc}</p>
            
            <div className="pt-6 border-t border-white/5">
              <span className="text-[10px] uppercase font-bold text-zinc-600">Time: {g.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Protection;