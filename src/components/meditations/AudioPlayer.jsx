import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, Heart, BookmarkCheck } from 'lucide-react';
import { base44 } from '@/api/base44Client';

// Ambient tracks blended at low volume
const AMBIENT_TRACKS = [
  'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1b9b2d9e58.mp3',
  'https://cdn.pixabay.com/download/audio/2021/09/06/audio_6c523da406.mp3',
];

function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function AudioPlayer({ meditation, onClose }) {
  const mainAudioRef = useRef(null);
  const ambientAudioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [ambientVolume] = useState(0.15);
  const [muted, setMuted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savingState, setSavingState] = useState('idle'); // idle | saving | saved

  // Pick a random ambient track
  const ambientSrc = useRef(AMBIENT_TRACKS[Math.floor(Math.random() * AMBIENT_TRACKS.length)]);

  // Check if already saved
  useEffect(() => {
    base44.auth.me().then(user => {
      if (!user) return;
      base44.entities.UserProfile.filter({ email: user.email }).then(profiles => {
        const p = profiles[0];
        if (p && p.saved_meditations?.includes(meditation.id)) setSaved(true);
      });
    }).catch(() => {});
  }, [meditation.id]);

  // Set up audio
  useEffect(() => {
    const main = mainAudioRef.current;
    const ambient = ambientAudioRef.current;
    if (!main) return;

    main.volume = muted ? 0 : volume;
    if (ambient) {
      ambient.volume = muted ? 0 : ambientVolume;
      ambient.loop = true;
    }

    const onTimeUpdate = () => setCurrentTime(main.currentTime);
    const onLoaded = () => setDuration(main.duration);
    const onEnded = () => {
      setPlaying(false);
      if (ambient) ambient.pause();
    };

    main.addEventListener('timeupdate', onTimeUpdate);
    main.addEventListener('loadedmetadata', onLoaded);
    main.addEventListener('ended', onEnded);

    return () => {
      main.removeEventListener('timeupdate', onTimeUpdate);
      main.removeEventListener('loadedmetadata', onLoaded);
      main.removeEventListener('ended', onEnded);
      main.pause();
      if (ambient) ambient.pause();
    };
  }, []);

  // Sync volume
  useEffect(() => {
    if (mainAudioRef.current) mainAudioRef.current.volume = muted ? 0 : volume;
    if (ambientAudioRef.current) ambientAudioRef.current.volume = muted ? 0 : ambientVolume;
  }, [volume, muted, ambientVolume]);

  const togglePlay = useCallback(async () => {
    const main = mainAudioRef.current;
    const ambient = ambientAudioRef.current;
    if (!main) return;

    if (playing) {
      main.pause();
      if (ambient) ambient.pause();
      setPlaying(false);
    } else {
      await main.play();
      if (ambient) ambient.play().catch(() => {});
      setPlaying(true);
      // Increment play count
      base44.entities.Meditation.update(meditation.id, { play_count: (meditation.play_count || 0) + 1 }).catch(() => {});
    }
  }, [playing, meditation]);

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    if (mainAudioRef.current) mainAudioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const handleSave = async () => {
    if (saved || savingState === 'saving') return;
    setSavingState('saving');
    try {
      const user = await base44.auth.me();
      if (!user) { setSavingState('idle'); return; }
      const profiles = await base44.entities.UserProfile.filter({ email: user.email });
      const profile = profiles[0];
      if (!profile) { setSavingState('idle'); return; }
      const existing = profile.saved_meditations || [];
      if (!existing.includes(meditation.id)) {
        await base44.entities.UserProfile.update(profile.id, {
          saved_meditations: [...existing, meditation.id]
        });
      }
      setSaved(true);
      setSavingState('saved');
    } catch {
      setSavingState('idle');
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 20 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="w-full max-w-md bg-slate-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
          {/* Thumbnail / Header */}
          <div className="relative h-48 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-950">
            {meditation.thumbnail_url ? (
              <img src={meditation.thumbnail_url} alt={meditation.title} className="w-full h-full object-cover opacity-70" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-amber-400/30 animate-pulse" />
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-white text-lg font-medium mb-1">{meditation.title}</h3>
              <p className="text-purple-200/50 text-sm line-clamp-2">{meditation.description}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #f59e0b ${progress}%, rgba(255,255,255,0.15) ${progress}%)`
                }}
              />
              <div className="flex justify-between text-xs text-purple-200/40 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              {/* Volume */}
              <div className="flex items-center gap-2 flex-1">
                <button onClick={() => setMuted(m => !m)} className="text-purple-200/50 hover:text-white transition-colors">
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={e => { setVolume(parseFloat(e.target.value)); setMuted(false); }}
                  className="w-20 h-1 appearance-none rounded-full cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgba(255,255,255,0.6) ${(muted ? 0 : volume) * 100}%, rgba(255,255,255,0.15) ${(muted ? 0 : volume) * 100}%)`
                  }}
                />
              </div>

              {/* Play Button */}
              <button
                onClick={togglePlay}
                className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform mx-4"
              >
                {playing
                  ? <Pause className="w-6 h-6 text-white" />
                  : <Play className="w-6 h-6 text-white ml-0.5" />
                }
              </button>

              {/* Save */}
              <div className="flex-1 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saved}
                  className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-all ${
                    saved
                      ? 'border-amber-400/50 text-amber-400 cursor-default'
                      : 'border-white/20 text-purple-200/60 hover:border-amber-400/50 hover:text-amber-300'
                  }`}
                >
                  {saved ? <BookmarkCheck className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                  <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>

            {/* Ambient layer note */}
            {playing && (
              <p className="text-center text-purple-200/25 text-xs mt-4">✦ Sacred ambient blend active ✦</p>
            )}
          </div>
        </div>

        {/* Hidden audio elements */}
        <audio ref={mainAudioRef} src={meditation.audio_url} preload="metadata" />
        <audio ref={ambientAudioRef} src={ambientSrc.current} preload="none" loop />
      </motion.div>
    </AnimatePresence>
  );
}
