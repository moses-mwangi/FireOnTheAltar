// "use client";

// import React, { useState } from "react";

// type AffixItem = {
//   id: string;
//   type: "prefix" | "suffix";
//   affix: string;
//   meaning: string;
//   examples: {
//     word: string;
//     breakdown: string;
//     meaning: string;
//   }[];
// };

// const demoAffixes: AffixItem[] = [
//   {
//     id: "1",
//     type: "prefix",
//     affix: "un-",
//     meaning: "not / opposite of",
//     examples: [
//       {
//         word: "unhappy",
//         breakdown: "un + happy",
//         meaning: "not happy",
//       },
//       {
//         word: "unknown",
//         breakdown: "un + known",
//         meaning: "not known",
//       },
//     ],
//   },
//   {
//     id: "2",
//     type: "prefix",
//     affix: "re-",
//     meaning: "again",
//     examples: [
//       {
//         word: "rewrite",
//         breakdown: "re + write",
//         meaning: "write again",
//       },
//       {
//         word: "rebuild",
//         breakdown: "re + build",
//         meaning: "build again",
//       },
//     ],
//   },
//   {
//     id: "3",
//     type: "suffix",
//     affix: "-ful",
//     meaning: "full of",
//     examples: [
//       {
//         word: "hopeful",
//         breakdown: "hope + ful",
//         meaning: "full of hope",
//       },
//       {
//         word: "joyful",
//         breakdown: "joy + ful",
//         meaning: "full of joy",
//       },
//     ],
//   },
//   {
//     id: "4",
//     type: "suffix",
//     affix: "-less",
//     meaning: "without",
//     examples: [
//       {
//         word: "hopeless",
//         breakdown: "hope + less",
//         meaning: "without hope",
//       },
//       {
//         word: "fearless",
//         breakdown: "fear + less",
//         meaning: "without fear",
//       },
//     ],
//   },
// ];

// export default function Affix() {
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState<"all" | "prefix" | "suffix">("all");
//   const [selected, setSelected] = useState<string | null>(null);

//   const filtered = demoAffixes.filter((item) => {
//     return (
//       (filter === "all" || item.type === filter) &&
//       item.affix.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Prefix & Suffix Explorer</h1>

//       {/* Controls */}
//       <div className="flex gap-3 mb-6">
//         <input
//           placeholder="Search affix..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded w-full"
//         />

//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value as any)}
//           className="border p-2 rounded"
//         >
//           <option value="all">All</option>
//           <option value="prefix">Prefix</option>
//           <option value="suffix">Suffix</option>
//         </select>
//       </div>

//       {/* Affix List */}
//       <div className="grid md:grid-cols-2 gap-4">
//         {filtered.map((item) => (
//           <div
//             key={item.id}
//             className="border rounded-lg p-4 shadow hover:shadow-lg transition"
//           >
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">{item.affix}</h2>
//               <span className="text-sm text-gray-500 capitalize">
//                 {item.type}
//               </span>
//             </div>

//             <p className="text-gray-600 mt-2">{item.meaning}</p>

//             <button
//               onClick={() => setSelected(selected === item.id ? null : item.id)}
//               className="mt-3 text-blue-600"
//             >
//               {selected === item.id ? "Hide Examples" : "Show Examples"}
//             </button>

//             {selected === item.id && (
//               <div className="mt-4 space-y-3">
//                 {item.examples.map((ex, i) => (
//                   <div key={i} className="bg-gray-100 p-3 rounded">
//                     <p className="font-semibold">{ex.word}</p>
//                     <p className="text-sm text-gray-500">{ex.breakdown}</p>
//                     <p className="text-sm">{ex.meaning}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Word Builder Demo */}
//       <div className="mt-10 p-5 border rounded-lg bg-gray-50">
//         <h2 className="text-xl font-bold mb-3">Word Builder Demo</h2>
//         <p className="text-gray-600 mb-2">Example:</p>

//         <div className="text-lg">
//           <span className="text-blue-600 font-semibold">un</span>+
//           <span className="font-semibold"> happy </span>→
//           <span className="text-green-600 font-semibold"> unhappy</span>
//         </div>

//         <p className="text-sm text-gray-500 mt-2">
//           "un-" means "not", so "unhappy" means "not happy"
//         </p>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useMemo, useState } from "react";
// import { Search, BookOpen, Sparkles, ArrowRight, Filter } from "lucide-react";

// type Affix = {
//   id: string;
//   type: "Prefix" | "Suffix";
//   affix: string;
//   meaning: string;
//   examples: {
//     word: string;
//     breakdown: string;
//     meaning: string;
//   }[];
// };

