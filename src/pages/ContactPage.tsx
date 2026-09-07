import React, { useState, useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';
import { globalLocations, siteInfo as defaultSiteInfo, SiteInfo } from '../data/site';
import { getSiteInfoFromFirestore } from '../services/contactService';
import { Phone, Mail, MapPin, ExternalLink, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactPage: React.FC = () => {
  const { lang } = useLanguage();
  const [siteData, setSiteData] = useState<SiteInfo>(defaultSiteInfo);

  useEffect(() => {
    let isMounted = true;
    getSiteInfoFromFirestore()
      .then((data) => {
        if (data && isMounted) {
          setSiteData(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching ContactPage site info:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <SEO 
        title={
          lang === 'zh'
            ? '联系我们 — 全球注册机构与贸易枢纽'
            : (lang === 'bn' ? 'যোগাযোগ — আন্তর্জাতিক কার্যালয় ও ট্রেড হাব' : 'Contact Us — Global Offices & Trade Hubs')
        }
        description={
          lang === 'zh'
            ? '联系沙拉邦拉集团位于孟加拉国达卡的全球总部，或中国广州、印度加尔各答及阿联酋迪拜的注册办事机构。'
            : (lang === 'bn'
              ? 'শারাবাংলা গ্রুপের ঢাকায় প্রধান কার্যালয় অথবা চীন, ভারত ও দুবাইয়ের নিবন্ধিত কার্যালয়ের সাথে যোগাযোগ করুন।'
              : 'Contact Sharabangla Group corporate headquarters in Dhaka, Bangladesh or registered offices in China, India, and Dubai.')
        }
      />

      {/* Hero */}
      <section className="bg-[#06301A] text-white pt-32 pb-20 border-b border-[#1E9B4C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-3 block">
            {lang === 'zh' ? '全球联络与沟通渠道' : (lang === 'bn' ? 'যোগাযোগ ও আন্তর্জাতিক তথ্য' : 'GET IN TOUCH')}
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-4">
            {lang === 'zh' ? '联系沙拉邦拉集团' : (lang === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Contact Sharabangla Group')}
          </h1>
          <p className="text-slate-200 text-lg max-w-2xl">
            {lang === 'zh'
              ? '随时联络我们位于达卡的集团全球企业总部，或直接对接我们遍布亚洲、中东及欧美的区域贸易代表机构。'
              : (lang === 'bn'
                ? 'আমাদের ঢাকায় অবস্থিত নির্বাহী প্রধান কার্যালয় অথবা এশিয়া ও মধ্যপ্রাচ্যে আমাদের নিবন্ধিত আন্তর্জাতিক কার্যালয়গুলোর সাথে সরাসরি যোগাযোগ করুন।'
                : 'Reach our executive headquarters in Dhaka or connect directly with our regional trade offices across Asia and the Middle East.')}
          </p>
        </div>
      </section>

      {/* Global Registered Offices Grid */}
      <section className="py-20 bg-white text-[#2B2B2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E2E8E4]">
            <div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E]">
                {lang === 'zh' ? '全球注册办事处与核心商贸枢纽' : (lang === 'bn' ? 'নিবন্ধিত আন্তর্জাতিক কার্যালয়সমূহ' : 'Registered Global Offices & Trade Hubs')}
              </h2>
              <p className="text-xs sm:text-sm text-[#5A6170] mt-1">
                {lang === 'zh'
                  ? '集团公司治理、跨国贸易咨询与区域商贸运营的直接联络通道。'
                  : (lang === 'bn'
                    ? 'আন্তর্জাতিক বাণিজ্য, করপোরেট সুশাসন ও আঞ্চলিক যোগাযোগের স্থায়ী ঠিকানা'
                    : 'Direct contact coordinates for corporate governance, trade inquiries, and regional trade operations.')}
              </p>
            </div>
            <Link
              to="/global-presence"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0E5C2E] hover:text-[#1E9B4C] transition-colors cursor-pointer"
            >
              <span>{lang === 'zh' ? '查看交互式全球贸易地图' : (lang === 'bn' ? 'ইন্টারেক্টিভ গ্লোবাল ম্যাপ দেখুন' : 'Explore Interactive Global Map')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {globalLocations.map((loc) => (
              <div
                key={loc.id}
                className="p-6 rounded-2xl border border-[#E2E8E4] bg-[#F6F8F7] hover:bg-white hover:border-[#1E9B4C] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#E2E8E4]">
                    <span className="font-heading font-bold text-lg text-[#0E5C2E] flex items-center gap-2">
                      <span className="text-2xl">{loc.flag}</span>
                      <span>
                        {lang === 'zh'
                          ? `${loc.zhCity || loc.city}，${loc.zhCountry || loc.country}`
                          : (lang === 'bn' ? `${loc.banglaCity || loc.city}, ${loc.banglaCountry || loc.country}` : `${loc.city}, ${loc.country}`)}
                      </span>
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md bg-[#06301A] text-white tracking-wider">
                      {lang === 'zh' ? (loc.zhType || loc.type) : (lang === 'bn' ? (loc.banglaType || loc.type) : loc.type)}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-[#5A6170] my-4">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#1E9B4C] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        {loc.id === 'dhaka'
                          ? (lang === 'zh'
                              ? (siteData?.zhHeadquarters || loc.zhAddress || loc.address)
                              : (lang === 'bn' ? (siteData?.banglaHeadquarters || loc.banglaAddress || loc.address) : (siteData?.headquarters || loc.address)))
                          : (lang === 'zh' ? (loc.zhAddress || loc.address) : (lang === 'bn' ? (loc.banglaAddress || loc.address) : loc.address))}
                      </span>
                    </div>

                    {(() => {
                      const rawPhone = loc.id === 'dhaka' ? (siteData?.phone || loc.phone) : loc.phone;
                      if (!rawPhone) return null;
                      const telNumber = String(rawPhone).split('/')[0]?.replace(/\s+/g, '') || '';
                      return (
                        <div className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 text-[#1E9B4C] shrink-0" />
                          <a
                            href={`tel:${telNumber}`}
                            className="font-semibold text-[#2B2B2B] hover:text-[#0E5C2E] hover:underline"
                          >
                            {rawPhone}
                          </a>
                        </div>
                      );
                    })()}

                    {(() => {
                      const rawEmail = loc.id === 'dhaka' ? (siteData?.email || loc.email) : loc.email;
                      if (!rawEmail) return null;
                      return (
                        <div className="flex items-center gap-2.5">
                          <Mail className="w-4 h-4 text-[#1E9B4C] shrink-0" />
                          <a
                            href={`mailto:${rawEmail}`}
                            className="font-semibold text-[#0E5C2E] hover:text-[#1E9B4C] hover:underline"
                          >
                            {rawEmail}
                          </a>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2E8E4]">
                  <span className="text-[10px] font-bold text-[#0E5C2E] uppercase tracking-wider block mb-1.5">
                    {lang === 'zh' ? '主要覆盖与服务区域：' : (lang === 'bn' ? 'প্রধান আওতাভুক্ত অঞ্চল:' : 'Primary Regional Coverage:')}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(
                      (lang === 'zh' && loc.zhMarketsServed
                        ? loc.zhMarketsServed
                        : (lang === 'bn' && loc.banglaMarketsServed ? loc.banglaMarketsServed : loc.marketsServed)) || []
                    ).map((market, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-[#E2E8E4] text-[#0E5C2E]"
                      >
                        {market}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
