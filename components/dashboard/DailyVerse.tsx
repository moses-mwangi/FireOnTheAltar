// components/dashboard/DailyVerse.tsx
"use client";

import { useState } from "react";
import {
  BookOpen,
  Volume2,
  Share2,
  Bookmark,
  Heart,
  Copy,
  Maximize2,
  ExternalLink,
  Sparkles,
  Brain,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

const DailyVerse = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [translation, setTranslation] = useState<"NIV" | "ESV" | "KJV">("NIV");
  const [showInsights, setShowInsights] = useState(true);

  const verses = [
    {
      id: 1,
      reference: "John 3:16",
      text: {
        NIV: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        ESV: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
        KJV: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      },
      theme: "God's Love & Salvation",
      insights: [
        'The Greek word for "so loved" (οὕτως ἠγάπησεν) indicates the manner and extent of God\'s love',
        '"World" (κόσμος) emphasizes God\'s love for all humanity, not just a select group',
        'The purpose clause "that whoever believes" shows salvation is available to all through faith',
      ],
      applications: [
        "Reflect on the cost of your salvation today",
        "Share this hope with someone who needs to hear it",
        "Live in gratitude for this incredible gift",
      ],
      crossReferences: ["Romans 5:8", "1 John 4:9-10", "Ephesians 2:4-5"],
      tags: ["salvation", "love", "gospel", "faith"],
      color: "from-rose-500 to-red-500",
    },
    {
      id: 2,
      reference: "Philippians 4:13",
      text: {
        NIV: "I can do all this through him who gives me strength.",
        ESV: "I can do all things through him who strengthens me.",
        KJV: "I can do all things through Christ which strengtheneth me.",
      },
      theme: "Strength in Christ",
      insights: [
        "This verse comes in context of learning contentment in all circumstances",
        "The strength mentioned is specifically for doing God's will",
        "It's not about personal achievement but Christ-enabled endurance",
      ],
      applications: [
        "Trust Christ for strength in your current challenges",
        "Practice contentment in your present situation",
        "Depend on God's power rather than your own",
      ],
      crossReferences: [
        "2 Corinthians 12:9-10",
        "Isaiah 40:29",
        "Ephesians 6:10",
      ],
      tags: ["strength", "contentment", "faith", "perseverance"],
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: 3,
      reference: "Psalm 23:1",
      text: {
        NIV: "The LORD is my shepherd, I lack nothing.",
        ESV: "The LORD is my shepherd; I shall not want.",
        KJV: "The LORD is my shepherd; I shall not want.",
      },
      theme: "God's Provision & Guidance",
      insights: [
        "Shepherd imagery shows God's personal care and guidance",
        "Ancient shepherds led their sheep to green pastures and still waters",
        "The statement implies complete trust and surrender to God's leading",
      ],
      applications: [
        "Trust God to meet your needs today",
        "Follow His guidance in your decisions",
        "Rest in His care and provision",
      ],
      crossReferences: ["John 10:11", "Isaiah 40:11", "Hebrews 13:20"],
      tags: ["trust", "provision", "guidance", "peace"],
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const [currentVerse, setCurrentVerse] = useState(0);
  const verse = verses[currentVerse];

  const handleNext = () => {
    setCurrentVerse((prev) => (prev + 1) % verses.length);
  };

  const handlePrevious = () => {
    setCurrentVerse((prev) => (prev - 1 + verses.length) % verses.length);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Verse of the Day: ${verse.reference}`,
          text: `${verse.reference} - ${verse.text[translation]}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(
        `${verse.reference}\n${verse.text[translation]}\n\nShared from Bible Study Hub`
      );
      alert("Verse copied to clipboard!");
    }
  };

  return (
    <div
      className={`bg-gradient-to-br ${verse.color} rounded-2xl shadow-xl overflow-hidden`}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />

      <div className="relative p-8 text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Verse of the Day</h2>
              <p className="text-white/80">
                Fresh inspiration for your journey
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Verse Reference & Theme */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold">{verse.reference}</h3>
            <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm">
              {verse.theme}
            </span>
          </div>
        </div>

        {/* Verse Text */}
        <div className="mb-8">
          <div className="text-2xl leading-relaxed mb-4 font-serif">
            "{verse.text[translation]}"
          </div>

          {/* Translation Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-80">Translation:</span>
            <div className="flex bg-white/20 backdrop-blur-sm rounded-lg p-1">
              {(["NIV", "ESV", "KJV"] as const).map((trans) => (
                <button
                  key={trans}
                  onClick={() => setTranslation(trans)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    translation === trans
                      ? "bg-white text-slate-900"
                      : "hover:bg-white/30"
                  }`}
                >
                  {trans}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrevious}
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {verses.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentVerse(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentVerse
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Toggle Insights */}
        <button
          onClick={() => setShowInsights(!showInsights)}
          className="w-full mb-6 p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <span className="font-medium">Study Insights</span>
            </div>
            <span className="text-sm opacity-80">
              {showInsights ? "Hide" : "Show"} Details
            </span>
          </div>
        </button>

        {/* Insights Panel */}
        {showInsights && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-6 animate-in slide-in-from-bottom-4">
            {/* Key Insights */}
            <div>
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Key Insights
              </h4>
              <ul className="space-y-2">
                {verse.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Applications */}
            <div>
              <h4 className="font-bold mb-3">Practical Applications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {verse.applications.map((app, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white/10 border border-white/20"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">✨</span>
                      <span className="font-medium">Today</span>
                    </div>
                    <p className="text-sm">{app}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross References */}
            <div>
              <h4 className="font-bold mb-3">Cross References</h4>
              <div className="flex flex-wrap gap-2">
                {verse.crossReferences.map((ref, idx) => (
                  <button
                    key={idx}
                    className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-sm"
                  >
                    {ref}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="font-bold mb-3">Topics</h4>
              <div className="flex flex-wrap gap-2">
                {verse.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white/20 text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button className="p-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 flex flex-col items-center gap-1">
            <Volume2 className="h-5 w-5" />
            <span className="text-xs">Listen</span>
          </button>
          <button className="p-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 flex flex-col items-center gap-1">
            <Copy className="h-5 w-5" />
            <span className="text-xs">Copy</span>
          </button>
          <button className="p-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 flex flex-col items-center gap-1">
            <Bookmark className="h-5 w-5" />
            <span className="text-xs">Save</span>
          </button>
          <button className="p-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 flex flex-col items-center gap-1">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyVerse;
