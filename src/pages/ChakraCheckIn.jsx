import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Sparkles, ArrowRight, ArrowLeft, 
  Gem, Leaf, RefreshCw, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { chakraData, getChakraById } from '@/components/chakras/chakraData';
import { crystalsData, getCrystalImage } from '@/components/crystals/crystalsData';
import { herbsData, getHerbImage } from '@/components/herbs/herbsData';

const feelings = [
  { id: 'anxious', label: 'Anxious or Fearful', emoji: '😰', chakras: ['root', 'solar_plexus'] },
  { id: 'disconnected', label: 'Disconnected from Body', emoji: '🌫️', chakras: ['root'] },
  { id: 'uncreative', label: 'Creatively Blocked', emoji: '🎨', chakras: ['sacral'] },
  { id: 'emotionally_numb', label: 'Emotionally Numb', emoji: '😶', chakras: ['sacral', 'heart'] },
  { id: 'powerless', label: 'Powerless or Stuck', emoji: '⚡', chakras: ['solar_plexus'] },
  { id: 'low_confidence', label: 'Low Self-Confidence', emoji: '🪞', chakras: ['solar_plexus'] },
  { id: 'heartbroken', label: 'Heartbroken or Grief', emoji: '💔', chakras: ['heart'] },
  { id: 'unable_to_love', label: 'Unable to Give/Receive Love', emoji: '🤍', chakras: ['heart'] },
  { id: 'cant_speak', label: "Can't Express Yourself", emoji: '🤐', chakras: ['throat'] },
  { id: 'not_heard', label: 'Feeling Unheard', emoji: '👂', chakras: ['throat'] },
  { id: 'confused', label: 'Confused or Indecisive', emoji: '🌀', chakras: ['third_eye'] },
  { id: 'no_intuition', label: 'Disconnected from Intuition', emoji: '🔮', chakras: ['third_eye'] },
  { id: 'spiritually_lost', label: 'Spiritually Lost', emoji: '✨', chakras: ['crown'] },
  { id: 'disconnected_purpose', label: 'No Sense of Purpose', emoji: '🧭', chakras: ['crown', 'solar_plexus'] }
];

const chakraRecommendations = {
  root: {
    crystal: 'Black Tourmaline',
    herb: 'Cedar',
    practice: 'Stand barefoot on the earth for 5 minutes. Visualize red energy grounding you to the planet.',
    signs: ['Anxiety and fear', 'Financial worries', 'Feeling unsafe', 'Disconnection from body', 'Restlessness']
  },
  sacral: {
    crystal: 'Carnelian',
    herb: 'Jasmine',
    practice: 'Take a warm bath with orange essential oil. Allow yourself to feel pleasure without guilt.',
    signs: ['Creative blocks', 'Emotional numbness', 'Intimacy issues', 'Guilt around pleasure', 'Low passion']
  },
  solar_plexus: {
    crystal: 'Citrine',
    herb: 'Ginger',
    practice: 'Stand tall, hands on belly. Breathe deeply and repeat: "I am powerful. I am worthy."',
    signs: ['Low self-esteem', 'Feeling powerless', 'Digestive issues', 'Control issues', 'Lack of direction']
  },
  heart: {
    crystal: 'Rose Quartz',
    herb: 'Rose',
    practice: 'Place hand on heart. Breathe in love, breathe out resentment. Send compassion to yourself first.',
    signs: ['Grief or heartbreak', 'Difficulty with love', 'Jealousy', 'Isolation', 'Lack of empathy']
  },
  throat: {
    crystal: 'Lapis Lazuli',
    herb: 'Chamomile',
    practice: 'Hum or chant for 3 minutes. Speak your truth to yourself in the mirror.',
    signs: ['Fear of speaking up', 'Feeling unheard', 'Sore throat often', 'Dishonesty', 'Poor listening']
  },
  third_eye: {
    crystal: 'Amethyst',
    herb: 'Mugwort',
    practice: 'Close eyes and focus on the space between your brows. Ask your intuition a question and listen.',
    signs: ['Confusion', 'Lack of clarity', 'Ignoring gut feelings', 'Nightmares', 'Headaches']
  },
  crown: {
    crystal: 'Clear Quartz',
    herb: 'Frankincense',
    practice: 'Sit in silence. Imagine white light entering through the top of your head, filling your entire being.',
    signs: ['Spiritual disconnection', 'Feeling lost', 'Lack of purpose', 'Cynicism', 'Disconnection from others']
  }
};

