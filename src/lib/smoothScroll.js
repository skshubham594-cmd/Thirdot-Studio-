import Lenis from 'lenis';

// One Lenis instance for the whole site (smooth wheel scrolling). Skipped with
// reduced motion, in which case every helper falls back to native scrolling.
let lenis = null;

export function startSmoothScroll() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
  return () => {
    lenis.destroy();
    lenis = null;
  };
}

export function scrollToTarget(target, { immediate = false } = {}) {
  if (lenis) lenis.scrollTo(target, { immediate, offset: 0 });
  else if (typeof target === 'number') window.scrollTo(0, target);
  else target.scrollIntoView();
}

export function pauseScroll(paused) {
  if (!lenis) return;
  if (paused) lenis.stop();
  else lenis.start();
}
