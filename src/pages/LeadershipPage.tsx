import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';
import { S9_LeadershipGrid } from '../components/home/S9_LeadershipGrid';
import { S10_ChairmanMessage } from '../components/home/S10_ChairmanMessage';
import { S10B_ManagingDirectorMessage } from '../components/home/S10B_ManagingDirectorMessage';
import { S10C_DirectorMessages } from '../components/home/S10C_DirectorMessages';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  AlertCircle, 
  ChevronRight,
  UserCheck,
  Layers,
  ArrowRight
} from 'lucide-react';

type LeadershipTab = 'all' | 'board' | 'chairman' | 'governance';

export const LeadershipPage: React.FC = () => {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<LeadershipTab>('all');

  useEffect(() => {
    const hash = location.hash.replace('#', '') as LeadershipTab;
    if (['board', 'chairman', 'governance'].includes(hash)) {
      setActiveTab(hash);
    } else {
      setActiveTab('all');
    }
  }, [location.hash]);

  const handleTabChange = (tabId: LeadershipTab) => {
    setActiveTab(tabId);
    if (tabId === 'all') {
      navigate('/leadership', { replace: true });
    } else {
      navigate(`/leadership#${tabId}`, { replace: true });
    }
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const tabs: { id: LeadershipTab; label: { en: string; bn: string; zh?: string }; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: { en: 'All Leadership', bn: 'সকল নেতৃত্ব তথ্য', zh: '全体领导层' }, icon: Layers },
    { id: 'board', label: { en: 'Board of Directors', bn: 'বোর্ড অব ডিরেক্টর্স', zh: '董事会' }, icon: Users },
    { id: 'chairman', label: { en: 'Chairman & Managing Director', bn: 'চেয়ারম্যান ও ব্যবস্থাপনা পরিচালক', zh: '董事长与董事总经理' }, icon: UserCheck },
    { id: 'governance', label: { en: 'Governance Committees', bn: 'গভর্নেন্স কমিটি', zh: '治理委员会' }, icon: ShieldCheck }
  ];

  return (
    <>
      <SEO 
        title="Leadership & Governance"
        description="Meet the Board of Directors and Executive Officers guiding Sharabangla Group's multinational expansion."
      />

      {/* Hero */}
      <section className="bg-[#06301A] text-white pt-28 pb-12 border-b border-[#1E9B4C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E9B4C] mb-3">
            <Link to="/" className="hover:underline text-slate-300">
              {lang === 'bn' ? 'হোম' : (lang === 'zh' ? '首页' : 'Home')}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span>{lang === 'bn' ? 'নেতৃত্ব' : (lang === 'zh' ? '领导团队' : 'Leadership')}</span>
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
            {activeTab === 'all' && (lang === 'bn' ? 'আমাদের পরিচালনা পর্ষদ ও নেতৃত্ব' : (lang === 'zh' ? '董事会与公司治理' : 'Board of Directors & Governance'))}
            {activeTab === 'board' && (lang === 'bn' ? 'বোর্ড অব ডিরেক্টর্স ও পরিচালনা পর্ষদ' : (lang === 'zh' ? '董事会与高管团队' : 'Board of Directors'))}
            {activeTab === 'chairman' && (lang === 'bn' ? 'চেয়ারম্যান ও ব্যবস্থাপনা পরিচালকের বক্তব্য' : (lang === 'zh' ? '董事长与董事总经理致辞' : 'Chairman & Managing Director Message'))}
            {activeTab === 'governance' && (lang === 'bn' ? 'কর্পোরেট সুশাসন ও তদারকি কমিটি' : (lang === 'zh' ? '治理委员会' : 'Governance & Oversight Committees'))}
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-3xl">
            {lang === 'bn'
              ? 'শারাবাংলা গ্রুপ একটি নৈতিক পরিচালনা পর্ষদ দ্বারা পরিচালিত যা সুশাসন, আন্তঃসীমান্ত আর্থিক জবাবদিহিতা এবং দীর্ঘমেয়াদী মূল্য সৃষ্টিতে অঙ্গীকারবদ্ধ।'
              : (lang === 'zh'
                  ? '沙拉邦拉集团由恪守商业道德、强化跨境财务透明度并致力于创造长远价值的董事会卓越引领。'
                  : 'Sharabangla Group is governed by a board committed to ethical governance, cross-border financial accountability, and long-term value creation.')}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#1E9B4C]/20 border border-[#1E9B4C]/40 text-emerald-200 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 text-[#1E9B4C]" />
            <span>
              {lang === 'bn'
                ? 'নোট: নির্বাহী প্রোফাইলগুলি খসড়া স্থানধারক যা ক্লায়েন্টের চূড়ান্ত আপডেটের অপেক্ষায় রয়েছে।'
                : (lang === 'zh'
                    ? '注：高管档案为预览版，待客户最终审核确认。'
                    : 'Note: Executive profiles are draft placeholders awaiting client final updates.')}
            </span>
          </div>
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
              <span>{lang === 'bn' ? 'সব নেতৃত্ব একসাথে দেখুন' : (lang === 'zh' ? '查看全体领导层' : 'View All Leadership')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white min-h-[500px]">
        {/* BOARD OF DIRECTORS GRID */}
        {(activeTab === 'all' || activeTab === 'board') && (
          <div id="board" className="scroll-mt-28 border-b border-[#E2E8E4]">
            <S9_LeadershipGrid />
          </div>
        )}

        {/* CHAIRMAN & MANAGING DIRECTOR MESSAGES */}
        {(activeTab === 'all' || activeTab === 'chairman') && (
          <div id="chairman" className="scroll-mt-28 border-b border-[#E2E8E4]">
            <S10_ChairmanMessage />
            <S10B_ManagingDirectorMessage />
            <S10C_DirectorMessages />
          </div>
        )}

        {/* GOVERNANCE COMMITTEES */}
        {(activeTab === 'all' || activeTab === 'governance') && (
          <section id="governance" className="py-20 bg-white text-[#2B2B2B] scroll-mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-heading font-extrabold text-3xl text-[#0E5C2E]">
                  {lang === 'bn' ? 'কর্পোরেট সুশাসন ও তদারকি কমিটি' : (lang === 'zh' ? '公司治理与监督委员会' : 'Governance & Oversight Committees')}
                </h2>
                <p className="text-sm text-[#5A6170] mt-2">
                  {lang === 'bn' 
                    ? 'আন্তর্জাতিক আর্থিক প্রতিবেদন মান (আইএফআরএস), কর বিধি ও বাণিজ্য আইন কঠোরভাবে মেনে চলা নিশ্চিত করা।'
                    : (lang === 'zh' 
                        ? '确保全面遵守国际财务报告准则（IFRS）、税务法规及跨国贸易法律。' 
                        : 'Ensuring compliance with international financial reporting standards (IFRS), tax regulations, and trade laws.')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4]">
                  <ShieldCheck className="w-8 h-8 text-[#1E9B4C] mb-4" />
                  <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'অডিট ও ঝুঁকি কমিটি' : (lang === 'zh' ? '审计与风险控制委员会' : 'Audit & Risk Committee')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed">
                    {lang === 'bn'
                      ? '৪টি নিবন্ধিত অফিস অঞ্চলে আর্থিক প্রকাশ, মুদ্রা ঝুঁকি নিয়ন্ত্রণ এবং অভ্যন্তরীণ নিরীক্ষার স্বাধীন তদারকি।'
                      : (lang === 'zh'
                          ? '对分布于4个司法管辖区的注册办事处实施独立的财务披露审查、汇率风险对冲及内部控制监督。'
                          : 'Independent oversight of financial disclosures, currency risk hedging, and internal controls across all 4 registered office jurisdictions.')}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4]">
                  <Award className="w-8 h-8 text-[#1E9B4C] mb-4" />
                  <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'নীতি ও সম্মতি কমিটি' : (lang === 'zh' ? '商业道德与合规委员会' : 'Ethics & Compliance')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed">
                    {lang === 'bn'
                      ? 'ঘুষবিরোধী, মানিলন্ডারিং প্রতিরোধ (এএমএল) এবং হাঁসের পালক প্রক্রিয়াকরণ ও টেক্সটাইল উৎপাদনের ক্ষেত্রে শ্রম নীতিতে আপসহীন অবস্থান।'
                      : (lang === 'zh'
                          ? '在反商业贿赂、反洗钱（AML）以及羽绒加工和无纺布制造中的劳工伦理保障方面恪守零容忍原则。'
                          : 'Zero-tolerance policies regarding bribery, anti-money laundering (AML), and labor ethics in duck feather processing and fabric manufacturing.')}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4]">
                  <Users className="w-8 h-8 text-[#1E9B4C] mb-4" />
                  <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'মনোনয়ন ও পারিশ্রমিক কমিটি' : (lang === 'zh' ? '提名与薪酬委员会' : 'Nomination & Remuneration')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed">
                    {lang === 'bn'
                      ? 'পারফরম্যান্স-ভিত্তিক প্রণোদনার মাধ্যমে গুয়াংজু, কলকাতা, দুবাই এবং ঢাকায় বৈশ্বিক নেতৃত্ব প্রতিভা বিকাশ।'
                      : (lang === 'zh'
                          ? '通过绩效挂钩的激励机制，在广州、加尔各答、迪拜和达卡培育与吸引全球高级管理人才。'
                          : 'Fostering global leadership talent across Guangzhou, Kolkata, Dubai, and Dhaka with performance-aligned incentives.')}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};
