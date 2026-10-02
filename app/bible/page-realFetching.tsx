"use client";

import React, { useState, useEffect, useCallback } from "react";

// --- TypeScript Interfaces ---
interface Verse {
  verse: number;
  text: string;
}

interface ChapterData {
  reference: string;
  verses: Verse[];
  translation: string;
}

// --- Main Component ---
export default function BibleStudyPlatform() {
  // State Management
  const [books, setBooks] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>("John");
  const [chapters, setChapters] = useState<number[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Note-taking state
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [activeNoteVerse, setActiveNoteVerse] = useState<number | null>(null);
  const [noteInput, setNoteInput] = useState<string>("");

  // 1. Fetch the list of books on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // const res = await fetch("https://bible-api.com/data/eng-KJV/books");
        const res = await fetch("https://bible-api.com/data/eng-KJV/books");
        console.log("Fetching books from API...");
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        // Fallback to a default list if API fails
        setBooks([
          "Genesis",
          "Exodus",
          "Leviticus",
          "Numbers",
          "Deuteronomy",
          "Joshua",
          "Judges",
          "Ruth",
          "1 Samuel",
          "2 Samuel",
          "1 Kings",
          "2 Kings",
          "1 Chronicles",
          "2 Chronicles",
          "Ezra",
          "Nehemiah",
          "Esther",
          "Job",
          "Psalm",
          "Proverbs",
          "Ecclesiastes",
          "Song of Solomon",
          "Isaiah",
          "Jeremiah",
          "Lamentations",
          "Ezekiel",
          "Daniel",
          "Hosea",
          "Joel",
          "Amos",
          "Obadiah",
          "Jonah",
          "Micah",
          "Nahum",
          "Habakkuk",
          "Zephaniah",
          "Haggai",
          "Zechariah",
          "Malachi",
          "Matthew",
          "Mark",
          "Luke",
          "John",
          "Acts",
          "Romans",
          "1 Corinthians",
          "2 Corinthians",
          "Galatians",
          "Ephesians",
          "Philippians",
          "Colossians",
          "1 Thessalonians",
          "2 Thessalonians",
          "1 Timothy",
          "2 Timothy",
          "Titus",
          "Philemon",
          "Hebrews",
          "James",
          "1 Peter",
          "2 Peter",
          "1 John",
          "2 John",
          "3 John",
          "Jude",
          "Revelation",
        ]);
      }
    };
    fetchBooks();
  }, []);

  // 2. Fetch chapters for the selected book
  useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedBook) return;
      try {
        const res = await fetch(
          `https://bible-api.com/data/eng-KJV/books/${selectedBook}/chapters`,
        );
        if (!res.ok) throw new Error("Failed to fetch chapters");
        const data = await res.json();
        setChapters(data);
        if (data.length > 0) setSelectedChapter(1);
      } catch (err) {
        console.error("Error fetching chapters:", err);
        // Fallback: assume 50 chapters for Psalms, 1 for others
        if (selectedBook === "Psalm") {
          setChapters(Array.from({ length: 150 }, (_, i) => i + 1));
        } else {
          setChapters(Array.from({ length: 30 }, (_, i) => i + 1));
        }
        setSelectedChapter(1);
      }
    };
    fetchChapters();
  }, [selectedBook]);

  // 3. Fetch the actual chapter text
  const fetchChapter = useCallback(async () => {
    if (!selectedBook || !selectedChapter) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://bible-api.com/${selectedBook}+${selectedChapter}?translation=eng-KJV`,
      );
      if (!res.ok) throw new Error("Chapter not found");
      const data = await res.json();
      setChapterData(data);
    } catch (err) {
      setError("Failed to load chapter. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedBook, selectedChapter]);

  // Load chapter when book/chapter changes
  useEffect(() => {
    fetchChapter();
  }, [fetchChapter]);

  // 4. Load saved notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("bibleStudyNotes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse saved notes");
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bibleStudyNotes", JSON.stringify(notes));
  }, [notes]);

  // --- Helper Functions ---
  const getVerseKey = (verse: number) =>
    `${selectedBook}_${selectedChapter}_${verse}`;

  const handleSaveNote = (verse: number) => {
    if (noteInput.trim()) {
      setNotes((prev) => ({
        ...prev,
        [getVerseKey(verse)]: noteInput.trim(),
      }));
      setActiveNoteVerse(null);
      setNoteInput("");
    }
  };

  const handleDeleteNote = (verse: number) => {
    setNotes((prev) => {
      const newNotes = { ...prev };
      delete newNotes[getVerseKey(verse)];
      return newNotes;
    });
    setActiveNoteVerse(null);
  };

  // 5. Highlight potential cross-references (numbers in parentheses or brackets)
  const renderVerseText = (text: string) => {
    // Check for patterns like (1), [2], or just standalone numbers
    const parts = text.split(/(\([^)]+\)|\[[^\]]+\])/);
    return parts.map((part, index) => {
      // If it's a reference in parentheses/brackets, highlight it
      if (part.match(/^\([^)]+\)$/) || part.match(/^\[[^\]]+\]$/)) {
        return (
          <span key={index} className="cross-ref">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="bible-container">
      {/* --- HEADER --- */}
      <header className="bible-header">
        <h1>📖 Personal Bible Study</h1>
        <p>KJV Translation • Your notes are saved locally</p>
      </header>

      {/* --- CONTROLS --- */}
      <div className="controls">
        <div className="control-group">
          <label htmlFor="book-select">Book</label>
          <select
            id="book-select"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            {books.map((book) => (
              <option key={book} value={book}>
                {book}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="chapter-select">Chapter</label>
          <select
            id="chapter-select"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(Number(e.target.value))}
          >
            {chapters.map((ch) => (
              <option key={ch} value={ch}>
                Chapter {ch}
              </option>
            ))}
          </select>
        </div>

        <button onClick={fetchChapter} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {/* --- CONTENT --- */}
      <div className="content-area">
        {loading && <div className="loading">Loading chapter...</div>}
        {error && <div className="error">{error}</div>}

        {chapterData && !loading && (
          <>
            <div className="chapter-header">
              <h2>{chapterData.reference}</h2>
              <span className="translation-badge">
                {chapterData.translation}
              </span>
            </div>

            <div className="verses-container">
              {chapterData.verses.map((v) => {
                const verseKey = getVerseKey(v.verse);
                const hasNote = notes[verseKey] !== undefined;

                return (
                  <div key={v.verse} className="verse-block" id={`v${v.verse}`}>
                    <div className="verse-header">
                      <span className="verse-number">{v.verse}</span>
                      <div className="verse-actions">
                        <button
                          className="note-toggle"
                          onClick={() => {
                            if (activeNoteVerse === v.verse) {
                              setActiveNoteVerse(null);
                            } else {
                              setActiveNoteVerse(v.verse);
                              setNoteInput(notes[verseKey] || "");
                            }
                          }}
                          title="Add/Edit Note"
                        >
                          {hasNote ? "✏️" : "📝"}
                        </button>
                      </div>
                    </div>

                    <div className="verse-text">{renderVerseText(v.text)}</div>

                    {/* Note Editor */}
                    {activeNoteVerse === v.verse && (
                      <div className="note-editor">
                        <textarea
                          value={noteInput}
                          onChange={(e) => setNoteInput(e.target.value)}
                          placeholder="Write your personal insight, cross-reference, or question here..."
                          rows={3}
                          autoFocus
                        />
                        <div className="note-actions">
                          <button
                            className="save-note-btn"
                            onClick={() => handleSaveNote(v.verse)}
                          >
                            💾 Save Note
                          </button>
                          {hasNote && (
                            <button
                              className="delete-note-btn"
                              onClick={() => handleDeleteNote(v.verse)}
                            >
                              🗑️ Delete
                            </button>
                          )}
                          <button
                            className="cancel-note-btn"
                            onClick={() => {
                              setActiveNoteVerse(null);
                              setNoteInput("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Display saved note below verse */}
                    {hasNote && activeNoteVerse !== v.verse && (
                      <div className="saved-note">
                        <span className="note-label">📌 Insight:</span>
                        <p>{notes[verseKey]}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Chapter Summary Stats */}
            <div className="chapter-stats">
              <p>
                📊 {chapterData.verses.length} verses • 💡{" "}
                {
                  Object.keys(notes).filter((key) =>
                    key.startsWith(`${selectedBook}_${selectedChapter}`),
                  ).length
                }{" "}
                personal notes
              </p>
            </div>
          </>
        )}
      </div>

      {/* --- STYLES (Embedded for single-file demo) --- */}
      <style jsx>{`
        .bible-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background: #faf9f7;
          min-height: 100vh;
        }

        .bible-header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 2px solid #d4c5a9;
          margin-bottom: 24px;
        }

        .bible-header h1 {
          margin: 0;
          color: #2c1810;
          font-size: 2rem;
        }

        .bible-header p {
          margin: 4px 0 0;
          color: #6b5a4a;
          font-size: 0.9rem;
        }

        .controls {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: flex-end;
          background: white;
          padding: 16px 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          margin-bottom: 24px;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 140px;
        }

        .control-group label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6b5a4a;
          margin-bottom: 4px;
        }

        .control-group select {
          padding: 8px 12px;
          border: 1px solid #d4c5a9;
          border-radius: 8px;
          background: white;
          font-size: 0.95rem;
          color: #2c1810;
          cursor: pointer;
        }

        .refresh-btn {
          padding: 8px 20px;
          background: #2c1810;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          height: 40px;
          align-self: flex-end;
        }

        .refresh-btn:hover {
          background: #4a2f24;
        }

        .content-area {
          background: white;
          border-radius: 12px;
          padding: 24px 28px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .loading,
        .error {
          text-align: center;
          padding: 40px 0;
          color: #6b5a4a;
        }

        .error {
          color: #b33c3c;
        }

        .chapter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e8e0d6;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }

        .chapter-header h2 {
          margin: 0;
          color: #2c1810;
          font-size: 1.5rem;
        }

        .translation-badge {
          background: #e8e0d6;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #4a3f33;
        }

        .verses-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .verse-block {
          padding: 12px 16px;
          border-radius: 8px;
          transition: background 0.15s;
          border-left: 3px solid transparent;
        }

        .verse-block:hover {
          background: #f8f5f0;
          border-left-color: #d4c5a9;
        }

        .verse-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .verse-number {
          font-weight: 700;
          color: #8a7a6a;
          font-size: 0.8rem;
          min-width: 32px;
        }

        .verse-actions {
          display: flex;
          gap: 6px;
        }

        .note-toggle {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          padding: 2px 6px;
          border-radius: 4px;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        .note-toggle:hover {
          opacity: 1;
          background: #e8e0d6;
        }

        .verse-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #1a1410;
          padding-left: 36px;
        }

        .verse-text .cross-ref {
          background: #f0ece3;
          color: #7a4a2a;
          padding: 1px 6px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
          margin: 0 2px;
          cursor: help;
          border-bottom: 1px dashed #b8a690;
        }

        .note-editor {
          margin-top: 10px;
          margin-left: 36px;
          padding: 12px;
          background: #f8f5f0;
          border-radius: 8px;
          border: 1px solid #e0d6c8;
        }

        .note-editor textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #d4c5a9;
          border-radius: 6px;
          font-family: inherit;
          font-size: 0.95rem;
          resize: vertical;
          background: white;
        }

        .note-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          flex-wrap: wrap;
        }

        .note-actions button {
          padding: 6px 16px;
          border: none;
          border-radius: 6px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .save-note-btn {
          background: #2c1810;
          color: white;
        }
        .save-note-btn:hover {
          background: #4a2f24;
        }

        .delete-note-btn {
          background: #d4a0a0;
          color: #4a1a1a;
        }
        .delete-note-btn:hover {
          background: #c08080;
        }

        .cancel-note-btn {
          background: #e8e0d6;
          color: #4a3f33;
        }
        .cancel-note-btn:hover {
          background: #d4c5a9;
        }

        .saved-note {
          margin-top: 6px;
          margin-left: 36px;
          padding: 10px 14px;
          background: #f0ece3;
          border-left: 4px solid #8a7a6a;
          border-radius: 4px;
          font-size: 0.92rem;
        }

        .saved-note .note-label {
          font-weight: 600;
          color: #5a4a3a;
          margin-right: 8px;
        }

        .saved-note p {
          margin: 4px 0 0;
          color: #2c1810;
          line-height: 1.5;
        }

        .chapter-stats {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #e8e0d6;
          color: #6b5a4a;
          font-size: 0.85rem;
          text-align: center;
        }

        @media (max-width: 600px) {
          .bible-container {
            padding: 12px;
          }
          .content-area {
            padding: 16px;
          }
          .controls {
            flex-direction: column;
          }
          .control-group {
            min-width: 100%;
          }
          .verse-text {
            font-size: 0.95rem;
            padding-left: 4px;
          }
          .note-editor {
            margin-left: 0;
          }
          .saved-note {
            margin-left: 0;
          }
          .verse-header {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}
