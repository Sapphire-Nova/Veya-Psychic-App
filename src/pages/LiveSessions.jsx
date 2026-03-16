import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  Radio,
  ArrowRight,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, isPast, isFuture } from 'date-fns';

const sessionTypeInfo = {
  group_reading: { label: 'Group Reading', color: 'from-purple-500 to-violet-600', icon: Sparkles },
  live_qa: { label: 'Live Q&A', color: 'from-amber-500 to-orange-500', icon: Radio },
  meditation: { label: 'Guided Meditation', color: 'from-emerald-500 to-teal-600', icon: Star },
  workshop: { label: 'Workshop', color: 'from-blue-500 to-indigo-600', icon: Video }
};

export default function LiveSessions() {
  const { data: sessions, isLoading } = useQuery({
    queryKey: ['liveSessions'],
    queryFn: () => base44.entities.LiveSession.filter(
      { status: { $in: ['scheduled', 'live'] } },
      'scheduled_date',
      20
    ),
    initialData: []
  });

  const upcomingSessions = sessions.filter(s => isFuture(new Date(s.scheduled_date)));
  const liveSessions = sessions.filter(s => s.status === 'live');

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Video className="w-10 h-10 text-amber-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
              Live Sessions
            </h1>
            <p className="text-purple-100/70 text-lg max-w-2xl mx-auto">
              Join live group readings, Q&A sessions, guided meditations, and workshops. 
              Connect with your spiritual guide in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Now Banner */}
      {liveSessions.length > 0 && (
        <section className="px-6 -mt-8 relative z-20">
          <div className="max-w-4xl mx-auto">
            {liveSessions.map(session => {
              const typeInfo = sessionTypeInfo[session.session_type];
              return (
                <Link key={session.id} to={createPageUrl('LiveRoom') + `?id=${session.id}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-6 shadow-xl shadow-red-500/20 cursor-pointer hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        <span className="text-white font-semibold">LIVE NOW</span>
                      </div>
                      <span className="text-white/80 flex-1">{session.title}</span>
                      <Button className="bg-white text-red-600 hover:bg-white/90">
                        Join Now <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Upcoming Sessions */}
      <section className="py-16 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-light text-white mb-8 text-center">Upcoming Sessions</h2>

          {isLoading ? (
            <div className="text-center text-purple-200/60">Loading sessions...</div>
          ) : upcomingSessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-purple-400" />
              </div>
              <p className="text-purple-200/60 mb-6">No upcoming sessions scheduled yet.</p>
              <p className="text-purple-200/40 text-sm">Check back soon for new live events!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingSessions.map((session, index) => {
                const typeInfo = sessionTypeInfo[session.session_type];
                const Icon = typeInfo.icon;
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={createPageUrl('SessionDetail') + `?id=${session.id}`}>
                      <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300">
                        <div className={`h-2 bg-gradient-to-r ${typeInfo.color}`} />
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${typeInfo.color} flex items-center justify-center`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            {session.is_featured && (
                              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                                Featured
                              </Badge>
                            )}
                          </div>
                          
                          <Badge variant="outline" className="mb-3 border-white/20 text-purple-200/60">
                            {typeInfo.label}
                          </Badge>
                          
                          <h3 className="text-xl font-medium text-white mb-2 group-hover:text-amber-300 transition-colors">
                            {session.title}
                          </h3>
                          
                          <p className="text-purple-200/60 text-sm mb-4 line-clamp-2">
                            {session.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-purple-200/50">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(session.scheduled_date), 'MMM d, yyyy')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {format(new Date(session.scheduled_date), 'h:mm a')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              Max {session.max_participants}
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className={`text-lg font-semibold ${session.price === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                              {session.price === 0 ? 'Free' : `$${session.price}`}
                            </span>
                            <span className="text-purple-300 text-sm group-hover:text-white transition-colors flex items-center gap-1">
                              View Details <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-950 to-purple-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-light text-white mb-4">
            Prefer a Private Reading?
          </h2>
          <p className="text-purple-100/70 mb-6">
            Book a one-on-one session for personalized spiritual guidance.
          </p>
          <Link to={createPageUrl('BookReading')}>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full">
              Book Private Reading
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
