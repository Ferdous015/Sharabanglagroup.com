import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { NavMenuSection } from '../../data/navMenu';
import { companies } from '../../data/site';
import { ChevronRight, ExternalLink } from 'lucide-react';

interface MegaMenuProps {
  section: NavMenuSection;
  isOpen: boolean;
  onClose: () => void;
  isScrolled: boolean;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ section, isOpen, onClose }) => {
  const { lang } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isSimple = section.type === 'simple';

  return (
    <div
      role="menu"
      aria-label={section.defaultLabel[lang] || section.defaultLabel.en}
      className={
        isSimple
          ? 'absolute top-full left-0 mt-1 w-[340px] bg-white text-[#2B2B2B] shadow-2xl border-t-2 border-[#1E9B4C] border border-[#E2E8E4] rounded-b-xl z-50 animate-in fade-in slide-in-from-top-1 p-5'
          : 'fixed top-[80px] left-0 right-0 w-full bg-white text-[#2B2B2B] shadow-2xl border-t-2 border-[#1E9B4C] border-b border-[#E2E8E4] z-50 animate-in fade-in slide-in-from-top-1 py-8'
      }
      onMouseLeave={onClose}
    >
      <div className={isSimple ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        
        {/* Simple single-column dropdown layout (e.g., Leadership) */}
        {isSimple ? (
          <div className="space-y-4">
            {(section.columns || []).map((col, colIdx) => (
              <div key={colIdx}>
                {/* Header title */}
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0E5C2E]">
                  {col.title[lang] || col.title.en}
                </h3>
                {/* Underline motif: green with small red accent */}
                <div className="flex items-center gap-1 mt-1 mb-3">
                  <div className="w-2.5 h-[3px] bg-[#E1232B] rounded-full" />
                  <div className="w-8 h-[3px] bg-[#1E9B4C] rounded-full" />
                </div>

                <div className="space-y-1.5">
                  {(col.items || []).map((item, itemIdx) => (
                    <Link
                      key={itemIdx}
                      to={item.path}
                      onClick={onClose}
                      className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#F6F8F7] transition-all duration-200"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1E9B4C] shrink-0 opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                      <div>
                        <div className="text-xs font-bold text-[#2B2B2B] group-hover:text-[#0E5C2E] group-hover:translate-x-0.5 transition-transform duration-200 flex items-center gap-1">
                          <span>{item.name[lang] || item.name.en}</span>
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#1E9B4C] transition-opacity" />
                        </div>
                        {item.desc && (
                          <p className="text-[11px] text-[#5A6170] mt-0.5 font-normal line-clamp-2">
                            {item.desc[lang] || item.desc.en}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Full-width Multi-column Mega Menu (Companies, About, Global Presence, etc.) */
          <div>
            {/* Nav Columns Container */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                (section.columns?.length || 0) >= 4
                  ? 'lg:grid-cols-4'
                  : (section.columns?.length || 0) === 3
                  ? 'lg:grid-cols-3'
                  : 'lg:grid-cols-2'
              } gap-8`}
            >
              {(section.columns || []).map((col, colIdx) => (
                <div key={colIdx} className="space-y-3">
                  {/* Category Column Title */}
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0E5C2E]">
                    {col.title[lang] || col.title.en}
                  </h3>

                  {/* Signature Rule Motif (Red & Green) */}
                  <div className="flex items-center gap-1 mt-1 mb-4">
                    <div className="w-2.5 h-[3px] bg-[#E1232B] rounded-full" />
                    <div className="w-8 h-[3px] bg-[#1E9B4C] rounded-full" />
                  </div>

                  {/* Links List */}
                  <ul className="space-y-2">
                    {(col.items || []).map((item, itemIdx) => {
                      const matchCompany = companies.find(
                        c => item.path.includes(c.slug) || item.path.includes(c.id)
                      );

                      return (
                        <li key={itemIdx}>
                          <Link
                            to={item.path}
                            onClick={onClose}
                            className="group block p-2.5 rounded-lg hover:bg-[#F6F8F7] border border-transparent hover:border-[#E2E8E4] transition-all duration-200"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                {matchCompany?.logoUrl && (
                                  <div className="h-6 w-12 px-1 py-0.5 rounded bg-white border border-[#E2E8E4] shadow-2xs flex items-center justify-center shrink-0">
                                    <img
                                      src={matchCompany.logoUrl}
                                      alt=""
                                      className="h-full w-full object-contain p-0.5"
                                    />
                                  </div>
                                )}
                                <span className="text-sm font-bold text-[#2B2B2B] group-hover:text-[#0E5C2E] group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
                                  {item.name[lang] || item.name.en}
                                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#1E9B4C] transition-opacity shrink-0" />
                                </span>
                              </div>
                              {item.badge && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#1E9B4C]/10 text-[#0E5C2E] border border-[#1E9B4C]/20 shrink-0">
                                  {item.badge[lang] || item.badge.en}
                                </span>
                              )}
                            </div>
                            {item.desc && (
                              <p className="text-xs text-[#5A6170] mt-0.5 font-normal leading-relaxed group-hover:text-[#2B2B2B] transition-colors">
                                {item.desc[lang] || item.desc.en}
                              </p>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optional Bottom Bar Strip (e.g. Global Presence map CTA) */}
        {section.bottomBar && (
          <div className="mt-6 pt-4 border-t border-[#E2E8E4] flex items-center justify-between">
            <span className="text-xs text-[#5A6170] font-medium">
              {lang === 'en' ? 'Sharabangla Group Global Operating Network' : (lang === 'zh' ? 'Sharabangla Group 全球运营网络' : 'শারাবাংলা গ্রুপ গ্লোবাল নেটওয়ার্ক')}
            </span>
            <Link
              to={section.bottomBar.ctaPath}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0E5C2E] hover:text-[#1E9B4C] tracking-wide uppercase group transition-all"
            >
              <span>{section.bottomBar.ctaLabel[lang] || section.bottomBar.ctaLabel.en}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#1E9B4C] group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
