import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ChatbotKnowledgeEntry {
  id: string;
  category: 'General' | 'Companies' | 'Careers' | 'Partnership' | 'FAQ' | 'Logistics' | 'Manufacturing' | string;
  question?: string;
  content: string;
  contentBn?: string;
  contentZh?: string;
  createdAt?: number;
  updatedAt?: number;
}

export const CHATBOT_KNOWLEDGE_COLLECTION = 'chatbotKnowledge';

/**
 * 16 Verified, Literal Default Knowledge Entries for Sharabangla Group.
 * Hardcoded character-for-character with zero AI modification.
 */
export const defaultChatbotKnowledge: ChatbotKnowledgeEntry[] = [
  {
    id: 'kb-01-group-overview',
    category: 'General',
    question: 'What is Sharabangla Group and what does it do?',
    content: 'Sharabangla Group is an international business conglomerate based in Dhaka, Bangladesh, established in 2015. The group connects Bangladesh to global trade across four core business divisions: E-Commerce & Digital Commerce, Trading & Sourcing (Export-Import), Logistics & Supply Chain, and Manufacturing & Technology. With 7+ group concerns, operations in 7 countries, and 1,000+ professionals worldwide, Sharabangla Group bridges international supply chains with local market excellence.',
    contentBn: 'শারাবাংলা গ্রুপ ২০১৫ সালে প্রতিষ্ঠিত বাংলাদেশের একটি শীর্ষস্থানীয় আন্তর্জাতিক বিজনেস গ্রুপ। গ্রুপটি চারটি মূল শিল্প বিভাগে পরিচালিত হয়: ই-কমার্স ও ডিজিটাল কমার্স, ট্রেডিং ও সোর্সিং (আমদানি-রপ্তানি), লজিস্টিকস ও সাপ্লাই চেইন, এবং ম্যানুফ্যাকচারিং ও প্রযুক্তি। ৭টিরও বেশি অঙ্গপ্রতিষ্ঠান, ৭টি দেশে কার্যক্রম এবং বিশ্বব্যাপী ১,০০০-এর অধিক পেশাদার কর্মী নিয়ে শারাবাংলা গ্রুপ বাংলাদেশকে বিশ্ব বাণিজ্যের সাথে সংযুক্ত করছে।',
    contentZh: '沙拉孟加拉集团（Sharabangla Group）于2015年在孟加拉国达卡成立，是一家致力于将孟加拉国深度连接至全球贸易的跨国综合产业集团。集团业务布局四大核心领域：电子商务与数字商业、国际贸易与源头采购（进出口）、物流与供应链管理、先进制造与工程技术。集团拥有7家以上核心企业，业务辐射7个国家，全球员工逾1,000人。',
    createdAt: 1700000001000,
    updatedAt: 1700000001000,
  },
  {
    id: 'kb-02-headquarters-offices',
    category: 'General',
    question: 'Where is Sharabangla Group headquarters and where are the registered offices located?',
    content: 'The global headquarters of Sharabangla Group is located at: 3rd, 4th & 5th Floor, House 50, Road-01, Sector-05, Uttara, Dhaka, Bangladesh. In addition to the Dhaka headquarters, Sharabangla Group operates registered overseas offices and regional trade bases in: Guangzhou (China), Kolkata (India), Dubai (UAE), New York (USA), Frankfurt (Germany).',
    contentBn: 'শারাবাংলা গ্রুপের গ্লোবাল হেডকোয়ার্টার বা প্রধান কার্যালয়ের ঠিকানা: ৩য়, ৪র্থ ও ৫ম তলা, হাউস ৫০, রোড-০১, সেক্টর-০৫, উত্তরা, ঢাকা, বাংলাদেশ। ঢাকা প্রধান কার্যালয় ছাড়াও গ্রুপটির নিবন্ধিত আন্তর্জাতিক শাখা ও বাণিজ্যিক ট্রেড অফিস রয়েছে: গুয়াংজু (চীন), কলকাতা (ভারত), দুবাই (সংযুক্ত আরব আমিরাত), নিউ ইয়র্ক (যুক্তরাষ্ট্র), ফ্রাঙ্কফুর্ট (জার্মানি)।',
    contentZh: '沙拉孟加拉集团全球总部地址为：3rd, 4th & 5th Floor, House 50, Road-01, Sector-05, Uttara, Dhaka, Bangladesh（孟加拉国达卡市乌塔拉第5区1号路50号3-5层）。除达卡总部外，集团在海外设有常设注册机构与经贸枢纽：Guangzhou (China), Kolkata (India), Dubai (UAE), New York (USA), Frankfurt (Germany)。',
    createdAt: 1700000002000,
    updatedAt: 1700000002000,
  },
  {
    id: 'kb-03-executive-leadership',
    category: 'General',
    question: 'Who is on the board of directors and executive leadership of Sharabangla Group?',
    content: 'Sharabangla Group is led by Chairman MD Kaiser Ali and Managing Director Muhammad Shoaibur Rahman. The executive leadership board also includes Directors Md. Altaf Hossen, Saikat Hossain, and Md. Mustain Billah (Director, Laobaan Bangladesh Ltd.). Together, the board guides the group\'s strategic investments, cross-border operations, and industrial manufacturing excellence.',
    contentBn: 'শারাবাংলা গ্রুপের নেতৃত্বে রয়েছেন মাননীয় চেয়ারম্যান এমডি কায়সার আলী এবং ব্যবস্থাপনা পরিচালক মুহাম্মদ শোয়াইবুর রহমান। নির্বাহী পরিচালনা পর্ষদে আরও রয়েছেন পরিচালক মোঃ আলতাফ হোসেন, সৈকত হোসেন এবং মোঃ মুস্তাইন বিল্লাহ (পরিচালক, লাউবান বাংলাদেশ লিমিটেড)।',
    contentZh: '沙拉孟加拉集团由董事长 MD Kaiser Ali 先生与董事总经理 Muhammad Shoaibur Rahman 先生统领。集团董事会成员还包括董事 Md. Altaf Hossen 先生、Saikat Hossain 先生以及 Md. Mustain Billah 先生（Laobaan 孟加拉有限公司董事）。',
    createdAt: 1700000003000,
    updatedAt: 1700000003000,
  },
  {
    id: 'kb-04-subsidiaries-overview',
    category: 'Companies',
    question: 'What companies and subsidiaries are part of Sharabangla Group?',
    content: 'Sharabangla Group operates seven primary subsidiary companies: 1) Laobaan Bangladesh (Cross-border B2B sourcing platform connecting Bangladesh with verified Chinese manufacturers); 2) Sharabangla Express (Tech-enabled nationwide express courier covering all 64 districts with 85+ hubs and air cargo chartering); 3) FuMao Bangladesh Technology Co., Ltd. (Joint-venture spunbond & meltblown non-woven fabric plant producing medical textiles & eco-bags); 4) BAC Venture (Strategic international merchant trading house specializing in RMG raw materials & commodity exports); 5) Sharabangla Down Products (Ethical washing, sterilization & export of premium down feather insulation); 6) Sharabangla.com (Flagship nationwide B2C multi-vendor e-commerce marketplace); 7) Shenova (Direct-to-consumer smart electronics, personal care gear, and contemporary lifestyle brand).',
    contentBn: 'শারাবাংলা গ্রুপের ৭টি প্রধান সহযোগী প্রতিষ্ঠান: ১. লাউবান বাংলাদেশ (চীন-বাংলাদেশ বিটুবি সরাসরি ফ্যাক্টরি সোর্সিং প্ল্যাটফর্ম); ২. শারাবাংলা এক্সপ্রেস (৬৪ জেলায় ৮৫+ হাবসহ এক্সপ্রেস লজিস্টিকস ও এয়ার কার্গো); ৩. ফুমাও বাংলাদেশ টেকনোলজি (নন-ওভেন ও সার্জিক্যাল মেল্টব্লোন মেডিকেল টেক্সটাইল কারখানা); ৪. বিএসি ভেঞ্চার (আরএমজি কাঁচামাল ও পণ্য রপ্তানি ট্রেডিং); ৫. শারাবাংলা ডাউন প্রোডাক্টস (পরিবেশবান্ধব ও জীবাণুমুক্ত প্রিমিয়াম ফেদার রপ্তানি); ৬. শারাবাংলা.কম (দেশব্যাপী বিটুসি ই-কমার্স মার্কেটপ্লেস); ৭. শেনোভা (স্মার্ট ইলেকট্রনিক্স ও লাইফস্টাইল ব্র্যান্ড)।',
    contentZh: '沙拉孟加拉集团旗下运营7家核心子公司：1. Laobaan 孟加拉（直连中国源头工厂的跨国B2B大宗采购平台）；2. 沙拉孟加拉速运 Sharabangla Express（覆盖孟加拉全境64县区的科技快递与航空包机网络）；3. 福茂孟加拉科技 FuMao Technology（医用口罩熔喷滤材与环保无纺布智能制造企业）；4. BAC Venture（服装纺织原料进口与大宗农产品出口商贸企业）；5. 沙拉孟加拉羽绒制品 Sharabangla Down Products（高端羽绒生态水洗与深加工出口）；6. Sharabangla.com（国家级B2C多商户电商平台）；7. Shenova 尚诺华（智能数码与现代生活零售品牌）。',
    createdAt: 1700000004000,
    updatedAt: 1700000004000,
  },
  {
    id: 'kb-05-laobaan-sourcing',
    category: 'Companies',
    question: 'What is Laobaan Bangladesh and how does it facilitate direct factory sourcing from China?',
    content: 'Laobaan Bangladesh is a specialized B2B sourcing platform connecting Bangladeshi businesses, factory owners, and wholesalers directly with verified tier-1 manufacturers in China (Guangdong, Zhejiang, Jiangsu). It eliminates third-party middlemen, provides pre-shipment factory audits and quality inspections, manages door-to-door customs clearance, and supports BDT L/C and secure escrow payment solutions.',
    contentBn: 'লাউবান বাংলাদেশ সরাসরি বাংলাদেশের শিল্পোদ্যোক্তা ও ব্যবসায়ীদের চীনের শীর্ষস্থানীয় উৎপাদন হাবগুলোর (গুয়াংজু, ঝেজিয়াং, জিয়াংসু) সাথে সংযুক্ত করে। এটি মধ্যস্বত্বভোগী দূর করে, ফ্যাক্টরি অডিট ও কোয়ালিটি কন্ট্রোল পরিদর্শন নিশ্চিত করে, কাস্টমস ক্লিয়ারেন্স পরিচালনা করে এবং স্থানীয় মুদ্রা টাকায় এল/সি ও সুরক্ষিত পেমেন্ট নিশ্চিত করে।',
    contentZh: 'Laobaan 孟加拉是沙拉孟加拉集团旗下的跨国B2B大宗采购平台，直连中国广东、浙江、江苏等沿海产业带源头工厂。平台消除中间商加价，提供验厂质检、门到门双清报关，并支持孟加拉塔卡（BDT）信用证结算与资金托管。',
    createdAt: 1700000005000,
    updatedAt: 1700000005000,
  },
  {
    id: 'kb-06-sharabangla-express',
    category: 'Logistics',
    question: 'What logistics, freight, and courier services does Sharabangla Express offer?',
    content: 'Sharabangla Express is a tech-driven logistics provider serving all 64 districts of Bangladesh through 85+ distribution hubs and 300+ transport vehicles. Key services include same-day express delivery in Dhaka, reliable nationwide Cash-on-Delivery (COD), dedicated Guangzhou-to-Dhaka air freight charters, bonded warehousing fulfillment, and developer-friendly real-time tracking APIs.',
    contentBn: 'শারাবাংলা এক্সপ্রেস বাংলাদেশের সকল ৬৪টি জেলায় ৮৫টিরও বেশি হাব ও ৩০০টির অধিক যানবাহনের মাধ্যমে বিস্তৃত ডেলিভারি নেটওয়ার্ক পরিচালনা করে। এর প্রধান সেবাসমূহের মধ্যে রয়েছে ঢাকায় সেম-ডে ডেলিভারি, সারা দেশে নির্ভরযোগ্য ক্যাশ অন ডেলিভারি (COD), গুয়াংজু-ঢাকা ডেডিকেটেড এয়ার কার্গো চাটার্ড এবং লাইভ ট্র্যাকিং এপিআই।',
    contentZh: '沙拉孟加拉速运（Sharabangla Express）在孟加拉国全境拥有85个分拨中心和300余辆专业运输车队，覆盖全部64个行政县区。业务涵盖达卡同城当日达、全国货到付款（COD）、广州-达卡定期航空货运包机、自动化仓储履约及开放API实时快件追踪。',
    createdAt: 1700000006000,
    updatedAt: 1700000006000,
  },
  {
    id: 'kb-07-fumao-technology',
    category: 'Manufacturing',
    question: 'What does FuMao Bangladesh Technology Co., Ltd. manufacture and where is the factory?',
    content: 'FuMao Bangladesh Technology Co., Ltd. is a modern Sino-Bangla joint-venture industrial plant located in Gazipur, near Dhaka, spanning an 85,000 sq ft facility. It manufactures spunbond non-woven polypropylene fabrics, medical and surgical mask meltblown filter media (BFE 99%), biodegradable eco-friendly shopping bag roll goods, and laminated technical textiles under ISO 9001 and ISO 14001 certifications.',
    contentBn: 'ফুমাও বাংলাদেশ টেকনোলজি গাজীপুরে অবস্থিত ৮৫,০০০ বর্গফুটের একটি আধুনিক যৌথ শিল্প কারখানা। এটি স্পানবন্ড পলিপ্রোপিলিন নন-ওভেন ফ্যাব্রিক, মেডিকেল ও সার্জিক্যাল মাস্কের মেল্টব্লোন ফিল্টার মিডিয়া (বিএফই ৯৯%), পরিবেশবান্ধব বায়োডিগ্রেডেবল ব্যাগ রোল এবং টেকনিক্যাল টেক্সটাইল তৈরি করে (আইএসও ৯০০১ ও ১৪০০১ সার্টিফায়েড)।',
    contentZh: '福茂孟加拉科技有限公司（FuMao Technology）系中孟合资现代化工业制造企业，工厂位于达卡近郊的加济布尔（Gazipur），厂房面积85,000平方英尺。专业生产聚丙烯纺粘（Spunbond）无纺布、医用外科级熔喷（Meltblown）滤材（BFE 99%）、可降解环保袋卷材及复合技术纺织品，通过 ISO 9001 及 ISO 14001 国际双体系认证。',
    createdAt: 1700000007000,
    updatedAt: 1700000007000,
  },
  {
    id: 'kb-08-bac-venture',
    category: 'Companies',
    question: 'What are the core trading activities of BAC Venture?',
    content: 'BAC Venture is the merchant trading arm of Sharabangla Group, operating across key import-export corridors. It specializes in the procurement and import of RMG raw materials, fabrics, garment accessories, industrial chemicals, and machinery from China and India into Bangladesh, while exporting high-grade agricultural commodities and finished leather to international buyers in Europe and the Middle East.',
    contentBn: 'বিএসি ভেঞ্চার শারাবাংলা গ্রুপের মার্চেন্ট ট্রেডিং অঙ্গপ্রতিষ্ঠান। এটি চীন ও ভারত থেকে তৈরি পোশাকের কাঁচামাল, ফ্যাব্রিক, গার্মেন্টস এক্সেসরিজ, ইন্ডাস্ট্রিয়াল কেমিক্যাল ও যন্ত্রপাতি আমদানি করে এবং ইউরোপ ও মধ্যপ্রাচ্যে উন্নতমানের কৃষি ও চামড়াজাত পণ্য রপ্তানি করে।',
    contentZh: 'BAC Venture 是沙拉孟加拉集团旗下的大宗进出口商贸公司。专业从事孟加拉成衣产业（RMG）原辅料、面料、工业化工原料及机械设备进口（主要来自中国与印度），并向欧洲、中东等海外市场出口高品质农产品及皮革制品。',
    createdAt: 1700000008000,
    updatedAt: 1700000008000,
  },
  {
    id: 'kb-09-down-products',
    category: 'Companies',
    question: 'What is Sharabangla Down Products and what are its export standards?',
    content: 'Sharabangla Down Products processes and exports ethically collected, environmentally washed, and high-temperature sterilized natural duck and goose down feather filling materials. Certified to international animal welfare and hygiene standards (OEKO-TEX, RDS), the company supplies luxury outerwear manufacturers, bedding brands, and winter garment producers in East Asia, Europe, and North America.',
    contentBn: 'শারাবাংলা ডাউন প্রোডাক্টস পরিবেশবান্ধব পদ্ধতিতে সংগৃহীত ও উচ্চ তাপমাত্রায় জীবাণুমুক্ত প্রাকৃতিক হাঁসের পালক বা ফেদার প্রসেসিং ও রপ্তানি করে। এটি আন্তর্জাতিক অ্যানিমেল ওয়েলফেয়ার ও হাইজিন মানদণ্ড মেনে পরিচালিত হয় এবং ইউরোপ, উত্তর আমেরিকা ও পূর্ব এশিয়ার আন্তর্জাতিক শীতবস্ত্র ও বেডিং ব্র্যান্ডগুলোতে সরবরাহ করা হয়।',
    contentZh: '沙拉孟加拉羽绒制品（Sharabangla Down Products）专业从事天然生态羽绒水洗、高温灭菌及分选加工。工厂严格遵循国际动物福利标准（RDS）及 OEKO-TEX 环保认证，向东亚、欧洲及北美的高端羽绒服饰、家纺及寝具生产商出口高蓬松度羽绒填充原料。',
    createdAt: 1700000009000,
    updatedAt: 1700000009000,
  },
  {
    id: 'kb-10-sharabangla-com',
    category: 'Companies',
    question: 'What features distinguish the Sharabangla.com marketplace?',
    content: 'Sharabangla.com is an open, nationwide multi-vendor B2C e-commerce platform offering verified merchant storefronts, multi-category retail (electronics, lifestyle, home goods, fashion), integrated digital payments (bKash, Nagad, cards), and doorstep nationwide fulfillment backed by Sharabangla Express.',
    contentBn: 'শারাবাংলা.কম একটি দেশব্যাপী মাল্টি-ভেন্ডর বিটুসি ই-কমার্স প্ল্যাটফর্ম। এখানে ভেরিফায়েড মার্চেন্ট শপ, ইলেকট্রনিক্স, ফ্যাশন, হোম অ্যাপ্লায়েন্স সহ বিভিন্ন ক্যাটাগরির পণ্য রয়েছে। এটি বিকাশ, নগদ, কার্ড পেমেন্ট সাপোর্ট করে এবং শারাবাংলা এক্সপ্রেসের মাধ্যমে সারা দেশে হোম ডেলিভারি দেয়।',
    contentZh: 'Sharabangla.com 是孟加拉国全国性综合多商户B2C电商平台。汇聚经过认证的品牌商家，涵盖数码家电、时尚服饰、家居百货等多品类商品，全面支持 bKash、Nagad 及银行卡线上支付，并由沙拉孟加拉速运提供全境极速配送保障。',
    createdAt: 1700000010000,
    updatedAt: 1700000010000,
  },
  {
    id: 'kb-11-shenova-lifestyle',
    category: 'Companies',
    question: 'What products does the Shenova brand offer?',
    content: 'Shenova is a direct-to-consumer (D2C) modern lifestyle brand focusing on affordable, premium consumer electronics, smart home gadgets, ergonomic workplace accessories, and personal grooming appliances tailored for the emerging urban consumer in South Asia.',
    contentBn: 'শেনোভা শারাবাংলা গ্রুপের একটি আধুনিক লাইফস্টাইল ও ইলেকট্রনিক্স ডিটুসি ব্র্যান্ড। এটি স্মার্ট হোম গ্যাজেটস, ওয়ার্কপ্লেস এক্সেসরিজ, অডিও ডিভাইস এবং পার্সোনাল গ্রুমিং প্রোডাক্ট সুলভ মূল্যে গ্রাহকদের কাছে পৌঁছে দেয়।',
    contentZh: 'Shenova（尚诺华）是沙拉孟加拉集团旗下的D2C现代科技生活品牌，专注于为南亚新兴年轻都市群体打造高品质、高性价比的智能数码、办公工学周边、个人护理及智能家居小家电产品。',
    createdAt: 1700000011000,
    updatedAt: 1700000011000,
  },
  {
    id: 'kb-12-china-sourcing-qc',
    category: 'Partnership',
    question: 'How does Sharabangla Group ensure quality control and fraud prevention for China imports?',
    content: 'Through Laobaan and regional offices in Guangzhou, Sharabangla Group deploys dedicated ground inspectors to conduct factory audits, business license verification, in-line production monitoring, and pre-shipment AQL 2.5 random sampling. Clients receive photographic and video inspection reports before any final balance is released.',
    contentBn: 'লাউবান এবং গুয়াংজু আঞ্চলিক অফিসের মাধ্যমে শারাবাংলা গ্রুপ সরাসরি অভিজ্ঞ পরিদর্শক দল মোতায়েন করে ফ্যাক্টরি অডিট, লাইসেন্স যাচাই এবং প্রি-শিপমেন্ট এউকিউএল ২.৫ কোয়ালিটি চেকিং নিশ্চিত করে। পণ্য রিলিজের আগে বিস্তারিত ছবি ও ভিডিও রিপোর্ট প্রদান করা হয়।',
    contentZh: '依托 Laobaan 平台与广州驻华代表处，沙拉孟加拉集团派驻专业品控工程师执行实地验厂、营业执照核验、产线抽检及出货前 AQL 2.5 抽样质检。客户在支付尾款前均可获得详尽图文与视频质检报告，从源头杜绝贸易欺诈风险。',
    createdAt: 1700000012000,
    updatedAt: 1700000012000,
  },
  {
    id: 'kb-13-logistics-timelines-cod',
    category: 'Logistics',
    question: 'What are delivery timelines and coverage details for domestic logistics?',
    content: 'Sharabangla Express guarantees same-day delivery within Dhaka for orders booked before 11:00 AM, next-day (24-hour) delivery across all divisional city hubs, and 48–72 hour delivery to remote upazilas and rural unions. Nationwide Cash-on-Delivery (COD) reconciliation is completed within 24 to 48 hours directly into merchants\' bank accounts or digital wallets.',
    contentBn: 'শারাবাংলা এক্সপ্রেস ঢাকায় সকাল ১১টার আগের অর্ডারে সেম-ডে ডেলিভারি, বিভাগীয় শহরগুলোতে ২৪ ঘণ্টার মধ্যে নেক্সট-ডে ডেলিভারি এবং প্রত্যন্ত উপজেলাগুলোতে ৪৮-৭২ ঘণ্টার মধ্যে ডেলিভারি দেয়। দেশব্যাপী ক্যাশ অন ডেলিভারি (সিওডি) সংগ্রহ করে ২৪-৪৮ ঘণ্টার মধ্যে মার্চেন্টের ব্যাংক বা ওয়ালেটে পাঠানো হয়।',
    contentZh: '沙拉孟加拉速运承诺：达卡市区当日上午11点前截单包裹可实现当日达；各大主要省会中心枢纽24小时次日达；偏远县乡区域48-72小时送达。全国货到付款（COD）代收货款在24-48小时内快速结算并汇入商户指定银行或数字钱包账户。',
    createdAt: 1700000013000,
    updatedAt: 1700000013000,
  },
  {
    id: 'kb-14-fumao-capacity-specs',
    category: 'Manufacturing',
    question: 'What is FuMao manufacturing capacity and technical specifications?',
    content: 'FuMao Bangladesh Technology operates multiple German-engineered continuous spunbond and high-velocity meltblown production lines with an annual output exceeding 6,000 metric tons of non-woven fabric. Available fabric weights range from 10 gsm to 150 gsm, with custom widths up to 3.2 meters, UV-stabilized treatments, hydrophilic coatings, and custom color masterbatch compounding.',
    contentBn: 'ফুমাও বাংলাদেশ টেকনোলজি বার্ষিক ৬,০০০ মেট্রিক টনেরও বেশি নন-ওভেন ফ্যাব্রিক উৎপাদন ক্ষমতা সম্পন্ন আধুনিক স্পানবন্ড ও মেল্টব্লোন লাইন পরিচালনা করে। এখানে ১০ জিএসএম থেকে ১৫০ জিএসএম পর্যন্ত ফেব্রিক এবং ৩.২ মিটার পর্যন্ত প্রস্থের কাস্টমাইজড ফ্যাব্রিক প্রস্তুত করা যায়।',
    contentZh: '福茂孟加拉科技拥有多条先进高速纺粘与高熔指熔喷复合无纺布生产线，年综合产能超过6,000公吨。产品克重范围涵盖 10 gsm 至 150 gsm，有效幅宽达3.2米，支持抗紫外线（UV）、亲水整理、防静电及定制色母粒配色加工。',
    createdAt: 1700000014000,
    updatedAt: 1700000014000,
  },
  {
    id: 'kb-15-careers-application',
    category: 'Careers',
    question: 'How can candidates apply for jobs at Sharabangla Group?',
    content: 'Candidates can review active vacancies on our Careers portal (/careers) and submit applications online, or email their updated resume with the role title in the subject line to: career@sharabangla.com or hr@sharabangla.com. The hiring process consists of resume screening, preliminary HR interview, technical or domain evaluation, and a final executive interview.',
    contentBn: 'প্রার্থীরা আমাদের ক্যারিয়ার পাতা (/careers) থেকে বর্তমান সার্কুলারগুলো দেখে অনলাইনে আবেদন করতে পারেন অথবা তাদের সিভি পাঠাতে পারেন: career@sharabangla.com বা hr@sharabangla.com ঠিকানায়। নিয়োগ প্রক্রিয়ার মধ্যে রয়েছে সিভি স্ক্রীনিং, এইচআর ইন্টারভিউ, টেকনিক্যাল অ্যাসেসমেন্ট এবং চূড়ান্ত ইন্টারভিউ।',
    contentZh: '求职者可登录官方招聘通道（/careers）查看热招岗位并在线投递，或将个人中英文简历（附岗位意向）直接发送至 career@sharabangla.com 或 hr@sharabangla.com。招聘流程通常包含简历初筛、HR综合面试、专业能力评估及高管终面环节。',
    createdAt: 1700000015000,
    updatedAt: 1700000015000,
  },
  {
    id: 'kb-16-contacts-offices',
    category: 'FAQ',
    question: 'What are the official contact numbers, emails, and office hours of Sharabangla Group?',
    content: 'Official Corporate Email: sharabangla.group@gmail.com | Phone: +880 1811 509999 | Headquarters Address: 3rd, 4th & 5th Floor, House 50, Road-01, Sector-05, Uttara, Dhaka, Bangladesh. Registered international offices operate in: Guangzhou (China), Kolkata (India), Dubai (UAE), New York (USA), Frankfurt (Germany). Corporate offices are open Sunday through Thursday from 9:00 AM to 6:00 PM (BST). Customer support and logistics dispatch operate 24/7.',
    contentBn: 'অফিসিয়াল কর্পোরেট ইমেইল: sharabangla.group@gmail.com | ফোন: +880 1811 509999 | প্রধান কার্যালয়ের ঠিকানা: ৩য়, ৪র্থ ও ৫ম তলা, হাউস ৫০, রোড-০১, সেক্টর-০৫, উত্তরা, ঢাকা, বাংলাদেশ। নিবন্ধিত আন্তর্জাতিক শাখা: গুয়াংজু (চীন), কলকাতা (ভারত), দুবাই (সংযুক্ত আরব আমিরাত), নিউ ইয়র্ক (যুক্তরাষ্ট্র), ফ্রাঙ্কফুর্ট (জার্মানি)। অফিস খোলার সময়: রবিবার থেকে বৃহস্পতিবার সকাল ৯:০০ টা থেকে সন্ধ্যা ৬:০০ টা।',
    contentZh: '官方企业邮箱：sharabangla.group@gmail.com | 联络电话：+880 1811 509999 | 全球总部地址：3rd, 4th & 5th Floor, House 50, Road-01, Sector-05, Uttara, Dhaka, Bangladesh。海外注册办事处：Guangzhou (China), Kolkata (India), Dubai (UAE), New York (USA), Frankfurt (Germany)。总部工作时间：每周日至周四上午 9:00 至下午 6:00（孟加拉时间）。客服与物流调度中心提供 7×24 小时全天候运营支持。',
    createdAt: 1700000016000,
    updatedAt: 1700000016000,
  }
];

