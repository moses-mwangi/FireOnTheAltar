import { useState, useEffect, useCallback } from "react";
import dataService from "../services/dataService";
import {
  CategorySubEntry,
  Folder,
  SubCategory,
  WritingEntry,
} from "@/lib/types/folders";

export const useFolders = (category: string | null) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allData, setAllData] = useState<CategorySubEntry>({
    folders: [],
    subCategories: [],
    entries: [],
  });

  const fetchFolders = useCallback(async () => {
    try {
      setLoading(true);
      const allFolders = await dataService.getFolders(category);
      const allFolderData = await dataService.getAllData();

      setAllData(allFolderData);
      setFolders(allFolders);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  const createFolder = async (folderData: Folder) => {
    try {
      const response = await dataService.createFolder(folderData);
      const newFolder = response.data;

      setAllData((prev) => ({
        ...prev,
        folders: [...prev.folders, newFolder],
      }));
      setFolders((prev) => [...prev, newFolder]);
      return newFolder;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateFolder = async (folderId: string, updates: Partial<Folder>) => {
    try {
      const response = await dataService.updateFolder(folderId, updates);
      setAllData((prev) => ({
        ...prev,
        folders: prev.folders.map((f) =>
          f.id === folderId ? { ...f, ...updates } : f,
        ),
      }));
      setAllData((prev) => ({
        ...prev,
        folders: prev.folders.map((f) =>
          f.id === folderId ? { ...f, ...updates } : f,
        ),
      }));
      setFolders((prev) =>
        prev.map((f) => (f.id === folderId ? { ...f, ...updates } : f)),
      );
      return response.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteFolder = async (folderId: string) => {
    try {
      await dataService.deleteFolder(folderId);
      setAllData((prev) => ({
        ...prev,
        folders: prev.folders.filter((f) => f.id !== folderId),
        subCategories: prev.subCategories!.filter(
          (s) => s.parentFolderId !== folderId,
        ),
        entries: prev.entries.filter((e) => e.folderId !== folderId),
      }));
      setFolders((prev) => prev.filter((f) => f.id !== folderId));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const addSubCategoryToAllData = (newSubCategory: SubCategory) => {
    setAllData((prev) => ({
      ...prev,
      subCategories: [...(prev.subCategories ?? []), newSubCategory],
    }));
  };

  const addEntryToAllData = (newEntry: WritingEntry) => {
    setAllData((prev) => ({
      ...prev,
      entries: [newEntry, ...prev.entries],
    }));
  };

  const updateEntryInAllData = (
    entryId: string,
    updates: Partial<WritingEntry>,
  ) => {
    setAllData((prev) => ({
      ...prev,
      entries: prev.entries.map((e) =>
        e.id === entryId ? { ...e, ...updates } : e,
      ),
    }));
  };

  const deleteEntryFromAllData = (entryId: string) => {
    setAllData((prev) => ({
      ...prev,
      entries: prev.entries.filter((e) => e.id !== entryId),
    }));
  };

  const updateSubCategoryInAllData = (
    subCategoryId: string,
    updates: Partial<SubCategory>,
  ) => {
    setAllData((prev) => ({
      ...prev,
      subCategories: prev?.subCategories!.map((s) =>
        s.id === subCategoryId ? { ...s, ...updates } : s,
      ),
    }));
  };

  const deleteSubCategoryFromAllData = (subCategoryId: string) => {
    setAllData((prev) => ({
      ...prev,
      subCategories: prev?.subCategories!.filter((s) => s.id !== subCategoryId),
      // Also delete entries that belong to this subcategory
      entries: prev.entries.filter((e) => e.subCategoryId !== subCategoryId),
    }));
  };

  return {
    folders,
    allData,
    loading,
    error,
    createFolder,
    updateFolder,
    deleteFolder,
    addSubCategoryToAllData,
    addEntryToAllData,
    updateEntryInAllData,
    deleteEntryFromAllData,
    refetch: fetchFolders,

    updateSubCategoryInAllData,
    deleteSubCategoryFromAllData,
  };
};

export const useEntries = (
  folderId: string | null,
  subCategoryId: string | null,
  allData: CategorySubEntry, // Pass allData from useFolders
  addEntryToAllData: (entry: WritingEntry) => void,
  updateEntryInAllData: (
    entryId: string,
    updates: Partial<WritingEntry>,
  ) => void,
  deleteEntryFromAllData: (entryId: string) => void,
) => {
  const [entries, setEntries] = useState<WritingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      let allEntries = await dataService.getEntries(folderId as string);

      if (subCategoryId) {
        allEntries = allEntries.filter(
          (e) => e.subCategoryId === subCategoryId,
        );
      } else if (folderId) {
        allEntries = allEntries.filter((e) => !e.subCategoryId);
      }

      setEntries(allEntries);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [folderId, subCategoryId]);

  const filterEntries = useCallback(() => {
    if (!allData.entries) return [];

    let filtered = [...allData.entries];

    if (subCategoryId) {
      filtered = filtered.filter((e) => e.subCategoryId === subCategoryId);
    } else if (folderId) {
      filtered = filtered.filter(
        (e) => e.folderId === folderId && !e.subCategoryId,
      );
    }

    return filtered;
  }, [allData.entries, folderId, subCategoryId]);

  useEffect(() => {
    setEntries(filterEntries());
  }, [filterEntries]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const createEntry = async (entryData: WritingEntry) => {
    try {
      const response = await dataService.createEntry(entryData);
      const newEntry = response.data;

      addEntryToAllData(newEntry);
      setEntries((prev) => [newEntry, ...prev]);

      return newEntry;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateEntry = async (
    entryId: string,
    updates: Partial<WritingEntry>,
  ) => {
    try {
      const response = await dataService.updateEntry(entryId, updates);
      const updatedEntry = response.data;
      updateEntryInAllData(entryId, updates);
      setEntries((prev) =>
        prev.map((e) => (e.id === entryId ? { ...e, ...updates } : e)),
      );
      return updateEntry;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteEntry = async (entryId: string) => {
    try {
      await dataService.deleteEntry(entryId);
      deleteEntryFromAllData(entryId);
      setEntries((prev) => prev.filter((e) => e.id !== entryId));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const toggleFavorite = async (entryId: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (entry) {
      await updateEntry(entryId, { isFavorite: !entry.isFavorite });
    }
  };

  return {
    entries,
    loading,
    error,
    createEntry,
    updateEntry,
    deleteEntry,
    toggleFavorite,
    // refetch: fetchEntries,

    refetch: () => setEntries(filterEntries()),
  };
};

export const useSubCategories = (
  parentFolderId: string | null,
  allData: CategorySubEntry, // Pass allData from useFolders
  addSubCategoryToAllData: (subCategory: SubCategory) => void,
  updateSubCategoryInAllData: (
    subCategoryId: string,
    updates: Partial<SubCategory>,
  ) => void,
  deleteSubCategoryFromAllData: (subCategoryId: string) => void,
) => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubCategories = useCallback(async () => {
    try {
      setLoading(true);
      const allSubCategories = await dataService.getSubCategories(
        parentFolderId as string,
      );
      setSubCategories(allSubCategories);
    } catch (err) {
      setError((err as any).message);
    } finally {
      setLoading(false);
    }
  }, [parentFolderId]);

  useEffect(() => {
    fetchSubCategories();
  }, [fetchSubCategories]);

  const filterSubCategories = useCallback(() => {
    if (!allData.subCategories) return [];

    if (parentFolderId) {
      return allData.subCategories.filter(
        (s) => s.parentFolderId === parentFolderId,
      );
    }
    return allData.subCategories;
  }, [allData.subCategories, parentFolderId]);

  useEffect(() => {
    setSubCategories(filterSubCategories());
  }, [filterSubCategories]);

  const createSubCategory = async (subCategoryData: SubCategory) => {
    try {
      const response = await dataService.createSubCategory(subCategoryData);
      const newSubCategory = response.data;
      addSubCategoryToAllData(newSubCategory);
      setSubCategories((prev) => [...prev, newSubCategory]);

      return newSubCategory;
    } catch (err) {
      setError((err as any).message);
      throw err;
    }
  };

  const updateSubCategory = async (
    subCategoryId: string,
    updates: Partial<SubCategory>,
  ) => {
    try {
      const response = await dataService.updateSubCategory(
        subCategoryId,
        updates,
      );
      const updatedSubCategory = response.data;

      // Update allData first
      updateSubCategoryInAllData(subCategoryId, updates);

      // Then update local subCategories state
      setSubCategories((prev) =>
        prev.map((s) => (s.id === subCategoryId ? { ...s, ...updates } : s)),
      );

      return updatedSubCategory;
    } catch (err) {
      setError((err as any).message);
      throw err;
    }
  };

  const deleteSubCategory = async (subCategoryId: string) => {
    try {
      await dataService.deleteSubCategory(subCategoryId);

      // Update allData first (this will also delete associated entries)
      deleteSubCategoryFromAllData(subCategoryId);

      // Then update local subCategories state
      setSubCategories((prev) => prev.filter((s) => s.id !== subCategoryId));

      return true;
    } catch (err) {
      setError((err as any).message);
      throw err;
    }
  };

  return {
    subCategories,
    loading,
    error,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    // refetchSubCategories: fetchSubCategories,
    refetchSubCategories: () => setSubCategories(filterSubCategories()),
  };
};
