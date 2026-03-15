import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  Heart, Compass, Flame, BookOpen, 
  MessageCircle, Shield, ArrowRight
} from 'lucide-react';

const tools = [
  {
    name: 'Chakra Check-In',
    description: 'Discover which energy center needs attention',
    icon: Heart,
    page: 'ChakraCheckIn',
    color: 'from-rose-500 to-pink-600'
  },
  {
    name: 'Soul Path Quiz',
    description: 'Uncover your current life theme',
    icon: Compass,
    page: 'SoulPathQuiz',
    color: 'from-purple-500 to-violet-600'
  },
  {
    name: 'Intention Builder',
    description: 'Create a personalized ritual',
    icon: Flame,
    page: 'IntentionBuilder',
    color: 'from-amber-500 to-orange-600'
  },
  {
    name: 'Ask the Priestess',
    description: 'Submit a spiritual question',
    icon: MessageCircle,
    page: 'AskPriestess',
    color: 'from-indigo-500 to-blue-600'
  }
];

export default function QuickTools() {
  return (
    <section className="py-20 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-white mb-4">
            Interactive Spiritual Tools
          </h2>
          <p className="text-purple-200/60 max-w-2xl mx-auto">
            Explore these sacred tools to deepen your understanding and connection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={createPageUrl(tool.page)}>
                <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                    <tool.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg text-white font-medium mb-2 group-hover:text-amber-300 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-purple-200/60 text-sm mb-4">{tool.description}</p>
                  <span className="text-purple-300 text-sm flex items-center gap-1 group-hover:text-amber-300 transition-colors">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to={createPageUrl('ProtectionGuides')}>
            <button className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors">
              <Shield className="w-5 h-5" />
              Explore Protection & Cleansing Guides
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}