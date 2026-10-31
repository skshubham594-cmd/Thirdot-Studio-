import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/hooks.js';

const DIM = 0.2;

// Large statement whose words light up from grey to white as it scrolls
// through the viewport. Screen readers get the plain sentence.
export default function ScrollText({ text, as: Tag = 'p', className = '' }) {
  const ref = useRef(null);
  const words = text.split(' ');

  useEffect(() => {
    const element = ref.current;
    const spans = [...element.querySelectorAll('[data-word]')];
    if (prefersReducedMotion()) {
      spans.forEach((span) => { span.style.opacity = 1; });
      return undefined;
    }
    let frame = 0;
    function update() {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 when the block's top reaches 85% of the viewport, 1 when its
      // bottom passes 45%.
      const start = viewport * 0.85;
      const end = viewport * 0.45;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height)));
      const lit = progress * spans.length;
      spans.forEach((span, i) => {
        span.style.opacity = DIM + (1 - DIM) * Math.min(1, Math.max(0, lit - i));
      });
    }
    function request() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };
  }, [text]);

  return (
    <Tag ref={ref} className={`scroll-text ${className}`.trim()} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span data-word style={{ opacity: DIM }}>{word}</span>{i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
