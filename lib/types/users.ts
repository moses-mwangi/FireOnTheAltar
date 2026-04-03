export type VerseReference = {
  book: string;
  chapter: number;
  verse: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
};

export type Note = {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  verseReferences: VerseReference[];
  // Add other note properties as needed
};

export type Topic = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  notes: Note[];
  // Add other topic properties as needed
};

export type Connection = {
  id: string;
  fromTopicId: string;
  toTopicId: string;
  type: "theological" | "historical" | "practical" | "other";
  // Add other connection properties as needed
};

export type AuthState = {
  isAuthenticated: boolean;
  user?: User;
};
