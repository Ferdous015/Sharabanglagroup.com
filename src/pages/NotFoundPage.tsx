import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { SbgLogo } from '../components/common/SbgLogo';
import { useLanguage } from '../context/LanguageContext';
import { Home, FileQuestion } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <>
      <SEO 
        title={lang === 'zh' ? '404 页面未找到' : (lang === 'bn' ? '৪০৪ পেজ পাওয়া যায়নি' : '404 Page Not Found')}
        description={
          lang === 'zh' 
            ? '您所请求的页面在沙拉邦拉集团官方网站上不存在。' 
            : (lang === 'bn' 
              ? 'অনুরোধকৃত পৃষ্ঠাটি শারাবাংলা গ্রুপের কর্পোরেট ওয়েবসাইটে পাওয়া যায়নি।' 
              : 'The requested page could not be found on Sharabangla Group corporate website.')
        }
      />

      <section className="bg-[#06301A] text-white min-h-[80vh] pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute w-96 h-96 rounded-full bg-[#1E9B4C]/10 blur-3xl -top-20 -right-20 pointer-events-none" />
        
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-6 border border-white/20">
            <SbgLogo variant="emblem-standard" height={60} />
          </div>

          <span className="text-sm font-extrabold uppercase tracking-widest text-[#E1232B] mb-2 block">
            {lang === 'zh' ? '错误代码 404' : (lang === 'bn' ? 'ত্রুটি ৪০৪' : 'ERROR 404')}
          </span>

          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-4">
            {lang === 'zh' ? '页面未找到' : (lang === 'bn' ? 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি' : 'Page Not Found')}
          </h1>

          <p className="text-slate-200 text-base sm:text-lg mb-8 leading-relaxed max-w-lg mx-auto">
            {lang === 'zh'
              ? '您所访问的页面可能已被移动、更名或暂时不可用。欢迎返回沙拉邦拉集团官网首页继续浏览。'
              : (lang === 'bn'
                ? 'আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত, পুনঃনামকরণ বা সাময়িকভাবে অনুপলব্ধ হতে পারে। কর্পোরেট পোর্টাল ব্রাউজ করতে হোমপেজে ফিরে যান।'
                : 'The page you are looking for may have been moved, renamed, or is temporarily unavailable. Return to Sharabangla Group homepage to navigate our corporate portal.')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#1E9B4C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0E5C2E] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Home className="w-4 h-4 text-white" />
              <span>{lang === 'zh' ? '返回官方首页' : (lang === 'bn' ? 'হোমপেজে ফিরে যান' : 'Back to Homepage')}</span>
            </Link>
            
            <Link
              to="/companies"
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-white/10 text-white border border-white/20 font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileQuestion className="w-4 h-4 text-[#1E9B4C]" />
              <span>{lang === 'zh' ? '探索集团企业' : (lang === 'bn' ? 'গ্রুপের কোম্পানিসমূহ দেখুন' : 'Explore Group Companies')}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
