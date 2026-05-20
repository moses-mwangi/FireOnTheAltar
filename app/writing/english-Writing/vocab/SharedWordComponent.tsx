"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  speakWordWithDefinitionUtterance,
  wordUtterance,
} from "../../../../lib/types/speaker";
import WordCard from "./WordTest";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Minus, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

type Word = {
  id: number;
  word: string;
  meaning: string;
  example: string;
  level: "advanced" | "common" | string;
};

interface Props {
  title: string;
  words: Word[];
  newWord: any;
  setNewWord: (newWord: any) => void;
  openAddModal: boolean;
  setOpenAddModal: (open: boolean) => void;
  openDeleteModal: boolean;
  setOpenDeleteModal: (open: boolean) => void;
  onAddWord: () => void;
  onDeleteWord: (word: Word) => void;
  onEditWord: (word: Word) => void;
  fetchWords: () => Promise<void>;
}

export default function SharedVocabComponent({
  title,
  words,
  newWord,
  setNewWord,
  openAddModal,
  setOpenAddModal,
  openDeleteModal,
  setOpenDeleteModal,
  onAddWord,
  onDeleteWord,
  onEditWord,
  fetchWords,
}: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);

  /////////////////////////////////////////////////////
  const [wordFamily, setWordFamily] = useState([
    { word: "", partOfSpeech: "verb", example: "" },
  ]);
  const [synonyms, setSynonyms] = useState([""]);
  const [antonyms, setAntonyms] = useState([""]);

  const addWordFamilyMember = () => {
    setWordFamily([
      ...wordFamily,
      { word: "", partOfSpeech: "verb", example: "" },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validWordFamily = wordFamily.filter((wf) => wf.word.trim());
    const validSynonyms = synonyms.filter((s) => s.trim());
    const validAntonyms = antonyms.filter((s) => s.trim());

    const finalWord = {
      anatomy: antonyms,
      example: newWord.example,
      level: newWord.level,
      meaning: newWord.meaning,
      synonyms: synonyms,
      word: newWord.word,
      wordFamily: wordFamily,
    };
    console.log(newWord);

    // Reset form
    // setWord("");
    // setDescription("");
    // setExample("");

    // onClose();
  };
  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\////////////////

  const selectedWord = words?.find(
    (word) => String(word.id) === selectedWordId,
  );
  const remainingWords = words?.filter(
    (word) => String(word.id) !== selectedWordId,
  );

  return (
    <div className="space-y-5 min-h-[420px] dark:bg-zinc-900 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex justify-between items-center w-full px-4 pt-4">
          <h1 className="text-xl font-bold">{title}</h1>
          <Button
            onClick={() => setOpenAddModal(true)}
            className="px-3 cursor-pointer h-[31px] text-sm bg-blue-500 text-white hover:bg-blue-600 transition-all"
          >
            + Add Word
          </Button>
        </div>
      </div>
      <Separator />
      <div className="space-y-4  px-4 pb-4">
        {selectedWord && (
          <div className="w-full">
            <WordCard
              isFamilyWord={false}
              word={selectedWord}
              showDetails={true}
              onToggleDetails={() => setSelectedWordId(null)}
              fetchWords={fetchWords}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {remainingWords.map((word, index) => (
            <div
              className="flex-1"
              key={index}
              onClick={() => {
                setSelectedWordId(String(word.id));
              }}
            >
              <WordCard
                word={word}
                showDetails={showDetails}
                onToggleDetails={() => setSelectedWordId(String(word.id))}
                isFamilyWord={false}
                fetchWords={fetchWords}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            </div>
          ))}
        </div>
      </div>
      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedWord?.word}</DialogTitle>
          </DialogHeader>

          <>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-1">Meaning</h3>

                <p className="text-sm text-muted-foreground">
                  {selectedWord?.meaning}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-1">Example</h3>

                <p className="text-sm italic">{selectedWord?.example}</p>
              </div>

              <div>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                  {selectedWord?.level}
                </span>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  if (selectedWord) {
                    if (onDeleteWord) onDeleteWord(selectedWord);
                    setOpenDeleteModal(false);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </>
        </DialogContent>
      </Dialog>

      {/* Add Word Modal */}
      <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
        <DialogContent className=" min-w-3xl h-[70vh] no-scrollbar overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Add New Word</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Word"
              value={newWord.word}
              onChange={(e) =>
                setNewWord({
                  ...newWord,
                  word: e.target.value,
                })
              }
            />

            <Textarea
              placeholder="Meaning"
              value={newWord.meaning}
              onChange={(e) =>
                setNewWord({
                  ...newWord,
                  meaning: e.target.value,
                })
              }
            />

            <Textarea
              placeholder="Example sentence"
              value={newWord.example}
              onChange={(e) =>
                setNewWord({
                  ...newWord,
                  example: e.target.value,
                })
              }
            />

            <Select
              value={newWord.level}
              onValueChange={(value) => {
                setNewWord({
                  ...newWord,
                  level: value,
                });
              }}
              required
            >
              <SelectTrigger className="min-w-[150px] w-full cursor-pointer">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="w-full"
                sideOffset={4}
              >
                <SelectGroup>
                  <SelectItem className=" cursor-pointer" value="advanced">
                    advanced
                  </SelectItem>
                  <SelectItem className=" cursor-pointer" value="common">
                    common
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Word Family Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between items-center mb-3">
                <Label className="block text-sm font-medium">Word Family</Label>
                <button
                  type="button"
                  onClick={addWordFamilyMember}
                  className="text-sm cursor-pointer text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add member
                </button>
              </div>

              <div className="space-y-3">
                {wordFamily.map((member, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Word (e.g., communication)"
                        value={member.word}
                        onChange={(e) => {
                          const updatedFamily = wordFamily.map((item, i) =>
                            i === idx
                              ? { ...item, word: e.target.value }
                              : item,
                          );
                          updateWordFamilyMember(idx, "word", e.target.value);
                          setNewWord({
                            ...newWord,
                            wordFamily: updatedFamily,
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                    </div>

                    <Select
                      value={member.partOfSpeech}
                      onValueChange={(value) => {
                        const updatedFamily = wordFamily.map((item, i) =>
                          i === idx ? { ...item, partOfSpeech: value } : item,
                        );
                        updateWordFamilyMember(idx, "partOfSpeech", value);
                        setNewWord({
                          ...newWord,
                          wordFamily: updatedFamily,
                        });
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
                <Label className="block text-sm font-medium">Synonyms</Label>
                <button
                  type="button"
                  onClick={addSynonym}
                  className="text-sm cursor-pointer text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add synonym
                </button>
              </div>

              <div className="space-y-2">
                {synonyms.map((synonym, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Synonym"
                      value={synonym}
                      onChange={(e) => {
                        updateSynonym(idx, e.target.value);
                        setNewWord({
                          ...newWord,
                          synonyms: [...synonyms],
                        });
                      }}
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
                <Label className="block text-sm font-medium">Antonyms</Label>
                <button
                  type="button"
                  onClick={addAntonym}
                  className="text-sm cursor-pointer text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add antonym
                </button>
              </div>

              <div className="space-y-2">
                {antonyms.map((antonym, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="antonym"
                      value={antonym}
                      onChange={(e) => {
                        updateAntonym(idx, e.target.value);
                        setNewWord({
                          ...newWord,
                          // antonym: [...antonyms],
                          antonyms: [...antonyms],
                        });
                      }}
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

            <Button
              onClick={() => {
                onAddWord();
                setWordFamily([
                  { word: "", partOfSpeech: "verb", example: "" },
                ]);
                setSynonyms([""]);
                setAntonyms([""]);
              }}
              className="w-full bg-purple-600 hover:bg-purple-600/65 transition-all"
            >
              Save Word
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
