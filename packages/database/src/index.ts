import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin only once
if (!getApps().length) {
  try {
    const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccountStr) {
      const serviceAccount = JSON.parse(serviceAccountStr);
      initializeApp({
        credential: cert(serviceAccount)
      });
    } else {
      initializeApp();
    }
  } catch (error) {
    console.warn('Firebase Admin initialization failed. Check your FIREBASE_SERVICE_ACCOUNT env var or GOOGLE_APPLICATION_CREDENTIALS.');
    console.error(error);
  }
}

export const db = getApps().length ? getFirestore(getApp()) : null;
export const auth = getApps().length ? getAuth(getApp()) : null;

// Export typed collections
const getCollection = (collectionName: string) => db ? db.collection(collectionName) : null;

export const collections = {
  users: getCollection('users'),
  companies: getCollection('companies'),
  investors: getCollection('investors'),
  founders: getCollection('founders'),
  startups: getCollection('startups'),
  companyPosts: getCollection('company_posts'),
  aiAnalyses: getCollection('ai_analyses'),
  contacts: getCollection('contacts'),
  crmNotes: getCollection('crm_notes'),
  savedSearches: getCollection('saved_searches'),
  notifications: getCollection('notifications'),
  linkedinIntegrations: getCollection('linkedin_integrations')
};

export * from './types';
