export type MultiLangText = { en: string; bn: string; zh?: string };

export interface NavMenuItem {
  name: MultiLangText;
  desc?: MultiLangText;
  path: string;
  badge?: MultiLangText;
}

export interface NavMenuColumn {
  title: MultiLangText;
  items: NavMenuItem[];
}

export interface NavMenuSection {
  id: string;
  labelKey: string;
  defaultLabel: MultiLangText;
  path: string;
  type: 'mega' | 'simple';
  columns: NavMenuColumn[];
  featuredCard?: {
    title: MultiLangText;
    desc: MultiLangText;
    image: string;
    ctaLabel: MultiLangText;
    ctaPath: string;
  };
  bottomBar?: {
    ctaLabel: MultiLangText;
    ctaPath: string;
  };
}

export const NAV_MENU_DATA: NavMenuSection[] = [
  {
    id: 'about',
    labelKey: 'nav.about',
    defaultLabel: { en: 'About Us', bn: 'আমাদের সম্পর্কে', zh: '关于我们' },
    path: '/about',
    type: 'mega',
    columns: [
      {
        title: { en: 'Corporate Overview', bn: 'কর্পোরেট সংক্ষিপ্ত রূপ', zh: '企业概览' },
        items: [
          {
            name: { en: 'Our Story', bn: 'আমাদের গল্প', zh: '我们的故事' },
            desc: { en: 'Three decades of excellence and trust', bn: 'তিন দশকের সাফল্য ও সুদৃঢ় বিশ্বাস', zh: '三十年卓越与信赖的传承' },
            path: '/about#story'
          },
          {
            name: { en: 'Vision · Mission · Values', bn: 'ভিশন · মিশন · মূল্যবোধ', zh: '愿景·使命·价值观' },
            desc: { en: 'Our core principles & future strategy', bn: 'আমাদের মূলনীতি ও ভবিষ্যত কৌশল', zh: '我们的核心原则与未来战略' },
            path: '/about#vision'
          },
          {
            name: { en: 'Corporate Governance', bn: 'কর্পোরেট সুশাসন', zh: '公司治理' },
            desc: { en: 'Transparency and ethical oversight', bn: 'স্বচ্ছতা ও নৈতিক পরিচালনা নীতি', zh: '透明度与道德监督' },
            path: '/about#governance'
          }
        ]
      },
      {
        title: { en: 'Leadership & Milestones', bn: 'নেতৃত্ব ও গুরুত্বপূর্ণ সময়রেখা', zh: '领导层与发展里程碑' },
        items: [
          {
            name: { en: "Chairman's Message", bn: 'চেয়ারম্যানের বক্তব্য', zh: '董事长致辞' },
            desc: { en: 'Strategic direction & vision for Bangladesh', bn: 'কৌশলগত নির্দেশনা ও রূপকল্প', zh: '孟加拉国的战略方向与愿景' },
            path: '/about#chairman'
          },
          {
            name: { en: 'Our Journey (Timeline)', bn: 'আমাদের পথচলা (টাইমলাইন)', zh: '发展历程（时间轴）' },
            desc: { en: 'Milestones from establishment to global reach', bn: 'প্রতিষ্ঠা থেকে বৈশ্বিক নেটওয়ার্কের মাইলফলক', zh: '从创立到全球布局的重要里程碑' },
            path: '/about#timeline'
          }
        ]
      }
    ]
  },
  {
    id: 'leadership',
    labelKey: 'nav.leadership',
    defaultLabel: { en: 'Leadership', bn: 'নেতৃত্বদল', zh: '领导团队' },
    path: '/leadership',
    type: 'simple',
    columns: [
      {
        title: { en: 'Executive Board', bn: 'নির্বাহী বোর্ড', zh: '执行董事会' },
        items: [
          {
            name: { en: 'Board of Directors', bn: 'বোর্ড অব ডিরেক্টর্স', zh: '董事会' },
            desc: { en: 'Strategic oversight & decision makers', bn: 'কৌশলগত পরিচালনা বোর্ড', zh: '战略监督与决策核心' },
            path: '/leadership#board'
          },
          {
            name: { en: 'Chairman & Managing Director', bn: 'চেয়ারম্যান ও ব্যবস্থাপনা পরিচালক', zh: '董事长兼常务董事' },
            desc: { en: 'Pioneering vision & leadership', bn: 'অগ্রগামী ভিশন ও ডিরেকশন', zh: '开拓性远见与卓越领导力' },
            path: '/leadership#chairman'
          },
          {
            name: { en: 'Governance Committees', bn: 'কর্পোরেট গভর্নেন্স কমিটি', zh: '公司治理委员会' },
            desc: { en: 'Audit, ethics & compliance oversight', bn: 'অডিট, নীতিশাস্ত্র ও নিরীক্ষণ পরিচালনা কমিটি', zh: '审计、道德准则与合规监督' },
            path: '/leadership#governance'
          }
        ]
      }
    ]
  },
  {
    id: 'companies',
    labelKey: 'nav.companies',
    defaultLabel: { en: 'Companies', bn: 'প্রতিষ্ঠানসমূহ', zh: '旗下企业' },
    path: '/companies',
    type: 'mega',
    columns: [
      {
        title: { en: 'E-Commerce & Digital Commerce', bn: 'ই-কমার্স ও ডিজিটাল কমার্স', zh: '电子商务与数字化零售' },
        items: [
          {
            name: { en: 'Laobaan Bangladesh', bn: 'লাওবান বাংলাদেশ', zh: '老板孟加拉 (Laobaan Bangladesh)' },
            desc: { en: 'B2B & D2C E-Commerce Platform', bn: 'বিটুবি ও ডিটুসি ই-কমার্স প্ল্যাটফর্ম', zh: 'B2B与D2C电子商务综合平台' },
            path: '/companies/laobaan-bangladesh',
            badge: { en: 'D2C Leader', bn: 'ডিটুসি সেরা', zh: 'D2C行业领军' }
          },
          {
            name: { en: 'Shenova', bn: 'শেনোভা', zh: '希诺瓦 (Shenova)' },
            desc: { en: 'Cross-Border Fashion & Digital Retail', bn: 'ক্রস-বর্ডার ফ্যাশন ও ডিজিটাল রিটেইল', zh: '跨境时尚与数字零售品牌' },
            path: '/companies/shenova'
          },
          {
            name: { en: 'Sharabangla.com', bn: 'শারাবাংলা.কম', zh: '沙拉邦拉电商 (Sharabangla.com)' },
            desc: { en: 'Flagship National E-Commerce Marketplace', bn: 'ফ্ল্যাগশিপ জাতীয় ই-কমার্স মার্কেটপ্লেস', zh: '孟加拉国旗舰级国家电子商务平台' },
            path: '/companies/sharabangla-com'
          }
        ]
      },
      {
        title: { en: 'Trading & Sourcing', bn: 'ট্রেডিং ও সোর্সিং', zh: '大宗贸易与全球采购' },
        items: [
          {
            name: { en: 'BAC Venture', bn: 'বিএসি ভেঞ্চার', zh: 'BAC 创投 (BAC Venture)' },
            desc: { en: 'Global Trade Sourcing & Supply Management', bn: 'গ্লোবাল ট্রেড সোর্সিং ও সাপ্লাই ম্যানেজমেন্ট', zh: '全球贸易采购与供应链整合管理' },
            path: '/companies/bac-venture'
          },
          {
            name: { en: 'Sharabangla Down Products', bn: 'শারাবাংলা ডাউন প্রোডাক্টস', zh: '沙拉邦拉羽绒制品 (Sharabangla Down Products)' },
            desc: { en: 'Premium Down Feather & Textile Processing', bn: 'প্রিমিয়াম ডাউন ফেদার ও টেক্সটাইল প্রসেসিং', zh: '高端羽绒羽毛深加工与纺织制造' },
            path: '/companies/sharabangla-down-products'
          }
        ]
      },
      {
        title: { en: 'Logistics & Express', bn: 'লজিস্টিকস ও এক্সপ্রেস', zh: '现代物流与快捷快递' },
        items: [
          {
            name: { en: 'Sharabangla Express', bn: 'শারাবাংলা এক্সপ্রেস', zh: '沙拉邦拉速运 (Sharabangla Express)' },
            desc: { en: 'Nationwide Express Delivery & Air Freight', bn: 'সারাদেশে এক্সপ্রেস ডেলিভারি ও এয়ার ফ্রেইট', zh: '全境特快专递与国际航空货运' },
            path: '/companies/sharabangla-express',
            badge: { en: 'Fast Delivery', bn: 'দ্রুত ডেলিভারি', zh: '极速送达' }
          }
        ]
      },
      {
        title: { en: 'Manufacturing & Tech', bn: 'ম্যানুফ্যাকচারিং ও টেক', zh: '智能制造与前沿科技' },
        items: [
          {
            name: { en: 'FuMao Bangladesh Technology Co., Ltd.', bn: 'ফুমাও বাংলাদেশ টেকনোলজি কোং লিমিটেড', zh: '福茂孟加拉科技有限公司 (FuMao Bangladesh Technology Co., Ltd.)' },
            desc: { en: 'Smart Tech Assembly & Industrial Manufacturing', bn: 'স্মার্ট টেক অ্যাসেম্বলি ও ইন্ডাস্ট্রিয়াল প্রস্তুতকরণ', zh: '智能科技组装与高端工业制造' },
            path: '/companies/fumao-bangladesh-technology'
          }
        ]
      }
    ]
  },
  {
    id: 'globalPresence',
    labelKey: 'nav.globalPresence',
    defaultLabel: { en: 'Global Presence', bn: 'বৈশ্বিক উপস্থিতি', zh: '全球布局' },
    path: '/global-presence',
    type: 'mega',
    columns: [
      {
        title: { en: 'Registered Offices', bn: 'নিবন্ধিত কার্যালয়সমূহ', zh: '注册办事机构' },
        items: [
          {
            name: { en: 'Bangladesh (Dhaka — HQ)', bn: 'বাংলাদেশ (ঢাকা — প্রধান কার্যালয়)', zh: '孟加拉国（达卡 — 全球总部）' },
            desc: { en: 'Global Corporate Headquarters', bn: 'প্রধান আন্তর্জাতিক কার্যালয়', zh: '全球企业总部与指挥枢纽' },
            path: '/global-presence#offices'
          },
          {
            name: { en: 'China (Guangzhou)', bn: 'চীন (গুয়াংঝৌ)', zh: '中国（广州）' },
            desc: { en: 'Sourcing & Trade Operations Hub', bn: 'সোর্সিং ও ট্রেড হাব', zh: '全球供应链采购与东亚贸易运营中心' },
            path: '/global-presence#offices'
          },
          {
            name: { en: 'India (Kolkata)', bn: 'ভারত (কলকাতা)', zh: '印度（加尔各答）' },
            desc: { en: 'Regional Trade Liaison Office', bn: 'আঞ্চলিক ট্রেড লিয়াজোঁ অফিস', zh: '南亚区域贸易联络处' },
            path: '/global-presence#offices'
          },
          {
            name: { en: 'Dubai (UAE)', bn: 'দুবাই (সংযুক্ত আরব আমিরাত)', zh: '阿联酋（迪拜）' },
            desc: { en: 'Middle East & MENA Trade Hub', bn: 'মিডল ইস্ট ট্রেড হাব', zh: '中东与中东北非（MENA）贸易枢纽' },
            path: '/global-presence#offices'
          }
        ]
      },
      {
        title: { en: 'Operating Markets', bn: 'কার্যক্রমের প্রধান বাজার', zh: '核心运营市场' },
        items: [
          {
            name: { en: 'Vietnam', bn: 'ভিয়েতনামী সোর্সিং', zh: '越南' },
            desc: { en: 'Apparel Sourcing & Manufacturing Network', bn: 'পোশাক সোর্সিং ও প্রসেসিং নেটওয়ার্ক', zh: '成衣采购与协同制造网络' },
            path: '/global-presence#markets'
          },
          {
            name: { en: 'Hong Kong', bn: 'হংকং', zh: '中国香港' },
            desc: { en: 'Financial & Logistics Routing Hub', bn: 'ফাইন্যান্সিয়াল ও লজিস্টিকস হাব', zh: '全球金融结算与物流转运枢纽' },
            path: '/global-presence#markets'
          },
          {
            name: { en: 'United States (USA)', bn: 'যুক্তরাষ্ট্র (ইউএসএ)', zh: '美国' },
            desc: { en: 'Export Destination & Retail Channel', bn: 'রপ্তানি কেন্দ্র ও রিটেইল চ্যানেল', zh: '主要出口目的地与主流零售分销渠道' },
            path: '/global-presence#markets'
          },
          {
            name: { en: 'Europe', bn: 'ইউরোপীয় বাজার', zh: '欧洲市场' },
            desc: { en: 'Strategic Sourcing Partner Network', bn: 'কৌশলগত সোর্সিং পার্টনার নেটওয়ার্ক', zh: '战略采购伙伴与高标准消费市场网络' },
            path: '/global-presence#markets'
          }
        ]
      }
    ],
    bottomBar: {
      ctaLabel: { en: 'View Interactive Global Map →', bn: 'ইন্টারেক্টিভ গ্লোবাল ম্যাপ দেখুন →', zh: '查看交互式全球贸易地图 →' },
      ctaPath: '/global-presence#map'
    }
  },
  {
    id: 'sustainability',
    labelKey: 'nav.sustainability',
    defaultLabel: { en: 'Sustainability', bn: 'স্থায়িত্ব ও সিএসআর', zh: '可持续发展与企业责任' },
    path: '/sustainability',
    type: 'mega',
    columns: [
      {
        title: { en: 'ESG Commitment', bn: 'ইএসজি প্রতিশ্রুতি', zh: 'ESG 战略承诺' },
        items: [
          {
            name: { en: 'Environmental Responsibility', bn: 'পরিবেশগত দায়িত্ব', zh: '环境保护与生态责任' },
            desc: { en: 'Green logistics & carbon neutral goals', bn: 'সবুজ লজিস্টিকস ও কার্বন নিউট্রাল লক্ষ্য', zh: '绿色低碳物流与碳中和发展目标' },
            path: '/sustainability#environmental'
          },
          {
            name: { en: 'Community & CSR Initiatives', bn: 'সামাজিক ও সিএসআর উদ্যোগ', zh: '社区发展与公益慈善' },
            desc: { en: 'Education, healthcare & rural empowerment', bn: 'শিক্ষা, স্বাস্থ্য ও গ্রামীণ উন্নয়ন', zh: '教育帮扶、医疗援助与乡村赋能工程' },
            path: '/sustainability#csr'
          }
        ]
      },
      {
        title: { en: 'Ethics & Governance', bn: 'নৈতিকতা ও সুশাসন', zh: '商业道德与规范治理' },
        items: [
          {
            name: { en: 'Ethical Sourcing', bn: 'নৈতিক সোর্সিং', zh: '道德采购与责任供应链' },
            desc: { en: 'Fair labor & responsible procurement', bn: 'ন্যায্য শ্রম ও দায়বদ্ধ ক্রয়নীতি', zh: '公平劳工待遇与负责任采购准则' },
            path: '/sustainability#ethical'
          },
          {
            name: { en: 'Governance & Compliance', bn: 'গভর্নেন্স ও কমপ্লায়েন্স', zh: '规范治理与国际合规' },
            desc: { en: 'Adherence to international standards', bn: 'আন্তর্জাতিক মান নিয়ন্ত্রণ ও সুশাসন', zh: '严格遵循国际标准与透明运营规范' },
            path: '/sustainability#governance'
          }
        ]
      }
    ]
  },
  {
    id: 'newsroom',
    labelKey: 'nav.newsroom',
    defaultLabel: { en: 'Newsroom', bn: 'নিউজ রুম', zh: '新闻中心' },
    path: '/newsroom',
    type: 'mega',
    columns: [
      {
        title: { en: 'Media & Releases', bn: 'মিডিয়া ও প্রেস ঘোষণা', zh: '媒体报道与官方公告' },
        items: [
          {
            name: { en: 'Latest News', bn: 'সর্বশেষ সংবাদ', zh: '最新新闻动态' },
            desc: { en: 'Group updates and industry insights', bn: 'গ্রুপের সাম্প্রতিক গুরুত্বপূর্ণ খবর', zh: '集团发展动向与全球行业洞察' },
            path: '/newsroom#latest'
          },
          {
            name: { en: 'Press Releases', bn: 'প্রেস বিজ্ঞপ্তি', zh: '官方新闻稿' },
            desc: { en: 'Official corporate statements', bn: 'অফিসিয়াল বার্তা ও প্রেস বিজ্ঞপ্তি', zh: '官方正式声明与重大发布' },
            path: '/newsroom#press'
          }
        ]
      },
      {
        title: { en: 'Assets & Announcements', bn: 'অ্যাসেট ও কর্পোরেট বার্তা', zh: '集团公告与媒体资源' },
        items: [
          {
            name: { en: 'Group Announcements', bn: 'গ্রুপের আনুষ্ঠানিক ঘোষণা', zh: '集团重大公告' },
            desc: { en: 'Strategic developments & milestones', bn: 'কৌশলগত উন্নয়ন ও মাইলফলক', zh: '战略发展进程与里程碑事件' },
            path: '/newsroom#announcements'
          }
        ]
      }
    ]
  },
  {
    id: 'careers',
    labelKey: 'nav.careers',
    defaultLabel: { en: 'Careers', bn: 'ক্যারিয়ার', zh: '人才招聘' },
    path: '/careers',
    type: 'mega',
    columns: [
      {
        title: { en: 'Workplace & Culture', bn: 'কর্মক্ষেত্র ও সংস্কৃতি', zh: '工作环境与企业文化' },
        items: [
          {
            name: { en: 'Life at Sharabangla', bn: 'শারাবাংলায় কর্মজীবন', zh: '走进沙拉邦拉' },
            desc: { en: 'Dynamic work culture across 4 key sectors', bn: '৪টি প্রধান খাতের গতিশীল কর্ম পরিবেশ', zh: '跨越四大核心业务板块的多元工作氛围' },
            path: '/careers#culture'
          },
          {
            name: { en: 'Culture & Benefits', bn: 'সংস্কৃতি ও সুযোগ-সুবিধা', zh: '福利待遇与成长关怀' },
            desc: { en: 'Growth, health, and leadership programs', bn: 'প্রবৃদ্ধি, স্বাস্থ্যের যত্ন ও নেতৃত্ব বিকাশ', zh: '个人职业晋升、健康保障与领导力发展计划' },
            path: '/careers#benefits'
          }
        ]
      },
      {
        title: { en: 'Opportunities', bn: 'নিয়োগের সুযোগসমূহ', zh: '职业发展机遇' },
        items: [
          {
            name: { en: 'Open Positions', bn: 'চলতি নিয়োগসমূহ', zh: '招贤纳士与在招职位' },
            desc: { en: 'Explore current career opportunities', bn: 'চলতি চাকরির বিভিন্ন পদসমূহ দেখুন', zh: '探索集团当下全职与专业岗位机会' },
            path: '/careers#openings'
          }
        ]
      }
    ]
  },
  {
    id: 'contact',
    labelKey: 'nav.contact',
    defaultLabel: { en: 'Contact', bn: 'যোগাযোগ', zh: '联系我们' },
    path: '/contact',
    type: 'simple',
    columns: []
  }
];
