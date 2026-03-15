import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Radio, WifiOff, Sparkles, Moon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';

const ADMIN_EMAIL = 'lunabloomtarot@gmail.com';
const ADMIN_NAME = 'Violet';

function makeConversationId(userEmail) {
  return [userEmail, ADMIN_EMAIL].sort().join('__');
}

export default function LiveChat() {
  const [name, setName] = useState(() => localStorage.getItem('lc_name') || '');
  const [email, setEmail] = useState(() => localStorage.getItem('lc_email') || '');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  const conversationId = email ? makeConversationId(email) : null;

  // Check if guide is live
  const { data: guideStatuses = [] } = useQuery({
    queryKey: ['guideStatus'],
    queryFn: () => base44.entities.GuideStatus.list(),
    refetchInterval: 10000,
  });
  const isLive = guideStatuses.length > 0 && guideStatuses[0].status === 'available';

  // Messages
  const { data: messages = [] } = useQuery({
    queryKey: ['liveChat', conversationId],
    queryFn: () => base44.entities.PrivateMessage.filter({ conversation_id: conversationId }, 'created_date', 100),
    enabled: !!conversationId && isLive,
    refetchInterval: 3000,
  });

  // Real-time subscription
  useEffect(() => {
    if (!conversationId || !isLive) return;
    const unsub = base44.entities.PrivateMessage.subscribe((event) => {
      if (event.data?.conversation_id === conversationId) {
        queryClient.invalidateQueries(['liveChat', conversationId]);
      }
    });
    return unsub;
  }, [conversationId, isLive, queryClient]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useMutation({
    mutationFn: (text) => base44.entities.PrivateMessage.create({
      conversation_id: conversationId,
      sender_name: name,
      sender_email: email,
      recipient_email: ADMIN_EMAIL,
      message: text,
      is_read: false,
    }),
    onSuccess: () => {
      setMessageText('');
      queryClient.invalidateQueries(['liveChat', conversationId]);
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const n = nameInput.trim();
    const em = emailInput.trim();
    localStorage.setItem('lc_name', n);
    localStorage.setItem('lc_email', em);
    setName(n);
    setEmail(em);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!messageText.trim() || sendMessage.isPending) return;
    sendMessage.mutate(messageText.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Offline Gate ──
  if (!isLive) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-6">
            <WifiOff className="w-9 h-9 text-slate-500" />
          </div>
          <h1 className="text-3xl font-light text-white mb-3">Violet is Offline</h1>
          <p className="text-purple-200/60 mb-6 leading-relaxed">
            Live Personal Guidance is only available when Violet is online. Check back soon or book a scheduled reading.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={createPageUrl('Services')}>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-6">
                Book a Reading
              </Button>
            </Link>
            <Link to={createPageUrl('Home')}>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-6">
                Go Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Identity Gate ──
  if (!name || !email) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 mx-auto mb-5 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.4)]">
            <Radio className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-red-400 text-sm font-medium">Violet is Live Now</span>
          </div>
          <h1 className="text-2xl font-light text-white mb-2">Live Personal Guidance</h1>
          <p className="text-purple-200/60 text-sm mb-7">Enter your details to begin your live session</p>
          <form onSubmit={handleLogin} className="space-y-3 text-left">
            <Input value={nameInput} onChange={e => setNameInput(e.target.value)}
              placeholder="Your name" required
              className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl" />
            <Input type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)}
              placeholder="your@email.com" required
              className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl" />
            <Button type="submit" className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full py-5 mt-2">
              <Radio className="w-4 h-4 mr-2" /> Join Live Session
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── Live Chat ──
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col" style={{ height: '100dvh' }}>
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-white/10 bg-slate-950/95 backdrop-blur-md flex items-center gap-3">
        <Link to={createPageUrl('Services')} className="text-purple-200/60 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
          <Moon className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-white font-medium text-sm">{ADMIN_NAME}</p>
            <span className="flex items-center gap-1 text-xs text-red-400">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" /> Live
            </span>
          </div>
          <p className="text-purple-200/40 text-xs">Live Personal Guidance</p>
        </div>
        <p className="text-purple-200/40 text-xs hidden sm:block">Chatting as <span className="text-purple-300">{name}</span></p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-center py-12"
          >
            <Sparkles className="w-10 h-10 text-rose-400/40 mb-3" />
            <p className="text-purple-200/50 text-sm">Violet is here and ready for you.</p>
            <p className="text-purple-200/30 text-xs mt-1">Send your question to begin your live session.</p>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            const isMe = msg.sender_email === email;
            const showTime = i === 0 || (
              new Date(msg.created_date).getTime() - new Date(messages[i - 1]?.created_date).getTime() > 5 * 60 * 1000
            );
            return (
              <motion.div key={msg.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'} gap-2`}
              >
                {!isMe && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shrink-0 mt-1">
                    <Moon className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div className="max-w-[78%]">
                  {showTime && msg.created_date && (
                    <p className={`text-xs text-purple-200/30 mb-1 ${isMe ? 'text-right' : 'ml-1'}`}>
                      {format(new Date(msg.created_date), 'h:mm a')}
                    </p>
                  )}
                  <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    isMe
                      ? 'bg-gradient-to-br from-purple-600 to-violet-700 text-white rounded-br-sm'
                      : 'bg-white/8 border border-white/10 text-purple-100 rounded-bl-sm'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 py-3 border-t border-white/10 bg-slate-950/95 backdrop-blur-md">
        <form onSubmit={handleSend} className="flex gap-2 items-center">
          <input
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send your question to Violet…"
            className="flex-1 bg-white/5 border border-white/15 text-white placeholder:text-purple-300/40 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50 transition-all"
          />
          <Button type="submit" disabled={!messageText.trim() || sendMessage.isPending}
            className="h-11 w-11 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shrink-0 p-0">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}