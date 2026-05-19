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
  fetchWords: () => Promise<void>;
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
  fetchWords,
}: Props) {
  // const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [openWordModal, setOpenWordModal] = useState(false);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);

  const selectedWord = words?.find(
    (word) => String(word.id) === selectedWordId,
  );
  const remainingWords = words?.filter(
    (word) => String(word.id) !== selectedWordId,
  );

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
      <div className="space-y-4  px-4 pb-4">
        {selectedWord && (
          <div className="w-full">
            <WordCard
              isFamilyWord={false}
              word={selectedWord}
              showDetails={true}
              onToggleDetails={() => setSelectedWordId(null)}
              fetchWords={fetchWords}
              onDelete={() => onDeleteWord(selectedWord)}
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
                onDelete={() => onDeleteWord(word)}
              />
            </div>
          ))}
        </div>
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
                    // setSelectedWord(newWord);

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
