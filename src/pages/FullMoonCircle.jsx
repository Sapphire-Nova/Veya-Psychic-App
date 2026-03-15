import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Calendar, Clock, Users, Star, X, Check, Sparkles, Video, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format, isPast, isFuture } from 'date-fns';

const moonPhaseEmoji = ['🌕', '🌝', '✨', '🌙', '💫', '🔮', '🌟', '⭐', '🌓', '🌔'];

const moonColors = {
  'Worm Moon': 'from-emerald-600 to-teal-700',
  'Pink Moon': 'from-pink-500 to-rose-600',
  'Flower Moon': 'from-violet-500 to-purple-600',
  'Strawberry Moon': 'from-red-500 to-rose-500',
  'Buck Moon': 'from-amber-500 to-orange-600',
  'Sturgeon Moon': 'from-blue-600 to-indigo-700',
  'Harvest Moon': 'from-orange-500 to-amber-600',
  "Hunter's Moon": 'from-slate-600 to-gray-700',
  'Beaver Moon': 'from-stone-600 to-amber-700',
  'Cold Moon': 'from-sky-600 to-blue-700',
};

function getMoonName(title) {
  const match = title.match(/— (.+)$/);
  return match ? match[1] : '';
}

function getMoonColor(title) {
  const name = getMoonName(title);
  return moonColors[name] || 'from-purple-600 to-indigo-700';
}

function RegisterModal({ session, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', question: '' });
  const [submitted, setSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const register = useMutation({
    mutationFn: (data) => base44.entities.SessionParticipant.create(data),
    onSuccess: () => {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['fullMoonSessions'] });
    }
  });

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl text-white font-light mb-2">You're Registered!</h3>
        <p className="text-purple-200/70 mb-2">A confirmation with the Zoom link will be sent to:</p>
        <p className="text-amber-300 font-medium mb-6">{form.email}</p>
        <p className="text-purple-200/60 text-sm italic">
          "The circle awaits you, beloved soul. ✨"<br />— Violet
        </p>
        <Button onClick={onClose} className="mt-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-6">
          Close
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl text-white font-light mb-1">Reserve Your Spot</h3>
      <p className="text-purple-200/60 text-sm mb-6">The Zoom link will be sent to your email upon registration.</p>
      <div className="space-y-4">
        <div>
          <label className="text-purple-200 text-sm mb-1 block">Your Name *</label>
          <Input
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Sacred name or given name"
            className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl"
          />
        </div>
        <div>
          <label className="text-purple-200 text-sm mb-1 block">Email Address *</label>
          <Input
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="your@email.com"
            className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl"
          />
        </div>
        <div>
          <label className="text-purple-200 text-sm mb-1 block">An intention or question for the circle (optional)</label>
          <Textarea
            value={form.question}
            onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
            placeholder="Share what you're calling in or asking..."
            className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl resize-none"
            rows={3}
          />
        </div>
        <Button
          onClick={() => {
            if (!form.name || !form.email) return;
            register.mutate({
              session_id: session.id,
              name: form.name,
              email: form.email,
              question: form.question,
              status: 'registered',
              payment_status: 'free'
            });
          }}
          disabled={!form.name || !form.email || register.isPending}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full py-6"
        >
          {register.isPending ? 'Registering...' : '🌕 Join the Circle'}
        </Button>
      </div>
    </div>
  );
}

