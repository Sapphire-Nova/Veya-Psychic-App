import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, ArrowRight, ArrowLeft, Sparkles,
  Moon, Sun, Star, Heart, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const questions = [
  {
    id: 1,
    question: "What draws you most right now?",
    options: [
      { text: "Finding my purpose", theme: "purpose", icon: "🧭" },
      { text: "Healing from the past", theme: "healing", icon: "💫" },
      { text: "Navigating relationships", theme: "love", icon: "💕" },
      { text: "Career & abundance", theme: "abundance", icon: "⭐" }
    ]
  },
  {
    id: 2,
    question: "How do you feel when alone with your thoughts?",
    options: [
      { text: "Peaceful and centered", theme: "grounded", icon: "🌳" },
      { text: "Anxious or overwhelmed", theme: "anxious", icon: "🌊" },
      { text: "Creative and inspired", theme: "creative", icon: "🎨" },
      { text: "Restless, seeking something", theme: "seeking", icon: "🔍" }
    ]
  },
  {
    id: 3,
    question: "What keeps appearing in your life lately?",
    options: [
      { text: "Endings and new beginnings", theme: "transformation", icon: "🦋" },
      { text: "Repeated patterns or lessons", theme: "lessons", icon: "🔄" },
      { text: "Unexpected opportunities", theme: "opportunity", icon: "🚪" },
      { text: "Challenges testing my strength", theme: "challenge", icon: "⚔️" }
    ]
  },
  {
    id: 4,
    question: "What do you need most right now?",
    options: [
      { text: "Clarity and direction", theme: "clarity", icon: "🔮" },
      { text: "Emotional healing", theme: "emotional", icon: "💚" },
      { text: "Confidence and courage", theme: "confidence", icon: "🦁" },
      { text: "Connection and love", theme: "connection", icon: "🤍" }
    ]
  },
  {
    id: 5,
    question: "Which element calls to you?",
    options: [
      { text: "Earth - stability, grounding", theme: "earth", icon: "🌍" },
      { text: "Water - emotion, intuition", theme: "water", icon: "💧" },
      { text: "Fire - passion, transformation", theme: "fire", icon: "🔥" },
      { text: "Air - thoughts, communication", theme: "air", icon: "💨" }
    ]
  }
];

const soulPaths = {
  transformation: {
    theme: "The Phoenix Rising",
    lesson: "Embracing endings as sacred beginnings",
    focus: "Release what no longer serves you. This is a time of profound rebirth.",
    reading: "mediumship",
    color: "from-orange-500 to-red-600"
  },
  healing: {
    theme: "The Wounded Healer",
    lesson: "Transforming pain into wisdom",
    focus: "Your healing journey is preparing you to help others. Be gentle with yourself.",
    reading: "chakra",
    color: "from-emerald-500 to-teal-600"
  },
  purpose: {
    theme: "The Seeker's Path",
    lesson: "Trust that your purpose is unfolding",
    focus: "Follow what lights you up. Your passion is your compass.",
    reading: "psychic",
    color: "from-indigo-500 to-purple-600"
  },
  love: {
    theme: "The Heart Opening",
    lesson: "Learning to give and receive love freely",
    focus: "Open your heart without fear. Love is your birthright.",
    reading: "love",
    color: "from-rose-500 to-pink-600"
  },
  abundance: {
    theme: "The Manifestor",
    lesson: "Aligning thoughts with abundance",
    focus: "Release scarcity thinking. You are worthy of prosperity.",
    reading: "career",
    color: "from-amber-500 to-yellow-500"
  },
  clarity: {
    theme: "The Visionary",
    lesson: "Trusting your inner knowing",
    focus: "Quiet the noise. Your intuition holds all the answers.",
    reading: "tarot",
    color: "from-violet-500 to-purple-600"
  }
};

