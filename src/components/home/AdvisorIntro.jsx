import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function AdvisorIntro() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const check = () => {
      base44.entities.GuideStatus.list().then(statuses => {
        setIsLive(statuses.length > 0 && statuses[0].status === 'available');
      }).catch(() => {});
    };
    check();
    const interval = setInterval(check, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-indigo-950 to-purple-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <span className="text-amber-400 text-sm uppercase tracking-widest">Your Spiritual Guide</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mt-3 mb-6">
              A Trusted Voice on Your Journey
            </h2>
            
            <p className="text-purple-100/80 leading-relaxed mb-6">
              With over 15 years of dedicated practice in psychic readings, tarot, and spiritual counseling, 
              I have helped thousands of seekers find clarity, peace, and direction in their lives.
            </p>

            <p className="text-purple-100/80 leading-relaxed mb-8">
              My gift is not just in seeing what lies ahead, but in helping you understand the deeper 
              spiritual patterns that shape your journey. Together, we will illuminate your path and 
              empower you to embrace your highest potential.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <Eye className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <span className="text-2xl font-semibold text-white block">15+</span>
                <span className="text-purple-200/60 text-xs">Years Experience</span>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <Heart className="w-6 h-6 text-rose-400 mx-auto mb-2" />
                <span className="text-2xl font-semibold text-white block">10K+</span>
                <span className="text-purple-200/60 text-xs">Readings Given</span>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <span className="text-2xl font-semibold text-white block">5.0</span>
                <span className="text-purple-200/60 text-xs">Average Rating</span>
              </div>
            </div>

            <Link to={createPageUrl('About')}>
              <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full">
                Learn More About Me
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-amber-500/30 rounded-full blur-3xl" />
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl"
                style={{ border: '4px solid', borderImageSlice: 1, outline: 'none', boxShadow: '0 0 40px rgba(251,191,36,0.35), 0 0 0 4px #f59e0b' }}>
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69894b94180b4131b2f82c0b/2717d7777_PsychicViolet_20260309_225015_0000.png"
                  alt="Psychic Violet"
                  className="w-full h-full object-cover"
                />
              </div>
              {isLive && (
                <Link to={createPageUrl('LiveSessions')}>
                  <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse cursor-pointer">
                    <span className="text-white text-xs font-semibold text-center leading-tight px-2">Connect with<br/>Violet Now!</span>
                  </div>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
