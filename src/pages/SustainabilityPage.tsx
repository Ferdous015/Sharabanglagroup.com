import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';
import { csrInitiatives } from '../data/site';
import { 
  Leaf, 
  Droplets, 
  ChevronRight, 
  ShieldCheck, 
  HeartHandshake, 
  Scale, 
  Building2, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Award, 
  Globe2, 
  FileCheck2, 
  Recycle,
  Trees
} from 'lucide-react';

type SustainabilityTab = 'all' | 'environmental' | 'csr' | 'ethical' | 'governance';

export const SustainabilityPage: React.FC = () => {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<SustainabilityTab>('all');

  useEffect(() => {
    const hash = location.hash.replace('#', '') as SustainabilityTab;
    if (['environmental', 'csr', 'ethical', 'governance'].includes(hash)) {
      setActiveTab(hash);
    } else {
      setActiveTab('all');
    }
  }, [location.hash]);

  const handleTabChange = (tabId: SustainabilityTab) => {
    setActiveTab(tabId);
    if (tabId === 'all') {
      navigate('/sustainability', { replace: true });
    } else {
      navigate(`/sustainability#${tabId}`, { replace: true });
    }
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const tabs: { id: SustainabilityTab; label: { en: string; bn: string; zh: string }; icon: React.FC<{ className?: string }> }[] = [
    { 
      id: 'all', 
      label: { en: 'All Overview', bn: 'সকল বিবরণ', zh: '全景概览' }, 
      icon: Layers 
    },
    { 
      id: 'environmental', 
      label: { en: 'Environmental Responsibility', bn: 'পরিবেশগত দায়িত্ব', zh: '环境保护与生态责任' }, 
      icon: Leaf 
    },
    { 
      id: 'csr', 
      label: { en: 'Community & CSR Initiatives', bn: 'সামাজিক ও সিএসআর', zh: '社区发展与公益慈善' }, 
      icon: HeartHandshake 
    },
    { 
      id: 'ethical', 
      label: { en: 'Ethical Sourcing', bn: 'নৈতিক সোর্সিং', zh: '道德采购与责任供应链' }, 
      icon: Scale 
    },
    { 
      id: 'governance', 
      label: { en: 'Governance & Compliance', bn: 'সুশাসন ও কমপ্লায়েন্স', zh: '规范治理与国际合规' }, 
      icon: Building2 
    }
  ];

  return (
    <>
      <SEO 
        title={
          lang === 'zh'
            ? '可持续发展与企业社会责任 — 沙拉邦拉集团'
            : (lang === 'bn' ? 'টেকসই উন্নয়ন ও সিএসআর — শারাবাংলা গ্রুপ' : 'Sustainability & CSR — Sharabangla Group')
        }
        description={
          lang === 'zh'
            ? '探索沙拉邦拉集团的生态环保制造、可降解无纺布、乡村深水井扶持、道德采购及跨国合规治理体系。'
            : (lang === 'bn'
              ? 'শারাবাংলা গ্রুপের পরিবেশগত সুরক্ষা, ইকো-টেক্সটাইল উদ্ভাবন, গ্রামীণ সিএসআর ও নৈতিক সোর্সিং নীতি সম্পর্কে বিস্তারিত জানুন।'
              : 'Discover Sharabangla Group\'s environmental stewardship, eco-textile innovations, community CSR, and ethical governance programs.')
        }
      />

      {/* Hero Banner */}
      <section className="bg-[#06301A] text-white pt-28 pb-12 relative overflow-hidden border-b border-[#1E9B4C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E9B4C] mb-3">
            <Link to="/" className="hover:underline text-slate-300">
              {lang === 'bn' ? 'হোম' : (lang === 'zh' ? '首页' : 'Home')}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span>
              {lang === 'bn' ? 'টেকসই উন্নয়ন ও সিএসআর' : (lang === 'zh' ? '可持续发展与社会责任' : 'Sustainability & CSR')}
            </span>
            {activeTab !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-500" />
                <span className="text-white font-bold">
                  {tabs.find(t => t.id === activeTab)?.label[lang] || tabs.find(t => t.id === activeTab)?.label.en}
                </span>
              </>
            )}
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-3">
            {activeTab === 'all' && (
              lang === 'bn' 
                ? 'টেকসই উন্নয়ন, পরিবেশ সুরক্ষা ও সামাজিক দায়বদ্ধতা' 
                : (lang === 'zh' ? '绿色生态治理、社会责任与企业合规' : 'Environmental Stewardship, CSR & Governance')
            )}
            {activeTab === 'environmental' && (
              lang === 'bn' 
                ? 'পরিবেশগত দায়িত্ব ও টেকসই সবুজ উদ্ভাবন' 
                : (lang === 'zh' ? '环境保护与绿色生态创新' : 'Environmental Responsibility & Green Innovation')
            )}
            {activeTab === 'csr' && (
              lang === 'bn' 
                ? 'সামাজিক উন্নয়ন ও সিএসআর জনকল্যাণ কর্মসূচি' 
                : (lang === 'zh' ? '社区发展与企业社会责任 (CSR)' : 'Community Development & CSR Initiatives')
            )}
            {activeTab === 'ethical' && (
              lang === 'bn' 
                ? 'নৈতিক সোর্সিং ও দায়িত্বশীল সরবরাহ ব্যবস্থা' 
                : (lang === 'zh' ? '道德采购与负责任全球供应链' : 'Ethical Sourcing & Fair Supply Chain')
            )}
            {activeTab === 'governance' && (
              lang === 'bn' 
                ? 'কর্পোরেট সুশাসন, স্বচ্ছতা ও কমপ্লায়েন্স' 
                : (lang === 'zh' ? '公司规范治理、合规透明度与国际标准' : 'Corporate Governance, Compliance & Standards')
            )}
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'আমরা বিশ্বাস করি দীর্ঘমেয়াদী ব্যবসায়িক প্রবৃদ্ধির সাথে অবশ্যই স্থানীয় জনগোষ্ঠীর উন্নয়ন, পরিবেশ রক্ষা ও স্বচ্ছ সুশাসন নিশ্চিত করতে হবে। নন-ওভেন ইকো-টেক্সটাইল থেকে শুরু করে গ্রামীণ গভীর নলকূপ স্থাপন—টেকসই উন্নয়ন আমাদের মূল লক্ষ্য।'
              : (lang === 'zh'
                  ? '我们坚信长远的企业增长必须与繁荣地方社区、保护生态环境与践行合规治理并肩同行。从环保水刺无纺布科技到迈门辛乡村深水井援建工程，可持续发展已深深植根于集团的商业基因。'
                  : 'We believe long-term business growth must enrich communities, protect delicate ecosystems, and maintain institutional integrity across all global operations.')}
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
              <span>{lang === 'bn' ? 'সব বিভাগ একসাথে দেখুন' : (lang === 'zh' ? '查看全部概览' : 'View All Overview')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Dynamic Content Container */}
      <div className="bg-white min-h-[500px]">

        {/* 1. ENVIRONMENTAL RESPONSIBILITY SECTION */}
        {(activeTab === 'all' || activeTab === 'environmental') && (
          <section id="environmental" className="py-16 text-[#2B2B2B] scroll-mt-28 border-b border-[#E2E8E4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E9B4C]" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0E5C2E]">
                  {lang === 'bn' ? 'পরিবেশগত অঙ্গীকার ও সবুজ উদ্যোগ' : (lang === 'zh' ? '绿色生态治理与制造创新' : 'Environmental Responsibility & Green Innovation')}
                </span>
              </div>

              <div className="max-w-3xl mb-12">
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E] mb-3">
                  {lang === 'bn' ? 'আমাদের পরিবেশগত অঙ্গীকার ও সবুজ উদ্ভাবন' : (lang === 'zh' ? '绿色制造支柱与生态创新实践' : 'Our Environmental Pillars & Green Innovation')}
                </h2>
                <p className="text-[#5A6170] text-sm sm:text-base">
                  {lang === 'bn' 
                    ? 'বাংলাদেশ জুড়ে পরিবেশবান্ধব উৎপাদন, শূন্য-পলিমার প্যাকেজিং এবং টেকসই টেক্সটাইল প্রযুক্তির সূচনা।' 
                    : (lang === 'zh' 
                        ? '在孟加拉国全境率先开创生态环保工业制造、零塑料绿色包装与可循环纺织科技新范式。' 
                        : 'Pioneering eco-friendly manufacturing, zero-polymer packaging, and eco-textiles across Bangladesh.')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="p-8 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] transition-all">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 font-bold">
                    <Leaf className="w-6 h-6 text-[#1E9B4C]" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'জিরো-পলিমার ইকো প্যাকেজিং' : (lang === 'zh' ? '零塑料生态环保包装' : 'Zero-Polymer Eco Packaging')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'ফুমাও বাংলাদেশ টেকনোলজি কোং লিমিটেড ১০০% পুনর্ব্যবহারযোগ্য স্পানবন্ড নন-ওভেন ফ্যাব্রিক উৎপাদন করে, যা খুচরা ও কৃষি বাজারে একবার ব্যবহারযোগ্য পলিথিন ব্যাগের টেকসই বিকল্প।'
                      : (lang === 'zh'
                          ? '福茂孟加拉科技有限公司 (FuMao Bangladesh Technology Co., Ltd.) 研发制造100%可循环降解的纺粘无纺布新材料，在零售及农业流通领域全面替代一次性塑料薄膜与塑胶袋。'
                          : 'FuMao Bangladesh Technology Co., Ltd. produces 100% recyclable spunbond non-woven fabrics, replacing single-use poly-bags in retail and agricultural markets.')}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0E5C2E]">
                    <Recycle className="w-4 h-4 text-[#1E9B4C]" />
                    <span>{lang === 'bn' ? '১০০% পুনর্ব্যবহারযোগ্য ও বায়োডিগ্রেডেবল' : (lang === 'zh' ? '100% 可回收降解新材料' : '100% Recyclable Material')}</span>
                  </div>
                </div>

                <div className="p-8 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] transition-all">
                  <div className="w-12 h-12 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center mb-4 font-bold">
                    <Droplets className="w-6 h-6 text-[#1E9B4C]" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'বিশুদ্ধ পানি ও পরিবেশবান্ধব হাঁস খামার' : (lang === 'zh' ? '清洁饮水与生态鸭农扶助' : 'Clean Water & Duck Farming')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'হাঁসের পালক রপ্তানি থেকে অর্জিত আয়ের অংশ দিয়ে ময়মনসিংহের গ্রামীণ খামারি গ্রামে বিশুদ্ধ খাবার পানির অবকাঠামো ও স্বাস্থ্যসেবা কেন্দ্র স্থাপন।'
                      : (lang === 'zh'
                          ? '将沙拉邦拉天然鸭绒出口收益的固定比例专项再投资于迈门辛乡村养殖示范基地，援建太阳能深水水塔与村民基础医疗诊所。'
                          : 'Reinvesting duck down export revenues into clean drinking water infrastructure and healthcare facilities for rural farming villages in Mymensingh.')}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0E5C2E]">
                    <Sparkles className="w-4 h-4 text-[#1E9B4C]" />
                    <span>{lang === 'bn' ? 'সৌরবিদ্যুৎ চালিত গভীর নলকূপ' : (lang === 'zh' ? '太阳能动力深水净化水井' : 'Solar-Powered Deep Wells')}</span>
                  </div>
                </div>

                <div className="p-8 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] transition-all">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 text-[#0E5C2E] flex items-center justify-center mb-4 font-bold">
                    <ShieldCheck className="w-6 h-6 text-[#1E9B4C]" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'গ্রিন সাপ্লাই চেইন ও পরিবেশবান্ধব লজিস্টিকস' : (lang === 'zh' ? '绿色跨境低碳物流网络' : 'Green Supply Chain Logistics')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'শারাবাংলা এক্সপ্রেস গাড়ির রুট ঘনত্ব অপ্টিমাইজ করে গুয়াংঝু ও ঢাকার মধ্যকার বিমান ও সামুদ্রিক মালবাহী করিডোরে কার্বন নিঃসরণ হ্রাস করে।'
                      : (lang === 'zh'
                          ? 'Sharabangla Express 智能统筹末端派送路线密度与集货干线调度，持续降低中孟海空运国际物流走廊全链路的单位碳排放。'
                          : 'Sharabangla Express optimizes fleet route density, lowering carbon emissions across air and sea freight forwarding corridors between Guangzhou and Dhaka.')}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0E5C2E]">
                    <Trees className="w-4 h-4 text-[#1E9B4C]" />
                    <span>{lang === 'bn' ? 'কার্বন ফুটপ্রিন্ট হ্রাস কৌশল' : (lang === 'zh' ? '全链路低碳绿色减排' : 'Carbon Footprint Reduction')}</span>
                  </div>
                </div>
              </div>

              {/* Environmental Metrics Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#06301A] text-white border border-[#1E9B4C]/30">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1E9B4C]">100%</div>
                  <div className="text-xs text-slate-300 mt-1">
                    {lang === 'bn' ? 'পুনর্ব্যবহারযোগ্য স্পানবন্ড ফ্যাব্রিক' : (lang === 'zh' ? '水刺无纺布可循环率' : 'Recyclable Fabric')}
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1E9B4C]">25+</div>
                  <div className="text-xs text-slate-300 mt-1">
                    {lang === 'bn' ? 'গ্রামীণ সৌর ডিপ-টিউবওয়েল' : (lang === 'zh' ? '乡村太阳能深井援建' : 'Solar Deep Wells')}
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1E9B4C]">-28%</div>
                  <div className="text-xs text-slate-300 mt-1">
                    {lang === 'bn' ? 'লজিস্টিকস কার্বন অপ্টিমাইজেশন' : (lang === 'zh' ? '干线物流碳排放优化' : 'Fleet Carbon Optimization')}
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1E9B4C]">ISO 14001</div>
                  <div className="text-xs text-slate-300 mt-1">
                    {lang === 'bn' ? 'আন্তর্জাতিক পরিবেশ ব্যবস্থাপনা' : (lang === 'zh' ? '环境管理体系国际认证' : 'Environmental Management')}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. COMMUNITY & CSR INITIATIVES SECTION */}
        {(activeTab === 'all' || activeTab === 'csr') && (
          <section id="csr" className="py-16 bg-[#F6F8F7] scroll-mt-28 border-b border-[#E2E8E4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E9B4C]" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0E5C2E]">
                  {lang === 'bn' ? 'সামাজিক দায়বদ্ধতা ও সিএসআর' : (lang === 'zh' ? '社区发展与社会公益' : 'Community & CSR Initiatives')}
                </span>
              </div>

              <div className="max-w-3xl mb-12">
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E] mb-3">
                  {lang === 'bn' ? 'বাংলাদেশে প্রধান সিএসআর উদ্যোগসমূহ' : (lang === 'zh' ? '孟加拉国重点社会责任公益项目' : 'Featured CSR Projects in Bangladesh')}
                </h2>
                <p className="text-sm text-[#5A6170]">
                  {lang === 'bn'
                    ? 'বিশুদ্ধ পানি, শিক্ষা ও ক্ষুদ্র উদ্যোক্তা উন্নয়ন কর্মসূচির মাধ্যমে গ্রামীণ জনগোষ্ঠীর টেকসই ক্ষমতায়ন।'
                    : (lang === 'zh'
                        ? '通过清洁饮用水工程、女性数字技能提升与微型创业扶持计划，全面赋能基层乡村与实体经济。'
                        : 'Empowering rural communities through clean water, education, and micro-entrepreneurship programs.')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {csrInitiatives.map((csr) => (
                  <div key={csr.id} className="p-6 rounded-xl border border-[#E2E8E4] bg-white shadow-xs hover:border-[#1E9B4C] transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0E5C2E] flex items-center justify-center mb-4">
                        <HeartHandshake className="w-5 h-5 text-[#1E9B4C]" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                        {lang === 'bn' ? csr.banglaTitle : (lang === 'zh' ? (csr.zhTitle || csr.title) : csr.title)}
                      </h3>
                      <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                        {lang === 'bn' ? csr.banglaDesc : (lang === 'zh' ? (csr.zhDesc || csr.desc) : csr.desc)}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#E2E8E4] flex items-center gap-1.5 text-[11px] font-bold text-[#0E5C2E]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'সরাসরি তৃণমূল পর্যায়ের প্রভাব' : (lang === 'zh' ? '直接惠及基层社区' : 'Direct Grassroots Impact')}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Impact Highlights */}
              <div className="p-8 rounded-2xl bg-white border border-[#E2E8E4] grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-1 border-r border-[#E2E8E4] pr-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1E9B4C] mb-1">
                    {lang === 'bn' ? 'সিএসআর অনুদান নীতি' : (lang === 'zh' ? '收益再投资专项基金' : 'Reinvestment Fund')}
                  </div>
                  <h4 className="font-heading font-bold text-xl text-[#0E5C2E]">
                    {lang === 'bn' ? 'রপ্তানি আয়ের ২% গ্রামীণ উন্নয়নে' : (lang === 'zh' ? '出口利润的 2% 专项回馈乡村' : '2% Export Reinvestment')}
                  </h4>
                  <p className="text-xs text-[#5A6170] mt-2">
                    {lang === 'bn' 
                      ? 'শারাবাংলা ডাউন প্রোডাক্টস প্রতি বছর রপ্তানি আয়ের ২% সরাসরি ময়মনসিংহের খামারিদের স্বাস্থ্য ও স্যানিটেশনে প্রদান করে।' 
                      : (lang === 'zh' 
                          ? '沙拉邦拉羽绒制品每年将鸭绒出口利润的 2% 固定专项投入养殖基地乡村的清洁饮水与医疗保障。' 
                          : 'Sharabangla Down Products allocates 2% of annual export revenue directly into farming community sanitation.')}
                  </p>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0 md:pl-4">
                  <div className="p-4 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4]">
                    <Users className="w-5 h-5 text-[#1E9B4C] mb-2" />
                    <div className="font-bold text-sm text-[#0E5C2E]">
                      {lang === 'bn' ? '২,৫০০+ নারী উদ্যোক্তা ইনকিউবেশন' : (lang === 'zh' ? '2,500+ 女性数字创业扶持' : '2,500+ Women Digital Sellers')}
                    </div>
                    <p className="text-[11px] text-[#5A6170] mt-1">
                      {lang === 'bn' ? '৬৪টি জেলায় বিনামূল্যে ডিজিটাল স্টোর ও প্রশিক্ষণ।' : (lang === 'zh' ? '覆盖孟加拉国 64 个县区的线上开店免佣金与技能实训。' : 'Zero-commission onboarding and marketing bootcamps across 64 districts.')}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4]">
                    <Award className="w-5 h-5 text-[#1E9B4C] mb-2" />
                    <div className="font-bold text-sm text-[#0E5C2E]">
                      {lang === 'bn' ? '৫০,০০০+ ইকো-ব্যাগ বিতরণ' : (lang === 'zh' ? '50,000+ 环保袋免费捐赠' : '50,000+ Eco Bags Donated')}
                    </div>
                    <p className="text-[11px] text-[#5A6170] mt-1">
                      {lang === 'bn' ? 'পলিথিন বর্জ্য কমাতে বিভিন্ন পৌরবাজারে বিতরণ।' : (lang === 'zh' ? '免费发放至城市农贸与综合零售市场，淘汰一次性塑胶袋。' : 'Donated to municipal shopping centers to curb single-use plastics.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. ETHICAL SOURCING & RESPONSIBLE SUPPLY CHAIN */}
        {(activeTab === 'all' || activeTab === 'ethical') && (
          <section id="ethical" className="py-16 bg-white text-[#2B2B2B] scroll-mt-28 border-b border-[#E2E8E4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E9B4C]" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0E5C2E]">
                  {lang === 'bn' ? 'নৈতিক সোর্সিং ও দায়িত্বশীল ক্রয়নীতি' : (lang === 'zh' ? '道德采购与责任供应链' : 'Ethical Sourcing & Fair Trade')}
                </span>
              </div>

              <div className="max-w-3xl mb-12">
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E] mb-3">
                  {lang === 'bn' ? 'নৈতিক সোর্সিং ও দায়িত্বশীল সাপ্লাই চেইন' : (lang === 'zh' ? '道德采购、公平贸易与阳光供应链' : 'Ethical Sourcing & Fair Labor Standards')}
                </h2>
                <p className="text-[#5A6170] text-sm sm:text-base">
                  {lang === 'bn'
                    ? 'আমাদের সরবরাহ শৃঙ্খলে ন্যায্য মজুরি, নিরাপদ কর্মক্ষেত্র এবং পরিবেশের প্রতি দায়বদ্ধতা নিশ্চিত করতে আমরা আপসহীন।'
                    : (lang === 'zh'
                        ? '我们在跨国采购、工业加工与大宗贸易全流程中坚决执行公平劳工待遇、供应链全链条可追溯及人道主义养殖标准。'
                        : 'Enforcing zero-tolerance for unfair labor, complete supply chain traceability, and humane raw material sourcing across Asia.')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] transition-all">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 text-[#0E5C2E] flex items-center justify-center mb-4 font-bold">
                    <Scale className="w-6 h-6 text-[#1E9B4C]" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'শিশুশ্রম মুক্ত ও ন্যায্য মজুরি' : (lang === 'zh' ? '零童工与公平成长薪酬' : 'Zero Child Labor & Fair Pay')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'ফুমাও বাংলাদেশ টেকনোলজি কোং লিমিটেড এবং শারাবাংলা ডাউন প্রোডাক্টস কারখানায় আন্তর্জাতিক শ্রম সংস্থা (ILO) মান অনুযায়ী ১০০% প্রাপ্তবয়স্ক ও ন্যায্য পারিশ্রমিক নিশ্চিত করা হয়।'
                      : (lang === 'zh'
                          ? '福茂孟加拉科技有限公司与羽绒加工基地严格遵循国际劳工组织（ILO）公约，全面推行合法成年用工、具竞争力的基本工资与全额社保福利。'
                          : 'Both FuMao Bangladesh Technology Co., Ltd. and Sharabangla Down Products enforce zero underage labor with competitive living wages and verified social benefits.')}
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#2B2B2B]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'আইএলও (ILO) শ্রম মানদণ্ড' : (lang === 'zh' ? '符合国际劳工组织 ILO 标准' : 'ILO Labor Standard Compliance')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'লিঙ্গ বৈষম্যহীন কর্মপরিবেশ' : (lang === 'zh' ? '男女同工同酬与平等发展' : 'Equal Opportunity Workplace')}</span>
                    </li>
                  </ul>
                </div>

                <div className="p-8 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] transition-all">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 text-[#0E5C2E] flex items-center justify-center mb-4 font-bold">
                    <FileCheck2 className="w-6 h-6 text-[#1E9B4C]" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'সাপ্লায়ার কোড অব কন্ডাক্ট' : (lang === 'zh' ? '供应商合规行为准则' : 'Supplier Code of Conduct')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'চীন, ভারত ও বাংলাদেশের সকল সরবরাহকারীকে শারাবাংলার নৈতিক ক্রয়নীতি ও পরিবেশগত স্ট্যান্ডার্ড চুক্তি স্বাক্ষর করতে হয়।'
                      : (lang === 'zh'
                          ? '中、印、孟三国所有对接上游工厂与原料供应商均须签署严谨的《沙拉邦拉供应商行为准则》，接受常态化抽检。'
                          : 'All upstream factories and suppliers across China, India, and Bangladesh must formally certify adherence to our Ethical Procurement Charter.')}
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#2B2B2B]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'তৃতীয় পক্ষ অডিট যাচাইকরণ' : (lang === 'zh' ? '第三方定期飞行合规审计' : 'Third-Party Factory Audits')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'শতভাগ স্বচ্ছ সাপ্লাই চেইন' : (lang === 'zh' ? '阳光透明的采购与定价' : 'Transparent Sourcing Pipeline')}</span>
                    </li>
                  </ul>
                </div>

                <div className="p-8 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] transition-all">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 text-[#0E5C2E] flex items-center justify-center mb-4 font-bold">
                    <Globe2 className="w-6 h-6 text-[#1E9B4C]" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'দায়িত্বশীল পালক সংগ্রহ ও প্রসেসিং' : (lang === 'zh' ? '人道主义羽绒羽毛深加工' : 'Responsible Down Standards')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'শারাবাংলা ডাউন প্রোডাক্টস শুধুমাত্র খাদ্য প্রক্রিয়াজাতকরণের বাই-প্রোডাক্ট হিসেবে পালক সংগ্রহ করে, যা আন্তর্জাতিক অ্যানিমাল ওয়েলফেয়ার মানদণ্ড মেনে চলে।'
                      : (lang === 'zh'
                          ? '沙拉邦拉羽绒制品严格遵循负责任羽绒标准（RDS），所有原料仅从正规肉类禽类副产品中合规回收，坚决杜绝任何活体拔毛。'
                          : 'Adhering to Responsible Down Standard (RDS) principles: 100% sourced as certified food by-products with strict animal welfare verification.')}
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#2B2B2B]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'দায়িত্বশীল ডাউন স্ট্যান্ডার্ড (RDS)' : (lang === 'zh' ? '符合 RDS 责任羽绒标准' : 'RDS Aligned Verification')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'ভেটেরিনারি স্বাস্থ্য সনদপত্র' : (lang === 'zh' ? '官方出入境检验检疫卫生证书' : 'Veterinary Health Certified')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. GOVERNANCE & COMPLIANCE SECTION */}
        {(activeTab === 'all' || activeTab === 'governance') && (
          <section id="governance" className="py-16 bg-[#F6F8F7] text-[#2B2B2B] scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E9B4C]" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0E5C2E]">
                  {lang === 'bn' ? 'কর্পোরেট সুশাসন ও পরিচালনা নীতি' : (lang === 'zh' ? '公司治理与国际合规' : 'Governance & Compliance Framework')}
                </span>
              </div>

              <div className="max-w-3xl mb-12">
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E] mb-3">
                  {lang === 'bn' ? 'কর্পোরেট সুশাসন, স্বচ্ছতা ও বৈশ্বিক কমপ্লায়েন্স' : (lang === 'zh' ? '规范治理、透明审计与跨国合规' : 'Institutional Transparency & Global Compliance')}
                </h2>
                <p className="text-sm text-[#5A6170] leading-relaxed">
                  {lang === 'bn'
                    ? 'শারাবাংলা গ্রুপ বাংলাদেশ, চীন, ভারত এবং সংযুক্ত আরব আমিরাতে কঠোর আইনি কমপ্লায়েন্স, আন্তর্জাতিক কর নিরীক্ষা, মুদ্রা ঝুঁকি ব্যবস্থাপনা এবং দুর্নীতিবিরোধী প্রোটোকল মেনে চলে।'
                    : (lang === 'zh'
                        ? '沙拉邦拉集团全面执行高标准的现代企业治理准则，在所有下属业务板块严格践行法定税务合规申报、外汇锁汇风险对冲、生态环保标准及反商业贿赂合规。'
                        : 'Operating under strict corporate governance standards that mandate legal compliance, international tax reporting, currency hedging risk management, and anti-bribery safeguards.')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-white border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] transition-all">
                  <ShieldCheck className="w-8 h-8 text-[#1E9B4C] mb-4" />
                  <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'অডিট ও আর্থিক স্বচ্ছতা' : (lang === 'zh' ? '严格审计与财务内控' : 'Audit & Financial Oversight')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'কঠোর অভ্যন্তরীণ নিরীক্ষা ও স্বাধীন বহিঃনিরীক্ষার মাধ্যমে ৪টি দেশের অফিসেই আন্তর্জাতিক আর্থিক প্রতিবেদন মানদণ্ড (IFRS) বজায় রাখা হয়।'
                      : (lang === 'zh'
                          ? '严格的内部审计制度与第三方权威会计事务所审计，确保在中、孟、印、阿四国严格遵循国际财务报告准则 (IFRS)。'
                          : 'Rigorous internal audit routines and external reviews ensure compliance with International Financial Reporting Standards (IFRS) in Bangladesh, China, India, and UAE.')}
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#2B2B2B]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'স্বচ্ছ কর ও অডিট ট্রেইল' : (lang === 'zh' ? '合规透明的税务与审计底稿' : 'Clean Tax & Audit Trail')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'কারেন্সি হেজিং প্রোটোকল' : (lang === 'zh' ? '跨国外汇锁汇风控机制' : 'Currency Hedging Protocol')}</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl bg-white border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] transition-all">
                  <Building2 className="w-8 h-8 text-[#1E9B4C] mb-4" />
                  <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'আইনি স্বীকৃতি ও কাস্টমস লাইসেন্স' : (lang === 'zh' ? '全域跨国资质与合法合规' : 'Cross-Border Legal Standing')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'গুয়াংঝু, কলকাতা, দুবাই এবং ঢাকায় সম্পূর্ণ নিবন্ধিত বাণিজ্যিক লাইসেন্স, কাস্টমস ক্লিয়ারেন্স কোড এবং কর শনাক্তকরণ নম্বর।'
                      : (lang === 'zh'
                          ? '在中国广州、印度加尔各答、阿联酋迪拜及孟加拉达卡均持有合规工商注册牌照、海关进出口收发货人代码及完备的税务登记。'
                          : 'Fully registered trade licenses, customs clearance codes, and tax identification numbers in Guangzhou, Kolkata, Dubai, and Dhaka.')}
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#2B2B2B]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? '১০০% আইনি নিবন্ধন' : (lang === 'zh' ? '100% 官方合法正规注册' : '100% Legal Registration')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'কাস্টমস ক্লিয়ারেন্স অনুমোদন' : (lang === 'zh' ? '海关进出口快速通关授权' : 'Customs Clearance Authorization')}</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl bg-white border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] transition-all">
                  <Award className="w-8 h-8 text-[#1E9B4C] mb-4" />
                  <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'ঘুষবিরোধী ও কমপ্লায়েন্স নীতি' : (lang === 'zh' ? '反商业贿赂与廉洁运营' : 'Anti-Bribery & Compliance')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'ঘুষবিরোধী, মানিলন্ডারিং প্রতিরোধ (এএমএল) এবং হাঁসের পালক প্রক্রিয়াকরণ ও টেক্সটাইল উৎপাদনের ক্ষেত্রে শ্রম নীতিতে আপসহীন অবস্থান।'
                      : (lang === 'zh'
                          ? '在反商业贿赂、反洗钱（AML）以及羽绒加工和无纺布制造中的劳工伦理保障方面恪守零容忍原则。'
                          : 'Zero-tolerance policies regarding bribery, anti-money laundering (AML), and ethical governance in corporate operations.')}
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#2B2B2B]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'এএমএল ও এফসিপিএ নীতি' : (lang === 'zh' ? '反洗钱与国际反海外腐败法准则' : 'AML & Global Anti-Corruption')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'হুইসलब्লোয়ার সুরক্ষা প্রটোকল' : (lang === 'zh' ? '内部举报人保护机制' : 'Whistleblower Protection')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

      </div>
    </>
  );
};