export default function SoulPathQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option.theme];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = async (allAnswers) => {
    setIsCalculating(true);
    
    // Count themes
    const themeCounts = allAnswers.reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {});

    // Map to soul paths
    const pathMapping = {
      transformation: 'transformation',
      lessons: 'transformation',
      healing: 'healing',
      emotional: 'healing',
      purpose: 'purpose',
      seeking: 'purpose',
      love: 'love',
      connection: 'love',
      abundance: 'abundance',
      opportunity: 'abundance',
      clarity: 'clarity',
      grounded: 'clarity',
      creative: 'purpose',
      anxious: 'healing',
      challenge: 'transformation',
      confidence: 'abundance',
      earth: 'healing',
      water: 'love',
      fire: 'transformation',
      air: 'clarity'
    };

    const pathCounts = {};
    allAnswers.forEach(theme => {
      const path = pathMapping[theme] || 'clarity';
      pathCounts[path] = (pathCounts[path] || 0) + 1;
    });

    const topPath = Object.entries(pathCounts)
      .sort(([,a], [,b]) => b - a)[0][0];

    // Generate personalized insight
    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `As a mystic priestess, provide a brief, personalized soul path insight for someone on "${soulPaths[topPath].theme}" path. Their soul lesson is "${soulPaths[topPath].lesson}". Write 2-3 sentences of warm, mystical encouragement. Be specific to their journey.`,
      response_json_schema: {
        type: "object",
        properties: {
          personalMessage: { type: "string" }
        },
        required: ["personalMessage"]
      }
    });

    setResult({
      path: topPath,
      ...soulPaths[topPath],
      personalMessage: response.personalMessage
    });
    setIsCalculating(false);
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
                <Compass className="w-10 h-10 text-amber-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Soul Path Insight Quiz
            </h1>
            <p className="text-purple-100/70 text-lg">
              Discover your current energetic theme and soul lesson
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quiz Content */}
      <section className="py-12 px-6 bg-slate-950">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!result && !isCalculating && (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Progress value={progress} className="mb-8 h-2 bg-white/10" />
                
                <p className="text-purple-300 text-sm mb-2">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
                
                <h2 className="text-2xl font-light text-white mb-8">
                  {questions[currentQuestion].question}
                </h2>

                <div className="grid gap-4">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.text}
                      onClick={() => handleAnswer(option)}
                      className="p-5 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-purple-500/20 hover:border-purple-500/30 transition-all group"
                    >
                      <span className="text-2xl mr-4">{option.icon}</span>
                      <span className="text-white group-hover:text-purple-200">{option.text}</span>
                    </button>
                  ))}
                </div>

                {currentQuestion > 0 && (
                  <button
                    onClick={() => {
                      setCurrentQuestion(currentQuestion - 1);
                      setAnswers(answers.slice(0, -1));
                    }}
                    className="mt-6 text-purple-300 hover:text-white flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous Question
                  </button>
                )}
              </motion.div>
            )}

            {isCalculating && (
              <motion.div
                key="calculating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Moon className="w-10 h-10 text-white" />
                </div>
                <p className="text-purple-200/70 text-lg">Reading your soul's energy...</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-center mb-8">
                  <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center mb-6 shadow-2xl`}>
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-light text-white mb-2">{result.theme}</h2>
                  <p className="text-purple-200/70">Your current soul path</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-purple-900/30 border border-purple-500/20 rounded-2xl p-6">
                    <h3 className="text-purple-300 text-sm uppercase tracking-wider mb-3">Soul Lesson</h3>
                    <p className="text-white/90 text-lg">{result.lesson}</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-amber-300 text-sm uppercase tracking-wider mb-3">Spiritual Focus</h3>
                    <p className="text-white/90">{result.focus}</p>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 rounded-2xl p-6">
                    <h3 className="text-indigo-300 text-sm uppercase tracking-wider mb-3">Personal Message</h3>
                    <p className="text-white/90 italic">"{result.personalMessage}"</p>
                  </div>

                  <div className="bg-amber-900/30 border border-amber-500/20 rounded-2xl p-6">
                    <h3 className="text-amber-300 text-sm uppercase tracking-wider mb-3">Recommended Reading</h3>
                    <p className="text-white/90 mb-4">
                      Based on your path, a <strong className="text-amber-300">{result.reading}</strong> reading would provide the deepest insight.
                    </p>
                    <Link to={createPageUrl('Services')}>
                      <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full">
                        Book Your Reading <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <button onClick={reset} className="text-purple-300 hover:text-white flex items-center gap-2 mx-auto">
                    <RefreshCw className="w-4 h-4" />
                    Take Quiz Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}