import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const CHAKRA_SIGNS = {
  Aries: 'solar_plexus', Taurus: 'throat', Gemini: 'throat',
  Cancer: 'heart', Leo: 'solar_plexus', Virgo: 'root',
  Libra: 'heart', Scorpio: 'sacral', Sagittarius: 'crown',
  Capricorn: 'root', Aquarius: 'third_eye', Pisces: 'crown'
};

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const today = new Date().toISOString().split('T')[0];
  console.log(`Running daily zodiac update for ${today}`);

  // Check if today's guidance already exists
  const existing = await base44.asServiceRole.entities.DailyGuidance.filter({ date: today });
  if (existing.length > 0) {
    console.log('Daily guidance already exists for today, skipping.');
    return Response.json({ skipped: true, date: today });
  }

  // Build the prompt for all 12 signs
  const prompt = `You are an expert astrologer. Today's date is ${today}.

Generate accurate, spiritually insightful daily horoscope predictions for all 12 zodiac signs. For each sign, consider the current planetary transits and celestial energies that would be active on this date.

Return a JSON object with this exact structure:
{
  "date": "${today}",
  "title": "Daily Cosmic Guidance — [Day of week, Month Day, Year]",
  "message": "A 2-3 sentence overarching cosmic message for everyone today",
  "affirmation": "A universal affirmation for the day",
  "focus_area": "The main energetic theme today (e.g., 'Emotional Clarity', 'Bold Action', 'Deep Rest')",
  "zodiac_predictions": {
    "Aries": { "prediction": "2-3 sentence prediction", "theme": "one word theme", "lucky_color": "color name" },
    "Taurus": { "prediction": "2-3 sentence prediction", "theme": "one word theme", "lucky_color": "color name" },
    "Gemini": { "prediction": "2-3 sentence prediction", "theme": "one word theme", "lucky_color": "color name" },
    "Cancer": { "prediction": "2-3 sentence prediction", "theme": "one word theme", "lucky_color": "color name" },
    "Leo": { "prediction": "2-3 sentence prediction", "theme": "one word theme", "lucky_color": "color name" },
    "Virgo": { "prediction": "2-3 sentence prediction", "theme": "one word theme", "lucky_color": "color name" },
    "Libra": { "prediction": "2-3 sentence prediction", "theme": "one word theme", "lucky_color": "color name" },
    "Scorpio": { "prediction": "2-3 sentence prediction", "theme": "one word theme", "lucky_color": "color name" },
    "Sagittarius": { "prediction": "2-3 sentence prediction", "theme": "one word theme", "lucky_color": "color name" },
    "Capricorn": { "prediction": "2-3 sentence prediction", "theme": "one word theme", "lucky_color": "color name" },
    "Aquarius": { "prediction": "2-3 sentence prediction", "theme": "one word theme", "lucky_color": "color name" },
    "Pisces": { "prediction": "2-3 sentence prediction", "theme": "one word theme", "lucky_color": "color name" }
  }
}`;

  const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt,
    add_context_from_internet: true,
    model: 'gemini_3_flash',
    response_json_schema: {
      type: 'object',
      properties: {
        date: { type: 'string' },
        title: { type: 'string' },
        message: { type: 'string' },
        affirmation: { type: 'string' },
        focus_area: { type: 'string' },
        zodiac_predictions: { type: 'object' }
      }
    }
  });

  console.log('LLM response received:', JSON.stringify(result).slice(0, 200));

  // Store in DailyGuidance — flatten zodiac into the message field as structured text
  const zodiacText = ZODIAC_SIGNS.map(sign => {
    const p = result.zodiac_predictions?.[sign];
    if (!p) return '';
    return `♦ ${sign} (Theme: ${p.theme} | Lucky Color: ${p.lucky_color}): ${p.prediction}`;
  }).join('\n\n');

  const record = {
    date: today,
    title: result.title || `Daily Cosmic Guidance — ${today}`,
    message: result.message + '\n\n═══ ZODIAC PREDICTIONS ═══\n\n' + zodiacText,
    affirmation: result.affirmation || 'I am aligned with the cosmic flow.',
    focus_area: result.focus_area || 'Spiritual Alignment'
  };

  const created = await base44.asServiceRole.entities.DailyGuidance.create(record);
  console.log('Created DailyGuidance record:', created.id);

  return Response.json({ success: true, date: today, id: created.id });
});