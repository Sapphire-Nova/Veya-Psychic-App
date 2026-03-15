import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const { title, script, voice_id, category, duration_minutes, thumbnail_url } = await req.json();

    if (!script || !title) {
      return Response.json({ error: 'title and script are required' }, { status: 400 });
    }

    // Default to Violet's voice if not specified
    const resolvedVoiceId = voice_id || '6iD569uZoE7fO2eJBvn1';

    console.log(`Generating TTS for: "${title}" with voice ${resolvedVoiceId}`);

    // Call ElevenLabs TTS
    const ttsRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${resolvedVoiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text: script,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.6, similarity_boost: 0.8, style: 0.4, use_speaker_boost: true }
      })
    });

    if (!ttsRes.ok) {
      const errText = await ttsRes.text();
      console.error('ElevenLabs error:', errText);
      return Response.json({ error: `ElevenLabs error: ${errText}` }, { status: 500 });
    }

    const audioBuffer = await ttsRes.arrayBuffer();
    console.log(`Audio generated: ${audioBuffer.byteLength} bytes`);

    // Upload audio to Base44 storage
    const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
    const formData = new FormData();
    formData.append('file', blob, `${title.toLowerCase().replace(/\s+/g, '-')}.mp3`);

    const uploadRes = await base44.asServiceRole.integrations.Core.UploadFile({ file: blob });
    const audioUrl = uploadRes.file_url;

    console.log(`Audio uploaded: ${audioUrl}`);

    // Save to Meditation entity
    const meditation = await base44.asServiceRole.entities.Meditation.create({
      title,
      description: script.substring(0, 200) + (script.length > 200 ? '...' : ''),
      category: category || 'guided_journeys',
      duration_minutes: duration_minutes || Math.ceil(script.split(' ').length / 130),
      audio_url: audioUrl,
      thumbnail_url: thumbnail_url || '',
      is_featured: false,
      play_count: 0
    });

    console.log(`Meditation saved: ${meditation.id}`);
    return Response.json({ success: true, meditation });

  } catch (error) {
    console.error('generateMeditation error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});