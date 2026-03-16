import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send, Check, Sparkles, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const sendMessage = useMutation({
    mutationFn: (data) => base44.entities.ContactMessage.create(data),
    onSuccess: () => setSubmitted(true)
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage.mutate(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
              <Mail className="w-10 h-10 text-amber-300" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-purple-100/70 text-lg max-w-2xl mx-auto">
            Have questions about readings or spiritual guidance? I'm here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-white mb-6">How Can I Help?</h2>
              <p className="text-purple-100/70 leading-relaxed mb-8">
                Whether you have questions about my services, need guidance on which reading 
                is right for you, or simply want to connect, I welcome your message. I respond 
                to all inquiries personally within 24-48 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Response Time</h3>
                    <p className="text-purple-200/60 text-sm">Within 24-48 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Reading Sessions</h3>
                    <p className="text-purple-200/60 text-sm">Available 7 days a week by appointment</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Personal Attention</h3>
                    <p className="text-purple-200/60 text-sm">Every message receives individual care</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-2xl p-6">
              <p className="text-amber-100 text-sm">
                <strong>Note:</strong> For booking readings, please use the dedicated{' '}
                <a href="/BookReading" className="underline hover:text-white">booking page</a> for the fastest response.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {submitted ? (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-light text-white mb-4">Message Sent!</h2>
                <p className="text-purple-100/70">
                  Thank you for reaching out. I'll respond to your message within 24-48 hours.
                </p>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-purple-200 text-sm mb-2 block">Your Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <Input
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Enter your name"
                        required
                        className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-purple-200 text-sm mb-2 block">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-purple-200 text-sm mb-2 block">Subject</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      placeholder="What is this regarding?"
                      className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl h-12"
                    />
                  </div>

                  <div>
                    <label className="text-purple-200 text-sm mb-2 block">Your Message *</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-purple-400" />
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="How can I help you on your spiritual journey?"
                        required
                        className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl min-h-[150px] resize-none"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={sendMessage.isPending}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-6 text-lg rounded-full shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02]"
                  >
                    {sendMessage.isPending ? 'Sending...' : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
