import React, { useState, useEffect } from 'react';
import {
  Building2,
  Phone,
  Mail,
  Share2,
  MapPin,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  DownloadCloud,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Globe,
  HelpCircle,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  AlertCircle
} from 'lucide-react';
import { SiteInfo, RegisteredOffice, siteInfo as defaultSiteInfo } from '../../data/site';
import {
  getSiteInfoFromFirestore,
  saveSiteInfoToFirestore,
  seedSiteInfoToFirestore
} from '../../services/contactService';
import { ToastNotification, ToastMessage, ToastType } from '../../components/admin/ToastNotification';
import { ConfirmModal } from '../../components/admin/ConfirmModal';

export const ContactManager: React.FC = () => {
  const [formData, setFormData] = useState<SiteInfo>(defaultSiteInfo);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [importing, setImporting] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [showImportConfirm, setShowImportConfirm] = useState<boolean>(false);
  const [isSeededDoc, setIsSeededDoc] = useState<boolean>(false);

  const showToast = (type: ToastType, title: string, description?: string) => {
    setToast({
      id: `toast-${Date.now()}`,
      type,
      title,
      description,
    });
  };

  // Load live siteInfo from Firestore on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await getSiteInfoFromFirestore();
      if (data) {
        setFormData({
          ...defaultSiteInfo,
          ...data,
          registeredOffices: Array.isArray(data.registeredOffices) ? data.registeredOffices : (defaultSiteInfo.registeredOffices || []),
          socials: {
            ...defaultSiteInfo.socials,
            ...(data.socials || {})
          },
          stats: Array.isArray(data.stats) ? data.stats : (defaultSiteInfo.stats || [])
        });
        setIsSeededDoc(true);
      } else {
        // Fallback to default in local state if Firestore document doesn't exist yet
        setFormData(defaultSiteInfo);
        setIsSeededDoc(false);
      }
    } catch (err) {
      console.error('Error fetching contact settings:', err);
      showToast('error', 'Failed to Load Settings', 'Could not load from Firestore. Using default values.');
      setFormData(defaultSiteInfo);
    } finally {
      setLoading(false);
    }
  };

  // Save changes directly to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSiteInfoToFirestore(formData);
      setIsSeededDoc(true);
      showToast('success', 'Settings Saved Successfully', 'Contact details and global registered offices updated in Firestore.');
    } catch (err: any) {
      console.error('Error saving settings to Firestore:', err);
      showToast('error', 'Failed to Save Settings', err?.message || 'Check Firestore connection or permissions.');
    } finally {
      setSaving(false);
    }
  };

  // Seed / Import default settings
  const handleImportDefaults = async () => {
    setImporting(true);
    try {
      const seeded = await seedSiteInfoToFirestore();
      setFormData({
        ...defaultSiteInfo,
        ...seeded,
        registeredOffices: Array.isArray(seeded.registeredOffices) ? seeded.registeredOffices : (defaultSiteInfo.registeredOffices || []),
        socials: {
          ...defaultSiteInfo.socials,
          ...(seeded.socials || {})
        },
        stats: Array.isArray(seeded.stats) ? seeded.stats : (defaultSiteInfo.stats || [])
      });
      setIsSeededDoc(true);
      showToast('success', 'Default Settings Imported', 'Pre-configured siteInfo values have been stored to Firestore.');
    } catch (err: any) {
      console.error('Error importing defaults:', err);
      showToast('error', 'Import Failed', err?.message || 'Could not import default settings.');
    } finally {
      setImporting(false);
      setShowImportConfirm(false);
    }
  };

  // Office handlers
  const handleAddOffice = () => {
    const newOffice: RegisteredOffice = {
      city: '',
      country: '',
      role: '',
      banglaCity: '',
      banglaCountry: '',
      banglaRole: '',
      zhCity: '',
      zhCountry: '',
      zhRole: '',
    };
    setFormData(prev => ({
      ...prev,
      registeredOffices: [...(prev?.registeredOffices || []), newOffice],
    }));
  };

  const handleUpdateOffice = (index: number, field: keyof RegisteredOffice, value: string) => {
    setFormData(prev => {
      const updated = [...(prev?.registeredOffices || [])];
      updated[index] = {
        ...(updated[index] || {}),
        [field]: value,
      };
      return {
        ...prev,
        registeredOffices: updated,
      };
    });
  };

  const handleRemoveOffice = (index: number) => {
    setFormData(prev => {
      const updated = [...(prev?.registeredOffices || [])];
      updated.splice(index, 1);
      return {
        ...prev,
        registeredOffices: updated,
      };
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Toast Notification Component */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Confirmation Modal for Importing Default Settings */}
      <ConfirmModal
        isOpen={showImportConfirm}
        title="Import Current Default Settings?"
        message="This will overwrite the settings/siteInfo Firestore document with default values from src/data/site.ts. Any unsaved custom changes will be replaced."
        confirmText={importing ? "Importing..." : "Yes, Import Current"}
        confirmVariant="primary"
        onConfirm={handleImportDefaults}
        onCancel={() => setShowImportConfirm(false)}
      />

      {/* Header & Action Bar */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8E4] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0E5C2E]/10 flex items-center justify-center text-[#0E5C2E]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-heading font-black text-[#0E5C2E] tracking-tight">
                Corporate Contact & Global Coordinates
              </h1>
              <p className="text-xs text-[#5A6170]">
                Configure corporate headquarters, phone numbers, contact emails, social channels, and registered offices.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={loadSettings}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#5A6170] hover:text-[#0E5C2E] bg-[#F6F8F7] hover:bg-[#E2E8E4] rounded-xl border border-[#E2E8E4] transition-all cursor-pointer disabled:opacity-50"
            title="Reload live from Firestore"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Reload</span>
          </button>

          <button
            type="button"
            onClick={() => setShowImportConfirm(true)}
            disabled={loading || saving}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D7EEDB] border border-[#0E5C2E]/20 rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-xs"
            title="Seed settings/siteInfo from site.ts"
          >
            <DownloadCloud className="w-3.5 h-3.5" />
            <span>Import Current Settings</span>
          </button>

          <button
            type="submit"
            form="contact-settings-form"
            disabled={loading || saving}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="bg-white p-12 rounded-2xl border border-[#E2E8E4] shadow-xs flex flex-col items-center justify-center text-center">
          <Loader2 className="w-8 h-8 text-[#1E9B4C] animate-spin mb-3" />
          <p className="text-sm font-bold text-[#2B2B2B]">Loading contact settings from Firestore...</p>
          <p className="text-xs text-[#5A6170] mt-1">Connecting to Firestore collection: settings/siteInfo</p>
        </div>
      ) : (
        <form id="contact-settings-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Status Alert if doc hasn't been seeded yet */}
          {!isSeededDoc && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-900 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Initial Setup:</span> The <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">settings/siteInfo</code> document does not exist yet in Firestore. Click <strong>"Import Current Settings"</strong> above to seed with corporate defaults or click <strong>"Save Changes"</strong> to write this form.
              </div>
            </div>
          )}

          {/* SECTION 1: Brand & Identity */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8E4] shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8E4]">
              <Building2 className="w-4 h-4 text-[#1E9B4C]" />
              <h2 className="text-sm font-extrabold text-[#0E5C2E] uppercase tracking-wider">
                1. Corporate Identity & Taglines
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                  Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. SHARABANGLA GROUP"
                  className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3.5 py-2 text-xs font-bold text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                  Established Year
                </label>
                <input
                  type="text"
                  value={formData.established || ''}
                  onChange={e => setFormData({ ...formData, established: e.target.value })}
                  placeholder="e.g. 2015"
                  className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3.5 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                  Tagline (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.tagline || ''}
                  onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Connecting Bangladesh to Global Trade"
                  className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3.5 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                  Tagline (বাংলা)
                </label>
                <input
                  type="text"
                  value={formData.banglaTagline || ''}
                  onChange={e => setFormData({ ...formData, banglaTagline: e.target.value })}
                  placeholder="e.g. বাংলাদেশকে বিশ্ব বাণিজ্যের সাথে যুক্ত করছে"
                  className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3.5 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                  Tagline (中文)
                </label>
                <input
                  type="text"
                  value={formData.zhTagline || ''}
                  onChange={e => setFormData({ ...formData, zhTagline: e.target.value })}
                  placeholder="e.g. 连接孟加拉国与全球贸易"
                  className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3.5 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Headquarters & Primary Contacts */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8E4] shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8E4]">
              <MapPin className="w-4 h-4 text-[#1E9B4C]" />
              <h2 className="text-sm font-extrabold text-[#0E5C2E] uppercase tracking-wider">
                2. Corporate Headquarters & Contact Lines
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                  Primary Phone Number *
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    required
                    value={formData.phone || ''}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +880 1811 509999"
                    className="w-full bg-white border border-[#E2E8E4] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                  />
                  <Phone className="w-3.5 h-3.5 text-[#5A6170] absolute left-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                  Corporate Email *
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={formData.email || ''}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sharabangla.group@gmail.com"
                    className="w-full bg-white border border-[#E2E8E4] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                  />
                  <Mail className="w-3.5 h-3.5 text-[#5A6170] absolute left-3 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                Headquarters Address (English) *
              </label>
              <textarea
                rows={2}
                required
                value={formData.headquarters || ''}
                onChange={e => setFormData({ ...formData, headquarters: e.target.value })}
                placeholder="e.g. 3rd, 4th & 5th Floor, House 50, Road-01, Sector-05, Uttara, Dhaka, Bangladesh"
                className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3.5 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C] leading-relaxed resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                  Headquarters Address (বাংলা)
                </label>
                <textarea
                  rows={2}
                  value={formData.banglaHeadquarters || ''}
                  onChange={e => setFormData({ ...formData, banglaHeadquarters: e.target.value })}
                  placeholder="e.g. ৩য়, ৪র্থ ও ৫ম তলা, বাড়ি ৫০, রোড ০১, সেক্টর-০৫, উত্তরা, ঢাকা, বাংলাদেশ"
                  className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3.5 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C] leading-relaxed resize-y"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                  Headquarters Address (中文)
                </label>
                <textarea
                  rows={2}
                  value={formData.zhHeadquarters || ''}
                  onChange={e => setFormData({ ...formData, zhHeadquarters: e.target.value })}
                  placeholder="e.g. 孟加拉国达卡市乌塔拉第5区1号路50号3-5楼"
                  className="w-full bg-white border border-[#E2E8E4] rounded-xl px-3.5 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C] leading-relaxed resize-y"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Social Media Channels */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8E4] shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8E4]">
              <Share2 className="w-4 h-4 text-[#1E9B4C]" />
              <h2 className="text-sm font-extrabold text-[#0E5C2E] uppercase tracking-wider">
                3. Social Media & Digital Channels
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                  LinkedIn URL
                </label>
                <div className="relative flex items-center">
                  <input
                    type="url"
                    value={formData.socials?.linkedin || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        socials: { ...(formData.socials || {}), linkedin: e.target.value },
                      })
                    }
                    placeholder="https://linkedin.com/company/sharabangla"
                    className="w-full bg-white border border-[#E2E8E4] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                  />
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2] absolute left-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                  Facebook URL
                </label>
                <div className="relative flex items-center">
                  <input
                    type="url"
                    value={formData.socials?.facebook || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        socials: { ...(formData.socials || {}), facebook: e.target.value },
                      })
                    }
                    placeholder="https://facebook.com/sharabanglagroup"
                    className="w-full bg-white border border-[#E2E8E4] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                  />
                  <Facebook className="w-3.5 h-3.5 text-[#1877F2] absolute left-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                  Twitter / X URL
                </label>
                <div className="relative flex items-center">
                  <input
                    type="url"
                    value={formData.socials?.twitter || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        socials: { ...(formData.socials || {}), twitter: e.target.value },
                      })
                    }
                    placeholder="https://twitter.com/sharabanglagroup"
                    className="w-full bg-white border border-[#E2E8E4] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                  />
                  <Twitter className="w-3.5 h-3.5 text-[#1DA1F2] absolute left-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5A6170] mb-1">
                  YouTube URL
                </label>
                <div className="relative flex items-center">
                  <input
                    type="url"
                    value={formData.socials?.youtube || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        socials: { ...(formData.socials || {}), youtube: e.target.value },
                      })
                    }
                    placeholder="https://youtube.com/@sharabanglagroup"
                    className="w-full bg-white border border-[#E2E8E4] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                  />
                  <Youtube className="w-3.5 h-3.5 text-[#FF0000] absolute left-3 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Registered Global Offices (Repeatable Section) */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8E4] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8E4]">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#1E9B4C]" />
                <h2 className="text-sm font-extrabold text-[#0E5C2E] uppercase tracking-wider">
                  4. Registered Global Offices ({formData?.registeredOffices?.length || 0})
                </h2>
              </div>
              <button
                type="button"
                onClick={handleAddOffice}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EAF6EE] hover:bg-[#D7EEDB] text-[#0E5C2E] rounded-xl text-xs font-bold transition-all border border-[#0E5C2E]/20 self-start sm:self-auto cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Office Location</span>
              </button>
            </div>

            <p className="text-xs text-[#5A6170]">
              These registered trade offices appear across corporate footers, company documents, and global compliance listings.
            </p>

            <div className="space-y-4 pt-2">
              {Array.isArray(formData?.registeredOffices) && formData.registeredOffices.length > 0 ? (
                formData.registeredOffices.map((office, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#F6F8F7] rounded-xl border border-[#E2E8E4] relative group transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-[#0E5C2E] bg-white px-2.5 py-0.5 rounded-md border border-[#E2E8E4]">
                        Office #{idx + 1}: {office.city || 'Untitled'} ({office.country || 'Country'})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOffice(idx)}
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove office entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A6170] mb-1">
                          City (English) *
                        </label>
                        <input
                          type="text"
                          required
                          value={office.city || ''}
                          onChange={e => handleUpdateOffice(idx, 'city', e.target.value)}
                          placeholder="e.g. Guangzhou"
                          className="w-full bg-white border border-[#E2E8E4] rounded-lg px-3 py-1.5 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A6170] mb-1">
                          Country (English) *
                        </label>
                        <input
                          type="text"
                          required
                          value={office.country || ''}
                          onChange={e => handleUpdateOffice(idx, 'country', e.target.value)}
                          placeholder="e.g. China"
                          className="w-full bg-white border border-[#E2E8E4] rounded-lg px-3 py-1.5 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A6170] mb-1">
                          Corporate Role / Function *
                        </label>
                        <input
                          type="text"
                          required
                          value={office.role || ''}
                          onChange={e => handleUpdateOffice(idx, 'role', e.target.value)}
                          placeholder="e.g. East Asia Supply Hub"
                          className="w-full bg-white border border-[#E2E8E4] rounded-lg px-3 py-1.5 text-xs text-[#2B2B2B] focus:outline-none focus:border-[#1E9B4C]"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-[#F6F8F7] rounded-xl border border-dashed border-[#E2E8E4]">
                  <p className="text-xs text-[#5A6170] font-medium">No registered offices added yet.</p>
                  <button
                    type="button"
                    onClick={handleAddOffice}
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0E5C2E] text-white rounded-lg text-xs font-bold hover:bg-[#0A4724] transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add First Office</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Save Bar */}
          <div className="p-5 bg-white rounded-2xl border border-[#E2E8E4] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#5A6170]">
              <CheckCircle2 className="w-4 h-4 text-[#1E9B4C]" />
              <span>Direct writes configured for Firestore (settings/siteInfo).</span>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