const chakraColors = {
  root: { bg: 'from-red-500 to-red-700', text: 'text-red-400', border: 'border-red-500/30' },
  sacral: { bg: 'from-orange-500 to-orange-700', text: 'text-orange-400', border: 'border-orange-500/30' },
  solar_plexus: { bg: 'from-yellow-500 to-amber-600', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  heart: { bg: 'from-green-500 to-emerald-700', text: 'text-green-400', border: 'border-green-500/30' },
  throat: { bg: 'from-blue-400 to-blue-600', text: 'text-blue-400', border: 'border-blue-500/30' },
  third_eye: { bg: 'from-indigo-500 to-indigo-700', text: 'text-indigo-400', border: 'border-indigo-500/30' },
  crown: { bg: 'from-violet-500 to-purple-700', text: 'text-violet-400', border: 'border-violet-500/30' }
};

const chakraNames = {
  root: 'Root Chakra',
  sacral: 'Sacral Chakra',
  solar_plexus: 'Solar Plexus Chakra',
  heart: 'Heart Chakra',
  throat: 'Throat Chakra',
  third_eye: 'Third Eye Chakra',
  crown: 'Crown Chakra'
};

export default function ChakraCheckIn() {
  const [step, setStep] = useState('select'); // select, result
  const [selectedFeelings, setSelectedFeelings] = useState([]);
  const [resultChakra, setResultChakra] = useState(null);

  const toggleFeeling = (id) => {
    setSelectedFeelings(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const analyzeChakras = () => {
    const chakraCounts = {};
    selectedFeelings.forEach(feelingId => {
      const feeling = feelings.find(f => f.id === feelingId);
      feeling?.chakras.forEach(chakra => {
        chakraCounts[chakra] = (chakraCounts[chakra] || 0) + 1;
      });
    });

    const sortedChakras = Object.entries(chakraCounts)
      .sort(([,a], [,b]) => b - a);
    
    if (sortedChakras.length > 0) {
      setResultChakra(sortedChakras[0][0]);
      setStep('result');
    }
  };

  const reset = () => {
    setStep('select');
    setSelectedFeelings([]);
    setResultChakra(null);
  };

  const chakraInfo = resultChakra ? getChakraById(resultChakra) : null;
  const recommendations = resultChakra ? chakraRecommendations[resultChakra] : null;
  const colors = resultChakra ? chakraColors[resultChakra] : null;
  const crystal = recommendations ? crystalsData.find(c => c.name === recommendations.crystal) : null;
  const herb = recommendations ? herbsData.find(h => h.name === recommendations.herb) : null;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-rose-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Heart className="w-10 h-10 text-rose-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Chakra Check-In
            </h1>
            <p className="text-purple-100/70 text-lg max-w-2xl mx-auto">
              Discover which energy center needs your attention based on how you're feeling
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 'select' && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-light text-white mb-2">How are you feeling?</h2>
                  <p className="text-purple-200/60">Select all that resonate with you right now</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {feelings.map((feeling) => (
                    <button
                      key={feeling.id}
                      onClick={() => toggleFeeling(feeling.id)}
                      className={`p-4 rounded-2xl border transition-all text-left ${
                        selectedFeelings.includes(feeling.id)
                          ? 'bg-purple-500/30 border-purple-400/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{feeling.emoji}</span>
                      <span className="text-white text-sm">{feeling.label}</span>
                    </button>
                  ))}
                </div>

                <div className="text-center">
                  <Button
                    onClick={analyzeChakras}
                    disabled={selectedFeelings.length === 0}
                    className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-8 py-4 rounded-full"
                  >
                    Reveal My Chakra <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 'result' && resultChakra && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Result Header */}
                <div className="text-center mb-12">
                  <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-6 shadow-2xl`}>
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-light text-white mb-2">
                    Your <span className={colors.text}>{chakraNames[resultChakra]}</span>
                  </h2>
                  <p className="text-purple-200/70">needs attention and healing</p>
                </div>

                {/* Signs of Imbalance */}
                <div className={`bg-white/5 border ${colors.border} rounded-2xl p-6 mb-6`}>
                  <h3 className={`${colors.text} text-sm uppercase tracking-wider mb-4`}>Signs of Imbalance</h3>
                  <ul className="space-y-2">
                    {recommendations.signs.map((sign, i) => (
                      <li key={i} className="text-white/80 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors.bg}`} />
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Practice */}
                <div className="bg-purple-900/30 border border-purple-500/20 rounded-2xl p-6 mb-6">
                  <h3 className="text-purple-300 text-sm uppercase tracking-wider mb-4">Quick Balancing Practice</h3>
                  <p className="text-white/90">{recommendations.practice}</p>
                </div>

                {/* Crystal & Herb Recommendations */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Gem className="w-6 h-6 text-amber-400" />
                      <h3 className="text-white font-medium">Recommended Crystal</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <img 
                          src={getCrystalImage(recommendations.crystal)} 
                          alt={recommendations.crystal}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-amber-300 font-medium">{recommendations.crystal}</p>
                        {crystal && <p className="text-purple-200/60 text-sm">{crystal.meaning}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Leaf className="w-6 h-6 text-emerald-400" />
                      <h3 className="text-white font-medium">Recommended Herb</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <img 
                          src={getHerbImage(recommendations.herb)} 
                          alt={recommendations.herb}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-emerald-300 font-medium">{recommendations.herb}</p>
                        {herb && <p className="text-purple-200/60 text-sm line-clamp-2">{herb.properties}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={createPageUrl('ChakraDetail') + `?id=${resultChakra}`}>
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-full w-full sm:w-auto">
                      Learn More About This Chakra
                    </Button>
                  </Link>
                  <Link to={createPageUrl('BookReading') + '?type=chakra'}>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-full w-full sm:w-auto">
                      Book Chakra Reading
                    </Button>
                  </Link>
                </div>

                <div className="text-center mt-8">
                  <button onClick={reset} className="text-purple-300 hover:text-white flex items-center gap-2 mx-auto">
                    <RefreshCw className="w-4 h-4" />
                    Start Over
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}