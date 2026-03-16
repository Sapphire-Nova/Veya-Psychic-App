import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Shield, Home, Heart, Sparkles, Users,
  ChevronRight, Clock, Star, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const categoryInfo = {
  home_cleansing: { 
    label: 'Home Cleansing', 
    icon: Home, 
    color: 'from-emerald-500 to-teal-600',
    description: 'Clear stagnant energy from your sacred space'
  },
  grounding: { 
    label: 'Grounding Practices', 
    icon: Heart, 
    color: 'from-amber-500 to-orange-600',
    description: 'Return to center after emotional overwhelm'
  },
  empath_protection: { 
    label: 'Empath Protection', 
    icon: Users, 
    color: 'from-purple-500 to-violet-600',
    description: 'Shield your sensitive energy field'
  },
  boundary_strengthening: { 
    label: 'Energy Boundaries', 
    icon: Shield, 
    color: 'from-blue-500 to-indigo-600',
    description: 'Strengthen your energetic boundaries'
  }
};

const defaultGuides = [
  {
    id: '1',
    title: 'Smoke Cleansing Your Home',
    category: 'home_cleansing',
    description: 'A sacred ritual to clear negative energy from your living space',
    content: `**Preparation**\nGather your tools: sage bundle or palo santo, a fireproof bowl, and a feather or your hand for directing smoke.\n\n**Opening Prayer**\nStand at your front door and say: "I call upon the light to guide me. May this space be cleansed of all energy that does not serve the highest good."\n\n**The Ritual**\n1. Light your sage and let it smolder\n2. Start at the front door, moving clockwise through each room\n3. Pay special attention to corners, windows, and mirrors\n4. Wave the smoke with your feather while setting your intention\n5. Visualize dark energy being replaced with golden light\n\n**Closing**\nReturn to where you started. Say: "This space is cleansed and protected. Only love and light may dwell here. And so it is."`,
    tools_needed: ['Sage or Palo Santo', 'Fireproof bowl', 'Feather (optional)', 'Open window'],
    duration: '20-30 minutes',
    difficulty: 'beginner'
  },
  {
    id: '2',
    title: 'Emergency Grounding Technique',
    category: 'grounding',
    description: 'Quick practice for when you feel overwhelmed or anxious',
    content: `**The 5-4-3-2-1 Energy Reset**\n\nWhen anxiety or emotional overwhelm hits, use this technique to anchor yourself back to the present moment.\n\n**The Practice**\n1. **5 Things You See** - Name them silently. Notice their colors and textures.\n2. **4 Things You Feel** - The ground beneath you, air on skin, fabric against your body.\n3. **3 Things You Hear** - Distant sounds, close sounds, your own breath.\n4. **2 Things You Smell** - Even subtle scents in the air.\n5. **1 Deep Breath** - In through nose, out through mouth, releasing all tension.\n\n**Visualization**\nImagine roots growing from your feet deep into the earth. Feel the earth's energy rising up through these roots, filling you with stability and calm.\n\n**Affirmation**\n"I am safe. I am grounded. I am present in this moment."`,
    tools_needed: ['None - can be done anywhere'],
    duration: '3-5 minutes',
    difficulty: 'beginner'
  },
  {
    id: '3',
    title: 'The Empath\'s Shield',
    category: 'empath_protection',
    description: 'Daily practice to protect sensitive souls from absorbing others\' energy',
    content: `**Morning Shield Ritual**\n\nAs an empath, you naturally absorb the emotions and energy of those around you. This daily practice creates a protective barrier.\n\n**The Visualization**\n1. Stand or sit comfortably. Close your eyes.\n2. Breathe deeply three times.\n3. Visualize a brilliant golden light forming at your solar plexus.\n4. See this light expanding outward, surrounding your entire body.\n5. Watch it form a bubble or egg shape around you.\n6. This shield allows love and positive energy IN, but deflects negativity.\n\n**Strengthening the Shield**\nSay: "I am surrounded by divine light. I am protected from all energy that is not mine. I feel only my own emotions. Others' pain passes through me without attachment."\n\n**Throughout the Day**\nWhen you feel overwhelmed, touch your solar plexus and visualize your shield strengthening.\n\n**Evening Release**\nBefore bed, visualize any energy you absorbed during the day flowing out through your feet into the earth.`,
    tools_needed: ['Clear quartz crystal (optional)', 'Black tourmaline to carry'],
    duration: '5-10 minutes',
    difficulty: 'beginner'
  },
  {
    id: '4',
    title: 'Cord Cutting Ceremony',
    category: 'boundary_strengthening',
    description: 'Release unhealthy energetic attachments to people or situations',
    content: `**Understanding Energy Cords**\n\nWe form energetic cords with everyone we interact with deeply. Some cords nourish us; others drain us. This ceremony helps release unhealthy attachments.\n\n**Preparation**\n- Find a quiet space where you won't be disturbed\n- Light a white candle for purification\n- Have a black or blue candle ready to light afterward\n\n**The Ceremony**\n1. Close your eyes and breathe deeply.\n2. Visualize the person or situation you're releasing.\n3. See the energy cord connecting you - notice where it attaches to your body.\n4. Say: "[Name/Situation], I release you with love. The cords that bind us no longer serve our highest good."\n5. Visualize Archangel Michael with his sword of light.\n6. See him gently cutting the cord.\n7. Watch both ends seal with golden light.\n8. Send love and forgiveness to the other end.\n\n**Closure**\nLight the black or blue candle. Say: "I reclaim my energy. I am whole. I am free. Only healthy connections remain."\n\n**Important Note**\nThis doesn't end relationships—it releases unhealthy dynamics. Healthy cords remain or reform in better ways.`,
    tools_needed: ['White candle', 'Black or blue candle', 'Quiet space', 'Journal (optional)'],
    duration: '30-45 minutes',
    difficulty: 'intermediate'
  }
];

