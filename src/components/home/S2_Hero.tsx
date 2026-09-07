import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { SbgLogo } from '../common/SbgLogo';
import { ArrowRight, ChevronDown, Globe } from 'lucide-react';

export const S2_Hero: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] sm:min-h-[88vh] flex items-center justify-center bg-black text-white pt-28 pb-16 overflow-hidden">
      
      {/* Background Cargo Container Ship Asset - High Clarity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-100 transition-all duration-1000 brightness-110 contrast-[1.05]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2000&auto=format&fit=crop')`
        }}
        aria-hidden="true"
      />

      {/* Light Professional Vignette & Subtle Dark Tint Overlay (Replaced Heavy Solid Green) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-0" />

      {/* Subtle Corporate Grid Line Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E9B4C_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none z-0" />

      {/* HERO WATERMARK LOGO: mark-sbg.svg at subtle opacity bottom-right */}
      <div className="absolute right-[-5%] bottom-[-5%] w-[50vh] h-[50vh] lg:w-[60vh] lg:h-[60vh] opacity-[0.06] pointer-events-none select-none z-0">
        <SbgLogo variant="monogram" className="w-full h-full" isDarkBg={true} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Full Circular Logo Badge above H1 */}
        <div className="inline-flex flex-col items-center justify-center mb-6">
          <div className="p-2 sm:p-3 rounded-full bg-black/40 border border-white/20 shadow-2xl backdrop-blur-md mb-3 flex items-center justify-center">
            <SbgLogo variant="seal" size="xl" isDarkBg={true} className="w-20 h-20 sm:w-24 sm:h-24" />
          </div>
          <div className="inline-flex items-center gap-3 px-8 py-3 sm:px-10 sm:py-3.5 rounded-full bg-[#1E9B4C] text-white text-lg sm:text-2xl font-black tracking-wider uppercase shadow-[0_0_35px_rgba(30,155,76,0.9)] border-2 sm:border-3 border-emerald-200 backdrop-blur-md transition-all hover:scale-105">
            <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-white shrink-0 animate-pulse" />
            <span className="drop-shadow-lg tracking-widest">{lang === 'bn' ? 'শারাবংলা গ্রুপ' : 'SHARABANGLA GROUP'}</span>
          </div>
        </div>

        {/* Main H1 Headline */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] max-w-5xl mx-auto mb-6 text-white drop-shadow-2xl">
          {lang === 'bn' ? 'বাংলাদেশকে বিশ্ব বাণিজ্যের সাথে যুক্ত করছে' : 'Connecting Bangladesh to Global Trade'}
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-xl text-slate-100 max-w-3xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-lg bg-black/20 p-3 rounded-xl backdrop-blur-xs">
          {t('hero.subtitle')}
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            to="/companies"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-[#1E9B4C] text-white font-extrabold text-sm uppercase tracking-wider hover:bg-[#0E5C2E] border-b-2 border-transparent hover:border-[#E1232B] transition-all shadow-2xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{t('hero.ctaCompanies')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md border-2 border-white/60 bg-black/40 text-white font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all backdrop-blur-md cursor-pointer shadow-xl"
          >
            <span>{t('hero.ctaAbout')}</span>
          </Link>
        </div>

        {/* Scroll Down Indicator */}
        <div className="mt-10 flex flex-col items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer">
          <span className="text-[11px] font-semibold tracking-wider uppercase mb-1">
            {t('hero.scrollText')}
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#1E9B4C]" />
        </div>

      </div>
    </section>
  );
};
