import React from 'react';
import Navbar from './components/Navbar';
import CelestialHeader from './components/CelestialHeader';
import NextMoonEvent from './components/NextMoonEvent';
import LearnLibrary from './components/LearnLibrary';
import TarotChat from './components/TarotChat';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <CelestialHeader activeChakra="Crown Chakra" />
      <main className="container mx-auto px-4 py-8 space-y-12">
        <NextMoonEvent />
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TarotChat currentCard="The Fool" />
          <div className="flex flex-col justify-center p-8 bg-indigo-900/20 rounded-3xl border border-indigo-500/30">
            <h2 className="text-3xl font-bold mb-4 text-purple-300">Spiritual Guidance</h2>
            <p className="text-slate-300">Connect with Violet for instant psychic guidance or explore our archives.</p>
          </div>
        </section>
        <LearnLibrary category="Crystals" items={['Amethyst', 'Rose Quartz', 'Citrine']} />
      </main>
    </div>
  );
}
export default App;
