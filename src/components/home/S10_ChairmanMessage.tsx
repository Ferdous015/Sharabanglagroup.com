import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { chairmanMessage } from '../../data/site';
import { SbgLogo } from '../common/SbgLogo';
import { Quote } from 'lucide-react';

export const S10_ChairmanMessage: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="py-24 bg-[#06301A] text-white relative overflow-hidden border-t border-[#1E9B4C]/20">
      
      {/* Background Accent Gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#0E5C2E] to-transparent opacity-40 pointer-events-none" />

      {/* Large mark-sbg watermark behind blockquote at 3.5% opacity */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.035] pointer-events-none select-none z-0">
        <SbgLogo variant="monogram" className="w-full h-full" isDarkBg={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Chairman Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              <div className="absolute -inset-3 rounded-2xl border-2 border-[#1E9B4C] opacity-40 transform -translate-x-3 -translate-y-3 pointer-events-none" />

              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-[#0E5C2E]">
                <img
                  src={chairmanMessage.photoUrl}
                  alt={chairmanMessage.authorName}
                  className="w-full h-96 sm:h-[450px] object-cover filter contrast-110"
                  style={{ objectPosition: 'center 20%' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06301A] via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#06301A]/95 backdrop-blur-md border border-white/15 shadow-lg">
                  <div className="font-heading font-extrabold text-lg text-white tracking-wide">
                    {lang === 'bn' ? chairmanMessage.banglaAuthorName : (lang === 'zh' ? (chairmanMessage.zhAuthorName || chairmanMessage.authorName) : chairmanMessage.authorName)}
                  </div>
                  <div className="text-[11px] font-bold text-[#1E9B4C] uppercase tracking-wider mt-0.5">
                    {lang === 'bn' ? chairmanMessage.banglaAuthorTitle : (lang === 'zh' ? (chairmanMessage.zhAuthorTitle || chairmanMessage.authorTitle) : chairmanMessage.authorTitle)}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Quote & Message */}
          <div className="lg:col-span-7 relative">
            
            <div className="w-12 h-12 rounded-full bg-[#0E5C2E] border border-[#1E9B4C]/40 flex items-center justify-center text-[#1E9B4C] mb-6 shadow-md">
              <Quote className="w-6 h-6" />
            </div>

            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-3 block">
              {t('chairmanSection.tag')}
            </span>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-6">
              {t('chairmanSection.title')}
            </h2>

            {/* Large Pull Quote */}
            <blockquote className="font-serif text-xl sm:text-2xl text-slate-100 italic leading-relaxed mb-8 pl-6 border-l-4 border-[#1E9B4C]">
              "{lang === 'bn' ? chairmanMessage.banglaQuote : (lang === 'zh' ? (chairmanMessage.zhQuote || chairmanMessage.quote) : chairmanMessage.quote)}"
            </blockquote>

            {/* Signature Block with short red horizontal rule */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                {/* Red horizontal accent bar above signature */}
                <div className="w-12 h-1 bg-[#E1232B] mb-2.5 rounded-full shadow-sm" />
                <div className="font-heading font-bold text-xl text-white tracking-tight">
                  {lang === 'bn' ? chairmanMessage.banglaAuthorName : (lang === 'zh' ? (chairmanMessage.zhAuthorName || chairmanMessage.authorName) : chairmanMessage.authorName)}
                </div>
                <div className="text-xs font-bold text-[#1E9B4C] uppercase tracking-wider mt-0.5">
                  {lang === 'bn' ? chairmanMessage.banglaAuthorTitle : (lang === 'zh' ? (chairmanMessage.zhAuthorTitle || chairmanMessage.authorTitle) : chairmanMessage.authorTitle)}
                </div>
              </div>

              {/* Signature Badge */}
              <div className="px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/15 text-xs font-serif italic text-slate-200 shadow-inner">
                {chairmanMessage.signatureText}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
