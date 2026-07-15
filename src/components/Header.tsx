import React, { useState } from 'react';
import { Menu, X, ShieldAlert, Calculator, BookOpen, Info, MessageCircle, Bot } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  navigateTo: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, navigateTo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '首页', icon: Info },
    { id: 'about', label: '认识PM', icon: BookOpen },
    { id: 'plan', label: '合作计划', icon: ShieldAlert },
    { id: 'simulator', label: '收入试算', icon: Calculator },
    { id: 'qa', label: 'AI问答', icon: Bot },
    { id: 'contact', label: '联系咨询', icon: MessageCircle },
  ];

  const handleNavClick = (pageId: string) => {
    navigateTo(pageId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#12304A] text-white shadow-md border-b border-white/10" id="main-header">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div 
          className="flex cursor-pointer items-center space-x-2" 
          onClick={() => handleNavClick('home')}
          id="header-logo-container"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C5A35A] text-[#12304A] font-bold text-lg shadow-sm">
            PM
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-semibold tracking-tight text-lg leading-tight">PM健康与事业指南</span>
            <span className="font-mono text-[10px] text-white/60">Independent Info Portal</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-1" id="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#C5A35A] text-[#12304A]'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <div className="flex lg:hidden" id="mobile-menu-toggle-container">
          <button
            id="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white/85 hover:bg-white/10 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#12304A] border-t border-white/10" id="mobile-drawer">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex w-full items-center space-x-3 rounded-md px-3 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#C5A35A] text-[#12304A]'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
