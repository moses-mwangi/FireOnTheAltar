// components/review/ReviewDashboard.tsx
"use client";

import { useState } from "react";
import { Check, X, Clock, BarChart } from "lucide-react";
import { SRScheduler } from "@/lib/src";
// import { SRScheduler } from "@/lib/srs";

interface ReviewItem {
  id: string;
  note: {
    title: string;
    content: string;
    verse: string;
  };
  stats: {
    nextReview: Date;
    interval: number;
    easeFactor: number;
    reviewCount: number;
  };
}

export default function ReviewDashboard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewItems] = useState<ReviewItem[]>([
    {
      id: "1",
      note: {
        title: "God's Love",
        content:
          "This shows the unconditional nature of God's love for humanity",
        verse: "John 3:16",
      },
      stats: {
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0,
      },
    },
    // More items...
  ]);

  const handleReview = (quality: number) => {
    if (currentIndex >= reviewItems.length - 1) {
      // All reviews completed
      return;
    }

    // Update SRS stats (in real app, send to API)
    const updatedStats = SRScheduler.calculateNextReview(
      reviewItems[currentIndex].stats,
      quality
    );

    // Move to next item
    setCurrentIndex(currentIndex + 1);
    setShowAnswer(false);
  };

  const currentItem = reviewItems[currentIndex];

  if (!currentItem) {
    return (
      <div className="text-center py-12">
        <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">All Caught Up!</h3>
        <p className="text-gray-600">No reviews due at this time.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">Daily Review</h2>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {currentIndex + 1} of {reviewItems.length}
            </span>
            <span className="flex items-center gap-1">
              <BarChart className="w-4 h-4" />
              {currentItem.stats.reviewCount} previous reviews
            </span>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{
              width: `${((currentIndex + 1) / reviewItems.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Review Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {currentItem.note.verse}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-4">{currentItem.note.title}</h3>

        {!showAnswer ? (
          <div>
            <p className="text-gray-600 mb-6">
              What were your insights about this verse?
            </p>
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Show Answer
            </button>
          </div>
        ) : (
          <div>
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <p className="text-gray-700">{currentItem.note.content}</p>
            </div>

            <div className="space-y-3">
              <p className="text-gray-600">How well did you remember?</p>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleReview(rating)}
                    className={`py-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                      rating <= 2
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : rating === 3
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {rating === 1 && <X className="w-5 h-5" />}
                    {rating === 5 && <Check className="w-5 h-5" />}
                    <span className="mt-1 font-semibold">{rating}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Forgot</span>
                <span>Perfect</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
