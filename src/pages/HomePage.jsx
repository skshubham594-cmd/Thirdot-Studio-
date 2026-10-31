import Hero from '../components/Hero.jsx';
import WorkPreview from '../components/WorkPreview.jsx';
import AboutTeaser from '../components/AboutTeaser.jsx';
import ServiceList from '../components/ServiceList.jsx';
import Brands from '../components/Brands.jsx';
import Process from '../components/Process.jsx';
import CallToAction from '../components/CallToAction.jsx';
import usePageTitle from '../lib/usePageTitle.js';

export default function HomePage() {
  usePageTitle();
  return (
    <>
      <Hero />
      <WorkPreview />
      <AboutTeaser />
      <ServiceList />
      <Brands />
      <Process />
      <CallToAction />
    </>
  );
}
