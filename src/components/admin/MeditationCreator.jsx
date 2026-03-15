import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Mic, Wand2, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VOICES = [
  { id: '6iD569uZoE7fO2eJBvn1', name: "✨ Violet's Voice (default)" },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella — Soft & Soothing' },
  { id: 'ThT5KcBeYPX3keUQqHPh', name: 'Dorothy — Warm & Calm' },
  { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily — Gentle & Clear' },
  { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte — Meditative' },
  { id: 'jBpfuIE2acCO8z3wKNLl', name: 'Freya — Ethereal' },
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel — Serene' },
];

const CATEGORIES = [
  { id: 'guided_journeys', label: 'Guided Journeys' },
  { id: 'chakra_healing_music', label: 'Chakra Healing Music' },
  { id: 'ambient_sounds', label: 'Ambient Sounds' },
  { id: 'chakra_balancing', label: 'Chakra Balancing' },
  { id: 'energy_cleansing', label: 'Energy Cleansing' },
  { id: 'grounding', label: 'Grounding' },
  { id: 'protection', label: 'Protection' },
];

export default function MeditationCreator() {
  const [title, setTitle] = useState('');
  const [script, setScript] = useState('');
  const [voiceId, setVoiceId] = useState('6iD569uZoE7fO2eJBvn1');
  const [category, setCategory] = useState('guided_journeys');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [status, setStatus] = useState('idle'); // idle | generating | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [createdTitle, setCreatedTitle] = useState('');

  const handleGenerate = async () => {
    if (!title.trim() || !script.trim()) return;
    setStatus('generating');
    setErrorMsg('');
    try {
      const res = await base44.functions.invoke('generateMeditation', {
        title: title.trim(),
        script: script.trim(),
        voice_id: voiceId,
        category,
        thumbnail_url: thumbnailUrl.trim() || undefined,
      });
      if (res.data?.success) {
        setCreatedTitle(title.trim());
        setStatus('success');
        setTitle('');
        setScript('');
        setThumbnailUrl('');
      } else {
        throw new Error(res.data?.error || 'Unknown error');
      }
    } catch (e) {
      setErrorMsg(e.message || 'Generation failed');
      setStatus('error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-violet-400/15 rounded-xl border border-violet-400/25">
          <Mic className="w-5 h-5 text-violet-300" />
        </div>
        <div>
          <h2 className="text-white font-medium">Meditation Creator</h2>
          <p className="text-purple-200/40 text-sm">Generate voiced meditations via ElevenLabs</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-purple-200/60 text-sm mb-2">Meditation Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Root Chakra Grounding Journey"
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-violet-400/50 text-sm"
          />
        </div>

        {/* Category + Voice row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-purple-200/60 text-sm mb-2">Category</label>
            <div className="relative">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full appearance-none bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-400/50 text-sm cursor-pointer"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900">{c.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-purple-200/60 text-sm mb-2">ElevenLabs Voice</label>
            <div className="relative">
              <select
                value={voiceId}
                onChange={e => setVoiceId(e.target.value)}
                className="w-full appearance-none bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-400/50 text-sm cursor-pointer"
              >
                {VOICES.map(v => (
                  <option key={v.id} value={v.id} className="bg-slate-900">{v.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Thumbnail URL (optional) */}
        <div>
          <label className="block text-purple-200/60 text-sm mb-2">Thumbnail Image URL <span className="text-white/25">(optional)</span></label>
          <input
            value={thumbnailUrl}
            onChange={e => setThumbnailUrl(e.target.value)}
            placeholder="https://..."
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-violet-400/50 text-sm"
          />
        </div>

        {/* Script */}
        <div>
          <label className="block text-purple-200/60 text-sm mb-2">Meditation Script</label>
          <textarea
            value={script}
            onChange={e => setScript(e.target.value)}
            rows={10}
            placeholder="Write the full spoken script here. Be descriptive and flowing — this will be read aloud by the selected voice..."
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-violet-400/50 text-sm resize-y leading-relaxed"
          />
          <p className="text-white/20 text-xs mt-1">{script.split(/\s+/).filter(Boolean).length} words · ~{Math.ceil(script.split(/\s+/).filter(Boolean).length / 130)} min</p>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!title.trim() || !script.trim() || status === 'generating'}
          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'generating' ? (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
              />
              Channeling voice... this may take 30–60s
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Generate & Save to Library
            </span>
          )}
        </Button>

        {/* Status */}
        {status === 'success' && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-4 py-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <p className="text-emerald-300 text-sm">
              "<span className="font-medium">{createdTitle}</span>" has been generated and saved to the public meditation library.
            </p>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm">{errorMsg}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}