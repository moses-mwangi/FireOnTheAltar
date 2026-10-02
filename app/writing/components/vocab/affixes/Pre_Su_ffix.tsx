"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Affix, affixesData } from "@/lib/types/affixes";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Affix() {
  const [affixes, setAffixes] = useState<Affix[]>(affixesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newAffix, setNewAffix] = useState({
    type: "Prefix" as "Prefix" | "Suffix",
    affix: "",
    meaning: "",
    examples: [{ word: "", breakdown: "", meaning: "" }],
  });

  const filteredPrefixes = affixes
    .filter((item) => item.type === "Prefix")
    .filter(
      (item) =>
        item.affix.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const filteredSuffixes = affixes
    .filter((item) => item.type === "Suffix")
    .filter(
      (item) =>
        item.affix.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const handleAddExample = () => {
    setNewAffix({
      ...newAffix,
      examples: [
        ...newAffix.examples,
        { word: "", breakdown: "", meaning: "" },
      ],
    });
  };

  const handleRemoveExample = (index: number) => {
    setNewAffix({
      ...newAffix,
      examples: newAffix.examples.filter((_, i) => i !== index),
    });
  };

  const handleExampleChange = (
    index: number,
    field: keyof (typeof newAffix.examples)[0],
    value: string,
  ) => {
    const updatedExamples = [...newAffix.examples];
    updatedExamples[index][field] = value;
    setNewAffix({ ...newAffix, examples: updatedExamples });
  };

  const handleSubmit = () => {
    if (!newAffix.affix || !newAffix.meaning) return;

    const newId = `${newAffix.type.toLowerCase()}-${Date.now()}`;
    const affixToAdd: Affix = {
      id: newId,
      type: newAffix.type,
      affix: newAffix.affix,
      meaning: newAffix.meaning,
      examples: newAffix.examples.filter((ex) => ex.word && ex.breakdown),
    };

    setAffixes([...affixes, affixToAdd]);
    setNewAffix({
      type: "Prefix",
      affix: "",
      meaning: "",
      examples: [{ word: "", breakdown: "", meaning: "" }],
    });
    setOpenAddModal(false);
  };

  const colorBreakdown = (
    breakdown: string,
    affixType: "Prefix" | "Suffix",
  ) => {
    const parts = breakdown.split(" + ");
    if (parts.length !== 2) return breakdown;

    const affixColor =
      affixType === "Prefix" ? "text-green-600" : "text-purple-600";
    const baseColor = "text-gray-800";

    if (affixType === "Prefix") {
      return (
        <>
          <span className={`font-semibold ${affixColor}`}>{parts[0]}</span>
          <span className="text-gray-400"> + </span>
          <span className={baseColor}>{parts[1]}</span>
        </>
      );
    } else {
      return (
        <>
          <span className={baseColor}>{parts[0]}</span>
          <span className="text-gray-400"> + </span>
          <span className={`font-semibold ${affixColor}`}>{parts[1]}</span>
        </>
      );
    }
  };

  const AffixTable = ({ data, title }: { data: Affix[]; title: string }) => (
    <Card className="mb-6 overflow-hidden border-none shadow-none">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="font-semibold text-gray-700">
                {title} ({data.length})
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Meaning
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Example Words
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Breakdown
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Word Meaning
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((afx) =>
              afx.examples.map((example, index) => (
                <TableRow
                  key={`${afx.id}-${index}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {index === 0 && (
                    <>
                      <TableCell
                        rowSpan={afx.examples.length}
                        className="font-mono font-bold align-top"
                      >
                        <span
                          className={
                            afx.type === "Prefix"
                              ? "text-green-600 bg-green-50 px-2 py-1 rounded"
                              : "text-purple-600 bg-purple-50 px-2 py-1 rounded"
                          }
                        >
                          {afx.affix}
                        </span>
                      </TableCell>

                      <TableCell
                        rowSpan={afx.examples.length}
                        className="align-top"
                      >
                        {afx.meaning}
                      </TableCell>
                    </>
                  )}

                  <TableCell className="font-medium">{example.word}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {colorBreakdown(example.breakdown, afx.type)}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {example.meaning}
                  </TableCell>
                </TableRow>
              )),
            )}
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No {title.toLowerCase()} found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );

  const prefixes = affixesData.filter((afx) => afx.type === "Prefix");
  const suffixes = affixesData.filter((afx) => afx.type === "Suffix");

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold ">Prefix & Suffix Lab</h1>
            </div>

            {/* Search and Add */}
            <div className="flex gap-3 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search affixes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm w-64 focus:w-80 transition-all duration-300 border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <Button
                onClick={() => setOpenAddModal(true)}
                className="px-4 cursor-pointer py-2 text-sm bg-gradient-to-r from-green-500 to-purple-600 text-white hover:from-green-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Affix
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Card className="border-none shadow-none border-0">
          <CardContent className="p-6">
            <Tabs defaultValue="prefixes">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="prefixes">
                  Prefixes ({prefixes.length})
                </TabsTrigger>
                <TabsTrigger value="suffixes">
                  Suffixes ({suffixes.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="prefixes">
                <AffixTable data={filteredPrefixes} title="Prefixes" />
              </TabsContent>
              <TabsContent value="suffixes">
                <AffixTable data={filteredSuffixes} title="Suffixes" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* <div className="px-4 py-6">
        <AffixTable data={filteredPrefixes} title="Prefixes" />
        <AffixTable data={filteredSuffixes} title="Suffixes" />
       
      </div> */}

      {/* Add Affix Modal */}
      <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
        <DialogContent className="min-w-2xl w-full no-scrollbar max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
              Add New Affix
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-semibold">Affix Type</Label>
              <Select
                value={newAffix.type}
                onValueChange={(value: "Prefix" | "Suffix") =>
                  setNewAffix({ ...newAffix, type: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Prefix">
                    <span className="text-green-600">Prefix</span>
                  </SelectItem>
                  <SelectItem value="Suffix">
                    <span className="text-purple-600">Suffix</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-semibold">Affix</Label>
              <Input
                placeholder="e.g., un-, -ing"
                value={newAffix.affix}
                onChange={(e) =>
                  setNewAffix({ ...newAffix, affix: e.target.value })
                }
                className="mt-1 font-mono"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold">Meaning</Label>
              <Input
                placeholder="e.g., not, opposite of"
                value={newAffix.meaning}
                onChange={(e) =>
                  setNewAffix({ ...newAffix, meaning: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold">Examples</Label>
              <div className="space-y-3 mt-2">
                {newAffix.examples.map((example, idx) => (
                  <Card key={idx} className="p-3 border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs">Example {idx + 1}</Label>
                        {newAffix.examples.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveExample(idx)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Input
                        placeholder="Word (e.g., unhappy)"
                        value={example.word}
                        onChange={(e) =>
                          handleExampleChange(idx, "word", e.target.value)
                        }
                        className="text-sm"
                      />
                      <Input
                        placeholder="Breakdown (e.g., un + happy)"
                        value={example.breakdown}
                        onChange={(e) =>
                          handleExampleChange(idx, "breakdown", e.target.value)
                        }
                        className="text-sm font-mono"
                      />
                      <Input
                        placeholder="Meaning (e.g., not happy)"
                        value={example.meaning}
                        onChange={(e) =>
                          handleExampleChange(idx, "meaning", e.target.value)
                        }
                        className="text-sm"
                      />
                    </div>
                  </Card>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddExample}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Example
                </Button>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setOpenAddModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-green-500 to-purple-600 text-white hover:from-green-600 hover:to-purple-700"
              >
                Add Affix
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
////////////////////////////////////////////
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function AffixTablesWithTabs() {
// const prefixes = affixesData.filter((afx) => afx.type === "Prefix");
// const suffixes = affixesData.filter((afx) => afx.type === "Suffix");

//   const renderTableContent = (data: Affix[]) => (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableCell className="font-bold">Affix</TableCell>
//           <TableCell className="font-bold">Meaning</TableCell>
//           <TableCell className="font-bold">Base word</TableCell>
//           <TableCell className="font-bold">Derived Words</TableCell>
//           <TableCell className="font-bold">Examples</TableCell>
//         </TableRow>
//       </TableHeader>
//       {data.map((afx, idx) => (
//         <TableBody key={idx}>
//           <TableRow>
//             <TableCell className="font-mono">{afx.affix}</TableCell>
//             <TableCell>{afx.meaning}</TableCell>
//             <TableCell>{afx.base || "—"}</TableCell>
//             <TableCell>
//               {afx.examples.map((ex, i) => (
//                 <div key={i} className="font-mono">
//                   {ex.word}
//                 </div>
//               ))}
//             </TableCell>
//             <TableCell>
//               {afx.examples.map((ex, i) => (
//                 <div key={i} className="text-sm">
//                   <div>{ex.breakdown}</div>
//                   <div className="text-muted-foreground">{ex.meaning}</div>
//                 </div>
//               ))}
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       ))}
//     </Table>
//   );

//   return (
// <Card>
//   <CardContent className="p-6">
//     <Tabs defaultValue="prefixes">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="prefixes">
//           Prefixes ({prefixes.length})
//         </TabsTrigger>
//         <TabsTrigger value="suffixes">
//           Suffixes ({suffixes.length})
//         </TabsTrigger>
//       </TabsList>
//       <TabsContent value="prefixes">
//         {renderTableContent(prefixes)}
//       </TabsContent>
//       <TabsContent value="suffixes">
//         {renderTableContent(suffixes)}
//       </TabsContent>
//     </Tabs>
//   </CardContent>
// </Card>
//   );
// }

// import { CardHeader, CardTitle } from "@/components/ui/card";
// // import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";

// export type Affix = {
//   id: string;
//   type: "Prefix" | "Suffix";
//   affix: string;
//   meaning: string;
//   examples: {
//     word: string;
//     breakdown: string;
//     meaning: string;
//   }[];
//   base?: string; // Added base word field as seen in your table
// };

// // Sample data for demonstration
// const affixesData: Affix[] = [
//   {
//     id: "1",
//     type: "Prefix",
//     affix: "un-",
//     meaning: "not, opposite of",
//     base: "happy",
//     examples: [
//       { word: "unhappy", breakdown: "un + happy", meaning: "not happy" },
//       { word: "unfair", breakdown: "un + fair", meaning: "not fair" },
//     ],
//   },
//   {
//     id: "2",
//     type: "Prefix",
//     affix: "re-",
//     meaning: "again",
//     base: "write",
//     examples: [
//       { word: "rewrite", breakdown: "re + write", meaning: "write again" },
//       { word: "replay", breakdown: "re + play", meaning: "play again" },
//     ],
//   },
//   {
//     id: "3",
//     type: "Suffix",
//     affix: "-ing",
//     meaning: "present participle",
//     base: "play",
//     examples: [
//       {
//         word: "playing",
//         breakdown: "play + ing",
//         meaning: "currently playing",
//       },
//       { word: "running", breakdown: "run + ing", meaning: "currently running" },
//     ],
//   },
//   {
//     id: "4",
//     type: "Suffix",
//     affix: "-ed",
//     meaning: "past tense",
//     base: "walk",
//     examples: [
//       { word: "walked", breakdown: "walk + ed", meaning: "walked in past" },
//       { word: "jumped", breakdown: "jump + ed", meaning: "jumped in past" },
//     ],
//   },
// ];

// export default function AffixTables() {
//   // Filter data for prefixes and suffixes
//   const prefixes = affixesData.filter((afx) => afx.type === "Prefix");
//   const suffixes = affixesData.filter((afx) => afx.type === "Suffix");

//   const renderTable = (title: string, data: Affix[]) => (
//     <Card className="mb-8">
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableCell className="font-bold">
//                 {title === "Prefixes" ? "Prefix" : "Suffix"}
//               </TableCell>
//               <TableCell className="font-bold">Meaning</TableCell>
//               <TableCell className="font-bold">Base word</TableCell>
//               <TableCell className="font-bold">Derived Words</TableCell>
//               <TableCell className="font-bold">
//                 Examples (with meaning)
//               </TableCell>
//             </TableRow>
//           </TableHeader>
//           {data.map((afx, idx) => (
//             <TableBody key={idx}>
//               <TableRow>
//                 <TableCell className="font-mono">{afx.affix}</TableCell>
//                 <TableCell>{afx.meaning}</TableCell>
//                 <TableCell>{afx.base || "—"}</TableCell>
//                 <TableCell>
//                   <div className="space-y-1">
//                     {afx.examples.map((ex, i) => (
//                       <div key={i} className="font-mono">
//                         {ex.word}
//                       </div>
//                     ))}
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="space-y-2">
//                     {afx.examples.map((ex, i) => (
//                       <div key={i} className="text-sm">
//                         <div className="font-semibold">{ex.word}</div>
//                         <div className="text-muted-foreground text-xs">
//                           {ex.breakdown} → {ex.meaning}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           ))}
//         </Table>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="container mx-auto p-4">
//       {prefixes.length > 0 && renderTable("Prefixes", prefixes)}
//       {suffixes.length > 0 && renderTable("Suffixes", suffixes)}
//     </div>
//   );
// }
