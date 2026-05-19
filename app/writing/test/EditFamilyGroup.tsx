"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { SynonymFamily } from "@/lib/types/vocabTypes";

export const initialSynonymFamilies: SynonymFamily = {
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
};

interface EditFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  family: SynonymFamily;
  onUpdateFamily: (familyId: string, updates: Partial<SynonymFamily>) => void;
}

export default function EditFamilyModal({
  isOpen = true,
  onClose = () => {},
  family = initialSynonymFamilies,
  onUpdateFamily,
}: EditFamilyModalProps) {
  const [name, setName] = useState(family.name);
  const [theme, setTheme] = useState(family.theme);
  const [difficulty, setDifficulty] = useState(family.difficulty);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFamily(family.id, { name, theme, difficulty });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Edit Family</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Family Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Theme</label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Update Family
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
