import React, { useState } from 'react';

const Tarot = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const tarotData = {
    "m00": { name: "The Fool", keys: "Beginnings, Innocence, Spontaneity", up: "Free spirit, new adventure, potential, faith in the universe.", rev: "Recklessness, risk-taking, holding back, fear of the unknown." },
    "m01": { name: "The Magician", keys: "Manifestation, Resourcefulness, Power", up: "Inspired action, having all the tools, focused intention.", rev: "Manipulation, poor planning, untapped talents, illusions." },
    "m02": { name: "The High Priestess", keys: "Intuition, Sacred Knowledge, Subconscious", up: "Listening to the inner voice, divine feminine, mystery.", rev: "Secrets, disconnected from intuition, withdrawal, silence." },
    "m03": { name: "The Empress", keys: "Femininity, Nature, Abundance", up: "Fertility, creativity, nurturing, beauty, mothering energy.", rev: "Creative block, dependence on others, smothering energy." },
    "m04": { name: "The Emperor", keys: "Authority, Structure, Father Figure", up: "Establishment, protection, logic, discipline, leadership.", rev: "Tyranny, rigidity, coldness, lack of discipline or control." },
    "m05": { name: "The Hierophant", keys: "Tradition, Conformity, Spiritual Wisdom", up: "Religious beliefs, institutions, mentorship, tradition.", rev: "Rebellion, subverting status quo, personal beliefs, freedom." },
    "m06": { name: "The Lovers", keys: "Love, Harmony, Relationships", up: "Choices, alignment of values, partnerships, attraction.", rev: "Self-love, disharmony, imbalance, misalignment of values." },
    "m07": { name: "The Chariot", keys: "Control, Willpower, Success", up: "Action, determination, victory, overcoming obstacles.", rev: "Self-discipline, opposition, lack of direction, aggression." },
    "m08": { name: "Strength", keys: "Courage, Persuasion, Influence", up: "Inner strength, compassion, focus, soft control.", rev: "Self-doubt, raw emotion, low energy, lack of confidence." },
    "m09": { name: "The Hermit", keys: "Soul Searching, Introspection, Guidance", up: "Being alone, inner guidance, seeking truth, spiritual enlightenment.", rev: "Isolation, loneliness, withdrawal, over-analyzing." },
    "m10": { name: "Wheel of Fortune", keys: "Luck, Karma, Life Cycles", up: "Good luck, destiny, turning point, inevitable change.", rev: "Bad luck, resistance to change, breaking cycles." },
    "m11": { name: "Justice", keys: "Justice, Fairness, Truth", up: "Law, cause and effect, clarity, accountability.", rev: "Injustice, lack of accountability, dishonesty, unfairness." },
    "m12": { name: "The Hanged Man", keys: "Pause, Surrender, New Perspectives", up: "Letting go, sacrifice, waiting, enlightenment.", rev: "Stalling, needless sacrifice, fear of change, busy-ness." },
    "m13": { name: "Death", keys: "Endings, Change, Transformation", up: "New beginnings, transition, letting go of the old.", rev: "Resistance to change, personal transformation, inner purging." },
    "m14": { name: "Temperance", keys: "Balance, Moderation, Patience", up: "Purpose, meaning, finding the middle ground, alchemy.", rev: "Imbalance, excess, lack of long-term vision, disharmony." },
    "m15": { name: "The Devil", keys: "Shadow Self, Attachment, Addiction", up: "Restricted, sexuality, materialism, playfulness.", rev: "Detaching, breaking free, reclaiming power, exploring shadow." },
    "m16": { name: "The Tower", keys: "Sudden Change, Upheaval, Chaos", up: "Awakening, revelation, foundational shift, disaster.", rev: "Personal transformation, fear of change, avoiding tragedy." },
    "m17": { name: "The Star", keys: "Hope, Faith, Purpose", up: "Renewal, spirituality, inspiration, serenity.", rev: "Lack of faith, despair, disconnection, discouragement." },
    "m18": { name: "The Moon", keys: "Illusion, Fear, Anxiety", up: "Intuition, subconscious, dreams, uncertainty.", rev: "Release of fear, repressed emotion, inner confusion." },
    "m19": { name: "The Sun", keys: "Positivity, Fun, Warmth", up: "Success, vitality, confidence, radiant energy.", rev: "Inner child, feeling down, lack of enthusiasm, ego." },
    "m20": { name: "Judgement", keys: "Judgement, Rebirth, Inner Calling", up: "Absolution, awakening, decision making, purpose.", rev: "Self-doubt, refusal of the self-call, ignoring lessons." },
    "m21": { name: "The World", keys: "Completion, Integration, Accomplishment", up: "Travel, wholeness, fulfillment, belonging.", rev: "Seeking closure, shortcuts, delays, unfinished tasks." },
    "w01": { name: "Ace of Wands", keys: "Inspiration, Potential", up: "New passion, creative spark, bold move.", rev: "Lack of direction, delayed start, waning energy." },
    "w02": { name: "2 of Wands", keys: "Planning, Decisions", up: "Discovery, future planning, moving beyond comfort.", rev: "Fear of the unknown, playing it safe, lack of focus." },
    "w03": { name: "3 of Wands", keys: "Expansion, Foresight", up: "Progress, rapid growth, confidence in plans.", rev: "Playing small, lack of foresight, delays." },
    "w04": { name: "4 of Wands", keys: "Celebration, Home", up: "Relaxation, homecoming, joy, community.", rev: "Home conflict, lack of support, private transition." },
    "w05": { name: "5 of Wands", keys: "Conflict, Competition", up: "Disagreement, tension, diversity, rivalry.", rev: "Conflict avoidance, peace, focus on goals." },
    "w06": { name: "6 of Wands", keys: "Victory, Success", up: "Public recognition, pride, progress.", rev: "Private achievement, fall from grace, egotism." },
    "w07": { name: "7 of Wands", keys: "Defense, Perseverance", up: "Challenge, protecting territory, conviction.", rev: "Giving up, feeling overwhelmed, compromise." },
    "w08": { name: "8 of Wands", keys: "Speed, Action", up: "Fast movement, news, alignment.", rev: "Haste, waiting, slowing down, chaos." },
    "w09": { name: "9 of Wands", keys: "Resilience, Persistence", up: "The last push, courage, test of faith.", rev: "Exhaustion, burnout, defensive stance." },
    "w10": { name: "10 of Wands", keys: "Burden, Responsibility", up: "Hard work, completion, duty.", rev: "Delegating, collapse, release of stress." },
    "w11": { name: "Page of Wands", keys: "Discovery, Enthusiasm", up: "New ideas, restlessness, exploration.", rev: "Lack of ideas, distraction, bad news." },
    "w12": { name: "Knight of Wands", keys: "Action, Adventure", up: "Passion, impulsiveness, charm.", rev: "Arrogance, recklessness, scattered energy." },
    "w13": { name: "Queen of Wands", keys: "Confidence, Courage", up: "Social butterfly, independence, joy.", rev: "Self-centeredness, insecurity, jealousy." },
    "w14": { name: "King of Wands", keys: "Leadership, Vision", up: "Grand plans, entrepreneur, honor.", rev: "Impulsivity, haste, high expectations." },
    "c01": { name: "Ace of Cups", keys: "Love, Intuition", up: "New feelings, abundance, spirituality.", rev: "Emotional loss, blocked intuition, self-love." },
    "c02": { name: "2 of Cups", keys: "Partnership, Attraction", up: "Unity, connection, mutual respect.", rev: "Breakup, disharmony, self-love, distrust." },
    "c03": { name: "3 of Cups", keys: "Friendship, Community", up: "Celebration, creativity, collaboration.", rev: "Gossip, isolation, overindulgence." },
    "c04": { name: "4 of Cups", keys: "Meditation, Apathy", up: "Introspection, re-evaluation, boredom.", rev: "Retreat, clarity, choosing to move." },
    "c05": { name: "5 of Cups", keys: "Loss, Grief", up: "Disappointment, regret, pessimism.", rev: "Acceptance, moving on, self-forgiveness." },
    "c06": { name: "6 of Cups", keys: "Nostalgia, Innocence", up: "Childhood memories, healing, reunion.", rev: "Stuck in the past, moving forward, growth." },
    "c07": { name: "7 of Cups", keys: "Choices, Illusion", up: "Searching for purpose, fantasy, options.", rev: "Alignment, decision, overwhelming choice." },
    "c08": { name: "8 of Cups", keys: "Abandonment, Withdrawal", up: "Escapism, walking away, seeking truth.", rev: "Trying one last time, fear of moving on." },
    "c09": { name: "9 of Cups", keys: "Contentment, Satisfaction", up: "Gratitude, emotional stability, wishes.", rev: "Greed, dissatisfaction, materialism." },
    "c10": { name: "10 of Cups", keys: "Divine Love, Harmony", up: "Happy family, bliss, alignment.", rev: "Disconnected, family tension, misalignment." },
    "c11": { name: "Page of Cups", keys: "Creative Beginnings", up: "Curiosity, intuitive message, youth.", rev: "Emotional immaturity, creative block." },
    "c12": { name: "Knight of Cups", keys: "Romance, Charm", up: "Beauty, invitation, idealist.", rev: "Moodiness, jealousy, unrealistic." },
    "c13": { name: "Queen of Cups", keys: "Compassion, Intuition", up: "Empathy, nurturing, healer.", rev: "Self-care, codependency, martyrdom." },
    "c14": { name: "King of Cups", keys: "Emotional Balance", up: "Diplomacy, calm, control.", rev: "Emotional manipulation, volatility." },
    "s01": { name: "Ace of Swords", keys: "Breakthrough, Clarity", up: "Success, mental power, truth.", rev: "Confusion, brutality, chaos." },
    "s02": { name: "2 of Swords", keys: "Indecision, Stalemate", up: "Avoidance, blocked emotions.", rev: "Indecision, confusion, information overload." },
    "s03": { name: "3 of Swords", keys: "Heartbreak, Sorrow", up: "Grief, separation, hurt.", rev: "Recovery, forgiveness, moving on." },
    "s04": { name: "4 of Swords", keys: "Rest, Meditation", up: "Recovery, contemplation, retreat.", rev: "Burnout, restlessness, stagnation." },
    "s05": { name: "5 of Swords", keys: "Conflict, Defeat", up: "Winning at all costs, betrayal.", rev: "Reconciliation, making amends, resentment." },
    "s06": { name: "6 of Swords", keys: "Transition, Change", up: "Leaving behind, rite of passage.", rev: "Emotional baggage, resistance to change." },
    "s07": { name: "7 of Swords", keys: "Deception, Strategy", up: "Sneakiness, stealth, tactics.", rev: "Coming clean, confession, imposter syndrome." },
    "s08": { name: "8 of Swords", keys: "Imprisonment, Victimhood", up: "Trapped, powerless, isolation.", rev: "Self-acceptance, release, freedom." },
    "s09": { name: "9 of Swords", keys: "Anxiety, Nightmares", up: "Despair, stress, overthinking.", rev: "Hope, reaching out, deep-seated fear." },
    "s10": { name: "10 of Swords", keys: "Betrayal, Rock Bottom", up: "Endings, bitterness, finality.", rev: "Recovery, regeneration, resistance." },
    "s11": { name: "Page of Swords", keys: "Curiosity, Truth", up: "Mental agility, talkative, alert.", rev: "All talk, deception, paranoia." },
    "s12": { name: "Knight of Swords", keys: "Action, Haste", up: "Direct, ambitious, communicative.", rev: "Unfocused, impulsive, burn out." },
    "s13": { name: "Queen of Swords", keys: "Clarity, Directness", up: "Independent, unbiased, boundaries.", rev: "Coldhearted, cruel, bitter." },
    "s14": { name: "King of Swords", keys: "Intellectual Power", up: "Authority, truth, discipline.", rev: "Manipulative, tyrant, abusive." },
    "p01": { name: "Ace of Pentacles", keys: "Opportunity, Prosperity", up: "New job, wealth, grounding.", rev: "Lost opportunity, lack of planning." },
    "p02": { name: "2 of Pentacles", keys: "Balance, Priority", up: "Adaptability, juggling, time management.", rev: "Overwhelmed, disorganization." },
    "p03": { name: "3 of Pentacles", keys: "Teamwork, Building", up: "Collaboration, learning, implementation.", rev: "Disharmony, misalignment, solo work." },
    "p04": { name: "4 of Pentacles", keys: "Security, Scarcity", up: "Control, stability, conservation.", rev: "Greed, openness, letting go." },
    "p05": { name: "5 of Pentacles", keys: "Hardship, Poverty", up: "Financial loss, isolation, worry.", rev: "Recovery, spiritual poverty, relief." },
    "p06": { name: "6 of Pentacles", keys: "Generosity, Sharing", up: "Charity, gratitude, power dynamics.", rev: "Self-care, debt, strings attached." },
    "p07": { name: "7 of Pentacles", keys: "Investment, Patience", up: "Sustainability, results, long-term.", rev: "Short-term, lack of reward, frustration." },
    "p08": { name: "8 of Pentacles", keys: "Mastery, Skill", up: "Education, quality, repetitive task.", rev: "Perfectionism, lack of ambition, busy-ness." },
    "p09": { name: "9 of Pentacles", keys: "Abundance, Luxury", up: "Independence, self-sufficiency, rewards.", rev: "Self-worth, over-spending, instability." },
    "p10": { name: "10 of Pentacles", keys: "Legacy, Wealth", up: "Family, long-term success, tradition.", rev: "Financial failure, family dispute, fleeting success." },
    "p11": { name: "Page of Pentacles", keys: "Manifestation, Study", up: "Practicality, opportunity, ambition.", rev: "Lack of progress, procrastination." },
    "p12": { name: "Knight of Pentacles", keys: "Efficiency, Routine", up: "Hard work, responsibility, conservative.", rev: "Laziness, obsession with detail, boredom." },
    "p13": { name: "Queen of Pentacles", keys: "Nurturing, Practical", up: "Healer, business-woman, security.", rev: "Self-care, work-home imbalance, jealousy." },
    "p14": { name: "King of Pentacles", keys: "Abundance, Power", up: "Security, provider, leadership.", rev: "Greed, indulgence, stubbornness." }
  };

  const major = Array.from({length: 22}, (_, i) => `m${i.toString().padStart(2, '0')}`);
  const suits = ["w", "c", "s", "p"];
  const minor = suits.flatMap(s => Array.from({length: 14}, (_, i) => `${s}${(i + 1).toString().padStart(2, '0')}`));
  const allCardIds = [...major, ...minor];

  return (
    <div className="min-h-screen pt-24 pb-48 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-6xl font-bold uppercase tracking-tighter mb-4">The Tarot Codex</h1>
        <div className="h-1 w-24 bg-purple-500 mx-auto mb-6"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {allCardIds.map((id) => {
          const card = tarotData[id];
          return (
            <div key={id} onClick={() => setSelectedCard({...card, id})} className="group cursor-pointer bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden hover:border-purple-500/40 transition-all shadow-2xl">
              <div className="aspect-[2/3] bg-zinc-800 relative">
                <img src={`/images/tarot/cards/${id}.jpg`} alt={card?.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <div className="p-3 text-center bg-black/40">
                <h3 className="text-[9px] font-bold uppercase tracking-tighter text-zinc-500">{card?.name}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCard && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl animate-in fade-in">
          <div className="relative max-w-2xl w-full bg-zinc-950 border border-purple-500/20 rounded-[50px] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            {/* CLOSE X BUTTON */}
            <button onClick={() => setSelectedCard(null)} className="absolute top-8 right-8 z-[210] w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white hover:text-black transition-all">✕</button>
            
            <div className="overflow-y-auto p-10 md:p-12 space-y-10 text-center">
              <img src={`/images/tarot/cards/${selectedCard.id}.jpg`} alt={selectedCard.name} className="w-40 mx-auto mb-6 rounded-lg shadow-2xl" />
              <h2 className="text-4xl font-bold uppercase tracking-tighter">{selectedCard.name}</h2>
              
              <div className="space-y-8 text-left pb-10">
                <div>
                   <h4 className="text-[10px] uppercase tracking-[0.5em] text-purple-400 font-black mb-3 text-center">Vibrations</h4>
                   <p className="text-zinc-300 text-lg italic leading-relaxed text-center">{selectedCard.keys}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-emerald-500/5 p-8 rounded-[40px] border border-emerald-500/10">
                    <h4 className="text-[10px] uppercase tracking-widest text-emerald-400 font-black mb-4 text-center">Upright</h4>
                    <p className="text-zinc-300 text-sm italic leading-relaxed">{selectedCard.up}</p>
                  </div>
                  <div className="bg-red-500/5 p-8 rounded-[40px] border border-red-500/10">
                    <h4 className="text-[10px] uppercase tracking-widest text-red-400 font-black mb-4 text-center">Reversed</h4>
                    <p className="text-zinc-300 text-sm italic leading-relaxed">{selectedCard.rev}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tarot;