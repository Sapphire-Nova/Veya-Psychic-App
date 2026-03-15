import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Search, BookOpen, Tag, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ClientNotes() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [form, setForm] = useState({ client_email: '', client_name: '', note: '', session_date: '', tags: '' });

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['clientNotes'],
    queryFn: () => base44.entities.ClientNote.list('-created_date', 100),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.ClientNote.create({
      ...data,
      tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['clientNotes']);
      setShowForm(false);
      setForm({ client_email: '', client_name: '', note: '', session_date: '', tags: '' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.ClientNote.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['clientNotes']),
  });

  const filtered = notes.filter(n =>
    !search || n.client_name?.toLowerCase().includes(search.toLowerCase()) ||
    n.client_email?.toLowerCase().includes(search.toLowerCase()) ||
    n.note?.toLowerCase().includes(search.toLowerCase())
  );

  // Group by client email
  const grouped = filtered.reduce((acc, note) => {
    const key = note.client_email || note.client_name || 'Unknown';
    if (!acc[key]) acc[key] = { name: note.client_name || key, email: note.client_email, notes: [] };
    acc[key].notes.push(note);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300/40" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by client name, email, or note content..."
            className="pl-9 bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl"
          />
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full px-5 shrink-0"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Note
        </Button>
      </div>

      {/* Add Note Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-medium">New Client Note</h3>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-purple-200/50" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <Input
                value={form.client_name}
                onChange={e => setForm(p => ({ ...p, client_name: e.target.value }))}
                placeholder="Client name"
                className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl"
              />
              <Input
                value={form.client_email}
                onChange={e => setForm(p => ({ ...p, client_email: e.target.value }))}
                placeholder="Client email"
                className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <Input
                type="date"
                value={form.session_date}
                onChange={e => setForm(p => ({ ...p, session_date: e.target.value }))}
                className="bg-white/5 border-white/20 text-white rounded-xl"
              />
              <Input
                value={form.tags}
                onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                placeholder="Tags: love, career, grief (comma separated)"
                className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl"
              />
            </div>
            <Textarea
              value={form.note}
              onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
              placeholder="Session insights, patterns noticed, guidance given..."
              rows={4}
              className="w-full bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl mb-3"
            />
            <Button
              onClick={() => createMutation.mutate(form)}
              disabled={!form.note || !form.client_email || createMutation.isPending}
              className="bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full px-6"
            >
              {createMutation.isPending ? 'Saving...' : 'Save Note'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes grouped by client */}
      {isLoading ? (
        <p className="text-purple-200/40 text-sm">Loading notes...</p>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <BookOpen className="w-8 h-8 text-purple-300/30 mx-auto mb-2" />
          <p className="text-purple-200/40 text-sm">No client notes yet. Add your first session insight.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([key, client]) => (
            <div key={key} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {/* Client header */}
              <button
                onClick={() => setExpandedId(expandedId === key ? null : key)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-medium text-sm">
                    {(client.name || '?')[0].toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium text-sm">{client.name}</p>
                    <p className="text-purple-200/40 text-xs">{client.email} · {client.notes.length} note{client.notes.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                {expandedId === key ? <ChevronUp className="w-4 h-4 text-purple-300/50" /> : <ChevronDown className="w-4 h-4 text-purple-300/50" />}
              </button>

              <AnimatePresence>
                {expandedId === key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/10 divide-y divide-white/5"
                  >
                    {client.notes.map(note => (
                      <div key={note.id} className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            {note.session_date && (
                              <p className="text-purple-200/40 text-xs mb-1">{note.session_date}</p>
                            )}
                            <p className="text-purple-100/80 text-sm leading-relaxed whitespace-pre-wrap">{note.note}</p>
                            {note.tags && note.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {note.tags.map(tag => (
                                  <span key={tag} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                    <Tag className="w-2.5 h-2.5" />{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => deleteMutation.mutate(note.id)}
                            className="text-red-400/50 hover:text-red-400 transition-colors shrink-0 mt-0.5"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}