/**
 * Fetch all knowledge entries from Firestore with graceful fallback to defaults
 */
export async function getChatbotKnowledgeFromFirestore(): Promise<ChatbotKnowledgeEntry[]> {
  try {
    const kbRef = collection(db, CHATBOT_KNOWLEDGE_COLLECTION);
    const snapshot = await getDocs(kbRef);

    if (snapshot.empty) {
      return defaultChatbotKnowledge;
    }

    const entries: ChatbotKnowledgeEntry[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as ChatbotKnowledgeEntry;
      entries.push({
        ...data,
        id: docSnap.id || data.id,
      });
    });

    return entries.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  } catch (error) {
    console.warn('Error fetching chatbot knowledge from Firestore, using default knowledge:', error);
    return defaultChatbotKnowledge;
  }
}

/**
 * Save or update a single knowledge entry in Firestore
 */
export async function saveChatbotKnowledgeToFirestore(entry: ChatbotKnowledgeEntry): Promise<void> {
  const id = entry.id?.trim() || `kb-${Date.now()}`;
  const now = Date.now();
  const entryToSave: ChatbotKnowledgeEntry = {
    id,
    category: entry.category?.trim() || 'General',
    question: entry.question?.trim() || '',
    content: entry.content?.trim() || '',
    contentBn: entry.contentBn?.trim() || '',
    contentZh: entry.contentZh?.trim() || '',
    createdAt: entry.createdAt || now,
    updatedAt: now,
  };

  const docRef = doc(db, CHATBOT_KNOWLEDGE_COLLECTION, id);
  await setDoc(docRef, entryToSave, { merge: true });
}

