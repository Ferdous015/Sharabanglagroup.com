import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { partnerPrograms } from '../../data/site';
import { ArrowUpRight, Handshake, ShoppingBag, TrendingUp } from 'lucide-react';

export const S14_PartnerCTA: React.FC = () => {
  const { lang, t } = useLanguage();

  const icons = [ShoppingBag, Handshake, TrendingUp];

  return (
    <section className="py-24 bg-white text-[#2B2B2B] relative overflow-hidden border-t border-[#E2E8E4]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0E5C2E] mb-2 block">
            {t('partnerSection.tag')}
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#2B2B2B] tracking-tight mb-4">
            {t('partnerSection.title')}
          </h2>
          <p className="text-[#5A6170] text-base leading-relaxed">
            {t('partnerSection.subtitle')}
          </p>
        </div>

        {/* 3 Split Paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(partnerPrograms || []).map((prog, idx) => {
            const Icon = icons[idx % (icons?.length || 1)] || Handshake;
            return (
              <div
                key={prog.id}
                className="bg-[#F6F8F7] rounded-2xl p-8 border border-[#E2E8E4] hover:border-[#1E9B4C] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-[#EAF6EE] border border-[#1E9B4C]/30 flex items-center justify-center text-[#0E5C2E] mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="text-[10px] font-extrabold text-[#0E5C2E] uppercase tracking-widest block mb-2">
                    {lang === 'zh' ? (prog.zhRole || prog.role) : (lang === 'bn' ? (prog.banglaRole || prog.role) : prog.role)}
                  </span>

                  <h3 className="font-heading font-extrabold text-xl text-[#2B2B2B] mb-3">
                    {lang === 'zh' ? (prog.zhTitle || prog.title) : (lang === 'bn' ? (prog.banglaTitle || prog.title) : prog.title)}
                  </h3>

                  <p className="text-xs text-[#5A6170] leading-relaxed mb-6">
                    {lang === 'zh' ? (prog.zhDesc || prog.desc) : (lang === 'bn' ? (prog.banglaDesc || prog.desc) : prog.desc)}
                  </p>
                </div>

                <Link
                  to="/partner"
                  className="w-full py-3 px-4 rounded-md bg-[#1E9B4C] text-white font-extrabold text-xs uppercase tracking-wider text-center hover:bg-[#0E5C2E] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>{lang === 'zh' ? (prog.zhActionText || prog.actionText) : (lang === 'bn' ? (prog.banglaActionText || prog.actionText) : prog.actionText)}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