function SessionCard({ session, index, onRegister }) {
  const [expanded, setExpanded] = useState(false);
  const moonName = getMoonName(session.title);
  const color = getMoonColor(session.title);
  const date = new Date(session.scheduled_date);
  const past = isPast(date);
  const emoji = moonPhaseEmoji[index % moonPhaseEmoji.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${past ? 'opacity-60' : 'hover:border-white/20'}`}
    >
      <div className={`h-2 bg-gradient-to-r ${color}`} />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-xl flex-shrink-0`}>
              {emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-amber-300 text-xs uppercase tracking-wider font-medium">Full Moon Circle</span>
                {past && <span className="text-xs bg-white/10 text-purple-300 px-2 py-0.5 rounded-full">Past</span>}
                {!past && <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">Upcoming</span>}
              </div>
              <h3 className="text-white text-lg font-medium">{moonName}</h3>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-purple-200/60">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {format(date, 'MMMM d, yyyy')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  6:00 PM PT
                </span>
                <span className="flex items-center gap-1">
                  <Video className="w-4 h-4" />
                  30 min · Zoom
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            {!past && (
              <Button
                onClick={() => onRegister(session)}
                className={`bg-gradient-to-r ${color} text-white rounded-full text-sm px-4 py-2 hover:opacity-90`}
              >
                Sign Up
              </Button>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-purple-300 hover:text-white text-xs transition-colors"
            >
              {expanded ? 'Less ▲' : 'Details ▼'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-purple-100/80 text-sm leading-relaxed whitespace-pre-line">
                  {session.description}
                </p>
                {!past && (
                  <Button
                    onClick={() => onRegister(session)}
                    className={`mt-4 bg-gradient-to-r ${color} text-white rounded-full px-6`}
                  >
                    🌕 Sign Up for This Circle
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FullMoonCircle() {
  const [selectedSession, setSelectedSession] = useState(null);

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['fullMoonSessions'],
    queryFn: () => base44.entities.LiveSession.filter({ session_type: 'meditation' }, 'scheduled_date', 50)
  });

  const fullMoonSessions = sessions
    .filter(s => s.title.includes('Full Moon Energy Circle'))
    .sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date));

  const upcoming = fullMoonSessions.filter(s => isFuture(new Date(s.scheduled_date)));
  const past = fullMoonSessions.filter(s => isPast(new Date(s.scheduled_date)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
      {/* Hero */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 3 + 2 + 's'
              }}
            />
          ))}
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="text-6xl mb-6">🌕</div>
            <div className="inline-block text-amber-300 text-sm uppercase tracking-widest mb-4 border border-amber-300/30 px-4 py-1 rounded-full">
              Hosted by Violet
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white mb-4 leading-tight">
              Full Moon Energy Circle
              <span className="block text-2xl md:text-3xl text-purple-200/60 mt-2 font-light">2026 Series</span>
            </h1>
            <p className="text-purple-100/70 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Join Violet every Full Moon for a sacred circle of guided meditation, intention setting, 
              and collective energy alignment. Ten gatherings. Ten moons. One unbroken thread of light.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-purple-200/60">
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <Video className="w-4 h-4 text-amber-400" /> Live on Zoom
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-amber-400" /> 6:00 PM Pacific Time
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <Moon className="w-4 h-4 text-amber-400" /> 30 Minutes Each
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-amber-400" /> 10 Full Moons
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calendar Grid */}
      <section className="py-12 px-6 max-w-4xl mx-auto">

        {isLoading ? (
          <div className="text-center text-purple-200/50 py-20">Loading sacred calendar...</div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-light text-white mb-6 flex items-center gap-2">
                  <Moon className="w-6 h-6 text-amber-300" /> Upcoming Circles
                </h2>
                <div className="space-y-4">
                  {upcoming.map((session, i) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      index={i}
                      onRegister={setSelectedSession}
                    />
                  ))}
                </div>
              </div>
            )}

            {past.length > 0 && (
              <div>
                <h2 className="text-2xl font-light text-white mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-purple-400" /> Past Circles
                </h2>
                <div className="space-y-4">
                  {past.map((session, i) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      index={i}
                      onRegister={setSelectedSession}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Closing CTA */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-10">
          <div className="text-4xl mb-4">🌙</div>
          <h3 className="text-2xl font-light text-white mb-4">The Circle Is Always Open</h3>
          <p className="text-purple-200/60 mb-6">
            Each Full Moon is a new doorway. Whether this is your first gathering or your tenth, 
            you are exactly where you are meant to be. After you sign up, I will personally confirm 
            your spot and send a Zoom link to your email before the circle.
          </p>
          <p className="text-amber-300 italic text-lg">— Violet</p>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setSelectedSession(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedSession(null)}
                className="absolute top-4 right-4 text-purple-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🌕</div>
                <p className="text-amber-300 text-sm uppercase tracking-wider mb-1">Full Moon Energy Circle</p>
                <h2 className="text-2xl text-white font-light">{getMoonName(selectedSession.title)}</h2>
                <p className="text-purple-200/60 text-sm mt-1">
                  {format(new Date(selectedSession.scheduled_date), 'MMMM d, yyyy')} · 6:00 PM PT
                </p>
              </div>

              <RegisterModal session={selectedSession} onClose={() => setSelectedSession(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}