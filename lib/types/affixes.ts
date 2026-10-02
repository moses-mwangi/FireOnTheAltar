export type Affix = {
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

// export const affixesData: Affix[] = [
//   // ========== PREFIXES ==========
//   {
//     id: "pref-001",
//     type: "Prefix",
//     affix: "un-",
//     meaning: "not, opposite of",
//     examples: [
//       { word: "unhappy", breakdown: "un + happy", meaning: "not happy" },
//       { word: "unfair", breakdown: "un + fair", meaning: "not fair" },
//       { word: "unknown", breakdown: "un + known", meaning: "not known" },
//       { word: "unlikely", breakdown: "un + likely", meaning: "not likely" },
//     ],
//   },
//   {
//     id: "pref-002",
//     type: "Prefix",
//     affix: "re-",
//     meaning: "again, back",
//     examples: [
//       { word: "rewrite", breakdown: "re + write", meaning: "write again" },
//       { word: "rebuild", breakdown: "re + build", meaning: "build again" },
//       { word: "replay", breakdown: "re + play", meaning: "play again" },
//       { word: "return", breakdown: "re + turn", meaning: "turn back" },
//     ],
//   },
//   {
//     id: "pref-003",
//     type: "Prefix",
//     affix: "pre-",
//     meaning: "before",
//     examples: [
//       { word: "preview", breakdown: "pre + view", meaning: "view before" },
//       { word: "predict", breakdown: "pre + dict", meaning: "say before" },
//       {
//         word: "prepare",
//         breakdown: "pre + pare",
//         meaning: "make ready before",
//       },
//       { word: "preheat", breakdown: "pre + heat", meaning: "heat before" },
//     ],
//   },
//   {
//     id: "pref-004",
//     type: "Prefix",
//     affix: "mis-",
//     meaning: "wrongly, badly",
//     examples: [
//       { word: "mistake", breakdown: "mis + take", meaning: "take wrongly" },
//       {
//         word: "misunderstand",
//         breakdown: "mis + understand",
//         meaning: "understand wrongly",
//       },
//       { word: "misplace", breakdown: "mis + place", meaning: "place wrongly" },
//       { word: "mislead", breakdown: "mis + lead", meaning: "lead wrongly" },
//     ],
//   },
//   {
//     id: "pref-005",
//     type: "Prefix",
//     affix: "dis-",
//     meaning: "not, opposite of, away",
//     examples: [
//       { word: "dislike", breakdown: "dis + like", meaning: "not like" },
//       { word: "disagree", breakdown: "dis + agree", meaning: "not agree" },
//       {
//         word: "disappear",
//         breakdown: "dis + appear",
//         meaning: "opposite of appear",
//       },
//       {
//         word: "disconnect",
//         breakdown: "dis + connect",
//         meaning: "opposite of connect",
//       },
//     ],
//   },
//   {
//     id: "pref-006",
//     type: "Prefix",
//     affix: "inter-",
//     meaning: "between, among",
//     examples: [
//       {
//         word: "international",
//         breakdown: "inter + national",
//         meaning: "between nations",
//       },
//       { word: "interact", breakdown: "inter + act", meaning: "act between" },
//       {
//         word: "internet",
//         breakdown: "inter + net",
//         meaning: "between networks",
//       },
//       {
//         word: "interrupt",
//         breakdown: "inter + rupt",
//         meaning: "break between",
//       },
//     ],
//   },
//   {
//     id: "pref-007",
//     type: "Prefix",
//     affix: "sub-",
//     meaning: "under, below",
//     examples: [
//       {
//         word: "submarine",
//         breakdown: "sub + marine",
//         meaning: "under the sea",
//       },
//       { word: "subway", breakdown: "sub + way", meaning: "under the road" },
//       {
//         word: "subtitle",
//         breakdown: "sub + title",
//         meaning: "under the title",
//       },
//       { word: "subzero", breakdown: "sub + zero", meaning: "below zero" },
//     ],
//   },
//   {
//     id: "pref-008",
//     type: "Prefix",
//     affix: "super-",
//     meaning: "above, beyond",
//     examples: [
//       {
//         word: "supermarket",
//         breakdown: "super + market",
//         meaning: "large market",
//       },
//       {
//         word: "superhero",
//         breakdown: "super + hero",
//         meaning: "exceptional hero",
//       },
//       {
//         word: "supernatural",
//         breakdown: "super + natural",
//         meaning: "beyond natural",
//       },
//       {
//         word: "supersonic",
//         breakdown: "super + sonic",
//         meaning: "above sound",
//       },
//     ],
//   },
//   {
//     id: "pref-009",
//     type: "Prefix",
//     affix: "anti-",
//     meaning: "against, opposite",
//     examples: [
//       {
//         word: "antibiotic",
//         breakdown: "anti + biotic",
//         meaning: "against life (bacteria)",
//       },
//       {
//         word: "antifreeze",
//         breakdown: "anti + freeze",
//         meaning: "against freezing",
//       },
//       {
//         word: "antisocial",
//         breakdown: "anti + social",
//         meaning: "against society",
//       },
//       {
//         word: "antivirus",
//         breakdown: "anti + virus",
//         meaning: "against viruses",
//       },
//     ],
//   },
//   {
//     id: "pref-010",
//     type: "Prefix",
//     affix: "over-",
//     meaning: "too much, above",
//     examples: [
//       { word: "overcook", breakdown: "over + cook", meaning: "cook too much" },
//       { word: "overload", breakdown: "over + load", meaning: "load too much" },
//       {
//         word: "overthink",
//         breakdown: "over + think",
//         meaning: "think too much",
//       },
//       {
//         word: "overweight",
//         breakdown: "over + weight",
//         meaning: "above normal weight",
//       },
//     ],
//   },
//   {
//     id: "pref-011",
//     type: "Prefix",
//     affix: "under-",
//     meaning: "too little, below",
//     examples: [
//       {
//         word: "undercook",
//         breakdown: "under + cook",
//         meaning: "cook too little",
//       },
//       {
//         word: "underpaid",
//         breakdown: "under + paid",
//         meaning: "paid too little",
//       },
//       {
//         word: "underestimate",
//         breakdown: "under + estimate",
//         meaning: "estimate too low",
//       },
//       {
//         word: "underwater",
//         breakdown: "under + water",
//         meaning: "below water",
//       },
//     ],
//   },
//   {
//     id: "pref-012",
//     type: "Prefix",
//     affix: "bi-",
//     meaning: "two, twice",
//     examples: [
//       { word: "bicycle", breakdown: "bi + cycle", meaning: "two wheels" },
//       {
//         word: "bilingual",
//         breakdown: "bi + lingual",
//         meaning: "two languages",
//       },
//       { word: "biannual", breakdown: "bi + annual", meaning: "twice a year" },
//       { word: "bilateral", breakdown: "bi + lateral", meaning: "two sides" },
//     ],
//   },
//   {
//     id: "pref-013",
//     type: "Prefix",
//     affix: "tri-",
//     meaning: "three",
//     examples: [
//       { word: "tricycle", breakdown: "tri + cycle", meaning: "three wheels" },
//       { word: "triangle", breakdown: "tri + angle", meaning: "three angles" },
//       { word: "triple", breakdown: "tri + ple", meaning: "three times" },
//       { word: "tripod", breakdown: "tri + pod", meaning: "three feet" },
//     ],
//   },
//   {
//     id: "pref-014",
//     type: "Prefix",
//     affix: "multi-",
//     meaning: "many",
//     examples: [
//       {
//         word: "multitask",
//         breakdown: "multi + task",
//         meaning: "do many tasks",
//       },
//       {
//         word: "multicolor",
//         breakdown: "multi + color",
//         meaning: "many colors",
//       },
//       {
//         word: "multimedia",
//         breakdown: "multi + media",
//         meaning: "many media types",
//       },
//       { word: "multiply", breakdown: "multi + ply", meaning: "many folds" },
//     ],
//   },
//   {
//     id: "pref-015",
//     type: "Prefix",
//     affix: "post-",
//     meaning: "after",
//     examples: [
//       { word: "postpone", breakdown: "post + pone", meaning: "put after" },
//       {
//         word: "postgraduate",
//         breakdown: "post + graduate",
//         meaning: "after graduation",
//       },
//       { word: "postwar", breakdown: "post + war", meaning: "after war" },
//       {
//         word: "postmodern",
//         breakdown: "post + modern",
//         meaning: "after modern",
//       },
//     ],
//   },

//   // ========== SUFFIXES ==========
//   {
//     id: "suf-001",
//     type: "Suffix",
//     affix: "-ing",
//     meaning: "present participle / action happening now",
//     examples: [
//       { word: "running", breakdown: "run + ing", meaning: "running right now" },
//       { word: "eating", breakdown: "eat + ing", meaning: "eating right now" },
//       {
//         word: "sleeping",
//         breakdown: "sleep + ing",
//         meaning: "sleeping right now",
//       },
//       {
//         word: "thinking",
//         breakdown: "think + ing",
//         meaning: "thinking right now",
//       },
//     ],
//   },
//   {
//     id: "suf-002",
//     type: "Suffix",
//     affix: "-ed",
//     meaning: "past tense",
//     examples: [
//       { word: "walked", breakdown: "walk + ed", meaning: "walked in the past" },
//       { word: "jumped", breakdown: "jump + ed", meaning: "jumped in the past" },
//       { word: "played", breakdown: "play + ed", meaning: "played in the past" },
//       { word: "cooked", breakdown: "cook + ed", meaning: "cooked in the past" },
//     ],
//   },
//   {
//     id: "suf-003",
//     type: "Suffix",
//     affix: "-er",
//     meaning: "person who does something / comparative",
//     examples: [
//       {
//         word: "teacher",
//         breakdown: "teach + er",
//         meaning: "person who teaches",
//       },
//       { word: "driver", breakdown: "drive + er", meaning: "person who drives" },
//       { word: "writer", breakdown: "write + er", meaning: "person who writes" },
//       { word: "bigger", breakdown: "big + er", meaning: "more big" },
//     ],
//   },
//   {
//     id: "suf-004",
//     type: "Suffix",
//     affix: "-est",
//     meaning: "superlative (the most)",
//     examples: [
//       { word: "biggest", breakdown: "big + est", meaning: "the most big" },
//       { word: "fastest", breakdown: "fast + est", meaning: "the most fast" },
//       { word: "happiest", breakdown: "happy + est", meaning: "the most happy" },
//       {
//         word: "strongest",
//         breakdown: "strong + est",
//         meaning: "the most strong",
//       },
//     ],
//   },
//   {
//     id: "suf-005",
//     type: "Suffix",
//     affix: "-less",
//     meaning: "without",
//     examples: [
//       { word: "hopeless", breakdown: "hope + less", meaning: "without hope" },
//       { word: "fearless", breakdown: "fear + less", meaning: "without fear" },
//       { word: "endless", breakdown: "end + less", meaning: "without end" },
//       { word: "homeless", breakdown: "home + less", meaning: "without a home" },
//     ],
//   },
//   {
//     id: "suf-006",
//     type: "Suffix",
//     affix: "-ful",
//     meaning: "full of",
//     examples: [
//       { word: "hopeful", breakdown: "hope + ful", meaning: "full of hope" },
//       { word: "careful", breakdown: "care + ful", meaning: "full of care" },
//       {
//         word: "beautiful",
//         breakdown: "beauty + ful",
//         meaning: "full of beauty",
//       },
//       {
//         word: "grateful",
//         breakdown: "grate + ful",
//         meaning: "full of gratitude",
//       },
//     ],
//   },
//   {
//     id: "suf-007",
//     type: "Suffix",
//     affix: "-able",
//     meaning: "capable of, worthy of",
//     examples: [
//       {
//         word: "breakable",
//         breakdown: "break + able",
//         meaning: "capable of being broken",
//       },
//       {
//         word: "washable",
//         breakdown: "wash + able",
//         meaning: "capable of being washed",
//       },
//       {
//         word: "enjoyable",
//         breakdown: "enjoy + able",
//         meaning: "capable of being enjoyed",
//       },
//       {
//         word: "readable",
//         breakdown: "read + able",
//         meaning: "capable of being read",
//       },
//     ],
//   },
//   {
//     id: "suf-008",
//     type: "Suffix",
//     affix: "-tion",
//     meaning: "act or state of",
//     examples: [
//       { word: "action", breakdown: "act + tion", meaning: "state of acting" },
//       {
//         word: "celebration",
//         breakdown: "celebrate + tion",
//         meaning: "act of celebrating",
//       },
//       {
//         word: "education",
//         breakdown: "educate + tion",
//         meaning: "act of educating",
//       },
//       {
//         word: "information",
//         breakdown: "inform + tion",
//         meaning: "act of informing",
//       },
//     ],
//   },
//   {
//     id: "suf-009",
//     type: "Suffix",
//     affix: "-ment",
//     meaning: "result of action",
//     examples: [
//       {
//         word: "enjoyment",
//         breakdown: "enjoy + ment",
//         meaning: "result of enjoying",
//       },
//       {
//         word: "government",
//         breakdown: "govern + ment",
//         meaning: "result of governing",
//       },
//       {
//         word: "agreement",
//         breakdown: "agree + ment",
//         meaning: "result of agreeing",
//       },
//       {
//         word: "improvement",
//         breakdown: "improve + ment",
//         meaning: "result of improving",
//       },
//     ],
//   },
//   {
//     id: "suf-010",
//     type: "Suffix",
//     affix: "-ness",
//     meaning: "state or quality of being",
//     examples: [
//       {
//         word: "happiness",
//         breakdown: "happy + ness",
//         meaning: "state of being happy",
//       },
//       {
//         word: "sadness",
//         breakdown: "sad + ness",
//         meaning: "state of being sad",
//       },
//       {
//         word: "kindness",
//         breakdown: "kind + ness",
//         meaning: "quality of being kind",
//       },
//       {
//         word: "darkness",
//         breakdown: "dark + ness",
//         meaning: "state of being dark",
//       },
//     ],
//   },
//   {
//     id: "suf-011",
//     type: "Suffix",
//     affix: "-ly",
//     meaning: "in a certain way (adverb)",
//     examples: [
//       { word: "quickly", breakdown: "quick + ly", meaning: "in a quick way" },
//       { word: "happily", breakdown: "happy + ly", meaning: "in a happy way" },
//       {
//         word: "carefully",
//         breakdown: "careful + ly",
//         meaning: "in a careful way",
//       },
//       { word: "easily", breakdown: "easy + ly", meaning: "in an easy way" },
//     ],
//   },
//   {
//     id: "suf-012",
//     type: "Suffix",
//     affix: "-y",
//     meaning: "characterized by, full of",
//     examples: [
//       { word: "sunny", breakdown: "sun + y", meaning: "full of sun" },
//       { word: "rainy", breakdown: "rain + y", meaning: "full of rain" },
//       { word: "windy", breakdown: "wind + y", meaning: "full of wind" },
//       { word: "cloudy", breakdown: "cloud + y", meaning: "full of clouds" },
//     ],
//   },
//   {
//     id: "suf-013",
//     type: "Suffix",
//     affix: "-ous",
//     meaning: "full of, having quality of",
//     examples: [
//       {
//         word: "dangerous",
//         breakdown: "danger + ous",
//         meaning: "full of danger",
//       },
//       { word: "famous", breakdown: "fame + ous", meaning: "full of fame" },
//       {
//         word: "serious",
//         breakdown: "series + ous",
//         meaning: "having seriousness",
//       },
//       { word: "curious", breakdown: "cure + ous", meaning: "having curiosity" },
//     ],
//   },
//   {
//     id: "suf-014",
//     type: "Suffix",
//     affix: "-ive",
//     meaning: "tending to, having nature of",
//     examples: [
//       { word: "active", breakdown: "act + ive", meaning: "tending to act" },
//       {
//         word: "creative",
//         breakdown: "create + ive",
//         meaning: "tending to create",
//       },
//       {
//         word: "attractive",
//         breakdown: "attract + ive",
//         meaning: "tending to attract",
//       },
//       {
//         word: "impressive",
//         breakdown: "impress + ive",
//         meaning: "tending to impress",
//       },
//     ],
//   },
//   {
//     id: "suf-015",
//     type: "Suffix",
//     affix: "-al",
//     meaning: "relating to",
//     examples: [
//       {
//         word: "magical",
//         breakdown: "magic + al",
//         meaning: "relating to magic",
//       },
//       {
//         word: "musical",
//         breakdown: "music + al",
//         meaning: "relating to music",
//       },
//       {
//         word: "practical",
//         breakdown: "practice + al",
//         meaning: "relating to practice",
//       },
//       {
//         word: "emotional",
//         breakdown: "emotion + al",
//         meaning: "relating to emotion",
//       },
//     ],
//   },
// ];

export const affixesData: Affix[] = [
  // ========== PREFIXES ==========
  // Negative/opposite prefixes
  {
    id: "pref-001",
    type: "Prefix",
    affix: "un-",
    meaning: "not, opposite of",
    examples: [
      { word: "unhappy", breakdown: "un + happy", meaning: "not happy" },
      { word: "unfair", breakdown: "un + fair", meaning: "not fair" },
      { word: "unknown", breakdown: "un + known", meaning: "not known" },
      { word: "unlikely", breakdown: "un + likely", meaning: "not likely" },
    ],
  },
  {
    id: "pref-002",
    type: "Prefix",
    affix: "in-",
    meaning: "not, without (il-, im-, ir- variants)",
    examples: [
      { word: "invisible", breakdown: "in + visible", meaning: "not visible" },
      { word: "incorrect", breakdown: "in + correct", meaning: "not correct" },
      {
        word: "incomplete",
        breakdown: "in + complete",
        meaning: "not complete",
      },
      { word: "inactive", breakdown: "in + active", meaning: "not active" },
    ],
  },
  {
    id: "pref-003",
    type: "Prefix",
    affix: "im-",
    meaning: "not (variant of in-)",
    examples: [
      {
        word: "impossible",
        breakdown: "im + possible",
        meaning: "not possible",
      },
      { word: "immature", breakdown: "im + mature", meaning: "not mature" },
      { word: "impatient", breakdown: "im + patient", meaning: "not patient" },
      { word: "imperfect", breakdown: "im + perfect", meaning: "not perfect" },
    ],
  },
  {
    id: "pref-004",
    type: "Prefix",
    affix: "il-",
    meaning: "not (variant of in-)",
    examples: [
      { word: "illegal", breakdown: "il + legal", meaning: "not legal" },
      { word: "illogical", breakdown: "il + logical", meaning: "not logical" },
      { word: "illegible", breakdown: "il + legible", meaning: "not readable" },
      {
        word: "illiterate",
        breakdown: "il + literate",
        meaning: "not able to read",
      },
    ],
  },
  {
    id: "pref-005",
    type: "Prefix",
    affix: "ir-",
    meaning: "not (variant of in-)",
    examples: [
      { word: "irregular", breakdown: "ir + regular", meaning: "not regular" },
      {
        word: "irresponsible",
        breakdown: "ir + responsible",
        meaning: "not responsible",
      },
      {
        word: "irreversible",
        breakdown: "ir + reversible",
        meaning: "not reversible",
      },
      {
        word: "irrelevant",
        breakdown: "ir + relevant",
        meaning: "not relevant",
      },
    ],
  },
  {
    id: "pref-006",
    type: "Prefix",
    affix: "non-",
    meaning: "not, without",
    examples: [
      {
        word: "nonfiction",
        breakdown: "non + fiction",
        meaning: "not fiction",
      },
      { word: "nonstop", breakdown: "non + stop", meaning: "without stopping" },
      {
        word: "nonviolent",
        breakdown: "non + violent",
        meaning: "not violent",
      },
      {
        word: "nonprofit",
        breakdown: "non + profit",
        meaning: "not for profit",
      },
    ],
  },
  {
    id: "pref-007",
    type: "Prefix",
    affix: "dis-",
    meaning: "not, opposite of, away",
    examples: [
      { word: "dislike", breakdown: "dis + like", meaning: "not like" },
      { word: "disagree", breakdown: "dis + agree", meaning: "not agree" },
      {
        word: "disappear",
        breakdown: "dis + appear",
        meaning: "opposite of appear",
      },
      {
        word: "disconnect",
        breakdown: "dis + connect",
        meaning: "opposite of connect",
      },
    ],
  },
  {
    id: "pref-008",
    type: "Prefix",
    affix: "a-",
    meaning: "without, not",
    examples: [
      { word: "atypical", breakdown: "a + typical", meaning: "not typical" },
      {
        word: "asymmetrical",
        breakdown: "a + symmetrical",
        meaning: "not symmetrical",
      },
      { word: "amoral", breakdown: "a + moral", meaning: "without morals" },
      { word: "asexual", breakdown: "a + sexual", meaning: "without sex" },
    ],
  },
  {
    id: "pref-009",
    type: "Prefix",
    affix: "anti-",
    meaning: "against, opposite",
    examples: [
      {
        word: "antibiotic",
        breakdown: "anti + biotic",
        meaning: "against life (bacteria)",
      },
      {
        word: "antifreeze",
        breakdown: "anti + freeze",
        meaning: "against freezing",
      },
      {
        word: "antisocial",
        breakdown: "anti + social",
        meaning: "against society",
      },
      {
        word: "antivirus",
        breakdown: "anti + virus",
        meaning: "against viruses",
      },
    ],
  },
  {
    id: "pref-010",
    type: "Prefix",
    affix: "contra-",
    meaning: "against, opposite",
    examples: [
      {
        word: "contradict",
        breakdown: "contra + dict",
        meaning: "speak against",
      },
      { word: "contrary", breakdown: "contra + ry", meaning: "opposite" },
      {
        word: "contraband",
        breakdown: "contra + band",
        meaning: "against the law",
      },
      {
        word: "contravene",
        breakdown: "contra + vene",
        meaning: "come against",
      },
    ],
  },
  {
    id: "pref-011",
    type: "Prefix",
    affix: "counter-",
    meaning: "against, opposite",
    examples: [
      {
        word: "counteract",
        breakdown: "counter + act",
        meaning: "act against",
      },
      {
        word: "counterattack",
        breakdown: "counter + attack",
        meaning: "attack in return",
      },
      {
        word: "counterfeit",
        breakdown: "counter + feit",
        meaning: "made against",
      },
      {
        word: "counterpart",
        breakdown: "counter + part",
        meaning: "opposite part",
      },
    ],
  },

  // Time/order prefixes
  {
    id: "pref-012",
    type: "Prefix",
    affix: "pre-",
    meaning: "before",
    examples: [
      { word: "preview", breakdown: "pre + view", meaning: "view before" },
      { word: "predict", breakdown: "pre + dict", meaning: "say before" },
      {
        word: "prepare",
        breakdown: "pre + pare",
        meaning: "make ready before",
      },
      { word: "preheat", breakdown: "pre + heat", meaning: "heat before" },
    ],
  },
  {
    id: "pref-013",
    type: "Prefix",
    affix: "post-",
    meaning: "after",
    examples: [
      { word: "postpone", breakdown: "post + pone", meaning: "put after" },
      {
        word: "postgraduate",
        breakdown: "post + graduate",
        meaning: "after graduation",
      },
      { word: "postwar", breakdown: "post + war", meaning: "after war" },
      {
        word: "postmodern",
        breakdown: "post + modern",
        meaning: "after modern",
      },
    ],
  },
  {
    id: "pref-014",
    type: "Prefix",
    affix: "ante-",
    meaning: "before, in front of",
    examples: [
      { word: "antebellum", breakdown: "ante + bellum", meaning: "before war" },
      {
        word: "antecedent",
        breakdown: "ante + cedent",
        meaning: "going before",
      },
      { word: "anteroom", breakdown: "ante + room", meaning: "room before" },
      { word: "antedate", breakdown: "ante + date", meaning: "before date" },
    ],
  },
  {
    id: "pref-015",
    type: "Prefix",
    affix: "fore-",
    meaning: "before, front",
    examples: [
      { word: "forecast", breakdown: "fore + cast", meaning: "predict before" },
      { word: "foresee", breakdown: "fore + see", meaning: "see before" },
      { word: "foreword", breakdown: "fore + word", meaning: "words before" },
      {
        word: "foreground",
        breakdown: "fore + ground",
        meaning: "front ground",
      },
    ],
  },
  {
    id: "pref-016",
    type: "Prefix",
    affix: "pro-",
    meaning: "forward, before, for",
    examples: [
      { word: "progress", breakdown: "pro + gress", meaning: "step forward" },
      { word: "proceed", breakdown: "pro + ceed", meaning: "go forward" },
      { word: "promote", breakdown: "pro + mote", meaning: "move forward" },
      {
        word: "proactive",
        breakdown: "pro + active",
        meaning: "acting before",
      },
    ],
  },
  {
    id: "pref-017",
    type: "Prefix",
    affix: "re-",
    meaning: "again, back",
    examples: [
      { word: "rewrite", breakdown: "re + write", meaning: "write again" },
      { word: "rebuild", breakdown: "re + build", meaning: "build again" },
      { word: "replay", breakdown: "re + play", meaning: "play again" },
      { word: "return", breakdown: "re + turn", meaning: "turn back" },
    ],
  },
  {
    id: "pref-018",
    type: "Prefix",
    affix: "retro-",
    meaning: "backward, behind",
    examples: [
      {
        word: "retrograde",
        breakdown: "retro + grade",
        meaning: "go backward",
      },
      { word: "retrospect", breakdown: "retro + spect", meaning: "look back" },
      {
        word: "retroactive",
        breakdown: "retro + active",
        meaning: "acting backward",
      },
      {
        word: "retrofuture",
        breakdown: "retro + future",
        meaning: "past vision of future",
      },
    ],
  },

  // Number prefixes
  {
    id: "pref-019",
    type: "Prefix",
    affix: "uni-",
    meaning: "one",
    examples: [
      { word: "unicycle", breakdown: "uni + cycle", meaning: "one wheel" },
      { word: "unicorn", breakdown: "uni + corn", meaning: "one horn" },
      { word: "uniform", breakdown: "uni + form", meaning: "one form" },
      {
        word: "universe",
        breakdown: "uni + verse",
        meaning: "turned into one",
      },
    ],
  },
  {
    id: "pref-020",
    type: "Prefix",
    affix: "mono-",
    meaning: "one, single",
    examples: [
      { word: "monopoly", breakdown: "mono + poly", meaning: "one seller" },
      { word: "monochrome", breakdown: "mono + chrome", meaning: "one color" },
      { word: "monologue", breakdown: "mono + logue", meaning: "one speaker" },
      { word: "monotone", breakdown: "mono + tone", meaning: "one tone" },
    ],
  },
  {
    id: "pref-021",
    type: "Prefix",
    affix: "bi-",
    meaning: "two, twice",
    examples: [
      { word: "bicycle", breakdown: "bi + cycle", meaning: "two wheels" },
      {
        word: "bilingual",
        breakdown: "bi + lingual",
        meaning: "two languages",
      },
      { word: "biannual", breakdown: "bi + annual", meaning: "twice a year" },
      { word: "bilateral", breakdown: "bi + lateral", meaning: "two sides" },
    ],
  },
  {
    id: "pref-022",
    type: "Prefix",
    affix: "di-",
    meaning: "two, double",
    examples: [
      { word: "dilemma", breakdown: "di + lemma", meaning: "two choices" },
      { word: "dioxide", breakdown: "di + oxide", meaning: "two oxygen atoms" },
      { word: "diphthong", breakdown: "di + phthong", meaning: "two sounds" },
      { word: "digraph", breakdown: "di + graph", meaning: "two letters" },
    ],
  },
  {
    id: "pref-023",
    type: "Prefix",
    affix: "tri-",
    meaning: "three",
    examples: [
      { word: "tricycle", breakdown: "tri + cycle", meaning: "three wheels" },
      { word: "triangle", breakdown: "tri + angle", meaning: "three angles" },
      { word: "triple", breakdown: "tri + ple", meaning: "three times" },
      { word: "tripod", breakdown: "tri + pod", meaning: "three feet" },
    ],
  },
  {
    id: "pref-024",
    type: "Prefix",
    affix: "quad-",
    meaning: "four",
    examples: [
      {
        word: "quadrilateral",
        breakdown: "quad + lateral",
        meaning: "four sides",
      },
      { word: "quadruple", breakdown: "quad + ruple", meaning: "four times" },
      { word: "quadrant", breakdown: "quad + rant", meaning: "fourth part" },
      {
        word: "quadriceps",
        breakdown: "quad + ceps",
        meaning: "four heads (muscle)",
      },
    ],
  },
  {
    id: "pref-025",
    type: "Prefix",
    affix: "penta-",
    meaning: "five",
    examples: [
      { word: "pentagon", breakdown: "penta + gon", meaning: "five angles" },
      {
        word: "pentathlon",
        breakdown: "penta + athlon",
        meaning: "five sports",
      },
      {
        word: "pentameter",
        breakdown: "penta + meter",
        meaning: "five meters",
      },
      { word: "pentagram", breakdown: "penta + gram", meaning: "five lines" },
    ],
  },
  {
    id: "pref-026",
    type: "Prefix",
    affix: "hex-",
    meaning: "six",
    examples: [
      { word: "hexagon", breakdown: "hexa + gon", meaning: "six angles" },
      { word: "hexameter", breakdown: "hexa + meter", meaning: "six meters" },
      { word: "hexapod", breakdown: "hexa + pod", meaning: "six feet" },
      {
        word: "hexagram",
        breakdown: "hexa + gram",
        meaning: "six-pointed star",
      },
    ],
  },
  {
    id: "pref-027",
    type: "Prefix",
    affix: "sept-",
    meaning: "seven",
    examples: [
      { word: "septagon", breakdown: "sept + agon", meaning: "seven angles" },
      { word: "septet", breakdown: "sept + et", meaning: "group of seven" },
      {
        word: "septennial",
        breakdown: "sept + ennial",
        meaning: "seven years",
      },
      {
        word: "September",
        breakdown: "sept + ember",
        meaning: "seventh month (old calendar)",
      },
    ],
  },
  {
    id: "pref-028",
    type: "Prefix",
    affix: "oct-",
    meaning: "eight",
    examples: [
      { word: "octagon", breakdown: "octa + gon", meaning: "eight angles" },
      { word: "octopus", breakdown: "octo + pus", meaning: "eight feet" },
      { word: "octave", breakdown: "oct + ave", meaning: "eight notes" },
      {
        word: "October",
        breakdown: "oct + ober",
        meaning: "eighth month (old calendar)",
      },
    ],
  },
  {
    id: "pref-029",
    type: "Prefix",
    affix: "dec-",
    meaning: "ten",
    examples: [
      { word: "decade", breakdown: "dec + ade", meaning: "ten years" },
      { word: "decimal", breakdown: "dec + imal", meaning: "tenth part" },
      { word: "decathlon", breakdown: "dec + athlon", meaning: "ten sports" },
      { word: "decagon", breakdown: "dec + agon", meaning: "ten angles" },
    ],
  },
  {
    id: "pref-030",
    type: "Prefix",
    affix: "cent-",
    meaning: "hundred",
    examples: [
      { word: "century", breakdown: "cent + ury", meaning: "hundred years" },
      { word: "percent", breakdown: "per + cent", meaning: "per hundred" },
      { word: "centipede", breakdown: "centi + pede", meaning: "hundred feet" },
      {
        word: "centimeter",
        breakdown: "centi + meter",
        meaning: "hundredth of a meter",
      },
    ],
  },
  {
    id: "pref-031",
    type: "Prefix",
    affix: "milli-",
    meaning: "thousand",
    examples: [
      {
        word: "millennium",
        breakdown: "mill + ennium",
        meaning: "thousand years",
      },
      {
        word: "millipede",
        breakdown: "milli + pede",
        meaning: "thousand feet",
      },
      {
        word: "millimeter",
        breakdown: "milli + meter",
        meaning: "thousandth of a meter",
      },
      {
        word: "milligram",
        breakdown: "milli + gram",
        meaning: "thousandth of a gram",
      },
    ],
  },
  {
    id: "pref-032",
    type: "Prefix",
    affix: "multi-",
    meaning: "many",
    examples: [
      {
        word: "multitask",
        breakdown: "multi + task",
        meaning: "do many tasks",
      },
      {
        word: "multicolor",
        breakdown: "multi + color",
        meaning: "many colors",
      },
      {
        word: "multimedia",
        breakdown: "multi + media",
        meaning: "many media types",
      },
      { word: "multiply", breakdown: "multi + ply", meaning: "many folds" },
    ],
  },
  {
    id: "pref-033",
    type: "Prefix",
    affix: "poly-",
    meaning: "many",
    examples: [
      { word: "polygon", breakdown: "poly + gon", meaning: "many angles" },
      { word: "polyglot", breakdown: "poly + glot", meaning: "many languages" },
      { word: "polygamy", breakdown: "poly + gamy", meaning: "many marriages" },
      {
        word: "polytechnic",
        breakdown: "poly + technic",
        meaning: "many arts",
      },
    ],
  },
  {
    id: "pref-034",
    type: "Prefix",
    affix: "omni-",
    meaning: "all",
    examples: [
      {
        word: "omnipotent",
        breakdown: "omni + potent",
        meaning: "all powerful",
      },
      {
        word: "omniscient",
        breakdown: "omni + scient",
        meaning: "all knowing",
      },
      {
        word: "omnivore",
        breakdown: "omni + vore",
        meaning: "eats everything",
      },
      {
        word: "omnipresent",
        breakdown: "omni + present",
        meaning: "present everywhere",
      },
    ],
  },

  // Position/direction prefixes
  {
    id: "pref-035",
    type: "Prefix",
    affix: "sub-",
    meaning: "under, below",
    examples: [
      {
        word: "submarine",
        breakdown: "sub + marine",
        meaning: "under the sea",
      },
      { word: "subway", breakdown: "sub + way", meaning: "under the road" },
      {
        word: "subtitle",
        breakdown: "sub + title",
        meaning: "under the title",
      },
      { word: "subzero", breakdown: "sub + zero", meaning: "below zero" },
    ],
  },
  {
    id: "pref-036",
    type: "Prefix",
    affix: "super-",
    meaning: "above, beyond",
    examples: [
      {
        word: "supermarket",
        breakdown: "super + market",
        meaning: "large market",
      },
      {
        word: "superhero",
        breakdown: "super + hero",
        meaning: "exceptional hero",
      },
      {
        word: "supernatural",
        breakdown: "super + natural",
        meaning: "beyond natural",
      },
      {
        word: "supersonic",
        breakdown: "super + sonic",
        meaning: "above sound",
      },
    ],
  },
  {
    id: "pref-037",
    type: "Prefix",
    affix: "supra-",
    meaning: "above, over",
    examples: [
      {
        word: "suprarenal",
        breakdown: "supra + renal",
        meaning: "above the kidney",
      },
      {
        word: "supranational",
        breakdown: "supra + national",
        meaning: "above nations",
      },
      {
        word: "supraorbital",
        breakdown: "supra + orbital",
        meaning: "above the eye socket",
      },
      {
        word: "supraspinatus",
        breakdown: "supra + spinatus",
        meaning: "above the spine",
      },
    ],
  },
  {
    id: "pref-038",
    type: "Prefix",
    affix: "hyper-",
    meaning: "over, above, excessive",
    examples: [
      {
        word: "hyperactive",
        breakdown: "hyper + active",
        meaning: "overly active",
      },
      { word: "hypertext", breakdown: "hyper + text", meaning: "above text" },
      {
        word: "hyperthermia",
        breakdown: "hyper + thermia",
        meaning: "overheating",
      },
      {
        word: "hyperspace",
        breakdown: "hyper + space",
        meaning: "above space",
      },
    ],
  },
  {
    id: "pref-039",
    type: "Prefix",
    affix: "hypo-",
    meaning: "under, below",
    examples: [
      {
        word: "hypodermic",
        breakdown: "hypo + dermic",
        meaning: "under the skin",
      },
      {
        word: "hypothermia",
        breakdown: "hypo + thermia",
        meaning: "below normal temperature",
      },
      {
        word: "hypothesis",
        breakdown: "hypo + thesis",
        meaning: "underlying idea",
      },
      {
        word: "hypoglycemia",
        breakdown: "hypo + glycemia",
        meaning: "low blood sugar",
      },
    ],
  },
  {
    id: "pref-040",
    type: "Prefix",
    affix: "inter-",
    meaning: "between, among",
    examples: [
      {
        word: "international",
        breakdown: "inter + national",
        meaning: "between nations",
      },
      { word: "interact", breakdown: "inter + act", meaning: "act between" },
      {
        word: "internet",
        breakdown: "inter + net",
        meaning: "between networks",
      },
      {
        word: "interrupt",
        breakdown: "inter + rupt",
        meaning: "break between",
      },
    ],
  },
  {
    id: "pref-041",
    type: "Prefix",
    affix: "intra-",
    meaning: "within, inside",
    examples: [
      {
        word: "intranet",
        breakdown: "intra + net",
        meaning: "within a network",
      },
      {
        word: "intracellular",
        breakdown: "intra + cellular",
        meaning: "within a cell",
      },
      {
        word: "intramural",
        breakdown: "intra + mural",
        meaning: "within walls",
      },
      {
        word: "intravenous",
        breakdown: "intra + venous",
        meaning: "within a vein",
      },
    ],
  },
  {
    id: "pref-042",
    type: "Prefix",
    affix: "intro-",
    meaning: "into, inward",
    examples: [
      { word: "introduce", breakdown: "intro + duce", meaning: "lead into" },
      { word: "introvert", breakdown: "intro + vert", meaning: "turn inward" },
      {
        word: "introspection",
        breakdown: "intro + spection",
        meaning: "looking inward",
      },
      {
        word: "introgression",
        breakdown: "intro + gression",
        meaning: "moving into",
      },
    ],
  },
  {
    id: "pref-043",
    type: "Prefix",
    affix: "extra-",
    meaning: "outside, beyond",
    examples: [
      {
        word: "extraterrestrial",
        breakdown: "extra + terrestrial",
        meaning: "outside Earth",
      },
      {
        word: "extracurricular",
        breakdown: "extra + curricular",
        meaning: "outside curriculum",
      },
      {
        word: "extraordinary",
        breakdown: "extra + ordinary",
        meaning: "beyond ordinary",
      },
      {
        word: "extrasensory",
        breakdown: "extra + sensory",
        meaning: "beyond senses",
      },
    ],
  },
  {
    id: "pref-044",
    type: "Prefix",
    affix: "exo-",
    meaning: "outside, external",
    examples: [
      {
        word: "exoskeleton",
        breakdown: "exo + skeleton",
        meaning: "outside skeleton",
      },
      {
        word: "exothermic",
        breakdown: "exo + thermic",
        meaning: "heat releasing",
      },
      {
        word: "exoplanet",
        breakdown: "exo + planet",
        meaning: "outside our solar system",
      },
      {
        word: "exobiology",
        breakdown: "exo + biology",
        meaning: "study of alien life",
      },
    ],
  },
  {
    id: "pref-045",
    type: "Prefix",
    affix: "endo-",
    meaning: "inside, within",
    examples: [
      {
        word: "endoskeleton",
        breakdown: "endo + skeleton",
        meaning: "inside skeleton",
      },
      {
        word: "endothermic",
        breakdown: "endo + thermic",
        meaning: "heat absorbing",
      },
      { word: "endoscope", breakdown: "endo + scope", meaning: "look inside" },
      {
        word: "endocrinology",
        breakdown: "endo + crinology",
        meaning: "study of internal glands",
      },
    ],
  },
  {
    id: "pref-046",
    type: "Prefix",
    affix: "epi-",
    meaning: "upon, above, over",
    examples: [
      {
        word: "epidemic",
        breakdown: "epi + demic",
        meaning: "upon the people",
      },
      {
        word: "epilogue",
        breakdown: "epi + logue",
        meaning: "upon the speech",
      },
      {
        word: "epicenter",
        breakdown: "epi + center",
        meaning: "above the center",
      },
      {
        word: "epidermis",
        breakdown: "epi + dermis",
        meaning: "upon the skin",
      },
    ],
  },
  {
    id: "pref-047",
    type: "Prefix",
    affix: "per-",
    meaning: "through, thoroughly",
    examples: [
      { word: "permeate", breakdown: "per + meate", meaning: "pass through" },
      { word: "perforate", breakdown: "per + forate", meaning: "bore through" },
      {
        word: "permanent",
        breakdown: "per + manent",
        meaning: "remain through",
      },
      { word: "perfect", breakdown: "per + fect", meaning: "thoroughly made" },
    ],
  },
  {
    id: "pref-048",
    type: "Prefix",
    affix: "trans-",
    meaning: "across, beyond",
    examples: [
      { word: "transport", breakdown: "trans + port", meaning: "carry across" },
      { word: "translate", breakdown: "trans + late", meaning: "carry across" },
      {
        word: "transparent",
        breakdown: "trans + parent",
        meaning: "across appearance",
      },
      {
        word: "transatlantic",
        breakdown: "trans + atlantic",
        meaning: "across the Atlantic",
      },
    ],
  },
  {
    id: "pref-049",
    type: "Prefix",
    affix: "circum-",
    meaning: "around",
    examples: [
      { word: "circumvent", breakdown: "circum + vent", meaning: "go around" },
      {
        word: "circumference",
        breakdown: "circum + ference",
        meaning: "carry around",
      },
      {
        word: "circumstance",
        breakdown: "circum + stance",
        meaning: "stand around",
      },
      {
        word: "circumnavigate",
        breakdown: "circum + navigate",
        meaning: "sail around",
      },
    ],
  },
  {
    id: "pref-050",
    type: "Prefix",
    affix: "peri-",
    meaning: "around, surrounding",
    examples: [
      {
        word: "perimeter",
        breakdown: "peri + meter",
        meaning: "measure around",
      },
      { word: "periscope", breakdown: "peri + scope", meaning: "look around" },
      {
        word: "peripheral",
        breakdown: "peri + pheral",
        meaning: "around the edge",
      },
      {
        word: "pericardium",
        breakdown: "peri + cardium",
        meaning: "around the heart",
      },
    ],
  },

  // Degree/size prefixes
  {
    id: "pref-051",
    type: "Prefix",
    affix: "over-",
    meaning: "too much, above",
    examples: [
      { word: "overcook", breakdown: "over + cook", meaning: "cook too much" },
      { word: "overload", breakdown: "over + load", meaning: "load too much" },
      {
        word: "overthink",
        breakdown: "over + think",
        meaning: "think too much",
      },
      {
        word: "overweight",
        breakdown: "over + weight",
        meaning: "above normal weight",
      },
    ],
  },
  {
    id: "pref-052",
    type: "Prefix",
    affix: "under-",
    meaning: "too little, below",
    examples: [
      {
        word: "undercook",
        breakdown: "under + cook",
        meaning: "cook too little",
      },
      {
        word: "underpaid",
        breakdown: "under + paid",
        meaning: "paid too little",
      },
      {
        word: "underestimate",
        breakdown: "under + estimate",
        meaning: "estimate too low",
      },
      {
        word: "underwater",
        breakdown: "under + water",
        meaning: "below water",
      },
    ],
  },
  {
    id: "pref-053",
    type: "Prefix",
    affix: "micro-",
    meaning: "small",
    examples: [
      {
        word: "microscope",
        breakdown: "micro + scope",
        meaning: "look at small things",
      },
      {
        word: "microphone",
        breakdown: "micro + phone",
        meaning: "small sound",
      },
      { word: "microwave", breakdown: "micro + wave", meaning: "small wave" },
      {
        word: "microorganism",
        breakdown: "micro + organism",
        meaning: "small organism",
      },
    ],
  },
  {
    id: "pref-054",
    type: "Prefix",
    affix: "macro-",
    meaning: "large",
    examples: [
      {
        word: "macroscopic",
        breakdown: "macro + scopic",
        meaning: "visible to naked eye",
      },
      {
        word: "macroeconomics",
        breakdown: "macro + economics",
        meaning: "large-scale economics",
      },
      {
        word: "macrocosm",
        breakdown: "macro + cosm",
        meaning: "large universe",
      },
      {
        word: "macronutrient",
        breakdown: "macro + nutrient",
        meaning: "large nutrient",
      },
    ],
  },
  {
    id: "pref-055",
    type: "Prefix",
    affix: "mega-",
    meaning: "large, million",
    examples: [
      { word: "megabyte", breakdown: "mega + byte", meaning: "million bytes" },
      { word: "megaphone", breakdown: "mega + phone", meaning: "large sound" },
      { word: "megacity", breakdown: "mega + city", meaning: "large city" },
      { word: "megalodon", breakdown: "mega + lodon", meaning: "large tooth" },
    ],
  },
  {
    id: "pref-056",
    type: "Prefix",
    affix: "giga-",
    meaning: "billion",
    examples: [
      { word: "gigabyte", breakdown: "giga + byte", meaning: "billion bytes" },
      {
        word: "gigahertz",
        breakdown: "giga + hertz",
        meaning: "billion cycles per second",
      },
      { word: "gigawatt", breakdown: "giga + watt", meaning: "billion watts" },
      { word: "gigaton", breakdown: "giga + ton", meaning: "billion tons" },
    ],
  },
  {
    id: "pref-057",
    type: "Prefix",
    affix: "mini-",
    meaning: "small",
    examples: [
      {
        word: "minicomputer",
        breakdown: "mini + computer",
        meaning: "small computer",
      },
      { word: "minivan", breakdown: "mini + van", meaning: "small van" },
      { word: "miniskirt", breakdown: "mini + skirt", meaning: "short skirt" },
      { word: "minigolf", breakdown: "mini + golf", meaning: "small golf" },
    ],
  },
  {
    id: "pref-058",
    type: "Prefix",
    affix: "maxi-",
    meaning: "large, very",
    examples: [
      { word: "maxi-dress", breakdown: "maxi + dress", meaning: "long dress" },
      {
        word: "maximizing",
        breakdown: "maxi + mizing",
        meaning: "making large",
      },
      { word: "maxipad", breakdown: "maxi + pad", meaning: "large pad" },
      { word: "maximum", breakdown: "maxi + mum", meaning: "largest" },
    ],
  },

  // Relationship prefixes
  {
    id: "pref-059",
    type: "Prefix",
    affix: "co-",
    meaning: "together, with",
    examples: [
      {
        word: "cooperate",
        breakdown: "co + operate",
        meaning: "work together",
      },
      { word: "coexist", breakdown: "co + exist", meaning: "exist together" },
      { word: "coworker", breakdown: "co + worker", meaning: "fellow worker" },
      { word: "copilot", breakdown: "co + pilot", meaning: "assistant pilot" },
    ],
  },
  {
    id: "pref-060",
    type: "Prefix",
    affix: "com-",
    meaning: "together, with (con-, col-, cor- variants)",
    examples: [
      { word: "combine", breakdown: "com + bine", meaning: "join together" },
      {
        word: "community",
        breakdown: "com + munity",
        meaning: "together as one",
      },
      {
        word: "compatriot",
        breakdown: "com + patriot",
        meaning: "fellow countryman",
      },
      {
        word: "commiserate",
        breakdown: "com + miserate",
        meaning: "feel together",
      },
    ],
  },
  {
    id: "pref-061",
    type: "Prefix",
    affix: "con-",
    meaning: "together, with",
    examples: [
      { word: "connect", breakdown: "con + nect", meaning: "tie together" },
      { word: "converge", breakdown: "con + verge", meaning: "tend together" },
      {
        word: "conference",
        breakdown: "con + ference",
        meaning: "bring together",
      },
      {
        word: "congregate",
        breakdown: "con + gregate",
        meaning: "flock together",
      },
    ],
  },
  {
    id: "pref-062",
    type: "Prefix",
    affix: "col-",
    meaning: "together, with",
    examples: [
      {
        word: "collaborate",
        breakdown: "col + laborate",
        meaning: "work together",
      },
      { word: "collide", breakdown: "col + lide", meaning: "strike together" },
      { word: "collect", breakdown: "col + lect", meaning: "gather together" },
      {
        word: "collateral",
        breakdown: "col + lateral",
        meaning: "together side",
      },
    ],
  },
  {
    id: "pref-063",
    type: "Prefix",
    affix: "cor-",
    meaning: "together, with",
    examples: [
      {
        word: "correspond",
        breakdown: "cor + respond",
        meaning: "answer together",
      },
      { word: "corrupt", breakdown: "cor + rupt", meaning: "break together" },
      {
        word: "correlate",
        breakdown: "cor + relate",
        meaning: "relate together",
      },
      {
        word: "corroborate",
        breakdown: "cor + roborate",
        meaning: "strengthen together",
      },
    ],
  },
  {
    id: "pref-064",
    type: "Prefix",
    affix: "syn-",
    meaning: "together, with (sym- variant)",
    examples: [
      {
        word: "synchronize",
        breakdown: "syn + chronize",
        meaning: "time together",
      },
      { word: "synthesis", breakdown: "syn + thesis", meaning: "put together" },
      { word: "synonym", breakdown: "syn + onym", meaning: "same name" },
      { word: "syndrome", breakdown: "syn + drome", meaning: "run together" },
    ],
  },
  {
    id: "pref-065",
    type: "Prefix",
    affix: "sym-",
    meaning: "together, with",
    examples: [
      {
        word: "sympathy",
        breakdown: "sym + pathy",
        meaning: "feeling together",
      },
      { word: "symphony", breakdown: "sym + phony", meaning: "sound together" },
      { word: "symbol", breakdown: "sym + bol", meaning: "throw together" },
      {
        word: "symbiosis",
        breakdown: "sym + biosis",
        meaning: "living together",
      },
    ],
  },
  {
    id: "pref-066",
    type: "Prefix",
    affix: "tele-",
    meaning: "distant, far",
    examples: [
      {
        word: "telephone",
        breakdown: "tele + phone",
        meaning: "distant sound",
      },
      {
        word: "television",
        breakdown: "tele + vision",
        meaning: "distant seeing",
      },
      {
        word: "telegraph",
        breakdown: "tele + graph",
        meaning: "distant writing",
      },
      {
        word: "teleport",
        breakdown: "tele + port",
        meaning: "distant carrying",
      },
    ],
  },

  // Evaluation/judgment prefixes
  {
    id: "pref-067",
    type: "Prefix",
    affix: "bene-",
    meaning: "good, well",
    examples: [
      { word: "benefit", breakdown: "bene + fit", meaning: "good deed" },
      {
        word: "benevolent",
        breakdown: "bene + volent",
        meaning: "well wishing",
      },
      { word: "beneficial", breakdown: "bene + ficial", meaning: "good doing" },
      { word: "benefactor", breakdown: "bene + factor", meaning: "good doer" },
    ],
  },
  {
    id: "pref-068",
    type: "Prefix",
    affix: "mal-",
    meaning: "bad, evil",
    examples: [
      { word: "malicious", breakdown: "mal + icious", meaning: "evil intent" },
      { word: "malady", breakdown: "mal + ady", meaning: "bad condition" },
      {
        word: "malpractice",
        breakdown: "mal + practice",
        meaning: "bad practice",
      },
      {
        word: "malfunction",
        breakdown: "mal + function",
        meaning: "bad function",
      },
    ],
  },
  {
    id: "pref-069",
    type: "Prefix",
    affix: "eu-",
    meaning: "good, well",
    examples: [
      { word: "eulogy", breakdown: "eu + logy", meaning: "good words" },
      { word: "euphoria", breakdown: "eu + phoria", meaning: "well bearing" },
      { word: "eugenics", breakdown: "eu + genics", meaning: "good genes" },
      { word: "euphemism", breakdown: "eu + phemism", meaning: "good speech" },
    ],
  },
  {
    id: "pref-070",
    type: "Prefix",
    affix: "dys-",
    meaning: "bad, difficult",
    examples: [
      {
        word: "dysfunction",
        breakdown: "dys + function",
        meaning: "bad function",
      },
      { word: "dyslexia", breakdown: "dys + lexia", meaning: "bad reading" },
      {
        word: "dyspepsia",
        breakdown: "dys + pepsia",
        meaning: "bad digestion",
      },
      { word: "dystopia", breakdown: "dys + topia", meaning: "bad place" },
    ],
  },
  {
    id: "pref-071",
    type: "Prefix",
    affix: "pseudo-",
    meaning: "false, fake",
    examples: [
      { word: "pseudonym", breakdown: "pseudo + nym", meaning: "false name" },
      {
        word: "pseudoscience",
        breakdown: "pseudo + science",
        meaning: "false science",
      },
      {
        word: "pseudo-intellectual",
        breakdown: "pseudo + intellectual",
        meaning: "false intellectual",
      },
      { word: "pseudocode", breakdown: "pseudo + code", meaning: "false code" },
    ],
  },
  {
    id: "pref-072",
    type: "Prefix",
    affix: "neo-",
    meaning: "new",
    examples: [
      { word: "neonatal", breakdown: "neo + natal", meaning: "new birth" },
      {
        word: "neoclassical",
        breakdown: "neo + classical",
        meaning: "new classical",
      },
      {
        word: "neolithic",
        breakdown: "neo + lithic",
        meaning: "new stone age",
      },
      { word: "neologism", breakdown: "neo + logism", meaning: "new word" },
    ],
  },
  {
    id: "pref-073",
    type: "Prefix",
    affix: "paleo-",
    meaning: "ancient, old",
    examples: [
      {
        word: "paleontology",
        breakdown: "paleo + ontology",
        meaning: "study of ancient life",
      },
      {
        word: "paleolithic",
        breakdown: "paleo + lithic",
        meaning: "old stone age",
      },
      { word: "paleozoic", breakdown: "paleo + zoic", meaning: "ancient life" },
      {
        word: "paleography",
        breakdown: "paleo + graphy",
        meaning: "ancient writing",
      },
    ],
  },
  {
    id: "pref-074",
    type: "Prefix",
    affix: "proto-",
    meaning: "first, original",
    examples: [
      { word: "prototype", breakdown: "proto + type", meaning: "first model" },
      { word: "protocol", breakdown: "proto + col", meaning: "first glue" },
      { word: "protozoa", breakdown: "proto + zoa", meaning: "first animals" },
      {
        word: "protoplasm",
        breakdown: "proto + plasm",
        meaning: "first formed",
      },
    ],
  },

  // Other common prefixes
  {
    id: "pref-075",
    type: "Prefix",
    affix: "auto-",
    meaning: "self",
    examples: [
      { word: "automatic", breakdown: "auto + matic", meaning: "self acting" },
      { word: "autograph", breakdown: "auto + graph", meaning: "self writing" },
      {
        word: "autobiography",
        breakdown: "auto + biography",
        meaning: "self life writing",
      },
      { word: "autopilot", breakdown: "auto + pilot", meaning: "self pilot" },
    ],
  },
  {
    id: "pref-076",
    type: "Prefix",
    affix: "hetero-",
    meaning: "different",
    examples: [
      {
        word: "heterogeneous",
        breakdown: "hetero + geneous",
        meaning: "different kind",
      },
      {
        word: "heterosexual",
        breakdown: "hetero + sexual",
        meaning: "different sex",
      },
      {
        word: "heterodox",
        breakdown: "hetero + dox",
        meaning: "different opinion",
      },
      {
        word: "heteronym",
        breakdown: "hetero + nym",
        meaning: "different name",
      },
    ],
  },
  {
    id: "pref-077",
    type: "Prefix",
    affix: "homo-",
    meaning: "same",
    examples: [
      {
        word: "homogeneous",
        breakdown: "homo + geneous",
        meaning: "same kind",
      },
      { word: "homosexual", breakdown: "homo + sexual", meaning: "same sex" },
      { word: "homonym", breakdown: "homo + nym", meaning: "same name" },
      { word: "homophone", breakdown: "homo + phone", meaning: "same sound" },
    ],
  },
  {
    id: "pref-078",
    type: "Prefix",
    affix: "pan-",
    meaning: "all, every",
    examples: [
      { word: "panorama", breakdown: "pan + orama", meaning: "all view" },
      { word: "pandemic", breakdown: "pan + demic", meaning: "all people" },
      { word: "pantheon", breakdown: "pan + theon", meaning: "all gods" },
      { word: "pantheism", breakdown: "pan + theism", meaning: "all is God" },
    ],
  },
  {
    id: "pref-079",
    type: "Prefix",
    affix: "vice-",
    meaning: "deputy, second in command",
    examples: [
      {
        word: "vice-president",
        breakdown: "vice + president",
        meaning: "deputy president",
      },
      {
        word: "vice-captain",
        breakdown: "vice + captain",
        meaning: "deputy captain",
      },
      {
        word: "vice-chancellor",
        breakdown: "vice + chancellor",
        meaning: "deputy chancellor",
      },
      { word: "viceroy", breakdown: "vice + roy", meaning: "deputy king" },
    ],
  },
  {
    id: "pref-080",
    type: "Prefix",
    affix: "ex-",
    meaning: "out, former",
    examples: [
      { word: "exhale", breakdown: "ex + hale", meaning: "breathe out" },
      { word: "exit", breakdown: "ex + it", meaning: "go out" },
      {
        word: "ex-president",
        breakdown: "ex + president",
        meaning: "former president",
      },
      { word: "ex-wife", breakdown: "ex + wife", meaning: "former wife" },
    ],
  },
  {
    id: "pref-081",
    type: "Prefix",
    affix: "eco-",
    meaning: "environment, house",
    examples: [
      {
        word: "ecosystem",
        breakdown: "eco + system",
        meaning: "environment system",
      },
      {
        word: "ecology",
        breakdown: "eco + logy",
        meaning: "study of environment",
      },
      {
        word: "ecotourism",
        breakdown: "eco + tourism",
        meaning: "environmental tourism",
      },
      {
        word: "ecofriendly",
        breakdown: "eco + friendly",
        meaning: "friendly to environment",
      },
    ],
  },
  {
    id: "pref-082",
    type: "Prefix",
    affix: "geo-",
    meaning: "earth",
    examples: [
      {
        word: "geography",
        breakdown: "geo + graphy",
        meaning: "earth writing",
      },
      { word: "geology", breakdown: "geo + logy", meaning: "study of earth" },
      { word: "geometry", breakdown: "geo + metry", meaning: "earth measure" },
      { word: "geothermal", breakdown: "geo + thermal", meaning: "earth heat" },
    ],
  },
  {
    id: "pref-083",
    type: "Prefix",
    affix: "hydro-",
    meaning: "water",
    examples: [
      {
        word: "hydroelectric",
        breakdown: "hydro + electric",
        meaning: "water electricity",
      },
      { word: "hydraulic", breakdown: "hydro + aulic", meaning: "water pipe" },
      {
        word: "hydrothermal",
        breakdown: "hydro + thermal",
        meaning: "water heat",
      },
      {
        word: "hydrolysis",
        breakdown: "hydro + lysis",
        meaning: "water splitting",
      },
    ],
  },
  {
    id: "pref-084",
    type: "Prefix",
    affix: "astro-",
    meaning: "star",
    examples: [
      { word: "astronomy", breakdown: "astro + nomy", meaning: "star law" },
      { word: "astronaut", breakdown: "astro + naut", meaning: "star sailor" },
      {
        word: "astrophysics",
        breakdown: "astro + physics",
        meaning: "star physics",
      },
      { word: "astrology", breakdown: "astro + logy", meaning: "star study" },
    ],
  },
  {
    id: "pref-085",
    type: "Prefix",
    affix: "bio-",
    meaning: "life",
    examples: [
      { word: "biology", breakdown: "bio + logy", meaning: "study of life" },
      { word: "biography", breakdown: "bio + graphy", meaning: "life writing" },
      { word: "biopsy", breakdown: "bio + psy", meaning: "life viewing" },
      { word: "biosphere", breakdown: "bio + sphere", meaning: "life sphere" },
    ],
  },
  {
    id: "pref-086",
    type: "Prefix",
    affix: "chrono-",
    meaning: "time",
    examples: [
      {
        word: "chronology",
        breakdown: "chrono + logy",
        meaning: "study of time",
      },
      {
        word: "chronometer",
        breakdown: "chrono + meter",
        meaning: "time measure",
      },
      { word: "chronic", breakdown: "chron + ic", meaning: "relating to time" },
      {
        word: "synchronize",
        breakdown: "syn + chrono + ize",
        meaning: "same time",
      },
    ],
  },
  {
    id: "pref-087",
    type: "Prefix",
    affix: "derm-",
    meaning: "skin",
    examples: [
      {
        word: "dermatology",
        breakdown: "derm + atology",
        meaning: "study of skin",
      },
      { word: "hypodermic", breakdown: "hypo + dermic", meaning: "under skin" },
      { word: "epidermis", breakdown: "epi + dermis", meaning: "upon skin" },
      {
        word: "dermatitis",
        breakdown: "derm + atitis",
        meaning: "skin inflammation",
      },
    ],
  },
  {
    id: "pref-088",
    type: "Prefix",
    affix: "morph-",
    meaning: "shape, form",
    examples: [
      {
        word: "morphology",
        breakdown: "morph + ology",
        meaning: "study of form",
      },
      {
        word: "metamorphosis",
        breakdown: "meta + morphosis",
        meaning: "change shape",
      },
      {
        word: "amorphous",
        breakdown: "a + morphous",
        meaning: "without shape",
      },
      {
        word: "anthropomorphic",
        breakdown: "anthropo + morphic",
        meaning: "human shape",
      },
    ],
  },
  {
    id: "pref-089",
    type: "Prefix",
    affix: "phon-",
    meaning: "sound",
    examples: [
      {
        word: "telephone",
        breakdown: "tele + phone",
        meaning: "distant sound",
      },
      {
        word: "microphone",
        breakdown: "micro + phone",
        meaning: "small sound",
      },
      { word: "symphony", breakdown: "sym + phony", meaning: "sound together" },
      {
        word: "phonetic",
        breakdown: "phon + etic",
        meaning: "relating to sound",
      },
    ],
  },
  {
    id: "pref-090",
    type: "Prefix",
    affix: "photo-",
    meaning: "light",
    examples: [
      {
        word: "photograph",
        breakdown: "photo + graph",
        meaning: "light writing",
      },
      {
        word: "photosynthesis",
        breakdown: "photo + synthesis",
        meaning: "light putting together",
      },
      { word: "photon", breakdown: "photo + n", meaning: "light particle" },
      { word: "photocopy", breakdown: "photo + copy", meaning: "light copy" },
    ],
  },
  {
    id: "pref-091",
    type: "Prefix",
    affix: "psych-",
    meaning: "mind",
    examples: [
      {
        word: "psychology",
        breakdown: "psych + ology",
        meaning: "study of mind",
      },
      {
        word: "psychiatry",
        breakdown: "psych + iatry",
        meaning: "mind healing",
      },
      { word: "psychic", breakdown: "psych + ic", meaning: "relating to mind" },
      {
        word: "psychopath",
        breakdown: "psych + opath",
        meaning: "mind disease",
      },
    ],
  },
  {
    id: "pref-092",
    type: "Prefix",
    affix: "techn-",
    meaning: "art, skill",
    examples: [
      {
        word: "technology",
        breakdown: "techn + ology",
        meaning: "study of skill",
      },
      {
        word: "technical",
        breakdown: "techn + ical",
        meaning: "relating to skill",
      },
      { word: "technique", breakdown: "techn + ique", meaning: "method" },
      {
        word: "polytechnic",
        breakdown: "poly + technic",
        meaning: "many arts",
      },
    ],
  },
  {
    id: "pref-093",
    type: "Prefix",
    affix: "theo-",
    meaning: "god",
    examples: [
      { word: "theology", breakdown: "theo + logy", meaning: "study of God" },
      { word: "theocracy", breakdown: "theo + cracy", meaning: "God rule" },
      { word: "atheist", breakdown: "a + theist", meaning: "without God" },
      { word: "pantheon", breakdown: "pan + theon", meaning: "all gods" },
    ],
  },
  {
    id: "pref-094",
    type: "Prefix",
    affix: "therm-",
    meaning: "heat",
    examples: [
      {
        word: "thermometer",
        breakdown: "thermo + meter",
        meaning: "heat measure",
      },
      { word: "thermal", breakdown: "therm + al", meaning: "relating to heat" },
      {
        word: "thermostat",
        breakdown: "thermo + stat",
        meaning: "heat regulator",
      },
      { word: "hypothermia", breakdown: "hypo + thermia", meaning: "low heat" },
    ],
  },
  {
    id: "pref-095",
    type: "Prefix",
    affix: "zo-",
    meaning: "animal",
    examples: [
      { word: "zoo", breakdown: "zo + o", meaning: "animals" },
      { word: "zoology", breakdown: "zo + ology", meaning: "study of animals" },
      {
        word: "zooplankton",
        breakdown: "zo + plankton",
        meaning: "animal plankton",
      },
      { word: "protozoa", breakdown: "proto + zoa", meaning: "first animals" },
    ],
  },

  // Verb prefixes
  {
    id: "pref-096",
    type: "Prefix",
    affix: "en-",
    meaning: "to cause to be, to put into",
    examples: [
      { word: "enlarge", breakdown: "en + large", meaning: "make large" },
      {
        word: "encourage",
        breakdown: "en + courage",
        meaning: "put courage into",
      },
      { word: "endanger", breakdown: "en + danger", meaning: "put in danger" },
      { word: "enjoy", breakdown: "en + joy", meaning: "put joy into" },
    ],
  },
  {
    id: "pref-097",
    type: "Prefix",
    affix: "em-",
    meaning: "to cause to be, to put into",
    examples: [
      { word: "empower", breakdown: "em + power", meaning: "give power to" },
      { word: "embrace", breakdown: "em + brace", meaning: "put in arms" },
      { word: "embed", breakdown: "em + bed", meaning: "put in bed" },
      { word: "embody", breakdown: "em + body", meaning: "put in body" },
    ],
  },
  {
    id: "pref-098",
    type: "Prefix",
    affix: "be-",
    meaning: "to make, to affect",
    examples: [
      { word: "belittle", breakdown: "be + little", meaning: "make little" },
      { word: "befriend", breakdown: "be + friend", meaning: "make a friend" },
      { word: "bewilder", breakdown: "be + wilder", meaning: "make wild" },
      { word: "becalm", breakdown: "be + calm", meaning: "make calm" },
    ],
  },
  {
    id: "pref-099",
    type: "Prefix",
    affix: "de-",
    meaning: "down, away, reverse",
    examples: [
      {
        word: "deactivate",
        breakdown: "de + activate",
        meaning: "reverse activation",
      },
      { word: "decrease", breakdown: "de + crease", meaning: "grow down" },
      { word: "deforest", breakdown: "de + forest", meaning: "remove forest" },
      {
        word: "deconstruct",
        breakdown: "de + construct",
        meaning: "reverse construction",
      },
    ],
  },
  {
    id: "pref-100",
    type: "Prefix",
    affix: "pre-",
    meaning: "before",
    examples: [
      { word: "preview", breakdown: "pre + view", meaning: "view before" },
      { word: "predict", breakdown: "pre + dict", meaning: "say before" },
      {
        word: "prepare",
        breakdown: "pre + pare",
        meaning: "make ready before",
      },
      { word: "preheat", breakdown: "pre + heat", meaning: "heat before" },
    ],
  },

  // ========== SUFFIXES ==========

  // Noun suffixes
  {
    id: "suf-001",
    type: "Suffix",
    affix: "-er",
    meaning: "person who does something",
    examples: [
      {
        word: "teacher",
        breakdown: "teach + er",
        meaning: "person who teaches",
      },
      { word: "driver", breakdown: "drive + er", meaning: "person who drives" },
      { word: "writer", breakdown: "write + er", meaning: "person who writes" },
      { word: "singer", breakdown: "sing + er", meaning: "person who sings" },
    ],
  },
  {
    id: "suf-002",
    type: "Suffix",
    affix: "-or",
    meaning: "person who does something",
    examples: [
      { word: "actor", breakdown: "act + or", meaning: "person who acts" },
      { word: "doctor", breakdown: "doct + or", meaning: "person who teaches" },
      {
        word: "inventor",
        breakdown: "invent + or",
        meaning: "person who invents",
      },
      {
        word: "director",
        breakdown: "direct + or",
        meaning: "person who directs",
      },
    ],
  },
  {
    id: "suf-003",
    type: "Suffix",
    affix: "-ist",
    meaning: "person who practices or believes",
    examples: [
      {
        word: "artist",
        breakdown: "art + ist",
        meaning: "person who practices art",
      },
      {
        word: "scientist",
        breakdown: "scien + ist",
        meaning: "person of science",
      },
      {
        word: "pianist",
        breakdown: "pian + ist",
        meaning: "person who plays piano",
      },
      {
        word: "optimist",
        breakdown: "optim + ist",
        meaning: "person who sees good",
      },
    ],
  },
  {
    id: "suf-004",
    type: "Suffix",
    affix: "-ian",
    meaning: "person who specializes in",
    examples: [
      {
        word: "musician",
        breakdown: "music + ian",
        meaning: "person who makes music",
      },
      {
        word: "politician",
        breakdown: "politic + ian",
        meaning: "person in politics",
      },
      {
        word: "librarian",
        breakdown: "librar + ian",
        meaning: "person who works in library",
      },
      {
        word: "comedian",
        breakdown: "comed + ian",
        meaning: "person who does comedy",
      },
    ],
  },
  {
    id: "suf-005",
    type: "Suffix",
    affix: "-ant",
    meaning: "person who does something",
    examples: [
      {
        word: "assistant",
        breakdown: "assist + ant",
        meaning: "person who assists",
      },
      {
        word: "defendant",
        breakdown: "defend + ant",
        meaning: "person who defends",
      },
      {
        word: "applicant",
        breakdown: "apply + ant",
        meaning: "person who applies",
      },
      {
        word: "consultant",
        breakdown: "consult + ant",
        meaning: "person who consults",
      },
    ],
  },
  {
    id: "suf-006",
    type: "Suffix",
    affix: "-ent",
    meaning: "person who does something",
    examples: [
      {
        word: "resident",
        breakdown: "resid + ent",
        meaning: "person who resides",
      },
      {
        word: "president",
        breakdown: "presid + ent",
        meaning: "person who presides",
      },
      {
        word: "student",
        breakdown: "stud + ent",
        meaning: "person who studies",
      },
      {
        word: "patient",
        breakdown: "pati + ent",
        meaning: "person who endures",
      },
    ],
  },
  {
    id: "suf-007",
    type: "Suffix",
    affix: "-ee",
    meaning: "person who receives action",
    examples: [
      {
        word: "employee",
        breakdown: "employ + ee",
        meaning: "person who is employed",
      },
      {
        word: "interviewee",
        breakdown: "interview + ee",
        meaning: "person interviewed",
      },
      {
        word: "trainee",
        breakdown: "train + ee",
        meaning: "person in training",
      },
      { word: "nominee", breakdown: "nomin + ee", meaning: "person nominated" },
    ],
  },
  {
    id: "suf-008",
    type: "Suffix",
    affix: "-tion",
    meaning: "act or state of",
    examples: [
      { word: "action", breakdown: "act + tion", meaning: "state of acting" },
      {
        word: "celebration",
        breakdown: "celebrate + tion",
        meaning: "act of celebrating",
      },
      {
        word: "education",
        breakdown: "educate + tion",
        meaning: "act of educating",
      },
      {
        word: "information",
        breakdown: "inform + tion",
        meaning: "act of informing",
      },
    ],
  },
  {
    id: "suf-009",
    type: "Suffix",
    affix: "-sion",
    meaning: "act or state of",
    examples: [
      {
        word: "decision",
        breakdown: "decide + sion",
        meaning: "act of deciding",
      },
      {
        word: "confusion",
        breakdown: "confuse + sion",
        meaning: "state of being confused",
      },
      {
        word: "television",
        breakdown: "tele + vis + ion",
        meaning: "distant seeing",
      },
      {
        word: "explosion",
        breakdown: "explode + sion",
        meaning: "act of exploding",
      },
    ],
  },
  {
    id: "suf-010",
    type: "Suffix",
    affix: "-ment",
    meaning: "result of action",
    examples: [
      {
        word: "enjoyment",
        breakdown: "enjoy + ment",
        meaning: "result of enjoying",
      },
      {
        word: "government",
        breakdown: "govern + ment",
        meaning: "result of governing",
      },
      {
        word: "agreement",
        breakdown: "agree + ment",
        meaning: "result of agreeing",
      },
      {
        word: "improvement",
        breakdown: "improve + ment",
        meaning: "result of improving",
      },
    ],
  },
  {
    id: "suf-011",
    type: "Suffix",
    affix: "-ness",
    meaning: "state or quality of being",
    examples: [
      {
        word: "happiness",
        breakdown: "happy + ness",
        meaning: "state of being happy",
      },
      {
        word: "sadness",
        breakdown: "sad + ness",
        meaning: "state of being sad",
      },
      {
        word: "kindness",
        breakdown: "kind + ness",
        meaning: "quality of being kind",
      },
      {
        word: "darkness",
        breakdown: "dark + ness",
        meaning: "state of being dark",
      },
    ],
  },
  {
    id: "suf-012",
    type: "Suffix",
    affix: "-ity",
    meaning: "state or quality of",
    examples: [
      {
        word: "ability",
        breakdown: "able + ity",
        meaning: "quality of being able",
      },
      {
        word: "creativity",
        breakdown: "creative + ity",
        meaning: "quality of being creative",
      },
      {
        word: "diversity",
        breakdown: "diverse + ity",
        meaning: "state of being diverse",
      },
      {
        word: "equality",
        breakdown: "equal + ity",
        meaning: "state of being equal",
      },
    ],
  },
  {
    id: "suf-013",
    type: "Suffix",
    affix: "-ty",
    meaning: "state or quality of",
    examples: [
      {
        word: "certainty",
        breakdown: "certain + ty",
        meaning: "state of being certain",
      },
      {
        word: "loyalty",
        breakdown: "loyal + ty",
        meaning: "quality of being loyal",
      },
      {
        word: "safety",
        breakdown: "safe + ty",
        meaning: "state of being safe",
      },
      {
        word: "novelty",
        breakdown: "novel + ty",
        meaning: "quality of being new",
      },
    ],
  },
  {
    id: "suf-014",
    type: "Suffix",
    affix: "-ship",
    meaning: "state, condition, or skill of",
    examples: [
      {
        word: "friendship",
        breakdown: "friend + ship",
        meaning: "state of being friends",
      },
      {
        word: "leadership",
        breakdown: "leader + ship",
        meaning: "skill of leading",
      },
      {
        word: "membership",
        breakdown: "member + ship",
        meaning: "state of being a member",
      },
      {
        word: "relationship",
        breakdown: "relation + ship",
        meaning: "state of relating",
      },
    ],
  },
  {
    id: "suf-015",
    type: "Suffix",
    affix: "-hood",
    meaning: "state, condition of being",
    examples: [
      {
        word: "childhood",
        breakdown: "child + hood",
        meaning: "state of being a child",
      },
      {
        word: "adulthood",
        breakdown: "adult + hood",
        meaning: "state of being an adult",
      },
      {
        word: "neighborhood",
        breakdown: "neighbor + hood",
        meaning: "state of neighbors",
      },
      {
        word: "parenthood",
        breakdown: "parent + hood",
        meaning: "state of being a parent",
      },
    ],
  },
  {
    id: "suf-016",
    type: "Suffix",
    affix: "-dom",
    meaning: "state, condition, or domain of",
    examples: [
      {
        word: "freedom",
        breakdown: "free + dom",
        meaning: "state of being free",
      },
      { word: "kingdom", breakdown: "king + dom", meaning: "domain of a king" },
      {
        word: "wisdom",
        breakdown: "wise + dom",
        meaning: "state of being wise",
      },
      {
        word: "boredom",
        breakdown: "bore + dom",
        meaning: "state of being bored",
      },
    ],
  },
  {
    id: "suf-017",
    type: "Suffix",
    affix: "-age",
    meaning: "result of action, collection",
    examples: [
      {
        word: "marriage",
        breakdown: "marry + age",
        meaning: "result of marrying",
      },
      {
        word: "postage",
        breakdown: "post + age",
        meaning: "charge for posting",
      },
      { word: "storage", breakdown: "store + age", meaning: "act of storing" },
      {
        word: "package",
        breakdown: "pack + age",
        meaning: "thing that is packed",
      },
    ],
  },
  {
    id: "suf-018",
    type: "Suffix",
    affix: "-ance",
    meaning: "state or quality of",
    examples: [
      {
        word: "importance",
        breakdown: "import + ance",
        meaning: "state of being important",
      },
      {
        word: "appearance",
        breakdown: "appear + ance",
        meaning: "act of appearing",
      },
      {
        word: "performance",
        breakdown: "perform + ance",
        meaning: "act of performing",
      },
      {
        word: "guidance",
        breakdown: "guide + ance",
        meaning: "act of guiding",
      },
    ],
  },
  {
    id: "suf-019",
    type: "Suffix",
    affix: "-ence",
    meaning: "state or quality of",
    examples: [
      {
        word: "difference",
        breakdown: "differ + ence",
        meaning: "state of being different",
      },
      {
        word: "confidence",
        breakdown: "confid + ence",
        meaning: "state of trusting",
      },
      {
        word: "intelligence",
        breakdown: "intellig + ence",
        meaning: "quality of being smart",
      },
      {
        word: "independence",
        breakdown: "independ + ence",
        meaning: "state of being independent",
      },
    ],
  },
  {
    id: "suf-020",
    type: "Suffix",
    affix: "-ism",
    meaning: "doctrine, belief, system",
    examples: [
      {
        word: "capitalism",
        breakdown: "capital + ism",
        meaning: "economic system",
      },
      {
        word: "communism",
        breakdown: "commune + ism",
        meaning: "belief system",
      },
      { word: "optimism", breakdown: "optim + ism", meaning: "belief in good" },
      {
        word: "patriotism",
        breakdown: "patriot + ism",
        meaning: "love of country",
      },
    ],
  },
  {
    id: "suf-021",
    type: "Suffix",
    affix: "-ology",
    meaning: "study of, science of",
    examples: [
      { word: "biology", breakdown: "bio + logy", meaning: "study of life" },
      {
        word: "psychology",
        breakdown: "psycho + logy",
        meaning: "study of mind",
      },
      { word: "geology", breakdown: "geo + logy", meaning: "study of earth" },
      {
        word: "sociology",
        breakdown: "socio + logy",
        meaning: "study of society",
      },
    ],
  },
  {
    id: "suf-022",
    type: "Suffix",
    affix: "-graphy",
    meaning: "writing, recording",
    examples: [
      {
        word: "biography",
        breakdown: "bio + graphy",
        meaning: "writing about life",
      },
      {
        word: "photography",
        breakdown: "photo + graphy",
        meaning: "writing with light",
      },
      {
        word: "calligraphy",
        breakdown: "calli + graphy",
        meaning: "beautiful writing",
      },
      {
        word: "geography",
        breakdown: "geo + graphy",
        meaning: "writing about earth",
      },
    ],
  },
  {
    id: "suf-023",
    type: "Suffix",
    affix: "-metry",
    meaning: "measurement of",
    examples: [
      {
        word: "geometry",
        breakdown: "geo + metry",
        meaning: "measurement of earth",
      },
      {
        word: "symmetry",
        breakdown: "sym + metry",
        meaning: "same measurement",
      },
      {
        word: "thermometry",
        breakdown: "thermo + metry",
        meaning: "measurement of heat",
      },
      {
        word: "biometry",
        breakdown: "bio + metry",
        meaning: "measurement of life",
      },
    ],
  },

  // Adjective suffixes
  {
    id: "suf-024",
    type: "Suffix",
    affix: "-ful",
    meaning: "full of",
    examples: [
      { word: "hopeful", breakdown: "hope + ful", meaning: "full of hope" },
      { word: "careful", breakdown: "care + ful", meaning: "full of care" },
      {
        word: "beautiful",
        breakdown: "beauty + ful",
        meaning: "full of beauty",
      },
      {
        word: "grateful",
        breakdown: "grate + ful",
        meaning: "full of gratitude",
      },
    ],
  },
  {
    id: "suf-025",
    type: "Suffix",
    affix: "-less",
    meaning: "without",
    examples: [
      { word: "hopeless", breakdown: "hope + less", meaning: "without hope" },
      { word: "fearless", breakdown: "fear + less", meaning: "without fear" },
      { word: "endless", breakdown: "end + less", meaning: "without end" },
      { word: "homeless", breakdown: "home + less", meaning: "without a home" },
    ],
  },
  {
    id: "suf-026",
    type: "Suffix",
    affix: "-able",
    meaning: "capable of, worthy of",
    examples: [
      {
        word: "breakable",
        breakdown: "break + able",
        meaning: "capable of being broken",
      },
      {
        word: "washable",
        breakdown: "wash + able",
        meaning: "capable of being washed",
      },
      {
        word: "enjoyable",
        breakdown: "enjoy + able",
        meaning: "capable of being enjoyed",
      },
      {
        word: "readable",
        breakdown: "read + able",
        meaning: "capable of being read",
      },
    ],
  },
  {
    id: "suf-027",
    type: "Suffix",
    affix: "-ible",
    meaning: "capable of, worthy of",
    examples: [
      {
        word: "visible",
        breakdown: "vis + ible",
        meaning: "capable of being seen",
      },
      {
        word: "audible",
        breakdown: "aud + ible",
        meaning: "capable of being heard",
      },
      {
        word: "terrible",
        breakdown: "terr + ible",
        meaning: "worthy of terror",
      },
      {
        word: "horrible",
        breakdown: "horr + ible",
        meaning: "worthy of horror",
      },
    ],
  },
  {
    id: "suf-028",
    type: "Suffix",
    affix: "-ous",
    meaning: "full of, having quality of",
    examples: [
      {
        word: "dangerous",
        breakdown: "danger + ous",
        meaning: "full of danger",
      },
      { word: "famous", breakdown: "fame + ous", meaning: "full of fame" },
      {
        word: "serious",
        breakdown: "series + ous",
        meaning: "having seriousness",
      },
      { word: "curious", breakdown: "cure + ous", meaning: "having curiosity" },
    ],
  },
  {
    id: "suf-029",
    type: "Suffix",
    affix: "-ious",
    meaning: "having quality of",
    examples: [
      {
        word: "delicious",
        breakdown: "delici + ous",
        meaning: "full of delight",
      },
      {
        word: "precious",
        breakdown: "preci + ous",
        meaning: "having great value",
      },
      {
        word: "ambitious",
        breakdown: "ambit + ious",
        meaning: "having ambition",
      },
      { word: "cautious", breakdown: "caut + ious", meaning: "having caution" },
    ],
  },
  {
    id: "suf-030",
    type: "Suffix",
    affix: "-al",
    meaning: "relating to",
    examples: [
      {
        word: "magical",
        breakdown: "magic + al",
        meaning: "relating to magic",
      },
      {
        word: "musical",
        breakdown: "music + al",
        meaning: "relating to music",
      },
      {
        word: "practical",
        breakdown: "practice + al",
        meaning: "relating to practice",
      },
      {
        word: "emotional",
        breakdown: "emotion + al",
        meaning: "relating to emotion",
      },
    ],
  },
  {
    id: "suf-031",
    type: "Suffix",
    affix: "-ial",
    meaning: "relating to",
    examples: [
      {
        word: "industrial",
        breakdown: "industry + ial",
        meaning: "relating to industry",
      },
      {
        word: "commercial",
        breakdown: "commerce + ial",
        meaning: "relating to commerce",
      },
      {
        word: "financial",
        breakdown: "finance + ial",
        meaning: "relating to finance",
      },
      {
        word: "presidential",
        breakdown: "president + ial",
        meaning: "relating to president",
      },
    ],
  },
  {
    id: "suf-032",
    type: "Suffix",
    affix: "-ic",
    meaning: "relating to",
    examples: [
      {
        word: "dramatic",
        breakdown: "drama + tic",
        meaning: "relating to drama",
      },
      {
        word: "scientific",
        breakdown: "science + tific",
        meaning: "relating to science",
      },
      {
        word: "energetic",
        breakdown: "energy + etic",
        meaning: "relating to energy",
      },
      {
        word: "sympathetic",
        breakdown: "sympathy + etic",
        meaning: "relating to sympathy",
      },
    ],
  },
  {
    id: "suf-033",
    type: "Suffix",
    affix: "-ive",
    meaning: "tending to, having nature of",
    examples: [
      { word: "active", breakdown: "act + ive", meaning: "tending to act" },
      {
        word: "creative",
        breakdown: "create + ive",
        meaning: "tending to create",
      },
      {
        word: "attractive",
        breakdown: "attract + ive",
        meaning: "tending to attract",
      },
      {
        word: "impressive",
        breakdown: "impress + ive",
        meaning: "tending to impress",
      },
    ],
  },
  {
    id: "suf-034",
    type: "Suffix",
    affix: "-ative",
    meaning: "tending to, relating to",
    examples: [
      {
        word: "talkative",
        breakdown: "talk + ative",
        meaning: "tending to talk",
      },
      {
        word: "affirmative",
        breakdown: "affirm + ative",
        meaning: "tending to affirm",
      },
      {
        word: "imaginative",
        breakdown: "imagine + ative",
        meaning: "tending to imagine",
      },
      {
        word: "informative",
        breakdown: "inform + ative",
        meaning: "tending to inform",
      },
    ],
  },
  {
    id: "suf-035",
    type: "Suffix",
    affix: "-y",
    meaning: "characterized by, full of",
    examples: [
      { word: "sunny", breakdown: "sun + y", meaning: "full of sun" },
      { word: "rainy", breakdown: "rain + y", meaning: "full of rain" },
      { word: "windy", breakdown: "wind + y", meaning: "full of wind" },
      { word: "cloudy", breakdown: "cloud + y", meaning: "full of clouds" },
    ],
  },
  {
    id: "suf-036",
    type: "Suffix",
    affix: "-ly",
    meaning: "having quality of",
    examples: [
      {
        word: "friendly",
        breakdown: "friend + ly",
        meaning: "having friend quality",
      },
      {
        word: "lovely",
        breakdown: "love + ly",
        meaning: "having love quality",
      },
      { word: "costly", breakdown: "cost + ly", meaning: "having high cost" },
      {
        word: "cowardly",
        breakdown: "coward + ly",
        meaning: "having coward quality",
      },
    ],
  },
  {
    id: "suf-037",
    type: "Suffix",
    affix: "-ish",
    meaning: "somewhat, like",
    examples: [
      { word: "childish", breakdown: "child + ish", meaning: "like a child" },
      { word: "foolish", breakdown: "fool + ish", meaning: "like a fool" },
      { word: "reddish", breakdown: "red + dish", meaning: "somewhat red" },
      { word: "selfish", breakdown: "self + ish", meaning: "like oneself" },
    ],
  },
  {
    id: "suf-038",
    type: "Suffix",
    affix: "-like",
    meaning: "resembling, similar to",
    examples: [
      {
        word: "childlike",
        breakdown: "child + like",
        meaning: "resembling a child",
      },
      {
        word: "lifelike",
        breakdown: "life + like",
        meaning: "resembling life",
      },
      {
        word: "bell-like",
        breakdown: "bell + like",
        meaning: "resembling a bell",
      },
      { word: "dreamlike", breakdown: "dream + like", meaning: "like a dream" },
    ],
  },
  {
    id: "suf-039",
    type: "Suffix",
    affix: "-some",
    meaning: "tending to, causing",
    examples: [
      { word: "handsome", breakdown: "hand + some", meaning: "easy to handle" },
      {
        word: "troublesome",
        breakdown: "trouble + some",
        meaning: "causing trouble",
      },
      { word: "awesome", breakdown: "awe + some", meaning: "causing awe" },
      { word: "fearsome", breakdown: "fear + some", meaning: "causing fear" },
    ],
  },

  // Adverb suffixes
  {
    id: "suf-040",
    type: "Suffix",
    affix: "-ly",
    meaning: "in a certain way (adverb)",
    examples: [
      { word: "quickly", breakdown: "quick + ly", meaning: "in a quick way" },
      { word: "happily", breakdown: "happy + ly", meaning: "in a happy way" },
      {
        word: "carefully",
        breakdown: "careful + ly",
        meaning: "in a careful way",
      },
      { word: "easily", breakdown: "easy + ly", meaning: "in an easy way" },
    ],
  },
  {
    id: "suf-041",
    type: "Suffix",
    affix: "-ward",
    meaning: "in the direction of",
    examples: [
      { word: "forward", breakdown: "for + ward", meaning: "toward the front" },
      {
        word: "backward",
        breakdown: "back + ward",
        meaning: "toward the back",
      },
      {
        word: "upward",
        breakdown: "up + ward",
        meaning: "toward a higher place",
      },
      {
        word: "downward",
        breakdown: "down + ward",
        meaning: "toward a lower place",
      },
    ],
  },
  {
    id: "suf-042",
    type: "Suffix",
    affix: "-wise",
    meaning: "in the manner of, with reference to",
    examples: [
      {
        word: "clockwise",
        breakdown: "clock + wise",
        meaning: "in the direction of a clock",
      },
      {
        word: "otherwise",
        breakdown: "other + wise",
        meaning: "in a different way",
      },
      {
        word: "lengthwise",
        breakdown: "length + wise",
        meaning: "in the direction of length",
      },
      {
        word: "crosswise",
        breakdown: "cross + wise",
        meaning: "in a crossing manner",
      },
    ],
  },

  // Verb suffixes
  {
    id: "suf-043",
    type: "Suffix",
    affix: "-ize",
    meaning: "to make, to cause to become",
    examples: [
      {
        word: "organize",
        breakdown: "organ + ize",
        meaning: "to make into an organ",
      },
      { word: "realize", breakdown: "real + ize", meaning: "to make real" },
      {
        word: "modernize",
        breakdown: "modern + ize",
        meaning: "to make modern",
      },
      {
        word: "standardize",
        breakdown: "standard + ize",
        meaning: "to make standard",
      },
    ],
  },
  {
    id: "suf-044",
    type: "Suffix",
    affix: "-ise",
    meaning: "to make (British spelling)",
    examples: [
      {
        word: "organise",
        breakdown: "organ + ise",
        meaning: "to make into an organ",
      },
      { word: "realise", breakdown: "real + ise", meaning: "to make real" },
      {
        word: "modernise",
        breakdown: "modern + ise",
        meaning: "to make modern",
      },
      {
        word: "standardise",
        breakdown: "standard + ise",
        meaning: "to make standard",
      },
    ],
  },
  {
    id: "suf-045",
    type: "Suffix",
    affix: "-ify",
    meaning: "to make, to cause",
    examples: [
      {
        word: "classify",
        breakdown: "class + ify",
        meaning: "to make into classes",
      },
      {
        word: "beautify",
        breakdown: "beauty + fy",
        meaning: "to make beautiful",
      },
      {
        word: "simplify",
        breakdown: "simple + ify",
        meaning: "to make simple",
      },
      { word: "justify", breakdown: "just + ify", meaning: "to make just" },
    ],
  },
  {
    id: "suf-046",
    type: "Suffix",
    affix: "-en",
    meaning: "to make, to become",
    examples: [
      {
        word: "strengthen",
        breakdown: "strength + en",
        meaning: "to make strong",
      },
      { word: "broaden", breakdown: "broad + en", meaning: "to make broad" },
      { word: "darken", breakdown: "dark + en", meaning: "to become dark" },
      { word: "widen", breakdown: "wide + en", meaning: "to make wide" },
    ],
  },
  {
    id: "suf-047",
    type: "Suffix",
    affix: "-ate",
    meaning: "to make, to cause",
    examples: [
      {
        word: "activate",
        breakdown: "active + ate",
        meaning: "to make active",
      },
      { word: "decorate", breakdown: "decor + ate", meaning: "to add decor" },
      { word: "celebrate", breakdown: "celebr + ate", meaning: "to honor" },
      { word: "educate", breakdown: "educ + ate", meaning: "to bring up" },
    ],
  },

  // Comparative/Superlative suffixes
  {
    id: "suf-048",
    type: "Suffix",
    affix: "-er",
    meaning: "more (comparative)",
    examples: [
      { word: "bigger", breakdown: "big + er", meaning: "more big" },
      { word: "faster", breakdown: "fast + er", meaning: "more fast" },
      { word: "happier", breakdown: "happy + er", meaning: "more happy" },
      { word: "stronger", breakdown: "strong + er", meaning: "more strong" },
    ],
  },
  {
    id: "suf-049",
    type: "Suffix",
    affix: "-est",
    meaning: "most (superlative)",
    examples: [
      { word: "biggest", breakdown: "big + est", meaning: "the most big" },
      { word: "fastest", breakdown: "fast + est", meaning: "the most fast" },
      { word: "happiest", breakdown: "happy + est", meaning: "the most happy" },
      {
        word: "strongest",
        breakdown: "strong + est",
        meaning: "the most strong",
      },
    ],
  },

  // Diminutive suffixes
  {
    id: "suf-050",
    type: "Suffix",
    affix: "-let",
    meaning: "small, little",
    examples: [
      { word: "booklet", breakdown: "book + let", meaning: "small book" },
      { word: "piglet", breakdown: "pig + let", meaning: "small pig" },
      { word: "leaflet", breakdown: "leaf + let", meaning: "small leaf" },
      {
        word: "starlet",
        breakdown: "star + let",
        meaning: "small star (young actress)",
      },
    ],
  },
  {
    id: "suf-051",
    type: "Suffix",
    affix: "-ling",
    meaning: "small, young",
    examples: [
      { word: "duckling", breakdown: "duck + ling", meaning: "young duck" },
      { word: "gosling", breakdown: "goose + ling", meaning: "young goose" },
      { word: "sapling", breakdown: "sap + ling", meaning: "young tree" },
      {
        word: "underling",
        breakdown: "under + ling",
        meaning: "person of lower rank",
      },
    ],
  },
  {
    id: "suf-052",
    type: "Suffix",
    affix: "-ette",
    meaning: "small, female version",
    examples: [
      { word: "cigarette", breakdown: "cigar + ette", meaning: "small cigar" },
      {
        word: "kitchenette",
        breakdown: "kitchen + ette",
        meaning: "small kitchen",
      },
      { word: "usherette", breakdown: "usher + ette", meaning: "female usher" },
      {
        word: "dinette",
        breakdown: "dine + ette",
        meaning: "small dining area",
      },
    ],
  },
  {
    id: "suf-053",
    type: "Suffix",
    affix: "-y",
    meaning: "little, affectionate",
    examples: [
      { word: "kitty", breakdown: "kit + ty", meaning: "little cat" },
      { word: "doggy", breakdown: "dog + gy", meaning: "little dog" },
      { word: "daddy", breakdown: "dad + dy", meaning: "affectionate father" },
      { word: "mommy", breakdown: "mom + my", meaning: "affectionate mother" },
    ],
  },

  // Verb tense suffixes
  {
    id: "suf-054",
    type: "Suffix",
    affix: "-ing",
    meaning: "present participle / action happening now",
    examples: [
      { word: "running", breakdown: "run + ing", meaning: "running right now" },
      { word: "eating", breakdown: "eat + ing", meaning: "eating right now" },
      {
        word: "sleeping",
        breakdown: "sleep + ing",
        meaning: "sleeping right now",
      },
      {
        word: "thinking",
        breakdown: "think + ing",
        meaning: "thinking right now",
      },
    ],
  },
  {
    id: "suf-055",
    type: "Suffix",
    affix: "-ed",
    meaning: "past tense",
    examples: [
      { word: "walked", breakdown: "walk + ed", meaning: "walked in the past" },
      { word: "jumped", breakdown: "jump + ed", meaning: "jumped in the past" },
      { word: "played", breakdown: "play + ed", meaning: "played in the past" },
      { word: "cooked", breakdown: "cook + ed", meaning: "cooked in the past" },
    ],
  },
  {
    id: "suf-056",
    type: "Suffix",
    affix: "-s",
    meaning: "third person singular / plural",
    examples: [
      { word: "runs", breakdown: "run + s", meaning: "he/she/it runs" },
      { word: "eats", breakdown: "eat + s", meaning: "he/she/it eats" },
      { word: "plays", breakdown: "play + s", meaning: "he/she/it plays" },
      { word: "works", breakdown: "work + s", meaning: "he/she/it works" },
    ],
  },
];
