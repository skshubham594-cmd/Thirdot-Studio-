import { useEffect, useRef } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';
import HomePage from './pages/HomePage.jsx';
import WorkPage from './pages/WorkPage.jsx';
import StudioPage from './pages/StudioPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { scrollToTarget, startSmoothScroll } from './lib/smoothScroll.js';

// After in-app navigation, scroll to the linked section (e.g. /#services) or
// to the top of the new page. The first render is left to the browser so a
// refresh keeps its restored scroll position.
function ScrollManager() {
  const { key, hash, pathname } = useLocation();
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) scrollToTarget(target);
    else scrollToTarget(0, { immediate: true });
  }, [key, hash, pathname]);
  return null;
}

export default function App() {
  useEffect(() => startSmoothScroll(), []);
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <Cursor />
      <main id="main">
        <ScrollManager />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/stories" element={<Navigate to="/work" replace />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
