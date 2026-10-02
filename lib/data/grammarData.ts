// data/grammarData.ts

import { GrammarTopic, PartOfSpeech } from "../types/grammar";

export const partsOfSpeechData: PartOfSpeech[] = [
  // ========== NOUNS ==========
  {
    id: "noun-001",
    category: "Noun",
    name: "Common Nouns",
    definition: "General names for people, places, things, or ideas.",
    types: [
      "Common",
      "Proper",
      "Abstract",
      "Concrete",
      "Collective",
      "Compound",
    ],
    examples: [
      {
        word: "teacher",
        sentence: "The teacher explained the lesson.",
        explanation: "A person",
      },
      {
        word: "city",
        sentence: "New York is a busy city.",
        explanation: "A place",
      },
      {
        word: "happiness",
        sentence: "Happiness is important.",
        explanation: "An idea/emotion",
      },
      {
        word: "table",
        sentence: "Please put the book on the table.",
        explanation: "A thing",
      },
    ],
    rules: [
      { rule: "Add -s for most plurals", example: "cat → cats" },
      {
        rule: "Add -es for words ending in s, x, z, ch, sh",
        example: "box → boxes",
      },
      { rule: "Change y to i and add -es", example: "baby → babies" },
      { rule: "Irregular plurals", example: "child → children, mouse → mice" },
    ],
  },
  {
    id: "noun-002",
    category: "Noun",
    name: "Proper Nouns",
    definition:
      "Specific names of people, places, or organizations, always capitalized.",
    examples: [
      {
        word: "John",
        sentence: "John is my best friend.",
        explanation: "Specific person",
      },
      {
        word: "London",
        sentence: "London is the capital of England.",
        explanation: "Specific place",
      },
      {
        word: "Google",
        sentence: "Google is a technology company.",
        explanation: "Specific organization",
      },
      {
        word: "Christmas",
        sentence: "Christmas is my favorite holiday.",
        explanation: "Specific holiday",
      },
    ],
  },
  {
    id: "noun-003",
    category: "Noun",
    name: "Abstract Nouns",
    definition:
      "Names for ideas, feelings, qualities, or concepts that cannot be touched.",
    examples: [
      {
        word: "love",
        sentence: "Love conquers all.",
        explanation: "Feeling/emotion",
      },
      {
        word: "freedom",
        sentence: "Freedom is precious.",
        explanation: "Concept",
      },
      {
        word: "courage",
        sentence: "She showed great courage.",
        explanation: "Quality",
      },
      {
        word: "intelligence",
        sentence: "Intelligence is not everything.",
        explanation: "Trait",
      },
    ],
  },
  {
    id: "noun-004",
    category: "Noun",
    name: "Concrete Nouns",
    definition: "Names for things that can be perceived by the five senses.",
    examples: [
      {
        word: "apple",
        sentence: "I ate a red apple.",
        explanation: "Can be seen and touched",
      },
      {
        word: "music",
        sentence: "The music was loud.",
        explanation: "Can be heard",
      },
      {
        word: "flower",
        sentence: "The flower smells wonderful.",
        explanation: "Can be seen and smelled",
      },
      {
        word: "blanket",
        sentence: "The blanket feels soft.",
        explanation: "Can be touched",
      },
    ],
  },
  {
    id: "noun-005",
    category: "Noun",
    name: "Collective Nouns",
    definition: "Names for a group of people, animals, or things.",
    examples: [
      {
        word: "team",
        sentence: "The team won the championship.",
        explanation: "Group of players",
      },
      {
        word: "flock",
        sentence: "A flock of birds flew south.",
        explanation: "Group of birds",
      },
      {
        word: "audience",
        sentence: "The audience applauded loudly.",
        explanation: "Group of listeners",
      },
      {
        word: "committee",
        sentence: "The committee made a decision.",
        explanation: "Group of officials",
      },
    ],
  },
  {
    id: "noun-006",
    category: "Noun",
    name: "Compound Nouns",
    definition: "Nouns made up of two or more words.",
    examples: [
      {
        word: "toothbrush",
        sentence: "I need a new toothbrush.",
        explanation: "tooth + brush",
      },
      {
        word: "mother-in-law",
        sentence: "My mother-in-law is visiting.",
        explanation: "hyphenated compound",
      },
      {
        word: "swimming pool",
        sentence: "The swimming pool is clean.",
        explanation: "separate words",
      },
      {
        word: "passerby",
        sentence: "A passerby helped us.",
        explanation: "combined compound",
      },
    ],
  },
  {
    id: "noun-007",
    category: "Noun",
    name: "Countable Nouns",
    definition: "Nouns that can be counted and have plural forms.",
    examples: [
      {
        word: "dog",
        sentence: "I have two dogs.",
        explanation: "Can be singular or plural",
      },
      {
        word: "chair",
        sentence: "There are five chairs.",
        explanation: "Can be counted",
      },
      {
        word: "apple",
        sentence: "She ate three apples.",
        explanation: "Uses numbers",
      },
      {
        word: "idea",
        sentence: "He had many ideas.",
        explanation: "Countable abstract noun",
      },
    ],
  },
  {
    id: "noun-008",
    category: "Noun",
    name: "Uncountable Nouns",
    definition: "Nouns that cannot be counted and don't have plural forms.",
    examples: [
      {
        word: "water",
        sentence: "Please drink some water.",
        explanation: "Cannot say 'two waters'",
      },
      {
        word: "rice",
        sentence: "We eat rice for dinner.",
        explanation: "Mass noun",
      },
      {
        word: "information",
        sentence: "That is useful information.",
        explanation: "Always singular",
      },
      {
        word: "advice",
        sentence: "Let me give you some advice.",
        explanation: "No plural form",
      },
    ],
  },
  {
    id: "noun-009",
    category: "Noun",
    name: "Possessive Nouns",
    definition: "Nouns that show ownership or possession.",
    examples: [
      {
        word: "John's",
        sentence: "John's car is red.",
        explanation: "Singular possessive",
      },
      {
        word: "parents'",
        sentence: "My parents' house is big.",
        explanation: "Plural possessive",
      },
      {
        word: "children's",
        sentence: "The children's toys are everywhere.",
        explanation: "Irregular plural possessive",
      },
      {
        word: "James's",
        sentence: "James's book is on the table.",
        explanation: "Singular ending in s",
      },
    ],
  },

  // ========== PRONOUNS ==========
  {
    id: "pron-001",
    category: "Pronoun",
    name: "Personal Pronouns",
    definition: "Pronouns that refer to specific people or things.",
    types: ["Subject", "Object", "Possessive"],
    examples: [
      {
        word: "I",
        sentence: "I am going to the store.",
        explanation: "First person singular subject",
      },
      {
        word: "you",
        sentence: "You are my friend.",
        explanation: "Second person subject",
      },
      {
        word: "he/she/it",
        sentence: "She is a doctor.",
        explanation: "Third person singular subject",
      },
      {
        word: "we",
        sentence: "We are ready.",
        explanation: "First person plural subject",
      },
      {
        word: "they",
        sentence: "They arrived late.",
        explanation: "Third person plural subject",
      },
      {
        word: "me",
        sentence: "Give me the book.",
        explanation: "First person singular object",
      },
      {
        word: "him/her/it",
        sentence: "I saw her yesterday.",
        explanation: "Third person singular object",
      },
      {
        word: "us",
        sentence: "Come with us.",
        explanation: "First person plural object",
      },
      {
        word: "them",
        sentence: "I like them.",
        explanation: "Third person plural object",
      },
    ],
  },
  {
    id: "pron-002",
    category: "Pronoun",
    name: "Possessive Pronouns",
    definition: "Pronouns that show ownership without using apostrophes.",
    examples: [
      {
        word: "mine",
        sentence: "This book is mine.",
        explanation: "Belongs to me",
      },
      {
        word: "yours",
        sentence: "Is this pen yours?",
        explanation: "Belongs to you",
      },
      {
        word: "his/hers/its",
        sentence: "The choice is hers.",
        explanation: "Belongs to him/her/it",
      },
      {
        word: "ours",
        sentence: "The victory is ours.",
        explanation: "Belongs to us",
      },
      {
        word: "theirs",
        sentence: "The house is theirs.",
        explanation: "Belongs to them",
      },
    ],
  },
  {
    id: "pron-003",
    category: "Pronoun",
    name: "Reflexive Pronouns",
    definition: "Pronouns that refer back to the subject of the sentence.",
    examples: [
      {
        word: "myself",
        sentence: "I did it myself.",
        explanation: "Refers back to 'I'",
      },
      {
        word: "yourself",
        sentence: "You should be proud of yourself.",
        explanation: "Refers back to 'you'",
      },
      {
        word: "himself/herself/itself",
        sentence: "He hurt himself.",
        explanation: "Refers back to 'he'",
      },
      {
        word: "ourselves",
        sentence: "We enjoyed ourselves.",
        explanation: "Refers back to 'we'",
      },
      {
        word: "themselves",
        sentence: "They organized themselves.",
        explanation: "Refers back to 'they'",
      },
    ],
  },
  {
    id: "pron-004",
    category: "Pronoun",
    name: "Demonstrative Pronouns",
    definition: "Pronouns that point to specific things.",
    examples: [
      {
        word: "this",
        sentence: "This is my favorite movie.",
        explanation: "Singular, near",
      },
      {
        word: "that",
        sentence: "That was a long time ago.",
        explanation: "Singular, far",
      },
      {
        word: "these",
        sentence: "These are delicious cookies.",
        explanation: "Plural, near",
      },
      {
        word: "those",
        sentence: "Those were the days.",
        explanation: "Plural, far",
      },
    ],
  },
  {
    id: "pron-005",
    category: "Pronoun",
    name: "Interrogative Pronouns",
    definition: "Pronouns used to ask questions.",
    examples: [
      {
        word: "who",
        sentence: "Who is coming to dinner?",
        explanation: "Asks about a person (subject)",
      },
      {
        word: "whom",
        sentence: "Whom did you invite?",
        explanation: "Asks about a person (object)",
      },
      {
        word: "whose",
        sentence: "Whose bag is this?",
        explanation: "Asks about possession",
      },
      {
        word: "which",
        sentence: "Which do you prefer?",
        explanation: "Asks about a choice",
      },
      {
        word: "what",
        sentence: "What is your name?",
        explanation: "Asks about things/information",
      },
    ],
  },
  {
    id: "pron-006",
    category: "Pronoun",
    name: "Relative Pronouns",
    definition: "Pronouns that introduce relative clauses.",
    examples: [
      {
        word: "who",
        sentence: "The man who called is my uncle.",
        explanation: "Refers to a person (subject)",
      },
      {
        word: "whom",
        sentence: "The woman whom I met is a doctor.",
        explanation: "Refers to a person (object)",
      },
      {
        word: "whose",
        sentence: "The boy whose bike was stolen is sad.",
        explanation: "Shows possession",
      },
      {
        word: "which",
        sentence: "The car which I bought is red.",
        explanation: "Refers to things",
      },
      {
        word: "that",
        sentence: "The book that I read was great.",
        explanation: "Refers to people or things",
      },
    ],
  },
  {
    id: "pron-007",
    category: "Pronoun",
    name: "Indefinite Pronouns",
    definition: "Pronouns that refer to non-specific people or things.",
    examples: [
      {
        word: "everyone",
        sentence: "Everyone enjoyed the party.",
        explanation: "All people",
      },
      {
        word: "someone",
        sentence: "Someone is at the door.",
        explanation: "An unknown person",
      },
      {
        word: "anyone",
        sentence: "Anyone can learn to code.",
        explanation: "Any person",
      },
      {
        word: "no one",
        sentence: "No one was home.",
        explanation: "Not a single person",
      },
      {
        word: "everything",
        sentence: "Everything is going well.",
        explanation: "All things",
      },
      {
        word: "something",
        sentence: "I have something to tell you.",
        explanation: "An unknown thing",
      },
      {
        word: "nothing",
        sentence: "Nothing is impossible.",
        explanation: "Not a single thing",
      },
      {
        word: "all",
        sentence: "All are welcome.",
        explanation: "Everyone/everything",
      },
      {
        word: "some",
        sentence: "Some have arrived.",
        explanation: "An unspecified number",
      },
      { word: "none", sentence: "None were left.", explanation: "Not any" },
    ],
  },
  {
    id: "pron-008",
    category: "Pronoun",
    name: "Reciprocal Pronouns",
    definition: "Pronouns that show mutual action or relationship.",
    examples: [
      {
        word: "each other",
        sentence: "They love each other.",
        explanation: "Two people/things",
      },
      {
        word: "one another",
        sentence: "The team members helped one another.",
        explanation: "More than two people/things",
      },
    ],
  },

  // ========== VERBS ==========
  {
    id: "verb-001",
    category: "Verb",
    name: "Action Verbs",
    definition: "Verbs that express physical or mental action.",
    types: ["Transitive", "Intransitive", "Dynamic", "Stative"],
    examples: [
      {
        word: "run",
        sentence: "She runs every morning.",
        explanation: "Physical action",
      },
      {
        word: "think",
        sentence: "I think about you often.",
        explanation: "Mental action",
      },
      {
        word: "write",
        sentence: "He writes beautiful poems.",
        explanation: "Physical action",
      },
      {
        word: "believe",
        sentence: "They believe in miracles.",
        explanation: "Mental action",
      },
    ],
    rules: [
      { rule: "Add -s for third person singular", example: "run → runs" },
      { rule: "Add -ing for continuous tenses", example: "run → running" },
      { rule: "Add -ed for past tense (regular)", example: "walk → walked" },
    ],
  },
  {
    id: "verb-002",
    category: "Verb",
    name: "Linking Verbs",
    definition: "Verbs that connect the subject to a subject complement.",
    examples: [
      {
        word: "am/is/are",
        sentence: "She is a teacher.",
        explanation: "State of being",
      },
      {
        word: "become",
        sentence: "He became a doctor.",
        explanation: "Change of state",
      },
      { word: "seem", sentence: "You seem tired.", explanation: "Appearance" },
      {
        word: "appear",
        sentence: "It appears difficult.",
        explanation: "Appearance",
      },
      { word: "feel", sentence: "I feel happy.", explanation: "Sensation" },
      {
        word: "look",
        sentence: "You look beautiful.",
        explanation: "Appearance",
      },
      {
        word: "smell",
        sentence: "The flower smells sweet.",
        explanation: "Sensation",
      },
      {
        word: "taste",
        sentence: "The soup tastes good.",
        explanation: "Sensation",
      },
      {
        word: "sound",
        sentence: "That sounds interesting.",
        explanation: "Sensation",
      },
    ],
  },
  {
    id: "verb-003",
    category: "Verb",
    name: "Auxiliary Verbs (Helping Verbs)",
    definition: "Verbs that help the main verb express tense, mood, or voice.",
    types: ["Primary auxiliaries", "Modal auxiliaries"],
    examples: [
      {
        word: "be (am/is/are/was/were)",
        sentence: "I am working.",
        explanation: "Forms continuous tenses",
      },
      {
        word: "have (has/have/had)",
        sentence: "She has finished.",
        explanation: "Forms perfect tenses",
      },
      {
        word: "do (do/does/did)",
        sentence: "Do you like coffee?",
        explanation: "Forms questions and negatives",
      },
      {
        word: "will",
        sentence: "I will call you.",
        explanation: "Forms future tense",
      },
      {
        word: "can",
        sentence: "She can swim.",
        explanation: "Expresses ability",
      },
      {
        word: "could",
        sentence: "I could help you.",
        explanation: "Expresses possibility",
      },
      {
        word: "may",
        sentence: "May I come in?",
        explanation: "Expresses permission",
      },
      {
        word: "might",
        sentence: "It might rain.",
        explanation: "Expresses possibility",
      },
      {
        word: "must",
        sentence: "You must study.",
        explanation: "Expresses obligation",
      },
      {
        word: "should",
        sentence: "You should exercise.",
        explanation: "Expresses advice",
      },
      {
        word: "would",
        sentence: "I would like tea.",
        explanation: "Expresses preference",
      },
    ],
  },
  {
    id: "verb-004",
    category: "Verb",
    name: "Modal Verbs",
    definition:
      "Auxiliary verbs that express necessity, possibility, permission, or ability.",
    examples: [
      {
        word: "can",
        sentence: "I can speak three languages.",
        explanation: "Ability",
      },
      {
        word: "could",
        sentence: "Could you help me?",
        explanation: "Polite request",
      },
      {
        word: "may",
        sentence: "May I leave early?",
        explanation: "Permission",
      },
      {
        word: "might",
        sentence: "We might go to the beach.",
        explanation: "Possibility",
      },
      {
        word: "must",
        sentence: "You must wear a seatbelt.",
        explanation: "Necessity",
      },
      {
        word: "shall",
        sentence: "I shall return.",
        explanation: "Future intention",
      },
      {
        word: "should",
        sentence: "You should eat healthy.",
        explanation: "Advice",
      },
      {
        word: "will",
        sentence: "I will help you.",
        explanation: "Future promise",
      },
      {
        word: "would",
        sentence: "Would you like some tea?",
        explanation: "Polite offer",
      },
    ],
  },
  {
    id: "verb-005",
    category: "Verb",
    name: "Transitive Verbs",
    definition: "Verbs that require a direct object to complete their meaning.",
    examples: [
      {
        word: "eat",
        sentence: "She eats an apple.",
        explanation: "Apple is the direct object",
      },
      {
        word: "read",
        sentence: "I read a book.",
        explanation: "Book is the direct object",
      },
      {
        word: "buy",
        sentence: "He bought a car.",
        explanation: "Car is the direct object",
      },
      {
        word: "love",
        sentence: "They love music.",
        explanation: "Music is the direct object",
      },
    ],
  },
  {
    id: "verb-006",
    category: "Verb",
    name: "Intransitive Verbs",
    definition: "Verbs that do not require a direct object.",
    examples: [
      {
        word: "sleep",
        sentence: "The baby sleeps.",
        explanation: "No object needed",
      },
      {
        word: "arrive",
        sentence: "They arrived late.",
        explanation: "Complete meaning alone",
      },
      {
        word: "cry",
        sentence: "She cried loudly.",
        explanation: "No object required",
      },
      {
        word: "exist",
        sentence: "Dinosaurs no longer exist.",
        explanation: "Complete intransitive",
      },
    ],
  },
  {
    id: "verb-007",
    category: "Verb",
    name: "Regular Verbs",
    definition: "Verbs that form past tense by adding -ed.",
    examples: [
      {
        word: "walk",
        sentence: "I walked to school yesterday.",
        explanation: "walk + ed",
      },
      {
        word: "play",
        sentence: "She played the piano.",
        explanation: "play + ed",
      },
      {
        word: "study",
        sentence: "He studied all night.",
        explanation: "study → studied",
      },
      {
        word: "stop",
        sentence: "The rain stopped.",
        explanation: "stop → stopped",
      },
    ],
  },
  {
    id: "verb-008",
    category: "Verb",
    name: "Irregular Verbs",
    definition: "Verbs that change form in unpredictable ways for past tense.",
    examples: [
      {
        word: "go",
        sentence: "I went to the store.",
        explanation: "go → went → gone",
      },
      {
        word: "eat",
        sentence: "She ate breakfast.",
        explanation: "eat → ate → eaten",
      },
      {
        word: "see",
        sentence: "I saw a movie.",
        explanation: "see → saw → seen",
      },
      {
        word: "take",
        sentence: "He took the bus.",
        explanation: "take → took → taken",
      },
      {
        word: "write",
        sentence: "She wrote a letter.",
        explanation: "write → wrote → written",
      },
    ],
  },
  {
    id: "verb-009",
    category: "Verb",
    name: "Phrasal Verbs",
    definition:
      "Verbs combined with prepositions or adverbs to create new meanings.",
    examples: [
      {
        word: "give up",
        sentence: "Don't give up on your dreams.",
        explanation: "quit/stop trying",
      },
      {
        word: "look after",
        sentence: "Can you look after my dog?",
        explanation: "take care of",
      },
      {
        word: "run into",
        sentence: "I ran into an old friend.",
        explanation: "meet unexpectedly",
      },
      {
        word: "turn off",
        sentence: "Please turn off the lights.",
        explanation: "switch off",
      },
      {
        word: "get along",
        sentence: "They get along well.",
        explanation: "have a good relationship",
      },
    ],
  },
  {
    id: "verb-010",
    category: "Verb",
    name: "Verb Tenses - Present",
    definition:
      "Verbs in present tense show actions happening now or regularly.",
    types: [
      "Simple Present",
      "Present Continuous",
      "Present Perfect",
      "Present Perfect Continuous",
    ],
    examples: [
      {
        word: "works",
        sentence: "She works at a bank.",
        explanation: "Simple present - regular action",
      },
      {
        word: "is working",
        sentence: "She is working right now.",
        explanation: "Present continuous - happening now",
      },
      {
        word: "has worked",
        sentence: "She has worked here for 5 years.",
        explanation: "Present perfect - from past to present",
      },
      {
        word: "has been working",
        sentence: "She has been working all day.",
        explanation: "Present perfect continuous - ongoing",
      },
    ],
  },
  {
    id: "verb-011",
    category: "Verb",
    name: "Verb Tenses - Past",
    definition: "Verbs in past tense show actions that happened before now.",
    types: [
      "Simple Past",
      "Past Continuous",
      "Past Perfect",
      "Past Perfect Continuous",
    ],
    examples: [
      {
        word: "worked",
        sentence: "She worked yesterday.",
        explanation: "Simple past - completed action",
      },
      {
        word: "was working",
        sentence: "She was working when I called.",
        explanation: "Past continuous - ongoing in past",
      },
      {
        word: "had worked",
        sentence: "She had worked before she left.",
        explanation: "Past perfect - earlier past",
      },
      {
        word: "had been working",
        sentence: "She had been working for hours.",
        explanation: "Past perfect continuous - ongoing earlier",
      },
    ],
  },
  {
    id: "verb-012",
    category: "Verb",
    name: "Verb Tenses - Future",
    definition: "Verbs in future tense show actions that will happen later.",
    types: [
      "Simple Future",
      "Future Continuous",
      "Future Perfect",
      "Future Perfect Continuous",
    ],
    examples: [
      {
        word: "will work",
        sentence: "She will work tomorrow.",
        explanation: "Simple future - future action",
      },
      {
        word: "will be working",
        sentence: "She will be working at 5 PM.",
        explanation: "Future continuous - ongoing in future",
      },
      {
        word: "will have worked",
        sentence: "She will have worked for 10 years.",
        explanation: "Future perfect - completed by future time",
      },
      {
        word: "will have been working",
        sentence: "She will have been working all day.",
        explanation: "Future perfect continuous - ongoing until future",
      },
    ],
  },

  // ========== ADJECTIVES ==========
  {
    id: "adj-001",
    category: "Adjective",
    name: "Descriptive Adjectives",
    definition:
      "Adjectives that describe qualities or characteristics of nouns.",
    types: [
      "Opinion",
      "Size",
      "Age",
      "Shape",
      "Color",
      "Origin",
      "Material",
      "Purpose",
    ],
    examples: [
      {
        word: "beautiful",
        sentence: "She has a beautiful smile.",
        explanation: "Opinion",
      },
      {
        word: "large",
        sentence: "They live in a large house.",
        explanation: "Size",
      },
      { word: "old", sentence: "He drives an old car.", explanation: "Age" },
      { word: "round", sentence: "The table is round.", explanation: "Shape" },
      { word: "red", sentence: "I love your red dress.", explanation: "Color" },
      {
        word: "French",
        sentence: "She speaks with a French accent.",
        explanation: "Origin",
      },
      {
        word: "wooden",
        sentence: "It's a wooden table.",
        explanation: "Material",
      },
      {
        word: "cooking",
        sentence: "I need a cooking pan.",
        explanation: "Purpose",
      },
    ],
    rules: [
      {
        rule: "Order of adjectives: Opinion → Size → Age → Shape → Color → Origin → Material → Purpose",
        example: "A beautiful large old round red French wooden cooking table",
      },
      {
        rule: "Comparative: add -er or 'more'",
        example: "tall → taller, beautiful → more beautiful",
      },
      {
        rule: "Superlative: add -est or 'most'",
        example: "tall → tallest, beautiful → most beautiful",
      },
    ],
  },
  {
    id: "adj-002",
    category: "Adjective",
    name: "Quantitative Adjectives",
    definition: "Adjectives that show how much or how many.",
    examples: [
      {
        word: "some",
        sentence: "I have some money.",
        explanation: "Indefinite quantity",
      },
      {
        word: "many",
        sentence: "Many people attended.",
        explanation: "Large number",
      },
      {
        word: "several",
        sentence: "Several students were late.",
        explanation: "More than a few",
      },
      {
        word: "enough",
        sentence: "We have enough food.",
        explanation: "Sufficient quantity",
      },
      {
        word: "all",
        sentence: "All children need love.",
        explanation: "100% of the group",
      },
      {
        word: "no",
        sentence: "There is no milk left.",
        explanation: "Zero quantity",
      },
    ],
  },
  {
    id: "adj-003",
    category: "Adjective",
    name: "Demonstrative Adjectives",
    definition: "Adjectives that point out specific nouns.",
    examples: [
      {
        word: "this",
        sentence: "This book is interesting.",
        explanation: "Singular, near",
      },
      {
        word: "that",
        sentence: "That building is tall.",
        explanation: "Singular, far",
      },
      {
        word: "these",
        sentence: "These cookies are delicious.",
        explanation: "Plural, near",
      },
      {
        word: "those",
        sentence: "Those shoes are expensive.",
        explanation: "Plural, far",
      },
    ],
  },
  {
    id: "adj-004",
    category: "Adjective",
    name: "Possessive Adjectives",
    definition: "Adjectives that show ownership.",
    examples: [
      {
        word: "my",
        sentence: "This is my phone.",
        explanation: "Belongs to me",
      },
      {
        word: "your",
        sentence: "Is that your car?",
        explanation: "Belongs to you",
      },
      {
        word: "his/her/its",
        sentence: "She lost her keys.",
        explanation: "Belongs to him/her/it",
      },
      { word: "our", sentence: "Our team won.", explanation: "Belongs to us" },
      {
        word: "their",
        sentence: "Their house is big.",
        explanation: "Belongs to them",
      },
    ],
  },
  {
    id: "adj-005",
    category: "Adjective",
    name: "Interrogative Adjectives",
    definition: "Adjectives used to ask questions about nouns.",
    examples: [
      {
        word: "which",
        sentence: "Which color do you prefer?",
        explanation: "Asks for choice",
      },
      {
        word: "what",
        sentence: "What time is it?",
        explanation: "Asks for information",
      },
      {
        word: "whose",
        sentence: "Whose jacket is this?",
        explanation: "Asks about possession",
      },
    ],
  },
  {
    id: "adj-006",
    category: "Adjective",
    name: "Comparative Adjectives",
    definition: "Adjectives used to compare two things.",
    examples: [
      {
        word: "taller",
        sentence: "John is taller than Mark.",
        explanation: "One syllable: add -er",
      },
      {
        word: "more beautiful",
        sentence: "This flower is more beautiful than that one.",
        explanation: "Long adjective: use 'more'",
      },
      {
        word: "better",
        sentence: "Your cooking is better than mine.",
        explanation: "Irregular: good → better",
      },
      {
        word: "worse",
        sentence: "His condition is worse than before.",
        explanation: "Irregular: bad → worse",
      },
    ],
  },
  {
    id: "adj-007",
    category: "Adjective",
    name: "Superlative Adjectives",
    definition: "Adjectives used to compare three or more things.",
    examples: [
      {
        word: "tallest",
        sentence: "John is the tallest in the class.",
        explanation: "One syllable: add -est",
      },
      {
        word: "most beautiful",
        sentence: "She is the most beautiful person I know.",
        explanation: "Long adjective: use 'most'",
      },
      {
        word: "best",
        sentence: "This is the best pizza in town.",
        explanation: "Irregular: good → best",
      },
      {
        word: "worst",
        sentence: "That was the worst movie ever.",
        explanation: "Irregular: bad → worst",
      },
    ],
  },
  {
    id: "adj-008",
    category: "Adjective",
    name: "Predicate Adjectives",
    definition:
      "Adjectives that come after linking verbs and describe the subject.",
    examples: [
      {
        word: "happy",
        sentence: "She feels happy.",
        explanation: "After linking verb 'feels'",
      },
      {
        word: "tired",
        sentence: "I am tired.",
        explanation: "After linking verb 'am'",
      },
      {
        word: "delicious",
        sentence: "The soup tastes delicious.",
        explanation: "After linking verb 'tastes'",
      },
      {
        word: "beautiful",
        sentence: "You look beautiful.",
        explanation: "After linking verb 'look'",
      },
    ],
  },
  {
    id: "adj-009",
    category: "Adjective",
    name: "Attributive Adjectives",
    definition: "Adjectives that come directly before nouns.",
    examples: [
      {
        word: "red",
        sentence: "I have a red car.",
        explanation: "Before the noun 'car'",
      },
      {
        word: "intelligent",
        sentence: "She is an intelligent student.",
        explanation: "Before the noun 'student'",
      },
      {
        word: "old",
        sentence: "He lives in an old house.",
        explanation: "Before the noun 'house'",
      },
      {
        word: "beautiful",
        sentence: "They have a beautiful garden.",
        explanation: "Before the noun 'garden'",
      },
    ],
  },

  // ========== ADVERBS ==========
  {
    id: "adv-001",
    category: "Adverb",
    name: "Adverbs of Manner",
    definition: "Adverbs that describe how an action is performed.",
    examples: [
      {
        word: "quickly",
        sentence: "She ran quickly to catch the bus.",
        explanation: "How she ran",
      },
      {
        word: "carefully",
        sentence: "He drove carefully on the icy road.",
        explanation: "How he drove",
      },
      {
        word: "beautifully",
        sentence: "She sings beautifully.",
        explanation: "How she sings",
      },
      {
        word: "badly",
        sentence: "He performed badly in the test.",
        explanation: "How he performed",
      },
    ],
    rules: [
      {
        rule: "Most are formed by adding -ly to adjectives",
        example: "quick → quickly, careful → carefully",
      },
      {
        rule: "Irregular forms",
        example: "good → well, fast → fast, hard → hard",
      },
      {
        rule: "Place after the verb or object",
        example: "She speaks English fluently",
      },
    ],
  },
  {
    id: "adv-002",
    category: "Adverb",
    name: "Adverbs of Time",
    definition: "Adverbs that describe when an action happens.",
    examples: [
      { word: "now", sentence: "I am busy now.", explanation: "Current time" },
      {
        word: "yesterday",
        sentence: "I saw her yesterday.",
        explanation: "Past time",
      },
      {
        word: "tomorrow",
        sentence: "We will leave tomorrow.",
        explanation: "Future time",
      },
      {
        word: "soon",
        sentence: "The movie will start soon.",
        explanation: "Near future",
      },
      {
        word: "recently",
        sentence: "I recently started a new job.",
        explanation: "Not long ago",
      },
      {
        word: "already",
        sentence: "I have already eaten.",
        explanation: "Earlier than expected",
      },
    ],
  },
  {
    id: "adv-003",
    category: "Adverb",
    name: "Adverbs of Frequency",
    definition: "Adverbs that describe how often an action happens.",
    examples: [
      {
        word: "always",
        sentence: "I always brush my teeth.",
        explanation: "100% of the time",
      },
      {
        word: "usually",
        sentence: "She usually wakes up at 7 AM.",
        explanation: "90% of the time",
      },
      {
        word: "often",
        sentence: "We often go to the park.",
        explanation: "70% of the time",
      },
      {
        word: "sometimes",
        sentence: "I sometimes eat fast food.",
        explanation: "50% of the time",
      },
      {
        word: "rarely",
        sentence: "He rarely watches TV.",
        explanation: "10% of the time",
      },
      {
        word: "never",
        sentence: "I never smoke.",
        explanation: "0% of the time",
      },
    ],
  },
  {
    id: "adv-004",
    category: "Adverb",
    name: "Adverbs of Place",
    definition: "Adverbs that describe where an action happens.",
    examples: [
      {
        word: "here",
        sentence: "Please sit here.",
        explanation: "Specific location",
      },
      {
        word: "there",
        sentence: "The store is there.",
        explanation: "Specific location",
      },
      {
        word: "everywhere",
        sentence: "I looked everywhere for my keys.",
        explanation: "All places",
      },
      {
        word: "anywhere",
        sentence: "I can't find it anywhere.",
        explanation: "Any place",
      },
      {
        word: "nowhere",
        sentence: "He is nowhere to be found.",
        explanation: "No place",
      },
      {
        word: "inside",
        sentence: "Come inside, it's cold.",
        explanation: "Internal location",
      },
      {
        word: "outside",
        sentence: "The children are playing outside.",
        explanation: "External location",
      },
    ],
  },
  {
    id: "adv-005",
    category: "Adverb",
    name: "Adverbs of Degree",
    definition:
      "Adverbs that describe the intensity or degree of an action, adjective, or another adverb.",
    examples: [
      {
        word: "very",
        sentence: "The movie was very good.",
        explanation: "High degree",
      },
      {
        word: "extremely",
        sentence: "It is extremely hot today.",
        explanation: "Very high degree",
      },
      {
        word: "quite",
        sentence: "She is quite intelligent.",
        explanation: "Moderate degree",
      },
      {
        word: "rather",
        sentence: "It's rather cold outside.",
        explanation: "To some extent",
      },
      {
        word: "somewhat",
        sentence: "I am somewhat tired.",
        explanation: "Slight degree",
      },
      {
        word: "almost",
        sentence: "I almost finished the project.",
        explanation: "Nearly",
      },
      {
        word: "completely",
        sentence: "I completely agree with you.",
        explanation: "Total degree",
      },
      {
        word: "too",
        sentence: "The coffee is too hot to drink.",
        explanation: "Excessively",
      },
    ],
  },
  {
    id: "adv-006",
    category: "Adverb",
    name: "Adverbs of Purpose/Reason",
    definition: "Adverbs that explain why an action happens.",
    examples: [
      {
        word: "therefore",
        sentence: "I think, therefore I am.",
        explanation: "As a result",
      },
      {
        word: "consequently",
        sentence: "He didn't study; consequently, he failed.",
        explanation: "Result of action",
      },
      {
        word: "thus",
        sentence: "The temperature dropped, thus creating ice.",
        explanation: "For this reason",
      },
      {
        word: "so",
        sentence: "It was raining, so I stayed home.",
        explanation: "Result",
      },
    ],
  },
  {
    id: "adv-007",
    category: "Adverb",
    name: "Interrogative Adverbs",
    definition: "Adverbs used to ask questions.",
    examples: [
      {
        word: "how",
        sentence: "How do you get to school?",
        explanation: "Asks about manner",
      },
      {
        word: "when",
        sentence: "When will you arrive?",
        explanation: "Asks about time",
      },
      {
        word: "where",
        sentence: "Where did you put my keys?",
        explanation: "Asks about place",
      },
      {
        word: "why",
        sentence: "Why are you late?",
        explanation: "Asks about reason",
      },
    ],
  },
  {
    id: "adv-008",
    category: "Adverb",
    name: "Relative Adverbs",
    definition: "Adverbs that introduce relative clauses.",
    examples: [
      {
        word: "where",
        sentence: "This is the house where I grew up.",
        explanation: "Refers to a place",
      },
      {
        word: "when",
        sentence: "I remember the day when we met.",
        explanation: "Refers to a time",
      },
      {
        word: "why",
        sentence: "That's the reason why I left.",
        explanation: "Refers to a reason",
      },
    ],
  },
  {
    id: "adv-009",
    category: "Adverb",
    name: "Comparative Adverbs",
    definition: "Adverbs used to compare how two actions are performed.",
    examples: [
      {
        word: "faster",
        sentence: "She runs faster than me.",
        explanation: "Comparative form of fast",
      },
      {
        word: "more carefully",
        sentence: "He drives more carefully than his brother.",
        explanation: "More + adverb",
      },
      {
        word: "better",
        sentence: "You speak English better than I do.",
        explanation: "Irregular: well → better",
      },
      {
        word: "worse",
        sentence: "He sings worse than his sister.",
        explanation: "Irregular: badly → worse",
      },
    ],
  },
  {
    id: "adv-010",
    category: "Adverb",
    name: "Superlative Adverbs",
    definition: "Adverbs used to compare three or more actions.",
    examples: [
      {
        word: "fastest",
        sentence: "She runs fastest in the team.",
        explanation: "Superlative of fast",
      },
      {
        word: "most carefully",
        sentence: "He drives most carefully of everyone.",
        explanation: "Most + adverb",
      },
      {
        word: "best",
        sentence: "She speaks English best in the class.",
        explanation: "Irregular: well → best",
      },
      {
        word: "worst",
        sentence: "He sings worst of all.",
        explanation: "Irregular: badly → worst",
      },
    ],
  },
  {
    id: "adv-011",
    category: "Adverb",
    name: "Conjunctive Adverbs",
    definition: "Adverbs that connect two independent clauses.",
    examples: [
      {
        word: "however",
        sentence: "I want to go; however, I'm too busy.",
        explanation: "Shows contrast",
      },
      {
        word: "therefore",
        sentence: "It's raining; therefore, we should stay home.",
        explanation: "Shows result",
      },
      {
        word: "moreover",
        sentence: "The car is expensive; moreover, it uses a lot of gas.",
        explanation: "Adds information",
      },
      {
        word: "nevertheless",
        sentence: "It was difficult; nevertheless, we succeeded.",
        explanation: "Shows contrast despite",
      },
      {
        word: "consequently",
        sentence: "He didn't study; consequently, he failed.",
        explanation: "Shows cause and effect",
      },
    ],
  },

  // ========== PREPOSITIONS ==========
  {
    id: "prep-001",
    category: "Preposition",
    name: "Prepositions of Time",
    definition: "Prepositions that show when something happens.",
    examples: [
      {
        word: "at",
        sentence: "The meeting starts at 3 PM.",
        explanation: "Specific time",
      },
      {
        word: "on",
        sentence: "I will see you on Monday.",
        explanation: "Days and dates",
      },
      {
        word: "in",
        sentence: "She was born in 1990.",
        explanation: "Months, years, seasons",
      },
      {
        word: "during",
        sentence: "I fell asleep during the movie.",
        explanation: "Throughout a period",
      },
      {
        word: "for",
        sentence: "I have lived here for 5 years.",
        explanation: "Duration",
      },
      {
        word: "since",
        sentence: "I have been waiting since 9 AM.",
        explanation: "Starting point",
      },
      {
        word: "until",
        sentence: "The store is open until 9 PM.",
        explanation: "Up to a point",
      },
      {
        word: "by",
        sentence: "Please finish by Friday.",
        explanation: "Deadline",
      },
    ],
  },
  {
    id: "prep-002",
    category: "Preposition",
    name: "Prepositions of Place",
    definition: "Prepositions that show where something is located.",
    examples: [
      {
        word: "at",
        sentence: "She is at the door.",
        explanation: "Specific point",
      },
      {
        word: "on",
        sentence: "The book is on the table.",
        explanation: "Surface",
      },
      {
        word: "in",
        sentence: "The keys are in my pocket.",
        explanation: "Enclosed space",
      },
      {
        word: "under",
        sentence: "The cat is under the bed.",
        explanation: "Below",
      },
      {
        word: "above",
        sentence: "The picture is above the sofa.",
        explanation: "Higher than",
      },
      {
        word: "between",
        sentence: "The bank is between the school and the hospital.",
        explanation: "In the middle of two",
      },
      {
        word: "among",
        sentence: "She is among friends.",
        explanation: "In a group of three or more",
      },
      {
        word: "behind",
        sentence: "The garage is behind the house.",
        explanation: "At the back of",
      },
      {
        word: "in front of",
        sentence: "The car is in front of the building.",
        explanation: "Before",
      },
      {
        word: "next to",
        sentence: "I sit next to my best friend.",
        explanation: "Beside",
      },
    ],
  },
  {
    id: "prep-003",
    category: "Preposition",
    name: "Prepositions of Movement",
    definition: "Prepositions that show direction or movement.",
    examples: [
      {
        word: "to",
        sentence: "I am going to the store.",
        explanation: "Direction",
      },
      {
        word: "into",
        sentence: "She walked into the room.",
        explanation: "Entering",
      },
      {
        word: "out of",
        sentence: "He ran out of the building.",
        explanation: "Exiting",
      },
      {
        word: "onto",
        sentence: "The cat jumped onto the table.",
        explanation: "Moving to a surface",
      },
      {
        word: "toward",
        sentence: "She walked toward me.",
        explanation: "In the direction of",
      },
      {
        word: "through",
        sentence: "We drove through the tunnel.",
        explanation: "From one side to another",
      },
      {
        word: "across",
        sentence: "He swam across the river.",
        explanation: "From one side to the other",
      },
      {
        word: "along",
        sentence: "We walked along the beach.",
        explanation: "Following a line",
      },
      {
        word: "up",
        sentence: "She climbed up the stairs.",
        explanation: "Ascending",
      },
      {
        word: "down",
        sentence: "He fell down the stairs.",
        explanation: "Descending",
      },
    ],
  },
  {
    id: "prep-004",
    category: "Preposition",
    name: "Prepositions of Manner",
    definition: "Prepositions that show how something is done.",
    examples: [
      {
        word: "by",
        sentence: "We traveled by car.",
        explanation: "Method of transport",
      },
      {
        word: "with",
        sentence: "He cut the paper with scissors.",
        explanation: "Using a tool",
      },
      {
        word: "without",
        sentence: "She left without saying goodbye.",
        explanation: "Lacking",
      },
      {
        word: "like",
        sentence: "He runs like a cheetah.",
        explanation: "Similar to",
      },
    ],
  },
  {
    id: "prep-005",
    category: "Preposition",
    name: "Prepositions of Purpose/Cause",
    definition: "Prepositions that show reason or purpose.",
    examples: [
      {
        word: "for",
        sentence: "I bought this gift for you.",
        explanation: "Purpose",
      },
      {
        word: "because of",
        sentence: "We canceled because of the rain.",
        explanation: "Reason",
      },
      {
        word: "due to",
        sentence: "The delay was due to traffic.",
        explanation: "Cause",
      },
      {
        word: "thanks to",
        sentence: "Thanks to you, we succeeded.",
        explanation: "Positive cause",
      },
    ],
  },
  {
    id: "prep-006",
    category: "Preposition",
    name: "Complex Prepositions",
    definition: "Prepositions made up of two or more words.",
    examples: [
      {
        word: "in front of",
        sentence: "The car parked in front of the house.",
        explanation: "Before",
      },
      {
        word: "next to",
        sentence: "I live next to the park.",
        explanation: "Beside",
      },
      {
        word: "according to",
        sentence: "According to the weather report, it will rain.",
        explanation: "As stated by",
      },
      {
        word: "in spite of",
        sentence: "We went out in spite of the rain.",
        explanation: "Despite",
      },
      {
        word: "on behalf of",
        sentence: "I'm speaking on behalf of my team.",
        explanation: "Representing",
      },
      {
        word: "with respect to",
        sentence: "With respect to your question, here is the answer.",
        explanation: "Regarding",
      },
    ],
  },

  // ========== CONJUNCTIONS ==========
  {
    id: "conj-001",
    category: "Conjunction",
    name: "Coordinating Conjunctions (FANBOYS)",
    definition: "Conjunctions that connect equal parts of a sentence.",
    examples: [
      {
        word: "for",
        sentence: "I'm tired, for I didn't sleep well.",
        explanation: "Reason (because)",
      },
      {
        word: "and",
        sentence: "I like coffee and tea.",
        explanation: "Addition",
      },
      {
        word: "nor",
        sentence: "He doesn't eat meat, nor does he eat fish.",
        explanation: "Negative addition",
      },
      {
        word: "but",
        sentence: "She is smart but lazy.",
        explanation: "Contrast",
      },
      {
        word: "or",
        sentence: "Do you want tea or coffee?",
        explanation: "Choice",
      },
      {
        word: "yet",
        sentence: "He is poor yet happy.",
        explanation: "Contrast (surprising)",
      },
      {
        word: "so",
        sentence: "It was raining, so I stayed home.",
        explanation: "Result",
      },
    ],
  },
  {
    id: "conj-002",
    category: "Conjunction",
    name: "Subordinating Conjunctions",
    definition:
      "Conjunctions that connect an independent clause with a dependent clause.",
    examples: [
      {
        word: "because",
        sentence: "I stayed home because it was raining.",
        explanation: "Reason",
      },
      {
        word: "although",
        sentence: "Although it was cold, we went out.",
        explanation: "Contrast",
      },
      {
        word: "if",
        sentence: "If it rains, we will stay inside.",
        explanation: "Condition",
      },
      {
        word: "when",
        sentence: "Call me when you arrive.",
        explanation: "Time",
      },
      {
        word: "while",
        sentence: "I listened to music while I worked.",
        explanation: "Simultaneous time",
      },
      {
        word: "since",
        sentence: "Since you're here, let's talk.",
        explanation: "Reason",
      },
      {
        word: "unless",
        sentence: "Unless you study, you won't pass.",
        explanation: "Condition (if not)",
      },
      {
        word: "whereas",
        sentence: "I like coffee, whereas she prefers tea.",
        explanation: "Contrast",
      },
    ],
  },
  {
    id: "conj-003",
    category: "Conjunction",
    name: "Correlative Conjunctions",
    definition: "Paired conjunctions that connect equal parts.",
    examples: [
      {
        word: "both...and",
        sentence: "She is both intelligent and kind.",
        explanation: "Two qualities",
      },
      {
        word: "either...or",
        sentence: "You can either stay or go.",
        explanation: "Choice between two",
      },
      {
        word: "neither...nor",
        sentence: "He neither called nor wrote.",
        explanation: "Negative of both",
      },
      {
        word: "not only...but also",
        sentence: "She not only sings but also dances.",
        explanation: "Addition with emphasis",
      },
      {
        word: "whether...or",
        sentence: "I don't know whether to stay or leave.",
        explanation: "Alternative",
      },
      {
        word: "as...as",
        sentence: "He is as tall as his brother.",
        explanation: "Comparison",
      },
    ],
  },
  {
    id: "conj-004",
    category: "Conjunction",
    name: "Conjunctive Adverbs",
    definition:
      "Adverbs that act like conjunctions to connect independent clauses.",
    examples: [
      {
        word: "however",
        sentence: "I want to go; however, I'm too tired.",
        explanation: "Contrast",
      },
      {
        word: "therefore",
        sentence: "He studied hard; therefore, he passed.",
        explanation: "Result",
      },
      {
        word: "moreover",
        sentence: "The food is delicious; moreover, it's affordable.",
        explanation: "Addition",
      },
      {
        word: "nevertheless",
        sentence: "It was difficult; nevertheless, we succeeded.",
        explanation: "Contrast despite",
      },
      {
        word: "consequently",
        sentence: "She didn't study; consequently, she failed.",
        explanation: "Result",
      },
      {
        word: "otherwise",
        sentence: "We should leave now; otherwise, we'll be late.",
        explanation: "Alternative consequence",
      },
    ],
  },

  // ========== INTERJECTIONS ==========
  {
    id: "interj-001",
    category: "Interjection",
    name: "Interjections of Emotion",
    definition: "Words that express strong emotions or sudden feelings.",
    examples: [
      {
        word: "Wow!",
        sentence: "Wow! That's amazing!",
        explanation: "Surprise or admiration",
      },
      {
        word: "Oh!",
        sentence: "Oh! I didn't see you there.",
        explanation: "Surprise or realization",
      },
      {
        word: "Oops!",
        sentence: "Oops! I dropped my phone.",
        explanation: "Mistake or accident",
      },
      { word: "Ouch!", sentence: "Ouch! That hurts!", explanation: "Pain" },
      {
        word: "Yay!",
        sentence: "Yay! We won the game!",
        explanation: "Excitement or joy",
      },
      {
        word: "Alas!",
        sentence: "Alas, he passed away.",
        explanation: "Sorrow or regret",
      },
      {
        word: "Yuck!",
        sentence: "Yuck! This tastes terrible!",
        explanation: "Disgust",
      },
      {
        word: "Phew!",
        sentence: "Phew! That was close!",
        explanation: "Relief",
      },
    ],
  },
  {
    id: "interj-002",
    category: "Interjection",
    name: "Interjections of Greeting",
    definition: "Words used to greet or get attention.",
    examples: [
      {
        word: "Hello!",
        sentence: "Hello! How are you?",
        explanation: "Greeting",
      },
      {
        word: "Hey!",
        sentence: "Hey! Wait for me!",
        explanation: "Getting attention",
      },
      {
        word: "Hi!",
        sentence: "Hi! Nice to meet you.",
        explanation: "Informal greeting",
      },
      {
        word: "Goodbye!",
        sentence: "Goodbye! See you later!",
        explanation: "Farewell",
      },
    ],
  },
  {
    id: "interj-003",
    category: "Interjection",
    name: "Interjections of Agreement",
    definition: "Words that express agreement or affirmation.",
    examples: [
      {
        word: "Yes!",
        sentence: "Yes! I'd love to come!",
        explanation: "Agreement",
      },
      {
        word: "Yeah!",
        sentence: "Yeah! Let's do it!",
        explanation: "Informal agreement",
      },
      { word: "OK!", sentence: "OK! I'll do it.", explanation: "Acceptance" },
      {
        word: "Absolutely!",
        sentence: "Absolutely! You're right!",
        explanation: "Strong agreement",
      },
    ],
  },

  // ========== ARTICLES ==========
  {
    id: "art-001",
    category: "Article",
    name: "Definite Article",
    definition:
      "The article 'the' used to refer to specific or particular nouns.",
    examples: [
      {
        word: "the",
        sentence: "The sun is shining.",
        explanation: "Unique object",
      },
      {
        word: "the",
        sentence: "Please close the door.",
        explanation: "Specific door",
      },
      {
        word: "the",
        sentence: "She is the best student.",
        explanation: "Superlative",
      },
      { word: "the", sentence: "I love the movies.", explanation: "Category" },
    ],
  },
  {
    id: "art-002",
    category: "Article",
    name: "Indefinite Articles",
    definition:
      "The articles 'a' and 'an' used to refer to non-specific nouns.",
    examples: [
      { word: "a", sentence: "I saw a dog.", explanation: "One of many" },
      {
        word: "an",
        sentence: "She ate an apple.",
        explanation: "Before vowel sound",
      },
      { word: "a", sentence: "He is a doctor.", explanation: "Occupation" },
      {
        word: "an",
        sentence: "It's an honor.",
        explanation: "Before silent 'h'",
      },
    ],
    rules: [
      {
        rule: "Use 'a' before consonant sounds",
        example: "a cat, a house, a university (yoo-ni-ver-si-ty)",
      },
      {
        rule: "Use 'an' before vowel sounds",
        example: "an apple, an hour (silent h), an MBA (em-bee-ay)",
      },
    ],
  },
  {
    id: "art-003",
    category: "Article",
    name: "Zero Article",
    definition: "When no article is used before a noun.",
    examples: [
      {
        word: "(no article)",
        sentence: "Life is beautiful.",
        explanation: "Abstract nouns",
      },
      {
        word: "(no article)",
        sentence: "Dogs are friendly.",
        explanation: "Plural general nouns",
      },
      {
        word: "(no article)",
        sentence: "She speaks English.",
        explanation: "Languages",
      },
      {
        word: "(no article)",
        sentence: "I go to school.",
        explanation: "Institutions",
      },
    ],
  },

  // ========== DETERMINERS ==========
  {
    id: "det-001",
    category: "Determiner",
    name: "Determiners",
    definition:
      "Words that introduce nouns and provide information about quantity, possession, or specificity.",
    types: [
      "Articles",
      "Demonstratives",
      "Possessives",
      "Quantifiers",
      "Numbers",
    ],
    examples: [
      {
        word: "a/an/the",
        sentence: "A cat crossed the road.",
        explanation: "Articles",
      },
      {
        word: "this/that/these/those",
        sentence: "This book is mine.",
        explanation: "Demonstratives",
      },
      {
        word: "my/your/his/her/its/our/their",
        sentence: "My phone is new.",
        explanation: "Possessives",
      },
      {
        word: "some/any/many/much/few/little",
        sentence: "I have some money.",
        explanation: "Quantifiers",
      },
      {
        word: "one/two/three/first/second",
        sentence: "Two people came.",
        explanation: "Numbers",
      },
    ],
  },
];

