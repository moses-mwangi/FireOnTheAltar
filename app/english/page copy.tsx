"use client";

import { useState, useEffect } from "react";
import { Plus, BookOpen, Search, Filter } from "lucide-react";
import VocabularyGroup from "./components/VocabularyGroup";
import AddWordModal from "./components/AddWordModal";
import GrammarSection from "./components/GrammarSection";
import { VocabularyGroup as VocabularyGroupType, GrammarTopic } from "./types";
import { initialSynonymFamilies } from "./page";

// Initial mock data
// const initialVocabularyGroups: VocabularyGroupType[] =
const initialVocabularyGroups = initialSynonymFamilies.map((family) => ({
  id: family.id,
  name: family.name,
  description: family.theme,
  words: family.words.map((word) => ({
    id: word.id,
    word: word.word,
    description: word.description,
    example: word.example,
    createdAt: word.createdAt,
  })),
}));

const initialVocabularyGroupss = [
  {
    id: "1",
    name: "Ways of Seeing",
    description: "Different verbs related to using your eyes",
    words: [
      {
        id: "1-1",
        word: "see",
        description: "To perceive with your eyes; the most general term",
        example: "I see a bird in the tree.",
        createdAt: new Date(),
      },
      {
        id: "1-2",
        word: "watch",
        description:
          "To look at something carefully over time, especially something moving or changing",
        example: "I'm watching a movie.",
        createdAt: new Date(),
      },
      {
        id: "1-3",
        word: "look",
        description: "To direct your eyes toward something",
        example: "Look at that beautiful sunset!",
        createdAt: new Date(),
      },
      {
        id: "1-4",
        word: "glance",
        description: "To look quickly at something",
        example: "She glanced at her watch.",
        createdAt: new Date(),
      },
      {
        id: "1-5",
        word: "stare",
        description: "To look at something for a long time without blinking",
        example: "Don't stare at people.",
        createdAt: new Date(),
      },
      {
        id: "1-6",
        word: "glimpse",
        description: "To see something briefly or partially",
        example: "I caught a glimpse of the celebrity.",
        createdAt: new Date(),
      },
    ],
  },
  {
    id: "2",
    name: "Speaking & Communication",
    description: "Different ways to express yourself verbally",
    words: [
      {
        id: "2-1",
        word: "say",
        description: "To speak words; focuses on the words themselves",
        example: "He said 'hello'.",
        createdAt: new Date(),
      },
      {
        id: "2-2",
        word: "tell",
        description: "To give information to someone",
        example: "Tell me a story.",
        createdAt: new Date(),
      },
      {
        id: "2-3",
        word: "speak",
        description: "To talk; often used for languages or formal situations",
        example: "I speak English.",
        createdAt: new Date(),
      },
      {
        id: "2-4",
        word: "talk",
        description: "To have a conversation",
        example: "We talked for hours.",
        createdAt: new Date(),
      },
      {
        id: "2-5",
        word: "whisper",
        description: "To speak very quietly",
        example: "She whispered a secret.",
        createdAt: new Date(),
      },
    ],
  },
  {
    id: "3",
    name: "Emotions & Feelings",
    description: "Vocabulary to express your emotional state",
    words: [
      {
        id: "3-1",
        word: "happy",
        description: "Feeling or showing pleasure or contentment",
        example: "I'm happy to see you.",
        createdAt: new Date(),
      },
      {
        id: "3-2",
        word: "sad",
        description: "Feeling or showing sorrow; unhappy",
        example: "She was sad when her friend moved away.",
        createdAt: new Date(),
      },
      {
        id: "3-3",
        word: "excited",
        description: "Very enthusiastic and eager",
        example: "The children were excited about the trip.",
        createdAt: new Date(),
      },
      {
        id: "3-4",
        word: "anxious",
        description: "Feeling worried or nervous",
        example: "I feel anxious before exams.",
        createdAt: new Date(),
      },
    ],
  },
];

