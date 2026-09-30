import { useEffect } from 'react';
import Works from '../components/Works.jsx';

const TITLE = 'THIRDOT | Stories';

export default function StoriesPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = TITLE;
    return () => { document.title = previous; };
  }, []);

  return <Works page />;
}
