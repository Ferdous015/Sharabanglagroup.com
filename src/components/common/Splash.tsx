import React, { useEffect, useState } from 'react';
import { SbgLogo } from './SbgLogo';

export const Splash: React.FC = () => {
  const [showSplash, setShowSplash] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenSplash = sessionStorage.getItem('sbg_splash_seen');

    if (!hasSeenSplash && !prefersReducedMotion) {
      setShowSplash(true);
      sessionStorage.setItem('sbg_splash_seen', 'true');

      // Trigger fade out after 800ms
      const fadeTimer = setTimeout(() => {
        setFadingOut(true);
      }, 750);

      // Hide completely after 1000ms
      const hideTimer = setTimeout(() => {
        setShowSplash(false);
      }, 1000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  if (!showSplash) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#06301A] transition-opacity duration-300 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Green Ring */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center">
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#1E9B4C"
              strokeWidth="4"
              strokeDasharray="276"
              strokeDashoffset="60"
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center p-4 animate-fade-in">
            <SbgLogo variant="monogram" className="w-16 h-8" isDarkBg={true} />
          </div>
        </div>

        <span className="mt-4 font-heading font-extrabold text-white text-sm sm:text-base tracking-[0.3em] uppercase opacity-90">
          SHARABANGLA GROUP
        </span>
      </div>
    </div>
  );
};
