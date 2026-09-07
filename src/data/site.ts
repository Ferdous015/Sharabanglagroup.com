// Single master data file for SHARABANGLA GROUP corporate web platform.
// All editable business content, company details, translations, leadership data, and milestones reside here.

export interface Company {
  id: string;
  name: string;
  banglaName: string;
  zhName?: string;
  slug: string;
  divisionId: 'ecommerce' | 'trading' | 'logistics' | 'manufacturing';
  divisionName: string;
  banglaDivisionName: string;
  zhDivisionName?: string;
  oneLiner: string;
  banglaOneLiner: string;
  zhOneLiner?: string;
  description: string;
  banglaDescription: string;
  zhDescription?: string;
  established: string;
  headquarters: string;
  operatingMarkets: string[];
  keyOfferings: string[];
  banglaKeyOfferings: string[];
  zhKeyOfferings?: string[];
  metrics: { label: string; banglaLabel?: string; zhLabel?: string; value: string }[];
  logoPlaceholderText: string;
  logoUrl?: string; // Path to official company logo file in /public/companies/
  bgImage: string; // Unsplash placeholder URL
  // TODO: Placeholder Unsplash image — replace with a real, licensed, or company-owned photograph (factory floor, warehouse, fleet, etc.) before production.
  heroImage?: string;
  heroPosition?: string;
  featuredProductImage?: string;
  featuredProductTitle?: string;
  banglaFeaturedProductTitle?: string;
  zhFeaturedProductTitle?: string;
  websiteUrl?: string;
  contactEmail: string;
}

export interface Division {
  id: 'ecommerce' | 'trading' | 'logistics' | 'manufacturing';
  name: string;
  banglaName: string;
  zhName?: string;
  shortDesc: string;
  banglaShortDesc: string;
  zhShortDesc?: string;
  companiesCount: number;
  icon: string;
}

export interface LeadershipMember {
  id: string;
  name: string; // e.g. MD KAISER ALI
  banglaName: string;
  zhName?: string;
  role: 'Chairman' | 'Managing Director' | 'Director';
  banglaRole: string;
  zhRole?: string;
  companyAffiliation?: string;
  banglaCompanyAffiliation?: string;
  zhCompanyAffiliation?: string;
  photoUrl: string; // Placeholder avatar silhouette
  photoPosition?: string; // Custom object-position for precise circular framing
  photoScale?: number; // Custom scale factor to un-crop tight photos
  photoTransform?: string; // Fine-grained CSS transform for uniform headroom/face scale
  bio: string;
  banglaBio: string;
  zhBio?: string;
  linkedinUrl?: string;
}

export interface DirectorMessage {
  id: string;
  tag: string;
  banglaTag: string;
  zhTag?: string;
  heading: string;
  banglaHeading: string;
  zhHeading?: string;
  quote: string;
  banglaQuote: string;
  zhQuote?: string;
  authorName: string;
  banglaAuthorName: string;
  zhAuthorName?: string;
  authorTitle: string;
  banglaAuthorTitle: string;
  zhAuthorTitle?: string;
  photoUrl: string;
  photoPosition?: string;
  signatureText: string;
}

export interface Milestone {
  year: string;
  title: string;
  banglaTitle: string;
  zhTitle?: string;
  description: string;
  banglaDescription: string;
  zhDescription?: string;
}

export interface GlobalOffice {
  id: string;
  country: string;
  banglaCountry?: string;
  zhCountry?: string;
  city: string;
  banglaCity?: string;
  zhCity?: string;
  type: string;
  banglaType?: string;
  zhType?: string;
  category: 'hq' | 'office' | 'market';
  address: string;
  banglaAddress?: string;
  zhAddress?: string;
  phone?: string;
  email?: string;
  coords: { x: number; y: number }; // Equirectangular map percentage position (x: left%, y: top%)
  marketsServed: string[];
  banglaMarketsServed?: string[];
  zhMarketsServed?: string[];
  flag: string;
}

export interface Testimonial {
  id: string;
  name: string;
  banglaName: string;
  zhName?: string;
  title: string;
  banglaTitle: string;
  zhTitle?: string;
  company?: string;
  banglaCompany?: string;
  zhCompany?: string;
  market: string;
  banglaMarket: string;
  zhMarket?: string;
  country: string;
  flag: string;
  quote: string;
  banglaQuote: string;
  zhQuote?: string;
  photoUrl: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  type?: 'news' | 'press' | 'announcement'; // 'news' = Latest News, 'press' = Press Releases, 'announcement' = Group Announcements
  banglaType?: string;
  zhType?: string;
  title: string;
  banglaTitle: string;
  zhTitle?: string;
  category: string;
  banglaCategory: string;
  zhCategory?: string;
  date: string;
  readTime: string;
  summary: string;
  banglaSummary: string;
  zhSummary?: string;
  content: string[];
  banglaContent: string[];
  zhContent?: string[];
  image: string;
  officialRef?: string;
}

export interface JobPosition {
  id: string;
  title: string;
  banglaTitle: string;
  zhTitle?: string;
  department: string;
  banglaDepartment?: string;
  zhDepartment?: string;
  categoryColor?: string;
  location: string;
  banglaLocation?: string;
  zhLocation?: string;
  type: string;
  banglaType?: string;
  zhType?: string;
  experience: string;
  banglaExperience?: string;
  zhExperience?: string;
  salary: string;
  banglaSalary?: string;
  zhSalary?: string;
  vacancy: string;
  banglaVacancy?: string;
  zhVacancy?: string;
  deadline: string;
  banglaDeadline?: string;
  zhDeadline?: string;
  description: string;
  banglaDescription?: string;
  zhDescription?: string;
  requirements: string[];
  banglaRequirements?: string[];
  zhRequirements?: string[];
}

export interface RegisteredOffice {
  city: string;
  country: string;
  role: string;
  banglaCity?: string;
  banglaCountry?: string;
  banglaRole?: string;
  zhCity?: string;
  zhCountry?: string;
  zhRole?: string;
}

export interface SiteSocials {
  linkedin: string;
  facebook: string;
  twitter: string;
  youtube: string;
  [key: string]: string;
}

export interface SiteStat {
  id: string;
  number: number;
  suffix: string;
  label: string;
  banglaLabel?: string;
  zhLabel?: string;
}

export interface SiteInfo {
  name: string;
  tagline: string;
  banglaTagline: string;
  zhTagline?: string;
  established: string;
  headquarters: string;
  banglaHeadquarters?: string;
  zhHeadquarters?: string;
  phone: string;
  email: string;
  registeredOffices: RegisteredOffice[];
  stats: SiteStat[];
  socials: SiteSocials;
}

export const siteInfo: SiteInfo = {
  name: "SHARABANGLA GROUP",
  tagline: "Connecting Bangladesh to Global Trade",
  banglaTagline: "বাংলাদেশকে বিশ্ব বাণিজ্যের সাথে যুক্ত করছে",
  established: "2015",
  headquarters: "3rd, 4th & 5th Floor, House 50, Road-01, Sector-05, Uttara, Dhaka, Bangladesh",
  phone: "+880 1811 509999",
  email: "sharabangla.group@gmail.com",
  registeredOffices: [
    { city: "Dhaka", country: "Bangladesh", role: "Global Headquarters" },
    { city: "Guangzhou", country: "China", role: "East Asia Supply Hub" },
    { city: "Kolkata", country: "India", role: "South Asia Trade Office" },
    { city: "Dubai", country: "UAE", role: "Middle East Gateway" },
    { city: "New York", country: "USA", role: "North America Hub" },
    { city: "Frankfurt", country: "Germany", role: "European Trade Base" }
  ],
  stats: [
    { id: "companies", number: 7, suffix: "+", label: "Group Concerns", banglaLabel: "গ্রুপ সহযোগী প্রতিষ্ঠান" },
    { id: "countries", number: 7, suffix: "", label: "Operating Countries", banglaLabel: "পরিচালনাকারী দেশ" },
    { id: "offices", number: 4, suffix: "", label: "Registered Offices", banglaLabel: "নিবন্ধিত অফিস" },
    { id: "divisions", number: 4, suffix: "", label: "Core Business Divisions", banglaLabel: "মূল ব্যবসা বিভাগ" },
    { id: "team", number: 1000, suffix: "+", label: "Team Members Worldwide", banglaLabel: "বিশ্বব্যাপী দলের সদস্য" }
  ],
  socials: {
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com"
  }
};

export const divisions = [
  {
    id: "ecommerce",
    name: "E-Commerce & Digital Commerce",
    banglaName: "ই-কমার্স ও ডিজিটাল কমার্স",
    zhName: "电子商务与数字商务",
    shortDesc: "Next-generation B2B & B2C digital marketplaces bridging global supply chains.",
    banglaShortDesc: "বৈশ্বিক সরবরাহ শৃঙ্খলকে সংযুক্তকারী পরবর্তী প্রজন্মের বিটুবি ও বিটুসি ডিজিটাল মার্কেটপ্লেস।",
    zhShortDesc: "连接全球供应链的下一代B2B与B2C数字商业平台。",
    companiesCount: 3,
    icon: "ShoppingBag"
  },
  {
    id: "trading",
    name: "Trading, Sourcing & Export-Import",
    banglaName: "ট্রেডিং, সোর্সিং ও আমদানি-রপ্তানি",
    zhName: "贸易、采购与进出口",
    shortDesc: "Cross-border merchant trading, raw material sourcing, and specialized commodity exports.",
    banglaShortDesc: "সীমান্তপারের মার্চেন্ট ট্রেডিং, কাঁচামাল সোর্সিং এবং বিশেষ পণ্য রপ্তানি।",
    zhShortDesc: "深耕跨境大宗商贸、工业原材料集采与特色大宗商品出口。",
    companiesCount: 2,
    icon: "Globe"
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    banglaName: "লজিস্টিকস ও সাপ্লাই চেইন",
    zhName: "物流与供应链",
    shortDesc: "Express cargo, freight forwarding, customs clearance, and technology-driven last-mile delivery.",
    banglaShortDesc: "এক্সপ্রেস কার্গো, ফ্রেইট ফরওয়ার্ডিং, কাস্টমস ক্লিয়ারেন্স এবং প্রযুক্তি-ভিত্তিক লাস্ট-মাইল ডেলিভারি।",
    zhShortDesc: "专业航空货运包机、海运集装箱、海关申报与科技驱动的末端极速配送。",
    companiesCount: 1,
    icon: "Truck"
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Technology",
    banglaName: "উৎপাদন ও প্রযুক্তি",
    zhName: "制造与技术",
    shortDesc: "Joint-venture technical textiles, non-woven fabric production, and industrial innovation.",
    banglaShortDesc: "যৌথ উদ্যোগের টেকনিক্যাল টেক্সটাইল, নন-ওভেন ফ্যাব্রিক উৎপাদন এবং শিল্প উদ্ভাবন।",
    zhShortDesc: "现代化技术合资企业、高品质无纺布生产与工业技术创新。",
    companiesCount: 1,
    icon: "Cpu"
  }
];

