// // app/vocabulary/page.tsx (or components/VocabularyManager.tsx)
// "use client";

// import { Button } from "@/components/ui/button";
// import React, { useState, useEffect } from "react";

// // Type definitions based on your JSON structure
// interface WordFamilyItem {
//   word: string;
//   partOfSpeech: string;
//   example: string;
// }

// interface VocabWord {
//   root: string;
//   word: string;
//   partOfSpeech: string;
//   definition: string;
//   example: string;
//   wordFamily: WordFamilyItem[];
//   synonyms: string[];
//   antonyms: string[];
// }

// const VocabularyManager: React.FC = () => {
//   const [words, setWords] = useState<VocabWord[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingWord, setEditingWord] = useState<VocabWord | null>(null);

//   // Form state for adding/editing
//   const [formData, setFormData] = useState<Partial<VocabWord>>({
//     root: "",
//     word: "",
//     partOfSpeech: "",
//     definition: "",
//     example: "",
//     wordFamily: [],
//     synonyms: [],
//     antonyms: [],
//   });

//   // Fetch vocabulary data
//   const fetchVocab = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/vocabulary");
//       if (!response.ok) throw new Error("Failed to load vocabulary data");
//       const data = await response.json();
//       setWords(data.words || []);
//       setError(null);
//       console.log("Fetched vocabulary data:", data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load data");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Save vocabulary data to JSON file (via API endpoint)
//   const saveToFile = async (updatedWords: VocabWord[]) => {
//     try {
//       const response = await fetch("/api/vocabulary", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ words: updatedWords }),
//       });
//       if (!response.ok) throw new Error("Failed to save data");
//       return true;
//     } catch (err) {
//       console.error("Save error:", err);
//       setError("Failed to save changes");
//       return false;
//     }
//   };

//   // Add new word
//   const handleAddWord = async () => {
//     if (!formData.word || !formData.definition) {
//       setError("Word and definition are required");
//       return;
//     }

//     const newWord: VocabWord = {
//       root: formData.root || formData.word || "",
//       word: formData.word || "",
//       partOfSpeech: formData.partOfSpeech || "noun",
//       definition: formData.definition || "",
//       example: formData.example || "",
//       wordFamily: formData.wordFamily || [],
//       synonyms: formData.synonyms || [],
//       antonyms: formData.antonyms || [],
//     };

//     const updatedWords = [...words, newWord];
//     const saved = await saveToFile(updatedWords);
//     if (saved) {
//       setWords(updatedWords);
//       resetForm();
//       setIsAdding(false);
//     }
//   };

//   // Edit existing word
//   const handleEditWord = async () => {
//     if (!editingWord || !formData.word) return;

//     const updatedWord: VocabWord = {
//       ...editingWord,
//       root: formData.root || editingWord.root,
//       word: formData.word || editingWord.word,
//       partOfSpeech: formData.partOfSpeech || editingWord.partOfSpeech,
//       definition: formData.definition || editingWord.definition,
//       example: formData.example || editingWord.example,
//       wordFamily: formData.wordFamily || editingWord.wordFamily,
//       synonyms: formData.synonyms || editingWord.synonyms,
//       antonyms: formData.antonyms || editingWord.antonyms,
//     };

//     const updatedWords = words.map((w) =>
//       w.root === editingWord.root && w.word === editingWord.word
//         ? updatedWord
//         : w,
//     );

//     const saved = await saveToFile(updatedWords);
//     if (saved) {
//       setWords(updatedWords);
//       resetForm();
//       setEditingWord(null);
//     }
//   };

//   // Delete word
//   const handleDeleteWord = async (index: number) => {
//     if (!confirm("Are you sure you want to delete this word?")) return;

//     const updatedWords = words.filter((_, i) => i !== index);
//     const saved = await saveToFile(updatedWords);
//     if (saved) {
//       setWords(updatedWords);
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       root: "",
//       word: "",
//       partOfSpeech: "",
//       definition: "",
//       example: "",
//       wordFamily: [],
//       synonyms: [],
//       antonyms: [],
//     });
//     setEditingWord(null);
//     setIsAdding(false);
//   };

