import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Heart, Check, ArrowRight, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const CANDLE_PRICE = 550; // Luna Credits

const spellTypes = [
  { id: 'true_love', label: 'Find True Love', emoji: '💗', description: 'Call in your divine partner and open the heart to authentic love' },
  { id: 'rekindle_flame', label: 'Rekindle an Old Flame', emoji: '🔥', description: 'Reignite connection, heal past wounds, restore loving energy' },
  { id: 'double_luck', label: 'Double Good Luck', emoji: '🍀', description: 'Amplify fortune, abundance, and positive synchronicities in your life' },
  { id: 'block_buster', label: 'Block Buster', emoji: '⚡', description: 'Remove obstacles, break stagnation, and clear the path forward' },
  { id: 'spell_reversal', label: 'Spell Reversal', emoji: '🌀', description: 'Neutralize and dissolve unwanted workings sent your way' },
  { id: 'protection', label: 'Protection', emoji: '🛡️', description: 'Create a powerful shield of divine light around you and your loved ones' },
  { id: 'cleansing', label: 'Spiritual Cleansing', emoji: '🌿', description: 'Clear negative energy, attachments, and stagnant spiritual residue' },
  { id: 'cord_cutting', label: 'Cord Cutting', emoji: '✂️', description: 'Sever unhealthy energetic ties to people, places, or past traumas' },
  { id: 'road_opener', label: 'Road Opener', emoji: '🌅', description: 'Open new paths, opportunities, and divine doors in all areas of life' },
  { id: 'return_to_sender', label: 'Return to Sender', emoji: '↩️', description: 'Redirect negative energy, hexes, or ill intentions back to their source' },
];

