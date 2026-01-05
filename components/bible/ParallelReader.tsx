// components/bible/ParallelReader.tsx
"use client";

import { useState } from "react";
import {
  Columns,
  BookOpen,
  Scale,
  Eye,
  EyeOff,
  Copy,
  Share2,
  Bookmark,
  Volume2,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Languages,
  Sparkles,
  Brain,
  Hash,
} from "lucide-react";

interface ParallelReaderProps {
  verse: {
    book: string;
    chapter: number;
    verse: number;
  };
  translations?: string[];
}

const ParallelReader: React.FC<ParallelReaderProps> = ({
  verse,
  translations = ["NIV", "ESV", "KJV", "NASB", "Message"],
}) => {
  const [visibleTranslations, setVisibleTranslations] =
    useState<string[]>(translations);
  const [activeTranslation, setActiveTranslation] = useState<string>("NIV");
  const [isComparing, setIsComparing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWordDifferences, setShowWordDifferences] = useState(true);
  const [layout, setLayout] = useState<"columns" | "rows">("columns");

  const parallelVerses = [
    {
      translation: "NIV",
      text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      year: 1978,
      type: "Dynamic",
      notes: "Balanced between word-for-word and thought-for-thought",
      wordCount: 25,
    },
    {
      translation: "ESV",
      text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
      year: 2001,
      type: "Word-for-word",
      notes: "Formal equivalence, maintains original sentence structure",
      wordCount: 24,
    },
    {
      translation: "KJV",
      text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      year: 1611,
      type: "Word-for-word",
      notes: "Traditional formal equivalence with archaic language",
      wordCount: 22,
    },
    {
      translation: "NASB",
      text: "For God so loved the world, that He gave His only begotten Son, that whoever believes in Him shall not perish, but have eternal life.",
      year: 1995,
      type: "Word-for-word",
      notes: "Most literal modern translation",
      wordCount: 24,
    },
    {
      translation: "Message",
      text: "This is how much God loved the world: He gave his Son, his one and only Son. And this is why: so that no one need be destroyed; by believing in him, anyone can have a whole and lasting life.",
      year: 2002,
      type: "Paraphrase",
      notes: "Contemporary language, thought-for-thought",
      wordCount: 46,
    },
  ];

  const visibleVerses = parallelVerses.filter((v) =>
    visibleTranslations.includes(v.translation)
  );

  const wordDifferences = [
    { word: "loved", translations: ["NIV", "ESV", "KJV", "NASB", "Message"] },
    { word: "world", translations: ["NIV", "ESV", "KJV", "NASB", "Message"] },
    { word: "gave", translations: ["NIV", "ESV", "KJV", "NASB", "Message"] },
    { word: "only begotten", translations: ["KJV", "NASB"] },
    { word: "one and only", translations: ["NIV", "Message"] },
    { word: "only", translations: ["ESV"] },
    { word: "whoever/whosoever", translations: ["NIV", "ESV", "NASB", "KJV"] },
    { word: "anyone", translations: ["Message"] },
    { word: "believes/believeth", translations: ["NIV", "ESV", "NASB", "KJV"] },
    { word: "believing", translations: ["Message"] },
    {
      word: "eternal/everlasting",
      translations: ["NIV", "ESV", "NASB", "KJV", "Message"],
    },
  ];

  const toggleTranslation = (translation: string) => {
    setVisibleTranslations((prev) =>
      prev.includes(translation)
        ? prev.filter((t) => t !== translation)
        : [...prev, translation]
    );
  };

  const handleCopyAll = async () => {
    const text = visibleVerses
      .map((v) => `${v.translation}: ${v.text}`)
      .join("\n\n");
    await navigator.clipboard.writeText(text);
    alert("All translations copied to clipboard!");
  };

  const translationColors: Record<string, string> = {
    NIV: "bg-gradient-to-r from-blue-500 to-cyan-500",
    ESV: "bg-gradient-to-r from-purple-500 to-indigo-500",
    KJV: "bg-gradient-to-r from-amber-500 to-orange-500",
    NASB: "bg-gradient-to-r from-emerald-500 to-teal-500",
    Message: "bg-gradient-to-r from-rose-500 to-pink-500",
  };

  const translationTextColors: Record<string, string> = {
    NIV: "text-blue-600",
    ESV: "text-purple-600",
    KJV: "text-amber-600",
    NASB: "text-emerald-600",
    Message: "text-rose-600",
  };

  return (
    <div
      className={`space-y-6 ${
        isFullscreen ? "fixed inset-0 z-50 bg-white p-6 overflow-auto" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <Columns className="h-8 w-8 text-purple-600" />
            Parallel Bible
          </h2>
          <p className="text-slate-600 mt-1">
            Compare {visibleVerses.length} translations of {verse.book}{" "}
            {verse.chapter}:{verse.verse}
          </p>
        </div>

        <div className="flex items-center gap-2">
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
        </div>
      </div>

      {/* Translation Selector */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Languages className="h-5 w-5 text-slate-600" />
            <h3 className="font-bold text-slate-800">Select Translations</h3>
          </div>
          <span className="text-sm text-slate-600">
            {visibleTranslations.length} of {translations.length} selected
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {parallelVerses.map((trans) => {
            const isVisible = visibleTranslations.includes(trans.translation);

            return (
              <button
                key={trans.translation}
                onClick={() => toggleTranslation(trans.translation)}
                className={`p-4 rounded-xl transition-all ${
                  isVisible
                    ? "ring-2 ring-offset-1 ring-current"
                    : "opacity-60 hover:opacity-100"
                } ${translationColors[trans.translation].replace(
                  "bg-gradient-to-r",
                  "bg-gradient-to-br"
                )} text-white`}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">
                    {trans.translation}
                  </div>
                  <div className="text-xs opacity-90">{trans.year}</div>
                  <div className="text-xs mt-2 bg-white/20 rounded px-2 py-1">
                    {trans.type}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Layout Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLayout("columns")}
            className={`p-2 rounded-lg ${
              layout === "columns"
                ? "bg-purple-100 text-purple-700"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Columns className="h-5 w-5" />
          </button>
          <button
            onClick={() => setLayout("rows")}
            className={`p-2 rounded-lg ${
              layout === "rows"
                ? "bg-purple-100 text-purple-700"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsComparing(!isComparing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isComparing
                ? "bg-emerald-100 text-emerald-700"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Scale className="h-4 w-4" />
            {isComparing ? "Comparison Mode" : "Compare"}
          </button>

          <button
            onClick={() => setShowWordDifferences(!showWordDifferences)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              showWordDifferences
                ? "bg-blue-100 text-blue-700"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Hash className="h-4 w-4" />
            Word Differences
          </button>
        </div>
      </div>

      {/* Parallel Reading Grid */}
      <div
        className={`grid gap-6 ${
          layout === "columns"
            ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {visibleVerses.map((trans) => (
          <div
            key={trans.translation}
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
              activeTranslation === trans.translation
                ? "border-current scale-[1.02]"
                : "border-slate-200 hover:border-current"
            } ${translationTextColors[trans.translation]}`}
            onClick={() => setActiveTranslation(trans.translation)}
          >
            {/* Translation Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    translationColors[trans.translation]
                  } text-white`}
                >
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{trans.translation}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span>{trans.year}</span>
                    <span>•</span>
                    <span>{trans.type}</span>
                    <span>•</span>
                    <span>{trans.wordCount} words</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-slate-100 rounded">
                  <Bookmark className="h-4 w-4" />
                </button>
                <button className="p-1.5 hover:bg-slate-100 rounded">
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Verse Text */}
            <div className="mb-6">
              <p className="text-lg leading-relaxed font-serif">{trans.text}</p>
            </div>

            {/* Translation Notes */}
            <div className="p-4 rounded-lg bg-slate-50">
              <p className="text-sm text-slate-700">{trans.notes}</p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <div className="flex items-center gap-3">
                <button className="text-sm hover:underline">
                  Read full chapter
                </button>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-slate-100 rounded">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="p-1.5 hover:bg-slate-100 rounded">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Active Indicator */}
            {activeTranslation === trans.translation && (
              <div className="absolute -top-2 -right-2">
                <div className="p-1.5 rounded-full bg-white border-2 border-current">
                  <Sparkles className="h-3 w-3" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Word Differences Analysis */}
      {showWordDifferences && (
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-purple-600" />
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Word Analysis
                </h3>
                <p className="text-slate-600">
                  Compare key word choices across translations
                </p>
              </div>
            </div>

            <div className="text-sm text-slate-600">
              {wordDifferences.length} key differences
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">
                    Key Word/Phrase
                  </th>
                  {visibleVerses.map((trans) => (
                    <th
                      key={trans.translation}
                      className="text-center py-3 px-4"
                    >
                      <span
                        className={`font-bold ${
                          translationTextColors[trans.translation]
                        }`}
                      >
                        {trans.translation}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {wordDifferences.map((word, idx) => (
                  <tr key={idx} className="border-b hover:bg-white">
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-800">
                        {word.word}
                      </span>
                    </td>
                    {visibleVerses.map((trans) => {
                      const hasWord = word.translations.includes(
                        trans.translation
                      );

                      return (
                        <td
                          key={trans.translation}
                          className="text-center py-3 px-4"
                        >
                          {hasWord ? (
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700">
                              ✓
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 text-slate-400">
                              –
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Comparison Mode */}
      {isComparing && (
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="h-6 w-6 text-purple-600" />
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Translation Comparison
              </h3>
              <p className="text-slate-600">
                Side-by-side analysis of translation approaches
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-white">
              <h4 className="font-bold text-slate-800 mb-3">
                Formal Equivalence
              </h4>
              <ul className="space-y-2">
                {visibleVerses
                  .filter((v) => v.type === "Word-for-word")
                  .map((trans) => (
                    <li
                      key={trans.translation}
                      className="flex items-center justify-between"
                    >
                      <span className="font-medium">{trans.translation}</span>
                      <span className="text-sm text-slate-600">
                        Literal translation
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white">
              <h4 className="font-bold text-slate-800 mb-3">
                Dynamic/Paraphrase
              </h4>
              <ul className="space-y-2">
                {visibleVerses
                  .filter((v) => v.type !== "Word-for-word")
                  .map((trans) => (
                    <li
                      key={trans.translation}
                      className="flex items-center justify-between"
                    >
                      <span className="font-medium">{trans.translation}</span>
                      <span className="text-sm text-slate-600">
                        {trans.type}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopyAll}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700"
        >
          Copy All Translations
        </button>

        <button className="px-6 py-3 border-2 border-purple-300 text-purple-600 rounded-xl hover:bg-purple-50">
          Save Comparison
        </button>

        <button className="px-6 py-3 border-2 border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50">
          Export as PDF
        </button>
      </div>

      {/* Translation Legend */}
      <div className="p-4 rounded-xl bg-white border">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-slate-700">Legend:</span>
          {visibleVerses.map((trans) => (
            <div key={trans.translation} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded ${
                  translationColors[trans.translation]
                }`}
              />
              <span className="text-sm text-slate-600">
                {trans.translation} ({trans.type})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParallelReader;
