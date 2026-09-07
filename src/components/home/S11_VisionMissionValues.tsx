import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { visionMissionValues } from '../../data/site';
import { Compass, Target, CheckCircle2, Shield, Globe, Zap, Handshake, Leaf, ShieldCheck } from 'lucide-react';

export const S11_VisionMissionValues: React.FC = () => {
  const { lang, t } = useLanguage();

  const valueIcons = [Shield, Globe, Zap, Handshake, Leaf];

  return (
    <section className="py-24 bg-white text-[#2B2B2B] border-t border-[#E2E8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-2 block">
            {t('visionSection.tag')}
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0E5C2E] tracking-tight mb-3">
            {t('visionSection.title')}
          </h2>
          <p className="text-[#5A6170] text-base leading-relaxed">
            {t('visionSection.subtitle')}
          </p>
        </div>

        {/* Top Dual Cards: Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 items-stretch">
          
          {/* Vision Card */}
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#06301A] via-[#094223] to-[#0E5C2E] text-white shadow-xl relative overflow-hidden group border border-[#1E9B4C]/25 flex flex-col justify-between h-full">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#1E9B4C] text-white flex items-center justify-center mb-6 shadow-md">
                <Compass className="w-7 h-7" />
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight">
                {lang === 'bn' ? visionMissionValues.vision.banglaTitle : (lang === 'zh' ? (visionMissionValues.vision.zhTitle || visionMissionValues.vision.title) : visionMissionValues.vision.title)}
              </h3>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-medium mb-6">
                {lang === 'bn' ? visionMissionValues.vision.banglaOpening : (lang === 'zh' ? (visionMissionValues.vision.zhOpening || visionMissionValues.vision.opening) : visionMissionValues.vision.opening)}
              </p>

              <ul className="space-y-4 mb-8">
                {(visionMissionValues.vision.bullets || []).map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-[#1E9B4C] shrink-0 mt-0.5" />
                    <div className="text-sm sm:text-base leading-relaxed">
                      <strong className="font-bold text-white block sm:inline mr-1.5">
                        {lang === 'bn' ? bullet.banglaLabel : (lang === 'zh' ? (bullet.zhLabel || bullet.label) : bullet.label)} —
                      </strong>
                      <span className="text-slate-300">
                        {lang === 'bn' ? bullet.banglaDesc : (lang === 'zh' ? (bullet.zhDesc || bullet.desc) : bullet.desc)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision Closing Line */}
            <div className="pt-6 border-t border-white/15 mt-auto">
              <p className="text-sm sm:text-base italic text-[#F9F295] leading-relaxed font-medium">
                "{lang === 'bn' ? visionMissionValues.vision.banglaClosing : (lang === 'zh' ? (visionMissionValues.vision.zhClosing || visionMissionValues.vision.closing) : visionMissionValues.vision.closing)}"
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#F6F8F7] text-[#2B2B2B] border border-[#E2E8E4] shadow-lg relative overflow-hidden group flex flex-col justify-between h-full">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#0E5C2E] text-white flex items-center justify-center mb-6 shadow-md">
                <Target className="w-7 h-7" />
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E] mb-3 tracking-tight">
                {lang === 'bn' ? visionMissionValues.mission.banglaTitle : (lang === 'zh' ? (visionMissionValues.mission.zhTitle || visionMissionValues.mission.title) : visionMissionValues.mission.title)}
              </h3>

              <p className="text-[#5A6170] text-base sm:text-lg leading-relaxed font-medium mb-6">
                {lang === 'bn' ? visionMissionValues.mission.banglaOpening : (lang === 'zh' ? (visionMissionValues.mission.zhOpening || visionMissionValues.mission.opening) : visionMissionValues.mission.opening)}
              </p>

              <ul className="space-y-4">
                {(visionMissionValues.mission.bullets || []).map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-[#1E9B4C] shrink-0 mt-0.5" />
                    <div className="text-sm sm:text-base leading-relaxed">
                      <strong className="font-bold text-[#0E5C2E] block sm:inline mr-1.5">
                        {lang === 'bn' ? bullet.banglaLabel : (lang === 'zh' ? (bullet.zhLabel || bullet.label) : bullet.label)} —
                      </strong>
                      <span className="text-[#5A6170]">
                        {lang === 'bn' ? bullet.banglaDesc : (lang === 'zh' ? (bullet.zhDesc || bullet.desc) : bullet.desc)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Five Core Values Grid */}
        <div>
          <h3 className="font-heading font-extrabold text-2xl text-[#0E5C2E] text-center mb-8">
            {lang === 'bn' ? 'আমাদের মূল মূল্যবোধসমূহ' : (lang === 'zh' ? '五大核心价值观' : 'Our Five Core Values')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {(visionMissionValues.values || []).map((val, idx) => {
              const Icon = valueIcons[idx % (valueIcons?.length || 1)] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white border border-[#E2E8E4] shadow-xs hover:shadow-md hover:border-[#1E9B4C] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#F6F8F7] border border-[#E2E8E4] text-[#0E5C2E] flex items-center justify-center mb-4 font-bold">
                      <Icon className="w-5 h-5 text-[#1E9B4C]" />
                    </div>

                    <h4 className="font-heading font-bold text-base text-[#0E5C2E] mb-2">
                      {lang === 'bn' ? val.banglaTitle : (lang === 'zh' ? (val.zhTitle || val.title) : val.title)}
                    </h4>

                    <p className="text-xs text-[#5A6170] leading-relaxed">
                      {lang === 'bn' ? val.banglaDesc : (lang === 'zh' ? (val.zhDesc || val.desc) : val.desc)}
                    </p>
                  </div>

                  <span className="text-[10px] font-extrabold text-[#1E9B4C] uppercase tracking-widest mt-4 pt-3 border-t border-[#E2E8E4]">
                    {lang === 'bn' ? `মূল্যবোধ ০${idx + 1}` : (lang === 'zh' ? `核心价值 0${idx + 1}` : `Value 0${idx + 1}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
