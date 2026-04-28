// lib/demo-data/generate.ts
export interface DemoUser {
  id: string;
  name: string;
  avatar: string;
  stats: {
    streak: number;
    notesCount: number;
    versesMemorized: number;
    totalStudyTime: number;
  };
}

export interface BibleNote {
  id: string;
  title: string;
  content: string;
  verse: string;
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
  tags: string[];
  color: string;
  insights: string[];
  applications: string[];
  connections: string[];
  dateCreated: Date;
  lastReviewed: Date;
  reviewStats: {
    nextReview: Date;
    interval: number;
    easeFactor: number;
    streak: number;
  };
  media?: {
    type: "image" | "audio" | "link";
    url: string;
    thumbnail?: string;
  }[];
}

export interface StudyTopic {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  notesCount: number;
  verses: string[];
  subTopics?: string[];
}

// Generate rich demo data
export const DEMO_DATA = {
  user: {
    id: "user_123",
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BibleScholar",
    stats: {
      streak: 42,
      notesCount: 156,
      versesMemorized: 89,
      totalStudyTime: 3420, // minutes
    },
  },

  topics: [
    {
      id: "topic_grace",
      name: "Grace & Mercy",
      description: "Exploring God's unmerited favor and compassion",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      icon: "💝",
      notesCount: 24,
      verses: ["Ephesians 2:8-9", "Titus 2:11", "Romans 5:8"],
      subTopics: ["Sovereign Grace", "Common Grace", "Saving Grace"],
    },
    {
      id: "topic_faith",
      name: "Faith & Trust",
      description: "The substance of things hoped for",
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
      icon: "🙏",
      notesCount: 18,
      verses: ["Hebrews 11:1", "Romans 10:17", "James 2:17"],
      subTopics: ["Saving Faith", "Living Faith", "Gift of Faith"],
    },
    {
      id: "topic_love",
      name: "God's Love",
      description: "Agape love in action",
      color: "bg-gradient-to-r from-rose-500 to-red-500",
      icon: "❤️",
      notesCount: 32,
      verses: ["1 John 4:8", "John 3:16", "Romans 8:38-39"],
      subTopics: ["Unconditional Love", "Sacrificial Love", "Everlasting Love"],
    },
    {
      id: "topic_kingdom",
      name: "Kingdom of God",
      description: "The reign and rule of God",
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
      icon: "👑",
      notesCount: 15,
      verses: ["Matthew 6:33", "Romans 14:17", "Luke 17:21"],
      subTopics: ["Present Kingdom", "Future Kingdom", "Kingdom Values"],
    },
    {
      id: "topic_prayer",
      name: "Prayer & Worship",
      description: "Communion with the Divine",
      color: "bg-gradient-to-r from-blue-500 to-indigo-500",
      icon: "🙌",
      notesCount: 22,
      verses: ["Philippians 4:6", "1 Thessalonians 5:17", "John 4:24"],
      subTopics: ["Intercession", "Thanksgiving", "Adoration"],
    },
  ],

  notes: [
    {
      id: "note_john316",
      title: "The Heart of the Gospel",
      content:
        "John 3:16 encapsulates the entire gospel message - God's motivation (love), His action (gave), His gift (Son), and the response required (belief). This verse shows that salvation is both initiated by God and received through faith.",
      verse: "John 3:16",
      book: "John",
      chapter: 3,
      verseStart: 16,
      tags: ["salvation", "love", "gospel", "faith"],
      color:
        "bg-gradient-to-r from-rose-100 to-pink-100 border-l-4 border-rose-500",
      insights: [
        'The word "so" (οὕτως) indicates the manner and extent of God\'s love',
        '"World" (κόσμος) includes all humanity, not just the elect',
        'Present tense "has" indicates ongoing eternal life',
      ],
      applications: [
        "Share this verse with someone feeling unloved",
        "Meditate on the cost God paid for my salvation",
        "Respond with gratitude in worship this week",
      ],
      connections: ["Romans 5:8", "1 John 4:9-10", "Ephesians 2:4-5"],
      dateCreated: new Date("2024-01-15"),
      lastReviewed: new Date("2024-03-20"),
      reviewStats: {
        nextReview: new Date("2024-04-05"),
        interval: 15,
        easeFactor: 2.3,
        streak: 5,
      },
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
          thumbnail:
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300",
        },
        {
          type: "link",
          url: "https://www.desiringgod.org/messages/god-so-loved-the-world",
        },
      ],
    },
    // Add 9 more rich notes for different books and topics...
  ],

  communityPosts: [
    {
      id: "post_1",
      user: {
        name: "Sarah Chen",
        role: "Theology Student",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      content:
        'Just discovered an amazing chiastic structure in Psalm 23! The center focuses on "You are with me" - such comfort!',
      tags: ["psalms", "literary-devices", "comfort"],
      likes: 42,
      comments: 8,
      timestamp: "2 hours ago",
      isLiked: true,
    },
    // More community posts...
  ],

  readingPlans: [
    {
      id: "plan_1",
      name: "Gospel in 30 Days",
      description: "Walk through the life of Jesus in one month",
      progress: 65,
      color: "from-emerald-400 to-teal-500",
      icon: "✝️",
      currentDay: 19,
      totalDays: 30,
      today: {
        reference: "John 14:1-14",
        title: "The Way, The Truth, The Life",
        timeEstimate: "12 min",
      },
    },
    // More reading plans...
  ],
};
