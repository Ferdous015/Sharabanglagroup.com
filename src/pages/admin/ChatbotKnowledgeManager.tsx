import React, { useState, useEffect } from 'react';
import {
  Bot,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  Globe,
  Sparkles,
  Database,
  RefreshCw,
  FolderOpen,
  MessageSquare,
  HelpCircle,
  Check,
  ChevronDown,
  ChevronRight,
  Layers,
  X
} from 'lucide-react';
import {
  ChatbotKnowledgeEntry,
  getChatbotKnowledgeFromFirestore,
  saveChatbotKnowledgeToFirestore,
  deleteChatbotKnowledgeFromFirestore,
  clearAllChatbotKnowledgeFromFirestore,
  seedDefaultChatbotKnowledge,
  defaultChatbotKnowledge,
} from '../../services/chatbotService';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { ToastNotification, ToastMessage } from '../../components/admin/ToastNotification';

const PRESET_CATEGORIES = [
  'General',
  'Companies',
  'Careers',
  'Partnership',
  'Logistics',
  'Manufacturing',
  'FAQ',
];

export const ChatbotKnowledgeManager: React.FC = () => {
  const [entries, setEntries] = useState<ChatbotKnowledgeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<ChatbotKnowledgeEntry>>({
    category: 'General',
    question: '',
    content: '',
    contentBn: '',
    contentZh: '',
  });
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'bn' | 'zh'>('en');
  const [isSaving, setIsSaving] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  // Confirm delete modal
  const [deleteTarget, setDeleteTarget] = useState<ChatbotKnowledgeEntry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Confirm seed modal
  const [isSeedModalOpen, setIsSeedModalOpen] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Confirm clear all modal
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [isClearingAll, setIsClearingAll] = useState(false);

  const showToast = (type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      message,
      title,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loadKnowledge = async () => {
    try {
      setLoading(true);
      const data = await getChatbotKnowledgeFromFirestore();
      setEntries(data);
    } catch (error) {
      console.error('Error loading chatbot knowledge:', error);
      showToast('error', 'Failed to load chatbot knowledge base entries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKnowledge();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentEntry({
      id: `kb-${Date.now()}`,
      category: 'General',
      question: '',
      content: '',
      contentBn: '',
      contentZh: '',
    });
    setActiveLangTab('en');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (entry: ChatbotKnowledgeEntry) => {
    setIsEditing(true);
    setCurrentEntry({ ...entry });
    setActiveLangTab('en');
    setIsFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEntry.content?.trim()) {
      showToast('warning', 'Please provide the answer/content text in English.');
      setActiveLangTab('en');
      return;
    }

    try {
      setIsSaving(true);
      const entryToSave: ChatbotKnowledgeEntry = {
        id: currentEntry.id || `kb-${Date.now()}`,
        category: currentEntry.category || 'General',
        question: currentEntry.question || '',
        content: currentEntry.content || '',
        contentBn: currentEntry.contentBn || '',
        contentZh: currentEntry.contentZh || '',
        createdAt: currentEntry.createdAt || Date.now(),
        updatedAt: Date.now(),
      };

      await saveChatbotKnowledgeToFirestore(entryToSave);
      showToast('success', isEditing ? 'Knowledge entry updated successfully.' : 'Knowledge entry added successfully.');
      setIsFormOpen(false);
      await loadKnowledge();
    } catch (error) {
      console.error('Error saving entry:', error);
      showToast('error', 'Failed to save knowledge entry to Firestore.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteChatbotKnowledgeFromFirestore(deleteTarget.id);
      showToast('success', 'Knowledge entry removed from Firestore.');
      setDeleteTarget(null);
      await loadKnowledge();
    } catch (error) {
      console.error('Error deleting entry:', error);
      showToast('error', 'Failed to delete entry.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClearAllConfirm = async () => {
    try {
      setIsClearingAll(true);
      const count = await clearAllChatbotKnowledgeFromFirestore();
      showToast('success', `Completely cleared all ${count} knowledge documents from Firestore.`);
      setIsClearAllModalOpen(false);
      await loadKnowledge();
    } catch (error) {
      console.error('Error clearing knowledge:', error);
      showToast('error', 'Failed to clear knowledge base from Firestore.');
    } finally {
      setIsClearingAll(false);
    }
  };

  const handleSeedDefaults = async () => {
    try {
      setIsSeeding(true);
      await seedDefaultChatbotKnowledge();
      showToast('success', `Directly seeded ${defaultChatbotKnowledge.length} official verified knowledge entries into Firestore.`);
      setIsSeedModalOpen(false);
      await loadKnowledge();
    } catch (error) {
      console.error('Error seeding knowledge:', error);
      showToast('error', 'Failed to seed knowledge base.');
    } finally {
      setIsSeeding(false);
    }
  };

  // Quick AI translation for knowledge fields
  const handleAutoTranslate = async () => {
    if (!currentEntry.content?.trim() && !currentEntry.question?.trim()) {
      showToast('warning', 'Please enter question or content text in English first.');
      return;
    }

    try {
      setIsTranslating(true);
      const res = await fetch('/api/gemini/translate-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: currentEntry.question || '',
          summary: currentEntry.content || '',
          category: currentEntry.category || 'General',
          type: 'knowledge',
          content: [],
        }),
      });

      if (!res.ok) {
        throw new Error(`Translation API error (${res.status})`);
      }

      const data = await res.json();
      if (data.success && data.translations) {
        const { bangla, chinese } = data.translations;
        setCurrentEntry((prev) => ({
          ...prev,
          contentBn: bangla?.summary || prev.contentBn,
          contentZh: chinese?.summary || prev.contentZh,
        }));
        showToast('success', 'Generated Bangla & Chinese translations with Gemini AI!');
      } else {
        throw new Error(data.error || 'Translation failed');
      }
    } catch (err: any) {
      console.error('Auto-translate error:', err);
      showToast('error', err.message || 'Auto-translate failed.');
    } finally {
      setIsTranslating(false);
    }
  };

  // Distinct categories from entries
  const allCategories = ['All', ...Array.from(new Set([...PRESET_CATEGORIES, ...entries.map((e) => e.category)]))];

  // Filtering
  const filteredEntries = entries.filter((entry) => {
    const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesQuery =
      (entry.question && entry.question.toLowerCase().includes(query)) ||
      entry.content.toLowerCase().includes(query) ||
      (entry.contentBn && entry.contentBn.toLowerCase().includes(query)) ||
      (entry.contentZh && entry.contentZh.toLowerCase().includes(query)) ||
      entry.category.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  // Grouped by category for organized view
  const groupedEntries: Record<string, ChatbotKnowledgeEntry[]> = {};
  filteredEntries.forEach((entry) => {
    const cat = entry.category || 'General';
    if (!groupedEntries[cat]) groupedEntries[cat] = [];
    groupedEntries[cat].push(entry);
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Toast Notification Container */}
      <ToastNotification toasts={toasts} onDismiss={handleDismissToast} />

      {/* Top Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8E4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF6EE] text-[#0E5C2E] text-xs font-bold mb-3 border border-[#0E5C2E]/20">
            <Bot className="w-3.5 h-3.5" />
            <span>AI Knowledge Base Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#0E5C2E] tracking-tight">
            Chatbot Knowledge Base
          </h1>
          <p className="mt-1 text-sm text-[#5A6170] max-w-2xl leading-relaxed">
            Manage the knowledge documents, FAQ answers, and multilingual corporate information that powers the SBG Assistant chatbot.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsClearAllModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-all cursor-pointer shadow-xs"
            title="Delete all documents from chatbotKnowledge collection"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSeedModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] border border-[#0E5C2E]/20 transition-all cursor-pointer shadow-xs"
            title="Seed 16 hardcoded default knowledge base entries into Firestore"
          >
            <Database className="w-4 h-4" />
            <span>Seed Defaults (16 Entries)</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Entry</span>
          </button>
        </div>
      </div>

      {/* Verified Corporate Reference Strip */}
      <div className="bg-[#F0F7F2] p-4 rounded-2xl border border-[#0E5C2E]/20 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-[#0E5C2E]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#1E9B4C]" />
            <span>Verified Official Headquarters:</span>
            <span className="font-mono text-[#2B2B2B] font-semibold bg-white/80 px-2 py-0.5 rounded border border-[#0E5C2E]/10">
              3rd, 4th &amp; 5th Floor, House 50, Road-01, Sector-05, Uttara, Dhaka, Bangladesh
            </span>
          </div>
          <div className="flex items-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#1E9B4C]" />
            <span>Registered Overseas Offices:</span>
            <span className="font-mono text-[#2B2B2B] font-semibold bg-white/80 px-2 py-0.5 rounded border border-[#0E5C2E]/10">
              Guangzhou (China), Kolkata (India), Dubai (UAE), New York (USA), Frankfurt (Germany)
            </span>
          </div>
        </div>
        <div className="shrink-0 font-bold text-xs text-[#0E5C2E] bg-white px-3 py-1.5 rounded-xl border border-[#0E5C2E]/20 shadow-2xs">
          {entries.length} / 16 Entries Active
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8E4] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8C95A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or content..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] focus:outline-none focus:border-[#0E5C2E] focus:bg-white text-[#2B2B2B] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C95A6] hover:text-[#2B2B2B]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-[#8C95A6] mr-1 hidden md:inline">Category:</span>
          {allCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0E5C2E] text-white shadow-xs'
                  : 'bg-[#F6F8F7] text-[#5A6170] hover:bg-[#EAEAEA] hover:text-[#2B2B2B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Entries List / Grouped View */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E2E8E4] p-12 text-center shadow-xs">
          <div className="w-8 h-8 border-3 border-[#0E5C2E] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold text-[#5A6170]">Loading knowledge entries from Firestore...</p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E2E8E4] p-12 text-center shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF6EE] text-[#0E5C2E] flex items-center justify-center mx-auto">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-[#2B2B2B]">No knowledge entries found</h3>
            <p className="text-xs text-[#5A6170] mt-1 max-w-sm mx-auto">
              {searchQuery || selectedCategory !== 'All'
                ? 'Try clearing your search query or selecting a different category filter.'
                : 'Get started by adding knowledge entries or seeding default company documents.'}
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-2">
            {searchQuery || selectedCategory !== 'All' ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsSeedModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] transition-colors cursor-pointer"
              >
                Seed Default Knowledge
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedEntries).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E2E8E4] pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0E5C2E]" />
                  <h2 className="font-heading font-bold text-sm text-[#0E5C2E] tracking-tight uppercase">
                    {category}
                  </h2>
                  <span className="text-[11px] font-semibold text-[#8C95A6] bg-[#F6F8F7] px-2 py-0.5 rounded-full">
                    {items.length} {items.length === 1 ? 'entry' : 'entries'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {items.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-2xl border border-[#E2E8E4] p-5 hover:border-[#0E5C2E]/40 hover:shadow-xs transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
                  >
                    <div className="flex-1 space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase bg-[#EAF6EE] text-[#0E5C2E] border border-[#0E5C2E]/20">
                          {entry.category}
                        </span>
                        {/* Language availability indicators */}
                        <div className="flex items-center gap-1 text-[10px] font-bold">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            EN
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded border ${
                              entry.contentBn
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-gray-100 text-gray-400 border-gray-200'
                            }`}
                            title={entry.contentBn ? 'Bangla translation available' : 'Bangla translation missing'}
                          >
                            BN
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded border ${
                              entry.contentZh
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-gray-100 text-gray-400 border-gray-200'
                            }`}
                            title={entry.contentZh ? 'Chinese translation available' : 'Chinese translation missing'}
                          >
                            ZH
                          </span>
                        </div>
                      </div>

                      {entry.question && (
                        <h3 className="font-heading font-bold text-sm text-[#2B2B2B] flex items-center gap-1.5">
                          <HelpCircle className="w-4 h-4 text-[#0E5C2E] shrink-0" />
                          <span>{entry.question}</span>
                        </h3>
                      )}

                      <p className="text-xs text-[#5A6170] leading-relaxed line-clamp-3">
                        {entry.content}
                      </p>

                      {(entry.contentBn || entry.contentZh) && (
                        <div className="pt-1.5 border-t border-[#F0F2F1] text-[11px] text-[#8C95A6] space-y-1">
                          {entry.contentBn && (
                            <p className="line-clamp-1 italic">
                              <strong className="font-semibold text-[#5A6170]">বাংলা:</strong> {entry.contentBn}
                            </p>
                          )}
                          {entry.contentZh && (
                            <p className="line-clamp-1 italic">
                              <strong className="font-semibold text-[#5A6170]">中文:</strong> {entry.contentZh}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-end md:self-start pt-2 md:pt-0 border-t md:border-t-0 border-[#F0F2F1] w-full md:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(entry)}
                        className="p-2 rounded-xl text-[#5A6170] hover:text-[#0E5C2E] hover:bg-[#EAF6EE] transition-colors cursor-pointer"
                        title="Edit entry"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(entry)}
                        className="p-2 rounded-xl text-[#8C95A6] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-[#E2E8E4] space-y-5 animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#E2E8E4] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF6EE] text-[#0E5C2E] flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#2B2B2B]">
                    {isEditing ? 'Edit Knowledge Entry' : 'Add Knowledge Entry'}
                  </h3>
                  <p className="text-xs text-[#5A6170]">
                    Define information context for the AI chatbot to provide accurate visitor responses.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-lg text-[#8C95A6] hover:text-[#2B2B2B] hover:bg-[#F0F2F1] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Category & AI Translate Action */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2B2B2B] mb-1">Category</label>
                  <select
                    value={currentEntry.category}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] focus:outline-none focus:border-[#0E5C2E] focus:bg-white text-[#2B2B2B]"
                  >
                    {PRESET_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleAutoTranslate}
                    disabled={isTranslating}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] border border-[#0E5C2E]/20 transition-all disabled:opacity-50 cursor-pointer"
                    title="Automatically generate Bangla and Chinese translations using Gemini AI"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isTranslating ? 'Translating with AI...' : 'AI Auto-Translate (BN/ZH)'}</span>
                  </button>
                </div>
              </div>

              {/* Question / Prompt field */}
              <div>
                <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                  Common Visitor Question <span className="text-[#8C95A6] font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={currentEntry.question || ''}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, question: e.target.value })}
                  placeholder="e.g. What services does Sharabangla Express provide?"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] focus:outline-none focus:border-[#0E5C2E] focus:bg-white text-[#2B2B2B]"
                />
              </div>

              {/* Multilingual Content Tabs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[#2B2B2B]">
                    Knowledge Answer / Content <span className="text-red-500">*</span>
                  </label>
                  {/* Language Tab Switchers */}
                  <div className="flex items-center gap-1 bg-[#F6F8F7] p-0.5 rounded-lg border border-[#E2E8E4]">
                    <button
                      type="button"
                      onClick={() => setActiveLangTab('en')}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                        activeLangTab === 'en'
                          ? 'bg-white text-[#0E5C2E] shadow-xs'
                          : 'text-[#5A6170] hover:text-[#2B2B2B]'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLangTab('bn')}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                        activeLangTab === 'bn'
                          ? 'bg-white text-[#0E5C2E] shadow-xs'
                          : 'text-[#5A6170] hover:text-[#2B2B2B]'
                      }`}
                    >
                      বাংলা (BN)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLangTab('zh')}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                        activeLangTab === 'zh'
                          ? 'bg-white text-[#0E5C2E] shadow-xs'
                          : 'text-[#5A6170] hover:text-[#2B2B2B]'
                      }`}
                    >
                      中文 (ZH)
                    </button>
                  </div>
                </div>

                {/* Tab: English */}
                {activeLangTab === 'en' && (
                  <div>
                    <textarea
                      rows={5}
                      required
                      value={currentEntry.content || ''}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                      placeholder="Write comprehensive, authoritative factual information in English..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] focus:outline-none focus:border-[#0E5C2E] focus:bg-white text-[#2B2B2B] leading-relaxed"
                    />
                    <p className="text-[11px] text-[#8C95A6] mt-1">
                      This primary text is fed directly into the Gemini AI system context.
                    </p>
                  </div>
                )}

                {/* Tab: Bangla */}
                {activeLangTab === 'bn' && (
                  <div>
                    <textarea
                      rows={5}
                      value={currentEntry.contentBn || ''}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, contentBn: e.target.value })}
                      placeholder="বাংলা ভাষায় সঠিক তথ্য ও উত্তর লিখুন (বা 'AI Auto-Translate' চাপুন)..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] focus:outline-none focus:border-[#0E5C2E] focus:bg-white text-[#2B2B2B] leading-relaxed"
                    />
                    <p className="text-[11px] text-[#8C95A6] mt-1">
                      Used to respond accurately when visitors ask in Bengali.
                    </p>
                  </div>
                )}

                {/* Tab: Chinese */}
                {activeLangTab === 'zh' && (
                  <div>
                    <textarea
                      rows={5}
                      value={currentEntry.contentZh || ''}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, contentZh: e.target.value })}
                      placeholder="输入权威准确的中文回答内容（或点击上方 AI Auto-Translate 自动生成）..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] focus:outline-none focus:border-[#0E5C2E] focus:bg-white text-[#2B2B2B] leading-relaxed"
                    />
                    <p className="text-[11px] text-[#8C95A6] mt-1">
                      用于对中文用户和国际合作伙伴的智能精准解答。
                    </p>
                  </div>
                )}
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8E4]">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#5A6170] hover:bg-[#F0F2F1] hover:text-[#2B2B2B] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving to Firestore...</span>
                    </>
                  ) : (
                    <span>{isEditing ? 'Update Entry' : 'Save Entry'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Knowledge Entry"
        message={
          <div>
            <p>Are you sure you want to delete this knowledge entry?</p>
            {deleteTarget && (
              <p className="font-bold text-[#2B2B2B] mt-2 p-2 bg-[#F6F8F7] rounded-lg">
                {deleteTarget.question || deleteTarget.content.slice(0, 70) + '...'}
              </p>
            )}
            <p className="text-xs text-red-600 mt-2">
              This will permanently remove the entry from Firestore. The chatbot will no longer use this specific answer.
            </p>
          </div>
        }
        confirmText="Yes, Delete Entry"
        variant="danger"
        isLoading={isDeleting}
        loadingText="Deleting..."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Seed Defaults Confirmation Modal */}
      <ConfirmModal
        isOpen={isSeedModalOpen}
        title="Seed Official Default Knowledge Base"
        message={
          <div className="space-y-2">
            <p>
              This will populate the <strong>{defaultChatbotKnowledge.length} official, verified enterprise knowledge base documents</strong> directly into Firestore as hardcoded data (zero AI modification or summarization).
            </p>
            <div className="p-3 bg-[#EAF6EE] rounded-xl border border-[#0E5C2E]/20 text-xs text-[#0E5C2E] space-y-1">
              <p className="font-bold">Verified Corporate Facts included:</p>
              <p>• <strong>HQ:</strong> 3rd, 4th &amp; 5th Floor, House 50, Road-01, Sector-05, Uttara, Dhaka, Bangladesh</p>
              <p>• <strong>Offices:</strong> Guangzhou (China), Kolkata (India), Dubai (UAE), New York (USA), Frankfurt (Germany)</p>
              <p>• <strong>Subsidiaries:</strong> 7 core concerns (Laobaan, Express, FuMao, BAC Venture, Down Products, Sharabangla.com, Shenova)</p>
            </div>
            <p className="text-xs text-[#5A6170]">
              Existing entries will be replaced with these clean, verified authoritative documents.
            </p>
          </div>
        }
        confirmText="Seed 16 Entries Now"
        variant="primary"
        icon={Database}
        isLoading={isSeeding}
        loadingText="Seeding Firestore..."
        onConfirm={handleSeedDefaults}
        onCancel={() => setIsSeedModalOpen(false)}
      />

      {/* Clear All Confirmation Modal */}
      <ConfirmModal
        isOpen={isClearAllModalOpen}
        title="Clear All Knowledge Base Documents"
        message={
          <div className="space-y-2">
            <p className="font-bold text-red-700">
              Are you sure you want to delete ALL documents from the Firestore "chatbotKnowledge" collection?
            </p>
            <p className="text-xs text-[#5A6170]">
              This action will completely wipe all knowledge documents currently stored in Firestore. The AI chatbot will temporarily fall back to default configuration until new entries are added or re-seeded.
            </p>
            <p className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
              ⚠️ This action cannot be undone.
            </p>
          </div>
        }
        confirmText="Yes, Clear All Documents"
        variant="danger"
        isLoading={isClearingAll}
        loadingText="Deleting all entries..."
        onConfirm={handleClearAllConfirm}
        onCancel={() => setIsClearAllModalOpen(false)}
      />
    </div>
  );
};
