import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { newsArticles, NewsArticle } from '../../data/site';
import { 
  formatDateForDisplay,
  formatDateToBangla,
  formatDateToChinese
} from '../../utils/dateUtils';
import { ArrowRight, Calendar, Clock, Newspaper } from 'lucide-react';

export const S13_NewsroomPreview: React.FC = () => {
  const { lang, t } = useLanguage();

  // Duplicate the news articles to create a seamless infinite left-to-right loop
  const marqueeArticles = [...newsArticles, ...newsArticles];

  return (
    <section className="py-20 sm:py-24 bg-white text-[#2B2B2B] border-t border-[#E2E8E4] overflow-hidden relative">
      {/* Background glow accents */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#1E9B4C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0E5C2E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF6EE] border border-[#1E9B4C]/30 text-[#0E5C2E] text-xs font-black tracking-widest uppercase mb-3">
              <Newspaper className="w-3.5 h-3.5 text-[#1E9B4C]" />
              <span>{t('newsSection.tag')}</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0E5C2E] tracking-tight">
              {t('newsSection.title')}
            </h2>
          </div>

          <Link
            to="/newsroom"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0E5C2E] hover:text-[#1E9B4C] transition-colors cursor-pointer group"
          >
            <span>{t('newsSection.viewAll')}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Infinite Horizontal Auto-Scrolling Marquee (Left to Right / বাম থেকে ডান) */}
      <div className="relative w-full overflow-hidden news-marquee-container py-3">
        {/* Subtle gradient edge masks for smooth entrance/exit */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-20" />

        {/* Marquee Row Scrolling Left to Right */}
        <div className="animate-marquee-ltr flex items-stretch gap-6 pl-6 will-change-transform">
          {marqueeArticles.map((article: NewsArticle, index: number) => {
            const articleKey = `${article.id}-${index}`;

            return (
              <article
                key={articleKey}
                className="w-[330px] sm:w-[380px] shrink-0 bg-white rounded-2xl border border-[#E2E8E4] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#1E9B4C] transition-all duration-300 flex flex-col justify-between group select-none relative"
              >
                {/* Top highlight bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E9B4C]/20 via-[#1E9B4C] to-[#1E9B4C]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />

                <div>
                  {/* Image */}
                  <Link 
                    to={`/newsroom/${article.slug}`}
                    className="block relative h-48 overflow-hidden bg-[#06301A] cursor-pointer"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#06301A]/90 text-white font-bold text-[10px] uppercase tracking-wider border border-[#1E9B4C]/40 backdrop-blur-md">
                      {lang === 'zh' ? (article.zhCategory || article.category) : (lang === 'bn' ? article.banglaCategory : article.category)}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-[#5A6170] mb-3">
                      <span className="flex items-center gap-1 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-[#1E9B4C]" />
                        <span>
                          {lang === 'zh' 
                            ? formatDateToChinese(article.date)
                            : lang === 'bn'
                            ? formatDateToBangla(article.date)
                            : formatDateForDisplay(article.date)}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-[#1E9B4C]" />
                        <span>
                          {lang === 'zh' 
                            ? article.readTime.replace('min read', '分钟阅读') 
                            : (lang === 'bn' ? article.readTime.replace('min read', 'মিনিট পাঠ') : article.readTime)}
                        </span>
                      </span>
                    </div>

                    <Link to={`/newsroom/${article.slug}`} className="block cursor-pointer">
                      <h3 className="font-heading font-extrabold text-lg text-[#0E5C2E] mb-2 leading-snug group-hover:text-[#1E9B4C] transition-colors line-clamp-2">
                        {lang === 'zh' ? (article.zhTitle || article.title) : (lang === 'bn' ? article.banglaTitle : article.title)}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#5A6170] line-clamp-3 leading-relaxed">
                      {lang === 'zh' ? (article.zhSummary || article.summary) : (lang === 'bn' ? article.banglaSummary : article.summary)}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#E2E8E4]/60 mt-auto">
                  <Link
                    to={`/newsroom/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0E5C2E] group-hover:text-[#1E9B4C] transition-colors mt-4 cursor-pointer"
                  >
                    <span>{lang === 'zh' ? '阅读全文' : (lang === 'bn' ? 'প্রতিবেদন পড়ুন' : 'Read Article')}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
