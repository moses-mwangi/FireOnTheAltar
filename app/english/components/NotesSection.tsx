"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, X, Calendar, BookOpen } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  word?: string; // optional - link to a vocabulary word
  createdAt: Date;
  updatedAt: Date;
}

export default function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [linkedWord, setLinkedWord] = useState("");

  // Load notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("english-notes");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const withDates = parsed.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }));
        setNotes(withDates);
      } catch (e) {
        console.error("Failed to load notes");
      }
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("english-notes", JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (!title.trim() || !content.trim()) return;

    if (editingNote) {
      // Update existing note
      setNotes(
        notes.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                title: title.trim(),
                content: content.trim(),
                word: linkedWord || undefined,
                updatedAt: new Date(),
              }
            : note,
        ),
      );
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        word: linkedWord || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setNotes([newNote, ...notes]);
    }

    // Reset form
    setTitle("");
    setContent("");
    setLinkedWord("");
    setEditingNote(null);
    setShowForm(false);
  };

  const deleteNote = (id: string) => {
    if (confirm("Delete this note? You can't undo this.")) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  const startEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setLinkedWord(note.word || "");
    setShowForm(true);
  };

  const cancelForm = () => {
    setTitle("");
    setContent("");
    setLinkedWord("");
    setEditingNote(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            My Notes
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Jot down thoughts, example sentences, or things you want to remember
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Note
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg font-medium bg-transparent border-0 focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-500 mb-3"
            autoFocus
          />
          <textarea
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 resize-none placeholder-gray-400 dark:placeholder-gray-500"
          />
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <input
              type="text"
              placeholder="Link to a word (optional)"
              value={linkedWord}
              onChange={(e) => setLinkedWord(e.target.value)}
              className="text-sm bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <div className="flex gap-2">
              <button
                onClick={cancelForm}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveNote}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {editingNote ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No notes yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Click "New Note" to start writing
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {note.title}
                  </h3>
                  {note.word && (
                    <span className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 mt-1">
                      <BookOpen className="h-3 w-3" />
                      {note.word}
                    </span>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(note)}
                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-lg"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {note.content}
              </p>

              <div className="flex items-center gap-4 mt-4 text-xs text-gray-400 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(note.updatedAt).toLocaleDateString()}
                </span>
                {note.createdAt.getTime() !== note.updatedAt.getTime() && (
                  <span>Edited</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
