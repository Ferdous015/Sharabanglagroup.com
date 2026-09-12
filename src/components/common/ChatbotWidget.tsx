import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Bot,
  X,
  Send,
  Sparkles,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Check,
  ChevronDown,
  Minimize2,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

// Helper to parse inline markdown (bold, italic, code, links)
function parseInlineMarkdown(text: string, isUser: boolean): React.ReactNode[] {
  // Regex to match **bold**, *italic*, `code`, [label](url), and raw URLs
  const regex = /(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\)|\`.*?\`|https?:\/\/[^\s]+)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;
    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong
          key={i}
          className={`font-semibold ${isUser ? 'text-white' : 'text-[#0E5C2E]'}`}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Italic: *text* (and not **)
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2 && !part.startsWith('**')) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    // Inline code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={i}
          className={`px-1 py-0.5 rounded text-[11px] font-mono ${
            isUser ? 'bg-black/20 text-white' : 'bg-[#EAF6EE] text-[#0E5C2E] border border-[#0E5C2E]/20'
          }`}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    // Markdown link: [text](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline underline-offset-2 font-medium ${
            isUser ? 'text-emerald-200 hover:text-white' : 'text-[#0E5C2E] hover:text-[#0A4724]'
          }`}
        >
          {linkMatch[1]}
        </a>
      );
    }
    // Raw URL
    if (part.startsWith('http://') || part.startsWith('https://')) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline underline-offset-2 font-medium break-all ${
            isUser ? 'text-emerald-200 hover:text-white' : 'text-[#0E5C2E] hover:text-[#0A4724]'
          }`}
        >
          {part}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

// Component to parse and render formatted markdown text (paragraphs, bullet lists, numbered lists)
const FormattedChatMessage: React.FC<{ content: string; isUser: boolean }> = ({
  content,
  isUser,
}) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: React.ReactNode[] } | null = null;

  const flushList = (key: string | number) => {
    if (currentList) {
      if (currentList.type === 'ul') {
        elements.push(
          <ul key={`list-${key}`} className="my-1.5 space-y-1 pl-0.5">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                    isUser ? 'bg-white/80' : 'bg-[#1E9B4C]'
                  }`}
                />
                <span className="flex-1 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`list-${key}`} className="my-1.5 space-y-1 pl-0.5">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span
                  className={`font-semibold shrink-0 text-[11px] ${
                    isUser ? 'text-white/80' : 'text-[#0E5C2E]'
                  }`}
                >
                  {idx + 1}.
                </span>
                <span className="flex-1 leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
        );
      }
      currentList = null;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Check for bullet list item: - or *
    const bulletMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList(idx);
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(parseInlineMarkdown(bulletMatch[1], isUser));
      return;
    }

    // Check for numbered list item: 1. or 1)
    const numberedMatch = trimmed.match(/^\d+[\.\)]\s+(.*)$/);
    if (numberedMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList(idx);
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(parseInlineMarkdown(numberedMatch[1], isUser));
      return;
    }

    // Normal paragraph or empty line
    flushList(idx);
    if (trimmed === '') {
      elements.push(<div key={`spacer-${idx}`} className="h-1.5" />);
    } else {
      elements.push(
        <p key={`p-${idx}`} className="leading-relaxed">
          {parseInlineMarkdown(line, isUser)}
        </p>
      );
    }
  });

  flushList('final');

  return <div className="space-y-1 break-words">{elements}</div>;
};

const SUGGESTIONS = {
  en: [
    'What companies are in the group?',
    'Are there any open job circulars?',
    'What services does Sharabangla Express provide?',
    'How does Laobaan Sourcing work?',
    'What does FuMao Plastics manufacture?',
    'What is the official contact info?',
  ],
  bn: [
    'সাড়াবাংলা গ্রুপে কোন কোন প্রতিষ্ঠান আছে?',
    'বর্তমানে কি কোনো চাকুরীর বিজ্ঞপ্তি আছে?',
    'সাড়াবাংলা এক্সপ্রেসের সেবা কী কী?',
    'লাওবান সোর্সিংয়ের মাধ্যমে কীভাবে সরাসরি আমদানি করব?',
    'ফুমাও প্লাস্টিকের কারখানা সম্পর্কে বলুন',
    'প্রধান কার্যালয়ের যোগাযোগের তথ্য কী?',
  ],
  zh: [
    '集团旗下有哪些子公司及核心业务？',
    '目前有哪些正在招聘的职位？',
    '沙拉孟加拉特快（Express）提供哪些物流服务？',
    '老板采购（Laobaan Sourcing）如何运作？',
    '福茂塑料工业（FuMao）主要生产什么？',
    '如何联系集团总部与商务部门？',
  ],
};

