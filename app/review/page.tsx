// app/review/page.tsx
"use client";

import { useState } from "react";
import {
  Brain,
  Timer,
  Target,
  Zap,
  BarChart3,
  RotateCcw,
  CheckCircle,
  XCircle,
  HelpCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ReviewSession from "@/components/review/ReviewSession";
import StatsOverview from "@/components/review/StatsOverview";
import ReviewCalendar from "@/components/review/ReviewCalendar";
import { DEMO_DATA } from "@/lib/demo-data/generate";

const REVIEW_MODES = [
  {
    id: "flashcards",
    name: "Flashcards",
    icon: <Brain className="h-6 w-6" />,
    description: "Classic spaced repetition",
    color: "from-purple-500 to-indigo-500",
    stats: { active: 24, due: 18 },
  },
  {
    id: "quiz",
    name: "Verse Quiz",
    icon: <Target className="h-6 w-6" />,
    description: "Test your memory",
    color: "from-emerald-500 to-teal-500",
    stats: { active: 12, due: 8 },
  },
  {
    id: "fill",
    name: "Fill in Blanks",
    icon: <RotateCcw className="h-6 w-6" />,
    description: "Complete the verse",
    color: "from-amber-500 to-orange-500",
    stats: { active: 15, due: 10 },
  },
  {
    id: "matching",
    name: "Verse Matching",
    icon: <Zap className="h-6 w-6" />,
    description: "Match verses to references",
    color: "from-rose-500 to-pink-500",
    stats: { active: 20, due: 12 },
  },
];

export default function ReviewPage() {
  const [activeMode, setActiveMode] = useState("flashcards");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    completed: 0,
    correct: 0,
    timeSpent: 0,
    streak: 0,
  });

  const dueNotes = DEMO_DATA.notes.filter(
    (note) => new Date(note.reviewStats.nextReview) <= new Date()
  );

  const handleReviewComplete = (quality: number) => {
    setSessionStats((prev) => ({
      ...prev,
      completed: prev.completed + 1,
      correct: quality >= 3 ? prev.correct + 1 : prev.correct,
      streak: quality >= 3 ? prev.streak + 1 : 0,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/20">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Active Review Session
          </h1>
          <p className="text-slate-600 mt-2">
            Using spaced repetition to optimize your memory retention
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Due Today</p>
                  <h3 className="text-2xl font-bold mt-2">{dueNotes.length}</h3>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
              <Progress value={75} className="mt-4 h-2" />
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Retention Rate</p>
                  <h3 className="text-2xl font-bold mt-2">89%</h3>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
              <div className="text-sm text-emerald-600 mt-2">
                +2% from last week
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Current Streak</p>
                  <h3 className="text-2xl font-bold mt-2">42 days</h3>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
              <div className="text-sm text-amber-600 mt-2">Personal best!</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Avg. Time/Review</p>
                  <h3 className="text-2xl font-bold mt-2">45s</h3>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white">
                  <Timer className="h-6 w-6" />
                </div>
              </div>
              <div className="text-sm text-rose-600 mt-2">-5s faster</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Review Session */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-xl">
              <CardContent className="p-6">
                {sessionStarted ? (
                  <ReviewSession
                    mode={activeMode}
                    notes={dueNotes}
                    onComplete={handleReviewComplete}
                    onEnd={() => setSessionStarted(false)}
                    sessionStats={sessionStats}
                  />
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 mb-6">
                      <Brain className="h-16 w-16 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">
                      Ready to Review?
                    </h2>
                    <p className="text-slate-600 mb-8 max-w-md mx-auto">
                      You have {dueNotes.length} items due for review. Start
                      your session to optimize long-term memory retention.
                    </p>
                    <button
                      onClick={() => setSessionStarted(true)}
                      className="px-8 py-4 text-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 shadow-lg transition-all hover:scale-105"
                    >
                      Start Review Session
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Review Calendar */}
            <div className="mt-8">
              <ReviewCalendar />
            </div>
          </div>

          {/* Right Column - Modes & Stats */}
          <div className="space-y-6">
            {/* Review Modes */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Review Modes</h3>
                <div className="space-y-4">
                  {REVIEW_MODES.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setActiveMode(mode.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all hover:scale-[1.02] ${
                        activeMode === mode.id
                          ? "ring-2 ring-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-br ${mode.color} text-white`}
                        >
                          {mode.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold">{mode.name}</h4>
                            <span className="text-sm font-medium px-2 py-1 rounded-full bg-slate-100">
                              {mode.stats.due} due
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">
                            {mode.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Session Stats */}
            <StatsOverview stats={sessionStats} />

            {/* Quick Actions */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                    <CheckCircle className="h-5 w-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">
                      Mark All Reviewed
                    </span>
                  </button>
                  <button className="p-4 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors">
                    <HelpCircle className="h-5 w-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">
                      Adjust Difficulty
                    </span>
                  </button>
                  <button className="p-4 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                    <RotateCcw className="h-5 w-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">Reset Progress</span>
                  </button>
                  <button className="p-4 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors">
                    <XCircle className="h-5 w-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">End Session</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
