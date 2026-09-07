import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquareQuote,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  RotateCcw,
  DownloadCloud,
  Globe,
  Sparkles,
  Loader2,
  Upload,
  Image as ImageIcon,
  Quote,
  ShieldCheck,
  Building2,
  MapPin
} from 'lucide-react';
import { Testimonial, testimonials as defaultTestimonials } from '../../data/site';
import {
  getTestimonialsFromFirestore,
  saveTestimonialToFirestore,
  deleteTestimonialFromFirestore,
  migrateExistingTestimonials,
} from '../../services/testimonialsService';
import { uploadImageToCloudinary } from '../../lib/cloudinary';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { ToastNotification, ToastMessage, ToastType } from '../../components/admin/ToastNotification';

const EMPTY_TESTIMONIAL: Testimonial = {
  id: '',
  name: '',
  banglaName: '',
  zhName: '',
  title: '',
  banglaTitle: '',
  zhTitle: '',
  company: '',
  banglaCompany: '',
  zhCompany: '',
  market: '',
  banglaMarket: '',
  zhMarket: '',
  country: 'China',
  flag: '🇨🇳',
  quote: '',
  banglaQuote: '',
  zhQuote: '',
  photoUrl: '',
};

const COMMON_MARKETS = [
  { label: 'China (Guangzhou)', country: 'China', flag: '🇨🇳', bnMarket: 'চীন (গুয়াংজু)', zhMarket: '中国（广州）' },
  { label: 'China (Hangzhou / Zhejiang)', country: 'China', flag: '🇨🇳', bnMarket: 'চীন (হাংচৌ / ঝেজিয়াং)', zhMarket: '中国（杭州/浙江）' },
  { label: 'China (Shenzhen / GBA)', country: 'China', flag: '🇨🇳', bnMarket: 'চীন (শেনজেন / জিবিএ)', zhMarket: '中国（深圳/粤港澳大湾区）' },
  { label: 'China (Beijing)', country: 'China', flag: '🇨🇳', bnMarket: 'চীন (বেইজিং)', zhMarket: '中国（北京）' },
  { label: 'Hong Kong (Financial Hub)', country: 'Hong Kong', flag: '🇭🇰', bnMarket: 'হংকং (আর্থিক হাব)', zhMarket: '中国香港（金融贸易枢纽）' },
  { label: 'Vietnam (Ho Chi Minh City)', country: 'Vietnam', flag: '🇻🇳', bnMarket: 'ভিয়েতনাম (হো চি মিন সিটি)', zhMarket: '越南（胡志明市）' },
  { label: 'UAE (Dubai / Middle East)', country: 'UAE', flag: '🇦🇪', bnMarket: 'সংযুক্ত আরব আমিরাত (দুবাই)', zhMarket: '阿联酋（迪拜/中东）' },
  { label: 'India (Kolkata)', country: 'India', flag: '🇮🇳', bnMarket: 'ভারত (কলকাতা)', zhMarket: '印度（加尔各答）' },
  { label: 'USA (New York)', country: 'USA', flag: '🇺🇸', bnMarket: 'মার্কিন যুক্তরাষ্ট্র (নিউ ইয়র্ক)', zhMarket: '美国（纽约）' },
  { label: 'Europe (Frankfurt, Germany)', country: 'Germany', flag: '🇩🇪', bnMarket: 'জার্মানি (ফ্রাঙ্কফুর্ট, ইউরোপ)', zhMarket: '德国（法兰克福/欧洲）' },
  { label: 'Türkiye (Sakarya / Istanbul)', country: 'Türkiye', flag: '🇹🇷', bnMarket: 'তুরস্ক (সাকারিয়া / ইস্তাম্বুল)', zhMarket: '土耳其（萨卡里亚/伊斯坦布尔）' },
  { label: 'Bangladesh (Dhaka)', country: 'Bangladesh', flag: '🇧🇩', bnMarket: 'বাংলাদেশ (ঢাকা)', zhMarket: '孟加拉国（达卡）' },
];

