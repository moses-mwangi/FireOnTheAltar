"use client";

import { useState } from "react";
import { SynonymFamily } from "../../../../lib/types/vocabTypes";
import WordCard from "./WordCard";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { on } from "events";

interface Props {
  families: SynonymFamily[];
  family: SynonymFamily;
  onAddWord: (familyId: string) => void;
  onDeleteWord: (familyId: string, wordId: string) => void;
  fetchFamilies: () => Promise<void>;
}

export default function SynonymFamilyComponent({
  families,
  fetchFamilies,
  family,
  onAddWord,
  onDeleteWord,
}: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);

  const fam = family?.words;
  const selectedWord = fam?.find((word) => String(word.id) === selectedWordId);
  const remainingWords = fam?.filter(
    (word) => String(word.id) !== selectedWordId,
  );

  return (
    <Card className="bg-white min-h-[420px] p-0 dark:bg-gray-800 rounded-none border-0 shadow-xs overflow-hidden">
      <div className="flex items-center justify-between gap-4">
        <div className="flex justify-between items-center w-full px-4 pt-4">
          <h1 className="text-xl font-bold">{family?.name}</h1>
          <Button
            onClick={() => {
              onAddWord(String(family?.id));
            }}
            className="px-3 cursor-pointer h-[31px] text-sm bg-blue-500 text-white hover:bg-blue-600 transition-all"
          >
            + Add Word
          </Button>
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
                  fetchFamilies={fetchFamilies}
                  familyId={family?.id}
                  word={selectedWord}
                  showDetails={true}
                  onToggleDetails={() => setSelectedWordId(null)}
                  onDelete={() =>
                    onDeleteWord(String(family?.id), String(selectedWord.id))
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
                  fetchFamilies={fetchFamilies}
                    familyId={family?.id}
                    word={word}
                    showDetails={showDetails}
                    onToggleDetails={() => setSelectedWordId(null)}
                    onDelete={() =>
                      onDeleteWord(String(family?.id), String(word?.id))
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

// "use client";

// import { useState } from "react";
// import { SynonymFamily, Word } from "../../../../lib/types/vocabTypes";
// import WordCard from "./WordCard";
// import { Card } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import {
//   ChevronDown,
//   ChevronUp,
//   Edit,
//   Trash2,
//   MoreVertical,
//   Grid,
//   List,
// } from "lucide-react";
// import EditFamilyModal from "./EditFamilyModal";
// // import EditWordModal from "./EditWordModal";

// interface Props {
//   family: SynonymFamily;
//   onAddWord: (familyId: string) => void;
//   onEditWord: (familyId: string, word: Word) => void;
//   onDeleteWord: (familyId: string, wordId: string) => void;
//   onUpdateFamily: (familyId: string, updates: Partial<SynonymFamily>) => void;
//   onDeleteFamily: (familyId: string) => void;
// }

// export default function SynonymFamilyComponent({
//   family,
//   onAddWord,
//   onEditWord,
//   onDeleteWord,
//   onUpdateFamily,
//   onDeleteFamily,
// }: Props) {
//   const [showDetails, setShowDetails] = useState(false);
//   const [selectedWord, setSelectedWord] = useState<Word | null>(null);
//   const [showContextMenu, setShowContextMenu] = useState<{
//     x: number;
//     y: number;
//   } | null>(null);
//   const [isEditFamilyModalOpen, setIsEditFamilyModalOpen] = useState(false);
//   const [isEditWordModalOpen, setIsEditWordModalOpen] = useState(false);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

//   const words = family.words || [];
//   const selectedWordObj = selectedWord;
//   const remainingWords = words.filter((word) => word.id !== selectedWord?.id);

//   const handleFamilyContextMenu = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setShowContextMenu({ x: e.clientX, y: e.clientY });
//   };

//   const handleEditFamily = () => {
//     setIsEditFamilyModalOpen(true);
//     setShowContextMenu(null);
//   };

//   const handleDeleteFamily = () => {
//     if (
//       confirm(
//         `Are you sure you want to delete "${family.name}"? All words in this family will be lost!`,
//       )
//     ) {
//       onDeleteFamily(family.id);
//     }
//     setShowContextMenu(null);
//   };

//   const handleEditWord = (word: Word) => {
//     setSelectedWord(word);
//     setIsEditWordModalOpen(true);
//   };

//   const handleUpdateWord = (updatedWord: Word) => {
//     onEditWord(family.id, updatedWord);
//     setSelectedWord(null);
//   };

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case "beginner":
//         return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
//       case "intermediate":
//         return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
//       case "advanced":
//         return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
//     }
//   };

//   return (
//     <>
//       <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
//         {/* Family Header */}
//         <div className="relative">
//           <div
//             className="flex items-center justify-between gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 cursor-pointer hover:from-purple-100 hover:to-blue-100 transition-colors"
//             onClick={() => setShowDetails(!showDetails)}
//           >
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-1">
//                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                   {family.name}
//                 </h2>
//                 <span
//                   className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(family.difficulty)}`}
//                 >
//                   {family.difficulty}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {family.theme}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
//                 {words.length} word{words.length !== 1 ? "s" : ""}
//               </p>
//             </div>

//             <div className="flex items-center gap-2">
//               <Button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onAddWord(family.id);
//                 }}
//                 className="px-3 h-[32px] text-sm bg-purple-600 text-white hover:bg-purple-700 transition-all"
//               >
//                 + Add Word
//               </Button>

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleFamilyContextMenu(e);
//                 }}
//                 className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
//               >
//                 <MoreVertical className="h-4 w-4 text-gray-600 dark:text-gray-400" />
//               </button>

//               <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
//                 {showDetails ? (
//                   <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
//                 ) : (
//                   <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Context Menu */}
//           {showContextMenu && (
//             <>
//               <div
//                 className="fixed inset-0 z-40"
//                 onClick={() => setShowContextMenu(null)}
//               />
//               <div
//                 className="fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-1 z-50 min-w-[160px]"
//                 style={{ top: showContextMenu.y, left: showContextMenu.x }}
//               >
//                 <button
//                   onClick={handleEditFamily}
//                   className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
//                 >
//                   <Edit className="h-3 w-3" />
//                   Edit Family
//                 </button>
//                 <button
//                   onClick={handleDeleteFamily}
//                   className="w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
//                 >
//                   <Trash2 className="h-3 w-3" />
//                   Delete Family
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         <Separator className="my-0" />

//         {/* View Mode Toggle */}
//         {words.length > 0 && (
//           <div className="flex justify-end px-4 pt-3 gap-2">
//             <button
//               onClick={() => setViewMode("grid")}
//               className={`p-1.5 rounded-lg transition-colors ${
//                 viewMode === "grid"
//                   ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
//                   : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//               }`}
//             >
//               <Grid className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => setViewMode("list")}
//               className={`p-1.5 rounded-lg transition-colors ${
//                 viewMode === "list"
//                   ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
//                   : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//               }`}
//             >
//               <List className="h-4 w-4" />
//             </button>
//           </div>
//         )}

//         <div className="p-4">
//           {words.length === 0 ? (
//             <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
//               <p className="text-gray-500 dark:text-gray-400 mb-2">
//                 No words yet in this family.
//               </p>
//               <p className="text-sm text-purple-600 dark:text-purple-400">
//                 Click "Add Word" to start building your vocabulary!
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {/* Selected Word Detail View */}
//               {selectedWordObj && showDetails && (
//                 <div className="mb-6">
//                   <WordCard
//                     word={selectedWordObj}
//                     showDetails={true}
//                     onToggleDetails={() => setSelectedWord(null)}
//                     onEdit={() => handleEditWord(selectedWordObj)}
//                     onDelete={() => onDeleteWord(family.id, selectedWordObj.id)}
//                   />
//                 </div>
//               )}

//               {/* Words Grid/List */}
//               <div
//                 className={
//                   viewMode === "grid"
//                     ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
//                     : "space-y-2"
//                 }
//               >
//                 {(selectedWordObj && showDetails ? remainingWords : words).map(
//                   (word) => (
//                     <div
//                       key={word.id}
//                       onClick={() => {
//                         if (showDetails) {
//                           setSelectedWord(word);
//                         }
//                       }}
//                       className={showDetails ? "cursor-pointer" : ""}
//                     >
//                       <WordCard
//                         word={word}
//                         showDetails={false}
//                         onToggleDetails={() => setSelectedWord(word)}
//                         onEdit={() => handleEditWord(word)}
//                         onDelete={() => onDeleteWord(family.id, word.id)}
//                       />
//                     </div>
//                   ),
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer with stats */}
//         {words.length > 0 && (
//           <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
//               <span>Total Words: {words.length}</span>
//               <span>
//                 Last updated:{" "}
//                 {family.updatedAt
//                   ? new Date(family.updatedAt).toLocaleDateString()
//                   : new Date(
//                       family.createdAt || Date.now(),
//                     ).toLocaleDateString()}
//               </span>
//             </div>
//           </div>
//         )}
//       </Card>

//       {/* Edit Family Modal */}
//       <EditFamilyModal
//         isOpen={isEditFamilyModalOpen}
//         onClose={() => setIsEditFamilyModalOpen(false)}
//         family={family}
//         onUpdateFamily={onUpdateFamily}
//       />

//       {/* Edit Word Modal */}
//       {/* <EditWordModal
//         isOpen={isEditWordModalOpen}
//         onClose={() => {
//           setIsEditWordModalOpen(false);
//           setSelectedWord(null);
//         }}
//         word={selectedWord}
//         onUpdateWord={handleUpdateWord}
//       /> */}
//     </>
//   );
// }
