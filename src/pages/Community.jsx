import React, { useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PullToRefresh from '@/components/ui/PullToRefresh';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Send, Heart, Pin, Plus, X,
  Sparkles, Users, Hash, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDistanceToNow } from 'date-fns';

const categories = [
  { value: 'general', label: 'General', icon: '✨', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  { value: 'tarot', label: 'Tarot', icon: '🃏', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  { value: 'healing', label: 'Healing', icon: '💚', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { value: 'astrology', label: 'Astrology', icon: '⭐', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { value: 'meditation', label: 'Meditation', icon: '🧘', color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  { value: 'readings', label: 'Readings', icon: '🔮', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  { value: 'crystals', label: 'Crystals', icon: '💎', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
];

function PostCard({ post, onReply, onLike }) {
  const [showReplies, setShowReplies] = useState(false);
  const cat = categories.find(c => c.value === post.category) || categories[0];

  const { data: replies } = useQuery({
    queryKey: ['replies', post.id],
    queryFn: () => base44.entities.ForumPost.filter({ reply_to: post.id }, 'created_date', 20),
    enabled: showReplies,
    initialData: []
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0">
            {post.author_name?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <span className="text-white font-medium text-sm">{post.author_name}</span>
            <p className="text-purple-200/40 text-xs">
              {post.created_date ? formatDistanceToNow(new Date(post.created_date), { addSuffix: true }) : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {post.is_pinned && <Pin className="w-4 h-4 text-amber-400" />}
          <Badge className={`text-xs ${cat.color}`}>{cat.icon} {cat.label}</Badge>
        </div>
      </div>

      <h3 className="text-white font-semibold mb-2">{post.title}</h3>
      <p className="text-purple-200/70 text-sm leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>

      <div className="flex items-center gap-4 text-sm text-purple-200/50">
        <button onClick={() => onLike(post)} className="flex items-center gap-1 hover:text-rose-400 transition-colors">
          <Heart className="w-4 h-4" /> {post.likes || 0}
        </button>
        <button onClick={() => setShowReplies(!showReplies)} className="flex items-center gap-1 hover:text-purple-300 transition-colors">
          <MessageCircle className="w-4 h-4" />
          {showReplies ? 'Hide replies' : `Replies`}
          <ChevronDown className={`w-3 h-3 transition-transform ${showReplies ? 'rotate-180' : ''}`} />
        </button>
        <button onClick={() => onReply(post)} className="flex items-center gap-1 hover:text-amber-300 transition-colors ml-auto">
          <Send className="w-4 h-4" /> Reply
        </button>
      </div>

      <AnimatePresence>
        {showReplies && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/10 space-y-3"
          >
            {replies.length === 0 && <p className="text-purple-200/40 text-xs text-center py-2">No replies yet. Be the first!</p>}
            {replies.map(reply => (
              <div key={reply.id} className="flex gap-3 pl-4 border-l-2 border-purple-500/20">
                <div className="w-7 h-7 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0">
                  {reply.author_name?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/80 text-xs font-medium">{reply.author_name}</span>
                    <span className="text-purple-200/30 text-xs">
                      {reply.created_date ? formatDistanceToNow(new Date(reply.created_date), { addSuffix: true }) : ''}
                    </span>
                  </div>
                  <p className="text-purple-200/60 text-sm">{reply.content}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Community() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [newPost, setNewPost] = useState({ author_name: '', title: '', content: '', category: 'general' });
  const [replyForm, setReplyForm] = useState({ author_name: '', content: '' });
  const queryClient = useQueryClient();

  const query = activeCategory === 'all' ? {} : { category: activeCategory };

  const { data: posts, isLoading } = useQuery({
    queryKey: ['forumPosts', activeCategory],
    queryFn: () => base44.entities.ForumPost.filter({ ...query, reply_to: { $exists: false } }, '-created_date', 30),
    initialData: []
  });

  const createPost = useMutation({
    mutationFn: (data) => base44.entities.ForumPost.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['forumPosts']);
      setShowNewPost(false);
      setNewPost({ author_name: '', title: '', content: '', category: 'general' });
    }
  });

  const createReply = useMutation({
    mutationFn: (data) => base44.entities.ForumPost.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['replies', replyingTo?.id]);
      setReplyingTo(null);
      setReplyForm({ author_name: '', content: '' });
    }
  });

  const likeMutation = useMutation({
    mutationFn: (post) => base44.entities.ForumPost.update(post.id, { likes: (post.likes || 0) + 1 }),
    onMutate: async (post) => {
      await queryClient.cancelQueries(['forumPosts', activeCategory]);
      const previous = queryClient.getQueryData(['forumPosts', activeCategory]);
      queryClient.setQueryData(['forumPosts', activeCategory], (old = []) =>
        old.map(p => p.id === post.id ? { ...p, likes: (p.likes || 0) + 1 } : p)
      );
      return { previous };
    },
    onError: (_err, _post, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(['forumPosts', activeCategory], ctx.previous);
    },
    onSettled: () => queryClient.invalidateQueries(['forumPosts'])
  });

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries(['forumPosts']);
  }, [queryClient]);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    createPost.mutate(newPost);
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    createReply.mutate({ ...replyForm, title: 'Re: ' + replyingTo.title, reply_to: replyingTo.id, category: replyingTo.category });
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Users className="w-10 h-10 text-amber-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">Community Circle</h1>
            <p className="text-purple-100/70 text-lg">Connect, share, and grow with fellow seekers</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${activeCategory === 'all' ? 'bg-purple-500/30 text-purple-200 border border-purple-500/50' : 'bg-white/5 text-purple-200/60 border border-white/10 hover:bg-white/10'}`}>
                All Topics
              </button>
              {categories.map(cat => (
                <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${activeCategory === cat.value ? 'bg-purple-500/30 text-purple-200 border border-purple-500/50' : 'bg-white/5 text-purple-200/60 border border-white/10 hover:bg-white/10'}`}>
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
            <Button onClick={() => setShowNewPost(true)}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-5 shrink-0">
              <Plus className="w-4 h-4 mr-2" /> New Post
            </Button>
          </div>

          {/* New Post Form */}
          <AnimatePresence>
            {showNewPost && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="bg-white/5 border border-purple-500/30 rounded-2xl p-6 mb-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-medium">Share with the Circle</h3>
                  <button onClick={() => setShowNewPost(false)} className="text-purple-200/50 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmitPost} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input value={newPost.author_name} onChange={(e) => setNewPost(p => ({ ...p, author_name: e.target.value }))}
                      placeholder="Your name" required className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl" />
                    <Select value={newPost.category} onValueChange={(v) => setNewPost(p => ({ ...p, category: v }))}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/20">
                        {categories.map(c => (
                          <SelectItem key={c.value} value={c.value} className="text-white hover:bg-white/10 focus:bg-white/10">
                            {c.icon} {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input value={newPost.title} onChange={(e) => setNewPost(p => ({ ...p, title: e.target.value }))}
                    placeholder="Post title" required className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl" />
                  <Textarea value={newPost.content} onChange={(e) => setNewPost(p => ({ ...p, content: e.target.value }))}
                    placeholder="Share your thoughts, questions, or experiences..." required
                    className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl resize-none min-h-[100px]" />
                  <Button type="submit" disabled={createPost.isPending}
                    className="bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full px-6">
                    <Send className="w-4 h-4 mr-2" /> {createPost.isPending ? 'Posting...' : 'Post to Circle'}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reply Modal */}
          <AnimatePresence>
            {replyingTo && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-lg w-full"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-medium">Reply to "{replyingTo.title}"</h3>
                    <button onClick={() => setReplyingTo(null)} className="text-purple-200/50 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmitReply} className="space-y-3">
                    <Input value={replyForm.author_name} onChange={(e) => setReplyForm(p => ({ ...p, author_name: e.target.value }))}
                      placeholder="Your name" required className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl" />
                    <Textarea value={replyForm.content} onChange={(e) => setReplyForm(p => ({ ...p, content: e.target.value }))}
                      placeholder="Write your reply..." required
                      className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl resize-none min-h-[100px]" />
                    <div className="flex gap-3">
                      <Button type="submit" disabled={createReply.isPending}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-6">
                        <Send className="w-4 h-4 mr-2" /> {createReply.isPending ? 'Sending...' : 'Send Reply'}
                      </Button>
                      <Button type="button" onClick={() => setReplyingTo(null)} variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 rounded-full">Cancel</Button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Posts */}
          {isLoading ? (
            <div className="text-center text-purple-200/60 py-12">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <MessageCircle className="w-16 h-16 text-purple-400/30 mx-auto mb-4" />
              <p className="text-purple-200/50 mb-2">No posts yet in this category.</p>
              <p className="text-purple-200/30 text-sm">Be the first to start a conversation!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map(post => (
                <PostCard key={post.id} post={post}
                  onReply={(p) => setReplyingTo(p)}
                  onLike={(p) => likeMutation.mutate(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      </div>
    </PullToRefresh>
  );
}