// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     
//     </div>
//   );
// }
// components/bible/BibleReader.tsx
'use client';

import { useState } from 'react';
import { BookOpen, Search, Tag } from 'lucide-react';

interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export default function BibleReader() {
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [showNoteForm, setShowNoteForm] = useState(false);

  // Mock data - in production, use API.Bible
  const verses: BibleVerse[] = [
    { book: 'John', chapter: 3, verse: 16, text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.' },
    { book: 'Psalm', chapter: 23, verse: 1, text: 'The LORD is my shepherd, I lack nothing.' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Bible Text Panel */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Bible Reader
          </h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-1">
              <option>ESV</option>
              <option>NIV</option>
              <option>KJV</option>
            </select>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {verses.map((verse) => (
            <div
              key={`${verse.book}-${verse.chapter}-${verse.verse}`}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-blue-50 ${
                selectedVerse?.verse === verse.verse ? 'bg-blue-50 border-blue-300' : ''
              }`}
              onClick={() => setSelectedVerse(verse)}
            >
              <div className="flex justify-between items-start">
                <span className="font-semibold text-blue-700">
                  {verse.book} {verse.chapter}:{verse.verse}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNoteForm(true);
                  }}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Add Note
                </button>
              </div>
              <p className="mt-2 text-gray-700">{verse.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes Panel */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-bold mb-4">Notes & Insights</h3>
        
        {selectedVerse ? (
          <div>
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold">
                {selectedVerse.book} {selectedVerse.chapter}:{selectedVerse.verse}
              </h4>
              <p className="text-gray-600 mt-1">{selectedVerse.text}</p>
            </div>

            {/* Note Form */}
            {showNoteForm && (
              <div className="mt-4 p-4 border rounded-lg">
                <textarea
                  className="w-full border rounded-lg p-3"
                  rows={4}
                  placeholder="Add your insights, reflections, or applications..."
                />
                <div className="flex gap-2 mt-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Save Note
                  </button>
                  <button
                    onClick={() => setShowNoteForm(false)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Existing Notes */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Previous Notes</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="text-gray-700">This verse reminds me of God's unconditional love.</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Tag className="w-3 h-3" />
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      Love
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Select a verse to view and add notes
          </p>
        )}
      </div>
    </div>
  );
}