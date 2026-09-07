import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { directorMessages, DirectorMessage } from '../../data/site';
import { SbgLogo } from '../common/SbgLogo';
import { Quote } from 'lucide-react';

export const S10C_DirectorMessages: React.FC = () => {
  const { lang, t } = useLanguage();

  // Duplicate the 3 director cards to create a seamless infinite marquee loop
  const marqueeCards = [...directorMessages, ...directorMessages];

  return (
    <section className="py-20 sm:py-24 bg-[#06301A] text-white relative overflow-hidden border-t border-[#1E9B4C]/20">
      {/* Background Accent Gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#0E5C2E] to-transparent opacity-40 pointer-events-none" />

      {/* Large mark-sbg watermark behind content at 3.5% opacity */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.035] pointer-events-none select-none z-0">
        <SbgLogo variant="monogram" className="w-full h-full" isDarkBg={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10 sm:mb-12">
        {/* Section Header */}
        <div className="text-left max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-2 block">
            {t('directorSection.tag')}
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            {t('directorSection.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            {t('directorSection.subtitle')}
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Auto-Scrolling Row */}
      <div className="relative w-full overflow-hidden directors-marquee-container py-4">
        {/* Subtle gradient edge masks for smooth continuous entry and exit */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-[#06301A] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-[#06301A] to-transparent z-20" />

        {/* Marquee Track */}
        <div className="animate-marquee-directors flex items-start gap-6 sm:gap-8 pl-6 will-change-transform">
          {marqueeCards.map((card: DirectorMessage, index: number) => {
            const cardKey = `${card.id}-${index}`;

            return (
              <div
                key={cardKey}
                className="w-[440px] sm:w-[520px] md:w-[580px] shrink-0 p-6 sm:p-7 rounded-2xl bg-[#0E5C2E]/85 backdrop-blur-md border border-white/15 shadow-2xl hover:border-[#1E9B4C] transition-all duration-300 flex flex-col justify-between group relative select-none h-auto"
              >
                {/* 2-Column Responsive Card Content */}
                <div className="grid grid-cols-12 gap-5 sm:gap-6 items-start h-full">
                  
                  {/* Left Column: Portrait with offset frame */}
                  <div className="col-span-5 relative">
                    <div className="relative">
                      {/* Decorative outer frame matching leadership standard */}
                      <div className="absolute -inset-1.5 rounded-xl border border-[#1E9B4C] opacity-40 transform -translate-x-1.5 -translate-y-1.5 pointer-events-none group-hover:opacity-80 transition-opacity" />

                      <div className="relative rounded-lg overflow-hidden shadow-lg border border-white/20 bg-[#06301A]">
                        <img
                          src={card.photoUrl}
                          alt={lang === 'bn' ? card.banglaAuthorName : card.authorName}
                          className="w-full h-52 sm:h-64 object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                          style={{ objectPosition: card.photoPosition || 'center 20%' }}
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "/leadership/chairman.jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#06301A] via-transparent to-transparent opacity-80" />

                        {/* Bottom Mini Badge */}
                        <div className="absolute bottom-2 left-2 right-2 p-1.5 rounded bg-[#06301A]/90 backdrop-blur-xs border border-white/10 text-center">
                          <div className="font-heading font-bold text-[11px] sm:text-xs text-white truncate">
                            {lang === 'bn' ? card.banglaAuthorName : (lang === 'zh' ? (card.zhAuthorName || card.authorName) : card.authorName)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Quote, Heading & Author Details */}
                  <div className="col-span-7 flex flex-col justify-between h-full min-w-0">
                    <div>
                      {/* Quote Icon & Label */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#06301A] border border-[#1E9B4C]/40 flex items-center justify-center text-[#1E9B4C] shrink-0 shadow-xs">
                          <Quote className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1E9B4C] truncate">
                          {lang === 'bn' ? card.banglaTag : (lang === 'zh' ? (card.zhTag || card.tag) : card.tag)}
                        </span>
                      </div>

                      {/* Heading */}
                      <h3 className="font-heading font-extrabold text-base sm:text-lg text-white mb-2 leading-snug">
                        {lang === 'bn' ? card.banglaHeading : (lang === 'zh' ? (card.zhHeading || card.heading) : card.heading)}
                      </h3>

                      {/* Full Pull Quote — No line-clamp or truncation */}
                      <blockquote className="font-serif text-xs sm:text-[13px] text-slate-100 italic leading-relaxed pl-3 border-l-2 border-[#1E9B4C] mb-4">
                        "{lang === 'bn' ? card.banglaQuote : (lang === 'zh' ? (card.zhQuote || card.quote) : card.quote)}"
                      </blockquote>
                    </div>

                    {/* Signature Block */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
                      <div className="min-w-0 flex-1">
                        {/* Red horizontal accent bar */}
                        <div className="w-8 h-0.5 bg-[#E1232B] mb-1.5 rounded-full" />
                        <div className="font-heading font-bold text-xs sm:text-[13px] text-white">
                          {lang === 'bn' ? card.banglaAuthorName : (lang === 'zh' ? (card.zhAuthorName || card.authorName) : card.authorName)}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-[#1E9B4C] font-semibold uppercase tracking-wider leading-tight mt-0.5">
                          {lang === 'bn' ? card.banglaAuthorTitle : (lang === 'zh' ? (card.zhAuthorTitle || card.authorTitle) : card.authorTitle)}
                        </div>
                      </div>

                      {/* Signature Badge */}
                      <div className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-serif italic text-slate-300 shrink-0 hidden sm:block whitespace-nowrap">
                        {card.signatureText}
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
