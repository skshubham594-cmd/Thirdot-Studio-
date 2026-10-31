// A row of items drifting left in an endless loop. The items render twice
// and the track slides by exactly one copy, so the loop has no visible
// seam; the second copy is hidden from assistive tech (renderItem gets
// `hidden` so it can keep that copy out of keyboard focus too).
// Hover pauses it, reduced motion stops it and leaves the row scrollable.
// `renderItem(item, hidden)` draws one item; `seconds` sets one full pass.
export default function Marquee({ items, getKey, renderItem, seconds = 40, className = '' }) {
  return (
    <div className={`marquee ${className}`.trim()} style={{ '--marquee-duration': `${seconds}s` }}>
      <div className="marquee__track">
        {[false, true].map((hidden) => (
          <ul key={String(hidden)} className="marquee__set" aria-hidden={hidden ? 'true' : undefined}>
            {items.map((item) => <li key={getKey(item)} className="marquee__item">{renderItem(item, hidden)}</li>)}
          </ul>
        ))}
      </div>
    </div>
  );
}
