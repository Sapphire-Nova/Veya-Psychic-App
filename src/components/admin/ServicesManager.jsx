import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Check, X, ToggleLeft, ToggleRight, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Default services to seed if none exist
const DEFAULT_SERVICES = [
  { service_id: 'tarot', name: 'Full Tarot Reading', credits: 440, duration: '60 min', description: 'A comprehensive tarot spread revealing the energies surrounding your path, relationships, and soul\'s journey.', tag: 'Most Popular', is_active: true },
  { service_id: 'mediumship', name: 'Mediumship Reading', credits: 880, duration: '60 min', description: 'Connect with loved ones who have crossed over. Receive messages, healing, and closure from the other side.', is_active: true },
  { service_id: 'reiki', name: 'Distant Reiki Healing', credits: 300, duration: '15 min', description: 'A 15-minute distant energy healing session to clear blockages, restore balance, and activate your body\'s natural healing.', is_active: true },
  { service_id: 'candle', name: 'Lightworker Ritual Candle', credits: 550, duration: 'Ritual', description: 'A sacred candle ritual performed on your behalf — choose your intention and share your story for a deeply personalized working.', tag: 'Sacred', is_active: true },
  { service_id: 'live_guidance', name: 'Live Personal Guidance', credits: 150, duration: 'Live only', description: 'Receive direct personal guidance from me during a live session. Only available while I am online and live.', is_active: true },
];

export default function ServicesManager() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['serviceConfigs'],
    queryFn: () => base44.entities.ServiceConfig.list(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.ServiceConfig.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['serviceConfigs']);
      setEditingId(null);
    },
  });

  const seedMutation = useMutation({
    mutationFn: () => base44.entities.ServiceConfig.bulkCreate(DEFAULT_SERVICES),
    onSuccess: () => queryClient.invalidateQueries(['serviceConfigs']),
  });

  const startEdit = (svc) => {
    setEditingId(svc.id);
    setEditForm({ name: svc.name, credits: svc.credits, duration: svc.duration, description: svc.description, tag: svc.tag || '' });
  };

  const saveEdit = (id) => {
    updateMutation.mutate({ id, data: { ...editForm, credits: Number(editForm.credits) } });
  };

  const toggleActive = (svc) => {
    updateMutation.mutate({ id: svc.id, data: { is_active: !svc.is_active } });
  };

  return (
    <div className="space-y-4">
      {/* Seed button if empty */}
      {!isLoading && services.length === 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          <Sparkles className="w-8 h-8 text-amber-400/60 mx-auto mb-3" />
          <p className="text-white/70 mb-1 font-medium">No services configured yet</p>
          <p className="text-purple-200/40 text-sm mb-4">Load the default service catalog to get started.</p>
          <Button
            onClick={() => seedMutation.mutate()}
            disabled={seedMutation.isPending}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-6"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> {seedMutation.isPending ? 'Loading...' : 'Load Default Services'}
          </Button>
        </div>
      )}

      {services.map(svc => (
        <motion.div
          key={svc.id}
          layout
          className={`border rounded-2xl p-5 transition-all ${
            svc.is_active
              ? 'bg-white/5 border-white/10'
              : 'bg-white/2 border-white/5 opacity-60'
          }`}
        >
          {editingId === svc.id ? (
            /* Edit mode */
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-200/50 text-xs mb-1 block">Service Name</label>
                  <Input
                    value={editForm.name}
                    onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-purple-200/50 text-xs mb-1 block">Credits</label>
                    <Input
                      type="number"
                      value={editForm.credits}
                      onChange={e => setEditForm(p => ({ ...p, credits: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-purple-200/50 text-xs mb-1 block">Duration</label>
                    <Input
                      value={editForm.duration}
                      onChange={e => setEditForm(p => ({ ...p, duration: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white rounded-xl"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-purple-200/50 text-xs mb-1 block">Badge / Tag (optional)</label>
                <Input
                  value={editForm.tag}
                  onChange={e => setEditForm(p => ({ ...p, tag: e.target.value }))}
                  placeholder="e.g. Most Popular, Sacred, New"
                  className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl"
                />
              </div>
              <div>
                <label className="text-purple-200/50 text-xs mb-1 block">Description</label>
                <Textarea
                  value={editForm.description}
                  onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => saveEdit(svc.id)}
                  disabled={updateMutation.isPending}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-5"
                >
                  <Check className="w-3.5 h-3.5 mr-1" /> Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingId(null)}
                  className="border-white/20 text-white/70 rounded-full px-5"
                >
                  <X className="w-3.5 h-3.5 mr-1" /> Cancel
                </Button>
              </div>
            </div>
          ) : (
            /* View mode */
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h4 className="text-white font-medium">{svc.name}</h4>
                  {svc.tag && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {svc.tag}
                    </span>
                  )}
                  {!svc.is_active && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/20">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-purple-200/50 text-sm leading-relaxed mb-2">{svc.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-amber-300 font-medium">{svc.credits} credits</span>
                  <span className="text-purple-200/40 text-xs">${(svc.credits / 10).toFixed(2)}</span>
                  {svc.duration && <span className="text-purple-200/40 text-xs">· {svc.duration}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleActive(svc)}
                  className="text-purple-300/50 hover:text-purple-200 transition-colors"
                  title={svc.is_active ? 'Hide service' : 'Show service'}
                >
                  {svc.is_active
                    ? <ToggleRight className="w-6 h-6 text-emerald-400" />
                    : <ToggleLeft className="w-6 h-6" />
                  }
                </button>
                <button
                  onClick={() => startEdit(svc)}
                  className="text-purple-300/50 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
