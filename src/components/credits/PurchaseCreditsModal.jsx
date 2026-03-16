import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Star, Gem, Crown, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BUNDLES = [
  {
    name: 'Sparkle Bundle',
    priceId: 'price_1T9Icn5w4AWvPvWAPXz0ggDl',
    price: '$5',
    coins: 100,
    icon: Zap,
    color: 'from-sky-500/20 to-blue-600/10',
    border: 'border-sky-500/30',
    iconColor: 'text-sky-400',
    badge: null
  },
  {
    name: 'Glow Bundle',
    priceId: 'price_1T9Ico5w4AWvPvWAUmQIRH88',
    price: '$10',
    coins: 220,
    icon: Star,
    color: 'from-purple-500/20 to-violet-600/10',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    badge: 'Popular'
  },
  {
    name: 'Radiance Bundle',
    priceId: 'price_1T9Ico5w4AWvPvWAdKOGP8Sq',
    price: '$25',
    coins: 600,
    icon: Gem,
    color: 'from-amber-500/20 to-orange-600/10',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    badge: 'Best Value'
  },
  {
    name: 'Divine Bundle',
    priceId: 'price_1T9HgZ5w4AWvPvWAZAzGLkz4',
    price: '$49.99',
    coins: 1400,
    icon: Crown,
    color: 'from-rose-500/20 to-pink-600/10',
    border: 'border-rose-500/30',
    iconColor: 'text-rose-400',
    badge: 'Premium'
  }
];

export default function PurchaseCreditsModal({ isOpen, onClose, userEmail, userName }) {
  const [loading, setLoading] = useState(null);

  const handlePurchase = async (bundle) => {
    // Block if inside iframe (preview mode)
    if (window.self !== window.top) {
      alert('Checkout is only available from the published app, not the preview.');
      return;
    }

    setLoading(bundle.priceId);
    try {
      const res = await base44.functions.invoke('createCheckout', {
        priceId: bundle.priceId,
        email: userEmail || undefined,
        name: userName || undefined,
        type: 'coins',
        coins: bundle.coins,
        successType: 'credits'
      });
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }
    setLoading(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h2 className="text-white font-semibold text-lg">Purchase Luna Credits</h2>
                  <p className="text-purple-200/50 text-xs">Credits are used for readings, rituals & sessions</p>
                </div>
              </div>
              <button onClick={onClose} className="text-purple-200/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bundles */}
            <div className="p-6 grid grid-cols-1 gap-3 max-h-[65vh] overflow-y-auto">
              {BUNDLES.map((bundle) => {
                const Icon = bundle.icon;
                const isLoading = loading === bundle.priceId;
                return (
                  <button
                    key={bundle.priceId}
                    onClick={() => handlePurchase(bundle)}
                    disabled={!!loading}
                    className={`w-full text-left rounded-2xl p-4 bg-gradient-to-br ${bundle.color} border ${bundle.border} flex items-center justify-between gap-4 transition-all hover:scale-[1.01] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${bundle.iconColor}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium text-sm">{bundle.name}</span>
                          {bundle.badge && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${bundle.iconColor} bg-white/10`}>
                              {bundle.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-purple-200/60 text-xs mt-0.5">
                          <Sparkles className="w-3 h-3 inline mr-1 text-amber-400" />
                          {bundle.coins.toLocaleString()} Luna Credits
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      {isLoading ? (
                        <div className="w-16 h-8 bg-white/10 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        </div>
                      ) : (
                        <span className="text-white font-bold text-base">{bundle.price}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer note */}
            <div className="px-6 pb-5 text-center">
              <p className="text-purple-200/30 text-xs flex items-center justify-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Secure checkout via Stripe · Credits added instantly after payment
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
