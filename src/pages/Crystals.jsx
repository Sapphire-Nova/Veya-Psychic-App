import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Gem, Search, Sparkles, Heart, Zap, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { crystalsData, getCrystalImage } from '@/components/crystals/crystalsData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const chakraColors = {
  'Root': 'from-red-500 to-red-600',
  'Sacral': 'from-orange-500 to-orange-600',
  'Solar Plexus': 'from-yellow-500 to-yellow-600',
  'Heart': 'from-green-500 to-emerald-600',
  'Throat': 'from-cyan-500 to-blue-500',
  'Third Eye': 'from-indigo-500 to-purple-600',
  'Crown': 'from-violet-500 to-purple-600',
  'All Chakras': 'from-purple-500 to-pink-500'
};

const getChakraColor = (chakra) => {
  const firstChakra = chakra.split(',')[0].trim();
  return chakraColors[firstChakra] || 'from-purple-500 to-violet-600';
};

export default function Crystals() {
  const [search, setSearch] = useState('');
  const [selectedCrystal, setSelectedCrystal] = useState(null);
  const [chakraFilter, setChakraFilter] = useState('all');

  const chakras = ['all', 'Root', 'Sacral', 'Solar Plexus', 'Heart', 'Throat', 'Third Eye', 'Crown'];

  const filteredCrystals = crystalsData.filter(crystal => {
    const matchesSearch = crystal.name.toLowerCase().includes(search.toLowerCase()) ||
      crystal.properties.toLowerCase().includes(search.toLowerCase()) ||
      crystal.meaning.toLowerCase().includes(search.toLowerCase());
    
    const matchesChakra = chakraFilter === 'all' || crystal.chakra.includes(chakraFilter);
    
    return matchesSearch && matchesChakra;
  });

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-violet-950 via-purple-900 to-pink-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-violet-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Gem className="w-10 h-10 text-violet-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
              Crystal Guide
            </h1>
            <p className="text-purple-100/70 text-lg max-w-2xl mx-auto mb-8">
              Explore the healing properties and spiritual meanings of crystals. 
              Learn how each stone can support your journey of personal growth.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search crystals..."
                className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-violet-300/50 rounded-full h-14"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chakra Filter */}
      <section className="py-6 px-6 bg-slate-950 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {chakras.map(chakra => (
              <button
                key={chakra}
                onClick={() => setChakraFilter(chakra)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  chakraFilter === chakra
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-purple-200/60 hover:bg-white/10'
                }`}
              >
                {chakra === 'all' ? 'All Chakras' : chakra}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Crystals Grid */}
      <section className="py-16 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <p className="text-purple-300/60 text-center mb-8">
            {filteredCrystals.length} crystals found
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCrystals.map((crystal, index) => (
              <motion.div
                key={crystal.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.5) }}
                onClick={() => setSelectedCrystal(crystal)}
                className="cursor-pointer"
              >
                <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-purple-900/20 hover:border-purple-500/30 transition-all duration-300">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={getCrystalImage(crystal.name)} 
                      alt={crystal.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    <div className={`absolute top-3 left-3 px-2 py-1 bg-gradient-to-r ${getChakraColor(crystal.chakra)} rounded-full`}>
                      <span className="text-white text-xs font-medium">{crystal.chakra.split(',')[0]}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-white mb-1">{crystal.name}</h3>
                    <p className="text-purple-200/50 text-xs mb-2">{crystal.element}</p>
                    <p className="text-purple-200/60 text-sm line-clamp-2 italic">{crystal.meaning}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-purple-900/50 to-violet-900/50 border border-purple-400/20 rounded-3xl p-8">
              <h3 className="text-2xl font-light text-white mb-4">Need Crystal Guidance?</h3>
              <p className="text-purple-100/70 mb-6">
                Book a reading to discover which crystals are perfect for your current journey.
              </p>
              <Link to={createPageUrl('BookReading')}>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full">
                  Book a Reading
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Crystal Detail Modal */}
      <Dialog open={!!selectedCrystal} onOpenChange={() => setSelectedCrystal(null)}>
        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedCrystal && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <img 
                      src={getCrystalImage(selectedCrystal.name)} 
                      alt={selectedCrystal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-light">{selectedCrystal.name}</DialogTitle>
                    <p className="text-purple-300/60 text-sm italic">{selectedCrystal.meaning}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-200 text-sm">
                    {selectedCrystal.chakra}
                  </span>
                  <span className="px-3 py-1 bg-amber-500/20 rounded-full text-amber-200 text-sm">
                    {selectedCrystal.element}
                  </span>
                </div>

                <div>
                  <h4 className="text-violet-400 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Energetic Properties
                  </h4>
                  <p className="text-white/80">{selectedCrystal.properties}</p>
                </div>

                <div>
                  <h4 className="text-emerald-400 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Supports Personal Growth
                  </h4>
                  <p className="text-white/80">{selectedCrystal.growth}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}