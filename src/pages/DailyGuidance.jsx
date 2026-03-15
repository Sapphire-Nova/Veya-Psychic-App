import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Moon, Sun, Sparkles, Layers, Heart, 
  ArrowRight, RefreshCw, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { getAllTarotCards, getTarotCardImage } from '@/components/tarot/tarotData';
import { chakraData, getChakraById } from '@/components/chakras/chakraData';

const chakraColors = {
  root: 'from-red-500 to-red-700',
  sacral: 'from-orange-500 to-orange-700',
  solar_plexus: 'from-yellow-500 to-amber-600',
  heart: 'from-green-500 to-emerald-700',
  throat: 'from-blue-400 to-blue-600',
  third_eye: 'from-indigo-500 to-indigo-700',
  crown: 'from-violet-500 to-purple-700'
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

export default function DailyGuidance() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [isGenerating, setIsGenerating] = useState(false);
  const [dailyData, setDailyData] = useState(null);

  const { data: existingExperience, isLoading } = useQuery({
    queryKey: ['dailyExperience', today],
    queryFn: () => base44.entities.DailyExperience.filter({ date: today }),
    initialData: []
  });

  useEffect(() => {
    if (existingExperience?.length > 0) {
      setDailyData(existingExperience[0]);
    } else if (!isLoading && !dailyData) {
      generateDailyGuidance();
    }
  }, [existingExperience, isLoading]);

  const generateDailyGuidance = async () => {
    setIsGenerating(true);
    
    const cards = getAllTarotCards();
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    const chakras = ['root', 'sacral', 'solar_plexus', 'heart', 'throat', 'third_eye', 'crown'];
    const randomChakra = chakras[Math.floor(Math.random() * chakras.length)];

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a mystic priestess channeling divine guidance. Today's date is ${today}. 
      The tarot card drawn is "${randomCard.name}" and the chakra focus is the ${chakraNames[randomChakra]}.
      
      Create today's spiritual guidance in JSON format with these fields:
      - channeled_message: A 2-3 sentence mystical message channeled for today (warm, wise, nurturing tone)
      - tarot_insight: A brief insight about the ${randomCard.name} card for today (1-2 sentences)
      - chakra_message: A brief message about working with the ${chakraNames[randomChakra]} today (1-2 sentences)
      - action_step: One simple spiritual practice to do today (1 sentence)
      - affirmation: A powerful affirmation for today`,
      response_json_schema: {
        type: "object",
        properties: {
          channeled_message: { type: "string" },
          tarot_insight: { type: "string" },
          chakra_message: { type: "string" },
          action_step: { type: "string" },
          affirmation: { type: "string" }
        },
        required: ["channeled_message", "tarot_insight", "chakra_message", "action_step", "affirmation"]
      }
    });

    const newExperience = {
      date: today,
      channeled_message: response.channeled_message,
      tarot_card: randomCard.name,
      tarot_insight: response.tarot_insight,
      chakra_focus: randomChakra,
      chakra_message: response.chakra_message,
      action_step: response.action_step,
      affirmation: response.affirmation
    };

    await base44.entities.DailyExperience.create(newExperience);
    setDailyData(newExperience);
    setIsGenerating(false);
  };

  if (isLoading || isGenerating) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Moon className="w-10 h-10 text-white" />
          </div>
          <p className="text-purple-200/70 text-lg">Channeling today's guidance...</p>
        </motion.div>
      </div>
    );
  }

  if (!dailyData) return null;

  const tarotCard = getAllTarotCards().find(c => c.name === dailyData.tarot_card);
  const chakra = getChakraById(dailyData.chakra_focus);

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
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-amber-300" />
              <span className="text-amber-300">{format(new Date(), 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Your Daily Guidance
            </h1>
            <p className="text-purple-100/70 text-lg">
              Sacred wisdom channeled for your journey today
            </p>
          </motion.div>
        </div>
      </section>

      {/* Channeled Message */}
      <section className="py-12 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-900/50 to-violet-900/50 border border-purple-500/20 rounded-3xl p-8 md:p-12 text-center"
          >
            <Moon className="w-12 h-12 text-amber-300 mx-auto mb-6" />
            <h2 className="text-sm uppercase tracking-wider text-purple-300 mb-4">Channeled Message</h2>
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed italic">
              "{dailyData.channeled_message}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tarot & Chakra Cards */}
      <section className="py-12 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Tarot Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Card of the Day</h3>
                <p className="text-purple-200/60 text-sm">Tarot Guidance</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center mb-6">
              <div className="w-40 h-64 rounded-xl overflow-hidden shadow-2xl shadow-purple-500/20 mb-4">
                <img 
                  src={getTarotCardImage(dailyData.tarot_card)} 
                  alt={dailyData.tarot_card}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl text-amber-300 font-medium">{dailyData.tarot_card}</h4>
            </div>
            
            <p className="text-white/80 text-center">{dailyData.tarot_insight}</p>
            
            <Link to={createPageUrl('Tarot')} className="block mt-6">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                Explore Full Tarot Library <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Chakra Focus */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 bg-gradient-to-br ${chakraColors[dailyData.chakra_focus]} rounded-xl flex items-center justify-center`}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Chakra Focus</h3>
                <p className="text-purple-200/60 text-sm">Energy Center of the Day</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center mb-6">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${chakraColors[dailyData.chakra_focus]} flex items-center justify-center mb-4 shadow-2xl`}>
                <span className="text-5xl">{chakra?.number || '✧'}</span>
              </div>
              <h4 className="text-xl text-white font-medium">{chakraNames[dailyData.chakra_focus]}</h4>
              {chakra && <p className="text-purple-200/60 text-sm">{chakra.sanskritName}</p>}
            </div>
            
            <p className="text-white/80 text-center">{dailyData.chakra_message}</p>
            
            <Link to={createPageUrl('ChakraDetail') + `?id=${dailyData.chakra_focus}`} className="block mt-6">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                Learn About This Chakra <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Action Step & Affirmation */}
      <section className="py-12 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-emerald-900/30 border border-emerald-500/20 rounded-2xl p-6"
          >
            <Sun className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-emerald-300 text-sm uppercase tracking-wider mb-2">Today's Action Step</h3>
            <p className="text-white/90">{dailyData.action_step}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-rose-900/30 border border-rose-500/20 rounded-2xl p-6"
          >
            <Heart className="w-8 h-8 text-rose-400 mb-4" />
            <h3 className="text-rose-300 text-sm uppercase tracking-wider mb-2">Daily Affirmation</h3>
            <p className="text-white/90 italic">"{dailyData.affirmation}"</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-950 to-purple-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-light text-white mb-4">
            Seeking Deeper Guidance?
          </h2>
          <p className="text-purple-100/70 mb-8">
            Book a personal reading with the Mystic Priestess for personalized spiritual insight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('BookReading')}>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full">
                Book a Reading
              </Button>
            </Link>
            <Link to={createPageUrl('ChakraCheckIn')}>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-full">
                Chakra Check-In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}