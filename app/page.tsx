"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  Feather,
  Heart,
  ChevronRight,
  Sparkles,
  Clock,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  Flame,
  Quote,
} from "lucide-react";

// Subject data
const subjects = [
  {
    id: "english",
    name: "English",
    description:
      "Master vocabulary, grammar, and expressions. Learn synonyms, word families, and practical usage.",
    icon: BookOpen,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    href: "/english",
    stats: "124 words • 8 grammar topics",
    featured: "Word families & synonyms",
  },
  {
    id: "philosophy",
    name: "Philosophy",
    description:
      "Explore wisdom from Socrates, Plato, Stoics, and modern thinkers. Question reality and find meaning.",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    href: "/philosophy",
    stats: "15 philosophers • 30 concepts",
    featured: "Daily stoic wisdom",
  },
  {
    id: "psychology",
    name: "Psychology",
    description:
      "Understand the mind, emotions, cognitive biases, and human behavior. Practical mental models.",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    href: "/psychology",
    stats: "45 concepts • 12 biases",
    featured: "Cognitive biases explained",
  },
  {
    id: "writing",
    name: "Writing",
    description:
      "Develop your voice, master storytelling, essay structure, and creative expression.",
    icon: Feather,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    href: "/writing",
    stats: "24 prompts • 8 techniques",
    featured: "Daily writing challenges",
  },
  {
    id: "bible",
    name: "Bible Study",
    description:
      "Study scripture, historical context, original Greek/Hebrew meanings, and practical application.",
    icon: Heart,
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50 dark:bg-rose-900/20",
    href: "/bible",
    stats: "66 books • 31,102 verses",
    featured: "Verse of the day",
  },
];

// Daily inspiration
const dailyInspiration = {
  quote: "The beginning is the most important part of the work.",
  author: "Plato",
  context: "The Republic",
};

// User stats (mock - will come from localStorage later)
const userStats = {
  streak: 5,
  totalWords: 124,
  completedLessons: 18,
  hoursLearned: 24,
};

export default function HomePage() {
  const [greeting, setGreeting] = useState("");

  // useEffect(() => {
  //   const hour = new Date().getHours();
  //   // if (hour < 12) setGreseting("Good morning");
  //   else if (hour < 18) setGreeting("Good afternoon");
  //   else setGreeting("Good evening");
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Your Personal Learning Sanctuary</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              The Reflective Mind
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Train your mind. Nourish your soul. Master English, Philosophy,
              Psychology, Writing, and Scripture in one place.
            </p>

            {/* Quick stats bar */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Flame className="h-5 w-5 text-orange-500" />
                <span>{userStats.streak} day streak</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <BookOpen className="h-5 w-5 text-purple-500" />
                <span>{userStats.totalWords} words learned</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="h-5 w-5 text-green-500" />
                <span>{userStats.hoursLearned} hours learned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Subject Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {greeting}, seeker of wisdom 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            What would you like to explore today?
          </p>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Link
                key={subject.id}
                href={subject.href}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Gradient bar at top */}
                <div className={`h-2 bg-gradient-to-r ${subject.color}`} />

                <div className="p-6">
                  {/* Icon and arrow */}
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${subject.color} bg-opacity-10`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  </div>

                  {/* Title and description */}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {subject.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {subject.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-500">
                      {subject.stats}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full bg-gradient-to-r ${subject.color} bg-opacity-10 text-purple-600 dark:text-purple-400`}
                    >
                      {subject.featured}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Daily Inspiration Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-16 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Quote className="h-6 w-6 text-purple-200" />
                <span className="text-sm font-medium text-purple-200">
                  Daily Inspiration
                </span>
              </div>
              <p className="text-2xl md:text-3xl font-serif italic mb-3">
                &quot;{dailyInspiration.quote}&quot;
              </p>
              <p className="text-purple-200">
                — {dailyInspiration.author}, {dailyInspiration.context}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <p className="text-3xl font-bold">{userStats.streak}</p>
                <p className="text-sm text-purple-200">Day Streak</p>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < userStats.streak ? "bg-yellow-400" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended for you */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Recommended for you
            </h2>
            <button className="text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Word Family: Communicate",
                category: "English",
                time: "5 min",
                icon: BookOpen,
              },
              {
                title: "Stoicism 101: Control what you can",
                category: "Philosophy",
                time: "10 min",
                icon: Brain,
              },
              {
                title: "Cognitive Bias: Confirmation Bias",
                category: "Psychology",
                time: "8 min",
                icon: TrendingUp,
              },
              {
                title: "Psalm 23: Meaning & Context",
                category: "Bible",
                time: "12 min",
                icon: Heart,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Icon className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Recent Activity
            </h3>
          </div>
          <div className="space-y-3">
            {[
              {
                action: "Added 5 words to 'Communication Verbs'",
                time: "2 hours ago",
                type: "English",
              },
              {
                action: "Completed 'Present Simple vs Continuous'",
                time: "Yesterday",
                type: "Grammar",
              },
              {
                action: "Started 'Stoic Wisdom: Meditations'",
                time: "2 days ago",
                type: "Philosophy",
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div>
                  <p className="text-sm text-gray-800 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.type}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
