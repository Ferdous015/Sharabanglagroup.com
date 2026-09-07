import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';
import { S8_GlobalPresenceMap } from '../components/home/S8_GlobalPresenceMap';
import { GlobalTrustTestimonials } from '../components/common/GlobalTrustTestimonials';
import { globalLocations } from '../data/site';
import { MapPin, Phone, Mail, Globe, Building2, Map, Layers, ChevronRight, ArrowRight, MessageSquareQuote } from 'lucide-react';

type GlobalTab = 'all' | 'offices' | 'markets' | 'map' | 'testimonials';

export const GlobalPresencePage: React.FC = () => {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<GlobalTab>('all');

  useEffect(() => {
    const hash = location.hash.replace('#', '') as GlobalTab;
    if (['offices', 'markets', 'map', 'testimonials'].includes(hash)) {
      setActiveTab(hash);
    } else {
      setActiveTab('all');
    }
  }, [location.hash]);

  const handleTabChange = (tabId: GlobalTab) => {
    setActiveTab(tabId);
    if (tabId === 'all') {
      navigate('/global-presence', { replace: true });
    } else {
      navigate(`/global-presence#${tabId}`, { replace: true });
    }
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const tabs: { id: GlobalTab; label: { en: string; bn: string; zh?: string }; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: { en: 'All Global Operations', bn: 'সকল গ্লোবাল কার্যক্রম', zh: '全部全球运营' }, icon: Layers },
    { id: 'offices', label: { en: 'Registered Offices', bn: 'নিবন্ধিত কার্যালয়সমূহ', zh: '注册办事处' }, icon: Building2 },
    { id: 'markets', label: { en: 'Operating Markets', bn: 'কার্যক্রমের প্রধান বাজার', zh: '主要运营市场' }, icon: Globe },
    { id: 'map', label: { en: 'Interactive Map', bn: 'ইন্টারেক্টিভ ম্যাপ', zh: '互动网络地图' }, icon: Map },
    { id: 'testimonials', label: { en: 'Global Trust (18)', bn: 'বৈশ্বিক আস্থা (১৮)', zh: '全球合作伙伴评价 (18)' }, icon: MessageSquareQuote }
  ];

  return (
    <>
      <SEO 
        title="Global Presence"
        description="Sharabangla Group operates registered offices and trade hubs in Bangladesh, China, India, Dubai, Vietnam, Hong Kong, and Europe."
      />

      {/* Hero */}
      <section className="bg-[#06301A] text-white pt-28 pb-12 border-b border-[#1E9B4C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E9B4C] mb-3">
            <Link to="/" className="hover:underline text-slate-300">
              {lang === 'zh' ? '首页' : (lang === 'bn' ? 'হোম' : 'Home')}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span>{lang === 'zh' ? '全球布局' : (lang === 'bn' ? 'গ্লোবাল প্রেজেন্স' : 'Global Presence')}</span>
            {activeTab !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-500" />
                <span className="text-white capitalize font-bold">
                  {tabs.find(t => t.id === activeTab)?.label[lang] || tabs.find(t => t.id === activeTab)?.label.en}
                </span>
              </>
            )}
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-3">
            {activeTab === 'all' && (lang === 'zh' ? '全球注册办事处与跨国贸易枢纽' : (lang === 'bn' ? 'বিশ্বব্যাপী আমাদের রেজিস্টার্ড নেটওয়ার্ক' : 'Registered Offices & Global Trade Hubs'))}
            {activeTab === 'offices' && (lang === 'zh' ? '国际注册办事处名录' : (lang === 'bn' ? 'নিবন্ধিত আন্তর্জাতিক কার্যালয়সমূহ' : 'Registered Offices & Trade Hubs'))}
            {activeTab === 'markets' && (lang === 'zh' ? '主要运营市场与全球贸易覆盖' : (lang === 'bn' ? 'কার্যক্রমের আন্তর্জাতিক সোর্সিং বাজার' : 'Operating Markets & Regional Coverage'))}
            {activeTab === 'map' && (lang === 'zh' ? '交互式全球贸易足迹地图' : (lang === 'bn' ? 'ইন্টারেক্টিভ গ্লোবাল নেটওয়ার্ক ম্যাপ' : 'Interactive Global Trade Footprint Map'))}
            {activeTab === 'testimonials' && (lang === 'zh' ? '全球合作伙伴评价与信誉见证' : (lang === 'bn' ? 'বৈশ্বিক পার্টনার মতামত ও আস্থা' : 'Global Trust & Partner Testimonials'))}
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-3xl">
            {lang === 'zh'
              ? '战略性布局于亚洲主要供应链走廊、海湾合作委员会（GCC）贸易门户及欧美主流消费市场，全方位优化跨境供应链效能。'
              : (lang === 'bn'
                ? 'এশিয়ার সাপ্লাই করিডোর, মধ্যপ্রাচ্যের ট্রেড গেটওয়ে এবং পশ্চিমা কনজিউমার মার্কেটে কৌশলগতভাবে বিস্তৃত নেটওয়ার্ক।'
                : 'Strategically positioned across primary Asian supply corridors, GCC trade gateways, and Western consumer markets to streamline cross-border supply chains.')}
          </p>
        </div>
      </section>

      {/* Sticky Sub-Header Navigation */}
      <div className="sticky top-[72px] lg:top-[80px] z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8E4] shadow-xs py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const tabLabel = tab.label[lang] || tab.label.en;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0E5C2E] text-white shadow-sm ring-2 ring-[#0E5C2E]/20'
                      : 'bg-[#F6F8F7] text-[#5A6170] hover:bg-[#EAF6EE] hover:text-[#0E5C2E] border border-[#E2E8E4]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1E9B4C]' : 'text-[#5A6170]'}`} />
                  <span>{tabLabel}</span>
                </button>
              );
            })}
          </div>

          {activeTab !== 'all' && (
            <button
              onClick={() => handleTabChange('all')}
              className="text-xs font-extrabold text-[#0E5C2E] hover:text-[#1E9B4C] flex items-center gap-1 min-w-max pl-4 border-l border-[#E2E8E4] cursor-pointer"
            >
              <span>{lang === 'zh' ? '查看全部全球数据' : (lang === 'bn' ? 'সব বৈশ্বিক তথ্য দেখুন' : 'View All Global Data')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white min-h-[500px]">
        {/* Interactive Map */}
        {(activeTab === 'all' || activeTab === 'map') && (
          <div id="map" className="scroll-mt-28 border-b border-[#E2E8E4]">
            <S8_GlobalPresenceMap />
          </div>
        )}

        {/* Comprehensive Office & Market Directory */}
        {(activeTab === 'all' || activeTab === 'offices' || activeTab === 'markets') && (
          <section id="offices" className="py-16 bg-white text-[#2B2B2B] scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 id="markets" className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E] mb-8 scroll-mt-28">
                {activeTab === 'markets'
                  ? (lang === 'zh' ? '主要运营市场与国际贸易走廊' : (lang === 'bn' ? 'আন্তর্জাতিক সোর্সিং ও পরিচালিত বাজারসমূহ' : 'Operating Markets & Trade Corridors'))
                  : (lang === 'zh' ? '全球注册办事处与贸易枢纽完整名录' : (lang === 'bn' ? 'নিবন্ধিত আন্তর্জাতিক কার্যালয়সমূহ' : 'Complete Directory of Registered Offices & Hubs'))}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {globalLocations
                  .filter(loc => {
                    if (activeTab === 'offices') return true;
                    if (activeTab === 'markets') return (loc.marketsServed?.length || 0) > 0;
                    return true;
                  })
                  .map((loc) => (
                    <div
                      key={loc.id}
                      className="p-6 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8E4] mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{loc.flag}</span>
                            <h3 className="font-heading font-bold text-lg text-[#0E5C2E]">
                              {lang === 'zh' ? (loc.zhCity || loc.city) : (lang === 'bn' ? loc.banglaCity : loc.city)}
                            </h3>
                          </div>
                          <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-[#06301A] text-white">
                            {lang === 'zh' ? (loc.zhType || loc.type) : (lang === 'bn' ? loc.banglaType : loc.type)}
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs text-[#5A6170] mb-4">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-[#1E9B4C] shrink-0 mt-0.5" />
                            <span className="leading-relaxed">
                              {lang === 'zh' ? (loc.zhAddress || loc.address) : (lang === 'bn' ? loc.banglaAddress : loc.address)}
                            </span>
                          </div>
                          {loc.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-[#1E9B4C] shrink-0" />
                              <a href={`tel:${loc.phone.split('/')[0].trim()}`} className="hover:text-[#0E5C2E] hover:underline font-semibold text-[#2B2B2B]">
                                {loc.phone}
                              </a>
                            </div>
                          )}
                          {loc.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-[#1E9B4C] shrink-0" />
                              <a href={`mailto:${loc.email}`} className="text-[#0E5C2E] hover:text-[#1E9B4C] hover:underline font-semibold">
                                {loc.email}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E2E8E4] mt-2">
                        <span className="text-[10px] font-bold text-[#0E5C2E] uppercase tracking-wider block mb-1.5">
                          {lang === 'zh' ? '主要覆盖与服务区域：' : (lang === 'bn' ? 'প্রধান আওতাভুক্ত অঞ্চল:' : 'Primary Regional Coverage:')}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {(loc.marketsServed || []).map((m, i) => (
                            <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-[#E2E8E4] text-[#0E5C2E]">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Global Trust Testimonials Section */}
        {(activeTab === 'all' || activeTab === 'testimonials') && (
          <GlobalTrustTestimonials />
        )}
      </div>
    </>
  );
};
