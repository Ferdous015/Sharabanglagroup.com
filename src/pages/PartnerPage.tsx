import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';
import { partnerPrograms } from '../data/site';
import { GlobalTrustTestimonials } from '../components/common/GlobalTrustTestimonials';
import { 
  Mail, 
  Copy, 
  CheckCheck, 
  ExternalLink, 
  Paperclip, 
  Send 
} from 'lucide-react';

export const PartnerPage: React.FC = () => {
  const { lang } = useLanguage();
  const [partnerType, setPartnerType] = useState<string>('supplier');
  const [copied, setCopied] = useState(false);

  const corporateEmail = 'sharabangla.group@gmail.com';

  const categoryDetails: Record<string, {
    categoryLabel: { en: string; bn: string; zh: string };
    instruction: { en: string; bn: string; zh: string };
    suggestedSubject: { en: string; bn: string; zh: string };
    subjectQuery: string;
  }> = {
    supplier: {
      categoryLabel: { en: 'SUPPLIER', bn: 'সাপ্লায়ার', zh: '全球供应商' },
      instruction: {
        en: 'To apply as a Global Supplier, please email us your company profile, product catalog, and manufacturing capacity details.',
        bn: 'গ্লোবাল সাপ্লায়ার হিসেবে যুক্ত হতে, অনুগ্রহ করে আপনার কোম্পানির প্রোফাইল, পণ্য ক্যাটালগ এবং উৎপাদন সক্ষমতার বিবরণ আমাদের ইমেইলে প্রেরণ করুন।',
        zh: '申请成为全球供应商合作伙伴，请将您的企业简介、产品目录与生产产能说明发送至我们的官方邮箱。'
      },
      suggestedSubject: {
        en: 'Suggested Subject: Global Supplier Inquiry — [Company Name]',
        bn: 'প্রস্তাবিত বিষয়: Global Supplier Inquiry — [কোম্পানির নাম]',
        zh: '建议邮件主题：Global Supplier Inquiry — [公司名称]'
      },
      subjectQuery: 'Global Supplier Inquiry — [Company Name]'
    },
    buyer: {
      categoryLabel: { en: 'BUYER', bn: 'বায়ার', zh: '大宗采购商' },
      instruction: {
        en: 'To register as a Trade Buyer, please email us your sourcing requirements, order volumes, and business registration details.',
        bn: 'ট্রেড বায়ার হিসেবে নিবন্ধিত হতে, অনুগ্রহ করে আপনার সোর্সিং প্রয়োজনীয়তা, অর্ডারের পরিমাণ এবং ব্যবসায়িক নিবন্ধন বিবরণ আমাদের ইমেইলে প্রেরণ করুন।',
        zh: '注册成为国际贸易采购商，请将您的采购需求清单、预计订单体量及商业注册证明发送至我们的官方邮箱。'
      },
      suggestedSubject: {
        en: 'Suggested Subject: Trade Buyer Registration — [Company Name]',
        bn: 'প্রস্তাবিত বিষয়: Trade Buyer Registration — [কোম্পানির নাম]',
        zh: '建议邮件主题：Trade Buyer Registration — [公司名称]'
      },
      subjectQuery: 'Trade Buyer Registration — [Company Name]'
    },
    investor: {
      categoryLabel: { en: 'INVESTOR', bn: 'বিনিয়োগকারী', zh: '战略投资伙伴' },
      instruction: {
        en: 'To discuss Strategic Partnerships & Investment opportunities, please email us your proposal, company background, and cooperation terms.',
        bn: 'কৌশলগত অংশীদারিত্ব ও বিনিয়োগের সুযোগ নিয়ে আলোচনা করতে, অনুগ্রহ করে আপনার প্রস্তাবনা, কোম্পানির ব্যাকগ্রাউন্ড ও সহযোগিতার শর্তাবলী আমাদের ইমেইলে প্রেরণ করুন।',
        zh: '洽谈战略合资与基础设施投资合作，请将您的投资提案、企业背景介绍及合作意向条款发送至我们的官方邮箱。'
      },
      suggestedSubject: {
        en: 'Suggested Subject: Strategic Partnership Proposal — [Company Name]',
        bn: 'প্রস্তাবিত বিষয়: Strategic Partnership Proposal — [কোম্পানির নাম]',
        zh: '建议邮件主题：Strategic Partnership Proposal — [公司名称]'
      },
      subjectQuery: 'Strategic Partnership Proposal — [Company Name]'
    }
  };

  const activeCategory = categoryDetails[partnerType] || categoryDetails.supplier;
  const mailtoUrl = `mailto:${corporateEmail}?subject=${encodeURIComponent(activeCategory.subjectQuery)}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(corporateEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <SEO 
        title={lang === 'zh' ? '与我们携手合作' : (lang === 'bn' ? 'অংশীদারিত্ব' : 'Partner With Us')}
        description={
          lang === 'zh'
            ? '成为沙拉邦拉集团的全球供应商、贸易买家或战略合资投资伙伴。'
            : 'Become a global supplier, trade buyer, or strategic joint-venture investor with Sharabangla Group.'
        }
      />

      {/* Hero */}
      <section className="bg-[#06301A] text-white pt-32 pb-20 border-b border-[#1E9B4C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-3 block">
            {lang === 'zh' ? '跨国战略协同合作' : (lang === 'bn' ? 'আন্তর্জাতিক সহযোগিতা' : 'CROSS-BORDER COLLABORATION')}
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-4">
            {lang === 'zh' 
              ? '与沙拉邦拉集团携手合作' 
              : (lang === 'bn' ? 'শারাবাংলা গ্রুপের সাথে অংশীদার হন' : 'Partner With Sharabangla Group')}
          </h1>
          <p className="text-slate-200 text-lg max-w-3xl">
            {lang === 'zh'
              ? '为国际制造商、大宗商品买家、货运物流伙伴及基础设施投资机构释放全球贸易协同效益。'
              : (lang === 'bn'
                ? 'আন্তর্জাতিক প্রস্তুতকারক, কমোডিটি ক্রেতা, ফ্রেইট পার্টনার এবং অবকাঠামো বিনিয়োগকারীদের জন্য নতুন বাণিজ্যের দিগন্ত উন্মোচন।'
                : 'Unlocking trade synergies for international manufacturers, commodity buyers, freight partners, and infrastructure investors.')}
          </p>
        </div>
      </section>

      {/* Partner Paths Selector */}
      <section className="py-20 bg-white text-[#2B2B2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {partnerPrograms.map((prog) => (
              <button
                key={prog.id}
                onClick={() => setPartnerType(prog.id)}
                className={`p-6 rounded-xl border text-left transition-all cursor-pointer ${
                  partnerType === prog.id
                    ? 'bg-[#06301A] text-white border-[#1E9B4C] shadow-xl ring-2 ring-[#1E9B4C]'
                    : 'bg-[#F6F8F7] text-[#2B2B2B] border-[#E2E8E4] hover:border-[#1E9B4C]'
                }`}
              >
                <span className={`text-[10px] font-extrabold uppercase tracking-widest block mb-2 ${
                  partnerType === prog.id ? 'text-[#1E9B4C]' : 'text-[#0E5C2E]'
                }`}>
                  {lang === 'zh' ? (prog.zhRole || prog.role) : prog.role}
                </span>
                <h3 className="font-heading font-bold text-lg mb-2">
                  {lang === 'zh' ? (prog.zhTitle || prog.title) : (lang === 'bn' ? prog.banglaTitle : prog.title)}
                </h3>
                <p className={`text-xs ${partnerType === prog.id ? 'text-slate-300' : 'text-[#5A6170]'}`}>
                  {lang === 'zh' ? (prog.zhDesc || prog.desc) : (lang === 'bn' ? prog.banglaDesc : prog.desc)}
                </p>
              </button>
            ))}
          </div>

          {/* Form / Instruction Container */}
          <div className="max-w-3xl mx-auto bg-[#F6F8F7] p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-[#E2E8E4] shadow-xl relative overflow-hidden">
            {/* Top Accent bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0E5C2E] via-[#1E9B4C] to-[#0E5C2E]" />

            {/* Header */}
            <div className="pt-2 mb-6">
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E] mb-2 tracking-tight">
                {lang === 'zh' ? '合作申请通道' : (lang === 'bn' ? 'অংশীদারিত্বের আবেদন ফরম' : 'Partnership Application Form')}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A6170]">
                {lang === 'zh' ? '当前所选合作通道：' : (lang === 'bn' ? 'নির্বাচিত ক্যাটাগরি: ' : 'Selected Category: ')}
                <strong className="text-[#0E5C2E] uppercase font-extrabold tracking-wide">
                  {lang === 'zh' ? activeCategory.categoryLabel.zh : (lang === 'bn' ? activeCategory.categoryLabel.bn : activeCategory.categoryLabel.en)}
                </strong>
              </p>
            </div>

            {/* HOW TO GET IN TOUCH SECTION */}
            <div className="space-y-5">
              
              {/* Divider Header */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E2E8E4]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#F6F8F7] px-4 text-xs sm:text-sm font-extrabold text-[#0E5C2E] tracking-wider flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#1E9B4C]" />
                    <span>
                      {lang === 'zh' 
                        ? '官方联络指引 (HOW TO GET IN TOUCH)' 
                        : (lang === 'bn' ? 'যোগাযোগের মাধ্যম (HOW TO GET IN TOUCH)' : 'HOW TO GET IN TOUCH')}
                    </span>
                  </span>
                </div>
              </div>

              {/* Instruction Box */}
              <div className="bg-emerald-50/70 rounded-2xl p-5 sm:p-6 border border-emerald-200/90 space-y-5">
                {/* Dynamic Category Instructional Text */}
                <p className="text-xs sm:text-sm text-[#2B2B2B] leading-relaxed font-medium">
                  {lang === 'zh' ? activeCategory.instruction.zh : (lang === 'bn' ? activeCategory.instruction.bn : activeCategory.instruction.en)}
                </p>

                {/* Copyable Email Box */}
                <div className="p-4 bg-white rounded-xl border border-emerald-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-[#1E9B4C]/15 text-[#1E9B4C] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A6170] block">
                        {lang === 'zh' ? '官方企业邮箱' : (lang === 'bn' ? 'কর্পোরেট ইমেইল অ্যাড্রেস' : 'Corporate Email Address')}
                      </span>
                      <a 
                        href={mailtoUrl}
                        className="text-sm sm:text-base font-extrabold text-[#0E5C2E] hover:text-[#1E9B4C] hover:underline block truncate"
                      >
                        {corporateEmail}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] rounded-lg bg-slate-100 hover:bg-[#1E9B4C] hover:text-white text-[#0E5C2E] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 border border-slate-200 shadow-2xs active:scale-95"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <CheckCheck className="w-4 h-4 text-emerald-600 group-hover:text-white" />
                        <span className="text-emerald-700">{lang === 'zh' ? '已复制！' : (lang === 'bn' ? 'কপি হয়েছে!' : 'Copied!')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{lang === 'zh' ? '复制邮箱地址' : (lang === 'bn' ? 'ইমেইল কপি করুন' : 'Copy Email')}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Dynamic Subject Line Format Box */}
                <div className="p-4 bg-slate-50/90 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A6170] block">
                    {lang === 'zh' ? '建议邮件主题格式' : (lang === 'bn' ? 'প্রস্তাবিত ইমেইল সাবজেক্ট' : 'Suggested Email Subject Format')}
                  </span>
                  <code className="text-xs sm:text-sm font-semibold text-[#0E5C2E] block bg-white px-3 py-2 sm:py-2.5 rounded-lg border border-[#CBD5E1] select-all break-all shadow-2xs">
                    {lang === 'zh' ? activeCategory.suggestedSubject.zh : (lang === 'bn' ? activeCategory.suggestedSubject.bn : activeCategory.suggestedSubject.en)}
                  </code>
                </div>

                {/* Open Email App Action Button */}
                <div>
                  <a
                    href={mailtoUrl}
                    className="w-full py-3.5 sm:py-4 px-5 min-h-[48px] rounded-xl bg-[#1E9B4C] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#0E5C2E] transition-all flex items-center justify-center gap-2.5 shadow-sm hover:shadow text-center active:scale-[0.99]"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    <span>
                      {lang === 'zh' 
                        ? '启动邮件客户端 (Open Email App)' 
                        : (lang === 'bn' ? 'ইমেইল অ্যাপ খুলুন (Open Email App)' : 'Open Email App')}
                    </span>
                    <ExternalLink className="w-4 h-4 text-white/80" />
                  </a>
                </div>

                {/* Reminder Note */}
                <div className="flex items-start gap-2.5 pt-1 text-xs text-[#5A6170] font-medium">
                  <Paperclip className="w-4 h-4 text-[#1E9B4C] shrink-0 mt-0.5" />
                  <span>
                    {lang === 'zh'
                      ? '在向我们发送邮件时，请附上您的企业详情、营业执照副本及相关资质文件。'
                      : (lang === 'bn'
                        ? 'ইমেইল প্রেরণের সময় অনুগ্রহ করে আপনার কোম্পানির বিস্তারিত বিবরণ এবং প্রয়োজনীয় নথিপত্র সংযুক্ত করুন।'
                        : 'Please include your company details and any relevant documents when you email us.')}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Global Trust & Partner Testimonials */}
      <GlobalTrustTestimonials />
    </>
  );
};

