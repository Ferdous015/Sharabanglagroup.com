import React, { useState, useEffect, useRef } from 'react';
import {
  Newspaper,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  RotateCcw,
  DownloadCloud,
  Layers,
  Globe,
  Sparkles,
  Info,
  Loader2,
  Upload,
  Image as ImageIcon,
  ShieldCheck,
  Megaphone,
  Tag,
  FileText,
  PlusCircle,
  ChevronDown,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { NewsArticle, newsArticles as defaultNewsArticles } from '../../data/site';
import {
  getNewsFromFirestore,
  saveNewsToFirestore,
  deleteNewsFromFirestore,
  migrateExistingNews
} from '../../services/newsService';
import { uploadImageToCloudinary } from '../../lib/cloudinary';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { ToastNotification, ToastMessage, ToastType } from '../../components/admin/ToastNotification';
import {
  parseDateToIso,
  formatDateForDisplay
} from '../../utils/dateUtils';

const PRESET_CATEGORIES = [
  'E-Commerce',
  'Logistics',
  'Manufacturing',
  'Trade & Sourcing',
  'Corporate',
  'Sustainability',
  'Partnership'
];

const PRESET_TYPES: Array<{ value: 'news' | 'press' | 'announcement'; label: string; bn: string; zh: string }> = [
  { value: 'news', label: 'Latest News', bn: 'সংবাদ', zh: '最新动态' },
  { value: 'press', label: 'Press Release', bn: 'প্রেস বিজ্ঞপ্তি', zh: '官方新闻稿' },
  { value: 'announcement', label: 'Group Announcement', bn: 'গ্রুপ ঘোষণা', zh: '集团重大公告' },
];

const EMPTY_ARTICLE: NewsArticle = {
  id: '',
  slug: '',
  type: 'news',
  banglaType: 'সংবাদ',
  zhType: '最新动态',
  title: '',
  banglaTitle: '',
  zhTitle: '',
  category: 'E-Commerce',
  banglaCategory: 'ই-কমার্স',
  zhCategory: '电子商务',
  date: new Date().toISOString().split('T')[0],
  readTime: '4 min read',
  summary: '',
  banglaSummary: '',
  zhSummary: '',
  content: [''],
  banglaContent: [''],
  zhContent: [''],
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
  officialRef: ''
};

export const NewsManager: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // In-app toasts notification state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle>(EMPTY_ARTICLE);
  const [isSaving, setIsSaving] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'bn' | 'zh'>('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateSuccessMsg, setTranslateSuccessMsg] = useState(false);

  // Image Upload state
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete Confirmation modal state
  const [articleToDelete, setArticleToDelete] = useState<NewsArticle | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Seed / Import Confirmation modal state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);

  const addToast = (type: ToastType, message: string, title?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, message, title }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch News directly from Firestore
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNewsFromFirestore();
      setArticles(data);
    } catch (err: any) {
      console.error('Failed to load news articles:', err);
      setError(err.message || 'Failed to connect to Firestore news collection.');
      addToast('error', 'Could not load news articles from Firestore.', 'Database Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // AI-Powered Auto Translation handler
  const handleAutoTranslate = async () => {
    if (!editingArticle.title.trim() && !editingArticle.summary.trim() && (!editingArticle.content || editingArticle.content.filter(p => p.trim() !== '').length === 0)) {
      addToast('warning', 'Please fill in the English Article Title, Summary, or Paragraphs first before running auto-translate.', 'Incomplete English Data');
      return;
    }

    setIsTranslating(true);
    setTranslateSuccessMsg(false);

    try {
      const activeParagraphs = (editingArticle.content || []).filter((p) => p.trim() !== '');

      const response = await fetch('/api/gemini/translate-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editingArticle.title,
          category: editingArticle.category,
          type: editingArticle.type || 'news',
          summary: editingArticle.summary,
          content: activeParagraphs,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Translation failed with status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.translations) {
        const { bangla, chinese } = result.translations;

        setEditingArticle((prev) => {
          return {
            ...prev,
            banglaTitle: bangla.title || prev.banglaTitle,
            banglaCategory: bangla.category || prev.banglaCategory,
            banglaType: bangla.type || prev.banglaType,
            banglaSummary: bangla.summary || prev.banglaSummary,
            banglaContent: Array.isArray(bangla.content) && bangla.content.length > 0 ? bangla.content : prev.banglaContent,

            zhTitle: chinese.title || prev.zhTitle,
            zhCategory: chinese.category || prev.zhCategory,
            zhType: chinese.type || prev.zhType,
            zhSummary: chinese.summary || prev.zhSummary,
            zhContent: Array.isArray(chinese.content) && chinese.content.length > 0 ? chinese.content : prev.zhContent,
          };
        });

        setTranslateSuccessMsg(true);
        addToast('success', 'Bangla and Chinese translations auto-generated! Please review in respective tabs before saving.', 'Gemini AI Translation Complete');
      } else {
        throw new Error('Invalid response structure from translation service.');
      }
    } catch (err: any) {
      console.error('Translation error:', err);
      addToast('error', err.message || 'Failed to auto-translate news article.', 'Translation Failed');
    } finally {
      setIsTranslating(false);
    }
  };

  // Cloudinary Image Upload Handler
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      addToast('warning', 'Please select a valid image file (PNG, JPG, WEBP).', 'Invalid File Format');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      addToast('warning', 'Image size should be less than 8MB.', 'File Too Large');
      return;
    }

    try {
      setIsUploadingImage(true);
      const secureUrl = await uploadImageToCloudinary(file);
      setEditingArticle((prev) => ({ ...prev, image: secureUrl }));
      addToast('success', 'Cover image uploaded successfully to Cloudinary CDN.', 'Image Uploaded');
    } catch (err: any) {
      console.error('Cloudinary upload error:', err);
      addToast('error', err.message || 'Failed to upload image.', 'Cloudinary Upload Failed');
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Open Modal for Create
  const handleOpenCreateModal = () => {
    const todayIso = new Date().toISOString().split('T')[0];
    setEditingArticle({
      ...EMPTY_ARTICLE,
      date: todayIso,
      id: `news-${Date.now()}`,
      slug: `news-${Date.now()}`,
      content: [''],
      banglaContent: [''],
      zhContent: ['']
    });
    setActiveLangTab('en');
    setTranslateSuccessMsg(false);
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (article: NewsArticle) => {
    setEditingArticle({
      ...article,
      date: parseDateToIso(article.date) || article.date,
      content: article.content && article.content.length > 0 ? [...article.content] : [''],
      banglaContent: article.banglaContent && article.banglaContent.length > 0 ? [...article.banglaContent] : [''],
      zhContent: article.zhContent && article.zhContent.length > 0 ? [...article.zhContent] : [''],
    });
    setActiveLangTab('en');
    setTranslateSuccessMsg(false);
    setIsModalOpen(true);
  };

  // Save Article to Firestore
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingArticle.title.trim()) {
      addToast('warning', 'Please provide a title in English.', 'Validation Error');
      setActiveLangTab('en');
      return;
    }

    if (!editingArticle.summary.trim()) {
      addToast('warning', 'Please provide an executive summary.', 'Validation Error');
      setActiveLangTab('en');
      return;
    }

    // Auto-generate slug if blank
    let finalSlug = editingArticle.slug?.trim();
    if (!finalSlug) {
      finalSlug = editingArticle.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const finalId = editingArticle.id?.trim() || finalSlug || `news-${Date.now()}`;
    const isoDate = parseDateToIso(editingArticle.date) || editingArticle.date || new Date().toISOString().split('T')[0];

    const cleanedArticle: NewsArticle = {
      ...editingArticle,
      id: finalId,
      slug: finalSlug,
      date: isoDate,
      banglaTitle: editingArticle.banglaTitle?.trim() || editingArticle.title,
      zhTitle: editingArticle.zhTitle?.trim() || '',
      category: editingArticle.category?.trim() || 'General',
      banglaCategory: editingArticle.banglaCategory?.trim() || 'সাধারণ',
      zhCategory: editingArticle.zhCategory?.trim() || '综合',
      summary: editingArticle.summary?.trim() || '',
      banglaSummary: editingArticle.banglaSummary?.trim() || '',
      zhSummary: editingArticle.zhSummary?.trim() || '',
      content: (editingArticle.content || []).filter((p) => p.trim() !== ''),
      banglaContent: (editingArticle.banglaContent || []).filter((p) => p.trim() !== ''),
      zhContent: (editingArticle.zhContent || []).filter((p) => p.trim() !== ''),
      image: editingArticle.image?.trim() || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
      officialRef: editingArticle.officialRef?.trim() || '',
    };

    if (cleanedArticle.content.length === 0) {
      cleanedArticle.content = [cleanedArticle.summary];
    }

    setIsSaving(true);
    try {
      await saveNewsToFirestore(cleanedArticle);
      addToast('success', `"${cleanedArticle.title}" was saved directly to Firestore.`, 'Article Published');
      setIsModalOpen(false);
      await fetchNews();
    } catch (err: any) {
      console.error('Error saving article to Firestore:', err);
      addToast('error', err.message || 'Failed to write document to Firestore.', 'Save Error');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Article from Firestore
  const handleConfirmDelete = async () => {
    if (!articleToDelete) return;
    setIsDeleting(true);

    try {
      await deleteNewsFromFirestore(articleToDelete.id);
      addToast('success', `Article "${articleToDelete.title}" has been deleted from Firestore.`, 'Article Deleted');
      setArticleToDelete(null);
      await fetchNews();
    } catch (err: any) {
      console.error('Error deleting article:', err);
      addToast('error', err.message || 'Failed to delete article from Firestore.', 'Delete Error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Seed default news from site.ts into Firestore
  const handleConfirmMigration = async () => {
    setIsMigrating(true);
    try {
      const count = await migrateExistingNews();
      addToast('success', `Successfully imported ${count} news & press articles into Firestore!`, 'Database Populated');
      setIsImportModalOpen(false);
      await fetchNews();
    } catch (err: any) {
      console.error('Error migrating news articles:', err);
      addToast('error', err.message || 'Migration to Firestore failed.', 'Import Failed');
    } finally {
      setIsMigrating(false);
    }
  };

  // Content Paragraph Manipulation Helpers
  const handleAddParagraph = (lang: 'en' | 'bn' | 'zh') => {
    setEditingArticle((prev) => {
      if (lang === 'en') {
        return { ...prev, content: [...(prev.content || []), ''] };
      } else if (lang === 'bn') {
        return { ...prev, banglaContent: [...(prev.banglaContent || []), ''] };
      } else {
        return { ...prev, zhContent: [...(prev.zhContent || []), ''] };
      }
    });
  };

  const handleParagraphChange = (lang: 'en' | 'bn' | 'zh', index: number, value: string) => {
    setEditingArticle((prev) => {
      if (lang === 'en') {
        const next = [...(prev.content || [])];
        next[index] = value;
        return { ...prev, content: next };
      } else if (lang === 'bn') {
        const next = [...(prev.banglaContent || [])];
        next[index] = value;
        return { ...prev, banglaContent: next };
      } else {
        const next = [...(prev.zhContent || [])];
        next[index] = value;
        return { ...prev, zhContent: next };
      }
    });
  };

  const handleRemoveParagraph = (lang: 'en' | 'bn' | 'zh', index: number) => {
    setEditingArticle((prev) => {
      if (lang === 'en') {
        const next = [...(prev.content || [])];
        next.splice(index, 1);
        return { ...prev, content: next.length > 0 ? next : [''] };
      } else if (lang === 'bn') {
        const next = [...(prev.banglaContent || [])];
        next.splice(index, 1);
        return { ...prev, banglaContent: next.length > 0 ? next : [''] };
      } else {
        const next = [...(prev.zhContent || [])];
        next.splice(index, 1);
        return { ...prev, zhContent: next.length > 0 ? next : [''] };
      }
    });
  };

  // Filtered list
  const filteredArticles = (articles || []).filter((a) => {
    if (!a) return false;
    const matchesSearch =
      searchQuery.trim() === '' ||
      a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.officialRef?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.banglaTitle?.includes(searchQuery) ||
      a.zhTitle?.includes(searchQuery);

    const matchesType = selectedType === 'ALL' || a.type === selectedType;
    const matchesCategory = selectedCategory === 'ALL' || a.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Toast Notifications */}
      <ToastNotification toasts={toasts} onDismiss={removeToast} />

      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8E4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0E5C2E] mb-2">
            <Newspaper className="w-4 h-4 text-[#1E9B4C]" />
            <span>Corporate News & Press Communications</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#0E5C2E] tracking-tight">
            Newsroom & Press Manager
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#5A6170] max-w-2xl leading-relaxed">
            Create, publish, and translate corporate news stories, press releases, and major group announcements directly into Firestore with Cloudinary CDN cover photos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {(articles?.length || 0) === 0 && !loading && (
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] border border-[#0E5C2E]/20 transition-all cursor-pointer shadow-xs"
            >
              <DownloadCloud className="w-4 h-4 text-[#0E5C2E]" />
              <span>Import Existing Articles</span>
            </button>
          )}

          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] transition-all shadow-sm cursor-pointer hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Article</span>
          </button>
        </div>
      </div>

      {/* Database Quick Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E2E8E4] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#8C95A6] uppercase tracking-wider">Total Articles</div>
            <div className="text-xl font-black text-[#0E5C2E] mt-0.5">{loading ? '...' : (articles?.length || 0)}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-[#EAF6EE] text-[#0E5C2E] flex items-center justify-center">
            <Newspaper className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E2E8E4] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#8C95A6] uppercase tracking-wider">Latest News</div>
            <div className="text-xl font-black text-[#0E5C2E] mt-0.5">
              {loading ? '...' : (articles || []).filter(a => a.type === 'news' || !a.type).length}
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-[#EAF6EE] text-[#1E9B4C] flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E2E8E4] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#8C95A6] uppercase tracking-wider">Press Releases</div>
            <div className="text-xl font-black text-blue-700 mt-0.5">
              {loading ? '...' : (articles || []).filter(a => a.type === 'press').length}
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E2E8E4] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#8C95A6] uppercase tracking-wider">Announcements</div>
            <div className="text-xl font-black text-amber-700 mt-0.5">
              {loading ? '...' : (articles || []).filter(a => a.type === 'announcement').length}
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Megaphone className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Search & Filters Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8E4] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8C95A6] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, summary, ref code..."
            className="w-full bg-[#F6F8F7] border border-[#E2E8E4] rounded-xl pl-9 pr-4 py-2 text-xs text-[#2B2B2B] placeholder-[#8C95A6] focus:outline-none focus:border-[#1E9B4C] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C95A6] hover:text-[#2B2B2B]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#5A6170]">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#F6F8F7] border border-[#E2E8E4] rounded-xl px-3 py-2 text-xs font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C] cursor-pointer"
            >
              <option value="ALL">All Types ({articles?.length || 0})</option>
              <option value="news">Latest News</option>
              <option value="press">Press Releases</option>
              <option value="announcement">Group Announcements</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#5A6170]">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#F6F8F7] border border-[#E2E8E4] rounded-xl px-3 py-2 text-xs font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C] cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              {PRESET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Reset button */}
          {(searchQuery || selectedType !== 'ALL' || selectedCategory !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('ALL');
                setSelectedCategory('ALL');
              }}
              className="text-xs font-bold text-red-600 hover:text-red-800 transition-colors cursor-pointer px-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* News Articles List / Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8E4] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-[#0E5C2E] animate-spin mx-auto mb-3" />
            <p className="text-xs font-bold text-[#5A6170]">Connecting directly to Firestore "news" collection...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-red-50/50">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-red-800">Firestore Fetch Error</h3>
            <p className="text-xs text-red-600 mt-1 max-w-md mx-auto">{error}</p>
            <button
              onClick={fetchNews}
              className="mt-4 px-4 py-2 bg-white text-xs font-bold text-[#0E5C2E] rounded-lg border border-[#E2E8E4] hover:bg-[#F6F8F7] cursor-pointer shadow-xs"
            >
              Retry Connection
            </button>
          </div>
        ) : (filteredArticles?.length || 0) === 0 ? (
          <div className="p-12 text-center">
            <Newspaper className="w-12 h-12 text-[#8C95A6]/40 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#2B2B2B]">
              {(articles?.length || 0) === 0 ? 'No news articles found in Firestore' : 'No articles match your filters'}
            </h3>
            <p className="text-xs text-[#5A6170] mt-1 max-w-md mx-auto">
              {(articles?.length || 0) === 0
                ? 'Your Firestore news collection is currently empty. You can seed standard site articles or publish new releases.'
                : 'Try adjusting your search keywords or resetting your type/category filters.'}
            </p>
            {(articles?.length || 0) === 0 ? (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setIsImportModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] border border-[#0E5C2E]/20 transition-all cursor-pointer"
                >
                  Import 9 Default Articles
                </button>
                <button
                  onClick={handleOpenCreateModal}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] transition-all cursor-pointer shadow-xs"
                >
                  Create First Article
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('ALL');
                  setSelectedCategory('ALL');
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-[#0E5C2E] bg-[#F6F8F7] hover:bg-[#EAF6EE] transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F6F8F7] border-b border-[#E2E8E4] text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170]">
                  <th className="py-3.5 px-4 sm:px-6 w-20">Cover</th>
                  <th className="py-3.5 px-4 sm:px-6">Title & Summary</th>
                  <th className="py-3.5 px-4 sm:px-6">Type & Sector</th>
                  <th className="py-3.5 px-4 sm:px-6">Date & Read Time</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8E4] text-xs">
                {filteredArticles.map((article) => {
                  const isPress = article.type === 'press';
                  const isAnnounce = article.type === 'announcement';

                  return (
                    <tr key={article.id} className="hover:bg-[#FAFCFB] transition-colors group">
                      {/* Thumbnail Cover */}
                      <td className="py-4 px-4 sm:px-6 align-top">
                        <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden bg-gray-100 border border-[#E2E8E4] shrink-0 relative">
                          <img
                            src={article.image || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop'}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop';
                            }}
                          />
                        </div>
                      </td>

                      {/* Title & Summary */}
                      <td className="py-4 px-4 sm:px-6 align-top max-w-md">
                        <div className="font-heading font-bold text-sm text-[#0E5C2E] group-hover:text-[#1E9B4C] transition-colors line-clamp-1">
                          {article.title}
                        </div>
                        {article.banglaTitle && article.banglaTitle !== article.title && (
                          <div className="text-[11px] text-[#5A6170] font-medium mt-0.5 line-clamp-1 font-serif">
                            🇧🇩 {article.banglaTitle}
                          </div>
                        )}
                        {article.zhTitle && (
                          <div className="text-[11px] text-[#8C95A6] font-medium mt-0.5 line-clamp-1">
                            🇨🇳 {article.zhTitle}
                          </div>
                        )}
                        <p className="text-[11px] text-[#5A6170] mt-1.5 line-clamp-2 leading-relaxed">
                          {article.summary}
                        </p>
                        {article.officialRef && (
                          <div className="inline-block mt-1 font-mono text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                            Ref: {article.officialRef}
                          </div>
                        )}
                      </td>

                      {/* Type & Sector */}
                      <td className="py-4 px-4 sm:px-6 align-top">
                        <div className="space-y-1.5">
                          {/* Type Badge */}
                          <div>
                            {isPress ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Press Release</span>
                              </span>
                            ) : isAnnounce ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                                <Megaphone className="w-3 h-3" />
                                <span>Announcement</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#EAF6EE] text-[#0E5C2E] text-[10px] font-bold border border-[#0E5C2E]/20">
                                <Newspaper className="w-3 h-3" />
                                <span>Latest News</span>
                              </span>
                            )}
                          </div>

                          {/* Sector Badge */}
                          <div>
                            <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-semibold border border-gray-200">
                              {article.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Date & Read Time */}
                      <td className="py-4 px-4 sm:px-6 align-top text-[#5A6170] whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2B2B2B]">
                          <Calendar className="w-3.5 h-3.5 text-[#1E9B4C]" />
                          <span>{formatDateForDisplay(article.date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#8C95A6] mt-1">
                          <Clock className="w-3.5 h-3.5 text-[#8C95A6]" />
                          <span>{article.readTime || '3 min read'}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 align-top text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`/newsroom/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-[#5A6170] hover:text-[#0E5C2E] hover:bg-[#EAF6EE] rounded-lg transition-colors"
                            title="View on Live Website"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => handleOpenEditModal(article)}
                            className="p-1.5 text-[#0E5C2E] hover:bg-[#EAF6EE] rounded-lg transition-colors cursor-pointer"
                            title="Edit Article"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setArticleToDelete(article)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Article Create / Edit Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#E2E8E4] flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#E2E8E4] bg-white flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0E5C2E]/10 text-[#0E5C2E] flex items-center justify-center">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-heading font-black text-[#0E5C2E]">
                    {editingArticle.id && articles.some((a) => a.id === editingArticle.id)
                      ? 'Edit News / Press Article'
                      : 'Publish New News / Press Article'}
                  </h2>
                  <p className="text-xs text-[#5A6170]">
                    Trilingual publishing pipeline with Cloudinary cover photo integration.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#8C95A6] hover:text-[#2B2B2B] hover:bg-[#F6F8F7] rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Form Body */}
            <form onSubmit={handleSaveArticle} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Notice Box */}
              <div className="p-3.5 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4] flex items-start gap-2.5 text-xs text-[#5A6170]">
                <Info className="w-4 h-4 text-[#0E5C2E] shrink-0 mt-0.5" />
                <span>
                  <strong>Multilingual Publishing Flow:</strong> Fill in English fields first, then use the <strong>AI Auto-Translator</strong> below to generate Bangla (বাংলা) and Simplified Chinese (中文) text instantly.
                </span>
              </div>

              {/* Language Navigation Tabs */}
              <div className="flex items-center gap-2 p-1.5 bg-[#F6F8F7] rounded-xl border border-[#E2E8E4]">
                <span className="text-[11px] font-bold text-[#5A6170] px-3 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#0E5C2E]" />
                  <span>Language Section:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveLangTab('en')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeLangTab === 'en'
                      ? 'bg-white text-[#0E5C2E] shadow-xs border border-[#E2E8E4]'
                      : 'text-[#5A6170] hover:text-[#0E5C2E]'
                  }`}
                >
                  🇬🇧 English (Primary)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLangTab('bn')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeLangTab === 'bn'
                      ? 'bg-white text-[#0E5C2E] shadow-xs border border-[#E2E8E4]'
                      : 'text-[#5A6170] hover:text-[#0E5C2E]'
                  }`}
                >
                  🇧🇩 Bangla (বাংলা)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLangTab('zh')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeLangTab === 'zh'
                      ? 'bg-white text-[#0E5C2E] shadow-xs border border-[#E2E8E4]'
                      : 'text-[#5A6170] hover:text-[#0E5C2E]'
                  }`}
                >
                  🇨🇳 Chinese (中文)
                </button>
              </div>

              {/* Persistent AI Auto-Translator Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#EAF6EE] via-[#F4FAF6] to-[#EBF3FF] border border-[#1E9B4C]/30 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0E5C2E] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#0E5C2E] flex items-center gap-2">
                      <span>Gemini AI Multilingual Auto-Translator</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-[#1E9B4C] text-white">AI-Powered</span>
                    </div>
                    <p className="text-[11px] text-[#5A6170] mt-0.5">
                      Fill English fields first, then click below to translate title, summary, and all paragraphs into Bangla & Chinese.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {translateSuccessMsg && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Translated! Review in BN/ZH tabs.</span>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={handleAutoTranslate}
                    disabled={isTranslating}
                    className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-xs flex items-center gap-2 cursor-pointer ${
                      isTranslating
                        ? 'bg-[#1E9B4C]/70 cursor-not-allowed'
                        : 'bg-[#0E5C2E] hover:bg-[#0A4724] hover:shadow-md'
                    }`}
                  >
                    {isTranslating ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Translating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                        <span>✨ Auto-translate from English</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Core Global Metadata Fields (Always visible) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#FAFCFB] border border-[#E2E8E4]">
                {/* Article Type */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                    Release Type *
                  </label>
                  <select
                    value={editingArticle.type || 'news'}
                    onChange={(e) => {
                      const val = e.target.value as 'news' | 'press' | 'announcement';
                      const match = PRESET_TYPES.find((t) => t.value === val);
                      setEditingArticle((prev) => ({
                        ...prev,
                        type: val,
                        banglaType: match?.bn || prev.banglaType,
                        zhType: match?.zh || prev.zhType,
                      }));
                    }}
                    className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3 py-2 text-xs font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                  >
                    {PRESET_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Primary Category */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                    Sector / Category *
                  </label>
                  <input
                    type="text"
                    value={editingArticle.category || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    placeholder="e.g. E-Commerce, Logistics"
                    className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                    Publication Date *
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="date"
                      value={parseDateToIso(editingArticle.date)}
                      onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                      className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3 py-2 pr-9 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C] cursor-pointer"
                      onClick={(e) => {
                        try {
                          (e.currentTarget as any).showPicker?.();
                        } catch (_) {}
                      }}
                      required
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={(e) => {
                        const input = e.currentTarget.parentElement?.querySelector('input[type="date"]') as any;
                        try {
                          input?.showPicker?.();
                          input?.focus();
                        } catch (_) {}
                      }}
                      className="absolute right-2.5 p-1 text-[#5A6170] hover:text-[#0E5C2E] transition-colors cursor-pointer"
                      title="Open Calendar Picker"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                  </div>
                  {editingArticle.date && (
                    <p className="text-[10px] text-[#0E5C2E] font-medium mt-1">
                      Display: {formatDateForDisplay(editingArticle.date)}
                    </p>
                  )}
                </div>

                {/* Slug / URL identifier */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                    Article URL Slug
                  </label>
                  <input
                    type="text"
                    value={editingArticle.slug || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    placeholder="e.g. laobaan-crossborder-milestone"
                    className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3 py-2 text-xs font-mono text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                  />
                </div>

                {/* Estimated Read Time */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={editingArticle.readTime || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                    placeholder="e.g. 4 min read"
                    className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                  />
                </div>

                {/* Official Ref Code */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                    Official Reference Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingArticle.officialRef || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, officialRef: e.target.value })}
                    placeholder="e.g. SBG-PR-2026-08"
                    className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3 py-2 text-xs font-mono text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                  />
                </div>
              </div>

              {/* Cover Image Upload & Cloudinary Section */}
              <div className="p-4 rounded-xl bg-white border border-[#E2E8E4] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#0E5C2E]" />
                    <span>Article Cover Image (Cloudinary CDN) *</span>
                  </label>
                  <span className="text-[10px] text-[#8C95A6]">Direct Unsigned Upload (`sbg_uploads`)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Thumbnail Preview */}
                  <div className="sm:col-span-3">
                    <div className="h-28 rounded-xl overflow-hidden bg-gray-100 border border-[#E2E8E4] relative group">
                      {editingArticle.image ? (
                        <img
                          src={editingArticle.image}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-xs">
                          <ImageIcon className="w-6 h-6 mb-1" />
                          <span>No Image</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Controls & Direct URL Input */}
                  <div className="sm:col-span-9 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingImage}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                          isUploadingImage
                            ? 'bg-[#1E9B4C]/70 text-white cursor-not-allowed'
                            : 'bg-[#0E5C2E] text-white hover:bg-[#0A4724]'
                        }`}
                      >
                        {isUploadingImage ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Uploading to Cloudinary...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload New Cover Image</span>
                          </>
                        )}
                      </button>

                      <span className="text-xs text-[#8C95A6]">or paste image URL below:</span>
                    </div>

                    <input
                      type="url"
                      value={editingArticle.image || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, image: e.target.value })}
                      placeholder="https://res.cloudinary.com/... or https://images.unsplash.com/..."
                      className="w-full bg-[#F6F8F7] border border-[#E2E8E4] rounded-xl px-3 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C] focus:bg-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Language Specific Tabs Content */}
              {activeLangTab === 'en' && (
                <div className="space-y-4 p-5 rounded-2xl bg-white border border-[#E2E8E4] shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#0E5C2E]">
                    <span>🇬🇧 English Content (Primary)</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                      Article Title (English) *
                    </label>
                    <input
                      type="text"
                      value={editingArticle.title || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                      placeholder="e.g. Laobaan Bangladesh Surpasses 15,000 Verified Suppliers..."
                      className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                      Executive Summary (English) *
                    </label>
                    <textarea
                      rows={2}
                      value={editingArticle.summary || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                      placeholder="Brief one or two sentence summary shown on newsroom cards..."
                      className="w-full bg-white border border-[#E2E8E4] rounded-xl p-3 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                      required
                    />
                  </div>

                  {/* Multiple Content Paragraphs */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#0E5C2E]" />
                        <span>Article Body Paragraphs (English)</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddParagraph('en')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Paragraph</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(editingArticle.content || ['']).map((paragraph, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="w-6 h-8 flex items-center justify-center font-bold text-xs text-[#8C95A6]">
                            P{index + 1}
                          </span>
                          <textarea
                            rows={3}
                            value={paragraph}
                            onChange={(e) => handleParagraphChange('en', index, e.target.value)}
                            placeholder={`Enter paragraph ${index + 1}... (Quotes starting with " will render as stylized blockquotes)`}
                            className="flex-1 bg-white border border-[#E2E8E4] rounded-xl p-3 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                          />
                          {(editingArticle.content || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveParagraph('en', index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete paragraph"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeLangTab === 'bn' && (
                <div className="space-y-4 p-5 rounded-2xl bg-white border border-[#E2E8E4] shadow-xs font-serif">
                  <div className="flex items-center justify-between text-xs font-extrabold text-[#0E5C2E]">
                    <span>🇧🇩 Bangla Content (বাংলা প্রকাশনা)</span>
                    <span className="text-[11px] text-[#5A6170] font-sans">Corporate Bangla terminology</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1 font-sans">
                      Article Title (বাংলা শিরোনাম)
                    </label>
                    <input
                      type="text"
                      value={editingArticle.banglaTitle || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, banglaTitle: e.target.value })}
                      placeholder="e.g. লাওবান বাংলাদেশ ক্রস-বর্ডার প্ল্যাটফর্মে ১৫,০০০ ভেরিফায়েড সরবরাহকারী..."
                      className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1 font-sans">
                        Category (বাংলা বিভাগ)
                      </label>
                      <input
                        type="text"
                        value={editingArticle.banglaCategory || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, banglaCategory: e.target.value })}
                        placeholder="e.g. ই-কমার্স, লজিস্টিকস"
                        className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1 font-sans">
                        Type Label (বাংলা ধরন)
                      </label>
                      <input
                        type="text"
                        value={editingArticle.banglaType || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, banglaType: e.target.value })}
                        placeholder="e.g. সংবাদ, প্রেস বিজ্ঞপ্তি, গ্রুপ ঘোষণা"
                        className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1 font-sans">
                      Executive Summary (বাংলা সারসংক্ষেপ)
                    </label>
                    <textarea
                      rows={2}
                      value={editingArticle.banglaSummary || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, banglaSummary: e.target.value })}
                      placeholder="বাংলায় খবরের সংক্ষিপ্ত বিবরণ..."
                      className="w-full bg-white border border-[#E2E8E4] rounded-xl p-3 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                    />
                  </div>

                  {/* Bangla Paragraphs */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between font-sans">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#0E5C2E]" />
                        <span>Article Body Paragraphs (বাংলা অনুচ্ছেদ)</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddParagraph('bn')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Bangla Paragraph</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(editingArticle.banglaContent || ['']).map((paragraph, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="w-6 h-8 flex items-center justify-center font-bold text-xs text-[#8C95A6] font-sans">
                            P{index + 1}
                          </span>
                          <textarea
                            rows={3}
                            value={paragraph}
                            onChange={(e) => handleParagraphChange('bn', index, e.target.value)}
                            placeholder={`বাংলা অনুচ্ছেদ ${index + 1} লিখুন...`}
                            className="flex-1 bg-white border border-[#E2E8E4] rounded-xl p-3 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                          />
                          {(editingArticle.banglaContent || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveParagraph('bn', index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer font-sans"
                              title="Delete paragraph"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeLangTab === 'zh' && (
                <div className="space-y-4 p-5 rounded-2xl bg-white border border-[#E2E8E4] shadow-xs">
                  <div className="flex items-center justify-between text-xs font-extrabold text-[#0E5C2E]">
                    <span>🇨🇳 Simplified Chinese Content (中文发布)</span>
                    <span className="text-[11px] text-[#5A6170]">Standard Chinese Business Terminology</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                      Article Title (中文标题)
                    </label>
                    <input
                      type="text"
                      value={editingArticle.zhTitle || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, zhTitle: e.target.value })}
                      placeholder="e.g. Laobaan Bangladesh 跨境采购平台认证工业供应商突破 15,000 家..."
                      className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                        Category (中文业务分类)
                      </label>
                      <input
                        type="text"
                        value={editingArticle.zhCategory || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, zhCategory: e.target.value })}
                        placeholder="e.g. 电子商务, 现代物流, 智能制造"
                        className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                        Type Label (中文通告类型)
                      </label>
                      <input
                        type="text"
                        value={editingArticle.zhType || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, zhType: e.target.value })}
                        placeholder="e.g. 最新动态, 官方新闻稿, 集团重大公告"
                        className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                      Executive Summary (中文摘要)
                    </label>
                    <textarea
                      rows={2}
                      value={editingArticle.zhSummary || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, zhSummary: e.target.value })}
                      placeholder="中文简短概述..."
                      className="w-full bg-white border border-[#E2E8E4] rounded-xl p-3 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                    />
                  </div>

                  {/* Chinese Paragraphs */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#0E5C2E]" />
                        <span>Article Body Paragraphs (中文正文段落)</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddParagraph('zh')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Chinese Paragraph</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(editingArticle.zhContent || ['']).map((paragraph, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="w-6 h-8 flex items-center justify-center font-bold text-xs text-[#8C95A6]">
                            P{index + 1}
                          </span>
                          <textarea
                            rows={3}
                            value={paragraph}
                            onChange={(e) => handleParagraphChange('zh', index, e.target.value)}
                            placeholder={`输入中文正文段落 ${index + 1}...`}
                            className="flex-1 bg-white border border-[#E2E8E4] rounded-xl p-3 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                          />
                          {(editingArticle.zhContent || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveParagraph('zh', index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete paragraph"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-[#E2E8E4] flex items-center justify-end gap-3 sticky bottom-0 bg-white pb-1">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#5A6170] hover:bg-[#F6F8F7] border border-[#E2E8E4] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-sm cursor-pointer ${
                    isSaving
                      ? 'bg-[#0E5C2E]/70 cursor-not-allowed'
                      : 'bg-[#0E5C2E] hover:bg-[#0A4724] hover:shadow-md'
                  }`}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving to Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Publish & Save to Firestore</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!articleToDelete}
        title="Delete News Article"
        message={`Are you sure you want to permanently delete "${articleToDelete?.title}" from the live Firestore database? This action cannot be undone.`}
        confirmText="Delete Article"
        confirmVariant="danger"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setArticleToDelete(null)}
      />

      {/* Import / Seed Confirmation Modal */}
      <ConfirmModal
        isOpen={isImportModalOpen}
        title="Import Site News Articles into Firestore"
        message="This will import the 9 default news, press releases, and announcements from site.ts directly into your live Firestore 'news' collection. Any existing documents with matching IDs will be cleanly merged."
        confirmText="Start Import"
        confirmVariant="primary"
        isLoading={isMigrating}
        onConfirm={handleConfirmMigration}
        onCancel={() => setIsImportModalOpen(false)}
      />
    </div>
  );
};
