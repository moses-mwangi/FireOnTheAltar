// components/dashboard/TopicCloud.tsx
"use client";

import { useState } from "react";
import {
  Tag,
  TrendingUp,
  Hash,
  Plus,
  Filter,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface Topic {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  notesCount: number;
  verses: string[];
  subTopics?: string[];
}

interface TopicCloudProps {
  topics: Topic[];
}

const TopicCloud = ({ topics }: TopicCloudProps) => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "recent" | "name">(
    "popular"
  );

  // Calculate size based on notes count
  const getTopicSize = (notesCount: number) => {
    if (notesCount > 20) return "text-2xl font-bold";
    if (notesCount > 10) return "text-xl font-semibold";
    if (notesCount > 5) return "text-lg font-medium";
    return "text-base";
  };

  const filteredTopics = topics
    .filter(
      (topic) =>
        topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.subTopics?.some((st) =>
          st.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.notesCount - a.notesCount;
        case "recent":
          return b.notesCount - a.notesCount; // In real app, use dates
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100">
            <Tag className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Study Topics</h3>
            <p className="text-sm text-slate-600">
              {topics.length} topics •{" "}
              {topics.reduce((sum, t) => sum + t.notesCount, 0)} total notes
            </p>
          </div>
        </div>

        <button className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Topic
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search topics..."
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>

        <div className="flex bg-slate-100 rounded-lg p-1">
          {["popular", "recent", "name"].map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort as any)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                sortBy === sort
                  ? "bg-white shadow text-purple-600"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              {sort}
            </button>
          ))}
        </div>
      </div>

      {/* Topic Cloud */}
      <div className="relative min-h-[400px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className={`group relative p-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                selectedTopic?.id === topic.id
                  ? "ring-2 ring-purple-500 ring-offset-2"
                  : ""
              }`}
              style={{
                background: `linear-gradient(135deg, ${
                  topic.color.split(" ")[2]
                }22, ${topic.color.split(" ")[6]}22)`,
                border: `1px solid ${topic.color.split(" ")[2]}33`,
              }}
            >
              {/* Topic Icon */}
              <div className="mb-3">
                <div
                  className={`inline-flex items-center justify-center p-3 rounded-xl ${
                    colorMap[topic.color]
                  } text-white`}
                >
                  <span className="text-xl">{topic.icon}</span>
                </div>
              </div>

              {/* Topic Name */}
              <h4
                className={`font-bold text-slate-800 mb-1 ${getTopicSize(
                  topic.notesCount
                )}`}
              >
                {topic.name}
              </h4>

              {/* Description */}
              <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                {topic.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Tag className="h-3 w-3" />
                  <span className="font-medium">{topic.notesCount}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>Active</span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Glow Effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${
                    topic.color.split(" ")[2]
                  }, ${topic.color.split(" ")[6]})`,
                }}
              />
            </button>
          ))}
        </div>

        {/* Add Topic Button */}
        <button className="absolute bottom-0 right-0 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-300 hover:border-purple-400 hover:bg-slate-50 transition-all group">
          <div className="flex flex-col items-center justify-center w-16 h-16">
            <div className="p-2 rounded-lg bg-slate-200 group-hover:bg-purple-100 transition-colors">
              <Plus className="h-5 w-5 text-slate-600 group-hover:text-purple-600" />
            </div>
            <span className="text-xs text-slate-600 mt-2 group-hover:text-purple-600">
              Add Topic
            </span>
          </div>
        </button>
      </div>

      {/* Selected Topic Detail */}
      {selectedTopic && (
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-xl ${
                  colorMap[selectedTopic.color]
                } text-white`}
              >
                <span className="text-2xl">{selectedTopic.icon}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">
                  {selectedTopic.name}
                </h3>
                <p className="text-slate-600 mt-1">
                  {selectedTopic.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedTopic(null)}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Verses */}
            <div>
              <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Key Verses
              </h4>
              <div className="space-y-2">
                {selectedTopic.verses.slice(0, 3).map((verse, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-gradient-to-r from-slate-50 to-white border hover:border-purple-300 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">
                        {verse}
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-purple-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-topics */}
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">
                Related Sub-topics
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTopic.subTopics?.map((subTopic, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full text-sm bg-gradient-to-r from-slate-100 to-slate-50 border text-slate-700 hover:border-purple-300 transition-colors"
                  >
                    {subTopic}
                  </span>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                  <p className="text-xs text-slate-600">Notes</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {selectedTopic.notesCount}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50">
                  <p className="text-xs text-slate-600">Last Studied</p>
                  <p className="text-lg font-bold text-slate-800">2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t">
            <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700">
              Explore Topic
            </button>
            <button className="flex-1 px-4 py-2.5 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50">
              Add to Study Plan
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 mb-4">
            <Tag className="h-12 w-12 text-slate-400" />
          </div>
          <h4 className="text-lg font-semibold text-slate-700">
            No topics found
          </h4>
          <p className="text-slate-600 mt-2">
            Try a different search term or create a new topic
          </p>
          <button className="mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700">
            Create New Topic
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicCloud;
