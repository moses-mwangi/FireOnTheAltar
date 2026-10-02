"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// --- TYPES ---
export interface Verse {
  verse: number;
  text: string;
}

export interface ChapterData {
  reference: string;
  verses: Verse[];
  translation: string;
}

export interface SermonPoint {
  id: string;
  title: string;
  description: string;
  scriptures: string[];
}

export interface Sermon {
  id: string;
  title: string;
  topic: string;
  date: string;
  mainScripture: string;
  points: SermonPoint[];
  summary: string;
  status: "draft" | "prepared" | "preached";
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PendingTopic {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "studying" | "completed";
  createdAt: string;
  notes: string;
}

export interface ConfusingPart {
  id: string;
  scripture: string;
  question: string;
  context: string;
  status: "unresolved" | "researching" | "resolved";
  insights: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface ResearchTopic {
  id: string;
  title: string;
  description: string;
  mainScriptures: string[];
  keyPoints: string[];
  myFindings: string;
  questions: string[];
  resources: string[];
  status: "not-started" | "studying" | "deep-dive" | "completed";
  priority: "low" | "medium" | "high";
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastStudied?: string;
}

// --- SAMPLE DATA ---
export const SAMPLE_SERMONS: Sermon[] = [
  {
    id: "1",
    title: "The Power of New Beginnings",
    topic: "Transformation",
    date: "2026-01-12",
    mainScripture: "John 3:3",
    points: [
      {
        id: "p1",
        title: "Born Again",
        description:
          "Spiritual rebirth is essential for entering God's kingdom",
        scriptures: ["John 3:3"],
      },
      {
        id: "p2",
        title: "Water and Spirit",
        description: "Baptism and the Holy Spirit work together in salvation",
        scriptures: ["John 3:5"],
      },
    ],
    summary:
      "Being born again transforms everything about our identity and purpose.",
    status: "prepared",
    tags: ["Salvation", "Holy Spirit", "Rebirth"],
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "2",
    title: "God's Extravagant Love",
    topic: "God's Character",
    date: "2026-01-19",
    mainScripture: "John 3:16",
    points: [
      {
        id: "p3",
        title: "God's Love is Global",
        description: "God's love extends to the entire world",
        scriptures: ["John 3:16"],
      },
      {
        id: "p4",
        title: "The Ultimate Gift",
        description: "God gave His Son, the most precious gift",
        scriptures: ["John 3:16"],
      },
    ],
    summary: "God's love is the foundation of our faith and hope.",
    status: "draft",
    tags: ["Love", "Grace", "Gospel"],
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
];

export const SAMPLE_RESEARCH: ResearchTopic[] = [
  {
    id: "r1",
    title: "The Person and Work of the Holy Spirit",
    description:
      "Understanding who the Holy Spirit is, His role in the Trinity, and His work in the life of believers today.",
    mainScriptures: [
      "John 14:16-17",
      "John 16:7-15",
      "Acts 2:1-4",
      "Romans 8:26-27",
    ],
    keyPoints: [
      "The Holy Spirit is a person, not just a force",
      "He is fully God - co-equal with the Father and Son",
      "He convicts the world of sin, righteousness, and judgment",
      "He indwells believers and seals them for salvation",
      "He empowers believers for ministry and holy living",
    ],
    myFindings:
      "The Holy Spirit is not an 'it' but a 'He' - this changes how we relate to Him. He is not just a power we tap into, but a person we commune with. The Spirit's primary work is to glorify Jesus (John 16:14). He doesn't draw attention to Himself but points to Christ.",
    questions: [
      "What does it mean to 'quench' the Spirit?",
      "How do I discern the Spirit's leading vs. my own desires?",
      "What is the baptism of the Holy Spirit? Is it separate from salvation?",
    ],
    resources: [
      "Systematic Theology - Wayne Grudem (Chapter on Holy Spirit)",
      "The Person and Work of the Holy Spirit - R.A. Torrey",
      "Forgotten God - Francis Chan",
      "Podcast: The Holy Spirit Today - Tim Keller",
    ],
    status: "deep-dive",
    priority: "high",
    tags: ["Holy Spirit", "Trinity", "Theology", "Spiritual Gifts"],
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
    lastStudied: "2026-01-15T10:00:00Z",
  },
  {
    id: "r2",
    title: "Understanding Our Relationship with God",
    description:
      "Exploring the nature of our relationship with God - what it means to be children of God.",
    mainScriptures: ["John 1:12", "Romans 8:14-17", "Galatians 4:4-7"],
    keyPoints: [
      "We are adopted as children of God through faith in Christ",
      "Relationship with God is based on grace, not performance",
      "Intimacy with God grows through prayer, Word, and obedience",
    ],
    myFindings:
      "The fatherhood of God is central to understanding our relationship with Him. Unlike earthly fathers who may fail, God is the perfect Father.",
    questions: [
      "How do I balance reverent fear of God with intimate love?",
      "What does it practically look like to 'abide' in Christ?",
    ],
    resources: ["Knowing God - J.I. Packer", "The Pursuit of God - A.W. Tozer"],
    status: "studying",
    priority: "high",
    tags: ["Relationship with God", "Adoption", "Identity"],
    createdAt: "2026-01-12T10:00:00Z",
    updatedAt: "2026-01-14T10:00:00Z",
    lastStudied: "2026-01-14T10:00:00Z",
  },
  {
    id: "r3",
    title: "The Doctrine of Grace",
    description:
      "Understanding God's unmerited favor - what grace truly means.",
    mainScriptures: ["Ephesians 2:8-9", "Romans 3:23-24", "Titus 2:11-14"],
    keyPoints: [
      "Grace is God's unmerited favor - we don't earn it",
      "Salvation is entirely by grace through faith",
      "Grace teaches us to say no to ungodliness",
    ],
    myFindings:
      "Grace is both the foundation of salvation and the power for sanctification.",
    questions: [
      "How do I avoid turning grace into a license to sin?",
      "What's the difference between cheap grace and costly grace?",
    ],
    resources: [
      "What's So Amazing About Grace? - Philip Yancey",
      "The Cost of Discipleship - Dietrich Bonhoeffer",
    ],
    status: "not-started",
    priority: "medium",
    tags: ["Grace", "Salvation", "Sanctification"],
    createdAt: "2026-01-13T10:00:00Z",
    updatedAt: "2026-01-13T10:00:00Z",
  },
];

// --- DEMO BIBLE DATA ---
export const DEMO_BIBLE: { [key: string]: { [key: number]: ChapterData } } = {
  John: {
    1: {
      reference: "John 1",
      translation: "KJV",
      verses: [
        {
          verse: 1,
          text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
        },
        { verse: 2, text: "The same was in the beginning with God." },
        {
          verse: 3,
          text: "All things were made by him; and without him was not any thing made that was made.",
        },
        {
          verse: 4,
          text: "In him was life; and the life was the light of men.",
        },
        {
          verse: 5,
          text: "And the light shineth in darkness; and the darkness comprehended it not.",
        },
        {
          verse: 6,
          text: "There was a man sent from God, whose name was John.",
        },
        {
          verse: 7,
          text: "The same came for a witness, to bear witness of the Light, that all men through him might believe.",
        },
        {
          verse: 8,
          text: "He was not that Light, but was sent to bear witness of that Light.",
        },
        {
          verse: 9,
          text: "That was the true Light, which lighteth every man that cometh into the world.",
        },
        {
          verse: 10,
          text: "He was in the world, and the world was made by him, and the world knew him not.",
        },
        {
          verse: 11,
          text: "He came unto his own, and his own received him not.",
        },
        {
          verse: 12,
          text: "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:",
        },
        {
          verse: 13,
          text: "Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God.",
        },
        {
          verse: 14,
          text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
        },
        {
          verse: 15,
          text: "John bare witness of him, and cried, saying, This was he of whom I spake, He that cometh after me is preferred before me: for he was before me.",
        },
        {
          verse: 16,
          text: "And of his fulness have all we received, and grace for grace.",
        },
        {
          verse: 17,
          text: "For the law was given by Moses, but grace and truth came by Jesus Christ.",
        },
        {
          verse: 18,
          text: "No man hath seen God at any time; the only begotten Son, which is in the bosom of the Father, he hath declared him.",
        },
      ],
    },
  },
};

// --- CONTEXT ---
interface DataContextType {
  sermons: Sermon[];
  setSermons: React.Dispatch<React.SetStateAction<Sermon[]>>;
  researchTopics: ResearchTopic[];
  setResearchTopics: React.Dispatch<React.SetStateAction<ResearchTopic[]>>;
  pendingTopics: PendingTopic[];
  setPendingTopics: React.Dispatch<React.SetStateAction<PendingTopic[]>>;
  confusingParts: ConfusingPart[];
  setConfusingParts: React.Dispatch<React.SetStateAction<ConfusingPart[]>>;
  verseNotes: { [key: string]: string };
  setVerseNotes: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  getResearch: (id: string) => ResearchTopic | undefined;
  getSermon: (id: string) => Sermon | undefined;
  updateResearch: (id: string, data: Partial<ResearchTopic>) => void;
  updateSermon: (id: string, data: Partial<Sermon>) => void;
  deleteResearch: (id: string) => void;
  deleteSermon: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [researchTopics, setResearchTopics] = useState<ResearchTopic[]>([]);
  const [pendingTopics, setPendingTopics] = useState<PendingTopic[]>([]);
  const [confusingParts, setConfusingParts] = useState<ConfusingPart[]>([]);
  const [verseNotes, setVerseNotes] = useState<{ [key: string]: string }>({});

  // Load from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const savedSermons = localStorage.getItem("sermons");
        setSermons(savedSermons ? JSON.parse(savedSermons) : SAMPLE_SERMONS);

        const savedResearch = localStorage.getItem("researchTopics");
        setResearchTopics(
          savedResearch ? JSON.parse(savedResearch) : SAMPLE_RESEARCH,
        );

        const savedTopics = localStorage.getItem("pendingTopics");
        setPendingTopics(savedTopics ? JSON.parse(savedTopics) : []);

        const savedConfusing = localStorage.getItem("confusingParts");
        setConfusingParts(savedConfusing ? JSON.parse(savedConfusing) : []);

        const savedNotes = localStorage.getItem("bibleStudyNotes");
        setVerseNotes(savedNotes ? JSON.parse(savedNotes) : {});
      } catch (e) {
        console.error("Error loading data:", e);
        // Fallback to samples
        setSermons(SAMPLE_SERMONS);
        setResearchTopics(SAMPLE_RESEARCH);
      }
    };
    loadData();
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("sermons", JSON.stringify(sermons));
  }, [sermons]);

  useEffect(() => {
    localStorage.setItem("researchTopics", JSON.stringify(researchTopics));
  }, [researchTopics]);

  useEffect(() => {
    localStorage.setItem("pendingTopics", JSON.stringify(pendingTopics));
  }, [pendingTopics]);

  useEffect(() => {
    localStorage.setItem("confusingParts", JSON.stringify(confusingParts));
  }, [confusingParts]);

  useEffect(() => {
    localStorage.setItem("bibleStudyNotes", JSON.stringify(verseNotes));
  }, [verseNotes]);

  const getResearch = (id: string) => researchTopics.find((r) => r.id === id);
  const getSermon = (id: string) => sermons.find((s) => s.id === id);

  const updateResearch = (id: string, data: Partial<ResearchTopic>) => {
    setResearchTopics((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, ...data, updatedAt: new Date().toISOString() }
          : r,
      ),
    );
  };

  const updateSermon = (id: string, data: Partial<Sermon>) => {
    setSermons((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, ...data, updatedAt: new Date().toISOString() }
          : s,
      ),
    );
  };

  const deleteResearch = (id: string) => {
    if (confirm("Delete this research topic?")) {
      setResearchTopics((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const deleteSermon = (id: string) => {
    if (confirm("Delete this sermon?")) {
      setSermons((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <DataContext.Provider
      value={{
        sermons,
        setSermons,
        researchTopics,
        setResearchTopics,
        pendingTopics,
        setPendingTopics,
        confusingParts,
        setConfusingParts,
        verseNotes,
        setVerseNotes,
        getResearch,
        getSermon,
        updateResearch,
        updateSermon,
        deleteResearch,
        deleteSermon,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

export const AVAILABLE_BOOKS = ["John"];
export const AVAILABLE_CHAPTERS = [1, 2, 3, 4, 5];
