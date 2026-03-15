import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Sparkles } from 'lucide-react';

export default function DailyGuidanceCard({ guidance }) {
  const defaultGuidance = {
    title: "Trust Your Inner Light",
    message: "Today, the universe invites you to pause and listen to your intuition. The answers you seek are already within you. Take a moment to breathe deeply and connect with your inner wisdom.",
    affirmation: "I am guided by divine light and trust my spiritual path.",
    focus_area: "Self-Trust"
  };

  const data = guidance || defaultGuidance;

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-indigo-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-amber-400 text-sm uppercase tracking-widest">Daily Message</span>
          <h2 className="text-3xl md:text-4xl font-light text-white mt-3">
            Today's Guidance
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl" />
          
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full">
                <Sun className="w-8 h-8 text-white" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-medium text-white text-center mb-6">
              {data.title}
            </h3>

            <p className="text-purple-100/80 text-lg text-center leading-relaxed mb-8">
              {data.message}
            </p>

            <div className="bg-gradient-to-r from-purple-900/50 to-violet-900/50 rounded-2xl p-6 border border-purple-400/20">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 text-sm uppercase tracking-wider">Today's Affirmation</span>
              </div>
              <p className="text-white text-lg italic">
                "{data.affirmation}"
              </p>
            </div>

            {data.focus_area && (
              <div className="mt-6 text-center">
                <span className="text-purple-300/60 text-sm">Focus Area: </span>
                <span className="text-purple-200 font-medium">{data.focus_area}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}