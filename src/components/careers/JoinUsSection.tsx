import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface JoinUsSectionProps {
  onExplorePositions?: () => void;
}

export const JoinUsSection: React.FC<JoinUsSectionProps> = ({ onExplorePositions }) => {
  const { lang } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 17 Official Team Laoban serial images matching user uploads (1.jpeg - 17.jpeg / 17.jpg)
  const careerImages = [
    {
      id: '1',
      src: '/media/careers/1.jpeg',
      fallback: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
      alt: {
        en: 'Smart Warehouse & Logistics Operations',
        bn: 'স্মার্ট ওয়্যারহাউজ ও লজিস্টিকস অপারেশনস',
        zh: '智能仓储与物流运营管理'
      },
      caption: {
        en: 'Team Laoban · Warehouse',
        bn: 'টিম লাওবান · ওয়্যারহাউজ',
        zh: '老板团队 · 现代仓储'
      }
    },
    {
      id: '2',
      src: '/media/careers/2.jpeg',
      fallback: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80',
      alt: {
        en: 'Robotics, Industrial Tech & Quality Control',
        bn: 'রোবোটিক্স, ইন্ডাস্ট্রিয়াল টেক ও কোয়ালিটি কন্ট্রোল',
        zh: '智能智造与机器人自动化检测'
      },
      caption: {
        en: 'Team Laoban · High-Tech',
        bn: 'টিম লাওবান · হাই-টেক',
        zh: '老板团队 · 工业智造'
      }
    },
    {
      id: '3',
      src: '/media/careers/3.jpeg',
      fallback: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
      alt: {
        en: 'Corporate Strategy & Business Planning',
        bn: 'কর্পোরেট স্ট্র্যাটেজি ও ব্যবসায়িক পরিকল্পনা',
        zh: '跨国企业战略与高层商务决策'
      },
      caption: {
        en: 'Team Laoban · Strategy',
        bn: 'টিম লাওবান · স্ট্র্যাটেজি',
        zh: '老板团队 · 战略商务'
      }
    },
    {
      id: '4',
      src: '/media/careers/4.jpeg',
      fallback: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
      alt: {
        en: 'Multinational Executive Leadership Team',
        bn: 'মাল্টিন্যাশনাল এক্সিকিউটিভ লিডারশিপ টিম',
        zh: '全球化卓越多元高管团队'
      },
      caption: {
        en: 'Team Laoban · Leadership',
        bn: 'টিম লাওবান · লিডারশিপ',
        zh: '老板团队 · 卓越领导'
      }
    },
    {
      id: '5',
      src: '/media/careers/5.jpeg',
      fallback: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80',
      alt: {
        en: 'International Air Freight & Tarmac Operations',
        bn: 'আন্তর্জাতিক এয়ার ফ্রেইট ও টারম্যাক অপারেশনস',
        zh: '国际航空货运与停机坪地面运营'
      },
      caption: {
        en: 'Team Laoban · Air Freight',
        bn: 'টিম লাওবান · এয়ার কার্গো',
        zh: '老板团队 · 航空货运'
      }
    },
    {
      id: '6',
      src: '/media/careers/6.jpeg',
      fallback: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=80',
      alt: {
        en: 'Materials, Sourcing & Product Innovation',
        bn: 'ম্যাটেরিয়ালস, সোর্সিং ও প্রোডাক্ট ইনোভেশন',
        zh: '原料严选、全球供应链采购与研发'
      },
      caption: {
        en: 'Team Laoban · Sourcing',
        bn: 'টিম লাওবান · সোর্সিং',
        zh: '老板团队 · 全球采购'
      }
    },
    {
      id: '7',
      src: '/media/careers/7.jpeg',
      fallback: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&auto=format&fit=crop&q=80',
      alt: {
        en: 'Global Port Trade & Strategic Maritime Partnerships',
        bn: 'গ্লোবাল পোর্ট ট্রেড ও মেরিটাইম পার্টনারশিপ',
        zh: '全球海运港口贸易与战略合作协议'
      },
      caption: {
        en: 'Team Laoban · Port Trade',
        bn: 'টিম লাওবান · পোর্ট ট্রেড',
        zh: '老板团队 · 港口经贸'
      }
    },
    {
      id: '8',
      src: '/media/careers/8.jpeg',
      fallback: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80',
      alt: {
        en: 'Dynamic Team Synergy & Vibrant Culture',
        bn: 'টিম সিনার্জি, একতাবদ্ধ কর্মপ্রেরণা ও কালচার',
        zh: '团队活力赋能与高效协作企业文化'
      },
      caption: {
        en: 'Team Laoban · Synergy',
        bn: 'টিম লাওবান · সিনার্জি',
        zh: '老板团队 · 团队协同'
      }
    },
    {
      id: '9',
      src: '/media/careers/9.jpeg',
      fallback: '/media/companies/laoban-ecommerce.jpg',
      alt: {
        en: 'Cross-Border E-Commerce & Digital Merchandising',
        bn: 'ক্রস-বর্ডার ই-কমার্স ও ডিজিটাল মার্চেন্ডাইজিং',
        zh: '跨境电商零售与数字化商品运营'
      },
      caption: {
        en: 'Team Laoban · E-Commerce',
        bn: 'টিম লাওবান · ই-কমার্স',
        zh: '老板团队 · 跨境电商'
      }
    },
    {
      id: '10',
      src: '/media/careers/10.jpeg',
      fallback: '/media/companies/feathers-factory.jpg',
      alt: {
        en: 'Down & Feathers Manufacturing Excellence',
        bn: 'ডাউন অ্যান্ড ফেদার্স ম্যানুফ্যাকচারিং এক্সেলেন্স',
        zh: '羽绒寝具精密制造与出口质检'
      },
      caption: {
        en: 'Team Laoban · Manufacturing',
        bn: 'টিম লাওবান · ম্যানুফ্যাকচারিং',
        zh: '老板团队 · 智能工厂'
      }
    },
    {
      id: '11',
      src: '/media/careers/11.jpeg',
      fallback: '/media/companies/fumao/fumao-machine-hero.jpg',
      alt: {
        en: 'Industrial Heavy Machinery & Technical Engineering',
        bn: 'ইন্ডাস্ট্রিয়াল হেভি মেশিনারি ও টেকনিক্যাল ইঞ্জিনিয়ারিং',
        zh: '工业重型机械与专业工程技术服务'
      },
      caption: {
        en: 'Team Laoban · Machinery',
        bn: 'টিম লাওবান · মেশিনারি',
        zh: '老板团队 · 重工装备'
      }
    },
    {
      id: '12',
      src: '/media/careers/12.jpeg',
      fallback: '/media/companies/gdr-cargo.jpg',
      alt: {
        en: 'Express Customs Clearance & Cross-Border Logistics',
        bn: 'এক্সপ্রেস কাস্টমস ক্লিয়ারেন্স ও ক্রস-বর্ডার লজিস্টিকস',
        zh: '跨国极速通关与端到端物流报关'
      },
      caption: {
        en: 'Team Laoban · Express Cargo',
        bn: 'টিম লাওবান · এক্সপ্রেস কার্গো',
        zh: '老板团队 · 跨境快运'
      }
    },
    {
      id: '13',
      src: '/media/careers/13.jpeg',
      fallback: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
      alt: {
        en: 'Digital Platforms, Cloud Infrastructure & IT Solutions',
        bn: 'ডিজিটাল প্ল্যাটফর্ম, ক্লাউড ইনফ্রাস্ট্রাকচার ও আইটি সল্যুশনস',
        zh: '数字科技平台、云基础设施与信息化'
      },
      caption: {
        en: 'Team Laoban · Tech & Cloud',
        bn: 'টিম লাওবান · টেক ও আইটি',
        zh: '老板团队 · 数字科技'
      }
    },
    {
      id: '14',
      src: '/media/careers/14.jpeg',
      fallback: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80',
      alt: {
        en: 'Global Trade Negotiations & Strategic Client Partnerships',
        bn: 'আন্তর্জাতিক বাণিজ্য চুক্তি ও কৌশলগত গ্রাহক সম্পর্ক',
        zh: '国际经贸洽谈与战略大客户管理'
      },
      caption: {
        en: 'Team Laoban · Global Trade',
        bn: 'টিম লাওবান · গ্লোবাল ট্রেড',
        zh: '老板团队 · 国际商贸'
      }
    },
    {
      id: '15',
      src: '/media/careers/15.jpeg',
      fallback: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&auto=format&fit=crop&q=80',
      alt: {
        en: 'Multimodal Freight Distribution & Hub Logistics',
        bn: 'মাল্টিমোডাল ফ্রেইট ডিস্ট্রিবিউশন ও হাব লজিস্টিকস',
        zh: '多式联运网络与大型枢纽分拨调度'
      },
      caption: {
        en: 'Team Laoban · Multimodal',
        bn: 'টিম লাওবান · মাল্টিমোডাল',
        zh: '老板团队 · 联运枢纽'
      }
    },
    {
      id: '16',
      src: '/media/careers/16.jpeg',
      fallback: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
      alt: {
        en: 'Talent Growth, People Success & Organizational Agility',
        bn: 'ট্যালেন্ট গ্রোথ, পিপল সাকসেস ও অর্গানাইজেশনাল চপলতা',
        zh: '人才孵化、组织敏捷与员工赋能成长'
      },
      caption: {
        en: 'Team Laoban · People & Culture',
        bn: 'টিম লাওবান · পিপল কালচার',
        zh: '老板团队 · 人才发展'
      }
    },
    {
      id: '17',
      src: '/media/careers/17.jpeg',
      fallback: '/media/careers/17.jpg',
      alt: {
        en: 'Trillion Dollar Dreams & Future Global Expansion',
        bn: 'এক ট্রিলিয়ন ডলারের স্বপ্ন ও ভবিষ্যৎ বৈশ্বিক সম্প্রসারণ',
        zh: '万亿美元愿景与全球化宏伟蓝图'
      },
      caption: {
        en: 'Team Laoban · Global Vision',
        bn: 'টিম লাওবান · গ্লোবাল ভিশন',
        zh: '老板团队 · 宏伟愿景'
      }
    }
  ];

  // Double list for infinite uninterrupted seamless marquee
  const seamlessImages = [...careerImages, ...careerImages];
  const totalImages = careerImages.length;

  // Lightbox State
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Drag tracking refs to prevent opening modal during horizontal carousel dragging
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);

  // Touch gesture tracking for Lightbox swipe on mobile
  const modalTouchStart = useRef<{ x: number; y: number } | null>(null);

  const handlePrev = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + totalImages) % totalImages));
  }, [totalImages]);

  const handleNext = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % totalImages));
  }, [totalImages]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation for Lightbox (Esc, Left Arrow, Right Arrow)
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedIndex]);

  const handleButtonClick = (e: React.MouseEvent) => {
    if (onExplorePositions) {
      e.preventDefault();
      onExplorePositions();
      return;
    }

    if (window.location.pathname === '/careers') {
      const openingsEl = document.getElementById('openings');
      if (openingsEl) {
        e.preventDefault();
        openingsEl.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '#openings');
      }
    }
  };

  const scrollByAmount = (distance: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  const currentModalImage = selectedIndex !== null ? careerImages[selectedIndex] : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full py-12 sm:py-20 bg-[#F5F5F3] text-[#2B2B2B] relative overflow-hidden border-t border-[#E2E8E4]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
          {/* Left column */}
          <div className="max-w-xl">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0E5C2E] mb-2 block">
              {lang === 'bn' ? 'আমাদের সাথে যুক্ত হোন (JOIN US)' : (lang === 'zh' ? '加入我们 (JOIN US)' : 'JOIN US')}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#2B2B2B] tracking-tight leading-tight mb-2.5 sm:mb-4">
              {lang === 'bn' 
                ? 'With Our Team — Team Laobaan' 
                : (lang === 'zh' 
                    ? 'With Our Team — 老板团队 (Team Laobaan)' 
                    : 'With Our Team — Team Laobaan')}
            </h2>
            <p className="text-[#5A6170] text-xs sm:text-base leading-relaxed max-w-[550px]">
              {lang === 'bn'
                ? "আজই শারাবাংলা গ্রুপের সাথে যুক্ত হোন—আরও ভালো ব্যবসা, বৃহত্তর প্রবৃদ্ধি এবং এক ট্রিলিয়ন ডলারের অপ্রতিরোধ্য স্বপ্নের পথে।"
                : (lang === 'zh'
                    ? '即刻加入沙拉邦拉集团——携手共创更卓越的商业蓝图、实现更大规模的增长，共赴势不可挡的万亿美元梦想。'
                    : "Join with Sharabangla Group today—for better business, bigger growth, and an unstoppable A Trillion Dollar Dreams")}
            </p>
          </div>

          {/* Right column: Action button + Interactive Scroll arrows */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0">
            {/* Scroll Navigation Buttons */}
            <div className="flex items-center gap-1.5 bg-white/90 p-1 rounded-xl border border-[#E2E8E4] shadow-xs">
              <button
                onClick={() => scrollByAmount(-280)}
                aria-label="Scroll left"
                className="w-9 h-9 min-h-[36px] min-w-[36px] rounded-lg flex items-center justify-center text-[#2B2B2B] hover:bg-[#1E9B4C] hover:text-white active:scale-95 transition-all cursor-pointer"
                title={lang === 'bn' ? 'বামে স্ক্রোল করুন' : (lang === 'zh' ? '向左滑动' : 'Scroll Left')}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => scrollByAmount(280)}
                aria-label="Scroll right"
                className="w-9 h-9 min-h-[36px] min-w-[36px] rounded-lg flex items-center justify-center text-[#2B2B2B] hover:bg-[#1E9B4C] hover:text-white active:scale-95 transition-all cursor-pointer"
                title={lang === 'bn' ? 'ডানে স্ক্রোল করুন' : (lang === 'zh' ? '向右滑动' : 'Scroll Right')}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <Link
              to="/careers#openings"
              onClick={handleButtonClick}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-lg border-2 border-[#1E9B4C] text-[#2B2B2B] font-bold text-xs sm:text-sm hover:bg-[#1E9B4C] hover:text-white active:scale-95 transition-all duration-300 group cursor-pointer shadow-xs whitespace-nowrap min-h-[44px]"
            >
              <span>
                {lang === 'bn' 
                  ? 'উন্মুক্ত পদসমূহ দেখুন' 
                  : (lang === 'zh' 
                      ? '探索在招职位' 
                      : 'Explore Open Positions')}
              </span>
              <ArrowRight className="w-4 h-4 text-[#1E9B4C] group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite Seamless Scrolling Track (Left-to-Right Animation + Pause on Touch/Hover + Drag/Scroll Support) */}
      <div 
        ref={scrollContainerRef}
        onPointerDown={(e) => {
          dragStartPos.current = { x: e.clientX, y: e.clientY };
          isDraggingRef.current = false;
        }}
        onPointerMove={(e) => {
          if (dragStartPos.current) {
            const dist = Math.hypot(e.clientX - dragStartPos.current.x, e.clientY - dragStartPos.current.y);
            if (dist > 8) {
              isDraggingRef.current = true;
            }
          }
        }}
        onPointerUp={() => {
          setTimeout(() => {
            dragStartPos.current = null;
            isDraggingRef.current = false;
          }, 60);
        }}
        className="w-full overflow-x-auto no-scrollbar relative group select-none cursor-grab active:cursor-grabbing touch-pan-x"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="animate-marquee-ltr pause-on-hover flex gap-3 sm:gap-4 px-3 sm:px-6">
          {seamlessImages.map((img, idx) => (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              aria-label={`View full image: ${img.alt[lang] || img.alt.en}`}
              onClick={() => {
                if (!isDraggingRef.current) {
                  setSelectedIndex(idx % totalImages);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedIndex(idx % totalImages);
                }
              }}
              className="relative shrink-0 overflow-hidden rounded-2xl group/card w-56 sm:w-72 md:w-80 aspect-[3/4] bg-[#E5E5E5] shadow-xs hover:shadow-2xl transition-all duration-300 border border-[#E2E8E4] hover:border-[#1E9B4C] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1E9B4C]"
            >
              <img
                src={img.src}
                alt={img.alt[lang] || img.alt.en}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-108 select-none pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true';
                    target.src = img.fallback;
                  }
                }}
              />

              {/* Hover Zoom Icon Badge */}
              <div className="absolute top-3 right-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-250 z-10">
                <span className="w-8 h-8 rounded-full bg-black/60 text-white backdrop-blur-xs flex items-center justify-center border border-white/20 shadow-md">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>

              {/* Gradient Overlay & Tag */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover/card:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 pointer-events-none">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-extrabold text-[#A3D9B5] mb-1">
                  {img.caption[lang] || img.caption.en}
                </span>
                <h4 className="text-white text-xs sm:text-base font-bold leading-snug drop-shadow-sm line-clamp-2">
                  {img.alt[lang] || img.alt.en}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && currentModalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={handleClose}
            onTouchStart={(e) => {
              if (e?.touches && e.touches.length === 1) {
                modalTouchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
              }
            }}
            onTouchEnd={(e) => {
              if (!modalTouchStart.current || !e?.changedTouches || e.changedTouches.length === 0) return;
              const touch = e.changedTouches[0];
              if (!touch) return;
              const deltaX = touch.clientX - modalTouchStart.current.x;
              const deltaY = touch.clientY - modalTouchStart.current.y;
              modalTouchStart.current = null;
              if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
                if (deltaX > 0) {
                  handlePrev();
                } else {
                  handleNext();
                }
              }
            }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox Modal"
          >
            {/* Top Toolbar: Counter & Close Button */}
            <div className="absolute top-3 left-4 right-4 sm:top-5 sm:left-6 sm:right-6 flex items-center justify-between z-30 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 text-white font-mono text-xs sm:text-sm font-bold border border-white/20 backdrop-blur-sm pointer-events-auto">
                {selectedIndex + 1} / {totalImages}
              </span>

              <button
                onClick={handleClose}
                aria-label="Close Lightbox"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/60 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 backdrop-blur-sm transition-all cursor-pointer pointer-events-auto active:scale-95 shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Left Navigation Arrow Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Image"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 min-w-[44px] min-h-[44px] rounded-full bg-black/60 hover:bg-[#1E9B4C] text-white flex items-center justify-center border border-white/20 backdrop-blur-sm transition-all cursor-pointer active:scale-95 shadow-2xl"
              title={lang === 'bn' ? 'পূর্ববর্তী ছবি' : (lang === 'zh' ? '上一张' : 'Previous Image')}
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Right Navigation Arrow Button */}
            <button
              onClick={handleNext}
              aria-label="Next Image"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 min-w-[44px] min-h-[44px] rounded-full bg-black/60 hover:bg-[#1E9B4C] text-white flex items-center justify-center border border-white/20 backdrop-blur-sm transition-all cursor-pointer active:scale-95 shadow-2xl"
              title={lang === 'bn' ? 'পরবর্তী ছবি' : (lang === 'zh' ? '下一张' : 'Next Image')}
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Centered Image Card Content */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[85vw] max-h-[82vh] flex flex-col items-center justify-center"
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 bg-black/40 flex items-center justify-center">
                <img
                  src={currentModalImage.src}
                  alt={currentModalImage.alt[lang] || currentModalImage.alt.en}
                  className="max-w-[85vw] max-h-[64vh] sm:max-h-[72vh] w-auto h-auto object-contain select-none"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = currentModalImage.fallback;
                    }
                  }}
                />
              </div>

              {/* Caption & Category Information Below Image */}
              <div className="mt-3 sm:mt-4 text-center max-w-2xl px-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#1E9B4C]/30 text-[#A3D9B5] font-extrabold text-[11px] sm:text-xs uppercase tracking-widest border border-[#1E9B4C]/40 mb-1.5">
                  {currentModalImage.caption[lang] || currentModalImage.caption.en}
                </span>
                <h3 className="text-white font-bold text-sm sm:text-lg md:text-xl leading-snug drop-shadow-md">
                  {currentModalImage.alt[lang] || currentModalImage.alt.en}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
