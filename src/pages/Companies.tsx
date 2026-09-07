import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';
import { companies, Company, divisions } from '../data/site';
import { SbgLogo } from '../components/common/SbgLogo';
import { ArrowRight, MapPin, Search, CheckCircle2 } from 'lucide-react';

export const Companies: React.FC = () => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCompanies = companies.filter(c => {
    const matchesTab = activeTab === 'all' || c.divisionId === activeTab;
    const matchesSearch = (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.oneLiner || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.keyOfferings || []).some(o => (o || '').toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <>
      <SEO 
        title="Our Companies"
        description="Explore the 7 sister concerns of Sharabangla Group across E-Commerce, Trading & Sourcing, Express Logistics, and Manufacturing."
      />

      {/* Hero */}
      <section className="bg-[#06301A] text-white pt-32 pb-20 border-b border-[#1E9B4C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-3 block">
            {lang === 'bn' ? 'গ্রুপ পোর্টফোলিও' : (lang === 'zh' ? '集团业务版图' : 'GROUP PORTFOLIO')}
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-4">
            {lang === 'bn' ? 'আমাদের ৭টি বিশেষায়িত প্রতিষ্ঠান' : (lang === 'zh' ? '旗下 7 家专业实体企业' : 'Our 7 Specialized Sister Concerns')}
          </h1>
          <p className="text-slate-200 text-lg max-w-2xl">
            {lang === 'bn'
              ? 'ডিজিটাল কমার্স, আন্তর্জাতিক বাণিজ্য, এক্সপ্রেস লজিস্টিকস এবং প্রযুক্তি উৎপাদনের সমন্বয়ে গঠিত একটি সমৃদ্ধ ও সমন্বিত ইকোসিস্টেম।'
              : (lang === 'zh'
                  ? '由深耕数字商业、国际贸易、极速物流和智能制造四大领域的专业实体组成的现代化企业生态。'
                  : 'A data-driven ecosystem fed by specialized business concerns operating across digital commerce, international trade, express logistics, and technology manufacturing.')}
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-12 bg-[#F6F8F7] border-b border-[#E2E8E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Active Filter Tabs styled with Red Accent for active tab */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                activeTab === 'all' 
                  ? 'bg-[#E1232B] text-white shadow-md' 
                  : 'bg-white text-[#5A6170] hover:bg-[#E2E8E4] border border-[#E2E8E4]'
              }`}
            >
              {lang === 'bn' ? 'সকল (৭)' : (lang === 'zh' ? '全部 (7)' : 'All (7)')}
            </button>
            {divisions.map(d => (
              <button
                key={d.id}
                onClick={() => setActiveTab(d.id)}
                className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === d.id 
                    ? 'bg-[#E1232B] text-white shadow-md' 
                    : 'bg-white text-[#5A6170] hover:bg-[#E2E8E4] border border-[#E2E8E4]'
                }`}
              >
                {lang === 'bn' ? d.banglaName : (lang === 'zh' ? (d.zhName || d.name) : d.name)} ({d.companiesCount})
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'প্রতিষ্ঠান বা সেবা অনুসন্ধান করুন...' : (lang === 'zh' ? '搜索旗下企业或业务能力...' : 'Search companies or services...')}
              className="w-full bg-white border border-[#E2E8E4] rounded-md pl-10 pr-4 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
            />
          </div>

        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {(filteredCompanies?.length || 0) === 0 ? (
            <div className="text-center py-16 text-[#5A6170]">
              {lang === 'bn' ? 'আপনার অনুসন্ধানের সাথে মেলে এমন কোনো প্রতিষ্ঠান পাওয়া যায়নি।' : (lang === 'zh' ? '未找到符合条件的旗下企业。' : 'No companies match your search or filter criteria.')}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCompanies.map((c: Company) => (
                <div
                  key={c.id}
                  className="bg-white rounded-xl border border-[#E2E8E4] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#1E9B4C] transition-all flex flex-col justify-between group relative"
                >
                  <div>
                    <div className="relative h-48 bg-[#06301A] overflow-hidden">
                      <img
                        src={c.bgImage}
                        alt={c.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06301A] via-transparent to-transparent" />
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
                          <div className="px-3 py-1 rounded bg-white text-[#0E5C2E] font-extrabold text-xs flex items-center gap-1.5 shadow-xs">
                            <SbgLogo variant="monogram" className="w-4 h-2" />
                            <span>{c.logoPlaceholderText}</span>
                          </div>
                        )}
                        <span className="text-[10px] font-bold text-[#1E9B4C] bg-[#06301A] px-2 py-1 rounded border border-[#1E9B4C]/40">
                          Est. {c.established}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-1 block">
                        {lang === 'bn' ? c.banglaDivisionName : (lang === 'zh' ? (c.zhDivisionName || c.divisionName) : c.divisionName)}
                      </span>
                      <h3 className="font-heading font-extrabold text-xl text-[#0E5C2E] mb-2 group-hover:text-[#1E9B4C] transition-colors">
                        {lang === 'bn' ? c.banglaName : (lang === 'zh' ? (c.zhName || c.name) : c.name)}
                      </h3>
                      <p className="text-xs text-[#5A6170] leading-relaxed mb-4 line-clamp-3">
                        {lang === 'bn' ? c.banglaOneLiner : (lang === 'zh' ? (c.zhOneLiner || c.oneLiner) : c.oneLiner)}
                      </p>

                      <div className="space-y-1.5 mb-4">
                        {((lang === 'bn' && c.banglaKeyOfferings)
                          ? c.banglaKeyOfferings
                          : ((lang === 'zh' && c.zhKeyOfferings)
                              ? c.zhKeyOfferings
                              : c.keyOfferings) || []
                        ).slice(0, 2).map((off, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-xs text-[#0E5C2E]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C] shrink-0" />
                            <span className="truncate">{off}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-[#E2E8E4]/60">
                    <span className="text-xs text-[#5A6170] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{(c.headquarters || '').split(',')[0]}</span>
                    </span>

                    <Link
                      to={`/companies/${c.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0E5C2E] hover:text-[#1E9B4C] cursor-pointer"
                    >
                      <span>{lang === 'bn' ? 'বিস্তারিত' : (lang === 'zh' ? '了解详情' : 'Explore')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
};
