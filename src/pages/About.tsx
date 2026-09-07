import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';
import { S11_VisionMissionValues } from '../components/home/S11_VisionMissionValues';
import { S12_OurJourneyTimeline } from '../components/home/S12_OurJourneyTimeline';
import { S10_ChairmanMessage } from '../components/home/S10_ChairmanMessage';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Globe2, 
  ChevronRight,
  BookOpen,
  Target,
  UserCheck,
  History,
  Layers,
  ArrowRight
} from 'lucide-react';

type AboutTab = 'all' | 'story' | 'vision' | 'governance' | 'chairman' | 'timeline';

export const About: React.FC = () => {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<AboutTab>('all');

  useEffect(() => {
    const hash = location.hash.replace('#', '') as AboutTab;
    if (['story', 'vision', 'governance', 'chairman', 'timeline'].includes(hash)) {
      setActiveTab(hash);
    } else {
      setActiveTab('all');
    }
  }, [location.hash]);

  const handleTabChange = (tabId: AboutTab) => {
    setActiveTab(tabId);
    if (tabId === 'all') {
      navigate('/about', { replace: true });
    } else {
      navigate(`/about#${tabId}`, { replace: true });
    }
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const tabs: { id: AboutTab; label: { en: string; bn: string; zh?: string }; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: { en: 'All Overview', bn: 'সকল বিবরণ', zh: '全景概览' }, icon: Layers },
    { id: 'story', label: { en: 'Our Story', bn: 'আমাদের গল্প', zh: '集团历程' }, icon: BookOpen },
    { id: 'vision', label: { en: 'Vision · Mission · Values', bn: 'ভিশন · মিশন · মূল্যবোধ', zh: '愿景 · 使命 · 价值观' }, icon: Target },
    { id: 'governance', label: { en: 'Corporate Governance', bn: 'কর্পোরেট সুশাসন', zh: '公司治理' }, icon: ShieldCheck },
    { id: 'chairman', label: { en: "Chairman's Message", bn: 'চেয়ারম্যানের বক্তব্য', zh: '董事长致辞' }, icon: UserCheck },
    { id: 'timeline', label: { en: 'Our Journey', bn: 'আমাদের পথচলা', zh: '发展历程' }, icon: History }
  ];

  return (
    <>
      <SEO 
        title="About Us — Corporate Profile & Governance"
        description="Learn about Sharabangla Group's journey from a national marketplace to an international business group operating across Bangladesh, China, India, and Dubai."
      />

      {/* Hero Banner */}
      <section className="bg-[#06301A] text-white pt-28 pb-12 relative overflow-hidden border-b border-[#1E9B4C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E9B4C] mb-3">
            <Link to="/" className="hover:underline text-slate-300">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span>About Us</span>
            {activeTab !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-500" />
                <span className="text-white capitalize font-bold">
                  {tabs.find(t => t.id === activeTab)?.label[lang] || tabs.find(t => t.id === activeTab)?.label.en}
                </span>
              </>
            )}
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-3 max-w-4xl">
            {activeTab === 'all' && (lang === 'bn' ? 'আমাদের ইতিহাস ও কৌশলগত রূপরেখা' : (lang === 'zh' ? '集团历程与战略治理' : 'Our Story & Strategic Governance'))}
            {activeTab === 'story' && (lang === 'bn' ? 'আমাদের ইতিহাস ও কর্পোরেট যাত্রা' : (lang === 'zh' ? '发展历程与企业故事' : 'Our Story & Corporate History'))}
            {activeTab === 'vision' && (lang === 'bn' ? 'ভিশন, মিশন ও মূল্যবোধ' : (lang === 'zh' ? '愿景、使命与核心价值观' : 'Vision, Mission & Core Values'))}
            {activeTab === 'governance' && (lang === 'bn' ? 'কর্পোরেট সুশাসন ও পরিচালনা নীতি' : (lang === 'zh' ? '公司治理与合规体系' : 'Corporate Governance & Integrity'))}
            {activeTab === 'chairman' && (lang === 'bn' ? 'চেয়ারম্যানের বার্তা ও দিকনির্দেশনা' : (lang === 'zh' ? '董事长前瞻致辞' : 'Chairman’s Visionary Message'))}
            {activeTab === 'timeline' && (lang === 'bn' ? 'আমাদের গুরুত্বপূর্ণ মাইলফলক ও সময়রেখা' : (lang === 'zh' ? '重要发展里程碑' : 'Our Corporate Milestones'))}
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-3xl leading-relaxed">
            Connecting Bangladeshi enterprise to international trade corridors through transparency, technology, and 7 specialized operating concerns across Bangladesh, China, India, and Dubai.
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

      {/* Dynamic Content Container */}
      <div className="bg-white min-h-[500px]">
        {/* 1. OUR STORY SECTION */}
        {(activeTab === 'all' || activeTab === 'story') && (
          <section id="story" className="py-16 text-[#2B2B2B] scroll-mt-28 border-b border-[#E2E8E4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E9B4C]" />
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#0E5C2E]">
                  {lang === 'bn' ? 'আমাদের গল্প ও কর্পোরেট পরিচিতি' : (lang === 'zh' ? '企业发展故事与概况' : 'Corporate Overview & History')}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7">
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E] mb-6">
                    {lang === 'bn' 
                      ? 'স্বচ্ছতা ও প্রযুক্তির ভিত্তিতে গড়ে ওঠা দ্রুত বর্ধনশীল বহুজাতিক প্রতিষ্ঠান'
                      : (lang === 'zh'
                          ? '以高度透明度与前沿科技为基石的快速成长型跨国产业集团'
                          : 'A Fast-Growing Conglomerate Built on Transparency & Technology')}
                  </h3>
                  <div className="space-y-4 text-[#5A6170] text-sm sm:text-base leading-relaxed mb-8">
                    <p>
                      {lang === 'bn'
                        ? 'শারাবাংলা গ্রুপ হলো ঢাকা, বাংলাদেশে সদর দপ্তর এবং গুয়াংঝু (চীন), কলকাতা (ভারত) এবং দুবাই (সংযুক্ত আরব আমিরাত)-এ নিবন্ধিত আন্তর্জাতিক হাব বিশিষ্ট একটি সমন্বিত কর্পোরেট হোল্ডিং।'
                        : (lang === 'zh'
                            ? 'SHARABANGLA GROUP（沙拉邦拉集团）总部设立于孟加拉国达卡，并在中国广州、印度加尔各答及阿联酋迪拜设立并运营合规的跨国业务中枢与清关办事处。'
                            : 'SHARABANGLA GROUP is a holding structure headquartered in Dhaka, Bangladesh, with registered operating hubs in Guangzhou (China), Kolkata (India), and Dubai (UAE).')}
                    </p>
                    <p>
                      {lang === 'bn'
                        ? 'আমাদের ব্যবসায়িক পোর্টফোলিওতে রয়েছে শীর্ষস্থানীয় ই-কমার্স প্ল্যাটফর্ম (Sharabangla.com, Laobaan Bangladesh, Shenova), এক্সপ্রেস এয়ার ও সি ফ্রেইট (Sharabangla Express), বাণিজ্যিক ট্রেডিং (BAC Venture), রপ্তানিমুখী হাঁসের পালক প্রক্রিয়াকরণ (Sharabangla Down Products) এবং যৌথ উদ্যোগে পরিচালিত টেকনিক্যাল টেক্সটাইল কারখানা (FuMao Bangladesh Technology Co., Ltd.)।'
                        : (lang === 'zh'
                            ? '集团产业矩阵涵盖旗舰级跨境电商与 B2B 贸易平台（Sharabangla.com、Laobaan Bangladesh、Shenova）、国际航空及海运极速专线（Sharabangla Express）、大宗物资外贸（BAC Venture）、高品质出口级羽绒羽毛深加工（Sharabangla Down Products）以及中孟合资环保无纺布高新制造（FuMao Bangladesh Technology Co., Ltd. 福茂孟加拉科技有限公司）。'
                            : 'Our portfolio includes flagship e-commerce platforms (Sharabangla.com, Laobaan Bangladesh, Shenova), express freight forwarding (Sharabangla Express), merchant trading (BAC Venture), export feather processing (Sharabangla Down Products), and joint-venture technical textile manufacturing (FuMao Bangladesh Technology Co., Ltd.).')}
                    </p>
                    <p>
                      {lang === 'bn'
                        ? 'সকল সদস্য প্রতিষ্ঠানে আইনি কমপ্লায়েন্স, আর্থিক শৃঙ্খলা এবং ক্লাউড প্রযুক্তি কাঠামোর প্রমিতকরণের মাধ্যমে আমরা নিশ্চিত করি প্রতিটি আন্তঃসীমান্ত চুক্তি যেন দ্রুত ও নির্ভুলভাবে সম্পন্ন হয়।'
                        : (lang === 'zh'
                            ? '通过在全集团各成员企业严格推行法定合规标准、财务透明清算与云端数字化协同，我们确保每一单跨国经贸与物流履约均具备极致的时效与履约确定性。'
                            : 'By standardizing legal compliance, financial integrity, and cloud technology across all concerns, we ensure that every cross-border deal operates with speed and certainty.')}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4]">
                      <div className="font-heading font-bold text-2xl text-[#0E5C2E]">2015</div>
                      <div className="text-xs text-[#5A6170]">
                        {lang === 'bn' ? 'ঢাকায় প্রতিষ্ঠিত' : (lang === 'zh' ? '始于达卡创业起步' : 'Established in Dhaka')}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4]">
                      <div className="font-heading font-bold text-2xl text-[#0E5C2E]">
                        {lang === 'bn' ? '৭টি প্রতিষ্ঠান' : (lang === 'zh' ? '7 大核心业务' : '7 Concerns')}
                      </div>
                      <div className="text-xs text-[#5A6170]">
                        {lang === 'bn' ? 'সরাসরি সাবসিডিয়ারি' : (lang === 'zh' ? '全资及合资成员实体' : 'Direct Subsidiaries')}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4]">
                      <div className="font-heading font-bold text-2xl text-[#0E5C2E]">
                        {lang === 'bn' ? '৪টি দেশ' : (lang === 'zh' ? '4 个国家' : '4 Countries')}
                      </div>
                      <div className="text-xs text-[#5A6170]">
                        {lang === 'bn' ? 'গ্লোবাল অপারেটিং হাব' : (lang === 'zh' ? '全球核心运营中枢' : 'Global Operating Hubs')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E2E8E4]">
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
                      alt="Sharabangla Corporate Headquarters"
                      className="w-full h-80 sm:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06301A]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#1E9B4C]">
                        {lang === 'bn' ? 'ঢাকা হেডকোয়ার্টার্স' : (lang === 'zh' ? '达卡全球总部' : 'DHAKA HQ')}
                      </div>
                      <div className="text-sm font-semibold">
                        {lang === 'bn' 
                          ? 'শারাবাংলা কর্পোরেট হেডকোয়ার্টার্স, ঢাকা, বাংলাদেশ' 
                          : (lang === 'zh' 
                              ? '沙拉邦拉集团全球总部 · 孟加拉国达卡' 
                              : 'Sharabangla Corporate Headquarters, Dhaka, Bangladesh')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. VISION, MISSION & VALUES SECTION */}
        {(activeTab === 'all' || activeTab === 'vision') && (
          <div id="vision" className="scroll-mt-28 border-b border-[#E2E8E4]">
            <S11_VisionMissionValues />
          </div>
        )}

        {/* 3. CORPORATE GOVERNANCE SECTION */}
        {(activeTab === 'all' || activeTab === 'governance') && (
          <section id="governance" className="py-16 bg-[#F6F8F7] border-b border-[#E2E8E4] scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E9B4C]" />
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#0E5C2E]">
                  {lang === 'bn' ? 'কর্পোরেট সুশাসন ও পরিচালনা নীতি' : (lang === 'zh' ? '公司治理与合规监督体系' : 'Corporate Governance & Compliance Framework')}
                </h2>
              </div>

              <div className="max-w-3xl mb-12">
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E] mb-3">
                  {lang === 'bn' 
                    ? 'স্বচ্ছতা, নৈতিক বাধ্যবাধকতা ও আইনি মানদণ্ড' 
                    : (lang === 'zh'
                        ? '高度制度化透明度与财务合规风控'
                        : 'Institutional Transparency & Financial Integrity')}
                </h3>
                <p className="text-sm text-[#5A6170] leading-relaxed">
                  {lang === 'bn'
                    ? 'শারাবাংলা গ্রুপ কঠোর কর্পোরেট সুশাসন কাঠামোর অধীনে কাজ করে, যা সকল সহযোগী প্রতিষ্ঠানে আইনি কমপ্লায়েন্স, আন্তর্জাতিক কর নিরীক্ষা, মুদ্রা ঝুঁকি ব্যবস্থাপনা এবং কর্মক্ষেত্রের সুরক্ষা নিশ্চিত করে।'
                    : (lang === 'zh'
                        ? '沙拉邦拉集团全面执行高标准的现代企业治理准则，在所有下属业务板块严格践行法定税务合规申报、外汇锁汇风险对冲、生态环保标准及安全生产保障。'
                        : 'Sharabangla Group operates strictly under corporate governance standards that mandate legal compliance, international tax reporting, currency hedging risk management, and workplace safety across all operating concerns.')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-white border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] transition-all">
                  <ShieldCheck className="w-8 h-8 text-[#1E9B4C] mb-4" />
                  <h4 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'অডিট ও আর্থিক তদারকি' : (lang === 'zh' ? '严格审计与财务内控' : 'Audit & Financial Oversight')}
                  </h4>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'কঠোর অভ্যন্তরীণ নিরীক্ষা ও স্বাধীন বহিঃনিরীক্ষার মাধ্যমে বাংলাদেশ, চীন, ভারত এবং সংযুক্ত আরব আমিরাতে আন্তর্জাতিক আর্থিক প্রতিবেদন মানদণ্ড (IFRS) বজায় রাখা হয়।'
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
                  <Award className="w-8 h-8 text-[#1E9B4C] mb-4" />
                  <h4 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'নৈতিক সোর্সিং ও শ্রম মানদণ্ড' : (lang === 'zh' ? '道德采购与劳工权益保障' : 'Ethical Sourcing & Labor Standards')}
                  </h4>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'হাঁসের পালক প্রক্রিয়াকরণ ও গার্মেন্টস টেক্সটাইল উৎপাদনে শিশুশ্রম, পরিবেশ দূষণ বা নিম্নমানের কাজের পরিবেশের বিরুদ্ধে শূন্য-সহনশীলতা নীতি।'
                      : (lang === 'zh'
                          ? '在羽绒深加工与纺织制造领域坚决执行零童工、零环境污染排放及高标准员工劳保的零容忍合规政策。'
                          : 'Zero-tolerance policy for underage labor, environmental non-compliance, or substandard working conditions in feather processing and garment production.')}
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#2B2B2B]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'ন্যায্য মজুরি ও শ্রম কমপ্লায়েন্স' : (lang === 'zh' ? '公平成长薪酬与劳工福利' : 'Fair Wage & Labor Compliance')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'পরিবেশবান্ধব সার্টিফাইড প্রক্রিয়াকরণ' : (lang === 'zh' ? '绿色生态认证加工制造' : 'Eco-Certified Processing')}</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl bg-white border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] transition-all">
                  <Globe2 className="w-8 h-8 text-[#1E9B4C] mb-4" />
                  <h4 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'আন্তঃসীমান্ত আইনি স্বীকৃতি' : (lang === 'zh' ? '全域跨国资质与合法合规' : 'Cross-Border Legal Standing')}
                  </h4>
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
              </div>
            </div>
          </section>
        )}

        {/* 4. CHAIRMAN MESSAGE SECTION */}
        {(activeTab === 'all' || activeTab === 'chairman') && (
          <div id="chairman" className="scroll-mt-28 border-b border-[#E2E8E4]">
            <S10_ChairmanMessage />
          </div>
        )}

        {/* 5. JOURNEY TIMELINE SECTION */}
        {(activeTab === 'all' || activeTab === 'timeline') && (
          <div id="timeline" className="scroll-mt-28">
            <S12_OurJourneyTimeline />
          </div>
        )}
      </div>
    </>
  );
};
