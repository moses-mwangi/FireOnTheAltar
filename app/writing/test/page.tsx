"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Smile,
  Frown,
  Meh,
  Zap,
  Cloud,
  Moon,
  Sun,
  Tag,
  Image as ImageIcon,
  Mic,
  Lock,
  Unlock,
  Heart,
  Bookmark,
  Share2,
  MoreVertical,
  Edit,
  Trash2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Types
export type Mood =
  | "happy"
  | "sad"
  | "neutral"
  | "energetic"
  | "calm"
  | "anxious";
export type Weather = "sunny" | "cloudy" | "rainy" | "stormy" | "snowy";
export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  mood: Mood;
  weather?: Weather;
  tags: string[];
  date: string;
  isFavorite: boolean;
  isPrivate: boolean;
  images?: string[];
  location?: string;
  wordCount: number;
  reflection?: string;
};

const moodConfig: Record<Mood, { icon: any; color: string; label: string }> = {
  happy: { icon: Smile, color: "text-yellow-500", label: "Happy" },
  sad: { icon: Frown, color: "text-blue-500", label: "Sad" },
  neutral: { icon: Meh, color: "text-gray-500", label: "Neutral" },
  energetic: { icon: Zap, color: "text-orange-500", label: "Energetic" },
  calm: { icon: Cloud, color: "text-green-500", label: "Calm" },
  anxious: { icon: Moon, color: "text-purple-500", label: "Anxious" },
};

const weatherConfig: Record<
  Weather,
  { icon: any; color: string; label: string }
> = {
  sunny: { icon: Sun, color: "text-yellow-500", label: "Sunny" },
  cloudy: { icon: Cloud, color: "text-gray-500", label: "Cloudy" },
  rainy: { icon: Cloud, color: "text-blue-500", label: "Rainy" },
  stormy: { icon: Cloud, color: "text-indigo-500", label: "Stormy" },
  snowy: { icon: Cloud, color: "text-cyan-500", label: "Snowy" },
};

interface JournalProps {
  initialEntry?: JournalEntry | null;
  onSave?: (entry: JournalEntry) => void;
  onDelete?: (entryId: string) => void;
  entries?: JournalEntry[];
}

