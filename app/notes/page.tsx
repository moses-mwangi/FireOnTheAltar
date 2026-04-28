// app/notes/page.tsx
"use client";

import { useState } from "react";
import {
  Plus,
  Filter,
  Grid,
  List,
  Search,
  Tag,
  Image,
  Mic,
  Paperclip,
  Sparkles,
  Brain,
  Zap,
  Palette,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NoteCard from "@/components/notes/NoteCard";
import NoteEditor from "@/components/notes/NoteEditor";
import { DEMO_DATA } from "@/lib/data/bible/demo-data/generate";

const FILTER_OPTIONS = [
  { id: "all", label: "All Notes", count: 156 },
  { id: "recent", label: "Recently Added", count: 24 },
  { id: "review", label: "Needs Review", count: 18 },
  { id: "favorites", label: "Favorites", count: 12 },
  { id: "topics", label: "By Topic", count: 5 },
];

const SORT_OPTIONS = [
  { id: "recent", label: "Recently Updated" },
  { id: "created", label: "Date Created" },
  { id: "title", label: "Title" },
  { id: "book", label: "Book Order" },
  { id: "review", label: "Next Review" },
];

export default function NotesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedNote, setSelectedNote] = useState(DEMO_DATA.notes[0]);

  const filteredNotes = DEMO_DATA.notes
    .filter((note) => {
      if (selectedFilter === "review") {
        return new Date(note.reviewStats.nextReview) <= new Date();
      }
      if (selectedFilter === "favorites") {
        return note.tags.includes("favorite");
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.dateCreated).getTime() -
            new Date(a.dateCreated).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "book":
          return a.book.localeCompare(b.book);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                My Study Notes
              </h1>
              <p className="text-slate-600 mt-2">
                {filteredNotes.length} notes • Organized by topic and review
                schedule
              </p>
            </div>
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Note
            </Button>
          </div>

          {/* Filters & Search */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search notes, verses, or tags..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedFilter === filter.id
                      ? "bg-purple-100 text-purple-700 border border-purple-300"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {filter.label}
                  <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-slate-200">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {isCreating ? (
          <NoteEditor onClose={() => setIsCreating(false)} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Notes List */}
            <div className={`lg:col-span-${selectedNote ? "2" : "3"}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {selectedFilter === "all"
                    ? "All Notes"
                    : selectedFilter === "review"
                      ? "Notes Due for Review"
                      : selectedFilter.charAt(0).toUpperCase() +
                        selectedFilter.slice(1)}
                </h2>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-lg px-3 py-1.5 text-sm"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      Sort by: {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      viewMode="grid"
                      isSelected={selectedNote?.id === note.id}
                      onSelect={setSelectedNote}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      viewMode="list"
                      isSelected={selectedNote?.id === note.id}
                      onSelect={setSelectedNote}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Note Detail View */}
            {selectedNote && (
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-white rounded-2xl shadow-xl p-6 border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Note Preview</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedNote(null)}
                      >
                        Close
                      </Button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-lg text-slate-800">
                          {selectedNote.title}
                        </h4>
                        <p className="text-sm text-purple-600 font-medium mt-1">
                          {selectedNote.verse} • {selectedNote.book}{" "}
                          {selectedNote.chapter}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-700">{selectedNote.content}</p>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-slate-600 mb-2">
                          Insights
                        </h5>
                        <ul className="space-y-2">
                          {selectedNote.insights.map((insight, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-slate-700 pl-4 border-l-2 border-emerald-300"
                            >
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-slate-600 mb-2">
                          Tags
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedNote.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h5 className="text-sm font-semibold text-slate-600 mb-3">
                          Review Schedule
                        </h5>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Next Review</span>
                            <span className="font-medium">
                              {selectedNote.reviewStats.nextReview.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">
                              Review Streak
                            </span>
                            <span className="font-medium">
                              {selectedNote.reviewStats.streak} times
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">
                              Retention Score
                            </span>
                            <span className="font-medium text-emerald-600">
                              {(
                                selectedNote.reviewStats.easeFactor * 40
                              ).toFixed(0)}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
