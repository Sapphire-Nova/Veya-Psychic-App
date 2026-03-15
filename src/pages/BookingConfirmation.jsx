import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Moon, ArrowRight } from 'lucide-react';

const tarotCards = [
  { name: 'The Star', symbol: '⭐', meaning: 'Hope, renewal, and divine guidance illuminate your path.' },
  { name: 'The Moon', symbol: '🌙', meaning: 'Intuition deepens. Trust the unseen forces at work.' },
  { name: 'The Sun', symbol: '☀️', meaning: 'Clarity and joy radiate from this sacred exchange.' },
  { name: 'The World', symbol: '🌍', meaning: 'Completion and wholeness — you are exactly where you need to be.' },
  { name: 'The High Priestess', symbol: '🔮', meaning: 'The mysteries are opening. Wisdom awaits within.' },
  { name: 'The Empress', symbol: '👑', meaning: 'Abundance flows toward you. This reading shall nourish your soul.' },
];

export default function BookingConfirmation() {
  const [revealed, setRevealed] = useState(false);
  const [card] = useState(() => tarotCards[Math.floor(Math.random() * tarotCards.length)]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const p = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      size: Math.random() * 4 + 2,
    }));
    setParticles(p);
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type') || 'booking';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Floating particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + p.delay, repeat: Infinity, delay: p.delay }}
        />
      ))}

      {/* Gold orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-lg w-full text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Header */}
          <div className="flex justify-center mb-6">
            <motion.div
              className="p-4 bg-amber-400/20 backdrop-blur-sm rounded-full border border-amber-400/30"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-10 h-10 text-amber-300" />
            </motion.div>
          </div>

          <h1 className="text-3xl md:text-4xl font-light text-white mb-2">
            {type === 'subscription' ? 'Welcome to the Sanctuary' : type === 'coins' ? 'Coins Received!' : 'Booking Confirmed!'}
          </h1>
          <p className="text-purple-200/70 mb-10">
            {type === 'subscription'
              ? 'Your membership has been activated. The universe welcomes you.'
              : type === 'coins'
              ? 'Your Luna Coins have been added to your account.'
              : 'Your reading has been received. A confirmation will follow shortly.'}
          </p>

          {/* Tarot Card Reveal */}
          <div className="mb-10">
            <p className="text-amber-300/80 text-sm mb-4 tracking-widest uppercase">
              ✦ Your card for this moment ✦
            </p>

            <div
              className="relative mx-auto cursor-pointer"
              style={{ width: 200, height: 320 }}
              onClick={() => setRevealed(true)}
            >
              <AnimatePresence mode="wait">
                {!revealed ? (
                  <motion.div
                    key="back"
                    className="absolute inset-0 rounded-2xl border-2 border-amber-400/40 bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center shadow-2xl shadow-purple-900/50"
                    whileHover={{ scale: 1.03 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">🌟</div>
                      <p className="text-amber-300/60 text-sm">Tap to reveal</p>
                      <p className="text-purple-200/40 text-xs mt-1">your message</p>
                    </div>
                    {/* Card border decoration */}
                    <div className="absolute inset-3 rounded-xl border border-amber-400/20" />
                    <div className="absolute inset-4 rounded-xl border border-amber-400/10" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="front"
                    className="absolute inset-0 rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center p-6 shadow-2xl shadow-amber-900/30"
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="text-7xl mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {card.symbol}
                    </motion.div>
                    <div className="text-amber-300 font-medium text-lg mb-3">{card.name}</div>
                    <p className="text-purple-200/80 text-xs text-center leading-relaxed italic">
                      "{card.meaning}"
                    </p>
                    <div className="absolute inset-3 rounded-xl border border-amber-400/20" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Stars decoration */}
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={createPageUrl('Home')}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium shadow-lg shadow-amber-500/25 flex items-center gap-2"
              >
                Return Home <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link to={createPageUrl('DailyGuidance')}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <Moon className="w-4 h-4" /> Today's Guidance
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}