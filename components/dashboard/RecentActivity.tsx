// components/dashboard/RecentActivity.tsx
"use client";

import { useState } from "react";
import {
  BookOpen,
  MessageSquare,
  TrendingUp,
  Star,
  Clock,
  Filter,
  Zap,
  Sparkles,
  Heart,
  Bookmark,
  CheckCircle,
  Eye,
  Share2,
  Target,
} from "lucide-react";

interface Activity {
  id: string;
  type: "note" | "review" | "highlight" | "plan" | "streak" | "achievement";
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
  verse?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
  isNew?: boolean;
}

const RecentActivity = () => {
  const [filter, setFilter] = useState<
    "all" | "notes" | "reviews" | "achievements"
  >("all");

  const activities: Activity[] = [
    {
      id: "1",
      type: "note",
      title: "New insight on John 3:16",
      description:
        "Added a note about God's unconditional love and its implications for daily life.",
      timestamp: "2 hours ago",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-gradient-to-r from-purple-500 to-indigo-500",
      verse: "John 3:16",
      tags: ["love", "gospel", "salvation"],
      likes: 5,
      comments: 2,
      isNew: true,
    },
    {
      id: "2",
      type: "review",
      title: "Completed daily review",
      description:
        "Reviewed 15 notes using spaced repetition. Retention rate: 92%",
      timestamp: "4 hours ago",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
      tags: ["review", "memory"],
    },
    {
      id: "3",
      type: "achievement",
      title: "42 Day Streak! 🎯",
      description:
        "Maintained a consistent study habit for 42 consecutive days.",
      timestamp: "1 day ago",
      icon: <Zap className="h-5 w-5" />,
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
      isNew: true,
    },
    {
      id: "4",
      type: "highlight",
      title: "Verse highlighted",
      description: "Highlighted Romans 8:28 with personal application notes.",
      timestamp: "1 day ago",
      icon: <Star className="h-5 w-5" />,
      color: "bg-gradient-to-r from-rose-500 to-pink-500",
      verse: "Romans 8:28",
      tags: ["trust", "providence"],
    },
    {
      id: "5",
      type: "plan",
      title: "Started new reading plan",
      description: 'Began "Gospel in 30 Days" plan. Currently on Day 3.',
      timestamp: "2 days ago",
      icon: <Target className="h-5 w-5" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      id: "6",
      type: "streak",
      title: "Personal best",
      description: "Achieved longest study session: 2 hours 15 minutes.",
      timestamp: "3 days ago",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-gradient-to-r from-violet-500 to-purple-500",
    },
  ];

  const filteredActivities = activities.filter((activity) => {
    if (filter === "all") return true;
    if (filter === "notes") return activity.type === "note";
    if (filter === "reviews") return activity.type === "review";
    if (filter === "achievements")
      return ["achievement", "streak"].includes(activity.type);
    return true;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "note":
        return "Note Added";
      case "review":
        return "Review Completed";
      case "highlight":
        return "Verse Highlighted";
      case "plan":
        return "Plan Started";
      case "streak":
        return "Streak Achieved";
      case "achievement":
        return "Achievement Unlocked";
      default:
        return "Activity";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-amber-100 to-orange-100">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Recent Activity</h3>
            <p className="text-sm text-slate-600">
              Stay updated with your study journey
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              className="pl-10 pr-8 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="all">All Activity</option>
              <option value="notes">Notes</option>
              <option value="reviews">Reviews</option>
              <option value="achievements">Achievements</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-indigo-200 to-blue-200" />

        <div className="space-y-6">
          {filteredActivities.map((activity, index) => (
            <div key={activity.id} className="relative pl-16 group">
              {/* Timeline dot */}
              <div
                className={`absolute left-6 top-5 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg ${activity.color}`}
              >
                {activity.isNew && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                )}
              </div>

              {/* Activity Card */}
              <div
                className={`p-5 rounded-xl border transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5 ${
                  activity.isNew
                    ? "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${activity.color} text-white`}
                    >
                      {activity.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700">
                          {getTypeLabel(activity.type)}
                        </span>
                        {activity.isNew && (
                          <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {activity.verse && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                        {activity.verse}
                      </span>
                    )}
                    <button className="p-1 hover:bg-slate-100 rounded">
                      <Eye className="h-4 w-4 text-slate-500" />
                    </button>
                  </div>
                </div>

                <h4 className="font-bold text-slate-800 mb-2">
                  {activity.title}
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  {activity.description}
                </p>

                {/* Tags */}
                {activity.tags && activity.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activity.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs bg-slate-100 text-slate-700 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions & Stats */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-4">
                    {activity.likes !== undefined && (
                      <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-rose-600">
                        <Heart className="h-4 w-4" />
                        <span>{activity.likes}</span>
                      </button>
                    )}
                    {activity.comments !== undefined && (
                      <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>{activity.comments}</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg">
                      <Bookmark className="h-4 w-4 text-slate-500" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg">
                      <Share2 className="h-4 w-4 text-slate-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-8">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 mb-4">
            <Clock className="h-12 w-12 text-slate-400" />
          </div>
          <h4 className="text-lg font-semibold text-slate-700">
            No recent activity
          </h4>
          <p className="text-slate-600 mt-2">
            Start studying to see your activity here
          </p>
          <button className="mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 flex items-center gap-2 mx-auto">
            <Zap className="h-4 w-4" />
            Start Study Session
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="pt-6 border-t">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white">
                <Sparkles className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Today's Activity</p>
                <p className="text-xl font-bold text-slate-800">8 items</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Weekly Growth</p>
                <p className="text-xl font-bold text-slate-800">+24%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center">
        <button className="px-6 py-2.5 text-sm text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
