// import { useState } from "react";
// import { Search, Filter, BookOpen } from "lucide-react";
// import { Word } from "../types";
// import WordCard from "./WordCard";

// interface Props {
//   words: Word[];
//   onDeleteWord: (familyId: string, wordId: string) => void;
//   families: { id: string; name: string }[]; // To know which family each word belongs to
// }

// export default function AllWordsView({ words, onDeleteWord, families }: Props) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState<"date" | "alphabetical">("date");

//   const getFamilyName = (wordId: string) => {
//     // Find which family this word belongs to
//     for (const family of families) {
//       if (wordId.startsWith(family.id)) {
//         return family.name;
//       }
//     }
//     return "Unknown";
//   };

//   const filteredWords = words
//     .filter(
//       (word) =>
//         word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         word.description.toLowerCase().includes(searchTerm.toLowerCase()),
//     )
//     .sort((a, b) => {
//       if (sortBy === "alphabetical") {
//         return a.word.localeCompare(b.word);
//       }
//       return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//     });

//   return (
//     <div className="space-y-6">
//       {/* Search and Filter Bar */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search all words..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
//           />
//         </div>
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value as "date" | "alphabetical")}
//           className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
//         >
//           <option value="date">Sort by: Most Recent</option>
//           <option value="alphabetical">Sort by: A-Z</option>
//         </select>
//       </div>

//       {/* Words Grid */}
//       {filteredWords.length === 0 ? (
//         <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
//           <p className="text-gray-500 dark:text-gray-400">
//             {searchTerm
//               ? "No words match your search"
//               : "No words yet. Add some vocabulary!"}
//           </p>
//         </div>
//       ) : (
//         <div className="grid gap-4">
//           {filteredWords.map((word) => {
//             // Find the family ID for this word
//             const familyId =
//               families.find((f) => word.id.startsWith(f.id))?.id || "";

//             return (
//               <div key={word.id} className="relative">
//                 <div className="absolute -left-2 top-4 w-1 h-12 bg-linear-to-b from-purple-500 to-pink-500 rounded-full" />
//                 <WordCard
//                   word={word}
//                   onDelete={() => onDeleteWord(familyId, word.id)}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Quick Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
//         <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
//           <p className="text-2xl font-bold text-purple-600">{words.length}</p>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Total Words
//           </p>
//         </div>
//         <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
//           <p className="text-2xl font-bold text-blue-600">{families.length}</p>
//           <p className="text-sm text-gray-600 dark:text-gray-400">Families</p>
//         </div>
//         <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
//           <p className="text-2xl font-bold text-green-600">
//             {words.reduce((sum, w) => sum + w.wordFamily.length, 0)}
//           </p>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Word Family Members
//           </p>
//         </div>
//         <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
//           <p className="text-2xl font-bold text-orange-600">
//             {words.reduce((sum, w) => sum + (w.synonyms?.length || 0), 0)}
//           </p>
//           <p className="text-sm text-gray-600 dark:text-gray-400">Synonyms</p>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import {
  Search,
  Filter,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Copy,
  Link,
  X,
} from "lucide-react";
import { Word } from "../types";

interface Props {
  words: Word[];
  onDeleteWord: (familyId: string, wordId: string) => void;
  families: { id: string; name: string }[];
}

export default function AllWordsView({ words, onDeleteWord, families }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFamily, setFilterFamily] = useState<string>("all");
  const [expandedWords, setExpandedWords] = useState<Set<string>>(new Set());

  const toggleExpand = (wordId: string) => {
    const newExpanded = new Set(expandedWords);
    if (newExpanded.has(wordId)) {
      newExpanded.delete(wordId);
    } else {
      newExpanded.add(wordId);
    }
    setExpandedWords(newExpanded);
  };

  const getFamilyName = (wordId: string) => {
    for (const family of families) {
      if (wordId.startsWith(family.id)) {
        return family.name;
      }
    }
    return "Unknown";
  };

  const getFamilyId = (wordId: string) => {
    for (const family of families) {
      if (wordId.startsWith(family.id)) {
        return family.id;
      }
    }
    return "";
  };

  const filteredWords = words
    .filter((word) => {
      const matchesSearch =
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.wordFamily.some((wf) =>
          wf.word.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesFamily =
        filterFamily === "all" || getFamilyName(word.id) === filterFamily;

      return matchesSearch && matchesFamily;
    })
    .sort((a, b) => a.word.localeCompare(b.word));

  const familyNames = ["all", ...new Set(families.map((f) => f.name))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              📖 My Vocabulary Collection
            </h2>
            <p className="text-purple-100">
              {words.length} words • {families.length} families •
              {words.reduce((sum, w) => sum + w.wordFamily.length, 0)} word
              families
            </p>
          </div>
          <BookOpen className="h-12 w-12 text-purple-200" />
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by word, meaning, or family member..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterFamily}
          onChange={(e) => setFilterFamily(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
        >
          {familyNames.map((name) => (
            <option key={name} value={name}>
              {name === "all" ? "📚 All Families" : `🏷️ ${name}`}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing {filteredWords.length} of {words.length} words
      </div>

      {/* Words Grid - Clean Card Layout */}
      {filteredWords.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm
              ? "No words match your search"
              : "No words yet. Add some vocabulary!"}
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {filteredWords.map((word) => {
            const isExpanded = expandedWords.has(word.id);
            const familyName = getFamilyName(word.id);

            return (
              <div
                key={word.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                {/* Main Word Header */}
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => toggleExpand(word.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {word.word}
                        </h3>
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-medium">
                          {familyName}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {word.description}
                      </p>
                      {word.example && (
                        <p className="text-sm text-gray-500 dark:text-gray-500 italic mt-2">
                          💬 &quote;{word.example}&quot;
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const familyId = getFamilyId(word.id);
                          onDeleteWord(familyId, word.id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
                    <div className="grid md:grid-cols-2 gap-5 mt-3">
                      {/* Word Family Section */}
                      {word.wordFamily.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-3">
                            <Copy className="h-4 w-4 text-purple-500" />
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                              Word Family
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {word.wordFamily.map((member) => (
                              <div key={member.id} className="group relative">
                                <div className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                                  <span className="font-medium text-purple-700 dark:text-purple-300 text-sm">
                                    {member.word}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                    ({member.partOfSpeech})
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Synonyms Section */}
                      {word.synonyms && word.synonyms.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-3">
                            <Link className="h-4 w-4 text-emerald-500" />
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                              Synonyms
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {word.synonyms.map((synonym, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-700 dark:text-emerald-300 text-sm"
                              >
                                {synonym}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Antonyms Section */}
                      {word.antonyms && word.antonyms.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-3">
                            <X className="h-4 w-4 text-rose-500" />
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                              Opposites
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {word.antonyms.map((antonym, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-rose-700 dark:text-rose-300 text-sm"
                              >
                                {antonym}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                            Word Stats
                          </h4>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-600 dark:text-gray-400">
                            📅 Added:{" "}
                            {new Date(word.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            🔤 Word family members: {word.wordFamily.length}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            🔗 Synonyms: {word.synonyms?.length || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {words.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Words
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {families.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Synonym Families
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/10 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {words.reduce((sum, w) => sum + w.wordFamily.length, 0)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Word Family Members
          </p>
        </div>
        <div className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/10 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">
            {words.reduce((sum, w) => sum + (w.synonyms?.length || 0), 0)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Synonyms & Variations
          </p>
        </div>
      </div>
    </div>
  );
}
