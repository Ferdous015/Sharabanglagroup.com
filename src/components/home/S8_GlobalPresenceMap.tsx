import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { globalLocations, GlobalOffice } from '../../data/site';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  Globe, 
  Navigation, 
  CheckCircle2, 
  Building2, 
  X, 
  Copy, 
  Check, 
  Clock, 
  Compass, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// Local uploaded world map image in public/media/world-map.png
const LOCAL_WORLD_MAP_URL = "/media/world-map.png";

// Enriched location intelligence data for high-level executive view
interface OfficeDossier {
  roleTitle: { en: string; bn: string; zh: string };
  timezone: string;
  workingHours: { en: string; bn: string; zh: string };
  keyFunctions: { en: string; bn: string; zh: string }[];
}

const OFFICE_DOSSIERS: Record<string, OfficeDossier> = {
  'dhaka-hq': {
    roleTitle: {
      en: 'Global Corporate Headquarters & Executive Board',
      bn: 'গ্লোবাল করপোরেট সদর দপ্তর ও পরিচালনা পর্ষদ',
      zh: '全球企业总部及执行董事会'
    },
    timezone: 'UTC+6 (Bangladesh Standard Time)',
    workingHours: {
      en: 'Sun - Thu: 09:00 AM - 06:00 PM',
      bn: 'রবি - বৃহস্পতি: সকাল ০৯:০০ - সন্ধ্যা ০৬:০০',
      zh: '周日 - 周四: 上午 09:00 - 下午 06:00'
    },
    keyFunctions: [
      { en: 'Central Group Governance & Long-Term Strategy', bn: 'কেন্দ্রীয় করপোরেট কৌশল ও পরিচালনা', zh: '集团核心治理与长期发展战略' },
      { en: 'International LC, Escrow & Treasury Operations', bn: 'আন্তর্জাতিক এল/সি, এসক্রো ও ট্রেজারি কার্যক্রম', zh: '国际信用证 (L/C)、资金托管与财资管理' },
      { en: 'Dhaka Airport & Chattogram Sea Port Customs Desk', bn: 'চট্টগ্রাম সমুদ্রবন্দর ও ঢাকা বিমানবন্দর কাস্টমস ডেস্ক', zh: '达卡机场与吉大港海关专项通关事务' },
      { en: 'Multi-Enterprise Logistics & Production Oversight', bn: 'গ্রুপ সহযোগী প্রতিষ্ঠানসমূহের সামগ্রিক সমন্বয়', zh: '跨产业协同物流与供应链生产监管' }
    ]
  },
  'guangzhou-china': {
    roleTitle: {
      en: 'East Asia Registered Office & Sourcing Hub',
      bn: 'পূর্ব এশিয়া নিবন্ধিত কার্যালয় ও সোর্সিং হাব',
      zh: '东亚注册办事处与全球集采枢纽'
    },
    timezone: 'UTC+8 (China Standard Time)',
    workingHours: {
      en: 'Mon - Fri: 09:00 AM - 06:00 PM',
      bn: 'সোম - শুক্র: সকাল ০৯:০০ - সন্ধ্যা ০৬:০০',
      zh: '周一 - 周五: 上午 09:00 - 下午 06:00'
    },
    keyFunctions: [
      { en: 'Direct Tier-1 Factory Audits & Raw Material Sourcing', bn: 'সরাসরি কারখানা অডিট ও কাঁচামাল সোর্সিং', zh: '一级源头工厂资质验厂与工业原材料直采' },
      { en: 'Dalang Consolidated Depot & High-Precision QC Inspection', bn: 'ডালাং সেন্ট্রাল ওয়্যারহাউস ও মান নিয়ন্ত্রণ', zh: '大朗集运总仓仓储及高精度品控质检' },
      { en: 'Express Air Charters & Ocean FCL/LCL Consolidation', bn: 'এয়ার চার্টার ও সমুদ্রপথে কন্টেইনার কনসলিডেশন', zh: '极速航空包机直飞与整箱/拼箱海运拼柜' },
      { en: 'Cross-Border RMB Settlement & Supplier Relations', bn: 'চীনা সরবরাহকারী সম্পর্ক ও আরএমবি সেটেলমেন্ট', zh: '跨境人民币直接结算与供应链伙伴关系' }
    ]
  },
  'kolkata-india': {
    roleTitle: {
      en: 'South Asia Registered Office & Regional Port Desk',
      bn: 'দক্ষিণ এশিয়া নিবন্ধিত কার্যালয় ও আঞ্চলিক বন্দর ডেস্ক',
      zh: '南亚注册办事处与区域口岸枢纽'
    },
    timezone: 'UTC+5:30 (Indian Standard Time)',
    workingHours: {
      en: 'Mon - Fri: 09:30 AM - 06:30 PM',
      bn: 'সোম - শুক্র: সকাল ০৯:৩০ - সন্ধ্যা ০৬:৩০',
      zh: '周一 - 周五: 上午 09:30 - 下午 06:30'
    },
    keyFunctions: [
      { en: 'Benapole-Petrapole Land Border Logistics Management', bn: 'বেনাপোল-পেট্রাপোল স্থলবন্দর লজিস্টিকস', zh: '贝纳波尔-佩特拉波尔陆路陆运口岸协调' },
      { en: 'Industrial Chemicals & Specialized Raw Material Sourcing', bn: 'শিল্প কাঁচামাল ও কেমিক্যাল সোর্সিং', zh: '特种工业化工原料与纺织染料采购' },
      { en: 'Cross-Border SAARC Trade Network Coordination', bn: 'সার্কভুক্ত দেশসমূহে দ্বিপাক্ষিক বাণিজ্য সমন্বয়', zh: '南亚区域合作联盟 (SAARC) 双边贸易统筹' },
      { en: 'Regional Merchant Escrow & Banking Liaison', bn: 'আঞ্চলিক ব্যাংকিং ও মার্চেন্ট ট্রানজেকশন ডেস্ক', zh: '区域商业银行往来与跨境贸易资金结算' }
    ]
  },
  'dubai-uae': {
    roleTitle: {
      en: 'Middle East Registered Office & Financial Gateway',
      bn: 'মধ্যপ্রাচ্য নিবন্ধিত কার্যালয় ও ফাইন্যান্সিয়াল গেটওয়ে',
      zh: '中东注册办事处与跨国贸易金融网关'
    },
    timezone: 'UTC+4 (Gulf Standard Time)',
    workingHours: {
      en: 'Mon - Fri: 08:30 AM - 05:30 PM',
      bn: 'সোম - শুক্র: সকাল ০৮:৩০ - বিকাল ০৫:৩০',
      zh: '周一 - 周五: 上午 08:30 - 下午 05:30'
    },
    keyFunctions: [
      { en: 'Multi-Currency Global Trade Settlement (AED/USD/EUR)', bn: 'বহু-মুদ্রা বাণিজ্য লেনদেন ও ট্রেড ফাইন্যান্স', zh: '多币种国际贸易结算与财资管理 (AED/USD/EUR)' },
      { en: 'GCC Air Cargo Routing & Free Zone Re-Export Logistics', bn: 'জিসিসি এয়ার কার্গো ও ফ্রিজোন রি-এক্সপোর্ট', zh: '海湾自贸区转口贸易与海空联运中转' },
      { en: 'Middle East & North Africa Institutional Partnerships', bn: 'মধ্যপ্রাচ্য ও উত্তর আফ্রিকা প্রাতিষ্ঠানিক পার্টনারশিপ', zh: '中东及北非 (MENA) 跨国企业战略投资合作' },
      { en: 'Business Bay Corporate Trade & Investment Desk', bn: 'বিজনেস বে করপোরেট লিয়াজোঁ ও বিনিয়োগ ডেস্ক', zh: '商业湾 (Business Bay) 国际贸易与投融资中心' }
    ]
  },
  'sakarya-turkey': {
    roleTitle: {
      en: 'Eurasia Registered Office & Manufacturing Partner Desk',
      bn: 'ইউরেশিয়া নিবন্ধিত কার্যালয় ও ম্যানুফ্যাকচারিং পার্টনার',
      zh: '欧亚注册办事处与智能制造联络枢纽'
    },
    timezone: 'UTC+3 (Turkey Time)',
    workingHours: {
      en: 'Mon - Fri: 08:30 AM - 05:30 PM',
      bn: 'সোম - শুক্র: সকাল ০৮:৩০ - বিকাল ০৫:৩০',
      zh: '周一 - 周五: 上午 08:30 - 下午 05:30'
    },
    keyFunctions: [
      { en: 'Technical Textiles & European Machinery Sourcing', bn: 'টেকনিক্যাল টেক্সটাইল ও ইউরোপীয় যন্ত্রপাতি সোর্সিং', zh: '欧亚高端功能性面料与精密工业机械直采' },
      { en: 'Eurasia Transcontinental Shipping & Rail Freight', bn: 'ইউরেশিয়া ফ্রেইট ও ট্রান্সকন্টিনেন্টাল শিপিং', zh: '欧亚大陆桥跨国铁路集运与多式联运' },
      { en: 'Joint-Venture Non-Woven Production Monitoring', bn: 'যৌথ উদ্যোগ নন-ওভেন উৎপাদন পর্যবেক্ষণ', zh: '中欧合资无纺布与高分子材料联合产线质控' },
      { en: 'Mediterranean Trade Corridor Management', bn: 'ভূমধ্যসাগরীয় বাণিজ্য করিডোর পরিচালনা', zh: '地中海及南欧贸易通道统筹运营' }
    ]
  },
  'hochiminh-vietnam': {
    roleTitle: {
      en: 'ASEAN Operating Market & Sourcing Desk',
      bn: 'আসিয়ান অপারেটিং মার্কেট ও সোর্সিং ডেস্ক',
      zh: '东盟运营市场与区域采购联络处'
    },
    timezone: 'UTC+7 (Indochina Time)',
    workingHours: {
      en: 'Mon - Fri: 08:30 AM - 05:30 PM',
      bn: 'সোম - শুক্র: সকাল ০৮:৩০ - বিকাল ০৫:৩০',
      zh: '周一 - 周五: 上午 08:30 - 下午 05:30'
    },
    keyFunctions: [
      { en: 'Garment, Footwear & Accessories Raw Material Procurement', bn: 'পোশাক ও পাদুকা শিল্পের কাঁচামাল সোর্সিং', zh: '成衣制造、鞋靴皮革与精密辅料供应链采购' },
      { en: 'ASEAN Regional Merchant & Factory Coordination', bn: 'আসিয়ান আঞ্চলিক ব্যবসায়ী ও কারখানা লিয়াজোঁ', zh: '东盟自贸区生产厂商与贸易商深度协同' },
      { en: 'Supply Chain Quality Auditing & Export Compliance', bn: 'সাপ্লাই চেইন কোয়ালিটি ও রপ্তানি কমপ্লায়েন্স', zh: '供应链出厂全检与出口通关标准审核' },
      { en: 'Saigon Port Fast-Track Customs Logistics', bn: 'সাইগন পোর্ট ফাস্ট-ট্র্যাক কাস্টমস ক্লিয়ারেন্স', zh: '西贡口岸极速报关与东南亚快线海运' }
    ]
  },
  'hongkong': {
    roleTitle: {
      en: 'Global Offshore Finance & Trade Desk',
      bn: 'গ্লোবাল অফশোর ফাইন্যান্স ও ট্রেড ডেস্ক',
      zh: '全球离岸金融与跨境贸易中枢'
    },
    timezone: 'UTC+8 (Hong Kong Time)',
    workingHours: {
      en: 'Mon - Fri: 09:00 AM - 06:00 PM',
      bn: 'সোম - শুক্র: সকাল ০৯:০০ - সন্ধ্যা ০৬:০০',
      zh: '周一 - 周五: 上午 09:00 - 下午 06:00'
    },
    keyFunctions: [
      { en: 'Offshore Treasury & Multi-Currency L/C Invoicing', bn: 'অফশোর ক্যাপিটাল ও বহু-মুদ্রা এল/সি ইনভয়েসিং', zh: '离岸资本调配与多币种进出口信用证开立' },
      { en: 'Cross-Border Triangular Trade Structuring', bn: 'আন্তর্জাতিক ট্রায়াঙ্গুলার বাণিজ্য স্ট্রাকচারিং', zh: '国际转口与离岸三方贸易架构搭建' },
      { en: 'Greater Bay Area Institutional Financial Bridge', bn: 'গ্রেটার বে এরিয়া ফাইন্যান্সিয়াল ব্রিজ', zh: '粤港澳大湾区机构金融与资本联通' },
      { en: 'Global Merchant Escrow & Banking Governance', bn: 'গ্লোবাল মার্চেন্ট এসক্রো ও ব্যাংকিং গভর্ন্যান্স', zh: '国际商务资金合规清算与账户审计' }
    ]
  },
  'usa-newyork': {
    roleTitle: {
      en: 'North America Operating Market & Trade Desk',
      bn: 'উত্তর আমেরিকা অপারেটিং মার্কেট ও ট্রেড হাব',
      zh: '北美运营市场与国际商务代表处'
    },
    timezone: 'UTC-5 (Eastern Time)',
    workingHours: {
      en: 'Mon - Fri: 09:00 AM - 05:00 PM',
      bn: 'সোম - শুক্র: সকাল ০৯:০০ - বিকাল ০৫:০০',
      zh: '周一 - 周五: 上午 09:00 - 下午 05:00'
    },
    keyFunctions: [
      { en: 'North American Outdoor & Apparel Brand Relations', bn: 'উত্তর আমেরিকার আউটডোর ব্র্যান্ড পার্টনারশিপ', zh: '北美顶级户外与服装品牌大宗供应链对接' },
      { en: 'Down Feather Product Export Distribution Channels', bn: 'ডাউন ফেদার পণ্য রপ্তানি ও বিতরণ চ্যানেল', zh: '羽绒及特种纤维终端分销渠道与采购订单执行' },
      { en: 'US Customs & Environmental Compliance Advisory', bn: 'যুক্তরাষ্ট্র কাস্টমস ও পরিবেশ নীতি পর্যবেক্ষণ', zh: '美国海关合规检验及绿色环保标准认证' },
      { en: 'One World Trade Center Institutional Liaison', bn: 'ওয়ান ওয়ার্ল্ড ট্রেড সেন্টার করপোরেট কার্যক্রম', zh: '世贸中心机构业务联络与北美企业战略对接' }
    ]
  },
  'europe-frankfurt': {
    roleTitle: {
      en: 'European Operating Market & Central Trade Base',
      bn: 'ইউরোপীয় অপারেটিং মার্কেট ও সেন্ট্রাল হাব',
      zh: '欧洲运营市场与核心贸易联络中心'
    },
    timezone: 'UTC+1 (Central European Time)',
    workingHours: {
      en: 'Mon - Fri: 08:30 AM - 05:30 PM',
      bn: 'সোম - শুক্র: সকাল ০৮:৩০ - বিকাল ০৫:৩০',
      zh: '周一 - 周五: 上午 08:30 - 下午 05:30'
    },
    keyFunctions: [
      { en: 'EU Eco-Compliance & Carbon Footprint Auditing Desk', bn: 'ইউরোপীয় ইউনিয়ন পরিবেশ ও কমপ্লায়েন্স ডেস্ক', zh: '欧盟绿色供应链准入与碳足迹核查支持' },
      { en: 'European Intermodal Rail & Air Freight Routing', bn: 'ইউরোপীয় মাল্টি-মোডাল ফ্রেইট নেটওয়ার্ক', zh: '欧洲多式联运铁路干线与航空中转直达' },
      { en: 'Premium Technical Textile & Outerwear Client Accounts', bn: 'প্রিমিয়াম টেক্সটাইল ব্র্যান্ড রিলেশনস', zh: '高端特种面料与工装成衣战略采购对接' },
      { en: 'Main Tower Corporate Logistics Desk', bn: 'মেইন টাওয়ার ফ্রাঙ্কফুর্ট করপোরেট ট্রেড ডেস্ক', zh: '法兰克福 Main Tower 国际物流结算联络处' }
    ]
  }
};

