import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Search, Sparkles, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { herbsData, getHerbImage } from '@/components/herbs/herbsData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Herbs() {
  const [search, setSearch] = useState('');
  const [selectedHerb, setSelectedHerb] = useState(null);

  const filteredHerbs = herbsData.filter(herb =>
    herb.name.toLowerCase().includes(search.toLowerCase()) ||
    herb.properties.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Leaf className="w-10 h-10 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
              Magical Herbs & Plants
            </h1>
            <p className="text-emerald-100/70 text-lg max-w-2xl mx-auto mb-8">
              Explore the ancient wisdom of botanical magic. Discover the spiritual properties, 
              historical lore, and ritual uses of 50+ sacred plants.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search herbs by name or property..."
                className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-emerald-300/50 rounded-full h-14"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Herbs Grid */}
      <section className="py-16 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <p className="text-emerald-300/60 text-center mb-8">
            {filteredHerbs.length} herbs found
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHerbs.map((herb, index) => (
              <motion.div
                key={herb.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.5) }}
                onClick={() => setSelectedHerb(herb)}
                className="cursor-pointer"
              >
                <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-emerald-900/20 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={getHerbImage(herb.name)} 
                      alt={herb.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    <Sparkles className="absolute top-3 right-3 w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-white mb-2">{herb.name}</h3>
                    <p className="text-emerald-200/60 text-sm line-clamp-2">{herb.properties}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Herb Detail Modal */}
      <Dialog open={!!selectedHerb} onOpenChange={() => setSelectedHerb(null)}>
        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedHerb && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <img 
                      src={getHerbImage(selectedHerb.name)} 
                      alt={selectedHerb.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <DialogTitle className="text-2xl font-light">{selectedHerb.name}</DialogTitle>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="text-emerald-400 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Magical Properties
                  </h4>
                  <p className="text-white/80">{selectedHerb.properties}</p>
                </div>

                <div>
                  <h4 className="text-amber-400 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Historical & Spiritual Lore
                  </h4>
                  <p className="text-white/80">{selectedHerb.lore}</p>
                </div>

                <div>
                  <h4 className="text-purple-400 text-sm uppercase tracking-wider mb-2">
                    Associated Deity/Symbolism
                  </h4>
                  <p className="text-white/80">{selectedHerb.deity}</p>
                </div>

                <div>
                  <h4 className="text-rose-400 text-sm uppercase tracking-wider mb-2">
                    Ritual & Energetic Uses
                  </h4>
                  <p className="text-white/80">{selectedHerb.uses}</p>
                </div>

                {selectedHerb.name === 'Belladonna' || selectedHerb.name === 'Wolfsbane' || selectedHerb.name === 'Hemlock' ? (
                  <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4">
                    <p className="text-red-300 text-sm font-medium">
                      ⚠️ WARNING: This plant is highly toxic. Do not consume or handle without proper precautions. 
                      Information is for educational purposes only.
                    </p>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}