import React, { useState } from 'react';
import { JobPosition } from '../../data/site';
import { useLanguage } from '../../context/LanguageContext';
import { formatDeadlineForDisplay } from '../../utils/dateUtils';
import { 
  X, 
  MapPin, 
  Clock, 
  Briefcase, 
  Check, 
  Banknote, 
  Users, 
  Calendar, 
  FileText, 
  Mail, 
  Copy, 
  CheckCheck, 
  ExternalLink, 
  Paperclip,
  Send
} from 'lucide-react';

interface ApplicationModalProps {
  job: JobPosition | null;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ job, onClose }) => {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!job) return null;

  const hrEmail = 'sharabangla.group@gmail.com';
  const emailSubject = `Application for ${job.title}`;
  const suggestedSubjectLine = `Application for ${job.title} — [Candidate Name]`;
  const mailtoUrl = `mailto:${hrEmail}?subject=${encodeURIComponent(emailSubject)}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(hrEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentRequirements = (lang === 'bn' && job.banglaRequirements 
    ? job.banglaRequirements 
    : (lang === 'zh' && job.zhRequirements 
        ? job.zhRequirements 
        : job.requirements) || []);
  const currentDescription = lang === 'bn' 
    ? (job.banglaDescription || job.description) 
    : (lang === 'zh' 
        ? (job.zhDescription || job.description) 
        : job.description);

  return (
    <div 
      className="fixed inset-0 bg-black/65 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl w-[95%] sm:w-full max-w-[760px] max-h-[92vh] flex flex-col shadow-2xl relative border border-[#E2E8E4] ring-1 ring-black/5 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Accent Color Bar */}
        <div className="h-2.5 bg-gradient-to-r from-[#0E5C2E] via-[#1E9B4C] to-[#0E5C2E] shrink-0" />

        {/* Modal Fixed / Sticky Header */}
        <div className="p-6 sm:p-8 bg-white border-b border-[#E2E8E4] relative shrink-0">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 min-h-[44px] min-w-[44px] sm:min-h-[40px] sm:min-w-[40px] rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="pr-10 sm:pr-12">
            <span className={`inline-block px-3 py-1 rounded-md text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 ${job.categoryColor || 'bg-[#06301A]'}`}>
              {lang === 'bn' ? (job.banglaDepartment || job.department) : (lang === 'zh' ? (job.zhDepartment || job.department) : job.department)}
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E5C2E] leading-tight tracking-tight">
              {lang === 'bn' ? 'আবেদন করুন — ' : (lang === 'zh' ? '职位申请 — ' : 'Apply for — ')}
              <span className="text-[#1E9B4C]">{lang === 'bn' ? job.banglaTitle : (lang === 'zh' ? (job.zhTitle || job.title) : job.title)}</span>
            </h3>
            <div className="text-xs sm:text-sm text-[#5A6170] mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#1E9B4C]" />
                <span>{lang === 'bn' ? (job.banglaLocation || job.location) : (lang === 'zh' ? (job.zhLocation || job.location) : job.location)}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#1E9B4C]" />
                <span>
                  {lang === 'bn' 
                    ? `${job.banglaType || job.type} • ${job.banglaExperience || job.experience}` 
                    : (lang === 'zh'
                        ? `${job.zhType || job.type} • ${job.zhExperience || job.experience}`
                        : `${job.type} • ${job.experience}`)}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7 overscroll-contain">
          
          {/* SECTION 1: FULL JOB CIRCULAR DETAILS */}
          <div className="bg-slate-50/90 rounded-2xl p-5 sm:p-6 border border-[#E2E8E4] space-y-5">
            {/* 1. Job Summary Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5 p-3.5 sm:p-4 bg-white rounded-xl border border-[#E2E8E4] shadow-xs">
              {/* Salary */}
              <div className="flex items-start gap-3 p-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1E9B4C] flex items-center justify-center shrink-0 border border-emerald-100 mt-0.5">
                  <Banknote className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A6170] block">
                    {lang === 'bn' ? 'বেতন (Salary)' : (lang === 'zh' ? '薪资待遇 (Salary)' : 'Salary Range')}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#0E5C2E] block truncate">
                    {lang === 'bn' ? (job.banglaSalary || job.salary) : (lang === 'zh' ? (job.zhSalary || job.salary) : job.salary)}
                  </span>
                </div>
              </div>

              {/* Vacancy */}
              <div className="flex items-start gap-3 p-1">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A6170] block">
                    {lang === 'bn' ? 'পদসংখ্যা (Vacancy)' : (lang === 'zh' ? '招聘名额 (Vacancy)' : 'Open Vacancies')}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#0E5C2E] block truncate">
                    {lang === 'bn' ? (job.banglaVacancy || job.vacancy) : (lang === 'zh' ? (job.zhVacancy || job.vacancy) : job.vacancy)}
                  </span>
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-start gap-3 p-1">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A6170] block">
                    {lang === 'bn' ? 'আবেদনের শেষ তারিখ' : (lang === 'zh' ? '申请截止日期' : 'Deadline')}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-amber-900 block truncate">
                    {lang === 'bn' ? (job.banglaDeadline || formatDeadlineForDisplay(job.deadline)) : (lang === 'zh' ? (job.zhDeadline || formatDeadlineForDisplay(job.deadline)) : formatDeadlineForDisplay(job.deadline))}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-1">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#1E9B4C]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A6170] block">
                    {lang === 'bn' ? 'কর্মস্থল (Location)' : (lang === 'zh' ? '工作地点 (Location)' : 'Job Location')}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#0E5C2E] block truncate">
                    {lang === 'bn' ? (job.banglaLocation || job.location) : (lang === 'zh' ? (job.zhLocation || job.location) : job.location)}
                  </span>
                </div>
              </div>

              {/* Employment Type */}
              <div className="flex items-start gap-3 p-1">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 mt-0.5">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A6170] block">
                    {lang === 'bn' ? 'চাকরির ধরন' : (lang === 'zh' ? '聘用形式' : 'Job Type')}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#0E5C2E] block truncate">
                    {lang === 'bn' ? (job.banglaType || job.type) : (lang === 'zh' ? (job.zhType || job.type) : job.type)}
                  </span>
                </div>
              </div>

              {/* Experience */}
              <div className="flex items-start gap-3 p-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1E9B4C] flex items-center justify-center shrink-0 border border-emerald-100 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A6170] block">
                    {lang === 'bn' ? 'প্রয়োজনীয় অভিজ্ঞতা' : (lang === 'zh' ? '经验年限要求' : 'Experience')}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#0E5C2E] block truncate">
                    {lang === 'bn' ? (job.banglaExperience || job.experience) : (lang === 'zh' ? (job.zhExperience || job.experience) : job.experience)}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Job Description */}
            <div className="pt-1">
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0E5C2E] flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-[#1E9B4C]" />
                <span>{lang === 'bn' ? 'কাজের বিবরণ (Job Description)' : (lang === 'zh' ? '岗位职责与工作内容' : 'Job Description')}</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {currentDescription}
              </p>
            </div>

            {/* 3. Key Requirements */}
            <div className="pt-1">
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0E5C2E] flex items-center gap-2 mb-2.5">
                <Check className="w-4 h-4 text-[#1E9B4C]" />
                <span>{lang === 'bn' ? 'প্রয়োজনীয় যোগ্যতা ও অভিজ্ঞতা (Key Requirements)' : (lang === 'zh' ? '任职要求与核心资格' : 'Key Requirements')}</span>
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {currentRequirements.map((req, i) => (
                  <span 
                    key={i} 
                    className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg bg-white text-[#0E5C2E] border border-[#CBD5E1] shadow-2xs flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E9B4C] shrink-0" />
                    <span>{req}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: HOW TO APPLY */}
          <div className="space-y-4 pt-1">
            {/* Section Heading with horizontal line */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E2E8E4]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-xs sm:text-sm font-extrabold text-[#0E5C2E] tracking-wider flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#1E9B4C]" />
                  <span>{lang === 'bn' ? 'কীভাবে আবেদন করবেন (HOW TO APPLY)' : (lang === 'zh' ? '如何投递简历 (HOW TO APPLY)' : 'HOW TO APPLY')}</span>
                </span>
              </div>
            </div>

            {/* Instruction Box */}
            <div className="bg-emerald-50/60 rounded-2xl p-5 sm:p-6 border border-emerald-200/90 space-y-4 sm:space-y-5">
              <p className="text-xs sm:text-sm text-[#2B2B2B] leading-relaxed">
                {lang === 'bn'
                  ? 'এই পদে আবেদন করার জন্য, অনুগ্রহ করে আপনার পূর্ণাঙ্গ সিভি/রেজুমে সরাসরি আমাদের নিচের এইচআর ইমেইলে প্রেরণ করুন এবং ইমেইলের সাবজেক্ট লাইনে পদের সঠিক নামটি উল্লেখ করুন।'
                  : (lang === 'zh'
                      ? '如需申请该职位，请将您的个人中/英文简历（PDF或Word格式）直接发送至以下官方HR招聘邮箱，并在邮件主题中注明您所应聘的具体职位全称。'
                      : 'To apply for this position, please send your CV/Resume directly to our HR email address below, mentioning the exact job title in your email subject line.')}
              </p>

              {/* Copyable Email Box */}
              <div className="p-4 bg-white rounded-xl border border-emerald-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-[#1E9B4C]/15 text-[#1E9B4C] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A6170] block">
                      {lang === 'bn' ? 'এইচআর ইমেইল অ্যাড্রেস' : (lang === 'zh' ? 'HR官方招聘邮箱' : 'HR Email Address')}
                    </span>
                    <a 
                      href={mailtoUrl}
                      className="text-sm sm:text-base font-extrabold text-[#0E5C2E] hover:text-[#1E9B4C] hover:underline block truncate"
                    >
                      {hrEmail}
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
                      <span className="text-emerald-700">{lang === 'bn' ? 'কপি হয়েছে!' : (lang === 'zh' ? '已复制！' : 'Copied!')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'ইমেইল কপি করুন' : (lang === 'zh' ? '复制邮箱地址' : 'Copy Email')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Subject Line Format Box */}
              <div className="p-4 bg-slate-50/90 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A6170] block">
                  {lang === 'bn' ? 'প্রস্তাবিত ইমেইল সাবজেক্ট' : (lang === 'zh' ? '建议邮件主题格式' : 'Suggested Email Subject Format')}
                </span>
                <code className="text-xs sm:text-sm font-semibold text-[#0E5C2E] block bg-white px-3 py-2 sm:py-2.5 rounded-lg border border-[#CBD5E1] select-all break-all shadow-2xs">
                  {suggestedSubjectLine}
                </code>
              </div>

              {/* Open Email App Action Button */}
              <div>
                <a
                  href={mailtoUrl}
                  className="w-full py-3.5 sm:py-4 px-5 min-h-[48px] rounded-xl bg-[#1E9B4C] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#0E5C2E] transition-all flex items-center justify-center gap-2.5 shadow-sm hover:shadow text-center active:scale-[0.99]"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <span>{lang === 'bn' ? 'ইমেইল অ্যাপ খুলুন (Open Email App)' : (lang === 'zh' ? '直接打开邮件客户端发送' : 'Open Email App')}</span>
                  <ExternalLink className="w-4 h-4 text-white/80" />
                </a>
              </div>

              {/* Attachment Reminder */}
              <div className="flex items-start gap-2.5 pt-1 text-xs text-[#5A6170] font-medium">
                <Paperclip className="w-4 h-4 text-[#1E9B4C] shrink-0 mt-0.5" />
                <span>
                  {lang === 'bn'
                    ? 'ইমেইল প্রেরণের পূর্বে অবশ্যই আপনার জীবনবৃত্তান্ত / সিভি (PDF অথবা DOC) ফাইল সংযুক্ত করুন।'
                    : (lang === 'zh'
                        ? '温馨提示：发送邮件前请务必确认已附带您的个人中/英文简历（PDF或DOC格式）。'
                        : 'Please remember to attach your CV/Resume (PDF or DOC) before sending.')}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-[#E2E8E4] shrink-0 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3 min-h-[44px] rounded-xl border border-[#CBD5E1] bg-white text-[#475569] hover:text-[#0E5C2E] hover:bg-slate-100 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer shadow-2xs flex items-center justify-center"
          >
            {lang === 'bn' ? 'বন্ধ করুন (Close)' : (lang === 'zh' ? '关闭窗口 (Close)' : 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
};


