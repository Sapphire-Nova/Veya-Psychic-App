import React, { useState, useCallback } from 'react';
import PullToRefresh from '@/components/ui/PullToRefresh';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Plus, Calendar, Sparkles, Heart,
  TrendingUp, Moon, Sun, Battery, X, Eye, Wand2, Cloud
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { format, subDays } from 'date-fns';

const moods = [
  { id: 'peaceful', label: 'Peaceful', emoji: '😌', color: 'bg-cyan-500' },
  { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-yellow-500' },
  { id: 'hopeful', label: 'Hopeful', emoji: '🌟', color: 'bg-amber-500' },
  { id: 'heavy', label: 'Heavy', emoji: '😔', color: 'bg-slate-500' },
  { id: 'energized', label: 'Energized', emoji: '⚡', color: 'bg-orange-500' },
  { id: 'drained', label: 'Drained', emoji: '😴', color: 'bg-purple-500' },
  { id: 'balanced', label: 'Balanced', emoji: '☯️', color: 'bg-emerald-500' },
  { id: 'uncertain', label: 'Uncertain', emoji: '🤔', color: 'bg-indigo-500' }
];

const chakras = [
  { id: 'root', name: 'Root', color: 'bg-red-500' },
  { id: 'sacral', name: 'Sacral', color: 'bg-orange-500' },
  { id: 'solar_plexus', name: 'Solar Plexus', color: 'bg-yellow-500' },
  { id: 'heart', name: 'Heart', color: 'bg-green-500' },
  { id: 'throat', name: 'Throat', color: 'bg-blue-400' },
  { id: 'third_eye', name: 'Third Eye', color: 'bg-indigo-500' },
  { id: 'crown', name: 'Crown', color: 'bg-violet-500' }
];

const dreamClarities = [
  { id: 'vivid', label: 'Vivid', emoji: '✨', desc: 'Crystal clear' },
  { id: 'lucid', label: 'Lucid', emoji: '🌀', desc: 'I knew I was dreaming' },
  { id: 'hazy', label: 'Hazy', emoji: '🌫️', desc: 'Somewhat blurry' },
  { id: 'fragmented', label: 'Fragmented', emoji: '🧩', desc: 'Bits & pieces' },
];

export default function JourneyTracker() {
  const [activeTab, setActiveTab] = useState('spiritual');
  const [showForm, setShowForm] = useState(false);
  const [showDreamForm, setShowDreamForm] = useState(false);
  const [interpretingId, setInterpretingId] = useState(null);
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    mood: '',
    energy_level: 5,
    chakra_focus: '',
    insights: '',
    gratitude: '',
    intentions: ''
  });
  const [dreamForm, setDreamForm] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    dream_title: '',
    dream_description: '',
    dream_emotions: '',
    dream_symbols: '',
    dream_clarity: ''
  });

  const queryClient = useQueryClient();

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries(['journalEntries']);
  }, [queryClient]);

  const { data: entries, isLoading } = useQuery({
    queryKey: ['journalEntries'],
    queryFn: () => base44.entities.JournalEntry.list('-date', 50),
    initialData: []
  });

  const spiritualEntries = entries.filter(e => !e.entry_type || e.entry_type === 'spiritual');
  const dreamEntries = entries.filter(e => e.entry_type === 'dream');

  const createEntry = useMutation({
    mutationFn: (data) => base44.entities.JournalEntry.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['journalEntries']);
      setShowForm(false);
      setFormData({ date: format(new Date(), 'yyyy-MM-dd'), mood: '', energy_level: 5, chakra_focus: '', insights: '', gratitude: '', intentions: '' });
    }
  });

  const createDreamEntry = useMutation({
    mutationFn: (data) => base44.entities.JournalEntry.create({ ...data, entry_type: 'dream' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['journalEntries']);
      setShowDreamForm(false);
      setDreamForm({ date: format(new Date(), 'yyyy-MM-dd'), dream_title: '', dream_description: '', dream_emotions: '', dream_symbols: '', dream_clarity: '' });
    }
  });

  const updateEntry = useMutation({
    mutationFn: ({ id, data }) => base44.entities.JournalEntry.update(id, data),
    onSuccess: () => queryClient.invalidateQueries(['journalEntries'])
  });

  const handleInterpretDream = async (entry) => {
    setInterpretingId(entry.id);
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a spiritual dream interpreter with deep knowledge of Jungian archetypes, symbolism, and mystical traditions.
      
Interpret this dream for the dreamer:
Title: "${entry.dream_title || 'Untitled Dream'}"
Dream: "${entry.dream_description}"
Emotions felt: "${entry.dream_emotions || 'not specified'}"
Symbols noticed: "${entry.dream_symbols || 'not specified'}"
Clarity: "${entry.dream_clarity || 'not specified'}"

Provide a warm, insightful 3-4 sentence spiritual interpretation covering: what the subconscious may be communicating, key symbols and their meaning, and a gentle spiritual message or guidance for the dreamer.`
    });
    await updateEntry.mutateAsync({ id: entry.id, data: { dream_interpretation: result } });
    setInterpretingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEntry.mutate(formData);
  };

  const handleDreamSubmit = (e) => {
    e.preventDefault();
    createDreamEntry.mutate(dreamForm);
  };

  // Calculate stats
  const avgEnergy = spiritualEntries.length > 0 
    ? (spiritualEntries.reduce((sum, e) => sum + (e.energy_level || 5), 0) / spiritualEntries.length).toFixed(1)
    : 0;

  const moodCounts = spiritualEntries.reduce((acc, e) => {
    if (e.mood) acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {});

  const topMood = Object.entries(moodCounts).sort(([,a], [,b]) => b - a)[0]?.[0];

  const lucidCount = dreamEntries.filter(e => e.dream_clarity === 'lucid').length;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-rose-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <BookOpen className="w-10 h-10 text-amber-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Spiritual Journey Tracker
            </h1>
            <p className="text-purple-100/70 text-lg max-w-2xl mx-auto">
              Track your moods, energy, and insights to see your spiritual progress
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="py-8 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex gap-1 p-1 rounded-full bg-white/5 border border-white/10">
              <button onClick={() => setActiveTab('spiritual')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${activeTab === 'spiritual' ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white' : 'text-purple-200/60 hover:text-white'}`}>
                <BookOpen className="w-4 h-4" /> Spiritual Journal
              </button>
              <button onClick={() => setActiveTab('dream')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${activeTab === 'dream' ? 'bg-gradient-to-r from-indigo-500 to-blue-700 text-white' : 'text-purple-200/60 hover:text-white'}`}>
                <Moon className="w-4 h-4" /> Dream Journal
              </button>
            </div>
          </div>

          {/* SPIRITUAL TAB */}
          <AnimatePresence mode="wait">
          {activeTab === 'spiritual' && (
            <motion.div key="spiritual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-3xl text-white font-light">{spiritualEntries.length}</p>
                  <p className="text-purple-200/60 text-sm">Journal Entries</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <Battery className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-3xl text-white font-light">{avgEnergy}/10</p>
                  <p className="text-purple-200/60 text-sm">Avg Energy</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <Heart className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                  <p className="text-3xl text-white font-light">{topMood ? moods.find(m => m.id === topMood)?.emoji : '—'}</p>
                  <p className="text-purple-200/60 text-sm">Common Mood</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-3xl text-white font-light">
                    {spiritualEntries.filter(e => new Date(e.date) >= subDays(new Date(), 7)).length}
                  </p>
                  <p className="text-purple-200/60 text-sm">This Week</p>
                </div>
              </div>

              <div className="text-center mb-8">
                <Button onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full">
                  <Plus className="w-5 h-5 mr-2" /> New Journal Entry
                </Button>
              </div>

              <div className="space-y-4">
                {spiritualEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <Moon className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                    <p className="text-purple-200/60">No journal entries yet.</p>
                    <p className="text-purple-200/40 text-sm mt-2">Start tracking your spiritual journey today!</p>
                  </div>
                ) : (
                  spiritualEntries.map((entry) => {
                    const mood = moods.find(m => m.id === entry.mood);
                    const chakra = chakras.find(c => c.id === entry.chakra_focus);
                    return (
                      <motion.div key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <p className="text-purple-200/60 text-sm">{format(new Date(entry.date), 'MMM')}</p>
                              <p className="text-2xl text-white font-light">{format(new Date(entry.date), 'd')}</p>
                            </div>
                            {mood && <div className="flex items-center gap-2"><span className="text-2xl">{mood.emoji}</span><span className="text-white">{mood.label}</span></div>}
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Battery className="w-4 h-4 text-amber-400" />
                              <span className="text-amber-300">{entry.energy_level}/10</span>
                            </div>
                            {chakra && <div className={`w-6 h-6 rounded-full ${chakra.color}`} title={chakra.name} />}
                          </div>
                        </div>
                        {entry.insights && <div className="mb-3"><p className="text-purple-300 text-sm mb-1">Insights</p><p className="text-white/80">{entry.insights}</p></div>}
                        {entry.gratitude && <div className="mb-3"><p className="text-rose-300 text-sm mb-1">Gratitude</p><p className="text-white/80">{entry.gratitude}</p></div>}
                        {entry.intentions && <div><p className="text-amber-300 text-sm mb-1">Intentions</p><p className="text-white/80">{entry.intentions}</p></div>}
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}

          {/* DREAM JOURNAL TAB */}
          {activeTab === 'dream' && (
            <motion.div key="dream" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Dream hero banner */}
              <div className="rounded-3xl p-8 mb-8 relative overflow-hidden text-center"
                style={{ background: 'linear-gradient(135deg, #0d0b2e 0%, #1a1050 50%, #0a0824 100%)', border: '1px solid rgba(99,102,241,0.3)' }}>
                <div className="absolute inset-0">
                  {[...Array(12)].map((_, i) => (
                    <motion.div key={i} className="absolute rounded-full bg-indigo-400/20"
                      style={{ width: Math.random() * 6 + 2, height: Math.random() * 6 + 2, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                      animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }} />
                  ))}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mx-auto mb-4">
                    <Moon className="w-8 h-8 text-indigo-300" />
                  </div>
                  <h2 className="text-2xl font-light text-white mb-2">Dream Journal</h2>
                  <p className="text-indigo-200/60 text-sm max-w-md mx-auto">
                    Record your dreams upon waking. Let the subconscious speak. AI can help you interpret the symbols and messages within.
                  </p>
                </div>
              </div>

              {/* Dream Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-indigo-950/50 border border-indigo-500/20 rounded-2xl p-5 text-center">
                  <Cloud className="w-7 h-7 text-indigo-300 mx-auto mb-2" />
                  <p className="text-2xl text-white font-light">{dreamEntries.length}</p>
                  <p className="text-indigo-200/50 text-sm">Dreams Recorded</p>
                </div>
                <div className="bg-indigo-950/50 border border-indigo-500/20 rounded-2xl p-5 text-center">
                  <Eye className="w-7 h-7 text-violet-300 mx-auto mb-2" />
                  <p className="text-2xl text-white font-light">{lucidCount}</p>
                  <p className="text-indigo-200/50 text-sm">Lucid Dreams</p>
                </div>
                <div className="bg-indigo-950/50 border border-indigo-500/20 rounded-2xl p-5 text-center">
                  <Sparkles className="w-7 h-7 text-amber-300 mx-auto mb-2" />
                  <p className="text-2xl text-white font-light">{dreamEntries.filter(e => e.dream_interpretation).length}</p>
                  <p className="text-indigo-200/50 text-sm">Interpreted</p>
                </div>
              </div>

              <div className="text-center mb-8">
                <Button onClick={() => setShowDreamForm(true)}
                  className="text-white px-8 py-4 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                  <Moon className="w-5 h-5 mr-2" /> Record a Dream
                </Button>
              </div>

              <div className="space-y-6">
                {dreamEntries.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-indigo-900/30 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                      <Moon className="w-10 h-10 text-indigo-400 opacity-50" />
                    </div>
                    <p className="text-indigo-200/60">No dreams recorded yet.</p>
                    <p className="text-indigo-200/30 text-sm mt-2">Keep this journal by your bed and write upon waking.</p>
                  </div>
                ) : (
                  dreamEntries.map((entry) => {
                    const clarity = dreamClarities.find(c => c.id === entry.dream_clarity);
                    return (
                      <motion.div key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl p-6 relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, rgba(13,11,46,0.8) 0%, rgba(26,16,80,0.8) 100%)', border: '1px solid rgba(99,102,241,0.25)' }}>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <Moon className="w-4 h-4 text-indigo-400" />
                              <h3 className="text-white font-medium">{entry.dream_title || 'Untitled Dream'}</h3>
                              {clarity && <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{clarity.emoji} {clarity.label}</span>}
                            </div>
                            <p className="text-indigo-200/40 text-xs">{format(new Date(entry.date), 'MMMM d, yyyy')}</p>
                          </div>
                        </div>

                        {entry.dream_description && (
                          <p className="text-indigo-100/80 text-sm leading-relaxed mb-4 italic">"{entry.dream_description}"</p>
                        )}

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {entry.dream_emotions && (
                            <div className="bg-indigo-500/10 rounded-xl p-3">
                              <p className="text-indigo-300 text-xs mb-1 flex items-center gap-1"><Heart className="w-3 h-3" /> Emotions</p>
                              <p className="text-white/70 text-sm">{entry.dream_emotions}</p>
                            </div>
                          )}
                          {entry.dream_symbols && (
                            <div className="bg-violet-500/10 rounded-xl p-3">
                              <p className="text-violet-300 text-xs mb-1 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Symbols</p>
                              <p className="text-white/70 text-sm">{entry.dream_symbols}</p>
                            </div>
                          )}
                        </div>

                        {entry.dream_interpretation ? (
                          <div className="rounded-xl p-4" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.2)' }}>
                            <p className="text-amber-300 text-xs mb-2 flex items-center gap-1"><Wand2 className="w-3 h-3" /> Spiritual Interpretation</p>
                            <p className="text-amber-100/80 text-sm leading-relaxed">{entry.dream_interpretation}</p>
                          </div>
                        ) : (
                          <Button onClick={() => handleInterpretDream(entry)} disabled={interpretingId === entry.id}
                            variant="outline"
                            className="border-indigo-400/30 text-indigo-300 hover:bg-indigo-500/10 rounded-full text-sm">
                            {interpretingId === entry.id ? (
                              <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}><Sparkles className="w-4 h-4 mr-2 inline" /></motion.span>Interpreting...</>
                            ) : (
                              <><Wand2 className="w-4 h-4 mr-2" />Interpret with AI</>
                            )}
                          </Button>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </section>

      {/* Dream Form Modal */}
      {showDreamForm && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto"
          style={{ backdropFilter: 'blur(8px)' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl p-6 max-w-lg w-full my-8"
            style={{ background: 'linear-gradient(135deg, #0d0b2e, #1a1050)', border: '1px solid rgba(99,102,241,0.4)' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Moon className="w-6 h-6 text-indigo-300" />
                <h2 className="text-2xl text-white font-light">Record a Dream</h2>
              </div>
              <button onClick={() => setShowDreamForm(false)} className="text-indigo-300 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleDreamSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-indigo-200/70 text-xs mb-2 block">Date</label>
                  <Input type="date" value={dreamForm.date} onChange={(e) => setDreamForm({ ...dreamForm, date: e.target.value })}
                    className="bg-white/5 border-indigo-500/30 text-white rounded-xl h-11" />
                </div>
                <div>
                  <label className="text-indigo-200/70 text-xs mb-2 block">Dream Title</label>
                  <Input value={dreamForm.dream_title} onChange={(e) => setDreamForm({ ...dreamForm, dream_title: e.target.value })}
                    placeholder="Give it a name..." className="bg-white/5 border-indigo-500/30 text-white rounded-xl h-11 placeholder:text-indigo-300/30" />
                </div>
              </div>

              <div>
                <label className="text-indigo-200/70 text-xs mb-2 block">Dream Clarity</label>
                <div className="grid grid-cols-4 gap-2">
                  {dreamClarities.map(c => (
                    <button key={c.id} type="button" onClick={() => setDreamForm({ ...dreamForm, dream_clarity: c.id })}
                      className={`p-3 rounded-xl border text-center transition-all ${dreamForm.dream_clarity === c.id ? 'bg-indigo-500/30 border-indigo-400/60' : 'bg-white/5 border-white/10 hover:border-indigo-400/30'}`}>
                      <span className="text-lg block">{c.emoji}</span>
                      <span className="text-xs text-indigo-200/60">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-indigo-200/70 text-xs mb-2 block">Describe your dream *</label>
                <Textarea required value={dreamForm.dream_description} onChange={(e) => setDreamForm({ ...dreamForm, dream_description: e.target.value })}
                  placeholder="What happened in your dream? Write as much as you remember..."
                  className="bg-white/5 border-indigo-500/30 text-white rounded-xl min-h-[100px] resize-none placeholder:text-indigo-300/30" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-indigo-200/70 text-xs mb-2 block">Emotions felt</label>
                  <Textarea value={dreamForm.dream_emotions} onChange={(e) => setDreamForm({ ...dreamForm, dream_emotions: e.target.value })}
                    placeholder="Fear, joy, peace..." className="bg-white/5 border-indigo-500/30 text-white rounded-xl min-h-[70px] resize-none placeholder:text-indigo-300/30 text-sm" />
                </div>
                <div>
                  <label className="text-indigo-200/70 text-xs mb-2 block">Symbols / Themes</label>
                  <Textarea value={dreamForm.dream_symbols} onChange={(e) => setDreamForm({ ...dreamForm, dream_symbols: e.target.value })}
                    placeholder="Water, flying, a figure..." className="bg-white/5 border-indigo-500/30 text-white rounded-xl min-h-[70px] resize-none placeholder:text-indigo-300/30 text-sm" />
                </div>
              </div>

              <Button type="submit" disabled={createDreamEntry.isPending}
                className="w-full text-white py-4 rounded-full"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                {createDreamEntry.isPending ? 'Saving Dream...' : '🌙 Save Dream Entry'}
              </Button>
            </form>
          </motion.div>
        </div>
      )}

      {/* New Entry Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-white/10 rounded-3xl p-6 max-w-lg w-full my-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-white font-light">New Journal Entry</h2>
              <button onClick={() => setShowForm(false)} className="text-purple-300 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mood */}
              <div>
                <label className="text-purple-200 text-sm mb-3 block">How are you feeling?</label>
                <div className="grid grid-cols-4 gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, mood: mood.id })}
                      className={`p-3 rounded-xl border transition-all text-center ${
                        formData.mood === mood.id
                          ? 'bg-purple-500/30 border-purple-400/50'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-xl block">{mood.emoji}</span>
                      <span className="text-xs text-purple-200/60">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy Level */}
              <div>
                <label className="text-purple-200 text-sm mb-3 block">
                  Energy Level: <span className="text-amber-300">{formData.energy_level}/10</span>
                </label>
                <Slider
                  value={[formData.energy_level]}
                  onValueChange={([value]) => setFormData({ ...formData, energy_level: value })}
                  max={10}
                  min={1}
                  step={1}
                  className="py-4"
                />
              </div>

              {/* Chakra Focus */}
              <div>
                <label className="text-purple-200 text-sm mb-3 block">Chakra Focus (optional)</label>
                <div className="flex gap-2 flex-wrap">
                  {chakras.map((chakra) => (
                    <button
                      key={chakra.id}
                      type="button"
                      onClick={() => setFormData({ 
                        ...formData, 
                        chakra_focus: formData.chakra_focus === chakra.id ? '' : chakra.id 
                      })}
                      className={`w-10 h-10 rounded-full transition-all ${chakra.color} ${
                        formData.chakra_focus === chakra.id ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'opacity-50 hover:opacity-100'
                      }`}
                      title={chakra.name}
                    />
                  ))}
                </div>
              </div>

              {/* Insights */}
              <div>
                <label className="text-purple-200 text-sm mb-1 block">Insights & Reflections</label>
                <p className="text-purple-400/50 text-xs italic mb-2">
                  Prompt: What pattern in your life is asking to be seen right now? What would your highest self say about it?
                </p>
                <Textarea
                  value={formData.insights}
                  onChange={(e) => setFormData({ ...formData, insights: e.target.value })}
                  placeholder="What came up for you today? What is your inner voice saying?"
                  className="bg-white/5 border-white/20 text-white rounded-xl min-h-[80px] resize-none placeholder:text-purple-300/30"
                />
              </div>

              {/* Gratitude */}
              <div>
                <label className="text-purple-200 text-sm mb-1 block">Gratitude</label>
                <p className="text-purple-400/50 text-xs italic mb-2">
                  Prompt: What small, overlooked blessing showed up today? How does it shift your perspective?
                </p>
                <Textarea
                  value={formData.gratitude}
                  onChange={(e) => setFormData({ ...formData, gratitude: e.target.value })}
                  placeholder="Name 1–3 things, big or small, that you are thankful for..."
                  className="bg-white/5 border-white/20 text-white rounded-xl min-h-[60px] resize-none placeholder:text-purple-300/30"
                />
              </div>

              {/* Intentions */}
              <div>
                <label className="text-purple-200 text-sm mb-1 block">Intentions</label>
                <p className="text-purple-400/50 text-xs italic mb-2">
                  Prompt: What do you need to release to move forward? What energy do you want to call in?
                </p>
                <Textarea
                  value={formData.intentions}
                  onChange={(e) => setFormData({ ...formData, intentions: e.target.value })}
                  placeholder="Set a clear, heart-aligned intention for today or the week ahead..."
                  className="bg-white/5 border-white/20 text-white rounded-xl min-h-[60px] resize-none placeholder:text-purple-300/30"
                />
              </div>

              <Button
                type="submit"
                disabled={!formData.mood || createEntry.isPending}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-full"
              >
                {createEntry.isPending ? 'Saving...' : 'Save Entry'}
              </Button>
            </form>
          </motion.div>
        </div>
      )}

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-950 to-purple-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-light text-white mb-4">
            Ready for Deeper Insight?
          </h2>
          <p className="text-purple-100/70 mb-8">
            Your journal reveals patterns. A reading reveals the meaning behind them.
          </p>
          <Link to={createPageUrl('BookReading')}>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full">
              Book a Reading
            </Button>
          </Link>
        </div>
      </section>
      </div>
    </PullToRefresh>
  );
}