// const demoAffixes: Affix[] = [
//   {
//     id: "1",
//     type: "Prefix",
//     affix: "un-",
//     meaning: "not, opposite of",
//     examples: [
//       {
//         word: "unhappy",
//         breakdown: "un + happy",
//         meaning: "not happy",
//       },
//       {
//         word: "unfair",
//         breakdown: "un + fair",
//         meaning: "not fair",
//       },
//     ],
//   },
//   {
//     id: "2",
//     type: "Prefix",
//     affix: "re-",
//     meaning: "again",
//     examples: [
//       {
//         word: "rewrite",
//         breakdown: "re + write",
//         meaning: "write again",
//       },
//       {
//         word: "rebuild",
//         breakdown: "re + build",
//         meaning: "build again",
//       },
//     ],
//   },
//   {
//     id: "3",
//     type: "Prefix",
//     affix: "pre-",
//     meaning: "before",
//     examples: [
//       {
//         word: "preview",
//         breakdown: "pre + view",
//         meaning: "see beforehand",
//       },
//       {
//         word: "prehistoric",
//         breakdown: "pre + historic",
//         meaning: "before recorded history",
//       },
//     ],
//   },
//   {
//     id: "4",
//     type: "Prefix",
//     affix: "anti-",
//     meaning: "against",
//     examples: [
//       {
//         word: "antisocial",
//         breakdown: "anti + social",
//         meaning: "against social interaction",
//       },
//       {
//         word: "antivirus",
//         breakdown: "anti + virus",
//         meaning: "against viruses",
//       },
//     ],
//   },
//   {
//     id: "5",
//     type: "Suffix",
//     affix: "-ful",
//     meaning: "full of",
//     examples: [
//       {
//         word: "beautiful",
//         breakdown: "beauty + ful",
//         meaning: "full of beauty",
//       },
//       {
//         word: "hopeful",
//         breakdown: "hope + ful",
//         meaning: "full of hope",
//       },
//     ],
//   },
//   {
//     id: "6",
//     type: "Suffix",
//     affix: "-less",
//     meaning: "without",
//     examples: [
//       {
//         word: "hopeless",
//         breakdown: "hope + less",
//         meaning: "without hope",
//       },
//       {
//         word: "careless",
//         breakdown: "care + less",
//         meaning: "without care",
//       },
//     ],
//   },
//   {
//     id: "7",
//     type: "Suffix",
//     affix: "-er",
//     meaning: "person who performs an action",
//     examples: [
//       {
//         word: "teacher",
//         breakdown: "teach + er",
//         meaning: "one who teaches",
//       },
//       {
//         word: "runner",
//         breakdown: "run + er",
//         meaning: "one who runs",
//       },
//     ],
//   },
//   {
//     id: "8",
//     type: "Suffix",
//     affix: "-tion",
//     meaning: "act, process, state",
//     examples: [
//       {
//         word: "communication",
//         breakdown: "communicate + tion",
//         meaning: "process of communicating",
//       },
//       {
//         word: "education",
//         breakdown: "educate + tion",
//         meaning: "process of learning",
//       },
//     ],
//   },
// ];

// export default function Affix() {
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState<"All" | "Prefix" | "Suffix">("All");

//   const filteredAffixes = useMemo(() => {
//     return demoAffixes.filter((item) => {
//       const matchesSearch =
//         item.affix.toLowerCase().includes(search.toLowerCase()) ||
//         item.meaning.toLowerCase().includes(search.toLowerCase());

//       const matchesType = filter === "All" ? true : item.type === filter;

//       return matchesSearch && matchesType;
//     });
//   }, [search, filter]);

//   const prefixes = demoAffixes.filter((a) => a.type === "Prefix").length;
//   const suffixes = demoAffixes.filter((a) => a.type === "Suffix").length;

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="mx-auto max-w-7xl space-y-8">
//         {/* Hero */}
//         <div className="rounded-3xl border bg-card p-8 shadow-sm">
//           <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//             <div>
//               <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
//                 <Sparkles className="h-4 w-4" />
//                 Word Building System
//               </div>

//               <h1 className="text-4xl font-bold">
//                 Prefixes & Suffixes Explorer
//               </h1>

//               <p className="mt-3 max-w-2xl text-muted-foreground">
//                 Learn how words are formed by understanding prefixes and
//                 suffixes. Discover meanings, breakdowns, and examples.
//               </p>
//             </div>

//             <BookOpen className="h-24 w-24 text-primary opacity-80" />
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid gap-4 md:grid-cols-3">
//           <div className="rounded-2xl border p-6">
//             <h3 className="text-sm text-muted-foreground">Total Affixes</h3>
//             <p className="mt-2 text-3xl font-bold">{demoAffixes.length}</p>
//           </div>

//           <div className="rounded-2xl border p-6">
//             <h3 className="text-sm text-muted-foreground">Prefixes</h3>
//             <p className="mt-2 text-3xl font-bold">{prefixes}</p>
//           </div>

