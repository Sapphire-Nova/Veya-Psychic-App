import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Crown, Sparkles, Moon, Star, Gift, BookOpen,
  Calendar, CheckCircle, ArrowRight, Sun, Zap, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import PurchaseCreditsModal from '@/components/credits/PurchaseCreditsModal';

const creditBundles = [
  { label: 'Glow', credits: 100, price: '$10', priceId: 'prod_U7XiFadI1PgAcx', color: 'from-amber-400 to-yellow-500' },
  { label: 'Sparkle', credits: 50, price: '$5', priceId: 'prod_U7XiNpl7HKOL9f', color: 'from-violet-400 to-purple-500' },
  { label: 'Radiance', credits: 250, price: '$25', priceId: 'prod_U7XiEaY4ZV9i3c', color: 'from-rose-400 to-pink-500', popular: true },
];

export default function Sanctuary() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showPurchase, setShowPurchase] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  useEffect(() => {
    if (user?.email) {
      base44.entities.UserProfile.filter({ email: user.email }, '-created_date', 1)
        .then(res => setProfile(res[0] || null))
        .catch(() => {});
    }
  }, [user]);

  const { data: journalEntries = [] } = useQuery({
    queryKey: ['journalEntriesSanctuary'],
    queryFn: () => base44.entities.JournalEntry.list('-date', 5),
  });

  const { data: quizResults = [] } = useQuery({
    queryKey: ['soulPathResults'],
    queryFn: () => base44.entities.PriestessQuestion.filter(
      user?.email ? { email: user.email } : {},
      '-created_date', 5
    ),
    enabled: !!user?.email,
  });

  const { data: moonRegistrations = [] } = useQuery({
    queryKey: ['moonRegistrationsSanctuary'],
    queryFn: () => base44.entities.SessionParticipant.filter(
      user?.email ? { email: user.email } : {},
      '-created_date', 10
    ),
    enabled: !!user?.email,
  });

  const { data: moonSessions = [] } = useQuery({
    queryKey: ['moonSessionsSanctuary'],
    queryFn: () => base44.entities.LiveSession.filter({ session_type: 'meditation' }, 'scheduled_date', 20),
  });

  const { data: dailyGuidance = [] } = useQuery({
    queryKey: ['latestDailyGuidance'],
    queryFn: () => base44.entities.DailyExperience.list('-date', 3),
  });

  const coinBalance = profile?.coin_balance || 0;

  const getSessionTitle = (sessionId) => {
    const s = moonSessions.find(s => s.id === sessionId);
    if (!s) return 'Full Moon Circle';
    const match = s.title.match(/— (.+)$/);
    return match ? match[1] : s.title;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Crown },
    { id: 'credits', label: 'Credits', icon: Sparkles },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'circles', label: 'Moon Circles', icon: Moon },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-16 px-6 bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Crown className="w-10 h-10 text-amber-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-3">The Sanctuary</h1>
            <p className="text-purple-200/70 text-lg mb-6">Your spiritual home — credits, journal, and sacred circles</p>
            {/* Credit balance pill */}
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-full px-6 py-3 text-amber-300 text-lg font-light">
              <Sparkles className="w-5 h-5" />
              <span>{coinBalance.toLocaleString()} Luna Credits</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 md:top-20 z-30 bg-slate-950/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 flex gap-1 overflow-x-auto scrollbar-hide py-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                  : 'text-purple-200/60 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <Sparkles className="w-7 h-7 text-amber-400 mx-auto mb-2" />
                <p className="text-2xl text-white font-light">{coinBalance}</p>
              <p className="text-purple-200/50 text-xs mt-1">Luna Credits</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <BookOpen className="w-7 h-7 text-violet-400 mx-auto mb-2" />
                <p className="text-2xl text-white font-light">{journalEntries.length}</p>
                <p className="text-purple-200/50 text-xs mt-1">Journal Entries</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <Moon className="w-7 h-7 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl text-white font-light">{moonRegistrations.length}</p>
                <p className="text-purple-200/50 text-xs mt-1">Moon Circles</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <Sun className="w-7 h-7 text-orange-400 mx-auto mb-2" />
                <p className="text-2xl text-white font-light">{dailyGuidance.length > 0 ? '✓' : '—'}</p>
                <p className="text-purple-200/50 text-xs mt-1">Today's Guidance</p>
              </div>
            </div>

            {/* Latest Daily Guidance */}
            {dailyGuidance[0] && (
              <div className="bg-gradient-to-br from-amber-950/40 to-orange-950/30 border border-amber-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-300" />
                    <span className="text-amber-300 text-sm font-medium">Today's Guidance</span>
                  </div>
                  <Link to={createPageUrl('DailyGuidance')} className="text-purple-300/60 hover:text-white text-xs flex items-center gap-1">
                    View full <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <h3 className="text-white font-medium mb-2">{dailyGuidance[0].tarot_card}</h3>
                <p className="text-purple-200/70 text-sm leading-relaxed line-clamp-3">{dailyGuidance[0].channeled_message}</p>
                {dailyGuidance[0].affirmation && (
                  <p className="mt-3 text-amber-300/80 text-sm italic">"{dailyGuidance[0].affirmation}"</p>
                )}
              </div>
            )}

            {/* Quick Links */}
            <div className="grid md:grid-cols-2 gap-4">
              <Link to={createPageUrl('JourneyTracker')}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all flex items-center gap-4">
                  <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Spiritual Journal</p>
                    <p className="text-purple-200/50 text-sm">{journalEntries.length} entries</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 ml-auto" />
                </div>
              </Link>
              <Link to={createPageUrl('FullMoonCircle')}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                    <Moon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Full Moon Circles</p>
                    <p className="text-purple-200/50 text-sm">{moonRegistrations.length} registered</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 ml-auto" />
                </div>
              </Link>
              <Link to={createPageUrl('SoulPathQuiz')}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Soul Path Quiz</p>
                    <p className="text-purple-200/50 text-sm">Discover your path</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 ml-auto" />
                </div>
              </Link>
              <Link to={createPageUrl('ChakraCheckIn')}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Chakra Check-In</p>
                    <p className="text-purple-200/50 text-sm">Balance your energy</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 ml-auto" />
                </div>
              </Link>
            </div>
          </motion.div>
        )}

        {/* CREDITS TAB */}
        {activeTab === 'credits' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Balance card */}
            <div className="bg-gradient-to-br from-amber-950/50 to-orange-950/30 border border-amber-500/20 rounded-3xl p-8 text-center">
              <Sparkles className="w-10 h-10 text-amber-300 mx-auto mb-4" />
              <p className="text-purple-200/60 text-sm uppercase tracking-wider mb-2">Current Balance</p>
              <p className="text-6xl font-light text-amber-300 mb-2">{coinBalance.toLocaleString()}</p>
              <p className="text-purple-200/50 text-sm">Luna Credits · 10 credits = $1.00 · 1 credit = $0.10</p>
            </div>

            {/* Buy bundles */}
            <div>
              <h3 className="text-white font-medium text-lg mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400" /> Top Up Credits
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {creditBundles.map(bundle => (
                  <div key={bundle.label}
                    className={`relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center ${bundle.popular ? 'border-amber-400/40' : ''}`}>
                    {bundle.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                        Best Value
                      </div>
                    )}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bundle.color} flex items-center justify-center mx-auto mb-4`}>
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-white font-medium text-lg">{bundle.label}</p>
                    <p className="text-amber-300 text-3xl font-light my-2">{bundle.credits}</p>
                    <p className="text-purple-200/50 text-sm mb-4">credits · {bundle.price}</p>
                    <Button
                      onClick={() => setShowPurchase(true)}
                      className={`w-full bg-gradient-to-r ${bundle.color} text-white rounded-full`}
                    >
                      Purchase
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Services price list */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" /> Services & Pricing
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Full Tarot Reading', credits: 440, duration: '60 min' },
                  { name: 'Mediumship Reading', credits: 880, duration: '60 min' },
                  { name: 'Distant Reiki Healing', credits: 300, duration: '15 min' },
                  { name: 'Lightworker Ritual Candle', credits: 550, duration: 'Ritual' },
                  { name: 'Live Personal Guidance', credits: 150, duration: 'Live only' },
                ].map(s => (
                  <div key={s.name} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-white text-sm">{s.name}</p>
                      <p className="text-purple-200/40 text-xs">{s.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-300 text-sm font-medium">{s.credits} credits</p>
                      <p className="text-purple-200/40 text-xs">${(s.credits / 10).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to={createPageUrl('BookReading')}>
                <Button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
                  Book a Reading
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* JOURNAL TAB */}
        {activeTab === 'journal' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-light">Recent Journal Entries</h2>
              <Link to={createPageUrl('JourneyTracker')}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full text-sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            {journalEntries.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-purple-400/30 mx-auto mb-4" />
                <p className="text-purple-200/50">No journal entries yet.</p>
                <Link to={createPageUrl('JourneyTracker')}>
                  <Button className="mt-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full px-6">
                    Start Your Journal
                  </Button>
                </Link>
              </div>
            ) : (
              journalEntries.map(entry => (
                <div key={entry.id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-center">
                      <p className="text-purple-200/50 text-xs">{entry.date ? format(new Date(entry.date), 'MMM') : ''}</p>
                      <p className="text-white text-xl font-light">{entry.date ? format(new Date(entry.date), 'd') : ''}</p>
                    </div>
                    <div>
                      {entry.entry_type === 'dream' ? (
                        <span className="text-indigo-300 text-sm font-medium">🌙 Dream: {entry.dream_title || 'Untitled'}</span>
                      ) : (
                        <span className="text-purple-200/80 text-sm font-medium">✨ Spiritual Entry</span>
                      )}
                      {entry.mood && <p className="text-purple-200/40 text-xs">{entry.mood}</p>}
                    </div>
                  </div>
                  {entry.insights && <p className="text-purple-200/60 text-sm line-clamp-2">{entry.insights}</p>}
                  {entry.dream_description && <p className="text-indigo-200/60 text-sm line-clamp-2 italic">"{entry.dream_description}"</p>}
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* MOON CIRCLES TAB */}
        {activeTab === 'circles' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-light">My Moon Circle Registrations</h2>
              <Link to={createPageUrl('FullMoonCircle')}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full text-sm">
                  Browse Circles <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            {moonRegistrations.length === 0 ? (
              <div className="text-center py-16">
                <Moon className="w-16 h-16 text-purple-400/30 mx-auto mb-4" />
                <p className="text-purple-200/50">You haven't signed up for a Full Moon Circle yet.</p>
                <p className="text-purple-200/30 text-sm mt-2">After you register, a Zoom link will be sent to your email.</p>
                <Link to={createPageUrl('FullMoonCircle')}>
                  <Button className="mt-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full px-6">
                    🌕 View Upcoming Circles
                  </Button>
                </Link>
              </div>
            ) : (
              moonRegistrations.map(reg => (
                <div key={reg.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center text-2xl shrink-0">
                    🌕
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{getSessionTitle(reg.session_id)}</p>
                    <p className="text-purple-200/50 text-sm">Full Moon Energy Circle</p>
                    {reg.question && <p className="text-purple-200/40 text-xs mt-1 italic">Intention: "{reg.question}"</p>}
                  </div>
                  <div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      reg.status === 'confirmed'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {reg.status === 'confirmed' ? (
                        <><CheckCircle className="w-3 h-3 inline mr-1" />Confirmed</>
                      ) : 'Pending'}
                    </span>
                  </div>
                </div>
              ))
            )}

            <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-2xl p-5 mt-6">
              <p className="text-indigo-200/80 text-sm leading-relaxed">
                <span className="text-indigo-300 font-medium">How it works:</span> After you register for a circle, 
                your spot will be manually confirmed. Once confirmed, a Zoom link will be emailed to you 
                or sent directly through the app before the session begins at 6:00 PM Pacific Time.
              </p>
            </div>
          </motion.div>
        )}

      </div>

      <PurchaseCreditsModal isOpen={showPurchase} onClose={() => setShowPurchase(false)} />
    </div>
  );
}