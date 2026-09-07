import React from 'react';
import { SbgLogo } from './SbgLogo';

interface SectionDividerProps {
  className?: string;
  isDark?: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '', isDark = false }) => {
  return (
    <div className={`w-full py-8 flex items-center justify-center gap-6 opacity-80 ${className}`}>
      <div className={`h-[1px] flex-1 max-w-xs ${isDark ? 'bg-white/15' : 'bg-[#E2E8E4]'}`} />
      <div className="shrink-0 flex items-center justify-center p-1.5 rounded-full bg-white/5 border border-[#1E9B4C]/20 shadow-xs">
        <SbgLogo variant="monogram" size="custom" className="w-7 h-3.5" isDarkBg={isDark} />
      </div>
      <div className={`h-[1px] flex-1 max-w-xs ${isDark ? 'bg-white/15' : 'bg-[#E2E8E4]'}`} />
    </div>
  );
};
