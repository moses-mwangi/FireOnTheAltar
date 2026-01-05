// components/topics/TopicCard.tsx
"use client";

import { useState } from "react";
import {
  ChevronRight,
  Star,
  Users,
  Zap,
  BookOpen,
  Target,
  TrendingUp,
  Share2,
  Bookmark,
  MoreVertical,
  Eye,
  EyeOff,
  Sparkles,
  Brain,
  Link as LinkIcon,
  Clock,
  Hash,
} from "lucide-react";

interface TopicCardProps {
  topic: {
    id: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    notesCount: number;
    verses: string[];
    subTopics?: string[];
  };
  isSelected?: boolean;
  onSelect?: (topic: any) => void;
  viewMode?: "grid" | "list" | "detailed";
}

const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  isSelected = false,
  onSelect,
  viewMode = "grid",
}) => {
  const [isStarred, setIsStarred] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const colorMap: { [key: string]: string } = {
    "from-purple-500 to-pink-500":
      "bg-gradient-to-r from-purple-500 to-pink-500",
    "from-emerald-500 to-teal-500":
      "bg-gradient-to-r from-emerald-500 to-teal-500",
    "from-rose-500 to-red-500": "bg-gradient-to-r from-rose-500 to-red-500",
    "from-amber-500 to-orange-500":
      "bg-gradient-to-r from-amber-500 to-orange-500",
    "from-blue-500 to-indigo-500":
      "bg-gradient-to-r from-blue-500 to-indigo-500",
  };

  const bgColorMap: { [key: string]: string } = {
    "from-purple-500 to-pink-500": "bg-gradient-to-r from-purple-50 to-pink-50",
    "from-emerald-500 to-teal-500":
      "bg-gradient-to-r from-emerald-50 to-teal-50",
    "from-rose-500 to-red-500": "bg-gradient-to-r from-rose-50 to-red-50",
    "from-amber-500 to-orange-500":
      "bg-gradient-to-r from-amber-50 to-orange-50",
    "from-blue-500 to-indigo-500": "bg-gradient-to-r from-blue-50 to-indigo-50",
  };

  const getActivityLevel = () => {
    if (topic.notesCount > 20)
      return { level: "High", color: "text-emerald-600", bg: "bg-emerald-100" };
    if (topic.notesCount > 10)
      return { level: "Medium", color: "text-amber-600", bg: "bg-amber-100" };
    return { level: "Low", color: "text-slate-600", bg: "bg-slate-100" };
  };

  const activity = getActivityLevel();

  if (viewMode === "list") {
    return (
      <div
        className={`group relative p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
          isSelected
            ? "border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50"
            : "border-slate-200 hover:border-purple-300"
        }`}
        onClick={() => onSelect?.(topic)}
      >
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className={`p-3 rounded-xl ${colorMap[topic.color]} text-white`}>
            <span className="text-xl">{topic.icon}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-800 truncate">
                {topic.name}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${activity.bg} ${activity.color}`}
                >
                  {activity.level} Activity
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

            <p className="text-sm text-slate-600 truncate mb-2">
              {topic.description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                <span>{topic.notesCount} notes</span>
              </div>
              <div className="flex items-center gap-1">
                <Hash className="h-3 w-3" />
                <span>{topic.subTopics?.length || 0} sub-topics</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>+12% this month</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-purple-500" />
        </div>
      </div>
    );
  }

  // Grid View (default)
  return (
    <div
      className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
        isSelected
          ? "border-purple-500 ring-2 ring-purple-500 ring-offset-1 scale-[1.02]"
          : "border-slate-200 hover:border-purple-300"
      } ${bgColorMap[topic.color]}`}
      onClick={() => onSelect?.(topic)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${colorMap[topic.color]} text-white`}>
            <span className="text-2xl">{topic.icon}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">{topic.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-1 text-xs rounded-full ${activity.bg} ${activity.color}`}
              >
                {activity.level} Activity
              </span>
              <span className="text-xs text-slate-500">
                {topic.notesCount} notes
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsStarred(!isStarred);
            }}
            className={`p-2 rounded-lg ${
              isStarred
                ? "bg-amber-50 text-amber-600"
                : "text-slate-500 hover:bg-white/50"
            }`}
          >
            <Star className={`h-4 w-4 ${isStarred ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsBookmarked(!isBookmarked);
            }}
            className={`p-2 rounded-lg ${
              isBookmarked
                ? "bg-purple-50 text-purple-600"
                : "text-slate-500 hover:bg-white/50"
            }`}
          >
            <Bookmark
              className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-slate-700">{topic.description}</p>
      </div>

      {/* Key Verses */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">
          Key Verses
        </h4>
        <div className="space-y-2">
          {topic.verses.slice(0, 2).map((verse, idx) => (
            <div
              key={idx}
              className="p-2 rounded-lg bg-white/70 border border-white hover:border-purple-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-800">{verse}</span>
                <LinkIcon className="h-3 w-3 text-slate-400" />
              </div>
            </div>
          ))}
          {topic.verses.length > 2 && (
            <button className="text-sm text-purple-600 hover:text-purple-700">
              +{topic.verses.length - 2} more verses
            </button>
          )}
        </div>
      </div>

      {/* Sub-topics */}
      {topic.subTopics && topic.subTopics.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">
            Sub-topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {topic.subTopics.slice(0, 3).map((subTopic, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs bg-white/70 text-slate-700 rounded-full border border-white"
              >
                {subTopic}
              </span>
            ))}
            {topic.subTopics.length > 3 && (
              <span className="px-2 py-1 text-xs text-slate-500">
                +{topic.subTopics.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="mt-6 pt-6 border-t border-white/50">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-slate-800">
              {topic.notesCount}
            </div>
            <div className="text-xs text-slate-600">Notes</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-slate-800">
              {topic.subTopics?.length || 0}
            </div>
            <div className="text-xs text-slate-600">Sub-topics</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">+12%</div>
            <div className="text-xs text-slate-600">Growth</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/50">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800">
            <Eye className="h-4 w-4" />
            <span>Explore</span>
          </button>
          <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-purple-600">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          {isExpanded ? "Show Less" : "More Details"}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-white/50 space-y-4">
          {/* Activity Timeline */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              Recent Activity
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-slate-500" />
                  <span>Last studied</span>
                </div>
                <span className="font-medium">2 days ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-slate-500" />
                  <span>Monthly trend</span>
                </div>
                <span className="font-medium text-emerald-600">+24% notes</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-white/70 border">
              <div className="flex items-center gap-2 mb-1">
                <Brain className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Depth</span>
              </div>
              <div className="text-xs text-slate-600">
                Deep theological study
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/70 border">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium">Application</span>
              </div>
              <div className="text-xs text-slate-600">High practical value</div>
            </div>
          </div>

          {/* Study Button */}
          <button className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700">
            Start Topic Study
          </button>
        </div>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse" />
        </div>
      )}

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default TopicCard;
