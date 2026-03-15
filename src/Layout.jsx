import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { 
  Home, 
  Sparkles, 
  Leaf, 
  Star, 
  Sun, 
  Gem, 
  Layers,
  User,
  Mail,
  Menu,
  X,
  ChevronDown,
  Video,
  Shield,
  Crown,
  Moon,
  MessageCircle,
  Radio,
  ChevronLeft,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppSettingsDropdown from '@/components/admin/AppSettingsDropdown';

// Top-level pages (show logo). Everything else shows Back button on mobile.
const TOP_LEVEL_PAGES = ['Home', 'Services', 'Community', 'UserProfile', 'DailyGuidance', 'Sanctuary', 'Chakras', 'MyJourney'];

const bottomNavItems = [
  { name: 'Home', page: 'Home', icon: Home },
  { name: 'Journey', page: 'MyJourney', icon: Sparkles },
  { name: 'Services', page: 'Services', icon: Sparkles },
  { name: 'Community', page: 'Community', icon: MessageCircle },
  { name: 'Learn', page: 'Chakras', icon: Gem },
  { name: 'Sanctuary', page: 'Sanctuary', icon: Crown },
  { name: 'Profile', page: 'UserProfile', icon: User },
];

const navItems = [
  { name: 'Home', page: 'Home', icon: Home },
  { name: 'Daily Guidance', page: 'DailyGuidance', icon: Sun },
  { name: 'Book a Reading', page: 'Services', icon: Sparkles, highlight: true },
  { 
    name: 'Tools', 
    icon: Sparkles,
    children: [
      { name: 'Chakra Check-In', page: 'ChakraCheckIn', icon: Sparkles },
      { name: 'Soul Path Quiz', page: 'SoulPathQuiz', icon: Star },
      { name: 'Intention Builder', page: 'IntentionBuilder', icon: Sun },
      { name: 'Ask the Priestess', page: 'AskPriestess', icon: Mail },
      { name: 'Journey Tracker', page: 'JourneyTracker', icon: Layers },
    ]
  },
  { 
    name: 'Learn', 
    icon: Gem,
    children: [
      { name: 'Chakras', page: 'Chakras', icon: Sparkles },
      { name: 'Crystals', page: 'Crystals', icon: Gem },
      { name: 'Tarot', page: 'Tarot', icon: Layers },
      { name: 'Herbs & Plants', page: 'Herbs', icon: Leaf },
      { name: 'Protection Guides', page: 'ProtectionGuides', icon: Star },
      { name: 'Astrology', page: 'Astrology', icon: Star },
    ]
  },
  { name: 'Services', page: 'Services', icon: Sparkles },
  { name: 'Meditations', page: 'Meditations', icon: Video },
  { name: 'Full Moon Circle', page: 'FullMoonCircle', icon: Moon },
  { name: 'Live Events', page: 'LiveSessions', icon: Video },
  { name: 'Sanctuary & Credits', page: 'Sanctuary', icon: Crown },
  { name: 'Community', page: 'Community', icon: Crown },
  { name: 'Messages', page: 'Messages', icon: MessageCircle },
  { name: '🌙 Ask Veya', page: 'VioletGuide', icon: Moon },
  { name: 'My Journey', page: 'MyJourney', icon: Sparkles },
  { name: 'My Profile', page: 'UserProfile', icon: User },
  { name: '⚡ Admin Live', page: 'AdminLive', icon: Radio },
  { name: '🛡️ Admin Dashboard', page: 'AdminDashboard', icon: Shield },
];

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Poll guide live status + check admin
  useEffect(() => {
    const checkLive = () => {
      base44.entities.GuideStatus.list().then(statuses => {
        setIsLive(statuses.length > 0 && statuses[0].status === 'available');
      }).catch(() => {});
    };
    checkLive();
    const interval = setInterval(checkLive, 20000);
    // Check if current user is admin
    base44.auth.me().then(u => { if (u?.role === 'admin') setIsAdmin(true); }).catch(() => {});
    return () => clearInterval(interval);
  }, []);

  const isTopLevel = TOP_LEVEL_PAGES.includes(currentPageName);

  // Save scroll position when leaving bottom nav tabs; restore when returning
  const BOTTOM_NAV_PAGES = ['Home', 'DailyGuidance', 'Services', 'Community', 'Chakras', 'Sanctuary', 'UserProfile'];

  const scrollPositions = useRef({});
  useEffect(() => {
    const handleScroll = () => {
      if (BOTTOM_NAV_PAGES.includes(currentPageName)) {
        scrollPositions.current[currentPageName] = window.scrollY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPageName]);

  useEffect(() => {
    if (BOTTOM_NAV_PAGES.includes(currentPageName)) {
      const saved = scrollPositions.current[currentPageName] ?? 0;
      const id = setTimeout(() => window.scrollTo({ top: saved, behavior: 'instant' }), 80);
      return () => clearTimeout(id);
    }
  }, [currentPageName]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [currentPageName]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Mobile: Back button on sub-pages, Logo on top-level */}
            <div className="flex items-center">
              {/* Back button — mobile only, sub-pages only */}
              {!isTopLevel && (
                <button
                  onClick={() => navigate(-1)}
                  className="md:hidden flex items-center gap-1 text-purple-200/80 hover:text-white transition-colors mr-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-sm">Back</span>
                </button>
              )}

              {/* Logo — always on desktop, on mobile only for top-level */}
              <Link
                to={createPageUrl('Home')}
                className={`flex items-center gap-2 ${!isTopLevel ? 'hidden md:flex' : 'flex'}`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-light text-white hidden sm:block">Veya</span>
              </Link>

              {/* Sub-page title on mobile */}
              {!isTopLevel && (
                <span className="md:hidden text-white font-medium text-base truncate max-w-[180px]">
                  {navItems.find(n => n.page === currentPageName)?.name ||
                   navItems.flatMap(n => n.children || []).find(n => n.page === currentPageName)?.name ||
                   currentPageName}
                </span>
              )}
            </div>

            {/* Live Now badge — desktop */}
            {isLive && (
              <Link to={createPageUrl('LiveSessions')} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white animate-pulse"
                style={{ background: 'rgba(239,68,68,0.25)', border: '1px solid rgba(239,68,68,0.5)' }}>
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                Connect with Violet Now!
              </Link>
            )}

            {/* App Settings — admin only, desktop */}
            {isAdmin && (
              <div className="hidden md:block">
                <AppSettingsDropdown />
              </div>
            )}

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                item.children ? (
                  <div key={item.name} className="relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className="flex items-center gap-1 px-4 py-2 text-purple-100/80 hover:text-white transition-colors"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.page}
                              to={createPageUrl(child.page)}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center gap-3 px-4 py-3 text-purple-100/80 hover:bg-white/10 hover:text-white transition-colors"
                            >
                              <child.icon className="w-4 h-4" />
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      item.highlight
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                        : currentPageName === item.page
                        ? 'text-white bg-white/10'
                        : 'text-purple-100/80 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>

            {/* Live Now badge — mobile */}
            {isLive && (
              <Link to={createPageUrl('LiveSessions')} className="md:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                style={{ background: 'rgba(239,68,68,0.25)', border: '1px solid rgba(239,68,68,0.5)' }}>
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                Connect with Violet!
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-1">
                {/* App Settings toggle — admin only, mobile */}
                {isAdmin && (
                  <div className="px-2 pb-3 mb-1 border-b border-white/10">
                    <AppSettingsDropdown />
                  </div>
                )}
                {navItems.map((item) => (
                  item.children ? (
                    <div key={item.name}>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className="w-full flex items-center justify-between px-4 py-3 text-purple-100/80"
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          {item.name}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-8 space-y-1"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.page}
                                to={createPageUrl(child.page)}
                                className="flex items-center gap-3 px-4 py-3 text-purple-100/60 hover:text-white"
                              >
                                <child.icon className="w-4 h-4" />
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        item.highlight
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                          : currentPageName === item.page
                          ? 'text-white bg-white/10'
                          : 'text-purple-100/80'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content — extra bottom padding on mobile for bottom nav */}
      <main className="pt-16 md:pt-20 pb-20 md:pb-0 overflow-x-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPageName}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer — desktop only */}
      <footer className="hidden md:block bg-slate-950 border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-light text-white">Spiritual Guide</span>
              </div>
              <p className="text-purple-200/60 text-sm max-w-sm">
                Your trusted spiritual advisor offering psychic readings, tarot consultations, 
                and spiritual guidance to illuminate your path.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to={createPageUrl('BookReading')} className="block text-purple-200/60 hover:text-white text-sm transition-colors">Book a Reading</Link>
                <Link to={createPageUrl('DailyGuidance')} className="block text-purple-200/60 hover:text-white text-sm transition-colors">Daily Guidance</Link>
                <Link to={createPageUrl('Sanctuary')} className="block text-purple-200/60 hover:text-white text-sm transition-colors">Membership</Link>
                <Link to={createPageUrl('About')} className="block text-purple-200/60 hover:text-white text-sm transition-colors">About</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Explore</h4>
              <div className="space-y-2">
                <Link to={createPageUrl('ChakraCheckIn')} className="block text-purple-200/60 hover:text-white text-sm transition-colors">Chakra Check-In</Link>
                <Link to={createPageUrl('SoulPathQuiz')} className="block text-purple-200/60 hover:text-white text-sm transition-colors">Soul Path Quiz</Link>
                <Link to={createPageUrl('Meditations')} className="block text-purple-200/60 hover:text-white text-sm transition-colors">Meditations</Link>
                <Link to={createPageUrl('ProtectionGuides')} className="block text-purple-200/60 hover:text-white text-sm transition-colors">Protection Guides</Link>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-purple-200/40 text-sm">
              © {new Date().getFullYear()} Spiritual Guide. All readings are for entertainment and spiritual guidance purposes.
            </p>
          </div>
        </div>
      </footer>

      {/* ── Mobile Bottom Navigation Bar ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-t border-white/10"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-stretch">
          {bottomNavItems.map((item) => {
            const active = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-colors ${
                  active ? 'text-amber-400' : 'text-purple-300/50 hover:text-purple-200'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-[9px] font-medium leading-tight">{item.name}</span>
                {active && (
                  <span className="absolute bottom-0 w-6 h-0.5 bg-amber-400 rounded-full" style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }} />
                )}
              </Link>
            );
          })}
        </div>
      </nav>


    </div>
  );
}