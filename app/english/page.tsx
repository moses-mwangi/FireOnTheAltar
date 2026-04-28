"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Layers, BookOpen } from "lucide-react";
import SynonymFamilyComponent from "./components/SynonymFamily";
import AddWordModal from "./components/AddWordModal";
import GrammarSection from "./components/GrammarSection";
import { SynonymFamily, GrammarTopic, Word } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AllWordsView from "./components/AllWordsView";
import Header from "./components/Header";
import NotesSection from "./components/NotesSection";

export const initialSynonymFamilies: SynonymFamily[] = [
  {
    id: "1",
    name: "Communication Verbs",
    theme: "Ways to express yourself verbally",
    difficulty: "intermediate",
    words: [
      {
        id: "1-1",
        word: "talk",
        description: "To speak to someone, often in a casual conversation",
        example: "We talked for hours about our dreams.",
        wordFamily: [
          {
            id: "1-1-1",
            word: "talk",
            partOfSpeech: "verb",
            example: "Let's talk tomorrow.",
          },
          {
            id: "1-1-2",
            word: "talker",
            partOfSpeech: "noun",
            example: "He's a great talker.",
          },
          {
            id: "1-1-3",
            word: "talkative",
            partOfSpeech: "adjective",
            example: "She's very talkative.",
          },
        ],
        synonyms: ["speak", "chat", "converse"],
      },
      {
        id: "1-2",
        word: "speak",
        description:
          "To talk in order to give information, often more formal than 'talk'",
        example: "She speaks three languages fluently.",
        wordFamily: [
          {
            id: "1-2-1",
            word: "speak",
            partOfSpeech: "verb",
            example: "Please speak slowly.",
          },
          {
            id: "1-2-2",
            word: "speaker",
            partOfSpeech: "noun",
            example: "He's a motivational speaker.",
          },
          {
            id: "1-2-3",
            word: "speech",
            partOfSpeech: "noun",
            example: "She gave an inspiring speech.",
          },
          {
            id: "1-2-4",
            word: "spoken",
            partOfSpeech: "adjective",
            example: "Spoken English is different.",
          },
        ],
        synonyms: ["talk", "address", "orate"],
      },
      {
        id: "1-3",
        word: "say",
        description:
          "To express something using words; focuses on the words themselves",
        example: "He said he would be late.",
        wordFamily: [
          {
            id: "1-3-1",
            word: "say",
            partOfSpeech: "verb",
            example: "What did you say?",
          },
          {
            id: "1-3-2",
            word: "saying",
            partOfSpeech: "noun",
            example: "As the saying goes...",
          },
        ],
        synonyms: ["state", "declare", "mention"],
      },
      {
        id: "1-4",
        word: "communicate",
        description: "To share information, thoughts, or feelings with others",
        example: "We need to communicate better as a team.",
        wordFamily: [
          {
            id: "1-4-1",
            word: "communicate",
            partOfSpeech: "verb",
            example: "They communicate via email.",
          },
          {
            id: "1-4-2",
            word: "communication",
            partOfSpeech: "noun",
            example: "Good communication is key.",
          },
          {
            id: "1-4-3",
            word: "communicator",
            partOfSpeech: "noun",
            example: "She's an excellent communicator.",
          },
          {
            id: "1-4-4",
            word: "communicative",
            partOfSpeech: "adjective",
            example: "He's very communicative.",
          },
          {
            id: "1-4-5",
            word: "communicable",
            partOfSpeech: "adjective",
            example: "Ideas are communicable.",
          },
        ],
        synonyms: ["convey", "express", "transmit"],
      },
      {
        id: "1-5",
        word: "chat",
        description: "To talk in a friendly, informal way",
        example: "Let's chat over coffee.",
        wordFamily: [
          {
            id: "1-5-1",
            word: "chat",
            partOfSpeech: "verb",
            example: "We chatted online.",
          },
          {
            id: "1-5-2",
            word: "chatty",
            partOfSpeech: "adjective",
            example: "She's in a chatty mood.",
          },
        ],
        synonyms: ["gossip", "chatter", "visit"],
      },
      {
        id: "1-6",
        word: "whisper",
        description: "To speak very quietly, often to share a secret",
        example: "She whispered something in his ear.",
        wordFamily: [
          {
            id: "1-6-1",
            word: "whisper",
            partOfSpeech: "verb",
            example: "Don't whisper in class.",
          },
          {
            id: "1-6-2",
            word: "whisperer",
            partOfSpeech: "noun",
            example: "The horse whisperer.",
          },
          {
            id: "1-6-3",
            word: "whispering",
            partOfSpeech: "noun",
            example: "I heard whispering behind me.",
          },
        ],
        synonyms: ["murmur", "mutter", "hiss"],
      },
    ],
  },
  {
    id: "2",
    name: "Vision & Perception",
    theme: "Different ways of seeing and observing",
    difficulty: "intermediate",
    words: [
      {
        id: "2-1",
        word: "see",
        description: "To perceive with your eyes; the most general term",
        example: "I see a bird in the tree.",
        wordFamily: [
          {
            id: "2-1-1",
            word: "see",
            partOfSpeech: "verb",
            example: "Can you see the moon?",
          },
          {
            id: "2-1-2",
            word: "seeing",
            partOfSpeech: "noun",
            example: "Seeing is believing.",
          },
          {
            id: "2-1-3",
            word: "seer",
            partOfSpeech: "noun",
            example: "A seer predicts the future.",
          },
        ],
        synonyms: ["perceive", "spot", "notice"],
      },
      {
        id: "2-2",
        word: "watch",
        description:
          "To look at something carefully over time, especially something moving",
        example: "I'm watching a documentary.",
        wordFamily: [
          {
            id: "2-2-1",
            word: "watch",
            partOfSpeech: "verb",
            example: "Watch this!",
          },
          {
            id: "2-2-2",
            word: "watcher",
            partOfSpeech: "noun",
            example: "Bird watchers are patient.",
          },
          {
            id: "2-2-3",
            word: "watchful",
            partOfSpeech: "adjective",
            example: "Stay watchful.",
          },
        ],
        synonyms: ["observe", "view", "monitor"],
      },
      {
        id: "2-3",
        word: "glance",
        description: "To look quickly at something",
        example: "She glanced at her watch.",
        wordFamily: [
          {
            id: "2-3-1",
            word: "glance",
            partOfSpeech: "verb",
            example: "He glanced over his shoulder.",
          },
          {
            id: "2-3-2",
            word: "glancing",
            partOfSpeech: "adjective",
            example: "A glancing blow.",
          },
        ],
        synonyms: ["peek", "glimpse", "skim"],
      },
    ],
  },
  {
    id: "3",
    name: "Emotions & Feelings",
    theme: "Vocabulary to express your emotional state",
    difficulty: "beginner",
    words: [
      {
        id: "3-1",
        word: "happy",
        description: "Feeling or showing pleasure or contentment",
        example: "I'm happy to see you.",
        wordFamily: [
          {
            id: "3-1-1",
            word: "happy",
            partOfSpeech: "adjective",
            example: "She's a happy child.",
          },
          {
            id: "3-1-2",
            word: "happily",
            partOfSpeech: "adverb",
            example: "They lived happily ever after.",
          },
          {
            id: "3-1-3",
            word: "happiness",
            partOfSpeech: "noun",
            example: "Money can't buy happiness.",
          },
          {
            id: "3-1-4",
            word: "unhappy",
            partOfSpeech: "adjective",
            example: "He was unhappy with the result.",
          },
        ],
        synonyms: ["joyful", "cheerful", "delighted", "pleased"],
        antonyms: ["sad", "unhappy", "miserable"],
      },
      {
        id: "3-2",
        word: "excited",
        description: "Very enthusiastic and eager about something",
        example: "The children were excited about the trip.",
        wordFamily: [
          {
            id: "3-2-1",
            word: "excite",
            partOfSpeech: "verb",
            example: "The news excited everyone.",
          },
          {
            id: "3-2-2",
            word: "excited",
            partOfSpeech: "adjective",
            example: "I'm so excited!",
          },
          {
            id: "3-2-3",
            word: "exciting",
            partOfSpeech: "adjective",
            example: "An exciting adventure.",
          },
          {
            id: "3-2-4",
            word: "excitement",
            partOfSpeech: "noun",
            example: "The excitement was palpable.",
          },
        ],
        synonyms: ["thrilled", "enthusiastic", "eager", "pumped"],
      },
    ],
  },
];