export const grammarTopicsData: GrammarTopic[] = [
  {
    id: "topic-001",
    title: "Sentence Structure",
    description: "Learn about the basic components of English sentences.",
    level: "Beginner",
    content:
      "A sentence must have a subject and a predicate. The subject is what the sentence is about, and the predicate tells something about the subject.",
    examples: [
      "Subject + Verb: Birds fly.",
      "Subject + Verb + Object: She reads books.",
      "Subject + Verb + Complement: He is happy.",
    ],
    exercises: [
      {
        question: "Identify the subject: 'The dog barked loudly.'",
        answer: "The dog",
      },
      {
        question: "Identify the predicate: 'The children played in the park.'",
        answer: "played in the park",
      },
    ],
  },
  {
    id: "topic-002",
    title: "Active vs. Passive Voice",
    description:
      "Understanding the difference between active and passive constructions.",
    level: "Intermediate",
    content:
      "In active voice, the subject performs the action. In passive voice, the subject receives the action.",
    examples: [
      "Active: The chef cooked the meal.",
      "Passive: The meal was cooked by the chef.",
    ],
    exercises: [
      {
        question: "Change to passive: 'The boy kicked the ball.'",
        answer: "The ball was kicked by the boy.",
      },
      {
        question: "Change to active: 'The song was sung by Maria.'",
        answer: "Maria sang the song.",
      },
    ],
  },
  {
    id: "topic-003",
    title: "Direct vs. Indirect Speech",
    description: "Learning how to report what someone said.",
    level: "Intermediate",
    content:
      "Direct speech quotes exact words. Indirect speech reports without quotation marks and often changes tenses.",
    examples: [
      "Direct: 'I am tired,' she said.",
      "Indirect: She said that she was tired.",
    ],
    exercises: [
      {
        question: "Convert to indirect: 'I will call you,' he promised.",
        answer: "He promised that he would call me.",
      },
    ],
  },
  {
    id: "topic-004",
    title: "Conditional Sentences",
    description: "Understanding 'if' clauses and their structures.",
    level: "Advanced",
    content:
      "Conditional sentences express 'if...then' situations. There are four types: zero, first, second, and third conditionals.",
    examples: [
      "Zero: If you heat ice, it melts.",
      "First: If it rains, I will stay home.",
      "Second: If I won the lottery, I would travel.",
      "Third: If she had studied, she would have passed.",
    ],
    exercises: [
      {
        question: "Complete: If I ___ (be) you, I would apologize.",
        answer: "were",
      },
      {
        question: "Complete: If she ___ (study) more, she would have passed.",
        answer: "had studied",
      },
    ],
  },
  {
    id: "topic-005",
    title: "Gerunds and Infinitives",
    description: "Learning when to use -ing forms or 'to' + verb.",
    level: "Intermediate",
    content:
      "Gerunds (-ing) act as nouns. Infinitives (to + verb) can act as nouns, adjectives, or adverbs.",
    examples: [
      "Gerund as subject: Swimming is fun.",
      "Infinitive as subject: To err is human.",
      "After certain verbs (enjoy + gerund): I enjoy reading.",
      "After certain verbs (want + infinitive): I want to read.",
    ],
    exercises: [
      {
        question: "Choose: I enjoy ___ (to swim/swimming).",
        answer: "swimming",
      },
      { question: "Choose: I want ___ (to go/going) home.", answer: "to go" },
    ],
  },
  {
    id: "topic-006",
    title: "Clauses (Independent vs. Dependent)",
    description: "Understanding different types of clauses.",
    level: "Intermediate",
    content:
      "Independent clauses can stand alone as sentences. Dependent clauses cannot stand alone and need an independent clause.",
    examples: [
      "Independent: She went home.",
      "Dependent: because she was tired",
      "Complete: She went home because she was tired.",
    ],
    exercises: [
      {
        question:
          "Identify the dependent clause: 'I'll call you when I arrive.'",
        answer: "when I arrive",
      },
    ],
  },
  {
    id: "topic-007",
    title: "Punctuation",
    description: "Mastering English punctuation rules.",
    level: "Beginner",
    content: "Punctuation marks help clarify meaning and structure in writing.",
    examples: [
      "Period: Ends a sentence.",
      "Comma: Creates pauses and separates items.",
      "Question mark: Ends a question.",
      "Exclamation mark: Shows strong emotion.",
    ],
    exercises: [
      {
        question: "Add punctuation: 'Help I'm stuck'",
        answer: "Help! I'm stuck.",
      },
    ],
  },
  {
    id: "topic-008",
    title: "Subject-Verb Agreement",
    description: "Ensuring subjects and verbs match in number.",
    level: "Beginner",
    content:
      "Singular subjects take singular verbs; plural subjects take plural verbs.",
    examples: [
      "Singular: The dog runs fast.",
      "Plural: The dogs run fast.",
      "Special: Everyone is here. (indefinite pronouns are singular)",
    ],
    exercises: [
      { question: "Correct: The team (is/are) playing well.", answer: "is" },
      {
        question: "Correct: Neither of the answers (is/are) correct.",
        answer: "is",
      },
    ],
  },
];
