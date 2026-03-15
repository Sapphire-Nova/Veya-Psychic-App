import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Radio, Power, Users, Bell, Crown, Sparkles, Calendar, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function AdminLive() {
  const queryClient = useQueryClient();
  const [notifyResult, setNotifyResult] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newSession, setNewSession] = useState({ title: '', description: '', session_type: 'live_qa' });

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['adminSessions'],
    queryFn: () => base44.entities.LiveSession.list('-scheduled_date', 20),
    initialData: []
  });

  const { data: members } = useQuery({
    queryKey: ['activeMembers'],
    queryFn: () => base44.entities.Membership.filter({ is_active: true }),
    initialData: []
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ session, newStatus }) => {
      return base44.entities.LiveSession.update(session.id, { status: newStatus });
    },
    onSuccess: () => queryClient.invalidateQueries(['adminSessions'])
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.LiveSession.create({
      ...data,
      scheduled_date: new Date().toISOString(),
      status: 'live',
      max_participants: 20,
      price: 0
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminSessions']);
      setShowCreate(false);
      setNewSession({ title: '', description: '', session_type: 'live_qa' });
    }
  });

  const notifyMutation = useMutation({
    mutationFn: ({ sessionTitle, sessionId }) =>
      base44.functions.invoke('notifyMembers', { sessionTitle, sessionId }),
    onSuccess: (res) => {
      setNotifyResult(`✓ Notified ${res.data?.sent || 0} of ${res.data?.total || 0} active members`);
      setTimeout(() => setNotifyResult(null), 5000);
    }
  });

  const handleToggle = async (session) => {
    const newStatus = session.status === 'live' ? 'scheduled' : 'live';
    await toggleMutation.mutateAsync({ session, newStatus });
    if (newStatus === 'live') {
      notifyMutation.mutate({ sessionTitle: session.title, sessionId: session.id });
    }
  };

  const liveSessions = sessions.filter(s => s.status === 'live');
  const otherSessions = sessions.filter(s => s.status !== 'live');

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-amber-400/20 rounded-2xl border border-amber-400/30">
              <Radio className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <h1 className="text-3xl font-light text-white">Live Session Control</h1>
              <p className="text-purple-200/50 text-sm">Admin Panel — Toggle sessions live and notify members</p>
            </div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Active Members', value: members.length, icon: Users, color: 'text-purple-400' },
            { label: 'Live Now', value: liveSessions.length, icon: Radio, color: 'text-red-400' },
            { label: 'Total Sessions', value: sessions.length, icon: Calendar, color: 'text-amber-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className="text-purple-200/40 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Notification result */}
        {notifyResult && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm text-center">
            <Bell className="w-4 h-4 inline mr-2" />{notifyResult}
          </motion.div>
        )}

        {/* Create Session */}
        <div className="mb-8">
          <Button onClick={() => setShowCreate(!showCreate)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-6">
            <Plus className="w-4 h-4 mr-2" /> Create New Live Session
          </Button>
        </div>

        {showCreate && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-medium">New Live Session</h3>
              <button onClick={() => setShowCreate(false)}><X className="w-5 h-5 text-purple-200/50" /></button>
            </div>
            <div className="space-y-3">
              <Input value={newSession.title} onChange={(e) => setNewSession(p => ({ ...p, title: e.target.value }))}
                placeholder="Session title" className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl" />
              <Input value={newSession.description} onChange={(e) => setNewSession(p => ({ ...p, description: e.target.value }))}
                placeholder="Description" className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl" />
              <select value={newSession.session_type} onChange={(e) => setNewSession(p => ({ ...p, session_type: e.target.value }))}
                className="w-full bg-white/5 border border-white/20 text-white rounded-xl p-3 text-sm">
                <option value="live_qa">Live Q&A</option>
                <option value="group_reading">Group Reading</option>
                <option value="meditation">Guided Meditation</option>
                <option value="workshop">Workshop</option>
              </select>
              <Button onClick={() => createMutation.mutate(newSession)} disabled={!newSession.title || createMutation.isPending}
                className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full">
                {createMutation.isPending ? 'Creating...' : 'Create & Go Live'}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Live Sessions */}
        {liveSessions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-white font-medium mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Currently Live
            </h2>
            <div className="space-y-3">
              {liveSessions.map(session => (
                <div key={session.id} className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-medium">{session.title}</p>
                    <p className="text-purple-200/50 text-sm">{session.description}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Button onClick={() => notifyMutation.mutate({ sessionTitle: session.title, sessionId: session.id })}
                      disabled={notifyMutation.isPending}
                      variant="outline" className="border-amber-400/30 text-amber-300 hover:bg-amber-400/10 rounded-full text-sm">
                      <Bell className="w-4 h-4 mr-1" /> Notify Members
                    </Button>
                    <button onClick={() => handleToggle(session)}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2 text-sm transition-all">
                      <Power className="w-4 h-4" /> End Live
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Sessions */}
        <div>
          <h2 className="text-white font-medium mb-4">All Sessions</h2>
          {isLoading ? (
            <p className="text-purple-200/40">Loading...</p>
          ) : otherSessions.length === 0 && liveSessions.length === 0 ? (
            <p className="text-purple-200/40">No sessions yet. Create one above.</p>
          ) : (
            <div className="space-y-3">
              {otherSessions.map(session => (
                <div key={session.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-medium truncate">{session.title}</p>
                      <Badge className={`text-xs shrink-0 ${session.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : session.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-white/10 text-purple-200/50 border-white/10'}`}>
                        {session.status}
                      </Badge>
                    </div>
                    <p className="text-purple-200/40 text-sm truncate">{session.description}</p>
                  </div>
                  {session.status === 'scheduled' && (
                    <button onClick={() => handleToggle(session)} disabled={toggleMutation.isPending}
                      className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full px-4 py-2 text-sm transition-all shrink-0">
                      <Radio className="w-4 h-4" /> Go Live
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}