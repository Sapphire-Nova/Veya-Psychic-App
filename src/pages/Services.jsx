import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Moon, Star, Heart, Zap, Shield, Clock, ArrowRight,
  Crown, Gift, Radio, CreditCard, Calendar, User, Mail,
  MessageSquare, Check, ChevronDown, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MobileDrawerSelect from '@/components/ui/MobileDrawerSelect';

const RATE = 10;

// Services with Stripe price IDs for direct card payment
const services = [
  {
    id: 'tarot',
    name: 'Full Tarot Reading',
    credits: 440,
    price: '$44',
    stripePrice: 'price_1T9XRS5w4AWvPvWAjBDf3s96',
    icon: Star,
    gradient: 'from-violet-500 to-purple-700',
    description: 'A comprehensive tarot spread revealing the energies surrounding your path, relationships, and soul\'s journey.',
    duration: '60 min',
    tag: 'Most Popular',
    bookable: true,
  },
  {
    id: 'mediumship',
    name: 'Mediumship Reading',
    credits: 880,
    price: '$88',
    stripePrice: 'price_1T9XS65w4AWvPvWATymA5TlN',
    icon: Moon,
    gradient: 'from-indigo-500 to-blue-700',
    description: 'Connect with loved ones who have crossed over. Receive messages, healing, and closure from the other side.',
    duration: '60 min',
    bookable: true,
  },
  {
    id: 'reiki',
    name: 'Distant Reiki Healing',
    credits: 330,
    price: '$33',
    stripePrice: 'price_1T9XSe5w4AWvPvWA9ZhUDu2q',
    icon: Sparkles,
    gradient: 'from-emerald-500 to-teal-600',
    description: 'A distant energy healing session to clear blockages, restore balance, and activate your body\'s natural healing.',
    duration: '15 min',
    bookable: true,
  },
  {
    id: 'candle',
    name: 'Lightworker Ritual Candle',
    credits: 550,
    price: null,
    stripePrice: null,
    icon: Shield,
    gradient: 'from-amber-500 to-orange-600',
    description: 'A sacred candle ritual performed on your behalf — choose your intention and share your story for a deeply personalized working.',
    duration: 'Ritual',
    tag: 'Sacred',
    link: 'CandleRitual',
  },
  {
    id: 'live_guidance',
    name: 'Live Personal Guidance',
    credits: 150,
    price: null,
    stripePrice: null,
    icon: Radio,
    gradient: 'from-rose-500 to-pink-700',
    description: 'Receive direct personal guidance from me during a live session. Only available while I am online and live.',
    duration: 'Live only',
    liveOnly: true,
  },
  {
    id: 'full_moon',
    name: 'Full Moon Circle',
    credits: 0,
    price: null,
    stripePrice: null,
    icon: Moon,
    gradient: 'from-slate-500 to-slate-700',
    description: 'Join the sacred monthly Full Moon Circle for group ceremony, intentions, and collective healing.',
    duration: 'Monthly',
    free: true,
    link: 'FullMoonCircle',
  },
  {
    id: 'first_chat',
    name: 'First Chat Session',
    credits: 0,
    price: null,
    stripePrice: null,
    icon: Heart,
    gradient: 'from-pink-500 to-rose-600',
    description: 'Your first chat session is FREE — one question answered with a 3-card tarot draw. A gift for new seekers.',
    duration: '1 question',
    free: true,
    newUserOnly: true,
  },
  {
    id: 'daily_guidance',
    name: 'Daily Guidance',
    credits: 0,
    price: null,
    stripePrice: null,
    icon: Sparkles,
    gradient: 'from-amber-400 to-yellow-600',
    description: 'Daily tarot card, chakra focus, affirmation, and channeled message. Free for all visitors.',
    duration: 'Daily',
    free: true,
    link: 'DailyGuidance',
  },
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

// Booking form — shown as a bottom drawer/section
function BookingForm({ preselected, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    reading_type: preselected || '',
    preferred_date: '',
    preferred_time: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const selectedService = services.find(s => s.id === formData.reading_type);

  const handleChange = (field, value) => setFormData(p => ({ ...p, [field]: value }));

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.Reading.create(formData);
    setLoading(false);
    onSuccess();
  };

  const handlePayCard = async () => {
    if (!formData.client_email || !formData.reading_type || !selectedService?.stripePrice) return;
    if (window.self !== window.top) {
      alert('Checkout is only available from the published app, not the preview.');
      return;
    }
    setCheckoutLoading(true);
    setCheckoutError('');
    // Save booking record first
    await base44.entities.Reading.create(formData);
    try {
      const res = await base44.functions.invoke('createCheckout', {
        priceId: selectedService.stripePrice,
        email: formData.client_email,
        name: formData.client_name,
        type: 'reading',
        successType: formData.reading_type,
        coins: String(selectedService.credits),
      });
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error(res.data?.error || 'Checkout failed');
      }
    } catch (err) {
      setCheckoutError(err.message);
      setCheckoutLoading(false);
    }
  };

  const bookableServices = services.filter(s => s.bookable);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="rounded-3xl p-8 md:p-10 relative"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}
    >
      <button onClick={onClose} className="absolute top-5 right-5 text-purple-300/50 hover:text-white transition-colors">
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-3 mb-7">
        <div className="p-3 rounded-2xl" style={{ background: 'rgba(251,191,36,0.15)' }}>
          <Calendar className="w-6 h-6 text-amber-300" />
        </div>
        <div>
          <h3 className="text-white text-xl font-medium">Schedule an Appointment</h3>
          <p className="text-purple-200/50 text-sm">Request a preferred date & time — I'll confirm by email</p>
        </div>
      </div>

      <form onSubmit={handleRequest} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-purple-200/70 text-sm mb-2 block">Your Name *</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
              <Input value={formData.client_name} onChange={e => handleChange('client_name', e.target.value)}
                placeholder="Enter your name" required
                className="pl-11 bg-white/5 border-white/15 text-white placeholder:text-purple-300/30 rounded-xl h-11" />
            </div>
          </div>
          <div>
            <label className="text-purple-200/70 text-sm mb-2 block">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
              <Input type="email" value={formData.client_email} onChange={e => handleChange('client_email', e.target.value)}
                placeholder="your@email.com" required
                className="pl-11 bg-white/5 border-white/15 text-white placeholder:text-purple-300/30 rounded-xl h-11" />
            </div>
          </div>
        </div>

        <div>
          <label className="text-purple-200/70 text-sm mb-2 block">Service *</label>
          <div className="hidden md:block">
            <Select value={formData.reading_type} onValueChange={v => handleChange('reading_type', v)} required>
              <SelectTrigger className="bg-white/5 border-white/15 text-white rounded-xl h-11">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/20">
                {bookableServices.map(s => (
                  <SelectItem key={s.id} value={s.id} className="text-white hover:bg-white/10 focus:bg-white/10">
                    {s.name} <span className="text-amber-400 ml-2">{s.price}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:hidden">
            <MobileDrawerSelect value={formData.reading_type} onValueChange={v => handleChange('reading_type', v)}
              placeholder="Select a service"
              options={bookableServices.map(s => ({ value: s.id, label: s.name, sub: s.price }))} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-purple-200/70 text-sm mb-2 block">Preferred Date *</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
              <Input type="date" value={formData.preferred_date} onChange={e => handleChange('preferred_date', e.target.value)}
                required min={new Date().toISOString().split('T')[0]}
                className="pl-11 bg-white/5 border-white/15 text-white rounded-xl h-11" />
            </div>
          </div>
          <div>
            <label className="text-purple-200/70 text-sm mb-2 block">Preferred Time</label>
            <div className="hidden md:block">
              <Select value={formData.preferred_time} onValueChange={v => handleChange('preferred_time', v)}>
                <SelectTrigger className="bg-white/5 border-white/15 text-white rounded-xl h-11">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/20">
                  {timeSlots.map(t => (
                    <SelectItem key={t} value={t} className="text-white hover:bg-white/10 focus:bg-white/10">{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:hidden">
              <MobileDrawerSelect value={formData.preferred_time} onValueChange={v => handleChange('preferred_time', v)}
                placeholder="Select a time"
                options={timeSlots.map(t => ({ value: t, label: t }))} />
            </div>
          </div>
        </div>

        <div>
          <label className="text-purple-200/70 text-sm mb-2 block">Your Questions or Focus</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-purple-400" />
            <Textarea value={formData.message} onChange={e => handleChange('message', e.target.value)}
              placeholder="Share what you'd like guidance on..."
              className="pl-11 bg-white/5 border-white/15 text-white placeholder:text-purple-300/30 rounded-xl min-h-[100px] resize-none" />
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <div className="grid md:grid-cols-2 gap-3">
            <Button type="submit" disabled={loading}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-5 rounded-full text-base font-medium">
              {loading ? 'Submitting...' : '📅 Request Appointment'}
            </Button>
            {selectedService?.stripePrice && (
              <Button type="button" onClick={handlePayCard}
                disabled={checkoutLoading || !formData.client_email || !formData.reading_type}
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white py-5 rounded-full text-base">
                {checkoutLoading ? 'Redirecting...' : (
                  <span className="flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Pay Now — {selectedService.price}
                  </span>
                )}
              </Button>
            )}
          </div>
          {checkoutError && <p className="text-red-400 text-sm text-center">{checkoutError}</p>}
          <p className="text-purple-200/25 text-xs text-center">
            "Request" schedules & saves your booking · "Pay Now" goes to secure Stripe checkout
          </p>
        </div>
      </form>
    </motion.div>
  );
}

export default function Services() {
  const [liveSession, setLiveSession] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [preselected, setPreselected] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [highlighted, setHighlighted] = useState('');

  useEffect(() => {
    base44.entities.LiveSession.filter({ status: 'live' }).then(sessions => {
      if (sessions.length > 0) setLiveSession(sessions[0]);
    }).catch(() => {});
    base44.entities.GuideStatus.list().then(statuses => {
      if (statuses.length > 0 && statuses[0].status === 'available') setLiveSession(statuses[0]);
    }).catch(() => {});

    const params = new URLSearchParams(window.location.search);
    const h = params.get('highlight');
    if (h) {
      setHighlighted(h);
      setTimeout(() => {
        const el = document.getElementById(`service-${h}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, []);

  const openBooking = (serviceId = '') => {
    setPreselected(serviceId);
    setShowBooking(true);
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handlePayCard = async (service) => {
    if (window.self !== window.top) {
      alert('Checkout is only available from the published app, not the preview.');
      return;
    }
    setCheckoutLoading(service.id);
    setCheckoutError('');
    try {
      const res = await base44.functions.invoke('createCheckout', {
        priceId: service.stripePrice,
        type: 'reading',
        successType: service.id,
        coins: String(service.credits),
      });
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error(res.data?.error || 'Checkout failed');
      }
    } catch (err) {
      setCheckoutError(err.message);
      setCheckoutLoading('');
    }
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'linear-gradient(135deg, #0f0720 0%, #1a0a3d 40%, #0d0524 100%)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-light text-white mb-4">Booking Received!</h1>
          <p className="text-purple-100/70 mb-8">Thank you. I'll review your request and send you a confirmation email shortly.</p>
          <Button onClick={() => { setBookingSuccess(false); setShowBooking(false); }}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full">
            Back to Services
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0720 0%, #1a0a3d 40%, #0d0524 100%)' }}>
      {/* Hero */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-center mb-6">
              <div className="p-5 rounded-full" style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}>
                <Zap className="w-12 h-12 text-amber-300" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-white mb-4" style={{ textShadow: '0 0 40px rgba(251,191,36,0.3)' }}>
              Services & Offerings
            </h1>
            <p className="text-purple-200/70 text-lg max-w-2xl mx-auto mb-6">
              Pay with <span className="text-amber-300 font-medium">Luna Credits</span> or book directly with your card
            </p>
            {liveSession && (
              <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white"
                style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.5)' }}>
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                Guide is LIVE now — live guidance available!
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Credits explainer */}
      <section className="px-6 mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-5 grid md:grid-cols-3 gap-4 text-center"
            style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <div>
              <p className="text-amber-300 text-3xl font-light mb-1">10</p>
              <p className="text-white text-sm">Credits = $1.00</p>
            </div>
            <div>
              <p className="text-amber-300 text-3xl font-light mb-1">1 Credit</p>
              <p className="text-white text-sm">= $0.10 (10 cents)</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Link to={createPageUrl('Sanctuary') + '?tab=credits'}>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-5 text-sm">
                  <Gift className="w-4 h-4 mr-2" /> Get Luna Credits
                </Button>
              </Link>
              <Button onClick={() => openBooking()} variant="outline"
                className="border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full px-5 text-sm">
                <Calendar className="w-4 h-4 mr-2" /> Schedule
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 pb-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.id} id={`service-${s.id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="relative rounded-3xl p-6 flex flex-col transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.04)', border: highlighted === s.id ? '2px solid rgba(251,191,36,0.7)' : '1px solid rgba(255,255,255,0.08)', boxShadow: highlighted === s.id ? '0 0 30px rgba(251,191,36,0.2)' : 'none' }}>
              {s.tag && (
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  {s.tag}
                </div>
              )}
              {s.liveOnly && !liveSession && (
                <div className="absolute -top-3 left-6 bg-slate-600 text-white text-xs px-3 py-1 rounded-full font-medium">Offline</div>
              )}
              {s.liveOnly && liveSession && (
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs px-3 py-1 rounded-full font-medium animate-pulse">● Live Now</div>
              )}

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-5 shrink-0`}>
                <s.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-medium text-lg mb-2">{s.name}</h3>
              <p className="text-purple-200/60 text-sm leading-relaxed mb-4 flex-1">{s.description}</p>
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-3.5 h-3.5 text-purple-300/50" />
                <span className="text-purple-200/50 text-xs">{s.duration}</span>
              </div>

              {/* Price + Actions */}
              <div>
                {s.free ? (
                  <span className="text-2xl font-light text-emerald-400 block mb-4">Free</span>
                ) : (
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-light text-amber-300">{s.credits}</span>
                      <span className="text-purple-200/50 text-xs">credits</span>
                      {s.price && <span className="text-purple-200/40 text-xs ml-1">/ {s.price} USD</span>}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  {/* Primary action */}
                  {s.link ? (
                    <Link to={createPageUrl(s.link)} className="flex-1">
                      <Button className={`w-full rounded-full text-sm bg-gradient-to-r ${s.gradient} text-white`}>
                        <ArrowRight className="w-4 h-4 mr-1" /> Open
                      </Button>
                    </Link>
                  ) : s.liveOnly ? (
                    <Link to={createPageUrl('LiveChat')} className="flex-1">
                      <Button className={`w-full rounded-full text-sm bg-gradient-to-r ${liveSession ? 'from-red-500 to-rose-600' : 'from-slate-600 to-slate-700'} text-white`}>
                        {liveSession ? '🔴 Join Live Now' : 'Currently Offline'}
                      </Button>
                    </Link>
                  ) : s.bookable ? (
                    <>
                      {/* Pay with card */}
                      <Button onClick={() => handlePayCard(s)}
                        disabled={checkoutLoading === s.id}
                        className={`flex-1 rounded-full text-sm bg-gradient-to-r ${s.gradient} text-white`}>
                        {checkoutLoading === s.id ? '...' : (
                          <span className="flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5" /> {s.price}
                          </span>
                        )}
                      </Button>
                      {/* Schedule */}
                      <Button onClick={() => openBooking(s.id)} variant="outline"
                        className="rounded-full text-sm border-white/20 text-white/70 bg-white/5 hover:bg-white/10 px-3">
                        <Calendar className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  ) : null}
                </div>
                {checkoutError && checkoutLoading === '' && (
                  <p className="text-red-400 text-xs mt-2">{checkoutError}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Form — shown when requested */}
      <section id="booking-form" className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {!showBooking ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center rounded-3xl p-8"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <Calendar className="w-8 h-8 text-amber-300/60 mx-auto mb-3" />
              <p className="text-purple-200/50 text-sm mb-4">Prefer to schedule a specific date & time?</p>
              <Button onClick={() => openBooking()} variant="outline"
                className="border-amber-400/30 text-amber-300 hover:bg-amber-400/10 rounded-full px-6">
                <Calendar className="w-4 h-4 mr-2" /> Schedule an Appointment
              </Button>
            </motion.div>
          ) : (
            <AnimatePresence>
              <BookingForm
                preselected={preselected}
                onClose={() => setShowBooking(false)}
                onSuccess={() => setBookingSuccess(true)}
              />
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}