//   // Start editing a word
//   const startEdit = (word: VocabWord) => {
//     setEditingWord(word);
//     setFormData({ ...word });
//     setIsAdding(true);
//   };

//   // Handle array fields (synonyms, antonyms, wordFamily)
//   const handleArrayField = (field: "synonyms" | "antonyms", value: string) => {
//     const arrayValue = value
//       .split(",")
//       .map((s) => s.trim())
//       .filter((s) => s);
//     setFormData({ ...formData, [field]: arrayValue });
//   };

//   const handleWordFamilyField = (value: string) => {
//     // Simple parsing: expect format "word:partOfSpeech:example" per line or comma
//     const items = value.split("\n").filter((line) => line.trim());
//     const wordFamily = items
//       .map((item) => {
//         const parts = item.split(":").map((s) => s.trim());
//         return {
//           word: parts[0] || "",
//           partOfSpeech: parts[1] || "",
//           example: parts[2] || "",
//         };
//       })
//       .filter((wf) => wf.word);
//     setFormData({ ...formData, wordFamily });
//   };

//   useEffect(() => {
//     fetchVocab();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading vocabulary...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <Button
//         onClick={() => {
//           console.log(fetchVocab());
//         }}
//       >
//         Fetch
//       </Button>
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">
//             Vocabulary Manager
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Manage your word collection from data/english/vocab.json
//           </p>
//         </div>
//         {!isAdding && (
//           <button
//             onClick={() => setIsAdding(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
//           >
//             + Add New Word
//           </button>
//         )}
//       </div>

//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
//           {error}
//           <button
//             onClick={() => setError(null)}
//             className="float-right font-bold"
//           >
//             ×
//           </button>
//         </div>
//       )}

//       {/* Add/Edit Form */}
//       {isAdding && (
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
//           <h2 className="text-xl font-semibold mb-4">
//             {editingWord ? "Edit Word" : "Add New Word"}
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Word *
//               </label>
//               <input
//                 type="text"
//                 value={formData.word || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, word: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="e.g., eloquent"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Root
//               </label>
//               <input
//                 type="text"
//                 value={formData.root || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, root: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g., loqu (speak)"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Part of Speech
//               </label>
//               <input
//                 type="text"
//                 value={formData.partOfSpeech || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, partOfSpeech: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                 placeholder="adjective / noun / verb"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Definition *
//               </label>
//               <input
//                 type="text"
//                 value={formData.definition || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, definition: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                 placeholder="Clear definition"
//               />
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Example
//               </label>
//               <input
//                 type="text"
//                 value={formData.example || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, example: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                 placeholder="Example sentence"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Synonyms (comma separated)
//               </label>
//               <input
//                 type="text"
//                 value={formData.synonyms?.join(", ") || ""}
//                 onChange={(e) => handleArrayField("synonyms", e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                 placeholder="rarely, infrequently, hardly ever"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Antonyms (comma separated)
//               </label>
//               <input
//                 type="text"
//                 value={formData.antonyms?.join(", ") || ""}
//                 onChange={(e) => handleArrayField("antonyms", e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                 placeholder="often, frequently, always"
//               />
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Word Family (format: word:partOfSpeech:example — one per line)
//               </label>
//               <textarea
//                 value={
//                   formData.wordFamily
//                     ?.map((wf) => `${wf.word}:${wf.partOfSpeech}:${wf.example}`)
//                     .join("\n") || ""
//                 }
//                 onChange={(e) => handleWordFamilyField(e.target.value)}
//                 rows={3}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
//                 placeholder="run:verb:She runs fast.&#10;runner:noun:He is a fast runner."
//               />
//             </div>
//           </div>
//           <div className="flex gap-3 mt-6">
//             <button
//               onClick={editingWord ? handleEditWord : handleAddWord}
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
//             >
//               {editingWord ? "Save Changes" : "Add Word"}
//             </button>
//             <button
//               onClick={resetForm}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Word Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {words.map((word, idx) => (
//           <div
//             key={`${word.root}-${idx}`}
//             className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
//           >
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-3 border-b border-gray-200 flex justify-between items-start">
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900">{word.word}</h3>
//                 <p className="text-sm text-gray-600 italic">
//                   {word.partOfSpeech}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => startEdit(word)}
//                   className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteWord(idx)}
//                   className="text-red-600 hover:text-red-800 text-sm font-medium"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>

