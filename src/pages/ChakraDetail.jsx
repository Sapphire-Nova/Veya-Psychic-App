import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Heart, Zap, AlertTriangle, CheckCircle, Activity, Leaf, Sparkles } from 'lucide-react';
import { chakraData, getChakraById } from '@/components/chakras/chakraData';
import ChakraSymbol from '@/components/chakras/ChakraSymbol';
import { Button } from '@/components/ui/button';

export default function ChakraDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const chakraId = urlParams.get('id') || 'root';
  const chakra = getChakraById(chakraId);
  
  const currentIndex = chakraData.findIndex(c => c.id === chakraId);
  const prevChakra = currentIndex > 0 ? chakraData[currentIndex - 1] : null;
  const nextChakra = currentIndex < chakraData.length - 1 ? chakraData[currentIndex + 1] : null;

  if (!chakra) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-white">Chakra not found</p>
      </div>
    );
  }

  const Section = ({ icon: Icon, title, items, iconColor }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`w-6 h-6 ${iconColor}`} />
        <h3 className="text-xl font-medium text-white">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-purple-100/70 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: chakra.color }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section 
        className="py-20 px-6 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${chakra.color}20 0%, #0f172a 50%, #1e1b4b 100%)`
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <Link to={createPageUrl('Chakras')} className="inline-flex items-center text-purple-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chakras
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="relative flex items-center justify-center">
              <div
                className="w-48 h-48 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${chakra.color}18`, border: `2px solid ${chakra.color}40` }}
              >
                <ChakraSymbol chakraId={chakra.id} color={chakra.color} size={160} />
              </div>
              <div
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                style={{ backgroundColor: chakra.color }}
              >
                {currentIndex + 1}
              </div>
            </div>

            <div className="text-center md:text-left">
              <p className="text-purple-300 text-lg italic mb-2">{chakra.sanskrit}</p>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-4">{chakra.name}</h1>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm">
                  {chakra.colorName}
                </span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm">
                  {chakra.element}
                </span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm">
                  {chakra.location}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Organs & Body Systems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Section 
              icon={Activity}
              title="Organs & Body Systems"
              items={chakra.organs}
              iconColor="text-red-400"
            />
          </motion.div>

          {/* Emotional Functions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Section 
              icon={Heart}
              title="Emotional Functions"
              items={chakra.emotionalFunctions}
              iconColor="text-pink-400"
            />
          </motion.div>

          {/* Balanced State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Section 
              icon={CheckCircle}
              title="Signs of a Balanced Chakra"
              items={chakra.balancedSigns}
              iconColor="text-green-400"
            />
          </motion.div>

          {/* Overactive & Underactive */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Section 
                icon={Zap}
                title="Overactive Symptoms"
                items={chakra.overactiveSigns}
                iconColor="text-orange-400"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Section 
                icon={AlertTriangle}
                title="Underactive Symptoms"
                items={chakra.underactiveSigns}
                iconColor="text-yellow-400"
              />
            </motion.div>
          </div>

          {/* Manifestations */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Section 
                icon={Heart}
                title="Emotional Manifestations"
                items={chakra.emotionalManifestations}
                iconColor="text-purple-400"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Section 
                icon={Activity}
                title="Physical Manifestations"
                items={chakra.physicalManifestations}
                iconColor="text-blue-400"
              />
            </motion.div>
          </div>

          {/* Balancing Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Section 
              icon={Leaf}
              title="Ways to Balance This Chakra"
              items={chakra.balancingMethods}
              iconColor="text-emerald-400"
            />
          </motion.div>

          {/* Return to Balance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Section 
              icon={Sparkles}
              title="Signs Your Chakra Has Returned to Balance"
              items={chakra.balanceIndicators}
              iconColor="text-amber-400"
            />
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-white/10">
            {prevChakra ? (
              <Link to={createPageUrl('ChakraDetail') + `?id=${prevChakra.id}`}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {prevChakra.name}
                </Button>
              </Link>
            ) : <div />}
            
            {nextChakra ? (
              <Link to={createPageUrl('ChakraDetail') + `?id=${nextChakra.id}`}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  {nextChakra.name}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : <div />}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center pt-8"
          >
            <div className="bg-gradient-to-r from-purple-900/50 to-violet-900/50 border border-purple-400/20 rounded-3xl p-8">
              <h3 className="text-2xl font-light text-white mb-4">Need Personalized Chakra Guidance?</h3>
              <p className="text-purple-100/70 mb-6">
                Book a chakra reading to identify imbalances and receive customized healing recommendations.
              </p>
              <Link to={createPageUrl('BookReading') + '?type=chakra'}>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full">
                  Book a Chakra Reading
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
