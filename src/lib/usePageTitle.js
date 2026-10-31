import { useEffect } from 'react';

const BASE = 'THIRDOT Creative';

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `${BASE} | Content, podcasts & studios`;
  }, [title]);
}
