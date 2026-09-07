import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { journeyMilestones, Milestone } from '../../data/site';
import { Calendar, ChevronRight } from 'lucide-react';

export const S12_OurJourneyTimeline: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="py-24 bg-[#F6F8F7] text-[#2B2B2B] border-t border-[#E2E8E4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-2 block">
              {t('journeySection.tag')}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0E5C2E] tracking-tight">
              {t('journeySection.title')}
            </h2>
          </div>
          <p className="text-sm text-[#5A6170] max-w-md">
            {t('journeySection.subtitle')}
          </p>
        </div>

        {/* Horizontal Scrolling Timeline Container */}
        <div className="relative">
          
          {/* Scroll Track */}
          <div className="flex overflow-x-auto pb-8 pt-4 space-x-6 scrollbar-thin scrollbar-thumb-slate-300 snap-x snap-mandatory">
            {journeyMilestones.map((item: Milestone, index: number) => (
              <div
                key={index}
                className="snap-start flex-none w-80 sm:w-96 bg-white p-6 rounded-xl border border-[#E2E8E4] shadow-xs hover:shadow-xl hover:border-[#1E9B4C] transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Milestone Year Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2E8E4]">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E5C2E] text-white font-heading font-extrabold text-lg shadow-xs">
                      <Calendar className="w-4 h-4 text-[#1E9B4C]" />
                      <span>{item.year}</span>
                    </div>

                    <span className="text-[10px] font-extrabold text-[#5A6170] uppercase tracking-widest">
                      Step 0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2 group-hover:text-[#1E9B4C] transition-colors">
                    {lang === 'bn' ? item.banglaTitle : (lang === 'zh' ? (item.zhTitle || item.title) : item.title)}
                  </h3>

                  <p className="text-xs text-[#5A6170] leading-relaxed">
                    {lang === 'bn' ? item.banglaDescription : (lang === 'zh' ? (item.zhDescription || item.description) : item.description)}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E2E8E4] flex items-center justify-between text-[11px] font-semibold text-[#0E5C2E]">
                  <span>{lang === 'bn' ? 'মাইলফলক অর্জিত' : (lang === 'zh' ? '里程碑已圆满达成' : 'Milestone Achieved')}</span>
                  <ChevronRight className="w-4 h-4 text-[#1E9B4C] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-[#5A6170] mt-2 italic">
            {lang === 'bn' ? '← সময়রেখা অন্বেষণ করতে অনুভূমিকভাবে স্ক্রোল করুন →' : (lang === 'zh' ? '← 水平左右滑动探索完整发展历程 →' : '← Scroll horizontally to explore timeline →')}
          </div>

        </div>

      </div>
    </section>
  );
};
