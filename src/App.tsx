import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { AboutPM } from './pages/AboutPM';
import { Products } from './pages/Products';
import { ProductCompare } from './pages/ProductCompare';
import { PlanInfo } from './pages/PlanInfo';
import { Simulator } from './pages/Simulator';
import { FAQ } from './pages/FAQ';
import { Sources } from './pages/Sources';
import { Contact } from './pages/Contact';

export default function App() {
  const getPageFromHash = () => {
    const raw = window.location.hash || '';
    const cleaned = raw.startsWith('#') ? raw.slice(1) : raw;
    const normalized = cleaned.startsWith('/') ? cleaned.slice(1) : cleaned;
    const page = normalized.split('?')[0].split('&')[0].trim();
    return page || 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(() => getPageFromHash());

  const navigateTo = (pageId: string) => {
    const next = pageId === 'home' ? '#/' : `#/${pageId}`;
    if (!window.location.hash || window.location.hash === '#') {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${next}`);
      setCurrentPage(pageId);
      return;
    }
    if (window.location.hash !== next) {
      window.location.hash = next;
      return;
    }
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#') {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#/`);
    }

    const syncFromHash = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  // Page selector
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'about':
        return <AboutPM />;
      case 'products':
        return <Products />;
      case 'compare':
        return <ProductCompare />;
      case 'plan':
        return <PlanInfo />;
      case 'simulator':
        return <Simulator />;
      case 'faq':
        return <FAQ />;
      case 'sources':
        return <Sources />;
      case 'contact':
        return <Contact />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-[#263238] selection:bg-[#C5A35A]/35" id="app-wrapper">
      {/* Dynamic Header */}
      <Header currentPage={currentPage} navigateTo={navigateTo} />

      {/* Main Content Viewport */}
      <main className="flex-grow" id="main-content-viewport">
        {renderPage()}
      </main>

      {/* Dynamic Footer */}
      <Footer navigateTo={navigateTo} />
    </div>
  );
}