const grammarTopics: GrammarTopic[] = [
  {
    id: "1",
    title: "Word Families - How to Build Vocabulary",
    explanation:
      "A word family is a group of words that share a common root. Learning word families helps you quickly expand your vocabulary.",
    examples: [
      "communicate (verb) → communication (noun) → communicative (adjective)",
      "happy (adj) → happily (adv) → happiness (noun) → unhappy (opposite)",
      "see (verb) → sight (noun) → unseen (adjective)",
    ],
  },
  {
    id: "2",
    title: "Synonyms vs. Word Families",
    explanation:
      "Synonyms are different words with similar meanings. Word families are variations of the SAME root word with different grammatical functions.",
    examples: [
      "Synonyms: talk, speak, say, communicate (different roots, similar meaning)",
      "Word family: communicate, communication, communicator, communicative (same root, different forms)",
    ],
  },
];

export default function EnglishPage() {
  const [synonymFamilies, setSynonymFamilies] = useState<SynonymFamily[]>(
    () => {
      if (typeof window === "undefined") return initialSynonymFamilies;
      try {
        const saved = localStorage.getItem("english-synonym-families");
        if (!saved) return initialSynonymFamilies;
        return JSON.parse(saved) as SynonymFamily[];
      } catch (e) {
        console.error("Failed to load saved vocabulary");
        return initialSynonymFamilies;
      }
    },
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "vocabulary" | "grammar" | "all-words" | "notes"
  >("vocabulary");

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "english-synonym-families",
      JSON.stringify(synonymFamilies),
    );
  }, [synonymFamilies]);

  // Add this function before the return statement
  const getAllWords = () => {
    return synonymFamilies.flatMap((family) => family.words);
  };

  const handleAddWord = (
    familyId: string,
    word: string,
    description: string,
    example: string,
    wordFamily: { word: string; partOfSpeech: string; example: string }[],
    synonyms: string[],
  ) => {
    const newWord = {
      id: `${familyId}-${Date.now()}`,
      word,
      description,
      example: example || undefined,
      wordFamily: wordFamily.map((wf, idx) => ({
        id: `${Date.now()}-${idx}`,
        ...wf,
      })),
      synonyms,
      createdAt: new Date(),
    };

    setSynonymFamilies((families) =>
      families.map((family) =>
        family.id === familyId
          ? { ...family, words: [...family.words, newWord] }
          : family,
      ),
    );
  };

  const handleDeleteWord = (familyId: string, wordId: string) => {
    setSynonymFamilies((families) =>
      families.map((family) =>
        family.id === familyId
          ? { ...family, words: family.words.filter((w) => w.id !== wordId) }
          : family,
      ),
    );
  };

  const handleAddFamily = () => {
    const name = prompt("Enter synonym family name (e.g., 'Movement Verbs'):");
    if (!name) return;
    const theme = prompt(
      "Enter theme description (e.g., 'Different ways to move'):",
    );
    if (!theme) return;
    const difficulty = prompt(
      "Enter difficulty (beginner/intermediate/advanced):",
      "intermediate",
    );

    const newFamily: SynonymFamily = {
      id: Date.now().toString(),
      name,
      theme,
      difficulty: (difficulty as any) || "intermediate",
      words: [],
    };

    setSynonymFamilies([...synonymFamilies, newFamily]);
  };

  const filteredFamilies = synonymFamilies
    .map((family) => ({
      ...family,
      words: family.words.filter(
        (word) =>
          word?.word?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          word?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          word?.wordFamily?.some((wf) =>
            wf.word.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      ),
    }))
    .filter((family) => family.words.length > 0 || searchTerm === "");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          <Label
            onClick={() => setActiveTab("vocabulary")}
            className={`px-6 py-3 text-[15px] font-medium transition-colors cursor-pointer ${
              activeTab === "vocabulary"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            {/* 📚 Synonym Families */}
            Synonym Families
          </Label>
          <Label
            onClick={() => setActiveTab("all-words")}
            className={`px-6 py-3 text-[15px] font-medium transition-colors cursor-pointer ${
              activeTab === "all-words"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            All Words
          </Label>
          <Label
            onClick={() => setActiveTab("grammar")}
            className={`px-6 py-3 text-[15px] font-medium transition-colors cursor-pointer ${
              activeTab === "grammar"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Grammar & Word Families
          </Label>
          <Label
            onClick={() => setActiveTab("notes")}
            className={`px-6 py-3 text-[15px] font-medium transition-colors cursor-pointer ${
              activeTab === "notes"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            English Notes
          </Label>
        </div>

        {activeTab === "vocabulary" ? (
          <>
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Search words or word families..."
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleAddFamily}
                  className="flex items-center bg-transparent cursor-pointer gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Synonym Family
                </Button>
                <Button
                  onClick={() => {
                    setSelectedFamilyId(null);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Word
                </Button>
              </div>
            </div>

            {/* Synonym Families */}
            {filteredFamilies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No vocabulary found. Add some words to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredFamilies.map((family) => (
                  <SynonymFamilyComponent
                    key={family.id}
                    family={family}
                    onAddWord={(familyId) => {
                      setSelectedFamilyId(familyId);
                      setIsModalOpen(true);
                    }}
                    onDeleteWord={handleDeleteWord}
                  />
                ))}
              </div>
            )}
          </>
        ) : activeTab === "all-words" ? (
          <AllWordsView
            words={getAllWords()}
            onDeleteWord={handleDeleteWord}
            families={synonymFamilies.map((f) => ({ id: f.id, name: f.name }))}
          />
        ) : activeTab === "grammar" ? (
          // <GrammarSection topics={grammarTopics} />
          <GrammarSection />
        ) : (
          <NotesSection />
        )}
      </div>

      {/* Add Word Modal */}
      <AddWordModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFamilyId(null);
        }}
        families={synonymFamilies}
        selectedFamilyId={selectedFamilyId}
        onAddWord={handleAddWord}
      />
    </div>
  );
}
