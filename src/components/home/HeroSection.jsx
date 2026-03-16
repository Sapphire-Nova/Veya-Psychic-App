import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Sparkles, Calendar, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-100" />
          <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-200" />
          <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-20 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse delay-500" />
          <div className="absolute top-1/3 right-10 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-700" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
              <Sparkles className="w-10 h-10 text-amber-300" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-wide">
            Illuminate Your
            <span className="block font-semibold bg-gradient-to-r from-amber-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Spiritual Path
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-purple-100/80 mb-10 font-light leading-relaxed">
            Receive personalized psychic readings and spiritual guidance 
            to help you navigate life's journey with clarity and confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('BookReading')}>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-105">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Reading
              </Button>
            </Link>
            <Link to={createPageUrl('DailyGuidance')}>
              <Button variant="outline" className="w-full sm:w-auto bg-purple-500/30 border border-purple-400/60 text-purple-100 hover:bg-purple-500/50 px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300">
                <Sun className="w-5 h-5 mr-2" />
                Daily Guidance
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
