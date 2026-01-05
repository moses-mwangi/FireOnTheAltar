// components/dashboard/StudyTimeChart.tsx
"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { Calendar, TrendingUp, Clock, Zap } from "lucide-react";

const generateStudyData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, index) => ({
    day,
    studyTime: Math.floor(Math.random() * 120) + 30,
    notes: Math.floor(Math.random() * 8) + 2,
    reviews: Math.floor(Math.random() * 15) + 5,
    focusScore: Math.floor(Math.random() * 40) + 60,
    color: [
      "#7C3AED", // Monday - Purple
      "#4F46E5", // Tuesday - Indigo
      "#10B981", // Wednesday - Emerald
      "#F59E0B", // Thursday - Amber
      "#F43F5E", // Friday - Rose
      "#8B5CF6", // Saturday - Violet
      "#06B6D4", // Sunday - Cyan
    ][index],
  }));
};

const StudyTimeChart = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [chartType, setChartType] = useState<"bar" | "area">("bar");

  const data = generateStudyData();
  const totalStudyTime = data.reduce((sum, item) => sum + item.studyTime, 0);
  const avgStudyTime = Math.round(totalStudyTime / data.length);
  const maxStudyTime = Math.max(...data.map((item) => item.studyTime));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border">
          <p className="font-bold text-slate-800">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-slate-600 flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span className="font-medium">{payload[0].value} min study</span>
            </p>
            <p className="text-sm text-slate-600">
              📝 {payload[1]?.value || 0} notes created
            </p>
            <p className="text-sm text-slate-600">
              🔄 {payload[2]?.value || 0} reviews completed
            </p>
            <p className="text-sm text-emerald-600 font-medium">
              🎯 Focus score: {payload[3]?.value || 0}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Study Analytics</h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />
              <span className="text-sm text-slate-600">Study Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
              <span className="text-sm text-slate-600">Notes Created</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-1">
            {["week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  timeRange === range
                    ? "bg-white shadow text-purple-600"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setChartType("bar")}
              className={`p-2 rounded-md ${
                chartType === "bar" ? "bg-white shadow" : "hover:bg-slate-200"
              }`}
            >
              📊
            </button>
            <button
              onClick={() => setChartType("area")}
              className={`p-2 rounded-md ${
                chartType === "area" ? "bg-white shadow" : "hover:bg-slate-200"
              }`}
            >
              📈
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Study Time</p>
              <h4 className="text-2xl font-bold text-slate-800 mt-1">
                {totalStudyTime} min
              </h4>
            </div>
            <Clock className="h-8 w-8 text-purple-500 opacity-70" />
          </div>
          <p className="text-sm text-purple-600 mt-2">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +12% from last week
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Daily Average</p>
              <h4 className="text-2xl font-bold text-slate-800 mt-1">
                {avgStudyTime} min/day
              </h4>
            </div>
            <Calendar className="h-8 w-8 text-emerald-500 opacity-70" />
          </div>
          <p className="text-sm text-emerald-600 mt-2">
            Consistent for 3 weeks
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Peak Performance</p>
              <h4 className="text-2xl font-bold text-slate-800 mt-1">
                {maxStudyTime} min
              </h4>
            </div>
            <Zap className="h-8 w-8 text-amber-500 opacity-70" />
          </div>
          <p className="text-sm text-amber-600 mt-2">
            On {data.find((d) => d.studyTime === maxStudyTime)?.day}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E2E8F0"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 12 }}
                label={{
                  value: "Minutes",
                  angle: -90,
                  position: "insideLeft",
                  offset: -10,
                  style: { fill: "#64748B", fontSize: 12 },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="studyTime" radius={[6, 6, 0, 0]} barSize={40}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
              <Bar
                dataKey="notes"
                radius={[6, 6, 0, 0]}
                barSize={20}
                fill="#10B981"
                opacity={0.8}
              />
            </BarChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="studyTimeGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="notesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="studyTime"
                stroke="#7C3AED"
                strokeWidth={3}
                fill="url(#studyTimeGradient)"
                fillOpacity={1}
              />
              <Area
                type="monotone"
                dataKey="notes"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#notesGradient)"
                fillOpacity={1}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Day Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-slate-700">Daily Breakdown</h4>
          <span className="text-sm text-slate-500">Click for details</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {data.map((day, index) => (
            <button
              key={day.day}
              className="group relative p-3 rounded-xl bg-gradient-to-b from-white to-slate-50 hover:shadow-lg transition-all"
              style={{ borderTop: `4px solid ${day.color}` }}
            >
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600">{day.day}</p>
                <p className="text-xl font-bold mt-1 text-slate-800">
                  {day.studyTime}
                </p>
                <p className="text-xs text-slate-500 mt-1">min</p>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-1 left-2 right-2 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(day.studyTime / maxStudyTime) * 100}%`,
                    backgroundColor: day.color,
                  }}
                />
              </div>

              {/* Hover tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                <div className="flex items-center gap-1">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: day.color }}
                  />
                  {day.studyTime} min study
                </div>
                <div className="text-emerald-300 mt-1">
                  {day.notes} notes • {day.reviews} reviews
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyTimeChart;
