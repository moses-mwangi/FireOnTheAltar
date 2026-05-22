"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  speakWordWithDefinitionUtterance,
  wordUtterance,
} from "../../../../lib/types/speaker";
import WordCard from "./WordTest";

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
  onAddWord: () => void;
  onDeleteWord: (word: Word) => void;
  onEditWord: (word: Word) => void;
}

export default function SharedVocabComponent({
  title,
  words,
  newWord,
  setNewWord,
  openAddModal,
  setOpenAddModal,
  onAddWord,
  onDeleteWord,
  onEditWord,
}: Props) {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [openWordModal, setOpenWordModal] = useState(false);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);

  const speakWord = (word: string, definition?: string) => {
    wordUtterance(word, setSpeakingWord);
  };
  const speakWordWithDefinition = (word: string, definition: string) => {
    speakWordWithDefinitionUtterance(word, setSpeakingWord, definition);
  };

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

      <div className="flex flex-wrap gap-3 px-4 pb-4">
        {/* <div
        className={`px-4 pb-4 grid ${
          false
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3"
        }`}
      > */}

        {words.map((word, index) => (
          <>
            <WordCard
              word={word}
              // fetchFamilies={fetchFamilies}
              // familyId={family?.id}
              showDetails={showDetails}
              // onToggleDetails={() => setSelectedWordId(null)}
              onToggleDetails={() => setShowDetails((s) => !s)}
              // onDelete={() =>
              //   onDeleteWord(String(family?.id), String(selectedWord.id))
              // }
            />
            <div
              key={index}
              onClick={() => {
                setSelectedWord(word);
                setOpenWordModal(true);
              }}
              className="cursor-pointer hidden group min-w-[180px] flex-1 border rounded-2xl px-3 py-2 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex gap-3 items-center justify-between"
                  >
                    <button
                      onClick={() => {
                        speakWord(word.word);
                      }}
                      className="p-1 rounded-full hover:bg-green-100 transition"
                    >
                      {speakingWord === word.word ? (
                        <HiOutlineSpeakerXMark className="w-4 h-4 animate-pulse text-green-600" />
                      ) : (
                        <>
                          <HiOutlineSpeakerWave className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <h2 className="text-[14px] font-semibold leading-none">
                      {word.word}
                    </h2>

                    <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                      {word.meaning}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <Dialog open={openWordModal} onOpenChange={setOpenWordModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedWord?.word}</DialogTitle>
          </DialogHeader>

          {isEditing ? (
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
              <Input
                placeholder="Level"
                value={newWord.level}
                onChange={(e) =>
                  setNewWord({
                    ...newWord,
                    level: e.target.value,
                  })
                }
              />
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  Back
                </Button>

                <Button
                  className="flex-1 bg-blue-500 text-white hover:bg-blue-600 transition-all"
                  onClick={() => {
                    onEditWord(newWord);
                    setIsEditing(false);
                    setSelectedWord(newWord);

                    // setSelectedWord(word);
                    // setNewWord(word);

                    // setOpenWordModal(true);
                    setOpenWordModal(false);
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          ) : (
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
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsEditing(true);
                    setNewWord(selectedWord);
                  }}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => {
                    if (selectedWord) {
                      if (onDeleteWord) onDeleteWord(selectedWord);
                      setOpenWordModal(false);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Word Modal */}
      <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
        <DialogContent>
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

            <Input
              placeholder="Level"
              value={newWord.level}
              onChange={(e) =>
                setNewWord({
                  ...newWord,
                  level: e.target.value,
                })
              }
            />

            <Button onClick={onAddWord} className="w-full">
              Save Word
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
