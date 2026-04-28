export interface WordFamilyMember {
  id: string;
  word: string;
  partOfSpeech: string; // noun, verb, adjective, adverb
  example: string;
}

export interface Word {
  id: string;
  root: string;
  word: string;
  description: string;
  example?: string;
  wordFamily: WordFamilyMember[]; // communicate, communication, communicator, communicative
  synonyms: string[]; // related words within the same group
  antonyms?: string[];
  createdAt: Date;
}

export interface SynonymFamily {
  id: string;
  name: string; // e.g., "Communication Verbs"
  theme: string; // e.g., "Ways to express yourself verbally"
  words: Partial<Word>[]; // talk, speak, say, communicate, chat, whisper
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface GrammarTopic {
  id: string;
  title: string;
  explanation: string;
  examples: string[];
  exercises?: string[];
}

export interface VocabularyGroup {
  id: string;
  name: string;
  description: string;
  words: Word[];
}
