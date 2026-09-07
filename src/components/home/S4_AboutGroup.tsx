import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const S4_AboutGroup: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white text-[#2B2B2B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clear 3-paragraph editorial introduction */}
          <div className="lg:col-span-7">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-3 block">
              {t('aboutSection.tag')}
            </span>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0E5C2E] tracking-tight leading-tight mb-6">
              {t('aboutSection.title')}
            </h2>

            <div className="space-y-4 text-[#5A6170] text-base leading-relaxed mb-8">
              <p>{t('aboutSection.p1')}</p>
              <p>{t('aboutSection.p2')}</p>
              <p>{t('aboutSection.p3')}</p>
            </div>

            {/* Quick Strategic Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 pt-4 border-t border-[#E2E8E4]">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0E5C2E]">
                <CheckCircle className="w-4 h-4 text-[#1E9B4C] shrink-0" />
                <span>4 Registered Global Offices</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0E5C2E]">
                <CheckCircle className="w-4 h-4 text-[#1E9B4C] shrink-0" />
                <span>7 Core Sister Companies</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0E5C2E]">
                <CheckCircle className="w-4 h-4 text-[#1E9B4C] shrink-0" />
                <span>100% Export & Trade Compliant</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0E5C2E]">
                <CheckCircle className="w-4 h-4 text-[#1E9B4C] shrink-0" />
                <span>Tech-Enabled Logistics Network</span>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-[#0E5C2E] hover:text-[#1E9B4C] group transition-colors cursor-pointer"
            >
              <span>{t('aboutSection.link')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Column: Stacked Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Background Green Frame Effect */}
              <div className="absolute -inset-4 rounded-2xl border-2 border-[#1E9B4C] opacity-30 transform translate-x-3 translate-y-3 pointer-events-none" />

              {/* Primary Image */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[#E2E8E4]">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
                  alt="Sharabangla Group Corporate Headquarters"
                  className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06301A]/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white p-4 rounded-lg bg-[#06301A]/90 backdrop-blur-md border border-white/10">
                  <span className="text-xs font-bold text-[#1E9B4C] uppercase tracking-widest block">
                    SBG Head Office • Dhaka HQ
                  </span>
                  <span className="text-sm font-medium text-slate-200">
                    Centralizing executive leadership across Asia, Middle East & Europe.
                  </span>
                </div>
              </div>

              {/* Floating Sub-Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl border border-[#E2E8E4] shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0E5C2E] text-[#1E9B4C] flex items-center justify-center font-bold text-lg">
                  7+
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0E5C2E] uppercase">Operating Countries</div>
                  <div className="text-[11px] text-[#5A6170]">Asia, Middle East & Beyond</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
