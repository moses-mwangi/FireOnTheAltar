"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  FileText,
  Sparkles,
  Save,
  Trash2,
  Clock,
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
  ScrollText,
  Feather,
  NotebookPen,
  Languages,
  Sun,
  Users,
  Quote,
  Target,
  Award,
  BookMarked,
  Globe,
  Microscope,
  Star,
  Moon,
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

// Folder structure
type Folder = {
  id: string;
  name: string;
  icon?: any;
  parentId: string | null;
  category: MainCategory;
  createdAt: string;
};

type WritingEntry = {
  id: string;
  title: string;
  content: string;
  folderId: string; // Which folder this belongs to
  category: MainCategory;
  date: string;
  wordCount: number;
  tags?: string[];
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

// Default folders for Bible category
// const getDefaultFolders = (
//   categoryId: MainCategory,
// ): Omit<Folder, "id" | "createdAt">[] => {
//   console.log("Getting default folders for category:", categoryId);
//   if (categoryId === "bible") {
//     return [
//       {
//         name: "Scriptures",
//         icon: ScrollText,
//         parentId: null,
//         category: "bible",
//       },
//       { name: "Prayers", icon: Heart, parentId: null, category: "bible" },
//       {
//         name: "Study Notes",
//         icon: BookOpen,
//         parentId: null,
//         category: "bible",
//       },
//       {
//         name: "Terminology",
//         icon: FileText,
//         parentId: null,
//         category: "bible",
//       },
//       {
//         name: "DevotionalsMMMM",
//         icon: Sparkles,
//         parentId: null,
//         category: "bible",
//       },
//       { name: "Sermons", icon: Feather, parentId: null, category: "bible" },
//     ];
//   }

//   if (categoryId === "english") {
//     return [
//       { name: "Essays", icon: FileText, parentId: null, category: "english" },
//       { name: "Poems", icon: Sparkles, parentId: null, category: "english" },
//       {
//         name: "Book Chapters",
//         icon: BookOpen,
//         parentId: null,
//         category: "english",
//       },
//       {
//         name: "Journal Entries",
//         icon: Feather,
//         parentId: null,
//         category: "english",
//       },
//       { name: "Vocabulary", icon: Brain, parentId: null, category: "english" },
//       {
//         name: "Grammar Notes",
//         icon: BookOpen,
//         parentId: null,
//         category: "english",
//       },
//       {
//         name: "Creative Writing",
//         icon: Sparkles,
//         parentId: null,
//         category: "english",
//       },
//     ];
//   }

//   return [];
// };

const getDefaultFolders = (
  categoryId: MainCategory,
): Omit<Folder, "id" | "createdAt">[] => {
  switch (categoryId) {
    case "bible":
      return [
        {
          name: "📖 Scriptures",
          icon: ScrollText,
          parentId: null,
          category: "bible",
          description: "Bible verses and passages",
        },
        {
          name: "🙏 Prayers",
          icon: Heart,
          parentId: null,
          category: "bible",
          description: "Personal prayers and intercessions",
        },
        {
          name: "📝 Study Notes",
          icon: NotebookPen,
          parentId: null,
          category: "bible",
          description: "Bible study insights",
        },
        {
          name: "📚 Terminology",
          icon: Languages,
          parentId: null,
          category: "bible",
          description: "Biblical terms and meanings",
        },
        {
          name: "☀️ Devotionals",
          icon: Sun,
          parentId: null,
          category: "bible",
          description: "Daily devotions",
        },
        {
          name: "🎯 Sermons",
          icon: Users,
          parentId: null,
          category: "bible",
          description: "Church messages",
        },
      ];

    case "philosophy":
      return [
        {
          name: "🏛️ Stoicism",
          icon: Quote,
          parentId: null,
          category: "philosophy",
          description: "Stoic wisdom",
        },
        {
          name: "🌍 Existentialism",
          icon: Brain,
          parentId: null,
          category: "philosophy",
          description: "Existentialist thought",
        },
        {
          name: "🧘 Eastern Philosophy",
          icon: Sun,
          parentId: null,
          category: "philosophy",
          description: "Buddhism, Taoism",
        },
        {
          name: "⚖️ Ethics",
          icon: Target,
          parentId: null,
          category: "philosophy",
          description: "Moral philosophy",
        },
        {
          name: "🔍 Logic",
          icon: Brain,
          parentId: null,
          category: "philosophy",
          description: "Critical thinking",
        },
      ];

    case "psychology":
      return [
        {
          name: "🧠 Cognitive",
          icon: Brain,
          parentId: null,
          category: "psychology",
          description: "Mental processes",
        },
        {
          name: "🎯 Behavioral",
          icon: Target,
          parentId: null,
          category: "psychology",
          description: "Behavior patterns",
        },
        {
          name: "💖 Emotional Intelligence",
          icon: Heart,
          parentId: null,
          category: "psychology",
          description: "EQ development",
        },
        {
          name: "👤 Personality",
          icon: Users,
          parentId: null,
          category: "psychology",
          description: "MBTI, Enneagram",
        },
        {
          name: "🛋️ Therapy",
          icon: Heart,
          parentId: null,
          category: "psychology",
          description: "CBT, DBT",
        },
      ];

    case "wisdom":
      return [
        {
          name: "📜 Proverbs",
          icon: Quote,
          parentId: null,
          category: "wisdom",
          description: "Ancient wisdom",
        },
        {
          name: "👥 Biographies",
          icon: Users,
          parentId: null,
          category: "wisdom",
          description: "Great lives",
        },
        {
          name: "🏆 Leadership",
          icon: Award,
          parentId: null,
          category: "wisdom",
          description: "Leading principles",
        },
        {
          name: "🎯 Success",
          icon: Target,
          parentId: null,
          category: "wisdom",
          description: "Achievement wisdom",
        },
        {
          name: "🔄 Habits",
          icon: BookMarked,
          parentId: null,
          category: "wisdom",
          description: "Daily practices",
        },
      ];

    case "science":
      return [
        {
          name: "⚛️ Physics",
          icon: Globe,
          parentId: null,
          category: "science",
          description: "Physical laws",
        },
        {
          name: "🧬 Biology",
          icon: Microscope,
          parentId: null,
          category: "science",
          description: "Life sciences",
        },
        {
          name: "🌌 Astronomy",
          icon: Star,
          parentId: null,
          category: "science",
          description: "Cosmos",
        },
        {
          name: "📜 History",
          icon: History,
          parentId: null,
          category: "science",
          description: "Historical events",
        },
        {
          name: "💡 Technology",
          icon: Lightbulb,
          parentId: null,
          category: "science",
          description: "Innovations",
        },
      ];

    case "spirituality":
      return [
        {
          name: "✝️ Christianity",
          icon: Bible,
          parentId: null,
          category: "spirituality",
          description: "Christian faith",
        },
        {
          name: "🧘 Mindfulness",
          icon: Moon,
          parentId: null,
          category: "spirituality",
          description: "Present awareness",
        },
        {
          name: "💝 Gratitude",
          icon: Heart,
          parentId: null,
          category: "spirituality",
          description: "Thankfulness",
        },
        {
          name: "🎯 Purpose",
          icon: Target,
          parentId: null,
          category: "spirituality",
          description: "Finding meaning",
        },
        {
          name: "✨ Mysticism",
          icon: Sparkles,
          parentId: null,
          category: "spirituality",
          description: "Mystical experiences",
        },
      ];

    case "english":
      return [
        {
          name: "✍️ EssaysGFFF",
          icon: FileText,
          parentId: null,
          category: "english",
          description: "Argumentative, descriptive, narrative",
        },
        {
          name: "🪄 Poems",
          icon: Sparkles,
          parentId: null,
          category: "english",
          description: "Sonnets, haiku, free verse",
        },
        {
          name: "📖 Book Chapters",
          icon: BookOpen,
          parentId: null,
          category: "english",
          description: "Novel and book writing",
        },
        {
          name: "📓 Journal",
          icon: Feather,
          parentId: null,
          category: "english",
          description: "Daily reflections",
        },
        {
          name: "📚 Vocabulary",
          icon: Brain,
          parentId: null,
          category: "english",
          description: "Word collection",
        },
        {
          name: "📝 Grammar",
          icon: BookOpen,
          parentId: null,
          category: "english",
          description: "Grammar rules",
        },
        {
          name: "🎨 Creative Writing",
          icon: Sparkles,
          parentId: null,
          category: "english",
          description: "Short stories",
        },
        {
          name: "💡 Writing Prompts",
          icon: Lightbulb,
          parentId: null,
          category: "english",
          description: "Inspiration",
        },
      ];

    default:
      return [];
  }
};

export default function WritingPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<MainCategory>("bible");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [entries, setEntries] = useState<WritingEntry[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<WritingEntry | null>(null);

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
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [showContextMenu, setShowContextMenu] = useState<{
    x: number;
    y: number;
    folderId: string;
  } | null>(null);

  // Load data
  useEffect(() => {
    const savedFolders = localStorage.getItem("wisdom-folders");
    const savedEntries = localStorage.getItem("wisdom-entries");

    // if (savedFolders) {
    //   setFolders(JSON.parse(savedFolders));
    // } else {
    // Initialize with default folders for Bible
    const defaultFolders = getDefaultFolders("bible").map((f, idx) => ({
      ...f,
      id: `folder-${Date.now()}-${idx}`,
      createdAt: new Date().toISOString(),
    }));

    const defaultFoldersWriting = getDefaultFolders("english").map(
      (f, idx) => ({
        ...f,
        id: `folder-${Date.now()}-${idx}`,
        createdAt: new Date().toISOString(),
      }),
    );

    const defaultFoldersPhilosophy = getDefaultFolders("philosophy").map(
      (f, idx) => ({
        ...f,
        id: `folder-${Date.now()}-${idx}`,
        createdAt: new Date().toISOString(),
      }),
    );

    const defaultFoldersPsychology = getDefaultFolders("psychology").map(
      (f, idx) => ({
        ...f,
        id: `folder-${Date.now()}-${idx}`,
        createdAt: new Date().toISOString(),
      }),
    );

    const defaultFoldersSpirituality = getDefaultFolders("spirituality").map(
      (f, idx) => ({
        ...f,
        id: `folder-${Date.now()}-${idx}`,
        createdAt: new Date().toISOString(),
      }),
    );

    const defaultFoldersWisdom = getDefaultFolders("wisdom").map((f, idx) => ({
      ...f,
      id: `folder-${Date.now()}-${idx}`,
      createdAt: new Date().toISOString(),
    }));

    const defaultFoldersScience = getDefaultFolders("science").map(
      (f, idx) => ({
        ...f,
        id: `folder-${Date.now()}-${idx}`,
        createdAt: new Date().toISOString(),
      }),
    );

    setFolders([
      ...defaultFolders,
      ...defaultFoldersWriting,
      ...defaultFoldersPhilosophy,
      ...defaultFoldersPsychology,
      ...defaultFoldersSpirituality,
      ...defaultFoldersWisdom,
      ...defaultFoldersScience,
    ]);
    localStorage.setItem(
      "wisdom-folders",
      JSON.stringify([
        ...defaultFolders,
        ...defaultFoldersWriting,
        ...defaultFoldersPhilosophy,
        ...defaultFoldersPsychology,
        ...defaultFoldersSpirituality,
        ...defaultFoldersWisdom,
        ...defaultFoldersScience,
      ]),
    );
    // }

    // if (savedEntries) {
    //   setEntries(JSON.parse(savedEntries));
    // }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (folders.length > 0) {
      localStorage.setItem("wisdom-folders", JSON.stringify(folders));
    }
  }, [folders]);

  useEffect(() => {
    localStorage.setItem("wisdom-entries", JSON.stringify(entries));
  }, [entries]);

  // Calculate word count
  useEffect(() => {
    const words = content
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    setWordCount(words.length);
  }, [content]);

  // Get current category folders
  const currentCategoryFolders = folders.filter(
    (f) => f.category === selectedCategory,
  );

  // Get entries for a specific folder
  const getFolderEntries = (folderId: string) => {
    return entries.filter((e) => e.folderId === folderId);
  };

  // Create new folder
  const createFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name: newFolderName.trim(),
      icon: Folder,
      parentId: null,
      category: selectedCategory,
      createdAt: new Date().toISOString(),
    };

    setFolders([...folders, newFolder]);
    setExpandedFolders(new Set([...expandedFolders, newFolder.id]));
    setNewFolderName("");
    setShowNewFolderModal(false);
  };

  // Delete folder and all its entries
  const deleteFolder = (folderId: string) => {
    if (
      confirm(
        "Delete this folder and all entries inside? This cannot be undone.",
      )
    ) {
      setFolders(folders.filter((f) => f.id !== folderId));
      setEntries(entries.filter((e) => e.folderId !== folderId));
      if (selectedFolderId === folderId) {
        setSelectedFolderId(null);
        setSelectedEntry(null);
      }
    }
    setShowContextMenu(null);
  };

  // Save writing entry
  const saveEntry = () => {
    if (!title.trim() || !content.trim() || !selectedFolderId) return;

    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    const newEntry: WritingEntry = {
      id: selectedEntry?.id || `entry-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      folderId: selectedFolderId,
      category: selectedCategory,
      date: new Date().toISOString(),
      wordCount,
      tags: tagList,
    };

    if (selectedEntry) {
      setEntries(
        entries.map((e) => (e.id === selectedEntry.id ? newEntry : e)),
      );
    } else {
      setEntries([newEntry, ...entries]);
    }

    // Reset form
    setTitle("");
    setContent("");
    setTags("");
    setSelectedEntry(null);
  };

  // Load entry for editing
  const loadEntry = (entry: WritingEntry) => {
    setSelectedEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setSelectedFolderId(entry.folderId);
    setTags(entry.tags?.join(", ") || "");
  };

  // Delete entry
  const deleteEntry = (entryId: string) => {
    if (confirm("Delete this entry?")) {
      setEntries(entries.filter((e) => e.id !== entryId));
      if (selectedEntry?.id === entryId) {
        setSelectedEntry(null);
        setTitle("");
        setContent("");
        setTags("");
      }
    }
  };

  // New writing
  const newWriting = () => {
    setSelectedEntry(null);
    setTitle("");
    setContent("");
    setTags("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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

  const currentCategoryData = categories.find((c) => c.id === selectedCategory);
  const CategoryIcon = currentCategoryData?.icon || BookOpen;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Wisdom Library
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowNewFolderModal(true)}
                className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Folder className="h-4 w-4" />
                New Folder
              </Button>
              <Button
                onClick={newWriting}
                disabled={!selectedFolderId}
                className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                New Entry
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar with Folder Tree */}
        {sidebarOpen && (
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-73px)] overflow-y-auto">
            <div className="p-4">
              {/* Category Selector */}
              <div className="mb-6">
                <Label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2 block">
                  Select Category
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value as MainCategory);
                    setSelectedFolderId(null);
                    setSelectedEntry(null);
                    newWriting();
                  }}
                >
                  <SelectTrigger className="w-full cursor-pointer p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                    {/* <SelectTrigger className="w-full "> */}
                    <SelectValue placeholder="Holy Bible" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="w-full"
                    sideOffset={4}
                  >
                    <SelectGroup>
                      {categories.map((cat) => (
                        <SelectItem
                          className="cursor-pointer data-[state=checked]:bg-blue-500
          data-[state=checked]:text-white"
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
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    FOLDERS
                  </h2>
                  <span className="text-xs text-gray-400">
                    {currentCategoryFolders.length}
                  </span>
                </div>

                {currentCategoryFolders.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-8">
                    No folders yet. Create one!
                  </p>
                ) : (
                  <div className="space-y-1">
                    {currentCategoryFolders.map((folder) => {
                      const folderEntries = getFolderEntries(folder.id);
                      const isExpanded = expandedFolders.has(folder.id);
                      const FolderIcon = folder.icon || Folder;

                      return (
                        <div key={folder.id}>
                          <div
                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                              selectedFolderId === folder.id
                                ? "bg-purple-50 dark:bg-purple-900/20"
                                : ""
                            }`}
                          >
                            <div
                              className="flex items-center gap-2 flex-1"
                              onClick={() => {
                                setSelectedFolderId(folder.id);
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
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-gray-400" />
                                )}
                              </button>
                              {isExpanded ? (
                                <>
                                  <FolderOpen className="h-4 w-4 text-yellow-500" />
                                </>
                              ) : (
                                <>
                                  {/* // <FolderIcon className="h-4 w-4 text-yellow-500" /> */}
                                  <Folder className="h-4 w-4 text-yellow-500" />{" "}
                                </>
                              )}
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {folder.name}
                              </span>
                              <span className="text-xs text-gray-400">
                                ({folderEntries.length})
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
                              className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                            >
                              <MoreVertical className="h-3 w-3 text-gray-500" />
                            </button>
                          </div>

                          {/* Entries inside folder */}
                          {isExpanded && folderEntries.length > 0 && (
                            <div className="ml-6 pl-2 border-l-2 border-gray-200 dark:border-gray-700 space-y-1 mt-1">
                              {folderEntries.map((entry) => (
                                <div
                                  key={entry.id}
                                  className={`p-2 rounded-lg cursor-pointer transition-all ${
                                    selectedEntry?.id === entry.id
                                      ? "bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500"
                                      : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                  }`}
                                  onClick={() => loadEntry(entry)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <FileText className="h-3 w-3 text-gray-400 flex-shrink-0" />
                                        <h4 className="font-medium text-sm text-gray-800 dark:text-white truncate">
                                          {entry.title}
                                        </h4>
                                      </div>
                                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{formatDate(entry.date)}</span>
                                        <span>•</span>
                                        <span>{entry.wordCount} words</span>
                                      </div>
                                      {entry.tags && entry.tags.length > 0 && (
                                        <div className="flex gap-1 mt-1">
                                          {entry.tags.slice(0, 2).map((tag) => (
                                            <span
                                              key={tag}
                                              className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded"
                                            >
                                              {tag}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteEntry(entry.id);
                                      }}
                                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                                    >
                                      <Trash2 className="h-3 w-3 text-red-500" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Context Menu */}
        {showContextMenu && (
          <div
            className="fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
            style={{ top: showContextMenu.y, left: showContextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                deleteFolder(showContextMenu.folderId);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Folder
            </button>
          </div>
        )}

        {/* Click outside to close context menu */}
        {showContextMenu && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowContextMenu(null)}
          />
        )}

        {/* Main Content - Writing Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Current Location Indicator */}
            {selectedFolderId && (
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Folder className="h-4 w-4 text-yellow-500" />
                <span>Writing in:</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  {folders.find((f) => f.id === selectedFolderId)?.name}
                </span>
              </div>
            )}

            {/* Writing Area */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  placeholder="Enter title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-2xl font-bold text-gray-800 dark:text-white placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
                />
              </div>

              <div className="p-6">
                <textarea
                  placeholder="Write your content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[500px] text-gray-800 dark:text-white placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0 resize-none leading-relaxed"
                />
              </div>

              {/* Tags Input */}
              <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  placeholder="Add tags (comma separated) e.g., wisdom, inspiration"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full text-sm text-gray-600 dark:text-gray-400 placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
                />
              </div>

              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{wordCount} words</span>
                  <span>•</span>
                  <span>{content.length} characters</span>
                </div>
                <Button
                  onClick={saveEntry}
                  disabled={
                    !title.trim() || !content.trim() || !selectedFolderId
                  }
                  className="flex cursor-pointer items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <Save className="h-4 w-4" />
                  {selectedEntry ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Folder Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Create New Folder
            </h2>
            <input
              type="text"
              placeholder="Folder name (e.g., Scriptures, Prayers)"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              autoFocus
              onKeyPress={(e) => e.key === "Enter" && createFolder()}
            />
            <div className="flex gap-3">
              <button
                onClick={createFolder}
                className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              >
                Create
              </button>
              <button
                onClick={() => setShowNewFolderModal(false)}
                className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
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