//             <div className="p-5 space-y-3">
//               <div>
//                 <p className="text-sm font-semibold text-gray-700">
//                   Definition
//                 </p>
//                 <p className="text-gray-800">{word.definition}</p>
//               </div>

//               {word.example && (
//                 <div>
//                   <p className="text-sm font-semibold text-gray-700">Example</p>
//                   <p className="text-gray-700 italic">"{word.example}"</p>
//                 </div>
//               )}

//               {word.root && word.root !== word.word && (
//                 <div>
//                   <p className="text-xs font-medium text-gray-500">
//                     Root: {word.root}
//                   </p>
//                 </div>
//               )}

//               {word.synonyms && word.synonyms.length > 0 && (
//                 <div>
//                   <p className="text-sm font-semibold text-gray-700">
//                     Synonyms
//                   </p>
//                   <div className="flex flex-wrap gap-1 mt-1">
//                     {word.synonyms.map((syn, i) => (
//                       <span
//                         key={i}
//                         className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
//                       >
//                         {syn}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {word.antonyms && word.antonyms.length > 0 && (
//                 <div>
//                   <p className="text-sm font-semibold text-gray-700">
//                     Antonyms
//                   </p>
//                   <div className="flex flex-wrap gap-1 mt-1">
//                     {word.antonyms.map((ant, i) => (
//                       <span
//                         key={i}
//                         className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded-full"
//                       >
//                         {ant}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {word.wordFamily && word.wordFamily.length > 0 && (
//                 <div>
//                   <p className="text-sm font-semibold text-gray-700">
//                     Word Family
//                   </p>
//                   <div className="mt-1 space-y-1">
//                     {word.wordFamily.map((wf, i) => (
//                       <div key={i} className="text-xs text-gray-600">
//                         <span className="font-medium">{wf.word}</span> (
//                         {wf.partOfSpeech}) — {wf.example}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {words.length === 0 && !loading && (
//         <div className="text-center py-12 bg-gray-50 rounded-xl">
//           <p className="text-gray-500">
//             No vocabulary words found. Click "Add New Word" to get started.
//           </p>
//         </div>
//       )}

//       {/* Stats */}
//       {words.length > 0 && (
//         <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
//           Total {words.length} word{words.length !== 1 ? "s" : ""} in vocabulary
//         </div>
//       )}
//     </div>
//   );
// };

// export default VocabularyManager;

// app/vocabulary/page.tsx (or components/VocabularyManager.tsx)
"use client";

import React, { useState, useEffect } from "react";

// Type definitions based on your JSON structure
interface WordFamilyItem {
  word: string;
  partOfSpeech: string;
  example: string;
}

interface VocabWord {
  root: string;
  word: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  wordFamily: WordFamilyItem[];
  synonyms: string[];
  antonyms: string[];
}