export const TestimonialsManager: React.FC = () => {
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // In-app toasts notification state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial>(EMPTY_TESTIMONIAL);
  const [isSaving, setIsSaving] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'bn' | 'zh'>('en');
  const [isTranslating, setIsTranslating] = useState(false);

  // Cloudinary image upload
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Delete Confirmation modal state
  const [itemToDelete, setItemToDelete] = useState<Testimonial | null>(null);
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

  // Load testimonials from Firestore
  const loadTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTestimonialsFromFirestore();
      setTestimonialsList(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('Failed to load testimonials:', err);
      setError(err.message || 'Failed to load testimonials from Firestore');
      addToast('error', 'Unable to retrieve live testimonials from Firestore database.', 'Fetch Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  // Filtered list based on search and country
  const filteredTestimonials = (testimonialsList || []).filter((item) => {
    if (!item) return false;
    const matchesSearch =
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.banglaName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.zhName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.market || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.quote || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry = selectedCountry === 'ALL' || item.country === selectedCountry;

    return matchesSearch && matchesCountry;
  });

  const availableCountries = ['ALL', ...Array.from(new Set((testimonialsList || []).map((t) => t?.country).filter(Boolean)))];

  // Open Modal for Create
  const handleOpenCreateModal = () => {
    const defaultMarket = COMMON_MARKETS[0];
    setEditingItem({
      ...EMPTY_TESTIMONIAL,
      id: `testimonial-${Date.now()}`,
      country: defaultMarket.country,
      flag: defaultMarket.flag,
      market: defaultMarket.label,
      banglaMarket: defaultMarket.bnMarket,
      zhMarket: defaultMarket.zhMarket,
    });
    setActiveLangTab('en');
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (item: Testimonial) => {
    setEditingItem({ ...item });
    setActiveLangTab('en');
    setIsModalOpen(true);
  };

  // Handle Cloudinary Avatar Upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      addToast('warning', 'Please select a valid image file (PNG, JPG, WEBP).', 'Invalid File');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      addToast('warning', 'Avatar image size should be under 8MB.', 'File Too Large');
      return;
    }

    try {
      setIsUploadingPhoto(true);
      const secureUrl = await uploadImageToCloudinary(file);
      setEditingItem((prev) => ({ ...prev, photoUrl: secureUrl }));
      addToast('success', 'Avatar image uploaded successfully to Cloudinary CDN.', 'Image Uploaded');
    } catch (err: any) {
      console.error('Cloudinary photo upload error:', err);
      addToast('error', err.message || 'Failed to upload photo.', 'Upload Failed');
    } finally {
      setIsUploadingPhoto(false);
      if (photoInputRef.current) {
        photoInputRef.current.value = '';
      }
    }
  };

  // AI Auto-Translate Handler with Gemini
  const handleAiAutoTranslate = async () => {
    if (!editingItem.name.trim() && !editingItem.quote.trim()) {
      addToast('warning', 'Please fill in the English Name and Quote first before auto-translating.', 'Missing Content');
      return;
    }

    try {
      setIsTranslating(true);
      const response = await fetch('/api/gemini/translate-testimonial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingItem.name,
          title: editingItem.title,
          company: editingItem.company,
          market: editingItem.market,
          quote: editingItem.quote,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success || !resData.translations) {
        throw new Error(resData.error || 'Failed to auto-translate with Gemini AI.');
      }

      const { bangla, chinese } = resData.translations;

      setEditingItem((prev) => ({
        ...prev,
        banglaName: bangla?.name || prev.banglaName,
        banglaTitle: bangla?.title || prev.banglaTitle,
        banglaCompany: bangla?.company || prev.banglaCompany,
        banglaMarket: bangla?.market || prev.banglaMarket,
        banglaQuote: bangla?.quote || prev.banglaQuote,
        zhName: chinese?.name || prev.zhName,
        zhTitle: chinese?.title || prev.zhTitle,
        zhCompany: chinese?.company || prev.zhCompany,
        zhMarket: chinese?.market || prev.zhMarket,
        zhQuote: chinese?.quote || prev.zhQuote,
      }));

      addToast('success', 'Bangla and Chinese fields populated! Please review before saving.', 'Auto-Translation Complete');
    } catch (err: any) {
      console.error('Translation error:', err);
      addToast('error', err.message || 'Failed to auto-translate testimonial.', 'Translation Error');
    } finally {
      setIsTranslating(false);
    }
  };

  // Save to Firestore
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingItem.name.trim()) {
      addToast('warning', 'Testimonial Author Name is required.', 'Validation Error');
      return;
    }

    if (!editingItem.quote.trim()) {
      addToast('warning', 'Testimonial Quote text is required.', 'Validation Error');
      return;
    }

    try {
      setIsSaving(true);
      await saveTestimonialToFirestore(editingItem);
      addToast('success', `Testimonial from "${editingItem.name}" saved directly to Firestore.`, 'Saved Successfully');
      setIsModalOpen(false);
      await loadTestimonials();
    } catch (err: any) {
      console.error('Error saving testimonial:', err);
      addToast('error', err.message || 'Failed to save testimonial to Firestore.', 'Save Error');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete from Firestore
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setIsDeleting(true);
      await deleteTestimonialFromFirestore(itemToDelete.id);
      addToast('success', `Testimonial from "${itemToDelete.name}" deleted permanently.`, 'Deleted');
      setItemToDelete(null);
      await loadTestimonials();
    } catch (err: any) {
      console.error('Error deleting testimonial:', err);
      addToast('error', err.message || 'Failed to delete testimonial from Firestore.', 'Delete Error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Seed / Migration of default 18 testimonials
  const handleConfirmMigration = async () => {
    try {
      setIsMigrating(true);
      const count = await migrateExistingTestimonials();
      addToast('success', `Successfully imported ${count} default testimonials into Firestore "testimonials" collection!`, 'Import Completed');
      setIsImportModalOpen(false);
      await loadTestimonials();
    } catch (err: any) {
      console.error('Migration error:', err);
      addToast('error', err.message || 'Failed to import default testimonials.', 'Import Failed');
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8E4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF6EE] text-[#0E5C2E] text-xs font-bold mb-2 border border-[#0E5C2E]/20">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Global Partner Testimonials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#0E5C2E] tracking-tight">
            Partner Testimonials Management
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6170] mt-1">
            Manage authentic perspectives from supply chain directors, sourcing managers, and global buyers. Live in Firestore.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] border border-[#0E5C2E]/20 transition-colors shadow-xs cursor-pointer"
            title="Import the 18 default international testimonials from static files into Firestore"
          >
            <DownloadCloud className="w-4 h-4" />
            <span>Import Existing (18)</span>
          </button>

          <button
            type="button"
            onClick={loadTestimonials}
            disabled={loading}
            className="p-2.5 rounded-xl text-[#5A6170] hover:text-[#0E5C2E] hover:bg-[#F6F8F7] border border-[#E2E8E4] transition-colors cursor-pointer"
            title="Refresh list from Firestore"
          >
            <RotateCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Testimonial</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8E4] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C95A6]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, company, market..."
            className="w-full pl-10 pr-4 py-2 bg-[#F6F8F7] border border-[#E2E8E4] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0E5C2E] focus:bg-white transition-all text-[#2B2B2B]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#8C95A6]" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-[#F6F8F7] border border-[#E2E8E4] rounded-xl px-3 py-2 text-xs font-bold text-[#2B2B2B] focus:outline-none focus:border-[#0E5C2E]"
            >
              {availableCountries.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? `All Countries (${testimonialsList?.length || 0})` : c}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs font-bold text-[#5A6170]">
            Showing <span className="text-[#0E5C2E]">{filteredTestimonials?.length || 0}</span> of {testimonialsList?.length || 0}
          </div>
        </div>
      </div>

      {/* Main List Table / Cards */}
      {loading ? (
        <div className="p-16 text-center bg-white rounded-2xl border border-[#E2E8E4]">
          <Loader2 className="w-8 h-8 text-[#0E5C2E] animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#5A6170]">Loading testimonials from Firestore...</p>
        </div>
      ) : (filteredTestimonials?.length || 0) === 0 ? (
        <div className="p-16 text-center bg-white rounded-2xl border border-[#E2E8E4] space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF6EE] text-[#0E5C2E] flex items-center justify-center mx-auto">
            <MessageSquareQuote className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[#2B2B2B]">
            {(testimonialsList?.length || 0) === 0 ? 'No Testimonials in Firestore' : 'No Matching Testimonials'}
          </h3>
          <p className="text-xs sm:text-sm text-[#5A6170] max-w-md mx-auto">
            {(testimonialsList?.length || 0) === 0
              ? 'Your Firestore "testimonials" collection is currently empty. Click below to seed the 18 default international partner testimonials or add a new one.'
              : 'Try clearing your search query or selecting a different country filter.'}
          </p>
          {(testimonialsList?.length || 0) === 0 && (
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] transition-all shadow-xs cursor-pointer"
              >
                <DownloadCloud className="w-4 h-4" />
                <span>Import 18 Default Testimonials</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E2E8E4] p-5 shadow-xs hover:border-[#1E9B4C] hover:shadow-md transition-all flex flex-col justify-between group relative"
            >
              <div>
                {/* Card Top: Avatar, Name, Title, Flag & Actions */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      {item.photoUrl ? (
                        <img
                          src={item.photoUrl}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#1E9B4C] shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#EAF6EE] text-[#0E5C2E] font-black text-base flex items-center justify-center border-2 border-[#1E9B4C]">
                          {item.name ? item.name.charAt(0) : '?'}
                        </div>
                      )}
                      <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full p-0.5 shadow-xs">
                        {item.flag || '🌐'}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-heading font-extrabold text-sm text-[#0E5C2E] truncate group-hover:text-[#1E9B4C] transition-colors">
                        {item.name}
                      </h3>
                      {item.banglaName && (
                        <div className="text-[11px] text-[#5A6170] truncate">{item.banglaName}</div>
                      )}
                      <div className="text-[11px] font-semibold text-[#5A6170] truncate mt-0.5">{item.title}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1.5 rounded-lg text-[#5A6170] hover:text-[#0E5C2E] hover:bg-[#F6F8F7] transition-colors cursor-pointer"
                      title="Edit Testimonial"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setItemToDelete(item)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Testimonial"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Company & Market Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[11px]">
                  {item.company && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F6F8F7] text-[#0E5C2E] font-bold border border-[#E2E8E4] truncate max-w-[200px]">
                      <Building2 className="w-3 h-3 text-[#1E9B4C] shrink-0" />
                      <span className="truncate">{item.company}</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                    <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{item.market || item.country}</span>
                  </span>
                </div>

                {/* Quote Excerpt */}
                <div className="relative p-3 rounded-xl bg-[#FAFCFB] border border-[#E2E8E4] text-xs text-[#2B2B2B] italic leading-relaxed line-clamp-3 mb-3">
                  <Quote className="w-3.5 h-3.5 text-[#1E9B4C] opacity-40 inline mr-1" />
                  "{item.quote}"
                </div>
              </div>

              {/* Card Footer: Trilingual Indicator */}
              <div className="pt-2 border-t border-[#E2E8E4] flex items-center justify-between text-[10px] text-[#8C95A6]">
                <div className="flex items-center gap-1.5 font-bold">
                  <span className={`px-1.5 py-0.5 rounded ${item.quote ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-400'}`}>
                    EN
                  </span>
                  <span className={`px-1.5 py-0.5 rounded ${item.banglaQuote ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-400'}`}>
                    BN
                  </span>
                  <span className={`px-1.5 py-0.5 rounded ${item.zhQuote ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-400'}`}>
                    ZH
                  </span>
                </div>
                <div className="flex items-center gap-1 text-emerald-700 font-bold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#E2E8E4] space-y-6 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8E4]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF6EE] text-[#0E5C2E] flex items-center justify-center">
                  <MessageSquareQuote className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-heading font-black text-[#0E5C2E]">
                    {editingItem.id && testimonialsList.some((t) => t.id === editingItem.id)
                      ? 'Edit Partner Testimonial'
                      : 'Add New Partner Testimonial'}
                  </h2>
                  <p className="text-xs text-[#5A6170]">Trilingual testimonial profile & Cloudinary photo</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-[#8C95A6] hover:text-[#2B2B2B] hover:bg-[#F0F2F1] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-6">
              {/* Photo & Common Details Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 rounded-xl bg-[#F6F8F7] border border-[#E2E8E4]">
                {/* Photo Upload Box */}
                <div className="flex flex-col items-center sm:items-start space-y-3">
                  <label className="text-xs font-bold text-[#0E5C2E] uppercase tracking-wider">
                    Avatar Photo
                  </label>
                  <div className="relative group">
                    {editingItem.photoUrl ? (
                      <img
                        src={editingItem.photoUrl}
                        alt="Avatar preview"
                        className="w-20 h-20 rounded-full object-cover border-2 border-[#1E9B4C] shadow-md"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-white border-2 border-dashed border-[#1E9B4C] flex flex-col items-center justify-center text-[#8C95A6]">
                        <ImageIcon className="w-6 h-6 text-[#1E9B4C]" />
                        <span className="text-[10px] mt-1 font-bold text-[#5A6170]">Upload</span>
                      </div>
                    )}

                    {isUploadingPhoto && (
                      <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center text-white">
                        <Loader2 className="w-6 h-6 animate-spin" />
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={photoInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      disabled={isUploadingPhoto}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#E2E8E4] text-xs font-bold text-[#0E5C2E] hover:bg-[#EAF6EE] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploadingPhoto ? 'Uploading...' : 'Cloudinary Upload'}</span>
                    </button>
                    {editingItem.photoUrl && (
                      <button
                        type="button"
                        onClick={() => setEditingItem((prev) => ({ ...prev, photoUrl: '' }))}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-bold"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="url"
                    value={editingItem.photoUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, photoUrl: e.target.value })}
                    placeholder="Or paste Direct Image URL..."
                    className="w-full text-[11px] p-2 bg-white border border-[#E2E8E4] rounded-lg focus:outline-none focus:border-[#0E5C2E]"
                  />
                </div>

                {/* Country & Market Fast Selection */}
                <div className="sm:col-span-2 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Country / Territory
                      </label>
                      <input
                        type="text"
                        value={editingItem.country}
                        onChange={(e) => setEditingItem({ ...editingItem, country: e.target.value })}
                        placeholder="e.g. China, USA, Germany"
                        required
                        className="w-full text-xs p-2.5 bg-white border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Flag Emoji
                      </label>
                      <input
                        type="text"
                        value={editingItem.flag}
                        onChange={(e) => setEditingItem({ ...editingItem, flag: e.target.value })}
                        placeholder="e.g. 🇨🇳, 🇺🇸, 🇩🇪"
                        required
                        className="w-full text-xs p-2.5 bg-white border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>
                  </div>

                  {/* Preset Common Markets Selector */}
                  <div>
                    <label className="block text-xs font-bold text-[#5A6170] mb-1">
                      Quick Preset Market Selection:
                    </label>
                    <select
                      onChange={(e) => {
                        const match = COMMON_MARKETS.find((m) => m.label === e.target.value);
                        if (match) {
                          setEditingItem((prev) => ({
                            ...prev,
                            country: match.country,
                            flag: match.flag,
                            market: match.label,
                            banglaMarket: match.bnMarket,
                            zhMarket: match.zhMarket,
                          }));
                        }
                      }}
                      className="w-full text-xs p-2 bg-white border border-[#E2E8E4] rounded-xl font-medium focus:outline-none focus:border-[#0E5C2E]"
                    >
                      <option value="">-- Select from 12 Standard Trading Hubs --</option>
                      {COMMON_MARKETS.map((m) => (
                        <option key={m.label} value={m.label}>
                          {m.flag} {m.label} ({m.country})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Trilingual Tabs Header & AI Translate Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1 bg-[#F6F8F7] p-1 rounded-xl border border-[#E2E8E4] w-fit">
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('en')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeLangTab === 'en'
                        ? 'bg-[#0E5C2E] text-white shadow-xs'
                        : 'text-[#5A6170] hover:text-[#0E5C2E]'
                    }`}
                  >
                    English (Primary)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('bn')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeLangTab === 'bn'
                        ? 'bg-[#0E5C2E] text-white shadow-xs'
                        : 'text-[#5A6170] hover:text-[#0E5C2E]'
                    }`}
                  >
                    বাংলা (Bangla)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('zh')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeLangTab === 'zh'
                        ? 'bg-[#0E5C2E] text-white shadow-xs'
                        : 'text-[#5A6170] hover:text-[#0E5C2E]'
                    }`}
                  >
                    中文 (Simplified Chinese)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAiAutoTranslate}
                  disabled={isTranslating}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] border border-[#0E5C2E]/20 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
                  title="Auto-translate English fields to Bangla & Chinese via Gemini AI"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-[#1E9B4C] ${isTranslating ? 'animate-spin' : ''}`} />
                  <span>{isTranslating ? 'Translating with AI...' : 'Auto-Translate with Gemini AI'}</span>
                </button>
              </div>

              {/* Tab 1: English Content */}
              {activeLangTab === 'en' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Author Name (English) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        placeholder="e.g. Li Wei, Sarah Mitchell, Markus Weber"
                        required
                        className="w-full text-xs p-2.5 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Job Title / Executive Role (English) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        placeholder="e.g. Managing Director, Global Sourcing Director"
                        required
                        className="w-full text-xs p-2.5 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Company / Partner Organization
                      </label>
                      <input
                        type="text"
                        value={editingItem.company || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                        placeholder="e.g. Guangzhou Sourcing Alliance, Continental AG"
                        className="w-full text-xs p-2.5 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Trading Market / Territory Hub
                      </label>
                      <input
                        type="text"
                        value={editingItem.market}
                        onChange={(e) => setEditingItem({ ...editingItem, market: e.target.value })}
                        placeholder="e.g. China (Guangzhou), Europe (Frankfurt)"
                        required
                        className="w-full text-xs p-2.5 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                      Testimonial Quote (English) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={editingItem.quote}
                      onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                      placeholder="Enter partner perspective, reliability review, or sourcing praise..."
                      required
                      className="w-full text-xs p-3 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E] leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Bangla Content */}
              {activeLangTab === 'bn' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        নাম (বাংলা / Bangla Name)
                      </label>
                      <input
                        type="text"
                        value={editingItem.banglaName}
                        onChange={(e) => setEditingItem({ ...editingItem, banglaName: e.target.value })}
                        placeholder="যেমন: লি ওয়েই, সারাহ মিচেল, মার্কাস ওয়েবার"
                        className="w-full text-xs p-2.5 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        পদবী (বাংলা / Bangla Title)
                      </label>
                      <input
                        type="text"
                        value={editingItem.banglaTitle}
                        onChange={(e) => setEditingItem({ ...editingItem, banglaTitle: e.target.value })}
                        placeholder="যেমন: ম্যানেজিং ডিরেক্টর, গ্লোবাল সোর্সিং ডিরেক্টর"
                        className="w-full text-xs p-2.5 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        কোম্পানি (বাংলা / Bangla Company)
                      </label>
                      <input
                        type="text"
                        value={editingItem.banglaCompany || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, banglaCompany: e.target.value })}
                        placeholder="যেমন: গুয়াংজু সোর্সিং অ্যালায়েন্স"
                        className="w-full text-xs p-2.5 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        মার্কেট / হাব (বাংলা / Bangla Market)
                      </label>
                      <input
                        type="text"
                        value={editingItem.banglaMarket}
                        onChange={(e) => setEditingItem({ ...editingItem, banglaMarket: e.target.value })}
                        placeholder="যেমন: চীন (গুয়াংজু), জার্মানি (ফ্রাঙ্কফুর্ট)"
                        className="w-full text-xs p-2.5 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                      মূল্যায়ন উক্তি (বাংলা / Bangla Quote)
                    </label>
                    <textarea
                      rows={4}
                      value={editingItem.banglaQuote}
                      onChange={(e) => setEditingItem({ ...editingItem, banglaQuote: e.target.value })}
                      placeholder="বাংলা ভাষায় অংশীদারের অভিজ্ঞতা ও আস্থাভিত্তিক উক্তি লিখুন..."
                      className="w-full text-xs p-3 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E] leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Chinese Content */}
              {activeLangTab === 'zh' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        姓名 (中文 / Chinese Name)
                      </label>
                      <input
                        type="text"
                        value={editingItem.zhName || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, zhName: e.target.value })}
                        placeholder="例如: 李伟, 萨拉·米切尔, 马库斯·韦伯"
                        className="w-full text-xs p-2.5 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        职位 (中文 / Chinese Title)
                      </label>
                      <input
                        type="text"
                        value={editingItem.zhTitle || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, zhTitle: e.target.value })}
                        placeholder="例如: 总经理, 全球采购总监, 供应链负责人"
                        className="w-full text-xs p-2.5 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        所属公司/机构 (中文 / Chinese Company)
                      </label>
                      <input
                        type="text"
                        value={editingItem.zhCompany || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, zhCompany: e.target.value })}
                        placeholder="例如: 广州采供产业联盟, 欧洲大陆供应链集团"
                        className="w-full text-xs p-2.5 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        运营区域/枢纽 (中文 / Chinese Market)
                      </label>
                      <input
                        type="text"
                        value={editingItem.zhMarket || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, zhMarket: e.target.value })}
                        placeholder="例如: 中国（广州）, 德国（法兰克福）"
                        className="w-full text-xs p-2.5 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                      合作伙伴评价/引言 (中文 / Chinese Quote)
                    </label>
                    <textarea
                      rows={4}
                      value={editingItem.zhQuote || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, zhQuote: e.target.value })}
                      placeholder="输入来自国际合作伙伴的中文评价与推荐语..."
                      className="w-full text-xs p-3 bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl focus:outline-none focus:border-[#0E5C2E] leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8E4]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-xl border border-[#E2E8E4] text-xs font-bold text-[#5A6170] hover:bg-[#F6F8F7] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E5C2E] hover:bg-[#0A4724] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving to Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Testimonial</span>
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
        isOpen={!!itemToDelete}
        title="Delete Testimonial"
        variant="danger"
        message={
          <div>
            Are you sure you want to permanently delete the testimonial from{' '}
            <strong className="text-[#2B2B2B]">"{itemToDelete?.name}"</strong> ({itemToDelete?.company || itemToDelete?.market})?
            <br />
            This will immediately remove it from Firestore and the live website testimonial marquee.
          </div>
        }
        confirmText="Yes, Delete Testimonial"
        cancelText="Cancel"
        isLoading={isDeleting}
        loadingText="Deleting from Firestore..."
        onConfirm={handleConfirmDelete}
        onCancel={() => setItemToDelete(null)}
      />

      {/* Import / Seed Confirmation Modal */}
      <ConfirmModal
        isOpen={isImportModalOpen}
        title="Import Default Testimonials"
        variant="primary"
        message={
          <div>
            This action will import all <strong className="text-[#0E5C2E]">18 default international partner testimonials</strong> from static data into the Firestore <code className="text-[#0E5C2E] font-bold">testimonials</code> collection.
            <br />
            Existing documents with matching IDs will be safely merged and updated.
          </div>
        }
        confirmText="Start Import (18 Items)"
        cancelText="Cancel"
        isLoading={isMigrating}
        loadingText="Importing testimonials..."
        onConfirm={handleConfirmMigration}
        onCancel={() => setIsImportModalOpen(false)}
      />

      {/* Toast Notifications */}
      <ToastNotification toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
