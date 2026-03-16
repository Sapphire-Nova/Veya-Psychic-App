import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Clock, ArrowRight, Heart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';

export default function MyJourney() {
  const [activeTab, setActiveTab] = useState('overview');

  const { data: userProfile = {} } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      try {
        const user = await base44.auth.me();
        if (!user?.email) return {};
        const profiles = await base44.entities.UserProfile.filter({ email: user.email });
        return profiles[0] || {};
      } catch (err) {
        return {};
      }
    },
  });

  const { data: upcomingSessions = [] } = useQuery({
    queryKey: ['upcomingSessions'],
    queryFn: async () => {
      const sessions = await base44.entities.LiveSession.list();
      const upcoming = sessions.filter(s => 
        new Date(s.scheduled_date) > new Date() && s.status !== 'cancelled'
      ).sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date));
      return upcoming.slice(0, 5);
    },
  });

  const { data: pastReadings = [] } = useQuery({
    queryKey: ['pastReadings'],
    queryFn: async () => {
      try {
        const user = await base44.auth.me();
        if (!user?.email) return [];
        const chats = await base44.entities.ChatSession.filter({ user_email: user.email });
        return chats
          .filter(c => c.status === 'completed')
          .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
          .slice(0, 10);
      } catch (err) {
        return [];
      }
    },
  });

  const { data: dailyGuidance = [] } = useQuery({
    queryKey: ['userGuidance'],
    queryFn: () => base44.entities.DailyGuidance.list()
      .then(items => items.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)),
  });

  const creditBalance = userProfile?.coin_balance ?? 0;
  const sessionsAttended = userProfile?.sessions_attended ?? 0;
  const readingsCompleted = userProfile?.readings_completed ?? 0;

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-light text-white mb-2">My Journey</h1>
          <p className="text-purple-200/60">Your spiritual path, insights, and upcoming moments with Violet</p>
        </motion.div>

        {/* Credit Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-6 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(59,130,246,0.1))',
            border: '1px solid rgba(168,85,247,0.3)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200/60 text-sm mb-2">Luna Credits Balance</p>
              <p className="text-5xl font-light text-amber-300">{creditBalance}</p>
            </div>
            <Link to={createPageUrl('Sanctuary')}>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                Add Credits
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: 'Sessions Attended', value: sessionsAttended, icon: Calendar },
            { label: 'Readings Completed', value: readingsCompleted, icon: BookOpen },
            { label: 'Upcoming Bookings', value: upcomingSessions.length, icon: Clock },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl text-center"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}
            >
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-purple-300" />
              <p className="text-2xl font-light text-white">{stat.value}</p>
              <p className="text-xs text-purple-200/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 flex gap-3 border-b border-white/10"
        >
          {['overview', 'upcoming', 'history', 'guidance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 transition-colors border-b-2 ${
                activeTab === tab
                  ? 'text-white border-amber-400'
                  : 'text-purple-200/60 border-transparent hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {upcomingSessions.length > 0 && (
              <div>
                <h3 className="text-xl font-light text-white mb-4">Your Upcoming Moments</h3>
                <div className="space-y-3">
                  {upcomingSessions.slice(0, 3).map((session) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 rounded-2xl"
                      style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-white font-medium">{session.title}</p>
                          <p className="text-sm text-purple-200/60 mt-1">
                            {formatDate(session.scheduled_date)} • {session.duration_minutes}min
                          </p>
                        </div>
                        <Link to={createPageUrl('LiveSessions')}>
                          <ArrowRight className="w-5 h-5 text-purple-300" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {pastReadings.length > 0 && (
              <div>
                <h3 className="text-xl font-light text-white mb-4">Recent Readings</h3>
                <div className="space-y-2">
                  {pastReadings.slice(0, 3).map((reading) => (
                    <motion.div
                      key={reading.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 rounded-xl flex items-center gap-3"
                      style={{ background: 'rgba(168,85,247,0.08)' }}
                    >
                      <Heart className="w-4 h-4 text-pink-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{reading.title || reading.type || 'Reading'}</p>
                        <p className="text-xs text-purple-200/50">{formatDate(reading.created_date)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upcoming Tab */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-5 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(79,70,229,0.1))',
                    border: '1px solid rgba(59,130,246,0.2)',
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg text-white font-medium">{session.title}</h4>
                      <p className="text-sm text-purple-200/60 mt-1">{session.description}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {session.session_type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-purple-200/70">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(session.scheduled_date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {session.duration_minutes} minutes
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-purple-400/30 mx-auto mb-3" />
                <p className="text-purple-200/60">No upcoming sessions scheduled</p>
                <Link to={createPageUrl('LiveSessions')}>
                  <Button variant="outline" className="mt-4">Browse Sessions</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {pastReadings.length > 0 ? (
              pastReadings.map((reading) => (
                <motion.div
                  key={reading.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-5 rounded-2xl"
                  style={{
                    background: 'rgba(168,85,247,0.08)',
                    border: '1px solid rgba(168,85,247,0.2)',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{reading.title || reading.type || 'Reading'}</h4>
                      <p className="text-sm text-purple-200/60 mt-1">{formatDate(reading.created_date)}</p>
                      {reading.duration && (
                        <p className="text-xs text-purple-200/50 mt-2">{reading.duration}</p>
                      )}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-300">
                      Completed
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-purple-400/30 mx-auto mb-3" />
                <p className="text-purple-200/60">No past readings yet</p>
                <Link to={createPageUrl('Services')}>
                  <Button variant="outline" className="mt-4">Book Your First Reading</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Guidance Tab */}
        {activeTab === 'guidance' && (
          <div className="space-y-4">
            {dailyGuidance.length > 0 ? (
              dailyGuidance.map((guidance) => (
                <motion.div
                  key={guidance.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-5 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(251,146,60,0.1), rgba(168,85,247,0.08))',
                    border: '1px solid rgba(251,146,60,0.2)',
                  }}
                >
                  <div className="mb-3">
                    <h4 className="text-lg text-white font-medium">{guidance.title}</h4>
                    <p className="text-xs text-purple-200/50 mt-1">{formatDate(guidance.date)}</p>
                  </div>
                  <p className="text-sm text-purple-200/80 leading-relaxed mb-4">{guidance.message}</p>
                  {guidance.affirmation && (
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-sm italic text-amber-300">✨ {guidance.affirmation}</p>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-purple-400/30 mx-auto mb-3" />
                <p className="text-purple-200/60">Daily guidance coming soon</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
