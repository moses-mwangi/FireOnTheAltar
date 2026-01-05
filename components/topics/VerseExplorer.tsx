// components/topics/VerseExplorer.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  BookOpen,
  Hash,
  Sparkles,
  Brain,
  Zap,
  Target,
  Share2,
  Bookmark,
  Copy,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Layers,
  BarChart3,
  TrendingUp,
  Calendar,
  Users,
  Star,
  MessageSquare,
  Volume2,
  Download,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  RefreshCw,
} from "lucide-react";
import { X } from "lucide-react";

interface Verse {
  id: string;
  reference: string;
  text: string;
  topic: string;
  book: string;
  chapter: number;
  verse: number;
  translation: string;
  popularity: number;
  tags: string[];
  notesCount: number;
  lastStudied?: Date;
}

interface Topic {
  id: string;
  name: string;
  color: string;
  icon: string;
}

const VerseExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedBook, setSelectedBook] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "timeline">(
    "grid"
  );
  const [sortBy, setSortBy] = useState<
    "popularity" | "recent" | "alphabetical"
  >("popularity");
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const topics: Topic[] = [
    {
      id: "grace",
      name: "Grace & Mercy",
      color: "from-purple-500 to-pink-500",
      icon: "💝",
    },
    {
      id: "faith",
      name: "Faith & Trust",
      color: "from-emerald-500 to-teal-500",
      icon: "🙏",
    },
    {
      id: "love",
      name: "God's Love",
      color: "from-rose-500 to-red-500",
      icon: "❤️",
    },
    {
      id: "kingdom",
      name: "Kingdom of God",
      color: "from-amber-500 to-orange-500",
      icon: "👑",
    },
    {
      id: "prayer",
      name: "Prayer & Worship",
      color: "from-blue-500 to-indigo-500",
      icon: "🙌",
    },
  ];

  const booksOfBible = [
    "Genesis",
    "Exodus",
    "Psalms",
    "Isaiah",
    "Matthew",
    "John",
    "Romans",
    "1 Corinthians",
    "Ephesians",
    "Philippians",
    "Hebrews",
    "James",
    "1 John",
    "Revelation",
  ];

  const verses: Verse[] = [
    {
      id: "1",
      reference: "John 3:16",
      text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      topic: "love",
      book: "John",
      chapter: 3,
      verse: 16,
      translation: "NIV",
      popularity: 98,
      tags: ["salvation", "gospel", "faith"],
      notesCount: 156,
      lastStudied: new Date("2024-03-15"),
    },
    {
      id: "2",
      reference: "Romans 8:28",
      text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      topic: "faith",
      book: "Romans",
      chapter: 8,
      verse: 28,
      translation: "NIV",
      popularity: 92,
      tags: ["providence", "trust", "purpose"],
      notesCount: 89,
      lastStudied: new Date("2024-03-10"),
    },
    {
      id: "3",
      reference: "Psalm 23:1",
      text: "The LORD is my shepherd, I lack nothing.",
      topic: "faith",
      book: "Psalms",
      chapter: 23,
      verse: 1,
      translation: "NIV",
      popularity: 95,
      tags: ["trust", "provision", "comfort"],
      notesCount: 112,
      lastStudied: new Date("2024-03-12"),
    },
    {
      id: "4",
      reference: "Philippians 4:13",
      text: "I can do all this through him who gives me strength.",
      topic: "faith",
      book: "Philippians",
      chapter: 4,
      verse: 13,
      translation: "NIV",
      popularity: 88,
      tags: ["strength", "empowerment", "christ"],
      notesCount: 76,
      lastStudied: new Date("2024-03-08"),
    },
    {
      id: "5",
      reference: "Jeremiah 29:11",
      text: 'For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future.',
      topic: "grace",
      book: "Jeremiah",
      chapter: 29,
      verse: 11,
      translation: "NIV",
      popularity: 90,
      tags: ["hope", "future", "plans"],
      notesCount: 94,
      lastStudied: new Date("2024-03-05"),
    },
    {
      id: "6",
      reference: "Matthew 6:33",
      text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
      topic: "kingdom",
      book: "Matthew",
      chapter: 6,
      verse: 33,
      translation: "NIV",
      popularity: 85,
      tags: ["priorities", "kingdom", "provision"],
      notesCount: 67,
      lastStudied: new Date("2024-02-28"),
    },
    {
      id: "7",
      reference: "1 John 4:8",
      text: "Whoever does not love does not know God, because God is love.",
      topic: "love",
      book: "1 John",
      chapter: 4,
      verse: 8,
      translation: "NIV",
      popularity: 87,
      tags: ["love", "nature-of-god", "relationship"],
      notesCount: 58,
      lastStudied: new Date("2024-02-25"),
    },
    {
      id: "8",
      reference: "Ephesians 2:8-9",
      text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.",
      topic: "grace",
      book: "Ephesians",
      chapter: 2,
      verse: 8,
      translation: "NIV",
      popularity: 93,
      tags: ["salvation", "grace", "faith"],
      notesCount: 102,
      lastStudied: new Date("2024-03-01"),
    },
  ];

  const filteredVerses = verses
    .filter((verse) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          verse.reference.toLowerCase().includes(query) ||
          verse.text.toLowerCase().includes(query) ||
          verse.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .filter((verse) => selectedTopic === "all" || verse.topic === selectedTopic)
    .filter((verse) => selectedBook === "all" || verse.book === selectedBook)
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity;
        case "recent":
          return (
            (b.lastStudied?.getTime() || 0) - (a.lastStudied?.getTime() || 0)
          );
        case "alphabetical":
          return a.reference.localeCompare(b.reference);
        default:
          return 0;
      }
    });

  const getTopicColor = (topicId: string) => {
    const topic = topics.find((t) => t.id === topicId);
    return topic?.color || "from-slate-500 to-slate-700";
  };

  const getTopicIcon = (topicId: string) => {
    const topic = topics.find((t) => t.id === topicId);
    return topic?.icon || "📖";
  };

  const handleCopyVerse = async (verse: Verse) => {
    await navigator.clipboard.writeText(`${verse.reference} - ${verse.text}`);
    alert("Verse copied to clipboard!");
  };

  const handleShareVerse = async (verse: Verse) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: verse.reference,
          text: verse.text,
          url: window.location.href,
        });
      } catch (err) {
        handleCopyVerse(verse);
      }
    } else {
      handleCopyVerse(verse);
    }
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return "text-emerald-600 bg-emerald-100";
    if (popularity >= 80) return "text-amber-600 bg-amber-100";
    return "text-slate-600 bg-slate-100";
  };

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  return (
    <div
      className={`space-y-6 ${
        isFullscreen ? "fixed inset-0 z-50 bg-white p-6 overflow-auto" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Verse Explorer</h2>
          <p className="text-slate-600 mt-1">
            Discover verses by topic, book, or popularity
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5 text-slate-600" />
            ) : (
              <Maximize2 className="h-5 w-5 text-slate-600" />
            )}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <Filter className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white">
              <Hash className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Verses</p>
              <p className="text-xl font-bold text-slate-800">
                {verses.length}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white">
              <BookOpen className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Books Covered</p>
              <p className="text-xl font-bold text-slate-800">
                {Array.from(new Set(verses.map((v) => v.book))).length}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white">
              <Star className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Avg Popularity</p>
              <p className="text-xl font-bold text-slate-800">
                {Math.round(
                  verses.reduce((sum, v) => sum + v.popularity, 0) /
                    verses.length
                )}
                %
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white">
              <MessageSquare className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Notes</p>
              <p className="text-xl font-bold text-slate-800">
                {verses.reduce((sum, v) => sum + v.notesCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      {showFilters && (
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search verses by reference, text, or tags..."
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Topic Filter */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              Filter by Topic
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTopic("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedTopic === "all"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All Topics
              </button>
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    selectedTopic === topic.id
                      ? "ring-2 ring-offset-1 ring-current"
                      : "hover:ring-2 hover:ring-current/50"
                  } ${topic.color.replace(
                    "bg-gradient-to-r",
                    "bg-gradient-to-br"
                  )} text-white`}
                >
                  <span>{topic.icon}</span>
                  <span>{topic.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Book Filter & Sort */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-3">
                Filter by Book
              </h3>
              <select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Books</option>
                {booksOfBible.map((book) => (
                  <option key={book} value={book}>
                    {book}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-3">
                Sort By
              </h3>
              <div className="flex bg-slate-100 rounded-lg p-1">
                {["popularity", "recent", "alphabetical"].map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort as any)}
                    className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md capitalize ${
                      sortBy === sort
                        ? "bg-white shadow text-purple-600"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* View Mode */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                View Mode
              </h3>
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-2 ${
                    viewMode === "grid"
                      ? "bg-white shadow text-purple-600"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-2 ${
                    viewMode === "list"
                      ? "bg-white shadow text-purple-600"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <List className="h-4 w-4" />
                  List
                </button>
                <button
                  onClick={() => setViewMode("timeline")}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-2 ${
                    viewMode === "timeline"
                      ? "bg-white shadow text-purple-600"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  Timeline
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-600">
                Showing {filteredVerses.length} of {verses.length} verses
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Verses Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVerses.map((verse) => (
            <div
              key={verse.id}
              className="group relative bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              onClick={() => setSelectedVerse(verse)}
            >
              {/* Verse Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {verse.reference}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getTopicColor(
                        verse.topic
                      )} text-white`}
                    >
                      {getTopicIcon(verse.topic)}{" "}
                      {topics.find((t) => t.id === verse.topic)?.name}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getPopularityColor(
                        verse.popularity
                      )}`}
                    >
                      {verse.popularity}% popular
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyVerse(verse);
                    }}
                    className="p-1.5 hover:bg-slate-100 rounded-lg"
                  >
                    <Copy className="h-4 w-4 text-slate-500" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareVerse(verse);
                    }}
                    className="p-1.5 hover:bg-slate-100 rounded-lg"
                  >
                    <Share2 className="h-4 w-4 text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Verse Text */}
              <div className="mb-4">
                <p className="text-slate-700 leading-relaxed line-clamp-3">
                  "{verse.text}"
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {verse.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs bg-slate-100 text-slate-700 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-slate-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{verse.notesCount} notes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{verse.translation}</span>
                  </div>
                </div>

                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-purple-500" />
              </div>
            </div>
          ))}
        </div>
      ) : viewMode === "list" ? (
        <div className="space-y-4">
          {filteredVerses.map((verse) => (
            <div
              key={verse.id}
              className="group relative bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-all"
              onClick={() => setSelectedVerse(verse)}
            >
              <div className="flex items-start gap-4">
                {/* Popularity Indicator */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTopicColor(
                      verse.topic
                    )} text-white`}
                  >
                    <span className="text-lg">{getTopicIcon(verse.topic)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-slate-800">
                      {verse.reference}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getPopularityColor(
                          verse.popularity
                        )}`}
                      >
                        {verse.popularity}%
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyVerse(verse);
                          }}
                          className="p-1 hover:bg-slate-100 rounded"
                        >
                          <Copy className="h-4 w-4 text-slate-500" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm line-clamp-2 mb-2">
                    "{verse.text}"
                  </p>

                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{verse.notesCount} notes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{verse.book}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {verse.lastStudied ? "2 days ago" : "Never studied"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Timeline View
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-indigo-200 to-blue-200" />

          <div className="space-y-8 pl-16">
            {filteredVerses.map((verse, index) => (
              <div key={verse.id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-[-32px] top-6 w-4 h-4 rounded-full border-4 border-white bg-gradient-to-r from-purple-500 to-indigo-500" />

                <div
                  className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setSelectedVerse(verse)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        {verse.reference}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getTopicColor(
                            verse.topic
                          )} text-white`}
                        >
                          {getTopicIcon(verse.topic)}
                        </span>
                        <span className="text-sm text-slate-600">
                          {verse.book} • {verse.translation}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600">Popularity</div>
                      <div
                        className={`text-lg font-bold ${
                          getPopularityColor(verse.popularity).split(" ")[0]
                        }`}
                      >
                        {verse.popularity}%
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-700 mb-4">"{verse.text}"</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>{verse.notesCount} notes</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Calendar className="h-4 w-4" />
                        <span>Last: 2 days ago</span>
                      </div>
                    </div>

                    <button className="text-purple-600 hover:text-purple-700">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Verse Details */}
      {selectedVerse && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {selectedVerse.reference}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getTopicColor(
                        selectedVerse.topic
                      )} text-white`}
                    >
                      {getTopicIcon(selectedVerse.topic)}{" "}
                      {topics.find((t) => t.id === selectedVerse.topic)?.name}
                    </span>
                    <span className="text-slate-600">
                      {selectedVerse.book} {selectedVerse.chapter}:
                      {selectedVerse.verse} • {selectedVerse.translation}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVerse(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X className="h-5 w-5 text-slate-600" />
                </button>
              </div>

              {/* Verse Text */}
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
                <p className="text-lg leading-relaxed text-slate-800 font-serif">
                  "{selectedVerse.text}"
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="text-2xl font-bold text-slate-800">
                    {selectedVerse.popularity}%
                  </div>
                  <div className="text-sm text-slate-600">Popularity</div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50">
                  <div className="text-2xl font-bold text-slate-800">
                    {selectedVerse.notesCount}
                  </div>
                  <div className="text-sm text-slate-600">Notes</div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="text-2xl font-bold text-slate-800">92%</div>
                  <div className="text-sm text-slate-600">Retention</div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50">
                  <div className="text-xl font-bold text-slate-800">2 days</div>
                  <div className="text-sm text-slate-600">Last Studied</div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h4 className="font-bold text-slate-800 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVerse.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleCopyVerse(selectedVerse)}
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700"
                >
                  Add to Study Plan
                </button>
                <button className="px-4 py-2.5 border border-purple-300 text-purple-600 rounded-xl hover:bg-purple-50">
                  Create Note
                </button>
                <button className="px-4 py-2.5 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50">
                  View Full Context
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredVerses.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-200 mb-4">
            <Search className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            No verses found
          </h3>
          <p className="text-slate-600 mb-6">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTopic("all");
              setSelectedBook("all");
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default VerseExplorer;
