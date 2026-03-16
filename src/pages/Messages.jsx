import React, { useState, useEffect, useRef, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PullToRefresh from '@/components/ui/PullToRefresh';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Send, User, Sparkles, ArrowLeft,
  Circle, Clock, Wifi, WifiOff, ChevronRight, Image, X, Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow, format } from 'date-fns';

const ADMIN_EMAIL = 'lunabloomtarot@gmail.com'; // update to your actual admin email

const specialtyLabels = {
  tarot: '🃏 Tarot',
  psychic: '🔮 Psychic',
  mediumship: '👁 Mediumship',
  astrology: '⭐ Astrology',
  chakra: '✨ Chakra',
  healing: '💚 Healing',
  general: '🌙 General'
};

const statusConfig = {
  available: { color: 'bg-emerald-400', text: 'Available', textColor: 'text-emerald-400' },
  busy: { color: 'bg-amber-400', text: 'Busy', textColor: 'text-amber-400' },
  offline: { color: 'bg-slate-500', text: 'Offline', textColor: 'text-slate-400' }
};

function makeConversationId(emailA, emailB) {
  return [emailA, emailB].sort().join('__');
}

export default function Messages() {
  const [myEmail, setMyEmail] = useState('');
  const [myName, setMyName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [activeGuide, setActiveGuide] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [pendingImage, setPendingImage] = useState(null); // { url, name }
  const imageInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  const isAdmin = myEmail === ADMIN_EMAIL;

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries(['guides']);
    if (conversationId) await queryClient.invalidateQueries(['messages', conversationId]);
  }, [queryClient, conversationId]);

  const conversationId = activeGuide ? makeConversationId(myEmail, activeGuide.guide_email) : null;

  // Guides list
  const { data: guides } = useQuery({
    queryKey: ['guides'],
    queryFn: () => base44.entities.GuideStatus.list('-updated_date', 20),
    initialData: [],
    refetchInterval: 30000
  });

  // Messages for active conversation
  const { data: messages } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => base44.entities.PrivateMessage.filter({ conversation_id: conversationId }, 'created_date', 100),
    enabled: !!conversationId,
    initialData: [],
    refetchInterval: 3000
  });

  // Real-time subscription
  useEffect(() => {
    if (!conversationId) return;
    const unsub = base44.entities.PrivateMessage.subscribe((event) => {
      if (event.data?.conversation_id === conversationId) {
        queryClient.invalidateQueries(['messages', conversationId]);
      }
    });
    return unsub;
  }, [conversationId, queryClient]);

  // Mark messages as read
  useEffect(() => {
    if (!messages || !myEmail) return;
    messages
      .filter(m => m.recipient_email === myEmail && !m.is_read)
      .forEach(m => base44.entities.PrivateMessage.update(m.id, { is_read: true }));
  }, [messages, myEmail]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setPendingImage({ url: file_url, name: file.name });
    setUploadingImage(false);
  };

  const sendMessage = useMutation({
    mutationFn: () => base44.entities.PrivateMessage.create({
      conversation_id: conversationId,
      sender_name: myName,
      sender_email: myEmail,
      recipient_email: activeGuide.guide_email,
      message: messageText.trim() || (pendingImage ? '📷 Image' : ''),
      image_url: pendingImage?.url || null,
      is_read: false
    }),
    onSuccess: () => {
      setMessageText('');
      setPendingImage(null);
      queryClient.invalidateQueries(['messages', conversationId]);
    }
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    sendMessage.mutate();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMyEmail(emailInput.trim());
    setMyName(nameInput.trim());
  };

  // Not identified yet
  if (!myEmail) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-md w-full text-center"
        >
          <div className="p-4 bg-white/10 rounded-full w-fit mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-amber-300" />
          </div>
          <h1 className="text-3xl font-light text-white mb-2">Private Messages</h1>
          <p className="text-purple-200/60 mb-8">Enter your details to start a conversation with a guide</p>
          <form onSubmit={handleLogin} className="space-y-3 text-left">
            <Input value={nameInput} onChange={e => setNameInput(e.target.value)}
              placeholder="Your name" required
              className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl" />
            <Input type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)}
              placeholder="your@email.com" required
              className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl" />
            <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full py-5 mt-2">
              Enter Messaging
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="py-6 px-6 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-full">
              <MessageCircle className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h1 className="text-2xl font-light text-white">Private Messages</h1>
              <p className="text-purple-200/50 text-sm">Chatting as <span className="text-purple-300">{myName}</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 flex gap-4" style={{ height: 'calc(100vh - 220px)' }}>
        {/* Guides sidebar */}
        <div className={`${activeGuide ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-72 shrink-0`}>
          <h2 className="text-purple-200/60 text-xs uppercase tracking-wider font-medium mb-3 px-1">Spiritual Guides</h2>
          <div className="space-y-2 overflow-y-auto flex-1">
            {guides.length === 0 && (
              <div className="text-center py-8 text-purple-200/40 text-sm">
                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40" />
                No guides available yet.
              </div>
            )}
            {guides.map(guide => {
              const sc = statusConfig[guide.status] || statusConfig.offline;
              const convId = makeConversationId(myEmail, guide.guide_email);
              const isActive = activeGuide?.guide_email === guide.guide_email;
              return (
                <motion.button key={guide.id} onClick={() => setActiveGuide(guide)}
                  whileHover={{ scale: 1.01 }}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${isActive ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
                >
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {guide.guide_name[0]?.toUpperCase()}
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${sc.color} rounded-full border-2 border-slate-950`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{guide.guide_name}</p>
                    <p className="text-purple-200/50 text-xs truncate">{specialtyLabels[guide.specialty] || '🌙 Guide'}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className={`text-xs ${sc.textColor}`}>{sc.text}</span>
                    <ChevronRight className="w-3 h-3 text-purple-200/30" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Chat panel */}
        <div className={`${activeGuide ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden min-w-0`}>
          {!activeGuide ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <MessageCircle className="w-16 h-16 text-purple-400/30 mb-4" />
              <p className="text-purple-200/50 mb-1">Select a guide to start chatting</p>
              <p className="text-purple-200/30 text-sm">Your conversations are private and secure</p>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div className="flex items-center gap-3 p-4 border-b border-white/10 shrink-0">
                <button onClick={() => setActiveGuide(null)} className="md:hidden text-purple-200/60 hover:text-white mr-1">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="relative">
                  <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {activeGuide.guide_name[0]?.toUpperCase()}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusConfig[activeGuide.status]?.color || 'bg-slate-500'} rounded-full border-2 border-slate-900`} />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{activeGuide.guide_name}</p>
                  <p className={`text-xs ${statusConfig[activeGuide.status]?.textColor || 'text-slate-400'}`}>
                    {statusConfig[activeGuide.status]?.text || 'Offline'}
                    {activeGuide.status === 'offline' && activeGuide.last_seen
                      ? ` · last seen ${formatDistanceToNow(new Date(activeGuide.last_seen), { addSuffix: true })}`
                      : ''}
                  </p>
                </div>
                {activeGuide.bio && (
                  <p className="ml-auto text-purple-200/40 text-xs hidden lg:block max-w-xs truncate italic">"{activeGuide.bio}"</p>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <Sparkles className="w-10 h-10 text-purple-400/30 mb-3" />
                    <p className="text-purple-200/50 text-sm">No messages yet.</p>
                    <p className="text-purple-200/30 text-xs mt-1">Send a message to begin your conversation.</p>
                  </div>
                )}
                {messages.map((msg, i) => {
                  const isMe = msg.sender_email === myEmail;
                  const showDate = i === 0 || (
                    new Date(msg.created_date).toDateString() !== new Date(messages[i - 1]?.created_date).toDateString()
                  );
                  return (
                    <React.Fragment key={msg.id}>
                      {showDate && msg.created_date && (
                        <div className="text-center">
                          <span className="text-purple-200/30 text-xs bg-white/5 px-3 py-1 rounded-full">
                            {format(new Date(msg.created_date), 'MMMM d, yyyy')}
                          </span>
                        </div>
                      )}
                      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] ${isMe ? 'order-2' : 'order-1'}`}>
                          {!isMe && (
                            <p className="text-purple-200/50 text-xs mb-1 ml-1">{msg.sender_name}</p>
                          )}
                          <div className={`rounded-2xl text-sm leading-relaxed overflow-hidden ${
                               isMe
                                 ? 'bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-br-sm'
                                 : 'bg-white/10 text-purple-100 rounded-bl-sm'
                             }`}>
                            {msg.image_url && (
                              <img src={msg.image_url} alt="Shared image"
                                className="max-w-[260px] w-full rounded-xl cursor-pointer"
                                onClick={() => window.open(msg.image_url, '_blank')} />
                            )}
                            {msg.message && msg.message !== '📷 Image' && (
                              <p className="px-4 py-2.5">{msg.message}</p>
                            )}
                          </div>
                          <p className={`text-xs text-purple-200/30 mt-1 ${isMe ? 'text-right mr-1' : 'ml-1'}`}>
                            {msg.created_date ? format(new Date(msg.created_date), 'h:mm a') : ''}
                            {isMe && <span className="ml-1">{msg.is_read ? '✓✓' : '✓'}</span>}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-4 border-t border-white/10 shrink-0">
                {pendingImage && (
                  <div className="flex items-center gap-2 mb-2 bg-white/5 rounded-xl px-3 py-2">
                    <Image className="w-4 h-4 text-purple-300" />
                    <span className="text-purple-200/70 text-xs flex-1 truncate">{pendingImage.name}</span>
                    <button type="button" onClick={() => setPendingImage(null)}>
                      <X className="w-4 h-4 text-purple-300/50 hover:text-white" />
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  {/* Image upload — admin only */}
                  {isAdmin && (
                    <>
                      <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      <Button type="button" variant="outline" onClick={() => imageInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="border-white/20 text-purple-300 hover:bg-white/10 rounded-xl px-3 shrink-0">
                        {uploadingImage ? <span className="animate-pulse">...</span> : <Image className="w-4 h-4" />}
                      </Button>
                    </>
                  )}
                  <Input
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    placeholder={activeGuide.status === 'offline' ? 'Leave a message...' : `Message ${activeGuide.guide_name}...`}
                    className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl"
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSend(e); }}
                  />
                  <Button type="submit" disabled={sendMessage.isPending || (!messageText.trim() && !pendingImage)}
                    className={`rounded-xl px-4 shrink-0 ${activeGuide.status === 'offline' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'}`}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {activeGuide.status === 'offline' && (
                  <p className="text-slate-400/60 text-xs mt-2 flex items-center gap-1">
                    <WifiOff className="w-3 h-3" /> Offline — message will be delivered when they return
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
      </div>
    </PullToRefresh>
  );
}
