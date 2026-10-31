import { useReveal } from '../lib/hooks.js';

// Fades and lifts its content in the first time it scrolls into view.
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={delay ? { '--reveal-delay': `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}
