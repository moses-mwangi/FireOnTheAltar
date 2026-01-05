// app/topics/page.tsx
"use client";

import { useState } from "react";
import {
  Layers,
  Link as LinkIcon,
  TrendingUp,
  BookOpen,
  Users,
  Zap,
  ChevronRight,
  Network,
  Filter,
  Grid,
  List,
  Plus,
} from "lucide-react";
import TopicGraph from "@/components/topics/TopicGraph";
import TopicCard from "@/components/topics/TopicCard";
import VerseExplorer from "@/components/topics/VerseExplorer";
import { DEMO_DATA } from "@/lib/demo-data/generate";
import { Card, CardContent } from "@/components/ui/card";

export default function TopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState(DEMO_DATA.topics[0]);
  const [viewMode, setViewMode] = useState<"graph" | "grid" | "list">("graph");
  const [searchQuery, setSearchQuery] = useState("");

  const connections = [
    {
      from: "Grace & Mercy",
      to: "God's Love",
      strength: 0.9,
      type: "theological",
    },
    {
      from: "Faith & Trust",
      to: "Prayer & Worship",
      strength: 0.7,
      type: "practical",
    },
    {
      from: "Kingdom of God",
      to: "Faith & Trust",
      strength: 0.8,
      type: "theological",
    },
    {
      from: "God's Love",
      to: "Prayer & Worship",
      strength: 0.6,
      type: "devotional",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/20">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Theological Topics
              </h1>
              <p className="text-slate-600 mt-2">
                Explore interconnected biblical themes and doctrines
              </p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 shadow-lg flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Topic Map
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode("graph")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                viewMode === "graph"
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Network className="h-4 w-4" />
              Graph View
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                viewMode === "grid"
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Grid className="h-4 w-4" />
              Grid View
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                viewMode === "list"
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <List className="h-4 w-4" />
              List View
            </button>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search topics or verses..."
              className="px-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === "graph" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Graph Visualization */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Network className="h-5 w-5 text-emerald-600" />
                      Topic Relationships
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">
                        5 topics • 8 connections
                      </span>
                    </div>
                  </div>
                  <TopicGraph
                    topics={DEMO_DATA.topics}
                    connections={connections}
                  />
                </CardContent>
              </Card>

              {/* Topic Details */}
              {selectedTopic && (
                <div className="mt-8">
                  <Card className="border-none shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">
                              {selectedTopic.icon}
                            </span>
                            <h3 className="text-2xl font-bold">
                              {selectedTopic.name}
                            </h3>
                          </div>
                          <p className="text-slate-600">
                            {selectedTopic.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                            {selectedTopic.notesCount} notes
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold mb-3 text-slate-700">
                            Key Verses
                          </h4>
                          <div className="space-y-2">
                            {selectedTopic.verses.map((verse, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer"
                              >
                                <div className="font-medium">{verse}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold mb-3 text-slate-700">
                            Sub-topics
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedTopic.subTopics?.map((subTopic, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200"
                              >
                                {subTopic}
                              </span>
                            ))}
                          </div>

                          <h4 className="font-bold mt-6 mb-3 text-slate-700">
                            Related Topics
                          </h4>
                          <div className="space-y-2">
                            {DEMO_DATA.topics
                              .filter((t) => t.id !== selectedTopic.id)
                              .slice(0, 3)
                              .map((topic) => (
                                <button
                                  key={topic.id}
                                  onClick={() => setSelectedTopic(topic)}
                                  className="w-full p-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-left flex items-center justify-between"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-xl">
                                      {topic.icon}
                                    </span>
                                    <span className="font-medium">
                                      {topic.name}
                                    </span>
                                  </div>
                                  <ChevronRight className="h-4 w-4 text-slate-400" />
                                </button>
                              ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Topic List */}
            <div>
              <Card className="border-none shadow-xl sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">All Topics</h3>
                  <div className="space-y-4">
                    {DEMO_DATA.topics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic)}
                        className={`w-full p-4 rounded-xl text-left transition-all hover:scale-[1.02] ${
                          selectedTopic.id === topic.id
                            ? "ring-2 ring-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{topic.icon}</span>
                            <div>
                              <h4 className="font-bold">{topic.name}</h4>
                              <p className="text-sm text-slate-600">
                                {topic.notesCount} notes
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                        </div>
                        <div className="mt-3">
                          <div className={`h-2 rounded-full ${topic.color}`} />
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_DATA.topics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                isSelected={selectedTopic.id === topic.id}
                onSelect={setSelectedTopic}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {DEMO_DATA.topics.map((topic) => (
              <div
                key={topic.id}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{topic.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold">{topic.name}</h3>
                      <p className="text-slate-600">{topic.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">
                      {topic.notesCount}
                    </div>
                    <div className="text-sm text-slate-500">notes</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <VerseExplorer />
    </div>
  );
}
