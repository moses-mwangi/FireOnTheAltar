// components/bible/WordStudyPanel.tsx
"use client";

import { useState } from "react";
import {
  BookOpen,
  Languages,
  Volume2,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  Copy,
  Share2,
  Bookmark,
  Brain,
  Sparkles,
  Zap,
  History,
  Target,
  Hash,
  Layers,
  ExternalLink,
  Download,
  Filter,
  Maximize2,
  Minimize2,
  Search,
} from "lucide-react";

interface WordStudyPanelProps {
  verse: {
    book: string;
    chapter: number;
    verse: number;
  };
  expanded?: boolean;
}

const WordStudyPanel: React.FC<WordStudyPanelProps> = ({
  verse,
  expanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [activeTab, setActiveTab] = useState<
    "etymology" | "usage" | "theology" | "application"
  >("etymology");
  const [selectedWord, setSelectedWord] = useState<string>("ἀγαπάω");
  const [searchQuery, setSearchQuery] = useState("");

  const wordStudies = [
    {
      id: "1",
      english: "love",
      original: "ἀγαπάω",
      language: "Greek",
      transliteration: "agapaō",
      pronunciation: "a-ga-PA-oh",
      meaning:
        "Self-sacrificial, unconditional love; the highest form of love in the Bible",
      etymology:
        "From agapē (love), distinct from eros (romantic) and philia (friendship) love",
      usage: "Used 143 times in NT, often describing God's love for humanity",
      theology:
        "Reveals God's nature (1 John 4:8) and serves as model for Christian love",
      application:
        "Called to love God (Matt 22:37) and others (John 13:34) with this love",
      frequency: 143,
      firstUsage: "Matthew 5:44",
      keyVerses: ["John 3:16", "1 John 4:8", "Romans 5:8"],
      synonyms: ["φιλέω (phileō)", "στοργή (storgē)"],
      antonyms: ["μισέω (miseō) - hate"],
      cognates: ["agapē (noun)", "agapētos (beloved)"],
    },
    {
      id: "2",
      english: "world",
      original: "κόσμος",
      language: "Greek",
      transliteration: "kosmos",
      pronunciation: "KOS-mos",
      meaning: "The created order; humanity; system opposed to God",
      etymology: 'Originally meant "order, arrangement, ornament"',
      usage: "Used 186 times in NT with various meanings",
      theology: "God loves the world but calls believers out of the world",
      application: "In but not of the world (John 17:14-16)",
      frequency: 186,
      firstUsage: "Matthew 4:8",
      keyVerses: ["John 3:16", "1 John 2:15", "John 17:14"],
      synonyms: ["αἰών (aiōn) - age", "γῆ (gē) - earth"],
      antonyms: ["οὐρανός (ouranos) - heaven"],
      cognates: ["cosmos, cosmetic"],
    },
    {
      id: "3",
      english: "believe",
      original: "πιστεύω",
      language: "Greek",
      transliteration: "pisteuō",
      pronunciation: "pis-TYOO-oh",
      meaning: "To trust, rely upon, have faith in",
      etymology: "From pistis (faith, trust)",
      usage: "Used 241 times in NT, central to Gospel message",
      theology: "Saving faith involves knowledge, assent, and trust",
      application: "Active trust in Christ for salvation (Rom 10:9)",
      frequency: 241,
      firstUsage: "Matthew 8:13",
      keyVerses: ["John 3:16", "Romans 10:9", "James 2:19"],
      synonyms: ["πεϊθω (peithō) - persuade", "ἐλπίζω (elpizō) - hope"],
      antonyms: ["ἀπιστέω (apisteō) - disbelieve"],
      cognates: ["pistis (faith)", "pistos (faithful)"],
    },
  ];

  const selectedStudy =
    wordStudies.find((w) => w.original === selectedWord) || wordStudies[0];

  const tabs = [
    {
      id: "etymology",
      label: "Etymology",
      icon: <History className="h-4 w-4" />,
    },
    { id: "usage", label: "Usage", icon: <Hash className="h-4 w-4" /> },
    { id: "theology", label: "Theology", icon: <Brain className="h-4 w-4" /> },
    {
      id: "application",
      label: "Application",
      icon: <Zap className="h-4 w-4" />,
    },
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case "etymology":
        return (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50">
              <h4 className="font-bold text-slate-800 mb-2">Root Analysis</h4>
              <p className="text-slate-700">{selectedStudy.etymology}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
              <h4 className="font-bold text-slate-800 mb-2">
                Cognates & Derivatives
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedStudy.cognates.map((cognate, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-white border rounded-lg text-sm"
                  >
                    {cognate}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      case "usage":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50">
                <h4 className="font-bold text-slate-800 mb-2">NT Frequency</h4>
                <div className="text-3xl font-bold text-slate-800">
                  {selectedStudy.frequency}
                </div>
                <p className="text-sm text-slate-600">occurrences</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                <h4 className="font-bold text-slate-800 mb-2">First Usage</h4>
                <div className="text-xl font-bold text-slate-800">
                  {selectedStudy.firstUsage}
                </div>
                <p className="text-sm text-slate-600">in New Testament</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
              <h4 className="font-bold text-slate-800 mb-3">
                Synonyms & Antonyms
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Synonyms:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudy.synonyms.map((synonym, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm"
                      >
                        {synonym}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Antonyms:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudy.antonyms.map((antonym, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-rose-100 text-rose-700 rounded-lg text-sm"
                      >
                        {antonym}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "theology":
        return (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50">
              <h4 className="font-bold text-slate-800 mb-2">
                Theological Significance
              </h4>
              <p className="text-slate-700">{selectedStudy.theology}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
              <h4 className="font-bold text-slate-800 mb-3">
                Key Biblical References
              </h4>
              <div className="space-y-2">
                {selectedStudy.keyVerses.map((verse, idx) => (
                  <button
                    key={idx}
                    className="w-full p-3 rounded-lg bg-white border hover:border-purple-300 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">
                        {verse}
                      </span>
                      <LinkIcon className="h-4 w-4 text-slate-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case "application":
        return (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50">
              <h4 className="font-bold text-slate-800 mb-2">
                Practical Application
              </h4>
              <p className="text-slate-700">{selectedStudy.application}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
              <h4 className="font-bold text-slate-800 mb-3">Living This Out</h4>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white border">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span className="font-medium text-slate-800">
                      Today's Challenge
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    How can you demonstrate{" "}
                    {selectedStudy.english.toLowerCase()} in a specific
                    relationship today?
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white border">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-rose-500" />
                    <span className="font-medium text-slate-800">
                      Prayer Focus
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Ask God to help you understand and practice{" "}
                    {selectedStudy.english.toLowerCase()} more deeply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`space-y-6 ${
        isExpanded ? "fixed inset-0 z-50 bg-white p-6 overflow-auto" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <Brain className="h-8 w-8 text-purple-600" />
            Word Study
          </h2>
          <p className="text-slate-600 mt-1">
            Deep dive into original language words from {verse.book}{" "}
            {verse.chapter}:{verse.verse}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            {isExpanded ? (
              <Minimize2 className="h-5 w-5 text-slate-600" />
            ) : (
              <Maximize2 className="h-5 w-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Word Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wordStudies.map((word) => {
          const isSelected = selectedWord === word.original;

          return (
            <button
              key={word.id}
              onClick={() => setSelectedWord(word.original)}
              className={`p-6 rounded-2xl text-left transition-all ${
                isSelected
                  ? "ring-2 ring-purple-500 ring-offset-2 bg-gradient-to-br from-purple-50 to-indigo-50 scale-[1.02]"
                  : "bg-white border border-slate-200 hover:border-purple-300 hover:shadow-lg"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-slate-800 mb-1">
                    {word.original}
                  </div>
                  <div className="text-lg text-slate-600">{word.english}</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-100">
                  <Languages className="h-5 w-5 text-slate-600" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>Transliteration:</span>
                  <span className="font-medium">{word.transliteration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>Pronunciation:</span>
                  <span className="font-medium">{word.pronunciation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>Frequency:</span>
                  <span className="font-medium">{word.frequency}x in NT</span>
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Word Details */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Word Header */}
        <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-3xl font-bold text-slate-800">
                    {selectedStudy.original}
                  </h3>
                  <span className="px-3 py-1 bg-white border rounded-full text-sm">
                    {selectedStudy.language}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-slate-600">
                      {selectedStudy.english}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">
                      {selectedStudy.transliteration}
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-slate-600 hover:text-purple-600">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-sm">
                      {selectedStudy.pronunciation}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white rounded-lg">
                <Bookmark className="h-5 w-5 text-slate-500" />
              </button>
              <button className="p-2 hover:bg-white rounded-lg">
                <Copy className="h-5 w-5 text-slate-500" />
              </button>
              <button className="p-2 hover:bg-white rounded-lg">
                <Share2 className="h-5 w-5 text-slate-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Definition */}
        <div className="p-6 border-b">
          <h4 className="font-bold text-slate-800 mb-3">Primary Meaning</h4>
          <p className="text-lg text-slate-700 leading-relaxed">
            {selectedStudy.meaning}
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-purple-600 text-purple-600 bg-purple-50"
                    : "border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">{getTabContent()}</div>

        {/* Additional Resources */}
        <div className="p-6 border-t bg-gradient-to-r from-slate-50 to-slate-100">
          <h4 className="font-bold text-slate-800 mb-4">
            Additional Resources
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 rounded-xl bg-white border hover:border-purple-300 text-left">
              <div className="flex items-center gap-3 mb-2">
                <Layers className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-800">
                  Concordance Search
                </span>
              </div>
              <p className="text-sm text-slate-600">
                Find every occurrence of {selectedStudy.original} in Scripture
              </p>
            </button>

            <button className="p-4 rounded-xl bg-white border hover:border-purple-300 text-left">
              <div className="flex items-center gap-3 mb-2">
                <ExternalLink className="h-5 w-5 text-emerald-600" />
                <span className="font-medium text-slate-800">
                  Lexical Analysis
                </span>
              </div>
              <p className="text-sm text-slate-600">
                Detailed grammatical and syntactical analysis
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Word Comparison */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
        <div className="flex items-center gap-3 mb-6">
          <Layers className="h-6 w-6 text-amber-600" />
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Word Comparison
            </h3>
            <p className="text-slate-600">Compare similar Greek words</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-slate-700">
                  Greek Word
                </th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">
                  Transliteration
                </th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">
                  Meaning
                </th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">
                  Key Difference
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-white/50">
                <td className="py-3 px-4">
                  <span className="font-bold text-slate-800">ἀγαπάω</span>
                </td>
                <td className="py-3 px-4">agapaō</td>
                <td className="py-3 px-4">Self-sacrificial love</td>
                <td className="py-3 px-4">Highest form, unconditional</td>
              </tr>
              <tr className="border-b hover:bg-white/50">
                <td className="py-3 px-4">
                  <span className="font-bold text-slate-800">φιλέω</span>
                </td>
                <td className="py-3 px-4">phileō</td>
                <td className="py-3 px-4">Brotherly love, friendship</td>
                <td className="py-3 px-4">Mutual, affectionate love</td>
              </tr>
              <tr className="border-b hover:bg-white/50">
                <td className="py-3 px-4">
                  <span className="font-bold text-slate-800">στοργή</span>
                </td>
                <td className="py-3 px-4">storgē</td>
                <td className="py-3 px-4">Natural affection (family)</td>
                <td className="py-3 px-4">Instinctive, familial love</td>
              </tr>
              <tr className="hover:bg-white/50">
                <td className="py-3 px-4">
                  <span className="font-bold text-slate-800">ἔρως</span>
                </td>
                <td className="py-3 px-4">erōs</td>
                <td className="py-3 px-4">Romantic/sexual love</td>
                <td className="py-3 px-4">Not used in NT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 flex items-center gap-2">
          <Download className="h-5 w-5" />
          Download Study
        </button>

        <button className="px-6 py-3 border-2 border-purple-300 text-purple-600 rounded-xl hover:bg-purple-50 flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Generate Flashcard
        </button>

        <button className="px-6 py-3 border-2 border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 flex items-center gap-2">
          <ExternalLink className="h-5 w-5" />
          View in Lexicon
        </button>
      </div>

      {/* Quick Search */}
      <div className="p-4 rounded-xl bg-white border">
        <div className="flex items-center gap-3 mb-4">
          <Search className="h-5 w-5 text-slate-500" />
          <div>
            <h4 className="font-bold text-slate-800">Search Other Words</h4>
            <p className="text-sm text-slate-600">
              Look up any Greek or Hebrew word
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter Greek/Hebrew word or English meaning..."
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordStudyPanel;
