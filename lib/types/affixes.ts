type Affix = {
  id: string;
  type: "Prefix" | "Suffix";
  affix: string;
  meaning: string;

  examples: {
    word: string;
    breakdown: string;
    meaning: string;
  }[];
};
