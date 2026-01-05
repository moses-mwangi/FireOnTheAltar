// components/bible/VerseCard.tsx
"use client";

import { useState } from "react";
import {
  Bookmark,
  Heart,
  Share2,
  Copy,
  MessageSquare,
  Highlighter,
  Volume2,
  MoreVertical,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Sparkles,
  Brain,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface VerseCardProps {
  verse: {
    id: string;
    book: string;
    chapter: number;
    verse: number;
    text: string;
    translation: string;
    originalText?: string;
    originalLanguage?: "Greek" | "Hebrew";
    highlights?: Array<{
      type: "theological" | "historical" | "application" | "personal";
      color: string;
      text: string;
    }>;
    notes?: number;
    tags?: string[];
    wordStudies?: Array<{
      word: string;
      original: string;
      meaning: string;
      pronunciation?: string;
    }>;
  };
  isSelected?: boolean;
  onSelect?: (verse: any) => void;
  showOriginal?: boolean;
  showHighlights?: boolean;
}

const VerseCard: React.FC<VerseCardProps> = ({
  verse,
  isSelected = false,
  onSelect,
  showOriginal = false,
  showHighlights = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showWordStudy, setShowWordStudy] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${verse.book} ${verse.chapter}:${verse.verse} - ${verse.text}`
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${verse.book} ${verse.chapter}:${verse.verse}`,
          text: verse.text,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      handleCopy();
    }
  };

  const highlightColors: Record<string, string> = {
    theological: "bg-purple-100 border-l-4 border-purple-500",
    historical: "bg-amber-100 border-l-4 border-amber-500",
    application: "bg-emerald-100 border-l-4 border-emerald-500",
    personal: "bg-rose-100 border-l-4 border-rose-500",
  };

  const highlightIcons: Record<string, JSX.Element> = {
    theological: <Brain className="h-4 w-4 text-purple-600" />,
    historical: <BookOpen className="h-4 w-4 text-amber-600" />,
    application: <Zap className="h-4 w-4 text-emerald-600" />,
    personal: <Sparkles className="h-4 w-4 text-rose-600" />,
  };

  return (
    <div
      className={`group relative p-6 rounded-2xl transition-all duration-300 ${
        isSelected
          ? "bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 shadow-lg scale-[1.02]"
          : "bg-white border border-slate-200 hover:border-purple-300 hover:shadow-lg"
      }`}
      onClick={() => onSelect?.(verse)}
    >
      {/* Verse Reference Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              isSelected
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                : "bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700"
            }`}
          >
            {verse.book} {verse.chapter}:{verse.verse}
          </div>

          <span className="text-sm text-slate-500">{verse.translation}</span>

          {verse.originalLanguage && (
            <span className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full">
              {verse.originalLanguage}
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsBookmarked(!isBookmarked);
            }}
            className={`p-2 rounded-lg hover:bg-slate-100 ${
              isBookmarked ? "text-purple-600" : "text-slate-500"
            }`}
          >
            <Bookmark
              className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
            />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowWordStudy(!showWordStudy);
            }}
            className={`p-2 rounded-lg hover:bg-slate-100 ${
              showWordStudy ? "text-emerald-600" : "text-slate-500"
            }`}
          >
            <Brain className="h-4 w-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Verse Text */}
      <div className="mb-4">
        <p className="text-lg leading-relaxed text-slate-800 font-serif">
          {verse.text}
        </p>

        {/* Original Language Text */}
        {showOriginal && verse.originalText && (
          <div className="mt-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-slate-700">
                {verse.originalLanguage} Original
              </span>
              <span className="text-xs text-slate-500">• Transliteration</span>
            </div>
            <p className="text-slate-700 font-serif text-right">
              {verse.originalText}
            </p>
          </div>
        )}
      </div>

      {/* Word Study Panel */}
      {showWordStudy && verse.wordStudies && (
        <div className="mb-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="h-5 w-5 text-emerald-600" />
            <h4 className="font-semibold text-slate-800">Word Study</h4>
          </div>

          <div className="space-y-3">
            {verse.wordStudies.slice(0, 2).map((wordStudy, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-bold text-slate-800">
                      {wordStudy.word}
                    </span>
                    <span className="text-sm text-slate-500 ml-2">
                      {wordStudy.original} ({verse.originalLanguage})
                    </span>
                  </div>
                  {wordStudy.pronunciation && (
                    <button className="p-1 hover:bg-slate-100 rounded">
                      <Volume2 className="h-4 w-4 text-slate-500" />
                    </button>
                  )}
                </div>
                <p className="text-sm text-slate-600">{wordStudy.meaning}</p>
              </div>
            ))}

            {verse.wordStudies.length > 2 && (
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                +{verse.wordStudies.length - 2} more word studies
              </button>
            )}
          </div>
        </div>
      )}

      {/* Highlights */}
      {showHighlights && verse.highlights && verse.highlights.length > 0 && (
        <div className="mb-4 space-y-2">
          {verse.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg ${
                highlightColors[highlight.type] || "bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {highlightIcons[highlight.type]}
                <span className="text-sm font-medium capitalize text-slate-700">
                  {highlight.type} Insight
                </span>
              </div>
              <p className="text-sm text-slate-600">{highlight.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      {verse.tags && verse.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {verse.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-full border"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
          {/* Study Tools */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Add note functionality
              }}
              className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 hover:border-blue-300"
            >
              <MessageSquare className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <span className="text-xs font-medium text-slate-700">
                Add Note
              </span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                // Highlight functionality
              }}
              className="p-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 hover:border-amber-300"
            >
              <Highlighter className="h-5 w-5 text-amber-600 mx-auto mb-1" />
              <span className="text-xs font-medium text-slate-700">
                Highlight
              </span>
            </button>

            <button
              onClick={handleShare}
              className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-300"
            >
              <Share2 className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-xs font-medium text-slate-700">Share</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 hover:border-purple-300"
            >
              {isCopied ? (
                <span className="h-5 w-5 text-emerald-600 mx-auto mb-1 block">
                  ✓
                </span>
              ) : (
                <Copy className="h-5 w-5 text-purple-600 mx-auto mb-1" />
              )}
              <span className="text-xs font-medium text-slate-700">
                {isCopied ? "Copied!" : "Copy"}
              </span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="p-3 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-800">
                    {verse.notes || 0}
                  </div>
                  <div className="text-xs text-slate-500">Notes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-800">
                    {verse.highlights?.length || 0}
                  </div>
                  <div className="text-xs text-slate-500">Highlights</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-800">
                    {verse.wordStudies?.length || 0}
                  </div>
                  <div className="text-xs text-slate-500">Word Studies</div>
                </div>
              </div>

              <button className="p-2 hover:bg-white rounded-lg">
                <MoreVertical className="h-5 w-5 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`flex items-center gap-1 text-sm ${
              isLiked ? "text-rose-600" : "text-slate-500 hover:text-rose-600"
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            <span>Like</span>
          </button>

          <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600">
            <LinkIcon className="h-4 w-4" />
            <span>Cross-ref</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            Last studied: 2 days ago
          </span>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse" />
        </div>
      )}

      {/* Glow Effect on Hover */}
      {!isSelected && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      )}
    </div>
  );
};

export default VerseCard;
