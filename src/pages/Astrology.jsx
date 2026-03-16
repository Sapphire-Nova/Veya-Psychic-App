import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Sun, Moon, Compass, Flame, Mountain, Wind, Droplets } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodiacSigns, planets, houses, elements, modalities, polarities } from '@/components/astrology/astrologyData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

const elementIcons = { Fire: Flame, Earth: Mountain, Air: Wind, Water: Droplets };
const elementColors = { Fire: 'from-red-500 to-orange-500', Earth: 'from-emerald-500 to-green-600', Air: 'from-sky-400 to-blue-500', Water: 'from-blue-500 to-indigo-600' };

export default function Astrology() {
  const [selectedSign, setSelectedSign] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Star className="w-10 h-10 text-amber-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
              Modern Astrology Guide
            </h1>
            <p className="text-purple-100/70 text-lg max-w-2xl mx-auto">
              Explore the cosmic language of the stars. Learn about zodiac signs, planets, 
              houses, and the archetypal energies that shape our lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="signs" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent mb-12">
              {[
                { value: 'signs', label: 'Zodiac Signs' },
                { value: 'planets', label: 'Planets' },
                { value: 'houses', label: 'Houses' },
                { value: 'elements', label: 'Elements' },
                { value: 'modalities', label: 'Modalities' },
                { value: 'polarities', label: 'Polarities' }
              ].map(tab => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white data-[state=active]:bg-purple-600 data-[state=active]:border-purple-500"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Zodiac Signs */}
            <TabsContent value="signs">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {zodiacSigns.map((sign, index) => {
                  const Icon = elementIcons[sign.element];
                  return (
                    <motion.div
                      key={sign.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedSign(sign)}
                      className="cursor-pointer"
                    >
                      <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${elementColors[sign.element]} flex items-center justify-center`}>
                          <span className="text-3xl text-white">{sign.symbol}</span>
                        </div>
                        <h3 className="text-xl font-medium text-white mb-1">{sign.name}</h3>
                        <p className="text-purple-300/60 text-xs mb-2">{sign.dates}</p>
                        <div className="flex items-center justify-center gap-1 text-purple-200/50 text-xs">
                          <Icon className="w-3 h-3" />
                          {sign.element}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Planets */}
            <TabsContent value="planets">
              <div className="space-y-4">
                {planets.map((planet, index) => (
                  <motion.div
                    key={planet.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl text-white">{planet.symbol}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-white mb-2">{planet.name}</h3>
                        <p className="text-purple-100/70 text-sm mb-3">{planet.meaning}</p>
                        <div className="flex flex-wrap gap-3">
                          <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-200 text-xs">
                            Rules: {planet.rules}
                          </span>
                        </div>
                        <p className="text-purple-200/50 text-sm mt-3 italic">{planet.represents}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Houses */}
            <TabsContent value="houses">
              <div className="grid md:grid-cols-2 gap-4">
                {houses.map((house, index) => (
                  <motion.div
                    key={house.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-lg font-bold text-white">{house.number}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">{house.name}</h3>
                        <p className="text-amber-400 text-sm">{house.theme}</p>
                      </div>
                    </div>
                    <p className="text-purple-100/70 text-sm mb-3">{house.rules}</p>
                    <span className="text-purple-300/50 text-xs">Natural Sign: {house.naturalSign}</span>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Elements */}
            <TabsContent value="elements">
              <div className="grid md:grid-cols-2 gap-6">
                {elements.map((element, index) => {
                  const Icon = elementIcons[element.name];
                  return (
                    <motion.div
                      key={element.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-8"
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${elementColors[element.name]} flex items-center justify-center mb-6`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-medium text-white mb-2">{element.name}</h3>
                      <p className="text-purple-200/60 text-sm mb-4">{element.signs.join(" • ")}</p>
                      <p className="text-purple-100/70 mb-4">{element.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {element.qualities.split(", ").map(q => (
                          <span key={q} className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-xs">
                            {q}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Modalities */}
            <TabsContent value="modalities">
              <div className="space-y-6">
                {modalities.map((mod, index) => (
                  <motion.div
                    key={mod.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8"
                  >
                    <h3 className="text-2xl font-medium text-white mb-2">{mod.name}</h3>
                    <p className="text-amber-400 text-sm mb-4">{mod.signs.join(" • ")}</p>
                    <p className="text-purple-100/70 mb-4">{mod.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {mod.qualities.split(", ").map(q => (
                        <span key={q} className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-200 text-xs">
                          {q}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Polarities */}
            <TabsContent value="polarities">
              <div className="grid md:grid-cols-2 gap-6">
                {polarities.map((pol, index) => (
                  <motion.div
                    key={pol.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8"
                  >
                    <div className={`w-16 h-16 rounded-full ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-yellow-500' : 'bg-gradient-to-br from-indigo-500 to-purple-600'} flex items-center justify-center mb-6`}>
                      {index === 0 ? <Sun className="w-8 h-8 text-white" /> : <Moon className="w-8 h-8 text-white" />}
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-2">{pol.name}</h3>
                    <p className="text-purple-200/60 text-sm mb-4">{pol.signs.join(" • ")}</p>
                    <p className="text-purple-100/70 mb-4">{pol.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {pol.qualities.split(", ").map(q => (
                        <span key={q} className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-xs">
                          {q}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
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
              <h3 className="text-2xl font-light text-white mb-4">Want a Personalized Astrology Reading?</h3>
              <p className="text-purple-100/70 mb-6">
                Discover what the stars reveal about your unique cosmic blueprint.
              </p>
              <Link to={createPageUrl('BookReading') + '?type=astrology'}>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full">
                  Book an Astrology Reading
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sign Detail Modal */}
      <Dialog open={!!selectedSign} onOpenChange={() => setSelectedSign(null)}>
        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedSign && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${elementColors[selectedSign.element]} flex items-center justify-center`}>
                    <span className="text-3xl text-white">{selectedSign.symbol}</span>
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-light">{selectedSign.name}</DialogTitle>
                    <p className="text-purple-300/60 text-sm">{selectedSign.dates}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-200 text-sm">
                    {selectedSign.element}
                  </span>
                  <span className="px-3 py-1 bg-amber-500/20 rounded-full text-amber-200 text-sm">
                    {selectedSign.modality}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-200 text-sm">
                    {selectedSign.polarity}
                  </span>
                  <span className="px-3 py-1 bg-rose-500/20 rounded-full text-rose-200 text-sm">
                    Ruler: {selectedSign.ruler}
                  </span>
                </div>

                <div>
                  <h4 className="text-amber-400 text-sm uppercase tracking-wider mb-2">
                    {selectedSign.archetype}
                  </h4>
                  <p className="text-white/80">{selectedSign.soul}</p>
                </div>

                <div>
                  <h4 className="text-emerald-400 text-sm uppercase tracking-wider mb-2">
                    Positive Traits
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSign.traits.map(t => (
                      <span key={t} className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-200 text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-red-400 text-sm uppercase tracking-wider mb-2">
                    Shadow Side
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSign.shadow.map(s => (
                      <span key={s} className="px-3 py-1 bg-red-500/20 rounded-full text-red-200 text-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
