"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  FileText,
  Save,
  Trash2,
  Plus,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Heart,
  Brain,
  Lightbulb,
  Folder,
  FolderOpen,
  MoreVertical,
  Star,
  Move,
  Pen,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Essay from "@/app/writing/english-Writing/Essay";
import CommonWordsUI from "./english-Writing/vocab/CommonWords";
import AdvanceWordsUI from "./english-Writing/vocab/AdvanceWords";
import GroupedWordsUI from "./english-Writing/vocab/GroupedWords";
import {
  useEntries,
  useFolders,
  useSubCategories,
} from "@/app/hooks/useFolders";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SynonymFamily } from "@/lib/types/vocabTypes";
import { useFamilies } from "../hooks/useFamilies";

const Bible = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM11.9999 5C12.5521 5 13.0999 5.44772 13.0999 6V10H17.9999C18.5521 10 19.0999 10.4477 19.0999 11C19.0999 11.5523 18.5521 12 17.9999 12H13.0999V16C13.0999 16.5523 12.5521 17 11.9999 17C11.4477 17 10.8999 16.5523 10.8999 16V12H6.99988C6.44766 12 5.89988 11.5523 5.89988 11C5.89988 10.4477 6.44766 10 6.99988 10H10.8999V6C10.8999 5.44772 11.4477 5 11.9999 5Z" />
  </svg>
);

// Types
export type SubCategory = {
  id: string;
  name: string;
  icon: any;
  parentFolderId: string;
  createdAt: string;
};

type Folder = {
  id: string;
  name: string;
  icon?: any;
  parentId: string | null;
  category: MainCategory;
  createdAt: string;
  description?: string;
  hasSubCategories?: boolean;
};

type WritingEntry = {
  id: string;
  title: string;
  content: string;
  folderId: string;
  subCategoryId?: string;
  category: MainCategory;
  date: string;
  wordCount: number;
  tags?: string[];
  isFavorite?: boolean;
  version?: number;
};

type MainCategory =
  | "bible"
  | "philosophy"
  | "psychology"
  | "wisdom"
  | "science"
  | "spirituality"
  | "english";

const categories: {
  id: MainCategory;
  label: string;
  icon: any;
  color: string;
  description?: string;
}[] = [
  {
    id: "english",
    label: "English & Writing",
    icon: FileText,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "bible",
    label: "Holy Bible",
    icon: Bible,
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: "philosophy",
    label: "Philosophy",
    icon: Brain,
    color: "from-amber-600 to-orange-600",
  },
  {
    id: "psychology",
    label: "Psychology",
    icon: Brain,
    color: "from-teal-600 to-cyan-600",
  },
  {
    id: "wisdom",
    label: "Wisdom Literature",
    icon: Lightbulb,
    color: "from-yellow-600 to-amber-600",
  },
  {
    id: "science",
    label: "Science",
    icon: BookOpen,
    color: "from-green-600 to-emerald-600",
  },
  {
    id: "spirituality",
    label: "Spirituality",
    icon: Heart,
    color: "from-purple-600 to-pink-600",
  },
];

