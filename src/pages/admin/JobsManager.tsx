import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  Clock,
  Banknote,
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  RotateCcw,
  DownloadCloud,
  ChevronDown,
  Layers,
  Globe,
  Sparkles,
  Info,
  Loader2
} from 'lucide-react';
import { JobPosition, openPositions as defaultOpenPositions } from '../../data/site';
import {
  getJobsFromFirestore,
  saveJobToFirestore,
  deleteJobFromFirestore,
  migrateExistingJobs
} from '../../services/jobsService';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { ToastNotification, ToastMessage, ToastType } from '../../components/admin/ToastNotification';
import {
  parseDeadlineToIso,
  formatDeadlineForDisplay,
  formatDeadlineToBangla,
  formatDeadlineToChinese
} from '../../utils/dateUtils';

const CATEGORY_COLORS = [
  { label: 'Emerald Dark', value: 'bg-[#064E3B]' },
  { label: 'Forest Green', value: 'bg-[#047857]' },
  { label: 'Teal Dark', value: 'bg-[#0F766E]' },
  { label: 'Navy Blue', value: 'bg-[#1E40AF]' },
  { label: 'Sky Blue', value: 'bg-[#0284C7]' },
  { label: 'Purple Indigo', value: 'bg-[#4338CA]' },
  { label: 'Violet', value: 'bg-[#7C3AED]' },
  { label: 'Rose Pink', value: 'bg-[#BE185D]' },
  { label: 'Amber Warm', value: 'bg-[#D97706]' },
];

const EMPTY_JOB: JobPosition = {
  id: '',
  title: '',
  banglaTitle: '',
  zhTitle: '',
  department: '',
  banglaDepartment: '',
  zhDepartment: '',
  categoryColor: 'bg-[#064E3B]',
  location: 'Dhaka, Bangladesh',
  banglaLocation: 'ঢাকা, বাংলাদেশ',
  zhLocation: '孟加拉国·达卡',
  type: 'Full-Time',
  banglaType: 'ফুল-টাইম',
  zhType: '全职',
  experience: '2+ Years',
  banglaExperience: '২+ বছর',
  zhExperience: '2年以上经验',
  salary: 'Negotiable',
  banglaSalary: 'আলোচনা সাপেক্ষ',
  zhSalary: '面议',
  vacancy: '01 Position',
  banglaVacancy: '০১ টি পদ',
  zhVacancy: '01 名',
  deadline: '',
  banglaDeadline: '',
  zhDeadline: '',
  description: '',
  banglaDescription: '',
  zhDescription: '',
  requirements: [''],
  banglaRequirements: [''],
  zhRequirements: ['']
};

