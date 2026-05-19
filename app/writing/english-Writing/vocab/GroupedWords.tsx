"use client";

import { useState, useEffect, useCallback } from "react";
// import SynonymFamilyComponent from "../../../components/SynonymFamily";
import SynonymFamilyComponent from "./SynonymFamily";
import AddWordModal from "./AddWordModal";
import { SynonymFamily } from "../../../../lib/types/vocabTypes";
import { Button } from "@/components/ui/button";

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

export default function EnglishPage({
  word,
  // type,
}: {
  word: string;
  // type: "group" | "vocab";
}) {
  const [synonymFamilies, setSynonymFamilies] = useState<SynonymFamily[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Save to localStorage
  const fetchFamilies = useCallback(async () => {
    try {
      const response = await fetch("/api/group");
      const data = await response.json();
      setSynonymFamilies(data.families || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchFamilies();
  }, [fetchFamilies]);

  const handleAddWord = async (
    word: string,
    description: string,
    example: string,
    wordFamily: {
      word: string;
      partOfSpeech: string;
      example: string;
    }[],
    synonyms: string[],
  ) => {
    if (!selectedFamilyId) return;

    const newWord = {
      id: `${word}-${Date.now()}`,
      word,
      description,
      example,
      wordFamily: wordFamily.map((wf, idx) => ({
        id: `${Date.now()}-${idx}`,
        ...wf,
      })),
      synonyms,
      createdAt: new Date(),
    };

    await fetch("/api/group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        familyId: selectedFamilyId,
        word: newWord,
        action: "addWord",
      }),
    });

    await fetchFamilies();
  };

  const handleDeleteWord = async (familyId: string, wordId: string) => {
    await fetch("/api/group", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        familyId,
        wordId,
      }),
    });

    await fetchFamilies();
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl ">
        {filteredFamilies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No vocabulary found. Add some words to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <SynonymFamilyComponent
              fetchFamilies={fetchFamilies}
              families={filteredFamilies}
              family={
                filteredFamilies.find(
                  (e) =>
                    e.name?.trim()?.toLowerCase() ===
                    word?.trim()?.toLowerCase(),
                )!
              }
              onAddWord={(familyId) => {
                setSelectedFamilyId(familyId);
                setIsModalOpen(true);
              }}
              onDeleteWord={handleDeleteWord}
            />
          </div>
        )}
      </div>

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
