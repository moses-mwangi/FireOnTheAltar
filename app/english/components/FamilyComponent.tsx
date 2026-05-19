"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { SynonymFamily } from "../../../lib/types/vocabTypes";
import WordCard from "./WordCard";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Props {
  family: SynonymFamily;
  onAddWord: (familyId: string) => void;
  onDeleteWord: (familyId: string, wordId: string) => void;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export default function FamilyComponent({
  family,
  onAddWord,
  onDeleteWord,
  searchTerm,
  setSearchTerm,
}: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);

  const fam = family.words;
  const selectedWord = fam?.find((word) => String(word.id) === selectedWordId);
  const remainingWords = fam?.filter(
    (word) => String(word.id) !== selectedWordId,
  );

  return (
    <Card className="bg-white p-0 dark:bg-gray-800 rounded-none border-0 shadow-xs overflow-hidden">
      <div className="flex items-center justify-between gap-4">
        <div className="flex justify-between items-center w-full px-4 pt-4">
          <h1 className="text-xl font-bold">{family.name}</h1>
          <div className="flex items-center gap-2">
            {/* <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                className="w-full text-[13px] pl-8 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search words or word families..."
              />
            </div> */}
            <Button
              onClick={() => {
                onAddWord(String(family.id));
              }}
              className="px-3 cursor-pointer h-[31px] text-sm bg-blue-500 text-white hover:bg-blue-600 transition-all"
            >
              + Add Word
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-0" />

      <div className="px-4 pb-6">
        {fam?.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              No words yet. Click + to add your first word to this synonym
              family!
            </p>

            <p className="text-sm text-purple-600 mt-2">
              Tip: Add words like &quot;talk, speak, say, communicate&quot; to
              build your vocabulary
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedWord && (
              <div className="w-full">
                <WordCard
                  word={selectedWord}
                  showDetails={true}
                  onToggleDetails={() => setSelectedWordId(null)}
                  onDelete={() =>
                    onDeleteWord(String(family.id), String(selectedWord.id))
                  }
                />
              </div>
            )}

            {/* Remaining Words Grid */}
            <div
              className={`grid ${
                showDetails
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3"
              }`}
            >
              {remainingWords?.map((word) => (
                <div
                  key={word.id}
                  onClick={() => {
                    setSelectedWordId(String(word.id));
                  }}
                  className="cursor-pointer"
                >
                  <WordCard
                    word={word}
                    showDetails={showDetails}
                    onToggleDetails={() => setSelectedWordId(null)}
                    onDelete={() =>
                      onDeleteWord(String(family.id), String(word.id))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
