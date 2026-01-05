// components/notes/NoteEditor.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Save,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Image,
  Mic,
  Paperclip,
  Tag,
  Brain,
  Zap,
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  Target,
  Hash,
  Plus,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Volume2,
  Trash2,
  ExternalLink,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface NoteEditorProps {
  initialData?: {
    id?: string;
    title?: string;
    content?: string;
    verse?: string;
    book?: string;
    chapter?: number;
    verseStart?: number;
    verseEnd?: number;
    tags?: string[];
    insights?: string[];
    applications?: string[];
    connections?: string[];
  };
  onSave?: (note: any) => void;
  onClose?: () => void;
  onDelete?: (noteId: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  initialData,
  onSave,
  onClose,
  onDelete,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview" | "ai">(
    "write"
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Form state
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [verse, setVerse] = useState(initialData?.verse || "");
  const [book, setBook] = useState(initialData?.book || "");
  const [chapter, setChapter] = useState(initialData?.chapter || 1);
  const [verseStart, setVerseStart] = useState(initialData?.verseStart || 1);
  const [verseEnd, setVerseEnd] = useState(initialData?.verseEnd || undefined);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState("");
  const [insights, setInsights] = useState<string[]>(
    initialData?.insights || [""]
  );
  const [applications, setApplications] = useState<string[]>(
    initialData?.applications || [""]
  );
  const [connections, setConnections] = useState<string[]>(
    initialData?.connections || [""]
  );

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const BOOKS_OF_THE_BIBLE = [
    "Genesis",
    "Exodus",
    "Leviticus",
    "Numbers",
    "Deuteronomy",
    "Joshua",
    "Judges",
    "Ruth",
    "1 Samuel",
    "2 Samuel",
    "1 Kings",
    "2 Kings",
    "1 Chronicles",
    "2 Chronicles",
    "Ezra",
    "Nehemiah",
    "Esther",
    "Job",
    "Psalms",
    "Proverbs",
    "Ecclesiastes",
    "Song of Songs",
    "Isaiah",
    "Jeremiah",
    "Lamentations",
    "Ezekiel",
    "Daniel",
    "Hosea",
    "Joel",
    "Amos",
    "Obadiah",
    "Jonah",
    "Micah",
    "Nahum",
    "Habakkuk",
    "Zephaniah",
    "Haggai",
    "Zechariah",
    "Malachi",
    "Matthew",
    "Mark",
    "Luke",
    "John",
    "Acts",
    "Romans",
    "1 Corinthians",
    "2 Corinthians",
    "Galatians",
    "Ephesians",
    "Philippians",
    "Colossians",
    "1 Thessalonians",
    "2 Thessalonians",
    "1 Timothy",
    "2 Timothy",
    "Titus",
    "Philemon",
    "Hebrews",
    "James",
    "1 Peter",
    "2 Peter",
    "1 John",
    "2 John",
    "3 John",
    "Jude",
    "Revelation",
  ];

  const SUGGESTED_TAGS = [
    "salvation",
    "grace",
    "faith",
    "love",
    "hope",
    "prayer",
    "wisdom",
    "prophecy",
    "gospel",
    "christology",
    "ecclesiology",
    "eschatology",
    "sanctification",
    "justification",
    "redemption",
    "covenant",
    "kingdom",
    "holiness",
    "mercy",
  ];

  const handleSave = async () => {
    setIsSaving(true);

    const noteData = {
      id: initialData?.id || `note_${Date.now()}`,
      title,
      content,
      verse,
      book,
      chapter,
      verseStart,
      verseEnd,
      tags: tags.filter((tag) => tag.trim() !== ""),
      insights: insights.filter((insight) => insight.trim() !== ""),
      applications: applications.filter((app) => app.trim() !== ""),
      connections: connections.filter((conn) => conn.trim() !== ""),
      dateCreated: new Date(),
      lastReviewed: new Date(),
      reviewStats: {
        nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        interval: 1,
        easeFactor: 2.5,
        streak: 0,
      },
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSave?.(noteData);
    setIsSaving(false);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddInsight = () => {
    setInsights([...insights, ""]);
  };

  const handleInsightChange = (index: number, value: string) => {
    const newInsights = [...insights];
    newInsights[index] = value;
    setInsights(newInsights);
  };

  const handleRemoveInsight = (index: number) => {
    setInsights(insights.filter((_, i) => i !== index));
  };

  const handleAddApplication = () => {
    setApplications([...applications, ""]);
  };

  const handleApplicationChange = (index: number, value: string) => {
    const newApplications = [...applications];
    newApplications[index] = value;
    setApplications(newApplications);
  };

  const handleRemoveApplication = (index: number) => {
    setApplications(applications.filter((_, i) => i !== index));
  };

  const handleAddConnection = () => {
    setConnections([...connections, ""]);
  };

  const handleConnectionChange = (index: number, value: string) => {
    const newConnections = [...connections];
    newConnections[index] = value;
    setConnections(newConnections);
  };

  const handleRemoveConnection = (index: number) => {
    setConnections(connections.filter((_, i) => i !== index));
  };

  const handleFormatText = (format: "bold" | "italic" | "list") => {
    if (!contentRef.current) return;

    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let formattedText = "";
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "list":
        formattedText = `\n- ${selectedText}`;
        break;
    }

    const newContent =
      content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);

    // Restore focus and cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + formattedText.length,
        start + formattedText.length
      );
    }, 0);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleAIAssist = async () => {
    // Simulate AI assistance
    setActiveTab("ai");
    // In real app, call AI API here
  };

  const handleDelete = () => {
    if (
      initialData?.id &&
      window.confirm("Are you sure you want to delete this note?")
    ) {
      onDelete?.(initialData.id);
    }
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
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}`}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {initialData?.id ? "Edit Note" : "New Note"}
            </h2>
            <p className="text-slate-600 mt-1">
              {initialData?.id
                ? "Update your study notes"
                : "Capture insights and reflections"}
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
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("write")}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === "write"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Write
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === "preview"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Preview
          </button>
          <button
            onClick={handleAIAssist}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === "ai"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            AI Assist
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`p-6 ${
          isFullscreen ? "h-[calc(100vh-140px)] overflow-y-auto" : ""
        }`}
      >
        {activeTab === "write" ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Note Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Insights on God's Love in John 3:16"
                  className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Verse Reference */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Book
                </label>
                <div className="relative">
                  <select
                    value={book}
                    onChange={(e) => setBook(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                  >
                    <option value="">Select a book</option>
                    {BOOKS_OF_THE_BIBLE.map((bookName) => (
                      <option key={bookName} value={bookName}>
                        {bookName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Chapter
                  </label>
                  <input
                    type="number"
                    value={chapter}
                    onChange={(e) => setChapter(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Verse Start
                  </label>
                  <input
                    type="number"
                    value={verseStart}
                    onChange={(e) =>
                      setVerseStart(parseInt(e.target.value) || 1)
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Verse End (Optional)
                  </label>
                  <input
                    type="number"
                    value={verseEnd || ""}
                    onChange={(e) =>
                      setVerseEnd(
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-slate-700">
                  Note Content
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleFormatText("bold")}
                    className="p-2 hover:bg-slate-100 rounded-lg"
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleFormatText("italic")}
                    className="p-2 hover:bg-slate-100 rounded-lg"
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleFormatText("list")}
                    className="p-2 hover:bg-slate-100 rounded-lg"
                    title="Bullet List"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your notes here... You can include insights, reflections, applications, or questions."
                className="w-full h-64 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={handleFileUpload}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <Image className="h-4 w-4" />
                  Image
                </button>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg ${
                    isRecording
                      ? "bg-red-100 text-red-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Mic className="h-4 w-4" />
                  {isRecording ? "Recording..." : "Audio"}
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
                  <LinkIcon className="h-4 w-4" />
                  Link
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*,audio/*"
                  multiple
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full"
                  >
                    #{tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="p-0.5 hover:bg-purple-200 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  placeholder="Add a tag..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                >
                  Add
                </button>
              </div>
              <div className="mt-3">
                <p className="text-sm text-slate-600 mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        if (!tags.includes(tag)) {
                          setTags([...tags, tag]);
                        }
                      }}
                      className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <div>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900"
              >
                {showAdvanced ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
                Advanced Options
              </button>

              {showAdvanced && (
                <div className="mt-6 space-y-8">
                  {/* Insights */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-amber-500" />
                      Key Insights
                    </label>
                    <div className="space-y-3">
                      {insights.map((insight, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="text"
                            value={insight}
                            onChange={(e) =>
                              handleInsightChange(index, e.target.value)
                            }
                            placeholder={`Insight ${index + 1}`}
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <button
                            onClick={() => handleRemoveInsight(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={handleAddInsight}
                        className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                      >
                        <Plus className="h-4 w-4" />
                        Add Insight
                      </button>
                    </div>
                  </div>

                  {/* Applications */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-emerald-500" />
                      Practical Applications
                    </label>
                    <div className="space-y-3">
                      {applications.map((app, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="text"
                            value={app}
                            onChange={(e) =>
                              handleApplicationChange(index, e.target.value)
                            }
                            placeholder={`Application ${index + 1}`}
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <button
                            onClick={() => handleRemoveApplication(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={handleAddApplication}
                        className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                      >
                        <Plus className="h-4 w-4" />
                        Add Application
                      </button>
                    </div>
                  </div>

                  {/* Connections */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-blue-500" />
                      Related Verses
                    </label>
                    <div className="space-y-3">
                      {connections.map((conn, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="text"
                            value={conn}
                            onChange={(e) =>
                              handleConnectionChange(index, e.target.value)
                            }
                            placeholder="e.g., Romans 5:8"
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <button
                            onClick={() => handleRemoveConnection(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={handleAddConnection}
                        className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                      >
                        <Plus className="h-4 w-4" />
                        Add Related Verse
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : activeTab === "preview" ? (
          <div className="max-w-4xl mx-auto">
            {/* Preview Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg">
              {/* Preview Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      {title || "Untitled Note"}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm">
                        {verse || "No verse selected"}
                      </span>
                      <span className="text-slate-600">
                        {book &&
                          chapter &&
                          `${book} ${chapter}:${verseStart}${
                            verseEnd ? `-${verseEnd}` : ""
                          }`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg">
                      <Eye className="h-5 w-5 text-slate-500" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg">
                      <Volume2 className="h-5 w-5 text-slate-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-6">
                <div className="prose max-w-none">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {content || "No content yet. Start writing to see preview."}
                  </p>
                </div>

                {/* Tags Preview */}
                {tags.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Insights Preview */}
                {insights.some((i) => i.trim() !== "") && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-amber-500" />
                      Key Insights
                    </h4>
                    <ul className="space-y-2">
                      {insights
                        .filter((i) => i.trim() !== "")
                        .map((insight, idx) => (
                          <li
                            key={idx}
                            className="text-slate-600 pl-4 border-l-2 border-amber-300"
                          >
                            {insight}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Applications Preview */}
                {applications.some((a) => a.trim() !== "") && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-emerald-500" />
                      Practical Applications
                    </h4>
                    <ul className="space-y-2">
                      {applications
                        .filter((a) => a.trim() !== "")
                        .map((app, idx) => (
                          <li
                            key={idx}
                            className="text-slate-600 pl-4 border-l-2 border-emerald-300"
                          >
                            {app}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // AI Assist Tab
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-purple-100 to-indigo-100 mb-6">
                <Sparkles className="h-16 w-16 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                AI Study Assistant
              </h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Get AI-powered insights, questions, and applications for your
                notes
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <button className="p-6 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 hover:border-purple-300 text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="h-6 w-6 text-purple-600" />
                    <h4 className="font-bold text-slate-800">
                      Generate Insights
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600">
                    AI will analyze your note and suggest theological insights
                  </p>
                </button>

                <button className="p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-300 text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="h-6 w-6 text-emerald-600" />
                    <h4 className="font-bold text-slate-800">
                      Create Questions
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600">
                    Generate study questions for deeper reflection
                  </p>
                </button>

                <button className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 hover:border-blue-300 text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="h-6 w-6 text-blue-600" />
                    <h4 className="font-bold text-slate-800">
                      Suggest Applications
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600">
                    Get practical ways to apply this scripture to your life
                  </p>
                </button>

                <button className="p-6 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 hover:border-amber-300 text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <Hash className="h-6 w-6 text-amber-600" />
                    <h4 className="font-bold text-slate-800">
                      Cross References
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600">
                    Find related verses and thematic connections
                  </p>
                </button>
              </div>

              <div className="text-center">
                <p className="text-slate-600 mb-4">
                  Note: AI features require an active subscription
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700">
                  Upgrade to Pro
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="sticky bottom-0 bg-white border-t p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {initialData?.id && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                Delete Note
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save Note
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