export default function WritingPage() {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    string | null
  >(null);
  const [selectedEntry, setSelectedEntry] = useState<WritingEntry | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<WritingEntry | null>(null);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<MainCategory>("english");
  const {
    allData,
    createFolder,
    updateFolder,
    deleteFolder,
    refetch,
    addEntryToAllData,
    updateEntryInAllData,
    deleteEntryFromAllData,
    addSubCategoryToAllData,
    updateSubCategoryInAllData,
    deleteSubCategoryFromAllData,
  } = useFolders(selectedCategory);
  const {
    createSubCategory,
    refetchSubCategories,
    updateSubCategory,
    deleteSubCategory,
  } = useSubCategories(
    selectedCategory,
    allData,
    addSubCategoryToAllData,
    updateSubCategoryInAllData,
    deleteSubCategoryFromAllData,
  );
  const {
    createEntry,
    deleteEntry,
    toggleFavorite,
    refetch: fetchEntries,
  } = useEntries(
    selectedFolderId,
    selectedSubCategoryId,
    allData,
    addEntryToAllData,
    updateEntryInAllData,
    deleteEntryFromAllData,
  );

  const { folders, subCategories, entries } = allData;
  const selectedFolder = folders.find((f) => f.id === selectedFolderId);
  const selectedSubCategory = subCategories?.find(
    (s) => s.id === selectedSubCategoryId,
  );

  // Drag and drop state
  const [draggedEntry, setDraggedEntry] = useState<WritingEntry | null>(null);
  const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [tags, setTags] = useState("");

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(),
  );
  const [expandedSubCategories, setExpandedSubCategories] = useState<
    Set<string>
  >(new Set());
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [showContextMenu, setShowContextMenu] = useState<{
    x: number;
    y: number;
    folderId: string;
  } | null>(null);
  const [newFolderDescription, setNewFolderDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [loading, setLoading] = useState({
    folders: true,
    entries: false,
    saving: false,
  });

  //////// Group Family
  const [groupName, setGroupName] = useState("");
  const [theme, setTheme] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");

  const { families, createFamily, updateFamily, deleteFamily, fetchFamilies } =
    useFamilies();

  useEffect(() => {
    const words = content
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    setWordCount(words.length);
  }, [content]);

  // State for editing subcategory
  const [editingSubCategory, setEditingSubCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [showEditSubCategoryModal, setShowEditSubCategoryModal] =
    useState(false);

  // Update subcategory
  const handleUpdateSubCategory = async () => {
    if (!editingSubCategory || !editingSubCategory.name.trim()) return;

    try {
      await updateSubCategory(editingSubCategory.id, {
        name: editingSubCategory.name.trim(),
      });

      showNotification("Subcategory updated successfully", "success");
      setShowEditSubCategoryModal(false);
      setEditingSubCategory(null);
    } catch (error) {
      showNotification("Failed to update subcategory", "error");
    }
  };

  // Delete subcategory
  const handleDeleteSubCategory = async (
    subCategoryId: string,
    subCategoryName: string,
  ) => {
    if (!confirm(`Delete "${subCategoryName}" and all entries inside?`)) return;

    try {
      await deleteSubCategory(subCategoryId);

      // Clear selection if the deleted subcategory was selected
      if (selectedSubCategoryId === subCategoryId) {
        setSelectedSubCategoryId(null);
        setSelectedEntry(null);
        setTitle("");
        setContent("");
        setTags("");
      }

      showNotification("Subcategory deleted successfully", "success");
    } catch (error) {
      showNotification("Failed to delete subcategory", "error");
    }
  };

  // Update the context menu to handle both folders and subcategories
  const [contextMenuType, setContextMenuType] = useState<
    "folder" | "subcategory"
  >("folder");
  const [contextMenuSubCategoryId, setContextMenuSubCategoryId] = useState<
    string | null
  >(null);

  const [wordFamilies, setWordFamilies] = useState<SynonymFamily[]>([]);
  const [familiesLoading, setFamiliesLoading] = useState(false);

  // Update the context menu actions
  const handleContextMenuAction = (action: "delete" | "update") => {
    if (contextMenuType === "subcategory" && contextMenuSubCategoryId) {
      if (action === "delete") {
        handleDeleteSubCategory(
          contextMenuSubCategoryId,
          editingSubCategory?.name || "",
        );
      } else if (action === "update") {
        setShowEditSubCategoryModal(true);
      }
    } else if (contextMenuType === "folder" && showContextMenu) {
      if (action === "delete") {
        deleteFolder(showContextMenu.folderId);
      } else if (action === "update") {
        // Handle folder update if needed
        console.log("Update folder:", showContextMenu.folderId);
      }
    }
    setShowContextMenu(null);
    setContextMenuSubCategoryId(null);
  };

  // Get current category folders
  const currentCategoryFolders = folders.filter(
    (f) => f.category === selectedCategory,
  );

  // Get subcategories for a folder
  const getFolderSubCategories = (folderId: string) => {
    return subCategories?.filter((sub) => sub.parentFolderId === folderId);
  };

  // Get entries for a specific folder or subcategory
  const getEntries = (folderId: string, subCategoryId?: string) => {
    let folderEntries = entries.filter((e) => {
      if (subCategoryId) {
        return e.folderId === folderId && e.subCategoryId === subCategoryId;
      }
      return e.folderId === folderId && !e.subCategoryId;
    });

    if (searchQuery) {
      folderEntries = folderEntries.filter(
        (e) =>
          e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (e.tags &&
            e.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase()),
            )),
      );
    }

    if (showFavoritesOnly) {
      folderEntries = folderEntries.filter((e) => e.isFavorite);
    }

    return folderEntries;
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, entry: WritingEntry) => {
    setDraggedEntry(entry);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", entry.id);
  };

  const handleDragEnd = () => {
    setDraggedEntry(null);
    setDragOverFolderId(null);
  };

  const handleDragOver = (e: React.DragEvent, folderId: string) => {
    e.preventDefault();
    setDragOverFolderId(folderId);
  };

  const handleDragLeave = () => {
    setDragOverFolderId(null);
  };

  const handleDrop = (e: React.DragEvent, targetFolderId: string) => {
    e.preventDefault();
    setDragOverFolderId(null);
    if (!draggedEntry) return;
    if (draggedEntry.folderId === targetFolderId) {
      showNotification("Entry is already in this folder", "error");
      return;
    }
    const targetFolder = folders.find((f) => f.id === targetFolderId);
    if (!targetFolder) return;

    const updatedEntry = {
      ...draggedEntry,
      folderId: targetFolderId,
      subCategoryId: undefined,
      category: targetFolder.category,
      date: new Date().toISOString(),
    };
    // setEntries(
    //   entries.map((e) => (e.id === draggedEntry.id ? updatedEntry : e)),
    // );
    showNotification(`Moved to ${targetFolder.name}`, "success");
    setDraggedEntry(null);
  };

  // Fix toggle favorite
  const handleToggleFavorite = async (entryId: string) => {
    try {
      await toggleFavorite(entryId);
    } catch (error) {
      showNotification("Failed to toggle favorite", "error");
    }
  };

  const createFolderDirect = async () => {
    if (!newFolderName.trim()) return;

    try {
      if (selectedFolder) {
        const newSubCategory: SubCategory = {
          id: `sub-${Date.now().toString()}`,
          name: newFolderName.trim(),
          icon: "SubCategory",
          parentFolderId: selectedFolder.id,
          createdAt: new Date().toISOString(),
        };

        await createSubCategory(newSubCategory);

        // REFRESH
        await refetchSubCategories();
      } else {
        const newFolder = {
          id: `folder-${Date.now()}`,
          name: newFolderName.trim(),
          icon: "Folder",
          parentId: null,
          category: selectedCategory,
          description: newFolderDescription.trim() || undefined,
          hasSubCategories: false,
          createdAt: new Date().toISOString(),
        };

        await createFolder(newFolder);

        // REFRESH
        await refetch();
      }

      setShowNewFolderModal(false);

      showNotification("Created successfully", "success");
    } catch (error) {
      showNotification("Failed to create", "error");
    }
  };

  const createEntryFiles = async () => {
    if (!title.trim()) return;

    try {
      const newEntry: WritingEntry = {
        id: `entry-${Date.now().toString()}`,
        title: title.trim(),
        content: content.trim(),
        folderId: selectedFolder!.id,
        subCategoryId: selectedSubCategory?.id,
        category: selectedCategory,
        date: new Date().toISOString(),
        wordCount,
        tags: [tags],
        isFavorite: false,
      };

      await createEntry(newEntry);

      // REFRESH
      await fetchEntries();

      showNotification("Entry created", "success");
    } catch (error) {
      showNotification("Failed to create entry", "error");
    }
  };

  const handleAddFamily = async () => {
    try {
      const slug = groupName.toLowerCase().replace(/\s+/g, "-");
      // const newFamily:SynonymFamily = {
      const newFamily: SynonymFamily = {
        id: `${slug}-${crypto.randomUUID()}-${Date.now().toString()}`,
        name: groupName.trim(),
        theme: theme.trim(),
        difficulty,
        words: [],
      };

      console.log(newFamily);
      await fetch("/api/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "createFamily",
          family: newFamily,
        }),
      });
      setIsCreatingGroup(false);
      // await fetchFamilies();
    } catch (err) {
      console.log();
    }
  };

  const loadEntry = (entry: WritingEntry) => {
    setSelectedEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setSelectedFolderId(entry.folderId);
    setSelectedSubCategoryId(entry.subCategoryId || null);
    setTags(entry.tags?.join(", ") || "");
  };

  // Delete entry
  const deleteEntryFile = async (entryId: string) => {
    if (!confirm("Delete this entry?")) return;

    try {
      await deleteEntry(entryId);

      // REFRESH
      await fetchEntries();

      showNotification("Entry deleted", "success");
    } catch (error) {
      showNotification("Delete failed", "error");
    }
  };

  const newWriting = () => {
    setSelectedEntry(null);
    setTitle("");
    setContent("");
    setTags("");
  };

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const toggleSubCategory = (subCategoryId: string) => {
    const newExpanded = new Set(expandedSubCategories);
    if (newExpanded.has(subCategoryId)) {
      newExpanded.delete(subCategoryId);
    } else {
      newExpanded.add(subCategoryId);
    }
    setExpandedSubCategories(newExpanded);
  };

  const getStats = () => ({
    totalEntries: entries.length,
    totalWords: entries.reduce((sum, e) => sum + e.wordCount, 0),
    favoriteEntries: entries.filter((e) => e.isFavorite).length,
    categoriesWithContent: new Set(entries.map((e) => e.category)).size,
  });

  const stats = getStats();
  const currentCategoryData = categories.find((c) => c.id === selectedCategory);
  const CategoryIcon = currentCategoryData?.icon || BookOpen;

  const renderEnglish = () => {
    switch (selectedSubCategory?.name) {
      case "Common Words":
        return <CommonWordsUI />;

      case "Advanced Words":
        return <AdvanceWordsUI />;

      case "Grouped Words":
        return (
          <>
            {isCreatingGroup ? (
              <div className="w-full bg-white shadow-md">
                <div className="px-4 py-5 ">
                  <h2 className="text-xl font-semibold">
                    Create Word Family Group
                  </h2>
                </div>
                <Separator />
                <div className="space-y-4 p-6">
                  <div>
                    <Label className="mb-1 block text-sm font-medium text-gray-700">
                      Group Name
                    </Label>

                    <Input
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      type="text"
                      placeholder="Communication Verbs"
                      className="w-full border border-gray-300 px-4 py-2 outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <Label className="mb-1 block text-sm font-medium text-gray-700">
                      Theme
                    </Label>

                    <Textarea
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      placeholder="Ways to express yourself verbally"
                      rows={3}
                      className="w-full h-20 rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <Label className="mb-1 block text-sm font-medium text-gray-700">
                      Difficulty
                    </Label>
                    {/* onChange={(e) => setDifficulty(e.target.value)} */}
                    <Select
                      onValueChange={(e) => setDifficulty(e)}
                      value={difficulty}
                    >
                      <SelectTrigger className="w-full cursor-pointer  outline-none ">
                        <SelectValue placeholder="Select Group Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            className="cursor-pointer"
                            value="beginner"
                          >
                            Beginner
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="intermediate"
                          >
                            Intermediate
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="advanced"
                          >
                            Advanced
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="px-6 py-4 mb-4 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setIsCreatingGroup(false)}
                    className="rounded-xl cursor-pointer border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      handleAddFamily();
                    }}
                    className="rounded-xl cursor-pointer bg-purple-600 px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    Create Group
                  </button>
                </div>
              </div>
            ) : (
              <GroupedWordsUI />
            )}
          </>
        );

      case "Foreign Words":
        return <p>FOREIGN</p>;

      case "Idioms & Phrases":
        return <p>Idioms & Phrases</p>;

      default:
        return <AdvanceWordsUI />;
    }
  };

  const renderVocabulary = () => {
    switch (selectedFolder?.name) {
      case "Vocabulary":
        return renderEnglish();

      case "Essays":
        return (
          <Essay
            title={title}
            content={content}
            tags={tags}
            wordCount={wordCount}
            // saveEntry={saveEntry}
            saveEntry={() => {}}
            setTitle={setTitle}
            setContent={setContent}
            setTags={setTags}
            selectedFolderId={selectedFolderId}
            selectedEntry={selectedEntry}
          />
        );

      case "Poems":
        return <p>POEMS</p>;

      case "Journal":
        return <p>JOURNAL</p>;

      default:
        return <AdvanceWordsUI />;
    }
  };

  const renderContent = () => {
    switch (selectedCategory) {
      case "english":
        return renderVocabulary();

      case "bible":
        return <p>HOLY BIBLE</p>;

      default:
        return (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <input
                type="text"
                placeholder="Enter title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl font-bold bg-transparent border-none focus:outline-none"
              />
            </div>
            <div className="p-6">
              <textarea
                placeholder="Write your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[500px] text-gray-800 dark:text-white placeholder-gray-400 bg-transparent border-none focus:outline-none resize-none leading-relaxed"
              />
            </div>
            <div className="px-6 py-3 border-t">
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full text-sm bg-transparent border-none focus:outline-none"
              />
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>{content.length} characters</span>
              </div>
              <Button
                // onClick={saveEntry}
                disabled={!title.trim() || !content.trim() || !selectedFolderId}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {selectedEntry ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${currentCategoryData?.color}`}
                >
                  <CategoryIcon className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold">Wisdom Library</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 text-sm border bg-gray-50 rounded-lg w-48 focus:w-64 transition-all"
              />
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`p-2 rounded-lg ${showFavoritesOnly ? "bg-yellow-500 text-white" : "bg-gray-100"}`}
              >
                <Star className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={() => setShowStats(!showStats)}
                className="p-2 rounded-lg bg-gray-100"
              >
                <Lightbulb className="h-4 w-4 text-gray-600" />
              </button>
              <Button
                onClick={() => setShowNewFolderModal(true)}
                className="bg-green-600 font-medium hover:bg-green-700"
              >
                <Folder className="h-4 w-4" /> New Folder
              </Button>
              <button
                className={` ${isCreatingGroup ? "cursor-not-allowed hover:opacity-35 opacity-50" : "hover:bg-purple-700 hover:opacity-90 cursor-pointer"} flex items-center gap-[4px] bg-purple-600  rounded-md px-2 py-2 text-sm font-medium text-white`}
                onClick={() => {
                  if (selectedSubCategory?.name === "Grouped Words") {
                    if (isCreatingGroup) {
                      setIsCreatingGroup((s) => false);
                    } else {
                      setIsCreatingGroup((s) => true);
                      console.log("Moses");
                    }
                  } else {
                    createEntryFiles();
                  }
                }}
                disabled={!selectedFolderId || isCreatingGroup}
              >
                {!isCreatingGroup && <Plus className="h-4 w-4" />}
                {selectedSubCategory?.name === "Grouped Words"
                  ? "New Group"
                  : "New Entry"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      {showStats && (
        <div className="bg-white dark:bg-gray-800 border-b p-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.totalEntries}
              </div>
              <div className="text-sm text-gray-600">Total Entries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalWords.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.favoriteEntries}
              </div>
              <div className="text-sm text-gray-600">Favorites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.categoriesWithContent}
              </div>
              <div className="text-sm text-gray-600">Categories Used</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-80 bg-white dark:bg-gray-800 border-r min-h-[calc(100vh-73px)] overflow-y-auto">
            <div className="p-4">
              {/* Category Selector */}
              <div className="mb-6">
                <Label className="text-xs font-semibold uppercase mb-2 block text-gray-500">
                  Select Category
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value as MainCategory);
                    setSelectedFolderId(null);
                    setSelectedSubCategoryId(null);
                    newWriting();
                  }}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="w-full"
                    sideOffset={4}
                  >
                    <SelectGroup>
                      {categories.map((cat) => (
                        <SelectItem
                          className="cursor-pointer data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
                          key={cat.id}
                          value={cat.id}
                        >
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Folders Tree */}
              <div>
                <div className="flex justify-between mb-2">
                  <h2 className="text-sm font-semibold text-gray-500">
                    FOLDERS
                  </h2>
                  <span className="text-xs text-gray-400">
                    {currentCategoryFolders.length}
                  </span>
                </div>
                <div className="space-y-1">
                  {currentCategoryFolders.map((folder) => {
                    const folderSubCategories = getFolderSubCategories(
                      folder.id,
                    );
                    const isFolderExpanded = expandedFolders.has(folder.id);
                    const isDragOver = dragOverFolderId === folder.id;

                    return (
                      <div className="" key={folder.id}>
                        <div
                          className={`flex  items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100 group ${selectedFolderId === folder.id ? "bg-purple-50" : ""} ${isDragOver ? "bg-blue-100 border-2 border-blue-500" : ""}`}
                          onDragOver={(e) => handleDragOver(e, folder.id)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, folder.id)}
                        >
                          <div
                            className="flex items-center gap-2 flex-1"
                            onClick={() => {
                              setSelectedFolderId(folder.id);
                              setSelectedSubCategoryId(null);
                              newWriting();
                            }}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFolder(folder.id);
                              }}
                              className="p-0.5"
                            >
                              {isFolderExpanded ? (
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                            {isFolderExpanded ? (
                              <FolderOpen className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <Folder className="h-4 w-4 text-yellow-500" />
                            )}
                            <span className="text-sm font-medium truncate text-gray-700">
                              {folder.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              ({getEntries(folder.id).length})
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowContextMenu({
                                x: e.clientX,
                                y: e.clientY,
                                folderId: folder.id,
                              });
                            }}
                            className={`${selectedSubCategoryId ? " hidden" : ""} p-1 opacity-0 group-hover:opacity-100`}
                          >
                            <MoreVertical className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Subcategories */}
                        {isFolderExpanded &&
                          folderSubCategories?.map((sub) => {
                            const isSubExpanded = expandedSubCategories.has(
                              sub.id,
                            );
                            const subEntries = getEntries(folder.id, sub.id);
                            return (
                              <div key={sub.id} className="ml-6">
                                <div
                                  className={`${sub.isFolder ? "bg-purple-50/20" : "border-l-4 border-purple-600/50 bg-purple-50/20"} flex items-center justify-between p-2 rounded-lg group cursor-pointer hover:bg-gray-100 mt-1`}
                                >
                                  <div
                                    className="flex items-center gap-2 "
                                    onClick={() => {
                                      setSelectedFolderId(folder.id);
                                      setSelectedSubCategoryId(sub.id);
                                      newWriting();
                                    }}
                                  >
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSubCategory(sub.id);
                                      }}
                                      className={`${sub.isFolder ? "" : " hidden"} p-0.5`}
                                    >
                                      {isSubExpanded ? (
                                        <ChevronDown className="h-3 w-3 text-gray-400" />
                                      ) : (
                                        <ChevronRight className="h-3 w-3 text-gray-400" />
                                      )}
                                    </button>

                                    <span className="text-xs font-medium truncate text-gray-700">
                                      {sub.name}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      ({subEntries.length})
                                    </span>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowContextMenu({
                                        x: e.clientX,
                                        y: e.clientY,
                                        folderId: folder.id,
                                      });
                                    }}
                                    className={`${selectedSubCategoryId ? "" : "hidden"} p-1 opacity-0 group-hover:opacity-100`}
                                  >
                                    <MoreVertical className="h-3 w-3" />
                                  </button>
                                </div>

                                {/* Subcategory Entries */}
                                {isSubExpanded &&
                                  subEntries.map((entry) => (
                                    <div
                                      key={entry.id}
                                      draggable
                                      onDragStart={(e) =>
                                        handleDragStart(e, entry)
                                      }
                                      onDragEnd={handleDragEnd}
                                      className={`ml-6 pl-2 border-l-2 mt-1 p-2 rounded-lg cursor-move hover:bg-gray-50 ${selectedEntry?.id === entry.id ? "bg-purple-50 border-l-4 border-purple-500" : "border-purple-300 border-l-4"}`}
                                      onClick={() => loadEntry(entry)}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2">
                                            <Move className="h-3 w-3 text-gray-400" />
                                            <h4 className="font-medium text-[13px] truncate">
                                              {entry.title}
                                            </h4>
                                          </div>
                                        </div>
                                        <div className="flex gap-1">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleToggleFavorite(entry.id);
                                            }}
                                            className="p-1 hover:bg-yellow-100 rounded"
                                          >
                                            <Star
                                              className={`h-3 w-3 ${entry.isFavorite ? "fill-yellow-500 text-yellow-500" : "text-gray-400"}`}
                                            />
                                          </button>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              deleteEntryFile(entry.id);
                                            }}
                                            className="p-1 hover:bg-red-100 rounded"
                                          >
                                            <Trash2 className="h-3 w-3 text-red-500" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            );
                          })}

                        {/* Folder Entries (no subcategory) */}
                        {isFolderExpanded &&
                          getEntries(folder.id).map((entry) => (
                            <div
                              key={entry.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, entry)}
                              onDragEnd={handleDragEnd}
                              className={`ml-6 pl-2 border-l-2 mt-1 p-2 rounded-lg cursor-move hover:bg-gray-50 ${selectedEntry?.id === entry.id ? "bg-purple-50 border-l-4 border-purple-500" : "border-purple-300 border-l-4"}`}
                              onClick={() => loadEntry(entry)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <Move className="h-3 w-3 text-gray-400" />
                                    <h4 className="font-medium text-[13px] truncate">
                                      {entry.title}
                                    </h4>
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleFavorite(entry.id);
                                    }}
                                    className="p-1 hover:bg-yellow-100 rounded"
                                  >
                                    <Star
                                      className={`h-3 w-3 ${entry.isFavorite ? "fill-yellow-500 text-yellow-500" : "text-gray-400"}`}
                                    />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteEntry(entry.id);
                                    }}
                                    className="p-1 hover:bg-red-100 rounded"
                                  >
                                    <Trash2 className="h-3 w-3 text-red-500" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Context Menu */}
        {showContextMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowContextMenu(null)}
            />
            <div
              className="fixed bg-white rounded-lg shadow-lg border z-50"
              style={{ top: showContextMenu.y, left: showContextMenu.x }}
            >
              <button
                onClick={() => {
                  const isDeletingSubcategory =
                    selectedFolderId && selectedSubCategoryId;
                  const itemType = isDeletingSubcategory
                    ? "subcategory"
                    : "folder";
                  const confirmMessage = `Are you sure you want to delete this ${itemType}? This action cannot be undone.`;

                  if (window.confirm(confirmMessage)) {
                    if (isDeletingSubcategory) {
                      deleteSubCategory(selectedSubCategoryId);
                    } else {
                      deleteFolder(showContextMenu.folderId);
                    }
                    setShowContextMenu(null);
                  }
                }}
                className="w-full cursor-pointer px-4 py-2 text-[13px] font-medium text-red-600 hover:bg-gray-100 flex items-center gap-2"
              >
                <Trash2 className="h-3 w-3" />
                {selectedFolderId && selectedSubCategoryId
                  ? "Delete Subcategory"
                  : "Delete Folder"}
              </button>
              <button
                onClick={() => {
                  // deleteFolder(showContextMenu.folderId);
                  setShowContextMenu(null);
                }}
                className="w-full cursor-pointer px-4 py-2 font-medium text-[13px] text-red-600 hover:bg-gray-100 flex items-center gap-2"
              >
                <Pen className="h-3 w-3" /> Update Folder
              </button>
            </div>
          </>
        )}

        {/* /////////////////////////////////////////// */}
        {/* Updated Context Menu */}
        {showContextMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowContextMenu(null)}
            />
            <div
              className="fixed bg-white rounded-lg shadow-lg border py-1 z-50 min-w-[160px]"
              style={{ top: showContextMenu.y, left: showContextMenu.x }}
            >
              <button
                onClick={() => handleContextMenuAction("update")}
                className="w-full cursor-pointer px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <Pen className="h-3 w-3" />
                {contextMenuType === "subcategory"
                  ? "Update Subcategory"
                  : "Update FolderDD"}
              </button>
              <button
                onClick={() => handleContextMenuAction("delete")}
                className="w-full cursor-pointer px-4 py-2 text-[13px] font-medium text-red-600 hover:bg-gray-100 flex items-center gap-2"
              >
                <Trash2 className="h-3 w-3" />
                {contextMenuType === "subcategory"
                  ? "Delete Subcategory"
                  : "Delete Folder"}
              </button>
            </div>
          </>
        )}

        {/* Edit Subcategory Modal */}
        {showEditSubCategoryModal ||
          (editingSubCategory && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-[3px] flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96">
                <h2 className="text-xl font-bold mb-4">Update Subcategory</h2>
                <input
                  type="text"
                  placeholder="Subcategory name"
                  value={editingSubCategory?.name}
                  onChange={(e) =>
                    setEditingSubCategory({
                      ...editingSubCategory,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg mb-4"
                  autoFocus
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleUpdateSubCategory()
                  }
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleUpdateSubCategory}
                    className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setShowEditSubCategoryModal(false);
                      setEditingSubCategory(null);
                    }}
                    className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        {/* /////////////////////////////////////////////// */}

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {selectedFolderId && (
              <div className="mb-4 flex items-center gap-2 text-sm">
                <Folder className="h-4 w-4 text-yellow-500" />
                <span>Writing in:</span>
                <span className="font-semibold text-purple-600">
                  {folders.find((f) => f.id === selectedFolderId)?.name}
                  {selectedSubCategoryId &&
                    ` / ${subCategories?.find((s) => s.id === selectedSubCategoryId)?.name}`}
                </span>
              </div>
            )}

            {/* Writing Area */}
            <div>{renderContent()}</div>
          </div>
        </div>
      </div>

      {/* New Folder Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Create New Folder</h2>
            <input
              type="text"
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && createFolderDirect()}
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={newFolderDescription}
              onChange={(e) => setNewFolderDescription(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4 text-sm"
            />
            <div className="flex gap-3">
              <button
                onClick={() => createFolderDirect()}
                className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              >
                Create Folder
              </button>
              <button
                onClick={() => setShowNewFolderModal(false)}
                className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
