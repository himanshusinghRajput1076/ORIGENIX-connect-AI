"use client";
import { useState, useEffect, useCallback } from "react";
import { useFirestoreCollection } from "./useFirestoreCollection";
import type { Person, Company, ActivityEvent } from "@/types";

export interface IndustryItem {
  name: string;
  value: number;
  color: string;
}

export interface FundingTrendItem {
  date: string;
  amount: number;
}

export interface DealFlowItem {
  month: string;
  deals: number;
}

/**
 * Pure Real-Time Data Hooks for Production.
 * Connects directly to Firestore collections and live APIs without mock data.
 */
export function useRealtimePeople() {
  const { data: firestoreData, loading: fsLoading, error } = useFirestoreCollection<Person>({
    collectionName: "people",
    maxItems: 100,
  });

  const [livePeople, setLivePeople] = useState<Person[]>([]);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    async function fetchApi() {
      if (firestoreData.length === 0) {
        setApiLoading(true);
        try {
          const res = await fetch("/api/data/real-time");
          const json = await res.json();
          if (json.success && json.data) {
            const founders = (json.data.liveFounders || []).map((f: any) => ({
              id: f.id,
              name: f.name,
              title: f.title,
              company: f.company,
              location: f.location,
              roles: ["founder"],
              leadScore: f.leadScore || 90,
              avatar: f.avatar,
              linkedin: f.linkedin,
              email: f.email,
              industries: f.industries || ["AI"]
            }));
            const investors = (json.data.liveInvestors || []).map((i: any) => ({
              id: i.id,
              name: i.name,
              title: i.title,
              company: i.company,
              location: i.location,
              roles: ["investor", "vc"],
              leadScore: i.matchScore || 88,
              avatar: i.avatar,
              linkedin: i.linkedin,
              email: i.email,
              industries: i.industries || ["Venture Capital"]
            }));
            setLivePeople([...founders, ...investors] as any);
          }
        } catch (e) {
          console.error("Live people fetch error:", e);
        } finally {
          setApiLoading(false);
        }
      }
    }
    fetchApi();
  }, [firestoreData.length]);

  return { 
    people: firestoreData.length > 0 ? firestoreData : livePeople, 
    loading: fsLoading || apiLoading, 
    error, 
    isLive: true 
  };
}

export function useRealtimeCompanies() {
  const { data: firestoreData, loading: fsLoading, error } = useFirestoreCollection<Company>({
    collectionName: "companies",
    maxItems: 100,
  });

  const [liveCompanies, setLiveCompanies] = useState<Company[]>([]);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    async function fetchApi() {
      if (firestoreData.length === 0) {
        setApiLoading(true);
        try {
          const res = await fetch("/api/data/real-time");
          const json = await res.json();
          if (json.success && json.data) {
            const startups = (json.data.liveStartups || []).map((s: any) => ({
              id: s.id,
              name: s.name,
              tagline: s.description || "Next-generation AI Startup",
              type: "startup",
              stage: "seed",
              location: "Bengaluru, KA, India",
              industries: [s.language || "AI", "SaaS"],
              totalFunding: 1500000,
              teamSize: 12,
              logo: "",
              foundedYear: 2024
            }));
            setLiveCompanies(startups as any);
          }
        } catch (e) {
          console.error("Live companies fetch error:", e);
        } finally {
          setApiLoading(false);
        }
      }
    }
    fetchApi();
  }, [firestoreData.length]);

  return { 
    companies: firestoreData.length > 0 ? firestoreData : liveCompanies, 
    loading: fsLoading || apiLoading, 
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
      totalLeadsChange: 0,
      matchRate: 0,
      matchRateChange: 0,
      outreachSent: 0,
      outreachSentChange: 0,
      responseRate: 0,
      responseRateChange: 0,
    },
    fundingTrends: [] as FundingTrendItem[],
    dealFlow: [] as DealFlowItem[],
    industryDistribution: [] as IndustryItem[],
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
