import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { JobPosition, openPositions as defaultOpenPositions } from '../data/site';

const JOBS_COLLECTION = 'jobs';

/**
 * Fetch all live jobs directly from Firestore
 */
export async function getJobsFromFirestore(): Promise<JobPosition[]> {
  try {
    const jobsRef = collection(db, JOBS_COLLECTION);
    const snapshot = await getDocs(jobsRef);
    
    if (snapshot.empty) {
      return [];
    }

    const jobs: JobPosition[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as JobPosition;
      jobs.push({
        ...data,
        id: docSnap.id || data.id,
      });
    });

    return jobs;
  } catch (error) {
    console.error('Error fetching jobs directly from Firestore:', error);
    throw error;
  }
}

/**
 * Save or update a single job directly in Firestore
 */
export async function saveJobToFirestore(job: JobPosition): Promise<void> {
  const jobId = job.id.trim() || `job-${Date.now()}`;
  const jobToSave: Record<string, any> = {
    id: jobId,
    title: job.title || '',
    banglaTitle: job.banglaTitle || job.title || '',
    zhTitle: job.zhTitle || '',
    department: job.department || '',
    banglaDepartment: job.banglaDepartment || '',
    zhDepartment: job.zhDepartment || '',
    categoryColor: job.categoryColor || 'bg-[#064E3B]',
    location: job.location || '',
    banglaLocation: job.banglaLocation || '',
    zhLocation: job.zhLocation || '',
    type: job.type || '',
    banglaType: job.banglaType || '',
    zhType: job.zhType || '',
    experience: job.experience || '',
    banglaExperience: job.banglaExperience || '',
    zhExperience: job.zhExperience || '',
    salary: job.salary || '',
    banglaSalary: job.banglaSalary || '',
    zhSalary: job.zhSalary || '',
    vacancy: job.vacancy || '',
    banglaVacancy: job.banglaVacancy || '',
    zhVacancy: job.zhVacancy || '',
    deadline: job.deadline || '',
    banglaDeadline: job.banglaDeadline || '',
    zhDeadline: job.zhDeadline || '',
    description: job.description || '',
    banglaDescription: job.banglaDescription || '',
    zhDescription: job.zhDescription || '',
    requirements: job.requirements || [],
    banglaRequirements: job.banglaRequirements || [],
    zhRequirements: job.zhRequirements || [],
  };

  const jobRef = doc(db, JOBS_COLLECTION, jobId);
  await setDoc(jobRef, jobToSave, { merge: true });
}

/**
 * Delete a job directly from Firestore by document ID
 */
export async function deleteJobFromFirestore(id: string): Promise<void> {
  const jobRef = doc(db, JOBS_COLLECTION, id);
  await deleteDoc(jobRef);
}

/**
 * Seed existing default jobs directly into Firestore
 * Returns count of migrated jobs
 */
export async function migrateExistingJobs(): Promise<number> {
  let count = 0;
  for (const job of defaultOpenPositions) {
    const jobRef = doc(db, JOBS_COLLECTION, job.id);
    await setDoc(jobRef, {
      ...job,
      requirements: job.requirements || [],
      banglaRequirements: job.banglaRequirements || [],
      zhRequirements: job.zhRequirements || [],
    }, { merge: true });
    count++;
  }
  return count;
}
