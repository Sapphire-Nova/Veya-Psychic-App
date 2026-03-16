import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  MessageSquare,
  Send,
  Users,
  ArrowLeft,
  ExternalLink,
  Pin,
  Sparkles,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function LiveRoom() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('id');
  
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: session } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => base44.entities.LiveSession.filter({ id: sessionId }),
    enabled: !!sessionId,
    select: (data) => data[0]
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['chatMessages', sessionId],
    queryFn: () => base44.entities.LiveChatMessage.filter({ session_id: sessionId }, 'created_date', 100),
    enabled: !!sessionId && isJoined,
    initialData: [],
    refetchInterval: 3000 // Poll every 3 seconds for new messages
  });

  const { data: participants } = useQuery({
    queryKey: ['participants', sessionId],
    queryFn: () => base44.entities.SessionParticipant.filter({ session_id: sessionId }),
    enabled: !!sessionId,
    initialData: []
  });

  // Subscribe to real-time updates
  useEffect(() => {
    if (!sessionId || !isJoined) return;
    
    const unsubscribe = base44.entities.LiveChatMessage.subscribe((event) => {
      if (event.data?.session_id === sessionId) {
        queryClient.invalidateQueries(['chatMessages', sessionId]);
      }
    });
    
    return unsubscribe;
  }, [sessionId, isJoined, queryClient]);

  const sendMessageMutation = useMutation({
    mutationFn: (data) => base44.entities.LiveChatMessage.create({
      session_id: sessionId,
      sender_name: userName,
      sender_email: userEmail,
      message: data.message,
      is_advisor: false
    }),
    onSuccess: () => {
      setMessage('');
      queryClient.invalidateQueries(['chatMessages', sessionId]);
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (userName && userEmail) {
      setIsJoined(true);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessageMutation.mutate({ message: message.trim() });
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-purple-200/60">Loading...</div>
      </div>
    );
  }

  // Join screen
  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-light text-white mb-2">Join Live Room</h1>
              <p className="text-purple-200/60 text-sm">{session.title}</p>
              {session.status === 'live' && (
                <Badge className="mt-3 bg-red-500/20 text-red-300 border-red-500/30">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse" />
                  Live Now
                </Badge>
              )}
            </div>

            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <label className="text-purple-200 text-sm mb-2 block">Your Name</label>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="bg-white/5 border-white/20 text-white rounded-xl"
                />
              </div>
              <div>
                <label className="text-purple-200 text-sm mb-2 block">Your Email</label>
                <Input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="bg-white/5 border-white/20 text-white rounded-xl"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-5 rounded-full"
              >
                Enter Live Room
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10">
              <Link to={createPageUrl('LiveSessions')} className="text-purple-300 text-sm hover:text-white flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Sessions
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const pinnedMessages = messages.filter(m => m.is_pinned);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900/95 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={createPageUrl('SessionDetail') + `?id=${sessionId}`}>
            <Button variant="ghost" size="sm" className="text-purple-200 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-white font-medium">{session.title}</h1>
            {session.status === 'live' && (
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5 animate-pulse" />
                Live
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-purple-200/60 text-sm">
            <Users className="w-4 h-4" />
            {participants.length}
          </div>
          {session.meeting_link && (
            <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <Video className="w-4 h-4 mr-2" />
                Join Video
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </a>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Pinned Messages */}
          {pinnedMessages.length > 0 && (
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2">
              {pinnedMessages.map(msg => (
                <div key={msg.id} className="flex items-start gap-2 text-sm">
                  <Pin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-amber-100">{msg.message}</span>
                </div>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messagesLoading ? (
              <div className="text-center text-purple-200/60 py-8">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="text-center text-purple-200/60 py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No messages yet. Be the first to say hello!</p>
              </div>
            ) : (
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.is_advisor ? 'bg-purple-500/10 -mx-4 px-4 py-3 border-l-2 border-purple-500' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.is_advisor 
                        ? 'bg-gradient-to-br from-amber-500 to-orange-500' 
                        : 'bg-white/10'
                    }`}>
                      {msg.is_advisor ? (
                        <Sparkles className="w-4 h-4 text-white" />
                      ) : (
                        <User className="w-4 h-4 text-purple-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className={`font-medium ${msg.is_advisor ? 'text-amber-400' : 'text-white'}`}>
                          {msg.sender_name}
                          {msg.is_advisor && <Badge className="ml-2 bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">Advisor</Badge>}
                        </span>
                        <span className="text-purple-200/40 text-xs">
                          {format(new Date(msg.created_date), 'h:mm a')}
                        </span>
                      </div>
                      <p className="text-purple-100/80 break-words">{msg.message}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10 bg-slate-900/50">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border-white/20 text-white rounded-xl"
              />
              <Button 
                type="submit" 
                disabled={!message.trim() || sendMessageMutation.isPending}
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 rounded-xl px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-purple-200/40 text-xs mt-2 text-center">
              Chatting as {userName}
            </p>
          </div>
        </div>

        {/* Participants Sidebar - Desktop Only */}
        <div className="hidden lg:block w-64 border-l border-white/10 bg-slate-900/30">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Participants ({participants.length})
            </h3>
          </div>
          <div className="p-4 space-y-2 overflow-y-auto max-h-96">
            {participants.map((p) => (
              <div key={p.id} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-3 h-3 text-purple-300" />
                </div>
                <span className="text-purple-200/80 text-sm truncate">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
