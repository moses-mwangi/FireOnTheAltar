"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Copy,
  Link,
  X,
  Eye,
  BookOpen,
  Layers,
} from "lucide-react";
import { Word } from "../types";

// shadcn imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

interface Props {
  words: Word[];
  onDeleteWord: (familyId: string, wordId: string) => void;
  families: { id: string; name: string }[];
}

export default function AllWordsView({ words, onDeleteWord, families }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFamily, setFilterFamily] = useState<string>("all");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleExpand = (wordId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(wordId)) {
      newExpanded.delete(wordId);
    } else {
      newExpanded.add(wordId);
    }
    setExpandedRows(newExpanded);
  };

  const getFamilyName = (wordId: string) => {
    for (const family of families) {
      if (wordId.startsWith(family.id)) {
        return family.name;
      }
    }
    return "Unknown";
  };

  const getFamilyId = (wordId: string) => {
    for (const family of families) {
      if (wordId.startsWith(family.id)) {
        return family.id;
      }
    }
    return "";
  };

  const filteredWords = words
    .filter((word) => {
      const matchesSearch =
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.wordFamily.some((wf) =>
          wf.word.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesFamily =
        filterFamily === "all" || getFamilyName(word.id) === filterFamily;

      return matchesSearch && matchesFamily;
    })
    .sort((a, b) => a.word.localeCompare(b.word));

  const familyNames = ["all", ...new Set(families.map((f) => f.name))];

  return (
    <div className="space-y-6">
      {/* Header Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{words.length}</CardTitle>
            <CardDescription className="text-purple-100">
              Total Words
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{families.length}</CardTitle>
            <CardDescription className="text-blue-100">
              Synonym Families
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {words.reduce((sum, w) => sum + w.wordFamily.length, 0)}
            </CardTitle>
            <CardDescription className="text-emerald-100">
              Word Family Members
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-rose-500 to-rose-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {words.reduce((sum, w) => sum + (w.synonyms?.length || 0), 0)}
            </CardTitle>
            <CardDescription className="text-rose-100">
              Synonyms
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search words, meanings, or family members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[200px] justify-between">
                  {filterFamily === "all"
                    ? "📚 All Families"
                    : `🏷️ ${filterFamily}`}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {familyNames.map((name) => (
                  <DropdownMenuItem
                    key={name}
                    onClick={() => setFilterFamily(name)}
                  >
                    {name === "all" ? "📚 All Families" : `🏷️ ${name}`}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredWords.length} of {words.length} words
        </p>
      </div>

      {/* Main Table */}
      {filteredWords.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm
                ? "No words match your search"
                : "No words yet. Add some vocabulary!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                  <TableHead className="w-[200px] font-semibold">
                    Word
                  </TableHead>
                  <TableHead className="min-w-[300px] font-semibold">
                    Meaning & Example
                  </TableHead>
                  <TableHead className="w-[180px] font-semibold">
                    Family Group
                  </TableHead>
                  <TableHead className="w-[150px] font-semibold">
                    Details
                  </TableHead>
                  <TableHead className="w-[80px] text-right font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWords.map((word) => {
                  const isExpanded = expandedRows.has(word.id);
                  const familyName = getFamilyName(word.id);

                  return (
                    <>
                      {/* Main Row */}
                      <TableRow
                        key={word.id}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        onClick={() => toggleExpand(word.id)}
                      >
                        <TableCell className="font-medium align-top py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-800 dark:text-white">
                              {word.word}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="py-4 align-top">
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {word.description}
                          </p>
                          {word.example && (
                            <p className="text-xs text-gray-500 dark:text-gray-500 italic mt-1">
                              &quot;{word.example}&quot;
                            </p>
                          )}
                        </TableCell>

                        <TableCell className="py-4 align-top">
                          <Badge
                            variant="secondary"
                            className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                          >
                            {familyName}
                          </Badge>
                        </TableCell>

                        <TableCell className="py-4 align-top">
                          <div className="flex flex-wrap gap-1">
                            {word.wordFamily.length > 0 && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge variant="outline" className="gap-1">
                                      <Copy className="h-3 w-3" />
                                      {word.wordFamily.length}
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Word family members</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {word.synonyms && word.synonyms.length > 0 && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge variant="outline" className="gap-1">
                                      <Link className="h-3 w-3" />
                                      {word.synonyms.length}
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Synonyms</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="py-4 text-right align-top">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              const familyId = getFamilyId(word.id);
                              onDeleteWord(familyId, word.id);
                            }}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>

                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <TableRow className="bg-gray-50/50 dark:bg-gray-900/30">
                          <TableCell colSpan={5} className="p-0">
                            <div className="p-6 space-y-4">
                              <Separator />

                              <div className="grid md:grid-cols-2 gap-6">
                                {/* Word Family Section */}
                                {word.wordFamily.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                                      <Copy className="h-4 w-4 text-purple-500" />
                                      Word Family
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {word.wordFamily.map((member) => (
                                        <Badge
                                          key={member.id}
                                          variant="secondary"
                                          className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                        >
                                          {member.word}
                                          <span className="text-xs ml-1 text-purple-500 dark:text-purple-400">
                                            ({member.partOfSpeech})
                                          </span>
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Synonyms Section */}
                                {word.synonyms && word.synonyms.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                                      <Link className="h-4 w-4 text-emerald-500" />
                                      Synonyms
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {word.synonyms.map((synonym, idx) => (
                                        <Badge
                                          key={idx}
                                          variant="outline"
                                          className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                                        >
                                          {synonym}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Antonyms Section */}
                                {word.antonyms && word.antonyms.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                                      <X className="h-4 w-4 text-rose-500" />
                                      Opposites
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {word.antonyms.map((antonym, idx) => (
                                        <Badge
                                          key={idx}
                                          variant="outline"
                                          className="bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800"
                                        >
                                          {antonym}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Stats */}
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-blue-500" />
                                    Word Stats
                                  </h4>
                                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                    <p>
                                      📅 Added:{" "}
                                      {new Date(
                                        word.createdAt,
                                      ).toLocaleDateString()}
                                    </p>
                                    <p>
                                      🔤 Family members:{" "}
                                      {word.wordFamily.length}
                                    </p>
                                    <p>
                                      🔗 Synonyms: {word.synonyms?.length || 0}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
