import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  Radio,
  ArrowLeft,
  Check,
  User,
  Mail,
  MessageSquare,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { format, isFuture, isPast } from 'date-fns';
import ReviewSection from '@/components/reviews/ReviewSection';

const sessionTypeInfo = {
  group_reading: { label: 'Group Reading', color: 'from-purple-500 to-violet-600', icon: Sparkles },
  live_qa: { label: 'Live Q&A', color: 'from-amber-500 to-orange-500', icon: Radio },
  meditation: { label: 'Guided Meditation', color: 'from-emerald-500 to-teal-600', icon: Star },
  workshop: { label: 'Workshop', color: 'from-blue-500 to-indigo-600', icon: Video }
};

export default function SessionDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('id');
  
  const [formData, setFormData] = useState({ name: '', email: '', question: '' });
  const [registered, setRegistered] = useState(false);
  
  const queryClient = useQueryClient();

  const { data: session, isLoading } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => base44.entities.LiveSession.filter({ id: sessionId }),
    enabled: !!sessionId,
    select: (data) => data[0]
  });

  const { data: participants } = useQuery({
    queryKey: ['participants', sessionId],
    queryFn: () => base44.entities.SessionParticipant.filter({ session_id: sessionId }),
    enabled: !!sessionId,
    initialData: []
  });

  const registerMutation = useMutation({
    mutationFn: (data) => base44.entities.SessionParticipant.create({
      ...data,
      session_id: sessionId,
      payment_status: session?.price === 0 ? 'free' : 'pending'
    }),
    onSuccess: () => {
      setRegistered(true);
      queryClient.invalidateQueries(['participants', sessionId]);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  if (isLoading || !session) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-purple-200/60">Loading session...</div>
      </div>
    );
  }

  const typeInfo = sessionTypeInfo[session.session_type];
  const Icon = typeInfo.icon;
  const isUpcoming = isFuture(new Date(session.scheduled_date));
  const spotsLeft = session.max_participants - participants.length;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className={`py-20 px-6 bg-gradient-to-br ${typeInfo.color.replace('from-', 'from-').replace('to-', 'via-purple-900 to-')} relative overflow-hidden`}>
        <div className="max-w-4xl mx-auto relative z-10">
          <Link to={createPageUrl('LiveSessions')} className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Live Sessions
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              {typeInfo.label}
            </Badge>
            
            <h1 className="text-3xl md:text-5xl font-light text-white mb-4">
              {session.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {format(new Date(session.scheduled_date), 'EEEE, MMMM d, yyyy')}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {format(new Date(session.scheduled_date), 'h:mm a')} • {session.duration_minutes} min
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {participants.length}/{session.max_participants} registered
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-medium text-white mb-4">About This Session</h2>
                <p className="text-purple-100/70 leading-relaxed">
                  {session.description || 'Join us for an enlightening live session where you can connect with your spiritual guide in real-time. This is a unique opportunity to receive guidance, ask questions, and be part of our spiritual community.'}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-medium text-white mb-4">What to Expect</h2>
                <ul className="space-y-3 text-purple-100/70">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    Real-time interaction with your spiritual guide
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    Opportunity to ask questions via live chat
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    Connect with like-minded spiritual seekers
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    Secure video connection via Zoom/Google Meet
                  </li>
                </ul>
              </div>

              {session.status === 'live' && session.meeting_link && (
                <div className="bg-gradient-to-r from-red-600/20 to-rose-600/20 border border-red-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-300 font-semibold">This session is LIVE!</span>
                  </div>
                  <a href={session.meeting_link} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Video className="w-5 h-5 mr-2" />
                      Join Video Call
                    </Button>
                  </a>
                  <div className="mt-4">
                    <Link to={createPageUrl('LiveRoom') + `?id=${session.id}`}>
                      <Button variant="outline" className="w-full border-red-500/30 text-red-300 hover:bg-red-500/10">
                        Open Live Chat Room
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Registration */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
                <div className="text-center mb-6">
                  <span className={`text-3xl font-semibold ${session.price === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {session.price === 0 ? 'Free' : `$${session.price}`}
                  </span>
                  {spotsLeft <= 5 && spotsLeft > 0 && (
                    <p className="text-amber-400 text-sm mt-2">Only {spotsLeft} spots left!</p>
                  )}
                  {spotsLeft === 0 && (
                    <p className="text-red-400 text-sm mt-2">Session is full</p>
                  )}
                </div>

                {registered ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-white font-medium mb-2">You're Registered!</h3>
                    <p className="text-purple-200/60 text-sm mb-4">
                      We'll send you a reminder email before the session starts.
                    </p>
                    {session.status === 'live' && (
                      <Link to={createPageUrl('LiveRoom') + `?id=${session.id}`}>
                        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500">
                          Join Live Room
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : isUpcoming && spotsLeft > 0 ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-purple-200 text-sm mb-2 block">Your Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                          placeholder="Enter your name"
                          className="pl-10 bg-white/5 border-white/20 text-white rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-purple-200 text-sm mb-2 block">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                          placeholder="your@email.com"
                          className="pl-10 bg-white/5 border-white/20 text-white rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-purple-200 text-sm mb-2 block">Question (Optional)</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-purple-400" />
                        <Textarea
                          value={formData.question}
                          onChange={(e) => setFormData({...formData, question: e.target.value})}
                          placeholder="Any questions for the session?"
                          className="pl-10 bg-white/5 border-white/20 text-white rounded-xl resize-none min-h-[80px]"
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      disabled={registerMutation.isPending}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-5 rounded-full"
                    >
                      {registerMutation.isPending ? 'Registering...' : 'Register Now'}
                    </Button>
                  </form>
                ) : (
                  <p className="text-center text-purple-200/60">
                    {spotsLeft === 0 ? 'This session is fully booked.' : 'Registration is closed.'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <ReviewSection targetId={sessionId} targetType="session" />
        </div>
      </section>
    </div>
  );
}