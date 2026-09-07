import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronLeft, ChevronRight, Play, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface Slide {
  id: number;
  stepNumber: string;
  title: { en: string; bn: string; zh?: string };
  hashtags: { en: string[]; bn: string[]; zh?: string[] };
  category: { en: string; bn: string; zh?: string };
  imageUrl: string;
  videoUrl?: string;
  linkTo: string;
}

const slides: Slide[] = [
  {
    id: 1,
    stepNumber: "01",
    title: {
      en: "A trillion dreams started...",
      bn: "লক্ষ কোটি স্বপ্নের সূচনা...",
      zh: "万亿梦想启航..."
    },
    hashtags: {
      en: ["#OneBrandOneSharabangla", "#NationBuilding", "#GrassrootsToGlobal"],
      bn: ["#একব্র্যান্ডএকশারাবংলা", "#জাতীয়উন্নয়ন", "#তৃণমূলথেকেবিশ্বমঞ্চ"],
      zh: ["#一个集团一个愿景", "#国家建设", "#从本土到全球"]
    },
    category: {
      en: "Grassroots Roots & Ambition",
      bn: "শিকড় ও প্রাথমিক স্বপ্ন",
      zh: "本土根基与雄心"
    },
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/YQdsqFcWc0E?autoplay=1&rel=0",
    linkTo: "/about"
  },
  {
    id: 2,
    stepNumber: "02",
    title: {
      en: "Taking local ambition to global markets...",
      bn: "দেশীয় উদ্ভাবন ও স্বপ্নকে বিশ্ববাজারে নিয়ে যাওয়া...",
      zh: "将本土雄心推向全球市场..."
    },
    hashtags: {
      en: ["#DhakaInnovationHub", "#EmpoweringTalent", "#TechDrivenTrade"],
      bn: ["#ঢাকাউদ্ভাবনহাব", "#মেধাবিকাশ", "#প্রযুক্তিভিত্তিকবাণিজ্য"],
      zh: ["#达卡创新枢纽", "#赋能人才", "#科技驱动贸易"]
    },
    category: {
      en: "Local Innovation & Sourcing",
      bn: "স্থানীয় উদ্ভাবন ও প্রসার",
      zh: "本土创新与采购"
    },
    imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1920&auto=format&fit=crop",
    linkTo: "/companies"
  },
  {
    id: 3,
    stepNumber: "03",
    title: {
      en: "Expanding across China, India, Turkey, USA, Europe, Dubai & beyond...",
      bn: "চীন, ভারত, তুরস্ক, ইউএসএ, ইউরোপ, দুবাই ও বিশ্বজুড়ে সম্প্রসারণ...",
      zh: "布局中国、印度、土耳其、美国、欧洲、迪拜及全球市场..."
    },
    hashtags: {
      en: ["#GlobalMaritime", "#CrossBorderTrade", "#OceanLogistics"],
      bn: ["#গ্লোবালমেরিটাইম", "#আন্তর্জাতিকবাণিজ্য", "#সমুদ্রলজিস্টিকস"],
      zh: ["#全球航运", "#跨境贸易", "#海运物流"]
    },
    category: {
      en: "Cross-Border Maritime Fleet",
      bn: "আন্তর্জাতিক মেরিটাইম বহর",
      zh: "跨境海运与干线网络"
    },
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1920&auto=format&fit=crop",
    linkTo: "/global-presence"
  },
  {
    id: 4,
    stepNumber: "04",
    title: {
      en: "Connecting every corner in the world...",
      bn: "বিশ্বের প্রতিটি প্রান্তকে একসূত্রে সংযুক্ত করা...",
      zh: "连通全球每一个商业角落..."
    },
    hashtags: {
      en: ["#ExpressLogistics", "#SeamlessConnectivity", "#SmartInfrastructure"],
      bn: ["#এক্সপ্রেসলজিস্টিকস", "#নিরবচ্ছিন্নসংযোগ", "#স্মার্টঅবকাঠামো"],
      zh: ["#特快物流", "#无缝互联", "#智能基础设施"]
    },
    category: {
      en: "Express Logistics & Infrastructure",
      bn: "এক্সপ্রেস লজিস্টিকস ও অবকাঠামো",
      zh: "特快物流与基础设施"
    },
    imageUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1920&auto=format&fit=crop",
    linkTo: "/companies"
  },
  {
    id: 5,
    stepNumber: "05",
    title: {
      en: "A TRILLION DREAMS...",
      bn: "লক্ষ কোটি স্বপ্নের বিশ্বমঞ্চ...",
      zh: "万亿梦想的跨国舞台..."
    },
    hashtags: {
      en: ["#GlobalPresence", "#MultinationalHolding", "#GuangzhouToDubai"],
      bn: ["#গ্লোবালউপস্থিতি", "#বহুজাতিকহোল্ডিং", "#গুয়াংজুথেকেদুবাই"],
      zh: ["#全球布局", "#跨国控股", "#从广州到迪拜"]
    },
    category: {
      en: "Multinational Registered Hubs",
      bn: "আন্তর্জাতিক রেজিস্টার্ড কার্যালয়সমূহ",
      zh: "跨国注册枢纽"
    },
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop",
    linkTo: "/global-presence"
  },
  {
    id: 6,
    stepNumber: "06",
    title: {
      en: "SHARABANGLA GROUP — Building a Multinational Tomorrow.",
      bn: "শারাবংলা গ্রুপ — গড়ে তুলছে এক যৌথ বহুজাতিক ভবিষ্যৎ।",
      zh: "SHARABANGLA GROUP — 构建跨国新未来。"
    },
    hashtags: {
      en: ["#FutureReady", "#MultinationalTomorrow", "#SustainableGrowth"],
      bn: ["#ভবিষ্যৎপ্রস্তুত", "#বহুজাতিকআগামী", "#টেকসইউন্নয়ন"],
      zh: ["#面向未来", "#跨国明天", "#可持续增长"]
    },
    category: {
      en: "The Multinational Horizon",
      bn: "বহুজাতিক দিগন্ত",
      zh: "跨国新视野"
    },
    imageUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1920&auto=format&fit=crop",
    linkTo: "/about"
  }
];

