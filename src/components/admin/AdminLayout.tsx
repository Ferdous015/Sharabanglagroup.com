import React, { useState } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { SbgLogo } from '../common/SbgLogo';
import {
  LayoutDashboard,
  Newspaper,
  Briefcase,
  PhoneCall,
  MessageSquareQuote,
  Image as ImageIcon,
  Bot,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User as UserIcon,
  ShieldCheck,
  Database,
  CloudUpload,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: string;
}

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'jobs', label: 'Job Circulars', icon: Briefcase, path: '/admin/jobs' },
    { id: 'news', label: 'News & Press', icon: Newspaper, path: '/admin/news' },
    { id: 'contact', label: 'Contact Info', icon: PhoneCall, path: '/admin/contact' },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, path: '/admin/testimonials' },
    { id: 'media', label: 'Media Library', icon: ImageIcon, path: '/admin/media' },
    { id: 'chatbot-knowledge', label: 'Chatbot Knowledge', icon: Bot, path: '/admin/chatbot-knowledge' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8F7] flex flex-col font-sans text-[#2B2B2B] selection:bg-[#1E9B4C]/20 selection:text-[#0E5C2E]">
      {/* Top Bar */}
      <header className="h-16 bg-white border-b border-[#E2E8E4] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 -ml-2 rounded-lg text-[#5A6170] hover:text-[#0E5C2E] hover:bg-[#F6F8F7] md:hidden focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <SbgLogo variant="seal" size="sm" />
            <div className="hidden sm:block">
              <span className="font-heading font-black text-sm text-[#0E5C2E] tracking-tight">
                SHARABANGLA GROUP
              </span>
              <span className="text-[10px] uppercase font-bold text-[#DA291C] ml-2 px-1.5 py-0.5 bg-red-50 rounded border border-red-200">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#5A6170] hover:text-[#0E5C2E] hover:bg-[#F6F8F7] transition-colors border border-transparent hover:border-[#E2E8E4]"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Admin Email Badge */}
          <div className="flex items-center gap-2 pl-3 border-l border-[#E2E8E4]">
            <div className="w-8 h-8 rounded-full bg-[#0E5C2E]/10 border border-[#0E5C2E]/20 flex items-center justify-center text-[#0E5C2E]">
              <UserIcon className="w-4 h-4" />
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-[#2B2B2B] leading-tight truncate max-w-[180px]">
                {user?.email || 'Administrator'}
              </div>
              <div className="text-[10px] text-[#1E9B4C] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E9B4C] inline-block animate-pulse"></span>
                <span>Active Session</span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
            title="Sign out of Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Body Layout: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Backdrop */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 top-16 md:top-0 w-64 bg-white border-r border-[#E2E8E4] z-20 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 space-y-6 overflow-y-auto">
            {/* Navigation Section */}
            <div>
              <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-[#8C95A6]">
                Content Management
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-[#0E5C2E] text-white shadow-sm'
                          : 'text-[#5A6170] hover:text-[#0E5C2E] hover:bg-[#F6F8F7]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8C95A6]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && !isActive && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F0F2F1] text-[#5A6170] border border-[#E2E8E4]">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* System Status Section */}
            <div className="pt-4 border-t border-[#E2E8E4]">
              <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-[#8C95A6]">
                Backend Services
              </div>
              <div className="space-y-2 px-1">
                <div className="p-2.5 rounded-lg bg-[#F6F8F7] border border-[#E2E8E4] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#2B2B2B]">
                    <Database className="w-3.5 h-3.5 text-[#0E5C2E]" />
                    <span>Firebase Auth & DB</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#1E9B4C]" title="Connected" />
                </div>
                <div className="p-2.5 rounded-lg bg-[#F6F8F7] border border-[#E2E8E4] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#2B2B2B]">
                    <CloudUpload className="w-3.5 h-3.5 text-[#1E9B4C]" />
                    <span>Cloudinary CDN</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#1E9B4C]" title="Connected" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-[#E2E8E4] bg-[#FAFCFB]">
            <div className="text-xs text-[#5A6170] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0E5C2E]" />
              <span>v1.0 • Sharabangla Admin</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
