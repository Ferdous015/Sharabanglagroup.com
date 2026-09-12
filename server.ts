import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { handleChatMessage } from "./src/server/chatHandler";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini client lazy/safely
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI-powered Translation API for Job Circulars
  app.post("/api/gemini/translate-job", async (req, res) => {
    try {
      const ai = getGeminiClient();

      const {
        title = "",
        department = "",
        location = "",
        type = "",
        experience = "",
        salary = "",
        vacancy = "",
        description = "",
        requirements = []
      } = req.body;

      if (!title && !description && (!requirements || requirements.length === 0)) {
        return res.status(400).json({
          error: "Please provide at least a job title, description, or requirements to translate."
        });
      }

      const reqArray: string[] = Array.isArray(requirements)
        ? requirements.filter((r: any) => typeof r === 'string' && r.trim() !== '')
        : [];

      const prompt = `You are an expert corporate HR translator for Sharabangla Group, an international business group operating in trade, manufacturing, logistics, and global sourcing.
Translate the following English job circular fields into natural, professional, high-standard corporate Bangla (বাংলা) and Simplified Chinese (中文).

Translation Requirements:
1. Tone & Style: High-level corporate and recruitment terminology appropriate for executive and operational job postings in Bangladesh (for Bangla) and global Chinese enterprises (for Chinese).
2. Accuracy: Preserve all numbers, percentages, currency symbols (e.g. ৳, $, ¥), company names, and technical terms accurately.
3. Requirements List: Translate each requirement item preserving the exact count and list order.
4. Idiomatic: Use standard business phraseology (e.g. "আলোচনা সাপেক্ষ" for "Negotiable", "ফুল-টাইম / পূর্ণকালীন" for "Full-time", "面议 / 具有竞争力" for "Negotiable / Competitive", "全职" for "Full-time").

Fields to Translate:
- Title: ${title || 'N/A'}
- Department: ${department || 'N/A'}
- Location: ${location || 'N/A'}
- Job Type: ${type || 'N/A'}
- Experience: ${experience || 'N/A'}
- Salary: ${salary || 'N/A'}
- Vacancy: ${vacancy || 'N/A'}
- Description: ${description || 'N/A'}
- Key Requirements:
${reqArray.length > 0 ? reqArray.map((r, i) => `${i + 1}. ${r}`).join('\n') : 'None'}
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              bangla: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  department: { type: Type.STRING },
                  location: { type: Type.STRING },
                  type: { type: Type.STRING },
                  experience: { type: Type.STRING },
                  salary: { type: Type.STRING },
                  vacancy: { type: Type.STRING },
                  description: { type: Type.STRING },
                  requirements: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["title", "department", "location", "type", "experience", "salary", "vacancy", "description", "requirements"]
              },
              chinese: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  department: { type: Type.STRING },
                  location: { type: Type.STRING },
                  type: { type: Type.STRING },
                  experience: { type: Type.STRING },
                  salary: { type: Type.STRING },
                  vacancy: { type: Type.STRING },
                  description: { type: Type.STRING },
                  requirements: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["title", "department", "location", "type", "experience", "salary", "vacancy", "description", "requirements"]
              }
            },
            required: ["bangla", "chinese"]
          }
        }
      });

      const rawJson = response.text?.trim() || "{}";
      const translations = JSON.parse(rawJson);

      return res.json({
        success: true,
        translations
      });
    } catch (err: any) {
      console.error("AI Translation error:", err);
      return res.status(500).json({
        error: err.message || "Failed to translate job circular with Gemini AI."
      });
    }
  });

  // AI-powered Translation API for News Articles & Press Releases
  app.post("/api/gemini/translate-news", async (req, res) => {
    try {
      const ai = getGeminiClient();

      const {
        title = "",
        category = "",
        summary = "",
        type = "news",
        content = []
      } = req.body;

      if (!title && !summary && (!content || content.length === 0)) {
        return res.status(400).json({
          error: "Please provide at least an article title, summary, or content paragraphs to translate."
        });
      }

      const contentParagraphs: string[] = Array.isArray(content)
        ? content.filter((p: any) => typeof p === 'string' && p.trim() !== '')
        : [];

      const prompt = `You are an expert corporate communications & news journalist translator for Sharabangla Group, an international conglomerate operating across cross-border e-commerce, air cargo logistics, manufacturing, and global sourcing.
Translate the following English news/press release fields into natural, journalistic, high-standard corporate Bangla (বাংলা) and Simplified Chinese (中文).

Translation Requirements:
1. Journalistic Standard: Professional, authoritative tone suitable for national news outlets, business journals, and corporate press releases.
2. Accuracy: Maintain exact names of subsidiaries (e.g. Laobaan Bangladesh, Sharabangla Express, BAC Venture, FuMao Bangladesh Technology Co., Ltd.), figures, dates, locations, and quotations.
3. Content Paragraphs: Translate each paragraph in the content array preserving the exact paragraph sequence.
4. Type/Category: Provide natural Bangla and Chinese equivalents for the article type (${type}) and category (${category}).

Article Inputs:
- Title: ${title || 'N/A'}
- Category: ${category || 'N/A'}
- Type: ${type || 'news'}
- Summary: ${summary || 'N/A'}
- Paragraphs:
${contentParagraphs.length > 0 ? contentParagraphs.map((p, i) => `[Paragraph ${i + 1}]: ${p}`).join('\n\n') : 'None'}
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              bangla: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  category: { type: Type.STRING },
                  type: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  content: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["title", "category", "type", "summary", "content"]
              },
              chinese: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  category: { type: Type.STRING },
                  type: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  content: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["title", "category", "type", "summary", "content"]
              }
            },
            required: ["bangla", "chinese"]
          }
        }
      });

      const rawJson = response.text?.trim() || "{}";
      const translations = JSON.parse(rawJson);

      return res.json({
        success: true,
        translations
      });
    } catch (err: any) {
      console.error("AI News Translation error:", err);
      return res.status(500).json({
        error: err.message || "Failed to translate news article with Gemini AI."
      });
    }
  });

  // AI-powered Translation API for Global Testimonials
  app.post("/api/gemini/translate-testimonial", async (req, res) => {
    try {
      const ai = getGeminiClient();

      const {
        name = "",
        title = "",
        company = "",
        market = "",
        quote = "",
      } = req.body;

      if (!name && !title && !quote) {
        return res.status(400).json({
          error: "Please provide at least a name, title, or quote to translate."
        });
      }

      const prompt = `You are an expert corporate communications translator for Sharabangla Group.
Translate the following English testimonial fields from a global partner into natural, elegant corporate Bangla (বাংলা) and Simplified Chinese (中文).

Translation Requirements:
1. Names: Provide proper phonetic transliterations in Bengali script (e.g. Li Wei -> লি ওয়েই, Sarah Mitchell -> সারাহ মিচেল) and standard Chinese Hanzi characters (e.g. Li Wei -> 李伟, Sarah Mitchell -> 萨拉·米切尔).
2. Professional Titles: Natural corporate executive titles (e.g. "Managing Director" -> "ম্যানেজিং ডিরেক্টর" / "总经理", "Global Sourcing Director" -> "গ্লোবাল সোর্সিং ডিরেক্টর" / "全球采购总监").
3. Companies & Markets: Natural transliteration / translations for international organizations and global trade hubs.
4. Quotes: Expressive, professional, and authentic business testimonials praising trust, reliability, supply chain excellence, and compliance.

Inputs:
- Name: ${name || 'N/A'}
- Title: ${title || 'N/A'}
- Company: ${company || 'N/A'}
- Market: ${market || 'N/A'}
- Quote: ${quote || 'N/A'}
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              bangla: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  title: { type: Type.STRING },
                  company: { type: Type.STRING },
                  market: { type: Type.STRING },
                  quote: { type: Type.STRING },
                },
                required: ["name", "title", "company", "market", "quote"]
              },
              chinese: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  title: { type: Type.STRING },
                  company: { type: Type.STRING },
                  market: { type: Type.STRING },
                  quote: { type: Type.STRING },
                },
                required: ["name", "title", "company", "market", "quote"]
              }
            },
            required: ["bangla", "chinese"]
          }
        }
      });

      const rawJson = response.text?.trim() || "{}";
      const translations = JSON.parse(rawJson);

      return res.json({
        success: true,
        translations
      });
    } catch (err: any) {
      console.error("AI Testimonial Translation error:", err);
      return res.status(500).json({
        error: err.message || "Failed to translate testimonial with Gemini AI."
      });
    }
  });

  // Chatbot Assistant API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, language } = req.body;
      if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ error: "Message text is required." });
      }

      const result = await handleChatMessage({
        message,
        history: Array.isArray(history) ? history : [],
        language: typeof language === "string" ? language : "en",
      });

      return res.json({
        success: true,
        reply: result.reply,
      });
    } catch (err: any) {
      console.error("Server /api/chat error:", err);
      return res.status(500).json({
        error: err.message || "Internal chatbot error",
        reply: "I am having trouble connecting right now. Please contact us at sharabangla.group@gmail.com for assistance.",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
