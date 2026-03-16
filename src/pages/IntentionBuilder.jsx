import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Sparkles, Gem, Leaf, Heart,
  ArrowRight, RefreshCw, Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCrystalImage } from '@/components/crystals/crystalsData';
import { getHerbImage } from '@/components/herbs/herbsData';

const intentions = [
  { id: 'love', label: 'Attract Love', emoji: '💕', color: 'from-rose-500 to-pink-600' },
  { id: 'abundance', label: 'Manifest Abundance', emoji: '✨', color: 'from-amber-500 to-yellow-500' },
  { id: 'protection', label: 'Protection', emoji: '🛡️', color: 'from-blue-500 to-indigo-600' },
  { id: 'healing', label: 'Healing', emoji: '💚', color: 'from-emerald-500 to-teal-600' },
  { id: 'clarity', label: 'Clarity & Wisdom', emoji: '🔮', color: 'from-violet-500 to-purple-600' },
  { id: 'peace', label: 'Inner Peace', emoji: '🕊️', color: 'from-cyan-500 to-blue-500' },
  { id: 'confidence', label: 'Confidence', emoji: '🦁', color: 'from-orange-500 to-red-500' },
  { id: 'creativity', label: 'Creativity', emoji: '🎨', color: 'from-fuchsia-500 to-pink-500' }
];

const ritualSuggestions = {
  love: {
    crystal: 'Rose Quartz',
    herb: 'Rose',
    candle: 'Pink or Red',
    candleHex: '#F472B6',
    affirmation: 'I am worthy of deep, unconditional love. Love flows to me and through me effortlessly.',
    focus: 'Open your heart chakra. Visualize yourself surrounded by those who cherish you. Feel the warmth of love already present in your life.',
    timing: 'Friday evening or during a waxing moon'
  },
  abundance: {
    crystal: 'Citrine',
    herb: 'Cinnamon',
    candle: 'Gold or Green',
    candleHex: '#F59E0B',
    affirmation: 'Abundance flows to me in expected and unexpected ways. I am a magnet for prosperity.',
    focus: 'Activate your solar plexus chakra. Visualize golden coins flowing toward you. Feel gratitude for all you already have.',
    timing: 'Thursday or during a new moon'
  },
  protection: {
    crystal: 'Black Tourmaline',
    herb: 'Sage',
    candle: 'Black or White',
    candleHex: '#374151',
    affirmation: 'I am surrounded by divine protection. Only love and light may enter my space.',
    focus: 'Visualize a shield of golden light around you. Feel safe and secure in your sacred space.',
    timing: 'Saturday or during a waning moon'
  },
  healing: {
    crystal: 'Amethyst',
    herb: 'Lavender',
    candle: 'Blue or Purple',
    candleHex: '#8B5CF6',
    affirmation: 'My body, mind, and spirit are healing. I release all that no longer serves me.',
    focus: 'Send loving energy to any part of yourself that needs healing. Visualize violet light washing through you.',
    timing: 'Wednesday or during a full moon'
  },
  clarity: {
    crystal: 'Clear Quartz',
    herb: 'Bay Laurel',
    candle: 'White or Yellow',
    candleHex: '#FBBF24',
    affirmation: 'I trust my inner wisdom. Clarity comes easily to me. I see my path clearly.',
    focus: 'Activate your third eye chakra. Ask your question and sit in stillness, allowing answers to arise.',
    timing: 'Monday or during a full moon'
  },
  peace: {
    crystal: 'Selenite',
    herb: 'Chamomile',
    candle: 'White or Light Blue',
    candleHex: '#93C5FD',
    affirmation: 'I am calm. I am centered. Peace flows through every cell of my being.',
    focus: 'Breathe deeply and slowly. Release tension with each exhale. Imagine floating on calm waters.',
    timing: 'Sunday or during a waning moon'
  },
  confidence: {
    crystal: 'Tiger\'s Eye',
    herb: 'Ginger',
    candle: 'Orange or Gold',
    candleHex: '#EA580C',
    affirmation: 'I am powerful. I am capable. I trust myself completely.',
    focus: 'Stand tall and feel energy rising from the earth through your body. You are unstoppable.',
    timing: 'Tuesday or during a waxing moon'
  },
  creativity: {
    crystal: 'Carnelian',
    herb: 'Jasmine',
    candle: 'Orange or Yellow',
    candleHex: '#FB923C',
    affirmation: 'Creative energy flows through me freely. I am a channel for divine inspiration.',
    focus: 'Open your sacral chakra. Allow ideas to flow without judgment. Dance, draw, or move your body.',
    timing: 'Wednesday or during a waxing moon'
  }
};

