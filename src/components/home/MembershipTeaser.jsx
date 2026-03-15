import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Crown, Star, Headphones, Calendar, Gift, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  { icon: Star, text: 'Monthly channeled guidance' },
  { icon: Headphones, text: 'Exclusive meditation library' },
  { icon: Calendar, text: 'Priority booking access' },
  { icon: Gift, text: 'Member discounts on readings' }
];

export default function MembershipTeaser() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-purple-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-900/50 to-violet-900/50 border border-purple-500/20 rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <span className="text-amber-300 text-sm uppercase tracking-wider">Members Only</span>
              </div>
              <h2 className="text-3xl font-light text-white mb-4">
                Join The Sanctuary
              </h2>
              <p className="text-purple-200/70 mb-6">
                A sacred space for ongoing spiritual guidance, exclusive meditations, 
                and deep connection with the Mystic Priestess.
              </p>
              <Link to={createPageUrl('Sanctuary')}>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full">
                  Explore Membership <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-white/5 rounded-xl p-4"
                >
                  <benefit.icon className="w-6 h-6 text-amber-400" />
                  <span className="text-white/80">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}