export const companies: Company[] = [
  {
    id: "laobaan",
    name: "Laobaan Bangladesh",
    banglaName: "লাওবান বাংলাদেশ",
    zhName: "Laobaan Bangladesh 孟加拉",
    slug: "laobaan-bangladesh",
    divisionId: "ecommerce",
    divisionName: "E-Commerce & Digital Commerce",
    banglaDivisionName: "ই-কমার্স ও ডিজিটাল কমার্স",
    zhDivisionName: "电子商务与数字商务",
    oneLiner: "Cross-border B2B e-commerce platform connecting Chinese supply chains with Bangladeshi businesses.",
    banglaOneLiner: "চীনা সরবরাহ শৃঙ্খলকে বাংলাদেশি ব্যবসায়ী ও আমদানিকারকদের সাথে যুক্তকারী বিটুবি ই-কমার্স প্ল্যাটফর্ম।",
    zhOneLiner: "连接中国供应链与孟加拉国企业及进口商的跨境B2B电子商务平台。",
    description: "Laobaan Bangladesh is a premier cross-border sourcing platform designed specifically for Bangladeshi enterprises, retailers, and wholesalers. By establishing direct integrations with top-tier Chinese manufacturers in Guangdong, Zhejiang, and Jiangsu, Laobaan eliminates traditional intermediary markups, transparently handles customs, and offers localized payment methods.",
    banglaDescription: "লাওবান বাংলাদেশ হলো একটি শীর্ষস্থানীয় ক্রস-বর্ডার সোর্সিং প্ল্যাটফর্ম যা বিশেষভাবে বাংলাদেশি উদ্যোগ, খুচরা বিক্রেতা ও পাইকারদের জন্য তৈরি। চীনের গুয়াংডং, ঝেজিয়াং এবং জিয়াংসুর শীর্ষ প্রস্তুতকারকদের সাথে সরাসরি যুক্ত হয়ে লাওবান মধ্যস্বত্বভোগীর খরচ কমায় এবং নিরাপদ স্থানীয় অর্থপ্রদান ব্যবস্থা নিশ্চিত করে।",
    zhDescription: "Laobaan Bangladesh（Laobaan 孟加拉）是专为孟加拉国制造企业、批发商与零售商量身打造的顶级跨境B2B采购平台。通过与广东、浙江、江苏等中国核心产业带优质制造源头深度对接，Laobaan 彻底消除了传统中间商层层加价环节，提供透明正规的清关报关服务，并支持孟加拉塔卡信用证（L/C）与第三方资金托管等本地化结算方案，助力孟加拉企业以极具竞争力的成本高效对接全球制造中心。",
    established: "2019",
    headquarters: "Dhaka & Guangzhou",
    operatingMarkets: ["Bangladesh", "China", "Hong Kong"],
    keyOfferings: [
      "Direct Factory Sourcing",
      "QC Inspection & Factory Audits",
      "Door-to-Door Customs Clearance",
      "BDT L/C & Escrow Payment Options"
    ],
    banglaKeyOfferings: [
      "সরাসরি কারখানা সোর্সিং",
      "মান নিয়ন্ত্রণ পরিদর্শণ ও কারখানা অডিট",
      "ডোর-টু-ডোর কাস্টমস ক্লিয়ারেন্স",
      "টাকা এল/সি ও এসক্রো পেমেন্ট ব্যবস্থা"
    ],
    zhKeyOfferings: [
      "源头工厂直连采购（广东/浙江/江苏）",
      "出厂前严格品质检验与工厂现场审计",
      "双清包税与一站式门到门通关服务",
      "孟加拉塔卡（BDT）信用证与资金托管结算"
    ],
    metrics: [
      { label: "Verified Suppliers", banglaLabel: "যাচাইকৃত সরবরাহকারী", zhLabel: "认证供应商", value: "15,000+" },
      { label: "Monthly B2B Orders", banglaLabel: "মাসিক বিটুবি অর্ডার", zhLabel: "月度B2B订单量", value: "25,000+" },
      { label: "Customs Clearance Rate", banglaLabel: "কাস্টমস ক্লিয়ারেন্স রেট", zhLabel: "清关通关顺畅率", value: "99.4%" }
    ],
    logoPlaceholderText: "LAOBAAN BANGLADESH",
    logoUrl: "/companies/laobaan.png",
    bgImage: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1200&auto=format&fit=crop",
    // TODO: Placeholder Unsplash image — replace with a real, licensed, or company-owned photograph (factory floor, warehouse, fleet, etc.) before production.
    heroImage: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=80",
    websiteUrl: "https://laobaan.com/",
    contactEmail: "info@laobaan.com.bd"
  },
  {
    id: "shenova",
    name: "Shenova",
    banglaName: "শেনোভা",
    zhName: "Shenova 尚诺华",
    slug: "shenova",
    divisionId: "ecommerce",
    divisionName: "E-Commerce & Digital Commerce",
    banglaDivisionName: "ই-কমার্স ও ডিজিটাল কমার্স",
    zhDivisionName: "电子商务与数字商务",
    oneLiner: "Direct-to-consumer online retail brand offering lifestyle, electronics, and fashion products.",
    banglaOneLiner: "লাইফস্টাইল, ইলেকট্রনিক্স ও ফ্যাশন সামগ্রী সরবরাহকারী গ্রাহক-কেন্দ্রিক অন-লাইন রিটেইল ব্র্যান্ড।",
    zhOneLiner: "提供智能家居、消费电子及现代时尚产品的直面消费者（D2C）在线零售品牌。",
    description: "Shenova is a fast-growing consumer retail brand committed to elevating everyday living for modern urban Bangladeshi households. Offering a curated selection of smart home electronics, personal care gear, and contemporary lifestyle apparel, Shenova blends sleek digital storefront design with rapid local delivery.",
    banglaDescription: "শেনোভা একটি দ্রুত বর্ধনশীল কনজিউমার রিটেইল ব্র্যান্ড যা আধুনিক বাংলাদেশি পরিবারগুলোর জন্য উন্নত মানের স্মার্ট হোম ইলেকট্রনিক্স, ব্যক্তিগত পরিচর্যা সামগ্রী এবং ফ্যাশন লাইফস্টাইল পণ্য সরবরাহ করে।",
    zhDescription: "Shenova（尚诺华）是一家快速成长的消费品零售品牌，致力于为孟加拉国现代都市家庭提升高品质日常生活体验。品牌甄选全球优质智能家居硬件、个人护理设备与现代时尚服饰，将流畅便捷的数字化在线购物体验与达卡及主要城市的高效本地极速配送紧密结合，打造值得信赖的现代生活方式品牌。",
    established: "2021",
    headquarters: "Dhaka, Bangladesh",
    operatingMarkets: ["Bangladesh"],
    keyOfferings: [
      "Curated Smart Electronics",
      "Omnichannel Retail Fulfillment",
      "Same-Day Express Delivery in Dhaka",
      "Hassle-Free Import & Retail Solutions"
    ],
    banglaKeyOfferings: [
      "স্মার্ট ইলেকট্রনিক্স সামগ্রী",
      "ওমনিচ্যানেল রিটেইল ফুলফিলমেন্ট",
      "ঢাকায় সেম-ডে এক্সপ্রেস ডেলিভারি",
      "সহজ রিটার্ন ও কাস্টমার কেয়ার"
    ],
    zhKeyOfferings: [
      "精选高品质智能电子与数码设备",
      "全渠道零售订单即时履约体系",
      "达卡大都市区当日极速送达服务",
      "无忧进口采购与本土化零售服务"
    ],
    metrics: [
      { label: "Active Customers", banglaLabel: "সক্রিয় গ্রাহক", zhLabel: "活跃消费者数量", value: "85,000+" },
      { label: "Product Catalog Items", banglaLabel: "পণ্য ক্যাটালগ", zhLabel: "在线产品SKU总数", value: "3,500+" },
      { label: "Repeat Order Rate", banglaLabel: "পুনরাবৃত্তি অর্ডার হার", zhLabel: "客户复购率", value: "68%" }
    ],
    logoPlaceholderText: "SHENOVA",
    logoUrl: "/companies/shenova.png",
    bgImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop",
    // TODO: Placeholder Unsplash image — replace with a real, licensed, or company-owned photograph (factory floor, warehouse, fleet, etc.) before production.
    heroImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80",
    // Official online presence: Shenova Facebook Page
    websiteUrl: "https://www.facebook.com/shenoova",
    contactEmail: "info@shenova.com.bd"
  },
  {
    id: "sharabangla-com",
    name: "Sharabangla.com",
    banglaName: "শারাবাংলা.কম",
    zhName: "Sharabangla.com 沙拉邦拉电商",
    slug: "sharabangla-com",
    divisionId: "ecommerce",
    divisionName: "E-Commerce & Digital Commerce",
    banglaDivisionName: "ই-কমার্স ও ডিজিটাল কমার্স",
    zhDivisionName: "电子商务与数字商务",
    oneLiner: "Flagship national e-commerce marketplace connecting verified sellers with nationwide consumers.",
    banglaOneLiner: "সারাদেশের ক্রেতা ও যাচাইকৃত বিক্রেতাদের সংযুক্তকারী ফ্ল্যাগশিপ ডিজিটাল কমার্স প্ল্যাটফর্ম।",
    zhOneLiner: "连接全国认证商家与数百万消费者的旗舰级B2C国家数字商业平台。",
    description: "Sharabangla.com is the flagship e-commerce marketplace of Sharabangla Group. Built on high-performance cloud infrastructure, it serves millions of Bangladeshi shoppers with verified products, secure payment gateways, and integration with Sharabangla Express for rapid fulfillment.",
    banglaDescription: "শারাবাংলা.কম হলো শারাবাংলা গ্রুপের ফ্ল্যাগশিপ বিটুসি ই-কমার্স মার্কেটপ্লেস। উন্নত ক্লাউড অবকাঠামোয় নির্মিত এই প্ল্যাটফর্মটি লক্ষাধিক গ্রাহককে গুণগত মানসম্পন্ন পণ্য, নিরাপদ পেমেন্ট গেটওয়ে এবং শারাবাংলা এক্সপ্রেসের মাধ্যমে দ্রুত ডেলিভারি সুবিধা প্রদান করে।",
    zhDescription: "Sharabangla.com 是沙拉邦拉集团旗下的旗舰级国家B2C电商平台。平台构建于高可用云计算基础设施之上，为数百万孟加拉国消费者提供100%正品保障、银行级安全在线支付网关，并无缝对接沙拉邦拉速运（Sharabangla Express）庞大的物流干线网络，实现全国范围内的快速订单履约与门到门配送。",
    established: "2015",
    headquarters: "Dhaka, Bangladesh",
    operatingMarkets: ["Bangladesh"],
    keyOfferings: [
      "Multi-Vendor Digital Storefronts",
      "Verified Authentic Product Guarantee",
      "Integrated BDT Payment Gateways",
      "Express Nationwide Doorstep Delivery"
    ],
    banglaKeyOfferings: [
      "মাল্টি-ভেন্ডর ডিজিটাল স্টোরফ্রন্ট",
      "শতভাগ খাঁটি পণ্যের নিশ্চয়তা",
      "সমন্বিত নিরাপদ ডিজিটাল পেমেন্ট",
      "সারাদেশে এক্সপ্রেস ডেলিভারি"
    ],
    zhKeyOfferings: [
      "多商户入驻数字店铺系统与品牌旗舰店",
      "100% 正品保障与严苛商家准入认证",
      "集成全国多通道安全电子支付网关",
      "覆盖孟加拉全境的门到门极速快递网络"
    ],
    metrics: [
      { label: "Registered Buyers", banglaLabel: "নিবন্ধিত ক্রেতা", zhLabel: "注册买家用户数", value: "250,000+" },
      { label: "Verified Merchants", banglaLabel: "যাচাইকৃত মার্চেন্ট", zhLabel: "认证入驻商户", value: "4,500+" },
      { label: "Monthly Delivered Parcels", banglaLabel: "মাসিক ডেলিভারি পার্সেল", zhLabel: "月度配送包裹量", value: "60,000+" }
    ],
    logoPlaceholderText: "SHARABANGLA.COM",
    logoUrl: "/companies/sharabangla-com.png",
    bgImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    // TODO: Placeholder Unsplash image — replace with a real, licensed, or company-owned photograph (factory floor, warehouse, fleet, etc.) before production.
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    // TODO: Verify if real live URL is active or if corporate staging URL is needed
    websiteUrl: "https://sharabangla.com",
    contactEmail: "info@sharabangla.com"
  },
  {
    id: "bac-venture",
    name: "BAC Venture",
    banglaName: "বিএসি ভেঞ্চার",
    zhName: "BAC Venture 商业投资贸易",
    slug: "bac-venture",
    divisionId: "trading",
    divisionName: "Trading, Sourcing & Export-Import",
    banglaDivisionName: "ট্রেডিং, সোর্সিং ও আমদানি-রপ্তানি",
    zhDivisionName: "贸易、采购与进出口",
    oneLiner: "Merchant trading house specializing in industrial raw materials and commodity exports.",
    banglaOneLiner: "শিল্প কাঁচামাল এবং বিশেষ পণ্য রপ্তানিতে নিয়োজিত মার্চেন্ট ট্রেডিং হাউজ।",
    zhOneLiner: "专注于工业原材料采购、纺织辅料进口与大宗特色农产品出口的专业外贸企业。",
    description: "BAC Venture operates as the strategic international trading arm of Sharabangla Group. Facilitating bulk commodity exchanges, raw material procurement for ready-made garments (RMG), and export of agricultural products, BAC Venture connects Bangladeshi enterprise demand with global supply hubs in Asia and Europe.",
    banglaDescription: "বিএসি ভেঞ্চার শারাবাংলা গ্রুপের কৌশলগত আন্তর্জাতিক বাণিজ্য অঙ্গ হিসেবে পরিচালিত হয়। এটি বালক পণ্য লেনদেন, তৈরি পোশাক শিল্পের কাঁচামাল সংগ্রহ এবং কৃষি পণ্য রপ্তানি নিশ্চিত করে।",
    zhDescription: "BAC Venture 作为沙拉邦拉集团旗下的核心国际商贸与进出口实体，主要从事大宗工业原料采购、成衣制造（RMG）面料与辅料进口以及孟加拉特色农产品向海外市场的出口分销。依托横跨亚洲与欧洲的全球供应链网络，BAC Venture 紧密衔接孟加拉国庞大的产业制造需求与国际大宗商品市场。",
    established: "2016",
    headquarters: "Dhaka, Bangladesh",
    operatingMarkets: ["Bangladesh", "China", "India", "Dubai", "Germany"],
    keyOfferings: [
      "Bulk Industrial Raw Material Sourcing",
      "RMG Fabric & Trims Import Operations",
      "Agricultural Commodity Exports",
      "Cross-Border Merchant Trade Financing"
    ],
    banglaKeyOfferings: [
      "শিল্প কাঁচামাল বালক সোর্সিং",
      "আরএমজি ফ্যাব্রিক ও ট্রিমস আমদানি",
      "কৃষি ও খাদ্য পণ্য রপ্তানি",
      "আন্তর্জাতিক ট্রেড ফাইন্যান্সিং"
    ],
    zhKeyOfferings: [
      "大宗工业原料与特种化工原料集采",
      "成衣（RMG）高档面料与辅料进口运营",
      "优质特色农产品与食品级大宗原料出口",
      "跨境商业贸易融资与供应链金融支持"
    ],
    metrics: [
      { label: "Annual Trade Volume", banglaLabel: "বার্ষিক ট্রেড ভলিউম", zhLabel: "年进出口贸易额", value: "$45M+" },
      { label: "Global Supplier Network", banglaLabel: "গ্লোবাল সাপ্লায়ার নেটওয়ার্ক", zhLabel: "全球供应商合作网络", value: "500+" },
      { label: "Export Destination Nations", banglaLabel: "রপ্তানি গন্তব্য দেশ", zhLabel: "出口目标国家与地区", value: "18" }
    ],
    logoPlaceholderText: "BAC VENTURE",
    logoUrl: "/companies/bac-venture.png",
    bgImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
    // TODO: Placeholder Unsplash image — replace with a real, licensed, or company-owned photograph (factory floor, warehouse, fleet, etc.) before production.
    heroImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80",
    // TODO: Provide verified official website URL for BAC Venture if separate from group portal
    websiteUrl: "https://bacventure.com",
    contactEmail: "info@bacventure.com"
  },
  {
    id: "sharabangla-down-products",
    name: "Sharabangla Down Products",
    banglaName: "শারাবাংলা ডাউন প্রোডাক্টস",
    zhName: "Sharabangla Down Products 沙拉邦拉羽绒制品",
    slug: "sharabangla-down-products",
    divisionId: "trading",
    divisionName: "Trading, Sourcing & Export-Import",
    banglaDivisionName: "ট্রেডিং, সোর্সিং ও আমদানি-রপ্তানি",
    zhDivisionName: "贸易、采购与进出口",
    oneLiner: "Specialized processing and export of premium down feather, insulation materials, and technical bedding textiles.",
    banglaOneLiner: "প্রিমিয়াম ডাউন ফেদার প্রসেসিং, ইনসুলেশন উপাদান ও টেক্সটাইল টেকনিক্যাল সামগ্রী রপ্তানি।",
    zhOneLiner: "专业从事高品质天然羽绒水洗消毒、保暖填料加工及功能性纺织材料出口。",
    description: "Sharabangla Down Products specializes in the ethical sourcing, washing, sterilization, and grading of down and feather materials for international apparel and home textile manufacturers. Operating advanced processing facilities, it exports eco-certified natural insulation products to global garment brands.",
    banglaDescription: "শারাবাংলা ডাউন প্রোডাক্টস আন্তর্জাতিক পোশাক ও টেক্সটাইল প্রস্তুতকারকদের জন্য উন্নত মানের ফেদার এবং ইনসুলেশন উপাদান সংগ্রহ, ওয়াশিং ও রপ্তানিতে নিয়োজিত। এটি আন্তর্জাতিক মানের পরিবেশবান্ধব প্রাকৃতিক ইনসুলেশন সামগ্রী বৈশ্বিক ব্র্যান্ডগুলোতে সরবরাহ করে।",
    zhDescription: "Sharabangla Down Products（沙拉邦拉羽绒制品）专注致力于国际成衣及家纺品牌的天然羽绒原料采购、环保水洗脱脂、高温灭菌与精准分级加工。工厂配备先进的羽绒水洗加工与检验测试生产线，生产符合国际环保认证的高蓬松度、高清洁度保暖填充物，稳定出口至欧洲、中国及东南亚等全球各大服装供应链基地。",
    established: "2017",
    headquarters: "Dhaka & Chittagong, Bangladesh",
    operatingMarkets: ["Bangladesh", "China", "Europe", "Vietnam"],
    keyOfferings: [
      "Ethically Sourced Natural Down Feather",
      "Washing, Sterilization & Sorting",
      "Apparel & Outerwear Thermal Fillers",
      "Eco-Certified Export Roll Goods"
    ],
    banglaKeyOfferings: [
      "পরিবেশবান্ধব প্রাকৃতিক ফেদার সংগ্রহ",
      "হাই-টেক প্রসেসিং ও স্টারলাইজেশন",
      "আউটারওয়্যার ইনসুলেশন ফিলিং",
      "আন্তর্জাতিক মানসম্মত রপ্তানি পণ্য"
    ],
    zhKeyOfferings: [
      "合规可溯源高品质天然水洗羽绒原料",
      "高科技高温蒸汽灭菌、水洗与精细除尘分级",
      "国际品牌羽绒服与户外防寒服专用保暖填料",
      "通过国际环保与卫生安全认证的出海卷材"
    ],
    metrics: [
      { label: "Annual Export Capacity", banglaLabel: "বার্ষিক রপ্তানি ক্ষমতা", zhLabel: "年设计出口加工产能", value: "1,200 Tons" },
      { label: "Global Textile Partners", banglaLabel: "গ্লোবাল টেক্সটাইল পার্টনার", zhLabel: "全球纺织服装合作品牌", value: "40+" },
      { label: "Purity Grade Rating", banglaLabel: "বিশুদ্ধতার মান রেটিং", zhLabel: "羽绒清洁度与纯度等级", value: "95%+" }
    ],
    logoPlaceholderText: "SHARABANGLA DOWN PRODUCTS",
    logoUrl: "/companies/sharabangla-down-products.png",
    bgImage: "/companies/hero/sharabangla-down-products-hero.jpg",
    heroImage: "/companies/hero/sharabangla-down-products-hero.jpg",
    heroPosition: "center 30%",
    // TODO: Provide verified official website URL for Sharabangla Down Products if separate from group portal
    websiteUrl: "https://sharabangladown.com",
    contactEmail: "info@sharabangladown.com"
  },
  {
    id: "sharabangla-express",
    name: "Sharabangla Express",
    banglaName: "শারাবাংলা এক্সপ্রেস",
    zhName: "Sharabangla Express 沙拉邦拉速运",
    slug: "sharabangla-express",
    divisionId: "logistics",
    divisionName: "Logistics & Supply Chain",
    banglaDivisionName: "লজিস্টিকস ও সাপ্লাই চেইন",
    zhDivisionName: "物流与供应链",
    oneLiner: "Tech-enabled express courier, air freight chartering, and last-mile logistics network.",
    banglaOneLiner: "প্রযুক্তি-ভিত্তিক এক্সপ্রেস কুরিয়ার, এয়ার ফ্রেইট চার্টারিং এবং লাস্ট-মাইল লজিস্টিকস নেটওয়ার্ক।",
    zhOneLiner: "基于智能路由算法的全程可追溯快递、国际航空货运包机与末端配送网络。",
    description: "Sharabangla Express provides nationwide express parcel delivery, cross-border customs handling, air cargo chartering, and warehouse fulfillment services. Powered by proprietary route optimization software and a fleet of over 300 delivery vehicles, Sharabangla Express guarantees rapid transit times across all 64 districts of Bangladesh.",
    banglaDescription: "শারাবাংলা এক্সপ্রেস সারাদেশে এক্সপ্রেস পার্সেল ডেলিভারি, আন্তর্জাতিক কাস্টমস হ্যান্ডলিং, এয়ার কার্গো এবং ওয়্যারহাউস ফুলফিলমেন্ট সেবা প্রদান করে। ৩০০টিরও বেশি যানবাহনের বহর এবং ট্র্যাকিং সফটওয়্যার দ্বারা এটি বাংলাদেশের ৬৪টি জেলায় দ্রুত পরিষেবা নিশ্চিত করে।",
    zhDescription: "Sharabangla Express（沙拉邦拉速运）提供覆盖孟加拉国全境64个行政区的快递包裹速递、跨国通关报关、中孟航空货运包机以及现代化仓储智能履约服务。依托自主研发的智能干线调度系统与超过300辆自有运输车队，沙拉邦拉速运为跨境电商与本土企业提供时效稳定、全程可视化跟踪的极速物流体验。",
    established: "2018",
    headquarters: "Dhaka, Bangladesh",
    operatingMarkets: ["Bangladesh", "China", "UAE"],
    keyOfferings: [
      "64-District Express Doorstep Delivery",
      "Cross-Border Air Freight & Customs Brokerage",
      "Automated Warehousing & API Tracking",
      "Same-Day Commerce Fulfillment"
    ],
    banglaKeyOfferings: [
      "৬৪ জেলায় এক্সপ্রেস ডোরস্টেপ ডেলিভারি",
      "আন্তর্জাতিক এয়ার কার্গো ও কাস্টমস ক্লিয়ারেন্স",
      "স্বয়ংক্রিয় ওয়্যারহাউস ও এপিআই ট্র্যাকিং",
      "সেম-ডে কমার্স ফুলফিলমেন্ট"
    ],
    zhKeyOfferings: [
      "孟加拉国 64 个行政区门到门快递直达",
      "广州—达卡跨境航空包机与专业报关清关",
      "全自动智能立体仓储与开放式 API 实时物流追踪",
      "电商大促当日极速仓配一体化履约"
    ],
    metrics: [
      { label: "Daily Parcels Handled", banglaLabel: "দৈনিক পার্সেল ব্যবস্থাপনা", zhLabel: "日均快件处理量", value: "15,000+" },
      { label: "Nationwide Hubs", banglaLabel: "দেশব্যাপী হাব", zhLabel: "全国直营转运集散中心", value: "85" },
      { label: "Delivery Fleet Vehicles", banglaLabel: "ডেলিভারি যানবাহন", zhLabel: "自有与合规配送车辆", value: "300+" }
    ],
    logoPlaceholderText: "SHARABANGLA EXPRESS",
    logoUrl: "/companies/sharabangla-express.png",
    bgImage: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop",
    // TODO: Placeholder Unsplash image — replace with a real, licensed, or company-owned photograph (factory floor, warehouse, fleet, etc.) before production.
    heroImage: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=80",
    // TODO: Provide verified official website URL for Sharabangla Express if separate from group portal
    websiteUrl: "https://sharabanglaexpress.com",
    contactEmail: "express@sharabangla.com"
  },
  {
    id: "fumao-technology",
    name: "FuMao Bangladesh Technology Co., Ltd.",
    banglaName: "ফুমাও বাংলাদেশ টেকনোলজি কোং লিমিটেড",
    zhName: "FuMao Bangladesh Technology Co., Ltd. 福茂孟加拉科技有限公司",
    slug: "fumao-bangladesh-technology",
    divisionId: "manufacturing",
    divisionName: "Manufacturing & Technology",
    banglaDivisionName: "উৎপাদন ও প্রযুক্তি",
    zhDivisionName: "制造与技术",
    oneLiner: "Joint-venture non-woven fabric manufacturing plant producing eco-packaging and medical textiles.",
    banglaOneLiner: "পরিবেশবান্ধব প্যাকেজিং ও মেডিকেল টেক্সটাইল উৎপাদনের যৌথ টেকনোলজি কারখানা।",
    zhOneLiner: "专注生产医用级防护材料、环保生物降解包装与工业纺织品的现代技术合资制造厂。",
    description: "FuMao Bangladesh Technology Co., Ltd. is a state-of-the-art technological joint venture introducing advanced spunbond and meltblown non-woven fabric production lines to Bangladesh. Located in an industrial zone near Dhaka, FuMao supplies medical-grade barrier fabrics, agricultural covers, and sustainable non-woven bag materials.",
    banglaDescription: "ফুমাও বাংলাদেশ টেকনোলজি কোং লিমিটেড হলো একটি অত্যাধুনিক শিল্প প্রযুক্তি যৌথ উদ্যোগ। এটি উচ্চমানের স্পানবন্ড ও মেল্টব্লোন নন-ওভেন ফ্যাব্রিক উৎপাদন করে যা চিকিৎসা সামগ্রী, স্বাস্থ্যসেবা পণ্য এবং পলিথিন-মুক্ত বিকল্প শপিং ব্যাগে ব্যবহৃত হয়।",
    zhDescription: "FuMao Bangladesh Technology Co., Ltd.（福茂孟加拉科技有限公司）是一家现代高科技合资制造企业，率先将国际先进的纺粘（Spunbond）与熔喷（Meltblown）非织造无纺布全自动生产线引入孟加拉国。工厂坐落于达卡临近工业园区，主要生产医疗级防护服与医用外科口罩滤材、农业防草保温覆盖布以及环保可降解无纺布手提袋卷材，全面支持孟加拉国绿色环保替代方案。",
    established: "2020",
    headquarters: "Gazipur & Dhaka, Bangladesh",
    operatingMarkets: ["Bangladesh", "China", "South Asia"],
    keyOfferings: [
      "Spunbond Non-Woven Polypropylene Fabric Lines",
      "Medical & Surgical Grade Mask Meltblown Filter Media",
      "Eco-Friendly Biodegradable Packaging Roll Goods",
      "Custom Technical Textile Printing & Lamination"
    ],
    banglaKeyOfferings: [
      "স্পানবন্ড নন-ওভেন পলিপ্রোপিলিন ফ্যাব্রিক",
      "মেডিকেল ও সার্জিক্যাল মাস্ক মেল্টব্লোন ফিল্টার মিডিয়া",
      "পরিবেশবান্ধব পলিথিন-মুক্ত ব্যাগ উপাদান",
      "কাস্টম টেকনিক্যাল টেক্সটাইল প্রিন্টিং ও লেমিনেশন"
    ],
    zhKeyOfferings: [
      "高强聚丙烯纺粘（Spunbond）非织造无纺布线",
      "医用外科级口罩高阻隔熔喷（Meltblown）滤材",
      "环保可降解绿色包装与购物袋无纺布专用材料",
      "定制化工业特种技术纺织品印花与淋膜复合加工"
    ],
    metrics: [
      { label: "Factory Land Area", banglaLabel: "কারখানার মোট জমি", zhLabel: "现代化工业厂房占地", value: "85,000 Sq Ft" },
      { label: "Daily Capacity (Non-Woven Bag)", banglaLabel: "দৈনিক উৎপাদন ক্ষমতা (নন-ওভেন ব্যাগ)", zhLabel: "日设计产能（无纺布袋）", value: "200,000 Pieces" },
      { label: "ISO Certifications", banglaLabel: "আইএসও সার্টিফিকেশন", zhLabel: "国际ISO管理体系认证", value: "9001 / 14001" }
    ],
    logoPlaceholderText: "FUMAO BANGLADESH TECHNOLOGY CO., LTD.",
    logoUrl: "/companies/fumao.png",
    bgImage: "/companies/fumao/fumao-machine-hero.jpg",
    heroImage: "/companies/fumao/fumao-machine-hero.jpg",
    featuredProductImage: "/companies/fumao/fumao-product.png",
    featuredProductTitle: "Non-Woven Biodegradable Bags",
    banglaFeaturedProductTitle: "নন-ওভেন বায়োডিগ্রেডেবল ব্যাগ",
    zhFeaturedProductTitle: "环保可降解无纺布手提袋",
    // TODO: Provide verified official website URL for FuMao Bangladesh if separate from group portal
    websiteUrl: "https://fumaobd.com",
    contactEmail: "info@fumaobd.com"
  }
];

// TODO: replace placeholder leadership data — update names, photos, and bios below when finalized.
export const leadership: LeadershipMember[] = [
  {
    id: "chairman",
    name: "MD KAISER ALI",
    banglaName: "MD KAISER ALI",
    zhName: "MD KAISER ALI",
    role: "Chairman",
    banglaRole: "চেয়ারম্যান",
    zhRole: "董事长",
    // Official photo from /public/leadership/chairman.jpg (Aspect ratio 0.834, 944x1132)
    photoUrl: "/leadership/chairman.jpg",
    photoPosition: "center 38%",
    bio: "With over 25 years of global business leadership, MD Kaiser Ali has shaped Sharabangla Group from its earliest ambitions into a cross-border powerhouse spanning e-commerce, logistics, trade, and manufacturing. His vision set the foundation on which the entire Group now stands — and under his continued leadership, Sharabangla Group moves forward with unwavering conviction toward a trillion-dollar future.",
    banglaBio: "আন্তর্জাতিক ব্যবসায় ২৫ বছরেরও বেশি অভিজ্ঞতাসম্পন্ন এমডি কায়সার আলী শারাবাংলা গ্রুপকে এর শুরুর স্বপ্ন থেকে আজকের ই-কমার্স, লজিস্টিকস, বাণিজ্য ও ম্যানুফ্যাকচারিং সমৃদ্ধ এক আন্তঃসীমান্ত বাণিজ্যের শীর্ষ প্রতিষ্ঠানে রূপ দিয়েছেন। তাঁর দূরদর্শী রূপকল্পই স্থাপন করেছে সেই শক্তিশালী ভিত্তি যার ওপর আজ পুরো গ্রুপ দাঁড়িয়ে আছে — এবং তাঁর অবিচল নেতৃত্বে শারাবাংলা গ্রুপ দৃঢ় প্রত্যয়ে এগিয়ে চলেছে ট্রিলিয়ন ডলারের এক সোনালী ভবিষ্যতের দিকে।",
    zhBio: "拥有超过25年全球商业领导经验的 MD Kaiser Ali 先生，带领沙拉邦拉集团从最初的宏伟构想，发展成为横跨电子商务、现代物流、国际贸易与先进制造的跨国产业巨头。他的远见卓识奠定了整个集团蓬勃发展的坚实基石；在他的持续引领下，沙拉邦拉集团正以坚定不移的信念，稳步迈向万亿美元的宏伟未来。",
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "md",
    name: "MUHAMMAD SHOAIBUR RAHMAN",
    banglaName: "MUHAMMAD SHOAIBUR RAHMAN",
    zhName: "MUHAMMAD SHOAIBUR RAHMAN",
    role: "Managing Director",
    banglaRole: "ব্যবস্থাপনা পরিচালক",
    zhRole: "董事总经理",
    // Official photo from /public/leadership/managing-director.png (Aspect ratio 0.781, 1599x2048)
    photoUrl: "/leadership/managing-director.png?v=2",
    photoPosition: "center 0%",
    photoTransform: "scale(0.96) translateY(5%)",
    bio: "As Managing Director, Muhammad Shoaibur Rahman leads Sharabangla Group as a whole — steering every division with the vision and discipline that drive the Group's growth forward. His expertise spans across all sectors of the business, from digital commerce to logistics, trade, and manufacturing. Beyond building a multinational enterprise, his deeper ambition is to create employment for millions, both locally and internationally, turning growth into genuine opportunity. Under his leadership, Sharabangla Group continues its determined march toward becoming a true multinational — and toward a trillion-dollar future.",
    banglaBio: "ব্যবস্থাপনা পরিচালক হিসেবে মুহাম্মদ শোয়াইবুর রহমান শারাবাংলা গ্রুপের সার্বিক পরিচালনার নেতৃত্ব দিচ্ছেন — প্রতিটি বিভাগকে এমন এক দূরদর্শিতা ও শৃঙ্খলার সাথে পরিচালিত করছেন যা গ্রুপের সামগ্রিক প্রবৃদ্ধিকে এগিয়ে নিয়ে যাচ্ছে। ডিজিটাল কমার্স থেকে শুরু করে লজিস্টিকস, আন্তর্জাতিক বাণিজ্য ও ম্যানুফ্যাকচারিং পর্যন্ত প্রতিষ্ঠানের প্রতিটি খাতে রয়েছে তাঁর গভীর দক্ষতা। একটি বহুজাতিক প্রতিষ্ঠান গড়ে তোলার পাশাপাশি তাঁর অন্যতম প্রধান লক্ষ্য হলো দেশ ও আন্তর্জাতিক অঙ্গনে লাখ লাখ মানুষের কর্মসংস্থান সৃষ্টি করা এবং প্রবৃদ্ধিকে প্রকৃত সুযোগে রূপান্তর করা। তাঁর বলিষ্ঠ নেতৃত্বে শারাবাংলা গ্রুপ একটি সফল বহুজাতিক প্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত হওয়া এবং ট্রিলিয়ন ডলারের ভবিষ্যৎ অর্জনের লক্ষ্যে দৃঢ়তার সাথে এগিয়ে চলেছে।",
    zhBio: "作为董事总经理，Muhammad Shoaibur Rahman 先生全面统领沙拉邦拉集团的战略运营，以卓越的远见与严谨的管理驱动各业务板块协同增长。他的商业智慧贯穿数字商务、跨境物流、国际采购及智能制造等全产业链。除打造一流跨国企业外，他更致力于在国内外创造数以百万计的就业机会，将企业发展转化为切实社会价值。在他的坚强领导下，沙拉邦拉集团正加速向世界级跨国企业及万亿美元目标坚定迈进。",
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "director-altaf",
    name: "MD. ALTAF HOSSEN",
    banglaName: "MD. ALTAF HOSSEN",
    zhName: "MD. ALTAF HOSSEN",
    role: "Director",
    banglaRole: "পরিচালক",
    zhRole: "董事",
    // Official photo from /public/leadership/director-altaf-hossen.jpg (Square 1:1, 1024x1024)
    photoUrl: "/leadership/director-altaf-hossen.jpg",
    photoPosition: "center 0%",
    photoTransform: "scale(1.08) translateY(-4%)",
    bio: "With over 16 years of experience in international communication and export business, Md. Altaf Hossen leads Sharabangla Down Products with precision and global insight. His expertise in cross-border trade relations has strengthened the Group's export standing across international markets. He shares one unwavering belief — that Sharabangla Group's disciplined growth today is building toward a trillion-dollar future.",
    banglaBio: "আন্তর্জাতিক যোগাযোগ ও রপ্তানি বাণিজ্যে ১৬ বছরেরও বেশি অভিজ্ঞতাসম্পন্ন মোঃ আলতাফ হোসেন অত্যন্ত দক্ষতা ও বৈশ্বিক দূরদর্শিতার সাথে শারাবাংলা ডাউন প্রোডাক্টস পরিচালনা করছেন। আন্তঃসীমান্ত বাণিজ্য সম্পর্কে তাঁর গভীর অভিজ্ঞতা আন্তর্জাতিক বাজারে গ্রুপের রপ্তানি সক্ষমতাকে সুদৃঢ় করেছে। তাঁর একটি অবিচল বিশ্বাস — শারাবাংলা গ্রুপের আজকের সুশৃঙ্খল প্রবৃদ্ধি প্রতিষ্ঠানটিকে ট্রিলিয়ন ডলারের ভবিষ্যতের দিকে এগিয়ে নিয়ে যাচ্ছে।",
    zhBio: "Md. Altaf Hossen 先生在国际商务沟通与出口贸易领域拥有逾16年的深厚积淀，以精准的执行力与敏锐的全球视野领导沙拉邦拉羽绒制品公司（Sharabangla Down Products）。他在跨国贸易合作中的深厚造诣显著提升了集团在全球市场的出口竞争力。他怀着坚定的信念：集团今日严谨务实的增长，正在铸就迈向万亿美元未来的坚实基石。",
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "director-saikat",
    name: "SAIKAT HOSSAIN",
    banglaName: "SAIKAT HOSSAIN",
    zhName: "SAIKAT HOSSAIN",
    role: "Director",
    banglaRole: "পরিচালক",
    zhRole: "董事",
    // Official photo from /public/leadership/director-saikat-hossain.jpg (Square 1:1, 1024x1024)
    photoUrl: "/leadership/director-saikat-hossain.jpg",
    photoPosition: "center 0%",
    photoTransform: "scale(0.96) translateY(6%)",
    bio: "A seasoned business development leader with deep expertise in international communication and import-export operations, Saikat Hossain brings strong team-building leadership across all of Sharabangla Group's sister concerns. Committed fully to the Group's shared ambition, he works to make the trillion-dollar dream not just a vision, but a certainty.",
    banglaBio: "বিজনেস ডেভেলপমেন্ট, আন্তর্জাতিক যোগাযোগ ও আমদানি-রপ্তানি কার্যক্রমে গভীর অভিজ্ঞতাসম্পন্ন একজন অভিজ্ঞ সংগঠক হিসেবে সৈকত হোসেন শারাবাংলা গ্রুপের সকল অঙ্গপ্রতিষ্ঠানে শক্তিশালী টিম-বিল্ডিং ও অনুপ্রেরণাদায়ী নেতৃত্ব প্রদান করছেন। গ্রুপের সামগ্রিক লক্ষ্যের প্রতি পূর্ণ প্রতিশ্রুতিবদ্ধ হয়ে তিনি ট্রিলিয়ন ডলারের স্বপ্নকে নিছক একটি রূপকল্পের বদলে এক নিশ্চিত বাস্তবতায় রূপ দিতে নিরলস কাজ করে যাচ্ছেন।",
    zhBio: "作为一位经验丰富的业务拓展领军者，Saikat Hossain 先生在国际商务联络及进出口运营方面拥有深厚造诣，为沙拉邦拉集团旗下各子公司提供了强有力的团队建设与战略协同。他全心致力于集团的共同愿景，推动万亿美元梦想从战略蓝图转化为确凿的商业现实。",
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "director-mustain",
    name: "MD. MUSTAIN BILLAH",
    banglaName: "MD. MUSTAIN BILLAH",
    zhName: "MD. MUSTAIN BILLAH",
    role: "Director",
    banglaRole: "পরিচালক",
    zhRole: "董事",
    companyAffiliation: "Laobaan Bangladesh Ltd.",
    banglaCompanyAffiliation: "Laobaan Bangladesh Ltd.",
    zhCompanyAffiliation: "Laobaan Bangladesh Ltd. (拉乌邦孟加拉)",
    // Official photo from /public/leadership/director-mustain-billah.jpg (Square 1:1, 944x944)
    photoUrl: "/leadership/director-mustain-billah.jpg",
    photoPosition: "center 0%",
    photoTransform: "scale(1.02) translateY(-1%)",
    bio: "Md. Mustain Billah leads Laobaan Bangladesh Ltd., driving cross-border e-commerce innovation between China and Bangladesh. As Director, he brings manufacturing and sourcing expertise that strengthens Sharabangla Group's position as a bridge between global supply chains and local markets.",
    banglaBio: "মোঃ মুস্তাইন বিল্লাহ চীন ও বাংলাদেশের মধ্যে আন্তঃসীমান্ত ই-কমার্স উদ্ভাবনে লাউবান বাংলাদেশ লি.-এর নেতৃত্ব দিচ্ছেন। পরিচালক হিসেবে তাঁর সোর্সিং ও ম্যানুফ্যাকচারিং দক্ষতা শারাবাংলা গ্রুপকে বৈশ্বিক সাপ্লাই চেইন ও স্থানীয় বাজারের মধ্যে এক শক্তিশালী সেতু হিসেবে প্রতিষ্ঠিত করেছে।",
    zhBio: "Md. Mustain Billah 先生主管拉乌邦孟加拉有限公司（Laobaan Bangladesh Ltd.），积极推动中孟跨境电商创新模式。作为集团董事，他凭借在制造业与供应链采购方面的专业能力，进一步强化了沙拉邦拉集团作为全球供应链与本地市场核心纽带的战略地位。",
    linkedinUrl: "https://linkedin.com"
  }
];

