// components/review/ReviewSession.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Check,
  X,
  Clock,
  Brain,
  Zap,
  RotateCcw,
  Volume2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  SkipForward,
  Target,
  Timer,
  Star,
  Bookmark,
  Share2,
  Maximize2,
  Minimize2,
  Settings,
  HelpCircle,
  BarChart3,
  Sparkles,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  verse: string;
  tags: string[];
}

interface ReviewSessionProps {
  mode: "flashcards" | "quiz" | "fill" | "matching";
  notes: Note[];
  onComplete: (quality: number) => void;
  onEnd: () => void;
  sessionStats: {
    completed: number;
    correct: number;
    timeSpent: number;
    streak: number;
  };
}

const ReviewSession: React.FC<ReviewSessionProps> = ({
  mode,
  notes,
  onComplete,
  onEnd,
  sessionStats,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionActive, setSessionActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reviewHistory, setReviewHistory] = useState<
    Array<{
      noteId: string;
      quality: number;
      timeSpent: number;
    }>
  >([]);

  const intervalRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>(Date.now());

  const currentNote = notes[currentIndex];

  // Timer effect
  useEffect(() => {
    if (sessionActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sessionActive, isPaused]);

  // Start timing for current note
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [currentIndex]);

  const handleReview = (quality: number) => {
    const timeSpent = Date.now() - startTimeRef.current;

    setReviewHistory((prev) => [
      ...prev,
      {
        noteId: currentNote.id,
        quality,
        timeSpent,
      },
    ]);

    onComplete(quality);

    if (currentIndex < notes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setSessionActive(false);
    }
  };

  const handleAnswerSelect = (answer: string, isCorrectAnswer: boolean) => {
    setSelectedAnswer(answer);
    setIsCorrect(isCorrectAnswer);

    setTimeout(() => {
      handleReview(isCorrectAnswer ? 5 : 1);
    }, 1000);
  };

  const handleSkip = () => {
    if (currentIndex < notes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-100 text-emerald-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      case "hard":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getProgressPercentage = () => {
    return ((currentIndex + 1) / notes.length) * 100;
  };

  const getEstimatedTimeRemaining = () => {
    const avgTimePerNote = timer / (currentIndex + 1);
    const notesRemaining = notes.length - (currentIndex + 1);
    return Math.round((avgTimePerNote * notesRemaining) / 1000);
  };

  // Quiz answers for demo
  const quizAnswers = [
    { text: "God so loved the world", correct: true },
    { text: "God so saved the world", correct: false },
    { text: "God so judged the world", correct: false },
    { text: "God so created the world", correct: false },
  ];

  const fillInBlanks = {
    text: "For God so ______ the world that he gave his one and only Son...",
    answer: "loved",
  };

  if (!sessionActive) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-emerald-100 to-teal-100 mb-4">
          <Check className="h-16 w-16 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">
          Session Complete! 🎉
        </h3>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="text-2xl font-bold text-slate-800">
                {sessionStats.completed}
              </div>
              <div className="text-sm text-slate-600">Notes Reviewed</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="text-2xl font-bold text-slate-800">
                {sessionStats.correct}
              </div>
              <div className="text-sm text-slate-600">Correct Answers</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="text-2xl font-bold text-slate-800">
                {sessionStats.streak}
              </div>
              <div className="text-sm text-slate-600">Best Streak</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="text-2xl font-bold text-slate-800">
                {formatTime(timer)}
              </div>
              <div className="text-sm text-slate-600">Time Spent</div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onEnd}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700"
            >
              Return to Dashboard
            </button>
            <button className="w-full py-3 border border-purple-300 text-purple-600 rounded-xl hover:bg-purple-50">
              Review Mistakes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`space-y-6 ${
        isFullscreen ? "fixed inset-0 z-50 bg-white p-6" : ""
      }`}
    >
      {/* Session Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`p-2 rounded-lg ${
              mode === "flashcards"
                ? "bg-purple-100 text-purple-600"
                : mode === "quiz"
                ? "bg-emerald-100 text-emerald-600"
                : mode === "fill"
                ? "bg-amber-100 text-amber-600"
                : "bg-rose-100 text-rose-600"
            }`}
          >
            {mode === "flashcards" && <Brain className="h-6 w-6" />}
            {mode === "quiz" && <Target className="h-6 w-6" />}
            {mode === "fill" && <RotateCcw className="h-6 w-6" />}
            {mode === "matching" && <Zap className="h-6 w-6" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              {mode === "flashcards" && "Flashcards Review"}
              {mode === "quiz" && "Verse Quiz"}
              {mode === "fill" && "Fill in the Blanks"}
              {mode === "matching" && "Verse Matching"}
            </h3>
            <p className="text-sm text-slate-600">
              {currentIndex + 1} of {notes.length} • {formatTime(timer)} elapsed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            {isPaused ? (
              <Play className="h-5 w-5 text-slate-600" />
            ) : (
              <Pause className="h-5 w-5 text-slate-600" />
            )}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5 text-slate-600" />
            ) : (
              <Maximize2 className="h-5 w-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Progress</span>
          <span className="font-medium text-slate-800">
            {Math.round(getProgressPercentage())}%
          </span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{currentIndex + 1} reviewed</span>
          <span>{notes.length - currentIndex - 1} remaining</span>
        </div>
      </div>

      {/* Session Stats Bar */}
      <div className="grid grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-slate-800">Avg Time</span>
          </div>
          <div className="text-lg font-bold text-slate-800 mt-1">
            {currentIndex > 0 ? Math.round(timer / (currentIndex + 1)) : 0}s
          </div>
        </div>

        <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-slate-800">Streak</span>
          </div>
          <div className="text-lg font-bold text-slate-800 mt-1">
            {sessionStats.streak}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-slate-800">Accuracy</span>
          </div>
          <div className="text-lg font-bold text-slate-800 mt-1">
            {sessionStats.completed > 0
              ? Math.round(
                  (sessionStats.correct / sessionStats.completed) * 100
                )
              : 0}
            %
          </div>
        </div>

        <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-800">
              Est. Remaining
            </span>
          </div>
          <div className="text-lg font-bold text-slate-800 mt-1">
            {getEstimatedTimeRemaining()}m
          </div>
        </div>
      </div>

      {/* Review Card */}
      <div className="relative">
        {/* Navigation */}
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between z-10 px-2">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full shadow-lg ${
              currentIndex === 0
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleSkip}
            className="p-2 rounded-full bg-white shadow-lg text-slate-700 hover:bg-slate-100"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        {/* Main Review Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          {/* Note Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium">
                {currentNote.verse}
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor()}`}
              >
                {difficulty.toUpperCase()}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <Volume2 className="h-5 w-5 text-slate-500" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <Bookmark className="h-5 w-5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Question/Answer Area */}
          {mode === "flashcards" ? (
            <div className="text-center py-12">
              {!showAnswer ? (
                <div>
                  <h4 className="text-2xl font-bold text-slate-800 mb-6">
                    {currentNote.title}
                  </h4>
                  <p className="text-slate-600 text-lg mb-8">
                    What were your insights about this verse?
                  </p>
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="px-8 py-4 text-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 shadow-lg"
                  >
                    Show Answer
                  </button>
                </div>
              ) : (
                <div>
                  <div className="p-6 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 mb-8">
                    <p className="text-slate-700 text-lg leading-relaxed">
                      {currentNote.content}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-slate-600">How well did you remember?</p>
                    <div className="grid grid-cols-5 gap-3">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleReview(rating)}
                          className={`py-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 ${
                            rating <= 2
                              ? "bg-gradient-to-b from-red-100 to-red-50 text-red-700 hover:from-red-200 hover:to-red-100"
                              : rating === 3
                              ? "bg-gradient-to-b from-yellow-100 to-yellow-50 text-yellow-700 hover:from-yellow-200 hover:to-yellow-100"
                              : "bg-gradient-to-b from-emerald-100 to-emerald-50 text-emerald-700 hover:from-emerald-200 hover:to-emerald-100"
                          }`}
                        >
                          {rating === 1 && <X className="h-6 w-6 mb-2" />}
                          {rating === 5 && <Check className="h-6 w-6 mb-2" />}
                          <span className="text-xl font-bold">{rating}</span>
                          <span className="text-xs mt-1">
                            {rating === 1 && "Forgot"}
                            {rating === 2 && "Hard"}
                            {rating === 3 && "OK"}
                            {rating === 4 && "Good"}
                            {rating === 5 && "Perfect"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : mode === "quiz" ? (
            <div className="py-8">
              <h4 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Complete the verse: John 3:16
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {quizAnswers.map((answer, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      handleAnswerSelect(answer.text, answer.correct)
                    }
                    disabled={selectedAnswer !== null}
                    className={`p-4 rounded-xl text-left transition-all duration-300 ${
                      selectedAnswer === answer.text
                        ? answer.correct
                          ? "bg-emerald-100 border-2 border-emerald-500"
                          : "bg-red-100 border-2 border-red-500"
                        : "bg-slate-50 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedAnswer === answer.text
                            ? answer.correct
                              ? "bg-emerald-500 text-white"
                              : "bg-red-500 text-white"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="font-medium">{answer.text}</span>
                    </div>
                  </button>
                ))}
              </div>

              {isCorrect !== null && (
                <div
                  className={`mt-6 p-4 rounded-xl text-center ${
                    isCorrect
                      ? "bg-emerald-50 border border-emerald-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {isCorrect ? (
                      <>
                        <Check className="h-5 w-5 text-emerald-600" />
                        <span className="font-bold text-emerald-700">
                          Correct!
                        </span>
                      </>
                    ) : (
                      <>
                        <X className="h-5 w-5 text-red-600" />
                        <span className="font-bold text-red-700">
                          Incorrect
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-600">
                    The complete verse is: "For God so loved the world that he
                    gave his one and only Son..."
                  </p>
                </div>
              )}
            </div>
          ) : mode === "fill" ? (
            <div className="py-8">
              <h4 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Fill in the Blank
              </h4>
              <div className="p-6 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 mb-8">
                <p className="text-2xl text-center font-serif">
                  {fillInBlanks.text}
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Type the missing word..."
                  className="w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-xl focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={() => handleAnswerSelect("loved", true)}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700"
                >
                  Check Answer
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8">
              <h4 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Match the Verse
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50">
                    <p className="font-medium">"The LORD is my shepherd..."</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                    <p className="font-medium">"I can do all things..."</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50">
                    <p className="font-medium">
                      "For God so loved the world..."
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => handleAnswerSelect("psalm23", false)}
                    className="w-full p-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-left"
                  >
                    <p className="font-medium">Philippians 4:13</p>
                  </button>
                  <button
                    onClick={() => handleAnswerSelect("phil413", true)}
                    className="w-full p-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-left"
                  >
                    <p className="font-medium">John 3:16</p>
                  </button>
                  <button
                    onClick={() => handleAnswerSelect("john316", true)}
                    className="w-full p-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-left"
                  >
                    <p className="font-medium">Psalm 23:1</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {currentNote.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onEnd}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            End Session
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Difficulty:</span>
            <div className="flex bg-slate-100 rounded-lg p-1">
              {["easy", "medium", "hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level as any)}
                  className={`px-3 py-1 text-sm font-medium rounded-md capitalize ${
                    difficulty === level
                      ? "bg-white shadow text-slate-800"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-slate-100 rounded-lg">
            <Settings className="h-5 w-5 text-slate-500" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg">
            <HelpCircle className="h-5 w-5 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Session Tips */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-bold text-slate-800 mb-1">Study Tip</h4>
            <p className="text-sm text-slate-600">
              {mode === "flashcards" &&
                "Try to recall the verse before revealing the answer. Active recall strengthens memory."}
              {mode === "quiz" &&
                "Read all options carefully before selecting. Consider the context of the verse."}
              {mode === "fill" &&
                "Visualize the complete verse in your mind before filling in the blank."}
              {mode === "matching" &&
                "Look for keywords that connect verses to their references."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSession;
