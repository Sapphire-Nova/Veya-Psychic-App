import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Shield, Radio, Users, BookOpen, Settings, Lock, Mic } from 'lucide-react';
import LiveToggle from '@/components/admin/LiveToggle';
import ClientQueue from '@/components/admin/ClientQueue';
import ClientNotes from '@/components/admin/ClientNotes';
import ServicesManager from '@/components/admin/ServicesManager';
import MeditationCreator from '@/components/admin/MeditationCreator';

const TABS = [
  { id: 'live', label: 'Live Control', icon: Radio },
  { id: 'queue', label: 'Client Queue', icon: Users },
  { id: 'notes', label: 'Private Notes', icon: BookOpen },
  { id: 'services', label: 'Services', icon: Settings },
  { id: 'meditations', label: 'Meditation Creator', icon: Mic },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('live');
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      setChecking(false);
    }).catch(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-purple-200/50">Verifying access...</div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="text-center">
          <Lock className="w-12 h-12 text-red-400/60 mx-auto mb-4" />
          <h2 className="text-white text-xl font-light mb-2">Access Denied</h2>
          <p className="text-purple-200/50 text-sm">This page is only accessible to admins.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 bg-amber-400/15 rounded-xl border border-amber-400/25">
              <Shield className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h1 className="text-2xl font-light text-white">Admin Dashboard</h1>
              <p className="text-purple-200/40 text-sm">Private · {user.full_name || user.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1 mb-8 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-1 justify-center ${
                tab === t.id
                  ? 'bg-white/10 text-white'
                  : 'text-purple-200/50 hover:text-purple-100'
              }`}
            >
              <t.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }}>
          {tab === 'live' && <LiveToggle />}
          {tab === 'queue' && <ClientQueue />}
          {tab === 'notes' && <ClientNotes />}
          {tab === 'services' && <ServicesManager />}
          {tab === 'meditations' && <MeditationCreator />}
        </motion.div>
      </div>
    </div>
  );
}