export const chairmanMessage = {
  quote: "We did not build Sharabangla Group to simply trade across borders — we built it to prove that Bangladesh belongs among the world's great industrial nations. This is not an ambition we chase; it is a commitment we live by, every single day, on our way to a trillion-dollar future.",
  banglaQuote: "আমরা শারাবাংলা গ্রুপ কেবল সীমান্তপারের বাণিজ্যের জন্য গড়ে তুলিনি — বিশ্বের শীর্ষ শিল্পোন্নত জাতিগুলোর কাতারে বাংলাদেশ তার যোগ্য স্থান অধিকার করে আছে তা প্রমাণ করতেই আমরা এই প্রতিষ্ঠান গড়েছি। এটি নিছক কোনো দূরবর্তী স্বপ্ন বা উচ্চাকাঙ্ক্ষা নয়; বরং ট্রিলিয়ন ডলারের এক সোনালী ভবিষ্যতের পথে প্রতিটি দিন আমাদের নিষ্ঠার সাথে পালন করা এক অটল অঙ্গীকার।",
  zhQuote: "我们创立沙拉邦拉集团，绝不仅是为了从事简单的跨境贸易——而是为了向世界证明，孟加拉国有实力跻身全球伟大工业强国之列。这不是我们盲目追逐的空想，而是我们全体同仁在迈向万亿美元未来的征程中，日复一日笃行不怠的庄严承诺。",
  authorName: "MD KAISER ALI",
  banglaAuthorName: "MD KAISER ALI",
  zhAuthorName: "MD KAISER ALI",
  authorTitle: "Chairman, Sharabangla Group",
  banglaAuthorTitle: "চেয়ারম্যান, শারাবাংলা গ্রুপ",
  zhAuthorTitle: "董事长 · 沙拉邦拉集团",
  // Official Chairman Photo from /public/leadership/chairman.jpg
  photoUrl: "/leadership/chairman.jpg",
  signatureText: "MD KAISER ALI"
};

export const managingDirectorMessage = {
  quote: "Every great multinational began with a single, audacious belief. Ours is simple: that a company built in Bangladesh can one day stand among the world's trillion-dollar enterprises. We are not chasing that dream — we are building the roads that lead to it, one partnership, one shipment, one market at a time. And we will not stop until the world sees Bangladesh the way we always have — limitless.",
  banglaQuote: "প্রতিটি সফল বহুজাতিক প্রতিষ্ঠানের শুরু হয়েছিল এক দৃঢ় ও সাহসী প্রত্যয় নিয়ে। আমাদের বিশ্বাস অত্যন্ত স্পষ্ট: বাংলাদেশ থেকে গড়ে ওঠা একটি প্রতিষ্ঠানও একদিন বিশ্বের ট্রিলিয়ন ডলারের শীর্ষ উদ্যোগগুলোর কাতারে স্থান করে নিতে পারে। আমরা কেবল সেই স্বপ্নের পেছনে ছুটছি না — প্রতিটি অংশীদারিত্ব, প্রতিটি শিপমেন্ট এবং প্রতিটি নতুন বাজারের মাধ্যমে আমরা সেই লক্ষ্যের রাজপথ তৈরি করছি। আর বিশ্ব যতদিন না বাংলাদেশকে আমাদের দৃষ্টিতে — অর্থাৎ সীমাহীন সম্ভাবনাময় হিসেবে দেখবে, ততদিন আমরা থামব না।",
  zhQuote: "每一家卓越的跨国企业，都始于一个坚定而宏大的信念。我们的信念质朴而明确：一家诞生于孟加拉国的企业，终将跻身全球万亿美元级领军企业之林。我们不仅是在追逐梦想，更是在通过每一次合作、每一批货物、每一个新开拓的市场，脚踏实地铺就通往未来的大道。只要世界尚未如我们所见那般领略孟加拉国的无限潜能，我们就绝不停歇。",
  authorName: "MUHAMMAD SHOAIBUR RAHMAN",
  banglaAuthorName: "মুহাম্মদ শোয়াইবুর রহমান",
  zhAuthorName: "MUHAMMAD SHOAIBUR RAHMAN",
  authorTitle: "Managing Director, Sharabangla Group",
  banglaAuthorTitle: "ব্যবস্থাপনা পরিচালক, শারাবাংলা গ্রুপ",
  zhAuthorTitle: "董事总经理 · 沙拉邦拉集团",
  // Managing Director Photo
  photoUrl: "/leadership/managing-director.png?v=2",
  photoPosition: "center 5%",
  signatureText: "MUHAMMAD SHOAIBUR RAHMAN"
};

export const directorMessages: DirectorMessage[] = [
  {
    id: "director-altaf-hossen",
    tag: "DIRECTOR'S MESSAGE",
    banglaTag: "পরিচালকের বার্তা",
    zhTag: "董事寄语",
    heading: "Dedication Without Shortcuts",
    banglaHeading: "উৎসর্গের নেই কোনো সহজ পথ",
    zhHeading: "笃行致远，不求捷径",
    quote: "Dedication has no shortcuts, and I've never looked for one. Every hour I put into Sharabangla Group is an investment in the future we've promised ourselves — a future where hard work today becomes the trillion-dollar legacy of tomorrow.",
    banglaQuote: "নিষ্ঠা ও আত্মনিয়োগের কোনো সহজ পথ নেই, আর আমি কখনও তা খুঁজিওনি। শারাবাংলা গ্রুপের পেছনে আমার ব্যয় করা প্রতিটি ঘণ্টাই সেই প্রতিশ্রুত ভবিষ্যতের জন্য এক অনন্য বিনিয়োগ — যেখানে আজকের কঠোর পরিশ্রমই আগামীকালের ট্রিলিয়ন ডলারের ঐতিহ্যে রূপান্তরিত হবে।",
    zhQuote: "专注与奉献绝无捷径可走，我也从未寻求捷径。我在沙拉邦拉集团倾注的每一分心血，都是对我们共同承诺之未来的宝贵投资——今日的辛勤耕耘，必将铸就明日万亿美元的丰硕伟业。",
    authorName: "MD. ALTAF HOSSEN",
    banglaAuthorName: "মোঃ আলতাফ হোসেন",
    zhAuthorName: "MD. ALTAF HOSSEN",
    authorTitle: "Director, Sharabangla Group",
    banglaAuthorTitle: "পরিচালক, শারাবাংলা গ্রুপ",
    zhAuthorTitle: "董事 · 沙拉邦拉集团",
    photoUrl: "/leadership/director-altaf-hossen.jpg",
    photoPosition: "center 20%",
    signatureText: "MD. ALTAF HOSSEN"
  },
  {
    id: "director-saikat-hossain",
    tag: "DIRECTOR'S MESSAGE",
    banglaTag: "পরিচালকের বার্তা",
    zhTag: "董事寄语",
    heading: "Belief, Then Hard Work",
    banglaHeading: "দৃঢ় বিশ্বাস ও কঠোর পরিশ্রম",
    zhHeading: "笃定信念，砥砺前行",
    quote: "I believe success has only two real ingredients — unwavering belief and relentless hard work. Everything else follows. That is the spirit driving Sharabangla Group forward, day after day, toward a trillion-dollar dream we are determined to make real.",
    banglaQuote: "আমি বিশ্বাস করি সফলতার মূল উপাদান মাত্র দুটি — অবিচল বিশ্বাস এবং নিরলস কঠোর পরিশ্রম। বাকি সবকিছু এর হাত ধরেই আসে। আর এই স্পিরিটই শারাবাংলা গ্রুপকে দিনের পর দিন সেই ট্রিলিয়ন ডলারের স্বপ্নের দিকে এগিয়ে নিয়ে যাচ্ছে, যা বাস্তবে রূপ দিতে আমরা বদ্ধপরিকর।",
    zhQuote: "我坚信商业成功的真谛唯有两条：坚定不移的信念与持之以恒的奋斗。其余一切皆水到渠成。正是这种拼搏精神，日复一日激励着沙拉邦拉集团全力以赴，将万亿美元的宏伟蓝图化为现实。",
    authorName: "SAIKAT HOSSAIN",
    banglaAuthorName: "সাইকত হোসেন",
    zhAuthorName: "SAIKAT HOSSAIN",
    authorTitle: "Director, Sharabangla Group",
    banglaAuthorTitle: "পরিচালক, শারাবাংলা গ্রুপ",
    zhAuthorTitle: "董事 · 沙拉邦拉集团",
    photoUrl: "/leadership/director-saikat-hossain.jpg",
    photoPosition: "center 20%",
    signatureText: "SAIKAT HOSSAIN"
  },
  {
    id: "director-mustain-billah",
    tag: "DIRECTOR'S MESSAGE",
    banglaTag: "পরিচালকের বার্তা",
    zhTag: "董事寄语",
    heading: "Engineering Global Connections",
    banglaHeading: "প্রযুক্তিতে বৈশ্বিক সংযোগ",
    zhHeading: "数字赋能，智联全球",
    quote: "Technology doesn't just move products — it moves possibilities. Every digital connection we build across borders brings Sharabangla Group one step closer to a truly global presence, and one step closer to the trillion-dollar future we are engineering together.",
    banglaQuote: "প্রযুক্তি কেবল পণ্য পরিবহন করে না — এটি সম্ভাবনার দিগন্ত উন্মোচন করে। আন্তর্জাতিক সীমানা পেরিয়ে আমাদের গড়ে তোলা প্রতিটি ডিজিটাল সংযোগ শারাবাংলা গ্রুপকে এক সত্যিকারের বৈশ্বিক উপস্থিতির আরও এক ধাপ কাছাকাছি নিয়ে যায়, এবং আমাদের যৌথ প্রচেষ্টায় বিনির্মিত সেই ট্রিলিয়ন ডলারের ভবিষ্যতের আরও নিকটবর্তী করে।",
    zhQuote: "科技不仅传递商品，更传递无限可能。我们跨越国界搭建的每一个数字化链接，都让沙拉邦拉集团离真正的全球化更进一步，也让我们离携手缔造的万亿美元未来更近一步。",
    authorName: "MD. MUSTAIN BILLAH",
    banglaAuthorName: "মোঃ মুস্তাইন বিল্লাহ",
    zhAuthorName: "MD. MUSTAIN BILLAH",
    authorTitle: "Director, Laobaan Bangladesh Ltd.",
    banglaAuthorTitle: "পরিচালক, লাওবান বাংলাদেশ লিমিটেড",
    zhAuthorTitle: "董事 · 拉乌邦孟加拉有限公司",
    photoUrl: "/leadership/director-mustain-billah.jpg",
    photoPosition: "center 20%",
    signatureText: "MD. MUSTAIN BILLAH"
  }
];

export interface VisionMissionBullet {
  label: string;
  banglaLabel: string;
  zhLabel?: string;
  desc: string;
  banglaDesc: string;
  zhDesc?: string;
}

export const visionMissionValues = {
  vision: {
    title: "Our Vision",
    banglaTitle: "আমাদের ভিশন",
    zhTitle: "我们的愿景",
    opening: "To rise from Bangladesh as a trillion-dollar multinational conglomerate, built on four pillars of global enterprise:",
    banglaOpening: "বাংলাদেশ থেকে একটি ট্রিলিয়ন-ডলার বহুজাতিক কংগ্লোমারেট হিসেবে আত্মপ্রকাশ করা, যা বৈশ্বিক বাণিজ্যের চারটি মূল স্তম্ভের ওপর প্রতিষ্ঠিত:",
    zhOpening: "从孟加拉国稳步崛起，打造万亿美元级跨国控股企业集团，深耕全球商业四大核心支柱板块：",
    bullets: [
      {
        label: "Digital Commerce at Scale",
        banglaLabel: "ব্যাপক পরিসরে ডিজিটাল কমার্স",
        zhLabel: "规模化数字商业平台",
        desc: "Powering cross-border and domestic e-commerce platforms that connect millions of consumers and businesses across South Asia.",
        banglaDesc: "ক্রস-বর্ডার ও অভ্যন্তরীণ ই-কমার্স প্ল্যাটফর্ম পরিচালনার মাধ্যমে দক্ষিণ এশিয়া জুড়ে কোটি গ্রাহক ও ব্যবসায়িক প্রতিষ্ঠানকে সংযুক্ত করা।",
        zhDesc: "构建并运营贯通南亚的跨境与本土电子商务平台，连接数百万消费者与数万家企业。"
      },
      {
        label: "Trusted Global Trade",
        banglaLabel: "বিশ্বস্ত আন্তর্জাতিক বাণিজ্য",
        zhLabel: "值得信赖的全球贸易",
        desc: "Becoming the most reliable sourcing, export, and import partner between Bangladesh and its key markets across Asia, the Middle East, Europe, and North America.",
        banglaDesc: "বাংলাদেশ এবং এশিয়া, মধ্যপ্রাচ্য, ইউরোপ ও উত্তর আমেরিকার প্রধান বাজারগুলোর মধ্যে সর্বাধিক নির্ভরযোগ্য সোর্সিং, রপ্তানি ও আমদানি অংশীদার হিসেবে প্রতিষ্ঠিত হওয়া।",
        zhDesc: "成为连接孟加拉国与亚洲、中东、欧洲及北美各大核心市场的最可靠采购、出口与进口贸易伙伴。"
      },
      {
        label: "World-Class Logistics",
        banglaLabel: "বিশ্বমানের লজিস্টিকস",
        zhLabel: "国际一流现代物流",
        desc: "Building an integrated freight, customs, and last-mile delivery network that moves goods as efficiently as any global logistics leader.",
        banglaDesc: "সমন্বিত ফ্রেইট, কাস্টমস এবং লাস্ট-মাইল ডেলিভারি নেটওয়ার্ক গড়ে তোলা, যা বিশ্বের শীর্ষস্থানীয় লজিস্টিকস প্রতিষ্ঠানের সমকক্ষ দক্ষতায় পণ্য পরিবহন করে।",
        zhDesc: "建立集航空货运、海关报关、智能仓储与末端极速配送于一体的综合物流网络，具备对标全球物流巨头的履约效率。"
      },
      {
        label: "Ethical, Export-Grade Manufacturing",
        banglaLabel: "নীতিবান ও রপ্তানি-মানের উৎপাদন",
        zhLabel: "合规负责、出口级智能制造",
        desc: "Producing world-standard textiles, industrial materials, and technical goods that meet the expectations of the most demanding international buyers.",
        banglaDesc: "বিশ্বমানের টেক্সটাইল, শিল্প কাঁচামাল এবং প্রযুক্তিগত পণ্য উৎপাদন করা যা আন্তর্জাতিক শীর্ষ ক্রেতাদের কঠোর মানদণ্ড পূরণ করে।",
        zhDesc: "生产符合国际最高质量与环保标准的纺织品、工业材料与高科技无纺布，满足全球顶级采购商的严苛要求。"
      }
    ],
    closing: "Four divisions, one shared ambition — proving that a company built in Bangladesh can compete, and lead, on the world stage.",
    banglaClosing: "চারটি বিভাগ, একটি অভিন্ন লক্ষ্য — প্রমাণ করা যে বাংলাদেশ থেকে গড়ে ওঠা একটি প্রতিষ্ঠান বিশ্বমঞ্চে প্রতিযোগিতা ও নেতৃত্ব দিতে সক্ষম।",
    zhClosing: "四大核心板块，一个宏伟愿景 —— 向世界证明：诞生于孟加拉国的现代化企业，同样能在全球商业舞台上参与竞争并取得卓越领先。"
  },
  mission: {
    title: "Our Mission",
    banglaTitle: "আমাদের মিশন",
    zhTitle: "我们的使命",
    opening: "Every day, Sharabangla Group works to:",
    banglaOpening: "প্রতিদিন, শারাবাংলা গ্রুপ কাজ করে যায়:",
    zhOpening: "每一天，沙拉邦拉集团都致力于：",
    bullets: [
      {
        label: "Empower Bangladeshi Enterprise",
        banglaLabel: "বাংলাদেশি উদ্যোক্তাদের ক্ষমতায়ন",
        zhLabel: "赋能孟加拉本土商业与企业",
        desc: "Giving local businesses direct, trustworthy access to international markets and supply chains.",
        banglaDesc: "স্থানীয় ব্যবসা প্রতিষ্ঠানগুলোকে আন্তর্জাতিক বাজার এবং গ্লোবাল সাপ্লাই চেইনে সরাসরি ও বিশ্বস্ত প্রবেশের সুযোগ করে দেওয়া।",
        zhDesc: "为本土制造业与贸易商提供直接、透明、值得信赖的全球供应链与国际市场接入渠道。"
      },
      {
        label: "Deliver Transparent Trade",
        banglaLabel: "স্বচ্ছ বাণিজ্য নিশ্চিতকরণ",
        zhLabel: "践行阳光透明的合规贸易",
        desc: "Operating with the documentation discipline, compliance, and honesty that global partners demand.",
        banglaDesc: "আন্তর্জাতিক অংশীদারদের প্রত্যাশা অনুযায়ী সুশৃঙ্খল নথিপত্র, আইনি কমপ্লায়েন্স এবং সর্বোচ্চ সততার সাথে ব্যবসা পরিচালনা করা।",
        zhDesc: "严格遵循国际合作伙伴所要求的单证纪律、法定合规性与崇高诚信标准开展经贸运营。"
      },
      {
        label: "Accelerate Cross-Border Speed",
        banglaLabel: "আন্তঃসীমান্ত বাণিজ্যের গতি বৃদ্ধি",
        zhLabel: "提升跨国供应链交付时效",
        desc: "Removing the friction that slows international commerce through technology and integrated operations.",
        banglaDesc: "প্রযুক্তি ও সমন্বিত কার্যক্রমের মাধ্যমে আন্তর্জাতিক বাণিজ্যের প্রতিবন্ধকতা দূর করে দ্রুত ডেলিভারি নিশ্চিত করা।",
        zhDesc: "通过数字化系统与一体化运营，消除阻碍跨国经贸流转的繁冗摩擦与延误。"
      },
      {
        label: "Invest in People & Progress",
        banglaLabel: "মানবসম্পদ ও উন্নয়নে বিনিয়োগ",
        zhLabel: "投资人才赋能与社会共同进步",
        desc: "Creating skilled jobs, developing talent, and contributing to the communities where we operate.",
        banglaDesc: "দক্ষ কর্মসংস্থান সৃষ্টি, প্রতিভার বিকাশ এবং আমরা যেখানে কাজ করি সেই সমাজের সার্বিক উন্নয়নে ভূমিকা রাখা।",
        zhDesc: "创造高技能就业岗位，培育国际化专业人才，并积极回馈我们所运营的社会社区。"
      }
    ],
    closing: "Our mission is measured not in words, but in the containers moved, the businesses connected, and the trust earned across four continents every day.",
    banglaClosing: "আমাদের মিশনের সার্থকতা কথায় নয়, বরং প্রতিদিন চারটি মহাদেশ জুড়ে পরিচালিত কন্টেইনার পরিবহন, সংযুক্ত ব্যবসায়িক প্রতিষ্ঠান এবং অর্জিত আস্থার মাধ্যমে পরিমাপ করা হয়।",
    zhClosing: "我们使命的成效从来不是停留在口头上，而是体现在每天跨越四大洲运输的货运集装箱、紧密连接的企业伙伴以及赢得的深厚商业信赖之中。"
  },
  values: [
    {
      title: "Uncompromising Integrity",
      banglaTitle: "আপসহীন সততা ও নীতিপরায়ণতা",
      zhTitle: "不妥协的商业诚信",
      desc: "Honest documentation, transparent customs clearance, fair pricing, and compliance across every market.",
      banglaDesc: "সঠিক নথিপত্র, স্বচ্ছ কাস্টমস ক্লিয়ারেন্স, ন্যায্য মূল্য নির্ধারণ এবং প্রতিটি বাজারে শতভাগ আইনি কমপ্লায়েন্স বজায় রাখা।",
      zhDesc: "严谨真实的单证管理、阳光透明的海关通关、公平合理的定价体系，以及在所有进驻市场严格恪守法律合规底线。"
    },
    {
      title: "Global Standards, Local Execution",
      banglaTitle: "আন্তর্জাতিক মানদণ্ড, স্থানীয় বাস্তবায়ন",
      zhTitle: "国际最高标准，本土扎实落地",
      desc: "Bringing world-class quality systems to Bangladeshi operations while adapting to international buyer expectations.",
      banglaDesc: "আন্তর্জাতিক ক্রেতাদের প্রত্যাশা পূরণের পাশাপাশি বাংলাদেশের অভ্যন্তরীণ কার্যক্রমে বিশ্বমানের কোয়ালিটি সিস্টেম বাস্তবায়ন করা।",
      zhDesc: "将国际一流的质量管理体系引入孟加拉国实体运营，全面对标并超越全球采购商的严苛期望与技术规范。"
    },
    {
      title: "Speed & Execution Agility",
      banglaTitle: "দ্রুততা ও কার্যকর তৎপরতা",
      zhTitle: "敏捷高效的供应链履约速度",
      desc: "Fast customs clearance, optimized freight routes, and responsive support that keeps goods moving without delay.",
      banglaDesc: "দ্রুত কাস্টমস ক্লিয়ারেন্স, অপ্টিমাইজড ফ্রেইট রুট এবং তৎপর সহায়তার মাধ্যমে পণ্যের নিরবচ্ছিন্ন পরিবহন নিশ্চিত করা।",
      zhDesc: "极速报关通关、优化的多式联运航线与即时响应的专属服务团队，确保全球货物全天候零延误高效流转。"
    },
    {
      title: "Mutual Long-Term Prosperity",
      banglaTitle: "পারস্পরিক দীর্ঘমেয়াদী সমৃদ্ধি",
      zhTitle: "共创长远繁荣与生态共赢",
      desc: "Creating value for our buyers, suppliers, logistics partners, and the communities we serve.",
      banglaDesc: "আমাদের ক্রেতা, সরবরাহকারী, লজিস্টিকস পার্টনার এবং যে সমাজে আমরা কাজ করি তাদের সবার জন্য টেকসই মূল্য তৈরি করা।",
      zhDesc: "为全球采购商、源头工厂、物流战略伙伴以及我们所服务的社会社区创造可持续共享的长期商业价值。"
    },
    {
      title: "Sustainable & Responsible Growth",
      banglaTitle: "টেকসই ও দায়িত্বশীল প্রবৃদ্ধি",
      zhTitle: "绿色可持续与社会责任增长",
      desc: "Eco-friendly non-woven materials, ethical sourcing, community investments, and responsible waste management.",
      banglaDesc: "পরিবেশবান্ধব নন-ওভেন সামগ্রী, নীতিসম্মত সোর্সিং, সামাজিক উন্নয়নমূলক বিনিয়োগ এবং দায়িত্বশীল বর্জ্য ব্যবস্থাপনা।",
      zhDesc: "研发环保可降解无纺布材料、坚持道德合规采购、持续投入乡村民生公益，并实行严格的工业废弃物循环治理。"
    }
  ]
};