const VocabularyManager: React.FC = () => {
  const [words, setWords] = useState<VocabWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingWord, setEditingWord] = useState<VocabWord | null>(null);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  // Form state for adding/editing
  const [formData, setFormData] = useState<Partial<VocabWord>>({
    root: "",
    word: "",
    partOfSpeech: "",
    definition: "",
    example: "",
    wordFamily: [],
    synonyms: [],
    antonyms: [],
  });

  // Text-to-speech function
  // const speakWord = (word: string, definition?: string) => {
  //   // Stop any currently playing speech
  //   if (window.speechSynthesis.speaking) {
  //     window.speechSynthesis.cancel();
  //   }

  //   setSpeakingWord(word);

  //   // Create utterance
  //   const utterance = new SpeechSynthesisUtterance(word);

  //   // Optional: Customize voice settings
  //   utterance.rate = 0.9; // Slightly slower for clarity
  //   utterance.pitch = 1.0;
  //   utterance.volume = 1;

  //   // Try to use a natural English voice if available
  //   const setVoice = () => {
  //     const voices = window.speechSynthesis.getVoices();
  //     const englishVoice = voices.find(
  //       (voice) =>
  //         (voice.lang.startsWith("en") && voice.name.includes("Google")) ||
  //         voice.name.includes("Natural") ||
  //         voice.name.includes("Premium"),
  //     );
  //     if (englishVoice) {
  //       utterance.voice = englishVoice;
  //     }
  //   };

  //   // Voices might not be loaded immediately
  //   if (window.speechSynthesis.getVoices().length > 0) {
  //     setVoice();
  //   } else {
  //     window.speechSynthesis.onvoiceschanged = setVoice;
  //   }

  //   utterance.onend = () => {
  //     setSpeakingWord(null);
  //   };

  //   utterance.onerror = () => {
  //     setSpeakingWord(null);
  //     console.error("Speech synthesis failed");
  //   };

  //   window.speechSynthesis.speak(utterance);
  // };

  const speakWord = (word: string, definition?: string) => {
    // Stop any currently playing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    setSpeakingWord(word);

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(word);

    // Optional: Customize voice settings
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1;

    // Try to use a British English voice
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();

      // Priority order for British English voices
      const britishVoice = voices.find(
        (voice) =>
          // Check for British English language code
          voice.lang === "en-GB" ||
          voice.lang === "en-UK" ||
          // Check for British voice names (common patterns)
          voice.name.includes("British") ||
          voice.name.includes("UK") ||
          voice.name.includes("England") ||
          voice.name.includes("London") ||
          voice.name.includes("Daniel") || // Google UK voice
          voice.name.includes("Brian") || // Some systems use Brian for UK
          // Specific high-quality British voices
          voice.name === "Google UK English Female" ||
          voice.name === "Google UK English Male" ||
          voice.name === "Microsoft Hazel Desktop" ||
          voice.name === "Microsoft George Desktop" ||
          // Fallback: any English voice with British in the name
          (voice.lang.startsWith("en") &&
            voice.name.toLowerCase().includes("british")),
      );

      if (britishVoice) {
        utterance.voice = britishVoice;
        console.log("Using British voice:", britishVoice.name);
      } else {
        // Fallback to any English voice if British not available
        const englishVoice = voices.find((voice) =>
          voice.lang.startsWith("en"),
        );
        if (englishVoice) {
          utterance.voice = englishVoice;
          console.log("British voice not found, using:", englishVoice.name);
        } else {
          console.warn("No English voices found");
        }
      }
    };

    // Voices might not be loaded immediately
    if (window.speechSynthesis.getVoices().length > 0) {
      setVoice();
    } else {
      window.speechSynthesis.onvoiceschanged = setVoice;
    }

    utterance.onend = () => {
      setSpeakingWord(null);
    };

    utterance.onerror = () => {
      setSpeakingWord(null);
      console.error("Speech synthesis failed");
    };

    window.speechSynthesis.speak(utterance);
  };

  // Speak word with its definition (optional - for more context)
  const speakWordWithDefinition = (word: string, definition: string) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    setSpeakingWord(word);
    const text = `${word}. ${definition}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1;

    utterance.onend = () => setSpeakingWord(null);
    utterance.onerror = () => setSpeakingWord(null);

    window.speechSynthesis.speak(utterance);
  };

  // Fetch vocabulary data
  const fetchVocab = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/vocabulary");
      if (!response.ok) throw new Error("Failed to load vocabulary data");
      const data = await response.json();
      setWords(data.words || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Save vocabulary data to JSON file (via API endpoint)
  const saveToFile = async (updatedWords: VocabWord[]) => {
    try {
      const response = await fetch("/api/vocabulary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ words: updatedWords }),
      });
      if (!response.ok) throw new Error("Failed to save data");
      return true;
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save changes");
      return false;
    }
  };

  // Add new word
  const handleAddWord = async () => {
    if (!formData.word || !formData.definition) {
      setError("Word and definition are required");
      return;
    }

    const newWord: VocabWord = {
      root: formData.root || formData.word || "",
      word: formData.word || "",
      partOfSpeech: formData.partOfSpeech || "noun",
      definition: formData.definition || "",
      example: formData.example || "",
      wordFamily: formData.wordFamily || [],
      synonyms: formData.synonyms || [],
      antonyms: formData.antonyms || [],
    };

    const updatedWords = [...words, newWord];
    const saved = await saveToFile(updatedWords);
    if (saved) {
      setWords(updatedWords);
      resetForm();
      setIsAdding(false);
    }
  };

  // Edit existing word
  const handleEditWord = async () => {
    if (!editingWord || !formData.word) return;

    const updatedWord: VocabWord = {
      ...editingWord,
      root: formData.root || editingWord.root,
      word: formData.word || editingWord.word,
      partOfSpeech: formData.partOfSpeech || editingWord.partOfSpeech,
      definition: formData.definition || editingWord.definition,
      example: formData.example || editingWord.example,
      wordFamily: formData.wordFamily || editingWord.wordFamily,
      synonyms: formData.synonyms || editingWord.synonyms,
      antonyms: formData.antonyms || editingWord.antonyms,
    };

    const updatedWords = words.map((w) =>
      w.root === editingWord.root && w.word === editingWord.word
        ? updatedWord
        : w,
    );

    const saved = await saveToFile(updatedWords);
    if (saved) {
      setWords(updatedWords);
      resetForm();
      setEditingWord(null);
    }
  };

  // Delete word
  const handleDeleteWord = async (index: number) => {
    if (!confirm("Are you sure you want to delete this word?")) return;

    const updatedWords = words.filter((_, i) => i !== index);
    const saved = await saveToFile(updatedWords);
    if (saved) {
      setWords(updatedWords);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      root: "",
      word: "",
      partOfSpeech: "",
      definition: "",
      example: "",
      wordFamily: [],
      synonyms: [],
      antonyms: [],
    });
    setEditingWord(null);
    setIsAdding(false);
  };

  // Start editing a word
  const startEdit = (word: VocabWord) => {
    setEditingWord(word);
    setFormData({ ...word });
    setIsAdding(true);
  };

  // Handle array fields (synonyms, antonyms, wordFamily)
  const handleArrayField = (field: "synonyms" | "antonyms", value: string) => {
    const arrayValue = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    setFormData({ ...formData, [field]: arrayValue });
  };

  const handleWordFamilyField = (value: string) => {
    const items = value.split("\n").filter((line) => line.trim());
    const wordFamily = items
      .map((item) => {
        const parts = item.split(":").map((s) => s.trim());
        return {
          word: parts[0] || "",
          partOfSpeech: parts[1] || "",
          example: parts[2] || "",
        };
      })
      .filter((wf) => wf.word);
    setFormData({ ...formData, wordFamily });
  };

  useEffect(() => {
    fetchVocab();

    // Cleanup speech synthesis on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading vocabulary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Vocabulary Manager
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your word collection from data/english/vocab.json
          </p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            + Add New Word
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {editingWord ? "Edit Word" : "Add New Word"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Word *
              </label>
              <input
                type="text"
                value={formData.word || ""}
                onChange={(e) =>
                  setFormData({ ...formData, word: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., eloquent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Root
              </label>
              <input
                type="text"
                value={formData.root || ""}
                onChange={(e) =>
                  setFormData({ ...formData, root: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., loqu (speak)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Part of Speech
              </label>
              <input
                type="text"
                value={formData.partOfSpeech || ""}
                onChange={(e) =>
                  setFormData({ ...formData, partOfSpeech: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="adjective / noun / verb"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Definition *
              </label>
              <input
                type="text"
                value={formData.definition || ""}
                onChange={(e) =>
                  setFormData({ ...formData, definition: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Clear definition"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Example
              </label>
              <input
                type="text"
                value={formData.example || ""}
                onChange={(e) =>
                  setFormData({ ...formData, example: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Example sentence"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Synonyms (comma separated)
              </label>
              <input
                type="text"
                value={formData.synonyms?.join(", ") || ""}
                onChange={(e) => handleArrayField("synonyms", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="rarely, infrequently, hardly ever"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Antonyms (comma separated)
              </label>
              <input
                type="text"
                value={formData.antonyms?.join(", ") || ""}
                onChange={(e) => handleArrayField("antonyms", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="often, frequently, always"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Word Family (format: word:partOfSpeech:example — one per line)
              </label>
              <textarea
                value={
                  formData.wordFamily
                    ?.map((wf) => `${wf.word}:${wf.partOfSpeech}:${wf.example}`)
                    .join("\n") || ""
                }
                onChange={(e) => handleWordFamilyField(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                placeholder="run:verb:She runs fast.&#10;runner:noun:He is a fast runner."
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={editingWord ? handleEditWord : handleAddWord}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              {editingWord ? "Save Changes" : "Add Word"}
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {words.map((word, idx) => (
          <div
            key={`${word.root}-${idx}`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-3 border-b border-gray-200 flex justify-between items-start">
              <div className="flex items-center gap-2 flex-1">
                <h3 className="text-xl font-bold text-gray-900">{word.word}</h3>
                {/* Pronunciation Button */}
                <button
                  onClick={() => speakWord(word.word)}
                  disabled={speakingWord === word.word}
                  className={`p-1.5 rounded-full transition-all ${
                    speakingWord === word.word
                      ? "bg-green-100 text-green-600 animate-pulse"
                      : "bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600"
                  }`}
                  title={`Pronounce ${word.word}`}
                >
                  {speakingWord === word.word ? (
                    // Animated speaker icon while speaking
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(word)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteWord(idx)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Part of Speech
                </p>
                <p className="text-gray-800 italic">{word.partOfSpeech}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Definition
                </p>
                <p className="text-gray-800">{word.definition}</p>
              </div>

              {word.example && (
                <div>
                  <p className="text-sm font-semibold text-gray-700">Example</p>
                  <p className="text-gray-700 italic">
                    &quot;{word.example}&quot;
                  </p>
                </div>
              )}

              {word.root && word.root !== word.word && (
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Root: {word.root}
                  </p>
                </div>
              )}

              {word.synonyms && word.synonyms.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Synonyms
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {word.synonyms.map((syn, i) => (
                      <button
                        key={i}
                        onClick={() => speakWord(syn)}
                        className="bg-gray-100 hover:bg-blue-100 text-gray-700 text-xs px-2 py-1 rounded-full transition cursor-pointer"
                        title={`Pronounce ${syn}`}
                      >
                        {syn}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {word.antonyms && word.antonyms.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Antonyms
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {word.antonyms.map((ant, i) => (
                      <button
                        key={i}
                        onClick={() => speakWord(ant)}
                        className="bg-red-50 hover:bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full transition cursor-pointer"
                        title={`Pronounce ${ant}`}
                      >
                        {ant}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {word.wordFamily && word.wordFamily.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Word Family
                  </p>
                  <div className="mt-1 space-y-1">
                    {word.wordFamily.map((wf, i) => (
                      <div
                        key={i}
                        className="text-xs text-gray-600 flex items-center gap-1"
                      >
                        <button
                          onClick={() => speakWord(wf.word)}
                          className="font-medium text-blue-600 hover:text-blue-800 underline-offset-2 hover:underline"
                        >
                          {wf.word}
                        </button>
                        <span>({wf.partOfSpeech})</span>
                        <span>—</span>
                        <span className="italic">{wf.example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {words.length === 0 && !loading && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">
            No vocabulary words found. Click &quot;Add New Word&quot; to get
            started.
          </p>
        </div>
      )}

      {/* Stats */}
      {words.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          Total {words.length} word{words.length !== 1 ? "s" : ""} in vocabulary
        </div>
      )}
    </div>
  );
};

export default VocabularyManager;
