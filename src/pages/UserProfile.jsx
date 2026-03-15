import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import {
  User, Sparkles, Moon, Star, Edit3, Save, X, Bell, Shield,
  BookOpen, Heart, Calendar, Crown, LogOut, Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import PurchaseCreditsModal from '@/components/credits/PurchaseCreditsModal';
import DeleteAccountDialog from '@/components/profile/DeleteAccountDialog';

const FOCUS_OPTIONS = [
  { value: 'healing', label: 'Healing', emoji: '✨' },
  { value: 'love', label: 'Love', emoji: '💕' },
  { value: 'career', label: 'Career', emoji: '🌟' },
  { value: 'spiritual_growth', label: 'Spiritual Growth', emoji: '🌙' },
  { value: 'protection', label: 'Protection', emoji: '🛡️' },
  { value: 'general', label: 'General', emoji: '☯️' },
];

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [membership, setMembership] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const u = await base44.auth.me();
      setUser(u);

      const profiles = await base44.entities.UserProfile.filter({ email: u.email });
      let p = profiles[0];
      if (!p) {
        p = await base44.entities.UserProfile.create({
          email: u.email,
          display_name: u.full_name || '',
          coin_balance: 0,
          is_new_member: true,
        });
      }
      setProfile(p);
      setEditForm({
        display_name: p.display_name || u.full_name || '',
        bio: p.bio || '',
        spiritual_focus: p.spiritual_focus || 'general',
      });

      const memberships = await base44.entities.Membership.filter({ email: u.email, is_active: true });
      setMembership(memberships[0] || null);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const updated = await base44.entities.UserProfile.update(profile.id, editForm);
    setProfile(updated);
    setEditing(false);
    setSaving(false);
  };

  const handleNotificationToggle = async (key) => {
    const updated = await base44.entities.UserProfile.update(profile.id, {
      [key]: !profile[key],
    });
    setProfile(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-400/40 border-t-amber-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-center px-4">
        <div>
          <Moon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <p className="text-purple-200/60 mb-4">Please sign in to view your profile.</p>
          <Button onClick={() => base44.auth.redirectToLogin()} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  const tierColor = {
    seeker: 'from-slate-500 to-slate-600',
    initiate: 'from-purple-500 to-violet-600',
    devotee: 'from-amber-500 to-orange-500',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero banner */}
      <div className="bg-gradient-to-b from-violet-950/60 via-slate-950/80 to-slate-950 pt-8 pb-6 px-4">
        <div className="max-w-xl mx-auto text-center">
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-amber-400 flex items-center justify-center text-3xl font-light shadow-xl shadow-purple-900/40">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>{(profile?.display_name || user?.full_name || '?')[0].toUpperCase()}</span>
              )}
            </div>
          </div>

          {editing ? (
            <div className="space-y-3 text-left max-w-sm mx-auto">
              <Input
                value={editForm.display_name}
                onChange={e => setEditForm(f => ({ ...f, display_name: e.target.value }))}
                placeholder="Display name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
              <Textarea
                value={editForm.bio}
                onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))}
                placeholder="A little about your spiritual journey…"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none h-20"
              />
              <div>
                <p className="text-purple-200/60 text-xs mb-2">Spiritual Focus</p>
                <div className="grid grid-cols-3 gap-2">
                  {FOCUS_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setEditForm(f => ({ ...f, spiritual_focus: opt.value }))}
                      className={`py-2 px-3 rounded-xl text-xs border transition-all ${
                        editForm.spiritual_focus === opt.value
                          ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                          : 'bg-white/5 border-white/10 text-purple-200/60 hover:bg-white/10'
                      }`}
                    >
                      {opt.emoji} {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <Button onClick={handleSave} disabled={saving} size="sm" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white">
                  <Save className="w-4 h-4 mr-1" /> {saving ? 'Saving…' : 'Save'}
                </Button>
                <Button onClick={() => setEditing(false)} variant="ghost" size="sm" className="text-purple-200/60 hover:text-white">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-light text-white mb-1">{profile?.display_name || user?.full_name}</h1>
              <p className="text-purple-200/50 text-sm mb-2">{user?.email}</p>
              {profile?.bio && <p className="text-purple-200/70 text-sm max-w-xs mx-auto mb-3">{profile.bio}</p>}
              <div className="flex items-center justify-center gap-2 mb-4">
                {profile?.spiritual_focus && (
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {FOCUS_OPTIONS.find(f => f.value === profile.spiritual_focus)?.emoji}{' '}
                    {FOCUS_OPTIONS.find(f => f.value === profile.spiritual_focus)?.label}
                  </Badge>
                )}
                {membership && (
                  <Badge className={`bg-gradient-to-r ${tierColor[membership.tier] || tierColor.seeker} text-white border-0`}>
                    <Crown className="w-3 h-3 mr-1" />
                    {membership.tier.charAt(0).toUpperCase() + membership.tier.slice(1)}
                  </Badge>
                )}
              </div>
              <Button
                onClick={() => setEditing(true)}
                variant="ghost"
                size="sm"
                className="text-purple-200/60 hover:text-white border border-white/10 hover:bg-white/10"
              >
                <Edit3 className="w-4 h-4 mr-1" /> Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pb-32 space-y-4">

        {/* Luna Credits */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-amber-500/15 to-orange-500/10 border border-amber-500/20 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-amber-200/60 text-xs">Luna Credits</p>
                <p className="text-white text-2xl font-light">{(profile?.coin_balance || 0).toLocaleString()}</p>
              </div>
            </div>
            <Button
              onClick={() => setShowCreditsModal(true)}
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
            >
              Add Credits
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <BookOpen className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <p className="text-white text-xl font-light">{profile?.readings_completed || 0}</p>
            <p className="text-purple-200/50 text-xs">Readings</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <Star className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <p className="text-white text-xl font-light">{profile?.sessions_attended || 0}</p>
            <p className="text-purple-200/50 text-xs">Sessions</p>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-purple-400" />
            <h3 className="text-white font-medium text-sm">Notifications</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Email Notifications</p>
              <p className="text-purple-200/40 text-xs">Booking confirmations & updates</p>
            </div>
            <Switch
              checked={profile?.notification_emails ?? true}
              onCheckedChange={() => handleNotificationToggle('notification_emails')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Notify When Live</p>
              <p className="text-purple-200/40 text-xs">When guide goes live</p>
            </div>
            <Switch
              checked={profile?.notify_when_live ?? false}
              onCheckedChange={() => handleNotificationToggle('notify_when_live')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Daily Guidance</p>
              <p className="text-purple-200/40 text-xs">Morning spiritual reminders</p>
            </div>
            <Switch
              checked={profile?.notify_daily_guidance ?? false}
              onCheckedChange={() => handleNotificationToggle('notify_daily_guidance')}
            />
          </div>
        </motion.div>

        {/* Account */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2"
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-purple-400" />
            <h3 className="text-white font-medium text-sm">Account</h3>
          </div>
          <Button
            onClick={() => base44.auth.logout('/')}
            variant="ghost"
            className="w-full border border-white/10 text-purple-200/70 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
          <DeleteAccountDialog userProfile={profile} />
        </motion.div>

      </div>

      <PurchaseCreditsModal
        isOpen={showCreditsModal}
        onClose={() => setShowCreditsModal(false)}
        userEmail={user?.email}
        userName={user?.full_name}
      />
    </div>
  );
}