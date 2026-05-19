// Types
export type CategorySubEntry = {
  folders: Folder[];
  subCategories: SubCategory[] | null;
  entries: WritingEntry[];
};

export type SubCategory = {
  id: string;
  name: string;
  icon: any;
  parentFolderId: string;
  createdAt: string;
  isFolder?: boolean;
};

export type Folder = {
  id: string;
  name: string;
  icon?: any;
  parentId: string | null;
  category: MainCategory;
  createdAt: string;
  description?: string;
  hasSubCategories?: boolean;
};

export type WritingEntry = {
  id: string;
  title: string;
  content: string;
  folderId: string;
  subCategoryId?: string;
  category: MainCategory;
  date: string;
  wordCount: number;
  tags?: string[];
  isFavorite?: boolean;
  version?: number;
};

export type MainCategory =
  | "bible"
  | "philosophy"
  | "psychology"
  | "wisdom"
  | "science"
  | "spirituality"
  | "english";