const WELCOME_MESSAGES = {
  en: "Hello! I am the SBG Assistant. How can I help you today? Ask me anything about our sister companies, international logistics, career vacancies, FuMao manufacturing, or contact coordinates.",
  bn: "আসসালামু আলাইকুম! আমি SBG Assistant। আমাদের প্রতিষ্ঠানসমূহ, আন্তর্জাতিক লজিস্টিকস, ক্যারিয়ার নিয়োগ, ম্যানুফ্যাকচারিং বা যোগাযোগের তথ্যের জন্য আমাকে নির্দ্বিধায় প্রশ্ন করুন।",
  zh: "您好！我是 SBG Assistant。您可以向我咨询旗下子公司业务、国际物流专线、最新招聘岗位、中国直采合作或联系方式。",
};

const PLACEHOLDERS = {
  en: "Ask about companies, jobs, logistics, contacts...",
  bn: "প্রতিষ্ঠান, চাকুরীর বিজ্ঞপ্তি, বা যোগাযোগ সম্পর্কে লিখুন...",
  zh: "咨询公司业务、招聘职位、物流、联系方式...",
};

export const ChatbotWidget: React.FC = () => {
  const location = useLocation();
  const { lang } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, 'up' | 'down'>>({});
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return [
      {
        id: 'welcome',
        role: 'model',
        text: WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en,
        timestamp: time,
      },
    ];
  });

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever messages arrive, loading state changes, or chat opens
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior, block: 'end' });
    }
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Immediate scroll followed by a smooth tick to accommodate dynamic text layout
      scrollToBottom('auto');
      const timer = setTimeout(() => scrollToBottom('smooth'), 60);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Update initial welcome message if language changes before user interacts
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === 'model' && prev[0].id.startsWith('welcome')) {
        return [
          {
            ...prev[0],
            text: WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en,
          },
        ];
      }
      return prev;
    });
  }, [lang]);

  const handleFeedback = (messageId: string, type: 'up' | 'down') => {
    setFeedback((prev) => {
      const current = prev[messageId];
      const next = current === type ? undefined : type;
      const updated = { ...prev };
      if (next) {
        updated[messageId] = next;
      } else {
        delete updated[messageId];
      }
      return updated;
    });

    setFeedbackToast(messageId);
    setTimeout(() => {
      setFeedbackToast((cur) => (cur === messageId ? null : cur));
    }, 2200);
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || inputMessage).trim();
    if (!textToSend || isLoading) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare history formatted for the backend
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          language: lang,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "I don't have specific information on that. Please contact us at sharabangla.group@gmail.com for further assistance.";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        text:
          lang === 'bn'
            ? 'সাময়িক ত্রুটি দেখা দিয়েছে। বিস্তারিত তথ্যের জন্য অনুগ্রহ করে আমাদের সাথে sharabangla.group@gmail.com এ যোগাযোগ করুন।'
            : lang === 'zh'
            ? '连接出现临时问题。如需进一步协助，请直接联系 sharabangla.group@gmail.com。'
            : "I am having trouble connecting right now. Please contact us directly at sharabangla.group@gmail.com for assistance.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en,
        timestamp: time,
      },
    ]);
    setInputMessage('');
    setFeedback({});
    setFeedbackToast(null);
  };

  const currentSuggestions = SUGGESTIONS[lang] || SUGGESTIONS.en;

  // Exclude widget from admin console routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        {!isOpen ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open SBG Assistant"
            className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-[#0E5C2E] hover:bg-[#0A4724] text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-white/80 cursor-pointer"
          >
            {/* Pulsing ring indicator */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E9B4C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#1E9B4C] border-2 border-white"></span>
            </span>

            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            </div>

            <span className="text-xs font-bold font-heading tracking-wide pr-1 hidden sm:inline">
              SBG Assistant
            </span>
          </button>
        ) : null}
      </div>

      {/* Expanded Chat Window - Fully mobile responsive */}
      {isOpen && (
        <div
          className="fixed inset-x-2 bottom-2 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1rem)] sm:w-96 md:w-[420px] h-[calc(100dvh-1rem)] sm:h-[580px] max-h-[92dvh] sm:max-h-[85vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E2E8E4] flex flex-col overflow-hidden animate-scaleUp font-sans overscroll-contain"
          role="dialog"
          aria-label="SBG Assistant"
        >
          {/* Header */}
          <div className="bg-[#0E5C2E] text-white p-3.5 sm:p-4 flex items-center justify-between shadow-xs select-none shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/15 flex items-center justify-center border border-white/20 shrink-0">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold font-heading tracking-tight leading-none">
                    SBG Assistant
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-emerald-100/80 mt-1 leading-none flex items-center gap-1">
                  <span>Verified Corporate Knowledge</span>
                  <span>•</span>
                  <span className="uppercase text-[9px] font-bold tracking-wider px-1 py-0.2 bg-white/10 rounded">
                    {lang}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Notice / Info strip */}
          <div className="bg-[#F0F7F2] border-b border-[#E2E8E4] px-3.5 py-1.5 flex items-center justify-between text-[11px] text-[#0E5C2E] shrink-0">
            <span className="truncate">
              ⚡ Grounded in real-time knowledge & live job circulars
            </span>
            <a
              href="mailto:sharabangla.group@gmail.com"
              className="font-bold underline ml-2 shrink-0 hover:text-[#0A4724]"
            >
              Email Us
            </a>
          </div>

          {/* Messages Scroll Area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 bg-[#FAFCFB] scrollbar-thin scrollbar-thumb-gray-200"
          >
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`flex items-end gap-2 max-w-[90%] sm:max-w-[85%] ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-lg bg-[#EAF6EE] text-[#0E5C2E] border border-[#0E5C2E]/20 flex items-center justify-center shrink-0 mb-1">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`rounded-2xl p-3 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-[#0E5C2E] text-white rounded-br-xs shadow-xs'
                          : 'bg-white text-[#2B2B2B] border border-[#E2E8E4] rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      <FormattedChatMessage content={msg.text} isUser={isUser} />

                      {/* Consistent Timestamp styling */}
                      <div
                        className={`text-[10px] mt-1.5 font-mono tracking-tight ${
                          isUser ? 'text-emerald-200/90 text-right' : 'text-[#8C95A6] text-left'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>

                  {/* AI Response Feedback (Thumbs up / Thumbs down) */}
                  {!isUser && (
                    <div className="flex items-center gap-1.5 mt-1 ml-9 select-none">
                      <button
                        type="button"
                        onClick={() => handleFeedback(msg.id, 'up')}
                        className={`p-1 rounded-md transition-colors cursor-pointer ${
                          feedback[msg.id] === 'up'
                            ? 'text-[#0E5C2E] bg-[#EAF6EE]'
                            : 'text-[#8C95A6] hover:text-[#0E5C2E] hover:bg-black/5'
                        }`}
                        title="Helpful answer"
                        aria-label="Helpful"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFeedback(msg.id, 'down')}
                        className={`p-1 rounded-md transition-colors cursor-pointer ${
                          feedback[msg.id] === 'down'
                            ? 'text-amber-700 bg-amber-50'
                            : 'text-[#8C95A6] hover:text-amber-700 hover:bg-black/5'
                        }`}
                        title="Not helpful"
                        aria-label="Not helpful"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>

                      {feedbackToast === msg.id && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#0E5C2E] font-medium bg-[#EAF6EE] px-2 py-0.5 rounded-full animate-fadeIn border border-[#0E5C2E]/15">
                          <Check className="w-3 h-3" />
                          <span>Thanks for your feedback!</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Smooth Brand-Green 3-Dot Bounce Typing Indicator */}
            {isLoading && (
              <div className="flex items-end gap-2 justify-start animate-fadeIn">
                <div className="w-7 h-7 rounded-lg bg-[#EAF6EE] text-[#0E5C2E] border border-[#0E5C2E]/20 flex items-center justify-center shrink-0 mb-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-[#E2E8E4] rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-2xs flex items-center gap-2.5">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#0E5C2E] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-[#0E5C2E] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-[#0E5C2E] animate-bounce" />
                  </div>
                  <span className="text-[11px] text-[#5A6170] font-medium">
                    SBG Assistant is thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions Bar */}
          <div className="bg-white border-t border-[#E2E8E4] px-3 py-2 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-bold text-[#8C95A6] uppercase whitespace-nowrap pl-1">
              Ask:
            </span>
            {currentSuggestions.slice(0, 4).map((sugg, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(sugg)}
                disabled={isLoading}
                className="px-2.5 py-1 text-[11px] font-medium text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] border border-[#0E5C2E]/20 rounded-full whitespace-nowrap transition-colors disabled:opacity-50 cursor-pointer shrink-0"
              >
                {sugg}
              </button>
            ))}
          </div>

          {/* Input Bar - Fixed to bottom */}
          <div className="p-3 bg-white border-t border-[#E2E8E4] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={PLACEHOLDERS[lang] || PLACEHOLDERS.en}
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] focus:outline-none focus:border-[#0E5C2E] focus:bg-white text-[#2B2B2B] transition-colors disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-[#0E5C2E] hover:bg-[#0A4724] disabled:bg-gray-200 text-white disabled:text-gray-400 flex items-center justify-center transition-colors cursor-pointer shadow-xs shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-[#8C95A6]">
              <span>Powered by Gemini 3.8 AI</span>
              <span>Direct: sharabangla.group@gmail.com</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
