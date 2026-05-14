"use client";

import { useState, useEffect } from "react";
import {
  Feather,
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
  Brain,
} from "lucide-react";

type WritingMode =
  | "bible-notes"
  | "essay"
  | "poem"
  | "book"
  | "journal"
  | "vocabulary";

type WritingEntry = {
  id: string;
  title: string;
  content: string;
  mode: WritingMode;
  date: string;
  wordCount: number;
};

const modes: { id: WritingMode; label: string; icon: any; color: string }[] = [
  {
    id: "bible-notes",
    label: "Bible Notes",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    // color: "text-blue-500",
  },
  {
    id: "essay",
    label: "Essay",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    // color: "text-blue-500",
  },
  {
    id: "poem",
    label: "Poem",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "book",
    label: "Book Chapter",
    icon: BookOpen,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "journal",
    label: "Journal",
    icon: Feather,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "vocabulary",
    label: "Vocabulary",
    icon: Brain,
    color: "from-indigo-500 to-purple-500",
  },
];

export default function WritingPage() {
  const [mode, setMode] = useState<WritingMode>("essay");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writings, setWritings] = useState<WritingEntry[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<WritingEntry | null>(null);
  const [wordCount, setWordCount] = useState(0);

  // Track which mode sections are expanded in sidebar
  const [expandedModes, setExpandedModes] = useState<
    Record<WritingMode, boolean>
  >({
    // essay: true,
    // poem: true,
    // book: true,
    // journal: true,
    // vocabulary: true,
    "bible-notes": false,
    essay: false,
    poem: false,
    book: false,
    journal: false,
    vocabulary: false,
  });

  // Load writings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("writings");
    if (saved) {
      setWritings(JSON.parse(saved));
    }
  }, []);

  // Calculate word count
  useEffect(() => {
    const words = content
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    setWordCount(words.length);
  }, [content]);

  const saveWriting = () => {
    if (!title.trim() || !content.trim()) return;

    const newEntry: WritingEntry = {
      id: selectedEntry?.id || Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      mode,
      date: new Date().toISOString(),
      wordCount,
    };

    let updatedWritings;
    if (selectedEntry) {
      updatedWritings = writings.map((w) =>
        w.id === selectedEntry.id ? newEntry : w,
      );
    } else {
      updatedWritings = [newEntry, ...writings];
    }

    setWritings(updatedWritings);
    localStorage.setItem("writings", JSON.stringify(updatedWritings));
    setSelectedEntry(newEntry);
    setTitle("");
    setContent("");
  };

  const loadEntry = (entry: WritingEntry) => {
    setSelectedEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setMode(entry.mode);
  };

  const newWriting = () => {
    setSelectedEntry(null);
    setTitle("");
    setContent("");
  };

  const deleteEntry = (id: string) => {
    const updated = writings.filter((w) => w.id !== id);
    setWritings(updated);
    localStorage.setItem("writings", JSON.stringify(updated));
    if (selectedEntry?.id === id) {
      newWriting();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const toggleMode = (modeId: WritingMode) => {
    setExpandedModes((prev) => ({
      ...prev,
      [modeId]: !prev[modeId],
    }));
  };

  // Group writings by mode
  const writingsByMode = modes.reduce(
    (acc, modeItem) => {
      acc[modeItem.id] = writings.filter((w) => w.mode === modeItem.id);
      return acc;
    },
    {} as Record<WritingMode, WritingEntry[]>,
  );

  const currentMode = modes.find((m) => m.id === mode);
  const ModeIcon = currentMode?.icon || Feather;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"> */}
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
                  className={`p-2 rounded-lg bg-gradient-to-r ${currentMode?.color}`}
                >
                  <ModeIcon className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Writing Practice
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <BookOpen className="h-4 w-4" />
                <span>{wordCount} words</span>
              </div>
              <button
                onClick={newWriting}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                New {currentMode?.label.slice(0, -1)}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar with Grouped Mode Sections */}
        {sidebarOpen && (
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-73px)] overflow-y-auto">
            <div className="p-4">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                YOUR LIBRARY
              </h2>

              {writings.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
                  No writings yet. Start writing!
                </p>
              ) : (
                <div className="space-y-4">
                  {modes.map((modeItem) => {
                    const Icon = modeItem.icon;
                    const modeWritings = writingsByMode[modeItem.id];

                    if (modeWritings.length === 0) return null;

                    return (
                      <div
                        key={modeItem.id}
                        className="space-y-1 cursor-pointer"
                      >
                        {/* Mode Header - Click to expand/collapse */}
                        <button
                          onClick={() => toggleMode(modeItem.id)}
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`p-1.5 rounded bg-gradient-to-r ${modeItem.color}`}
                            >
                              <Icon className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                              {modeItem.label}
                            </span>
                            <span className="text-xs text-gray-400">
                              ({modeWritings.length})
                            </span>
                          </div>
                          {expandedModes[modeItem.id] ? (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                        {/* Mode Writings - Show when expanded */}
                        {expandedModes[modeItem.id] && (
                          <div className="ml-4 space-y-1 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                            {modeWritings.map((entry) => {
                              const EntryIcon = modeItem.icon;
                              return (
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
                                        <EntryIcon className="h-3 w-3 text-gray-400 flex-shrink-0" />
                                        <h3 className="font-medium text-sm text-gray-800 dark:text-white truncate">
                                          {entry.title}
                                        </h3>
                                      </div>
                                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{formatDate(entry.date)}</span>
                                        <span>•</span>
                                        <span>{entry.wordCount} words</span>
                                      </div>
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteEntry(entry.id);
                                      }}
                                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                      <Trash2 className="h-3 w-3 text-red-500" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content - Same as before */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Mode Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {modes.map((m) => {
                const Icon = m.icon;
                const count = writingsByMode[m.id].length;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMode(m.id);
                      newWriting();
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                      mode === m.id
                        ? `bg-gradient-to-r ${m.color} text-white shadow-lg`
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium text-[15px]">{m.label}</span>
                    {count > 0 && (
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full ${
                          mode === m.id
                            ? "bg-white/20"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Writing Area */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  placeholder={`Enter your ${currentMode?.label.slice(0).toLowerCase()} title...`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-2xl font-bold text-gray-800 dark:text-white placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
                />
              </div>

              <div className="p-6">
                <textarea
                  placeholder={`Start writing your ${currentMode?.label.slice(0, -1).toLowerCase()}...`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[500px] text-gray-800 dark:text-white placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0 resize-none leading-relaxed"
                />
              </div>

              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{wordCount} words</span>
                  <span>•</span>
                  <span>{content.length} characters</span>
                </div>
                <button
                  onClick={saveWriting}
                  disabled={!title.trim() || !content.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Save {currentMode?.label.slice(0, -1)}
                </button>
              </div>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Writing Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  • Write every day to build consistency and improve your
                  vocabulary
                </li>
                <li>• Try using new words you've learned in your writing</li>
                <li>• Read your writing aloud to check flow and clarity</li>
                <li>
                  • Don't worry about perfection - focus on expression first
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import {
//   Feather,
//   BookOpen,
//   FileText,
//   Sparkles,
//   Save,
//   Trash2,
//   Clock,
//   Plus,
//   Menu,
//   X,
//   ChevronRight,
//   ChevronDown,
//   // Bible,
//   Heart,
//   Brain,
//   Lightbulb,
//   ScrollText,
//   Microscope,
//   Moon,
//   Sun,
//   Quote,
//   Target,
//   Award,
//   Star,
//   BookMarked,
//   NotebookPen,
//   Languages,
//   Users,
//   History,
//   Globe,
//   BadgeRussianRuble,
// } from "lucide-react";

// // Expanded categories with subcategories
// type MainCategory =
//   | "bible"
//   | "philosophy"
//   | "psychology"
//   | "wisdom"
//   | "science"
//   | "spirituality";

// type SubCategory = {
//   id: string;
//   label: string;
//   icon: any;
//   description: string;
// };

// type WritingMode = MainCategory;
// type WritingEntry = {
//   id: string;
//   title: string;
//   content: string;
//   mode: MainCategory;
//   subCategory: string;
//   date: string;
//   wordCount: number;
//   tags?: string[];
//   references?: string[];
// };

// // Main categories configuration
// const categories: {
//   id: MainCategory;
//   label: string;
//   icon: any;
//   color: string;
//   subCategories: SubCategory[];
// }[] = [
//   {
//     id: "bible",
//     label: "Holy Bible",
//     icon: BadgeRussianRuble,
//     color: "from-blue-600 to-indigo-600",
//     subCategories: [
//       {
//         id: "scriptures",
//         label: "Scriptures",
//         icon: ScrollText,
//         description: "Bible verses & passages",
//       },
//       {
//         id: "prayers",
//         label: "Prayers",
//         icon: Heart,
//         description: "Personal prayers & intercessions",
//       },
//       {
//         id: "bible-notes",
//         label: "Study Notes",
//         icon: NotebookPen,
//         description: "Bible study insights",
//       },
//       {
//         id: "terminology",
//         label: "Terminology",
//         icon: Languages,
//         description: "Biblical terms & meanings",
//       },
//       {
//         id: "devotionals",
//         label: "Devotionals",
//         icon: Sun,
//         description: "Daily devotions & reflections",
//       },
//       {
//         id: "sermons",
//         label: "Sermon Notes",
//         icon: Users,
//         description: "Church messages & teachings",
//       },
//     ],
//   },
//   {
//     id: "philosophy",
//     label: "Philosophy",
//     icon: Brain,
//     color: "from-amber-600 to-orange-600",
//     subCategories: [
//       {
//         id: "stoicism",
//         label: "Stoicism",
//         icon: Quote,
//         description: "Stoic wisdom & practices",
//       },
//       {
//         id: "existentialism",
//         label: "Existentialism",
//         icon: Lightbulb,
//         description: "Existentialist thoughts",
//       },
//       {
//         id: "eastern-phil",
//         label: "Eastern Philosophy",
//         icon: Sun,
//         description: "Buddhism, Taoism, etc",
//       },
//       {
//         id: "ethics",
//         label: "Ethics & Morality",
//         icon: Target,
//         description: "Moral philosophy",
//       },
//       {
//         id: "logic",
//         label: "Logic & Reasoning",
//         icon: Brain,
//         description: "Critical thinking",
//       },
//       {
//         id: "political-phil",
//         label: "Political Philosophy",
//         icon: Users,
//         description: "Governance & society",
//       },
//     ],
//   },
//   {
//     id: "psychology",
//     label: "Psychology",
//     icon: Brain,
//     color: "from-teal-600 to-cyan-600",
//     subCategories: [
//       {
//         id: "cognitive",
//         label: "Cognitive Psychology",
//         icon: Brain,
//         description: "Mental processes",
//       },
//       {
//         id: "behavioral",
//         label: "Behavioral Psychology",
//         icon: Target,
//         description: "Behavior patterns",
//       },
//       {
//         id: "emotional",
//         label: "Emotional Intelligence",
//         icon: Heart,
//         description: "EQ development",
//       },
//       {
//         id: "personality",
//         label: "Personality Types",
//         icon: Users,
//         description: "MBTI, Enneagram, etc",
//       },
//       {
//         id: "therapy",
//         label: "Therapy Techniques",
//         icon: Heart,
//         description: "CBT, DBT, etc",
//       },
//       {
//         id: "neuroscience",
//         label: "Neuroscience",
//         icon: Microscope,
//         description: "Brain science",
//       },
//     ],
//   },
//   {
//     id: "wisdom",
//     label: "Wisdom Literature",
//     icon: Star,
//     color: "from-yellow-600 to-amber-600",
//     subCategories: [
//       {
//         id: "proverbs",
//         label: "Proverbs & Sayings",
//         icon: Quote,
//         description: "Ancient wisdom",
//       },
//       {
//         id: "biographies",
//         label: "Biographies",
//         icon: Users,
//         description: "Great minds' lives",
//       },
//       {
//         id: "leadership",
//         label: "Leadership",
//         icon: Award,
//         description: "Leading principles",
//       },
//       {
//         id: "success",
//         label: "Success Principles",
//         icon: Target,
//         description: "Achievement wisdom",
//       },
//       {
//         id: "habits",
//         label: "Habits & Discipline",
//         icon: BookMarked,
//         description: "Daily practices",
//       },
//       {
//         id: "meditation",
//         label: "Meditations",
//         icon: Moon,
//         description: "Reflective thoughts",
//       },
//     ],
//   },
//   {
//     id: "science",
//     label: "Science & Knowledge",
//     icon: Microscope,
//     color: "from-green-600 to-emerald-600",
//     subCategories: [
//       {
//         id: "physics",
//         label: "Physics",
//         icon: Globe,
//         description: "Physical laws",
//       },
//       {
//         id: "biology",
//         label: "Biology",
//         icon: Microscope,
//         description: "Life sciences",
//       },
//       {
//         id: "astronomy",
//         label: "Astronomy",
//         icon: Star,
//         description: "Cosmos studies",
//       },
//       {
//         id: "history",
//         label: "History",
//         icon: History,
//         description: "Historical events",
//       },
//       {
//         id: "technology",
//         label: "Technology",
//         icon: Lightbulb,
//         description: "Innovations",
//       },
//       {
//         id: "mathematics",
//         label: "Mathematics",
//         icon: Brain,
//         description: "Mathematical wisdom",
//       },
//     ],
//   },
//   {
//     id: "spirituality",
//     label: "Spirituality",
//     icon: Sun,
//     color: "from-purple-600 to-pink-600",
//     subCategories: [
//       {
//         id: "christianity",
//         label: "Christianity",
//         icon: BookOpen,
//         description: "Christian faith",
//       },
//       {
//         id: "mindfulness",
//         label: "Mindfulness",
//         icon: Moon,
//         description: "Present awareness",
//       },
//       {
//         id: "gratitude",
//         label: "Gratitude",
//         icon: Heart,
//         description: "Thankfulness practice",
//       },
//       {
//         id: "purpose",
//         label: "Life Purpose",
//         icon: Target,
//         description: "Finding meaning",
//       },
//       {
//         id: "faith",
//         label: "Faith & Belief",
//         icon: Star,
//         description: "Spiritual beliefs",
//       },
//       {
//         id: "mysticism",
//         label: "Mysticism",
//         icon: Sparkles,
//         description: "Mystical experiences",
//       },
//     ],
//   },
// ];

// export default function WritingPage() {
//   const [selectedCategory, setSelectedCategory] =
//     useState<MainCategory>("bible");
//   const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [writings, setWritings] = useState<WritingEntry[]>([]);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [selectedEntry, setSelectedEntry] = useState<WritingEntry | null>(null);
//   const [wordCount, setWordCount] = useState(0);
//   const [tags, setTags] = useState<string>("");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Track expanded sections in sidebar
//   const [expandedCategories, setExpandedCategories] = useState<
//     Record<MainCategory, boolean>
//   >({
//     bible: true,
//     philosophy: true,
//     psychology: true,
//     wisdom: true,
//     science: true,
//     spirituality: true,
//   });

//   // Load writings from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("wisdom-writings");
//     if (saved) {
//       setWritings(JSON.parse(saved));
//     }
//   }, []);

//   // Calculate word count
//   useEffect(() => {
//     const words = content
//       .trim()
//       .split(/\s+/)
//       .filter((w) => w.length > 0);
//     setWordCount(words.length);
//   }, [content]);

//   // Auto-select first subcategory when category changes
//   useEffect(() => {
//     const category = categories.find((c) => c.id === selectedCategory);
//     if (category && category.subCategories.length > 0 && !selectedSubCategory) {
//       setSelectedSubCategory(category.subCategories[0].id);
//     }
//   }, [selectedCategory]);

//   const saveWriting = () => {
//     if (!title.trim() || !content.trim() || !selectedSubCategory) return;

//     const tagList = tags
//       .split(",")
//       .map((t) => t.trim())
//       .filter((t) => t);

//     const newEntry: WritingEntry = {
//       id: selectedEntry?.id || Date.now().toString(),
//       title: title.trim(),
//       content: content.trim(),
//       mode: selectedCategory,
//       subCategory: selectedSubCategory,
//       date: new Date().toISOString(),
//       wordCount,
//       tags: tagList,
//       references: [],
//     };

//     let updatedWritings;
//     if (selectedEntry) {
//       updatedWritings = writings.map((w) =>
//         w.id === selectedEntry.id ? newEntry : w,
//       );
//     } else {
//       updatedWritings = [newEntry, ...writings];
//     }

//     setWritings(updatedWritings);
//     localStorage.setItem("wisdom-writings", JSON.stringify(updatedWritings));
//     setSelectedEntry(newEntry);
//     resetForm();
//   };

//   const resetForm = () => {
//     setTitle("");
//     setContent("");
//     setTags("");
//   };

//   const loadEntry = (entry: WritingEntry) => {
//     setSelectedEntry(entry);
//     setTitle(entry.title);
//     setContent(entry.content);
//     setSelectedCategory(entry.mode);
//     setSelectedSubCategory(entry.subCategory);
//     setTags(entry.tags?.join(", ") || "");
//   };

//   const newWriting = () => {
//     setSelectedEntry(null);
//     resetForm();
//   };

//   const deleteEntry = (id: string) => {
//     const updated = writings.filter((w) => w.id !== id);
//     setWritings(updated);
//     localStorage.setItem("wisdom-writings", JSON.stringify(updated));
//     if (selectedEntry?.id === id) {
//       newWriting();
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const toggleCategory = (categoryId: MainCategory) => {
//     setExpandedCategories((prev) => ({
//       ...prev,
//       [categoryId]: !prev[categoryId],
//     }));
//   };

//   // Get current category and subcategory info
//   const currentCategory = categories.find((c) => c.id === selectedCategory);
//   const currentSubCategory = currentCategory?.subCategories.find(
//     (s) => s.id === selectedSubCategory,
//   );
//   const CategoryIcon = currentCategory?.icon || BookOpen;

//   // Filter writings by search term
//   const filteredWritings = writings.filter(
//     (w) =>
//       searchTerm === "" ||
//       w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       w.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       w.tags?.some((tag) =>
//         tag.toLowerCase().includes(searchTerm.toLowerCase()),
//       ),
//   );

//   // Group writings by category and subcategory for sidebar
//   const writingsByCategory = categories.reduce(
//     (acc, category) => {
//       acc[category.id] = category.subCategories.map((subCat) => ({
//         ...subCat,
//         entries: filteredWritings.filter(
//           (w) => w.mode === category.id && w.subCategory === subCat.id,
//         ),
//       }));
//       return acc;
//     },
//     {} as Record<MainCategory, (SubCategory & { entries: WritingEntry[] })[]>,
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
//       {/* Header */}
//       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//               >
//                 {sidebarOpen ? (
//                   <X className="h-5 w-5" />
//                 ) : (
//                   <Menu className="h-5 w-5" />
//                 )}
//               </button>
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`p-2 rounded-lg bg-gradient-to-r ${currentCategory?.color}`}
//                 >
//                   <CategoryIcon className="h-5 w-5 text-white" />
//                 </div>
//                 <h1 className="text-xl font-bold text-gray-800 dark:text-white">
//                   Wisdom Library
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search writings..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
//                 />
//                 <svg
//                   className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>
//               <button
//                 onClick={newWriting}
//                 className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
//               >
//                 <Plus className="h-4 w-4" />
//                 New Entry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex">
//         {/* Sidebar with Nested Categories */}
//         {sidebarOpen && (
//           <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-73px)] overflow-y-auto">
//             <div className="p-4">
//               <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
//                 KNOWLEDGE BASE
//               </h2>

//               {categories.map((category) => {
//                 const Icon = category.icon;
//                 const subCategoriesWithEntries =
//                   writingsByCategory[category.id];
//                 const totalEntries = subCategoriesWithEntries.reduce(
//                   (sum, sub) => sum + sub.entries.length,
//                   0,
//                 );

//                 if (totalEntries === 0 && !expandedCategories[category.id])
//                   return null;

//                 return (
//                   <div key={category.id} className="mb-3">
//                     {/* Category Header */}
//                     <button
//                       onClick={() => toggleCategory(category.id)}
//                       className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
//                     >
//                       <div className="flex items-center gap-2">
//                         <div
//                           className={`p-1.5 rounded bg-gradient-to-r ${category.color}`}
//                         >
//                           <Icon className="h-3.5 w-3.5 text-white" />
//                         </div>
//                         <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
//                           {category.label}
//                         </span>
//                         <span className="text-xs text-gray-400">
//                           ({totalEntries})
//                         </span>
//                       </div>
//                       {expandedCategories[category.id] ? (
//                         <ChevronDown className="h-4 w-4 text-gray-400" />
//                       ) : (
//                         <ChevronRight className="h-4 w-4 text-gray-400" />
//                       )}
//                     </button>

//                     {/* Subcategories */}
//                     {expandedCategories[category.id] && (
//                       <div className="ml-4 pl-2 border-l-2 border-gray-200 dark:border-gray-700 space-y-1 mt-1">
//                         {category.subCategories.map((subCat) => {
//                           const SubIcon = subCat.icon;
//                           const entries =
//                             writingsByCategory[category.id].find(
//                               (s) => s.id === subCat.id,
//                             )?.entries || [];

//                           if (entries.length === 0) return null;

//                           return (
//                             <div key={subCat.id} className="space-y-0.5">
//                               <div className="flex items-center gap-2 px-2 py-1.5 rounded">
//                                 <SubIcon className="h-3 w-3 text-gray-400" />
//                                 <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
//                                   {subCat.label}
//                                 </span>
//                                 <span className="text-xs text-gray-400">
//                                   ({entries.length})
//                                 </span>
//                               </div>
//                               <div className="ml-4 space-y-0.5">
//                                 {entries.map((entry) => (
//                                   <div
//                                     key={entry.id}
//                                     className={`p-2 rounded-lg cursor-pointer transition-all ${
//                                       selectedEntry?.id === entry.id
//                                         ? "bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500"
//                                         : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
//                                     }`}
//                                     onClick={() => loadEntry(entry)}
//                                   >
//                                     <div className="flex items-start justify-between">
//                                       <div className="flex-1 min-w-0">
//                                         <h4 className="font-medium text-sm text-gray-800 dark:text-white truncate">
//                                           {entry.title}
//                                         </h4>
//                                         <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
//                                           <Clock className="h-3 w-3" />
//                                           <span>{formatDate(entry.date)}</span>
//                                           <span>•</span>
//                                           <span>{entry.wordCount} words</span>
//                                         </div>
//                                         {entry.tags &&
//                                           entry.tags.length > 0 && (
//                                             <div className="flex gap-1 mt-1">
//                                               {entry.tags
//                                                 .slice(0, 2)
//                                                 .map((tag) => (
//                                                   <span
//                                                     key={tag}
//                                                     className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded"
//                                                   >
//                                                     {tag}
//                                                   </span>
//                                                 ))}
//                                             </div>
//                                           )}
//                                       </div>
//                                       <button
//                                         onClick={(e) => {
//                                           e.stopPropagation();
//                                           deleteEntry(entry.id);
//                                         }}
//                                         className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors opacity-0 group-hover:opacity-100"
//                                       >
//                                         <Trash2 className="h-3 w-3 text-red-500" />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="flex-1 p-6">
//           <div className="max-w-4xl mx-auto">
//             {/* Category Selector */}
//             <div className="flex flex-wrap gap-2 mb-4">
//               {categories.map((cat) => {
//                 const Icon = cat.icon;
//                 return (
//                   <button
//                     key={cat.id}
//                     onClick={() => {
//                       setSelectedCategory(cat.id);
//                       newWriting();
//                     }}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
//                       selectedCategory === cat.id
//                         ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
//                         : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
//                     }`}
//                   >
//                     <Icon className="h-4 w-4" />
//                     <span className="font-medium">{cat.label}</span>
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Subcategory Selector */}
//             {currentCategory && (
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {currentCategory.subCategories.map((subCat) => {
//                   const Icon = subCat.icon;
//                   return (
//                     <button
//                       key={subCat.id}
//                       onClick={() => setSelectedSubCategory(subCat.id)}
//                       className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
//                         selectedSubCategory === subCat.id
//                           ? `bg-gradient-to-r ${currentCategory.color} text-white`
//                           : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
//                       }`}
//                     >
//                       <Icon className="h-3.5 w-3.5" />
//                       <span>{subCat.label}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Writing Area */}
//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
//               <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//                 <input
//                   type="text"
//                   placeholder={`Enter ${currentSubCategory?.label.toLowerCase()} title...`}
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="w-full text-2xl font-bold text-gray-800 dark:text-white placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
//                 />
//               </div>

//               <div className="p-6">
//                 <textarea
//                   placeholder={`Write your ${currentSubCategory?.label.toLowerCase()} here...`}
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   className="w-full min-h-[500px] text-gray-800 dark:text-white placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0 resize-none leading-relaxed"
//                 />
//               </div>

//               {/* Tags Input */}
//               <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
//                 <input
//                   type="text"
//                   placeholder="Add tags (comma separated) e.g., wisdom, inspiration, bible-study"
//                   value={tags}
//                   onChange={(e) => setTags(e.target.value)}
//                   className="w-full text-sm text-gray-600 dark:text-gray-400 placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
//                 />
//               </div>

//               <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
//                 <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
//                   <span>{wordCount} words</span>
//                   <span>•</span>
//                   <span>{content.length} characters</span>
//                   {currentSubCategory && (
//                     <>
//                       <span>•</span>
//                       <span className="flex items-center gap-1">
//                         <BookMarked className="h-3 w-3" />
//                         {currentSubCategory.label}
//                       </span>
//                     </>
//                   )}
//                 </div>
//                 <button
//                   onClick={saveWriting}
//                   disabled={
//                     !title.trim() || !content.trim() || !selectedSubCategory
//                   }
//                   className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
//                 >
//                   <Save className="h-4 w-4" />
//                   Save to Library
//                 </button>
//               </div>
//             </div>

//             {/* Wisdom Tips Section */}
//             <div className="mt-8 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6">
//               <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
//                 <Lightbulb className="h-5 w-5 text-purple-600" />
//                 Today's Wisdom
//               </h3>
//               <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
//                 <p>
//                   📖 <strong>Proverbs 4:7</strong> - "Wisdom is the principal
//                   thing; therefore get wisdom: and with all thy getting get
//                   understanding."
//                 </p>
//                 <p>
//                   💭 <strong>Socrates</strong> - "The only true wisdom is in
//                   knowing you know nothing."
//                 </p>
//                 <p>
//                   🧠 <strong>Carl Jung</strong> - "Who looks outside, dreams;
//                   who looks inside, awakes."
//                 </p>
//                 <p>
//                   ✨ <strong>Daily Practice</strong> - Write one thing you're
//                   grateful for, one lesson learned, and one goal for tomorrow.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
