import { Trash2, Edit } from "lucide-react";
import { Word } from "../types";
import { useState } from "react";

interface Props {
  word: Word;
  onDelete: () => void;
}

export default function VocabularyCard({ word, onDelete }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-48 cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-linear-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-4 flex flex-col justify-center items-center text-white">
          <h3 className="text-2xl font-bold mb-2">{word.word} ==</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <p className="text-sm text-purple-100">Click to flip →</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 overflow-y-auto">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-purple-600 dark:text-purple-400">
              {word.word}
            </h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {word.description}
          </p>
          {word.example && (
            <div className="mt-2 p-2 bg-purple-50 dark:bg-gray-700 rounded">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Example:
              </p>
              <p className="text-sm italic text-gray-700 dark:text-gray-300">
                &quot;{word.example}&quot;
              </p>
            </div>
          )}
          <p className="text-xs text-gray-400 mt-2">
            Added: {word.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>

      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
