import React, { useState } from 'react';

const Home = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const services = [
    { title: "Full Tarot Reading", desc: "A comprehensive tarot spread revealing the energies surrounding your path, relationships, and soul's journey.", price: "$44", link: "https://buy.stripe.com/9B69AMajMe3JfgLdTYd3i08" },
    { title: "Mediumship Reading", desc: "Connect with loved ones who have crossed over. Receive messages, healing, and closure from the other side.", price: "$88", link: "https://buy.stripe.com/28E7sEgIa0cT2tZcPUd3i07" },
    { title: "Distant Reiki Healing", desc: "A distant energy healing session to clear blockages, restore balance, and activate your body's natural healing.", price: "$33", link: "https://buy.stripe.com/00wbIUeA24t9c4z6rwd3i06" },
    { title: "Lightworker Ritual Candle", desc: "A sacred candle ritual performed on your behalf ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â choose your intention and share your story for a deeply personalized working.", price: "$22", link: "https://buy.stripe.com/cN26oAgIaf7N4WabJ1d3i05" },
    { title: "Live Personal Guidance", desc: "Receive direct personal guidance from me during a live session. Only available while I am online and live.", price: "Credits", link: "/Login" },
    { title: "First Chat Session", desc: "Your first chat message is FREE ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â one question answered with a 3-card tarot draw. A gift for new seekers.", price: "FREE", link: "/LiveChat" }
  ];

  return (
    <div className="bg-black text-white selection:bg-purple-500/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
        <h1 className="relative z-10 text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Illuminate Your <br/><span className="text-purple-400 italic font-serif">Spiritual Path</span>
        </h1>
        <p className="relative z-10 text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
          Receive personalized psychic readings and spiritual guidance to help you navigate life's journey with clarity and confidence.
        </p>
        <div className="relative z-10 animate-bounce text-zinc-600 mt-10">
          <p className="text-[10px] uppercase tracking-[0.4em] mb-2">Scroll to Begin</p>
          <span>ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Å“</span>
        </div>
      </section>

      {/* 2. DAILY GUIDANCE & TAROT CARD */}
      <section className="py-24 px-6 bg-zinc-950/50 border-y border-white/5">
        <div className="max-w-5xl mx-auto border border-purple-500/20 rounded-[60px] p-8 md:p-16 backdrop-blur-md bg-zinc-900/10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-purple-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src="https://www.sacred-texts.com/tarot/pkt/img/ar17.jpg" 
                alt="The Star Tarot Card" 
                className="relative w-56 h-auto rounded-2xl border-2 border-purple-500/40 shadow-2xl transform hover:rotate-2 transition-transform duration-500"
              />
              <div className="mt-4 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold">The Star</span>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-purple-400 mb-6 font-bold">Inspirational Channeled Message</h2>
              <p className="text-2xl md:text-3xl font-serif italic mb-10 leading-relaxed text-zinc-200">
                "Trust the veil as it thins today. Your intuition is not a whisper, but a compass. What you seek is already seeking you."
              </p>
              
              {/* GOLD PULSATING BUTTON */}
              <div className="relative inline-block">
                <button 
                  onClick={() => window.location.href='https://buy.stripe.com/9B69AMajMe3JfgLdTYd3i08'}
                  className="relative z-10 px-12 py-5 bg-white text-black rounded-full font-bold hover:bg-purple-600 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  Book Your Reading Now
                </button>
                <div className="absolute inset-0 rounded-full animate-ping bg-yellow-400/30 -z-0"></div>
                <div className="absolute -top-14 -right-8 md:-right-16 bg-purple-600 text-white text-[10px] px-4 py-2 rounded-2xl rounded-bl-none font-bold animate-pulse whitespace-nowrap border border-white/20 shadow-2xl">
                   ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬ Connect Now Instantly!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OFFERINGS MENU */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center tracking-tighter">Book Your Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="p-10 rounded-[40px] bg-zinc-900/20 border border-zinc-800/50 hover:border-purple-500/30 transition-all flex flex-col justify-between group">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 mb-2">{s.title}</h3>
                <p className="text-purple-400 text-sm font-bold mb-4">{s.price}</p>
                <p className="text-zinc-500 text-sm mb-8">{s.desc}</p>
              </div>
              <button onClick={() => window.location.href=s.link} className="w-full py-4 rounded-2xl border border-zinc-800 text-sm font-bold hover:bg-white hover:text-black transition-all">
                {s.price === "FREE" ? "Claim Free Chat" : "Book Now"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. GET TO KNOW VIOLET */}
      <section className="py-32 px-6 bg-zinc-950/80 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 relative">
            <img 
              src="https://meditationvaultcali.s3.us-west-1.amazonaws.com/Psychic+Violet.png" 
              alt="Violet" 
              className="relative w-full aspect-[4/5] object-cover rounded-[60px] border border-white/10 shadow-2xl"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-purple-400 mb-6 font-bold">Your Spiritual Guide</h2>
            <h3 className="text-5xl font-bold mb-8 tracking-tighter">A Trusted Voice on Your Journey</h3>
            <p className="text-zinc-400 leading-relaxed mb-10 text-lg italic">
              "With over 15 years of dedicated practice in psychic readings, tarot, and spiritual counseling, I have helped thousands of seekers find clarity, peace, and direction in their lives."
            </p>
            <div className="grid grid-cols-3 gap-4 mb-12 text-center border-y border-white/5 py-8">
              <div><p className="text-3xl font-bold">15+</p><p className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">Years Experience</p></div>
              <div><p className="text-3xl font-bold">10K+</p><p className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">Readings Given</p></div>
              <div><p className="text-3xl font-bold">5.0</p><p className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">Average Rating</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* MEGA FOOTER */}
            {/* REFINED MEGA FOOTER */}
      <footer className="bg-black border-t border-white/5 pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-24 text-center md:text-left">
            
            <div className="col-span-2 lg:col-span-1 mb-8 lg:mb-0">
              <h4 className="text-2xl font-bold tracking-tighter mb-4">VEYA</h4>
              <p className="text-zinc-600 text-xs leading-relaxed uppercase tracking-widest">
                Illuminating your soul path <br/> through ancient wisdom.
              </p>
            </div>

            <div>
              <h5 className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold mb-8">Pathways</h5>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/Services" className="hover:text-white transition-colors">Book a Reading</a></li>
                <li><a href="/Meditations" className="hover:text-white transition-colors">Meditations</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold mb-8">The Wisdom</h5>
              <ul className="space-y-4 text-sm text-zinc-400 font-light">
                <li><a href="#" className="hover:text-white transition-colors underline decoration-purple-500/30">Chakra Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors underline decoration-purple-500/30">Crystal Directory</a></li>
                <li><a href="#" className="hover:text-white transition-colors underline decoration-purple-500/30">Tarot Meanings</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold mb-8">Sanctuary</h5>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="/Login" className="hover:text-white transition-colors font-bold text-white">Member Login</a></li>
                <li><a href="/Login" className="hover:text-white transition-colors">Credits & Bundles</a></li>
                <li><a href="#" className="hover:text-white transition-colors italic text-zinc-500">Join the Circle</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold mb-8">Events</h5>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Full Moon Circle</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Live Rituals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] text-zinc-700 tracking-[0.4em] uppercase font-bold">Ã‚Â© 2026 VIOLET FLAME HOLISTICS</p>
            <div className="flex gap-8 text-[9px] text-zinc-700 tracking-[0.2em] uppercase font-bold">
              <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;