import { GoogleGenAI } from "@google/genai";
import { db } from "../lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { defaultChatbotKnowledge, ChatbotKnowledgeEntry } from "../services/chatbotService";
import { companies, openPositions, newsArticles, siteInfo } from "../data/site";

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  language?: string;
}

/**
 * Aggregates live Firestore data + static corporate knowledge into a structured context
 */
export async function assembleChatbotContext(): Promise<string> {
  let knowledgeDocs: ChatbotKnowledgeEntry[] = [];
  let jobsDocs: any[] = [];
  let newsDocs: any[] = [];
  let contactData: any = siteInfo;

  // 1. Fetch Chatbot Knowledge Base
  try {
    const kbSnap = await getDocs(collection(db, "chatbotKnowledge"));
    if (!kbSnap.empty) {
      knowledgeDocs = kbSnap.docs.map((d) => ({ id: d.id, ...d.data() } as ChatbotKnowledgeEntry));
    }
  } catch (e) {
    console.warn("Firestore fetch chatbotKnowledge failed or timed out, using fallback defaults:", e);
  }
  if (!knowledgeDocs || knowledgeDocs.length === 0) {
    knowledgeDocs = defaultChatbotKnowledge;
  }

  // 2. Fetch Live Job Circulars
  try {
    const jobsSnap = await getDocs(collection(db, "jobs"));
    if (!jobsSnap.empty) {
      jobsDocs = jobsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
  } catch (e) {
    console.warn("Firestore fetch jobs failed, using fallback:", e);
  }
  if (!jobsDocs || jobsDocs.length === 0) {
    jobsDocs = openPositions;
  }

  // 3. Fetch Recent News (limit to 5)
  try {
    const newsSnap = await getDocs(collection(db, "news"));
    if (!newsSnap.empty) {
      newsDocs = newsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
  } catch (e) {
    console.warn("Firestore fetch news failed, using fallback:", e);
  }
  if (!newsDocs || newsDocs.length === 0) {
    newsDocs = newsArticles;
  }
  const topNews = newsDocs.slice(0, 5);

  // 4. Fetch Contact Settings
  try {
    const contactSnap = await getDoc(doc(db, "settings", "siteInfo"));
    if (contactSnap.exists()) {
      contactData = contactSnap.data();
    }
  } catch (e) {
    // ignore, use siteInfo fallback
  }

  // Format Companies section
  const companiesContext = companies
    .map(
      (c) =>
        `- ${c.name} (${c.banglaName || ""} / ${c.zhName || ""}):
   Division: ${c.divisionName}
   Tagline: ${c.oneLiner}
   Overview: ${c.description}
   Key Offerings: ${c.keyOfferings?.join(", ")}
   Operating Markets: ${c.operatingMarkets?.join(", ")}
   Headquarters: ${c.headquarters}, Established: ${c.established}`
    )
    .join("\n\n");

  // Format Jobs section
  const jobsContext = jobsDocs
    .map(
      (j) =>
        `- Job Title: ${j.title} (${j.banglaTitle || ""})
   Department: ${j.department || "General"}
   Location: ${j.location || "Dhaka, Bangladesh"}
   Type: ${j.type || "Full-time"}
   Salary: ${j.salary || "Competitive / Negotiable"}
   Deadline: ${j.deadline || "Open until filled"}
   Vacancies: ${j.vacancy || "1"}`
    )
    .join("\n\n");

  // Format News section
  const newsContext = topNews
    .map(
      (n) =>
        `- Article: ${n.title} (${n.banglaTitle || ""})
   Date: ${n.date || "Recent"} | Category: ${n.category || "Corporate"}
   Summary: ${n.summary || ""}`
    )
    .join("\n\n");

  // Format Knowledge Base entries
  const knowledgeContext = knowledgeDocs
    .map((k, i) => {
      return `[KB Entry #${i + 1}]
Category: ${k.category}
${k.question ? `Question: ${k.question}\n` : ""}English Content: ${k.content}
${k.contentBn ? `Bangla Content: ${k.contentBn}\n` : ""}${k.contentZh ? `Chinese Content: ${k.contentZh}\n` : ""}`;
    })
    .join("\n\n");

  // Contact Context
  const contactContext = `
Corporate Email: ${contactData.email || "sharabangla.group@gmail.com"}
Phone: ${contactData.phone || "+880 1811 509999"}
Global Headquarters: 3rd, 4th & 5th Floor, House 50, Road-01, Sector-05, Uttara, Dhaka, Bangladesh
Registered Overseas Offices:
* Guangzhou (China) - East Asia Supply Hub
* Kolkata (India) - South Asia Trade Office
* Dubai (UAE) - Middle East Gateway
* New York (USA) - North America Hub
* Frankfurt (Germany) - European Trade Base
`;

  return `=== SHARABANGLA GROUP OFFICIAL KNOWLEDGE CONTEXT ===

--- 1. ENTERPRISE OVERVIEW & FOUNDING ---
Group Name: Sharabangla Group (সাড়াবাংলা গ্রুপ / 沙拉孟加拉集团)
Founded: 2015
Tagline: Connecting Bangladesh to Global Trade (বাংলাদেশকে বিশ্ব বাণিজ্যের সাথে যুক্ত করছে)
Group Leadership:
- Chairman: MD Kaiser Ali
- Managing Director: Muhammad Shoaibur Rahman
- Directors: Md. Altaf Hossen, Saikat Hossain, Md. Mustain Billah
Scale: 7+ group concerns, operations in 7 countries, 1,000+ professionals worldwide.
Core Pillars: E-Commerce & Digital Commerce, Trading & Sourcing (Export-Import), Logistics & Supply Chain, and Manufacturing & Technology.

--- 2. SUBSIDIARY COMPANIES & DIVISIONS ---
${companiesContext}

--- 3. VERIFIED KNOWLEDGE BASE & FREQUENTLY ASKED QUESTIONS (16 CORE ENTRIES) ---
${knowledgeContext}

--- 4. LIVE OPEN JOB CIRCULARS ---
${jobsContext}

--- 5. LATEST CORPORATE NEWS & PRESS COVERAGE ---
${newsContext}

--- 6. OFFICIAL CONTACT COORDINATES & REGISTERED OFFICES ---
${contactContext}
`;
}

/**
 * Handles incoming chat messages from the frontend widget.
 */
export async function handleChatMessage(body: ChatRequest): Promise<{ reply: string }> {
  const { message, history = [], language = "en" } = body;

  if (!message || !message.trim()) {
    return { reply: "Please enter a question or inquiry." };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not defined in the environment.");
    return {
      reply:
        "Our AI assistant is temporarily undergoing maintenance. Please contact us directly at sharabangla.group@gmail.com for immediate assistance.",
    };
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  const enterpriseContext = await assembleChatbotContext();

  const systemInstruction = `You are SBG Assistant, the official AI Corporate Assistant for Sharabangla Group (সাড়াবাংলা গ্রুপ / 沙拉孟加拉集团).
Your role is to assist website visitors, clients, international partners, and job seekers with accurate, authentic, and professional information about Sharabangla Group.

STRICT OPERATIONAL GUIDELINES:
1. GROUNDING & HONESTY: Answer ONLY using the provided verified enterprise knowledge base and live data below. NEVER invent, fabricate, speculate, or hallucinate facts, numbers, dates, services, or policies that are not explicitly stated in the context.
2. UNKNOWN INFORMATION PROTOCOL:
   If the answer to the visitor's question is not contained within the provided context, you MUST politely state that you do not have that specific information and direct them to the official email. Specifically respond:
   - In English: "I don't have specific information on that. Please contact us at sharabangla.group@gmail.com for further assistance."
   - In Bangla: "এ বিষয়ে আমার কাছে সুনির্দিষ্ট কোনো তথ্য নেই। বিস্তারিত তথ্যের জন্য অনুগ্রহ করে আমাদের সাথে sharabangla.group@gmail.com এ যোগাযোগ করুন।"
   - In Chinese: "关于该问题我暂时没有具体的官方记录信息。如需进一步协助，请发送邮件至 sharabangla.group@gmail.com 与我们联系。"
3. OUT-OF-SCOPE / UNRELATED INQUIRIES:
   If the user asks something entirely unrelated to Sharabangla Group (e.g. general trivia, coding homework, unrelated science/politics, recipes, other unrelated companies), politely decline to answer, state that you are SBG Assistant, and redirect them to contact info: sharabangla.group@gmail.com.
4. MULTILINGUAL MATCHING:
   Always respond in the exact same language the visitor writes in. If the visitor speaks English, respond in English. If they ask in Bengali (বাংলা), respond in natural, respectful Bengali. If they ask in Chinese (中文), respond in professional Simplified Chinese.
5. TONE & FORMATTING:
   Be polite, welcoming, executive, and concise. Use clean markdown bullet points where appropriate for lists (e.g. subsidiaries, job listings, contact details). Never use robotic greetings.

CONTEXT PROVIDED:
${enterpriseContext}
`;

  // Format previous history into Gemini contents format
  const formattedContents: Array<{ role: "user" | "model"; parts: [{ text: string }] }> = [];

  // Limit conversation history to last 10 messages to keep context focused
  const recentHistory = history.slice(-10);
  for (const item of recentHistory) {
    if (item.text && item.text.trim()) {
      formattedContents.push({
        role: item.role === "model" ? "model" : "user",
        parts: [{ text: item.text }],
      });
    }
  }

  // Append current user message
  formattedContents.push({
    role: "user",
    parts: [{ text: message.trim() }],
  });

  try {
    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.2, // low temperature for maximum factual precision
          maxOutputTokens: 1000,
        },
      });
    } catch (primaryErr: any) {
      console.warn("Primary gemini-3.8-flash failed, retrying with gemini-2.5-flash:", primaryErr?.message || primaryErr);
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.2,
          maxOutputTokens: 1000,
        },
      });
    }

    const reply = response.text?.trim() || "I don't have specific information on that. Please contact us at sharabangla.group@gmail.com for further assistance.";
    return { reply };
  } catch (error: any) {
    console.error("Gemini Chatbot API error:", error);
    return {
      reply:
        "I encountered a temporary connection issue. Please contact us directly at sharabangla.group@gmail.com or call +880 1711-234567.",
    };
  }
}
