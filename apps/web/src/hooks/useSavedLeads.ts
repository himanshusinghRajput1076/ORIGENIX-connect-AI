import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot, getDocs, query, orderBy } from "firebase/firestore";
import { mockPeople } from "@/lib/mock-data";

export interface SavedLead {
  id: string; // The person ID
  savedAt: string;
  notes?: string;
  status: "new" | "contacted" | "meeting_set" | "passed";
}

export function useSavedLeads() {
  const { user } = useAuth();
  const [savedLeads, setSavedLeads] = useState<SavedLead[]>([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to real-time updates for saved leads
  useEffect(() => {
    if (!user) {
      setSavedLeads([]);
      setLoading(false);
      return;
    }

    const leadsRef = collection(db, "users", user.uid, "savedLeads");
    const q = query(leadsRef, orderBy("savedAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leads: SavedLead[] = [];
      snapshot.forEach((doc) => {
        leads.push({ id: doc.id, ...doc.data() } as SavedLead);
      });
      setSavedLeads(leads);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching saved leads:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const saveLead = useCallback(async (personId: string, notes: string = "") => {
    if (!user) throw new Error("Must be logged in to save leads");
    
    const leadRef = doc(db, "users", user.uid, "savedLeads", personId);
    const newLead: Omit<SavedLead, "id"> = {
      savedAt: new Date().toISOString(),
      notes,
      status: "new",
    };

    await setDoc(leadRef, newLead);
  }, [user]);

  const removeLead = useCallback(async (personId: string) => {
    if (!user) throw new Error("Must be logged in to remove leads");
    
    const leadRef = doc(db, "users", user.uid, "savedLeads", personId);
    await deleteDoc(leadRef);
  }, [user]);

  const isLeadSaved = useCallback((personId: string) => {
    return savedLeads.some(lead => lead.id === personId);
  }, [savedLeads]);

  // Helper to get the full mock data for saved leads
  const getFullSavedLeadsData = useCallback(() => {
    return savedLeads.map(lead => {
      const personData = mockPeople.find(p => p.id === lead.id);
      return { ...personData, savedData: lead };
    }).filter(l => l.name); // Filter out any that weren't found in mock data
  }, [savedLeads]);

  return {
    savedLeads,
    loading,
    saveLead,
    removeLead,
    isLeadSaved,
    getFullSavedLeadsData
  };
}
