import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const PULL_THRESHOLD = 72;

export default function PullToRefresh({ onRefresh, children }) {
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [pulling, setPulling] = useState(false);
  const startY = useRef(null);

  const handleTouchStart = useCallback((e) => {
    if (window.scrollY > 2) return;
    startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (startY.current === null) return;
    const dy = e.touches[0].clientY - startY.current;
    if (dy <= 0) {
      setPullY(0);
      setPulling(false);
      return;
    }
    setPulling(true);
    setPullY(Math.min(dy * 0.45, PULL_THRESHOLD + 20));
  }, []);

  const handleTouchEnd = useCallback(async () => {
    if (pullY >= PULL_THRESHOLD && !refreshing) {
      setRefreshing(true);
      setPullY(PULL_THRESHOLD);
      await onRefresh?.();
      setRefreshing(false);
    }
    setPullY(0);
    setPulling(false);
    startY.current = null;
  }, [pullY, refreshing, onRefresh]);

  const progress = Math.min(pullY / PULL_THRESHOLD, 1);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      <div
        className="absolute left-0 right-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden"
        style={{ height: pullY, top: 0 }}
      >
        <motion.div
          animate={{ rotate: refreshing ? 360 : progress * 180 }}
          transition={refreshing ? { duration: 0.8, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
          style={{ opacity: progress }}
          className="text-purple-400"
        >
          <RefreshCw className="w-5 h-5" />
        </motion.div>
      </div>
      <div style={{ transform: `translateY(${pullY}px)`, transition: pulling ? 'none' : 'transform 0.3s ease' }}>
        {children}
      </div>
    </div>
  );
}
