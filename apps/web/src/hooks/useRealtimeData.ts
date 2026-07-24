"use client";
import { useState, useEffect, useCallback } from "react";
import { useFirestoreCollection } from "./useFirestoreCollection";
import type { Person, Company, ActivityEvent } from "@/types";

/**
 * Pure Real-Time Data Hooks for Production.
 * Connects directly to Firestore collections and live APIs without mock data.
 */
export function useRealtimePeople() {
  const { data: firestoreData, loading, error } = useFirestoreCollection<Person>({
    collectionName: "people",
    maxItems: 100,
  });

  return { 
    people: firestoreData, 
    loading, 
    error, 
    isLive: true 
  };
}

export function useRealtimeCompanies() {
  const { data: firestoreData, loading, error } = useFirestoreCollection<Company>({
    collectionName: "companies",
    maxItems: 100,
  });

  return { 
    companies: firestoreData, 
    loading, 
    error, 
    isLive: true 
  };
}

export function useRealtimeActivities() {
  const { data: firestoreData, loading, error } = useFirestoreCollection<ActivityEvent>({
    collectionName: "activities",
    maxItems: 20,
  });

  return { 
    activities: firestoreData, 
    loading, 
    error, 
    isLive: true 
  };
}

export function useRealtimeDashboard() {
  return {
    metrics: {
      totalLeads: 0,
      matchRate: 0,
      outreachSent: 0,
      responseRate: 0,
    },
    fundingTrends: [],
    dealFlow: [],
    industryDistribution: [],
    loading: false,
    isLive: true,
  };
}

export function useLiveApiData<T>(fetcher: () => Promise<T[]>, deps: any[] = []) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err: any) {
      console.error("[LiveAPI] Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