export default function ProtectionGuides() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGuide, setSelectedGuide] = useState(null);

  const { data: guides } = useQuery({
    queryKey: ['protectionGuides'],
    queryFn: () => base44.entities.ProtectionGuide.list(),
    initialData: []
  });

  const allGuides = guides.length > 0 ? guides : defaultGuides;
  const filteredGuides = selectedCategory === 'all' 
    ? allGuides 
    : allGuides.filter(g => g.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Shield className="w-10 h-10 text-amber-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Protection & Cleansing
            </h1>
            <p className="text-purple-100/70 text-lg max-w-2xl mx-auto">
              Sacred practices for energetic wellbeing and spiritual protection
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {Object.entries(categoryInfo).map(([key, info]) => {
              const Icon = info.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(selectedCategory === key ? 'all' : key)}
                  className={`p-6 rounded-2xl border transition-all text-left ${
                    selectedCategory === key
                      ? `bg-gradient-to-br ${info.color} border-transparent`
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-3 ${selectedCategory === key ? 'text-white' : 'text-purple-400'}`} />
                  <h3 className="text-white font-medium mb-1">{info.label}</h3>
                  <p className={`text-sm ${selectedCategory === key ? 'text-white/80' : 'text-purple-200/60'}`}>
                    {info.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Guides Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredGuides.map((guide, index) => {
              const category = categoryInfo[guide.category];
              const Icon = category?.icon || Shield;
              return (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setSelectedGuide(guide)}
                    className="w-full text-left bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category?.color || 'from-purple-500 to-violet-600'} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="border-white/20 text-purple-200/60 text-xs">
                            {category?.label}
                          </Badge>
                          <Badge variant="outline" className="border-white/20 text-purple-200/60 text-xs">
                            {guide.difficulty}
                          </Badge>
                        </div>
                        <h3 className="text-lg text-white font-medium group-hover:text-amber-300 transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-purple-200/60 text-sm mt-1">{guide.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-purple-200/50">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {guide.duration}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-purple-400 group-hover:text-amber-300 transition-colors" />
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guide Detail Modal */}
      <Dialog open={!!selectedGuide} onOpenChange={() => setSelectedGuide(null)}>
        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedGuide && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${categoryInfo[selectedGuide.category]?.color} flex items-center justify-center`}>
                    {React.createElement(categoryInfo[selectedGuide.category]?.icon || Shield, { className: "w-7 h-7 text-white" })}
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-light">{selectedGuide.title}</DialogTitle>
                    <p className="text-purple-200/60 text-sm mt-1">{selectedGuide.description}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    <Clock className="w-3 h-3 mr-1" />
                    {selectedGuide.duration}
                  </Badge>
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                    {selectedGuide.difficulty}
                  </Badge>
                </div>

                {selectedGuide.tools_needed && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-amber-300 text-sm uppercase tracking-wider mb-2">Tools Needed</h4>
                    <ul className="space-y-1">
                      {selectedGuide.tools_needed.map((tool, i) => (
                        <li key={i} className="text-white/80 text-sm flex items-center gap-2">
                          <Sparkles className="w-3 h-3 text-purple-400" />
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="prose prose-invert max-w-none">
                  <div className="text-white/90 whitespace-pre-line leading-relaxed">
                    {selectedGuide.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">
                        {paragraph.startsWith('**') ? (
                          <strong className="text-amber-300 block mb-2">
                            {paragraph.replace(/\*\*/g, '')}
                          </strong>
                        ) : paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-900/30 border border-purple-500/20 rounded-xl p-4">
                  <p className="text-purple-200/80 text-sm">
                    <Heart className="w-4 h-4 inline mr-2 text-rose-400" />
                    For personalized guidance on protection and cleansing practices, 
                    book a chakra or psychic reading with the Mystic Priestess.
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-950 to-purple-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-light text-white mb-4">
            Need Personalized Protection Guidance?
          </h2>
          <p className="text-purple-100/70 mb-8">
            Every energy field is unique. Book a reading for customized protection practices.
          </p>
          <Link to={createPageUrl('BookReading')}>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full">
              Book a Reading <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