export default function Journal({
  initialEntry = null,
  onSave,
  onDelete,
  entries = [],
}: JournalProps) {
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(
    initialEntry,
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<Mood>("neutral");
  const [weather, setWeather] = useState<Weather | undefined>();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [location, setLocation] = useState("");
  const [reflection, setReflection] = useState("");
  const [showReflection, setShowReflection] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMood, setSelectedMood] = useState<Mood | "all">("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"write" | "browse">("write");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Calculate word count
  useEffect(() => {
    const words = content
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    setWordCount(words.length);
  }, [content]);

  // Load entry for editing
  useEffect(() => {
    if (currentEntry) {
      setTitle(currentEntry.title);
      setContent(currentEntry.content);
      setMood(currentEntry.mood);
      setWeather(currentEntry.weather);
      setTags(currentEntry.tags);
      setIsPrivate(currentEntry.isPrivate);
      setIsFavorite(currentEntry.isFavorite);
      setLocation(currentEntry.location || "");
      setReflection(currentEntry.reflection || "");
      setSelectedEntry(currentEntry);
    } else {
      resetForm();
    }
  }, [currentEntry]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setMood("neutral");
    setWeather(undefined);
    setTags([]);
    setTagInput("");
    setIsPrivate(false);
    setIsFavorite(false);
    setLocation("");
    setReflection("");
    setWordCount(0);
    setSelectedEntry(null);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const entry: JournalEntry = {
      id: currentEntry?.id || `journal-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      mood,
      weather,
      tags,
      date: currentEntry?.date || new Date().toISOString(),
      isFavorite,
      isPrivate,
      location: location.trim() || undefined,
      wordCount,
      reflection: reflection.trim() || undefined,
    };

    if (onSave) {
      onSave(entry);
    }

    resetForm();
    setCurrentEntry(null);
    setViewMode("browse");
  };

  const handleDelete = () => {
    if (selectedEntry && confirm("Delete this journal entry?")) {
      if (onDelete) {
        onDelete(selectedEntry.id);
      }
      setSelectedEntry(null);
      resetForm();
      setViewMode("write");
    }
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesMood = selectedMood === "all" || entry.mood === selectedMood;
    const matchesTag =
      selectedTag === "all" || entry.tags.includes(selectedTag);

    return matchesSearch && matchesMood && matchesTag;
  });

  const allTags = Array.from(new Set(entries.flatMap((e) => e.tags)));

  const getMoodIcon = (mood: Mood) => {
    const config = moodConfig[mood];
    return config ? (
      <config.icon className={`h-4 w-4 ${config.color}`} />
    ) : null;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Header with view toggle */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Soul Journal
              </h2>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setViewMode("write")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === "write"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Edit className="h-4 w-4 mr-2" />
                Write
              </Button>
              <Button
                onClick={() => setViewMode("browse")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === "browse"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Browse
              </Button>
            </div>
          </div>

          {/* Stats for current session */}
          {viewMode === "write" && wordCount > 0 && (
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>📝 {wordCount} words</span>
              <span>🔤 {content.length} characters</span>
              <span>⏱️ ~{Math.ceil(wordCount / 150)} min read</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {viewMode === "write" ? (
          // Writing Mode
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Entry Title
              </Label>
              <Input
                type="text"
                placeholder="What's on your mind today?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xl font-semibold border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            {/* Mood & Weather Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  How are you feeling?
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {(Object.keys(moodConfig) as Mood[]).map((m) => {
                    const config = moodConfig[m];
                    const Icon = config.icon;
                    return (
                      <button
                        key={m}
                        onClick={() => setMood(m)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                          mood === m
                            ? "border-purple-500 bg-purple-50 ring-2 ring-purple-200"
                            : "border-gray-300 hover:border-purple-300"
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${config.color}`} />
                        <span className="text-sm">{config.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Weather outside
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {(Object.keys(weatherConfig) as Weather[]).map((w) => {
                    const config = weatherConfig[w];
                    const Icon = config.icon;
                    return (
                      <button
                        key={w}
                        onClick={() =>
                          setWeather(w === weather ? undefined : w)
                        }
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                          weather === w
                            ? "border-purple-500 bg-purple-50 ring-2 ring-purple-200"
                            : "border-gray-300 hover:border-purple-300"
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${config.color}`} />
                        <span className="text-sm">{config.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Location (optional)
              </Label>
              <Input
                type="text"
                placeholder="Where are you writing from?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-gray-300 focus:border-purple-500"
              />
            </div>

            {/* Content */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Your Journal Entry
              </Label>
              <Textarea
                placeholder="Pour your heart out here... Be honest, be vulnerable, be you."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[400px] text-gray-800 placeholder-gray-400 border-gray-300 focus:border-purple-500 focus:ring-purple-500 resize-none leading-relaxed"
              />
            </div>

            {/* Tags */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Tags
              </Label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    #{tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-purple-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add a tag (e.g., gratitude, growth, love)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  className="flex-1 border-gray-300 focus:border-purple-500"
                />
                <Button onClick={handleAddTag} variant="outline">
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Reflection Section */}
            <div>
              <button
                onClick={() => setShowReflection(!showReflection)}
                className="text-sm font-semibold text-purple-600 hover:text-purple-700 mb-2 block"
              >
                {showReflection ? "− Hide Reflection" : "+ Add Reflection"}
              </button>
              {showReflection && (
                <Textarea
                  placeholder="What did you learn about yourself today? What would you do differently?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="w-full min-h-[120px] border-gray-300 focus:border-purple-500 bg-purple-50/30"
                />
              )}
            </div>

            {/* Privacy & Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isPrivate
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isPrivate ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Unlock className="h-4 w-4" />
                  )}
                  {isPrivate ? "Private" : "Public"}
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isFavorite
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite ? "fill-yellow-500" : ""}`}
                  />
                  Favorite
                </button>
              </div>
              <div className="flex gap-3">
                {currentEntry && (
                  <Button onClick={handleDelete} variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                )}
                <Button
                  onClick={handleSave}
                  disabled={!title.trim() || !content.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {currentEntry ? "Update Entry" : "Save Entry"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Browse Mode
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search your journal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-purple-500"
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <Select
                  value={selectedMood}
                  onValueChange={(value: any) => setSelectedMood(value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All moods</SelectItem>
                    {Object.entries(moodConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <config.icon className={`h-4 w-4 ${config.color}`} />
                          {config.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedTag} onValueChange={setSelectedTag}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All tags</SelectItem>
                    {allTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        #{tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Entries Grid */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredEntries.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Bookmark className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No journal entries found</p>
                  <Button
                    onClick={() => setViewMode("write")}
                    variant="outline"
                    className="mt-3"
                  >
                    Write your first entry
                  </Button>
                </div>
              ) : (
                filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer hover:border-purple-300"
                    onClick={() => {
                      setCurrentEntry(entry);
                      setViewMode("write");
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getMoodIcon(entry.mood)}
                          <h3 className="font-semibold text-lg">
                            {entry.title}
                          </h3>
                          {entry.isFavorite && (
                            <Heart className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          )}
                          {entry.isPrivate && (
                            <Lock className="h-3 w-3 text-gray-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          {formatDate(entry.date)}
                          {entry.location && ` • ${entry.location}`}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onDelete) onDelete(entry.id);
                          }}
                          className="p-1 hover:bg-red-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 line-clamp-2 mb-2">
                      {entry.content}
                    </p>
                    {entry.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {entry.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                          >
                            #{tag}
                          </span>
                        ))}
                        {entry.tags.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{entry.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    {entry.reflection && (
                      <div className="mt-2 pt-2 border-t text-sm text-purple-600">
                        💭 Has reflection
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
