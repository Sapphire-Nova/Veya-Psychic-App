import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';

export default function ReviewSection({ targetId, targetType = 'session' }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ reviewer_name: '', reviewer_email: '', rating: 0, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const queryClient = useQueryClient();

  const { data: reviews } = useQuery({
    queryKey: ['reviews', targetId],
    queryFn: () => base44.entities.Review.filter({ target_id: targetId, is_approved: true }, '-created_date', 50),
    initialData: []
  });

  const submitReview = useMutation({
    mutationFn: (data) => base44.entities.Review.create({ ...data, target_id: targetId, target_type: targetType }),
    onMutate: async (data) => {
      await queryClient.cancelQueries(['reviews', targetId]);
      const previous = queryClient.getQueryData(['reviews', targetId]);
      const optimistic = {
        id: `optimistic-${Date.now()}`,
        ...data,
        target_id: targetId,
        target_type: targetType,
        is_approved: true,
        created_date: new Date().toISOString(),
      };
      queryClient.setQueryData(['reviews', targetId], (old = []) => [optimistic, ...old]);
      setShowForm(false);
      setForm({ reviewer_name: '', reviewer_email: '', rating: 0, comment: '' });
      return { previous };
    },
    onError: (_err, _data, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(['reviews', targetId], ctx.previous);
      setShowForm(true);
    },
    onSettled: () => queryClient.invalidateQueries(['reviews', targetId]),
  });

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const displayed = showAll ? reviews : reviews.slice(0, 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.rating === 0) return;
    submitReview.mutate(form);
  };

  return (
    <div className="mt-8 pt-8 border-t border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-amber-400" />
          <h3 className="text-white font-medium">Reviews</h3>
          {avgRating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-amber-300 font-semibold">{avgRating}</span>
              <span className="text-purple-200/40 text-sm">({reviews.length})</span>
            </div>
          )}
        </div>
        <Button onClick={() => setShowForm(!showForm)} variant="outline" size="sm"
          className="border-white/20 text-white hover:bg-white/10 rounded-full">
          {showForm ? 'Cancel' : '+ Write Review'}
        </Button>
      </div>

      {/* Rating summary bar */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-3 mb-6">
          {[5,4,3,2,1].map(n => {
            const count = reviews.filter(r => r.rating === n).length;
            const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return (
              <div key={n} className="flex items-center gap-2 flex-1">
                <span className="text-purple-200/50 text-xs w-3">{n}</span>
                <Star className="w-3 h-3 text-amber-400/60 fill-amber-400/60 shrink-0" />
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400/60 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form onSubmit={handleSubmit}
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="bg-white/5 border border-purple-500/20 rounded-2xl p-5 mb-6 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <Input value={form.reviewer_name} onChange={(e) => setForm(p => ({ ...p, reviewer_name: e.target.value }))}
                placeholder="Your name" required className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl" />
              <Input type="email" value={form.reviewer_email} onChange={(e) => setForm(p => ({ ...p, reviewer_email: e.target.value }))}
                placeholder="your@email.com" className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl" />
            </div>
            {/* Star selector */}
            <div>
              <label className="text-purple-200 text-sm mb-2 block">Your Rating *</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(n => (
                  <button key={n} type="button"
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setForm(p => ({ ...p, rating: n }))}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star className={`w-7 h-7 transition-colors ${n <= (hoverRating || form.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />
                  </button>
                ))}
              </div>
            </div>
            <Textarea value={form.comment} onChange={(e) => setForm(p => ({ ...p, comment: e.target.value }))}
              placeholder="Share your experience (optional)..."
              className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl resize-none min-h-[80px]" />
            <Button type="submit" disabled={submitReview.isPending || form.rating === 0}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-6">
              <Send className="w-4 h-4 mr-2" /> {submitReview.isPending ? 'Submitting...' : 'Submit Review'}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <p className="text-purple-200/40 text-sm text-center py-4">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {displayed.map(r => (
            <div key={r.id} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-medium text-sm">{r.reviewer_name}</span>
                <span className="text-purple-200/40 text-xs">
                  {r.created_date ? formatDistanceToNow(new Date(r.created_date), { addSuffix: true }) : ''}
                </span>
              </div>
              <div className="flex items-center gap-0.5 mb-2">
                {[1,2,3,4,5].map(n => (
                  <Star key={n} className={`w-4 h-4 ${n <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-white/15'}`} />
                ))}
              </div>
              {r.comment && <p className="text-purple-200/70 text-sm italic">"{r.comment}"</p>}
            </div>
          ))}
          {reviews.length > 3 && (
            <button onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-1 text-purple-300 hover:text-white text-sm transition-colors mx-auto">
              {showAll ? <><ChevronUp className="w-4 h-4" /> Show less</> : <><ChevronDown className="w-4 h-4" /> Show all {reviews.length} reviews</>}
            </button>
          )}
        </div>
      )}
    </div>
  );
}