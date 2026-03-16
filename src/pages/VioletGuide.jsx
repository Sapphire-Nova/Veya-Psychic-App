import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Moon, Star, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

const BOOKING_URL = 'https://outlook.office.com/bookwithme/user/2a55e43e0da44f72b7d79d5f3aedc9db@veyabyviolet.com/meetingtype/PWpFV-u0qU-ADjJH0RMHYA2?anonymous&ep=mcard';

export default function VioletGuide() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    initConversation();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initConversation = async () => {
    const conv = await base44.agents.createConversation({
      agent_name: 'violet_guide',
      metadata: { name: 'Violet Session' }
    });
    setConversation(conv);
    setMessages(conv.messages || []);

    base44.agents.subscribeToConversation(conv.id, (data) => {
      setMessages([...data.messages]);
      setLoading(false);
    });
  };

  const handleSend = async () => {
    if (!input.trim() || !conversation || loading) return;
    const text = input.trim();
    setInput('');
    setLoading(true);
    await base44.agents.addMessage(conversation, { role: 'user', content: text });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    { icon: Moon, text: 'Interpret my dream' },
    { icon: Star, text: "Today's astrology for me" },
    { icon: Sparkles, text: 'I need spiritual guidance' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="pt-20 pb-6 px-6 text-center bg-gradient-to-b from-indigo-950/80 to-transparent">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 mx-auto mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)]">
            <Moon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-light text-white mb-1">Veya</h1>
          <p className="text-purple-200/60 text-sm">Violet's Mystical Dream & Astrology Guide</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400/80 text-xs">Available now</span>
          </div>
        </motion.div>
      </div>

      {/* Chat area */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 pb-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-0" style={{ maxHeight: 'calc(100vh - 340px)' }}>
          <AnimatePresence initial={false}>
            {messages.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-purple-200/50 text-sm mb-6">I'm Veya, Violet's guide. What's stirring in your spirit today?</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {suggestions.map((s) => (
                    <button
                      key={s.text}
                      onClick={() => { setInput(s.text); }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-200/80 text-sm hover:bg-purple-500/20 transition-all"
                    >
                      <s.icon className="w-3.5 h-3.5 text-purple-400" />
                      {s.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
              >
                {msg.role !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_10px_rgba(139,92,246,0.4)]">
                    <Moon className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-violet-600/30 border border-violet-500/30 text-white'
                    : 'bg-white/5 border border-white/10 text-purple-100'
                }`}>
                  {msg.role === 'user' ? (
                    <p>{msg.content}</p>
                  ) : (
                    <ReactMarkdown
                      className="prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                      components={{
                        a: ({ children, href }) => (
                          <a href={href} target="_blank" rel="noopener noreferrer"
                            className="text-amber-400 underline hover:text-amber-300">{children}</a>
                        ),
                        p: ({ children }) => <p className="my-1">{children}</p>,
                        strong: ({ children }) => <strong className="text-amber-300">{children}</strong>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shrink-0">
                  <Moon className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-1">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Book CTA */}
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 mb-3 rounded-2xl border border-amber-400/25 bg-amber-400/5 text-amber-300/80 text-xs hover:bg-amber-400/10 transition-all">
          <Sparkles className="w-3.5 h-3.5" />
          Want a deeper 1-on-1 reading with Violet?
          <span className="underline flex items-center gap-1">Book now <ExternalLink className="w-3 h-3" /></span>
        </a>

        {/* Input */}
        <div className="flex gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share your dream or ask about your stars…"
            rows={1}
            className="flex-1 bg-white/5 border border-white/15 text-white placeholder:text-purple-300/40 rounded-2xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-purple-500/50 transition-all"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || loading || !conversation}
            className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shrink-0 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
