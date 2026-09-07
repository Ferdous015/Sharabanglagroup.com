import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
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
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  Copy, 
  Printer, 
  Linkedin, 
  Facebook, 
  MessageCircle,
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Mail, 
  ChevronRight, 
  Newspaper,
  ArrowRight,
  BookmarkCheck,
  Loader2
} from 'lucide-react';

export const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [articles, setArticles] = useState<NewsArticle[]>(defaultNewsArticles);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch live articles from Firestore
  useEffect(() => {
    async function loadArticles() {
      try {
        const liveArticles = await getNewsFromFirestore();
        if (liveArticles && liveArticles.length > 0) {
          setArticles(liveArticles);
        }
      } catch (err) {
        console.error('Error fetching live news in NewsDetail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  const currentIndex = articles.findIndex(a => a.slug === slug || a.id === slug);
  const article = currentIndex !== -1 ? articles[currentIndex] : null;

  if (!article && !loading) {
    return <Navigate to="/newsroom" replace />;
  }

  if (loading && !article) {
    return (
      <div className="min-h-screen bg-[#042011] flex flex-col items-center justify-center text-white pt-20">
        <Loader2 className="w-10 h-10 text-[#1E9B4C] animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-300">Loading publication details...</p>
      </div>
    );
  }

  if (!article) {
    return <Navigate to="/newsroom" replace />;
  }

  const prevArticle = currentIndex > 0 ? (articles || [])[currentIndex - 1] : null;
  const nextArticle = (articles?.length || 0) > 0 && currentIndex < (articles?.length || 0) - 1 ? (articles || [])[currentIndex + 1] : null;
  const relatedArticles = (articles || []).filter(a => a.id !== article.id && a.slug !== article.slug).slice(0, 3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = lang === 'zh' ? (article.zhTitle || article.title) : (lang === 'bn' ? article.banglaTitle : article.title);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <SEO 
        title={`${lang === 'zh' ? (article.zhTitle || article.title) : (lang === 'bn' ? article.banglaTitle : article.title)} | Sharabangla Group Newsroom`}
        description={lang === 'zh' ? (article.zhSummary || article.summary) : (lang === 'bn' ? article.banglaSummary : article.summary)}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#042011] text-white/80 border-b border-[#1E9B4C]/20 pt-28 pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-300 overflow-x-auto no-scrollbar py-1">
            <Link to="/" className="hover:text-white transition-colors shrink-0">
              {lang === 'zh' ? '首页' : (lang === 'bn' ? 'হোম' : 'Home')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <Link to="/newsroom" className="hover:text-white transition-colors shrink-0">
              {lang === 'zh' ? '新闻中心' : (lang === 'bn' ? 'নিউজ রুম' : 'Newsroom')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-[#1E9B4C] font-bold shrink-0">
              {lang === 'zh' ? (article.zhCategory || article.category) : (lang === 'bn' ? article.banglaCategory : article.category)}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-[#042011] to-[#06301A] text-white py-12 sm:py-16 border-b border-[#1E9B4C]/20 relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E9B4C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0E5C2E]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <Link
            to="/newsroom"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1E9B4C] hover:text-white transition-colors mb-6 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{lang === 'zh' ? '返回新闻中心' : (lang === 'bn' ? 'সকল সংবাদে ফিরে যান' : 'Back to Newsroom')}</span>
          </Link>

          {/* Category Pill & Verified Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3.5 py-1 rounded-full bg-[#1E9B4C] text-white text-xs font-black uppercase tracking-wider shadow-md">
              {lang === 'zh' ? (article.zhCategory || article.category) : (lang === 'bn' ? article.banglaCategory : article.category)}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-bold border border-white/15 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E9B4C]" />
              <span>{lang === 'zh' ? '官方新闻稿' : (lang === 'bn' ? 'অফিসিয়াল প্রেস রিলিজ' : 'Official Press Release')}</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
            {lang === 'zh' ? (article.zhTitle || article.title) : (lang === 'bn' ? article.banglaTitle : article.title)}
          </h1>

          {/* Executive Subtitle */}
          <p className="text-base sm:text-xl text-slate-200 font-medium leading-relaxed max-w-4xl mb-8 border-l-2 border-[#1E9B4C] pl-4">
            {lang === 'zh' ? (article.zhSummary || article.summary) : (lang === 'bn' ? article.banglaSummary : article.summary)}
          </p>

          {/* Metadata & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/15 text-xs text-slate-300">
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#1E9B4C]" />
                <span>
                  {lang === 'zh'
                    ? formatDateToChinese(article.date)
                    : lang === 'bn'
                    ? formatDateToBangla(article.date)
                    : formatDateForDisplay(article.date)}
                </span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#1E9B4C]" />
                <span>{article.readTime}</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium text-white/90">
                <Building2 className="w-4 h-4 text-[#1E9B4C]" />
                <span>{lang === 'zh' ? '沙拉邦拉集团企业新闻中心' : 'Sharabangla Group Corporate Bureau'}</span>
              </span>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                title="Copy Link"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/10 text-xs font-bold"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{lang === 'zh' ? '已复制！' : (lang === 'bn' ? 'কপি হয়েছে' : 'Copied!')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#1E9B4C]" />
                    <span>{lang === 'zh' ? '复制链接' : (lang === 'bn' ? 'লিংক কপি' : 'Copy Link')}</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                title="Print Article"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/10 hidden sm:flex"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="p-2 rounded-lg bg-[#0077b5]/20 hover:bg-[#0077b5] text-white transition-all border border-white/10"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${shareTitle} - ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on WhatsApp"
                className="p-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-white transition-all border border-white/10"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* Main Content & Sidebar Layout */}
      <section className="py-12 sm:py-16 bg-[#F6F8F7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left/Main Column: Article Content */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Featured Hero Image Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#E2E8E4] group">
                <div className="relative h-72 sm:h-96 md:h-[420px] bg-[#06301A] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 text-white">
                    <p className="text-xs sm:text-sm font-medium text-slate-200">
                      {lang === 'zh' 
                        ? '摄影 / 配图：沙拉邦拉集团企业传播与媒体档案处' 
                        : (lang === 'bn' ? 'ছবি: শারাবাংলা গ্রুপ করপোরেট মিডিয়া ও আর্কাইভস' : 'Photo: Sharabangla Group Corporate Communications & Media Archive')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Takeaways Card */}
              <div className="p-6 rounded-2xl bg-[#EAF6EE] border border-[#1E9B4C]/30 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <BookmarkCheck className="w-5 h-5 text-[#0E5C2E]" />
                  <h3 className="font-heading font-black text-base text-[#0E5C2E] uppercase tracking-wide">
                    {lang === 'zh' ? '核心要点概要' : (lang === 'bn' ? 'প্রতিবেদনের মূল বিষয়বস্তু' : 'Key Executive Takeaways')}
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#0E5C2E]/90 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E9B4C] mt-1.5 shrink-0" />
                    <span>
                      {lang === 'zh' 
                        ? '直接赋能孟加拉国跨境物流与贸易供应链效率与全球互联。' 
                        : (lang === 'bn' ? 'আন্তর্জাতিক বাণিজ্যে বাংলাদেশের সরবরাহ শৃঙ্খলকে আরও দ্রুত ও নির্ভরযোগ্য করার প্রত্যয়।' : 'Direct enhancement of Bangladesh’s cross-border logistics and trade supply chain efficiency.')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E9B4C] mt-1.5 shrink-0" />
                    <span>
                      {lang === 'zh' 
                        ? '实现东亚、中东及欧洲战略枢纽的无缝对接与多币种便捷清算。' 
                        : (lang === 'bn' ? 'গুয়াংজু, দুবাই ও ফ্রাঙ্কফুর্ট নেটওয়ার্কের সাথে দ্রুত সংযোগ ও মাল্টি-কারেন্সি ক্লিয়ারেন্স।' : 'Seamless synchronization across strategic regional corridors in East Asia, the Middle East, and Europe.')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E9B4C] mt-1.5 shrink-0" />
                    <span>
                      {lang === 'zh' 
                        ? '为中小企业与机构买家提供全流程透明定价与严格合规保障。' 
                        : (lang === 'bn' ? 'ক্ষুদ্র ও মাঝারি ব্যবসায়ীদের জন্য স্বচ্ছ মূল্য কাঠামো এবং শতভাগ কমপ্লায়েন্স নিশ্চয়তা।' : 'Empowering local SMEs and institutional buyers with end-to-end transparent pricing and compliance.')}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Body Text */}
              <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E2E8E4] shadow-xs">
                <div className="prose max-w-none text-base text-[#2B2B2B] leading-relaxed space-y-6">
                  {((lang === 'bn' && article.banglaContent) 
                    ? article.banglaContent 
                    : ((lang === 'zh' && article.zhContent) 
                        ? article.zhContent 
                        : article.content) || []
                  ).map((paragraph, idx) => {
                    const str = typeof paragraph === 'string' ? paragraph : String(paragraph || '');
                    const isQuote = str.startsWith('"') || str.startsWith("'") || str.startsWith('“');
                    
                    if (isQuote) {
                      return (
                        <blockquote 
                          key={idx} 
                          className="my-6 p-5 sm:p-6 rounded-xl bg-[#F6F8F7] border-l-4 border-[#1E9B4C] text-[#0E5C2E] font-medium text-base sm:text-lg italic leading-relaxed"
                        >
                          {str}
                        </blockquote>
                      );
                    }

                    return (
                      <p key={idx} className="text-[#2B2B2B] text-base sm:text-lg leading-relaxed">
                        {str}
                      </p>
                    );
                  })}
                </div>

                {/* Article Footer Note */}
                <div className="mt-10 pt-6 border-t border-[#E2E8E4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#5A6170]">
                  <div>
                    <span className="font-bold text-[#0E5C2E]">
                      {lang === 'zh' ? '新闻稿编号' : (lang === 'bn' ? 'প্রেস বিজ্ঞপ্তি আইডি' : 'Press Release ID')}:
                    </span>{' '}
                    <span className="font-mono">SBG-PR-{article.id.toUpperCase().slice(0, 8)}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#0E5C2E]">
                      {lang === 'zh' ? '发布机构' : (lang === 'bn' ? 'প্রকাশক' : 'Publisher')}:
                    </span>{' '}
                    <span>{lang === 'zh' ? '沙拉邦拉集团全球媒体局' : 'Sharabangla Group Global Media Bureau'}</span>
                  </div>
                </div>
              </div>

              {/* Prev / Next Article Navigation Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevArticle ? (
                  <Link
                    to={`/newsroom/${prevArticle.slug}`}
                    className="p-4 rounded-xl bg-white border border-[#E2E8E4] hover:border-[#1E9B4C] hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div className="text-[11px] font-extrabold uppercase text-[#5A6170] group-hover:text-[#1E9B4C] transition-colors mb-1 flex items-center gap-1">
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{lang === 'zh' ? '上一篇新闻' : (lang === 'bn' ? 'পূর্ববর্তী সংবাদ' : 'Previous Article')}</span>
                    </div>
                    <div className="font-heading font-extrabold text-xs sm:text-sm text-[#0E5C2E] line-clamp-2">
                      {lang === 'zh' ? (prevArticle.zhTitle || prevArticle.title) : (lang === 'bn' ? prevArticle.banglaTitle : prevArticle.title)}
                    </div>
                  </Link>
                ) : <div />}

                {nextArticle ? (
                  <Link
                    to={`/newsroom/${nextArticle.slug}`}
                    className="p-4 rounded-xl bg-white border border-[#E2E8E4] hover:border-[#1E9B4C] hover:shadow-md transition-all group flex flex-col justify-between text-right"
                  >
                    <div className="text-[11px] font-extrabold uppercase text-[#5A6170] group-hover:text-[#1E9B4C] transition-colors mb-1 flex items-center justify-end gap-1">
                      <span>{lang === 'zh' ? '下一篇新闻' : (lang === 'bn' ? 'পরবর্তী সংবাদ' : 'Next Article')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                    <div className="font-heading font-extrabold text-xs sm:text-sm text-[#0E5C2E] line-clamp-2">
                      {lang === 'zh' ? (nextArticle.zhTitle || nextArticle.title) : (lang === 'bn' ? nextArticle.banglaTitle : nextArticle.title)}
                    </div>
                  </Link>
                ) : <div />}
              </div>

            </div>

            {/* Right Column: Sticky Sidebar with Corporate Media Desk & Quick Links */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Media Contact Card */}
              <div className="bg-white rounded-2xl p-6 border border-[#E2E8E4] shadow-xs">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E2E8E4]">
                  <Mail className="w-4 h-4 text-[#1E9B4C]" />
                  <h3 className="font-heading font-extrabold text-sm text-[#0E5C2E] uppercase tracking-wider">
                    {lang === 'zh' ? '媒体与新闻联络处' : (lang === 'bn' ? 'গণমাধ্যম ও প্রেস যোগাযোগ' : 'Media & Press Contact')}
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-[#5A6170]">
                  <div>
                    <div className="font-bold text-[#0E5C2E]">
                      {lang === 'zh' ? '企业公关传播部' : (lang === 'bn' ? 'করপোরেট কমিউনিকেশন্স ব্যুরো' : 'Corporate Communications Bureau')}
                    </div>
                    <div className="mt-0.5">SHARABANGLA GROUP HQ</div>
                  </div>

                  <div>
                    <div className="font-semibold text-[#2B2B2B]">
                      {lang === 'zh' ? '官方媒体邮箱' : (lang === 'bn' ? 'ইমেইল' : 'Official Press Email')}:
                    </div>
                    <a 
                      href="mailto:press@sharabangla.com" 
                      className="text-[#1E9B4C] font-bold hover:underline"
                    >
                      press@sharabangla.com
                    </a>
                  </div>

                  <div>
                    <div className="font-semibold text-[#2B2B2B]">
                      {lang === 'zh' ? '总部地址' : (lang === 'bn' ? 'প্রধান কার্যালয়' : 'Headquarters')}:
                    </div>
                    <div className="text-[11px] leading-relaxed">
                      Sector-05, Uttara, Dhaka-1230, Bangladesh
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="w-full mt-3 py-2.5 px-4 rounded-xl bg-[#0E5C2E] hover:bg-[#1E9B4C] text-white font-extrabold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>{lang === 'zh' ? '提交媒体咨询' : (lang === 'bn' ? 'মিডিয়া ইনকোয়ারি পাঠান' : 'Submit Media Inquiry')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Group Ecosystem Quick Box */}
              <div className="bg-gradient-to-br from-[#06301A] to-[#042011] rounded-2xl p-6 text-white shadow-md border border-[#1E9B4C]/30">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#1E9B4C]" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#1E9B4C]">
                    SHARABANGLA ECOSYSTEM
                  </span>
                </div>
                <h4 className="font-heading font-extrabold text-base text-white mb-2 leading-snug">
                  {lang === 'zh' ? '贯通 8 大企业的全球贸易生态' : (lang === 'bn' ? 'বিশ্ববাণিজ্যে ৮টি সহায়ক প্রতিষ্ঠান' : 'Connecting Global Trade Across 8 Enterprises')}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {lang === 'zh' 
                    ? '整合航空包机、集装箱航运、合规生产制造及供应链金融。' 
                    : (lang === 'bn' 
                      ? 'লজিস্টিকস, ই-কমার্স, সাপ্লাই চেইন ও ম্যানুফ্যাকচারিংয়ের সমন্বিত শক্তিতে প্রতিষ্ঠিত।' 
                      : 'From cross-border air charters to certified manufacturing plants.')}
                </p>
                <Link
                  to="/companies"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#1E9B4C] hover:text-white transition-colors cursor-pointer"
                >
                  <span>{lang === 'zh' ? '探索全部下属企业' : (lang === 'bn' ? 'সকল কোম্পানি দেখুন' : 'Explore All Companies')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Quick Newsroom Navigation */}
              <div className="bg-white rounded-2xl p-6 border border-[#E2E8E4] shadow-xs">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E2E8E4]">
                  <Newspaper className="w-4 h-4 text-[#1E9B4C]" />
                  <h3 className="font-heading font-extrabold text-sm text-[#0E5C2E] uppercase tracking-wider">
                    {lang === 'zh' ? '最新其他新闻' : (lang === 'bn' ? 'সাম্প্রতিক অন্যান্য সংবাদ' : 'Recent News Headlines')}
                  </h3>
                </div>

                <div className="space-y-4">
                  {relatedArticles.map((rel: NewsArticle) => (
                    <Link
                      key={rel.id}
                      to={`/newsroom/${rel.slug}`}
                      className="block group"
                    >
                      <div className="text-[10px] font-black text-[#1E9B4C] uppercase tracking-wider mb-1">
                        {lang === 'zh' ? (rel.zhCategory || rel.category) : (lang === 'bn' ? rel.banglaCategory : rel.category)} • {lang === 'zh' ? formatDateToChinese(rel.date) : lang === 'bn' ? formatDateToBangla(rel.date) : formatDateForDisplay(rel.date)}
                      </div>
                      <h4 className="font-heading font-bold text-xs text-[#0E5C2E] group-hover:text-[#1E9B4C] transition-colors leading-snug line-clamp-2">
                        {lang === 'zh' ? (rel.zhTitle || rel.title) : (lang === 'bn' ? rel.banglaTitle : rel.title)}
                      </h4>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/newsroom"
                  className="mt-5 pt-3 border-t border-[#E2E8E4] w-full text-center text-xs font-bold text-[#0E5C2E] hover:text-[#1E9B4C] transition-colors block cursor-pointer"
                >
                  {lang === 'zh' ? '查看新闻中心完整归档 →' : (lang === 'bn' ? 'সকল সংবাদ ক্যাটাগরি দেখুন →' : 'View Full Newsroom Archive →')}
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* More News & Press Releases Bottom Strip */}
      <section className="py-16 bg-white border-t border-[#E2E8E4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-1">
                {lang === 'zh' ? '更多新闻动态' : (lang === 'bn' ? 'আরও পড়ুন' : 'MORE FROM PRESS')}
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-[#0E5C2E]">
                {lang === 'zh' ? '相关报道与最新动态' : (lang === 'bn' ? 'সম্পর্কিত সংবাদ ও প্রতিবেদন' : 'Related Stories & Press Updates')}
              </h3>
            </div>

            <Link
              to="/newsroom"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0E5C2E] hover:text-[#1E9B4C] transition-colors"
            >
              <span>{lang === 'zh' ? '查看全部' : (lang === 'bn' ? 'সবগুলো দেখুন' : 'View All')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel: NewsArticle) => (
              <article
                key={rel.id}
                className="bg-white rounded-xl border border-[#E2E8E4] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#1E9B4C] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-40 bg-[#06301A] overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#06301A]/90 text-white font-bold text-[9px] uppercase tracking-wider border border-[#1E9B4C]/40 backdrop-blur-xs">
                      {lang === 'zh' ? (rel.zhCategory || rel.category) : (lang === 'bn' ? rel.banglaCategory : rel.category)}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-[11px] text-[#5A6170] mb-2 font-medium">
                      {rel.date} • {rel.readTime}
                    </div>
                    <h4 className="font-heading font-bold text-sm text-[#0E5C2E] group-hover:text-[#1E9B4C] transition-colors line-clamp-2 leading-snug">
                      {lang === 'zh' ? (rel.zhTitle || rel.title) : (lang === 'bn' ? rel.banglaTitle : rel.title)}
                    </h4>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/newsroom/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#0E5C2E] group-hover:text-[#1E9B4C] transition-colors"
                  >
                    <span>{lang === 'zh' ? '阅读全文' : (lang === 'bn' ? 'পড়ুন' : 'Read')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

