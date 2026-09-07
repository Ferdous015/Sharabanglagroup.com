import React from 'react';
import { brandAssets } from '../../data/brand';

interface SbgLogoProps {
  variant?: 'seal' | 'inline' | 'iconOnly' | 'white' | 'monoGreen' | 'monogram' | 'emblem-standard';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  isDarkBg?: boolean;
  className?: string;
  showTagline?: boolean;
  height?: number;
}

export const SbgLogo: React.FC<SbgLogoProps> = ({
  variant = 'inline',
  size = 'md',
  isDarkBg = false,
  className = '',
  showTagline = true,
  height,
}) => {
  // Dimension mapping
  const logoDimensionMap = {
    sm: { w: 32, h: 32, css: 'w-8 h-8' },
    md: { w: 44, h: 44, css: 'w-11 h-11' },
    lg: { w: 60, h: 60, css: 'w-15 h-15' },
    xl: { w: 80, h: 80, css: 'w-20 h-20' },
    custom: { w: height || 44, h: height || 44, css: '' },
  };

  const dim = logoDimensionMap[size] || logoDimensionMap.md;
  const targetHeight = height || dim.h;

  const textColor = isDarkBg ? '#FFFFFF' : '#2B2B2B';
  const subTextColor = isDarkBg ? '#EAF6EE' : '#1E9B4C';

  // Base Logo Image element (renders /brand/logo-primary.png)
  const LogoImage = ({ customClass }: { customClass?: string }) => {
    const imgEl = (
      <img
        src={brandAssets.logoPrimary}
        alt="Sharabangla Group Logo"
        width={targetHeight}
        height={targetHeight}
        className={`object-contain ${customClass || dim.css} shrink-0`}
        style={{
          minHeight: '28px',
          width: 'auto',
          maxHeight: '100%',
        }}
      />
    );

    // Apply a subtle white background chip when sitting on dark backgrounds so black text in logo is visible
    if (isDarkBg) {
      return (
        <div className="bg-white rounded-full p-1 flex items-center justify-center shadow-md shrink-0 border border-white/20">
          {imgEl}
        </div>
      );
    }

    return imgEl;
  };

  // Standalone image variants (seal, emblem, iconOnly, monogram, etc.)
  if (
    variant === 'seal' ||
    variant === 'iconOnly' ||
    variant === 'monogram' ||
    variant === 'white' ||
    variant === 'monoGreen' ||
    variant === 'emblem-standard'
  ) {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <LogoImage customClass={className} />
      </div>
    );
  }

  // Full lockup variant (Logo image + Sharabangla Group Typography)
  return (
    <div className={`inline-flex items-center gap-3 logo-lockup p-1 ${className}`}>
      {/* Official Sharabangla Group Logo Image */}
      <LogoImage />

      {/* Brand Wordmark matching official typography */}
      <div className="flex flex-col">
        <span
          className="font-heading font-extrabold text-base sm:text-lg tracking-tight leading-none"
          style={{ color: textColor }}
        >
          SHARABANGLA
        </span>
        {showTagline && (
          <span
            className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.2em] uppercase mt-1"
            style={{ color: subTextColor }}
          >
            GROUP
          </span>
        )}
      </div>
    </div>
  );
};
