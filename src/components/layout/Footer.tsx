import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { siteInfo as defaultSiteInfo, SiteInfo, companies, globalLocations } from '../../data/site';
import { getSiteInfoFromFirestore } from '../../services/contactService';
import { SbgLogo } from '../common/SbgLogo';
import { Globe, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [siteData, setSiteData] = useState<SiteInfo>(defaultSiteInfo);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getSiteInfoFromFirestore()
      .then((data) => {
        if (data && isMounted) {
          setSiteData(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching footer site info:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#06301A] text-white border-t border-[#1E9B4C]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Group Identity Band */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-center">
          <div className="lg:col-span-6">
            <div className="mb-4">
              <SbgLogo 
                variant="white"
                size="lg"
                isDarkBg={true}
                showTagline={true}
              />
            </div>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          <div className="lg:col-span-6 bg-[#0E5C2E]/80 p-6 rounded-xl border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1E9B4C] mb-2">
              {t('footer.newsletterTitle')}
            </h3>
            {subscribed ? (
              <div className="flex items-center gap-2 text-[#1E9B4C] text-sm font-medium py-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>
                  {lang === 'zh' 
                    ? '感谢您订阅沙拉邦拉集团的最新动态资讯。' 
                    : (lang === 'bn' 
                      ? 'শারাবাংলা গ্রুপ আপডেটে সাবস্ক্রাইব করার জন্য ধন্যবাদ।' 
                      : 'Thank you for subscribing to Sharabangla Group updates.')}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletterPlaceholder')}
                  className="flex-1 bg-[#06301A] border border-white/20 rounded-md px-3.5 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#1E9B4C]"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-[#1E9B4C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0E5C2E] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>{t('footer.subscribeBtn')}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Columns Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-white/10">
          
          {/* Column 1: Core Divisions & Group */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-4">
              {t('footer.colGroup')}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link to="/about" className="hover:text-[#1E9B4C] transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/leadership" className="hover:text-[#1E9B4C] transition-colors">{t('nav.leadership')}</Link></li>
              <li><Link to="/global-presence" className="hover:text-[#1E9B4C] transition-colors">{t('nav.globalPresence')}</Link></li>
              <li><Link to="/sustainability" className="hover:text-[#1E9B4C] transition-colors">{t('nav.sustainability')}</Link></li>
              <li><Link to="/newsroom" className="hover:text-[#1E9B4C] transition-colors">{t('nav.newsroom')}</Link></li>
              <li><Link to="/careers" className="hover:text-[#1E9B4C] transition-colors">{t('nav.careers')}</Link></li>
              <li><Link to="/contact" className="hover:text-[#1E9B4C] transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/partner" className="hover:text-[#1E9B4C] transition-colors">{t('nav.partner')}</Link></li>
            </ul>
          </div>

          {/* Column 2: Sister Concerns (7 Companies) */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-4">
              {t('footer.colConcerns')}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {companies.map(c => (
                <li key={c.id}>
                  <Link 
                    to={`/companies/${c.slug}`}
                    className="hover:text-[#1E9B4C] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E9B4C]"></span>
                    <span>{lang === 'zh' ? (c.zhName || c.name) : (lang === 'bn' ? c.banglaName : c.name)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Registered Offices & Key Locations */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-4">
              {t('footer.colOffices')}
            </h4>
            <div className="space-y-4 text-xs text-slate-300">
              {globalLocations.slice(0, 4).map(loc => (
                <div key={loc.id} className="border-l-2 border-[#1E9B4C]/60 pl-3 py-0.5">
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>{loc.flag}</span>
                    <span>
                      {lang === 'zh' ? (loc.zhCity || loc.city) : (lang === 'bn' ? loc.banglaCity : loc.city)},{' '}
                      {lang === 'zh' ? (loc.zhCountry || loc.country) : (lang === 'bn' ? loc.banglaCountry : loc.country)}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-0.5 line-clamp-1">
                    {lang === 'zh' ? (loc.zhAddress || loc.address) : (lang === 'bn' ? loc.banglaAddress : loc.address)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Socials */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-4">
              {t('nav.contact')}
            </h4>
            <div className="space-y-3 text-sm text-slate-300 mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1E9B4C] mt-1 shrink-0" />
                <span>
                  {lang === 'zh' 
                    ? (siteData?.zhHeadquarters || '孟加拉国达卡市乌塔拉第5区（Sector-05, Uttara, Dhaka-1230）') 
                    : (lang === 'bn' ? (siteData?.banglaHeadquarters || '৩য়, ৪র্থ ও ৫ম তলা, বাড়ি ৫০, রোড ০১, সেক্টর-০৫, উত্তরা, ঢাকা, বাংলাদেশ') : (siteData?.headquarters || defaultSiteInfo.headquarters))}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#1E9B4C] shrink-0" />
                <a href={`mailto:${siteData?.email || 'sharabangla.group@gmail.com'}`} className="hover:text-[#1E9B4C] transition-colors">
                  {siteData?.email || 'sharabangla.group@gmail.com'}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#1E9B4C] shrink-0" />
                <a href={`tel:${String(siteData?.phone || '+8801811509999').replace(/\s+/g, '')}`} className="hover:text-[#1E9B4C] transition-colors">
                  {siteData?.phone || '+880 1811 509999'}
                </a>
              </div>
            </div>

            {/* 3-Language Selector in Footer */}
            <div className="pt-2">
              <div className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#1E9B4C]" />
                <span>{lang === 'zh' ? '选择语言：' : (lang === 'bn' ? 'ভাষা নির্বাচন করুন:' : 'Select Language:')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold border transition-colors cursor-pointer ${
                    lang === 'en'
                      ? 'bg-[#1E9B4C] border-[#1E9B4C] text-white font-bold'
                      : 'bg-[#0E5C2E] border-white/20 text-slate-200 hover:border-[#1E9B4C]'
                  }`}
                  aria-label="Switch language to English"
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang('zh')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold font-chinese border transition-colors cursor-pointer ${
                    lang === 'zh'
                      ? 'bg-[#1E9B4C] border-[#1E9B4C] text-white font-bold'
                      : 'bg-[#0E5C2E] border-white/20 text-slate-200 hover:border-[#1E9B4C]'
                  }`}
                  aria-label="切换语言为简体中文"
                >
                  中文
                </button>
                <button
                  type="button"
                  onClick={() => setLang('bn')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold font-bangla border transition-colors cursor-pointer ${
                    lang === 'bn'
                      ? 'bg-[#1E9B4C] border-[#1E9B4C] text-white font-bold'
                      : 'bg-[#0E5C2E] border-white/20 text-slate-200 hover:border-[#1E9B4C]'
                  }`}
                  aria-label="ভাষা পরিবর্তন করুন: বাংলা"
                >
                  বাংলা
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright and Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Sharabangla Group. {lang === 'zh' ? '保留所有权利。' : (lang === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.')}
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">{t('footer.sitemap')}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
