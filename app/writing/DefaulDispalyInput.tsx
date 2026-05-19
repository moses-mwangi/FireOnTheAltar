import { Button } from "@/components/ui/button";
import { WritingEntry } from "@/lib/types/folders";
import { Save } from "lucide-react";
import React from "react";

export default function DefaultInput({
  title,
  content,
  tags,
  wordCount,
  saveEntry,
  setTitle,
  setContent,
  setTags,
  selectedFolderId,
  selectedEntry,
  updateEntry,
}: {
  title: string;
  content: string;
  tags: string;
  wordCount: number;
  saveEntry: () => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setTags: (tags: string) => void;
  selectedFolderId: string | null;
  selectedEntry: any; // Replace with your actual entry type
  updateEntry: (
    entryId: string,
    updates: Partial<WritingEntry>,
  ) => Promise<void>;
}) {
  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-bold bg-transparent border-none focus:outline-none"
          />
        </div>
        <div className="p-6">
          <textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[500px] text-gray-800 dark:text-white placeholder-gray-400 bg-transparent border-none focus:outline-none resize-none leading-relaxed"
          />
        </div>
        <div className="px-6 py-3 border-t">
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full text-sm bg-transparent border-none focus:outline-none"
          />
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span>{wordCount} words</span>
            <span>•</span>
            <span>{content.length} characters</span>
          </div>
          {/* <Button
            // onClick={saveEntry}
            disabled={!title.trim() || !content.trim() || !selectedFolderId}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {selectedEntry ? "Update" : "Save"}
          </Button> */}

          <Button
            onClick={() => {
              if (selectedEntry) {
                updateEntry(selectedEntry.id, {
                  title,
                  content,
                  tags: tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),

                  // updatedAt: new Date().toISOString(),
                });
              } else {
                saveEntry();
              }
            }}
            disabled={!title.trim() || !content.trim() || !selectedFolderId}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Save className="h-4 w-4 mr-2" />

            {selectedEntry ? "Update" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
