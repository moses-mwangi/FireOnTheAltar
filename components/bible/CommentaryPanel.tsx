// components/bible/CommentaryPanel.tsx
"use client";

import { useState } from "react";
import {
  BookOpen,
  Users,
  Star,
  Clock,
  Filter,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ThumbsUp,
  Share2,
  Bookmark,
  Volume2,
  Download,
  Zap,
  Brain,
  Sparkles,
  History,
} from "lucide-react";

interface Commentary {
  id: string;
  author: string;
  title: string;
  content: string;
  date: string;
  rating: number;
  likes: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  tags: string[];
  perspective: "historical" | "theological" | "practical" | "devotional";
  source?: string;
}

interface CommentaryPanelProps {
  verse: {
    book: string;
    chapter: number;
    verse: number;
  };
}

const CommentaryPanel: React.FC<CommentaryPanelProps> = ({ verse }) => {
  const [selectedPerspective, setSelectedPerspective] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "popular">(
    "rating"
  );
  const [expandedCommentary, setExpandedCommentary] = useState<string | null>(
    null
  );

  const commentaries: Commentary[] = [
    {
      id: "1",
      author: "Dr. John Piper",
      title: "The Depth of God's Love",
      content:
        "This verse stands as the pinnacle of divine revelation. The Greek word \"houtōs\" (so) emphasizes not just the fact of God's love, but its manner and extent. It's a love that finds its ultimate expression in the giving of God's unique Son. The theological implications here are staggering: salvation originates in divine love, is accomplished through divine action, and is received through human faith.",
      date: "2024-03-15",
      rating: 4.9,
      likes: 245,
      isLiked: true,
      tags: ["salvation", "love", "theology"],
      perspective: "theological",
      source: "Desiring God Commentary",
    },
    {
      id: "2",
      author: "NT Wright",
      title: "Cosmic Redemption",
      content:
        "John 3:16 must be understood within its Jewish context. The \"world\" here is the kosmos - the entire created order that has fallen under sin's curse. God's love isn't just sentimental; it's actively redemptive, addressing the cosmic problem of sin. The giving of the Son represents God's decisive invasion into enemy territory.",
      date: "2024-03-10",
      rating: 4.7,
      likes: 189,
      tags: ["redemption", "cosmology", "context"],
      perspective: "historical",
      source: "New Testament for Everyone",
    },
    {
      id: "3",
      author: "Tim Keller",
      title: "Practical Implications",
      content:
        "If God loved us enough to give his best, how should we then live? This verse transforms our identity and purpose. It means we're eternally secure, deeply loved, and called to reflect that love to others. The application is both personal (rest in God's love) and missional (share this love with others).",
      date: "2024-03-05",
      rating: 4.8,
      likes: 156,
      isBookmarked: true,
      tags: ["application", "missional", "identity"],
      perspective: "practical",
      source: "Gospel in Life",
    },
    {
      id: "4",
      author: "Charles Spurgeon",
      title: "Morning Devotion",
      content:
        "Oh, what a blessed assurance! The entire gospel in a single verse. Here we find the fountain of all comfort, the foundation of all hope. Let this truth sink deep into your soul today: you are loved with an everlasting love, secured by an eternal sacrifice, destined for an unending life.",
      date: "1855-06-10",
      rating: 4.9,
      likes: 328,
      tags: ["devotional", "comfort", "assurance"],
      perspective: "devotional",
      source: "Morning and Evening",
    },
  ];

  const perspectiveColors = {
    theological: "bg-purple-100 text-purple-700 border-purple-300",
    historical: "bg-amber-100 text-amber-700 border-amber-300",
    practical: "bg-emerald-100 text-emerald-700 border-emerald-300",
    devotional: "bg-rose-100 text-rose-700 border-rose-300",
  };

  const perspectiveIcons = {
    theological: <Brain className="h-4 w-4" />,
    historical: <History className="h-4 w-4" />,
    practical: <Zap className="h-4 w-4" />,
    devotional: <Sparkles className="h-4 w-4" />,
  };

  const filteredCommentaries = commentaries
    .filter(
      (c) =>
        selectedPerspective === "all" || c.perspective === selectedPerspective
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "rating":
          return b.rating - a.rating;
        case "popular":
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  const handleLike = (id: string) => {
    // In real app, update via API
    console.log("Liked commentary:", id);
  };

  const handleBookmark = (id: string) => {
    // In real app, update via API
    console.log("Bookmarked commentary:", id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Commentary on {verse.book} {verse.chapter}:{verse.verse}
            </h2>
            <p className="text-slate-600 mt-1">
              Insights from scholars, pastors, and theologians
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white">
            <BookOpen className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-white">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-600">Commentaries</span>
            </div>
            <div className="text-2xl font-bold text-slate-800 mt-1">
              {commentaries.length}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-slate-600">Avg. Rating</span>
            </div>
            <div className="text-2xl font-bold text-slate-800 mt-1">4.8</div>
          </div>

          <div className="p-3 rounded-lg bg-white">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-600">Earliest</span>
            </div>
            <div className="text-2xl font-bold text-slate-800 mt-1">1855</div>
          </div>

          <div className="p-3 rounded-lg bg-white">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-600">Perspectives</span>
            </div>
            <div className="text-2xl font-bold text-slate-800 mt-1">4</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Perspective Filter */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">
              Perspective
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedPerspective("all")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedPerspective === "all"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Perspectives
            </button>
            {Object.entries(perspectiveColors).map(([key, color]) => (
              <button
                key={key}
                onClick={() => setSelectedPerspective(key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all flex items-center gap-2 ${
                  selectedPerspective === key
                    ? `${color} ring-2 ring-offset-1 ring-current`
                    : "bg-white border-slate-300 text-slate-700 hover:border-current"
                }`}
              >
                {perspectiveIcons[key as keyof typeof perspectiveIcons]}
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Filter */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-slate-700">Sort by</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="rating">Highest Rated</option>
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Commentaries List */}
      <div className="space-y-6">
        {filteredCommentaries.map((commentary) => {
          const isExpanded = expandedCommentary === commentary.id;

          return (
            <div
              key={commentary.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Commentary Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`p-3 rounded-xl ${
                          perspectiveColors[commentary.perspective]
                        }`}
                      >
                        {perspectiveIcons[commentary.perspective]}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-800">
                          {commentary.title}
                        </h3>
                        {commentary.source && (
                          <span className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full">
                            {commentary.source}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-slate-700">
                          {commentary.author}
                        </span>
                        <span className="text-sm text-slate-500">•</span>
                        <span className="text-sm text-slate-500">
                          {commentary.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500 fill-current" />
                      <span className="font-bold text-slate-800">
                        {commentary.rating}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {commentary.likes} likes
                    </div>
                  </div>
                </div>

                {/* Content Preview */}
                <div className="mb-4">
                  <p className="text-slate-700 leading-relaxed">
                    {isExpanded
                      ? commentary.content
                      : `${commentary.content.substring(0, 200)}...`}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {commentary.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-full border"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(commentary.id)}
                      className={`flex items-center gap-2 ${
                        commentary.isLiked
                          ? "text-rose-600"
                          : "text-slate-600 hover:text-rose-600"
                      }`}
                    >
                      <ThumbsUp
                        className={`h-4 w-4 ${
                          commentary.isLiked ? "fill-current" : ""
                        }`}
                      />
                      <span>{commentary.likes}</span>
                    </button>

                    <button
                      onClick={() => handleBookmark(commentary.id)}
                      className={`flex items-center gap-2 ${
                        commentary.isBookmarked
                          ? "text-purple-600"
                          : "text-slate-600 hover:text-purple-600"
                      }`}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          commentary.isBookmarked ? "fill-current" : ""
                        }`}
                      />
                      <span>Save</span>
                    </button>

                    <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setExpandedCommentary(isExpanded ? null : commentary.id)
                      }
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      {isExpanded ? (
                        <span className="flex items-center gap-1">
                          <ChevronUp className="h-4 w-4" />
                          Show less
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <ChevronDown className="h-4 w-4" />
                          Read more
                        </span>
                      )}
                    </button>

                    <button className="p-2 hover:bg-slate-100 rounded-lg">
                      <Volume2 className="h-4 w-4 text-slate-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Section */}
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-slate-200 pt-6">
                  {/* Additional Content */}
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2">
                      Key Takeaways
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                        <span className="text-slate-700">
                          This verse reveals the heart of the Gospel message
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                        <span className="text-slate-700">
                          God's love is both universal and personal
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                        <span className="text-slate-700">
                          Salvation is received through faith alone
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Related Resources */}
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3">
                      Related Resources
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 hover:border-blue-300 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-slate-800">
                            Full Commentary
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">
                          Read the complete work
                        </p>
                      </button>

                      <button className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-300 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <Download className="h-4 w-4 text-emerald-600" />
                          <span className="font-medium text-slate-800">
                            Download PDF
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">
                          Save for offline study
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Commentary */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-white border-2 border-dashed border-slate-300 hover:border-purple-400 transition-colors">
        <div className="text-center">
          <div className="inline-block p-4 rounded-xl bg-white mb-4">
            <MessageSquare className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            Add Your Insights
          </h3>
          <p className="text-slate-600 mb-4">
            Share your personal reflections or theological insights on this
            verse
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 shadow-lg">
            Add Commentary
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentaryPanel;
