import React from 'react';
import { SEO } from '../components/common/SEO';
import { S1_AdaniHero } from '../components/home/S1_AdaniHero';
import { S2_Hero } from '../components/home/S2_Hero';
import { S3_AtAGlance } from '../components/home/S3_AtAGlance';
import { S4_AboutGroup } from '../components/home/S4_AboutGroup';
import { S5_EcosystemDiagram } from '../components/home/S5_EcosystemDiagram';
import { S8_GlobalPresenceMap } from '../components/home/S8_GlobalPresenceMap';
import { GlobalTrustTestimonials } from '../components/common/GlobalTrustTestimonials';
import { S10_ChairmanMessage } from '../components/home/S10_ChairmanMessage';
import { S10B_ManagingDirectorMessage } from '../components/home/S10B_ManagingDirectorMessage';
import { S10C_DirectorMessages } from '../components/home/S10C_DirectorMessages';
import { S11_VisionMissionValues } from '../components/home/S11_VisionMissionValues';
import { S13_NewsroomPreview } from '../components/home/S13_NewsroomPreview';
import { JoinUsSection } from '../components/careers/JoinUsSection';
import { S14_PartnerCTA } from '../components/home/S14_PartnerCTA';

export const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="Home"
        description="Official corporate platform of Sharabangla Group — connecting Bangladesh to global trade through e-commerce, express logistics, sourcing, and manufacturing."
      />
      
      {/* 1st Section: Adani-style Corporate Hero Slider */}
      <S1_AdaniHero />

      {/* 2nd Section: Sharabangla Group Core Brand Hero */}
      <S2_Hero />

      {/* Subsequent Sections */}
      <S3_AtAGlance />
      <S4_AboutGroup />
      <S5_EcosystemDiagram />
      <S8_GlobalPresenceMap />
      <GlobalTrustTestimonials />
      <S10_ChairmanMessage />
      <S10B_ManagingDirectorMessage />
      <S10C_DirectorMessages />
      <S11_VisionMissionValues />
      <S13_NewsroomPreview />
      <JoinUsSection />
      <S14_PartnerCTA />
    </>
  );
};

