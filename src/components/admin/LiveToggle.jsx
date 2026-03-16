import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, WifiOff, Power, Sparkles, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LiveToggle() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState(null);

  const { data: guideStatuses = [] } = useQuery({
    queryKey: ['guideStatus'],
    queryFn: () => base44.entities.GuideStatus.list(),
    refetchInterval: 10000,
  });

  const isLive = guideStatuses.length > 0 && guideStatuses[0].status === 'available';

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke('goLive', { action: isLive ? 'stop' : 'start' });
      if (!isLive && res.data?.notified !== undefined) {
        setNotifyMsg(`✓ Went live! Notified ${res.data.notified} of ${res.data.total} members via email.`);
        setTimeout(() => setNotifyMsg(null), 7000);
      }
      queryClient.invalidateQueries(['guideStatus']);
    } catch (err) {
      console.error('Toggle error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <motion.div
        className="rounded-3xl p-8 text-center relative overflow-hidden"
        style={{
          background: isLive
            ? 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(220,38,38,0.08))'
            : 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(79,70,229,0.08))',
          border: isLive ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(139,92,246,0.3)'
        }}
      >
        {isLive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full border-2 border-red-500/15 animate-ping" />
          </div>
        )}
        <div className="relative z-10">
          <div className={`w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center transition-all duration-500 ${
            isLive
              ? 'bg-red-500/20 border-2 border-red-500/60 shadow-[0_0_40px_rgba(239,68,68,0.4)]'
              : 'bg-purple-500/20 border-2 border-purple-500/40'
          }`}>
            {isLive
              ? <Radio className="w-10 h-10 text-red-400 animate-pulse" />
              : <WifiOff className="w-10 h-10 text-purple-400" />
            }
          </div>

          <h2 className="text-2xl font-light text-white mb-1">
            {isLive ? '🔴 You Are LIVE' : 'You Are Offline'}
          </h2>
          <p className="text-purple-200/50 text-sm mb-8">
            {isLive
              ? 'Members were notified. Your live badge is showing across the app.'
              : 'Toggle on to go live and instantly notify all active members by email.'}
          </p>

          {/* Toggle switch */}
          <div className="flex items-center justify-center gap-5 mb-6">
            <span className={`text-sm font-medium ${!isLive ? 'text-white' : 'text-white/40'}`}>Offline</span>
            <button
              onClick={handleToggle}
              disabled={loading}
              className={`relative w-20 h-10 rounded-full transition-all duration-300 focus:outline-none ${
                isLive ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-white/20'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className={`absolute top-1 w-8 h-8 bg-white rounded-full shadow-md transition-all duration-300 ${
                isLive ? 'left-11' : 'left-1'
              }`} />
            </button>
            <span className={`text-sm font-medium ${isLive ? 'text-red-400' : 'text-white/40'}`}>Live</span>
          </div>

          <Button
            onClick={handleToggle}
            disabled={loading}
            className={`px-10 py-3 rounded-full text-white font-medium text-base transition-all ${
              isLive
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" />{isLive ? 'Ending...' : 'Going Live...'}</span>
            ) : isLive ? (
              <span className="flex items-center gap-2"><Power className="w-4 h-4" /> End Live Session</span>
            ) : (
              <span className="flex items-center gap-2"><Radio className="w-4 h-4" /> Go Live Now</span>
            )}
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {notifyMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm text-center"
          >
            <Bell className="w-4 h-4 inline mr-2" />{notifyMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
