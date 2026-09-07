import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Splash } from './components/common/Splash';
import { ScrollToTop as ScrollToTopButton } from './components/common/ScrollToTop';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Companies } from './pages/Companies';
import { CompanyDetail } from './pages/CompanyDetail';
import { LeadershipPage } from './pages/LeadershipPage';
import { GlobalPresencePage } from './pages/GlobalPresencePage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { NewsroomPage } from './pages/NewsroomPage';
import { NewsDetail } from './pages/NewsDetail';
import { CareersPage } from './pages/CareersPage';
import { PartnerPage } from './pages/PartnerPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages & Components
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { JobsManager } from './pages/admin/JobsManager';
import { NewsManager } from './pages/admin/NewsManager';
import { ContactManager } from './pages/admin/ContactManager';
import { TestimonialsManager } from './pages/admin/TestimonialsManager';
import { MediaLibrary } from './pages/admin/MediaLibrary';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

// Scroll to top or section anchor helper on route change
function ScrollToTopOnRoute() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// Public Layout wrapper with official Header, Footer & Floating Scroll Button
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFFFFF] text-[#2B2B2B] selection:bg-[#1E9B4C]/20 selection:text-[#0E5C2E] w-full max-w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AdminAuthProvider>
        <Splash />
        <Router>
          <ScrollToTopOnRoute />
          <Routes>
            {/* Standalone Admin Routes (No public Header or Footer) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="jobs" element={<JobsManager />} />
              <Route path="news" element={<NewsManager />} />
              <Route path="testimonials" element={<TestimonialsManager />} />
              <Route path="contact" element={<ContactManager />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="*" element={<AdminDashboard />} />
            </Route>

            {/* Public-facing website routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:slug" element={<CompanyDetail />} />
              <Route path="/leadership" element={<LeadershipPage />} />
              <Route path="/global-presence" element={<GlobalPresencePage />} />
              <Route path="/sustainability" element={<SustainabilityPage />} />
              <Route path="/newsroom" element={<NewsroomPage />} />
              <Route path="/newsroom/:slug" element={<NewsDetail />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/partner" element={<PartnerPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* 404 Fallback Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </AdminAuthProvider>
    </LanguageProvider>
  );
}
