import { useEffect, useRef } from 'react';

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Adds `is-in` to the element the first time it scrolls into view, which
// starts its CSS entrance (.reveal, .rule, ...).
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (!('IntersectionObserver' in window)) {
      element.classList.add('is-in');
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-in');
        observer.disconnect();
      }
    }, { rootMargin: '0px 0px -10% 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return ref;
}
