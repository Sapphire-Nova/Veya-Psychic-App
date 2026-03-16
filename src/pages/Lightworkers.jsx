import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Sun, Heart, Zap, Eye, Sparkles, Shield, Waves, Flame, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const healingTypes = [
  {
    name: "Reiki",
    icon: Waves,
    description: "Japanese energy healing that channels universal life force through the hands to promote healing, reduce stress, and restore balance.",
    origin: "Japan, developed by Mikao Usui in 1922",
    howItWorks: "Practitioners channel healing energy through their hands, either through touch or hovering above the body, to clear blockages and balance energy centers."
  },
  {
    name: "Pranic Healing",
    icon: Sparkles,
    description: "An ancient science of using prana (life energy) to heal the body by cleansing and energizing the energy field.",
    origin: "Philippines, systematized by Grandmaster Choa Kok Sui",
    howItWorks: "Practitioners scan the aura, cleanse diseased or depleted energy, and project fresh prana into affected areas without physical touch."
  },
  {
    name: "Crystal Healing",
    icon: Star,
    description: "Using the vibrational properties of crystals to clear, balance, and activate the body's energy systems.",
    origin: "Ancient civilizations worldwide",
    howItWorks: "Crystals are placed on or around the body at energy points. Their unique frequencies interact with the body's energy field to promote healing."
  },
  {
    name: "Sound Healing",
    icon: Waves,
    description: "Using vibrations from instruments like singing bowls, tuning forks, or voice to shift brainwaves and restore harmony.",
    origin: "Ancient Tibet, Egypt, Greece",
    howItWorks: "Sound waves penetrate deeply into the body, affecting cellular function, calming the nervous system, and entraining brainwaves to healing states."
  },
  {
    name: "Shamanic Healing",
    icon: Flame,
    description: "Ancient practices of connecting with spirit guides and power animals to retrieve lost soul parts and remove intrusions.",
    origin: "Indigenous cultures worldwide",
    howItWorks: "Shamans journey to non-ordinary reality to access healing wisdom, perform soul retrieval, extract harmful energies, and restore spiritual wholeness."
  },
  {
    name: "Chakra Balancing",
    icon: Zap,
    description: "Working with the seven main energy centers to clear blockages and restore the free flow of life force energy.",
    origin: "Ancient India (Vedic tradition)",
    howItWorks: "Through meditation, visualization, hands-on healing, or tools like crystals and sound, practitioners identify and correct imbalances in the chakra system."
  }
];

const lightworkerTraits = [
  "Deep empathy and sensitivity to others' emotions",
  "Feeling called to help, heal, or serve humanity",
  "Strong intuitive or psychic abilities",
  "Sense of being 'different' from others since childhood",
  "Attraction to spiritual practices and ancient wisdom",
  "Experiences with synchronicities and meaningful coincidences",
  "Desire to bring light to darkness and transform suffering",
  "Feeling a sense of mission or purpose beyond personal goals",
  "Natural ability to uplift and inspire others",
  "Connection to nature and all living beings"
];

export default function Lightworkers() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-950 via-orange-900 to-rose-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-rose-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Sun className="w-10 h-10 text-amber-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
              Lightworkers & Energy Healing
            </h1>
            <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
              Discover the sacred art of energy healing and the purpose of lightworkers 
              in raising the collective consciousness of humanity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is Energy Healing */}
      <section className="py-20 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-400 text-sm uppercase tracking-widest">Understanding</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mt-3">
              What is Energy Healing?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <p className="text-purple-100/80 text-lg leading-relaxed mb-6">
              Energy healing is a holistic practice that activates the body's subtle energy systems 
              to remove blocks and stimulate the body's inherent ability to heal itself. Every living 
              being is composed of energy that flows through channels, centers (chakras), and fields (auras).
            </p>
            <p className="text-purple-100/80 leading-relaxed mb-6">
              When this energy becomes stagnant, blocked, or depleted—often due to physical illness, 
              emotional trauma, or mental stress—it can manifest as physical symptoms, emotional 
              imbalances, or spiritual disconnection. Energy healing works to restore the natural 
              flow and balance of this life force energy.
            </p>
            <p className="text-purple-100/80 leading-relaxed">
              Whether through hands-on techniques, visualization, sound, crystals, or intention, 
              energy healing addresses the root energetic cause of imbalance rather than just 
              treating surface symptoms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How Energy Healing Works */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-indigo-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-400 text-sm uppercase tracking-widest">The Process</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mt-3">
              How Energy Healing Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Eye, title: "Assessment", description: "The healer senses, scans, or intuits where energy is blocked, depleted, or excessive in the client's field." },
              { icon: Shield, title: "Clearing", description: "Negative, stagnant, or foreign energies are removed through various techniques to create space for healing." },
              { icon: Zap, title: "Charging", description: "Fresh, vital life force energy is channeled into depleted areas to restore vitality and balance." },
              { icon: Heart, title: "Integration", description: "The energy system is harmonized, sealed, and grounded to help the client integrate the healing." }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{step.title}</h3>
                <p className="text-purple-200/60 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Energy Healing */}
      <section className="py-20 px-6 bg-indigo-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-400 text-sm uppercase tracking-widest">Modalities</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mt-3">
              Types of Spiritual Healing
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healingTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{type.name}</h3>
                <p className="text-purple-200/60 text-sm mb-4">{type.description}</p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-amber-400/80 text-xs mb-2">Origin: {type.origin}</p>
                  <p className="text-purple-200/50 text-xs">{type.howItWorks}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role of Intuition */}
      <section className="py-20 px-6 bg-gradient-to-b from-indigo-950 to-purple-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/50 to-violet-900/50 border border-purple-400/20 rounded-3xl p-8 md:p-12"
          >
            <div className="flex justify-center mb-6">
              <Eye className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-white text-center mb-6">
              The Role of Intuition
            </h2>
            <p className="text-purple-100/80 leading-relaxed mb-6 text-center">
              Intuition is the bridge between the physical and spiritual realms. It allows healers 
              to perceive what cannot be seen with physical eyes—the subtle energies, emotional 
              imprints, and spiritual patterns that affect wellbeing.
            </p>
            <p className="text-purple-100/80 leading-relaxed text-center">
              Developing intuition is essential for any energy healer. It guides them to the root 
              cause of imbalance, helps them understand what each client needs, and allows them 
              to receive guidance from higher sources during healing sessions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What are Lightworkers */}
      <section className="py-20 px-6 bg-purple-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-amber-500/20 rounded-full">
                <Users className="w-10 h-10 text-amber-400" />
              </div>
            </div>
            <span className="text-amber-400 text-sm uppercase tracking-widest">Sacred Purpose</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mt-3 mb-6">
              The Purpose of Lightworkers
            </h2>
            <p className="text-purple-100/70 text-lg max-w-3xl mx-auto">
              Lightworkers are souls who have incarnated with a specific mission: to help raise 
              the vibration of Earth and assist humanity in its spiritual evolution. They serve 
              as channels of divine light, bringing healing, wisdom, and transformation to those 
              around them.
            </p>
          </motion.div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-medium text-white mb-6 text-center">
              Signs You May Be a Lightworker
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {lightworkerTraits.map((trait, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-purple-100/70 text-sm">{trait}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-purple-950 to-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-light text-white mb-6">
            Ready to Explore Your Healing Path?
          </h2>
          <p className="text-purple-100/70 mb-8">
            Whether you're seeking healing or discovering your own gifts as a lightworker, 
            I'm here to guide you on your journey.
          </p>
          <Link to={createPageUrl('BookReading')}>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full">
              Book a Reading
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
