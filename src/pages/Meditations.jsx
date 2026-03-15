import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon, Wind, Zap, Shield, Star, Music, Radio, Lock, Gift } from 'lucide-react';
import MeditationCard from '@/components/meditations/MeditationCard';
import MeditationPlayer from '@/components/meditations/MeditationPlayer';

const FILTERS = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'guided_journeys', label: 'Guided', icon: Moon },
  { id: 'chakra_balancing', label: 'Chakra', icon: Zap },
  { id: 'energy_cleansing', label: 'Cleansing', icon: Wind },
  { id: 'grounding', label: 'Grounding', icon: Star },
  { id: 'protection', label: 'Protection', icon: Shield },
  { id: 'chakra_healing_music', label: 'Healing Music', icon: Music },
  { id: 'ambient_sounds', label: 'Ambient', icon: Radio },
];

export default function Meditations() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeMeditation, setActiveMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const { data: dbMeditations = [] } = useQuery({
    queryKey: ['meditations'],
    queryFn: () => base44.entities.Meditation.list('-created_date', 50),
    initialData: [],
  });

  const filtered = activeFilter === 'all'
    ? dbMeditations
    : dbMeditations.filter(m => m.category === activeFilter);

  const handleSelect = (meditation) => {
    if (!user) return; // locked
    if (activeMeditation?.id === meditation.id) {
      if (meditation.audio_url) setIsPlaying(p => !p);
    } else {
      setActiveMeditation(meditation);
      setIsPlaying(!!meditation.audio_url);
    }
  };

  const handleClose = () => {
    setIsPlaying(false);
    setActiveMeditation(null);
  };

  const isLoggedOut = user === null;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #05020f 0%, #0d0520 40%, #080318 100%)' }}>

      {/* Hero */}
      <div className="relative pt-8 pb-10 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(88,28,135,0.25) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute top-4 right-1/4 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)', filter: 'blur(30px)' }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400/60" />
            <span className="text-amber-400/70 text-xs tracking-widest uppercase font-light">Sacred Sanctuary</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-white mb-3 tracking-wide">
            Meditation Station
          </h1>
          <p className="text-purple-200/55 max-w-lg mx-auto text-sm leading-relaxed">
            Each session is a portal — channeled by Violet to align your chakras, clear your field, and anchor your light.
          </p>
        </motion.div>
      </div>

      {/* Sign-up offer banner for logged-out users */}
      <AnimatePresence>
        {isLoggedOut && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="mx-4 mb-6 max-w-4xl md:mx-auto rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(168,85,247,0.18) 100%)',
              border: '1px solid rgba(251,191,36,0.3)',
            }}
          >
            <div className="px-5 py-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(168,85,247,0.25))' }}>
                  <Gift className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">✨ Free access — create a free account</p>
                  <p className="text-purple-200/60 text-xs mt-0.5">Sign up to unlock all meditations + receive <span className="text-amber-400 font-semibold">free Luna Credits</span> as a welcome gift</p>
                </div>
              </div>
              <button
                onClick={() => base44.auth.redirectToLogin(window.location.href)}
                className="shrink-0 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
              >
                Sign Up Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Tabs */}
      <div className="px-4 mb-8">
        <div className="max-w-4xl mx-auto overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {FILTERS.map((f) => {
              const active = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-light transition-all whitespace-nowrap"
                  style={active ? {
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.35), rgba(109,40,217,0.25))',
                    border: '1px solid rgba(168,85,247,0.5)',
                    color: 'rgba(233,213,255,1)',
                  } : {
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(196,181,253,0.5)',
                  }}
                >
                  <f.icon className="w-3.5 h-3.5" />
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 pb-40">
        <div className="max-w-4xl mx-auto">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-400/25" />
              <p className="text-purple-200/40 text-sm">No meditations in this category yet.</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filtered.map((med) => (
                  <div key={med.id} className="relative">
                    <MeditationCard
                      meditation={med}
                      isActive={activeMeditation?.id === med.id}
                      isPlaying={activeMeditation?.id === med.id && isPlaying}
                      onSelect={handleSelect}
                    />
                    {/* Lock overlay for logged-out users */}
                    {isLoggedOut && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center cursor-pointer"
                        style={{
                          background: 'rgba(5,2,15,0.72)',
                          backdropFilter: 'blur(3px)',
                          border: '1px solid rgba(168,85,247,0.2)',
                        }}
                        onClick={() => base44.auth.redirectToLogin(window.location.href)}
                      >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                          style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(251,191,36,0.2))', border: '1px solid rgba(251,191,36,0.3)' }}>
                          <Lock className="w-5 h-5 text-amber-400" />
                        </div>
                        <p className="text-white text-xs font-medium mb-1">Members Only</p>
                        <p className="text-purple-200/50 text-xs">Sign up — it's free</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Sticky Player */}
      <AnimatePresence>
        {activeMeditation && (
          <MeditationPlayer
            meditation={activeMeditation}
            isPlaying={isPlaying}
            onPlayPause={setIsPlaying}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}