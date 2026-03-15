import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Shield, Moon, Radio, Star } from 'lucide-react';

const readingTypes = [
  {
    icon: Star,
    title: 'Full Tarot Reading',
    description: 'A comprehensive tarot spread revealing the energies surrounding your path, relationships, and soul\'s journey.',
    color: 'from-violet-500 to-purple-700',
    page: 'Services',
    params: '?highlight=tarot'
  },
  {
    icon: Moon,
    title: 'Mediumship Reading',
    description: 'Connect with loved ones who have crossed over. Receive messages, healing, and closure from the other side.',
    color: 'from-indigo-500 to-blue-700',
    page: 'Services',
    params: '?highlight=mediumship'
  },
  {
    icon: Sparkles,
    title: 'Distant Reiki Healing',
    description: 'A distant energy healing session to clear blockages, restore balance, and activate your body\'s natural healing.',
    color: 'from-emerald-500 to-teal-600',
    page: 'Services',
    params: '?highlight=reiki'
  },
  {
    icon: Shield,
    title: 'Lightworker Ritual Candle',
    description: 'A sacred candle ritual performed on your behalf — choose your intention and share your story for a deeply personalized working.',
    color: 'from-amber-500 to-orange-600',
    page: 'Services',
    params: '?highlight=candle'
  },
  {
    icon: Radio,
    title: 'Live Personal Guidance',
    description: 'Receive direct personal guidance from me during a live session. Only available while I am online and live.',
    color: 'from-rose-500 to-pink-700',
    page: 'Services',
    params: '?highlight=live_guidance'
  },
  {
    icon: Heart,
    title: 'First Chat Session',
    description: 'Your first chat session is FREE — one question answered with a 3-card tarot draw. A gift for new seekers.',
    color: 'from-pink-500 to-rose-600',
    page: 'Services',
    params: '?highlight=first_chat'
  },
];

export default function ReadingTypes() {
  return (
    <section className="py-20 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm uppercase tracking-widest">Services</span>
          <h2 className="text-3xl md:text-4xl font-light text-white mt-3 mb-4">
            Types of Readings
          </h2>
          <p className="text-purple-200/60 max-w-2xl mx-auto">
            Choose the guidance that resonates with your soul's needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {readingTypes.map((reading, index) => (
            <motion.div
              key={reading.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={createPageUrl(reading.page) + reading.params}>
                <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 cursor-pointer">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reading.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <reading.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{reading.title}</h3>
                  <p className="text-purple-200/60 text-sm leading-relaxed">{reading.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to={createPageUrl('Services')}>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-full hover:from-purple-700 hover:to-violet-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25">
              Book Your Reading
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}