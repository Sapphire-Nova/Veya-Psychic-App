import { useEffect, useRef } from 'react';

/**
 * Saves and restores window scroll position for a given page key.
 * Call this at the top of each page component, or let the Layout handle it.
 */
export default function useScrollRestore(pageKey) {
  const saved = useRef(null);

  useEffect(() => {
    // Restore saved scroll position for this page
    const stored = sessionStorage.getItem(`scroll:${pageKey}`);
    if (stored) {
      const y = parseInt(stored, 10);
      // Small delay to let the page render first
      const id = setTimeout(() => window.scrollTo({ top: y, behavior: 'instant' }), 60);
      return () => clearTimeout(id);
    }
  }, [pageKey]);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(`scroll:${pageKey}`, String(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageKey]);
}