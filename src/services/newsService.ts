import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { NewsArticle, newsArticles as defaultNewsArticles } from '../data/site';

const NEWS_COLLECTION = 'news';

/**
 * Fetch all live news articles directly from Firestore
 */
export async function getNewsFromFirestore(): Promise<NewsArticle[]> {
  try {
    const newsRef = collection(db, NEWS_COLLECTION);
    const snapshot = await getDocs(newsRef);

    if (snapshot.empty) {
      return [];
    }

    const articles: NewsArticle[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as NewsArticle;
      articles.push({
        ...data,
        id: docSnap.id || data.id,
        content: Array.isArray(data.content) ? data.content : [],
        banglaContent: Array.isArray(data.banglaContent) ? data.banglaContent : [],
        zhContent: Array.isArray(data.zhContent) ? data.zhContent : [],
      });
    });

    return articles;
  } catch (error) {
    console.error('Error fetching news directly from Firestore:', error);
    throw error;
  }
}

/**
 * Save or update a single news article directly in Firestore
 */
export async function saveNewsToFirestore(article: NewsArticle): Promise<void> {
  const articleId = article.id?.trim() || article.slug?.trim() || `news-${Date.now()}`;
  const slug = article.slug?.trim() || articleId;

  const articleToSave: Record<string, any> = {
    id: articleId,
    slug: slug,
    type: article.type || 'news',
    banglaType: article.banglaType || (article.type === 'press' ? 'প্রেস বিজ্ঞপ্তি' : article.type === 'announcement' ? 'গ্রুপ ঘোষণা' : 'সংবাদ'),
    zhType: article.zhType || (article.type === 'press' ? '官方新闻稿' : article.type === 'announcement' ? '集团公告' : '最新动态'),
    title: article.title || '',
    banglaTitle: article.banglaTitle || article.title || '',
    zhTitle: article.zhTitle || '',
    category: article.category || 'General',
    banglaCategory: article.banglaCategory || 'সাধারণ',
    zhCategory: article.zhCategory || '综合',
    date: article.date || '',
    readTime: article.readTime || '3 min read',
    summary: article.summary || '',
    banglaSummary: article.banglaSummary || '',
    zhSummary: article.zhSummary || '',
    content: Array.isArray(article.content) ? article.content.filter(p => p.trim() !== '') : [],
    banglaContent: Array.isArray(article.banglaContent) ? article.banglaContent.filter(p => p.trim() !== '') : [],
    zhContent: Array.isArray(article.zhContent) ? article.zhContent.filter(p => p.trim() !== '') : [],
    image: article.image || '',
    officialRef: article.officialRef || '',
  };

  const articleRef = doc(db, NEWS_COLLECTION, articleId);
  await setDoc(articleRef, articleToSave, { merge: true });
}

/**
 * Delete a news article directly from Firestore by document ID
 */
export async function deleteNewsFromFirestore(id: string): Promise<void> {
  const articleRef = doc(db, NEWS_COLLECTION, id);
  await deleteDoc(articleRef);
}

/**
 * Seed existing default news articles directly into Firestore
 * Returns count of migrated articles
 */
export async function migrateExistingNews(): Promise<number> {
  let count = 0;
  for (const article of defaultNewsArticles) {
    const articleId = article.id || article.slug;
    const articleRef = doc(db, NEWS_COLLECTION, articleId);
    await setDoc(
      articleRef,
      {
        ...article,
        id: articleId,
        slug: article.slug || articleId,
        content: article.content || [],
        banglaContent: article.banglaContent || [],
        zhContent: article.zhContent || [],
        officialRef: article.officialRef || '',
      },
      { merge: true }
    );
    count++;
  }
  return count;
}