/**
 * Delete a knowledge entry from Firestore
 */
export async function deleteChatbotKnowledgeFromFirestore(id: string): Promise<void> {
  const docRef = doc(db, CHATBOT_KNOWLEDGE_COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Completely delete ALL documents in the chatbotKnowledge Firestore collection
 */
export async function clearAllChatbotKnowledgeFromFirestore(): Promise<number> {
  try {
    const kbRef = collection(db, CHATBOT_KNOWLEDGE_COLLECTION);
    const snapshot = await getDocs(kbRef);
    if (snapshot.empty) {
      return 0;
    }

    const batch = writeBatch(db);
    let count = 0;
    snapshot.forEach((docSnap) => {
      batch.delete(docSnap.ref);
      count++;
    });

    await batch.commit();
    return count;
  } catch (error) {
    console.error('Error clearing chatbot knowledge from Firestore:', error);
    throw error;
  }
}

/**
 * Seed all 16 exact default knowledge entries directly into Firestore without any AI modification.
 * Clears old collection first to guarantee clean literal data.
 */
export async function seedDefaultChatbotKnowledge(): Promise<ChatbotKnowledgeEntry[]> {
  try {
    // 1. Delete all existing docs
    await clearAllChatbotKnowledgeFromFirestore();

    // 2. Insert the 16 exact literal default entries
    const batch = writeBatch(db);
    for (const item of defaultChatbotKnowledge) {
      const docRef = doc(db, CHATBOT_KNOWLEDGE_COLLECTION, item.id);
      batch.set(docRef, item);
    }
    await batch.commit();
    return defaultChatbotKnowledge;
  } catch (error) {
    console.error('Error seeding default knowledge to Firestore:', error);
    throw error;
  }
}
