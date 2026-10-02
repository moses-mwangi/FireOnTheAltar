"use client";

import { useState, useEffect, useCallback } from "react";
import SynonymFamilyComponent from "./SynonymFamily";
import AddWordModal from "./AddWordModal";
import { SynonymFamily } from "../../../../lib/types/vocabTypes";
import SharedVocabComponent from "./SharedWordComponent";
import { Button } from "@/components/ui/button";
import { Word } from "./EditWordModal";

export default function EnglishPage({ word }: { word: string }) {
  const [wordFamilies, setWordFamilies] = useState<SynonymFamily[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [words, setWords] = useState<Word[]>([]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [newWord, setNewWord] = useState({
    word: "",
    meaning: "",
    example: "",
    level: "advanced",
    antonyms: [""],
    synonyms: [""],
    wordFamily: [],
  });

  // Save to localStorage
  const fetchFamilies = useCallback(async () => {
    try {
      const response = await fetch("/api/group");
      const data = await response.json();
      setWordFamilies(data.families || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchFamilies();
  }, [fetchFamilies]);

  const handleAddWord = async (
    word: string,
    description: string,
    example: string,
    wordFamily: {
      word: string;
      partOfSpeech: string;
      example: string;
    }[],
    synonyms: string[],
    antonyms: string[],
  ) => {
    if (!selectedFamilyId) return;

    const newWord = {
      id: `${word}-${Date.now()}`,
      word,
      description,
      example,
      wordFamily: wordFamily.map((wf, idx) => ({
        id: `${Date.now()}-${idx}`,
        ...wf,
      })),
      synonyms,
      antonyms,
      createdAt: new Date(),
    };

    await fetch("/api/group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        familyId: selectedFamilyId,
        word: newWord,
        action: "addWord",
      }),
    });

    await fetchFamilies();
  };

  // const handleDeleteWord = async (familyId: string, wordId: string) => {
  //   await fetch("/api/group", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       familyId,
  //       wordId,
  //     }),
  //   });

  //   await fetchFamilies();
  // };

  const filteredFamilies = wordFamilies
    .map((family) => ({
      ...family,
      words: family.words.filter(
        (word) =>
          word?.word?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          word?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          word?.wordFamily?.some((wf) =>
            wf.word.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      ),
    }))
    .filter((family) => family.words.length > 0 || searchTerm === "");

  const resetForm = () => {
    setNewWord({
      word: "",
      meaning: "",
      example: "",
      level: "advanced",
      antonyms: [""],
      synonyms: [""],
      wordFamily: [],
    });
  };

  const fetchCommonVocab = async () => {
    try {
      // setLoading(true);
      const response = await fetch("/api/common");
      if (!response.ok)
        throw new Error("Failed to load common vocabulary data");
      const data = await response.json();
      setWords(data.words || []);
      // setError(null);
    } catch (err) {
      // setError(err instanceof Error ? err.message : "Failed to load data");
      console.error(err);
    } finally {
      // setLoading(false);
    }
  };

  const saveToFile = async (updatedWords: Word[]) => {
    try {
      const response = await fetch("/api/common", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ words: updatedWords }),
      });
      setOpenAddModal(false);
      if (!response.ok) throw new Error("Failed to save data");
      resetForm();
      return true;
    } catch (err) {
      console.error("Save error:", err);
      // setError("Failed to save changes");
      return false;
    }
  };

  const handleAddWordFF = async () => {
    if (!newWord.word) {
      return;
    }

    const newAddedWord: Word = { ...newWord, id: Date.now().toString() };
    const updatedWords = [...words, newAddedWord];
    const saved = await saveToFile(updatedWords);
    if (saved) {
      setWords(updatedWords);
      setOpenAddModal(false);
      // resetForm();
      // setIsAdding(false);
    }
  };

  const handleEditWord = async (word: Word) => {
    if (!updatedWord) return;

    const updatedWords = words.map((w) =>
      w.id === updatedWord.id ? updatedWord : w,
    );

    const saved = await saveToFile(updatedWords);
    if (saved) {
      setWords(updatedWords);
      // resetForm();
      // setEditingWord(null);
    }
  };

  const handleDeleteWord = async (word: Word) => {
    if (!confirm("Are you sure you want to delete this word?")) return;

    const updatedWords = words.filter((w) => w.id !== word.id);
    const saved = await saveToFile(updatedWords);
    if (saved) {
      setWords(updatedWords);
    }
  };

  useEffect(() => {
    fetchCommonVocab();

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Button
        onClick={() => {
          console.log(
            wordFamilies
              .filter((el) => el.name === word)
              .flatMap((wd) => wd.words),
          );
          // console.log(synonymFamilies);
        }}
      >
        CLICK
      </Button>

      <div className="max-w-7xl ">
        {filteredFamilies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No vocabulary found. Add some words to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <SharedVocabComponent
              title={word}
              words={wordFamilies
                .filter((el) => el.name === word)
                .flatMap((wd) => wd.words)}
              onAddWord={handleAddWord}
              newWord={newWord}
              setNewWord={setNewWord}
              openAddModal={openAddModal}
              setOpenAddModal={setOpenAddModal}
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
              onEditWord={handleEditWord}
              onDeleteWord={handleDeleteWord}
              fetchWords={fetchCommonVocab}
            />

            {/* <SynonymFamilyComponent
              fetchFamilies={fetchFamilies}
              families={filteredFamilies}
              family={
                filteredFamilies.find(
                  (e) =>
                    e.name?.trim()?.toLowerCase() ===
                    word?.trim()?.toLowerCase(),
                )!
              }
              onAddWord={(familyId) => {
                setSelectedFamilyId(familyId);
                setIsModalOpen(true);
              }}
              onDeleteWord={handleDeleteWord}
            /> */}
          </div>
        )}
      </div>

      {/* <AddWordModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFamilyId(null);
        }}
        families={synonymFamilies}
        selectedFamilyId={selectedFamilyId}
        onAddWord={handleAddWord}
      /> */}
    </div>
  );
}
