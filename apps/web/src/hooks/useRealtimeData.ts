"use client";
import { useState, useEffect, useCallback } from "react";
import { useFirestoreCollection } from "./useFirestoreCollection";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { mockPeople, mockCompanies, mockActivities, mockDashboardMetrics, mockFundingTrends, mockDealFlow, mockIndustryDistribution } from "@/lib/mock-data";
import type { Person, Company, ActivityEvent, DashboardMetrics } from "@/types";

/**
 * Hybrid data hook: tries Firestore first, falls back to mock data.
 * This ensures the app works in demo mode without Firebase configured
 * AND in production with real Firestore data.
 */
export function useRealtimePeople() {
  const { data: firestoreData, loading, error } = useFirestoreCollection<Person>({
    collectionName: "people",
    maxItems: 100,
  });

  // If Firestore returns data, use it. Otherwise fall back to mock data.
  const people = firestoreData.length > 0 ? firestoreData : mockPeople;
  return { people, loading: firestoreData.length > 0 ? loading : false, error, isLive: firestoreData.length > 0 };
}

export function useRealtimeCompanies() {
  const { data: firestoreData, loading, error } = useFirestoreCollection<Company>({
    collectionName: "companies",
    maxItems: 100,
  });

  const companies = firestoreData.length > 0 ? firestoreData : mockCompanies;
  return { companies, loading: firestoreData.length > 0 ? loading : false, error, isLive: firestoreData.length > 0 };
}

export function useRealtimeActivities() {
  const { data: firestoreData, loading, error } = useFirestoreCollection<ActivityEvent>({
    collectionName: "activities",
    maxItems: 20,
  });

  const activities = firestoreData.length > 0 ? firestoreData : mockActivities;
  return { activities, loading: firestoreData.length > 0 ? loading : false, error, isLive: firestoreData.length > 0 };
}

export function useRealtimeDashboard() {
  return {
    metrics: mockDashboardMetrics,
    fundingTrends: mockFundingTrends,
    dealFlow: mockDealFlow,
    industryDistribution: mockIndustryDistribution,
    loading: false,
    isLive: false,
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
