import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { companies, Company } from '../../data/site';
import { SbgLogo } from '../common/SbgLogo';
import { ArrowRight, MapPin } from 'lucide-react';

export const S6_OurCompanies: React.FC = () => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<string>('all');

  const filteredCompanies = filter === 'all'
    ? companies
    : companies.filter(c => c.divisionId === filter);

  const filterTabs = [
    { id: 'all', label: t('companiesSection.all') },
    { id: 'ecommerce', label: t('companiesSection.ecommerce') },
    { id: 'trading', label: t('companiesSection.trading') },
    { id: 'logistics', label: t('companiesSection.logistics') },
    { id: 'manufacturing', label: t('companiesSection.manufacturing') }
  ];

  return (
    <section className="py-24 bg-[#F6F8F7] text-[#2B2B2B] border-t border-[#E2E8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-2 block">
              {t('companiesSection.tag')}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0E5C2E] tracking-tight">
              {t('companiesSection.title')}
            </h2>
          </div>

          {/* Filter Tabs - Active state in Accent Red #E1232B as specified */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-lg border border-[#E2E8E4] shadow-xs">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#E1232B] text-white shadow-xs'
                    : 'text-[#5A6170] hover:text-[#0E5C2E] hover:bg-[#F6F8F7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 7 Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((c: Company) => (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-[#E2E8E4] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#1E9B4C]/60 transition-all duration-300 flex flex-col justify-between group relative"
            >
              <div>
                {/* Header Image with Logo Placeholder Overlay */}
                <div className="relative h-48 overflow-hidden bg-[#06301A]">
                  <img
                    src={c.bgImage}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06301A] via-transparent to-transparent" />

                  {/* Tiny mark-sbg badge in top-right corner */}
                  <div 
                    className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#0E5C2E] border border-[#1E9B4C]/30 shadow-xs group/badge"
                    title="A Sharabangla Group Company"
                  >
                    <SbgLogo variant="monogram" className="w-4 h-2" />
                    <span className="hidden group-hover/badge:inline font-semibold">
                      {lang === 'bn' ? 'গ্রুপ প্রতিষ্ঠান' : (lang === 'zh' ? '集团成员企业' : 'Group Company')}
                    </span>
                  </div>

                  {/* Logo Image or Placeholder Badge */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    {c.logoUrl ? (
                      <div className="h-10 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-white/50 shadow-sm flex items-center justify-center max-w-[70%]">
                        <img
                          src={c.logoUrl}
                          alt={`${c.name} Logo`}
                          className="h-full max-w-full object-contain p-0.5"
                        />
                      </div>
                    ) : (
                      <div className="px-3 py-1 rounded bg-white/95 backdrop-blur-md text-[#0E5C2E] font-heading font-extrabold text-xs tracking-wider border border-white/40 shadow-xs">
                        {c.logoPlaceholderText}
                      </div>
                    )}
                    <span className="text-[10px] font-extrabold text-[#1E9B4C] bg-[#06301A]/90 px-2.5 py-1 rounded border border-[#1E9B4C]/30">
                      Est. {c.established}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#0E5C2E] mb-1.5">
                    {lang === 'bn' ? c.banglaDivisionName : (lang === 'zh' ? (c.zhDivisionName || c.divisionName) : c.divisionName)}
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-[#2B2B2B] mb-2 group-hover:text-[#1E9B4C] transition-colors">
                    {lang === 'bn' ? c.banglaName : (lang === 'zh' ? (c.zhName || c.name) : c.name)}
                  </h3>

                  <p className="text-sm text-[#5A6170] line-clamp-3 mb-6 leading-relaxed">
                    {lang === 'bn' ? c.banglaOneLiner : (lang === 'zh' ? (c.zhOneLiner || c.oneLiner) : c.oneLiner)}
                  </p>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-2 gap-2 bg-[#F6F8F7] p-3 rounded-lg border border-[#E2E8E4] mb-4 text-xs">
                    {(c.metrics || []).slice(0, 2).map((m, i) => (
                      <div key={i}>
                        <div className="font-heading font-bold text-[#0E5C2E]">{m.value}</div>
                        <div className="text-[10px] text-[#5A6170] truncate">
                          {lang === 'bn' ? (m.banglaLabel || m.label) : (lang === 'zh' ? (m.zhLabel || m.label) : m.label)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-[#E2E8E4]/60 mt-auto">
                <div className="flex items-center gap-1.5 text-xs text-[#5A6170]">
                  <MapPin className="w-3.5 h-3.5 text-[#1E9B4C]" />
                  <span>{(c.headquarters || '').split(',')[0]}</span>
                </div>

                <Link
                  to={`/companies/${c.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0E5C2E] hover:text-[#1E9B4C] transition-colors"
                >
                  <span>{t('companiesSection.learnMore')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
