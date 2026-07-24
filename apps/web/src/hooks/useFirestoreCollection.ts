"use client";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy, limit, where, type QueryConstraint, type DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface UseFirestoreOptions {
  collectionName: string;
  constraints?: QueryConstraint[];
  maxItems?: number;
  enabled?: boolean;
}

export function useFirestoreCollection<T = DocumentData>(options: UseFirestoreOptions) {
  const { collectionName, constraints = [], maxItems = 50, enabled = true } = options;
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const colRef = collection(db, collectionName);
      const q = query(colRef, ...constraints, limit(maxItems));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as T[];
          setData(items);
          setLoading(false);
        },
        (err) => {
          console.error(`[Firestore] Error on ${collectionName}:`, err);
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err: any) {
      console.error(`[Firestore] Setup error on ${collectionName}:`, err);
      setError(err.message);
      setLoading(false);
    }
  }, [collectionName, enabled]);

  return { data, loading, error };
}
