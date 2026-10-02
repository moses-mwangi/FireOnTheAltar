"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useData,
  DEMO_BIBLE,
  AVAILABLE_BOOKS,
  AVAILABLE_CHAPTERS,
} from "./components/DataProvider";

type Tab = "bible" | "sermons" | "research" | "pending" | "confusing";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("bible");

  // Bible state
  const [selectedBook, setSelectedBook] = useState<string>("John");
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [activeNoteVerse, setActiveNoteVerse] = useState<number | null>(null);
  const [noteInput, setNoteInput] = useState<string>("");

  const {
    sermons,
    researchTopics,
    pendingTopics,
    confusingParts,
    verseNotes,
    setVerseNotes,
  } = useData();

  const chapterData = DEMO_BIBLE[selectedBook]?.[selectedChapter] || null;
  const getVerseKey = (verse: number) =>
    `${selectedBook}_${selectedChapter}_${verse}`;

  const handleSaveNote = (verse: number) => {
    if (noteInput.trim()) {
      setVerseNotes((prev) => ({
        ...prev,
        [getVerseKey(verse)]: noteInput.trim(),
      }));
      setActiveNoteVerse(null);
      setNoteInput("");
    }
  };

  const handleDeleteNote = (verse: number) => {
    setVerseNotes((prev) => {
      const newNotes = { ...prev };
      delete newNotes[getVerseKey(verse)];
      return newNotes;
    });
    setActiveNoteVerse(null);
  };

  const renderVerseText = (text: string) => {
    const parts = text.split(/(\([^)]+\)|\[[^\]]+\])/);
    return parts.map((part, index) => {
      if (part.match(/^\([^)]+\)$/) || part.match(/^\[[^\]]+\]$/)) {
        return (
          <span
            key={index}
            className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded text-sm font-medium border-b border-dashed border-amber-300 mx-0.5"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const renderBibleTab = () => (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
            Book
          </label>
          <select
            className="w-full p-2.5 border border-stone-300 rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            {AVAILABLE_BOOKS.map((book) => (
              <option key={book} value={book}>
                {book}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
            Chapter
          </label>
          <select
            className="w-full p-2.5 border border-stone-300 rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-800"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(Number(e.target.value))}
          >
            {AVAILABLE_CHAPTERS.map((ch) => (
              <option key={ch} value={ch}>
                Chapter {ch}
              </option>
            ))}
          </select>
        </div>
        <div className="px-4 py-2 bg-stone-100 rounded-lg text-sm text-stone-600 border border-dashed border-stone-400 whitespace-nowrap">
          📚 John 1 (Sample)
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 md:p-7">
        {chapterData ? (
          <>
            <div className="flex justify-between items-center border-b border-stone-200 pb-3 mb-5">
              <h2 className="text-2xl font-bold text-stone-800">
                {chapterData.reference}
              </h2>
              <span className="bg-stone-200 px-3 py-1 rounded-full text-sm font-semibold text-stone-700">
                {chapterData.translation}
              </span>
            </div>
            <div className="space-y-3">
              {chapterData.verses.map((v) => {
                const verseKey = getVerseKey(v.verse);
                const hasNote = verseNotes[verseKey] !== undefined;

                return (
                  <div
                    key={v.verse}
                    className="p-3 rounded-lg hover:bg-stone-50 transition-colors border-l-2 border-transparent hover:border-stone-300"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-stone-500 text-sm min-w-[32px]">
                        {v.verse}
                      </span>
                      <button
                        className="text-lg opacity-60 hover:opacity-100 hover:bg-stone-200 rounded px-1.5 py-0.5 transition-all"
                        onClick={() => {
                          if (activeNoteVerse === v.verse) {
                            setActiveNoteVerse(null);
                          } else {
                            setActiveNoteVerse(v.verse);
                            setNoteInput(verseNotes[verseKey] || "");
                          }
                        }}
                      >
                        {hasNote ? "✏️" : "📝"}
                      </button>
                    </div>
                    <div className="text-stone-800 text-base leading-relaxed pl-9">
                      {renderVerseText(v.text)}
                    </div>
                    {activeNoteVerse === v.verse && (
                      <div className="mt-3 ml-9 p-3 bg-stone-50 rounded-lg border border-stone-200">
                        <textarea
                          className="w-full p-2.5 border border-stone-300 rounded-lg font-inherit text-sm resize-y bg-white focus:outline-none focus:ring-2 focus:ring-stone-800"
                          value={noteInput}
                          onChange={(e) => setNoteInput(e.target.value)}
                          placeholder="Write your insight here..."
                          rows={3}
                          autoFocus
                        />
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <button
                            className="px-4 py-1.5 bg-stone-800 text-white rounded-lg text-sm hover:bg-stone-700 transition-colors"
                            onClick={() => handleSaveNote(v.verse)}
                          >
                            💾 Save
                          </button>
                          {hasNote && (
                            <button
                              className="px-4 py-1.5 bg-rose-100 text-rose-800 rounded-lg text-sm hover:bg-rose-200 transition-colors"
                              onClick={() => handleDeleteNote(v.verse)}
                            >
                              🗑️ Delete
                            </button>
                          )}
                          <button
                            className="px-4 py-1.5 bg-stone-200 text-stone-700 rounded-lg text-sm hover:bg-stone-300 transition-colors"
                            onClick={() => {
                              setActiveNoteVerse(null);
                              setNoteInput("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                    {hasNote && activeNoteVerse !== v.verse && (
                      <div className="mt-2 ml-9 p-2.5 bg-amber-50 border-l-4 border-amber-700 rounded text-sm">
                        <span className="font-semibold text-amber-800 mr-2">
                          📌 Insight:
                        </span>
                        <p className="text-stone-700 mt-1">
                          {verseNotes[verseKey]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-stone-200 text-center text-sm text-stone-500">
              <p>
                📊 {chapterData.verses.length} verses • 💡{" "}
                {
                  Object.keys(verseNotes).filter((key) =>
                    key.startsWith(`${selectedBook}_${selectedChapter}`),
                  ).length
                }{" "}
                notes
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-stone-500">
            No data available
          </div>
        )}
      </div>
    </div>
  );

  const renderResearchTab = () => (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
        <h2 className="text-2xl font-bold text-stone-800">
          🔬 Research Topics
        </h2>
        <Link
          href="/research/new"
          className="px-5 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
        >
          + New Research
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {researchTopics.length === 0 ? (
          <div className="col-span-2 text-center py-12 px-6 bg-stone-50 rounded-xl border-2 border-dashed border-stone-300 text-stone-500">
            <p>
              No research topics yet. Start studying a topic that interests you!
            </p>
          </div>
        ) : (
          researchTopics.map((topic) => (
            <Link
              key={topic.id}
              href={`/research/${topic.id}`}
              className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${
                topic.priority === "high"
                  ? "border-l-rose-500"
                  : topic.priority === "medium"
                    ? "border-l-amber-500"
                    : "border-l-emerald-500"
              } hover:shadow-md transition-shadow block`}
            >
              <div>
                <h3 className="text-lg font-bold text-stone-800">
                  {topic.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-1.5 text-sm">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                      topic.status === "not-started"
                        ? "bg-stone-200 text-stone-700"
                        : topic.status === "studying"
                          ? "bg-blue-100 text-blue-800"
                          : topic.status === "deep-dive"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {topic.status.replace("-", " ")}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                      topic.priority === "high"
                        ? "bg-rose-100 text-rose-800"
                        : topic.priority === "medium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {topic.priority} priority
                  </span>
                </div>
              </div>
              <p className="text-stone-600 mt-2 text-sm line-clamp-2">
                {topic.description}
              </p>
              {topic.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {topic.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {topic.tags.length > 3 && (
                    <span className="text-stone-400 text-xs">
                      +{topic.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );

  const renderSermonsTab = () => (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
        <h2 className="text-2xl font-bold text-stone-800">📖 Sermons</h2>
        <Link
          href="/sermons/new"
          className="px-5 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium"
        >
          + New Sermon
        </Link>
      </div>
      <div className="space-y-4">
        {sermons.length === 0 ? (
          <div className="text-center py-12 px-6 bg-stone-50 rounded-xl border-2 border-dashed border-stone-300 text-stone-500">
            <p>No sermons yet. Start preparing your first sermon!</p>
          </div>
        ) : (
          sermons.map((sermon) => (
            <Link
              key={sermon.id}
              href={`/sermons/${sermon.id}`}
              className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-stone-500 hover:shadow-md transition-shadow block"
            >
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                  <h3 className="text-xl font-bold text-stone-800">
                    {sermon.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1.5 text-sm text-stone-500">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                        sermon.status === "draft"
                          ? "bg-stone-200 text-stone-700"
                          : sermon.status === "prepared"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-stone-800 text-white"
                      }`}
                    >
                      {sermon.status}
                    </span>
                    <span>📅 {new Date(sermon.date).toLocaleDateString()}</span>
                    <span>📖 {sermon.mainScripture}</span>
                  </div>
                </div>
                <span className="text-stone-400 text-sm">Click to view →</span>
              </div>
              <p className="text-stone-600 mt-2">
                Topic: <span className="font-medium">{sermon.topic}</span>
              </p>
              {sermon.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {sermon.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 bg-stone-100 text-stone-600 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );

  const renderPendingTab = () => (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
        <h2 className="text-2xl font-bold text-stone-800">⏳ Pending Topics</h2>
        <button className="px-5 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium">
          + New Topic
        </button>
      </div>
      <div className="space-y-3">
        {pendingTopics.length === 0 ? (
          <div className="text-center py-12 px-6 bg-stone-50 rounded-xl border-2 border-dashed border-stone-300 text-stone-500">
            <p>No pending topics.</p>
          </div>
        ) : (
          pendingTopics.map((topic) => (
            <div
              key={topic.id}
              className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${
                topic.priority === "high"
                  ? "border-l-rose-500"
                  : topic.priority === "medium"
                    ? "border-l-amber-500"
                    : "border-l-emerald-500"
              }`}
            >
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-bold text-stone-800">
                    {topic.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1.5 text-sm">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                        topic.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : topic.status === "studying"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {topic.status}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                        topic.priority === "high"
                          ? "bg-rose-100 text-rose-800"
                          : topic.priority === "medium"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {topic.priority} priority
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-stone-100 rounded transition-colors">
                    ✏️
                  </button>
                  <button className="p-1.5 hover:bg-rose-100 rounded transition-colors">
                    🗑️
                  </button>
                </div>
              </div>
              <p className="text-stone-600 mt-2">{topic.description}</p>
              {topic.notes && (
                <div className="mt-2.5 p-2.5 bg-stone-50 rounded-lg text-sm text-stone-600">
                  <strong>Notes:</strong> {topic.notes}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderConfusingTab = () => (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4 mb-5">
        <h2 className="text-2xl font-bold text-stone-800">
          ❓ Confusing Parts
        </h2>
        <button className="px-5 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-medium">
          + New Entry
        </button>
      </div>
      <div className="space-y-3">
        {confusingParts.length === 0 ? (
          <div className="text-center py-12 px-6 bg-stone-50 rounded-xl border-2 border-dashed border-stone-300 text-stone-500">
            <p>No confusing parts logged.</p>
          </div>
        ) : (
          confusingParts.map((entry) => (
            <div
              key={entry.id}
              className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${
                entry.status === "resolved"
                  ? "border-l-emerald-500"
                  : entry.status === "researching"
                    ? "border-l-amber-500"
                    : "border-l-rose-500"
              }`}
            >
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-bold text-stone-800">
                    📖 {entry.scripture}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1.5 text-sm">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                        entry.status === "unresolved"
                          ? "bg-rose-100 text-rose-800"
                          : entry.status === "researching"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {entry.status}
                    </span>
                    <span className="text-stone-400">
                      📅 {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-stone-100 rounded transition-colors">
                    ✏️
                  </button>
                  <button className="p-1.5 hover:bg-rose-100 rounded transition-colors">
                    🗑️
                  </button>
                </div>
              </div>
              <p className="text-stone-700 mt-3">
                <strong>Question:</strong> {entry.question}
              </p>
              {entry.context && (
                <p className="text-stone-600 mt-1.5">
                  <strong>Context:</strong> {entry.context}
                </p>
              )}
              {entry.insights && (
                <div className="mt-2.5 p-3 bg-emerald-50 rounded-lg text-sm text-stone-700 border border-emerald-100">
                  <strong>💡 Insights:</strong> {entry.insights}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-stone-50 min-h-screen font-sans">
      <header className="text-center py-8 border-b-2 border-stone-300 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800">
          📖 Personal Bible Study & Sermon Prep
        </h1>
        <p className="text-stone-500 mt-1">Study • Prepare • Organize • Grow</p>
      </header>

      <div className="flex flex-wrap gap-1.5 mb-6 border-b-2 border-stone-200 pb-1">
        {[
          { id: "bible", label: "📖 Bible", count: null },
          {
            id: "research",
            label: "🔬 Research",
            count: researchTopics.length,
          },
          { id: "sermons", label: "📝 Sermons", count: sermons.length },
          { id: "pending", label: "⏳ Pending", count: pendingTopics.length },
          {
            id: "confusing",
            label: "❓ Confusing",
            count: confusingParts.length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2.5 rounded-t-lg font-medium transition-all ${
              activeTab === tab.id
                ? "bg-stone-800 text-white"
                : "text-stone-600 hover:bg-stone-200"
            }`}
            onClick={() => setActiveTab(tab.id as Tab)}
          >
            {tab.label}
            {tab.count !== null && (
              <span className="ml-1.5 text-sm opacity-75">({tab.count})</span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "bible" && renderBibleTab()}
        {activeTab === "research" && renderResearchTab()}
        {activeTab === "sermons" && renderSermonsTab()}
        {activeTab === "pending" && renderPendingTab()}
        {activeTab === "confusing" && renderConfusingTab()}
      </div>
    </div>
  );
}
