import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';
import { openPositions as fallbackOpenPositions, JobPosition } from '../data/site';
import { getJobsFromFirestore } from '../services/jobsService';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Globe, 
  Sparkles, 
  ChevronRight, 
  Trophy, 
  Banknote, 
  Users, 
  Calendar,
  Layers,
  HeartHandshake,
  GraduationCap,
  ShieldCheck,
  Plane,
  Building2,
  Filter,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { ApplicationModal } from '../components/careers/ApplicationModal';
import { JoinUsSection } from '../components/careers/JoinUsSection';
import { formatDeadlineForDisplay } from '../utils/dateUtils';

type CareerTab = 'all' | 'culture' | 'benefits' | 'openings';

export const CareersPage: React.FC = () => {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<CareerTab>('all');
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [jobsList, setJobsList] = useState<JobPosition[]>(fallbackOpenPositions);
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(true);

  // Fetch live jobs directly from Firestore on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchJobs() {
      try {
        const firestoreJobs = await getJobsFromFirestore();
        if (isMounted) {
          if (firestoreJobs && firestoreJobs.length > 0) {
            setJobsList(firestoreJobs);
          } else {
            // If Firestore collection is empty, use initial default listings
            setJobsList(fallbackOpenPositions);
          }
        }
      } catch (err) {
        console.error('Error fetching live jobs from Firestore:', err);
      } finally {
        if (isMounted) {
          setIsLoadingJobs(false);
        }
      }
    }
    fetchJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const hash = location.hash.replace('#', '').toLowerCase();
    if (hash === 'culture' || hash === 'life' || hash === 'workplace') {
      setActiveTab('culture');
    } else if (hash === 'benefits' || hash === 'perks' || hash === 'compensation') {
      setActiveTab('benefits');
    } else if (hash === 'openings' || hash === 'positions' || hash === 'jobs') {
      setActiveTab('openings');
    } else if (hash === 'all') {
      setActiveTab('all');
    } else if (!location.hash) {
      setActiveTab('all');
    }
  }, [location.hash]);

  const handleTabChange = (tabId: CareerTab) => {
    setActiveTab(tabId);
    if (tabId === 'all') {
      navigate('/careers', { replace: true });
    } else {
      navigate(`/careers#${tabId}`, { replace: true });
    }
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const tabs = [
    { 
      id: 'all' as const, 
      label: { en: 'All Overview', bn: 'সকল বিবরণ', zh: '全景概览' }, 
      icon: Layers 
    },
    { 
      id: 'culture' as const, 
      label: { en: 'Life at Sharabangla', bn: 'শারাবাংলায় কর্মজীবন', zh: '走进沙拉邦拉' }, 
      icon: Users 
    },
    { 
      id: 'benefits' as const, 
      label: { en: 'Culture & Benefits', bn: 'সংস্কৃতি ও সুযোগ-সুবিধা', zh: '福利待遇与关怀' }, 
      icon: HeartHandshake 
    },
    { 
      id: 'openings' as const, 
      label: { en: `Open Positions (${jobsList?.length || 0})`, bn: `উন্মুক্ত পদসমূহ (${jobsList?.length || 0})`, zh: `在招职位 (${jobsList?.length || 0})` }, 
      icon: Briefcase 
    }
  ];

  const departmentList = [
    { id: 'all', label: { en: 'All Departments', bn: 'সকল বিভাগ', zh: '所有部门' } },
    { id: 'FINANCE & COMPLIANCE', label: { en: 'Finance & Compliance', bn: 'অর্থ ও কমপ্লায়েন্স', zh: '财务与合规' } },
    { id: 'SALES & MARKETING', label: { en: 'Sales & Marketing', bn: 'সেলস ও মার্কেটিং', zh: '销售与市场' } },
    { id: 'CROSS-BORDER LOGISTICS', label: { en: 'Logistics Operations', bn: 'লজিস্টিকস অপারেশনস', zh: '跨境物流运营' } },
    { id: 'ENGINEERING & PRODUCTION', label: { en: 'Manufacturing & Tech', bn: 'ম্যানুফ্যাকচারিং ও টেক', zh: '智能制造与工程' } }
  ];

  const filteredJobs = (jobsList || []).filter((job) => {
    if (departmentFilter === 'all') return true;
    return job.department?.toUpperCase() === departmentFilter.toUpperCase();
  });

  return (
    <>
      <SEO 
        title={
          activeTab === 'culture'
            ? (lang === 'zh' ? '走进沙拉邦拉与企业文化 | 沙拉邦拉集团' : (lang === 'bn' ? 'শারাবাংলায় কর্মজীবন ও সংস্কৃতি | শারাবাংলা গ্রুপ' : 'Life at Sharabangla & Workplace Culture | Sharabangla Group'))
            : activeTab === 'benefits'
            ? (lang === 'zh' ? '福利待遇与成长关怀 | 沙拉邦拉集团' : (lang === 'bn' ? 'সংস্কৃতি ও সুযোগ-সুবিধা | শারাবাংলা গ্রুপ' : 'Culture & Employee Benefits | Sharabangla Group'))
            : activeTab === 'openings'
            ? (lang === 'zh' ? '招贤纳士与在招职位 | 沙拉邦拉集团' : (lang === 'bn' ? 'চলতি নিয়োগসমূহ ও ক্যারিয়ার | শারাবাংলা গ্রুপ' : 'Current Open Positions & Careers | Sharabangla Group'))
            : (lang === 'zh' ? '人才招聘与企业文化 | 沙拉邦拉集团' : (lang === 'bn' ? 'ক্যারিয়ার ও কর্মজীবন | শারাবাংলা গ্রুপ' : 'Careers & Culture | Sharabangla Group'))
        }
        description={
          lang === 'zh'
            ? '加入沙拉邦拉集团，在跨境电商、航空保税物流、智能制造及国际贸易治理领域开启具有全球竞争力的职业发展平台。'
            : (lang === 'bn'
              ? 'শারাবাংলা গ্রুপের সাথে আপনার আন্তর্জাতিক ক্যারিয়ার গড়ে তুলুন। ক্রস-বর্ডার ই-কমার্স, এক্সপ্রেস লজিস্টিকস ও গ্রিন ম্যানুফ্যাকচারিংয়ে আকর্ষণীয় সুযোগ।'
              : 'Build your global career with Sharabangla Group across cross-border e-commerce, international logistics, and green manufacturing.')
        }
      />

      {/* Hero Section */}
      <section className="bg-[#06301A] text-white pt-28 pb-14 border-b border-[#1E9B4C]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E9B4C]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E9B4C] mb-3">
            <Link to="/" className="hover:underline text-slate-300">
              {lang === 'bn' ? 'হোম' : (lang === 'zh' ? '首页' : 'Home')}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link to="/careers" onClick={() => handleTabChange('all')} className="hover:underline text-slate-300">
              {lang === 'bn' ? 'ক্যারিয়ার' : (lang === 'zh' ? '人才招聘' : 'Careers')}
            </Link>
            {activeTab !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-500" />
                <span className="text-white font-bold">
                  {tabs.find(t => t.id === activeTab)?.label[lang] || tabs.find(t => t.id === activeTab)?.label.en}
                </span>
              </>
            )}
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            {activeTab === 'culture' && (
              lang === 'bn' ? 'শারাবাংলায় কর্মজীবন ও সংস্কৃতি' : (lang === 'zh' ? '走进沙拉邦拉：活力、使命与团队精神' : 'Life at Sharabangla: Workplace & Team Culture')
            )}
            {activeTab === 'benefits' && (
              lang === 'bn' ? 'সংস্কৃতি, পারিশ্রমিক ও সুযোগ-সুবিধা' : (lang === 'zh' ? '全面薪酬福利、保障与成长发展' : 'Culture, Rewards & Employee Benefits')
            )}
            {activeTab === 'openings' && (
              lang === 'bn' ? 'বর্তমান উন্মুক্ত পদসমূহ ও নিয়োগ' : (lang === 'zh' ? '当前招贤纳士与全职岗位机会' : 'Current Career Opportunities & Open Positions')
            )}
            {activeTab === 'all' && (
              lang === 'bn' ? 'আমাদের সাথে আপনার আন্তর্জাতিক ক্যারিয়ার গড়ে তুলুন' : (lang === 'zh' ? '开启真正全球化的卓越职业生涯' : 'Build a Truly Global Career with Us')
            )}
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-3xl leading-relaxed">
            {activeTab === 'culture' && (
              lang === 'bn' 
                ? 'একটি সহযোগিতাপূর্ণ, উদ্ভাবনী ও বৈশ্বিক কর্মপরিবেশে মেধার সর্বোচ্চ বিকাশ। যেখানে প্রতিটি সদস্য আমাদের ট্রিলিয়ন ডলারের লক্ষ্যযাত্রার সম্মানিত অংশীদার।'
                : (lang === 'zh'
                  ? '汇聚跨国多元精英，推崇唯才是举与主人翁精神。在广州、达卡与迪拜协同联动中共同铸就万亿美元级商业传奇。'
                  : 'A collaborative, innovative, and global workplace where every team member is an empowered co-builder of our trillion-dollar ambition.')
            )}
            {activeTab === 'benefits' && (
              lang === 'bn'
                ? 'আমরা আমাদের কর্মীদের মেধা ও পরিশ্রমের সর্বোচ্চ মূল্যায়ন করি—আকর্ষণীয় বেতন কাঠামো, সার্বিক স্বাস্থ্যবীমা, পারফরম্যান্স বোনাস ও আন্তর্জাতিক এক্সচেঞ্জ প্রোগ্রাম।'
                : (lang === 'zh'
                  ? '提供具有行业竞争力的薪酬体系、高额绩效奖金、全额医疗保障、海外轮岗履职与清晰的职业晋升双通道。'
                  : 'We invest in our people with industry-leading compensation, medical coverage, performance bonuses, and global exchange assignments.')
            )}
            {activeTab === 'openings' && (
              lang === 'bn'
                ? 'সাপ্লাই চেইন ইঞ্জিনিয়ারিং, ই-কমার্স গ্রোথ, আন্তর্জাতিক এয়ার ফ্রেইট ও গ্রিন টেক্সটাইল ম্যানুফ্যাকচারিংয়ে প্রতিভাবান পেশাদারদের আমন্ত্রণ।'
                : (lang === 'zh'
                  ? '面向全球招募跨境电商、智慧保税仓储、航空货运网络、特种新材料及跨国法务合规领域的优秀专业人才。'
                  : 'Explore active vacancies across our 4 core sectors. Apply directly to step into high-impact cross-border roles.')
            )}
            {activeTab === 'all' && (
              lang === 'bn'
                ? 'আমরা সাপ্লাই চেইন ইঞ্জিনিয়ারিং, ই-কমার্স গ্রোথ, লজিস্টিকস অপারেশন এবং আন্তর্জাতিক বাণিজ্য ব্যবস্থাপনায় দূরদর্শী পেশাদারদের নিয়োগ দিচ্ছি।'
                : (lang === 'zh'
                  ? '我们在供应链工程、跨境电商增长、现代综合物流及跨国贸易合规治理等领域广纳贤才，共创万亿级商业未来。'
                  : 'We are hiring forward-thinking professionals in supply chain engineering, e-commerce growth, logistics operations, and international trade governance.')
            )}
          </p>
        </div>
      </section>

      {/* Target Anchor References */}
      <div id="culture" className="scroll-mt-28" />
      <div id="benefits" className="scroll-mt-28" />
      <div id="openings" className="scroll-mt-28" />

      {/* Sticky Interactive Tab Switcher Navigation */}
      <section className="bg-white border-b border-[#E2E8E4] sticky top-16 sm:top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#06301A] text-white shadow-sm'
                      : 'text-[#5A6170] hover:bg-[#F6F8F7] hover:text-[#0E5C2E]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1E9B4C]' : 'text-[#5A6170]'}`} />
                  <span>{lang === 'zh' ? tab.label.zh : (lang === 'bn' ? tab.label.bn : tab.label.en)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-white">
        
        {/* =========================================================================
            VIEW 1: LIFE AT SHARABANGLA (Active on 'all' or 'culture')
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'culture') && (
          <section className="py-16 text-[#2B2B2B] border-b border-[#E2E8E4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Workplace Culture Pillars */}
              <div className="max-w-3xl mb-12">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-2 block">
                  {lang === 'bn' ? 'কর্মক্ষেত্র ও মূল্যবোধ' : (lang === 'zh' ? '核心文化与工作氛围' : 'WORKPLACE & CULTURE')}
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E] mb-3">
                  {lang === 'bn' ? 'কেন শারাবাংলা গ্রুপে কাজ করবেন?' : (lang === 'zh' ? '为什么选择沙拉邦拉集团？' : 'Why Work With Sharabangla Group?')}
                </h2>
                <p className="text-[#5A6170] text-sm sm:text-base">
                  {lang === 'bn'
                    ? 'সীমান্তহীন সুযোগ, মেধাভিত্তিক মূল্যায়ন এবং গ্লোবাল মোবিলিটির মাধ্যমে মেধার বিকাশ।'
                    : (lang === 'zh'
                        ? '为卓越人才提供跨国经贸发展舞台、唯才是举的晋升激励与全球外派机会。'
                        : 'Empowering talent with cross-border opportunities, performance meritocracy, and global mobility.')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] hover:border-[#1E9B4C] transition-all">
                  <Globe className="w-8 h-8 text-[#1E9B4C] mb-4" />
                  <h3 className="font-heading font-bold text-xl text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'আন্তঃসীমান্ত মোবিলিটি' : (lang === 'zh' ? '跨国交流与外派机会' : 'Cross-Border Mobility')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed">
                    {lang === 'bn'
                      ? 'গুয়াংঝু, দুবাই এবং ঢাকার আন্তর্জাতিক দলের সাথে সরাসরি কাজ ও এক্সচেঞ্জ অ্যাসাইনমেন্টের সুযোগ।'
                      : (lang === 'zh'
                          ? '与广州、迪拜和达卡的国际化团队紧密协作，享受轮岗交流与海外履职机会。'
                          : 'Work closely with international teams in Guangzhou, Dubai, and Dhaka with exchange assignments.')}
                  </p>
                </div>

                <div className="p-8 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] hover:border-[#1E9B4C] transition-all">
                  <Sparkles className="w-8 h-8 text-[#1E9B4C] mb-4" />
                  <h3 className="font-heading font-bold text-xl text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'উদ্ভাবন ও দায়িত্বশীলতা' : (lang === 'zh' ? '鼓励创新与主人翁精神' : 'Innovation & Ownership')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed">
                    {lang === 'bn'
                      ? 'কোনো আমলাতান্ত্রিক জটিলতা ছাড়া ক্লাউড প্রযুক্তি কাঠামো ও এক্সপ্রেস এয়ার ফ্রেইট নেটওয়ার্ক গঠনে ভূমিকা রাখুন।'
                      : (lang === 'zh'
                          ? '无需繁琐官僚流程，直接参与塑造领先的供应链云平台与全球航空货运网络。'
                          : 'Directly shape cloud technology architectures and express air freight networks without bureaucratic delays.')}
                  </p>
                </div>

                <div className="p-8 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] hover:border-[#1E9B4C] transition-all">
                  <Trophy className="w-8 h-8 text-[#1E9B4C] mb-4" />
                  <h3 className="font-heading font-bold text-xl text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'মেধাভিত্তিক স্বীকৃতি' : (lang === 'zh' ? '唯才是举与成果激励' : 'Performance Meritocracy')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed">
                    {lang === 'bn'
                      ? 'স্বচ্ছ মূল্যায়ন পদ্ধতি, দ্রুত প্রমোশন ট্র্যাক এবং অসামান্য অবদানের জন্য সরাসরি বিশেষ বোনাস স্কিম।'
                      : (lang === 'zh'
                          ? '清晰透明的绩效评价机制，快速晋升通道及针对突出贡献的专属专项奖励。'
                          : 'Transparent merit-based evaluation, accelerated promotion paths, and direct milestone reward programs.')}
                  </p>
                </div>
              </div>

              {/* TEAM CELEBRATION SHOWCASE WITH EMBLEMS */}
              <div className="mt-16">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-1.5 block">
                    {lang === 'bn' ? 'আমাদের পরিবার ও টিম স্পিরিট' : (lang === 'zh' ? '沙拉邦拉集团员工风采' : 'Life at Sharabangla Group')}
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E]">
                    {lang === 'bn' ? 'এক পরিবার, এক অভিন্ন লক্ষ্য' : (lang === 'zh' ? '万众一心，奔赴万亿宏伟征程' : 'One Team, One Shared Ambition')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A6170] mt-2">
                    {lang === 'bn' 
                      ? 'আমাদের উদ্যমী ও প্রতিভাবান পেশাদারদের হাত ধরেই গড়ে উঠছে আগামী দিনের ট্রিলিয়ন ডলারের বহুজাতিক প্রতিষ্ঠান।'
                      : (lang === 'zh'
                          ? '汇聚卓越志向与专业拼搏精神，共同打造万亿美元级全球跨国标杆企业。'
                          : 'United by shared values, relentless ambition, and the collective drive to build a trillion-dollar global enterprise.')}
                  </p>
                </div>

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2E8E4] shadow-2xl bg-[#06301A] group">
                  {/* Main Celebration Photo */}
                  <img
                    src="/media/careers/careers-team.jpg"
                    alt="Sharabangla Group Team Celebration"
                    className="w-full h-[380px] sm:h-[480px] md:h-[540px] lg:h-[600px] object-cover object-center filter contrast-[1.02] group-hover:scale-[1.01] transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('careers-team.jpg.jpeg')) {
                        target.src = '/media/careers/careers-team.jpg.jpeg';
                      }
                    }}
                  />

                  {/* Left Logo — Sharabangla Group */}
                  <div className="absolute top-3 left-3 sm:top-6 sm:left-6 md:top-8 md:left-8 z-10">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white shadow-2xl border-2 border-white/95 flex items-center justify-center p-2.5 sm:p-4 transition-transform duration-300 hover:scale-105 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
                      <img
                        src="/brand/logo-primary.png"
                        alt="Sharabangla Group Emblem"
                        className="w-full h-full object-contain filter contrast-105"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes('logo-left.png')) {
                            target.src = '/media/careers/logo-left.png';
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Center Header Banner — "A Trillion Dreams Winner Team" */}
                  <div className="absolute top-2.5 sm:top-3.5 md:top-4.5 lg:top-5 left-1/2 -translate-x-1/2 z-10 w-auto max-w-[calc(100%-140px)] sm:max-w-[calc(100%-200px)] md:max-w-[calc(100%-260px)] pointer-events-none select-none">
                    <div className="px-3 sm:px-7 md:px-9 py-1 sm:py-2.5 rounded-full bg-[#06301A]/95 sm:bg-[#06301A]/90 backdrop-blur-md border border-[#1E9B4C]/60 shadow-2xl flex items-center justify-center gap-1.5 sm:gap-3 text-white filter drop-shadow-[0_8px_25px_rgba(0,0,0,0.5)]">
                      <Trophy className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#E5B54F] shrink-0 drop-shadow-sm" />
                      <span className="font-heading font-extrabold text-[10px] sm:text-base md:text-lg lg:text-xl tracking-wider text-white uppercase whitespace-nowrap drop-shadow-sm">
                        {lang === 'bn' ? 'ট্রিলিয়ন স্বপ্নের বিজয়ী দল' : (lang === 'zh' ? '万亿梦想 · 冠军卓越团队' : 'A Trillion Dreams Winner Team')}
                      </span>
                    </div>
                  </div>

                  {/* Right Logo — Laoban Bangladesh */}
                  <div className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-8 md:right-8 z-10">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white shadow-2xl border-2 border-white/95 flex items-center justify-center p-2.5 sm:p-4 transition-transform duration-300 hover:scale-105 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
                      <img
                        src="/companies/laobaan.png"
                        alt="Team Laoban Emblem"
                        className="w-full h-full object-contain filter contrast-105 rounded-full"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes('logo-right.png')) {
                            target.src = '/media/careers/logo-right.png';
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action when in isolated culture view */}
              {activeTab === 'culture' && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => handleTabChange('benefits')}
                    className="w-full sm:w-auto px-6 py-3 bg-[#F6F8F7] text-[#0E5C2E] border border-[#E2E8E4] rounded-xl text-xs font-bold hover:border-[#1E9B4C] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'bn' ? 'সুযোগ-সুবিধাসমূহ দেখুন' : (lang === 'zh' ? '查看薪酬福利详情' : 'Explore Benefits & Growth')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleTabChange('openings')}
                    className="w-full sm:w-auto px-6 py-3 bg-[#1E9B4C] text-white rounded-xl text-xs font-bold hover:bg-[#0E5C2E] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'bn' ? 'চলতি নিয়োগসমূহ দেখুন' : (lang === 'zh' ? '查看当前在招职位' : 'View Open Positions')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>
          </section>
        )}


        {/* =========================================================================
            VIEW 2: CULTURE & BENEFITS (Active on 'all' or 'benefits')
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'benefits') && (
          <section className="py-16 bg-[#F6F8F7] border-b border-[#E2E8E4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="max-w-3xl mb-12">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-2 block">
                  {lang === 'bn' ? 'সুযোগ-সুবিধা ও প্রণোদনা' : (lang === 'zh' ? '全面薪酬福利体系' : 'COMPENSATION & BENEFITS')}
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E] mb-3">
                  {lang === 'bn' ? 'শারাবাংলা গ্রুপের সুযোগ-সুবিধা ও সুযোগ' : (lang === 'zh' ? '沙拉邦拉集团员工关怀与福利保障' : 'Comprehensive Employee Benefits & Care')}
                </h2>
                <p className="text-[#5A6170] text-sm sm:text-base">
                  {lang === 'bn'
                    ? 'আমরা কর্মীদের দীর্ঘমেয়াদী ক্যারিয়ার গঠন, স্বাস্থ্য সুরক্ষা ও অর্থনৈতিক নিরাপত্তার জন্য সর্বোচ্চ সুযোগ নিশ্চিত করি।'
                    : (lang === 'zh'
                        ? '我们提供极具国际竞争力的薪酬激励、完善的医疗健康保障、全球跨国履职津贴与系统的员工成长扶持。'
                        : 'Designed to support your physical, financial, and professional wellbeing across all life stages.')}
                </p>
              </div>

              {/* 6 Comprehensive Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Health & Wellness */}
                <div className="p-7 rounded-2xl bg-white border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#1E9B4C] mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'সার্বিক স্বাস্থ্য ও চিকিৎসা কভারেজ' : (lang === 'zh' ? '全额医疗与健康保障' : 'Health & Medical Coverage')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'কর্মচারী ও পরিবারের সদস্যদের জন্য ক্যাশলেস হসপিটালাইজেশন, ডেন্টাল ও বার্ষিক কমপ্রিহেনসিভ হেলথ চেকআপ।'
                      : (lang === 'zh'
                          ? '为员工及直系家属提供无忧医疗报销、住院直赔、牙科关怀及年度高标准全面体检计划。'
                          : 'Comprehensive medical insurance, inpatient cashless coverage, dental, and executive annual health checkups.')}
                  </p>
                  <ul className="text-xs text-[#5A6170] space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'ফ্যামিলি মেডিক্যাল ইনস্যুরেন্স' : (lang === 'zh' ? '直系家属联合医疗保险' : 'Family Medical Insurance')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'বার্ষিক স্বাস্থ্য পরীক্ষা' : (lang === 'zh' ? '年度三甲级健康体检' : 'Annual Health Screenings')}</span>
                    </li>
                  </ul>
                </div>

                {/* 2. Financial Rewards */}
                <div className="p-7 rounded-2xl bg-white border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#1E9B4C] mb-4">
                    <Banknote className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'প্রতিযোগিতামূলক বেতন ও বোনাস' : (lang === 'zh' ? '丰厚薪酬与多重绩效奖金' : 'Competitive Pay & Bonuses')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'বাজারের শীর্ষে থাকা আকর্ষণীয় বেতন কাঠামো, উৎসব বোনাস, পারফরম্যান্স ইনসেন্টিভ ও মুনাফা শেয়ারিং স্কিম।'
                      : (lang === 'zh'
                          ? '行业领先的薪酬起步水平、双节节日津贴、季度突出绩效奖励及中高层利润分红激励。'
                          : 'Top-of-market compensation, bi-annual festival bonuses, quarterly performance incentives, and milestone rewards.')}
                  </p>
                  <ul className="text-xs text-[#5A6170] space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? '২টি উৎসব বোনাস' : (lang === 'zh' ? '每年全额双节津贴' : 'Bi-annual Festival Bonuses')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'পারফরম্যান্স ইনসেন্টিভ' : (lang === 'zh' ? '季度与年度绩效现金奖' : 'Performance Cash Incentives')}</span>
                    </li>
                  </ul>
                </div>

                {/* 3. Global Mobility & Travel */}
                <div className="p-7 rounded-2xl bg-white border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#1E9B4C] mb-4">
                    <Plane className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'গ্লোবাল মোবিলিটি ও এক্সচেঞ্জ' : (lang === 'zh' ? '全球外派与海外研修' : 'Global Mobility & Travel')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'গুয়াংঝু (চীন), দুবাই (ইউএই) ও ঢাকায় নিয়মিত অফিস এক্সচেঞ্জ, আন্তর্জাতিক ট্রেনিং ও ট্রাভেল এলাউন্স।'
                      : (lang === 'zh'
                          ? '设立广州、迪拜与达卡之间的跨国轮岗机制，全额报销国际差旅并提供丰厚海外生活津贴。'
                          : 'Exchange programs across Guangzhou, Dubai, and Dhaka with corporate travel stipends and visa assistance.')}
                  </p>
                  <ul className="text-xs text-[#5A6170] space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'চীন ও মধ্যপ্রাচ্য এক্সচেঞ্জ' : (lang === 'zh' ? '中东及大湾区轮岗' : 'China & Middle East Exchange')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'আন্তর্জাতিক কনফারেন্স ফান্ড' : (lang === 'zh' ? '全球行业峰会参展支持' : 'Global Trade Conference Fund')}</span>
                    </li>
                  </ul>
                </div>

                {/* 4. Professional Development */}
                <div className="p-7 rounded-2xl bg-white border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#1E9B4C] mb-4">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'শিক্ষা ও পেশাগত ডিগ্রি ফান্ড' : (lang === 'zh' ? '职业技能认证与进修津贴' : 'Learning & Education Stipends')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'আন্তর্জাতিক সাপ্লাই চেইন, টেক ও ফাইন্যান্সিয়াল সার্টিফিকেশনের ১০০% ফি রিইমবার্সমেন্ট এবং লিডারশিপ ট্রেনিং।'
                      : (lang === 'zh'
                          ? '为国际供应链、云计算架构及高级会计职称等专业认证提供全额学费报销及带薪备考假期。'
                          : '100% reimbursement for supply chain, cloud engineering, and chartered finance certifications.')}
                  </p>
                  <ul className="text-xs text-[#5A6170] space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'সার্টিফিকেশন ফি প্রদান' : (lang === 'zh' ? '专业资质全额报销' : 'Full Certification Grants')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'এক্সিকিউটিভ মেন্টরশিপ' : (lang === 'zh' ? '高管导师一对一辅导' : 'Executive Mentorship Tracks')}</span>
                    </li>
                  </ul>
                </div>

                {/* 5. Retirement & Long-term Security */}
                <div className="p-7 rounded-2xl bg-white border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#1E9B4C] mb-4">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'প্রভিডেন্ট ফান্ড ও গ্র্যাচুইটি' : (lang === 'zh' ? '企业公积金与长期保障' : 'Provident Fund & Gratuity')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'কোম্পানির সমপরিমাণ কন্ট্রিবিউশন সমৃদ্ধ প্রভিডেন্ট ফান্ড, গ্র্যাচুইটি ও স্থায়ী লাইফ ইনস্যুরেন্স স্কিম।'
                      : (lang === 'zh'
                          ? '设立合规企业公积金账户、集团全额配比缴纳、法定离职抚恤及大额人身意外商业保险。'
                          : 'Recognized provident fund with matching employer contributions, statutory gratuity, and life insurance.')}
                  </p>
                  <ul className="text-xs text-[#5A6170] space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'ম্যাচিং প্রভিডেন্ট ফান্ড' : (lang === 'zh' ? '等额配比公积金计划' : 'Matching Provident Fund')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'গ্র্যাচুইটি বেনিফিট' : (lang === 'zh' ? '丰厚工龄抚恤金' : 'Service Gratuity Benefits')}</span>
                    </li>
                  </ul>
                </div>

                {/* 6. Modern Workplace & Flexibility */}
                <div className="p-7 rounded-2xl bg-white border border-[#E2E8E4] shadow-xs hover:border-[#1E9B4C] hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#1E9B4C] mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2">
                    {lang === 'bn' ? 'আধুনিক অফিস ও ওয়েলবিয়িং' : (lang === 'zh' ? '现代办公环境与身心关爱' : 'Modern Spaces & Wellbeing')}
                  </h3>
                  <p className="text-xs text-[#5A6170] leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'উন্নত এর্গোনমিক ওয়ার্কস্টেশন, ক্যাফেটেরিয়া সুবিধা, টিম রিট্রিট এবং বার্ষিক ফ্যামিলি গেট-টুগেদার।'
                      : (lang === 'zh'
                          ? '达卡与广州顶级写字楼人体工学办公环境、全天候高品质茶歇、年度团队海内外团建与家庭日。'
                          : 'Ergonomic smart workstations, corporate dining, annual off-site retreats, and family celebration days.')}
                  </p>
                  <ul className="text-xs text-[#5A6170] space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'বার্ষিক টিম রিট্রিট' : (lang === 'zh' ? '年度跨国团队拓展' : 'Annual Team Retreats')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9B4C]" />
                      <span>{lang === 'bn' ? 'প্রিমিয়াম স্ন্যাক্স ও ক্যাফে' : (lang === 'zh' ? '全天候现磨咖啡与点心' : 'Gourmet Cafeteria Care')}</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Quick Action when in isolated benefits view */}
              {activeTab === 'benefits' && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => handleTabChange('culture')}
                    className="w-full sm:w-auto px-6 py-3 bg-white text-[#0E5C2E] border border-[#E2E8E4] rounded-xl text-xs font-bold hover:border-[#1E9B4C] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'bn' ? 'শারাবাংলা কর্মজীবন সংস্কৃতি' : (lang === 'zh' ? '了解沙拉邦拉团队风采' : 'Explore Workplace Culture')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleTabChange('openings')}
                    className="w-full sm:w-auto px-6 py-3 bg-[#1E9B4C] text-white rounded-xl text-xs font-bold hover:bg-[#0E5C2E] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'bn' ? 'চলতি নিয়োগসমূহ দেখুন' : (lang === 'zh' ? '查看当前在招职位' : 'View Open Positions')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>
          </section>
        )}


        {/* =========================================================================
            VIEW 3: OPEN POSITIONS (Active on 'all' or 'openings')
           ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'openings') && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-[#E2E8E4]">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-1.5 block">
                    {lang === 'bn' ? 'নিয়োগের সুযোগসমূহ' : (lang === 'zh' ? '招贤纳士' : 'CAREER OPPORTUNITIES')}
                  </span>
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E]">
                    {lang === 'bn' 
                      ? `বর্তমান উন্মুক্ত পদসমূহ (${filteredJobs?.length || 0})` 
                      : (lang === 'zh' 
                          ? `当前招聘职位（${filteredJobs?.length || 0}个）` 
                          : `Current Open Positions (${filteredJobs?.length || 0})`)}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5A6170] mt-1">
                    {lang === 'bn' 
                      ? 'অনলাইনে আবেদন করুন এবং আমাদের আন্তর্জাতিক রিক্রুটিং টিমের সাথে যুক্ত হোন।'
                      : (lang === 'zh'
                          ? '点击“立即申请”填写您的基本资料并上传中英文简历，我们将在3个工作日内与您联系。'
                          : 'Apply online directly to connect with our global talent acquisition team.')}
                  </p>
                </div>

                {/* Department Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  <span className="text-xs font-bold text-[#5A6170] uppercase flex items-center gap-1 shrink-0 mr-1">
                    <Filter className="w-3.5 h-3.5 text-[#1E9B4C]" />
                    <span className="hidden sm:inline">{lang === 'bn' ? 'বিভাগ:' : (lang === 'zh' ? '部门分类:' : 'Dept:')}</span>
                  </span>
                  {departmentList.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => setDepartmentFilter(dept.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                        departmentFilter === dept.id
                          ? 'bg-[#1E9B4C] text-white shadow-xs font-bold'
                          : 'bg-[#F6F8F7] text-[#5A6170] border border-[#E2E8E4] hover:border-[#1E9B4C] hover:text-[#0E5C2E]'
                      }`}
                    >
                      {lang === 'zh' ? dept.label.zh : (lang === 'bn' ? dept.label.bn : dept.label.en)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Jobs List Grid */}
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 sm:p-7 rounded-2xl border border-[#E2E8E4] bg-white shadow-xs hover:border-[#1E9B4C] hover:shadow-lg transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2.5">
                        <span className={`px-2.5 py-0.5 rounded text-white text-[10px] font-bold uppercase tracking-wider ${job.categoryColor || 'bg-[#06301A]'}`}>
                          {lang === 'bn' ? (job.banglaDepartment || job.department) : (lang === 'zh' ? (job.zhDepartment || job.department) : job.department)}
                        </span>
                        <span className="text-xs text-[#5A6170] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#1E9B4C]" />
                          <span>{lang === 'bn' ? (job.banglaLocation || job.location) : (lang === 'zh' ? (job.zhLocation || job.location) : job.location)}</span>
                        </span>
                        <span className="text-xs text-[#5A6170] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#1E9B4C]" />
                          <span>
                            {lang === 'bn' 
                              ? `${job.banglaType || job.type} • ${job.banglaExperience || job.experience}` 
                              : (lang === 'zh'
                                  ? `${job.zhType || job.type} • ${job.zhExperience || job.experience}`
                                  : `${job.type} • ${job.experience}`)}
                          </span>
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-xl text-[#0E5C2E] group-hover:text-[#1E9B4C] transition-colors mb-2">
                        {lang === 'bn' ? (job.banglaTitle || job.title) : (lang === 'zh' ? (job.zhTitle || job.title) : job.title)}
                      </h3>

                      {/* Secondary Job Card Info: Salary, Vacancy & Deadline */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#475569] mb-3 font-medium bg-[#F6F8F7] px-3.5 py-2 rounded-xl border border-[#E2E8E4] w-fit">
                        <span className="flex items-center gap-1.5 text-[#0E5C2E] font-semibold">
                          <Banknote className="w-3.5 h-3.5 text-[#1E9B4C]" />
                          <span>
                            <span className="text-[#5A6170] font-normal">{lang === 'bn' ? 'বেতন:' : (lang === 'zh' ? '薪资待遇:' : 'Salary:')}</span>{' '}
                            {lang === 'bn' ? (job.banglaSalary || job.salary) : (lang === 'zh' ? (job.zhSalary || job.salary) : job.salary)}
                          </span>
                        </span>
                        <span className="text-slate-300 hidden sm:inline">•</span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#1E9B4C]" />
                          <span>
                            <span className="text-[#5A6170] font-normal">{lang === 'bn' ? 'পদসংখ্যা:' : (lang === 'zh' ? '招聘名额:' : 'Vacancy:')}</span>{' '}
                            {lang === 'bn' ? (job.banglaVacancy || job.vacancy) : (lang === 'zh' ? (job.zhVacancy || job.vacancy) : job.vacancy)}
                          </span>
                        </span>
                        <span className="text-slate-300 hidden sm:inline">•</span>
                        <span className="flex items-center gap-1.5 text-amber-900">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          <span>
                            <span className="text-[#5A6170] font-normal">{lang === 'bn' ? 'আবেদনের শেষ তারিখ:' : (lang === 'zh' ? '截止日期:' : 'Deadline:')}</span>{' '}
                            {lang === 'bn' ? (job.banglaDeadline || formatDeadlineForDisplay(job.deadline)) : (lang === 'zh' ? (job.zhDeadline || formatDeadlineForDisplay(job.deadline)) : formatDeadlineForDisplay(job.deadline))}
                          </span>
                        </span>
                      </div>

                      <p className="text-xs text-[#5A6170] leading-relaxed max-w-3xl mb-3.5">
                        {lang === 'bn' ? (job.banglaDescription || job.description) : (lang === 'zh' ? (job.zhDescription || job.description) : job.description)}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {((lang === 'bn' && job.banglaRequirements) 
                          ? job.banglaRequirements 
                          : ((lang === 'zh' && job.zhRequirements) 
                              ? job.zhRequirements 
                              : job.requirements) || []
                        ).map((req, i) => (
                          <span key={i} className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-[#F6F8F7] text-[#0E5C2E] border border-[#E2E8E4]">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:shrink-0 flex items-center lg:flex-col justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#E2E8E4]">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="w-full lg:w-auto px-7 py-3 rounded-xl bg-[#1E9B4C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0E5C2E] transition-all shrink-0 cursor-pointer shadow-md flex items-center justify-center gap-2"
                      >
                        <span>{lang === 'bn' ? 'আবেদন করুন' : (lang === 'zh' ? '立即申请' : 'Apply Now')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* Join Us Adani-style Careers Teaser Section */}
        {(activeTab === 'all' || activeTab === 'culture') && (
          <JoinUsSection onExplorePositions={() => handleTabChange('openings')} />
        )}

      </div>

      {/* Reusable Application Modal for all positions */}
      <ApplicationModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
    </>
  );
};
