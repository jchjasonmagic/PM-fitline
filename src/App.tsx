import { useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Page selector
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
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
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-[#263238] selection:bg-[#C5A35A]/35" id="app-wrapper">
      {/* Dynamic Header */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Viewport */}
      <main className="flex-grow" id="main-content-viewport">
        {renderPage()}
      </main>

      {/* Dynamic Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
