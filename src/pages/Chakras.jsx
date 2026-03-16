import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { chakraData } from '@/components/chakras/chakraData';
import ChakraSymbol from '@/components/chakras/ChakraSymbol';

export default function Chakras() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Sparkles className="w-10 h-10 text-amber-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
              The Seven Chakras
            </h1>
            <p className="text-purple-100/70 text-lg max-w-2xl mx-auto">
              Discover the energy centers that govern your physical, emotional, and spiritual wellbeing. 
              Learn to recognize imbalances and restore harmony within.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chakra Overview */}
      <section className="py-16 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12">
            <h2 className="text-2xl font-light text-white mb-4">Understanding Your Energy Centers</h2>
            <p className="text-purple-100/70 leading-relaxed mb-4">
              Chakras are spinning wheels of energy located along your spine, from the base to the crown of your head. 
              Each chakra corresponds to specific organs, emotions, and aspects of your spiritual development.
            </p>
            <p className="text-purple-100/70 leading-relaxed">
              When your chakras are balanced and open, energy flows freely through your body, creating physical health, 
              emotional wellbeing, and spiritual connection. Blockages or imbalances can manifest as physical ailments, 
              emotional challenges, or spiritual disconnection.
            </p>
          </div>

          {/* Chakra Visual */}
          <div className="flex flex-col items-center mb-16 space-y-3">
            {[...chakraData].reverse().map((chakra, index) => (
              <motion.div
                key={chakra.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={createPageUrl('ChakraDetail') + `?id=${chakra.id}`}>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${chakra.color}20`, border: `2px solid ${chakra.color}60`, boxShadow: `0 0 20px ${chakra.color}40` }}
                  >
                    <ChakraSymbol chakraId={chakra.id} color={chakra.color} size={48} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Chakra List */}
          <div className="space-y-4">
            {chakraData.map((chakra, index) => (
              <motion.div
                key={chakra.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={createPageUrl('ChakraDetail') + `?id=${chakra.id}`}>
                  <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${chakra.color}20`, border: `2px solid ${chakra.color}60`, boxShadow: `0 0 16px ${chakra.color}40` }}
                      >
                        <ChakraSymbol chakraId={chakra.id} color={chakra.color} size={44} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-white mb-1">{chakra.name}</h3>
                        <p className="text-purple-300/60 text-sm">
                          <span className="italic">{chakra.sanskrit}</span> • {chakra.colorName} • {chakra.location}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
