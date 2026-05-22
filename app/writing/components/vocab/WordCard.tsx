"use client";

import { useState } from "react";
import { Trash2, ChevronDown, ChevronUp, Edit } from "lucide-react";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { Word } from "../../../../lib/types/vocabTypes";
import {
  speakWordWithDefinitionUtterance,
  wordUtterance,
} from "@/lib/types/speaker";
import EditWordModal from "./EditWordModal";
interface Props {
  word: Partial<Word>;
  onDelete: () => void;
  showDetails: boolean;
  onToggleDetails?: () => void;
  familyId: string;
  fetchFamilies: () => Promise<void>;
}

export default function WordCard({
  fetchFamilies,
  familyId,
  word,
  onDelete,
  showDetails,
  onToggleDetails,
}: Props) {
  const [showWordFamily, setShowWordFamily] = useState(false);
  const [showWordUpdateModal, setShowWordUpdateModal] = useState(false);
  const [showSynonyms, setShowSynonyms] = useState(false);
  const [showAnatomys, setShowAnatomys] = useState(false);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  const speakWord = (word: string, definition?: string) => {
    wordUtterance(word, setSpeakingWord);
  };
  const speakWordWithDefinition = (word: string, definition: string) => {
    speakWordWithDefinitionUtterance(word, setSpeakingWord, definition);
  };

  const isOpen = true;
  const onClose = () => {
    setShowWordUpdateModal(false);
  };

  const handleUpdateWord = async (updatedWord: Partial<Word>) => {
    if (!familyId) return;

    try {
      const updatedPayload = {
        id: word.id,
        word: updatedWord.word,
        description: updatedWord.description,
        example: updatedWord.example,
        wordFamily: updatedWord.wordFamily,
        synonyms: updatedWord.synonyms,
        antonyms: updatedWord.antonyms || [],
        updatedAt: new Date().toISOString(),
      };

      await fetch("/api/group", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          familyId: familyId,
          word: updatedPayload,
        }),
      });

      onClose();
      await fetchFamilies();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow hover:shadow-md transition-shadow">
      <div
        className={`${showDetails ? "bg-linear-to-r from-purple-600 to-pink-600 text-white" : "bg"} px-3 py-2 `}
      >
        <div
          onClick={onToggleDetails}
          className={` ${showDetails ? "text-[15px]" : "text-[16px]"} flex items-center gap-2 cursor-pointer justify-between`}
        >
          <div className="flex gap-2 items-center justify-between">
            <button
              onClick={(e) => {
                speakWord(String(word.word));
                e.stopPropagation();
              }}
              disabled={speakingWord === word.word}
              className={`p-[3px] rounded-full transition-all ${
                speakingWord === word.word
                  ? "bg-green-100 text-green-600 animate-pulse"
                  : "bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600"
              }`}
              title={`Pronounce ${word.word}`}
            >
              {speakingWord === word.word ? (
                <HiOutlineSpeakerXMark
                  className={`${showDetails ? "w-5 h-5" : "w-4 h-4 "} animate-pulse text-green-600`}
                />
              ) : (
                <>
                  <HiOutlineSpeakerWave
                    className={`${showDetails ? "w-5 h-5" : "w-4 h-4 "} text-green-600 group-hover:scale-110 transition-transform`}
                  />
                </>
              )}
            </button>
            <div>
              <h2
                className={`${showDetails ? "text-white text-[16px]" : "text-[14px]"}  font-semibold leading-none`}
              >
                {word.word}
              </h2>

              <p
                className={`${showDetails ? "text-white text-[13px]" : "text-[11px] text-muted-foreground"} mt-1 line-clamp-1`}
              >
                {word.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className={`${showDetails ? "bg-gray-50" : "bg-gray-100 hidden"} p-[7px] rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition`}
            >
              <Trash2
                className={`${showDetails ? "w-[17px] h-[17px]" : "w-4 h-4 "}`}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowWordUpdateModal(true);
              }}
              className={`${showDetails ? "bg-gray-50" : "bg-gray-100 hidden"} p-[7px] rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition`}
            >
              <Edit
                className={`${showDetails ? "w-[17px] h-[17px]" : "w-4 h-4 "}`}
              />
            </button>
          </div>
        </div>
      </div>
      {showWordUpdateModal === true && (
        <EditWordModal
          isOpen={isOpen}
          onClose={onClose}
          word={word}
          onUpdateWord={handleUpdateWord}
        />
      )}

      {showDetails && (
        <>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowWordFamily(!showWordFamily)}
              className={`${showWordFamily ? "bg-gray-50" : ""} cursor-pointer w-full p-3 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-xs">Word Family</span>
                <span className="text-xs text-gray-500">
                  ({word?.wordFamily?.length})
                </span>
              </div>
              {showWordFamily ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {showWordFamily && (
              <div className="p-4 bg-white dark:bg-gray-700/50">
                <div className="flex flex-wrap gap-2 ">
                  {word?.wordFamily?.map((member) => (
                    <div
                      key={member.id}
                      className=" dark:bg-gray-800 rounded-lg"
                    >
                      <p
                        onClick={() => speakWord(member.word)}
                        className="text-xs cursor-pointer text-purple-600 dark:text-purple-400 g px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full"
                      >
                        {member.word}
                        {/* (
                        <span className="text-xs font-light">
                          {member.partOfSpeech}
                        </span>
                        ) */}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowSynonyms(!showSynonyms)}
              className={`${showSynonyms ? "bg-gray-50" : ""} cursor-pointer w-full p-3 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-xs">Synonyms</span>
                <span className="text-xs text-gray-500">
                  ({word?.synonyms?.length})
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
                      onClick={() => speakWord(synonym)}
                      className="px-3 cursor-pointer text-xs py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full "
                    >
                      {synonym}
                    </span>
                  ))}
                </div>
                {word.antonyms && word.antonyms.length > 0 && (
                  <>
                    <p className="text-xs text-gray-500 mt-3 mb-2">
                      Opposites:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {word.antonyms.map((antonym, idx) => (
                        <span
                          key={idx}
                          onClick={() => speakWord(antonym)}
                          className="px-3 py-1 cursor-pointer bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs"
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
          <div className="border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowAnatomys(!showAnatomys)}
              className={`${showAnatomys ? "bg-gray-50" : ""} cursor-pointer w-full p-3 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-xs">Antonyms</span>
                <span className="text-xs text-gray-500">
                  ({word?.antonyms?.length || 0})
                </span>
              </div>
              {showAnatomys ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {showAnatomys && (
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {word?.antonyms?.map((antonym, idx) => (
                    <span
                      key={idx}
                      onClick={() => speakWord(antonym)}
                      className="px-3 cursor-pointer text-xs py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full "
                    >
                      {antonym}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// "use client";

// import { Word } from "../../../../lib/types/vocabTypes";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { BookOpen, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
// import { useState } from "react";

// interface WordCardProps {
//   word: Word;
//   showDetails: boolean;
//   onToggleDetails: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// export default function WordCard({
//   word,
//   showDetails,
//   onToggleDetails,
//   onEdit,
//   onDelete,
// }: WordCardProps) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   if (!word) return null;

//   return (
//     <Card
//       className={`p-4 hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 ${
//         showDetails
//           ? "bg-purple-50 dark:bg-purple-950/20"
//           : "bg-white dark:bg-gray-800"
//       }`}
//       onClick={onToggleDetails}
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <div className="flex items-center gap-2 mb-2">
//             <BookOpen className="h-4 w-4 text-purple-500" />
//             <h3 className="font-bold text-lg text-gray-900 dark:text-white">
//               {word.word}
//             </h3>
//             {word.wordFamily && word.wordFamily.length > 0 && (
//               <Badge variant="secondary" className="text-xs">
//                 {word.wordFamily.length} forms
//               </Badge>
//             )}
//           </div>

//           <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
//             {word.description}
//           </p>

//           {!showDetails && (
//             <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
//               <span>💡 {word?.example?.substring(0, 60)}...</span>
//             </div>
//           )}
//         </div>

//         <div className="flex items-center gap-1 ml-2">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={(e) => {
//               e.stopPropagation();
//               onEdit();
//             }}
//             className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900"
//           >
//             <Edit className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
//           </Button>

//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={(e) => {
//               e.stopPropagation();
//               if (confirm(`Delete "${word.word}"?`)) {
//                 onDelete();
//               }
//             }}
//             className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900"
//           >
//             <Trash2 className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
//           </Button>

//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsExpanded(!isExpanded);
//             }}
//             className="h-8 w-8 p-0"
//           >
//             {isExpanded ? (
//               <ChevronUp className="h-4 w-4" />
//             ) : (
//               <ChevronDown className="h-4 w-4" />
//             )}
//           </Button>
//         </div>
//       </div>

//       {/* Expanded Details */}
//       {isExpanded && (
//         <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
//           <div className="space-y-3">
//             <div>
//               <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
//                 Example:
//               </h4>
//               <p className="text-sm text-gray-600 dark:text-gray-400 italic">
//                 &quot;{word.example}&quot;
//               </p>
//             </div>

//             {word.wordFamily && word.wordFamily.length > 0 && (
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                   Word Family:
//                 </h4>
//                 <div className="grid grid-cols-1 gap-2">
//                   {word.wordFamily.map((wf) => (
//                     <div
//                       key={wf.id}
//                       className="bg-gray-50 dark:bg-gray-700/50 rounded p-2"
//                     >
//                       <div className="flex items-center gap-2">
//                         <span className="font-medium text-purple-600 dark:text-purple-400">
//                           {wf.word}
//                         </span>
//                         <Badge variant="outline" className="text-xs">
//                           {wf.partOfSpeech}
//                         </Badge>
//                       </div>
//                       <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
//                         {wf.example}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {word.synonyms && word.synonyms.length > 0 && (
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
//                   Synonyms:
//                 </h4>
//                 <div className="flex flex-wrap gap-1">
//                   {word.synonyms.map((synonym, idx) => (
//                     <Badge key={idx} variant="secondary" className="text-xs">
//                       {synonym}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {word.antonyms && word.antonyms.length > 0 && (
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
//                   Antonyms:
//                 </h4>
//                 <div className="flex flex-wrap gap-1">
//                   {word.antonyms.map((antonym, idx) => (
//                     <Badge key={idx} variant="outline" className="text-xs">
//                       {antonym}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </Card>
//   );
// }
