// components/review/StatsOverview.tsx
"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Brain,
  Clock,
  Calendar,
  Star,
  Award,
  Trophy,
  BarChart3,
  PieChart,
  Download,
  Share2,
  RefreshCw,
  Filter,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles,
  Crown,
  TargetIcon as TargetIconLucide,
  LineChart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

interface StatsOverviewProps {
  stats: {
    completed: number;
    correct: number;
    timeSpent: number;
    streak: number;
  };
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  const [showDetails, setShowDetails] = useState(false);
  const [activeChart, setActiveChart] = useState<"bar" | "line" | "area">(
    "bar"
  );

  // Mock data for charts
  const dailyData = [
    { day: "Mon", reviews: 24, accuracy: 92, time: 45 },
    { day: "Tue", reviews: 32, accuracy: 88, time: 52 },
    { day: "Wed", reviews: 28, accuracy: 94, time: 48 },
    { day: "Thu", reviews: 35, accuracy: 90, time: 55 },
    { day: "Fri", reviews: 26, accuracy: 87, time: 42 },
    { day: "Sat", reviews: 18, accuracy: 95, time: 38 },
    { day: "Sun", reviews: 22, accuracy: 91, time: 40 },
  ];

  const monthlyData = [
    { month: "Jan", reviews: 420, accuracy: 89 },
    { month: "Feb", reviews: 380, accuracy: 87 },
    { month: "Mar", reviews: 450, accuracy: 92 },
    { month: "Apr", reviews: 410, accuracy: 90 },
    { month: "May", reviews: 470, accuracy: 93 },
    { month: "Jun", reviews: 430, accuracy: 91 },
  ];

  const pieData = [
    { name: "Correct", value: stats.correct, color: "#10B981" },
    {
      name: "Incorrect",
      value: stats.completed - stats.correct,
      color: "#F43F5E",
    },
  ];

  const accuracyRate =
    stats.completed > 0
      ? Math.round((stats.correct / stats.completed) * 100)
      : 0;

  const avgTimePerReview =
    stats.completed > 0 ? Math.round(stats.timeSpent / stats.completed) : 0;

