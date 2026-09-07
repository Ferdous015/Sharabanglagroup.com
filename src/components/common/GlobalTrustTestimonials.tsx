import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { testimonials as defaultTestimonials, Testimonial } from '../../data/site';
import { getTestimonialsFromFirestore } from '../../services/testimonialsService';
import { Quote, Globe, ShieldCheck, Sparkles } from 'lucide-react';

interface GlobalTrustTestimonialsProps {
  className?: string;
}

export const GlobalTrustTestimonials: React.FC<GlobalTrustTestimonialsProps> = ({
  className = ''
}) => {
  const { lang } = useLanguage();
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [liveTestimonials, setLiveTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchTestimonials() {
      try {
        const data = await getTestimonialsFromFirestore();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setLiveTestimonials(data);
        }
      } catch (err) {
        console.warn('Could not fetch live testimonials from Firestore, using default site testimonials:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  // Use live testimonials if available, otherwise safely default to static site testimonials
  const activeItems: Testimonial[] =
    liveTestimonials.length > 0
      ? liveTestimonials
      : (Array.isArray(defaultTestimonials) ? defaultTestimonials : []);

  // Duplicate testimonials to create a seamless 0% to -50% translateX loop
  const marqueeItems = activeItems.length > 0 ? [...activeItems, ...activeItems] : [];

  const handleImgError = (key: string) => {
    setImgErrors(prev => ({ ...prev, [key]: true }));
  };

  return (
    <section id="testimonials" className={`py-20 bg-[#F6F8F7] text-[#2B2B2B] relative overflow-hidden border-t border-[#E2E8E4] scroll-mt-28 ${className}`}>
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E9B4C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0E5C2E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF6EE] border border-[#1E9B4C]/30 text-[#0E5C2E] text-xs font-black tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#1E9B4C]" />
            <span>
              {lang === 'zh'
                ? '全球信赖与国际商业伙伴评价'
                : lang === 'bn'
                ? 'বৈশ্বিক আস্থা ও আন্তর্জাতিক অংশীদারিত্ব'
                : 'Global Trust & Partner Testimonials'}
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0E5C2E] tracking-tight mb-4">
            {lang === 'zh'
              ? '来自我们全球运营市场的信任心声'
              : lang === 'bn' 
              ? 'বিশ্ববাজারের অংশীদার ও ক্রেতাদের নির্ভরযোগ্য অভিজ্ঞতা' 
              : 'Voices of Trust Across Our Global Operating Markets'}
          </h2>

          <p className="text-[#5A6170] text-sm sm:text-base leading-relaxed">
            {lang === 'zh'
              ? '来自覆盖8大全球贸易区域的供应链总监、采购经理与进口买家的真实评价与信赖之声。'
              : lang === 'bn'
              ? 'গুয়াংজু, হাংচৌ, শেনজেন, বেইজিং, কলকাতা, দুবাই, হো চি মিন সিটি, হংকং, নিউ ইয়র্ক ও ফ্রাঙ্কফুর্টের ১৮ জন আন্তর্জাতিক বাণিজ্যিক অংশীদার ও সাপ্লাই চেইন নির্বাহীর মূল্যায়ন।'
              : 'Authentic perspectives from supply chain directors, sourcing managers, and import buyers across our 8 global trading territories.'}
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Auto-Scrolling Marquee Container */}
      <div className="relative w-full overflow-hidden marquee-container py-2">
        {/* Subtle gradient edge masks for smooth appearance */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#F6F8F7] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#F6F8F7] to-transparent z-20" />

        {/* Marquee Row */}
        <div className="animate-marquee flex items-stretch gap-6 pl-6 will-change-transform">
          {marqueeItems.map((item: Testimonial, index: number) => {
            const itemKey = `${item.id}-${index}`;
            const hasError = imgErrors[itemKey];

            return (
              <div
                key={itemKey}
                className="w-[340px] sm:w-[370px] shrink-0 p-6 rounded-2xl bg-white border border-[#E2E8E4] shadow-xs hover:shadow-xl hover:border-[#1E9B4C] transition-all duration-300 flex flex-col justify-between group relative select-none"
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[#1E9B4C]/20 via-[#1E9B4C] to-[#1E9B4C]/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-b" />

                <div>
                  {/* Card Header: Headshot Photo + Name/Title + Country Flag */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3.5">
                      {/* Circular Headshot with Gold/Green ring */}
                      <div className="relative shrink-0">
                        {hasError || !item.photoUrl ? (
                          <div className="w-13 h-13 rounded-full bg-[#EAF6EE] border-2 border-[#1E9B4C] flex items-center justify-center text-[#0E5C2E] font-black text-base shadow-sm">
                            {(item.name || '?').charAt(0)}
                          </div>
                        ) : (
                          <img
                            src={item.photoUrl}
                            alt={item.name || 'Partner'}
                            onError={() => handleImgError(itemKey)}
                            className="w-13 h-13 rounded-full object-cover border-2 border-[#1E9B4C] ring-2 ring-emerald-500/20 shadow-md transition-transform group-hover:scale-105"
                            loading="lazy"
                          />
                        )}
                        <span className="absolute -bottom-1 -right-1 text-sm bg-white rounded-full p-0.5 shadow-xs leading-none">
                          {item.flag || '🌐'}
                        </span>
                      </div>

                      {/* Name & Title */}
                      <div className="min-w-0">
                        <h4 className="font-heading font-extrabold text-base text-[#0E5C2E] leading-tight group-hover:text-[#1E9B4C] transition-colors truncate">
                          {lang === 'zh' ? (item.zhName || item.name) : (lang === 'bn' ? item.banglaName : item.name)}
                        </h4>
                        <p className="text-xs font-semibold text-[#5A6170] mt-0.5 leading-snug">
                          {lang === 'zh' ? (item.zhTitle || item.title) : (lang === 'bn' ? item.banglaTitle : item.title)}
                        </p>
                        {item.company && (
                          <p className="text-[11px] text-[#1E9B4C] font-medium mt-0.5 truncate">
                            {lang === 'zh' ? (item.zhCompany || item.company) : (lang === 'bn' ? item.banglaCompany : item.company)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subtle Quote Icon */}
                    <div className="w-8 h-8 rounded-full bg-[#F6F8F7] flex items-center justify-center text-[#1E9B4C] shrink-0 border border-[#E2E8E4] group-hover:bg-[#EAF6EE] transition-colors">
                      <Quote className="w-4 h-4 fill-current opacity-80" />
                    </div>
                  </div>

                  {/* Quote Body */}
                  <p className="text-xs sm:text-[13px] text-[#2B2B2B] leading-relaxed italic mb-5 relative">
                    "{lang === 'zh' ? (item.zhQuote || item.quote) : (lang === 'bn' ? item.banglaQuote : item.quote)}"
                  </p>
                </div>

                {/* Card Footer: Market & Verification Badge */}
                <div className="pt-3.5 border-t border-[#E2E8E4] flex items-center justify-between text-[11px] text-[#5A6170]">
                  <div className="flex items-center gap-1.5 font-bold text-[#0E5C2E]">
                    <Globe className="w-3.5 h-3.5 text-[#1E9B4C] shrink-0" />
                    <span>{lang === 'zh' ? (item.zhMarket || item.market) : (lang === 'bn' ? item.banglaMarket : item.market)}</span>
                  </div>

                  <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-extrabold border border-emerald-200 text-[10px]">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{lang === 'zh' ? '认证全球伙伴' : (lang === 'bn' ? 'যাচাইকৃত পার্টনার' : 'Verified Partner')}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Trust Metrics Band */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-12">
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8E4] shadow-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-[#0E5C2E]">18+</div>
            <div className="text-xs text-[#5A6170] font-bold mt-1">
              {lang === 'zh'
                ? '国际合作伙伴权威背书'
                : lang === 'bn'
                ? 'আন্তর্জাতিক পার্টনার সনদ'
                : 'International Partner Endorsements'}
            </div>
          </div>
          <div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-[#1E9B4C]">8</div>
            <div className="text-xs text-[#5A6170] font-bold mt-1">
              {lang === 'zh'
                ? '全球核心运营区域'
                : lang === 'bn'
                ? 'বৈশ্বিক অপারেটিং টেরিটরি'
                : 'Global Operating Territories'}
            </div>
          </div>
          <div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-[#0E5C2E]">99.4%</div>
            <div className="text-xs text-[#5A6170] font-bold mt-1">
              {lang === 'zh'
                ? '准时清关与货物交付率'
                : lang === 'bn'
                ? 'অন-টাইম কার্গো ক্লিয়ারেন্স'
                : 'On-Time Cargo Clearance Rate'}
            </div>
          </div>
          <div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-[#1E9B4C]">100%</div>
            <div className="text-xs text-[#5A6170] font-bold mt-1">
              {lang === 'zh'
                ? '法律与海关合规达标率'
                : lang === 'bn'
                ? 'আইনি ও কাস্টমস কমপ্লায়েন্স'
                : 'Legal & Customs Compliance'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
