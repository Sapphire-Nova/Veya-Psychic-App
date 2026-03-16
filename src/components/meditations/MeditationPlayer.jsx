import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipBack, ChevronDown } from 'lucide-react';

function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function MeditationPlayer({ meditation, isPlaying, onPlayPause, onClose }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [muted, setMuted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Wire up audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => { setDuration(audio.duration); setLoaded(true); };
    const onEnded = () => onPlayPause(false);

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnded);
    };
  }, [meditation?.id]);

  // Sync play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // Reset on track change
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setLoaded(false);
  }, [meditation?.id]);

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const handleRestart = () => {
    if (audioRef.current) audioRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (!meditation) return null;

  // No audio available
  if (!meditation.audio_url) {
    return (
      <AnimatePresence>
        <motion.div
          key={meditation.id + '-no-audio'}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-20 md:bottom-0 left-0 right-0 z-40"
        >
          <div className="relative"
            style={{
              background: 'linear-gradient(135deg, rgba(15,8,40,0.98) 0%, rgba(30,12,60,0.98) 100%)',
              borderTop: '1px solid rgba(139,92,246,0.3)',
              backdropFilter: 'blur(20px)',
            }}>
            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden">
                <img src={meditation.thumbnail_url || 'https://images.unsplash.com/photo-1531171673193-06b337b52cc5?w=200&q=80'}
                  alt={meditation.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{meditation.title}</p>
                <p className="text-amber-400/70 text-xs mt-0.5">Audio coming soon — check back after Violet records this session.</p>
              </div>
              <button onClick={onClose}
                className="p-1.5 text-purple-300/40 hover:text-white transition-colors rounded-lg hover:bg-white/5 shrink-0">
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key={meditation.id}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-20 md:bottom-0 left-0 right-0 z-40"
      >
        {/* Breathing glow behind the bar */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'linear-gradient(to top, rgba(88,28,135,0.6) 0%, transparent 100%)',
              filter: 'blur(20px)',
              transform: 'translateY(10px)',
            }}
          />
        )}

        <div className="relative"
          style={{
            background: 'linear-gradient(135deg, rgba(15,8,40,0.98) 0%, rgba(30,12,60,0.98) 100%)',
            borderTop: '1px solid rgba(139,92,246,0.3)',
            backdropFilter: 'blur(20px)',
          }}>

          {/* Thin golden progress line at very top */}
          <div className="h-0.5 w-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(to right, rgba(168,85,247,0.8), rgba(251,191,36,0.9))',
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">

            {/* Thumbnail */}
            <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden">
              <img
                src={meditation.thumbnail_url || 'https://images.unsplash.com/photo-1531171673193-06b337b52cc5?w=200&q=80'}
                alt={meditation.title}
                className="w-full h-full object-cover"
              />
              {isPlaying && (
                <motion.div className="absolute inset-0 rounded-xl"
                  animate={{ boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 12px rgba(168,85,247,0.7)', '0 0 0px rgba(168,85,247,0)'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </div>

            {/* Title & seek */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate mb-1.5">{meditation.title}</p>
              <div className="flex items-center gap-2">
                <span className="text-purple-300/50 text-xs w-9 shrink-0">{formatTime(currentTime)}</span>
                <div className="flex-1 relative h-1 group">
                  <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <div className="absolute top-0 left-0 h-full rounded-full transition-all"
                    style={{ width: `${progress}%`, background: 'linear-gradient(to right, rgba(168,85,247,0.9), rgba(251,191,36,0.9))' }} />
                  <input
                    type="range" min={0} max={duration || 100} step={0.1} value={currentTime}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                  />
                </div>
                <span className="text-purple-300/50 text-xs w-9 shrink-0 text-right">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={handleRestart}
                className="p-1.5 text-purple-300/50 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                <SkipBack className="w-4 h-4" />
              </button>

              <motion.button
                onClick={() => onPlayPause(!isPlaying)}
                whileTap={{ scale: 0.92 }}
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.9), rgba(109,40,217,0.9))',
                  boxShadow: isPlaying ? '0 0 20px rgba(168,85,247,0.5)' : 'none',
                }}
              >
                {isPlaying
                  ? <Pause className="w-5 h-5 text-white" />
                  : <Play className="w-5 h-5 text-white ml-0.5" />
                }
              </motion.button>
            </div>

            {/* Volume */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button onClick={() => setMuted(m => !m)}
                className="text-purple-300/50 hover:text-white transition-colors">
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <div className="relative w-20 h-1 group">
                <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="absolute top-0 left-0 h-full rounded-full"
                  style={{ width: `${muted ? 0 : volume * 100}%`, background: 'rgba(251,191,36,0.7)' }} />
                <input
                  type="range" min={0} max={1} step={0.02} value={muted ? 0 : volume}
                  onChange={e => { setVolume(parseFloat(e.target.value)); setMuted(false); }}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                />
              </div>
            </div>

            {/* Close */}
            <button onClick={onClose}
              className="p-1.5 text-purple-300/40 hover:text-white transition-colors rounded-lg hover:bg-white/5 shrink-0">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        <audio ref={audioRef} src={meditation.audio_url} preload="metadata" />
      </motion.div>
    </AnimatePresence>
  );
}
