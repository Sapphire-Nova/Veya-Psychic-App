import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  Sparkles, Star, Leaf, Gem, Shield, Moon, 
  ArrowRight, BookOpen, Brain, Zap, ChevronRight
} from 'lucide-react';

const learnTopics = [
  { name: 'Chakras', description: 'Explore the 7 energy centers and how to balance them', page: 'Chakras', icon: Sparkles, color: 'from-violet-500 to-purple-600', tag: 'Guide' },
  { name: 'Crystals', description: 'Discover healing crystals and their properties', page: 'Crystals', icon: Gem, color: 'from-pink-500 to-rose-600', tag: 'Guide' },
  { name: 'Tarot', description: 'Learn the meaning of every card in the deck', page: 'Tarot', icon: Star, color: 'from-amber-500 to-yellow-600', tag: 'Guide' },
  { name: 'Herbs & Plants', description: 'Sacred herbs for ritual and healing work', page: 'Herbs', icon: Leaf, color: 'from-emerald-500 to-green-600', tag: 'Guide' },
  { name: 'Astrology', description: 'Understand your chart, signs & planetary energy', page: 'Astrology', icon: Moon, color: 'from-blue-500 to-indigo-600', tag: 'Guide' },
  { name: 'Protection', description: 'Cleansing rituals and energy protection techniques', page: 'ProtectionGuides', icon: Shield, color: 'from-slate-500 to-gray-600', tag: 'Guide' },
];

const quizzes = [
  { name: 'Chakra Check-In', description: 'Which energy center needs your attention right now?', page: 'ChakraCheckIn', icon: Sparkles, color: 'from-rose-500 to-pink-600', time: '2 min' },
  { name: 'Soul Path Quiz', description: 'Reveal your current life theme and spiritual direction', page: 'SoulPathQuiz', icon: Brain, color: 'from-purple-500 to-violet-600', time: '5 min' },
  { name: 'Intention Builder', description: 'Build a personalized ritual aligned with your goals', page: 'IntentionBuilder', icon: Zap, color: 'from-amber-500 to-orange-600', time: '3 min' },
];

export default function LearnSection() {
  const [activeTab, setActiveTab] = useState('learn');

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-4">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-purple-200/70 text-sm">Expand Your Knowledge</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Learn & Discover</h2>
          <p className="text-purple-200/60 max-w-xl mx-auto">
            Deep-dive into sacred teachings or take a quick quiz to uncover your spiritual insights
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/5 border border-white/10 rounded-full p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'learn' ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow' : 'text-purple-200/60 hover:text-white'}`}
            >
              <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Learning Guides</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'quiz' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow' : 'text-purple-200/60 hover:text-white'}`}
            >
              <span className="flex items-center gap-2"><Brain className="w-4 h-4" /> Quizzes & Tools</span>
            </button>
          </div>
        </div>

        {activeTab === 'learn' && (
          <motion.div
            key="learn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {learnTopics.map((topic, i) => (
              <motion.div key={topic.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              >
                <Link to={createPageUrl(topic.page)}>
                  <div className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <topic.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-white font-medium group-hover:text-amber-300 transition-colors">{topic.name}</h3>
                        <span className="text-xs bg-white/10 text-purple-200/60 px-2 py-0.5 rounded-full">{topic.tag}</span>
                      </div>
                      <p className="text-purple-200/50 text-xs leading-snug">{topic.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-purple-200/30 group-hover:text-amber-300 shrink-0 transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {quizzes.map((quiz, i) => (
              <motion.div key={quiz.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <Link to={createPageUrl(quiz.page)}>
                  <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${quiz.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <quiz.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-medium group-hover:text-amber-300 transition-colors">{quiz.name}</h3>
                      <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">{quiz.time}</span>
                    </div>
                    <p className="text-purple-200/60 text-sm mb-5 flex-1">{quiz.description}</p>
                    <div className={`w-full py-2.5 rounded-full bg-gradient-to-r ${quiz.color} text-white text-sm font-medium text-center flex items-center justify-center gap-2 group-hover:opacity-90 transition-opacity`}>
                      Start Now <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}