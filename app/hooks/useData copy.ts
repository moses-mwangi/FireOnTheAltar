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

  return {
    folders,
    allData,
    loading,
    error,
    createFolder,
    updateFolder,
    deleteFolder,
    refetch: fetchFolders,
  };
};

export const useEntries = (
  folderId: string | null,
  subCategoryId: string | null,
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

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const createEntry = async (entryData: WritingEntry) => {
    try {
      const response = await dataService.createEntry(entryData);
      setEntries((prev) => [response.data, ...prev]);
      return response.data;
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
      setEntries((prev) =>
        prev.map((e) => (e.id === entryId ? { ...e, ...updates } : e)),
      );
      return response.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteEntry = async (entryId: string) => {
    try {
      await dataService.deleteEntry(entryId);
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
    refetch: fetchEntries,
  };
};

export const useSubCategories = (parentFolderId: string | null) => {
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

  const createSubCategory = async (subCategoryData: SubCategory) => {
    try {
      const response = await dataService.createSubCategory(subCategoryData);
      setSubCategories((prev) => [...prev, response.data]);
      return response.data;
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
    refetchSubCategories: fetchSubCategories,
  };
};
