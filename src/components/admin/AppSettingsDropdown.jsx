import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Settings, Radio, WifiOff, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppSettingsDropdown() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const ref = useRef(null);
  const queryClient = useQueryClient();

  const { data: guideStatuses = [] } = useQuery({
    queryKey: ['guideStatus'],
    queryFn: () => base44.entities.GuideStatus.list(),
    refetchInterval: 15000,
  });

  const isLive = guideStatuses.length > 0 && guideStatuses[0].status === 'available';

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleToggle = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await base44.functions.invoke('goLive', { action: isLive ? 'stop' : 'start' });
      if (!isLive && res.data?.notified !== undefined) {
        setMsg(`✓ Live! Notified ${res.data.notified} members.`);
      } else if (isLive) {
        setMsg('You are now offline.');
      }
      queryClient.invalidateQueries(['guideStatus']);
      setTimeout(() => setMsg(null), 5000);
    } catch (err) {
      console.error(err);
      setMsg('Error toggling status.');
    }
    setLoading(false);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
          isLive
            ? 'bg-red-500/20 border border-red-500/40 text-red-300'
            : 'text-purple-200/60 hover:text-white hover:bg-white/10'
        }`}
      >
        <Settings className="w-4 h-4" />
        <span className="hidden sm:inline">App Settings</span>
        {isLive && <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="fixed md:absolute right-2 md:right-0 top-16 md:top-full md:mt-2 w-72 rounded-2xl shadow-2xl z-[9999] overflow-hidden"
            style={{ background: 'rgba(15,7,32,0.97)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <div className="px-5 pt-4 pb-2 border-b border-white/10">
              <p className="text-white text-sm font-medium">App Settings</p>
              <p className="text-purple-300/50 text-xs">Admin controls</p>
            </div>

            {/* Live Toggle Row */}
            <div className="px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isLive ? 'bg-red-500/20' : 'bg-white/8'
                  }`}>
                    {isLive
                      ? <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                      : <WifiOff className="w-4 h-4 text-purple-400/70" />
                    }
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium leading-tight">
                      {isLive ? '🔴 Live for Instant Readings' : 'Available for Instant Readings'}
                    </p>
                    <p className="text-purple-300/50 text-xs mt-0.5">
                      {isLive ? 'Toggle off when you\'re done' : 'Toggle on to open live chat'}
                    </p>
                  </div>
                </div>

                {/* Toggle switch */}
                <button
                  onClick={handleToggle}
                  disabled={loading}
                  className={`relative w-12 h-6 rounded-full flex-shrink-0 transition-all duration-300 focus:outline-none ${
                    isLive ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]' : 'bg-white/20'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {loading
                    ? <Sparkles className="absolute inset-0 m-auto w-3 h-3 text-white animate-spin" />
                    : <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${isLive ? 'left-7' : 'left-1'}`} />
                  }
                </button>
              </div>

              {/* Status context */}
              <p className={`text-xs mt-3 px-1 ${isLive ? 'text-red-300/70' : 'text-purple-300/40'}`}>
                {isLive
                  ? 'Members can see you\'re live and start instant readings.'
                  : 'When off, users will be prompted to schedule an appointment instead.'}
              </p>

              {msg && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-xs mt-2 px-1 text-emerald-400"
                >
                  {msg}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}