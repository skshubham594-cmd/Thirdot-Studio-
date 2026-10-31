import { useEffect, useRef } from 'react';

// Small white dot that trails the pointer and grows over anything clickable.
// Only on devices with a fine, hovering pointer.
export default function Cursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const dot = dotRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let x = -100, y = -100, currentX = x, currentY = y, frame = 0;

    function tick() {
      currentX += (x - currentX) * (reduce ? 1 : 0.25);
      currentY += (y - currentY) * (reduce ? 1 : 0.25);
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = Math.abs(x - currentX) + Math.abs(y - currentY) > 0.1 ? requestAnimationFrame(tick) : 0;
    }
    function onMove(event) {
      x = event.clientX;
      y = event.clientY;
      dot.classList.add('is-visible');
      dot.classList.toggle('is-link', !!event.target.closest('a, button, summary, [role="button"], input, select, textarea, label'));
      if (!frame) frame = requestAnimationFrame(tick);
    }
    function onLeave() { dot.classList.remove('is-visible'); }
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.documentElement.classList.add('has-cursor');
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return <div ref={dotRef} className="cursor" aria-hidden="true"><span /></div>;
}
