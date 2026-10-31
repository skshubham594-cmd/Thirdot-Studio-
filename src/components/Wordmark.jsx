import { useId } from 'react';

// Full-width THIRDOT wordmark plus the three brand dots, drawn as SVG so it
// always spans its container exactly. `tone`: 'mint' (hero gradient) or 'ink'.
export default function Wordmark({ tone = 'ink', className = '' }) {
  const gradientId = useId();
  const fill = tone === 'mint' ? `url(#${gradientId})` : 'currentColor';
  return (
    <svg className={`wordmark ${className}`.trim()} viewBox="0 0 1000 172" role="img" aria-label="THIRDOT">
      {tone === 'mint' && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5ff2e0" />
            <stop offset="0.55" stopColor="#c9fbf4" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      )}
      <text x="-6" y="168" textLength="880" lengthAdjust="spacingAndGlyphs" fill={fill}>THIRDOT</text>
      <circle cx="906" cy="152" r="16" fill={fill} />
      <circle cx="947" cy="152" r="16" fill={fill} />
      <circle cx="985" cy="130" r="16" fill={fill} />
    </svg>
  );
}
