import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { SbgLogo } from '../../components/common/SbgLogo';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { user, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to destination or /admin/dashboard
  useEffect(() => {
    if (user) {
      const origin = (location.state as any)?.from?.pathname || '/admin/dashboard';
      navigate(origin, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email, password);
      const origin = (location.state as any)?.from?.pathname || '/admin/dashboard';
      navigate(origin, { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      let errorMsg = 'Failed to sign in. Please verify your credentials.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        errorMsg = 'Invalid email or password. Please try again.';
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'Please enter a valid email address.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMsg = 'Access temporarily disabled due to multiple failed login attempts. Please try again later.';
      } else if (err.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8F7] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-[#1E9B4C]/20 selection:text-[#0E5C2E]">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#0E5C2E]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#DA291C]/5 blur-3xl" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Center Logo Lockup */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-[#E2E8E4] mb-5 transition-transform hover:scale-105 duration-300">
            <SbgLogo variant="seal" size="lg" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-[#0E5C2E]">
            SBG Admin Portal
          </h1>
          <p className="mt-2 text-sm text-[#5A6170] max-w-sm">
            Sign in with your authorized credentials to manage Sharabangla Group corporate content and assets.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-[#E2E8E4]">
          {/* Security Badge */}
          <div className="flex items-center gap-2 pb-5 mb-6 border-b border-[#E2E8E4] text-xs font-semibold text-[#0E5C2E]">
            <ShieldCheck className="w-4 h-4 text-[#1E9B4C]" />
            <span>Secure Enterprise Authentication</span>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 animate-fadeIn">
              <AlertCircle className="w-5 h-5 shrink-0 text-[#DA291C] mt-0.5" />
              <div className="leading-snug">{error}</div>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#2B2B2B] mb-2">
                Administrator Email
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A6170]">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sharabanglagroup.com"
                  className="block w-full pl-10 pr-4 py-3 border border-[#D0D7D3] rounded-xl text-sm text-[#2B2B2B] placeholder-[#8C95A6] focus:outline-none focus:ring-2 focus:ring-[#0E5C2E] focus:border-transparent transition-all bg-[#FAFCFB]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#2B2B2B] mb-2">
                Password
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A6170]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-11 py-3 border border-[#D0D7D3] rounded-xl text-sm text-[#2B2B2B] placeholder-[#8C95A6] focus:outline-none focus:ring-2 focus:ring-[#0E5C2E] focus:border-transparent transition-all bg-[#FAFCFB]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#5A6170] hover:text-[#0E5C2E] transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#0E5C2E] hover:bg-[#0A4724] active:bg-[#07361B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E5C2E] shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-[#E2E8E4] text-center">
            <p className="text-xs text-[#5A6170]">
              Authorized personnel only. All access attempts are logged for security compliance.
            </p>
          </div>
        </div>

        {/* Back to public site link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs font-semibold text-[#5A6170] hover:text-[#0E5C2E] transition-colors"
          >
            ← Return to public website
          </a>
        </div>
      </div>
    </div>
  );
};