//           <div className="rounded-2xl border p-6">
//             <h3 className="text-sm text-muted-foreground">Suffixes</h3>
//             <p className="mt-2 text-3xl font-bold">{suffixes}</p>
//           </div>
//         </div>

//         {/* Search & Filters */}
//         <div className="rounded-2xl border p-4">
//           <div className="flex flex-col gap-4 lg:flex-row">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search affix or meaning..."
//                 className="w-full rounded-xl border bg-background py-2 pl-10 pr-4 outline-none"
//               />
//             </div>

//             <div className="flex gap-2">
//               {["All", "Prefix", "Suffix"].map((item) => (
//                 <button
//                   key={item}
//                   onClick={() => setFilter(item as "All" | "Prefix" | "Suffix")}
//                   className={`rounded-xl px-4 py-2 transition ${
//                     filter === item
//                       ? "bg-primary text-primary-foreground"
//                       : "border"
//                   }`}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Affixes Grid */}
//         <div className="grid gap-6 lg:grid-cols-2">
//           {filteredAffixes.map((item) => (
//             <div
//               key={item.id}
//               className="rounded-3xl border bg-card p-6 transition hover:shadow-lg"
//             >
//               <div className="mb-5 flex items-center justify-between">
//                 <div>
//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-medium ${
//                       item.type === "Prefix"
//                         ? "bg-blue-100 text-blue-700"
//                         : "bg-green-100 text-green-700"
//                     }`}
//                   >
//                     {item.type}
//                   </span>

//                   <h2 className="mt-3 text-3xl font-bold">{item.affix}</h2>
//                 </div>

//                 <Filter className="h-5 w-5 text-muted-foreground" />
//               </div>

//               <p className="mb-6 text-muted-foreground">{item.meaning}</p>

//               <div className="space-y-4">
//                 {item.examples.map((example, index) => (
//                   <div key={index} className="rounded-2xl bg-muted/40 p-4">
//                     <div className="mb-2 flex items-center gap-2">
//                       <h4 className="font-semibold">{example.word}</h4>
//                       <ArrowRight className="h-4 w-4" />
//                     </div>

//                     <p className="text-sm font-medium">{example.breakdown}</p>

//                     <p className="mt-1 text-sm text-muted-foreground">
//                       {example.meaning}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredAffixes.length === 0 && (
//           <div className="rounded-2xl border p-10 text-center">
//             <h3 className="text-lg font-semibold">No affixes found</h3>
//             <p className="text-muted-foreground">
//               Try a different search term.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

