"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useData } from "../../components/DataProvider";
import { Delete, DeleteIcon, LucideDelete } from "lucide-react";
import { MdOutlineDelete } from "react-icons/md";

export default function ResearchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getResearch, deleteResearch } = useData();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const research = getResearch(params.id as string);

  if (!research) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100 px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">
            Research Not Found
          </h1>
          <p className="text-stone-500 mb-8">
            The topic you're looking for doesn't exist or may have been deleted.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    const configs = {
      "not-started": {
        label: "Not Started",
        color: "bg-stone-100 text-stone-700 border-stone-200",
        icon: "⏳",
      },
      studying: {
        label: "Studying",
        color: "bg-blue-50 text-blue-700 border-blue-200",
        icon: "📚",
      },
      "deep-dive": {
        label: "Deep Dive",
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: "🔬",
      },
      completed: {
        label: "Completed",
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: "✅",
      },
    };
    return configs[status as keyof typeof configs] || configs["not-started"];
  };

  const getPriorityConfig = (priority: string) => {
    const configs = {
      low: {
        label: "Low",
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: "🟢",
      },
      medium: {
        label: "Medium",
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: "🟡",
      },
      high: {
        label: "High",
        color: "bg-rose-50 text-rose-700 border-rose-200",
        icon: "🔴",
      },
    };
    return configs[priority as keyof typeof configs] || configs["medium"];
  };

  const handleDelete = async () => {
    if (isDeleting) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${research.title}"?\n\nThis action cannot be undone.`,
    );

    if (confirmDelete) {
      setIsDeleting(true);
      try {
        await deleteResearch(research.id);
        router.push("/");
      } catch (error) {
        console.error("Error deleting research:", error);
        setIsDeleting(false);
      }
    }
  };

  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const statusConfig = getStatusConfig(research.status);
  const priorityConfig = getPriorityConfig(research.priority);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-stone-200/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors group"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="font-medium">Dashboard</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="relative p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                title="Copy link"
              >
                {isCopied ? (
                  <span className="text-emerald-600 text-sm font-medium">
                    ✓ Copied!
                  </span>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6 sm:p-8 md:p-10 mb-8 overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-stone-50/50 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 min-w-0">
                {/* Title and badges */}
                <div className="flex flex-wrap items-start gap-3 mb-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight break-words">
                    {research.title}
                  </h1>
                </div>

                {/* Status badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${statusConfig.color}`}
                  >
                    <span>{statusConfig.icon}</span>
                    {statusConfig.label}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${priorityConfig.color}`}
                  >
                    <span>{priorityConfig.icon}</span>
                    {priorityConfig.label} Priority
                  </span>
                  {research.lastStudied && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 text-stone-600 rounded-full text-xs font-medium border border-stone-200">
                      <span>📅</span>
                      Last studied:{" "}
                      {new Date(research.lastStudied).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-stone-600 text-lg leading-relaxed">
                  {research.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex-shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
                <Link
                  href={`/research/${research.id}/edit`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl transition-all duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed border border-rose-200"
                >
                  {isDeleting ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <MdOutlineDelete className="w-4.25 h-4.25" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Key Scriptures */}
          {research.mainScriptures.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6 sm:p-8 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl flex-shrink-0">
                  📖
                </div>
                <h2 className="text-xl font-bold text-stone-800">
                  Key Scriptures
                </h2>
                <span className="ml-auto text-sm text-stone-400 font-medium bg-stone-50 px-2.5 py-0.5 rounded-full">
                  {research.mainScriptures.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {research.mainScriptures.map((scripture) => (
                  <span
                    key={scripture}
                    className="px-4 py-2 bg-amber-50/80 text-amber-800 rounded-xl border border-amber-200/60 font-medium text-sm hover:bg-amber-100 transition-colors cursor-default"
                  >
                    {scripture}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Points */}
          {research.keyPoints.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6 sm:p-8 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">
                  💡
                </div>
                <h2 className="text-xl font-bold text-stone-800">Key Points</h2>
                <span className="ml-auto text-sm text-stone-400 font-medium bg-stone-50 px-2.5 py-0.5 rounded-full">
                  {research.keyPoints.length}
                </span>
              </div>
              <ul className="space-y-3">
                {research.keyPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 text-stone-700 group"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center text-xs font-bold group-hover:bg-stone-200 transition-colors">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* My Findings */}
          {research.myFindings && (
            <div className="bg-gradient-to-br from-emerald-50/80 to-emerald-50/40 rounded-2xl shadow-sm border border-emerald-200/60 p-6 sm:p-8 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-xl flex-shrink-0">
                  ✍️
                </div>
                <h2 className="text-xl font-bold text-emerald-800">
                  My Findings
                </h2>
              </div>
              <div className="prose prose-stone max-w-none">
                <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {research.myFindings}
                </p>
              </div>
            </div>
          )}

          {/* Questions */}
          {research.questions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6 sm:p-8 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-xl flex-shrink-0">
                  ❓
                </div>
                <h2 className="text-xl font-bold text-stone-800">
                  Questions to Explore
                </h2>
                <span className="ml-auto text-sm text-stone-400 font-medium bg-stone-50 px-2.5 py-0.5 rounded-full">
                  {research.questions.length}
                </span>
              </div>
              <ul className="space-y-3">
                {research.questions.map((q, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 text-stone-700 group"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-xs font-bold group-hover:bg-purple-100 transition-colors">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources */}
          {research.resources.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6 sm:p-8 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl flex-shrink-0">
                  📚
                </div>
                <h2 className="text-xl font-bold text-stone-800">Resources</h2>
                <span className="ml-auto text-sm text-stone-400 font-medium bg-stone-50 px-2.5 py-0.5 rounded-full">
                  {research.resources.length}
                </span>
              </div>
              <ul className="space-y-2.5">
                {research.resources.map((r, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-stone-700 group"
                  >
                    <span className="flex-shrink-0 text-indigo-400 group-hover:text-indigo-600 transition-colors">
                      ▸
                    </span>
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {research.tags.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6 sm:p-8 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-xl flex-shrink-0">
                  🏷️
                </div>
                <h2 className="text-xl font-bold text-stone-800">Tags</h2>
                <span className="ml-auto text-sm text-stone-400 font-medium bg-stone-50 px-2.5 py-0.5 rounded-full">
                  {research.tags.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {research.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 bg-stone-100 text-stone-700 rounded-full text-sm font-medium hover:bg-stone-200 transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Meta Info */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-stone-200/60 p-4 sm:p-6">
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-stone-400">
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Created:{" "}
                {new Date(research.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                at{" "}
                {new Date(research.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Updated:{" "}
                {new Date(research.updatedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                at{" "}
                {new Date(research.updatedAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-stone-200/60 text-center text-sm text-stone-400">
          <p>All data is saved locally in your browser</p>
        </div>
      </div>
    </div>
  );
}
