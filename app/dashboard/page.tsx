// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Flame,
  TrendingUp,
  BookOpen,
  Clock,
  Target,
  Sparkles,
  Users,
  Trophy,
  Calendar,
  Brain,
  Zap,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StudyTimeChart from "@/components/dashboard/StudyTimeChart";
import TopicCloud from "@/components/dashboard/TopicCloud";
import RecentActivity from "@/components/dashboard/RecentActivity";
import DailyVerse from "@/components/dashboard/DailyVerse";
import QuickActions from "@/components/dashboard/QuickActions";
import { DEMO_DATA } from "@/lib/demo-data/generate";
// import { DEMO_DATA } from "@/lib/demo-data";

export default function Dashboard() {
  const [studyTime, setStudyTime] = useState(0);

  useEffect(() => {
    // Simulate real-time study time
    const interval = setInterval(() => {
      setStudyTime((prev) => prev + 1);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: "Current Streak",
      value: "42 days",
      change: "+5",
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      color: "from-orange-500 to-amber-500",
      progress: 100,
    },
    {
      title: "Notes Created",
      value: "156",
      change: "+12 this month",
      icon: <BookOpen className="h-5 w-5 text-emerald-500" />,
      color: "from-emerald-500 to-teal-500",
      progress: 78,
    },
    {
      title: "Verses Memorized",
      value: "89",
      change: "On track for 100",
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      color: "from-purple-500 to-indigo-500",
      progress: 89,
    },
    {
      title: "Avg Study Time",
      value: "45 min/day",
      change: "+8 min from last week",
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      color: "from-blue-500 to-cyan-500",
      progress: 75,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome back, {DEMO_DATA.user.name} 👋
            </h1>
            <p className="text-slate-600 mt-2">
              Your Bible study journey today
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-70"></div>
              <div className="relative px-6 py-3 bg-white rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <span className="font-semibold">
                    {studyTime} min studying
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </p>
                  <div className="flex items-end gap-2 mt-2">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className="text-sm text-emerald-600 font-medium">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-full bg-gradient-to-br ${stat.color} text-white`}
                >
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4">
                <Progress value={stat.progress} className="h-2" />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Progress</span>
                  <span>{stat.progress}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Daily Verse Card */}
          <DailyVerse />

          {/* Study Time Chart */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  Study Analytics
                </h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-lg">
                    Weekly
                  </button>
                  <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
                    Monthly
                  </button>
                </div>
              </div>
              <StudyTimeChart />
            </CardContent>
          </Card>

          {/* Topic Cloud */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target className="h-5 w-5 text-rose-600" />
                Your Study Topics
              </h3>
              <TopicCloud topics={DEMO_DATA.topics} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Activity */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-600" />
                Recent Activity
              </h3>
              <RecentActivity />
            </CardContent>
          </Card>

          {/* Reading Plans */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-600" />
                Active Reading Plans
              </h3>
              <div className="space-y-4">
                {DEMO_DATA.readingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{plan.icon}</span>
                      <span className="text-sm font-semibold px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                        Day {plan.currentDay}/{plan.totalDays}
                      </span>
                    </div>
                    <h4 className="font-bold">{plan.name}</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {plan.description}
                    </p>
                    <div className="mt-4">
                      <Progress value={plan.progress} className="h-2" />
                      <div className="flex justify-between text-sm text-slate-500 mt-2">
                        <span>{plan.progress}% complete</span>
                        <span>{plan.today.timeEstimate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
