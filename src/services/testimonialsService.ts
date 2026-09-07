import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Testimonial, testimonials as defaultTestimonials } from '../data/site';

const TESTIMONIALS_COLLECTION = 'testimonials';

/**
 * Fetch all live testimonials directly from Firestore
 */
export async function getTestimonialsFromFirestore(): Promise<Testimonial[]> {
  try {
    const testimonialsRef = collection(db, TESTIMONIALS_COLLECTION);
    const snapshot = await getDocs(testimonialsRef);

    if (snapshot.empty) {
      return [];
    }

    const items: Testimonial[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Testimonial;
      items.push({
        ...data,
        id: docSnap.id || data.id,
      });
    });

    return items;
  } catch (error) {
    console.error('Error fetching testimonials directly from Firestore:', error);
    throw error;
  }
}

/**
 * Save or update a single testimonial directly in Firestore
 */
export async function saveTestimonialToFirestore(testimonial: Testimonial): Promise<void> {
  const testimonialId = testimonial.id?.trim() || `testimonial-${Date.now()}`;

  const testimonialToSave: Record<string, any> = {
    id: testimonialId,
    name: testimonial.name || '',
    banglaName: testimonial.banglaName || testimonial.name || '',
    zhName: testimonial.zhName || '',
    title: testimonial.title || '',
    banglaTitle: testimonial.banglaTitle || testimonial.title || '',
    zhTitle: testimonial.zhTitle || '',
    company: testimonial.company || '',
    banglaCompany: testimonial.banglaCompany || '',
    zhCompany: testimonial.zhCompany || '',
    market: testimonial.market || '',
    banglaMarket: testimonial.banglaMarket || testimonial.market || '',
    zhMarket: testimonial.zhMarket || '',
    country: testimonial.country || '',
    flag: testimonial.flag || '🌐',
    quote: testimonial.quote || '',
    banglaQuote: testimonial.banglaQuote || testimonial.quote || '',
    zhQuote: testimonial.zhQuote || '',
    photoUrl: testimonial.photoUrl || '',
  };

  const testimonialRef = doc(db, TESTIMONIALS_COLLECTION, testimonialId);
  await setDoc(testimonialRef, testimonialToSave, { merge: true });
}

/**
 * Delete a testimonial directly from Firestore by document ID
 */
export async function deleteTestimonialFromFirestore(id: string): Promise<void> {
  const testimonialRef = doc(db, TESTIMONIALS_COLLECTION, id);
  await deleteDoc(testimonialRef);
}

/**
 * Seed existing default testimonials directly into Firestore
 * Returns count of migrated testimonials
 */
export async function migrateExistingTestimonials(): Promise<number> {
  let count = 0;
  for (const item of defaultTestimonials) {
    const itemId = item.id || `testimonial-${count + 1}`;
    const itemRef = doc(db, TESTIMONIALS_COLLECTION, itemId);
    await setDoc(
      itemRef,
      {
        ...item,
        id: itemId,
      },
      { merge: true }
    );
    count++;
  }
  return count;
}
