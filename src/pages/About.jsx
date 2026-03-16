import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Eye, Star, Calendar, Award, BookOpen, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';

const specialties = [
  { icon: Sparkles, title: 'Tarot Mastery', description: 'Over 15 years of deep study and practice with multiple tarot traditions' },
  { icon: Eye, title: 'Clairvoyance', description: 'Natural psychic abilities developed and refined through dedicated practice' },
  { icon: Heart, title: 'Empathic Healing', description: 'Deep emotional insight and compassionate energy healing' },
  { icon: Star, title: 'Astrology', description: 'Comprehensive natal chart and transit readings' },
  { icon: BookOpen, title: 'Mediumship', description: 'Connecting loved ones with messages from those who have passed' },
  { icon: Gem, title: 'Crystal Energy', description: 'Expert knowledge in crystal healing and energy work' }
];

const journey = [
  { year: 'Early Years', description: 'Discovered natural psychic abilities as a child, experiencing vivid intuitive insights and spiritual connections.' },
  { year: 'Training', description: 'Studied under renowned spiritual teachers, learning tarot, astrology, mediumship, and various healing modalities.' },
  { year: 'Development', description: 'Dedicated years to refining abilities through meditation, practice, and continuous spiritual growth.' },
  { year: 'Today', description: 'Now serving thousands of seekers worldwide, helping them find clarity, healing, and spiritual direction.' }
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-amber-400 text-sm uppercase tracking-widest">About Your Guide</span>
              <h1 className="text-4xl md:text-5xl font-light text-white mt-3 mb-6">
                Walking the Path of 
                <span className="block font-semibold bg-gradient-to-r from-amber-200 to-purple-200 bg-clip-text text-transparent">
                  Light & Wisdom
                </span>
              </h1>
              
              <p className="text-purple-100/80 text-lg leading-relaxed mb-6">
                I am a dedicated psychic advisor, medium, and spiritual guide with a lifelong 
                calling to help others navigate their spiritual journey. My gift allows me to 
                see beyond the veil and provide insights that bring clarity, comfort, and direction.
              </p>

              <p className="text-purple-100/80 leading-relaxed mb-8">
                Every reading I provide is infused with compassion, honesty, and genuine care for 
                your wellbeing. I believe that everyone deserves access to spiritual guidance, 
                and I am honored to be a trusted voice on your path.
              </p>

              <Link to={createPageUrl('BookReading')}>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full shadow-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Reading
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-amber-500/30 rounded-3xl blur-3xl" />
                <div className="relative w-80 h-96 rounded-3xl overflow-hidden shadow-2xl"
                  style={{ boxShadow: '0 0 50px rgba(251,191,36,0.3), 0 0 0 3px #f59e0b' }}>
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69894b94180b4131b2f82c0b/2717d7777_PsychicViolet_20260309_225015_0000.png"
                    alt="Psychic Violet"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-slate-950 border-y border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="text-4xl font-semibold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">15+</span>
              <p className="text-purple-200/60 mt-2">Years Experience</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <span className="text-4xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">10K+</span>
              <p className="text-purple-200/60 mt-2">Readings Given</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <span className="text-4xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">5.0</span>
              <p className="text-purple-200/60 mt-2">Average Rating</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <span className="text-4xl font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">98%</span>
              <p className="text-purple-200/60 mt-2">Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-indigo-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-400 text-sm uppercase tracking-widest">Expertise</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mt-3">
              Areas of Specialty
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mb-4">
                  <specialty.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{specialty.title}</h3>
                <p className="text-purple-200/60 text-sm">{specialty.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-6 bg-indigo-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-400 text-sm uppercase tracking-widest">My Story</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mt-3">
              The Spiritual Journey
            </h2>
          </motion.div>

          <div className="space-y-8">
            {journey.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-24">
                  <span className="text-amber-400 font-medium">{item.year}</span>
                </div>
                <div className="flex-shrink-0 w-px bg-gradient-to-b from-purple-500 to-transparent h-16" />
                <p className="text-purple-100/80 flex-1">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-6 bg-gradient-to-b from-indigo-950 to-purple-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Award className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
              My Reading Philosophy
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
              <p className="text-purple-100/80 text-lg leading-relaxed mb-6">
                "I believe that every soul has the power to transform their life. My role is not 
                to predict a fixed future, but to illuminate the energies, patterns, and possibilities 
                that surround you. Through compassionate guidance and honest insight, I help you 
                understand your spiritual path and empower you to make choices aligned with your 
                highest good."
              </p>
              <p className="text-purple-100/80 leading-relaxed">
                "Whether you're seeking clarity about love, career, life purpose, or connecting 
                with those who have passed, I approach every reading with reverence, respect, 
                and a genuine desire to serve your spiritual growth."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-purple-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-light text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-purple-100/70 mb-8">
            I'm here to guide you with compassion, clarity, and genuine spiritual insight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('BookReading')}>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full">
                Book Your Reading
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full">
                Get in Touch
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
