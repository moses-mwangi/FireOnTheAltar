// components/dashboard/QuickActions.tsx
"use client";

import { useState } from "react";
import {
  Plus,
  Zap,
  Target,
  BookOpen,
  Timer,
  Brain,
  FileText,
  Video,
  Mic,
  Image,
  Link as LinkIcon,
  ChevronRight,
  Check,
  Sparkles,
  Calendar,
  Users,
  Download,
  Upload,
} from "lucide-react";

const QuickActions = () => {
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const actions = [
    {
      id: "add-note",
      title: "Add New Note",
      description: "Record insights from today's reading",
      icon: <Plus className="h-5 w-5" />,
      color: "bg-gradient-to-r from-purple-500 to-indigo-500",
      timeEstimate: "2 min",
      shortcut: "N",
    },
    {
      id: "daily-review",
      title: "Daily Review",
      description: "18 notes due for spaced repetition",
      icon: <Brain className="h-5 w-5" />,
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
      timeEstimate: "5 min",
      badge: "18",
      priority: "high",
    },
    {
      id: "reading-plan",
      title: "Continue Reading",
      description: "John 3 - The New Birth",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      timeEstimate: "12 min",
      progress: 65,
    },
    {
      id: "quick-study",
      title: "5-Minute Study",
      description: "Focus on one verse with deep reflection",
      icon: <Timer className="h-5 w-5" />,
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
      timeEstimate: "5 min",
      shortcut: "Q",
    },
    {
      id: "verse-memorize",
      title: "Memorize Verse",
      description: "Psalm 23:1 - Start memory practice",
      icon: <Target className="h-5 w-5" />,
      color: "bg-gradient-to-r from-rose-500 to-pink-500",
      timeEstimate: "8 min",
    },
    {
      id: "audio-note",
      title: "Record Audio Note",
      description: "Capture thoughts while on the go",
      icon: <Mic className="h-5 w-5" />,
      color: "bg-gradient-to-r from-violet-500 to-purple-500",
      timeEstimate: "3 min",
    },
    {
      id: "topic-study",
      title: "Study Topic",
      description: 'Explore "God\'s Love" in depth',
      icon: <FileText className="h-5 w-5" />,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      timeEstimate: "15 min",
    },
    {
      id: "share-insight",
      title: "Share Insight",
      description: "Post to community discussion",
      icon: <Users className="h-5 w-5" />,
      color: "bg-gradient-to-r from-sky-500 to-blue-500",
      timeEstimate: "4 min",
    },
  ];

  const recentTools = [
    {
      id: "highlight-tool",
      name: "Verse Highlighter",
      icon: <Sparkles className="h-4 w-4" />,
      color: "text-amber-500",
      lastUsed: "2 hours ago",
    },
    {
      id: "cross-ref",
      name: "Cross References",
      icon: <LinkIcon className="h-4 w-4" />,
      color: "text-blue-500",
      lastUsed: "Yesterday",
    },
    {
      id: "word-study",
      name: "Word Study",
      icon: <BookOpen className="h-4 w-4" />,
      color: "text-emerald-500",
      lastUsed: "3 days ago",
    },
    {
      id: "export",
      name: "Export Notes",
      icon: <Download className="h-4 w-4" />,
      color: "text-purple-500",
      lastUsed: "1 week ago",
    },
  ];

  const handleActionClick = (actionId: string) => {
    if (!completedActions.includes(actionId)) {
      setCompletedActions([...completedActions, actionId]);
    }

    // Simulate action completion
    setTimeout(() => {
      // In real app, this would navigate or open a modal
      console.log(`Action clicked: ${actionId}`);
    }, 300);
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-300";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-300";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100">
            <Zap className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Quick Actions</h3>
            <p className="text-sm text-slate-600">Jump back into your study</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">
            {completedActions.length}/{actions.length} completed
          </span>
          <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{
                width: `${(completedActions.length / actions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => {
          const isCompleted = completedActions.includes(action.id);

          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.id)}
              className={`group relative p-4 rounded-xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                isCompleted
                  ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200"
                  : "bg-white border border-slate-200 hover:border-purple-300"
              }`}
            >
              {/* Completion Check */}
              {isCompleted && (
                <div className="absolute top-3 right-3 p-1 rounded-full bg-emerald-100">
                  <Check className="h-3 w-3 text-emerald-600" />
                </div>
              )}

              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`p-2.5 rounded-lg ${action.color} text-white`}>
                  {action.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`font-bold truncate ${
                        isCompleted ? "text-emerald-700" : "text-slate-800"
                      }`}
                    >
                      {action.title}
                    </h4>
                    {action.shortcut && !isCompleted && (
                      <span className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                        ⌘{action.shortcut}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 truncate mb-2">
                    {action.description}
                  </p>

                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full">
                      <Timer className="inline h-3 w-3 mr-1" />
                      {action.timeEstimate}
                    </span>

                    {action.badge && !isCompleted && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                          action.priority
                        )}`}
                      >
                        {action.badge} due
                      </span>
                    )}

                    {action.progress && (
                      <div className="flex-1 max-w-16">
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                            style={{ width: `${action.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Hover Arrow */}
              <ChevronRight
                className={`absolute right-3 bottom-3 h-4 w-4 ${
                  isCompleted ? "text-emerald-400" : "text-slate-400"
                } opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              {/* Glow Effect */}
              {!isCompleted && (
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity"
                  style={{
                    background: action.color.replace(
                      "bg-gradient-to-r",
                      "linear-gradient"
                    ),
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Recent Tools */}
      <div className="pt-6 border-t">
        <h4 className="font-semibold text-slate-700 mb-4">Recent Tools</h4>
        <div className="grid grid-cols-2 gap-3">
          {recentTools.map((tool) => (
            <button
              key={tool.id}
              className="p-3 rounded-lg bg-gradient-to-r from-slate-50 to-white border hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-white ${tool.color}`}>
                  {tool.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium text-slate-800">{tool.name}</div>
                  <div className="text-xs text-slate-500">{tool.lastUsed}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white">
              <Calendar className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Today's Goal</p>
              <p className="text-lg font-bold text-slate-800">4/5 items</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white">
              <Sparkles className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Weekly Streak</p>
              <p className="text-lg font-bold text-slate-800">7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Start Session Button */}
      <button className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
        <Zap className="h-5 w-5" />
        Start Focus Session
        <span className="text-sm opacity-90">(25 min)</span>
      </button>
    </div>
  );
};

export default QuickActions;