export default function CandleRitual() {
  const [step, setStep] = useState(1);
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [form, setForm] = useState({ client_name: '', client_email: '', client_story: '' });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: (data) => base44.entities.CandleRitual.create(data),
    onSuccess: () => {
      setSubmitted(true);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSpell || !form.client_name || !form.client_email || !form.client_story) return;
    submitMutation.mutate({
      ...form,
      spell_type: selectedSpell.id,
      credits_paid: CANDLE_PRICE,
      status: 'pending'
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6"
        style={{ background: 'linear-gradient(135deg, #0f0720, #1a0a3d, #0d0524)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center rounded-3xl p-12"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(251,191,36,0.3)' }}>
          <div className="w-20 h-20 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center mx-auto mb-6">
            <Flame className="w-10 h-10 text-amber-300" />
          </div>
          <h2 className="text-3xl font-light text-white mb-4">Your Ritual Has Been Received</h2>
          <p className="text-purple-200/70 mb-4 leading-relaxed">
            Your candle ritual request for <span className="text-amber-300">"{selectedSpell?.label}"</span> has been submitted. 
            I will begin your sacred working and send you confirmation.
          </p>
          <p className="text-purple-200/40 text-sm mb-8">
            <span className="text-amber-300">550 Luna Credits</span> will be deducted from your balance upon confirmation.
          </p>
          <Link to={createPageUrl('Services')}>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-8">
              Return to Services
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0720 0%, #1a0a3d 40%, #0d0524 100%)' }}>
      {/* Hero */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-center mb-6">
              <div className="p-5 rounded-full" style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}>
                <Flame className="w-12 h-12 text-amber-300" />
              </div>
            </div>
            <h1 className="text-5xl font-light text-white mb-4" style={{ textShadow: '0 0 40px rgba(251,191,36,0.3)' }}>
              Lightworker Ritual Candle
            </h1>
            <p className="text-purple-200/70 text-lg max-w-xl mx-auto mb-3">
              A sacred candle ritual performed by your spiritual guide on your behalf
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm"
              style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)' }}>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-amber-200">550 Luna Credits · $55.00</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Step indicator */}
      <div className="flex justify-center gap-3 mb-10 px-6">
        {[1, 2, 3].map(s => (
          <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
            step === s ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' :
            step > s ? 'bg-emerald-500/30 border border-emerald-500/50 text-emerald-300' :
            'bg-white/5 border border-white/10 text-purple-300/50'
          }`}>
            {step > s ? <Check className="w-4 h-4" /> : s}
          </div>
        ))}
        <div className="flex items-center gap-3 ml-2 text-sm text-purple-200/40">
          <span className={step >= 1 ? 'text-white' : ''}>Choose Spell</span>
          <span>·</span>
          <span className={step >= 2 ? 'text-white' : ''}>Your Story</span>
          <span>·</span>
          <span className={step >= 3 ? 'text-white' : ''}>Confirm</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          {/* Step 1: Choose spell */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-light text-white text-center mb-8">Choose Your Intention</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {spellTypes.map(spell => (
                  <motion.button key={spell.id} type="button" whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedSpell(spell)}
                    className={`text-left p-5 rounded-2xl border transition-all ${
                      selectedSpell?.id === spell.id
                        ? 'border-amber-400/60 bg-amber-400/10'
                        : 'border-white/10 bg-white/3 hover:border-white/20'
                    }`}
                    style={selectedSpell?.id === spell.id ? {} : { background: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-start gap-3">
                      <span className="text-3xl shrink-0">{spell.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white font-medium">{spell.label}</p>
                          {selectedSpell?.id === spell.id && <Check className="w-4 h-4 text-amber-300" />}
                        </div>
                        <p className="text-purple-200/50 text-sm leading-relaxed">{spell.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button onClick={() => selectedSpell && setStep(2)} disabled={!selectedSpell}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-10 py-5">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Your story */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-4xl">{selectedSpell?.emoji}</span>
                <h2 className="text-2xl font-light text-white mt-3 mb-1">{selectedSpell?.label}</h2>
                <p className="text-purple-200/50 text-sm">Tell me your story so I can make this ritual personal to you</p>
              </div>
              <div className="rounded-3xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-purple-200/70 text-xs mb-2 block">Your Name *</label>
                      <Input value={form.client_name} onChange={e => setForm(p => ({ ...p, client_name: e.target.value }))}
                        placeholder="Full name" required
                        className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl" />
                    </div>
                    <div>
                      <label className="text-purple-200/70 text-xs mb-2 block">Your Email *</label>
                      <Input type="email" value={form.client_email} onChange={e => setForm(p => ({ ...p, client_email: e.target.value }))}
                        placeholder="your@email.com" required
                        className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label className="text-purple-200/70 text-xs mb-2 block">Your Story *</label>
                    <p className="text-purple-200/40 text-xs mb-3">
                      Share the context around your intention. A few lines or a short paragraph — the more I understand, the more powerful the ritual.
                    </p>
                    <Textarea value={form.client_story} onChange={e => setForm(p => ({ ...p, client_story: e.target.value }))}
                      placeholder="Share what's in your heart... what brought you here, what you're seeking, who or what this is for..."
                      required className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/30 rounded-xl min-h-[150px] resize-none" />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button type="button" onClick={() => setStep(1)} variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full flex-1">
                    Back
                  </Button>
                  <Button onClick={() => {
                    if (form.client_name && form.client_email && form.client_story) setStep(3);
                  }}
                    disabled={!form.client_name || !form.client_email || !form.client_story}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full flex-1">
                    Review & Submit <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-light text-white text-center mb-8">Review Your Ritual Request</h2>
              <div className="rounded-3xl p-8 mb-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(251,191,36,0.3)' }}>
                <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="text-5xl">{selectedSpell?.emoji}</span>
                  <div>
                    <p className="text-white font-medium text-xl">{selectedSpell?.label}</p>
                    <p className="text-purple-200/50 text-sm">Lightworker Ritual Candle</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-purple-200/50">Name</span>
                    <span className="text-white">{form.client_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200/50">Email</span>
                    <span className="text-white">{form.client_email}</span>
                  </div>
                  <div>
                    <span className="text-purple-200/50 block mb-2">Your Story</span>
                    <p className="text-white/80 text-sm leading-relaxed bg-white/5 rounded-xl p-4 italic">"{form.client_story}"</p>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-2xl p-4" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
                  <div>
                    <p className="text-amber-300 font-medium">550 Luna Credits</p>
                    <p className="text-purple-200/40 text-xs">$55.00 equivalent</p>
                  </div>
                  <Shield className="w-6 h-6 text-amber-300/60" />
                </div>
              </div>
              <div className="rounded-2xl p-4 mb-6 text-sm text-purple-200/50"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                  Your ritual will begin within 1–3 days. I may contact you via the messaging system if I need additional information.
                  If I request a photo, you'll receive a message in your inbox with instructions.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-3">
                  <Button type="button" onClick={() => setStep(2)} variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full flex-1">
                    Back
                  </Button>
                  <Button type="submit" disabled={submitMutation.isPending}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full flex-1 py-5">
                    <Flame className="w-4 h-4 mr-2" />
                    {submitMutation.isPending ? 'Submitting...' : 'Submit Ritual Request'}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}