"use client";

import { useEffect, useState } from "react";
import SharedVocabComponent from "./SharedWordComponent";

type Word = {
  id: number;
  word: string;
  meaning: string;
  example: string;
  level: "advanced" | "common" | string;
};

export default function AdvanceWordsUI() {
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

  const resetForm = () => {
    setNewWord({
      word: "",
      meaning: "",
      example: "",
      level: "",
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

  const handleAddWord = async () => {
    if (!newWord.word) {
      return;
    }

    const newAddedWord: Word = { ...newWord, id: Date.now() };
    const updatedWords = [...words, newAddedWord];
    const saved = await saveToFile(updatedWords);
    if (saved) {
      setWords(updatedWords);
      setOpenAddModal(false);
      // resetForm();
      // setIsAdding(false);
    }
  };

  const handleEditWord = async (updatedWord: Word) => {
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
    <div className="space-y-5 bg-white dark:bg-zinc-900 shadow-sm">
      <SharedVocabComponent
        title={"Advanced Words"}
        words={words.filter((w) => w.level === "advanced")}
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
    </div>
  );
}
