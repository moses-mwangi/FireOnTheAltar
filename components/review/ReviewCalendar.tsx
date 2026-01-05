// components/review/ReviewCalendar.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Flame,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Filter,
  Download,
  Maximize2,
  Minimize2,
  RefreshCw,
  Settings,
  Info,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const ReviewCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week" | "year">("month");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [heatmapIntensity, setHeatmapIntensity] = useState<
    "low" | "medium" | "high"
  >("medium");

  // Generate calendar data
  const generateMonthData = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    const today = new Date();

    // Previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date,
        isCurrentMonth: false,
        reviews: Math.floor(Math.random() * 10),
        accuracy: Math.floor(Math.random() * 30) + 70,
        streak: Math.floor(Math.random() * 3),
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today && !isToday;

      // Generate realistic review data
      const baseReviews = isPast ? Math.floor(Math.random() * 40) : 0;
      const streakBonus = Math.floor(Math.random() * 5);
      const accuracy = Math.floor(Math.random() * 20) + 75;

      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isPast,
        reviews: baseReviews + streakBonus,
        accuracy,
        streak: Math.floor(Math.random() * 7) + 1,
        completed: baseReviews > 0,
      });
    }

    // Next month's days
    const totalCells = 42; // 6 weeks
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        reviews: 0,
        accuracy: 0,
        streak: 0,
      });
    }

    return days;
  };

  const [calendarDays, setCalendarDays] = useState(generateMonthData());

  useEffect(() => {
    setCalendarDays(generateMonthData());
  }, [currentMonth]);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + (direction === "next" ? 1 : -1));
      return newMonth;
    });
  };

  const navigateToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  const getHeatmapColor = (reviews: number) => {
    if (reviews === 0) return "bg-slate-100";

    const intensity =
      heatmapIntensity === "low"
        ? 100
        : heatmapIntensity === "medium"
        ? 50
        : 20;

    if (reviews >= 30)
      return `bg-gradient-to-br from-emerald-${intensity} to-teal-${intensity}`;
    if (reviews >= 20)
      return `bg-gradient-to-br from-emerald-${intensity - 20} to-teal-${
        intensity - 20
      }`;
    if (reviews >= 10)
      return `bg-gradient-to-br from-emerald-${intensity - 40} to-teal-${
        intensity - 40
      }`;
    return `bg-gradient-to-br from-emerald-${intensity - 60} to-teal-${
      intensity - 60
    }`;
  };

  const getDayStats = (date: Date) => {
    return calendarDays.find(
      (day) => day.date.toDateString() === date.toDateString()
    );
  };

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const selectedDayStats = selectedDate ? getDayStats(selectedDate) : null;

  const totalReviews = calendarDays
    .filter((day) => day.isCurrentMonth && day.completed)
    .reduce((sum, day) => sum + day.reviews, 0);

  const avgAccuracy =
    calendarDays
      .filter((day) => day.isCurrentMonth && day.completed)
      .reduce((sum, day) => sum + day.accuracy, 0) /
      calendarDays.filter((day) => day.isCurrentMonth && day.completed)
        .length || 0;

  const currentStreak = calendarDays
    .filter((day) => day.isCurrentMonth)
    .reduce((streak, day) => (day.completed ? streak + 1 : 0), 0);

  return (
    <div
      className={`space-y-6 ${
        isFullscreen ? "fixed inset-0 z-50 bg-white p-6 overflow-auto" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100">
            <CalendarIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Review Calendar</h3>
            <p className="text-sm text-slate-600">
              Track your study consistency over time
            </p>
          </div>
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
          <button
            onClick={() => setShowStats(!showStats)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <BarChart3 className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>

          <h2 className="text-xl font-bold text-slate-800">{monthName}</h2>

          <button
            onClick={() => navigateMonth("next")}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <ChevronRight className="h-5 w-5 text-slate-600" />
          </button>

          <button
            onClick={navigateToToday}
            className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700"
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-1">
            {["month", "week", "year"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize ${
                  viewMode === mode
                    ? "bg-white shadow text-purple-600"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button className="p-2 hover:bg-slate-100 rounded-lg">
            <Settings className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Monthly Reviews</p>
                <h4 className="text-2xl font-bold text-slate-800 mt-1">
                  {totalReviews}
                </h4>
              </div>
              <Target className="h-8 w-8 text-purple-600 opacity-70" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-sm text-emerald-600">
                On track for 1,000+
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg. Accuracy</p>
                <h4 className="text-2xl font-bold text-slate-800 mt-1">
                  {avgAccuracy.toFixed(1)}%
                </h4>
              </div>
              <Star className="h-8 w-8 text-emerald-600 opacity-70" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-sm text-emerald-600">
                +2.5% from last month
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Current Streak</p>
                <h4 className="text-2xl font-bold text-slate-800 mt-1">
                  {currentStreak} days
                </h4>
              </div>
              <Flame className="h-8 w-8 text-amber-600 opacity-70" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Zap className="h-4 w-4 text-amber-600" />
              <span className="text-sm text-amber-600">Keep going!</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Consistency</p>
                <h4 className="text-2xl font-bold text-slate-800 mt-1">
                  {Math.round(
                    (calendarDays.filter((d) => d.completed).length /
                      calendarDays.filter((d) => d.isCurrentMonth).length) *
                      100
                  )}
                  %
                </h4>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600 opacity-70" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-sm text-emerald-600">
                Excellent consistency
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div key={day} className="text-center">
              <div className="text-sm font-medium text-slate-600">{day}</div>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const isSelected =
              selectedDate &&
              selectedDate.toDateString() === day.date.toDateString();

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day.date)}
                className={`relative p-4 rounded-xl transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-purple-500 ring-offset-1 scale-105"
                    : "hover:scale-102 hover:shadow-md"
                } ${!day.isCurrentMonth ? "opacity-40" : ""} ${
                  day.isToday ? "bg-gradient-to-br from-blue-50 to-cyan-50" : ""
                }`}
              >
                {/* Date Number */}
                <div
                  className={`text-center font-medium ${
                    day.isCurrentMonth ? "text-slate-800" : "text-slate-400"
                  }`}
                >
                  {day.date.getDate()}
                </div>

                {/* Heatmap */}
                {day.isCurrentMonth && (
                  <div
                    className={`mt-2 h-2 rounded-full ${getHeatmapColor(
                      day.reviews
                    )}`}
                  />
                )}

                {/* Review Count */}
                {day.reviews > 0 && (
                  <div className="mt-2 text-xs text-center">
                    <div className="font-bold text-slate-700">
                      {day.reviews}
                    </div>
                    <div className="text-slate-500">reviews</div>
                  </div>
                )}

                {/* Streak Indicator */}
                {day.streak > 3 && (
                  <div className="absolute top-1 right-1">
                    <Flame className="h-3 w-3 text-amber-500" />
                  </div>
                )}

                {/* Completion Indicator */}
                {day.completed && (
                  <div className="absolute bottom-1 right-1">
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-slate-700">
                  Heatmap Intensity:
                </div>
                <div className="flex bg-slate-100 rounded-lg p-1">
                  {["low", "medium", "high"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setHeatmapIntensity(level as any)}
                      className={`px-3 py-1 text-sm rounded-md capitalize ${
                        heatmapIntensity === level
                          ? "bg-white shadow text-purple-600"
                          : "text-slate-600 hover:text-slate-800"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-100" />
                  <span className="text-xs text-slate-600">0-10 reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-300" />
                  <span className="text-xs text-slate-600">10-20 reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-600">20-30+ reviews</span>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDate && selectedDayStats && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Day Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
                <p className="text-slate-600 mt-1">
                  {selectedDayStats.isToday
                    ? "Today"
                    : selectedDayStats.isPast
                    ? "Past day"
                    : "Future day"}
                </p>
              </div>
              {selectedDayStats.isToday && (
                <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm">
                  Today
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Reviews Completed</p>
                    <h4 className="text-3xl font-bold text-slate-800 mt-1">
                      {selectedDayStats.reviews}
                    </h4>
                  </div>
                  <Target className="h-8 w-8 text-purple-600 opacity-70" />
                </div>
                {selectedDayStats.reviews > 0 ? (
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-emerald-600">
                      Daily goal achieved
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 mt-2">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-amber-600">
                      No reviews completed
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Accuracy Rate</p>
                    <h4 className="text-3xl font-bold text-slate-800 mt-1">
                      {selectedDayStats.accuracy}%
                    </h4>
                  </div>
                  <Star className="h-8 w-8 text-emerald-600 opacity-70" />
                </div>
                {selectedDayStats.accuracy >= 90 ? (
                  <div className="flex items-center gap-1 mt-2">
                    <Sparkles className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-emerald-600">
                      Excellent accuracy!
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 mt-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-slate-600">
                      Good performance
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Streak Status</p>
                    <h4 className="text-3xl font-bold text-slate-800 mt-1">
                      {selectedDayStats.streak} days
                    </h4>
                  </div>
                  <Flame className="h-8 w-8 text-amber-600 opacity-70" />
                </div>
                {selectedDayStats.streak > 5 ? (
                  <div className="flex items-center gap-1 mt-2">
                    <Zap className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-amber-600">
                      Amazing streak!
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-emerald-600">
                      Keep it up!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Review Session Details */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                Review Sessions
              </h3>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700">
                Add Session
              </button>
            </div>

            {selectedDayStats.reviews > 0 ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">
                          Morning Session
                        </h4>
                        <p className="text-sm text-slate-600">
                          7:30 AM • 25 minutes
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">
                        92%
                      </div>
                      <div className="text-sm text-slate-600">Accuracy</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">18</div>
                      <div className="text-xs text-slate-600">Cards</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">
                        24s
                      </div>
                      <div className="text-xs text-slate-600">Avg Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">15</div>
                      <div className="text-xs text-slate-600">Correct</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white">
                        <Clock className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">
                          Evening Session
                        </h4>
                        <p className="text-sm text-slate-600">
                          8:15 PM • 18 minutes
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">
                        88%
                      </div>
                      <div className="text-sm text-slate-600">Accuracy</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">12</div>
                      <div className="text-xs text-slate-600">Cards</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">
                        32s
                      </div>
                      <div className="text-xs text-slate-600">Avg Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">10</div>
                      <div className="text-xs text-slate-600">Correct</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-amber-600" />
                    <div>
                      <h4 className="font-bold text-slate-800">
                        Daily Insights
                      </h4>
                      <p className="text-sm text-slate-600">
                        You were most focused during morning sessions. Try
                        scheduling important reviews for early in the day.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-200 mb-4">
                  <CalendarIcon className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  No Reviews This Day
                </h3>
                <p className="text-slate-600 mb-6">
                  Take a moment to review some notes from this day or schedule
                  future reviews.
                </p>
                <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700">
                  Schedule Reviews
                </button>
              </div>
            )}

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50">
                <div className="text-sm text-slate-600">Total Time</div>
                <div className="text-lg font-bold text-slate-800">43 min</div>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="text-sm text-slate-600">Efficiency</div>
                <div className="text-lg font-bold text-slate-800">89%</div>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="text-sm text-slate-600">Focus Score</div>
                <div className="text-lg font-bold text-slate-800">92</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Heatmap Legend */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-800">Calendar Legend</h4>
            <p className="text-sm text-slate-600 mt-1">
              Darker colors indicate more reviews completed
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-slate-600">Active streak day</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span className="text-sm text-slate-600">Reviews completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-slate-600">Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCalendar;
