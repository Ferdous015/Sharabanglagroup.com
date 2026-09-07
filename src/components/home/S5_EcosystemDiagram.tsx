import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { divisions, companies } from '../../data/site';
import { ShoppingBag, Globe, Truck, Cpu, ArrowUpRight } from 'lucide-react';

export const S5_EcosystemDiagram: React.FC = () => {
  const { lang, t } = useLanguage();
  const [activeDivisionId, setActiveDivisionId] = useState<string>('ecommerce');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return ShoppingBag;
      case 'Globe': return Globe;
      case 'Truck': return Truck;
      case 'Cpu': return Cpu;
      default: return Globe;
    }
  };

  return (
    <section className="py-24 bg-[#06301A] text-white relative overflow-hidden">
      
      {/* 1. Full-Width Ecosystem Background Image */}
      <img
        src="/media/ecosystem/ecosystem-bg.jpg.jpeg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
        loading="eager"
        onError={(e) => {
          // Fallback if file extension is .jpg instead of .jpg.jpeg
          const target = e.currentTarget;
          if (!target.src.includes('ecosystem-bg.jpg')) {
            target.src = '/media/ecosystem/ecosystem-bg.jpg';
          }
        }}
      />

      {/* 2. Deep Forest Green Tint / Overlay (85% Opacity) */}
      <div className="absolute inset-0 bg-[#06301A]/85 pointer-events-none z-0" />

      {/* 3. Large Centered Sharabangla Group Logo Watermark (5% Opacity) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] opacity-[0.05] pointer-events-none select-none z-0 flex items-center justify-center">
        <img
          src="/brand/logo-primary.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E9B4C] mb-2 block">
            {t('ecosystem.tag')}
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-4">
            {t('ecosystem.title')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('ecosystem.desc') !== 'ecosystem.desc' 
              ? t('ecosystem.desc') 
              : (lang === 'bn' 
                  ? 'কারখানা থেকে শুরু করে গ্রাহকের দোরগোড়া পর্যন্ত এশিয়া, ইউরোপ ও আমেরিকার সাপ্লাই চেইনকে যুক্ত করার সমন্বিত ব্যবস্থা।' 
                  : 'An integrated framework connecting supply chains from factory floors to consumer doorsteps across Asia, Europe, and America.')}
          </p>
        </div>

        {/* Desktop Interactive Diagram (Hidden on Mobile) */}
        <div className="hidden lg:block relative min-h-[580px] bg-[#0E5C2E]/60 rounded-3xl p-12 border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Subtle Radial Glow centered behind the center logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(30,155,76,0.30)_0%,rgba(30,155,76,0.10)_45%,transparent_70%)] pointer-events-none z-0 animate-ecosystem-pulse" />

          {/* Faint Ghost Placeholder Nodes for Future Companies (8-10% Opacity) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Top-Center Ghost Node */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-dashed border-white/20 bg-white/[0.02] flex items-center justify-center opacity-10">
              <span className="text-white text-base font-light select-none">+</span>
            </div>
            {/* Bottom-Center Ghost Node */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-dashed border-white/20 bg-white/[0.02] flex items-center justify-center opacity-10">
              <span className="text-white text-base font-light select-none">+</span>
            </div>
            {/* Mid-Left Ghost Node */}
            <div className="absolute top-1/2 left-6 -translate-y-1/2 w-14 h-14 rounded-full border border-dashed border-emerald-300/25 bg-emerald-500/[0.02] flex items-center justify-center opacity-10">
              <span className="text-emerald-200 text-base font-light select-none">+</span>
            </div>
            {/* Mid-Right Ghost Node */}
            <div className="absolute top-1/2 right-6 -translate-y-1/2 w-14 h-14 rounded-full border border-dashed border-emerald-300/25 bg-emerald-500/[0.02] flex items-center justify-center opacity-10">
              <span className="text-emerald-200 text-base font-light select-none">+</span>
            </div>
          </div>

          {/* Subtle Animated Particle Drift */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute inset-0 animate-drift-1 opacity-70">
              <span className="absolute top-[15%] left-[30%] w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-[0.08]" />
              <span className="absolute bottom-[20%] right-[30%] w-1.5 h-1.5 rounded-full bg-white opacity-[0.06]" />
            </div>
            <div className="absolute inset-0 animate-drift-2 opacity-70">
              <span className="absolute top-[45%] right-[15%] w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-[0.08]" />
              <span className="absolute bottom-[35%] left-[20%] w-1 h-1 rounded-full bg-white opacity-[0.06]" />
            </div>
          </div>

          {/* Connecting SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#1E9B4C" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#1E9B4C" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="#1E9B4C" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#1E9B4C" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <circle cx="50%" cy="50%" r="220" fill="none" stroke="#1E9B4C" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
          </svg>

          {/* Center Holding Company Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-white border-4 border-[#1E9B4C] flex items-center justify-center p-6 shadow-2xl z-20">
            <img
              src="/brand/logo-primary.png"
              alt="Sharabangla Group Logo"
              width={240}
              height={240}
              className="w-[240px] h-[240px] object-contain select-none"
              style={{
                minHeight: '32px',
                width: 'auto',
                maxHeight: '100%',
              }}
            />
          </div>

          {/* 4 Divisions Positioned Around Center */}
          {divisions.map((div, index) => {
            const Icon = getIcon(div.icon);
            const isActive = div.id === activeDivisionId;

            // Corner positions
            const positions = [
              'top-8 left-8',      // Top Left: E-Commerce
              'top-8 right-8',     // Top Right: Trading
              'bottom-8 left-8',   // Bottom Left: Logistics
              'bottom-8 right-8',  // Bottom Right: Manufacturing
            ];

            return (
              <Link
                key={div.id}
                to="/companies"
                onMouseEnter={() => setActiveDivisionId(div.id)}
                className={`absolute ${positions[index]} w-72 p-5 rounded-2xl border transition-all text-left z-30 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#2B2B2B] border-[#1E9B4C] shadow-2xl scale-105'
                    : 'bg-[#06301A]/90 text-white border-white/10 hover:border-[#1E9B4C]'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-[#06301A] text-[#1E9B4C]' : 'bg-[#0E5C2E] text-[#1E9B4C]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E9B4C] block">
                      {lang === 'bn' ? `বিভাগ ০${index + 1}` : (lang === 'zh' ? `业务板块 0${index + 1}` : `Division 0${index + 1}`)}
                    </span>
                    <h3 className="font-heading font-bold text-sm leading-snug">
                      {lang === 'bn' ? div.banglaName : (lang === 'zh' ? (div.zhName || div.name) : div.name)}
                    </h3>
                  </div>
                </div>

                <p className={`text-xs line-clamp-2 ${isActive ? 'text-[#5A6170]' : 'text-slate-300'}`}>
                  {lang === 'bn' ? div.banglaShortDesc : (lang === 'zh' ? (div.zhShortDesc || div.shortDesc) : div.shortDesc)}
                </p>

                {/* Company Logos Strip */}
                <div className="mt-2.5 flex flex-wrap items-center gap-1">
                  {companies.filter(c => c.divisionId === div.id).map(c => (
                    c.logoUrl ? (
                      <div key={c.id} className="h-5 px-1 py-0.5 rounded bg-white border border-slate-200 shadow-2xs flex items-center" title={c.name}>
                        <img src={c.logoUrl} alt={c.name} className="h-full max-w-[45px] object-contain p-0.5" />
                      </div>
                    ) : (
                      <span key={c.id} className="text-[8px] font-bold px-1 py-0.5 rounded bg-slate-100 text-[#0E5C2E]">
                        {c.logoPlaceholderText}
                      </span>
                    )
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-current/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span>
                    {lang === 'bn'
                      ? `${div.companiesCount}টি প্রতিষ্ঠান`
                      : (lang === 'zh'
                          ? `${div.companiesCount} 家专业实体`
                          : `${div.companiesCount} Sister Concerns`)}
                  </span>
                  <span className="text-[#1E9B4C] flex items-center gap-1">
                    {lang === 'bn' ? 'অন্বেষণ করুন' : (lang === 'zh' ? '探索业务' : 'Explore')} <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}

        </div>

        {/* Mobile View: Vertical Stack */}
        <div className="block lg:hidden space-y-6">
          <div className="p-4 rounded-xl bg-[#0E5C2E] text-center border border-white/20 mb-6 flex flex-col items-center justify-center gap-2">
            <div className="bg-white rounded-full p-2 border-2 border-[#1E9B4C]">
              <img
                src="/brand/logo-primary.png"
                alt="Sharabangla Group Logo"
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </div>
            <div>
              <span className="font-heading font-bold text-base text-white block">SHARABANGLA GROUP</span>
              <span className="text-xs text-[#EAF6EE] block">
                {lang === 'bn' ? 'কেন্দ্রীয় হোল্ডিং কাঠামো' : (lang === 'zh' ? '集团核心控股架构' : 'Central Holding Structure')}
              </span>
            </div>
          </div>

          {divisions.map((div, idx) => {
            const Icon = getIcon(div.icon);
            const divCompanies = companies.filter(c => c.divisionId === div.id);

            return (
              <div key={div.id} className="bg-[#0E5C2E]/80 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-[#06301A] text-[#1E9B4C]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#1E9B4C] uppercase tracking-widest block">
                      {lang === 'bn' ? `বিভাগ ০${idx + 1}` : (lang === 'zh' ? `业务板块 0${idx + 1}` : `Division 0${idx + 1}`)}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white">
                      {lang === 'bn' ? div.banglaName : (lang === 'zh' ? (div.zhName || div.name) : div.name)}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-4">
                  {lang === 'bn' ? div.banglaShortDesc : (lang === 'zh' ? (div.zhShortDesc || div.shortDesc) : div.shortDesc)}
                </p>

                <div className="space-y-2 pt-3 border-t border-white/10">
                  <span className="text-[11px] font-bold text-[#1E9B4C] uppercase tracking-wider block">
                    {lang === 'bn' ? 'সংশ্লিষ্ট প্রতিষ্ঠানসমূহ:' : (lang === 'zh' ? '旗下专业企业：' : 'Sister Concerns:')}
                  </span>
                  {divCompanies.map(c => (
                    <Link
                      key={c.id}
                      to={`/companies/${c.slug}`}
                      className="block p-3 rounded-xl bg-[#06301A] border border-white/10 text-white hover:border-[#1E9B4C] transition-colors"
                    >
                      <div className="flex items-center justify-between text-sm font-bold">
                        <div className="flex items-center gap-2">
                          {c.logoUrl && (
                            <div className="h-6 px-1.5 py-0.5 rounded bg-white border border-white/20 flex items-center justify-center shrink-0">
                              <img src={c.logoUrl} alt={c.name} className="h-full max-w-[50px] object-contain p-0.5" />
                            </div>
                          )}
                          <span>{lang === 'bn' ? c.banglaName : (lang === 'zh' ? (c.zhName || c.name) : c.name)}</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#1E9B4C]" />
                      </div>
                      <span className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                        {lang === 'bn' ? c.banglaOneLiner : (lang === 'zh' ? (c.zhOneLiner || c.oneLiner) : c.oneLiner)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
