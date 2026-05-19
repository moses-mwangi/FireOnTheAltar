"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export interface WordFamily {
  id: string;
  word: string;
  partOfSpeech: string;
  example: string;
}

export interface Word {
  id: string;
  word: string;
  description: string;
  example: string;
  wordFamily: WordFamily[];
  synonyms: string[];

  difficulty?: string;
  antonyms?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// export interface SynonymFamily {
//   id: string;
//   word: string;
//   theme: string;
//   difficulty: "beginner" | "intermediate" | "advanced";
//   words: Word[];
//   createdAt?: string;
//   updatedAt?: string;
// }

export const initialSynonymFamilies: Word = {
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
};

interface EditWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: Word | Partial<Word>;
  onUpdateWord: (updates: any) => void;
  isFamilyWord?: boolean;
}

export default function EditWordModal({
  isOpen = true,
  isFamilyWord = true,
  onClose = () => {},
  word = initialSynonymFamilies,
  onUpdateWord,
}: EditWordModalProps) {
  const [name, setName] = useState(word.word);
  const [theme, setTheme] = useState(word.description || (word as any).meaning);
  const [example, setExample] = useState(word.example);

  const [wordFamily, setWordFamily] = useState(
    word.wordFamily || [{ word: "", partOfSpeech: "verb", example: "" }],
  );

  const [synonyms, setSynonyms] = useState(word.synonyms || [""]);
  const [antonyms, setAntonyms] = useState(word.antonyms || [""]);

  useEffect(() => {
    setName(word.word || "");
    setTheme(word.description || (word as any).meaning);
    setExample(word.example || "");
    setWordFamily(
      word.wordFamily || [
        {
          id: `${crypto.randomUUID()}-${Date.now()}`,
          word: "",
          partOfSpeech: "verb",
          example: "",
        },
      ],
    );
    setSynonyms(word.synonyms || [""]);
    setAntonyms(word.antonyms || [""]);
  }, [word]);

  if (!isOpen) return null;

  const addWordFamilyMember = () => {
    const wordFam = wordFamily as WordFamily[];
    setWordFamily([
      ...wordFam,
      { id: "1", word: "", partOfSpeech: "verb", example: "" },
    ]);
  };

  const removeWordFamilyMember = (index: number) => {
    setWordFamily(wordFamily.filter((_, i) => i !== index));
  };

  const updateWordFamilyMember = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updated = [...wordFamily];
    updated[index] = { ...updated[index], [field]: value };
    setWordFamily(updated);
  };

  const addSynonym = () => {
    setSynonyms([...synonyms, ""]);
  };

  const removeSynonym = (index: number) => {
    setSynonyms(synonyms.filter((_, i) => i !== index));
  };

  const updateSynonym = (index: number, value: string) => {
    const updated = [...synonyms];
    updated[index] = value;
    setSynonyms(updated);
  };

  const addAntonym = () => {
    setAntonyms([...antonyms, ""]);
  };

  const removeAntonym = (index: number) => {
    setAntonyms(antonyms.filter((_, i) => i !== index));
  };

  const updateAntonym = (index: number, value: string) => {
    const updated = [...antonyms];
    updated[index] = value;
    setAntonyms(updated);
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFamilyWord) {
      const updatedWord = {
        word: name,
        description: theme,
        example,
        wordFamily,
        synonyms,
        antonyms,
      };
      onUpdateWord(updatedWord);
    } else {
      const updatedWord = {
        word: name,
        meaning: theme,
        example,
        wordFamily,
        synonyms,
        antonyms,
      };
      onUpdateWord(updatedWord);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-h-[500px] max-w-4xl relative no-scrollbar overflow-y-auto">
        <div className="px-6 py-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>

          <h2
            onClick={() => {
              console.log(word);
            }}
            className="text-2xl font-bold"
          >
            Edit Word
          </h2>
        </div>
        <Separator />
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <Label className="block text-sm font-medium mb-1">Main Word</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
              autoFocus
            />
          </div>

          <div>
            <Label className="block text-sm font-medium mb-1">
              Descrption / Meaning *
            </Label>
            <Textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <Label className="block text-sm font-medium mb-2">
              Example Sentence
            </Label>
            <Input
              type="text"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="e.g., We need to communicate effectively."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Word Family Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center mb-3">
              <Label className="block text-sm font-medium">
                Word Family Members
              </Label>
              <button
                type="button"
                onClick={addWordFamilyMember}
                className="text-sm cursor-pointer text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add member
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Add different forms of the word (e.g., communicate →
              communication, communicator, communicative)
            </p>
            <div className="space-y-3">
              {wordFamily.map((member, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Word (e.g., communication)"
                      value={member.word}
                      onChange={(e) =>
                        updateWordFamilyMember(idx, "word", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                  </div>

                  <Select
                    value={member.partOfSpeech}
                    onValueChange={(value) => {
                      updateWordFamilyMember(idx, "partOfSpeech", value);
                    }}
                    required
                  >
                    <SelectTrigger className="min-w-[150px] cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="w-full"
                      sideOffset={4}
                    >
                      <SelectGroup>
                        <SelectItem value="noun">noun</SelectItem>
                        <SelectItem value="verb">verb</SelectItem>
                        <SelectItem value="adjective">adjective</SelectItem>
                        <SelectItem value="adverb">adverb</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <button
                    type="button"
                    onClick={() => removeWordFamilyMember(idx)}
                    className="p-2 cursor-pointer text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Synonyms Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center mb-3">
              <Label className="block text-sm font-medium">
                Synonyms in this family
              </Label>
              <button
                type="button"
                onClick={addSynonym}
                className="text-sm cursor-pointer text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add synonym
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Add related words with similar meaning (e.g., for
              &quot;talk&quot;: speak, say, chat, converse)
            </p>
            <div className="space-y-2">
              {synonyms.map((synonym, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Synonym"
                    value={synonym}
                    onChange={(e) => updateSynonym(idx, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeSynonym(idx)}
                    className="p-2 cursor-pointer text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Antonyms Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center mb-3">
              <Label className="block text-sm font-medium">
                Antonyms in this family
              </Label>
              <button
                type="button"
                onClick={addAntonym}
                className="text-sm cursor-pointer text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add antonym
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Add related words with similar meaning
            </p>

            <div className="space-y-2">
              {antonyms.map((antonym, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="antonym"
                    value={antonym}
                    onChange={(e) => updateAntonym(idx, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeAntonym(idx)}
                    className="p-2 cursor-pointer text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Update Word
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