export const S8_GlobalPresenceMap: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedOffice, setSelectedOffice] = useState<GlobalOffice>(globalLocations[0]);
  const [hoveredOffice, setHoveredOffice] = useState<GlobalOffice | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'hq' | 'office' | 'market'>('all');

  // Modal State for Professional Office Dossier View
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOffice, setModalOffice] = useState<GlobalOffice>(globalLocations[0]);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleOpenOfficeDetail = (office: GlobalOffice) => {
    setSelectedOffice(office);
    setModalOffice(office);
    setIsModalOpen(true);
  };

  const handleCopyText = (text: string, fieldId: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2500);
    }
  };

  // Filter locations by category for map pins
  const filteredLocations = globalLocations.filter(loc => {
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'hq') return loc.category === 'hq';
    if (activeCategoryFilter === 'office') return loc.category === 'office';
    if (activeCategoryFilter === 'market') return loc.category === 'market';
    return true;
  });

  // Coordinates of Dhaka HQ in Equirectangular projection percentage
  const dhakaCoords = { x: 75.1, y: 36.8 };

  const getMarkerStyle = (office: GlobalOffice, isSelected: boolean) => {
    if (office.category === 'hq') {
      return {
        bg: 'bg-[#E1232B]',
        border: 'border-white',
        ring: 'ring-4 ring-[#E1232B]/50',
        badge: 'bg-[#E1232B] text-white',
        pulse: 'bg-[#E1232B]',
      };
    }
    if (office.category === 'office') {
      return {
        bg: 'bg-[#1E9B4C]',
        border: 'border-white',
        ring: 'ring-4 ring-[#1E9B4C]/50',
        badge: 'bg-[#1E9B4C] text-white',
        pulse: 'bg-[#1E9B4C]',
      };
    }
    // Operating Market
    return {
      bg: 'bg-amber-400',
      border: 'border-amber-950',
      ring: 'ring-4 ring-amber-400/50',
      badge: 'bg-amber-400 text-slate-950',
      pulse: 'bg-amber-400',
    };
  };

  // Duplicated list for seamless infinite horizontal loop (Right to Left / ডান থেকে বামে)
  const marqueeLocations = [...globalLocations, ...globalLocations];

  const defaultDossier: OfficeDossier = {
    roleTitle: { en: 'Global Trade & Operations Facility', bn: 'আন্তর্জাতিক বাণিজ্য ও কার্যক্রম কেন্দ্র', zh: '全球贸易与业务运营设施' },
    timezone: 'UTC+6',
    workingHours: { en: 'Mon - Fri: 09:00 AM - 06:00 PM', bn: 'সোম - শুক্র: সকাল ০৯:০০ - সন্ধ্যা ০৬:০০', zh: '周一 - 周五: 09:00 - 18:00' },
    keyFunctions: []
  };

  const currentDossier = (modalOffice && OFFICE_DOSSIERS[modalOffice.id]) || OFFICE_DOSSIERS['dhaka-hq'] || defaultDossier;

  return (
    <section id="global-map-section" className="py-20 bg-[#F4F7F5] text-[#2B2B2B] relative overflow-hidden border-t border-[#E2E8E4]">
      {/* 1. Full-Width World Map Background Image (0% Tint - Fully Visible & Bright) */}
      <img
        src={LOCAL_WORLD_MAP_URL}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0 brightness-100 contrast-105"
        loading="eager"
      />

      {/* 2. Large Centered Sharabangla Group Logo Watermark (6% Opacity) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[720px] lg:w-[860px] max-w-[48vw] aspect-square opacity-[0.06] pointer-events-none select-none z-[1] flex items-center justify-center">
        <img
          src="/brand/logo-primary.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#E1232B]/30 text-[#E1232B] text-xs font-black tracking-widest uppercase mb-3 shadow-xs">
            <Globe className="w-3.5 h-3.5 animate-spin-slow text-[#E1232B]" />
            <span>{t('map.tag')}</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0E5C2E] tracking-tight mb-3">
            {lang === 'zh' ? '全球业务布局与世界贸易网络地图' : (lang === 'bn' ? 'গ্লোবাল প্রেজেন্স ও গ্লোবাল নেটওয়ার্ক ম্যাপ' : 'Global Presence & World Trade Map')}
          </h2>
          <div className="inline-block bg-white/85 backdrop-blur-xs px-5 py-2.5 rounded-2xl border border-[#E2E8E4] shadow-xs">
            <p className="text-[#2B2B2B] font-medium text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              {lang === 'zh'
                ? '精准标注沙拉邦拉集团达卡总部、亚洲与欧洲注册办事处以及全球运营市场的等距圆柱世界贸易地图。'
                : (lang === 'bn'
                  ? 'উত্তরা ঢাকা হেডকোয়ার্টার, এশিয়া ও ইউরোপের রেজিস্টার্ড অফিসসমূহ এবং বৈশ্বিক অপারেটিং মার্কেটগুলোর সমন্বিত রিয়েল মানচিত্র।'
                  : 'Geographically accurate equirectangular world map showing Sharabangla Group’s Dhaka headquarters, registered offices, and operating markets.')
              }
            </p>
          </div>
        </div>

        {/* Category Legend & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E2E8E4]">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-4 py-2 rounded-full text-xs transition-all cursor-pointer ${
                activeCategoryFilter === 'all'
                  ? 'bg-[#0E5C2E] text-white shadow-md ring-2 ring-[#0E5C2E]/30 font-extrabold'
                  : 'bg-white/95 text-[#2B2B2B] hover:bg-white hover:text-[#0E5C2E] border border-[#E2E8E4] shadow-xs font-bold'
              }`}
            >
              {lang === 'zh' ? '全部 9 处据点' : (lang === 'bn' ? 'সকল ৯টি স্থান' : 'All 9 Locations')}
            </button>

            <button
              onClick={() => setActiveCategoryFilter('hq')}
              className={`px-4 py-2 rounded-full text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategoryFilter === 'hq'
                  ? 'bg-[#E1232B] text-white shadow-md ring-2 ring-[#E1232B]/30 font-extrabold'
                  : 'bg-white/95 text-[#2B2B2B] hover:bg-white hover:text-[#E1232B] border border-[#E2E8E4] shadow-xs font-bold'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#E1232B]" />
              <span>{lang === 'zh' ? '全球总部 (1)' : (lang === 'bn' ? 'হেডকোয়ার্টার (১)' : 'Headquarters (1)')}</span>
            </button>

            <button
              onClick={() => setActiveCategoryFilter('office')}
              className={`px-4 py-2 rounded-full text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategoryFilter === 'office'
                  ? 'bg-[#0E5C2E] text-white shadow-md ring-2 ring-[#0E5C2E]/30 font-extrabold'
                  : 'bg-white/95 text-[#2B2B2B] hover:bg-white hover:text-[#0E5C2E] border border-[#E2E8E4] shadow-xs font-bold'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E9B4C]" />
              <span>{lang === 'zh' ? '注册办事处 (4)' : (lang === 'bn' ? 'রেজিস্টার্ড অফিস (৪)' : 'Registered Office (4)')}</span>
            </button>

            <button
              onClick={() => setActiveCategoryFilter('market')}
              className={`px-4 py-2 rounded-full text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategoryFilter === 'market'
                  ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-500/30 font-extrabold'
                  : 'bg-white/95 text-[#2B2B2B] hover:bg-white hover:text-amber-700 border border-[#E2E8E4] shadow-xs font-bold'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>{lang === 'zh' ? '运营市场 (4)' : (lang === 'bn' ? 'অপারেটিং মার্কেট (৪)' : 'Operating Market (4)')}</span>
            </button>
          </div>

          {/* Map Legend */}
          <div className="flex items-center gap-4 text-xs text-[#2B2B2B] bg-white/95 px-4 py-2 rounded-full border border-[#E2E8E4] shadow-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#E1232B] animate-pulse ring-2 ring-[#E1232B]/30" />
              <span className="font-bold text-[#0E5C2E]">🔴 {lang === 'zh' ? '全球总部' : (lang === 'bn' ? 'হেডকোয়ার্টার' : 'Headquarters')}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#1E9B4C] ring-2 ring-[#1E9B4C]/30" />
              <span className="font-semibold text-[#2B2B2B]">🟢 {lang === 'zh' ? '注册办事处' : (lang === 'bn' ? 'রেজিস্টার্ড অফিস' : 'Registered Office')}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-400 ring-2 ring-amber-400/30" />
              <span className="font-semibold text-[#2B2B2B]">🟡 {lang === 'zh' ? '运营市场' : (lang === 'bn' ? 'অপারেটিং মার্কেট' : 'Operating Market')}</span>
            </span>
          </div>
        </div>

        {/* Map Container & Office Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* REAL EQUIRECTANGULAR WORLD MAP CONTAINER (8 Columns) */}
          <div className="lg:col-span-8 bg-[#062817] p-3 sm:p-5 rounded-2xl border border-[#1E9B4C]/40 relative overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between mb-3 text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-[#1E9B4C] animate-pulse" />
                <span>
                  {lang === 'zh'
                    ? '将鼠标悬停或点击地图图钉查看各网点详情'
                    : (lang === 'bn' 
                      ? 'ম্যাপের পিনে হোভার বা ট্যাপ করে কার্যালয়ের বিস্তারিত দেখুন' 
                      : 'Hover or tap any pin to view location label')}
                </span>
              </span>
              <span className="text-[#1E9B4C] font-black uppercase text-[11px] tracking-wider">
                {lang === 'zh' ? '真实等距圆柱世界地图' : 'Real World Map (Equirectangular)'}
              </span>
            </div>

            {/* World Map Container */}
            <div className="relative w-full aspect-[2000/1000] min-h-[320px] bg-[#02120A] rounded-xl border border-white/10 overflow-hidden shadow-inner select-none group">
              
              {/* Local uploaded world map image from /public/media/world-map.png */}
              <img
                src={LOCAL_WORLD_MAP_URL}
                alt="Sharabangla Group World Map"
                className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none filter brightness-110 contrast-125"
                loading="eager"
              />

              {/* Light dark-green tint overlay (15% opacity) ensuring real continent shapes stay clearly visible */}
              <div className="absolute inset-0 bg-[#03170D]/15 pointer-events-none z-0" />

              {/* CURVED TRADE CORRIDORS RADIATING FROM DHAKA HQ (75.1%, 36.8%) */}
              <svg
                viewBox="0 0 1000 500"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Trade Corridor Arc Gradient */}
                  <linearGradient id="dhakaArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E1232B" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#1E9B4C" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.9" />
                  </linearGradient>

                  {/* Glow filter */}
                  <filter id="corridorGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Latitude / Longitude Subtle Grid Lines */}
                <g stroke="#1E9B4C" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.18">
                  <line x1="0" y1="137" x2="1000" y2="137" /> {/* 40° N */}
                  <line x1="0" y1="184" x2="1000" y2="184" /> {/* Equator / Tropics (~23.5° N) */}
                  <line x1="0" y1="250" x2="1000" y2="250" /> {/* Equator (0°) */}
                  <line x1="0" y1="350" x2="1000" y2="350" /> {/* 36° S */}

                  <line x1="294" y1="0" x2="294" y2="500" /> {/* 74° W (New York) */}
                  <line x1="524" y1="0" x2="524" y2="500" /> {/* 8.7° E (Frankfurt) */}
                  <line x1="654" y1="0" x2="654" y2="500" /> {/* 55.3° E (Dubai) */}
                  <line x1="751" y1="0" x2="751" y2="500" /> {/* 90.4° E (Dhaka HQ) */}
                  <line x1="815" y1="0" x2="815" y2="500" /> {/* 113.3° E (Guangzhou) */}
                </g>

                {/* CURVED TRADE CORRIDORS RADIATING FROM DHAKA HQ (75.1%, 36.8%) */}
                <g filter="url(#corridorGlow)">
                  {filteredLocations.map((loc) => {
                    if (loc.id === 'dhaka-hq') return null;
                    const targetX = (loc.coords.x / 100) * 1000;
                    const targetY = (loc.coords.y / 100) * 500;
                    const dhakaX = (dhakaCoords.x / 100) * 1000;
                    const dhakaY = (dhakaCoords.y / 100) * 500;
                    const isSelected = selectedOffice.id === loc.id;
                    
                    const midX = (dhakaX + targetX) / 2;
                    const archHeight = Math.min(60, Math.max(25, Math.abs(targetX - dhakaX) * 0.14));
                    const midY = Math.min(dhakaY, targetY) - archHeight;

                    return (
                      <path
                        key={`arc-${loc.id}`}
                        d={`M ${dhakaX} ${dhakaY} Q ${midX} ${midY} ${targetX} ${targetY}`}
                        fill="none"
                        stroke="url(#dhakaArcGrad)"
                        strokeWidth={isSelected ? 2.5 : 1.2}
                        strokeDasharray={isSelected ? "none" : "4 4"}
                        opacity={isSelected ? 0.95 : 0.5}
                      />
                    );
                  })}
                </g>

              </svg>

              {/* ABSOLUTELY POSITIONED PINS BASED ON EQUIRECTANGULAR LAT/LONG CALCULATIONS */}
              {filteredLocations.map((loc) => {
                const isSelected = selectedOffice.id === loc.id;
                const isHovered = hoveredOffice?.id === loc.id;
                const isHQ = loc.category === 'hq';
                const style = getMarkerStyle(loc, isSelected);

                // NO OVERLAPPING LABELS BY DEFAULT: label shows ONLY on hover or tap/selection
                const showLabel = isHovered || isSelected;

                return (
                  <div
                    key={loc.id}
                    style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group"
                  >
                    {/* Glowing outer pulse ring */}
                    <span className={`absolute -inset-2 rounded-full transition-all ${style.pulse} ${
                      isHQ || isSelected ? 'animate-ping opacity-80' : 'opacity-25 group-hover:opacity-75'
                    }`} />

                    {/* Small Glowing Dot Pin Marker */}
                    <button
                      onClick={() => setSelectedOffice(loc)}
                      onMouseEnter={() => setHoveredOffice(loc)}
                      onMouseLeave={() => setHoveredOffice(null)}
                      className={`relative rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none ${
                        isHQ
                          ? 'w-6 h-6 bg-[#E1232B] border-2 border-white ring-4 ring-[#E1232B]/50 scale-110 shadow-lg'
                          : isSelected
                            ? `w-5 h-5 ${style.bg} border-2 ${style.border} ${style.ring} scale-125 shadow-lg`
                            : `w-3.5 h-3.5 ${style.bg} border border-white/80 hover:scale-150`
                      }`}
                      aria-label={`${loc.city}, ${loc.country}`}
                    >
                      {isHQ && (
                        <span className="text-[9px] font-black text-white leading-none">HQ</span>
                      )}
                    </button>

                    {/* Permanent small "HQ" badge for Dhaka */}
                    {isHQ && !showLabel && (
                      <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-1.5 py-0.2 rounded bg-[#E1232B] text-white text-[9px] font-black tracking-wider uppercase shadow-md pointer-events-none">
                        DHAKA HQ
                      </span>
                    )}

                    {/* CALLOUT LABEL — SHOWN ONLY ON HOVER OR TAP/SELECTION */}
                    {showLabel && (
                      <div 
                        onClick={() => setSelectedOffice(loc)}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-auto cursor-pointer transition-all duration-200 z-50 whitespace-nowrap animate-fade-in"
                      >
                        <div className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 border shadow-2xl transition-all ${
                          isHQ
                            ? 'bg-[#E1232B] text-white border-red-200 font-black text-[11px] shadow-[0_0_20px_rgba(225,35,43,0.7)]'
                            : loc.category === 'office'
                              ? 'bg-[#0E5C2E] text-white border-emerald-300 font-extrabold text-[10px] shadow-[0_0_15px_rgba(30,155,76,0.7)]'
                              : 'bg-amber-400 text-slate-950 border-amber-200 font-black text-[10px] shadow-[0_0_15px_rgba(245,158,11,0.7)]'
                        }`}>
                          <span>{loc.flag}</span>
                          <span>{loc.city}</span>
                          <span className="opacity-85 text-[9px]">({loc.country})</span>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}

            </div>

            {/* Bottom Footer Information Line */}
            <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10 gap-2">
              <span className="text-slate-300 font-medium">
                {lang === 'bn' 
                  ? 'ঢাকা হেডকোয়ার্টার ↔ গুয়াংঝু • কলকাতা • দুবাই • সাকারিয়া • হো চি মিন • হংকং • নিউ ইয়র্ক • ফ্রাঙ্কফুর্ট' 
                  : 'Dhaka HQ ↔ Guangzhou • Kolkata • Dubai • Sakarya • Ho Chi Minh • Hong Kong • New York • Frankfurt'
                }
              </span>
              <span className="text-[#1E9B4C] font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Geographic Precision Confirmed</span>
              </span>
            </div>

          </div>

          {/* Selected Office Detail Inspector Card (4 Columns) */}
          <div className="lg:col-span-4 bg-white text-[#2B2B2B] p-6 rounded-2xl border border-[#E2E8E4] shadow-2xl flex flex-col justify-between h-full min-h-[460px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8E4] mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedOffice.flag}</span>
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-[#0E5C2E] leading-tight">
                      {selectedOffice.city}
                    </h3>
                    <div className="text-xs font-bold text-[#1E9B4C]">
                      {selectedOffice.country}
                    </div>
                  </div>
                </div>
                
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                  selectedOffice.category === 'hq' 
                    ? 'bg-[#E1232B] text-white' 
                    : selectedOffice.category === 'office'
                      ? 'bg-[#0E5C2E] text-white'
                      : 'bg-amber-400 text-slate-950'
                }`}>
                  {selectedOffice.type}
                </span>
              </div>

              <div className="space-y-3.5 text-xs text-[#5A6170] mb-5">
                <div className="p-3.5 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] shadow-sm">
                  <span className="text-[10px] font-extrabold text-[#0E5C2E] uppercase tracking-wider block mb-1">
                    {lang === 'zh' ? '官方注册地址 / 转运地址' : (lang === 'bn' ? 'অফিস ঠিকানা / ট্রানজিট এড্রেস' : 'Official Registered Address')}
                  </span>
                  <div className="flex items-start gap-2 text-[#2B2B2B] font-medium leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#1E9B4C] mt-0.5 shrink-0" />
                    <span>{selectedOffice.address}</span>
                  </div>
                </div>

                {/* Conditional Phone / Email Grid - Rendered only when contact details are present (e.g. Dhaka HQ) */}
                {(selectedOffice.phone || selectedOffice.email) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedOffice.phone && (
                      <div className="p-3 rounded-lg bg-[#F6F8F7] border border-[#E2E8E4]">
                        <span className="text-[10px] font-extrabold text-[#0E5C2E] uppercase tracking-wider block mb-1">
                          {lang === 'zh' ? '直拨电话' : (lang === 'bn' ? 'সরাসরি ফোন' : 'Direct Phone')}
                        </span>
                        <div className="flex items-center gap-1.5 text-[#2B2B2B] font-semibold text-[11px]">
                          <Phone className="w-3.5 h-3.5 text-[#1E9B4C] shrink-0" />
                          <span className="truncate">{selectedOffice.phone}</span>
                        </div>
                      </div>
                    )}
                    {selectedOffice.email && (
                      <div className="p-3 rounded-lg bg-[#F6F8F7] border border-[#E2E8E4]">
                        <span className="text-[10px] font-extrabold text-[#0E5C2E] uppercase tracking-wider block mb-1">
                          {lang === 'zh' ? '官方邮箱' : (lang === 'bn' ? 'অফিসিয়াল ইমেইল' : 'Official Email')}
                        </span>
                        <div className="flex items-center gap-1.5 text-[#2B2B2B] font-semibold text-[11px]">
                          <Mail className="w-3.5 h-3.5 text-[#1E9B4C] shrink-0" />
                          <span className="truncate">{selectedOffice.email}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E2E8E4]">
                <span className="text-[10px] font-extrabold text-[#0E5C2E] uppercase tracking-wider block mb-2">
                  {lang === 'zh' ? '主要辐射及覆盖贸易市场' : (lang === 'bn' ? 'কার্যক্রমের আওতাধীন বাণিজ্য ক্ষেত্র' : 'Primary Trade & Coverage Markets')}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedOffice.marketsServed || []).map((m, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-[#EAF6EE] text-[#0E5C2E] border border-[#1E9B4C]/30 text-xs font-extrabold">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={() => handleOpenOfficeDetail(selectedOffice)}
                className="w-full py-3 px-4 rounded-xl bg-[#0E5C2E] text-white font-extrabold text-xs uppercase tracking-wider text-center hover:bg-[#1E9B4C] transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#1E9B4C] group-hover:text-white" />
                <span>{lang === 'zh' ? '查看完整网点档案' : (lang === 'bn' ? 'পূর্ণাঙ্গ অফিস প্রোফাইল দেখুন' : 'View Full Office Dossier')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={selectedOffice.email ? `mailto:${selectedOffice.email}` : "mailto:sharabangla.group@gmail.com"}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F6F8F7] hover:bg-[#EAF6EE] text-[#0E5C2E] font-bold text-xs uppercase tracking-wider text-center border border-[#E2E8E4] hover:border-[#1E9B4C]/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#1E9B4C]" />
                <span>{t('map.contactOffice')}</span>
              </a>
            </div>
          </div>

        </div>

        {/* INFINITE HORIZONTAL AUTO-SCROLLING MARQUEE (Right-to-Left / ডান থেকে বামে) */}
        <div className="mt-4 pt-8 border-t border-[#E2E8E4]">
          
          {/* Header with click instruction */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#0E5C2E] flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-[#1E9B4C]" />
              <span>{lang === 'zh' ? '全部 9 处注册办事处与全球运营市场' : (lang === 'bn' ? 'সকল ৯টি অফিশিয়াল ও ট্রেড হাব তালিকা' : 'All 9 Registered Offices & Operating Markets')}</span>
            </h3>
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#E2E8E4] text-xs font-bold text-[#2B2B2B] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1E9B4C] animate-pulse" />
              <span>{lang === 'zh' ? '点击任意卡片查看详细档案与资质' : (lang === 'bn' ? 'যেকোনো অফিসে ক্লিক করে পূর্ণ বিবরণ দেখুন' : 'Click / Press any card for detailed dossier')}</span>
            </div>
          </div>

          {/* Marquee Wrapper with side gradient masks */}
          <div className="relative w-full overflow-hidden locations-marquee-container py-3">
            {/* Subtle light gradient edge masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#F4F7F5] to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#F4F7F5] to-transparent z-20" />

            {/* Marquee Row Scrolling Right to Left */}
            <div className="animate-marquee-locations flex items-stretch gap-5 pl-5 will-change-transform">
              {marqueeLocations.map((office: GlobalOffice, index: number) => {
                const isSelected = selectedOffice.id === office.id;
                const cardKey = `marquee-loc-${office.id}-${index}`;

                return (
                  <div
                    key={cardKey}
                    onClick={() => handleOpenOfficeDetail(office)}
                    className={`w-[320px] sm:w-[360px] shrink-0 p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer select-none flex flex-col justify-between group relative overflow-hidden ${
                      isSelected
                        ? 'bg-[#0E5C2E] text-white border-emerald-400 shadow-[0_0_25px_rgba(30,155,76,0.35)] ring-2 ring-emerald-400/40'
                        : 'bg-[#062817] text-slate-200 border-white/10 hover:border-[#1E9B4C] hover:bg-[#083a21] hover:shadow-xl'
                    }`}
                  >
                    {/* Top hover highlight bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1E9B4C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div>
                      {/* Header Row */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-3xl filter drop-shadow-sm">{office.flag}</span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-heading font-black text-base text-white group-hover:text-[#1E9B4C] transition-colors">
                                {office.city}
                              </h4>
                            </div>
                            <span className="text-xs text-[#1E9B4C] font-extrabold">{office.country}</span>
                          </div>
                        </div>

                        <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs ${
                          office.category === 'hq'
                            ? 'bg-[#E1232B] text-white'
                            : office.category === 'office'
                              ? 'bg-[#1E9B4C] text-white'
                              : 'bg-amber-400 text-slate-950 font-black'
                        }`}>
                          {office.type}
                        </span>
                      </div>

                      {/* Address snippet */}
                      <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
                        {office.address}
                      </p>
                    </div>

                    {/* Footer Row: Markets Served & Click Prompt */}
                    <div className="pt-3 border-t border-white/10 mt-auto">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {(office.marketsServed || []).slice(0, 2).map((market, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-medium">
                            {market}
                          </span>
                        ))}
                        {(office.marketsServed?.length || 0) > 2 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-slate-400">
                            +{(office.marketsServed?.length || 0) - 2}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#1E9B4C] font-extrabold group-hover:translate-x-0.5 transition-transform">
                        <span>{lang === 'zh' ? '查看详情档案' : (lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* EXECUTIVE CORPORATE OFFICE DOSSIER MODAL DIALOG */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-gradient-to-b from-[#062817] via-[#052013] to-[#03170D] text-white rounded-3xl border border-[#1E9B4C]/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#0E5C2E] to-[#06301A] border-b border-white/15">
              
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 hover:scale-105"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md ${
                  modalOffice.category === 'hq'
                    ? 'bg-[#E1232B] text-white'
                    : modalOffice.category === 'office'
                      ? 'bg-[#1E9B4C] text-white'
                      : 'bg-amber-400 text-slate-950 font-black'
                }`}>
                  {modalOffice.type}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-[11px] font-bold border border-white/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1E9B4C]" />
                  <span>{lang === 'zh' ? '官方认证国际商务设施' : (lang === 'bn' ? 'ভেরিফাইড আন্তর্জাতিক কার্যালয়' : 'Verified Trade Facility')}</span>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-5xl sm:text-6xl filter drop-shadow-md">{modalOffice.flag}</span>
                <div>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                    {modalOffice.city}
                  </h3>
                  <p className="text-sm font-bold text-emerald-300">
                    {modalOffice.country}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/15 text-xs sm:text-sm text-slate-200 font-medium">
                {lang === 'zh' ? currentDossier.roleTitle.zh : (lang === 'bn' ? currentDossier.roleTitle.bn : currentDossier.roleTitle.en)}
              </div>

            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
              
              {/* Working Hours & Timezone Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#1E9B4C] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-0.5">
                      {lang === 'zh' ? '营业办公时间' : (lang === 'bn' ? 'অফিস সময়সূচি' : 'Business Hours')}
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {lang === 'zh' ? currentDossier.workingHours.zh : (lang === 'bn' ? currentDossier.workingHours.bn : currentDossier.workingHours.en)}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Compass className="w-4 h-4 text-[#1E9B4C] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-0.5">
                      {lang === 'zh' ? '本地时区' : (lang === 'bn' ? 'স্থানীয় টাইমজোন' : 'Local Timezone')}
                    </span>
                    <span className="text-xs font-semibold text-white font-mono">
                      {currentDossier.timezone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Registered Address Card with Copy & Map Redirect */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black text-[#1E9B4C] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{lang === 'zh' ? '官方注册办公地址' : (lang === 'bn' ? 'অফিসিয়াল নিবন্ধিত ঠিকানা' : 'Official Registered Address')}</span>
                  </span>

                  <button
                    onClick={() => handleCopyText(modalOffice.address, 'address')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    {copiedField === 'address' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">{lang === 'zh' ? '已复制' : (lang === 'bn' ? 'কপি হয়েছে' : 'Copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-300" />
                        <span>{lang === 'zh' ? '复制地址' : (lang === 'bn' ? 'ঠিকানা কপি' : 'Copy')}</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium mb-3">
                  {modalOffice.address}
                </p>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${modalOffice.city} ${modalOffice.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#1E9B4C] hover:text-emerald-300 font-bold transition-colors"
                >
                  <span>{lang === 'zh' ? '在 Google 地图中查看' : (lang === 'bn' ? 'গুগল ম্যাপে দেখুন' : 'Open in Google Maps')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Direct Communications Info (Conditional - only if phone or email is available) */}
              {(modalOffice.phone || modalOffice.email) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {modalOffice.phone && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                          {lang === 'zh' ? '直接联系电话 / 服务专线' : (lang === 'bn' ? 'সরাসরি ফোন / হটলাইন' : 'Direct Phone Contact')}
                        </span>
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
                          <Phone className="w-4 h-4 text-[#1E9B4C] shrink-0" />
                          <span>{modalOffice.phone}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-2">
                        <a
                          href={`tel:${modalOffice.phone.split('/')[0].trim()}`}
                          className="text-[11px] font-bold text-[#1E9B4C] hover:underline"
                        >
                          {lang === 'zh' ? '拨打电话' : (lang === 'bn' ? 'কল করুন' : 'Call Office')}
                        </a>
                        <span className="text-slate-500">•</span>
                        <button
                          onClick={() => handleCopyText(modalOffice.phone!, 'phone')}
                          className="text-[11px] font-bold text-slate-300 hover:text-white cursor-pointer"
                        >
                          {copiedField === 'phone' ? (lang === 'zh' ? '已复制' : (lang === 'bn' ? 'কপি হয়েছে' : 'Copied')) : (lang === 'zh' ? '复制号码' : (lang === 'bn' ? 'নম্বর কপি' : 'Copy'))}
                        </button>
                      </div>
                    </div>
                  )}

                  {modalOffice.email && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                          {lang === 'zh' ? '官方企业邮箱' : (lang === 'bn' ? 'অফিসিয়াল ইমেইল' : 'Corporate Email')}
                        </span>
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
                          <Mail className="w-4 h-4 text-[#1E9B4C] shrink-0" />
                          <span className="truncate">{modalOffice.email}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-2">
                        <a
                          href={`mailto:${modalOffice.email}`}
                          className="text-[11px] font-bold text-[#1E9B4C] hover:underline"
                        >
                          {lang === 'zh' ? '发送邮件' : (lang === 'bn' ? 'মেইল পাঠান' : 'Send Mail')}
                        </a>
                        <span className="text-slate-500">•</span>
                        <button
                          onClick={() => handleCopyText(modalOffice.email!, 'email')}
                          className="text-[11px] font-bold text-slate-300 hover:text-white cursor-pointer"
                        >
                          {copiedField === 'email' ? (lang === 'zh' ? '已复制' : (lang === 'bn' ? 'কপি হয়েছে' : 'Copied')) : (lang === 'zh' ? '复制邮箱' : (lang === 'bn' ? 'মেইল কপি' : 'Copy'))}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Key Operations & Responsibilities */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[11px] font-black text-[#1E9B4C] uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>{lang === 'zh' ? '核心职能与业务运营范围' : (lang === 'bn' ? 'মূল কার্যক্রম ও পরিচালনা পরিধি' : 'Core Capabilities & Operations Scope')}</span>
                </span>

                <ul className="space-y-2">
                  {(currentDossier?.keyFunctions || []).map((fn, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E9B4C] mt-2 shrink-0" />
                      <span>{lang === 'zh' ? (fn.zh || fn.en) : (lang === 'bn' ? (fn.bn || fn.en) : fn.en)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Markets Served */}
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-2">
                  {lang === 'zh' ? '覆盖与辐射区域市场' : (lang === 'bn' ? 'আওতাভুক্ত আঞ্চলিক বাজারসমূহ' : 'Primary Trade & Coverage Markets')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {(modalOffice.marketsServed || []).map((m, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-[#1E9B4C]/20 border border-[#1E9B4C]/40 text-emerald-300 text-xs font-bold">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-5 sm:p-6 bg-black/40 border-t border-white/15 flex flex-col sm:row items-center justify-between gap-3">
              
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  const element = document.getElementById('global-map-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/10"
              >
                <Navigation className="w-3.5 h-3.5 text-[#1E9B4C]" />
                <span>{lang === 'zh' ? '在地图上定位' : (lang === 'bn' ? 'মানচিত্রে ফোকাস করুন' : 'Locate on Map')}</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  {lang === 'zh' ? '关闭' : (lang === 'bn' ? 'বন্ধ করুন' : 'Close')}
                </button>

                <a
                  href={modalOffice.email ? `mailto:${modalOffice.email}` : "mailto:sharabangla.group@gmail.com"}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-[#1E9B4C] hover:bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{lang === 'zh' ? '发送邮件咨询' : (lang === 'bn' ? 'ইমেইল ইনকোয়ারি পাঠান' : 'Contact Office')}</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