export interface Milestone {
  year: string;
  title: string;
  banglaTitle: string;
  zhTitle?: string;
  description: string;
  banglaDescription: string;
  zhDescription?: string;
}

export const journeyMilestones: Milestone[] = [
  {
    year: "2018",
    title: "Foundation & Cross-Border Vision",
    banglaTitle: "ভিত্তিপ্রস্তর ও আন্তর্জাতিক বাণিজ্যের সূচনা",
    zhTitle: "集团创立与跨国贸易愿景确立",
    description: "Sharabangla Group was established in Dhaka, initiating bilateral trade corridors and wholesale commodity supply between China and Bangladesh.",
    banglaDescription: "ঢাকায় শারাবাংলা গ্রুপের প্রতিষ্ঠা, চীন ও বাংলাদেশের মধ্যে দ্বিপাক্ষিক বাণিজ্য করিডোর এবং পাইকারি পণ্য সরবরাহ কার্যক্রম শুরু।",
    zhDescription: "沙拉邦拉集团在达卡正式成立，开辟中国与孟加拉国双向经贸走廊，启动大宗工业原料与商品批发供应链业务。"
  },
  {
    year: "2020",
    title: "FuMao Bangladesh Technology Co., Ltd. Industrial Expansion",
    banglaTitle: "ফুমাও বাংলাদেশ টেকনোলজি কোং লিমিটেড কারখানা সম্প্রসারণ",
    zhTitle: "福茂孟加拉科技有限公司无纺布智造基地投产",
    description: "Commissioned the state-of-the-art FuMao Bangladesh Technology Co., Ltd. plant in Dhaka, providing medical, packaging, and agricultural non-woven fabrics.",
    banglaDescription: "ঢাকায় অত্যাধুনিক ফুমাও বাংলাদেশ টেকনোলজি কোং লিমিটেড প্ল্যান্ট স্থাপন, যা মেডিকেল, প্যাকেজিং ও কৃষিভিত্তিক নন-ওভেন ফেব্রিক উৎপাদনে নেতৃত্ব দিচ্ছে।",
    zhDescription: "在达卡投产行业领先的福茂孟加拉科技有限公司智造基地，大规模供应高品质医疗防护、环保包装及农业专用无纺布材料。"
  },
  {
    year: "2022",
    title: "Down Feather Processing & Export Launch",
    banglaTitle: "ডাউন ফেদার প্রক্রিয়াজাতকরণ ও রপ্তানি শুরু",
    zhTitle: "沙拉邦拉羽绒深加工与全球出口启动",
    description: "Launched Sharabangla Down Products, establishing world-class washing, sorting, and sterilizing lines for export-grade down and feather fillings.",
    banglaDescription: "শারাবাংলা ডাউন প্রোডাক্টস চালু, আন্তর্জাতিক মানসম্পন্ন ওয়াশিং, সর্টিং এবং জীবাণুমুক্তকরণের মাধ্যমে রপ্তানি-মানের ডাউন ও ফেদার উৎপাদন।",
    zhDescription: "成立沙拉邦拉羽绒制品公司，引进国际先进的全自动水洗、智能分选与无菌消毒生产线，实现出口级高蓬松度羽绒羽毛规模化外销。"
  },
  {
    year: "2024",
    title: "Laobaan B2B & Shenova E-Commerce Launch",
    banglaTitle: "লাওবান বিটুবি ও শেনোভা ই-কমার্স প্ল্যাটফর্ম উন্মোচন",
    zhTitle: "Laobaan B2B 工业采购与 Shenova 跨境电商上线",
    description: "Unveiled digital trade platforms including Laobaan Bangladesh for B2B industrial sourcing and Shenova for curated lifestyle consumer commerce.",
    banglaDescription: "ডিজিটাল ট্রেড প্ল্যাটফর্ম লাওবান বাংলাদেশ (বিটুবি ইন্ডাস্ট্রিয়াল সোর্সিং) এবং শেনোভা (লাইফস্টাইল ই-কমার্স) প্ল্যাটফর্মের আনুষ্ঠানিক উন্মোচন।",
    zhDescription: "全方位上线数字化贸易基础设施：面向企业级工业原料采购的 Laobaan Bangladesh B2B 平台，以及主打精选时尚生活的 Shenova 跨境电商平台。"
  },
  {
    year: "2025",
    title: "Global Logistics Network & Multilateral Corridors",
    banglaTitle: "আন্তর্জাতিক লজিস্টিকস নেটওয়ার্ক ও বহুমুখী বাণিজ্য সম্প্রসারণ",
    zhTitle: "全球多式联运网络搭建与国际办事处落地",
    description: "Expanded direct trade liaison offices to Guangzhou, Kolkata, Dubai, and Sakarya with integrated multimodal freight networks.",
    banglaDescription: "সমন্বিত মাল্টিমোডাল ফ্রেইট নেটওয়ার্কসহ গুয়াংঝু, কলকাতা, দুবাই এবং সাকারিয়ায় সরাসরি ট্রেড লিয়াজোঁ অফিস সম্প্রসারণ।",
    zhDescription: "在广州、加尔各答、迪拜和土耳其萨卡里亚设立实体办事处与清关物流中枢，构建海陆空多式联运的高效全球经贸走廊。"
  },
  {
    year: "2026",
    title: "Scale, Trillion-Dollar Ambition & Tech Modernization",
    banglaTitle: "ব্যাপক প্রবৃদ্ধি, ট্রিলিয়ন ডলারের লক্ষ্য ও প্রযুক্তি আধুনিকায়ন",
    zhTitle: "万亿愿景全面提速与全链路数字化升级",
    description: "Accelerating toward a trillion-dollar group valuation with 10 sister companies, real-time supply chain tracking, and sustainable manufacturing standards.",
    banglaDescription: "১০টি সহযোগী প্রতিষ্ঠান, রিয়েল-টাইম সাপ্লাই চেইন ট্র্যাকিং এবং টেকসই উৎপাদন মানদণ্ডসহ ট্রিলিয়ন ডলার গ্রুপের লক্ষ্যে দ্রুত অগ্রসরমান।",
    zhDescription: "旗下10家成员企业协同发力，全面部署实时供应链智能追踪与零碳环保生产标准，全速迈向万亿美元级全球跨国控股集团。"
  }
];

export const globalLocations: GlobalOffice[] = [
  {
    id: "dhaka-hq",
    country: "Bangladesh",
    banglaCountry: "বাংলাদেশ",
    zhCountry: "孟加拉国（全球总部）",
    city: "Dhaka",
    banglaCity: "ঢাকা",
    zhCity: "达卡",
    type: "Global Headquarters",
    banglaType: "গ্লোবাল হেডকোয়ার্টার",
    zhType: "全球集团总部",
    category: "hq",
    address: "3rd, 4th & 5th Floor, House 50, Road-01, Sector-05, Uttara, Dhaka-1230, Bangladesh",
    banglaAddress: "৩য়, ৪র্থ ও ৫ম তলা, বাড়ি ৫০, রোড ০১, সেক্টর ০৫, উত্তরা, ঢাকা-১২৩০, বাংলাদেশ",
    zhAddress: "孟加拉国达卡乌塔拉第5区1号路50号（3、4、5层） (邮编: 1230)",
    phone: "+880 1811 509999",
    email: "sharabangla.group@gmail.com",
    coords: { x: 75.1, y: 36.8 }, // Lat 23.8°N, Long 90.4°E
    marketsServed: ["Bangladesh (National)", "South Asia", "Global Operations"],
    banglaMarketsServed: ["বাংলাদেশ (জাতীয়)", "দক্ষিণ এশিয়া", "আন্তর্জাতিক কার্যক্রম"],
    zhMarketsServed: ["孟加拉国全境", "南亚区域", "全球跨国运营中枢"],
    flag: "🇧🇩"
  },
  {
    id: "guangzhou-china",
    country: "China",
    banglaCountry: "চীন",
    zhCountry: "中国",
    city: "Guangzhou",
    banglaCity: "গুয়াংঝু",
    zhCity: "广州",
    type: "Registered Office",
    banglaType: "নিবন্ধিত অফিস",
    zhType: "注册办事处",
    category: "office",
    address: "Room 1802, Poly World Trade Center, Xingang East Road, Haizhu District, Guangzhou, Guangdong, China",
    banglaAddress: "পলি ওয়ার্ল্ড ট্রেড সেন্টার, হাইঝু ডিস্ট্রিক্ট, গুয়াংঝু, গুয়াংডং, চীন",
    zhAddress: "中国广东省广州市海珠区新港东路保利世贸中心1802室",
    coords: { x: 81.5, y: 37.0 }, // Lat 23.1°N, Long 113.3°E
    marketsServed: ["China", "East Asia", "Global Sourcing Hub"],
    banglaMarketsServed: ["চীন", "পূর্ব এশিয়া", "গ্লোবাল সোর্সিং হাব"],
    zhMarketsServed: ["中国本土", "东亚市场", "全球源头采购供应链中枢"],
    flag: "🇨🇳"
  },
  {
    id: "kolkata-india",
    country: "India",
    banglaCountry: "ভারত",
    zhCountry: "印度",
    city: "Kolkata",
    banglaCity: "কলকাতা",
    zhCity: "加尔各答",
    type: "Registered Office",
    banglaType: "নিবন্ধিত অফিস",
    zhType: "注册办事处",
    category: "office",
    address: "5th Floor, PS Srijan Corporate Park, Sector V, Salt Lake, Kolkata, West Bengal 700091, India",
    banglaAddress: "সল্টলেক, সেক্টর ৫, কলকাতা, পশ্চিমবঙ্গ ৭০০০৯১, ভারত",
    zhAddress: "印度西孟加拉邦加尔各答盐湖城第五区 PS Srijan 企业园区5层 (邮编: 700091)",
    coords: { x: 74.4, y: 37.4 }, // Lat 22.6°N, Long 88.4°E
    marketsServed: ["India", "Nepal", "SAARC Region"],
    banglaMarketsServed: ["ভারত", "নেপাল", "সার্ক অঞ্চল"],
    zhMarketsServed: ["印度", "尼泊尔", "南亚区域合作联盟 (SAARC)"],
    flag: "🇮🇳"
  },
  {
    id: "dubai-uae",
    country: "Dubai (UAE)",
    banglaCountry: "দুবাই (সংযুক্ত আরব আমিরাত)",
    zhCountry: "阿联酋（迪拜）",
    city: "Dubai",
    banglaCity: "দুবাই",
    zhCity: "迪拜",
    type: "Registered Office",
    banglaType: "নিবন্ধিত অফিস",
    zhType: "注册办事处",
    category: "office",
    address: "Suite 2408, Business Bay Financial Tower, Sheikh Zayed Road, Dubai, United Arab Emirates",
    banglaAddress: "স্যুট ২৪০৮, বিজনেস বে ফাইন্যান্সিয়াল টাওয়ার, শেখ জায়েদ রোড, দুবাই, সংযুক্ত আরব আমিরাত",
    zhAddress: "阿拉伯联合酋长国迪拜谢赫扎耶德路商业湾金融大厦2408室",
    coords: { x: 65.4, y: 36.0 }, // Lat 25.2°N, Long 55.3°E
    marketsServed: ["UAE", "GCC", "Middle East", "Africa"],
    banglaMarketsServed: ["সংযুক্ত আরব আমিরাত", "জিসিসি", "মধ্যপ্রাচ্য", "আফ্রিকা"],
    zhMarketsServed: ["阿联酋", "海湾阿拉伯国家合作委员会 (GCC)", "中东", "非洲"],
    flag: "🇦🇪"
  },
  {
    id: "sakarya-turkey",
    country: "Türkiye",
    banglaCountry: "তুরস্ক",
    zhCountry: "土耳其",
    city: "Sakarya",
    banglaCity: "সাকারিয়া",
    zhCity: "萨卡里亚",
    type: "Registered Office",
    banglaType: "নিবন্ধিত অফিস",
    zhType: "注册办事处",
    category: "office",
    address: "Arabacıalanı Mah. Çark Cad. Çağrı Dekorasyon No: 270, Serdivan / Sakarya, Türkiye",
    banglaAddress: "সার্দিভান, সাকারিয়া, তুরস্ক",
    zhAddress: "土耳其萨卡里亚塞迪万区恰尔克大街阿拉巴奇亚拉尼街区270号",
    coords: { x: 58.4, y: 27.4 }, // Lat 40.8°N, Long 30.4°E
    marketsServed: ["Türkiye", "Eurasia", "Europe"],
    banglaMarketsServed: ["তুরস্ক", "ইউরেশিয়া", "ইউরোপ"],
    zhMarketsServed: ["土耳其", "欧亚大陆", "欧洲市场"],
    flag: "🇹🇷"
  },
  {
    id: "hochiminh-vietnam",
    country: "Vietnam",
    banglaCountry: "ভিয়েতনাম",
    zhCountry: "越南",
    city: "Ho Chi Minh City",
    banglaCity: "হো চি মিন সিটি",
    zhCity: "胡志明市",
    type: "Operating Market",
    banglaType: "অপারেটিং মার্কেট",
    zhType: "运营市场枢纽",
    category: "market",
    address: "Level 12, Saigon Centre Tower 2, District 1, Ho Chi Minh City, Vietnam",
    banglaAddress: "লেভেল ১২, সাইগন সেন্টার টাওয়ার ২, ডিস্ট্রিক্ট ১, হো চি মিন সিটি, ভিয়েতনাম",
    zhAddress: "越南胡志明市第1区西贡中心2号大厦12层",
    coords: { x: 79.6, y: 44.0 }, // Lat 10.8°N, Long 106.6°E
    marketsServed: ["Vietnam", "ASEAN Sourcing"],
    banglaMarketsServed: ["ভিয়েতনাম", "আসিয়ান সোর্সিং"],
    zhMarketsServed: ["越南", "东盟制造业采购网络"],
    flag: "🇻🇳"
  },
  {
    id: "hongkong",
    country: "Hong Kong",
    banglaCountry: "হংকং",
    zhCountry: "中国香港",
    city: "Hong Kong",
    banglaCity: "হংকং",
    zhCity: "香港",
    type: "Operating Market",
    banglaType: "অপারেটিং মার্কেট",
    zhType: "运营市场枢纽",
    category: "market",
    address: "Suite 3201, Two International Finance Centre, Central, Hong Kong",
    banglaAddress: "স্যুট ৩২০১, টু ইন্টারন্যাশনাল ফিন্যান্স সেন্টার, সেন্ট্রাল, হংকং",
    zhAddress: "中国香港中环国际金融中心二期3201室",
    coords: { x: 81.7, y: 37.6 }, // Lat 22.3°N, Long 114.2°E
    marketsServed: ["Global Finance & Offshore Trade"],
    banglaMarketsServed: ["গ্লোবাল ফিন্যান্স ও অফশোর ট্রেড"],
    zhMarketsServed: ["全球贸易金融与离岸结算"],
    flag: "🇭🇰"
  },
  {
    id: "usa-newyork",
    country: "USA",
    banglaCountry: "যুক্তরাষ্ট্র",
    zhCountry: "美国",
    city: "New York",
    banglaCity: "নিউ ইয়র্ক",
    zhCity: "纽约",
    type: "Operating Market",
    banglaType: "অপারেটিং মার্কেট",
    zhType: "运营市场枢纽",
    category: "market",
    address: "One World Trade Center, Suite 8500, New York, NY 10007, USA",
    banglaAddress: "ওয়ান ওয়ার্ল্ড ট্রেড সেন্টার, স্যুট ৮৫০০, নিউ ইয়র্ক, এনওয়াই ১০০৭, যুক্তরাষ্ট্র",
    zhAddress: "美国纽约市世界贸易中心一号大楼8500室 (NY 10007)",
    coords: { x: 29.4, y: 27.4 }, // Lat 40.7°N, Long -74.0°W
    marketsServed: ["United States", "North America", "Americas Trade"],
    banglaMarketsServed: ["যুক্তরাষ্ট্র", "উত্তর আমেরিকা", "আমেরিকা বাণিজ্য"],
    zhMarketsServed: ["美国", "北美市场", "美洲跨国贸易"],
    flag: "🇺🇸"
  },
  {
    id: "europe-frankfurt",
    country: "Germany (Europe)",
    banglaCountry: "জার্মানি (ইউরোপ)",
    zhCountry: "德国（欧洲）",
    city: "Frankfurt",
    banglaCity: "ফ্রাঙ্কফুর্ট",
    zhCity: "法兰克福",
    type: "Operating Market",
    banglaType: "অপারেটিং মার্কেট",
    zhType: "运营市场枢纽",
    category: "market",
    address: "Main Tower, Neue Mainzer Str. 52, 60311 Frankfurt am Main, Germany",
    banglaAddress: "মেইন টাওয়ার, নয় মাইনজার স্ট্রিট ৫২, ৬০৩১১ ফ্রাঙ্কফুর্ট, জার্মানি",
    zhAddress: "德国美茵河畔法兰克福主塔大厦（Main Tower）Neue Mainzer Str. 52, 60311",
    coords: { x: 52.4, y: 22.2 }, // Lat 50.1°N, Long 8.7°E
    marketsServed: ["European Union", "Central Europe", "Global Logistics"],
    banglaMarketsServed: ["ইউরোপীয় ইউনিয়ন", "সেন্ট্রাল ইউরোপ", "আন্তর্জাতিক লজিস্টিকস"],
    zhMarketsServed: ["欧盟市场", "中欧贸易走廊", "全球国际物流"],
    flag: "🇩🇪"
  }
];

