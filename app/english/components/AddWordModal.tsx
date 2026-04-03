// import { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import { VocabularyGroup } from "../types";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   groups: VocabularyGroup[];
//   selectedGroupId: string | null;
//   onAddWord: (
//     groupId: string,
//     word: string,
//     description: string,
//     example: string,
//   ) => void;
// }

// export default function AddWordModal({
//   isOpen,
//   onClose,
//   groups,
//   selectedGroupId,
//   onAddWord,
// }: Props) {
//   const [groupId, setGroupId] = useState(selectedGroupId || "");
//   const [word, setWord] = useState("");
//   const [description, setDescription] = useState("");
//   const [example, setExample] = useState("");

//   const effectiveGroupId = groupId || selectedGroupId || "";

//   if (!isOpen) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const selected = effectiveGroupId;
//     if (!selected || !word.trim() || !description.trim()) return;
//     onAddWord(selected, word.trim(), description.trim(), example.trim());
//     setGroupId("");
//     setWord("");
//     setDescription("");
//     setExample("");
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
//           <h2 className="text-xl font-bold">Add New Word</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Vocabulary Group *
//             </label>
//             <select
//               value={effectiveGroupId}
//               onChange={(e) => setGroupId(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
//             >
//               <option value="">Select a group</option>
//               {groups.map((group) => (
//                 <option key={group.id} value={group.id}>
//                   {group.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Word *</label>
//             <input
//               type="text"
//               value={word}
//               onChange={(e) => setWord(e.target.value)}
//               required
//               placeholder="e.g., glance, whisper, happy"
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Description / Meaning *
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//               placeholder="Explain the meaning, usage, and nuances..."
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Example Sentence (optional)
//             </label>
//             <input
//               type="text"
//               value={example}
//               onChange={(e) => setExample(e.target.value)}
//               placeholder="e.g., She glanced at her watch during the meeting."
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//             >
//               Add Word
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import { SynonymFamily } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  families: SynonymFamily[];
  selectedFamilyId: string | null;
  onAddWord: (
    familyId: string,
    word: string,
    description: string,
    example: string,
    wordFamily: { word: string; partOfSpeech: string; example: string }[],
    synonyms: string[],
  ) => void;
}

export default function AddWordModal({
  isOpen,
  onClose,
  families,
  selectedFamilyId,
  onAddWord,
}: Props) {
  const [familyId, setFamilyId] = useState(selectedFamilyId ?? "");
  const [word, setWord] = useState("");
  const [description, setDescription] = useState("");
  const [example, setExample] = useState("");
  const [wordFamily, setWordFamily] = useState([
    { word: "", partOfSpeech: "verb", example: "" },
  ]);
  const [synonyms, setSynonyms] = useState([""]);

  // useEffect(() => {
  //   setFamilyId((prev) =>
  //     prev !== selectedFamilyId ? (selectedFamilyId ?? "") : prev,
  //   );
  // }, [selectedFamilyId]);

  if (!isOpen) return null;

  const addWordFamilyMember = () => {
    setWordFamily([
      ...wordFamily,
      { word: "", partOfSpeech: "verb", example: "" },
    ]);
  };

  const removeWordFamilyMember = (index: number) => {
    setWordFamily(wordFamily.filter((_, i) => i !== index));
  };

  const updateWordFamilyMember = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updated = [...wordFamily];
    updated[index] = { ...updated[index], [field]: value };
    setWordFamily(updated);
  };

  const addSynonym = () => {
    setSynonyms([...synonyms, ""]);
  };

  const removeSynonym = (index: number) => {
    setSynonyms(synonyms.filter((_, i) => i !== index));
  };

  const updateSynonym = (index: number, value: string) => {
    const updated = [...synonyms];
    updated[index] = value;
    setSynonyms(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyId || !word.trim() || !description.trim()) return;

    const validWordFamily = wordFamily.filter((wf) => wf.word.trim());
    const validSynonyms = synonyms.filter((s) => s.trim());

    onAddWord(
      familyId,
      word.trim(),
      description.trim(),
      example.trim(),
      validWordFamily,
      validSynonyms,
    );

    // Reset form
    setWord("");
    setDescription("");
    setExample("");
    setWordFamily([{ word: "", partOfSpeech: "verb", example: "" }]);
    setSynonyms([""]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-bold">Add New Word with Word Family</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Synonym Family *
            </label>
            <select
              value={familyId}
              onChange={(e) => setFamilyId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select a family</option>
              {families.map((family) => (
                <option key={family.id} value={family.id}>
                  {family.name} - {family.theme}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Main Word *
            </label>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              required
              placeholder="e.g., communicate, happy, glance"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description / Meaning *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Explain the meaning, usage, and nuances..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Example Sentence
            </label>
            <input
              type="text"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="e.g., We need to communicate effectively."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Word Family Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium">
                Word Family Members
              </label>
              <button
                type="button"
                onClick={addWordFamilyMember}
                className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add member
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Add different forms of the word (e.g., communicate →
              communication, communicator, communicative)
            </p>
            <div className="space-y-3">
              {wordFamily.map((member, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Word (e.g., communication)"
                      value={member.word}
                      onChange={(e) =>
                        updateWordFamilyMember(idx, "word", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                  </div>
                  <select
                    value={member.partOfSpeech}
                    onChange={(e) =>
                      updateWordFamilyMember(
                        idx,
                        "partOfSpeech",
                        e.target.value,
                      )
                    }
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    <option value="noun">noun</option>
                    <option value="verb">verb</option>
                    <option value="adjective">adjective</option>
                    <option value="adverb">adverb</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeWordFamilyMember(idx)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Synonyms Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium">
                Synonyms in this family
              </label>
              <button
                type="button"
                onClick={addSynonym}
                className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add synonym
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Add related words with similar meaning (e.g., for
              &quot;talk&quot;: speak, say, chat, converse)
            </p>
            <div className="space-y-2">
              {synonyms.map((synonym, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Synonym"
                    value={synonym}
                    onChange={(e) => updateSynonym(idx, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeSynonym(idx)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Word with Family
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