export const S1_AdaniHero: React.FC = () => {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoOpen) {
        setIsVideoOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoOpen]);

  // Automatic Smooth Horizontal Scrolling Loop (3 Seconds)
  useEffect(() => {
    if (isPaused || isVideoOpen) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (slides?.length || 1));
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isVideoOpen]);

  const totalSlides = slides?.length || 1;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentSlide = slides[currentIndex] || slides[0] || {} as Slide;

  return (
    <section 
      className="relative w-full h-[88vh] min-h-[640px] max-h-[940px] bg-black text-white overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Full Page Background Images with Smooth Cross-Fade Transition & Enhanced Visual Clarity */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out bg-cover bg-center transform brightness-105 contrast-[1.03] ${
            idx === currentIndex 
              ? 'opacity-100 scale-100 z-0' 
              : 'opacity-0 scale-105 -z-10'
          }`}
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
        />
      ))}

      {/* Refined Professional Vignette & Light Overlays for High Background Image Clarity & Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25 z-10" />

      {/* Main Content Container */}
      <div className="relative z-20 h-full max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16 flex flex-col justify-between pt-24 sm:pt-28 pb-6 sm:pb-8">
        
        {/* Top/Center Grid: Headline Left + Progressive Image Gallery Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto w-full">
          
          {/* Left Side: Step Badge, Headline, Hashtags & Action Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-3 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E9B4C]/25 border border-[#1E9B4C]/50 text-[#1E9B4C] text-[11px] sm:text-xs font-extrabold uppercase tracking-widest backdrop-blur-md w-fit">
              <span>{currentSlide?.category?.[lang] || currentSlide?.category?.en || ''}</span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl md:text-5xl xl:text-6xl text-white tracking-tight leading-tight transition-all duration-700 drop-shadow-xl min-h-[60px] sm:min-h-[100px]">
              {currentSlide?.title?.[lang] || currentSlide?.title?.en || ''}
            </h1>

            <div className="space-y-1 pt-0.5 sm:pt-1">
              {(currentSlide?.hashtags?.[lang] || currentSlide?.hashtags?.en || []).map((tag, idx) => (
                <div key={idx} className="text-slate-200 font-semibold text-xs sm:text-base tracking-wide drop-shadow-md">
                  {tag}
                </div>
              ))}
            </div>

            <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 border-white/80 bg-black/30 hover:bg-white hover:text-black text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer min-h-[44px]"
              >
                <div className="w-5 h-5 rounded-full bg-[#1E9B4C] text-white flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>{lang === 'bn' ? 'ভিডিও দেখুন' : (lang === 'zh' ? '观看短片' : 'Watch Video')}</span>
              </button>

              <Link
                to={currentSlide?.linkTo || '/about'}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase text-[#1E9B4C] hover:text-white transition-colors py-2 px-3 min-h-[44px]"
              >
                <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : (lang === 'zh' ? '探索业务' : 'Explore Concern')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Side: Horizontal Image Carousel Strip Showing Journey Steps */}
          <div className="lg:col-span-6 hidden lg:block relative overflow-hidden pl-4">
            <div 
              className="flex items-center gap-4 transition-transform duration-700 ease-out py-2"
              style={{ transform: `translateX(-${Math.max(0, Math.min(currentIndex, totalSlides - 2)) * 165}px)` }}
            >
              {slides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                const slideTitle = slide.title[lang] || slide.title.en;
                const slideCategory = slide.category[lang] || slide.category.en;
                return (
                  <div
                    key={slide.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer shrink-0 shadow-2xl ${
                      isActive
                        ? 'w-[260px] h-[360px] border-[#1E9B4C] ring-4 ring-[#1E9B4C]/30 opacity-100 scale-100 z-10'
                        : 'w-[150px] h-[300px] border-white/20 opacity-55 hover:opacity-90 scale-95 hover:border-white'
                    }`}
                  >
                    <img
                      src={slide.imageUrl}
                      alt={slideTitle}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-3 right-3 text-white">
                      <span className="text-[10px] font-mono font-extrabold text-[#1E9B4C] block mb-1">
                        0{slide.id} — {slideCategory}
                      </span>
                      <h3 className={`font-heading font-bold line-clamp-2 leading-tight ${isActive ? 'text-sm' : 'text-xs'}`}>
                        {slideTitle}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Control Bar: Progress Bar & Navigation */}
        <div className="w-full flex items-center justify-between pt-5 border-t border-white/15">
          
          {/* Progress Bar */}
          <div className="flex items-center gap-4 flex-1 max-w-sm sm:max-w-md mr-6">
            <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 bottom-0 bg-[#1E9B4C] transition-all duration-500 rounded-full"
                style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/30 hover:border-[#1E9B4C] hover:bg-[#1E9B4C] text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-95 bg-black/40 backdrop-blur-sm"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/30 hover:border-[#1E9B4C] hover:bg-[#1E9B4C] text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-95 bg-black/40 backdrop-blur-sm"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Video Player Modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[900px] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            >
              {/* Close Button (X icon, top-right corner) */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-white/30 text-white transition-colors cursor-pointer border border-white/20 backdrop-blur-sm"
                aria-label="Close video"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* 16:9 Aspect Ratio Responsive Video Container */}
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={
                    isMobile
                      ? "https://www.youtube.com/embed/YQdsqFcWc0E?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
                      : "https://www.youtube.com/embed/YQdsqFcWc0E?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
                  }
                  title="Sharabangla Group Corporate Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
