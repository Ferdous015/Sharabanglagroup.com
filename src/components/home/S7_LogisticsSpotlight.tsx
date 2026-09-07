import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Plane, Ship, Warehouse, Truck, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export const S7_LogisticsSpotlight: React.FC = () => {
  const { t } = useLanguage();

  const capabilities = [
    {
      icon: Plane,
      title: t('logistics.cap1'),
      desc: "Weekly air cargo allocations connecting Guangzhou, Shenzhen, Kolkata, and Dhaka Airports."
    },
    {
      icon: Ship,
      title: t('logistics.cap2'),
      desc: "Chittagong Port & Mongla Port LCL consolidation, customs brokerage, and door-to-door ocean freight."
    },
    {
      icon: Warehouse,
      title: t('logistics.cap3'),
      desc: "14 automated bonded fulfillment hubs with WMS inventory tracking and temperature controls."
    },
    {
      icon: Truck,
      title: t('logistics.cap4'),
      desc: "Technology-driven last-mile delivery fleet servicing 64 districts in Bangladesh with cash on delivery."
    }
  ];

  return (
    <section className="py-24 bg-[#06301A] text-white relative overflow-hidden border-t border-[#1E9B4C]/20">
      
      {/* Background World Map Route Vector Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop')`
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & Express Branding */}
          <div className="lg:col-span-5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E9B4C] mb-3 block">
              {t('logistics.tag')}
            </span>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-6">
              {t('logistics.title')}
            </h2>

            <p className="text-slate-300 text-base leading-relaxed mb-8">
              {t('logistics.desc')}
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <ShieldCheck className="w-5 h-5 text-[#1E9B4C] shrink-0" />
                <span>Customs Clearance: Chittagong & Dhaka HSIA Airport</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <MapPin className="w-5 h-5 text-[#1E9B4C] shrink-0" />
                <span>Express Corridors: China • India • UAE • BD • Vietnam</span>
              </div>
            </div>

            <Link
              to="/companies/sharabangla-express"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-[#1E9B4C] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#0E5C2E] transition-all shadow-xl cursor-pointer"
            >
              <span>{t('logistics.cta')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Column Capabilities Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {capabilities.map((cap, idx) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-[#0E5C2E]/80 border border-white/10 hover:border-[#1E9B4C] transition-all backdrop-blur-md group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#06301A] border border-[#1E9B4C]/40 flex items-center justify-center text-[#1E9B4C] mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-heading font-bold text-lg text-white mb-2">
                      {cap.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
