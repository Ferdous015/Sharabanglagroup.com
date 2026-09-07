import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Newspaper,
  PhoneCall,
  MessageSquareQuote,
  Image as ImageIcon,
  CheckCircle2,
  Database,
  CloudUpload,
  Layers,
  ArrowRight,
  PlusCircle,
  ListFilter
} from 'lucide-react';
import { getJobsFromFirestore } from '../../services/jobsService';
import { getNewsFromFirestore } from '../../services/newsService';
import { getSiteInfoFromFirestore } from '../../services/contactService';
import { getTestimonialsFromFirestore } from '../../services/testimonialsService';
import { getMediaItemsFromFirestore } from '../../services/mediaLibraryService';
import { JobPosition, NewsArticle } from '../../data/site';

export const AdminDashboard: React.FC = () => {
  const [jobsCount, setJobsCount] = useState<number | null>(null);
  const [newsCount, setNewsCount] = useState<number | null>(null);
  const [testimonialsCount, setTestimonialsCount] = useState<number | null>(null);
  const [mediaCount, setMediaCount] = useState<number | null>(null);
  const [hasContactSettings, setHasContactSettings] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [jobs, news, testimonials, media, siteInfo] = await Promise.all([
          getJobsFromFirestore().catch(() => []),
          getNewsFromFirestore().catch(() => []),
          getTestimonialsFromFirestore().catch(() => []),
          getMediaItemsFromFirestore().catch(() => []),
          getSiteInfoFromFirestore().catch(() => null)
        ]);
        setJobsCount(Array.isArray(jobs) ? jobs.length : 0);
        setNewsCount(Array.isArray(news) ? news.length : 0);
        setTestimonialsCount(Array.isArray(testimonials) ? testimonials.length : 0);
        setMediaCount(Array.isArray(media) ? media.length : 0);
        setHasContactSettings(!!siteInfo);
      } catch (err) {
        console.error('Error fetching admin dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header / Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8E4] shadow-xs relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#0E5C2E]/5 to-transparent pointer-events-none hidden md:block" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF6EE] text-[#0E5C2E] text-xs font-bold mb-3 border border-[#0E5C2E]/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Authenticated Enterprise Session</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#0E5C2E] tracking-tight">
            Welcome to Sharabangla Group Admin Panel
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#5A6170] leading-relaxed">
            Your administrative workspace is ready. You can manage recruitment job circulars, corporate news releases, and contact settings.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/admin/jobs"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] transition-all shadow-xs"
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Circulars</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
            <Link
              to="/admin/news"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] border border-[#0E5C2E]/20 transition-all shadow-xs"
            >
              <Newspaper className="w-4 h-4" />
              <span>News & Press</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
            <Link
              to="/admin/testimonials"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] border border-[#0E5C2E]/20 transition-all shadow-xs"
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>Testimonials</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
            <Link
              to="/admin/media"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] border border-[#0E5C2E]/20 transition-all shadow-xs"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Library</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
            <Link
              to="/admin/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#5A6170] hover:text-[#0E5C2E] bg-white hover:bg-[#F6F8F7] border border-[#E2E8E4] transition-all shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Info</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
        {/* Card 1: Jobs Module */}
        <Link
          to="/admin/jobs"
          className="p-5 bg-white rounded-2xl border border-[#E2E8E4] shadow-xs hover:border-[#0E5C2E] hover:shadow-md transition-all group block"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#0E5C2E]/10 flex items-center justify-center text-[#0E5C2E] group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] px-2.5 py-1 rounded-md border border-[#0E5C2E]/20 flex items-center gap-1">
              <span>{loading ? '...' : `${jobsCount ?? 0} Listed`}</span>
            </span>
          </div>
          <h3 className="text-base font-bold text-[#2B2B2B] mt-4 group-hover:text-[#0E5C2E] transition-colors flex items-center justify-between">
            <span>Job Circulars</span>
            <ArrowRight className="w-4 h-4 text-[#8C95A6] group-hover:text-[#0E5C2E] group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-[#5A6170] mt-1 leading-normal">
            Post new career openings, edit trilingual requirements, and manage live recruitment postings.
          </p>
        </Link>

        {/* Card 2: Newsroom */}
        <Link
          to="/admin/news"
          className="p-5 bg-white rounded-2xl border border-[#E2E8E4] shadow-xs hover:border-[#0E5C2E] hover:shadow-md transition-all group block"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#0E5C2E]/10 flex items-center justify-center text-[#0E5C2E] group-hover:scale-105 transition-transform">
              <Newspaper className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] px-2.5 py-1 rounded-md border border-[#0E5C2E]/20 flex items-center gap-1">
              <span>{loading ? '...' : `${newsCount ?? 0} Published`}</span>
            </span>
          </div>
          <h3 className="text-base font-bold text-[#2B2B2B] mt-4 group-hover:text-[#0E5C2E] transition-colors flex items-center justify-between">
            <span>News & Press</span>
            <ArrowRight className="w-4 h-4 text-[#8C95A6] group-hover:text-[#0E5C2E] group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-[#5A6170] mt-1 leading-normal">
            Publish corporate announcements, expansion updates, and trilingual media coverage.
          </p>
        </Link>

        {/* Card 3: Testimonials */}
        <Link
          to="/admin/testimonials"
          className="p-5 bg-white rounded-2xl border border-[#E2E8E4] shadow-xs hover:border-[#0E5C2E] hover:shadow-md transition-all group block"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#0E5C2E]/10 flex items-center justify-center text-[#0E5C2E] group-hover:scale-105 transition-transform">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] px-2.5 py-1 rounded-md border border-[#0E5C2E]/20 flex items-center gap-1">
              <span>{loading ? '...' : `${testimonialsCount ?? 0} Live`}</span>
            </span>
          </div>
          <h3 className="text-base font-bold text-[#2B2B2B] mt-4 group-hover:text-[#0E5C2E] transition-colors flex items-center justify-between">
            <span>Testimonials</span>
            <ArrowRight className="w-4 h-4 text-[#8C95A6] group-hover:text-[#0E5C2E] group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-[#5A6170] mt-1 leading-normal">
            Manage authentic partner reviews, Cloudinary headshots, and trilingual quotes.
          </p>
        </Link>

        {/* Card 4: Media Library */}
        <Link
          to="/admin/media"
          className="p-5 bg-white rounded-2xl border border-[#E2E8E4] shadow-xs hover:border-[#0E5C2E] hover:shadow-md transition-all group block"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#0E5C2E]/10 flex items-center justify-center text-[#0E5C2E] group-hover:scale-105 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] px-2.5 py-1 rounded-md border border-[#0E5C2E]/20 flex items-center gap-1">
              <span>{loading ? '...' : `${mediaCount ?? 0} Images`}</span>
            </span>
          </div>
          <h3 className="text-base font-bold text-[#2B2B2B] mt-4 group-hover:text-[#0E5C2E] transition-colors flex items-center justify-between">
            <span>Media Library</span>
            <ArrowRight className="w-4 h-4 text-[#8C95A6] group-hover:text-[#0E5C2E] group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-[#5A6170] mt-1 leading-normal">
            Upload images to Cloudinary CDN, manage asset tags, and copy instant CDN URLs.
          </p>
        </Link>

        {/* Card 5: Contact & Global Coordinates */}
        <Link
          to="/admin/contact"
          className="p-5 bg-white rounded-2xl border border-[#E2E8E4] shadow-xs hover:border-[#0E5C2E] hover:shadow-md transition-all group block"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#0E5C2E]/10 flex items-center justify-center text-[#0E5C2E] group-hover:scale-105 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] px-2.5 py-1 rounded-md border border-[#0E5C2E]/20 flex items-center gap-1">
              <span>{loading ? '...' : (hasContactSettings ? 'Active' : 'Configure')}</span>
            </span>
          </div>
          <h3 className="text-base font-bold text-[#2B2B2B] mt-4 group-hover:text-[#0E5C2E] transition-colors flex items-center justify-between">
            <span>Contact & Offices</span>
            <ArrowRight className="w-4 h-4 text-[#8C95A6] group-hover:text-[#0E5C2E] group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-[#5A6170] mt-1 leading-normal">
            Edit corporate headquarters, email, phone, social links, and registered trade offices live in Firestore.
          </p>
        </Link>
      </div>

      {/* Architecture Details / Status Box */}
      <div className="p-6 bg-white rounded-2xl border border-[#E2E8E4] shadow-xs">
        <h2 className="text-base font-bold text-[#2B2B2B] mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#0E5C2E]" />
          <span>Backend Integration Status</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#FAFCFB] border border-[#E2E8E4] space-y-2">
            <div className="font-bold text-[#0E5C2E] flex items-center gap-1.5">
              <Database className="w-4 h-4" />
              <span>Firestore: "jobs"</span>
            </div>
            <p className="text-[#5A6170]">
              Full trilingual schema supporting EN, BN, and ZH titles, salaries, vacancies, and AI auto-translation.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FAFCFB] border border-[#E2E8E4] space-y-2">
            <div className="font-bold text-[#0E5C2E] flex items-center gap-1.5">
              <Database className="w-4 h-4" />
              <span>Firestore: "news"</span>
            </div>
            <p className="text-[#5A6170]">
              News articles, press releases, repeatable paragraphs, and Gemini translation pipeline.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FAFCFB] border border-[#E2E8E4] space-y-2">
            <div className="font-bold text-[#0E5C2E] flex items-center gap-1.5">
              <Database className="w-4 h-4" />
              <span>Firestore: "testimonials"</span>
            </div>
            <p className="text-[#5A6170]">
              Trilingual partner quotes, trading territory presets, Cloudinary photo CDN, and Gemini AI transliteration.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FAFCFB] border border-[#E2E8E4] space-y-2">
            <div className="font-bold text-[#0E5C2E] flex items-center gap-1.5">
              <Database className="w-4 h-4" />
              <span>Firestore: "mediaLibrary"</span>
            </div>
            <p className="text-[#5A6170]">
              Cloudinary CDN integration with categorized image metadata, filename indexing, and instant URL copying.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FAFCFB] border border-[#E2E8E4] space-y-2">
            <div className="font-bold text-[#0E5C2E] flex items-center gap-1.5">
              <Database className="w-4 h-4" />
              <span>Firestore: "settings/siteInfo"</span>
            </div>
            <p className="text-[#5A6170]">
              Direct persistence for corporate headquarters, phone, email, socials, and registered office network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
