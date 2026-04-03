"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  PenTool,
  Target,
  Trophy,
  RefreshCw,
} from "lucide-react";
import { GrammarRule, GrammarExercise, UserProgress } from "../grammarTypes";

// Comprehensive grammar data
const grammarRules: GrammarRule[] = [
  {
    id: "present-simple-vs-continuous",
    title: "Present Simple vs. Present Continuous",
    category: "tenses",
    level: "beginner",
    explanation:
      "Present Simple describes habits, facts, and routines. Present Continuous describes actions happening now or temporary situations.",
    rules: [
      {
        pattern: "Present Simple: Subject + base verb (+ s/es for he/she/it)",
        usage: "Permanent situations, habits, general truths",
        examples: [
          "I work at a bank. (permanent job)",
          "Water boils at 100°C. (scientific fact)",
          "She takes the train every day. (habit)",
        ],
      },
      {
        pattern: "Present Continuous: Subject + am/is/are + verb-ing",
        usage:
          "Actions happening now, temporary situations, future arrangements",
        examples: [
          "I'm working from home today. (temporary)",
          "Look! It's snowing. (now)",
          "She's meeting her friend tomorrow. (future plan)",
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: "I am knowing the answer.",
        correction: "I know the answer.",
        explanation:
          "Stative verbs (know, believe, understand) are not usually used in continuous form.",
      },
      {
        mistake: "She goes to school right now.",
        correction: "She is going to school right now.",
        explanation: "Use continuous for actions happening at this moment.",
      },
    ],
    timeExpressions: [
      "always",
      "usually",
      "often",
      "sometimes",
      "never",
      "now",
      "at the moment",
      "today",
      "this week",
    ],
  },
  {
    id: "modal-verbs",
    title: "Modal Verbs: Can, Could, May, Might, Must, Should",
    category: "modal-verbs",
    level: "intermediate",
    explanation:
      "Modal verbs express ability, possibility, permission, obligation, and advice. They never change form and are followed by the base verb.",
    rules: [
      {
        pattern: "Can/Could + base verb",
        usage:
          "Ability (can=present, could=past/polite), possibility, permission",
        examples: [
          "I can swim. (ability)",
          "Could you help me? (polite request)",
          "You can leave early. (permission)",
        ],
      },
      {
        pattern: "May/Might + base verb",
        usage: "Possibility (may=50%, might=30%), polite permission",
        examples: [
          "It may rain later. (possible)",
          "She might come to the party. (less likely)",
          "May I come in? (formal permission)",
        ],
      },
      {
        pattern: "Must/Should + base verb",
        usage: "Must=strong obligation/necessity, Should=advice/recommendation",
        examples: [
          "You must stop at red lights. (obligation)",
          "You should see a doctor. (advice)",
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: "He can to swim.",
        correction: "He can swim.",
        explanation: "Modal verbs are followed by the base form without 'to'.",
      },
      {
        mistake: "She musts study.",
        correction: "She must study.",
        explanation: "Modal verbs don't add -s in third person.",
      },
    ],
  },
  {
    id: "conditionals-zero-first",
    title: "Conditionals: Zero and First",
    category: "conditionals",
    level: "intermediate",
    explanation:
      "Conditionals express 'if...then' relationships. Zero conditional = always true. First conditional = possible future situations.",
    rules: [
      {
        pattern: "Zero Conditional: If + present simple, present simple",
        usage: "General truths, scientific facts, habits",
        examples: [
          "If you heat ice, it melts.",
          "If it rains, the ground gets wet.",
          "If I'm tired, I drink coffee.",
        ],
      },
      {
        pattern:
          "First Conditional: If + present simple, will/can/may + base verb",
        usage: "Real possible situations in the future",
        examples: [
          "If it rains tomorrow, we will stay home.",
          "If you study hard, you can pass the exam.",
          "If she calls, I'll tell her the news.",
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: "If it will rain, I will stay home.",
        correction: "If it rains, I will stay home.",
        explanation: "Never use 'will' in the 'if' clause of a conditional.",
      },
    ],
  },
  {
    id: "prepositions-time",
    title: "Prepositions of Time: In, On, At",
    category: "prepositions",
    level: "beginner",
    explanation:
      "Use AT for specific times, ON for days/dates, IN for months/years/parts of day.",
    rules: [
      {
        pattern: "AT + specific time / holiday periods / night",
        usage: "Clock times, specific moments",
        examples: [
          "at 5 o'clock, at midnight, at lunchtime",
          "at night, at the weekend (UK)",
          "at Christmas, at the same time",
        ],
      },
      {
        pattern: "ON + days / dates / special days",
        usage: "Specific days and dates",
        examples: [
          "on Monday, on July 4th",
          "on my birthday, on Christmas Day",
          "on the weekend (US)",
        ],
      },
      {
        pattern: "IN + months / years / seasons / parts of day",
        usage: "Longer periods",
        examples: [
          "in June, in 2024, in summer",
          "in the morning, in the afternoon, in the evening",
          "in the 21st century",
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: "I will see you in Monday.",
        correction: "I will see you on Monday.",
        explanation: "Use 'on' for specific days.",
      },
      {
        mistake: "She works at the night.",
        correction: "She works at night. OR She works in the night.",
        explanation:
          "'At night' is the common expression; 'in the night' is also possible but less common.",
      },
    ],
  },
];

// Interactive exercises
const grammarExercises: GrammarExercise[] = [
  // Present Simple vs Continuous
  {
    id: "ex1",
    ruleId: "present-simple-vs-continuous",
    type: "fill-blank",
    question: "She ______ (work) as a doctor. It's her permanent job.",
    correctAnswer: "works",
    explanation: "This is a permanent situation/fact, so use Present Simple.",
    difficulty: "easy",
  },
  {
    id: "ex2",
    ruleId: "present-simple-vs-continuous",
    type: "fill-blank",
    question: "Right now, I ______ (study) for my exam.",
    correctAnswer: "am studying",
    explanation: "This is happening at this moment, so use Present Continuous.",
    difficulty: "easy",
  },
  {
    id: "ex3",
    ruleId: "present-simple-vs-continuous",
    type: "multiple-choice",
    question: "What's the correct form? 'Water ______ at 100°C.'",
    options: ["is boiling", "boils", "boiling", "is boil"],
    correctAnswer: "boils",
    explanation:
      "This is a scientific fact/general truth, so use Present Simple.",
    difficulty: "easy",
  },
  // Modal verbs
  {
    id: "ex4",
    ruleId: "modal-verbs",
    type: "fill-blank",
    question: "______ you help me with this heavy box? (polite request)",
    correctAnswer: "Could",
    explanation: "'Could' is used for polite requests.",
    difficulty: "medium",
  },
  {
    id: "ex5",
    ruleId: "modal-verbs",
    type: "error-correction",
    question: "Find and correct the error: 'She can to speak three languages.'",
    correctAnswer: "She can speak three languages.",
    explanation:
      "Modal verbs are followed directly by the base verb without 'to'.",
    difficulty: "medium",
  },
  // Conditionals
  {
    id: "ex6",
    ruleId: "conditionals-zero-first",
    type: "transformation",
    question:
      "Rewrite using first conditional: Maybe it will rain. If it does, we won't go to the park.",
    correctAnswer: "If it rains, we won't go to the park.",
    explanation:
      "First conditional uses present simple in the 'if' clause and will/won't in the main clause.",
    difficulty: "medium",
  },
  // Prepositions
  {
    id: "ex7",
    ruleId: "prepositions-time",
    type: "fill-blank",
    question: "The meeting is ______ Friday morning.",
    correctAnswer: "on",
    explanation:
      "Use 'on' for specific days (even when followed by morning/afternoon).",
    difficulty: "easy",
  },
  {
    id: "ex8",
    ruleId: "prepositions-time",
    type: "multiple-choice",
    question:
      "Choose the correct preposition: 'I usually wake up ______ 7 AM.'",
    options: ["in", "on", "at", "for"],
    correctAnswer: "at",
    explanation: "Use 'at' for specific clock times.",
    difficulty: "easy",
  },
];

// Helper function to get rules by category
const getRulesByCategory = (rules: GrammarRule[], category: string) => {
  if (category === "all") return rules;
  return rules.filter((rule) => rule.category === category);
};

export default function GrammarSection() {
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submittedExercises, setSubmittedExercises] = useState<Set<string>>(
    new Set(),
  );
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedExercises: [],
    scores: {},
    masteredRules: [],
    weakAreas: [],
  });

  const categories = [
    { id: "all", name: "All Topics", icon: "📚" },
    { id: "tenses", name: "Tenses", icon: "⏰" },
    { id: "modal-verbs", name: "Modal Verbs", icon: "🔮" },
    { id: "conditionals", name: "Conditionals", icon: "⚡" },
    { id: "prepositions", name: "Prepositions", icon: "📍" },
  ];

  const handleAnswer = (exerciseId: string, answer: string) => {
    setUserAnswers({ ...userAnswers, [exerciseId]: answer });
  };

  const checkAnswer = (exercise: GrammarExercise) => {
    const userAnswer = userAnswers[exercise.id]?.trim().toLowerCase();
    const isCorrect = userAnswer === exercise.correctAnswer.toLowerCase();

    setShowResults({ ...showResults, [exercise.id]: isCorrect });
    setSubmittedExercises(new Set([...submittedExercises, exercise.id]));

    // Update progress
    if (isCorrect && !userProgress.completedExercises.includes(exercise.id)) {
      const newCompleted = [...userProgress.completedExercises, exercise.id];
      const newScores = { ...userProgress.scores, [exercise.id]: 100 };
      setUserProgress({
        ...userProgress,
        completedExercises: newCompleted,
        scores: newScores,
      });
    }
  };

  const getExerciseStatus = (exerciseId: string) => {
    if (submittedExercises.has(exerciseId)) {
      return showResults[exerciseId] ? "correct" : "incorrect";
    }
    return "pending";
  };

  const getScoreForRule = (ruleId: string) => {
    const exercisesForRule = grammarExercises.filter(
      (ex) => ex.ruleId === ruleId,
    );
    const completed = exercisesForRule.filter(
      (ex) =>
        userProgress.completedExercises.includes(ex.id) && showResults[ex.id],
    );
    return exercisesForRule.length > 0
      ? Math.round((completed.length / exercisesForRule.length) * 100)
      : 0;
  };

  const filteredRules = getRulesByCategory(grammarRules, selectedCategory);

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Grammar Progress</h2>
            <p className="text-purple-100">
              Complete exercises to master English grammar
            </p>
          </div>
          <Trophy className="h-12 w-12 text-yellow-300" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-2xl font-bold">
              {userProgress.completedExercises.length}
            </p>
            <p className="text-sm text-purple-100">Exercises Done</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-2xl font-bold">
              {Object.values(userProgress.scores).length > 0
                ? Math.round(
                    Object.values(userProgress.scores).reduce(
                      (a, b) => a + b,
                      0,
                    ) / Object.values(userProgress.scores).length,
                  )
                : 0}
              %
            </p>
            <p className="text-sm text-purple-100">Average Score</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-2xl font-bold">
              {
                grammarExercises.filter((ex) =>
                  userProgress.completedExercises.includes(ex.id),
                ).length
              }
            </p>
            <p className="text-sm text-purple-100">
              /{grammarExercises.length} Total
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-2xl font-bold">
              {userProgress.masteredRules.length}
            </p>
            <p className="text-sm text-purple-100">Rules Mastered</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === cat.id
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Grammar Rules */}
      {filteredRules.map((rule) => {
        const score = getScoreForRule(rule.id);
        const exercisesForRule = grammarExercises.filter(
          (ex) => ex.ruleId === rule.id,
        );

        return (
          <div
            key={rule.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            {/* Rule Header */}
            <button
              onClick={() =>
                setExpandedRule(expandedRule === rule.id ? null : rule.id)
              }
              className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {rule.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rule.level === "beginner"
                          ? "bg-green-100 text-green-700"
                          : rule.level === "intermediate"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {rule.level}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {score}% mastered
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {rule.explanation}
                  </p>
                </div>
                {expandedRule === rule.id ? <ChevronUp /> : <ChevronDown />}
              </div>
            </button>

            {/* Rule Content */}
            {expandedRule === rule.id && (
              <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700 space-y-6">
                {/* Rules */}
                <div>
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Grammar Rules
                  </h4>
                  <div className="space-y-4">
                    {rule.rules.map((r, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                      >
                        <p className="font-mono text-sm text-purple-600 dark:text-purple-400 mb-2">
                          {r.pattern}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          📖 {r.usage}
                        </p>
                        <ul className="space-y-1">
                          {r.examples.map((ex, exIdx) => (
                            <li
                              key={exIdx}
                              className="text-sm text-gray-700 dark:text-gray-300"
                            >
                              • {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Expressions */}
                {rule.timeExpressions && (
                  <div>
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                      ⏰ Time Expressions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {rule.timeExpressions.map((expr) => (
                        <span
                          key={expr}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm"
                        >
                          {expr}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common Mistakes */}
                <div>
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Common Mistakes to Avoid
                  </h4>
                  <div className="space-y-3">
                    {rule.commonMistakes.map((mistake, idx) => (
                      <div
                        key={idx}
                        className="border-l-4 border-red-400 bg-red-50 dark:bg-red-900/10 p-3 rounded"
                      >
                        <p className="text-sm font-medium text-red-700 dark:text-red-300">
                          ❌ {mistake.mistake}
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                          ✅ {mistake.correction}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          💡 {mistake.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exercises */}
                <div>
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
                    <PenTool className="h-4 w-4" />
                    Practice Exercises ({exercisesForRule.length})
                  </h4>
                  <div className="space-y-4">
                    {exercisesForRule.map((exercise) => {
                      const status = getExerciseStatus(exercise.id);
                      return (
                        <div
                          key={exercise.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                exercise.difficulty === "easy"
                                  ? "bg-green-100 text-green-700"
                                  : exercise.difficulty === "medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {exercise.difficulty}
                            </span>
                            {status === "correct" && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            {status === "incorrect" && (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>

                          <p className="font-medium mb-3">
                            {exercise.question}
                          </p>

                          {exercise.type === "fill-blank" && (
                            <input
                              type="text"
                              value={userAnswers[exercise.id] || ""}
                              onChange={(e) =>
                                handleAnswer(exercise.id, e.target.value)
                              }
                              placeholder="Type your answer..."
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 mb-3"
                            />
                          )}

                          {exercise.type === "multiple-choice" &&
                            exercise.options && (
                              <div className="space-y-2 mb-3">
                                {exercise.options.map((opt) => (
                                  <label
                                    key={opt}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                                  >
                                    <input
                                      type="radio"
                                      name={exercise.id}
                                      value={opt}
                                      onChange={(e) =>
                                        handleAnswer(
                                          exercise.id,
                                          e.target.value,
                                        )
                                      }
                                      checked={userAnswers[exercise.id] === opt}
                                      className="text-purple-600"
                                    />
                                    <span>{opt}</span>
                                  </label>
                                ))}
                              </div>
                            )}

                          {exercise.type === "error-correction" && (
                            <textarea
                              value={userAnswers[exercise.id] || ""}
                              onChange={(e) =>
                                handleAnswer(exercise.id, e.target.value)
                              }
                              placeholder="Write the corrected sentence..."
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 mb-3"
                            />
                          )}

                          {exercise.type === "transformation" && (
                            <textarea
                              value={userAnswers[exercise.id] || ""}
                              onChange={(e) =>
                                handleAnswer(exercise.id, e.target.value)
                              }
                              placeholder="Rewrite the sentence..."
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 mb-3"
                            />
                          )}

                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => checkAnswer(exercise)}
                              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                              Check Answer
                            </button>

                            {showResults[exercise.id] !== undefined && (
                              <div className="text-sm">
                                {showResults[exercise.id] ? (
                                  <span className="text-green-600">
                                    ✓ Correct! {exercise.explanation}
                                  </span>
                                ) : (
                                  <span className="text-red-600">
                                    ✗ Incorrect. Correct answer:{" "}
                                    {exercise.correctAnswer}
                                    <br />
                                    <span className="text-xs text-gray-500">
                                      {exercise.explanation}
                                    </span>
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Quick Reference Card */}
      <div className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-6 w-6 text-purple-600" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Quick Study Tips
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
            <strong className="text-purple-600">🎯 15-min rule</strong>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Study grammar in short, focused sessions. Better than hours of
              cramming!
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
            <strong className="text-purple-600">📝 Write examples</strong>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create your own sentences for each rule. Personal examples stick
              better.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
            <strong className="text-purple-600">🔄 Review regularly</strong>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Come back to completed exercises. Spaced repetition builds
              mastery.
            </p>
          </div>
        </div>
      </div>

      {/* Reset Progress Button */}
      <div className="text-center">
        <button
          onClick={() => {
            if (confirm("Reset all grammar progress? This cannot be undone.")) {
              setUserAnswers({});
              setSubmittedExercises(new Set());
              setShowResults({});
              setUserProgress({
                completedExercises: [],
                scores: {},
                masteredRules: [],
                weakAreas: [],
              });
              localStorage.removeItem("grammar-progress");
            }
          }}
          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="h-4 w-4" />
          Reset Progress
        </button>
      </div>
    </div>
  );
}
