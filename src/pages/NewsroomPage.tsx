import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';
import { newsArticles as defaultNewsArticles, NewsArticle } from '../data/site';
import { getNewsFromFirestore } from '../services/newsService';
import { 
  formatDateForDisplay,
  formatDateToBangla,
  formatDateToChinese
} from '../utils/dateUtils';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Newspaper, 
  ShieldCheck, 
  Megaphone, 
  Filter, 
  Layers, 
  ChevronRight,
  Mail,
  Phone,
  FileText,
  Sparkles,
  Loader2
} from 'lucide-react';

export const NewsroomPage: React.FC = () => {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [articles, setArticles] = useState<NewsArticle[]>(defaultNewsArticles);
  const [loading, setLoading] = useState<boolean>(true);

  // Active Feed Tab: 'all' | 'latest' | 'press' | 'announcements'
  const [activeTab, setActiveTab] = useState<'all' | 'latest' | 'press' | 'announcements'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch live articles from Firestore
  useEffect(() => {
    async function loadLiveNews() {
      try {
        const liveNews = await getNewsFromFirestore();
        if (liveNews && liveNews.length > 0) {
          setArticles(liveNews);
        }
      } catch (err) {
        console.error('Error fetching live news from Firestore, using default articles:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLiveNews();
  }, []);

  // Handle URL Hash & Search Query Params
  useEffect(() => {
    const hash = location.hash.replace('#', '').toLowerCase();
    if (hash === 'latest' || hash === 'news') {
      setActiveTab('latest');
    } else if (hash === 'press' || hash === 'press-releases') {
      setActiveTab('press');
    } else if (hash === 'announcements' || hash === 'announcement') {
      setActiveTab('announcements');
    }

    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat && ['E-Commerce', 'Logistics', 'Manufacturing'].includes(cat)) {
      setSelectedCategory(cat);
    }
    const tabParam = params.get('tab');
    if (tabParam && ['all', 'latest', 'press', 'announcements'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }

    // Scroll to view if hash provided
    if (hash) {
      const elem = document.getElementById(hash) || document.getElementById('newsroom-feed');
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [location.hash, location.search]);

  const handleTabChange = (tab: 'all' | 'latest' | 'press' | 'announcements') => {
    setActiveTab(tab);
    if (tab === 'all') {
      navigate('/newsroom', { replace: true });
    } else {
      navigate(`/newsroom#${tab}`, { replace: true });
    }
  };

  const feedTabs = [
    { 
      id: 'all' as const, 
      label: { en: 'All Releases', bn: 'সকল খবর ও নোটিশ', zh: '全部动态与公告' },
      icon: Layers,
      count: articles?.length || 0 
    },
    { 
      id: 'latest' as const, 
      label: { en: 'Latest News', bn: 'সর্বশেষ সংবাদ', zh: '最新新闻动态' },
      icon: Newspaper,
      count: (articles || []).filter(a => a.type === 'news' || !a.type).length 
    },
    { 
      id: 'press' as const, 
      label: { en: 'Press Releases', bn: 'প্রেস বিজ্ঞপ্তি', zh: '官方新闻稿' },
      icon: ShieldCheck,
      count: (articles || []).filter(a => a.type === 'press').length 
    },
    { 
      id: 'announcements' as const, 
      label: { en: 'Group Announcements', bn: 'গ্রুপের ঘোষণা', zh: '集团重大公告' },
      icon: Megaphone,
      count: (articles || []).filter(a => a.type === 'announcement').length 
    }
  ];

  const categories = [
    { id: 'all', label: { en: 'All Sectors', bn: 'সকল খাত', zh: '全业务板块' } },
    { id: 'E-Commerce', label: { en: 'E-Commerce', bn: 'ই-কমার্স', zh: '电子商务' } },
    { id: 'Logistics', label: { en: 'Logistics', bn: 'লজিস্টিকস', zh: '现代物流' } },
    { id: 'Manufacturing', label: { en: 'Manufacturing', bn: 'ম্যানুফ্যাকচারিং', zh: '智能制造' } }
  ];

  const formatArticleDate = (dateStr: string) => {
    if (!dateStr) return '';
    if (lang === 'zh') {
      return formatDateToChinese(dateStr);
    }
    if (lang === 'bn') {
      return formatDateToBangla(dateStr);
    }
    return formatDateForDisplay(dateStr);
  };

  const formatReadTime = (readTimeStr: string) => {
    if (lang === 'zh') {
      return readTimeStr.replace('min read', '分钟阅读');
    }
    if (lang === 'bn') {
      return readTimeStr.replace('min read', 'মিনিট পাঠ');
    }
    return readTimeStr;
  };

  const filteredArticles = (articles || []).filter(a => {
    if (!a) return false;
    // Tab Filter
    let matchesTab = true;
    if (activeTab === 'latest') {
      matchesTab = a.type === 'news' || !a.type;
    } else if (activeTab === 'press') {
      matchesTab = a.type === 'press';
    } else if (activeTab === 'announcements') {
      matchesTab = a.type === 'announcement';
    }

    // Category Filter
    const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;

    // Search Filter
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || (
      (a.title && a.title.toLowerCase().includes(query)) ||
      (a.summary && a.summary.toLowerCase().includes(query)) ||
      (a.officialRef && a.officialRef.toLowerCase().includes(query)) ||
      (a.zhTitle && a.zhTitle.toLowerCase().includes(query)) ||
      (a.zhSummary && a.zhSummary.toLowerCase().includes(query)) ||
      (a.banglaTitle && a.banglaTitle.includes(query)) ||
      (a.banglaSummary && a.banglaSummary.includes(query))
    );

    return matchesTab && matchesCat && matchesSearch;
  });

  return (
    <>
      <SEO 
        title={
          activeTab === 'latest'
            ? (lang === 'zh' ? '最新新闻动态 | 沙拉邦拉集团' : (lang === 'bn' ? 'সর্বশেষ সংবাদ | শারাবাংলা গ্রুপ' : 'Latest News | Sharabangla Group'))
            : activeTab === 'press'
            ? (lang === 'zh' ? '官方新闻稿与声明 | 沙拉邦拉集团' : (lang === 'bn' ? 'প্রেস বিজ্ঞপ্তি | শারাবাংলা গ্রুপ' : 'Press Releases | Sharabangla Group'))
            : activeTab === 'announcements'
            ? (lang === 'zh' ? '集团重大公告 | 沙拉邦拉集团' : (lang === 'bn' ? 'গ্রুপের ঘোষণা | শারাবাংলা গ্রুপ' : 'Group Announcements | Sharabangla Group'))
            : (lang === 'zh' ? '新闻中心与媒体发布 | 沙拉邦拉集团' : (lang === 'bn' ? 'নিউজ রুম ও মিডিয়া | শারাবাংলা গ্রুপ' : 'Newsroom & Corporate Press | Sharabangla Group'))
        }
        description={
          lang === 'zh'
            ? '沙拉邦拉集团官方最新新闻发布、企业战略公告、跨国物流航线开通与重大合作发布。'
            : (lang === 'bn'
              ? 'শারাবাংলা গ্রুপের অফিসিয়াল সংবাদ, প্রেস বিজ্ঞপ্তি, কর্পোরেট ঘোষণা এবং আন্তর্জাতিক বাণিজ্যের অগ্রগতি।'
              : 'Official announcements, press releases, trade milestones, and strategic expansion updates from Sharabangla Group.')
        }
      />

      {/* Hero Header */}
      <section className="bg-[#06301A] text-white pt-28 pb-16 border-b border-[#1E9B4C]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E9B4C]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              {lang === 'zh' ? '首页' : (lang === 'bn' ? 'হোম' : 'Home')}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-[#1E9B4C] font-bold">
              {lang === 'zh' ? '新闻中心' : (lang === 'bn' ? 'নিউজ রুম' : 'Newsroom')}
            </span>
          </nav>

          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-2 block">
            {lang === 'zh' ? '沙拉邦拉集团新闻与媒体中心' : (lang === 'bn' ? 'শারাবাংলা গ্রুপ মিডিয়া ও প্রেস' : 'SHARABANGLA GROUP MEDIA & PRESS')}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            {activeTab === 'latest'
              ? (lang === 'zh' ? '最新新闻与行业洞察' : (lang === 'bn' ? 'সর্বশেষ সংবাদ ও উন্নয়ন' : 'Latest News & Industry Insights'))
              : activeTab === 'press'
              ? (lang === 'zh' ? '官方新闻稿与正式声明' : (lang === 'bn' ? 'অফিসিয়াল প্রেস বিজ্ঞপ্তি' : 'Official Press Releases'))
              : activeTab === 'announcements'
              ? (lang === 'zh' ? '集团重大战略公告与决议' : (lang === 'bn' ? 'গ্রুপের কৌশলগত ঘোষণা ও নোটিশ' : 'Group Announcements & Strategic Notices'))
              : (lang === 'zh' ? '新闻中心与官方媒体动态' : (lang === 'bn' ? 'শারাবাংলা গ্রুপ নিউজ রুম' : 'Newsroom & Corporate Press'))}
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-3xl leading-relaxed">
            {lang === 'zh'
              ? '获取沙拉邦拉集团及其旗下跨国电商、现代航空保税物流、绿色制造与供应链金融实体的最新官方动态。'
              : (lang === 'bn'
                ? 'শারাবাংলা গ্রুপ এবং এর অন্তর্ভুক্ত ক্রস-বর্ডার ই-কমার্স, আন্তর্জাতিক এক্সপ্রেস লজিস্টিকস ও গ্রিন ম্যানুফ্যাকচারিং খাতের সর্বশেষ অফিসিয়াল তথ্য।'
                : 'Stay informed with direct corporate communications, major trade announcements, infrastructure milestones, and media assets.')}
          </p>
        </div>
      </section>

      {/* Target Anchor Sections for Direct Mega-Menu Deep Links */}
      <div id="latest" className="scroll-mt-28" />
      <div id="press" className="scroll-mt-28" />
      <div id="announcements" className="scroll-mt-28" />

      {/* Interactive Feed Navigation Tabs Bar */}
      <section id="newsroom-feed" className="bg-white border-b border-[#E2E8E4] sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {feedTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#06301A] text-white shadow-sm'
                        : 'text-[#5A6170] hover:bg-[#F6F8F7] hover:text-[#0E5C2E]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#1E9B4C]' : 'text-[#5A6170]'}`} />
                    <span>{lang === 'zh' ? tab.label.zh : (lang === 'bn' ? tab.label.bn : tab.label.en)}</span>
                    <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive ? 'bg-[#1E9B4C] text-white' : 'bg-[#E2E8E4] text-[#5A6170]'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Sector Filter and Instant Search */}
      <section className="py-4 bg-[#F6F8F7] border-b border-[#E2E8E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Sector Category Pills */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold text-[#5A6170] uppercase flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#1E9B4C]" />
              <span className="hidden sm:inline">{lang === 'zh' ? '行业分类:' : (lang === 'bn' ? 'খাত:' : 'Sector:')}</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#1E9B4C] text-white shadow-xs font-bold'
                    : 'bg-white text-[#5A6170] border border-[#E2E8E4] hover:border-[#1E9B4C] hover:text-[#0E5C2E]'
                }`}
              >
                {lang === 'zh' ? cat.label.zh : (lang === 'bn' ? cat.label.bn : cat.label.en)}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'zh' ? '搜索新闻、公告或批号...' : (lang === 'bn' ? 'সংবাদ বা ঘোষণা অনুসন্ধান করুন...' : 'Search news, announcements, refs...')}
              className="w-full bg-white border border-[#E2E8E4] rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#1E9B4C] focus:ring-1 focus:ring-[#1E9B4C] transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Articles Grid Section */}
      <section className="py-14 bg-white min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Active Filter Info Banner */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E2E8E4]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-[#0E5C2E]">
                {activeTab === 'latest'
                  ? (lang === 'zh' ? '最新新闻发布' : (lang === 'bn' ? 'সর্বশেষ সংবাদ তালিকা' : 'Latest News Articles'))
                  : activeTab === 'press'
                  ? (lang === 'zh' ? '官方新闻通稿' : (lang === 'bn' ? 'প্রেস বিজ্ঞপ্তি তালিকা' : 'Official Press Releases'))
                  : activeTab === 'announcements'
                  ? (lang === 'zh' ? '集团重大决议与公告' : (lang === 'bn' ? 'গ্রুপের আনুষ্ঠানিক ঘোষণা' : 'Group Announcements'))
                  : (lang === 'zh' ? '全部发布内容' : (lang === 'bn' ? 'সকল প্রকাশনা' : 'All Published Releases'))}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F6F8F7] text-[#5A6170] border border-[#E2E8E4]">
                {filteredArticles?.length || 0} {lang === 'zh' ? '条记录' : (lang === 'bn' ? 'টি ফলাফল' : 'results')}
              </span>
            </div>

            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-[#E1232B] hover:underline cursor-pointer"
              >
                {lang === 'zh' ? '重置筛选条件' : (lang === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset Filters')}
              </button>
            )}
          </div>

          {/* Grid or Empty State */}
          {(filteredArticles?.length || 0) === 0 ? (
            <div className="text-center py-20 bg-[#F6F8F7] rounded-2xl border border-dashed border-[#E2E8E4]">
              <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#0E5C2E] mb-1">
                {lang === 'zh' ? '未找到匹配的新闻或公告' : (lang === 'bn' ? 'কোনো সংবাদ বা বিজ্ঞপ্তি পাওয়া যায়নি' : 'No releases found')}
              </h3>
              <p className="text-xs text-[#5A6170] max-w-md mx-auto mb-4">
                {lang === 'zh'
                  ? '请尝试调整搜索关键词或选择其他行业板块分类。'
                  : (lang === 'bn'
                    ? 'অনুগ্রহ করে অনুসন্ধান শব্দটি পরিবর্তন করুন বা অন্য কোনো বিভাগ নির্বাচন করুন।'
                    : 'Try changing your search terms or selecting a different sector filter.')}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="px-4 py-2 bg-[#0E5C2E] text-white rounded-lg text-xs font-bold hover:bg-[#1E9B4C] transition-colors cursor-pointer"
              >
                {lang === 'zh' ? '查看全部发布内容' : (lang === 'bn' ? 'সকল প্রকাশনা দেখুন' : 'View All Releases')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article: NewsArticle) => {
                const isPress = article.type === 'press';
                const isAnnounce = article.type === 'announcement';

                return (
                  <article
                    key={article.id}
                    className="bg-white rounded-2xl border border-[#E2E8E4] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#1E9B4C] transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Frame with Type & Category Badges */}
                      <div className="relative h-52 bg-[#06301A] overflow-hidden">
                        <img
                          src={article.image}
                          alt={lang === 'zh' ? (article.zhTitle || article.title) : (lang === 'bn' ? article.banglaTitle : article.title)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                        {/* Top Category Badge */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#06301A]/90 backdrop-blur-xs text-white font-bold text-[10px] uppercase tracking-wider border border-[#1E9B4C]/40 shadow-xs">
                          {lang === 'zh' ? (article.zhCategory || article.category) : (lang === 'bn' ? article.banglaCategory : article.category)}
                        </div>

                        {/* Top Right Type Badge */}
                        <div className="absolute top-3 right-3">
                          {isPress ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-600/90 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-xs shadow-xs">
                              <ShieldCheck className="w-3 h-3" />
                              <span>{lang === 'zh' ? '新闻稿' : (lang === 'bn' ? 'প্রেস বিজ্ঞপ্তি' : 'Press Release')}</span>
                            </span>
                          ) : isAnnounce ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-600/90 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-xs shadow-xs">
                              <Megaphone className="w-3 h-3" />
                              <span>{lang === 'zh' ? '集团公告' : (lang === 'bn' ? 'গ্রুপ ঘোষণা' : 'Announcement')}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1E9B4C]/90 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-xs shadow-xs">
                              <Newspaper className="w-3 h-3" />
                              <span>{lang === 'zh' ? '新闻' : (lang === 'bn' ? 'সংবাদ' : 'News')}</span>
                            </span>
                          )}
                        </div>

                        {/* Official Reference Code if Available */}
                        {article.officialRef && (
                          <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                            {article.officialRef}
                          </div>
                        )}
                      </div>

                      {/* Content Card Body */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-[#5A6170] mb-3 font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#1E9B4C]" />
                            <span>{formatArticleDate(article.date)}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#1E9B4C]" />
                            <span>{formatReadTime(article.readTime)}</span>
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-lg text-[#0E5C2E] mb-2.5 leading-snug group-hover:text-[#1E9B4C] transition-colors line-clamp-2">
                          {lang === 'zh' ? (article.zhTitle || article.title) : (lang === 'bn' ? article.banglaTitle : article.title)}
                        </h3>

                        <p className="text-xs text-[#5A6170] line-clamp-3 leading-relaxed">
                          {lang === 'zh' ? (article.zhSummary || article.summary) : (lang === 'bn' ? article.banglaSummary : article.summary)}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Action */}
                    <div className="p-6 pt-0 border-t border-[#E2E8E4]/60 mt-2">
                      <div className="pt-4 flex items-center justify-between">
                        <Link
                          to={`/newsroom/${article.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0E5C2E] group-hover:text-[#1E9B4C] transition-colors cursor-pointer"
                        >
                          <span>{lang === 'zh' ? '阅读全文' : (lang === 'bn' ? 'সম্পূর্ণ খবর পড়ুন' : 'Read Full Story')}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Corporate Media Contact & Assets Card */}
      <section id="media-inquiries" className="py-16 bg-[#F6F8F7] border-t border-[#E2E8E4] scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#06301A] to-[#042011] rounded-2xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-[#1E9B4C]/20">
            <div className="max-w-xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-2 block">
                {lang === 'zh' ? '媒体垂询与官方联络' : (lang === 'bn' ? 'মিডিয়া ও প্রেস যোগাযোগ' : 'MEDIA & CORPORATE INQUIRIES')}
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3">
                {lang === 'zh' 
                  ? '需要企业高管采访或官方新闻素材？' 
                  : (lang === 'bn' ? 'সরাসরি প্রেস যোগাযোগ ও তথ্য প্রাপ্তি' : 'Connect with our Global Media Relations Team')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                {lang === 'zh'
                  ? '我们为全球财经媒体、行业分析师及合作伙伴提供高清晰度企业视觉资产、官方新闻稿档案及高管采访预约渠道。'
                  : (lang === 'bn'
                    ? 'আন্তর্জাতিক সাংবাদিক ও প্রেস প্রতিনিধিদের জন্য সার্বক্ষণিক যোগাযোগ ও কর্পোরেট তথ্য সরবরাহ।'
                    : 'Our corporate communications desk provides verified press releases, executive commentary, high-res brand logos, and trade event credentials.')}
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#1E9B4C]" />
                  <span>media@sharabanglagroup.com</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#1E9B4C]" />
                  <span>+880 1888-019670 / +86 186 2008 2617</span>
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                to="/contact"
                className="px-6 py-3 bg-[#1E9B4C] text-white rounded-xl text-xs font-bold text-center hover:bg-[#16803C] transition-colors shadow-md cursor-pointer"
              >
                {lang === 'zh' ? '提交媒体联络申请' : (lang === 'bn' ? 'প্রেস যোগাযোগ করুন' : 'Contact Press Desk')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
