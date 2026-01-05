// components/notes/NoteCard.tsx
"use client";

import { useState } from "react";
import {
  Edit2,
  Trash2,
  Star,
  Share2,
  Eye,
  EyeOff,
  Tag,
  Bookmark,
  Calendar,
  Clock,
  MoreVertical,
  ChevronRight,
  Sparkles,
  Brain,
  Link as LinkIcon,
  Zap,
  Heart,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string;
    verse: string;
    book: string;
    chapter: number;
    verseStart: number;
    verseEnd?: number;
    tags: string[];
    color: string;
    insights: string[];
    applications: string[];
    connections: string[];
    dateCreated: Date;
    lastReviewed: Date;
    reviewStats: {
      nextReview: Date;
      interval: number;
      easeFactor: number;
      streak: number;
    };
    media?: {
      type: "image" | "audio" | "link";
      url: string;
      thumbnail?: string;
    }[];
  };
  viewMode?: "grid" | "list";
  isSelected?: boolean;
  onSelect?: (note: any) => void;
  onEdit?: (note: any) => void;
  onDelete?: (noteId: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  viewMode = "grid",
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showMedia, setShowMedia] = useState(true);

  const handleCopy = async () => {
    const text = `${note.title}\n${note.verse}\n\n${note.content}`;
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: note.title,
          text: note.content.substring(0, 100) + "...",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      handleCopy();
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const daysUntilReview = () => {
    const today = new Date();
    const nextReview = new Date(note.reviewStats.nextReview);
    const diffTime = nextReview.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getReviewPriority = () => {
    const days = daysUntilReview();
    if (days <= 0) return { color: "bg-red-500", label: "Due Now" };
    if (days <= 1) return { color: "bg-amber-500", label: "Due Tomorrow" };
    if (days <= 3) return { color: "bg-yellow-500", label: "Due Soon" };
    return { color: "bg-emerald-500", label: "On Schedule" };
  };

  const priority = getReviewPriority();

  if (viewMode === "list") {
    return (
      <div
        className={`group relative p-4 rounded-xl border transition-all duration-300 ${
          isSelected
            ? "border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50"
            : "border-slate-200 hover:border-purple-300 hover:shadow-md"
        }`}
        onClick={() => onSelect?.(note)}
      >
        <div className="flex items-start gap-4">
          {/* Verse Reference */}
          <div className="flex-shrink-0">
            <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium">
              {note.verse}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-slate-800 truncate">
                {note.title}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${priority.color} text-white`}
                >
                  {priority.label}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsStarred(!isStarred);
                  }}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <Star
                    className={`h-4 w-4 ${
                      isStarred
                        ? "fill-current text-amber-500"
                        : "text-slate-400"
                    }`}
                  />
                </button>
              </div>
            </div>

            <p className="text-sm text-slate-600 line-clamp-2 mb-3">
              {note.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {note.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {note.tags.length > 3 && (
                <span className="px-2 py-1 text-xs text-slate-500">
                  +{note.tags.length - 3} more
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(note.dateCreated)}
                </div>
                <div className="flex items-center gap-1">
                  <Brain className="h-3 w-3" />
                  {note.reviewStats.streak} reviews
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(note);
                  }}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <Edit2 className="h-4 w-4 text-slate-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(note.id);
                  }}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <Trash2 className="h-4 w-4 text-slate-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse" />
          </div>
        )}
      </div>
    );
  }

  // Grid View
  return (
    <div
      className={`group relative p-5 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
        isSelected
          ? "border-purple-500 ring-2 ring-purple-500 ring-offset-1 bg-gradient-to-br from-purple-50 to-indigo-50 scale-[1.02]"
          : "border-slate-200 hover:border-purple-300"
      }`}
      style={{ borderLeft: `4px solid ${note.color.split(" ")[2]}` }}
      onClick={() => onSelect?.(note)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-sm font-medium">
              {note.verse}
            </span>
            <span className="text-sm text-slate-500">
              {note.book} {note.chapter}:{note.verseStart}
              {note.verseEnd && `-${note.verseEnd}`}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 truncate">
            {note.title}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsStarred(!isStarred);
            }}
            className={`p-1.5 rounded-lg ${
              isStarred
                ? "bg-amber-50 text-amber-600"
                : "text-slate-400 hover:bg-slate-100"
            }`}
          >
            <Star className={`h-4 w-4 ${isStarred ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
          >
            {isExpanded ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Content Preview */}
      <div className="mb-4">
        <p className="text-slate-700 line-clamp-3 mb-3">{note.content}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {note.tags.slice(0, 4).map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 text-xs bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-full border"
          >
            #{tag}
          </span>
        ))}
        {note.tags.length > 4 && (
          <span className="px-2.5 py-1 text-xs text-slate-500">
            +{note.tags.length - 4}
          </span>
        )}
      </div>

      {/* Media Preview */}
      {showMedia && note.media && note.media.length > 0 && (
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {note.media.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border"
              >
                {item.type === "image" ? (
                  <img
                    src={item.thumbnail || item.url}
                    alt="Note attachment"
                    className="w-full h-full object-cover"
                  />
                ) : item.type === "audio" ? (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                    <LinkIcon className="h-6 w-6 text-emerald-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Stats */}
      <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span className="font-medium">Next Review</span>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${priority.color} text-white`}
            >
              {priority.label}
            </span>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Retention</div>
            <div className="font-bold text-emerald-600">
              {Math.round(note.reviewStats.easeFactor * 40)}%
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
          {/* Insights */}
          {note.insights.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Key Insights
              </h4>
              <ul className="space-y-1">
                {note.insights.slice(0, 2).map((insight, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-slate-600 pl-4 border-l-2 border-amber-300"
                  >
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Applications */}
          {note.applications.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-500" />
                Applications
              </h4>
              <ul className="space-y-1">
                {note.applications.slice(0, 2).map((app, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-slate-600 pl-4 border-l-2 border-emerald-300"
                  >
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              className="p-2 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 hover:bg-slate-200"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-emerald-600 mx-auto" />
              ) : (
                <Copy className="h-4 w-4 text-slate-600 mx-auto" />
              )}
              <span className="text-xs mt-1 block text-center">
                {isCopied ? "Copied!" : "Copy"}
              </span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="p-2 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 hover:bg-slate-200"
            >
              <Share2 className="h-4 w-4 text-slate-600 mx-auto" />
              <span className="text-xs mt-1 block text-center">Share</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(note);
              }}
              className="p-2 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 hover:bg-slate-200"
            >
              <Edit2 className="h-4 w-4 text-slate-600 mx-auto" />
              <span className="text-xs mt-1 block text-center">Edit</span>
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="h-4 w-4" />
          {formatDate(note.dateCreated)}
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(note);
            }}
            className="p-1.5 hover:bg-slate-100 rounded-lg"
          >
            <Edit2 className="h-4 w-4 text-slate-500" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(note.id);
            }}
            className="p-1.5 hover:bg-slate-100 rounded-lg"
          >
            <Trash2 className="h-4 w-4 text-slate-500" />
          </button>
          <button className="p-1.5 hover:bg-slate-100 rounded-lg">
            <MoreVertical className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse" />
        </div>
      )}

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </div>
  );
};

export default NoteCard;
