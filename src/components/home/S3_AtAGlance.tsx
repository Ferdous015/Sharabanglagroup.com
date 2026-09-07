import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteInfo } from '../../data/site';
import { Building2, Globe2, Building, Layers, Users } from 'lucide-react';

export const S3_AtAGlance: React.FC = () => {
  const { lang, t } = useLanguage();
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const icons = [Building2, Globe2, Building, Layers, Users];

  return (
    <section ref={sectionRef} className="py-20 bg-[#F6F8F7] border-y border-[#E2E8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-2 block">
            {t('glance.tag')}
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#0E5C2E] tracking-tight mb-3">
            {t('glance.title')}
          </h2>
          <p className="text-[#5A6170] text-base leading-relaxed">
            {t('glance.subtitle')}
          </p>
        </div>

        {/* Counter Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {(siteInfo.stats || []).map((stat, idx) => {
            const IconComponent = icons[idx % (icons?.length || 1)] || Building2;
            return (
              <div
                key={stat.id}
                className="bg-white p-6 rounded-xl border border-[#E2E8E4] shadow-xs hover:shadow-md hover:border-[#1E9B4C]/50 transition-all text-center flex flex-col items-center justify-between group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#F6F8F7] border border-[#E2E8E4] flex items-center justify-center text-[#0E5C2E] group-hover:bg-[#06301A] group-hover:text-[#1E9B4C] transition-colors mb-4">
                  <IconComponent className="w-6 h-6" />
                </div>

                <div className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0E5C2E] tracking-tight mb-1">
                  <AnimatedCounter value={stat.number} hasAnimated={hasAnimated} />
                  <span className="text-[#1E9B4C]">{stat.suffix}</span>
                </div>

                <div className="text-xs font-bold text-[#5A6170] uppercase tracking-wider mt-1">
                  {lang === 'bn' ? stat.banglaLabel : stat.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

interface CounterProps {
  value: number;
  hasAnimated: boolean;
}

const AnimatedCounter: React.FC<CounterProps> = ({ value, hasAnimated }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const duration = 1500; // ms
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, hasAnimated]);

  return <span>{count.toLocaleString()}</span>;
};
