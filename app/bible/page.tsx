// app/bible/page.tsx
"use client";

import { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  Filter,
  Bookmark,
  Share2,
  Volume2,
  Layers,
  Eye,
  EyeOff,
  Highlighter,
  MessageSquare,
  Link,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
// import VerseCard from "@/components/bible/VerseCard";
import VerseCard from "@/components/bible/VerseCard";
import CommentaryPanel from "@/components/bible/CommentaryPanel";
import ParallelReader from "@/components/bible/ParallelReader";
import WordStudyPanel from "@/components/bible/WordStudyPanel";

const BOOKS_OF_THE_BIBLE = [
  { name: "Genesis", chapters: 50, color: "from-amber-500 to-orange-500" },
  { name: "Exodus", chapters: 40, color: "from-orange-500 to-red-500" },
  { name: "Psalms", chapters: 150, color: "from-emerald-500 to-teal-500" },
  { name: "Matthew", chapters: 28, color: "from-blue-500 to-indigo-500" },
  { name: "John", chapters: 21, color: "from-purple-500 to-pink-500" },
  { name: "Romans", chapters: 16, color: "from-indigo-500 to-purple-500" },
  { name: "Revelation", chapters: 22, color: "from-rose-500 to-red-500" },
];

const DEMO_VERSES = [
  {
    id: "v1",
    book: "John",
    chapter: 3,
    verse: 16,
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    translation: "NIV",
    highlights: [
      { type: "theological", color: "bg-purple-100", text: "God's motivation" },
      { type: "application", color: "bg-emerald-100", text: "Human response" },
    ],
    notes: 5,
    tags: ["salvation", "love", "gospel"],
    wordStudies: [
      { word: "loved", original: "ἀγάπη", meaning: "self-sacrificial love" },
      { word: "believes", original: "πιστεύω", meaning: "to trust, rely upon" },
    ],
  },
  // More verses...
];

export default function BibleReader() {
  const [selectedBook, setSelectedBook] = useState("John");
  const [chapter, setChapter] = useState(3);
  const [selectedVerse, setSelectedVerse] = useState(DEMO_VERSES[0]);
  const [showOriginal, setShowOriginal] = useState(false);
  const [showHighlights, setShowHighlights] = useState(true);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [translations, setTranslations] = useState(["NIV", "ESV", "KJV"]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50/20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  Bible Study Hub
                </h1>
                <p className="text-sm text-slate-600">
                  Study with depth and clarity
                </p>
              </div>

              {/* Book & Chapter Selector */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    className="appearance-none bg-white border rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                  >
                    {BOOKS_OF_THE_BIBLE.map((book) => (
                      <option key={book.name} value={book.name}>
                        {book.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <Filter className="h-4 w-4 text-slate-400" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setChapter(num)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        chapter === num
                          ? "bg-purple-100 text-purple-700 border border-purple-300"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <span className="text-slate-400">...</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-slate-500" />
                <Switch
                  checked={showOriginal}
                  onCheckedChange={setShowOriginal}
                />
                <span className="text-sm font-medium">Greek/Hebrew</span>
              </div>
              <Button variant="outline" size="sm">
                <Highlighter className="h-4 w-4 mr-2" />
                Highlight
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="study" className="space-y-6">
          <TabsList className="bg-slate-100 p-1 rounded-xl">
            <TabsTrigger
              value="study"
              className="rounded-lg data-[state=active]:bg-white"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Study View
            </TabsTrigger>
            <TabsTrigger
              value="parallel"
              className="rounded-lg data-[state=active]:bg-white"
            >
              <Layers className="h-4 w-4 mr-2" />
              Parallel
            </TabsTrigger>
            <TabsTrigger
              value="word"
              className="rounded-lg data-[state=active]:bg-white"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Word Study
            </TabsTrigger>
            <TabsTrigger
              value="commentary"
              className="rounded-lg data-[state=active]:bg-white"
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Commentary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="study" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Panel - Bible Text */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {selectedBook} {chapter}
                        <span className="ml-3 text-lg font-normal text-slate-500">
                          New International Version
                        </span>
                      </h2>
                      <p className="text-slate-500 mt-1">
                        Theological study edition
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Verses */}
                  <div className="space-y-6">
                    {DEMO_VERSES.map((verse) => (
                      <VerseCard
                        key={verse.id}
                        verse={verse as any}
                        isSelected={selectedVerse?.id === verse.id}
                        onSelect={setSelectedVerse}
                        showOriginal={showOriginal}
                        showHighlights={showHighlights}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - Study Tools */}
              <div className="space-y-6">
                <WordStudyPanel verse={selectedVerse} />

                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Highlighter className="h-4 w-4 text-amber-500" />
                    Quick Notes
                  </h3>
                  <textarea
                    className="w-full h-40 border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Add your insights, questions, or applications..."
                  />
                  <div className="flex gap-2 mt-4">
                    {["Insight", "Question", "Application", "Prayer"].map(
                      (tag) => (
                        <button
                          key={tag}
                          className="px-3 py-1.5 text-sm rounded-full bg-slate-100 hover:bg-slate-200"
                        >
                          + {tag}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="parallel">
            <ParallelReader verse={selectedVerse} translations={translations} />
          </TabsContent>

          <TabsContent value="word">
            <WordStudyPanel verse={selectedVerse} expanded={true} />
          </TabsContent>

          <TabsContent value="commentary">
            <CommentaryPanel verse={selectedVerse} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
