import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const defaultTestimonials = [
  {
    name: "Sarah M.",
    content: "The reading was incredibly accurate and gave me the clarity I desperately needed. I felt truly seen and understood. This experience has changed my perspective on life.",
    rating: 5,
    reading_type: "Tarot Reading"
  },
  {
    name: "Michael R.",
    content: "I was skeptical at first, but the insights I received were spot on. The guidance helped me make an important career decision that has transformed my life for the better.",
    rating: 5,
    reading_type: "Career Guidance"
  },
  {
    name: "Jennifer L.",
    content: "The mediumship reading brought me peace I hadn't felt in years. Messages from my grandmother were so specific and comforting. Forever grateful for this healing experience.",
    rating: 5,
    reading_type: "Mediumship"
  }
];

export default function TestimonialsSection({ testimonials }) {
  const displayTestimonials = testimonials?.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-20 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-light text-white mt-3 mb-4">
            What Seekers Say
          </h2>
          <p className="text-purple-200/60 max-w-2xl mx-auto">
            Real experiences from those who have received spiritual guidance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
                <Quote className="w-10 h-10 text-purple-400/30 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
                    />
                  ))}
                </div>

                <p className="text-purple-100/80 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                <div className="mt-auto">
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-purple-300/60 text-sm">{testimonial.reading_type}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
