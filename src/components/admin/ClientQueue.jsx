import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Users, CheckCircle, XCircle, MessageCircle, Clock, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SERVICE_LABELS = {
  tarot: 'Tarot',
  mediumship: 'Mediumship',
  reiki: 'Reiki',
  live_guidance: 'Live Guidance',
  chakra: 'Chakra',
  general: 'General',
};

const STATUS_COLORS = {
  waiting: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  accepted: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  in_session: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  completed: 'bg-white/10 text-purple-200/50 border-white/10',
  declined: 'bg-red-500/10 text-red-300/60 border-red-500/20',
};

export default function ClientQueue() {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['clientRequests'],
    queryFn: () => base44.entities.ClientRequest.list('-created_date', 50),
    refetchInterval: 15000,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.ClientRequest.update(id, data),
    onSuccess: () => queryClient.invalidateQueries(['clientRequests']),
  });

  const waiting = requests.filter(r => r.status === 'waiting');
  const active = requests.filter(r => r.status === 'accepted' || r.status === 'in_session');
  const done = requests.filter(r => r.status === 'completed' || r.status === 'declined');

  const RequestRow = ({ req }) => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-white font-medium">{req.name}</span>
          <Badge className={`text-xs ${STATUS_COLORS[req.status] || ''}`}>{req.status}</Badge>
          {req.service_type && (
            <Badge className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
              {SERVICE_LABELS[req.service_type] || req.service_type}
            </Badge>
          )}
        </div>
        {req.email && <p className="text-purple-200/40 text-xs mb-1">{req.email}</p>}
        <p className="text-purple-200/70 text-sm leading-relaxed">{req.topic}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {req.status === 'waiting' && (
          <>
            <Button
              size="sm"
              onClick={() => updateMutation.mutate({ id: req.id, data: { status: 'accepted' } })}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs px-4"
            >
              <CheckCircle className="w-3.5 h-3.5 mr-1" /> Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateMutation.mutate({ id: req.id, data: { status: 'declined' } })}
              className="border-red-500/30 text-red-300 hover:bg-red-500/10 rounded-full text-xs px-4"
            >
              <XCircle className="w-3.5 h-3.5 mr-1" /> Decline
            </Button>
          </>
        )}
        {req.status === 'accepted' && (
          <Button
            size="sm"
            onClick={() => updateMutation.mutate({ id: req.id, data: { status: 'completed' } })}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full text-xs px-4"
          >
            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Mark Complete
          </Button>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Waiting queue */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-amber-400" />
          <h3 className="text-white font-medium">Waiting Queue ({waiting.length})</h3>
        </div>
        {isLoading ? (
          <p className="text-purple-200/40 text-sm">Loading requests...</p>
        ) : waiting.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <Inbox className="w-8 h-8 text-purple-300/30 mx-auto mb-2" />
            <p className="text-purple-200/40 text-sm">No one in queue right now</p>
          </div>
        ) : (
          <div className="space-y-3">
            {waiting.map(req => <RequestRow key={req.id} req={req} />)}
          </div>
        )}
      </div>

      {/* Active sessions */}
      {active.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <h3 className="text-white font-medium">Active Sessions ({active.length})</h3>
          </div>
          <div className="space-y-3">
            {active.map(req => <RequestRow key={req.id} req={req} />)}
          </div>
        </div>
      )}

      {/* Recent completed */}
      {done.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-purple-300/50" />
            <h3 className="text-white/50 font-medium text-sm">Recent History</h3>
          </div>
          <div className="space-y-2 opacity-60">
            {done.slice(0, 5).map(req => <RequestRow key={req.id} req={req} />)}
          </div>
        </div>
      )}
    </div>
  );
}