  const getTrendData = () => {
    return timeRange === "week" ? dailyData : monthlyData;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-bold text-slate-800">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-slate-600">
              <span className="font-medium">{payload[0].value}</span> reviews
            </p>
            <p className="text-sm text-emerald-600">
              {payload[1]?.value || 0}% accuracy
            </p>
            {timeRange === "week" && (
              <p className="text-sm text-blue-600">
                {payload[2]?.value || 0} min avg
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const exportStats = () => {
    const dataStr = JSON.stringify(
      {
        stats,
        dailyData,
        monthlyData,
        timestamp: new Date().toISOString(),
      },
      null,
      2
    );
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `review-stats-${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100">
            <BarChart3 className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Review Statistics</h3>
            <p className="text-sm text-slate-600">
              Track your progress and performance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportStats}
            className="p-2 hover:bg-slate-100 rounded-lg"
            title="Export Stats"
          >
            <Download className="h-5 w-5 text-slate-600" />
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            {showDetails ? (
              <ChevronUp className="h-5 w-5 text-slate-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Reviews</p>
              <h4 className="text-2xl font-bold text-slate-800 mt-1">
                {stats.completed}
              </h4>
            </div>
            <Target className="h-8 w-8 text-purple-600 opacity-70" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span className="text-sm text-emerald-600">
              +12% from last week
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Accuracy Rate</p>
              <h4 className="text-2xl font-bold text-slate-800 mt-1">
                {accuracyRate}%
              </h4>
            </div>
            <Brain className="h-8 w-8 text-emerald-600 opacity-70" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span className="text-sm text-emerald-600">+2% improvement</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Current Streak</p>
              <h4 className="text-2xl font-bold text-slate-800 mt-1">
                {stats.streak} days
              </h4>
            </div>
            <Zap className="h-8 w-8 text-amber-600 opacity-70" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Crown className="h-4 w-4 text-amber-600" />
            <span className="text-sm text-amber-600">Personal best!</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg Time/Review</p>
              <h4 className="text-2xl font-bold text-slate-800 mt-1">
                {avgTimePerReview}s
              </h4>
            </div>
            <Clock className="h-8 w-8 text-blue-600 opacity-70" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown className="h-4 w-4 text-emerald-600" />
            <span className="text-sm text-emerald-600">-3s faster</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {showDetails && (
        <div className="space-y-6">
          {/* Time Range Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex bg-slate-100 rounded-lg p-1">
                {["week", "month", "year"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range as any)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize ${
                      timeRange === range
                        ? "bg-white shadow text-purple-600"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>

              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveChart("bar")}
                  className={`p-2 rounded-md ${
                    activeChart === "bar"
                      ? "bg-white shadow"
                      : "hover:bg-slate-200"
                  }`}
                  title="Bar Chart"
                >
                  <BarChart3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveChart("line")}
                  className={`p-2 rounded-md ${
                    activeChart === "line"
                      ? "bg-white shadow"
                      : "hover:bg-slate-200"
                  }`}
                  title="Line Chart"
                >
                  <LineChart className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveChart("area")}
                  className={`p-2 rounded-md ${
                    activeChart === "area"
                      ? "bg-white shadow"
                      : "hover:bg-slate-200"
                  }`}
                  title="Area Chart"
                >
                  <TrendingUp className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Chart */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-800 mb-4">
                {timeRange === "week"
                  ? "Daily Review Performance"
                  : "Monthly Review Trends"}
              </h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {activeChart === "bar" ? (
                    <BarChart data={getTrendData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis
                        dataKey={timeRange === "week" ? "day" : "month"}
                        stroke="#64748B"
                        fontSize={12}
                      />
                      <YAxis stroke="#64748B" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="reviews"
                        fill="#7C3AED"
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                      />
                      <Bar
                        dataKey="accuracy"
                        fill="#10B981"
                        radius={[4, 4, 0, 0]}
                        barSize={20}
                      />
                    </BarChart>
                  ) : activeChart === "line" ? (
                    <RechartsLineChart data={getTrendData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis
                        dataKey={timeRange === "week" ? "day" : "month"}
                        stroke="#64748B"
                        fontSize={12}
                      />
                      <YAxis stroke="#64748B" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="reviews"
                        stroke="#7C3AED"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </RechartsLineChart>
                  ) : (
                    <AreaChart data={getTrendData()}>
                      <defs>
                        <linearGradient
                          id="reviewsGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#7C3AED"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#7C3AED"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="accuracyGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10B981"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10B981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis
                        dataKey={timeRange === "week" ? "day" : "month"}
                        stroke="#64748B"
                        fontSize={12}
                      />
                      <YAxis stroke="#64748B" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="reviews"
                        stroke="#7C3AED"
                        fill="url(#reviewsGradient)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#10B981"
                        fill="url(#accuracyGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            {/* Accuracy Pie Chart */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-800 mb-4">
                Accuracy Breakdown
              </h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} reviews`, "Count"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E2E8F0",
                        borderRadius: "8px",
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">
                    {stats.correct}
                  </div>
                  <div className="text-sm text-slate-600">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-600">
                    {stats.completed - stats.correct}
                  </div>
                  <div className="text-sm text-slate-600">
                    Incorrect Answers
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="h-5 w-5 text-slate-600" />
                <h4 className="font-bold text-slate-800">Review Consistency</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Current Streak</span>
                  <span className="font-bold text-slate-800">
                    {stats.streak} days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Longest Streak</span>
                  <span className="font-bold text-slate-800">42 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Days Active</span>
                  <span className="font-bold text-slate-800">24/30 days</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <Star className="h-5 w-5 text-slate-600" />
                <h4 className="font-bold text-slate-800">
                  Performance Insights
                </h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Best Day</span>
                  <span className="font-bold text-slate-800">Thursday</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Peak Time</span>
                  <span className="font-bold text-slate-800">Morning</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Top Accuracy</span>
                  <span className="font-bold text-emerald-600">95%</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <TargetIconLucide className="h-5 w-5 text-slate-600" />
                <h4 className="font-bold text-slate-800">Goals & Targets</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Daily Target</span>
                  <span className="font-bold text-slate-800">
                    25/30 reviews
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Accuracy Goal</span>
                  <span className="font-bold text-slate-800">
                    90% (Currently {accuracyRate}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    Weekly Progress
                  </span>
                  <span className="font-bold text-emerald-600">+8%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="h-6 w-6 text-amber-600" />
              <h4 className="font-bold text-slate-800">Recent Achievements</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-white text-center">
                <div className="inline-block p-2 rounded-full bg-amber-100 mb-2">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-sm font-medium text-slate-800">
                  7-Day Streak
                </div>
                <div className="text-xs text-slate-600">Unlocked yesterday</div>
              </div>

              <div className="p-3 rounded-lg bg-white text-center">
                <div className="inline-block p-2 rounded-full bg-emerald-100 mb-2">
                  <Target className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="text-sm font-medium text-slate-800">
                  Accuracy Master
                </div>
                <div className="text-xs text-slate-600">95%+ for 3 days</div>
              </div>

              <div className="p-3 rounded-lg bg-white text-center">
                <div className="inline-block p-2 rounded-full bg-purple-100 mb-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-sm font-medium text-slate-800">
                  Speed Demon
                </div>
                <div className="text-xs text-slate-600">&lt;30s avg review</div>
              </div>

              <div className="p-3 rounded-lg bg-white text-center">
                <div className="inline-block p-2 rounded-full bg-blue-100 mb-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-slate-800">
                  Consistency King
                </div>
                <div className="text-xs text-slate-600">30 days active</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Summary */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-800">Performance Summary</h4>
            <p className="text-sm text-slate-600 mt-1">
              You're making great progress! Keep up the consistent reviews.
            </p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700">
            View Detailed Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
