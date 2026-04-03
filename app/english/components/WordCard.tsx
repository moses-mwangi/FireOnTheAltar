import { useState } from "react";
import { Trash2, ChevronDown, ChevronUp, Copy, Link } from "lucide-react";
import { Word } from "../types";

interface Props {
  word: Partial<Word>;
  onDelete: () => void;
}

export default function WordCard({ word, onDelete }: Props) {
  const [showWordFamily, setShowWordFamily] = useState(false);
  const [showSynonyms, setShowSynonyms] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-linear-to-r from-purple-600 to-pink-600 p-4 text-white">
        {/* <div className="bg-linear-to-r from-purple-600 to-blue-600 p-4 text-white"> */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold mb-1">{word.word}</h3>
            <p className="text-purple-100 text-sm">{word.description}</p>
          </div>
          <button
            onClick={onDelete}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        {word.example && (
          <p className="text-sm italic text-purple-100 mt-2">
            &quot;{word.example}&quot;
          </p>
        )}
      </div>

      {/* Word Family Section */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setShowWordFamily(!showWordFamily)}
          className="w-full p-3 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            {/* <Copy className="h-4 w-4 text-purple-600" /> */}
            <span className="font-medium">Word Family</span>
            <span className="text-xs text-gray-500">
              ({word?.wordFamily?.length} members)
            </span>
          </div>
          {showWordFamily ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showWordFamily && (
          <div className="p-4 bg-purple-50 dark:bg-gray-700/50">
            <div className="grid gap-3">
              {word?.wordFamily?.map((member) => (
                <div
                  key={member.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      {member.word}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                      {member.partOfSpeech}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    &quot;{member.example}&quot;
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500 text-center">
              These words share the same root but have different grammatical
              functions
            </div>
          </div>
        )}
      </div>

      {/* Synonyms Section */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setShowSynonyms(!showSynonyms)}
          className="w-full p-3 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            {/* <Link className="h-4 w-4 text-purple-600" /> */}
            <span className="font-medium">Synonyms</span>
            <span className="text-xs text-gray-500">
              (Related words in this family)
            </span>
          </div>
          {showSynonyms ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showSynonyms && (
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {word?.synonyms?.map((synonym, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                >
                  {synonym}
                </span>
              ))}
            </div>
            {word.antonyms && word.antonyms.length > 0 && (
              <>
                <p className="text-xs text-gray-500 mt-3 mb-2">Opposites:</p>
                <div className="flex flex-wrap gap-2">
                  {word.antonyms.map((antonym, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm"
                    >
                      {antonym}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500">
        {/* Added: {new Date(word?.createdAt).toLocaleDateString()} */}
        Added: Invalid Date
      </div>
    </div>
  );
}