export const newsArticles: NewsArticle[] = [
  // LATEST NEWS
  {
    id: "laobaan-crossborder-milestone",
    slug: "laobaan-crossborder-milestone",
    type: "news",
    banglaType: "সংবাদ",
    zhType: "最新动态",
    title: "Laobaan Bangladesh Surpasses 15,000 Verified Suppliers on Cross-Border Sourcing Platform",
    banglaTitle: "লাওবান বাংলাদেশ ক্রস-বর্ডার প্ল্যাটফর্মে ১৫,০০০ ভেরিফায়েড সরবরাহকারীর মাইলফলক স্পর্শ",
    zhTitle: "Laobaan Bangladesh 跨境采购平台认证工业供应商突破 15,000 家",
    category: "E-Commerce",
    banglaCategory: "ই-কমার্স",
    zhCategory: "电子商务",
    date: "July 24, 2026",
    readTime: "4 min read",
    summary: "The platform's direct integration with Chinese manufacturing hubs has reduced sourcing lead times by 35% for Bangladeshi enterprises.",
    banglaSummary: "চীনা শিল্পকেন্দ্রগুলোর সাথে সরাসরি ডিজিটাল সংযুক্তির ফলে বাংলাদেশি আমদানিকারকদের সময় কমেছে ৩৫ শতাংশ।",
    zhSummary: "平台与中国核心工业制造带深度直连，使孟加拉国企业进口采购周期平均缩短 35%。",
    content: [
      "Dhaka, Bangladesh — Sharabangla Group today announced that its cross-border B2B marketplace, Laobaan Bangladesh, has officially onboarded over 15,000 verified industrial suppliers across Guangzhou, Yiwu, and Shenzhen.",
      "The platform provides end-to-end transparency, enabling Bangladeshi merchants to view factory prices, request sample inspections, and execute customs clearance without relying on unverified third-party brokers.",
      "'Our focus is lowering the cost of doing business for Bangladeshi entrepreneurs,' stated the Managing Director. 'By streamlining cross-border logistics and escrow payments, we are giving small and medium enterprises equal access to international supply chains.'"
    ],
    banglaContent: [
      "ঢাকা, বাংলাদেশ — শারাবাংলা গ্রুপ আজ ঘোষণা করেছে যে তাদের ক্রস-বর্ডার বিটুবি মার্কেটপ্লেস লাওবান বাংলাদেশ গুয়াংজু, ইউ এবং শেনঝেনের ১৫,০০০ এরও বেশি ভেরিফায়েড ইন্ডাস্ট্রি সরবরাহকারীকে যুক্ত করেছে।",
      "এই প্ল্যাটফর্মটি সম্পূর্ণ স্বচ্ছতা নিশ্চিত করে যার মাধ্যমে বাংলাদেশি ব্যবসায়ীরা কারখানার মূল মূল্য দেখা, স্যাম্পল টেস্ট এবং কাস্টমস ক্লিয়ারেন্স নিশ্চিত করতে পারেন।",
      "'আমাদের মূল উদ্দেশ্য বাংলাদেশি ক্ষুদ্র ও মাঝারি উদ্যোক্তাদের আমদানির খরচ কমিয়ে আনা,' মন্তব্য করেন গ্রুপের ব্যবস্থাপনা পরিচালক।"
    ],
    zhContent: [
      "孟加拉国达卡 — 沙拉邦拉集团今日正式宣布，旗下跨境 B2B 工业采购平台 Laobaan Bangladesh 已成功接入来自广州、义乌和深圳等核心产业带的 15,000 多家通过严苛审核的认证供应商。",
      "平台提供端到端透明化服务，支持孟加拉采购商直接查看工厂出厂底价、预约样品检测，并完成门到门双清报关，彻底告别非正规中间商。",
      "“我们的核心使命是降低孟加拉企业家的跨境商贸成本，”集团董事总经理表示，“通过优化跨境物流与资金托管，我们让中小企业平等享受全球制造红利。”"
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sharabangla-express-fleet-expansion",
    slug: "sharabangla-express-fleet-expansion",
    type: "news",
    banglaType: "সংবাদ",
    zhType: "最新动态",
    title: "Sharabangla Express Launches Dedicated Air Freight Charter Between Guangzhou and Dhaka",
    banglaTitle: "গুয়াংজু ও ঢাকার মধ্যে শারাবাংলা এক্সপ্রেসের নিজস্ব এয়ার ফ্রেইট চার্টার চালু",
    zhTitle: "沙拉邦拉速运开通广州至达卡定期航空全货运包机航线",
    category: "Logistics",
    banglaCategory: "লজিস্টিকস",
    zhCategory: "现代物流",
    date: "June 12, 2026",
    readTime: "5 min read",
    summary: "New scheduled cargo flight allocations guarantee 48-hour transit times for high-priority commercial shipments.",
    banglaSummary: "নতুন সিডিউলড এয়ার কার্গো ফ্লাইট সার্ভিসের মাধ্যমে বাণিজ্যিক চালানের সময় মাত্র ৪৮ ঘণ্টায় নেমে এসেছে।",
    zhSummary: "全新定班航空货运包机航班确保高优先级商业货物实现 48 小时极速达卡口岸清关提货。",
    content: [
      "Guangzhou / Dhaka — In response to expanding bilateral trade volumes, Sharabangla Express has launched dedicated weekly air cargo charters connecting Guangzhou Baiyun International Airport with Hazrat Shahjalal International Airport in Dhaka.",
      "Equipped with automated temperature-controlled cargo bays and real-time GPS container tracking, the air service addresses critical supply chain bottlenecks in high-value electronics and textile accessories.",
      "'Speed and reliability are non-negotiable in modern commerce,' said the Head of Logistics. 'This dedicated line cuts standard transit times by half.'"
    ],
    banglaContent: [
      "গুয়াংজু / ঢাকা — দ্বিপাক্ষিক বাণিজ্য বৃদ্ধির প্রেক্ষিতে শারাবাংলা এক্সপ্রেস গুয়াংজু বাইয়ুন আন্তর্জাতিক বিমানবন্দর এবং ঢাকার হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দরের মধ্যে সাপ্তাহিক নিজস্ব এয়ার কার্গো চার্টার শুরু করেছে।",
      "স্বয়ংক্রিয় ট্র্যাকিং এবং নিয়ন্ত্রিত তাপমাত্রা সুবিধার মাধ্যমে এই এয়ার ফ্রেইট হাই-ভ্যালু ইলেকট্রনিক্স ও গার্মেন্টস টেক্সটাইল সামগ্রীর দ্রুত পৌঁছানো নিশ্চিত করবে।"
    ],
    zhContent: [
      "广州 / 达卡 — 为积极应对中孟双边贸易额的持续快速增长，沙拉邦拉速运正式开通每周往返广州白云国际机场与达卡沙阿贾拉勒国际机场的专属全货机包机服务。",
      "该航线配备温控货舱与 GPS 实时在途追踪系统，有效解决了高价值消费电子、高精密仪器与快时尚纺织面料进口的关键时效瓶颈。",
      "“在现代商业中，速度与确定性至关重要，”物流事业部负责人强调，“该专属航线将常规跨境运输时效压缩了一半以上。”"
    ],
    image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "bac-venture-digital-sourcing-portal",
    slug: "bac-venture-digital-sourcing-portal",
    type: "news",
    banglaType: "সংবাদ",
    zhType: "最新动态",
    title: "BAC Venture Launches AI-Assisted Sourcing Intelligence for Bangladeshi Industrial Importers",
    banglaTitle: "বিএসি ভেঞ্চার বাংলাদেশি আমদানিকারকদের জন্য এআই-চালিত স্মার্ট সোর্সিং পোর্টাল চালু করেছে",
    zhTitle: "BAC Venture 为孟加拉工业进口企业推出 AI 智能采购分析平台",
    category: "E-Commerce",
    banglaCategory: "ই-কমার্স",
    zhCategory: "电子商务",
    date: "February 14, 2026",
    readTime: "4 min read",
    summary: "Real-time raw material price discovery and automated factory compliance auditing now available to all registered merchant partners.",
    banglaSummary: "নিবন্ধিত বাণিজ্যিক অংশীদারদের জন্য রিয়েল-টাইম কাঁচামালের মূল্য নিরীক্ষণ ও স্বয়ংক্রিয় ফ্যাক্টরি অডিট সুবিধা চালু।",
    zhSummary: "所有注册商户即日起可享受中印两国工业原料价格实时大盘走势分析与工厂合规自动评估服务。",
    content: [
      "Dhaka — BAC Venture has rolled out a next-generation sourcing analytics tool enabling importers to track real-time commodity fluctuations in China and India with zero latency.",
      "The portal integrates transparent escrow payment settlement and customs documentation directly into the user workflow."
    ],
    banglaContent: [
      "ঢাকা — বিএসি ভেঞ্চার আধুনিক সোর্সিং অ্যানালিটিক্স টুল উন্মোচন করেছে যা আমদানি ব্যয় হ্রাস ও সরবরাহ শৃঙ্খলের দক্ষতা বৃদ্ধি করে।"
    ],
    zhContent: [
      "达卡 — BAC Venture 正式发布下一代智能采购分析系统，支持进口商实时零延迟追踪中国和印度主要大宗原料商品的价格波动行情。",
      "该门户平台将透明的信用证与托管资金结算、自动海关单证生成无缝集成到用户的一站式操作流程中。"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
  },

  // PRESS RELEASES
  {
    id: "fumao-technology-eco-textiles",
    slug: "fumao-technology-eco-textiles",
    type: "press",
    banglaType: "প্রেস বিজ্ঞপ্তি",
    zhType: "官方新闻稿",
    officialRef: "SBG-PR-2026-05",
    title: "FuMao Bangladesh Technology Co., Ltd. Achieves ISO 14001 Certification for Eco-Friendly Fabrics",
    banglaTitle: "পরিবেশবান্ধব কাপড়ের জন্য ফুমাও বাংলাদেশ টেকনোলজি কোং লিমিটেড-এর আইএসও ১৪০০১ সার্টিফিকেট অর্জন",
    zhTitle: "福茂孟加拉科技有限公司荣获 ISO 14001 国际环境管理体系认证",
    category: "Manufacturing",
    banglaCategory: "ম্যানুফ্যাকচারিং",
    zhCategory: "智能制造",
    date: "May 03, 2026",
    readTime: "3 min read",
    summary: "The joint-venture plant near Dhaka produces 100% recyclable non-woven fabric as a sustainable alternative to single-use plastics.",
    banglaSummary: "ঢাকার নিকটের এই যৌথ উদ্যোগ প্ল্যান্টটি একক ব্যবহারযোগ্য প্লাস্টিকের বিকল্প হিসেবে ১০০% রিসাইকেলযোগ্য নন-ওভেন কাপড় উৎপাদন করে।",
    zhSummary: "坐落于达卡近郊的合资高科技工厂生产 100% 可回收无纺布，作为传统一次性塑料制品的环保替代方案。",
    content: [
      "Gazipur — FuMao Bangladesh Technology Co., Ltd., the manufacturing division of Sharabangla Group, has been awarded the ISO 14001 Environmental Management Certification following comprehensive audits of its zero-wastewater recycling facility.",
      "The plant produces non-woven polypropylene roll goods used in eco-friendly shopping bags, agricultural protective covers, and surgical masks.",
      "The group plans to double production capacity by Q4 to meet growing domestic and regional demand for sustainable technical packaging materials."
    ],
    banglaContent: [
      "গাজীপুর — শারাবাংলা গ্রুপের ম্যানুফ্যাকচারিং সহযোগী ফুমাও বাংলাদেশ টেকনোলজি কোং লিমিটেড পরিবেশবান্ধব প্রক্রিয়ার জন্য আন্তর্জাতিক আইএসও ১৪০০১ এনভায়রনমেন্টাল সার্টিফিকেট অর্জন করেছে।",
      "প্ল্যান্টটি পরিবেশবান্ধব ব্যাগ, কৃষিকাজের প্রটেক্টিভ কভার এবং সার্জিক্যাল মাস্কের উপাদান তৈরি করছে।"
    ],
    zhContent: [
      "加济布尔 — 沙拉邦拉集团旗下智能制造实体福茂孟加拉科技有限公司在通过对其零工业废水循环处理设施的严格审计后，正式荣获 ISO 14001 国际环境管理体系权威认证。",
      "工厂专注于生产聚丙烯纺粘与熔喷无纺布卷材，广泛应用于医用级外科防护口罩、农业保温覆盖布及环保可降解购物袋。",
      "集团计划在第四季度将产能翻一番，以充分满足国内外对绿色可持续工业包装材料迅速增长的迫切需求。"
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sharabangla-down-products-export-record",
    slug: "sharabangla-down-products-export-record",
    type: "press",
    banglaType: "প্রেস বিজ্ঞপ্তি",
    zhType: "官方新闻稿",
    officialRef: "SBG-PR-2026-03",
    title: "Sharabangla Down Products Sets New Export Benchmark with European & North American Buyers",
    banglaTitle: "শারাবাংলা ডাউন প্রোডাক্টস ইউরোপ ও উত্তর আমেরিকার বাজারে নতুন রপ্তানি রেকর্ড গড়েছে",
    zhTitle: "沙拉邦拉羽绒制品向欧美高端品牌出口创历史新高",
    category: "Manufacturing",
    banglaCategory: "ম্যানুফ্যাকচারিং",
    zhCategory: "智能制造",
    date: "March 29, 2026",
    readTime: "3 min read",
    summary: "High-loft duck and goose down processed under strict eco-compliance gains wide adoption among premium outdoor apparel brands.",
    banglaSummary: "পরিবেশসম্মত পদ্ধতিতে প্রক্রিয়াজাত উন্নতমানের ডাউন ও পালক প্রিমিয়াম আউটডোর ব্র্যান্ডগুলোর কাছে ব্যাপক সমাদৃত হচ্ছে।",
    zhSummary: "在严苛环保与卫生标准下精加工的高蓬松度水洗羽绒原料，获得欧美知名户外与家纺品牌广泛青睐。",
    content: [
      "Mymensingh / Dhaka — Sharabangla Down Products reported record quarterly exports of certified down and feather insulation materials to leading European and American garment manufacturers.",
      "With automated sterilization and high-fill-power testing, the company reinforces Bangladesh's reputation for high-value technical materials."
    ],
    banglaContent: [
      "ময়মনসিংহ / ঢাকা — শারাবাংলা ডাউন প্রোডাক্টস আন্তর্জাতিক মানসম্পন্ন পালক ও ডাউন সামগ্রী রপ্তানিতে রেকর্ড অর্জন করেছে।",
      "স্বয়ংক্রিয় জীবাণুমুক্তকরণ ও আধুনিক ল্যাব পরীক্ষার মাধ্যমে প্রতিষ্ঠানটি বিশ্ববাজারে অনন্য অবস্থান নিশ্চিত করেছে।"
    ],
    zhContent: [
      "迈门辛 / 达卡 — 沙拉邦拉羽绒制品公布了创纪录的季度出口业绩，向欧洲和北美的知名服装制造企业大批量交付经国际认证的高清洁度天然羽绒保暖材料。",
      "凭借全自动高温杀菌生产线与精准蓬松度检测实验室，企业持续夯实孟加拉国在高附加值特种工业原料出口领域的全球声誉。"
    ],
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sharabangla-group-annual-trade-summit",
    slug: "sharabangla-group-annual-trade-summit",
    type: "press",
    banglaType: "প্রেস বিজ্ঞপ্তি",
    zhType: "官方新闻稿",
    officialRef: "SBG-PR-2026-01",
    title: "Sharabangla Group Concludes Bilateral South Asia – Greater Bay Area Trade Summit in Dhaka",
    banglaTitle: "ঢাকায় শারাবাংলা গ্রুপের উদ্যোগে সাউথ এশিয়া-গ্রেটার বে এরিয়া দ্বিপাক্ষিক বাণিজ্য সম্মেলন সম্পন্ন",
    zhTitle: "沙拉邦拉集团在达卡成功主办南亚-粤港澳大湾区双边经贸发展峰会",
    category: "Logistics",
    banglaCategory: "লজিস্টিকস",
    zhCategory: "现代物流",
    date: "January 18, 2026",
    readTime: "5 min read",
    summary: "Over 300 business leaders gathered to inaugurate fast-track customs green corridors and cross-border digital settlement channels.",
    banglaSummary: "৩০০+ ব্যবসায়ী নেতার উপস্থিতিতে ফাস্ট-ট্র্যাক কাস্টমস গ্রিন করিডোর এবং ডিজিটাল সেটেলমেন্ট চ্যানেল উদ্বোধন।",
    zhSummary: "300 多位跨国商界领袖出席峰会，共同见证绿色通关直连快线与跨境多币种数字结算通道的正式启动。",
    content: [
      "Dhaka — Sharabangla Group hosted the 2026 South Asia – Greater Bay Area Trade Summit, bringing together manufacturing federations, air freight operators, and financial institutions.",
      "The summit unveiled key joint ventures in bonded smart warehousing and end-to-end freight digitalization between Guangzhou, Hong Kong, and Chittagong Port."
    ],
    banglaContent: [
      "ঢাকা — শারাবাংলা গ্রুপের উদ্যোগে ২০২৬ সালের সাউথ এশিয়া-গ্রেটার বে এরিয়া বাণিজ্য শীর্ষ সম্মেলন সফলভাবে অনুষ্ঠিত হয়েছে।",
      "সম্মেলনে বন্ডেড স্মার্ট ওয়্যারহাউসিং এবং পূর্ণাঙ্গ ফ্রেইট ডিজিটালাইজেশনের গুরুত্বপূর্ণ যৌথ চুক্তি স্বাক্ষরিত হয়।"
    ],
    zhContent: [
      "达卡 — 沙拉邦拉集团圆满主办 2026 南亚-粤港澳大湾区经贸合作峰会，汇聚工业制造行会、航空货运承运商与跨境金融机构代表。",
      "峰会正式发布了广州、香港与吉大港之间的保税智能仓储与全流程货运数字化联合共建协议。"
    ],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop"
  },

  // GROUP ANNOUNCEMENTS
  {
    id: "sharabangla-holding-board-resolution-2026",
    slug: "sharabangla-holding-board-resolution-2026",
    type: "announcement",
    banglaType: "গ্রুপ ঘোষণা",
    zhType: "集团重大公告",
    officialRef: "SBG-ANN-2026-08",
    title: "Sharabangla Group Holding Ltd. Approves $25M Capital Investment in Smart Logistics & Robotics Automation",
    banglaTitle: "শারাবাংলা গ্রুপ হোল্ডিং লিমিটেড স্মার্ট লজিস্টিকস ও অটোমেশনে ২৫ মিলিয়ন ডলার বিনিয়োগ অনুমোদন করেছে",
    zhTitle: "沙拉邦拉集团控股有限公司董事会全票通过 2500 万美元智慧物流与工业自动化增资决议",
    category: "Logistics",
    banglaCategory: "লজিস্টিকস",
    zhCategory: "现代物流",
    date: "August 15, 2026",
    readTime: "4 min read",
    summary: "Board resolution clears strategic deployment of automated sortation hubs and cold-chain infrastructure across Greater Dhaka and Chittagong.",
    banglaSummary: "বৃহত্তর ঢাকা ও চট্টগ্রামে স্বয়ংক্রিয় সর্টেশন হাব ও আধুনিক কোল্ড চেইন অবকাঠামো স্থাপনে বোর্ড অনুমোদন দিয়েছে।",
    zhSummary: "集团董事会决议通过在大达卡区与吉大港战略部署全自动交叉带分拣中心及现代化冷链枢纽工程。",
    content: [
      "Corporate Secretariat, Dhaka — The Board of Directors of Sharabangla Group Holding Ltd. has unanimously approved a $25 Million strategic expansion plan.",
      "The investment will fund the development of high-speed automated parcel sorting systems, zero-emission electric delivery fleets, and expansion of cross-border customs bonded zones."
    ],
    banglaContent: [
      "কর্পোরেট সচিবালয়, ঢাকা — শারাবাংলা গ্রুপ হোল্ডিং লিমিটেডের পরিচালনা পর্ষদ সর্বসম্মতিক্রমে ২৫ মিলিয়ন ডলারের কৌশলগত সম্প্রসারণ পরিকল্পনা অনুমোদন করেছে।",
      "এই বিনিয়োগের মাধ্যমে হাই-স্পিড অটোমেটেড পার্সেল সর্টিং সিস্টেম এবং পরিবেশবান্ধব ডেলিভারি ফ্লিট তৈরি করা হবে।"
    ],
    zhContent: [
      "达卡集团董事会秘书处 — 沙拉邦拉集团控股有限公司董事会今日正式审议并全票通过 2500 万美元战略增资扩产决议案。",
      "该专项资金将全额用于建设高速交叉带自动化包裹分拣系统、新能源末端绿色派送车队及扩展保税物流海关监管作业区。"
    ],
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sharabangla-express-bonded-hub-inauguration",
    slug: "sharabangla-express-bonded-hub-inauguration",
    type: "announcement",
    banglaType: "গ্রুপ ঘোষণা",
    zhType: "集团重大公告",
    officialRef: "SBG-ANN-2026-06",
    title: "Official Notice: Inauguration of New 120,000 Sq Ft Central Bonded Logistics Hub Near Dhaka Airport",
    banglaTitle: "আনুষ্ঠানিক বিজ্ঞপ্তি: হযরত শাহজালাল বিমানবন্দর সন্নিকটে ১২০,০০০ বর্গফুটের কেন্দ্রীয় বন্ডেড লজিস্টিকস হাব উদ্বোধন",
    zhTitle: "官方公告：达卡国际机场邻空 120,000 平方英尺中央保税智慧物流枢纽正式投入运营",
    category: "Logistics",
    banglaCategory: "লজিস্টিকস",
    zhCategory: "现代物流",
    date: "June 28, 2026",
    readTime: "3 min read",
    summary: "State-of-the-art bonded consolidation facility streamlines air cargo deconsolidation and express clearance for regional merchants.",
    banglaSummary: "আন্তর্জাতিক মানের বন্ডেড হাব এয়ার কার্গো দ্রুত খালাস ও আঞ্চলিক ব্যবসায়ীদের জন্য এক্সপ্রেস ক্লিয়ারেন্স সহজ করেছে।",
    zhSummary: "国际顶级标准保税集拼分拨中心全面启用，极大加速了国际航空货运口岸理货与快件清关交付流转速度。",
    content: [
      "Dhaka — Sharabangla Express announces the full commercial launch of its 120,000 sq ft Central Air Cargo Bonded Center adjacent to Hazrat Shahjalal International Airport.",
      "The facility includes temperature-sensitive pharmaceutical vaults, secure electronics vaults, and direct electronic EDI integration with national customs authority."
    ],
    banglaContent: [
      "ঢাকা — হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দরের নিকটে শারাবাংলা এক্সপ্রেসের ১২০,০০০ বর্গফুটের সেন্ট্রাল এয়ার কার্গো বন্ডেড সেন্টারের কার্যক্রম আনুষ্ঠানিকভাবে শুরু হয়েছে।"
    ],
    zhContent: [
      "达卡 — 沙拉邦拉速运宣布位于达卡沙阿贾拉勒国际机场航空物流园区的 120,000 平方英尺中央航空保税分拨中心正式全面投产。",
      "园区配备医药物资恒温冷库、高价值电子元器件恒湿防静电金库，并与国家海关 EDI 电子数据交换平台实现零时差实时联网对接。"
    ],
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sharabangla-esg-carbon-neutrality-roadmap-2030",
    slug: "sharabangla-esg-carbon-neutrality-roadmap-2030",
    type: "announcement",
    banglaType: "গ্রুপ ঘোষণা",
    zhType: "集团重大公告",
    officialRef: "SBG-ANN-2026-04",
    title: "Group ESG Milestone: Sharabangla Group Formally Adopts 2030 Carbon Neutrality & Ethical Sourcing Charter",
    banglaTitle: "গ্রুপ ইএসজি মাইলফলক: ২০৩০ কার্বন নিউট্রালিটি ও এথিক্যাল সোর্সিং চার্টার অনুমোদন",
    zhTitle: "集团 ESG 重大发布：沙拉邦拉集团正式确立 2030 全面碳中和与负责任供应链行动宪章",
    category: "Manufacturing",
    banglaCategory: "ম্যানুফ্যাকচারিং",
    zhCategory: "智能制造",
    date: "April 10, 2026",
    readTime: "4 min read",
    summary: "Binding sustainability targets outline 100% rooftop solar adoption across all factories and 0% landfill manufacturing by 2030.",
    banglaSummary: "সকল কারখানায় শতভাগ সৌরবিদ্যুৎ নিশ্চিতকরণ এবং ২০৩০ সালের মধ্যে শতভাগ পরিবেশবান্ধব বর্জ্য ব্যবস্থাপনা বাস্তবায়ন।",
    zhSummary: "具有法律约束力的可持续发展纲领明确：到 2030 年旗下所有工厂 100% 采用屋顶分布式光伏供电，实现工业固废零填埋。",
    content: [
      "Dhaka / Hong Kong — Reaffirming its corporate commitment to the United Nations Sustainable Development Goals (SDGs), Sharabangla Group has published its 2030 Carbon Neutrality Roadmap.",
      "The framework mandates strict environmental and labor compliance across all subsidiary factories, transport lines, and partner supplier ecosystems."
    ],
    banglaContent: [
      "ঢাকা / হংকং — জাতিসংঘের টেকসই উন্নয়ন লক্ষ্যমাত্রার (এসডিজি) সাথে সংহতি রেখে শারাবাংলা গ্রুপ তাদের ২০৩০ কার্বন নিউট্রালিটি রূপরেখা আনুষ্ঠানিকভাবে প্রকাশ করেছে।"
    ],
    zhContent: [
      "达卡 / 香港 — 为全面践行联合国可持续发展目标（SDGs），沙拉邦拉集团正式对外发布《2030 集团碳中和与绿色发展战略路线图》。",
      "该行动纲领对集团旗下所有合资制造工厂、干线跨境运输车队及上下游供应链生态伙伴设定了最高标准的绿色环保与员工关怀合规指标。"
    ],
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop"
  }
];

export const openPositions: JobPosition[] = [
  {
    id: "tax-and-vat-officer",
    title: "TAX & VAT OFFICER",
    banglaTitle: "ট্যাক্স অ্যান্ড ভ্যাট অফিসার",
    zhTitle: "税务与增值税专员 (Tax & VAT Officer)",
    department: "FINANCE & COMPLIANCE",
    banglaDepartment: "অর্থ ও কমপ্লায়েন্স",
    zhDepartment: "财务与合规部",
    categoryColor: "bg-[#064E3B]",
    location: "Dhaka, Bangladesh",
    banglaLocation: "ঢাকা, বাংলাদেশ",
    zhLocation: "孟加拉国·达卡",
    type: "Full-Time",
    banglaType: "ফুল-টাইম",
    zhType: "全职",
    experience: "3+ Years",
    banglaExperience: "৩+ বছর",
    zhExperience: "3年以上经验",
    salary: "৳35,000 – ৳50,000 (Negotiable)",
    banglaSalary: "৳৩৫,০০০ – ৳৫০,০০০ (আলোচনা সাপেক্ষ)",
    zhSalary: "৳35,000 – ৳50,000 (面议)",
    vacancy: "01 Position",
    banglaVacancy: "০১ টি পদ",
    zhVacancy: "01 名",
    deadline: "September 15, 2026",
    banglaDeadline: "১৫ সেপ্টেম্বর, ২০২৬",
    zhDeadline: "2026年9月15日",
    description: "Manage VAT compliance, tax filing, and regulatory documentation across all Sharabangla Group sister concerns, ensuring full alignment with NBR regulations.",
    banglaDescription: "এনবিআর বিধিমালার সাথে সম্পূর্ণ সংগতি বজায় রেখে শারাবাংলা গ্রুপের সকল সহযোগী প্রতিষ্ঠানের ভ্যাট কমপ্লায়েন্স, ট্যাক্স ফাইলিং এবং প্রয়োজনীয় রেগুলেটরি ডকুমেন্টেশন পরিচালনা করা।",
    zhDescription: "全面负责沙拉邦拉集团旗下所有成员企业的增值税合规申报、企业所得税清缴及法定税务单证管理，确保严格遵循孟加拉国国家税务局 (NBR) 法律法规。",
    requirements: [
      "Bachelor's/Master's in Accounting or Finance",
      "Strong knowledge of VAT & Income Tax Ordinance",
      "Experience with NBR e-filing systems"
    ],
    banglaRequirements: [
      "অ্যাকাউন্টিং বা ফাইন্যান্সে স্নাতক/স্নাতকোত্তর",
      "ভ্যাট ও আয়কর অধ্যাদেশ সম্পর্কিত গভীর জ্ঞান",
      "এনবিআর ই-ফাইলিং সিস্টেমে বাস্তব অভিজ্ঞতা"
    ],
    zhRequirements: [
      "会计或财务专业学士/硕士学位",
      "精通孟加拉国增值税与所得税法规政策",
      "熟练操作 NBR 电子税务申报系统及财务单据"
    ]
  },
  {
    id: "sales-and-marketing-executive",
    title: "SALES & MARKETING EXECUTIVE",
    banglaTitle: "সেলস অ্যান্ড মার্কেটিং এক্সিকিউটিভ",
    zhTitle: "销售与市场拓展专员 (Sales & Marketing Executive)",
    department: "SALES & MARKETING",
    banglaDepartment: "সেলস ও মার্কেটিং",
    zhDepartment: "销售与市场部",
    categoryColor: "bg-[#0284C7]",
    location: "Dhaka, Bangladesh",
    banglaLocation: "ঢাকা, বাংলাদেশ",
    zhLocation: "孟加拉国·达卡",
    type: "Full-Time",
    banglaType: "ফুল-টাইম",
    zhType: "全职",
    experience: "2+ Years",
    banglaExperience: "২+ বছর",
    zhExperience: "2年以上经验",
    salary: "৳25,000 – ৳40,000 (Negotiable)",
    banglaSalary: "৳২৫,০০০ – ৳৪০,০০০ (আলোচনা সাপেক্ষ)",
    zhSalary: "৳25,000 – ৳40,000 (面议)",
    vacancy: "9 Positions",
    banglaVacancy: "৯টি পদ",
    zhVacancy: "09 名",
    deadline: "September 18, 2026",
    banglaDeadline: "১৮ সেপ্টেম্বর, ২০২৬",
    zhDeadline: "2026年9月18日",
    description: "Drive B2B and B2C sales growth across Sharabangla Group's e-commerce and trading platforms through targeted outreach and market expansion strategies.",
    banglaDescription: "টার্গেটেড আউটরিচ এবং বাজার সম্প্রসারণ কৌশলের মাধ্যমে শারাবাংলা গ্রুপের ই-কমার্স ও ট্রেডিং প্ল্যাটফর্মগুলোর বিটুবি (B2B) ও বিটুসি (B2C) বিক্রয় প্রবৃদ্ধি ত্বরান্বিত করা।",
    zhDescription: "通过精准的大客户开拓与多元化市场渗透策略，强力驱动沙拉邦拉集团旗下电商平台与国际大宗贸易板块的 B2B 与 B2C 业务强劲增长。",
    requirements: [
      "Proven sales track record",
      "Strong communication & negotiation skills",
      "Bachelor's degree in Business or Marketing"
    ],
    banglaRequirements: [
      "বিক্রয়ে সফল ট্র্যাক রেকর্ড",
      "উন্নত যোগাযোগ ও দরকষাকষির দক্ষতা",
      "বিজনেস বা মার্কেটিংয়ে স্নাতক ডিগ্রি"
    ],
    zhRequirements: [
      "具备良好的大宗商品或电商销售业绩记录",
      "出色的商务沟通、谈判议价与客户公关能力",
      "工商管理、市场营销或相关专业本科学历"
    ]
  },
  {
    id: "customer-service-executive",
    title: "CUSTOMER SERVICE EXECUTIVE",
    banglaTitle: "কাস্টমার সার্ভিস এক্সিকিউটিভ",
    zhTitle: "客户服务与支持专员 (Customer Service Executive)",
    department: "CUSTOMER OPERATIONS",
    banglaDepartment: "কাস্টমার অপারেশনস",
    zhDepartment: "客户运营与支持部",
    categoryColor: "bg-[#D97706]",
    location: "Dhaka, Bangladesh",
    banglaLocation: "ঢাকা, বাংলাদেশ",
    zhLocation: "孟加拉国·达卡",
    type: "Full-Time",
    banglaType: "ফুল-টাইম",
    zhType: "全职",
    experience: "1-2 Years",
    banglaExperience: "১-২ বছর",
    zhExperience: "1-2年经验",
    salary: "৳20,000 – ৳30,000",
    banglaSalary: "৳২০,০০০ – ৳৩০,০০০",
    zhSalary: "৳20,000 – ৳30,000",
    vacancy: "5 Positions",
    banglaVacancy: "৫টি পদ",
    zhVacancy: "05 名",
    deadline: "September 12, 2026",
    banglaDeadline: "১২ সেপ্টেম্বর, ২০২৬",
    zhDeadline: "2026年9月12日",
    description: "Deliver responsive, professional customer support across Sharabangla.com and Shenova, resolving inquiries and ensuring a seamless buyer experience.",
    banglaDescription: "শারাবাংলা.কম এবং শেনোভা প্ল্যাটফর্মে দ্রুত ও পেশাদার কাস্টমার সাপোর্ট প্রদান, ক্রেতাদের অনুসন্ধানের সমাধান এবং স্বাচ্ছন্দ্যময় কেনাকাটার অভিজ্ঞতা নিশ্চিত করা।",
    zhDescription: "为 Sharabangla.com 与 Shenova 平台用户提供专业、敏捷的全渠道客户支持，高效解决订单履约咨询与售后需求，打造极致卓越的买家服务体验。",
    requirements: [
      "Excellent verbal & written communication",
      "Prior customer service experience preferred",
      "Fluency in Bangla and English"
    ],
    banglaRequirements: [
      "মৌখিক ও লিখিত যোগাযোগে পারদর্শিতা",
      "কাস্টমার সার্ভিসে পূর্ব অভিজ্ঞতা অগ্রাধিকারযোগ্য",
      "বাংলা ও ইংরেজিতে সাবলীলতা"
    ],
    zhRequirements: [
      "卓越的中英文或英孟双语口语表达与书面沟通能力",
      "有电子商务平台或呼叫中心客服经验者优先",
      "具备良好的同理心、耐心与抗压解决问题能力"
    ]
  },
  {
    id: "digital-marketing-executive",
    title: "DIGITAL MARKETING EXECUTIVE",
    banglaTitle: "ডিজিটাল মার্কেটিং এক্সিকিউটিভ",
    zhTitle: "数字营销与增长专员 (Digital Marketing Executive)",
    department: "MARKETING & GROWTH",
    banglaDepartment: "মার্কেটিং ও গ্রোথ",
    zhDepartment: "市场营销与用户增长部",
    categoryColor: "bg-[#7C3AED]",
    location: "Dhaka, Bangladesh",
    banglaLocation: "ঢাকা, বাংলাদেশ",
    zhLocation: "孟加拉国·达卡",
    type: "Full-Time",
    banglaType: "ফুল-টাইম",
    zhType: "全职",
    experience: "2+ Years",
    banglaExperience: "২+ বছর",
    zhExperience: "2年以上经验",
    salary: "৳28,000 – ৳42,000 (Negotiable)",
    banglaSalary: "৳২৮,০০০ – ৳৪২,০০০ (আলোচনা সাপেক্ষ)",
    zhSalary: "৳28,000 – ৳42,000 (面议)",
    vacancy: "01 Position",
    banglaVacancy: "০১ টি পদ",
    zhVacancy: "01 名",
    deadline: "September 16, 2026",
    banglaDeadline: "১৬ সেপ্টেম্বর, ২০২৬",
    zhDeadline: "2026年9月16日",
    description: "Plan and execute digital campaigns across social media, SEO, and paid advertising to drive growth for Sharabangla Group's e-commerce brands.",
    banglaDescription: "শারাবাংলা গ্রুপের ই-কমার্স ব্র্যান্ডগুলোর প্রবৃদ্ধি অর্জনে সোশ্যাল মিডিয়া, এসইও এবং পেইড অ্যাডভার্টাইজিং ক্যাম্পেইন পরিকল্পনা ও বাস্তবায়ন করা।",
    zhDescription: "统筹规划并高效执行跨渠道数字营销战役（涵盖海外社媒运营、搜索引擎优化 SEO 与精准付费投放广告），全面拉动集团电商业务线的高效获客与品牌曝光。",
    requirements: [
      "Experience with Meta Ads & Google Ads",
      "Strong analytics and reporting skills",
      "Content strategy experience a plus"
    ],
    banglaRequirements: [
      "মেটা অ্যাডস ও গুগল অ্যাডসে বাস্তব অভিজ্ঞতা",
      "অ্যানালিটিক্স ও পারফরম্যান্স রিপোর্টিং দক্ষতা",
      "কনটেন্ট স্ট্র্যাটেজি পরিচালনায় পারদর্শিতা"
    ],
    zhRequirements: [
      "熟练掌握 Meta Ads、Google Ads 投放与 ROI 优化体系",
      "具备扎实的数据分析、用户画像与营销效果复盘能力",
      "有跨境品牌内容策略或爆款打造经验者优先"
    ]
  },
  {
    id: "accounts-officer",
    title: "ACCOUNTS OFFICER",
    banglaTitle: "অ্যাকাউন্টস অফিসার",
    zhTitle: "财务与会计专员 (Accounts Officer)",
    department: "FINANCE & ACCOUNTS",
    banglaDepartment: "ফাইন্যান্স ও অ্যাকাউন্টস",
    zhDepartment: "财务与会计部",
    categoryColor: "bg-[#065F46]",
    location: "Dhaka, Bangladesh",
    banglaLocation: "ঢাকা, বাংলাদেশ",
    zhLocation: "孟加拉国·达卡",
    type: "Full-Time",
    banglaType: "ফুল-টাইম",
    zhType: "全职",
    experience: "2+ Years",
    banglaExperience: "২+ বছর",
    zhExperience: "2年以上经验",
    salary: "৳25,000 – ৳35,000",
    banglaSalary: "৳২৫,০০০ – ৳৩৫,০০০",
    zhSalary: "৳25,000 – ৳35,000",
    vacancy: "01 Position",
    banglaVacancy: "০১ টি পদ",
    zhVacancy: "01 名",
    deadline: "September 14, 2026",
    banglaDeadline: "১৪ সেপ্টেম্বর, ২০২৬",
    zhDeadline: "2026年9月14日",
    description: "Maintain accurate financial records, process transactions, and support monthly closing and reporting across Group entities.",
    banglaDescription: "গ্রুপের বিভিন্ন অঙ্গপ্রতিষ্ঠানের আর্থিক হিসাব সংরক্ষণ, দৈনন্দিন লেনদেন সম্পন্নকরণ এবং মাসিক ক্লোজিং ও আর্থিক প্রতিবেদন তৈরিতে সহায়তা করা।",
    zhDescription: "负责集团各成员企业的日常账目登记核算、资金往来清算、银行对账以及协助编制月度与季度综合财务报表。",
    requirements: [
      "Bachelor's degree in Accounting",
      "Proficiency in accounting software (Tally/QuickBooks)",
      "Strong attention to detail"
    ],
    banglaRequirements: [
      "অ্যাকাউন্টিংয়ে স্নাতক ডিগ্রি",
      "অ্যাকাউন্টিং সফটওয়্যার (ট্যালি/কুইকবুকস)-এ পারদর্শিতা",
      "আর্থিক হিসেবে সূক্ষ্ম পর্যবেক্ষণ ও নির্ভুলতা"
    ],
    zhRequirements: [
      "财务、会计学或相关专业本科学历",
      "熟练使用 Tally、QuickBooks 等主流财务软件及 Excel 高级函数",
      "严谨细致的工作作风，具备极高的数字敏锐度与职业操守"
    ]
  },
  {
    id: "b2b-sales-manager",
    title: "B2B SALES MANAGER",
    banglaTitle: "বিটুবি সেলস ম্যানেজার",
    zhTitle: "B2B 大客户销售经理 (B2B Sales Manager)",
    department: "TRADE & EXPORT",
    banglaDepartment: "ট্রেড ও এক্সপোর্ট",
    zhDepartment: "B2B 贸易事业部",
    categoryColor: "bg-[#1E40AF]",
    location: "Dhaka, Bangladesh",
    banglaLocation: "ঢাকা, বাংলাদেশ",
    zhLocation: "孟加拉国·达卡",
    type: "Full-Time",
    banglaType: "ফুল-টাইম",
    zhType: "全职",
    experience: "4+ Years",
    banglaExperience: "৪+ বছর",
    zhExperience: "4年以上经验",
    salary: "৳50,000 – ৳80,000 + Commission",
    banglaSalary: "৳৫০,০০০ – ৳৮০,০০০ + কমিশন",
    zhSalary: "৳50,000 – ৳80,000 (绩效奖金另计)",
    vacancy: "01 Position",
    banglaVacancy: "০১ টি পদ",
    zhVacancy: "01 名",
    deadline: "September 20, 2026",
    banglaDeadline: "২০ সেপ্টেম্বর, ২০২৬",
    zhDeadline: "2026年9月20日",
    description: "Lead enterprise B2B sales for Laobaan Bangladesh, expanding corporate buyer accounts and building supplier relationships across South Asia.",
    banglaDescription: "লাওবান বাংলাদেশের এন্টারপ্রাইজ বিটুবি বিক্রয় পরিচালনা, করপোরেট বায়ার নেটওয়ার্ক সম্প্রসারণ এবং দক্ষিণ এশিয়া জুড়ে সরবরাহকারীদের সাথে সম্পর্ক উন্নয়ন করা।",
    zhDescription: "主导 Laobaan Bangladesh 及工业大宗原料板块的企业级大客户开拓，搭建工厂源头供应链与采购商直采合作网络，达成集团年度 B2B 战略营收指标。",
    requirements: [
      "4+ years B2B corporate sales experience",
      "Strong industrial buyer network in Bangladesh",
      "Proven team leadership capabilities"
    ],
    banglaRequirements: [
      "বিটুবি করপোরেট সেলসে ৪+ বছরের অভিজ্ঞতা",
      "বাংলাদেশে শিল্প খাতে শক্তিশালী বায়ার নেটওয়ার্ক",
      "টিম পরিচালনায় প্রমাণিত নেতৃত্ব গুণাবলী"
    ],
    zhRequirements: [
      "4年以上 B2B 大宗物资、纺织原料或工业品直销与渠道拓展经验",
      "具备较强的行业买家资源积累与团队协同管理能力",
      "出色的商务提案、大型招投标及合同签署谈判技巧"
    ]
  },
  {
    id: "supply-chain-coordinator",
    title: "SUPPLY CHAIN COORDINATOR",
    banglaTitle: "সাপ্লাই চেইন কোঅর্ডিনেটর",
    zhTitle: "国际供应链协调员 (Supply Chain Coordinator)",
    department: "LOGISTICS & SOURCING",
    banglaDepartment: "লজিস্টিকস ও সোর্সিং",
    zhDepartment: "国际贸易与采购部",
    categoryColor: "bg-[#047857]",
    location: "Dhaka, Bangladesh",
    banglaLocation: "ঢাকা, বাংলাদেশ",
    zhLocation: "孟加拉国·达卡",
    type: "Full-Time",
    banglaType: "ফুল-টাইম",
    zhType: "全职",
    experience: "2-3 Years",
    banglaExperience: "২-৩ বছর",
    zhExperience: "2-3年经验",
    salary: "৳30,000 – ৳45,000",
    banglaSalary: "৳৩০,০০০ – ৳৪৫,০০০",
    zhSalary: "৳30,000 – ৳45,000",
    vacancy: "02 Positions",
    banglaVacancy: "০২ টি পদ",
    zhVacancy: "02 名",
    deadline: "September 17, 2026",
    banglaDeadline: "১৭ সেপ্টেম্বর, ২০২৬",
    zhDeadline: "2026年9月17日",
    description: "Coordinate cross-border procurement orders, freight shipments, and warehouse distribution schedules between China and Bangladesh.",
    banglaDescription: "চীন ও বাংলাদেশের মধ্যে আন্তঃসীমান্ত প্রকিউরমেন্ট অর্ডার, ফ্রেইট শিপমেন্ট এবং গুদামজাতকরণ কার্যক্রমের মধ্যে সার্বিক সমন্বয় রক্ষা করা।",
    zhDescription: "负责监控中孟及跨国国际货运全流程，协调采购订单生命周期、供应商交货排期、海关清关与保税仓储调度，保障国际供应链顺畅无缝交付。",
    requirements: [
      "Experience with freight forwarding and customs",
      "Familiarity with Incoterms and shipping docs",
      "Strong coordination and problem-solving skills"
    ],
    banglaRequirements: [
      "ফ্রেইট ফরোয়ার্ডিং ও কাস্টমস সংক্রান্ত বাস্তব অভিজ্ঞতা",
      "ইনকোটার্মস ও শিপিং নথিপত্র সম্পর্কিত জ্ঞান",
      "উন্নত সমন্বয় ও সমস্যা সমাধানের দক্ষতা"
    ],
    zhRequirements: [
      "熟悉国际贸易术语 (Incoterms)、进出口单据及海关报关报检流程",
      "优秀的跨部门协同与多任务时间管理能力",
      "物流管理、国际经贸或供应链专业本科以上学历"
    ]
  },
  {
    id: "ecommerce-operations-lead",
    title: "E-COMMERCE OPERATIONS LEAD",
    banglaTitle: "ই-কমার্স অপারেশনস লিড",
    zhTitle: "电商运营主管 (E-Commerce Operations Lead)",
    department: "E-COMMERCE",
    banglaDepartment: "ই-কমার্স",
    zhDepartment: "电商运营部",
    categoryColor: "bg-[#4338CA]",
    location: "Dhaka, Bangladesh",
    banglaLocation: "ঢাকা, বাংলাদেশ",
    zhLocation: "孟加拉国·达卡",
    type: "Full-Time",
    banglaType: "ফুল-টাইম",
    zhType: "全职",
    experience: "3+ Years",
    banglaExperience: "৩+ বছর",
    zhExperience: "3年以上经验",
    salary: "৳40,000 – ৳60,000",
    banglaSalary: "৳৪০,০০০ – ৳৬০,০০০",
    zhSalary: "৳40,000 – ৳60,000",
    vacancy: "01 Position",
    banglaVacancy: "০১ টি পদ",
    zhVacancy: "01 名",
    deadline: "September 19, 2026",
    banglaDeadline: "১৯ সেপ্টেম্বর, ২০২৬",
    zhDeadline: "2026年9月19日",
    description: "Oversee catalog management, seller onboarding, order fulfillment workflows, and marketplace operations for Sharabangla.com.",
    banglaDescription: "শারাবাংলা.কম-এর ক্যাটালগ ব্যবস্থাপনা, বিক্রেতাদের অনবোর্ডিং, অর্ডার পূর্ণতাকরণ এবং মার্কেটপ্লেস কার্যক্রম তত্ত্বাবধান করা।",
    zhDescription: "全面统筹 Sharabangla.com 与 Shenova 商城的日常商品上架、活动促销排期、仓储发货履约效率与履约售后闭环，持续优化用户购物转化漏斗。",
    requirements: [
      "3+ years e-commerce platform operations",
      "Experience with multi-vendor marketplace ops",
      "Strong process orientation and data literacy"
    ],
    banglaRequirements: [
      "ই-কমার্স প্ল্যাটফর্ম পরিচালনায় ৩+ বছরের অভিজ্ঞতা",
      "মাল্টি-ভেন্ডর মার্কেটপ্লেস পরিচালনায় পারদর্শিতা",
      "প্রক্রিয়াগত দক্ষতা ও ডেটা বিশ্লেষণ ক্ষমতা"
    ],
    zhRequirements: [
      "3年以上头部主流电商平台店铺或自营独立站运营管理经验",
      "深入理解电商全链路供应链、库存周转及用户留存机制",
      "优秀的团队领导力与数据驱动决策思维"
    ]
  },
  {
    id: "graphics-designer",
    title: "GRAPHICS DESIGNER",
    banglaTitle: "গ্রাফিক্স ডিজাইনার",
    zhTitle: "资深平面与视觉设计师 (Graphics Designer)",
    department: "CREATIVE & BRANDING",
    banglaDepartment: "ক্রিয়েটিভ ও ব্র্যান্ডিং",
    zhDepartment: "创意与品牌设计部",
    categoryColor: "bg-[#BE185D]",
    location: "Dhaka, Bangladesh",
    banglaLocation: "ঢাকা, বাংলাদেশ",
    zhLocation: "孟加拉国·达卡",
    type: "Full-Time",
    banglaType: "ফুল-টাইম",
    zhType: "全职",
    experience: "2+ Years",
    banglaExperience: "২+ বছর",
    zhExperience: "2年以上经验",
    salary: "৳25,000 – ৳38,000",
    banglaSalary: "৳২৫,০০০ – ৳৩৮,০০০",
    zhSalary: "৳25,000 – ৳38,000",
    vacancy: "02 Positions",
    banglaVacancy: "০২ টি পদ",
    zhVacancy: "02 名",
    deadline: "September 15, 2026",
    banglaDeadline: "১৫ সেপ্টেম্বর, ২০২৬",
    zhDeadline: "2026年9月15日",
    description: "Create marketing visuals, social media creatives, banner ads, and brand collateral across all Sharabangla Group consumer-facing channels.",
    banglaDescription: "শারাবাংলা গ্রুপের বিভিন্ন প্রচার মাধ্যমের জন্য মার্কেটিং ভিজ্যুয়াল, সোশ্যাল মিডিয়া পোস্ট, ব্যানার বিজ্ঞাপন এবং ব্র্যান্ড মেটেরিয়াল ডিজাইন করা।",
    zhDescription: "负责集团品牌形象、跨境电商促销海报、社交媒体图文素材、产品包装视觉以及展会物料的创意设计与规范化输出。",
    requirements: [
      "Proficiency in Adobe Illustrator & Photoshop",
      "Strong portfolio of digital/marketing designs",
      "Motion graphics/video editing a plus"
    ],
    banglaRequirements: [
      "অ্যাডোবি ইলাস্ট্রেটর ও ফটোশপে চমৎকার দক্ষতা",
      "ডিজিটাল/মার্কেটিং ডিজাইনের সমৃদ্ধ পোর্টফোলিও",
      "মোশন গ্রাফিক্স বা ভিডিও এডিটিং জানা অতিরিক্ত যোগ্যতা"
    ],
    zhRequirements: [
      "熟练掌握 Adobe Photoshop、Illustrator、Figma 等专业设计工具",
      "具备出色的国际化审美视野、排版构图与色彩感知力",
      "面试需附带真实且具有代表性的个人原创设计作品集"
    ]
  },
  {
    id: "delivery-rider",
    title: "DELIVERY RIDER",
    banglaTitle: "ডেলিভারি রাইডার",
    zhTitle: "同城极速配送专员 / 骑手 (Delivery Rider)",
    department: "LOGISTICS & FULFILLMENT",
    banglaDepartment: "লজিস্টিকস ও ফুলফিলমেন্ট",
    zhDepartment: "快递与末端物流部",
    categoryColor: "bg-[#0F766E]",
    location: "Dhaka, Bangladesh (Hub-based)",
    banglaLocation: "ঢাকা, বাংলাদেশ (হাব-ভিত্তিক)",
    zhLocation: "孟加拉国·达卡（各区域中转站）",
    type: "Full-Time",
    banglaType: "ফুল-টাইম",
    zhType: "全职",
    experience: "Entry / <1 Year",
    banglaExperience: "প্রাথমিক / <১ বছর",
    zhExperience: "1年以内 / 经验不限",
    salary: "৳18,000 – ৳25,000 + Fuel Allowance",
    banglaSalary: "৳১৮,০০০ – ৳২৫,০০০ + জ্বালানি ভাতা",
    zhSalary: "৳18,000 – ৳25,000 (含绩效提成)",
    vacancy: "10 Positions",
    banglaVacancy: "১০টি পদ",
    zhVacancy: "10 名",
    deadline: "September 25, 2026",
    banglaDeadline: "২৫ সেপ্টেম্বর, ২০২৬",
    zhDeadline: "2026年9月25日",
    description: "Perform safe, timely parcel deliveries and pickups across designated Dhaka zones for Sharabangla Express delivery network.",
    banglaDescription: "শারাবাংলা এক্সপ্রেস ডেলিভারি নেটওয়ার্কের অধীনে ঢাকার নির্দিষ্ট জোনে নিরাপদে এবং সময়মতো পার্সেল ডেলিভারি ও পিকআপ সম্পন্ন করা।",
    zhDescription: "负责达卡核心商圈与各社区网点内 Sharabangla Express 快递包裹与电商订单的安全、准时末端派送与签收交接服务。",
    requirements: [
      "Valid driving license (preferred)",
      "Strong sense of responsibility & punctuality",
      "Physical fitness for delivery tasks"
    ],
    banglaRequirements: [
      "বৈধ ড্রাইভিং লাইসেন্স (অগ্রাধিকারযোগ্য)",
      "দায়িত্বশীলতা ও সময়নিষ্ঠতা",
      "ডেলিভারি কার্যক্রমের জন্য শারীরিক সুস্থতা"
    ],
    zhRequirements: [
      "持有有效机动车或摩托车驾驶执照者优先",
      "具有高度的安全意识、强烈的责任心与严格守时的职业敬业精神",
      "身体健康，熟悉达卡各主要城区道路路线"
    ]
  }
];

export const csrInitiatives = [
  {
    id: "clean-water-mymensingh",
    title: "Clean Water & Rural Feathers Community Fund",
    banglaTitle: "বিশুদ্ধ খাবার পানি ও গ্রামীণ সমাজ কল্যাণ তহবিল",
    zhTitle: "清洁饮用水与羽绒产区乡村公益基金",
    desc: "Sharabangla Down Products reinvests 2% of export revenues into constructing solar-powered deep tube-wells and healthcare facilities for duck farming communities in Mymensingh.",
    banglaDesc: "ময়মনসিংহের হাঁস পালনকারী গ্রামীণ পরিবারগুলোর জন্য সৌরশক্তি চালিত গভীর নলকূপ এবং চিকিৎসাসেবা নিশ্চিত করা হয়।",
    zhDesc: "沙拉邦拉羽绒制品将出口总收入的2%专项用于为迈门辛鸭农养殖区修建太阳能深水井工程与医疗配套设施。"
  },
  {
    id: "women-artisan-empowerment",
    title: "Women Digital Seller Incubation",
    banglaTitle: "নারী ডিজিটাল উদ্যোক্তা ইনকিউবেশন",
    zhTitle: "女性数字创业者孵化扶持计划",
    desc: "Sharabangla.com provides free digital store onboarding, zero-commission periods, and digital marketing bootcamps for over 2,500 women micro-entrepreneurs across 64 districts.",
    banglaDesc: "৬৪ জেলার ২৫০০+ নারী ক্ষুদ্র উদ্যোক্তাকে বিনামূল্যে ডিজিটাল স্টোর স্থাপন ও প্রশিক্ষণ প্রদান।",
    zhDesc: "Sharabangla.com 为孟加拉国64个地区的超过2,500名女性微型手工业者提供免费入驻、零佣金扶持期与电商数字营销技能培训。"
  },
  {
    id: "zero-single-use-plastic",
    title: "Non-Woven Eco Packaging Transition",
    banglaTitle: "পলিথিন-মুক্ত পরিবেশবান্ধব প্যাকেজিং রূপান্তর",
    zhTitle: "无纺布绿色环保包装替代工程",
    desc: "FuMao Bangladesh Technology Co., Ltd. donates thousands of reusable non-woven shopping bags to municipal markets to eliminate single-use poly-bags in urban centers.",
    banglaDesc: "ফুমাও বাংলাদেশ টেকনোলজি কোং লিমিটেড শহরাঞ্চলে পলিথিন বর্জ্য কমাতে হাজার হাজার পুনর্ব্যবহারযোগ্য নন-ওভেন ব্যাগ সরবরাহ করে।",
    zhDesc: "福茂孟加拉科技有限公司向各大市政集贸市场免费捐赠数万只可多次重复使用的环保无纺布购物袋，从源头减少城市塑料垃圾污染。"
  }
];

export const partnerPrograms = [
  {
    id: "supplier",
    title: "Become a Global Supplier",
    banglaTitle: "গ্লোবাল সাপ্লায়ার হিসেবে যুক্ত হন",
    zhTitle: "成为全球供应商",
    role: "Suppliers & Manufacturers",
    banglaRole: "সরবরাহকারী ও প্রস্তুতকারক",
    zhRole: "源头工厂与工业制造商",
    desc: "List your factory or products on Laobaan Bangladesh and Sharabangla.com to reach thousands of verified buyers in South Asia.",
    banglaDesc: "আপনার কারখানা বা পণ্য সামগ্রী আমাদের বিটুবি ও বিটুসি প্ল্যাটফর্মে তালিকাভুক্ত করে লক্ষাধিক ক্রেতার কাছে পৌঁছান।",
    zhDesc: "将您的工厂与工业产品入驻 Laobaan Bangladesh 和 Sharabangla.com，直接触达南亚数以万计的认证企业买家。",
    actionText: "Apply as Supplier",
    banglaActionText: "সাপ্লায়ার হিসেবে আবেদন",
    zhActionText: "申请入驻供应商"
  },
  {
    id: "buyer",
    title: "Become a Trade Buyer",
    banglaTitle: "ট্রেড বায়ার হিসেবে যোগ দিন",
    zhTitle: "成为采购商 / 贸易买家",
    role: "Importers & Wholesalers",
    banglaRole: "আমদানিকারক ও পাইকারি বিক্রেতা",
    zhRole: "进口商、批发商与分销机构",
    desc: "Source verified raw materials, industrial machinery, and consumer goods at direct factory rates with guaranteed QC and clearance.",
    banglaDesc: "সরাসরি ফ্যাক্টরি রেটে শতভাগ ভেরিফায়েড শিল্প কাঁচামাল, কমোডিটি ও কনজিউমার গুডস পর্যায়ক্রমে আমদানি করুন।",
    zhDesc: "以源头工厂出厂底价采购高品质工业原料、机械设备与消费品，尊享严格品控与全程通关保障。",
    actionText: "Register as Buyer",
    banglaActionText: "বায়ার হিসেবে নিবন্ধন",
    zhActionText: "注册成为买家"
  },
  {
    id: "investor",
    title: "Strategic Partnerships & Investment",
    banglaTitle: "কৌশলগত বিনিয়োগ ও অংশীদারিত্ব",
    zhTitle: "战略合作与合资投资",
    role: "Joint Venture Partners & Investors",
    banglaRole: "যৌথ বিনিয়োগকারী ও অংশীদার",
    zhRole: "合资伙伴与战略投资机构",
    desc: "Partner with Sharabangla Group on industrial infrastructure, joint technology ventures, and cross-border logistics expansion.",
    banglaDesc: "শিল্প অবকাঠামো, যৌথ প্রযুক্তি উন্নয়ন এবং আন্তর্জাতিক লজিস্টিকস সম্প্রসারণে আমাদের সাথে অংশীদারিত্ব স্থাপন করুন।",
    zhDesc: "与沙拉邦拉集团携手拓展现代工业基础设施、高科技合资制造及跨境综合物流网络。",
    actionText: "Contact Corporate Development",
    banglaActionText: "কর্পোরেট ডেভেলপমেন্টে যোগাযোগ",
    zhActionText: "联系企业战略发展部"
  }
];

export const testimonials: Testimonial[] = [
  // TODO: Replace with real partner photos once provided
  {
    id: "testimonial-li-wei",
    name: "Li Wei",
    banglaName: "লি ওয়েই",
    zhName: "李伟",
    title: "Managing Director",
    banglaTitle: "ম্যানেজিং ডিরেক্টর",
    zhTitle: "总经理",
    company: "Guangzhou Sourcing Alliance",
    banglaCompany: "গুয়াংজু সোর্সিং অ্যালায়েন্স",
    zhCompany: "广州采供产业联盟",
    market: "China (Guangzhou)",
    banglaMarket: "চীন (গুয়াংজু)",
    zhMarket: "中国（广州）",
    country: "China",
    flag: "🇨🇳",
    quote: "Sharabangla Group's team understands both Chinese manufacturing standards and Bangladeshi market needs — that dual fluency makes them our most reliable sourcing partner in South Asia.",
    banglaQuote: "শারাবাংলা গ্রুপের দল চীনের উৎপাদন মান এবং বাংলাদেশি বাজারের চাহিদা উভয়ই গভীরভাবে বোঝে — এই দ্বিমুখী দক্ষতা তাদের দক্ষিণ এশিয়ায় আমাদের সবচেয়ে নির্ভরযোগ্য সোর্সিং অংশীদারে পরিণত করেছে।",
    zhQuote: "沙拉邦拉集团团队既精通中国工业制造的高标准，又深谙孟加拉本地市场的实际需求——这种双向互通的专业能力，使他们成为我们在南亚最值得信赖的采供战略伙伴。",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces&q=80"
  },
  {
    id: "testimonial-zhang-min",
    name: "Zhang Min",
    banglaName: "ঝাং মিন",
    zhName: "张敏",
    title: "General Manager, Textile & Down Products Division",
    banglaTitle: "জেনারেল ম্যানেজার, টেক্সটাইল ও ডাউন প্রোডাক্টস ডিভিশন",
    zhTitle: "纺织羽绒制品事业部总经理",
    company: "Zhejiang Feather & Down Industries",
    banglaCompany: "ঝেজিয়াং ফেদার অ্যান্ড ডাউন ইন্ডাস্ট্রিজ",
    zhCompany: "浙江羽绒羽毛实业集团",
    market: "China (Hangzhou)",
    banglaMarket: "চীন (হাংচৌ)",
    zhMarket: "中国（杭州）",
    country: "China",
    flag: "🇨🇳",
    quote: "Our joint venture with Sharabangla Down Products has grown smoothly because of their consistent quality control and transparent communication at every production stage.",
    banglaQuote: "শারাবাংলা ডাউন প্রোডাক্টসের সাথে আমাদের যৌথ উদ্যোগটি অত্যন্ত সফলভাবে এগিয়ে চলেছে, যার পেছনে রয়েছে প্রতিটি উৎপাদন পর্যায়ে তাদের ধারাবাহিক গুণমান নিয়ন্ত্রণ এবং স্বচ্ছ যোগাযোগ।",
    zhQuote: "我们与沙拉邦拉羽绒制品的合资企业之所以能够稳健顺畅发展，正是得益于他们在各生产环节严谨一致的品控标准与透明高效的沟通机制。",
    photoUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop&crop=faces&q=80"
  },
  {
    id: "testimonial-chen-hao",
    name: "Chen Hao",
    banglaName: "চেন হাও",
    zhName: "陈浩",
    title: "Technology Partnership Director",
    banglaTitle: "টেকনোলজি পার্টনারশিপ ডিরেক্টর",
    zhTitle: "技术合作总监",
    company: "Shenzhen Smart Manufacturing Co.",
    banglaCompany: "শেনজেন স্মার্ট ম্যানুফ্যাকচারিং কোং",
    zhCompany: "深圳智造科技实业",
    market: "China (Shenzhen)",
    banglaMarket: "চীন (শেনজেন)",
    zhMarket: "中国（深圳）",
    country: "China",
    flag: "🇨🇳",
    quote: "Working with FuMao Bangladesh Technology Co., Ltd. has been seamless — they bring the same operational discipline we expect from our best partners back home.",
    banglaQuote: "ফুমাও বাংলাদেশ টেকনোলজি কোং লিমিটেড-এর সাথে কাজ করা অত্যন্ত সহজ ও নিখুঁত — তারা ঠিক সেই কার্যকর পরিচালনা শৃঙ্খলা নিশ্চিত করে যা আমরা আমাদের সেরা দেশীয় অংশীদারদের কাছ থেকে প্রত্যাশা করি।",
    zhQuote: "与福茂孟加拉科技有限公司（FuMao Bangladesh Technology Co., Ltd.）的合作非常顺畅高效——他们展现出的卓越运营规范与严谨纪律，完全达到了我们在国内一流顶级合作伙伴的严苛标准。",
    photoUrl: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=200&h=200&fit=crop&crop=faces&q=80"
  },
  {
    id: "testimonial-4",
    name: "Chen Fang",
    banglaName: "চেন ফ্যাং",
    zhName: "陈芳",
    title: "Export Compliance Manager",
    banglaTitle: "এক্সপোর্ট কমপ্লায়েন্স ম্যানেজার",
    zhTitle: "出口合规部经理",
    company: "Industrial Goods Corp",
    banglaCompany: "ইন্ডাস্ট্রিয়াল গুডস কর্পোরেশন",
    zhCompany: "工业品制造企业",
    market: "China (Guangzhou)",
    banglaMarket: "চীন (গুয়াংজু)",
    zhMarket: "中国（广州）",
    country: "China",
    flag: "🇨🇳",
    quote: "Their sourcing team understands our production timelines better than most international clients we work with.",
    banglaQuote: "তাদের সোর্সিং দল আমাদের উৎপাদনের সময়সীমা অনেক আন্তর্জাতিক ক্লায়েন্টের চেয়েও নিখুঁতভাবে বোঝে।",
    zhQuote: "他们的采购团队对我们车间生产周期的深刻理解，甚至超越了我们合作过的许多欧美跨国客户。",
    photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=faces&q=80"
  },

  // 5 & 6: China (Beijing)
  {
    id: "testimonial-5",
    name: "Wang Jun",
    banglaName: "ওয়াং জুন",
    zhName: "王军",
    title: "Trade Relations Director",
    banglaTitle: "ট্রেড রিলেশনস ডিরেক্টর",
    zhTitle: "对外经贸关系总监",
    company: "Beijing Machinery Alliance",
    banglaCompany: "বেইজিং মেশিনারি অ্যালায়েন্স",
    zhCompany: "北京机械产业联盟",
    market: "China (Beijing)",
    banglaMarket: "চীন (বেইজিং)",
    zhMarket: "中国（北京）",
    country: "China",
    flag: "🇨🇳",
    quote: "Sharabangla Group has become a reliable gateway for Chinese manufacturers looking to reach South Asian markets.",
    banglaQuote: "দক্ষিণ এশিয়ার বাজারে পৌঁছাতে আগ্রহী চীনা প্রস্তুতকারকদের কাছে শারাবাংলা গ্রুপ একটি নির্ভরযোগ্য প্রবেশদ্বারে পরিণত হয়েছে।",
    zhQuote: "沙拉邦拉集团已成为中国工业制造企业开拓南亚庞大新兴市场的首选可靠门户与战略桥头堡。",
    photoUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&h=200&fit=crop&crop=faces&q=80"
  },
  {
    id: "testimonial-6",
    name: "Zhao Mei",
    banglaName: "ঝাও মেই",
    zhName: "赵梅",
    title: "International Business Advisor",
    banglaTitle: "ইন্টারন্যাশনাল বিজনেস অ্যাডভাইজার",
    zhTitle: "国际商业顾问",
    company: "Global Trade Consulting",
    banglaCompany: "গ্লোবাল ট্রেড কনসাল্টিং",
    zhCompany: "环球商贸咨询",
    market: "China (Beijing)",
    banglaMarket: "চীন (বেইজিং)",
    zhMarket: "中国（北京）",
    country: "China",
    flag: "🇨🇳",
    quote: "Their attention to documentation and compliance sets them apart from many trading partners we've worked with in the region.",
    banglaQuote: "ডকুমেন্টেশন ও কমপ্লায়েন্সের ক্ষেত্রে তাদের নিখুঁত সতর্কতা এই অঞ্চলের অন্যান্য অনেক বাণিজ্যিক অংশীদারের চেয়ে তাদের আলাদা করে তুলেছে।",
    zhQuote: "他们对国际单证合规性与海关规章的精益求精，使他们在该地区众多贸易伙伴中脱颖而出。",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces&q=80"
  },

  // 7 & 8: India (Kolkata)
  {
    id: "testimonial-7",
    name: "Arjun Banerjee",
    banglaName: "অর্জুন ব্যানার্জি",
    zhName: "阿琼·班纳吉",
    title: "Trade Consultant",
    banglaTitle: "ট্রেড কনসালট্যান্ট",
    zhTitle: "跨境贸易顾问",
    company: "Eastern India Trade Forum",
    banglaCompany: "ইস্টার্ন ইন্ডিয়া ট্রেড ফোরাম",
    zhCompany: "东印度贸易论坛",
    market: "India (Kolkata)",
    banglaMarket: "ভারত (কলকাতা)",
    zhMarket: "印度（加尔各答）",
    country: "India",
    flag: "🇮🇳",
    quote: "Their cross-border e-commerce platform has become a trusted bridge for South Asian trade. Reliable partners are rare — Sharabangla Group is one.",
    banglaQuote: "তাদের ক্রস-বর্ডার ই-কমার্স প্ল্যাটফর্ম দক্ষিণ এশিয়ার বাণিজ্যে একটি বিশ্বস্ত সেতুতে পরিণত হয়েছে। এমন নির্ভরযোগ্য অংশীদার সত্যিই বিরল — শারাবাংলা গ্রুপ তাদের অন্যতম।",
    zhQuote: "他们的跨境电商平台已成为南亚区域贸易不可或缺的信任桥梁。在当今贸易环境下，如此值得信赖的伙伴实属难能可贵。",
    photoUrl: "https://randomuser.me/api/portraits/men/23.jpg"
  },
  {
    id: "testimonial-8",
    name: "Priya Sen",
    banglaName: "প্রিয়া সেন",
    zhName: "普里亚·森",
    title: "Import Operations Head",
    banglaTitle: "ইমপোর্ট অপারেশনস হেড",
    zhTitle: "进口运营负责人",
    company: "Bengal Commodity Traders",
    banglaCompany: "বেঙ্গল কমোডিটি ট্রেডার্স",
    zhCompany: "孟加拉大宗商品商行",
    market: "India (Kolkata)",
    banglaMarket: "ভারত (কলকাতা)",
    zhMarket: "印度（加尔各答）",
    country: "India",
    flag: "🇮🇳",
    quote: "Communication and transparency are what make this partnership work — we always know exactly where our shipments stand.",
    banglaQuote: "যোগাযোগ ও স্বচ্ছতাই এই অংশীদারিত্বের মূল চালিকাশক্তি — আমাদের চালানের বর্তমান অবস্থা সম্পর্কে আমরা সবসময় শতভাগ অবগত থাকি।",
    zhQuote: "高效及时的沟通与全链路透明度是双方合作共赢的关键基石——我们随时精准掌握货物的在途状态与通关节点。",
    photoUrl: "https://randomuser.me/api/portraits/women/29.jpg"
  },

  // 9 & 10: Dubai (UAE)
  {
    id: "testimonial-9",
    name: "Khalid Al Mansoori",
    banglaName: "খালিদ আল মানসুরি",
    zhName: "哈立德·曼苏里",
    title: "Regional Trade Partner",
    banglaTitle: "রিজিওনাল ট্রেড পার্টনার",
    zhTitle: "中东区域贸易伙伴",
    company: "Gulf Logistics & Cargo",
    banglaCompany: "গাল্ফ লজিস্টিকস অ্যান্ড কার্গো",
    zhCompany: "海湾物流与货运集团",
    market: "Dubai (UAE)",
    banglaMarket: "দুবাই (সংযুক্ত আরব আমিরাত)",
    zhMarket: "阿联酋（迪拜）",
    country: "UAE",
    flag: "🇦🇪",
    quote: "From documentation to delivery, Sharabangla Group brings a level of discipline to Bangladeshi trade that international buyers immediately notice.",
    banglaQuote: "ডকুমেন্টেশন থেকে ডেলিভারি পর্যন্ত, শারাবাংলা গ্রুপ বাংলাদেশি বাণিজ্যে এমন এক শৃঙ্খলা এনেছে যা আন্তর্জাতিক ক্রেতারা প্রথম দর্শনেই উপলব্ধি করতে পারেন।",
    zhQuote: "从单证处理到最终末端交付，沙拉邦拉集团为孟加拉跨国贸易注入了国际采购商一眼即可感知的世界级严谨标准。",
    photoUrl: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    id: "testimonial-10",
    name: "Fatima Al Hashimi",
    banglaName: "ফাতিমা আল হাশেমি",
    zhName: "法蒂玛·哈希米",
    title: "Procurement Director",
    banglaTitle: "প্রকিউরমেন্ট ডিরেক্টর",
    zhTitle: "全球采购总监",
    company: "Middle East Sourcing Group",
    banglaCompany: "মিডল ইস্ট সোর্সিং গ্রুপ",
    zhCompany: "中东采购集团",
    market: "Dubai (UAE)",
    banglaMarket: "দুবাই (সংযুক্ত আরব আমিরাত)",
    zhMarket: "阿联酋（迪拜）",
    country: "UAE",
    flag: "🇦🇪",
    quote: "Their Dubai office responds with the kind of speed and clarity we expect from established global trading houses.",
    banglaQuote: "প্রতিষ্ঠিত বৈশ্বিক ট্রেডিং হাউসগুলোর কাছ থেকে আমরা যে গতি ও স্পষ্টতা প্রত্যাশা করি, তাদের দুবাই অফিস ঠিক তেমনই দ্রুত সাড়া দেয়।",
    zhQuote: "他们迪拜办事处的响应速度与专业清晰度，完全比肩全球历史悠久的一流跨国贸易洋行。",
    photoUrl: "https://randomuser.me/api/portraits/women/36.jpg"
  },

  // 11 & 12: Vietnam (Ho Chi Minh City)
  {
    id: "testimonial-11",
    name: "Nguyen Minh",
    banglaName: "নগুয়েন মিন",
    zhName: "阮明",
    title: "Sourcing Agent",
    banglaTitle: "সোর্সিং এজেন্ট",
    zhTitle: "采购代理总监",
    company: "ASEAN Materials Exchange",
    banglaCompany: "আসিয়ান ম্যাটেরিয়ালস এক্সচেঞ্জ",
    zhCompany: "东盟原料交易所",
    market: "Vietnam (Ho Chi Minh City)",
    banglaMarket: "ভিয়েতনাম (হো চি মিন সিটি)",
    zhMarket: "越南（胡志明市）",
    country: "Vietnam",
    flag: "🇻🇳",
    quote: "Their manufacturing standards through FuMao Bangladesh Technology Co., Ltd. consistently meet the expectations of demanding international buyers.",
    banglaQuote: "ফুমাও বাংলাদেশ টেকনোলজি কোং লিমিটেড-এর মাধ্যমে তাদের উৎপাদন মান বিশ্বমানের সচেতন আন্তর্জাতিক ক্রেতাদের প্রত্যাশা ধারাবাহিকভাবে পূরণ করে।",
    zhQuote: "他们通过福茂孟加拉科技有限公司所输出的制造品控标准，持续满足甚至超越了严苛国际高端买家的一贯期望。",
    photoUrl: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    id: "testimonial-12",
    name: "Tran Thi Lan",
    banglaName: "ট্রান থি ল্যান",
    zhName: "陈氏兰",
    title: "Quality Assurance Lead",
    banglaTitle: "কোয়ালিটি অ্যাসিউরেন্স লিড",
    zhTitle: "质量保障主管",
    company: "Indochina Fabric Inspection",
    banglaCompany: "ইন্দোচায়না ফ্যাব্রিক ইন্সপেকশন",
    zhCompany: "中南半岛面料检测中心",
    market: "Vietnam (Ho Chi Minh City)",
    banglaMarket: "ভিয়েতনাম (হো চি মিন সিটি)",
    zhMarket: "越南（胡志明市）",
    country: "Vietnam",
    flag: "🇻🇳",
    quote: "We've audited many suppliers across the region — Sharabangla Group's factories consistently rank among the most disciplined.",
    banglaQuote: "আমরা এই অঞ্চলের বহু সরবরাহকারী অডিট করেছি — শারাবাংলা গ্রুপের কারখানাগুলো সর্বদা সবচেয়ে সুশৃঙ্খল হিসেবে মূল্যায়িত হয়।",
    zhQuote: "我们对东南亚多国供应商进行过工厂实地审计——沙拉邦拉集团旗下的生产基地始终名列纪律最严明的一流行列。",
    photoUrl: "https://randomuser.me/api/portraits/women/47.jpg"
  },

  // 13 & 14: Hong Kong
  {
    id: "testimonial-13",
    name: "Jonathan Cheung",
    banglaName: "জনাথন চিয়াং",
    zhName: "张志豪",
    title: "Logistics Partner",
    banglaTitle: "লজিস্টিকস পার্টনার",
    zhTitle: "国际物流战略伙伴",
    company: "Asia Pacific Freightways",
    banglaCompany: "এশিয়া প্যাসিফিক ফ্রেইটওয়েজ",
    zhCompany: "亚太货运航空",
    market: "Hong Kong",
    banglaMarket: "হংকং",
    zhMarket: "中国香港",
    country: "Hong Kong",
    flag: "🇭🇰",
    quote: "Sharabangla Express has become one of our most dependable freight partners in South Asia — consistent, communicative, and fast.",
    banglaQuote: "শারাবাংলা এক্সপ্রেস দক্ষিণ এশিয়ায় আমাদের অন্যতম বিশ্বস্ত ফ্রেইট পার্টনারে পরিণত হয়েছে — ধারাবাহিক, যোগাযোগবান্ধব এবং দ্রুতগতির।",
    zhQuote: "沙拉邦拉速运已成为我们在南亚地区最值得信赖的核心货运干线伙伴——班期稳定、沟通顺畅且交付极速。",
    photoUrl: "https://randomuser.me/api/portraits/men/19.jpg"
  },
  {
    id: "testimonial-14",
    name: "Michelle Lau",
    banglaName: "মিশেল লাউ",
    zhName: "刘美雪",
    title: "Freight Operations Manager",
    banglaTitle: "ফ্রেইট অপারেশনস ম্যানেজার",
    zhTitle: "空海运运营经理",
    company: "HK Ocean & Air Logistics",
    banglaCompany: "এইচকে ওশান অ্যান্ড এয়ার লজিস্টিকস",
    zhCompany: "香港海空国际联运",
    market: "Hong Kong",
    banglaMarket: "হংকং",
    zhMarket: "中国香港",
    country: "Hong Kong",
    flag: "🇭🇰",
    quote: "Their real-time shipment updates have significantly reduced the uncertainty we used to deal with on South Asian routes.",
    banglaQuote: "তাদের রিয়েল-টাইম শিপমেন্ট ট্র্যাকিং দক্ষিণ এশীয় রুটে পূর্বে বিদ্যমান অনিশ্চয়তা উল্লেখযোগ্যভাবে কমিয়ে এনেছে।",
    zhQuote: "他们的实时货物动态追踪体系，极大消除了以往南亚货运航线上普遍存在的信息不对称与履约不确定性。",
    photoUrl: "https://randomuser.me/api/portraits/women/58.jpg"
  },

  // 15 & 16: USA (New York)
  {
    id: "testimonial-15",
    name: "David Reynolds",
    banglaName: "ডেভিড রেনল্ডস",
    zhName: "大卫·雷诺兹",
    title: "Import Buyer",
    banglaTitle: "ইমপোর্ট বায়ার",
    zhTitle: "进口采购总监",
    company: "Atlantic Commerce Group",
    banglaCompany: "আটলান্টিক কমার্স গ্রুপ",
    zhCompany: "大西洋商贸集团",
    market: "USA (New York)",
    banglaMarket: "মার্কিন যুক্তরাষ্ট্র (নিউ ইয়র্ক)",
    zhMarket: "美国（纽约）",
    country: "USA",
    flag: "🇺🇸",
    quote: "A Bangladeshi group operating with this level of global professionalism is rare. Sharabangla Group has earned our long-term trust.",
    banglaQuote: "আন্তর্জাতিক মানের এমন অসাধারণ পেশাদারিত্ব নিয়ে পরিচালিত বাংলাদেশি গ্রুপ সত্যিই বিরল। শারাবাংলা গ্রুপ আমাদের দীর্ঘমেয়াদী আস্থা অর্জন করেছে।",
    zhQuote: "能够以如此卓越的全球专业水准开展运营的孟加拉企业集团实属罕见。沙拉邦拉集团赢得了我们坚定持久的商业信任。",
    photoUrl: "https://randomuser.me/api/portraits/men/8.jpg"
  },
  {
    id: "testimonial-16",
    name: "Sarah Mitchell",
    banglaName: "সারাহ মিচেল",
    zhName: "萨拉·米切尔",
    title: "Global Sourcing Director",
    banglaTitle: "গ্লোবাল সোর্সিং ডিরেক্টর",
    zhTitle: "全球采购总监",
    company: "North American Apparel Importers",
    banglaCompany: "নর্থ আমেরিকান অ্যাপারেল ইমপোর্টার্স",
    zhCompany: "北美服装进口商协会",
    market: "USA (New York)",
    banglaMarket: "মার্কিন যুক্তরাষ্ট্র (নিউ ইয়র্ক)",
    zhMarket: "美国（纽约）",
    country: "USA",
    flag: "🇺🇸",
    quote: "Their responsiveness across time zones makes them one of the easiest overseas partners we work with.",
    banglaQuote: "বিভিন্ন টাইম জোনের ব্যবধান সত্ত্বেও তাদের তাৎক্ষণিক সাড়া দেওয়ার সক্ষমতা তাদের আমাদের অন্যতম সেরা বৈশ্বিক অংশীদারে পরিণত করেছে।",
    zhQuote: "他们跨越时区的全天候快速响应与协作效率，使其成为我们合作体验最流畅的海外跨国供应链伙伴之一。",
    photoUrl: "https://randomuser.me/api/portraits/women/12.jpg"
  },

  // 17 & 18: Europe (Frankfurt)
  {
    id: "testimonial-17",
    name: "Markus Weber",
    banglaName: "মার্কাস ওয়েবার",
    zhName: "马库斯·韦伯",
    title: "Procurement Director",
    banglaTitle: "প্রকিউরমেন্ট ডিরেক্টর",
    zhTitle: "采购总监",
    company: "European Retail Supply Chain",
    banglaCompany: "ইউরোপিয়ান রিটেইল সাপ্লাই চেইন",
    zhCompany: "欧洲零售供应链集团",
    market: "Europe (Frankfurt)",
    banglaMarket: "জার্মানি (ফ্রাঙ্কফুর্ট, ইউরোপ)",
    zhMarket: "德国（法兰克福）",
    country: "Germany",
    flag: "🇩🇪",
    quote: "Their export quality control, particularly for textiles, matches the standards we require from our top-tier global suppliers.",
    banglaQuote: "বিশেষ করে টেক্সটাইল রপ্তানির ক্ষেত্রে তাদের কোয়ালিটি কন্ট্রোল আমাদের শীর্ষ বৈশ্বিক সরবরাহকারীদের সমকক্ষ মানের।",
    zhQuote: "他们在出口质量控制方面（尤其是高端纺织原料与无纺布）的精湛水准，完全符合我们对全球顶级供应商设定的严苛门槛。",
    photoUrl: "https://randomuser.me/api/portraits/men/77.jpg"
  },
  {
    id: "testimonial-18",
    name: "Anna Schneider",
    banglaName: "আনা স্নাইডার",
    zhName: "安娜·施耐德",
    title: "Supply Chain Manager",
    banglaTitle: "সাপ্লাই চেইন ম্যানেজার",
    zhTitle: "供应链高级经理",
    company: "Continental Sourcing AG",
    banglaCompany: "কন্টিনেন্টাল সোর্সিং এজি",
    zhCompany: "欧洲大陆采购股份公司",
    market: "Europe (Frankfurt)",
    banglaMarket: "জার্মানি (ফ্রাঙ্কফুর্ট, ইউরোপ)",
    zhMarket: "德国（法兰克福）",
    country: "Germany",
    flag: "🇩🇪",
    quote: "Working with Sharabangla Group has simplified our sourcing process considerably — professional, punctual, and easy to communicate with.",
    banglaQuote: "শারাবাংলা গ্রুপের সাথে কাজ করায় আমাদের সোর্সিং প্রক্রিয়া অনেক সহজ হয়েছে — তারা পেশাদার, সময়নিষ্ঠ এবং যোগাযোগে অত্যন্ত স্বাচ্ছন্দ্যময়।",
    zhQuote: "与沙拉邦拉集团的战略合作为我们大幅简化了南亚采购流程——高效专业、准时履约且跨文化沟通极其顺畅。",
    photoUrl: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

// Translations dictionary for English, Bengali, and Chinese (Simplified)
export const translations: Record<'en' | 'bn' | 'zh', Record<string, any>> = {
  en: {
    nav: {
      about: "About Us",
      companies: "Companies",
      leadership: "Leadership",
      globalPresence: "Global Presence",
      sustainability: "Sustainability & CSR",
      newsroom: "Newsroom",
      careers: "Careers",
      partner: "Partner With Us",
      contact: "Contact"
    },
    hero: {
      tag: "SHARABANGLA GROUP — MULTINATIONAL HOLDING STRUCTURE",
      title: "Connecting Bangladesh to Global Trade",
      subtitle: "A fast-growing Bangladeshi conglomerate on its journey to becoming a true multinational corporation — bridging global markets through e-commerce, express logistics, sourcing, and sustainable manufacturing.",
      ctaCompanies: "Explore Our Companies",
      ctaAbout: "About the Group",
      scrollText: "Scroll to discover our ecosystem"
    },
    glance: {
      tag: "AT A GLANCE",
      title: "Scale, Synergy & Global Velocity",
      subtitle: "A disciplined group structure built on transparency, technology, and cross-border agility."
    },
    aboutSection: {
      tag: "ABOUT THE GROUP",
      title: "Building Bangladesh's Next-Generation Multinational Conglomerate",
      p1: "SHARABANGLA GROUP is a fast-growing holding company headquartered in Dhaka, Bangladesh, with registered offices and operating hubs spanning China, India, and Dubai (UAE).",
      p2: "We operate across four core pillars: E-Commerce & Digital Commerce, International Trading & Sourcing, Express Logistics & Freight Forwarding, and Joint-Venture Manufacturing.",
      p3: "By integrating digital marketplace platforms with dedicated air/sea cargo lines and state-of-the-art non-woven fabric mills, we reduce trade friction and unlock global market access for businesses and consumers alike.",
      link: "Read Our Story"
    },
    ecosystem: {
      tag: "GROUP ECOSYSTEM",
      title: "Four Core Divisions. Seven Specialized Concerns.",
      subtitle: "An integrated framework connecting supply chains from factory floors to consumer doorsteps across Asia, Europe, and America.",
      desc: "An integrated framework connecting supply chains from factory floors to consumer doorsteps across Asia, Europe, and America.",
      centerNode: "SHARABANGLA GROUP",
      centerSub: "Holding Structure",
      hoverTip: "Hover or tap a division to explore sister concerns",
      companiesInside: "Sister Concerns in this division:"
    },
    companiesSection: {
      tag: "OUR CONCERNS",
      title: "Diversified Excellence Across Key Industries",
      all: "All Companies",
      ecommerce: "E-Commerce",
      trading: "Trading & Sourcing",
      logistics: "Logistics",
      manufacturing: "Manufacturing",
      learnMore: "Learn more"
    },
    logistics: {
      tag: "LOGISTICS SPOTLIGHT",
      title: "Sharabangla Express — Global Freight & Last-Mile Velocity",
      desc: "Modeled after world-class integrators like SF Express and Kerry Logistics, Sharabangla Express powers dedicated air cargo allocations between Guangzhou, Kolkata, and Dhaka.",
      cta: "Discover Sharabangla Express",
      cap1: "Air Freight Charters",
      cap2: "Ocean Cargo & LCL",
      cap3: "Bonded Warehousing",
      cap4: "Nationwide Last-Mile"
    },
    map: {
      tag: "GLOBAL FOOTPRINT",
      title: "Registered Offices & Operating Hubs",
      subtitle: "Bridging East Asia, South Asia, Middle East, and Western markets through strategically located corporate entities.",
      clickPinNotice: "Click any location pin on the map to inspect office details",
      officeType: "Office Type",
      markets: "Markets Served",
      contactOffice: "Contact Office"
    },
    leadershipSection: {
      tag: "CORPORATE GOVERNANCE",
      title: "Executive Leadership",
      subtitle: "Guiding Sharabangla Group's strategic expansion with global vision, financial rigor, and ethical governance.",
      noteDraft: "Draft Leadership Placeholders — To be updated with final executive profiles.",
      fullTeamLink: "Meet the Full Leadership Team"
    },
    chairmanSection: {
      tag: "CHAIRMAN'S MESSAGE",
      title: "A Message From Our Founder"
    },
    mdSection: {
      tag: "MANAGING DIRECTOR'S MESSAGE",
      title: "A Vision Without Limits"
    },
    directorSection: {
      tag: "DIRECTORS' MESSAGES",
      title: "Voices of Strategic Leadership",
      subtitle: "Perspectives on growth, operations, and cross-border innovation from our Board of Directors."
    },
    visionSection: {
      tag: "STRATEGIC FOUNDATION",
      title: "Vision, Mission & Core Values",
      subtitle: "The principles that drive every cross-border partnership, factory investment, and digital commerce initiative."
    },
    journeySection: {
      tag: "OUR JOURNEY",
      title: "A Decade of Purposeful Growth",
      subtitle: "Key milestones in Sharabangla Group's transformation into an international business group."
    },
    newsSection: {
      tag: "NEWSROOM",
      title: "Latest News & Corporate Updates",
      viewAll: "View All News"
    },
    partnerSection: {
      tag: "PARTNER WITH US",
      title: "Grow With Sharabangla Group",
      subtitle: "Whether you are an international supplier, trade buyer, or strategic joint-venture investor, we welcome cross-border collaboration.",
      btnSupplier: "Become a Supplier",
      btnBuyer: "Become a Buyer",
      btnInvestor: "Investor Relations"
    },
    footer: {
      desc: "A fast-growing Bangladesh-based international business group connecting global trade through e-commerce, express logistics, sourcing, and manufacturing.",
      colGroup: "Sharabangla Group",
      colConcerns: "Our Companies",
      colResources: "Quick Links",
      colOffices: "Registered Offices",
      newsletterTitle: "Subscribe to Corporate Updates",
      newsletterPlaceholder: "Enter your corporate email...",
      subscribeBtn: "Subscribe",
      rights: "All rights reserved. Sharabangla Group Holding Ltd.",
      privacy: "Privacy Policy",
      terms: "Terms of Trade",
      sitemap: "Sitemap"
    },
    brandFilmIntro: {
      skip: "Skip Intro",
      scene1Title: "Sharabangla Group",
      scene1Sub: "ROOTS & VISION",
      scene2Title: "Four industries. One group.",
      scene3Title: "Global Footprint",
      closingLine: "Connecting Bangladesh to the World."
    }
  },
  zh: {
    nav: {
      about: "关于我们",
      companies: "旗下企业",
      leadership: "领导团队",
      globalPresence: "全球布局",
      sustainability: "可持续发展与企业责任",
      newsroom: "新闻中心",
      careers: "招贤纳士",
      partner: "商务合作",
      contact: "联系我们"
    },
    hero: {
      tag: "SHARABANGLA GROUP — 跨国控股企业集团",
      title: "连接孟加拉国与全球贸易",
      subtitle: "从孟加拉国崛起、迈向真正跨国控股实体的现代化企业集团 —— 依托跨境电商、国际速运、全球采购与可持续智造，构筑连接全球市场的商贸桥梁。",
      ctaCompanies: "探索旗下企业",
      ctaAbout: "了解集团概况",
      scrollText: "向下滚动，探索集团生态"
    },
    glance: {
      tag: "集团概览",
      title: "规模体量、产业协同与全球速度",
      subtitle: "以高度透明、技术赋能与跨境敏捷性为基石打造的现代化控股架构。"
    },
    aboutSection: {
      tag: "关于集团",
      title: "打造孟加拉国新一代国际化跨国企业集团",
      p1: "沙拉邦拉集团（SHARABANGLA GROUP）是一家快速发展的现代化控股企业集团，总部位于孟加拉国达卡，在主要贸易枢纽设有分支与运营网络。",
      p2: "集团深耕四大核心支柱板块：电子商务与数字商业、国际商贸与采购、国际速运与货运代理、以及高科技合资制造。",
      p3: "通过将数字化商贸平台与专属航空/海运货运航线、高标准的现代无纺布制造工厂深度融合，我们全面降低跨国贸易壁垒，为全球商业合作伙伴与消费者创造卓越价值。",
      link: "阅读我们的故事"
    },
    ecosystem: {
      tag: "集团生态系统",
      title: "四大核心业务板块 · 七家专业实体企业",
      subtitle: "从源头生产车间到跨国终端消费者的端到端一体化供应链生态，贯通亚洲、欧洲与美洲市场。",
      desc: "从源头生产车间到跨国终端消费者的端到端一体化供应链生态，贯通亚洲、欧洲与美洲市场。",
      centerNode: "SHARABANGLA GROUP",
      centerSub: "集团核心控股架构",
      hoverTip: "悬停或点击业务板块，探索旗下专业企业",
      companiesInside: "该板块旗下企业："
    },
    companiesSection: {
      tag: "旗下企业",
      title: "深耕核心产业 · 铸就多元卓越",
      all: "全部企业",
      ecommerce: "电子商务",
      trading: "贸易与采购",
      logistics: "物流速运",
      manufacturing: "智能制造",
      learnMore: "了解更多"
    },
    logistics: {
      tag: "现代物流业务亮点",
      title: "沙拉邦拉速运（Sharabangla Express）— 国际航空货运与末端高效交付",
      desc: "对标顺丰速运（SF Express）与嘉里物流（Kerry Logistics）等国际一流综合物流服务商，沙拉邦拉速运开通广州、加尔各答与达卡之间的多条全货机航空包机航线与清关绿色通道。",
      cta: "探索沙拉邦拉速运",
      cap1: "国际航空包机航线",
      cap2: "海运整箱与拼箱（LCL）",
      cap3: "保税自动化智能仓储",
      cap4: "全国 64 个行政区末端派送"
    },
    map: {
      tag: "全球布局",
      title: "注册办事处与核心运营枢纽",
      subtitle: "通过位于战略要地的跨国企业实体，紧密连接东亚、南亚、中东与欧美市场。",
      clickPinNotice: "点击地图上的任一标记查看办事处详细信息",
      officeType: "机构类型",
      markets: "覆盖市场",
      contactOffice: "联络该办事处"
    },
    leadershipSection: {
      tag: "公司治理",
      title: "高层领导团队",
      subtitle: "以全球化视野、严谨的财务纪律与卓越的商业道德，引领沙拉邦拉集团战略扩张。",
      noteDraft: "高管信息预览 —— 最终资料将以官方发布为准。",
      fullTeamLink: "了解全体领导团队"
    },
    chairmanSection: {
      tag: "董事长寄语",
      title: "创始人寄语"
    },
    mdSection: {
      tag: "董事总经理寄语",
      title: "无限愿景"
    },
    directorSection: {
      tag: "董事会寄语",
      title: "战略领导者心声",
      subtitle: "来自集团董事会关于业务增长、跨国运营与创新发展的战略洞察。"
    },
    visionSection: {
      tag: "战略基石",
      title: "愿景、使命与核心价值观",
      subtitle: "指引我们每一项跨国经贸合作、现代化工厂投资与数字商业创新的核心准则。"
    },
    journeySection: {
      tag: "发展历程",
      title: "砥砺深耕的十年稳健扩张之路",
      subtitle: "沙拉邦拉集团成长蜕变为国际化现代企业集团的关键历史里程碑。"
    },
    newsSection: {
      tag: "新闻中心",
      title: "最新动态与集团官方资讯",
      viewAll: "查看全部新闻"
    },
    partnerSection: {
      tag: "商务合作",
      title: "携手沙拉邦拉集团，共创全球增长",
      subtitle: "无论您是国际源头供应商、海外采购商还是合资战略投资者，我们诚挚欢迎各类跨国业务合作。",
      btnSupplier: "成为供应商",
      btnBuyer: "成为采购买家",
      btnInvestor: "投资者关系"
    },
    footer: {
      desc: "立足孟加拉国、面向世界的快速成长型跨国企业集团，通过跨境电商、国际速运、全球采购与智造产业链紧密连接世界贸易。",
      colGroup: "沙拉邦拉集团",
      colConcerns: "旗下企业",
      colResources: "快捷导航",
      colOffices: "全球办事处",
      newsletterTitle: "订阅集团官方资讯与经贸洞察",
      newsletterPlaceholder: "输入您的企业邮箱...",
      subscribeBtn: "立即订阅",
      rights: "版权所有 © 沙拉邦拉集团控股有限公司（Sharabangla Group Holding Ltd.） 保留所有权利。",
      privacy: "隐私政策",
      terms: "贸易条款",
      sitemap: "网站地图"
    },
    brandFilmIntro: {
      skip: "跳过片头",
      scene1Title: "沙拉邦拉集团",
      scene1Sub: "根基与愿景",
      scene2Title: "四大核心支柱 · 一体化企业集团",
      scene3Title: "全球布局",
      closingLine: "连接孟加拉国与全球贸易。"
    }
  },
  bn: {
    nav: {
      about: "আমাদের সম্পর্কে",
      companies: "আমাদের প্রতিষ্ঠানসমূহ",
      leadership: "নেতৃত্ব",
      globalPresence: "গ্লোবাল উপস্থিতি",
      sustainability: "স্থায়িত্ব ও সিএসআর",
      newsroom: "নিউজ রুম",
      careers: "ক্যারিয়ার",
      partner: "অংশীদার হন",
      contact: "যোগাযোগ"
    },
    hero: {
      tag: "শারাবাংলা গ্রুপ — বহুজাতিক হোল্ডিং স্ট্রাকচার",
      title: "বাংলাদেশকে বিশ্ব বাণিজ্যের সাথে যুক্ত করছে",
      subtitle: "বাংলাদেশ থেকে শুরু হয়ে একটি সত্যিকারে বহুজাতিক কর্পোরেশনে পরিণত হওয়ার পথে দ্রুত বর্ধনশীল ব্যবসা গ্রুপ — যা ই-কমার্স, এক্সপ্রেস লজিস্টিকস, সোর্সিং এবং টেকসই উৎপাদনের মাধ্যমে আন্তর্জাতিক বাজারকে সংযুক্ত করছে।",
      ctaCompanies: "আমাদের প্রতিষ্ঠানসমূহ দেখুন",
      ctaAbout: "গ্রুপ সম্পর্কে জানুন",
      scrollText: "আমাদের ইকোসিস্টেম দেখতে স্ক্রোল করুন"
    },
    glance: {
      tag: "এক নজরে",
      title: "স্কেল, মেলবন্ধন ও আন্তর্জাতিক গতিশীলতা",
      subtitle: "স্বচ্ছতা, প্রযুক্তি এবং আন্তর্জাতিক দক্ষতার ওপর গড়ে তোলা সুশৃঙ্খল গ্রুপ স্ট্রাকচার।"
    },
    aboutSection: {
      tag: "গ্রুপ সম্পর্কে",
      title: "বাংলাদেশের পরবর্তী প্রজন্মের বহুজাতিক কংগ্লোমারেট গঠন",
      p1: "শারাবাংলা গ্রুপ হলো ঢাকার হেডকোয়ার্টারভিত্তিক একটি দ্রুত বর্ধনশীল হোল্ডিং প্রতিষ্ঠান, যার নিবন্ধিত অফিস এবং কার্যক্রম চীন, ভারত এবং দুবাইতে (সংযুক্ত আরব আমিরাত) বিস্তৃত।",
      p2: "আমরা চারটি মূল স্তম্ভে কাজ করি: ই-কমার্স ও ডিজিটাল কমার্স, আন্তর্জাতিক ট্রেডিং ও সোর্সিং, এক্সপ্রেস লজিস্টিকস ও ফ্রেইট ফরওয়ার্ডিং, এবং যৌথ প্রযুক্তি উৎপাদন।",
      p3: "ডিজিটাল মার্কেটপ্লেসকে নিজস্ব এয়ার/সি কার্গো এবং অত্যাধুনিক টেক্সটাইল প্ল্যান্টের সাথে যুক্ত করে আমরা বাণিজ্যের জটিলতা কমাই এবং ব্যবসা ও গ্রাহকদের জন্য আন্তর্জাতিক বাজারের পথ উন্মোচন করি।",
      link: "আমাদের ইতিহাস পড়ুন"
    },
    ecosystem: {
      tag: "গ্রুপ ইকোসিস্টেম",
      title: "৪টি মূল বিভাগ। ৭টি বিশেষায়িত প্রতিষ্ঠান।",
      subtitle: "কারখানা থেকে শুরু করে গ্রাহকের দোরগোড়া পর্যন্ত এশিয়া, ইউরোপ ও আমেরিকার সাপ্লাই চেইনকে যুক্ত করার সমন্বিত ব্যবস্থা।",
      desc: "কারখানা থেকে শুরু করে গ্রাহকের দোরগোড়া পর্যন্ত এশিয়া, ইউরোপ ও আমেরিকার সাপ্লাই চেইনকে যুক্ত করার সমন্বিত ব্যবস্থা।",
      centerNode: "শারাবাংলা গ্রুপ",
      centerSub: "হোল্ডিং স্ট্রাকচার",
      hoverTip: "সহযোগী প্রতিষ্ঠানগুলো দেখতে বিভাগগুলোতে হোভার বা ট্যাপ করুন",
      companiesInside: "এই বিভাগের সহযোগী প্রতিষ্ঠানসমূহ:"
    },
    companiesSection: {
      tag: "আমাদের সহযোগী প্রতিষ্ঠান",
      title: "প্রধান শিল্পখাত জুড়ে বহুমুখী দক্ষতা",
      all: "সকল প্রতিষ্ঠান",
      ecommerce: "ই-কমার্স",
      trading: "ট্রেডিং ও সোর্সিং",
      logistics: "লজিস্টিকস",
      manufacturing: "উৎপাদন",
      learnMore: "বিস্তারিত দেখুন"
    },
    logistics: {
      tag: "লজিস্টিকস হাইলাইট",
      title: "শারাবাংলা এক্সপ্রেস — গ্লোবাল ফ্রেইট ও লাস্ট-মাইল স্পিড",
      desc: "বিশ্বমানের আন্তর্জাতিক লজিস্টিকসের আদলে পরিচালিত, শারাবাংলা এক্সপ্রেস গুয়াংজু, কলকাতা এবং ঢাকার মধ্যে নিজস্ব এয়ার কার্গো সার্ভিস পরিচালনা করে।",
      cta: "শারাবাংলা এক্সপ্রেস সম্পর্কে জানুন",
      cap1: "এয়ার ফ্রেইট চার্টার",
      cap2: "সমুদ্র কার্গো ও এলসিএল",
      cap3: "বন্ডেড ওয়্যারহাউস",
      cap4: "দেশব্যাপী লাস্ট-মাইল"
    },
    map: {
      tag: "গ্লোবাল নেটওয়ার্ক",
      title: "নিবন্ধিত অফিস ও আঞ্চলিক কার্যক্রম",
      subtitle: "কৌশলগতভাবে গুরুত্বপূর্ণ শহরে কর্পোরেট অফিসের মাধ্যমে পূর্ব এশিয়া, দক্ষিণ এশিয়া, মধ্যপ্রাচ্য ও পশ্চিমা বাজারকে সংযুক্ত করা।",
      clickPinNotice: "অফিসের বিস্তারিত দেখতে মানচিত্রের পিনে ক্লিক করুন",
      officeType: "অফিসের ধরন",
      markets: "সেবা প্রদানকারী অঞ্চল",
      contactOffice: "অফিসে যোগাযোগ"
    },
    leadershipSection: {
      tag: "কর্পোরেট গভর্ন্যান্স",
      title: "নির্বাহী নেতৃত্ব",
      subtitle: "আন্তর্জাতিক দৃষ্টিভঙ্গি, আর্থিক শৃংখলা এবং সুশাসনের মাধ্যমে শারাবাংলা গ্রুপের কৌশলগত প্রসারে নেতৃত্ব দান।",
      noteDraft: "ড্রাফট লিডারশিপ তথ্য — চূড়ান্ত প্রোফাইল সংযোজিত হবে।",
      fullTeamLink: "পূর্ণাঙ্গ নেতৃত্ব দল দেখুন"
    },
    chairmanSection: {
      tag: "চেয়ারম্যানের বার্তা",
      title: "প্রতিষ্ঠাতার সংক্ষিপ্ত বার্তা"
    },
    mdSection: {
      tag: "ব্যবস্থাপনা পরিচালকের বার্তা",
      title: "সীমাহীন অগ্রযাত্রার প্রত্যয়"
    },
    directorSection: {
      tag: "পরিচালকদের বার্তা",
      title: "কৌশলগত নেতৃত্বের ভাবনা",
      subtitle: "প্রবৃদ্ধি, পরিচালন শৃঙ্খলা ও আন্তঃসীমান্ত উদ্ভাবন নিয়ে আমাদের পরিচালনা পর্ষদের দৃষ্টিভঙ্গি।"
    },
    visionSection: {
      tag: "কৌশলগত ভিত্তি",
      title: "ভিশন, মিশন ও মূল মূল্যবোধ",
      subtitle: "যে মূলনীতিগুলো আমাদের প্রতিটি আন্তর্জাতিক অংশীদারিত্ব, শিল্প বিনিয়োগ এবং ডিজিটাল উদ্যোগে দিকনির্দেশনা দেয়।"
    },
    journeySection: {
      tag: "আমাদের পথচলা",
      title: "এক দশকের সময়োপযোগী প্রবৃদ্ধি",
      subtitle: "শারাবাংলা গ্রুপের আন্তর্জাতিক ব্যবসা গ্রুপে রূপান্তরের গুরুত্বপূর্ণ মাইলফলক।"
    },
    newsSection: {
      tag: "নিউজ রুম",
      title: "সর্বশেষ খবর ও কর্পোরেট আপডেট",
      viewAll: "সকল খবর দেখুন"
    },
    partnerSection: {
      tag: "অংশীদার হন",
      title: "শারাবাংলা গ্রুপের সাথে সমৃদ্ধি অর্জন করুন",
      subtitle: "আপনি আন্তর্জাতিক সরবরাহকারী, আমদানিকারক বা যৌথ বিনিয়োগকারী হলেও আমরা আন্তর্জাতিক সহযোগিতাকে স্বাগত জানাই।",
      btnSupplier: "সাপ্লায়ার হন",
      btnBuyer: "বায়ার হন",
      btnInvestor: "ইনভেস্টর রিলেশনস"
    },
    footer: {
      desc: "বাংলাদেশ থেকে চালিত একটি আন্তর্জাতিক ব্যবসা গ্রুপ যা ই-কমার্স, এক্সপ্রেস লজিস্টিকস, সোর্সিং এবং উৎপাদনের মাধ্যমে বিশ্ব বাণিজ্য পরিচালনায় ভূমিকা রাখছে।",
      colGroup: "শারাবাংলা গ্রুপ",
      colConcerns: "আমাদের প্রতিষ্ঠানসমূহ",
      colResources: "প্রয়োজনীয় লিঙ্ক",
      colOffices: "নিবন্ধিত অফিসসমূহ",
      newsletterTitle: "কর্পোরেট আপডেটের জন্য সাবস্ক্রাইব করুন",
      newsletterPlaceholder: "আপনার ইমেইল দিন...",
      subscribeBtn: "সাবস্ক্রাইব",
      rights: "সর্বস্বত্ব সংরক্ষিত। শারাবাংলা গ্রুপ হোল্ডিং লিমিটেড।",
      privacy: "প্রাইভেসি পলিসি",
      terms: "ট্রেড টার্মস",
      sitemap: "সাইটম্যাপ"
    },
    brandFilmIntro: {
      skip: "ইন্ট্রো এড়িয়ে যান",
      scene1Title: "শারাবাংলা গ্রুপ",
      scene1Sub: "মূল ভিত্তি ও ভিশন",
      scene2Title: "৪টি প্রধান শিল্পখাত। ১টি সমন্বিত গ্রুপ।",
      scene3Title: "গ্লোবাল নেটওয়ার্ক",
      closingLine: "বাংলাদেশকে বিশ্ব বাণিজ্যের সাথে যুক্ত করছে।"
    }
  }
};
