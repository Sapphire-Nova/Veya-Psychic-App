import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';

// Crystal/herb images mapped by category and chakra
const CARD_IMAGES = {
  chakra_balancing: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
  energy_cleansing: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  grounding: 'https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=600&q=80',
  protection: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80',
  live_replay: 'https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=600&q=80',
  guided_journeys: 'https://images.unsplash.com/photo-1531171673193-06b337b52cc5?w=600&q=80',
  chakra_healing_music: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
  ambient_sounds: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80',
};

const CHAKRA_IMAGES = {
  root: 'https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=600&q=80',
  sacral: 'https://images.unsplash.com/photo-1567447788858-4a9f1a6f3fb6?w=600&q=80',
  solar_plexus: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80',
  heart: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80',
  throat: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
  third_eye: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
  crown: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
  all: 'https://images.unsplash.com/photo-1531171673193-06b337b52cc5?w=600&q=80',
};

const CATEGORY_LABELS = {
  chakra_balancing: 'Chakra Balancing',
  energy_cleansing: 'Energy Cleansing',
  grounding: 'Grounding',
  protection: 'Protection',
  live_replay: 'Live Replay',
  guided_journeys: 'Guided Journey',
  chakra_healing_music: 'Chakra Healing',
  ambient_sounds: 'Ambient Sounds',
};

export default function MeditationCard({ meditation, isActive, isPlaying, onSelect }) {
  const imageUrl = meditation.thumbnail_url ||
    (meditation.chakra && CHAKRA_IMAGES[meditation.chakra]) ||
    CARD_IMAGES[meditation.category] ||
    CARD_IMAGES.guided_journeys;

  const categoryLabel = CATEGORY_LABELS[meditation.category] || meditation.category;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onSelect(meditation)}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        border: isActive
          ? '1px solid rgba(251,191,36,0.5)'
          : '1px solid rgba(139,92,246,0.2)',
      }}
    >
      {/* Breathing pulse overlay — visible when this card is actively playing */}
      {isActive && isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          animate={{
            boxShadow: [
              '0 0 0px 0px rgba(168,85,247,0)',
              '0 0 28px 8px rgba(168,85,247,0.35)',
              '0 0 0px 0px rgba(168,85,247,0)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={meditation.title}
          className="w-full h-full object-cover"
          animate={isActive && isPlaying ? { scale: [1, 1.04, 1] } : { scale: 1 }}
          transition={isActive && isPlaying ? { duration: 8, repeat: Infinity, ease: 'easeInOut' } : {}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Play hint overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
          <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <Play className="w-5 h-5 text-white ml-0.5" />
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(251,191,36,0.9)', border: '1px solid rgba(251,191,36,0.25)' }}>
            {categoryLabel}
          </span>
        </div>

        {/* Active indicator */}
        {isActive && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(168,85,247,0.3)', border: '1px solid rgba(168,85,247,0.5)' }}>
            {isPlaying ? (
              <>
                {[0, 1, 2].map(i => (
                  <motion.span key={i} className="w-0.5 rounded-full bg-amber-300"
                    animate={{ height: ['6px', '14px', '6px'] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                    style={{ display: 'block', minWidth: '2px' }}
                  />
                ))}
              </>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4"
        style={{ background: isActive ? 'rgba(88,28,135,0.25)' : 'rgba(15,10,40,0.9)' }}>
        <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">{meditation.title}</h3>
        <p className="text-purple-200/55 text-xs leading-relaxed line-clamp-2 mb-3">{meditation.description}</p>
        <div className="flex items-center gap-1.5 text-purple-300/40 text-xs">
          <Clock className="w-3 h-3" />
          <span>{meditation.duration_minutes} min</span>
        </div>
      </div>
    </motion.div>
  );
}