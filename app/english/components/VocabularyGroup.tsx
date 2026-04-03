import { Plus, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { useState } from "react";
import { VocabularyGroup as VocabularyGroupType } from "../types";
import VocabularyCard from "./VocabularyCard";

interface Props {
  group: VocabularyGroupType;
  onAddWord: (groupId: string) => void;
  onDeleteWord: (groupId: string, wordId: string) => void;
}

export default function VocabularyGroup({
  group,
  onAddWord,
  onDeleteWord,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div
        className="bg-linear-to-r from-purple-50/90 to-pink-50/90 dark:from-gray-700 dark:to-gray-800 cursor-pointer hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex p-5 justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3  mb-2">
              <h2 className="text-[21px] font-bold text-gray-800 dark:text-white">
                {group.name}
              </h2>
            </div>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 mt-1">
              {group.description}
            </p>
          </div>
          <div className="flex items-center p-5 gap-3">
            {isExpanded && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddWord(group.id);
                }}
                className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>

        {/* footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-5 py-2 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <span>Synonyms grouped by meaning</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {group.words.length}
              </span>
              <span>words</span>
            </div>

            <div
              className={`px-2 py-0.5 rounded-full text-xs font-medium 
                ${
                  // group.difficulty === "beginner"
                  // ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  // : group.difficulty === "intermediate"
                  "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  // : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
            >
              {/* {group.difficulty} */}
              intermediate
            </div>
          </div>
        </div>
      </div>

      {/* Group Content */}
      {isExpanded && (
        <div className="p-4">
          {group.words.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No words yet. Click + to add your first word to this group!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.words.map((word) => (
                <VocabularyCard
                  key={word.id}
                  word={word}
                  onDelete={() => onDeleteWord(group.id, word.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
