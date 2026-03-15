import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  MessageCircle, Send, User, Mail, Sparkles,
  Heart, Check, ArrowRight, Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MobileDrawerSelect from '@/components/ui/MobileDrawerSelect';

const categories = [
  { value: 'love', label: 'Love & Relationships', icon: '💕' },
  { value: 'career', label: 'Career & Purpose', icon: '⭐' },
  { value: 'spiritual_growth', label: 'Spiritual Growth', icon: '🌙' },
  { value: 'healing', label: 'Healing & Wellness', icon: '💚' },
  { value: 'life_purpose', label: 'Life Purpose', icon: '🧭' },
  { value: 'relationships', label: 'Family & Friends', icon: '👥' },
  { value: 'other', label: 'Other', icon: '✨' }
];

export default function AskPriestess() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    question: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const submitQuestion = useMutation({
    mutationFn: async (data) => {
      setIsGenerating(true);
      
      // Generate brief intuitive response
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a mystic priestess providing brief intuitive guidance. A seeker named ${data.name} asks about ${data.category}: "${data.question}"
        
        Provide a brief, warm, and wise response (2-3 sentences max) that:
        - Acknowledges their question with compassion
        - Offers one piece of intuitive insight
        - Gently suggests that deeper guidance awaits in a personal reading
        
        Keep it mystical yet grounded. Do not make specific predictions.`,
        response_json_schema: {
          type: "object",
          properties: {
            insight: { type: "string" }
          },
          required: ["insight"]
        }
      });

      await base44.entities.PriestessQuestion.create({
        ...data,
        response: response.insight
      });

      setAiResponse(response.insight);
      setIsGenerating(false);
      setSubmitted(true);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuestion.mutate(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
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
                <MessageCircle className="w-10 h-10 text-amber-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Ask the Priestess
            </h1>
            <p className="text-purple-100/70 text-lg max-w-2xl mx-auto">
              Submit one spiritual question and receive brief intuitive guidance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 bg-slate-950">
        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-purple-200 text-sm mb-2 block">Your Name</label>
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
                      <label className="text-purple-200 text-sm mb-2 block">Email</label>
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
                  </div>

                  <div>
                    <label className="text-purple-200 text-sm mb-2 block">Category</label>
                    <div className="hidden md:block">
                      <Select value={formData.category} onValueChange={(value) => handleChange('category', value)} required>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white rounded-xl h-12">
                          <SelectValue placeholder="What area of life is this about?" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/20">
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value} className="text-white hover:bg-white/10 focus:bg-white/10">
                              <span className="flex items-center gap-2"><span>{cat.icon}</span>{cat.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:hidden">
                      <MobileDrawerSelect
                        value={formData.category}
                        onValueChange={(v) => handleChange('category', v)}
                        placeholder="What area of life is this about?"
                        options={categories.map(c => ({ value: c.value, label: c.label, icon: c.icon }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-purple-200 text-sm mb-2 block">Your Question</label>
                    <Textarea
                      value={formData.question}
                      onChange={(e) => handleChange('question', e.target.value)}
                      placeholder="Share your spiritual question... (Keep it focused for the best insight)"
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-purple-300/40 rounded-xl min-h-[120px] resize-none"
                    />
                  </div>

                  <div className="bg-purple-900/30 border border-purple-500/20 rounded-xl p-4">
                    <p className="text-purple-200/80 text-sm">
                      <Sparkles className="w-4 h-4 inline mr-2 text-amber-400" />
                      You'll receive a brief intuitive insight. For deeper, personalized guidance, 
                      consider booking a full reading session.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitQuestion.isPending || isGenerating}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 text-lg rounded-full"
                  >
                    {isGenerating ? (
                      <>
                        <Moon className="w-5 h-5 mr-2 animate-pulse" />
                        Receiving Guidance...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Question
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-light text-white mb-6">Guidance Received</h2>
              
              <div className="bg-gradient-to-br from-purple-900/50 to-violet-900/50 border border-purple-500/20 rounded-3xl p-8 mb-8">
                <p className="text-xl text-white/90 font-light leading-relaxed italic">
                  "{aiResponse}"
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <Heart className="w-8 h-8 text-rose-400 mx-auto mb-4" />
                <p className="text-purple-200/80">
                  For deeper insight, personal connection, and detailed guidance on your path, 
                  the Mystic Priestess invites you to a private reading.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl('BookReading')}>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full w-full sm:w-auto">
                    Book a Full Reading <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', category: '', question: '' });
                    setAiResponse('');
                  }}
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-full"
                >
                  Ask Another Question
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}