export const JobsManager: React.FC = () => {
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // In-app toasts notification state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosition>(EMPTY_JOB);
  const [isSaving, setIsSaving] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'bn' | 'zh'>('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateSuccessMsg, setTranslateSuccessMsg] = useState(false);

  // Delete Confirmation modal state
  const [jobToDelete, setJobToDelete] = useState<JobPosition | null>(null);
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

  // AI-Powered Auto Translation handler
  const handleAutoTranslate = async () => {
    if (!editingJob.title.trim() && !editingJob.description.trim() && (!editingJob.requirements || editingJob.requirements.filter(r => r.trim() !== '').length === 0)) {
      addToast('warning', 'Please fill in the English Job Title, Description, or Requirements first before running auto-translate.', 'Incomplete English Data');
      return;
    }

    setIsTranslating(true);
    setTranslateSuccessMsg(false);

    try {
      const activeReqs = (editingJob.requirements || []).filter((r) => r.trim() !== '');

      const response = await fetch('/api/gemini/translate-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editingJob.title,
          department: editingJob.department,
          location: editingJob.location,
          type: editingJob.type,
          experience: editingJob.experience,
          salary: editingJob.salary,
          vacancy: editingJob.vacancy,
          description: editingJob.description,
          requirements: activeReqs,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success || !resData.translations) {
        throw new Error(resData.error || 'Failed to auto-translate content with Gemini AI.');
      }

      const { bangla, chinese } = resData.translations;

      setEditingJob((prev) => {
        const autoBanglaDeadline = prev.deadline
          ? formatDeadlineToBangla(prev.deadline) || prev.banglaDeadline
          : prev.banglaDeadline;

        const autoZhDeadline = prev.deadline
          ? formatDeadlineToChinese(prev.deadline) || prev.zhDeadline
          : prev.zhDeadline;

        return {
          ...prev,
          // Bangla fields
          banglaTitle: bangla?.title || prev.banglaTitle,
          banglaDepartment: bangla?.department || prev.banglaDepartment,
          banglaLocation: bangla?.location || prev.banglaLocation,
          banglaType: bangla?.type || prev.banglaType,
          banglaExperience: bangla?.experience || prev.banglaExperience,
          banglaSalary: bangla?.salary || prev.banglaSalary,
          banglaVacancy: bangla?.vacancy || prev.banglaVacancy,
          banglaDescription: bangla?.description || prev.banglaDescription,
          banglaRequirements:
            Array.isArray(bangla?.requirements) && bangla.requirements.length > 0
              ? bangla.requirements
              : prev.banglaRequirements,
          banglaDeadline: autoBanglaDeadline,

          // Chinese fields
          zhTitle: chinese?.title || prev.zhTitle,
          zhDepartment: chinese?.department || prev.zhDepartment,
          zhLocation: chinese?.location || prev.zhLocation,
          zhType: chinese?.type || prev.zhType,
          zhExperience: chinese?.experience || prev.zhExperience,
          zhSalary: chinese?.salary || prev.zhSalary,
          zhVacancy: chinese?.vacancy || prev.zhVacancy,
          zhDescription: chinese?.description || prev.zhDescription,
          zhRequirements:
            Array.isArray(chinese?.requirements) && chinese.requirements.length > 0
              ? chinese.requirements
              : prev.zhRequirements,
          zhDeadline: autoZhDeadline,
        };
      });

      setTranslateSuccessMsg(true);
      addToast('success', 'Translated! Please review before saving.', 'Auto-Translation Completed');

      setTimeout(() => {
        setTranslateSuccessMsg(false);
      }, 7000);
    } catch (err: any) {
      console.error('Translation error:', err);
      addToast('error', err.message || 'Auto-translation failed. Your existing form data was kept intact.', 'Translation Error');
    } finally {
      setIsTranslating(false);
    }
  };

  // Load jobs from Firestore
  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getJobsFromFirestore();
      setJobs(data);
    } catch (err: any) {
      console.error('Error loading jobs:', err);
      setError(err.message || 'Failed to load jobs from Firestore.');
      addToast('error', err.message || 'Failed to load jobs from Firestore.', 'Firestore Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Open modal for new job
  const handleAddNewJob = () => {
    setEditingJob({
      ...EMPTY_JOB,
      id: `job-${Date.now()}`,
      requirements: [''],
      banglaRequirements: [''],
      zhRequirements: ['']
    });
    setActiveLangTab('en');
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEditJob = (job: JobPosition) => {
    setEditingJob({
      ...EMPTY_JOB,
      ...job,
      deadline: parseDeadlineToIso(job.deadline) || job.deadline || '',
      requirements: job.requirements?.length ? [...job.requirements] : [''],
      banglaRequirements: job.banglaRequirements?.length ? [...job.banglaRequirements] : [''],
      zhRequirements: job.zhRequirements?.length ? [...job.zhRequirements] : [''],
    });
    setActiveLangTab('en');
    setIsModalOpen(true);
  };

  // Save job (create or update)
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob.title.trim()) {
      addToast('warning', 'English Job Title is a required field.', 'Validation Error');
      setActiveLangTab('en');
      return;
    }
    if (!editingJob.department.trim()) {
      addToast('warning', 'Department is a required field.', 'Validation Error');
      setActiveLangTab('en');
      return;
    }

    setIsSaving(true);
    try {
      // Auto-generate ID if empty
      const cleanId =
        editingJob.id.trim() ||
        editingJob.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

      const cleanDeadline = parseDeadlineToIso(editingJob.deadline) || (editingJob.deadline || '').trim();

      const payload: JobPosition = {
        ...editingJob,
        id: cleanId,
        title: editingJob.title.trim(),
        banglaTitle: (editingJob.banglaTitle || '').trim() || editingJob.title.trim(),
        zhTitle: (editingJob.zhTitle || '').trim(),
        department: editingJob.department.trim(),
        banglaDepartment: (editingJob.banglaDepartment || '').trim(),
        zhDepartment: (editingJob.zhDepartment || '').trim(),
        location: (editingJob.location || '').trim(),
        banglaLocation: (editingJob.banglaLocation || '').trim(),
        zhLocation: (editingJob.zhLocation || '').trim(),
        type: (editingJob.type || '').trim(),
        banglaType: (editingJob.banglaType || '').trim(),
        zhType: (editingJob.zhType || '').trim(),
        experience: (editingJob.experience || '').trim(),
        banglaExperience: (editingJob.banglaExperience || '').trim(),
        zhExperience: (editingJob.zhExperience || '').trim(),
        salary: (editingJob.salary || '').trim(),
        banglaSalary: (editingJob.banglaSalary || '').trim(),
        zhSalary: (editingJob.zhSalary || '').trim(),
        vacancy: (editingJob.vacancy || '').trim(),
        banglaVacancy: (editingJob.banglaVacancy || '').trim(),
        zhVacancy: (editingJob.zhVacancy || '').trim(),
        deadline: cleanDeadline,
        banglaDeadline: (editingJob.banglaDeadline || '').trim(),
        zhDeadline: (editingJob.zhDeadline || '').trim(),
        description: (editingJob.description || '').trim(),
        banglaDescription: (editingJob.banglaDescription || '').trim(),
        zhDescription: (editingJob.zhDescription || '').trim(),
        requirements: (editingJob.requirements || []).filter((r) => r.trim() !== ''),
        banglaRequirements: (editingJob.banglaRequirements || []).filter((r) => r.trim() !== ''),
        zhRequirements: (editingJob.zhRequirements || []).filter((r) => r.trim() !== '')
      };

      await saveJobToFirestore(payload);
      addToast('success', `Job position "${payload.title}" saved with all 3 languages to Firestore!`, 'Saved to Firestore');
      setIsModalOpen(false);
      await loadJobs();
    } catch (err: any) {
      console.error('Error saving job to Firestore:', err);
      addToast('error', err.message || 'Failed to save job to Firestore. Please check connection and permissions.', 'Save Failed');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete job
  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;
    setIsDeleting(true);
    try {
      await deleteJobFromFirestore(jobToDelete.id);
      addToast('success', `Job "${jobToDelete.title}" removed from Firestore.`, 'Deleted');
      setJobToDelete(null);
      await loadJobs();
    } catch (err: any) {
      console.error('Error deleting job from Firestore:', err);
      addToast('error', err.message || 'Failed to delete job from Firestore.', 'Delete Failed');
    } finally {
      setIsDeleting(false);
    }
  };

  // Import one-click confirmed
  const handleConfirmImport = async () => {
    setIsMigrating(true);
    try {
      const count = await migrateExistingJobs();
      addToast('success', `Successfully imported ${count} default job postings into Firestore!`, 'Import Completed');
      setIsImportModalOpen(false);
      await loadJobs();
    } catch (err: any) {
      console.error('Error importing jobs to Firestore:', err);
      addToast('error', err.message || 'Failed to write positions to Firestore.', 'Import Failed');
    } finally {
      setIsMigrating(false);
    }
  };

  // Requirement array helpers
  const handleAddRequirement = (lang: 'en' | 'bn' | 'zh') => {
    if (lang === 'en') {
      setEditingJob((prev) => ({
        ...prev,
        requirements: [...prev.requirements, '']
      }));
    } else if (lang === 'bn') {
      setEditingJob((prev) => ({
        ...prev,
        banglaRequirements: [...(prev.banglaRequirements || []), '']
      }));
    } else {
      setEditingJob((prev) => ({
        ...prev,
        zhRequirements: [...(prev.zhRequirements || []), '']
      }));
    }
  };

  const handleUpdateRequirement = (
    lang: 'en' | 'bn' | 'zh',
    index: number,
    value: string
  ) => {
    if (lang === 'en') {
      const updated = [...editingJob.requirements];
      updated[index] = value;
      setEditingJob((prev) => ({ ...prev, requirements: updated }));
    } else if (lang === 'bn') {
      const updated = [...(editingJob.banglaRequirements || [])];
      updated[index] = value;
      setEditingJob((prev) => ({ ...prev, banglaRequirements: updated }));
    } else {
      const updated = [...(editingJob.zhRequirements || [])];
      updated[index] = value;
      setEditingJob((prev) => ({ ...prev, zhRequirements: updated }));
    }
  };

  const handleRemoveRequirement = (lang: 'en' | 'bn' | 'zh', index: number) => {
    if (lang === 'en') {
      const updated = editingJob.requirements.filter((_, i) => i !== index);
      setEditingJob((prev) => ({
        ...prev,
        requirements: updated.length ? updated : ['']
      }));
    } else if (lang === 'bn') {
      const updated = (editingJob.banglaRequirements || []).filter((_, i) => i !== index);
      setEditingJob((prev) => ({
        ...prev,
        banglaRequirements: updated.length ? updated : ['']
      }));
    } else {
      const updated = (editingJob.zhRequirements || []).filter((_, i) => i !== index);
      setEditingJob((prev) => ({
        ...prev,
        zhRequirements: updated.length ? updated : ['']
      }));
    }
  };

  // Filtered jobs list
  const departments = ['ALL', ...Array.from(new Set((jobs || []).map((j) => j.department).filter(Boolean)))];

  const filteredJobs = (jobs || []).filter((job) => {
    if (!job) return false;
    const matchesSearch =
      (job.title && job.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.banglaTitle && job.banglaTitle.includes(searchQuery)) ||
      (job.department && job.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept =
      selectedDept === 'ALL' ||
      (job.department && job.department.toUpperCase() === selectedDept.toUpperCase());

    return matchesSearch && matchesDept;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Toast Notification Container */}
      <ToastNotification toasts={toasts} onDismiss={removeToast} />

      {/* Top Header Card */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E2E8E4] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EAF6EE] text-[#0E5C2E] text-xs font-bold mb-1.5 border border-[#0E5C2E]/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Recruitment & Talent Management</span>
          </div>
          <h1 className="text-2xl font-heading font-black text-[#0E5C2E] tracking-tight">
            Job Circulars
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6170] mt-0.5">
            Manage live career opportunities stored in Firestore collection <code className="bg-[#F6F8F7] px-1.5 py-0.5 rounded text-[#0E5C2E] font-bold">"jobs"</code>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* One-Click Migration Button */}
          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            disabled={isMigrating}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D5EEDC] border border-[#0E5C2E]/30 transition-all cursor-pointer disabled:opacity-60"
            title="Import 10 default positions from site.ts into Firestore"
          >
            <DownloadCloud className="w-4 h-4" />
            <span>{isMigrating ? 'Importing...' : 'Import 10 Existing Positions'}</span>
          </button>

          {/* Add New Job Button */}
          <button
            type="button"
            onClick={handleAddNewJob}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] active:bg-[#07361B] transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Job</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8E4] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8C95A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, department or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs border border-[#D0D7D3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E5C2E] focus:border-transparent bg-[#FAFCFB]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-[#5A6170] flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#0E5C2E]" />
            <span>Dept:</span>
          </span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs py-2 px-3 border border-[#D0D7D3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E5C2E] bg-[#FAFCFB] text-[#2B2B2B] font-semibold"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <button
            onClick={loadJobs}
            title="Refresh jobs from Firestore"
            className="p-2 rounded-xl text-[#5A6170] hover:text-[#0E5C2E] hover:bg-[#F6F8F7] border border-[#E2E8E4] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error alert if any */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-[#DA291C]" />
          <span>{error}</span>
        </div>
      )}

      {/* Table / List View */}
      <div className="bg-white rounded-2xl border border-[#E2E8E4] shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-10 h-10 border-3 border-[#0E5C2E] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-semibold text-[#5A6170]">
              Loading job circulars from Firestore...
            </p>
          </div>
        ) : (filteredJobs?.length || 0) === 0 ? (
          <div className="py-16 px-4 text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#EAF6EE] text-[#0E5C2E] flex items-center justify-center">
              <Briefcase className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#2B2B2B]">
                No Job Postings Found
              </h3>
              <p className="text-xs text-[#5A6170] mt-1">
                {(jobs?.length || 0) === 0
                  ? 'No job postings exist in your Firestore collection yet. Click "Add New Job" to post one or "Import Default Jobs" to seed existing openings.'
                  : 'No jobs match your search or department filter.'}
              </p>
            </div>
            {(jobs?.length || 0) === 0 && (
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(true)}
                  disabled={isMigrating}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#0E5C2E] bg-[#EAF6EE] hover:bg-[#D5EEDC] border border-[#0E5C2E]/30 transition-all cursor-pointer"
                >
                  Import 10 Existing Positions
                </button>
                <button
                  onClick={handleAddNewJob}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] transition-all cursor-pointer shadow-xs"
                >
                  Create Custom Job
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAFCFB] border-b border-[#E2E8E4] text-[#5A6170] font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 sm:px-6">Job Title & ID</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Location & Type</th>
                  <th className="py-3.5 px-4">Salary & Vacancy</th>
                  <th className="py-3.5 px-4">Deadline</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8E4]">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-[#FAFCFB] transition-colors group">
                    {/* Title */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-sm text-[#0E5C2E] group-hover:text-[#1E9B4C] transition-colors">
                        {job.title}
                      </div>
                      {job.banglaTitle && (
                        <div className="text-[11px] text-[#5A6170] mt-0.5 font-medium">
                          {job.banglaTitle}
                        </div>
                      )}
                      <div className="text-[10px] text-[#8C95A6] font-mono mt-1">
                        ID: {job.id}
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-4 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-white text-[10px] font-bold uppercase tracking-wider ${job.categoryColor || 'bg-[#064E3B]'}`}>
                        {job.department}
                      </span>
                      {job.banglaDepartment && (
                        <div className="text-[10px] text-[#5A6170] mt-1">
                          {job.banglaDepartment}
                        </div>
                      )}
                    </td>

                    {/* Location & Type */}
                    <td className="py-4 px-4 text-[#5A6170]">
                      <div className="flex items-center gap-1 font-semibold text-[#2B2B2B]">
                        <MapPin className="w-3 h-3 text-[#1E9B4C] shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#5A6170] mt-0.5">
                        <Clock className="w-3 h-3 text-[#8C95A6] shrink-0" />
                        <span>{job.type} • {job.experience}</span>
                      </div>
                    </td>

                    {/* Salary & Vacancy */}
                    <td className="py-4 px-4 text-[#5A6170]">
                      <div className="flex items-center gap-1 font-semibold text-[#0E5C2E]">
                        <Banknote className="w-3 h-3 text-[#1E9B4C] shrink-0" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#5A6170] mt-0.5">
                        <Users className="w-3 h-3 text-[#8C95A6] shrink-0" />
                        <span>{job.vacancy}</span>
                      </div>
                    </td>

                    {/* Deadline */}
                    <td className="py-4 px-4">
                      <div className="inline-flex items-center gap-1 text-amber-900 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                        <Calendar className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{formatDeadlineForDisplay(job.deadline) || 'Open'}</span>
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEditJob(job)}
                          className="p-1.5 rounded-lg text-[#0E5C2E] hover:bg-[#EAF6EE] border border-[#E2E8E4] hover:border-[#0E5C2E]/40 transition-colors cursor-pointer"
                          title="Edit Job"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setJobToDelete(job)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 border border-[#E2E8E4] hover:border-red-200 transition-colors cursor-pointer"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =========================================================================
          ADD / EDIT JOB MODAL
         ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#E2E8E4] overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#E2E8E4] flex items-center justify-between bg-[#FAFCFB]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#EAF6EE] text-[#0E5C2E] flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-lg text-[#0E5C2E]">
                    {editingJob.id && jobs.some((j) => j.id === editingJob.id)
                      ? `Edit Job: ${editingJob.title}`
                      : 'Create New Job Position'}
                  </h2>
                  <p className="text-[11px] text-[#5A6170]">
                    Fields support English, Bangla, and Chinese localization.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-[#8C95A6] hover:text-[#2B2B2B] hover:bg-[#F0F2F1] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveJob} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Helpful UI Localization Note */}
              <div className="bg-[#EAF6EE] border border-[#0E5C2E]/25 rounded-xl p-4 flex items-start gap-3 shadow-2xs">
                <Info className="w-5 h-5 text-[#0E5C2E] shrink-0 mt-0.5" />
                <div className="text-xs text-[#1E4D2B] leading-relaxed">
                  <span className="font-bold text-[#0E5C2E] block mb-0.5">Multilingual Content Notice:</span>
                  Please fill in all three languages (English, Bangla, Chinese) for each field to ensure the website displays correctly in all languages.
                </div>
              </div>

              {/* Language Switch Tabs for Form */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E8E4] pb-3 gap-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#0E5C2E]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2B2B2B]">
                    Select Language Section:
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F6F8F7] p-1 rounded-xl border border-[#E2E8E4]">
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('en')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
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
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeLangTab === 'bn'
                        ? 'bg-[#0E5C2E] text-white shadow-xs'
                        : 'text-[#5A6170] hover:text-[#0E5C2E]'
                    }`}
                  >
                    Bangla (বাংলা)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('zh')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeLangTab === 'zh'
                        ? 'bg-[#0E5C2E] text-white shadow-xs'
                        : 'text-[#5A6170] hover:text-[#0E5C2E]'
                    }`}
                  >
                    Chinese (中文)
                  </button>
                </div>
              </div>

              {/* AI Auto-Translate Action Bar (Visible at all times regardless of which tab is active) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-[#EAF6EE] via-[#F4FAF6] to-[#EBF3FF] border border-[#0E5C2E]/25 rounded-xl shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0E5C2E] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-[#1E4D2B]">
                        Gemini AI Multilingual Auto-Translator
                      </p>
                      <span className="text-[10px] font-semibold bg-[#0E5C2E]/10 text-[#0E5C2E] px-1.5 py-0.5 rounded border border-[#0E5C2E]/20">
                        AI-Powered
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5A6170]">
                      Fill English fields first, then click below to translate into professional Bangla (বাংলা) & Chinese (中文).
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {translateSuccessMsg && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#0E5C2E] font-bold bg-white px-3 py-1.5 rounded-lg border border-[#0E5C2E]/30 shadow-2xs animate-fadeIn">
                      <CheckCircle2 className="w-4 h-4 text-[#0E5C2E] shrink-0" />
                      Translated! Review in BN/ZH tabs before saving.
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={handleAutoTranslate}
                    disabled={isTranslating}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0E5C2E] hover:bg-[#0B4A25] active:scale-[0.98] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    title="Translate all English fields to Bangla and Chinese using Gemini AI"
                  >
                    {isTranslating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                        <span>Translating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>✨ Auto-translate from English</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Shared Core Configuration (ID, Color, Category) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#FAFCFB] border border-[#E2E8E4]">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2B2B2B] mb-1">
                    Job Slug / ID
                  </label>
                  <input
                    type="text"
                    value={editingJob.id}
                    onChange={(e) => setEditingJob({ ...editingJob, id: e.target.value })}
                    placeholder="e.g. tax-and-vat-officer"
                    className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg bg-white focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none font-mono"
                  />
                  <span className="text-[10px] text-[#8C95A6] mt-0.5 block">
                    Unique Firestore document identifier.
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2B2B2B] mb-1">
                    Category Badge Color
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {CATEGORY_COLORS.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setEditingJob({ ...editingJob, categoryColor: c.value })}
                        className={`w-6 h-6 rounded-full ${c.value} transition-transform ${
                          editingJob.categoryColor === c.value
                            ? 'ring-2 ring-offset-2 ring-[#0E5C2E] scale-110'
                            : 'opacity-80 hover:opacity-100'
                        }`}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ===================== ENGLISH TAB FIELDS ===================== */}
              {activeLangTab === 'en' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Job Title (EN) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingJob.title}
                        onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                        placeholder="e.g. TAX & VAT OFFICER"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Department (EN) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingJob.department}
                        onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                        placeholder="e.g. FINANCE & COMPLIANCE"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Location (EN)
                      </label>
                      <input
                        type="text"
                        value={editingJob.location}
                        onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                        placeholder="Dhaka, Bangladesh"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Job Type (EN)
                      </label>
                      <input
                        type="text"
                        value={editingJob.type}
                        onChange={(e) => setEditingJob({ ...editingJob, type: e.target.value })}
                        placeholder="Full-Time"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Experience (EN)
                      </label>
                      <input
                        type="text"
                        value={editingJob.experience}
                        onChange={(e) => setEditingJob({ ...editingJob, experience: e.target.value })}
                        placeholder="3+ Years"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Salary (EN)
                      </label>
                      <input
                        type="text"
                        value={editingJob.salary}
                        onChange={(e) => setEditingJob({ ...editingJob, salary: e.target.value })}
                        placeholder="৳35,000 – ৳50,000"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Vacancy (EN)
                      </label>
                      <input
                        type="text"
                        value={editingJob.vacancy}
                        onChange={(e) => setEditingJob({ ...editingJob, vacancy: e.target.value })}
                        placeholder="01 Position"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        Deadline (EN)
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type="date"
                          value={parseDeadlineToIso(editingJob.deadline)}
                          onChange={(e) => setEditingJob({ ...editingJob, deadline: e.target.value })}
                          className="w-full text-xs px-3 py-2 pr-9 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none bg-white text-[#2B2B2B] cursor-pointer"
                          onClick={(e) => {
                            try {
                              (e.currentTarget as any).showPicker?.();
                            } catch (_) {}
                          }}
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
                      {editingJob.deadline && (
                        <p className="text-[10px] text-[#0E5C2E] font-medium mt-1">
                          Display: {formatDeadlineForDisplay(editingJob.deadline)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                      Job Description (EN)
                    </label>
                    <textarea
                      rows={3}
                      value={editingJob.description}
                      onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                      placeholder="Brief overview of duties and core responsibilities..."
                      className="w-full text-xs p-3 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                    />
                  </div>

                  {/* Requirements List (Repeatable) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-[#2B2B2B]">
                        Key Requirements (EN)
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddRequirement('en')}
                        className="text-xs font-bold text-[#0E5C2E] hover:text-[#1E9B4C] flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Requirement</span>
                      </button>
                    </div>
                    <div className="space-y-2">
                      {editingJob.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => handleUpdateRequirement('en', idx, e.target.value)}
                            placeholder={`Requirement #${idx + 1}`}
                            className="flex-1 text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveRequirement('en', idx)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ===================== BANGLA TAB FIELDS ===================== */}
              {activeLangTab === 'bn' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        পদের নাম (Bangla Title)
                      </label>
                      <input
                        type="text"
                        value={editingJob.banglaTitle || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, banglaTitle: e.target.value })}
                        placeholder="যেমন: ট্যাক্স অ্যান্ড ভ্যাট অফিসার"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        বিভাগ (Bangla Department)
                      </label>
                      <input
                        type="text"
                        value={editingJob.banglaDepartment || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, banglaDepartment: e.target.value })}
                        placeholder="যেমন: অর্থ ও কমপ্লায়েন্স"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        লোকেশন (Bangla Location)
                      </label>
                      <input
                        type="text"
                        value={editingJob.banglaLocation || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, banglaLocation: e.target.value })}
                        placeholder="ঢাকা, বাংলাদেশ"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        চাকরির ধরন (Bangla Type)
                      </label>
                      <input
                        type="text"
                        value={editingJob.banglaType || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, banglaType: e.target.value })}
                        placeholder="ফুল-টাইম"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        অভিজ্ঞতা (Bangla Experience)
                      </label>
                      <input
                        type="text"
                        value={editingJob.banglaExperience || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, banglaExperience: e.target.value })}
                        placeholder="৩+ বছর"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        বেতন (Bangla Salary)
                      </label>
                      <input
                        type="text"
                        value={editingJob.banglaSalary || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, banglaSalary: e.target.value })}
                        placeholder="৳৩৫,০০০ – ৳৫০,০০০ (আলোচনা সাপেক্ষ)"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        পদসংখ্যা (Bangla Vacancy)
                      </label>
                      <input
                        type="text"
                        value={editingJob.banglaVacancy || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, banglaVacancy: e.target.value })}
                        placeholder="০১ টি পদ"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        আবেদনের শেষ তারিখ (Bangla Deadline)
                      </label>
                      <input
                        type="text"
                        value={editingJob.banglaDeadline || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, banglaDeadline: e.target.value })}
                        placeholder="১৫ সেপ্টেম্বর, ২০২৬"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                      কাজের বিবরণ (Bangla Description)
                    </label>
                    <textarea
                      rows={3}
                      value={editingJob.banglaDescription || ''}
                      onChange={(e) => setEditingJob({ ...editingJob, banglaDescription: e.target.value })}
                      placeholder="দায়িত্ব ও কাজের সংক্ষিপ্ত বিবরণ..."
                      className="w-full text-xs p-3 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                    />
                  </div>

                  {/* Bangla Requirements List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-[#2B2B2B]">
                        প্রয়োজনীয় যোগ্যতাসমূহ (Bangla Requirements)
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddRequirement('bn')}
                        className="text-xs font-bold text-[#0E5C2E] hover:text-[#1E9B4C] flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>যোগ্যতা যোগ করুন</span>
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(editingJob.banglaRequirements || ['']).map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => handleUpdateRequirement('bn', idx, e.target.value)}
                            placeholder={`যোগ্যতা #${idx + 1}`}
                            className="flex-1 text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveRequirement('bn', idx)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ===================== CHINESE TAB FIELDS ===================== */}
              {activeLangTab === 'zh' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        职位名称 (Chinese Title)
                      </label>
                      <input
                        type="text"
                        value={editingJob.zhTitle || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, zhTitle: e.target.value })}
                        placeholder="例如: 税务与增值税专员"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        所属部门 (Chinese Department)
                      </label>
                      <input
                        type="text"
                        value={editingJob.zhDepartment || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, zhDepartment: e.target.value })}
                        placeholder="例如: 财务与合规部"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        工作地点 (Chinese Location)
                      </label>
                      <input
                        type="text"
                        value={editingJob.zhLocation || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, zhLocation: e.target.value })}
                        placeholder="孟加拉国·达卡"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        雇佣形式 (Chinese Type)
                      </label>
                      <input
                        type="text"
                        value={editingJob.zhType || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, zhType: e.target.value })}
                        placeholder="全职"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        经验年限 (Chinese Experience)
                      </label>
                      <input
                        type="text"
                        value={editingJob.zhExperience || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, zhExperience: e.target.value })}
                        placeholder="3年以上经验"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        薪酬待遇 (Chinese Salary)
                      </label>
                      <input
                        type="text"
                        value={editingJob.zhSalary || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, zhSalary: e.target.value })}
                        placeholder="৳35,000 – ৳50,000 (面议)"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        招聘名额 (Chinese Vacancy)
                      </label>
                      <input
                        type="text"
                        value={editingJob.zhVacancy || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, zhVacancy: e.target.value })}
                        placeholder="01 名"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                        截止日期 (Chinese Deadline)
                      </label>
                      <input
                        type="text"
                        value={editingJob.zhDeadline || ''}
                        onChange={(e) => setEditingJob({ ...editingJob, zhDeadline: e.target.value })}
                        placeholder="2026年9月15日"
                        className="w-full text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
                      岗位职责 (Chinese Description)
                    </label>
                    <textarea
                      rows={3}
                      value={editingJob.zhDescription || ''}
                      onChange={(e) => setEditingJob({ ...editingJob, zhDescription: e.target.value })}
                      placeholder="岗位职责与核心任务概述..."
                      className="w-full text-xs p-3 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                    />
                  </div>

                  {/* Chinese Requirements List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-[#2B2B2B]">
                        任职资格要求 (Chinese Requirements)
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddRequirement('zh')}
                        className="text-xs font-bold text-[#0E5C2E] hover:text-[#1E9B4C] flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>添加要求</span>
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(editingJob.zhRequirements || ['']).map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => handleUpdateRequirement('zh', idx, e.target.value)}
                            placeholder={`资格要求 #${idx + 1}`}
                            className="flex-1 text-xs px-3 py-2 border border-[#D0D7D3] rounded-lg focus:ring-2 focus:ring-[#0E5C2E] focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveRequirement('zh', idx)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-[#E2E8E4] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#5A6170] hover:bg-[#F0F2F1] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] active:bg-[#07361B] transition-all shadow-md flex items-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving to Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Job Position</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          IMPORT 10 DEFAULT JOBS CONFIRMATION MODAL
         ========================================================================= */}
      <ConfirmModal
        isOpen={isImportModalOpen}
        title="Import 10 Default Job Circulars?"
        message={
          <div className="space-y-2">
            <p>
              This will seed <strong>10 default enterprise positions</strong> into your live Firestore <code className="bg-[#F0F2F1] text-[#0E5C2E] px-1 py-0.5 rounded font-mono text-xs">"jobs"</code> collection.
            </p>
            <p className="text-xs text-[#8C95A6]">
              Trilingual titles, requirements (English, Bangla, Chinese), departments, locations, and deadlines will be automatically populated.
            </p>
          </div>
        }
        confirmText="Yes, Import 10 Jobs"
        cancelText="Cancel"
        variant="primary"
        icon={DownloadCloud}
        isLoading={isMigrating}
        loadingText="Importing to Firestore..."
        onConfirm={handleConfirmImport}
        onCancel={() => setIsImportModalOpen(false)}
      />

      {/* =========================================================================
          DELETE CONFIRMATION MODAL
         ========================================================================= */}
      <ConfirmModal
        isOpen={!!jobToDelete}
        title="Delete Job Posting?"
        message={
          jobToDelete ? (
            <div>
              Are you sure you want to delete <strong className="text-[#2B2B2B]">"{jobToDelete.title}"</strong> (ID: {jobToDelete.id}) from Firestore? This action is permanent and cannot be undone.
            </div>
          ) : null
        }
        confirmText="Yes, Delete Job"
        cancelText="Cancel"
        variant="danger"
        icon={Trash2}
        isLoading={isDeleting}
        loadingText="Deleting from Firestore..."
        onConfirm={handleConfirmDelete}
        onCancel={() => setJobToDelete(null)}
      />
    </div>
  );
};