const grammarTopics: GrammarTopic[] = [
  {
    id: "1",
    title: "Present Simple vs. Present Continuous",
    explanation:
      "Present Simple is for habits and facts. Present Continuous is for actions happening now or temporary situations.",
    examples: [
      "I work at a bank. (habit/fact - Present Simple)",
      "I'm working from home today. (temporary - Present Continuous)",
      "She speaks three languages. (fact - Present Simple)",
      "She's speaking with her boss right now. (right now - Present Continuous)",
    ],
  },
  {
    id: "2",
    title: "Modal Verbs: Can, Could, May",
    explanation: "Modals express ability, possibility, permission, or request.",
    examples: [
      "I can swim. (ability)",
      "Could you help me? (polite request)",
      "May I come in? (permission)",
      "It may rain later. (possibility)",
    ],
  },
  {
    id: "3",
    title: "Prepositions of Time: In, On, At",
    explanation:
      "Use AT for specific times, ON for days/dates, IN for months/years/parts of day.",
    examples: [
      "at 5 o'clock, at night, at the weekend",
      "on Monday, on July 4th, on my birthday",
      "in the morning, in June, in 2024",
    ],
  },
];

export default function EnglishPage() {
  const [vocabularyGroups, setVocabularyGroups] = useState<
    VocabularyGroupType[]
  >(initialVocabularyGroups);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"vocabulary" | "grammar">(
    "vocabulary",
  );

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("english-vocabulary");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert dates back to Date objects
        const withDates = parsed.map((group: any) => ({
          ...group,
          words: group.words.map((word: any) => ({
            ...word,
            createdAt: new Date(word.createdAt),
          })),
        }));
        setVocabularyGroups(withDates);
      } catch (e) {
        console.error("Failed to load saved vocabulary");
      }
    }
  }, []);

  // Save to localStorage whenever vocabulary changes
  useEffect(() => {
    localStorage.setItem(
      "english-vocabulary",
      JSON.stringify(vocabularyGroups),
    );
  }, [vocabularyGroups]);

  const handleAddWord = (
    groupId: string,
    word: string,
    description: string,
    example: string,
  ) => {
    const newWord = {
      id: `${groupId}-${Date.now()}`,
      word,
      description,
      example: example || undefined,
      createdAt: new Date(),
    };

    setVocabularyGroups((groups) =>
      groups.map((group) =>
        group.id === groupId
          ? { ...group, words: [...group.words, newWord] }
          : group,
      ),
    );
  };

  const handleDeleteWord = (groupId: string, wordId: string) => {
    setVocabularyGroups((groups) =>
      groups.map((group) =>
        group.id === groupId
          ? { ...group, words: group.words.filter((w) => w.id !== wordId) }
          : group,
      ),
    );
  };

  const handleAddGroup = () => {
    const groupName = prompt("Enter group name:");
    if (!groupName) return;

    const groupDescription = prompt("Enter group description:");
    if (!groupDescription) return;

    const newGroup: VocabularyGroupType = {
      id: Date.now().toString(),
      name: groupName,
      description: groupDescription,
      words: [],
    };

    setVocabularyGroups([...vocabularyGroups, newGroup]);
  };

  const filteredGroups = vocabularyGroups
    .map((group) => ({
      ...group,
      words: group.words.filter(
        (word) =>
          word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
          word.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((group) => group.words.length > 0 || searchTerm === "");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">English Learning Hub</h1>
              <p className="text-purple-100">
                Master vocabulary, grammar, and expressions
              </p>
            </div>
            <BookOpen className="h-12 w-12 text-purple-200" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("vocabulary")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "vocabulary"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            📚 Vocabulary Groups
          </button>
          <button
            onClick={() => setActiveTab("grammar")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "grammar"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            📖 Grammar & Rules
          </button>
        </div>

        {activeTab === "vocabulary" ? (
          <>
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search words or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddGroup}
                  className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Group
                </button>
                <button
                  onClick={() => {
                    setSelectedGroupId(null);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Word
                </button>
              </div>
            </div>

            {/* Vocabulary Groups */}
            {filteredGroups.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No vocabulary found. Add some words to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredGroups.map((group) => (
                  <VocabularyGroup
                    key={group.id}
                    group={group}
                    onAddWord={(groupId) => {
                      setSelectedGroupId(groupId);
                      setIsModalOpen(true);
                    }}
                    onDeleteWord={handleDeleteWord}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <GrammarSection topics={grammarTopics} />
        )}
      </div>

      {/* Add Word Modal */}
      <AddWordModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGroupId(null);
        }}
        groups={vocabularyGroups}
        selectedGroupId={selectedGroupId}
        onAddWord={handleAddWord}
      />
    </div>
  );
}
