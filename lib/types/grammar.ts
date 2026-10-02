// types/grammar.ts
export type PartOfSpeech = {
  id: string;
  category:
    | "Noun"
    | "Pronoun"
    | "Verb"
    | "Adjective"
    | "Adverb"
    | "Preposition"
    | "Conjunction"
    | "Interjection"
    | "Article"
    | "Determiner";
  name: string;
  definition: string;
  types?: string[];
  examples: {
    word: string;
    sentence: string;
    explanation: string;
  }[];
  rules?: {
    rule: string;
    example: string;
  }[];
};

export type GrammarTopic = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  content: string;
  examples: string[];
  exercises?: {
    question: string;
    answer: string;
  }[];
};
