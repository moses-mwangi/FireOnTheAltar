export interface Word {
  id: string;
  word: string;
  description: string;
  example?: string;
  createdAt: Date;
}

export interface VocabularyGroup {
  id: string;
  name: string;
  description: string;
  words: Word[];
}

export interface GrammarTopic {
  id: string;
  title: string;
  explanation: string;
  examples: string[];
  exercises?: string[];
}

export interface GrammarRule {
  id: string;
  title: string;
  category:
    | "tenses"
    | "modal-verbs"
    | "prepositions"
    | "conditionals"
    | "reported-speech"
    | "passive-voice"
    | "articles"
    | "comparatives";
  level: "beginner" | "intermediate" | "advanced";
  explanation: string;
  rules: {
    pattern: string;
    usage: string;
    examples: string[];
  }[];
  commonMistakes: {
    mistake: string;
    correction: string;
    explanation: string;
  }[];
  timeExpressions?: string[];
}

export interface GrammarExercise {
  id: string;
  ruleId: string;
  type:
    | "fill-blank"
    | "multiple-choice"
    | "rewrite"
    | "error-correction"
    | "transformation";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface UserProgress {
  completedExercises: string[];
  scores: Record<string, number>;
  masteredRules: string[];
  weakAreas: string[];
}
