import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const { sessionTitle, sessionId } = await req.json();

  // Get all active members
  const members = await base44.asServiceRole.entities.Membership.filter({ is_active: true });
  console.log(`Found ${members.length} active members to notify`);

  const notificationMessage = '✨ Violet is now Live! ✨ Join the session now in the Veya app for real-time interaction.';

  let sent = 0;
  for (const member of members) {
    if (!member.email) continue;
    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: member.email,
        from_name: 'Psychic Violet',
        subject: '✨ Violet is now Live! ✨',
        body: `Hello ${member.name || 'Dear Seeker'},

${notificationMessage}

${sessionTitle ? `Session: ${sessionTitle}` : ''}

Tap below to join now and experience real-time spiritual guidance.

With love and light,
Psychic Violet`.trim()
      });
      sent++;
    } catch (err) {
      console.error(`Failed to email ${member.email}:`, err.message);
    }
  }

  console.log(`Sent notifications to ${sent} of ${members.length} members`);
  return Response.json({ sent, total: members.length });
});