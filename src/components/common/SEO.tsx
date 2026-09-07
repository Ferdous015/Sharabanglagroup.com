import React, { useEffect } from 'react';
import { siteInfo, companies } from '../../data/site';
import { brandAssets } from '../../data/brand';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const fullTitle = title 
    ? `${title} | ${siteInfo.name}` 
    : `${siteInfo.name} — ${siteInfo.tagline}`;
    
  const metaDesc = description || "Official web platform of Sharabangla Group — a Bangladesh-based multinational business group operating across E-Commerce, Trading, Logistics, and Manufacturing.";

  useEffect(() => {
    document.title = fullTitle;
    
    // Update Meta Description
    let metaDescElement = document.querySelector('meta[name="description"]');
    if (metaDescElement) {
      metaDescElement.setAttribute('content', metaDesc);
    }

    // Set Theme Color to Brand Deep Forest Green
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.setAttribute('name', 'theme-color');
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.setAttribute('content', '#06301A');

    // OG Image
    let ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (!ogImageMeta) {
      ogImageMeta = document.createElement('meta');
      ogImageMeta.setAttribute('property', 'og:image');
      document.head.appendChild(ogImageMeta);
    }
    ogImageMeta.setAttribute('content', brandAssets.ogImage);

    // Inject JSON-LD Schema
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteInfo.name,
      "url": "https://sharabangla.com",
      "logo": brandAssets.logoPrimary,
      "description": metaDesc,
      "foundingDate": siteInfo.established,
      "founder": {
        "@type": "Person",
        "name": "MD KAISER ALI",
        "jobTitle": "Chairman"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteInfo.headquarters,
        "addressLocality": "Dhaka",
        "addressCountry": "Bangladesh"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": siteInfo.phone,
        "email": siteInfo.email,
        "contactType": "corporate inquiries"
      },
      "subOrganization": companies.map(c => ({
        "@type": "Organization",
        "name": c.name,
        "description": c.oneLiner,
        "url": c.websiteUrl || `https://sharabangla.com/companies/${c.slug}`
      }))
    };

    let scriptTag = document.getElementById('json-ld-org');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-org';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [fullTitle, metaDesc]);

  return null;
};
