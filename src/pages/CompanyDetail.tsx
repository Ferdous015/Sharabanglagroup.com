import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';
import { companies } from '../data/site';
import { ArrowLeft, CheckCircle2, Globe, Mail, Building2, ExternalLink, ArrowUpRight } from 'lucide-react';

export const CompanyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();

  const company = companies.find(c => c.slug === slug);

  if (!company) {
    return <Navigate to="/companies" replace />;
  }

  return (
    <>
      <SEO 
        title={company.name}
        description={company.oneLiner}
      />

      {/* Detail Hero */}
      <section className="bg-[#06301A] text-white pt-32 pb-20 relative overflow-hidden border-b border-[#1E9B4C]/20">
        
        {/* Animated Background Image Layer with Ken Burns Zoom */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={company.heroImage || company.bgImage}
            alt=""
            referrerPolicy="no-referrer"
            style={{ objectPosition: company.heroPosition || 'center' }}
            className="w-full h-full object-cover animate-ken-burns opacity-95"
          />
        </div>

        {/* Desktop Directional Scrim Overlay (strong text protection on left, bright photography on right) */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1] hidden md:block"
          style={{
            background: 'linear-gradient(90deg, rgba(6, 48, 26, 0.95) 0%, rgba(6, 48, 26, 0.85) 35%, rgba(6, 48, 26, 0.45) 65%, rgba(6, 48, 26, 0.15) 100%)'
          }}
        />

        {/* Mobile / Tablet Directional Scrim Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1] md:hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(6, 48, 26, 0.92) 0%, rgba(6, 48, 26, 0.8) 60%, rgba(6, 48, 26, 0.35) 100%)'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
          
          <div className="flex-1 max-w-3xl">
            <Link
              to="/companies"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E9B4C] hover:text-white transition-colors mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'bn' ? 'সকল কোম্পানিতে ফিরে যান' : (lang === 'zh' ? '返回全部企业列表' : 'Back to All Companies')}</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded bg-[#0E5C2E] border border-[#1E9B4C]/40 text-white text-xs font-extrabold uppercase tracking-widest">
                {lang === 'bn' ? company.banglaDivisionName : (lang === 'zh' ? (company.zhDivisionName || company.divisionName) : company.divisionName)}
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                {lang === 'bn' ? `প্রতিষ্ঠিত ${company.established}` : (lang === 'zh' ? `成立于 ${company.established} 年` : `Established ${company.established}`)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mb-6">
              {company.logoUrl && (
                <div className="shrink-0 bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl border border-white/30 flex items-center justify-center max-w-[180px] sm:max-w-[220px]">
                  <img
                    src={company.logoUrl}
                    alt={`${company.name} Logo`}
                    className="h-10 sm:h-14 w-auto object-contain max-h-14"
                  />
                </div>
              )}
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                {lang === 'bn' ? company.banglaName : (lang === 'zh' ? (company.zhName || company.name) : company.name)}
              </h1>
            </div>

            <p className="text-slate-200 text-lg sm:text-xl max-w-3xl leading-relaxed mb-8">
              {lang === 'bn' ? company.banglaOneLiner : (lang === 'zh' ? (company.zhOneLiner || company.oneLiner) : company.oneLiner)}
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-3.5 py-2 rounded-full border border-white/15">
                <Building2 className="w-4 h-4 text-[#1E9B4C]" />
                <span>{lang === 'bn' ? 'হেডকোয়ার্টার:' : (lang === 'zh' ? '总部位置：' : 'HQ:')} {company.headquarters}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-3.5 py-2 rounded-full border border-white/15">
                <Globe className="w-4 h-4 text-[#1E9B4C]" />
                <span>{lang === 'bn' ? 'বাজারসমূহ:' : (lang === 'zh' ? '业务覆盖市场：' : 'Markets:')} {(company.operatingMarkets || []).join(', ')}</span>
              </span>
              {company.websiteUrl && (
                <a
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E1232B] hover:bg-[#B01820] border border-[#E1232B] hover:border-white/50 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.03] animate-cta-pulse-red"
                >
                  <span className="text-white drop-shadow-xs">
                    {lang === 'bn' ? 'অফিসিয়াল ওয়েবসাইট দেখুন' : (lang === 'zh' ? '访问官方网站' : 'Visit Official Website')}
                  </span>
                  <ExternalLink className="w-4 h-4 text-white/95 group-hover/btn:text-white transition-all duration-200 transform group-hover/btn:translate-x-1" />
                </a>
              )}
            </div>
          </div>

          {company.featuredProductImage && (
            <div className="shrink-0 w-full sm:w-64 lg:w-64 xl:w-72 mt-6 lg:mt-0 lg:self-end lg:translate-y-6">
              <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-white/40 group transition-all">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-white flex items-center justify-center p-1">
                  {/* Studio Vignette Overlay to fade noisy background toward pure white edges */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-10 rounded-xl"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255,255,255,0) 25%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.98) 92%)'
                    }}
                  />
                  <img
                    src={company.featuredProductImage}
                    alt={company.featuredProductTitle || "Featured Product"}
                    className="w-full h-full object-cover object-center scale-110 group-hover:scale-115 transition-transform duration-300 rounded-lg"
                  />
                </div>
                {company.featuredProductTitle && (
                  <div className="mt-3 text-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0E5C2E] block">
                      {lang === 'bn' ? 'বৈশিষ্ট্যপূর্ণ পণ্য' : (lang === 'zh' ? '核心特色产品' : 'Featured Product')}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                      {lang === 'bn' 
                        ? (company.banglaFeaturedProductTitle || company.featuredProductTitle) 
                        : (lang === 'zh'
                            ? (company.zhFeaturedProductTitle || company.featuredProductTitle)
                            : company.featuredProductTitle)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16 sm:py-20 bg-white text-[#2B2B2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Company Overview */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF6EE] text-[#0E5C2E] text-xs font-extrabold uppercase tracking-wider mb-4 border border-[#1E9B4C]/20">
              <span>{lang === 'bn' ? 'প্রতিষ্ঠান পরিচিতি' : (lang === 'zh' ? '企业深度介绍' : 'Corporate Overview')}</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E] mb-6">
              {lang === 'bn' ? `${company.banglaName}-এর কর্মপরিধি ও ভূমিকা` : (lang === 'zh' ? `关于 ${company.zhName || company.name}` : `About ${company.name}`)}
            </h2>
            <p className="text-[#5A6170] text-base sm:text-lg leading-relaxed">
              {lang === 'bn' ? company.banglaDescription : (lang === 'zh' ? (company.zhDescription || company.description) : company.description)}
            </p>
          </div>

          {/* Operational Metrics & Scale Grid */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-[#0E5C2E]">
                  {lang === 'bn' ? 'কার্যক্ষমতা ও পরিমাপক' : (lang === 'zh' ? '关键运营指标与产业规模' : 'Operational Metrics & Scale')}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A6170] mt-1">
                  {lang === 'bn' 
                    ? 'বাণিজ্য ও পরিচালনার গুরুত্বপূর্ণ পরিসংখ্যান' 
                    : (lang === 'zh'
                        ? `${company.zhName || company.name} 的核心运营能力与市场数据指标`
                        : `Key operational capacity and market indicators for ${company.name}`)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {(company.metrics || []).map((m, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-[#F6F8F7] border border-[#E2E8E4] hover:border-[#1E9B4C]/40 hover:shadow-md transition-all group"
                >
                  <div className="w-8 h-1 bg-[#1E9B4C] rounded-full mb-4 group-hover:w-12 transition-all duration-300" />
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0E5C2E] mb-2 tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-sm font-semibold text-[#5A6170] leading-snug">
                    {lang === 'bn' ? (m.banglaLabel || m.label) : (lang === 'zh' ? (m.zhLabel || m.label) : m.label)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Products & Capabilities */}
          <div className="mb-16">
            <h3 className="font-heading font-bold text-xl text-[#0E5C2E] mb-6">
              {lang === 'bn' ? 'মূল পণ্য ও সেবাসমূহ' : (lang === 'zh' ? '核心产品与业务能力' : 'Key Products & Capabilities')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {((lang === 'bn' && company.banglaKeyOfferings) 
                ? company.banglaKeyOfferings 
                : ((lang === 'zh' && company.zhKeyOfferings) 
                    ? company.zhKeyOfferings 
                    : company.keyOfferings) || []
              ).map((offering, idx) => (
                <div 
                  key={idx} 
                  className="p-5 rounded-xl bg-white border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C]/40 hover:shadow-md transition-all flex items-start gap-3.5"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#1E9B4C] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-semibold text-[#2B2B2B] leading-relaxed">{offering}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Corporate Inquiries & Communications Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-[#06301A] to-[#0E5C2E] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F9F295] block mb-2">
                {lang === 'bn' ? 'করপোরেট যোগাযোগ' : (lang === 'zh' ? '商务与业务咨询' : 'Direct Communications')}
              </span>
              <h4 className="font-heading font-extrabold text-xl sm:text-2xl text-white mb-2">
                {lang === 'bn' ? `${company.banglaName}-এর সাথে সরাসরি যুক্ত হোন` : (lang === 'zh' ? `与 ${company.zhName || company.name} 建立商业合作` : `Engage with ${company.name}`)}
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {lang === 'bn'
                  ? `বাণিজ্যিক প্রস্তাব, প্রাতিষ্ঠানিক অর্ডার বা সহযোগিতার জন্য সরাসরি আমাদের করপোরেট টিমের সাথে যোগাযোগ করুন: ${company.contactEmail}`
                  : (lang === 'zh'
                      ? `如需大宗采购、分销合作、跨境物流或技术制造咨询，请直接联系对应团队：${company.contactEmail}`
                      : `For institutional procurement, distribution partnerships, or operational inquiries, connect directly at ${company.contactEmail}`)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`mailto:${company.contactEmail}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0E5C2E] hover:bg-[#EAF6EE] font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#1E9B4C]" />
                <span>{lang === 'bn' ? 'ইমেইল পাঠান' : (lang === 'zh' ? '发送邮件' : 'Email Team')}</span>
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                <span>{lang === 'bn' ? 'গ্রুপ হেডকোয়ার্টার' : (lang === 'zh' ? '联系集团总部' : 'Group Contact')}</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
