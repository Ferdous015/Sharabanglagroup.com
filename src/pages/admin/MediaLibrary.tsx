import React, { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Loader2,
  FolderOpen,
  Calendar,
  Tag as TagIcon,
  Eye,
  X,
  AlertCircle,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { uploadImageToCloudinary } from '../../lib/cloudinary';
import {
  MediaItem,
  getMediaItemsFromFirestore,
  saveMediaItemToFirestore,
  deleteMediaItemFromFirestore,
} from '../../services/mediaLibraryService';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { ToastNotification, ToastMessage } from '../../components/admin/ToastNotification';

interface UploadTask {
  id: string;
  file: File;
  fileName: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progressText: string;
  error?: string;
  url?: string;
}

const PRESET_TAGS = [
  { id: 'all', label: 'All Images' },
  { id: 'general', label: 'General' },
  { id: 'news', label: 'News & Press' },
  { id: 'jobs', label: 'Career & Jobs' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'hero', label: 'Hero & Banners' },
  { id: 'companies', label: 'Companies' },
  { id: 'leadership', label: 'Leadership' },
];

export const MediaLibrary: React.FC = () => {
  // Main Data States
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string>('all');

  // Upload Modal & Upload Queue States
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [uploadTasks, setUploadTasks] = useState<UploadTask[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedUploadTag, setSelectedUploadTag] = useState<string>('general');
  const [customTagInput, setCustomTagInput] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Preview & Interaction States
  const [previewImage, setPreviewImage] = useState<MediaItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addToast = (type: 'success' | 'error' | 'info' | 'warning', message: string, title?: string) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      type,
      title,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch all media items
  const loadMedia = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) setRefreshing(true);
      else setLoading(true);
      const data = await getMediaItemsFromFirestore();
      setMediaList(Array.isArray(data) ? data : []);
      if (isManualRefresh) {
        addToast('success', 'Media library refreshed from Firestore.');
      }
    } catch (err: any) {
      console.error('Error fetching media items:', err);
      addToast('error', err.message || 'Failed to load media library.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  // Filtered media list based on search and selected tag
  const filteredMedia = mediaList.filter((item) => {
    const matchesSearch =
      (item.fileName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tag || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.url || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = activeTag === 'all' || item.tag === activeTag;

    return matchesSearch && matchesTag;
  });

  // Handle files selected for upload
  const handleFilesSelected = (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((file) => file.type.startsWith('image/'));
    
    if (fileArray.length === 0) {
      addToast('warning', 'Please select valid image files (PNG, JPG, JPEG, WEBP, SVG, etc.).');
      return;
    }

    const newTasks: UploadTask[] = fileArray.map((file) => ({
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      file,
      fileName: file.name,
      status: 'pending',
      progressText: 'Ready to upload',
    }));

    setUploadTasks((prev) => [...prev, ...newTasks]);
    setIsUploadModalOpen(true);
  };

  // Execute upload queue to Cloudinary and Firestore
  const handleStartUpload = async () => {
    const pendingTasks = uploadTasks.filter((t) => t.status === 'pending' || t.status === 'error');
    if (pendingTasks.length === 0) return;

    setIsUploading(true);
    const finalTag = customTagInput.trim() || selectedUploadTag;
    let successCount = 0;
    let errorCount = 0;

    for (const task of pendingTasks) {
      // Mark as uploading
      setUploadTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: 'uploading', progressText: 'Uploading to Cloudinary...' } : t))
      );

      try {
        // Step 1: Upload to Cloudinary CDN
        const secureUrl = await uploadImageToCloudinary(task.file);

        // Step 2: Create Firestore Document
        const newMediaItem: MediaItem = {
          id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          url: secureUrl,
          fileName: task.fileName,
          uploadedAt: Date.now(),
          tag: finalTag,
          fileSize: task.file.size,
        };

        await saveMediaItemToFirestore(newMediaItem);

        // Update task status
        setUploadTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? { ...t, status: 'success', progressText: 'Uploaded & Saved', url: secureUrl }
              : t
          )
        );

        // Add to local state (prepend newest)
        setMediaList((prev) => [newMediaItem, ...prev]);
        successCount++;
      } catch (err: any) {
        console.error(`Failed to upload ${task.fileName}:`, err);
        setUploadTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? { ...t, status: 'error', progressText: 'Failed', error: err.message || 'Upload error' }
              : t
          )
        );
        errorCount++;
      }
    }

    setIsUploading(false);

    if (successCount > 0) {
      addToast('success', `Successfully uploaded ${successCount} image${successCount > 1 ? 's' : ''} to Media Library.`);
    }
    if (errorCount > 0) {
      addToast('error', `${errorCount} image upload${errorCount > 1 ? 's' : ''} encountered an issue.`);
    }
  };

  // Copy Cloudinary URL to clipboard
  const handleCopyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      addToast('success', 'Cloudinary URL copied to clipboard!', 'Copied!');
      setTimeout(() => {
        setCopiedId(null);
      }, 2500);
    } catch (err) {
      console.error('Failed to copy text:', err);
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(id);
      addToast('success', 'Cloudinary URL copied to clipboard!', 'Copied!');
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // Delete media item from Firestore
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);

    try {
      await deleteMediaItemFromFirestore(itemToDelete.id);
      setMediaList((prev) => prev.filter((item) => item.id !== itemToDelete.id));
      addToast('success', `"${itemToDelete.fileName}" was removed from the Media Library.`);
      setItemToDelete(null);
    } catch (err: any) {
      console.error('Failed to delete media item:', err);
      addToast('error', err.message || 'Failed to remove media item from Firestore.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Toast Notifications */}
      <ToastNotification toasts={toasts} onDismiss={removeToast} />

      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8E4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF6EE] text-[#0E5C2E] text-xs font-bold mb-2 border border-[#0E5C2E]/20">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Central Image Storage & Cloudinary CDN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#0E5C2E] tracking-tight">
            Media Library
          </h1>
          <p className="mt-1 text-sm text-[#5A6170]">
            Upload, preview, organize, and copy image CDN URLs for News, Circulars, Testimonials, and Corporate Portfolios.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => loadMedia(true)}
            disabled={refreshing || loading}
            className="p-2.5 rounded-xl border border-[#E2E8E4] text-[#5A6170] hover:text-[#0E5C2E] hover:bg-[#F6F8F7] transition-all cursor-pointer disabled:opacity-50"
            title="Refresh from Firestore"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#0E5C2E]' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => {
              setUploadTasks([]);
              setIsUploadModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] active:bg-[#07361B] transition-all shadow-xs cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Image</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8E4] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#8C95A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images by file name, tag, or URL..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl text-[#2B2B2B] focus:bg-white focus:border-[#0E5C2E] focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C95A6] hover:text-[#2B2B2B]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs font-bold text-[#5A6170] shrink-0 self-end sm:self-center">
            Showing <span className="text-[#0E5C2E]">{filteredMedia.length}</span> of {mediaList.length} items
          </div>
        </div>

        {/* Tag Filtering Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs pt-1 no-scrollbar">
          <span className="text-[#8C95A6] font-semibold text-[11px] uppercase mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Filter:</span>
          </span>
          {PRESET_TAGS.map((tag) => {
            const isActive = activeTag === tag.id;
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => setActiveTag(tag.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0E5C2E] text-white shadow-xs'
                    : 'bg-[#F0F2F1] text-[#5A6170] hover:bg-[#E2E8E4] hover:text-[#0E5C2E]'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid View */}
      {loading ? (
        <div className="p-20 text-center bg-white rounded-2xl border border-[#E2E8E4]">
          <Loader2 className="w-9 h-9 text-[#0E5C2E] animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#5A6170]">Loading Media Library from Firestore...</p>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-2xl border border-[#E2E8E4] space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#EAF6EE] text-[#0E5C2E] flex items-center justify-center mx-auto">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#2B2B2B]">
            {mediaList.length === 0 ? 'No images yet in Media Library' : 'No matching images found'}
          </h3>
          <p className="text-xs sm:text-sm text-[#5A6170] max-w-md mx-auto">
            {mediaList.length === 0
              ? 'Click the button below to upload your first image. Uploaded images will be permanently stored on Cloudinary CDN and indexed in Firestore.'
              : 'Try adjusting your search keyword or switching tag categories.'}
          </p>
          {mediaList.length === 0 && (
            <button
              type="button"
              onClick={() => {
                setUploadTasks([]);
                setIsUploadModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] transition-all shadow-xs cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload New Image</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredMedia.map((item) => {
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E2E8E4] overflow-hidden shadow-xs hover:shadow-md hover:border-[#0E5C2E]/40 transition-all flex flex-col group"
              >
                {/* Thumbnail Container */}
                <div className="relative w-full aspect-4/3 bg-[#F6F8F7] overflow-hidden border-b border-[#E2E8E4]">
                  <img
                    src={item.url}
                    alt={item.fileName}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Hover Overlay Controls */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      type="button"
                      onClick={() => setPreviewImage(item)}
                      className="p-2 rounded-xl bg-white/90 text-[#2B2B2B] hover:bg-white hover:text-[#0E5C2E] transition-transform hover:scale-110 shadow-lg cursor-pointer"
                      title="Preview Full Size"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/90 text-[#2B2B2B] hover:bg-white hover:text-[#0E5C2E] transition-transform hover:scale-110 shadow-lg cursor-pointer"
                      title="Open in new window"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Tag Badge */}
                  {item.tag && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#0E5C2E] border border-black/5 shadow-xs flex items-center gap-1">
                        <TagIcon className="w-2.5 h-2.5" />
                        <span>{item.tag}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Details & Actions */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4
                      className="text-xs font-bold text-[#2B2B2B] truncate group-hover:text-[#0E5C2E] transition-colors"
                      title={item.fileName}
                    >
                      {item.fileName}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[#8C95A6]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(item.uploadedAt)}</span>
                      </span>
                      {item.fileSize && (
                        <>
                          <span>•</span>
                          <span>{formatFileSize(item.fileSize)}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="pt-2 border-t border-[#E2E8E4]/60 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(item.url, item.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-[#EAF6EE] text-[#0E5C2E] border border-[#0E5C2E]/30'
                          : 'bg-[#F6F8F7] hover:bg-[#EAF6EE] text-[#5A6170] hover:text-[#0E5C2E] border border-[#E2E8E4]'
                      }`}
                      title="Copy Cloudinary URL"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#0E5C2E]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setItemToDelete(item)}
                      className="p-1.5 rounded-lg text-[#8C95A6] hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                      title="Delete from Media Library"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal with Multi-File Upload Queue */}
      {isUploadModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#E2E8E4] space-y-5 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8E4]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EAF6EE] text-[#0E5C2E] flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#2B2B2B]">Upload Images</h3>
                  <p className="text-xs text-[#5A6170]">Images are hosted securely on Cloudinary CDN and saved to Firestore</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!isUploading) setIsUploadModalOpen(false);
                }}
                disabled={isUploading}
                className="p-1.5 rounded-lg text-[#8C95A6] hover:text-[#2B2B2B] hover:bg-[#F0F2F1] cursor-pointer disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tag Selection Row */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#2B2B2B] flex items-center gap-1.5">
                <TagIcon className="w-3.5 h-3.5 text-[#0E5C2E]" />
                <span>Assign Category / Tag:</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select
                  value={selectedUploadTag}
                  onChange={(e) => {
                    setSelectedUploadTag(e.target.value);
                    if (e.target.value !== 'custom') setCustomTagInput('');
                  }}
                  disabled={isUploading}
                  className="px-3 py-2 text-xs font-semibold bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl text-[#2B2B2B] focus:border-[#0E5C2E] focus:outline-none"
                >
                  <option value="general">General Asset</option>
                  <option value="news">News & Press Article</option>
                  <option value="jobs">Career & Recruitment</option>
                  <option value="testimonials">Testimonials / Partner Headshot</option>
                  <option value="hero">Hero & Homepage Slider</option>
                  <option value="companies">Subsidiary / Concern</option>
                  <option value="leadership">Executive Leadership</option>
                  <option value="custom">Custom Tag...</option>
                </select>

                {selectedUploadTag === 'custom' && (
                  <input
                    type="text"
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    placeholder="Enter custom tag (e.g. CSR, event, factory)..."
                    disabled={isUploading}
                    className="px-3 py-2 text-xs bg-[#FAFCFB] border border-[#E2E8E4] rounded-xl text-[#2B2B2B] focus:border-[#0E5C2E] focus:outline-none"
                  />
                )}
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFilesSelected(e.target.files);
                }
              }}
            />

            {/* Drag & Drop Box */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  handleFilesSelected(e.dataTransfer.files);
                }
              }}
              onClick={() => {
                if (!isUploading) fileInputRef.current?.click();
              }}
              className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer ${
                isDragging
                  ? 'border-[#0E5C2E] bg-[#EAF6EE]'
                  : 'border-[#E2E8E4] hover:border-[#0E5C2E]/60 bg-[#FAFCFB]'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E2E8E4] text-[#0E5C2E] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#2B2B2B]">
                Click to browse or drag & drop images here
              </p>
              <p className="text-[11px] text-[#8C95A6] mt-1">
                Supports PNG, JPG, JPEG, WEBP, SVG • Multi-file upload supported
              </p>
            </div>

            {/* Selected Files List / Upload Queue */}
            {uploadTasks.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#5A6170]">
                  <span>Selected Files ({uploadTasks.length})</span>
                  {!isUploading && (
                    <button
                      type="button"
                      onClick={() => setUploadTasks([])}
                      className="text-red-600 hover:underline text-[11px] cursor-pointer"
                    >
                      Clear Queue
                    </button>
                  )}
                </div>

                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {uploadTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 bg-[#FAFCFB] rounded-xl border border-[#E2E8E4] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <ImageIcon className="w-4 h-4 text-[#8C95A6] shrink-0" />
                        <span className="font-semibold text-[#2B2B2B] truncate">{task.fileName}</span>
                        <span className="text-[10px] text-[#8C95A6] shrink-0">
                          ({formatFileSize(task.file.size)})
                        </span>
                      </div>

                      {/* Status indicator */}
                      <div className="shrink-0 flex items-center gap-2">
                        {task.status === 'uploading' && (
                          <span className="text-[11px] font-bold text-[#0E5C2E] flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>Uploading...</span>
                          </span>
                        )}
                        {task.status === 'success' && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Done</span>
                          </span>
                        )}
                        {task.status === 'error' && (
                          <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 flex items-center gap-1" title={task.error}>
                            <AlertCircle className="w-3 h-3 text-red-600" />
                            <span>Failed</span>
                          </span>
                        )}
                        {task.status === 'pending' && !isUploading && (
                          <button
                            type="button"
                            onClick={() =>
                              setUploadTasks((prev) => prev.filter((t) => t.id !== task.id))
                            }
                            className="text-[#8C95A6] hover:text-red-600 p-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8E4]">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                disabled={isUploading}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#5A6170] hover:bg-[#F0F2F1] cursor-pointer disabled:opacity-50"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleStartUpload}
                disabled={
                  isUploading ||
                  uploadTasks.length === 0 ||
                  uploadTasks.every((t) => t.status === 'success')
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] disabled:opacity-50 transition-all shadow-xs cursor-pointer"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading Images...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Start Upload</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Resolution Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-[#E2E8E4] space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8E4]">
              <div className="truncate pr-4">
                <h3 className="font-bold text-sm text-[#2B2B2B] truncate">{previewImage.fileName}</h3>
                <p className="text-[11px] text-[#8C95A6]">
                  {formatDate(previewImage.uploadedAt)} • Tag: {previewImage.tag || 'general'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-lg text-[#8C95A6] hover:text-[#2B2B2B] hover:bg-[#F0F2F1] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-black/5 flex items-center justify-center max-h-[60vh]">
              <img
                src={previewImage.url}
                alt={previewImage.fileName}
                className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="p-3 bg-[#FAFCFB] rounded-xl border border-[#E2E8E4] flex items-center justify-between gap-3 text-xs">
              <span className="font-mono text-[11px] text-[#5A6170] truncate">{previewImage.url}</span>
              <button
                type="button"
                onClick={() => handleCopyUrl(previewImage.url, previewImage.id)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E5C2E] text-white font-bold hover:bg-[#0A4724] transition-all cursor-pointer shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy URL</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!itemToDelete}
        title="Remove from Media Library"
        message={
          <div>
            Are you sure you want to remove <span className="font-bold text-[#2B2B2B]">"{itemToDelete?.fileName}"</span> from the Media Library?
            <p className="text-xs text-[#8C95A6] mt-2">
              Note: This will delete the Firestore index record. It will no longer appear in your media list.
            </p>
          </div>
        }
        confirmText="Remove Image"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
        loadingText="Removing..."
        onConfirm={handleConfirmDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
};
