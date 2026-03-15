import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-purple-950 to-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
          Ready to Discover What the 
          <span className="block font-semibold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            Universe Has in Store?
          </span>
        </h2>

        <p className="text-xl text-purple-100/70 mb-10 max-w-2xl mx-auto">
          Your spiritual journey awaits. Book a personalized reading today and 
          gain the insights you need to move forward with confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={createPageUrl('BookReading')}>
            <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-10 py-6 text-lg rounded-full shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-105">
              <Calendar className="w-5 h-5 mr-2" />
              Book Your Reading
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <p className="text-purple-200/50 text-sm mt-8">
          "The universe speaks to those who listen. Let me help you hear its wisdom."
        </p>
      </motion.div>
    </section>
  );
}