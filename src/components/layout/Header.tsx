import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage, Language } from '../../context/LanguageContext';
import { SbgLogo } from '../common/SbgLogo';
import { Globe, Menu, X, ArrowUpRight, ChevronRight, ChevronDown } from 'lucide-react';
import { NAV_MENU_DATA, NavMenuSection } from '../../data/navMenu';
import { MegaMenu } from './MegaMenu';

export const Header: React.FC = () => {
  const { lang, setLang, toggleLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMenuId(null);
  }, [location]);

  // Handle outside click to close mega menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setActiveMenuId(id);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 200);
  };

  // Header background logic
  const headerBgClass = isScrolled || !isHomePage
    ? 'bg-white/95 backdrop-blur-md shadow-sm text-[#2B2B2B] border-b border-[#E2E8E4]'
    : 'bg-gradient-to-b from-[#06301A]/95 via-[#06301A]/80 to-transparent text-white';

  const navLinkClass = (section: NavMenuSection) => {
    const isCurrentRoute = location.pathname.startsWith(section.path);
    const isOpen = activeMenuId === section.id;

    if (isScrolled || !isHomePage) {
      if (isOpen || isCurrentRoute) {
        return 'text-[#0E5C2E] font-bold border-b-2 border-[#1E9B4C] bg-[#F6F8F7]';
      }
      return 'text-[#333333] hover:text-[#0E5C2E] hover:bg-[#F6F8F7] transition-colors';
    } else {
      if (isOpen || isCurrentRoute) {
        return 'text-white font-bold border-b-2 border-[#1E9B4C] bg-white/10';
      }
      return 'text-white/90 hover:text-white hover:bg-white/10 transition-colors';
    }
  };

  return (
    <header 
      ref={navRef}
      onMouseLeave={handleMouseLeave}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between relative">
        
        {/* Zone 1: Logo Lockup */}
        <Link 
          to="/" 
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
          className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0" 
          aria-label="Sharabangla Group Homepage"
        >
          <SbgLogo 
            variant="inline"
            size="md"
            isDarkBg={!isScrolled && isHomePage}
            showTagline={true}
          />
        </Link>

        {/* Zone 2: Desktop Navigation Links with Mega Menu Triggers */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 ml-4 xl:ml-6 2xl:ml-10 mr-auto text-sm font-medium">
          {NAV_MENU_DATA.map((section) => {
            const hasSubmenu = section.columns && section.columns.length > 0;
            const currentLabel = section.defaultLabel[lang] || section.defaultLabel.en;
            return (
              <div
                key={section.id}
                className="relative shrink-0"
                onMouseEnter={() => hasSubmenu && handleMouseEnter(section.id)}
              >
                <Link
                  to={section.path}
                  className={`py-1.5 2xl:py-2 px-1.5 xl:px-2 2xl:px-2.5 rounded-t-md text-[12.5px] 2xl:text-[13.5px] whitespace-nowrap flex items-center gap-1 transition-all cursor-pointer ${navLinkClass(
                    section
                  )}`}
                  aria-expanded={hasSubmenu ? activeMenuId === section.id : undefined}
                  aria-haspopup={hasSubmenu ? "true" : undefined}
                >
                  <span className="whitespace-nowrap">{t(section.labelKey) || currentLabel}</span>
                  {hasSubmenu && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        activeMenuId === section.id ? 'rotate-180 text-[#1E9B4C]' : 'opacity-70'
                      }`}
                    />
                  )}
                </Link>

                {hasSubmenu && activeMenuId === section.id && (
                  <MegaMenu
                    section={section}
                    isOpen={true}
                    onClose={() => setActiveMenuId(null)}
                    isScrolled={isScrolled}
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Zone 3: Right Actions: 3-Option Lang Switcher + Partner Button */}
        <div className="hidden xl:flex items-center space-x-2.5 2xl:space-x-3 shrink-0">
          
          {/* 3-Language Toggle Pill */}
          <div
            className={`flex items-center p-0.5 rounded-full border text-xs font-semibold transition-all ${
              isScrolled || !isHomePage
                ? 'border-[#E2E8E4] bg-[#F6F8F7] text-[#2B2B2B]'
                : 'border-white/20 bg-white/10 text-white'
            }`}
            role="group"
            aria-label="Language selection"
          >
            <div className="flex items-center pl-2 pr-0.5 text-[#1E9B4C]">
              <Globe className="w-3.5 h-3.5" />
            </div>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 2xl:px-2.5 2xl:py-1 rounded-full text-[11px] 2xl:text-xs font-semibold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#1E9B4C] text-white font-bold shadow-xs'
                  : 'hover:text-[#1E9B4C] opacity-80 hover:opacity-100'
              }`}
              aria-label="Switch to English"
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('zh')}
              className={`px-2 py-0.5 2xl:px-2.5 2xl:py-1 rounded-full text-[11px] 2xl:text-xs font-semibold font-chinese transition-all cursor-pointer ${
                lang === 'zh'
                  ? 'bg-[#1E9B4C] text-white font-bold shadow-xs'
                  : 'hover:text-[#1E9B4C] opacity-80 hover:opacity-100'
              }`}
              aria-label="切换至中文 (Switch to Chinese)"
              title="简体中文"
            >
              中文
            </button>
            <button
              type="button"
              onClick={() => setLang('bn')}
              className={`px-2 py-0.5 2xl:px-2.5 2xl:py-1 rounded-full text-[11px] 2xl:text-xs font-semibold font-bangla transition-all cursor-pointer ${
                lang === 'bn'
                  ? 'bg-[#1E9B4C] text-white font-bold shadow-xs'
                  : 'hover:text-[#1E9B4C] opacity-80 hover:opacity-100'
              }`}
              aria-label="বাংলা নির্বাচন করুন (Switch to Bangla)"
              title="বাংলা"
            >
              বাংলা
            </button>
          </div>

          {/* Green Primary Partner With Us CTA with red bottom border reveal */}
          <Link
            to="/partner"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 text-[11px] 2xl:text-xs font-bold uppercase tracking-wider text-white bg-[#1E9B4C] hover:bg-[#0E5C2E] border-b-2 border-transparent hover:border-[#E1232B] rounded-md transition-all duration-200 shadow-xs"
          >
            <span>{t('nav.partner')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile & Tablet Hamburger & Quick Lang Toggle */}
        <div className="flex xl:hidden items-center space-x-2">
          {/* Quick Partner link on Tablet */}
          <Link
            to="/partner"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase text-white bg-[#1E9B4C] hover:bg-[#0E5C2E] rounded-md transition-all shadow-xs"
          >
            <span>{t('nav.partner')}</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          {/* Quick cycle button on mobile header */}
          <button
            onClick={toggleLang}
            className={`px-2.5 py-1 rounded text-xs font-bold border flex items-center gap-1 cursor-pointer ${
              isScrolled || !isHomePage
                ? 'border-[#E2E8E4] text-[#2B2B2B] bg-gray-50'
                : 'border-white/30 text-white bg-white/10'
            }`}
            aria-label="Toggle Language"
          >
            <Globe className="w-3 h-3 text-[#1E9B4C]" />
            <span className={lang === 'bn' ? 'font-bangla' : (lang === 'zh' ? 'font-chinese' : '')}>
              {lang === 'en' ? 'EN' : (lang === 'zh' ? '中文' : 'বাংলা')}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-md cursor-pointer ${
              isScrolled || !isHomePage ? 'text-[#2B2B2B]' : 'text-white'
            }`}
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Accordion Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-[#06301A]/98 backdrop-blur-xl text-white border-t border-white/10 shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-top-4 duration-300">
          <div className="px-4 sm:px-6 pt-5 pb-12 space-y-4 max-w-lg mx-auto">
            
            {/* Mobile 3-Language Selector Bar with crisp touch tabs */}
            <div className="p-1 rounded-xl bg-white/10 border border-white/15 mb-4 shadow-inner">
              <div className="grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all min-h-[40px] flex items-center justify-center cursor-pointer ${
                    lang === 'en' 
                      ? 'bg-[#1E9B4C] text-white shadow-md' 
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang('zh')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold font-chinese transition-all min-h-[40px] flex items-center justify-center cursor-pointer ${
                    lang === 'zh' 
                      ? 'bg-[#1E9B4C] text-white shadow-md' 
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  简体中文
                </button>
                <button
                  type="button"
                  onClick={() => setLang('bn')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold font-bangla transition-all min-h-[40px] flex items-center justify-center cursor-pointer ${
                    lang === 'bn' 
                      ? 'bg-[#1E9B4C] text-white shadow-md' 
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  বাংলা
                </button>
              </div>
            </div>

            {NAV_MENU_DATA.map((section) => {
              const isExpanded = mobileExpandedId === section.id;
              const hasSubmenu = section.columns && section.columns.length > 0;
              const currentLabel = section.defaultLabel[lang] || section.defaultLabel.en;
              return (
                <div key={section.id} className="border-b border-white/10 pb-1">
                  <div className="flex items-center justify-between py-2.5 px-2">
                    <Link
                      to={section.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-bold text-white hover:text-[#C8A24A] transition-colors py-1 flex-1"
                    >
                      {t(section.labelKey) || currentLabel}
                    </Link>
                    {hasSubmenu && (
                      <button
                        onClick={() =>
                          setMobileExpandedId(isExpanded ? null : section.id)
                        }
                        className="p-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                        aria-label={`Toggle ${currentLabel} submenu`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 text-[#1E9B4C] transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-white' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Accordion Content */}
                  {hasSubmenu && isExpanded && (
                    <div className="pl-4 pr-3 py-3 space-y-4 bg-black/25 rounded-xl my-2 border border-white/5">
                      {(section.columns || []).map((col, colIdx) => (
                        <div key={colIdx} className="space-y-2">
                          <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#C8A24A] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1E9B4C]" />
                            {col.title[lang] || col.title.en}
                          </h4>
                          <div className="space-y-1 pl-2">
                            {(col.items || []).map((item, itemIdx) => (
                              <Link
                                key={itemIdx}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="py-2 px-2 rounded-md text-xs sm:text-sm text-white/90 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors min-h-[38px]"
                              >
                                <span>{item.name[lang] || item.name.en}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quick Action Grid in Mobile Menu */}
            <div className="pt-4 grid grid-cols-2 gap-3">
              <Link
                to="/careers"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs tracking-wide uppercase border border-white/15 transition-all flex items-center justify-center min-h-[46px]"
              >
                {lang === 'bn' ? 'ক্যারিয়ার' : (lang === 'zh' ? '人才招聘' : 'Careers')}
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs tracking-wide uppercase border border-white/15 transition-all flex items-center justify-center min-h-[46px]"
              >
                {lang === 'bn' ? 'যোগাযোগ' : (lang === 'zh' ? '联系我们' : 'Contact')}
              </Link>
            </div>

            <div className="pt-1">
              <Link
                to="/partner"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 px-4 rounded-xl bg-[#1E9B4C] hover:bg-[#0E5C2E] text-white font-bold text-sm tracking-wider uppercase shadow-xl border-b-2 border-[#E1232B] flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.98] transition-all"
              >
                <span>{t('nav.partner')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

