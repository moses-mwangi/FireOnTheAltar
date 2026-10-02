"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useData } from "../../components/DataProvider";

export default function SermonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getSermon, deleteSermon } = useData();

  const sermon = getSermon(params.id as string);

  if (!sermon) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-stone-800">Sermon Not Found</h1>
        <p className="text-stone-500 mt-2">
          The sermon you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const colors = {
      draft: "bg-stone-200 text-stone-700",
      prepared: "bg-emerald-100 text-emerald-800",
      preached: "bg-stone-800 text-white",
    };
    return (
      colors[status as keyof typeof colors] || "bg-stone-200 text-stone-700"
    );
  };

  const handleDelete = () => {
    if (confirm(`Delete "${sermon.title}"?`)) {
      deleteSermon(sermon.id);
      router.push("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-stone-600 hover:text-stone-800 mb-6 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border-l-4 border-stone-800">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-stone-800">
              {sermon.title}
            </h1>
            <div className="flex flex-wrap gap-3 mt-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(sermon.status)}`}
              >
                {sermon.status}
              </span>
              <span className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm">
                📅 {new Date(sermon.date).toLocaleDateString()}
              </span>
              <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-sm">
                📖 {sermon.mainScripture}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/sermons/${sermon.id}/edit`}
              className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors text-sm font-medium"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-rose-100 text-rose-800 rounded-lg hover:bg-rose-200 transition-colors text-sm font-medium"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
        <p className="text-stone-600 mt-3 text-lg">
          Topic:{" "}
          <span className="font-semibold text-stone-800">{sermon.topic}</span>
        </p>
      </div>

      {/* Content */}
      <div className="mt-6 space-y-6">
        {/* Points */}
        {sermon.points.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
              <span>📌</span> Key Points
            </h2>
            <div className="mt-3 space-y-4">
              {sermon.points.map((point, idx) => (
                <div
                  key={point.id}
                  className="border-l-4 border-amber-500 pl-4 py-2"
                >
                  <h3 className="font-bold text-stone-800 text-lg">
                    {idx + 1}. {point.title}
                  </h3>
                  <p className="text-stone-600 mt-1">{point.description}</p>
                  {point.scriptures.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {point.scriptures.map((scripture) => (
                        <span
                          key={scripture}
                          className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg text-sm border border-amber-200"
                        >
                          {scripture}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        {sermon.summary && (
          <div className="bg-stone-50 rounded-xl shadow-sm p-6 border border-stone-200">
            <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
              <span>📝</span> Summary
            </h2>
            <p className="text-stone-700 mt-3 leading-relaxed">
              {sermon.summary}
            </p>
          </div>
        )}

        {/* Tags */}
        {sermon.tags.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
              <span>🏷️</span> Tags
            </h2>
            <div className="flex flex-wrap gap-2 mt-3">
              {sermon.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Meta Info */}
        <div className="bg-white rounded-xl shadow-sm p-4 text-sm text-stone-400 flex flex-wrap gap-4">
          <span>
            Created: {new Date(sermon.createdAt).toLocaleDateString()} at{" "}
            {new Date(sermon.createdAt).toLocaleTimeString()}
          </span>
          <span>
            Updated: {new Date(sermon.updatedAt).toLocaleDateString()} at{" "}
            {new Date(sermon.updatedAt).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
