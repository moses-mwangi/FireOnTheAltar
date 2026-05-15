"use client";

import { useState } from "react";
import { SynonymFamily } from "../types";
import WordCard from "./WordCard";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Props {
  family: SynonymFamily;
  onAddWord: (familyId: string) => void;
  onDeleteWord: (familyId: string, wordId: string) => void;
  // defaultExpanded?: boolean; // Add this
}

export default function SynonymFamilyComponent({
  family,
  onAddWord,
  onDeleteWord,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const fam = family.words;

  return (
    <Card className="bg-white p-0 dark:bg-gray-800 rounded-none border-0 shadow-xs overflow-hidden">
      {/* <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8"> */}
      <h2
        className={`text-xl font-bold px-4 pt-4 text-gray-800 dark:text-white`}
      >
        {family.name}
      </h2>
      {/* </Card> */}
      <Separator className="my-0 " />
      <div className="p-6">
        {fam?.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              No words yet. Click + to add your first word to this synonym
              family!
            </p>
            <p className="text-sm text-purple-600 mt-2">
              Tip: Add words like &quot;{"talk, speak, say, communicate"}
              &quot; to build your vocabulary
            </p>
          </div>
        ) : (
          fam !== undefined &&
          fam.length > 0 && (
            // <div className={`space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
            <div
              className={`${showDetails ? "space-y-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3"} grid `}
            >
              {fam?.map((word, idx) => (
                <WordCard
                  key={idx}
                  word={word}
                  showDetails={showDetails}
                  setShowDetails={setShowDetails}
                  // onDelete={() => onDeleteWord(fam.id, String(word?.id))}
                  onDelete={() =>
                    // onDeleteWord(fam.id, String(word?.localeCompare))
                    console.log("Delete word")
                  }
                />
              ))}
            </div>
          )
        )}
      </div>
    </Card>
  );
}
