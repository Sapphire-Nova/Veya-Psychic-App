import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Layers, Search, Sparkles, ArrowUp, ArrowDown, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { majorArcana, minorArcana, getTarotCardImage } from '@/components/tarot/tarotData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const suitColors = {
  major: 'from-purple-500 to-violet-600',
  wands: 'from-red-500 to-orange-500',
  cups: 'from-blue-500 to-cyan-500',
  swords: 'from-sky-400 to-blue-500',
  pentacles: 'from-emerald-500 to-green-600'
};

const suitDescriptions = {
  major: "The Major Arcana represents life's spiritual lessons and karmic influences. These 22 cards depict archetypal experiences and the soul's journey.",
  wands: "The Wands suit represents fire energy - passion, creativity, inspiration, spirituality, and ambition. They speak to what drives you.",
  cups: "The Cups suit represents water energy - emotions, feelings, relationships, intuition, and creativity. They address matters of the heart.",
  swords: "The Swords suit represents air energy - thoughts, words, intellect, truth, and mental challenges. They deal with the mind.",
  pentacles: "The Pentacles suit represents earth energy - material aspects of life, career, finances, health, and manifestation. They address practical matters."
};

export default function Tarot() {
  const [search, setSearch] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeTab, setActiveTab] = useState('major');

  const filterCards = (cards) => {
    if (!search) return cards;
    return cards.filter(card =>
      card.name.toLowerCase().includes(search.toLowerCase()) ||
      card.upright.toLowerCase().includes(search.toLowerCase()) ||
      card.reversed.toLowerCase().includes(search.toLowerCase())
    );
  };

  const CardGrid = ({ cards, suit }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {filterCards(cards).map((card, index) => (
        <motion.div
          key={card.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(index * 0.03, 0.5) }}
          onClick={() => setSelectedCard({ ...card, suit })}
          className="cursor-pointer"
        >
          <div className="group bg-white/5 border border-white/10 rounded-2xl p-3 hover:bg-purple-900/20 hover:border-purple-500/30 transition-all duration-300 text-center">
            <div className="w-full aspect-[2/3] rounded-xl mb-3 overflow-hidden relative">
              <img 
                src={getTarotCardImage(card.name)} 
                alt={card.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
            <h3 className="text-sm font-medium text-white line-clamp-2">{card.name}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-950 via-violet-900 to-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Layers className="w-10 h-10 text-purple-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
              Tarot Library
            </h1>
            <p className="text-purple-100/70 text-lg max-w-2xl mx-auto mb-8">
              Explore the complete tarot deck - all 78 cards with their upright and reversed 
              meanings, symbolism, and spiritual guidance.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cards by name or meaning..."
                className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-purple-300/50 rounded-full h-14"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent mb-8">
              {[
                { value: 'major', label: 'Major Arcana' },
                { value: 'wands', label: 'Wands' },
                { value: 'cups', label: 'Cups' },
                { value: 'swords', label: 'Swords' },
                { value: 'pentacles', label: 'Pentacles' }
              ].map(tab => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`px-6 py-3 rounded-full border transition-all ${
                    activeTab === tab.value 
                      ? `bg-gradient-to-r ${suitColors[tab.value]} text-white border-transparent`
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Suit Description */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <p className="text-purple-100/70 text-center">{suitDescriptions[activeTab]}</p>
            </div>

            <TabsContent value="major">
              <CardGrid cards={majorArcana} suit="major" />
            </TabsContent>
            <TabsContent value="wands">
              <CardGrid cards={minorArcana.wands} suit="wands" />
            </TabsContent>
            <TabsContent value="cups">
              <CardGrid cards={minorArcana.cups} suit="cups" />
            </TabsContent>
            <TabsContent value="swords">
              <CardGrid cards={minorArcana.swords} suit="swords" />
            </TabsContent>
            <TabsContent value="pentacles">
              <CardGrid cards={minorArcana.pentacles} suit="pentacles" />
            </TabsContent>
          </Tabs>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-purple-900/50 to-violet-900/50 border border-purple-400/20 rounded-3xl p-8">
              <h3 className="text-2xl font-light text-white mb-4">Ready for a Personal Tarot Reading?</h3>
              <p className="text-purple-100/70 mb-6">
                Let me pull cards specifically for you and provide detailed guidance for your situation.
              </p>
              <Link to={createPageUrl('BookReading') + '?type=tarot'}>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full">
                  Book a Tarot Reading
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Card Detail Modal */}
      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedCard && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-36 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                    <img 
                      src={getTarotCardImage(selectedCard.name)} 
                      alt={selectedCard.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-light">{selectedCard.name}</DialogTitle>
                    <p className="text-purple-300/60 text-sm capitalize">{selectedCard.suit === 'major' ? 'Major Arcana' : `Suit of ${selectedCard.suit}`}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="text-emerald-400 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <ArrowUp className="w-4 h-4" />
                    Upright Meaning
                  </h4>
                  <p className="text-white/80">{selectedCard.upright}</p>
                </div>

                <div>
                  <h4 className="text-rose-400 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <ArrowDown className="w-4 h-4" />
                    Reversed Meaning
                  </h4>
                  <p className="text-white/80">{selectedCard.reversed}</p>
                </div>

                <div>
                  <h4 className="text-amber-400 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Symbolism
                  </h4>
                  <p className="text-white/80">{selectedCard.symbolism}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}