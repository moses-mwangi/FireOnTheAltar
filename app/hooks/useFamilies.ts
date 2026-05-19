// hooks/useFamilies.ts
import { useState, useEffect } from "react";
import { SynonymFamily } from "@/lib/types/vocabTypes";

export const useFamilies = () => {
  const [families, setFamilies] = useState<SynonymFamily[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFamilies = async () => {
    try {
      const response = await fetch("/api/group");
      const data = await response.json();
      setFamilies(data.families || []);
    } catch (error) {
      console.error("Failed to fetch families:", error);
    } finally {
      setLoading(false);
    }
  };

  const createFamily = async (family: SynonymFamily) => {
    const response = await fetch("/api/group", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "createFamily", family }),
    });
    if (response.ok) {
      await fetchFamilies();
    }
    return response;
  };

  const updateFamily = async (id: string, updates: Partial<SynonymFamily>) => {
    const response = await fetch("/api/group", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // action: "updateFamily",
        familyId: id,
        updates,
      }),
    });
    if (response.ok) await fetchFamilies();
    return response;
  };

  const deleteFamily = async (id: string) => {
    const response = await fetch("/api/group", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "deleteFamily", familyId: id }),
    });
    if (response.ok) await fetchFamilies();
    return response;
  };

  useEffect(() => {
    fetchFamilies();
  }, []);

  return {
    families,
    loading,
    createFamily,
    updateFamily,
    deleteFamily,
    fetchFamilies,
  };
};
