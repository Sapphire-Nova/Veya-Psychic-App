import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

import HeroSection from '@/components/home/HeroSection';
import ReadingTypes from '@/components/home/ReadingTypes';
import DailyGuidanceCard from '@/components/home/DailyGuidanceCard';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import AdvisorIntro from '@/components/home/AdvisorIntro';
import CTASection from '@/components/home/CTASection';
import QuickTools from '@/components/home/QuickTools';
import MembershipTeaser from '@/components/home/MembershipTeaser';
import LearnSection from '@/components/home/LearnSection';

export default function Home() {
  const { data: testimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => base44.entities.Testimonial.filter({ is_featured: true }, '-created_date', 3),
    initialData: []
  });

  const { data: dailyGuidance } = useQuery({
    queryKey: ['dailyGuidance'],
    queryFn: () => base44.entities.DailyGuidance.list('-date', 1),
    initialData: []
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <HeroSection />
      <ReadingTypes />
      <QuickTools />
      <LearnSection />
      <DailyGuidanceCard guidance={dailyGuidance?.[0]} />
      <AdvisorIntro />
      <MembershipTeaser />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </div>
  );
}