export default function IntentionBuilder() {
  const [selectedIntention, setSelectedIntention] = useState(null);
  const [showRitual, setShowRitual] = useState(false);

  const ritual = selectedIntention ? ritualSuggestions[selectedIntention] : null;
  const intention = intentions.find(i => i.id === selectedIntention);

  const reset = () => {
    setSelectedIntention(null);
    setShowRitual(false);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Flame className="w-10 h-10 text-amber-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Intention Ritual Builder
            </h1>
            <p className="text-purple-100/70 text-lg max-w-2xl mx-auto">
              Create a personalized ritual to manifest your deepest intentions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!showRitual && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-light text-white text-center mb-8">
                  What do you wish to manifest?
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {intentions.map((intent) => (
                    <button
                      key={intent.id}
                      onClick={() => setSelectedIntention(intent.id)}
                      className={`p-6 rounded-2xl border transition-all text-center ${
                        selectedIntention === intent.id
                          ? `bg-gradient-to-br ${intent.color} border-transparent`
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-3xl block mb-2">{intent.emoji}</span>
                      <span className={`text-sm ${selectedIntention === intent.id ? 'text-white' : 'text-purple-200/80'}`}>
                        {intent.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button
                    onClick={() => setShowRitual(true)}
                    disabled={!selectedIntention}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full"
                  >
                    Build My Ritual <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {showRitual && ritual && intention && (
              <motion.div
                key="ritual"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-center mb-8">
                  <span className="text-5xl mb-4 block">{intention.emoji}</span>
                  <h2 className="text-3xl font-light text-white">
                    Your {intention.label} Ritual
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Crystal */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Gem className="w-6 h-6 text-amber-400" />
                      <h3 className="text-white font-medium">Crystal</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <img 
                          src={getCrystalImage(ritual.crystal)} 
                          alt={ritual.crystal}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-amber-300 font-medium">{ritual.crystal}</p>
                        <p className="text-purple-200/60 text-sm">Hold during your ritual</p>
                      </div>
                    </div>
                  </div>

                  {/* Herb */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Leaf className="w-6 h-6 text-emerald-400" />
                      <h3 className="text-white font-medium">Herb or Plant</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <img 
                          src={getHerbImage(ritual.herb)} 
                          alt={ritual.herb}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-emerald-300 font-medium">{ritual.herb}</p>
                        <p className="text-purple-200/60 text-sm">Burn, diffuse, or place nearby</p>
                      </div>
                    </div>
                  </div>

                  {/* Candle */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Flame className="w-6 h-6 text-orange-400" />
                      <h3 className="text-white font-medium">Candle Color</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-16 h-16 rounded-xl shadow-lg"
                        style={{ backgroundColor: ritual.candleHex }}
                      />
                      <div>
                        <p className="text-orange-300 font-medium">{ritual.candle}</p>
                        <p className="text-purple-200/60 text-sm">Light with intention</p>
                      </div>
                    </div>
                  </div>

                  {/* Timing */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Moon className="w-6 h-6 text-purple-400" />
                      <h3 className="text-white font-medium">Best Timing</h3>
                    </div>
                    <p className="text-purple-300">{ritual.timing}</p>
                  </div>
                </div>

                {/* Affirmation */}
                <div className="bg-gradient-to-br from-purple-900/50 to-violet-900/50 border border-purple-500/20 rounded-2xl p-8 mb-6 text-center">
                  <Heart className="w-8 h-8 text-rose-400 mx-auto mb-4" />
                  <h3 className="text-purple-300 text-sm uppercase tracking-wider mb-4">Affirmation</h3>
                  <p className="text-xl text-white/90 font-light italic">
                    "{ritual.affirmation}"
                  </p>
                </div>

                {/* Focus */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                  <h3 className="text-amber-300 text-sm uppercase tracking-wider mb-3">
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    Spiritual Focus
                  </h3>
                  <p className="text-white/90">{ritual.focus}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={createPageUrl('Services')}>
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full w-full sm:w-auto">
                      Deepen with a Reading
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={reset}
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Choose Another Intention
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
