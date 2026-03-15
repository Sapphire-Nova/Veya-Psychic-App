import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { action } = body; // action: 'start' | 'stop'

    if (!action || !['start', 'stop'].includes(action)) {
      return Response.json({ error: 'Invalid action. Use start or stop.' }, { status: 400 });
    }

    const guideStatuses = await base44.asServiceRole.entities.GuideStatus.list();

    if (action === 'start') {
      if (guideStatuses.length > 0) {
        await base44.asServiceRole.entities.GuideStatus.update(guideStatuses[0].id, {
          status: 'available',
          last_seen: new Date().toISOString()
        });
      } else {
        await base44.asServiceRole.entities.GuideStatus.create({
          guide_name: 'Veya',
          guide_email: user.email,
          specialty: 'psychic',
          status: 'available',
          last_seen: new Date().toISOString()
        });
      }

      // Notify active members via email
      const members = await base44.asServiceRole.entities.Membership.filter({ is_active: true });
      console.log(`Going LIVE — notifying ${members.length} members`);
      let sent = 0;
      for (const member of members) {
        if (!member.email) continue;
        try {
          await base44.asServiceRole.integrations.Core.SendEmail({
            to: member.email,
            from_name: 'Veya',
            subject: '🔴 Veya is Live Now!',
            body: `Hi ${member.name || 'dear Seeker'},\n\nYour guide Veya is LIVE right now and available for personal guidance.\n\nOpen the app to connect while the session is active.\n\nWith love and light,\nVeya`
          });
          sent++;
        } catch (err) {
          console.error(`Email failed for ${member.email}:`, err.message);
        }
      }

      console.log(`Notified ${sent}/${members.length} members`);
      return Response.json({ status: 'live', notified: sent, total: members.length });

    } else {
      // stop
      if (guideStatuses.length > 0) {
        await base44.asServiceRole.entities.GuideStatus.update(guideStatuses[0].id, {
          status: 'offline',
          last_seen: new Date().toISOString()
        });
      }
      console.log('Guide went offline');
      return Response.json({ status: 'offline' });
    }

  } catch (error) {
    console.error('goLive error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});