export default function Affix() {
  const [baseWord, setBaseWord] = useState("play");
  const [prefix, setPrefix] = useState("re");
  const [suffix, setSuffix] = useState("ing");
  const [customWords, setCustomWords] = useState([
    {
      id: 1,
      base: "happy",
      prefix: "un",
      suffix: "ness",
      result: "unhappiness",
    },
    {
      id: 2,
      base: "understand",
      prefix: "mis",
      suffix: "ing",
      result: "misunderstanding",
    },
    {
      id: 3,
      base: "possible",
      prefix: "im",
      suffix: "ity",
      result: "impossibility",
    },
  ]);

  // Apply prefix and suffix to a word
  const applyAffix = (word, pre = "", suf = "") => {
    return `${pre}${word}${suf}`;
  };

  // Add new custom word
  const addCustomWord = (base, pre, suf) => {
    setCustomWords([
      ...customWords,
      {
        id: Date.now(),
        base: base,
        prefix: pre,
        suffix: suf,
        result: applyAffix(base, pre, suf),
      },
    ]);
  };

  // Common prefixes and suffixes lists
  const commonPrefixes = [
    "re",
    "un",
    "pre",
    "post",
    "anti",
    "dis",
    "mis",
    "over",
    "under",
    "sub",
    "super",
    "inter",
  ];
  const commonSuffixes = [
    "ing",
    "ed",
    "er",
    "est",
    "tion",
    "ness",
    "less",
    "ful",
    "able",
    "ive",
    "ous",
    "ly",
  ];

  return (
    <div className="bg-white shadow space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex justify-between items-center w-full px-4 pt-4">
          <h1 className="text-xl font-bold flex items-center justify-center gap-2">
            Prefix & Suffix Lab
            <span className="text-sm text-purple-600">(0)</span>
          </h1>
          {/* Search Input */}
          <div className="flex gap-2 items-center">
            <Input
              type="text"
              placeholder="Search affixes...."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 text-sm w-52 focus:w-64 focus:ring-0 focus:outline-0 focus:border-0 focus:shadow-none transition-all"
            />
            <Button
              // onClick={() => setOpenAddModal(true)}
              className="px-3 cursor-pointer h-[31px] text-sm bg-blue-500 text-white hover:bg-blue-600 transition-all"
            >
              + Add Affix
            </Button>
          </div>
        </div>
      </div>

      <Separator />
      {/* Interactive Word Builder */}
      <div className="space-y-4  px-4 pb-4 p-6mb-8">
        <h2 className="text-xl font-bold mb-4">🔨 Word Builder</h2>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Prefix</label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="e.g., re, un, pre"
              className="w-full border rounded px-3 py-2"
            />
            <div className="text-xs text-gray-500 mt-1">
              Common: {commonPrefixes.slice(0, 6).join(", ")}...
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Base Word</label>
            <input
              type="text"
              value={baseWord}
              onChange={(e) => setBaseWord(e.target.value)}
              placeholder="Enter a word"
              className="w-full border rounded px-3 py-2 font-bold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Suffix</label>
            <input
              type="text"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              placeholder="e.g., ing, ed, tion"
              className="w-full border rounded px-3 py-2"
            />
            <div className="text-xs text-gray-500 mt-1">
              Common: {commonSuffixes.slice(0, 6).join(", ")}...
            </div>
          </div>
        </div>

        {/* Result Display */}
        <div className="bg-white rounded-lg p-6 text-center">
          <div className="text-sm text-gray-500 mb-2">Result:</div>
          <div className="text-4xl font-mono font-bold text-blue-600">
            {prefix && <span className="text-green-600">{prefix}</span>}
            <span className="text-gray-900">{baseWord}</span>
            {suffix && <span className="text-purple-600">{suffix}</span>}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            <span className="text-green-600">← Prefix</span> + Base +
            <span className="text-purple-600"> Suffix →</span>
          </div>
        </div>
      </div>

      {/* Examples Gallery */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">📚 Real Word Examples</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Prefix Examples */}
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-green-600 mb-3">
              🔤 Common Prefixes
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>re + write =</span>
                <span className="font-mono font-bold">
                  <span className="text-green-600">re</span>write
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>un + happy =</span>
                <span className="font-mono font-bold">
                  <span className="text-green-600">un</span>happy
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>pre + view =</span>
                <span className="font-mono font-bold">
                  <span className="text-green-600">pre</span>view
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>mis + understand =</span>
                <span className="font-mono font-bold">
                  <span className="text-green-600">mis</span>understand
                </span>
              </div>
            </div>
          </div>

          {/* Suffix Examples */}
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-purple-600 mb-3">
              🔤 Common Suffixes
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>play + ing =</span>
                <span className="font-mono font-bold">
                  play<span className="text-purple-600">ing</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>teach + er =</span>
                <span className="font-mono font-bold">
                  teach<span className="text-purple-600">er</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>beauty + ful =</span>
                <span className="font-mono font-bold">
                  beauty<span className="text-purple-600">ful</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>hope + less =</span>
                <span className="font-mono font-bold">
                  hope<span className="text-purple-600">less</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Words List */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">⭐ Your Custom Words</h2>
        <div className="space-y-2">
          {customWords.map((word) => (
            <div
              key={word.id}
              className="bg-gray-50 rounded-lg p-3 flex justify-between items-center hover:bg-gray-100"
            >
              <div>
                <span className="text-sm text-gray-500">
                  {word.prefix && (
                    <span className="text-green-600">{word.prefix}</span>
                  )}
                  <span className="font-medium">{word.base}</span>
                  {word.suffix && (
                    <span className="text-purple-600">{word.suffix}</span>
                  )}
                </span>
                <span className="mx-2">→</span>
                <span className="font-mono font-bold">
                  {word.prefix && (
                    <span className="text-green-600">{word.prefix}</span>
                  )}
                  <span>{word.base}</span>
                  {word.suffix && (
                    <span className="text-purple-600">{word.suffix}</span>
                  )}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                {word.prefix ? "Prefix" : "No prefix"} + Base +{" "}
                {word.suffix ? "Suffix" : "No suffix"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Word Form */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold mb-3">➕ Add New Word Combination</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <input
            type="text"
            id="newPrefix"
            placeholder="Prefix (e.g., anti)"
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            id="newBase"
            placeholder="Base word (e.g., social)"
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            id="newSuffix"
            placeholder="Suffix (e.g., ism)"
            className="border rounded px-3 py-2"
          />
        </div>
        <button
          onClick={() => {
            const prefix = document.getElementById("newPrefix").value;
            const base = document.getElementById("newBase").value;
            const suffix = document.getElementById("newSuffix").value;
            if (base) {
              addCustomWord(base, prefix, suffix);
              document.getElementById("newPrefix").value = "";
              document.getElementById("newBase").value = "";
              document.getElementById("newSuffix").value = "";
            }
          }}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Word
        </button>
      </div>
    </div>
  );
}
