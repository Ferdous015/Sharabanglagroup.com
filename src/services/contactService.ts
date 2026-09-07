import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SiteInfo, siteInfo as defaultSiteInfo } from '../data/site';

const SETTINGS_COLLECTION = 'settings';
const SITE_INFO_DOC = 'siteInfo';

/**
 * Fetch the siteInfo document directly from Firestore (settings/siteInfo)
 */
export async function getSiteInfoFromFirestore(): Promise<SiteInfo | null> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SITE_INFO_DOC);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      return null;
    }

    const data = (snap.data() || {}) as Partial<SiteInfo>;
    
    // Safely merge with default values to ensure robust rendering
    return {
      name: data.name || defaultSiteInfo.name,
      tagline: data.tagline || defaultSiteInfo.tagline,
      banglaTagline: data.banglaTagline || defaultSiteInfo.banglaTagline,
      zhTagline: data.zhTagline || defaultSiteInfo.zhTagline || '',
      established: data.established || defaultSiteInfo.established,
      headquarters: data.headquarters || defaultSiteInfo.headquarters,
      banglaHeadquarters: data.banglaHeadquarters || defaultSiteInfo.banglaHeadquarters || '',
      zhHeadquarters: data.zhHeadquarters || defaultSiteInfo.zhHeadquarters || '',
      phone: data.phone || defaultSiteInfo.phone,
      email: data.email || defaultSiteInfo.email,
      registeredOffices: Array.isArray(data.registeredOffices)
        ? data.registeredOffices
        : (defaultSiteInfo.registeredOffices || []),
      stats: Array.isArray(data.stats)
        ? data.stats
        : (defaultSiteInfo.stats || []),
      socials: {
        linkedin: data.socials?.linkedin || defaultSiteInfo.socials?.linkedin || '',
        facebook: data.socials?.facebook || defaultSiteInfo.socials?.facebook || '',
        twitter: data.socials?.twitter || defaultSiteInfo.socials?.twitter || '',
        youtube: data.socials?.youtube || defaultSiteInfo.socials?.youtube || '',
      },
    };
  } catch (error) {
    console.error('Error fetching siteInfo from Firestore:', error);
    throw error;
  }
}

/**
 * Save or update siteInfo document in Firestore (settings/siteInfo)
 */
export async function saveSiteInfoToFirestore(info: SiteInfo): Promise<void> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SITE_INFO_DOC);

    const dataToSave: SiteInfo = {
      name: info.name?.trim() || defaultSiteInfo.name,
      tagline: info.tagline?.trim() || defaultSiteInfo.tagline,
      banglaTagline: info.banglaTagline?.trim() || defaultSiteInfo.banglaTagline,
      zhTagline: info.zhTagline?.trim() || '',
      established: info.established?.trim() || defaultSiteInfo.established,
      headquarters: info.headquarters?.trim() || defaultSiteInfo.headquarters,
      banglaHeadquarters: info.banglaHeadquarters?.trim() || '',
      zhHeadquarters: info.zhHeadquarters?.trim() || '',
      phone: info.phone?.trim() || defaultSiteInfo.phone,
      email: info.email?.trim() || defaultSiteInfo.email,
      registeredOffices: Array.isArray(info.registeredOffices)
        ? info.registeredOffices.map((office) => ({
            city: office.city?.trim() || '',
            country: office.country?.trim() || '',
            role: office.role?.trim() || '',
            ...(office.banglaCity ? { banglaCity: office.banglaCity.trim() } : {}),
            ...(office.banglaCountry ? { banglaCountry: office.banglaCountry.trim() } : {}),
            ...(office.banglaRole ? { banglaRole: office.banglaRole.trim() } : {}),
            ...(office.zhCity ? { zhCity: office.zhCity.trim() } : {}),
            ...(office.zhCountry ? { zhCountry: office.zhCountry.trim() } : {}),
            ...(office.zhRole ? { zhRole: office.zhRole.trim() } : {}),
          }))
        : defaultSiteInfo.registeredOffices,
      stats: Array.isArray(info.stats) && info.stats.length > 0 ? info.stats : defaultSiteInfo.stats,
      socials: {
        linkedin: info.socials?.linkedin?.trim() || defaultSiteInfo.socials.linkedin,
        facebook: info.socials?.facebook?.trim() || defaultSiteInfo.socials.facebook,
        twitter: info.socials?.twitter?.trim() || defaultSiteInfo.socials.twitter,
        youtube: info.socials?.youtube?.trim() || defaultSiteInfo.socials.youtube,
      },
    };

    await setDoc(docRef, dataToSave);
  } catch (error) {
    console.error('Error saving siteInfo to Firestore:', error);
    throw error;
  }
}

/**
 * Seed siteInfo in Firestore with default values from src/data/site.ts
 */
export async function seedSiteInfoToFirestore(): Promise<SiteInfo> {
  const docRef = doc(db, SETTINGS_COLLECTION, SITE_INFO_DOC);
  await setDoc(docRef, defaultSiteInfo);
  return defaultSiteInfo;
}
