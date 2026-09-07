import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export const MEDIA_COLLECTION = 'mediaLibrary';

export type MediaTag = 'general' | 'news' | 'jobs' | 'testimonials' | 'hero' | 'companies' | 'leadership' | string;

export interface MediaItem {
  id: string;
  url: string;
  fileName: string;
  uploadedAt: number; // Unix timestamp in ms
  tag?: MediaTag;
  fileSize?: number;
  format?: string;
}

/**
 * Fetch all media items directly from the "mediaLibrary" Firestore collection,
 * sorted with the newest uploads first.
 */
export async function getMediaItemsFromFirestore(): Promise<MediaItem[]> {
  try {
    const mediaRef = collection(db, MEDIA_COLLECTION);
    const snapshot = await getDocs(mediaRef);

    if (snapshot.empty) {
      return [];
    }

    const items: MediaItem[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Partial<MediaItem>;
      if (data.url) {
        items.push({
          id: docSnap.id || data.id || `media-${Date.now()}`,
          url: data.url,
          fileName: data.fileName || 'image.jpg',
          uploadedAt: typeof data.uploadedAt === 'number' ? data.uploadedAt : (data.uploadedAt ? new Date(data.uploadedAt).getTime() : Date.now()),
          tag: data.tag || 'general',
          fileSize: data.fileSize,
          format: data.format,
        });
      }
    });

    // Sort newest first
    return items.sort((a, b) => b.uploadedAt - a.uploadedAt);
  } catch (error) {
    console.error('Error fetching media items from Firestore:', error);
    throw error;
  }
}

/**
 * Save or update a single media item record in Firestore
 */
export async function saveMediaItemToFirestore(item: MediaItem): Promise<void> {
  const mediaId = item.id?.trim() || `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  
  const payload: Record<string, any> = {
    id: mediaId,
    url: item.url,
    fileName: item.fileName || 'uploaded-image.jpg',
    uploadedAt: item.uploadedAt || Date.now(),
    tag: item.tag || 'general',
  };

  if (item.fileSize !== undefined) payload.fileSize = item.fileSize;
  if (item.format) payload.format = item.format;

  const docRef = doc(db, MEDIA_COLLECTION, mediaId);
  await setDoc(docRef, payload, { merge: true });
}

/**
 * Delete a media item record from Firestore by ID
 */
export async function deleteMediaItemFromFirestore(id: string): Promise<void> {
  const docRef = doc(db, MEDIA_COLLECTION, id);
  await deleteDoc(docRef);
}
