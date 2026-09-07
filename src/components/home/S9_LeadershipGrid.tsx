import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { leadership, LeadershipMember } from '../../data/site';
import { SbgLogo } from '../common/SbgLogo';
import { ArrowRight, Linkedin, AlertCircle } from 'lucide-react';

export const S9_LeadershipGrid: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="py-24 bg-[#F6F8F7] text-[#2B2B2B] border-t border-[#E2E8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-2 block">
            {t('leadershipSection.tag')}
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0E5C2E] tracking-tight mb-3">
            {t('leadershipSection.title')}
          </h2>
          <p className="text-[#5A6170] text-base leading-relaxed mb-4">
            {t('leadershipSection.subtitle')}
          </p>

          {/* Draft Notice Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('leadershipSection.noteDraft')}</span>
          </div>
        </div>

        {/* 5 Executive Leadership Cards Container */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {leadership.map((member: LeadershipMember) => (
            <div
              key={member.id}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] max-w-[380px] bg-white rounded-xl border border-[#E2E8E4] overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#1E9B4C] hover:-translate-y-1.5 transition-all duration-250 ease-out flex flex-col justify-between group relative motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              {/* Monogram Watermark in Top-Right Corner */}
              <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-60 transition-opacity">
                <SbgLogo variant="monogram" className="w-6 h-3" />
              </div>

              <div>
                {/* Photo Container with Rotating Gold Ring Frame */}
                <div className="relative pt-8 px-8 pb-4 text-center bg-gradient-to-b from-[#C8A24A]/5 to-transparent">
                  <div className="relative inline-block mx-auto mb-4">
                    <div className="gold-photo-ring mx-auto">
                      <div className="relative z-10 w-full h-full rounded-full overflow-hidden bg-[#E2E8E4]">
                        <img
                          src={member.photoUrl}
                          alt={member.role}
                          className="w-full h-full object-cover rounded-full"
                          style={{ 
                            objectPosition: member.photoPosition || 'center 20%',
                            transform: member.photoTransform || (member.photoScale ? `scale(${member.photoScale})` : undefined),
                            transformOrigin: 'center top'
                          }}
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23C8A24A' opacity='0.3'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";
                          }}
                        />
                      </div>
                    </div>
                    {/* Role Pill */}
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#06301A] text-white font-bold text-[10px] uppercase tracking-widest border border-[#C8A24A]/50 whitespace-nowrap shadow-xs transition-all duration-250 ease-out group-hover:scale-105 group-hover:bg-[#0E5C2E] group-hover:border-[#C8A24A] motion-reduce:group-hover:transform-none z-20">
                      {lang === 'bn' ? member.banglaRole : (lang === 'zh' ? (member.zhRole || member.role) : member.role)}
                    </span>
                  </div>

                  {/* Executive Name */}
                  <h3 className="font-heading font-extrabold text-xl text-[#0E5C2E] mt-2 transition-colors duration-250 ease-out group-hover:text-[#1E9B4C]">
                    {lang === 'bn' ? member.banglaName : (lang === 'zh' ? (member.zhName || member.name) : member.name)}
                  </h3>

                  {/* Subtitle / Company Affiliation line (e.g. Laobaan Bangladesh Ltd.) */}
                  {(member.companyAffiliation || member.banglaCompanyAffiliation || member.zhCompanyAffiliation) && (
                    <p className="text-xs font-semibold text-[#1E9B4C] mt-1 tracking-wide">
                      {lang === 'bn' 
                        ? (member.banglaCompanyAffiliation || member.companyAffiliation) 
                        : (lang === 'zh' 
                            ? (member.zhCompanyAffiliation || member.companyAffiliation) 
                            : member.companyAffiliation)}
                    </p>
                  )}
                </div>

                {/* Executive Bio */}
                <div className="p-6 pt-2">
                  <p className="text-xs text-[#5A6170] leading-relaxed text-center italic">
                    "{lang === 'bn' ? member.banglaBio : (lang === 'zh' ? (member.zhBio || member.bio) : member.bio)}"
                  </p>
                </div>
              </div>

              {/* LinkedIn Footer */}
              <div className="p-4 border-t border-[#E2E8E4] bg-[#F6F8F7] flex items-center justify-between text-xs">
                <span className="text-[#5A6170] font-medium">
                  {lang === 'bn' ? 'শারাবাংলা গ্রুপ বোর্ড' : (lang === 'zh' ? '沙拉邦拉集团董事会' : 'Sharabangla Group Board')}
                </span>
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E5C2E] hover:text-[#1E9B4C] transition-colors flex items-center gap-1 font-semibold"
                    aria-label={`${member.name} LinkedIn Profile`}
                  >
                    <Linkedin className="w-4 h-4 text-[#0077B5]" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Link to Full Leadership Page */}
        <div className="text-center">
          <Link
            to="/leadership"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#0E5C2E] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#06301A] hover:text-[#EAF6EE] transition-all shadow-xs cursor-pointer"
          >
            <span>{t('leadershipSection.fullTeamLink')}</span>
            <ArrowRight className="w-4 h-4 text-[#1E9B4C]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
