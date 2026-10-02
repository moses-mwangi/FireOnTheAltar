// app/grammar/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BookOpen,
  Search,
  ChevronRight,
  Star,
  GraduationCap,
  Layers,
  Type,
  Hash,
  Sparkles,
  Quote,
  Link,
  AlertCircle,
  AlignLeft,
  Activity,
} from "lucide-react";

// import { partsOfSpeechData, grammarTopicsData } from "@/data/grammarData";
// import { PartOfSpeech } from "@/types/grammar";

const categoryIcons: Record<string, any> = {
  Noun: BookOpen,
  Pronoun: Users,
  Verb: Activity,
  Adjective: Sparkles,
  Adverb: Hash,
  Preposition: Link,
  Conjunction: AlignLeft,
  Interjection: AlertCircle,
  Article: Type,
  Determiner: Layers,
};

// Import Users from lucide-react
import { Users } from "lucide-react";
import { grammarTopicsData, partsOfSpeechData } from "@/lib/data/grammarData";
import { PartOfSpeech } from "@/lib/types/grammar";

export default function GrammarPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    ...new Set(partsOfSpeechData.map((p) => p.category)),
  ];

  const filteredData = partsOfSpeechData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const GrammarCard = ({ item }: { item: PartOfSpeech }) => {
    const Icon = categoryIcons[item.category] || BookOpen;

    return (
      <Card className="mb-6 overflow-hidden border-l-4 border-l-blue-500 hover:shadow-lg transition-all">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl">{item.name}</CardTitle>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {item.examples?.length || 0} examples
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <p className="text-gray-700 mb-4">{item.definition}</p>

          {item.types && item.types.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Types:
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.types.map((type, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="examples">
              <AccordionTrigger className="text-sm font-semibold">
                Examples ({item.examples?.length || 0})
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 mt-2">
                  {item.examples?.map((ex, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-blue-600">"{ex.word}"</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {ex.sentence}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        📝 {ex.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {item.rules && item.rules.length > 0 && (
              <AccordionItem value="rules">
                <AccordionTrigger className="text-sm font-semibold">
                  Rules & Patterns
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 mt-2">
                    {item.rules.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div>
                          <span className="font-medium">{rule.rule}</span>
                          <span className="text-gray-600 ml-2">
                            → {rule.example}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </CardContent>
      </Card>
    );
  };

  const TopicCard = ({ topic }: { topic: (typeof grammarTopicsData)[0] }) => {
    const levelColors = {
      Beginner: "bg-green-100 text-green-700",
      Intermediate: "bg-yellow-100 text-yellow-700",
      Advanced: "bg-red-100 text-red-700",
    };

    return (
      <Card className="mb-4 hover:shadow-md transition-all">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={levelColors[topic.level]}>
                  <GraduationCap className="h-3 w-3 mr-1" />
                  {topic.level}
                </Badge>
              </div>
              <CardTitle className="text-lg">{topic.title}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{topic.content}</p>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Examples:
            </h4>
            <div className="space-y-1">
              {topic.examples.map((ex, idx) => (
                <div key={idx} className="text-sm text-gray-600">
                  • {ex}
                </div>
              ))}
            </div>
          </div>

          {topic.exercises && topic.exercises.length > 0 && (
            <Accordion type="single" collapsible>
              <AccordionItem value="exercises">
                <AccordionTrigger className="text-sm font-semibold">
                  Practice Exercises
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 mt-2">
                    {topic.exercises.map((ex, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium">{ex.question}</p>
                        <p className="text-sm text-green-600 mt-1">
                          ✓ Answer: {ex.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Complete Grammar Guide</h1>
                <p className="text-blue-100 text-sm">
                  Master all parts of speech and grammar rules
                </p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search grammar topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 bg-white text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="parts-of-speech" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
            <TabsTrigger value="parts-of-speech">
              <Layers className="h-4 w-4 mr-2" />
              Parts of Speech
            </TabsTrigger>
            <TabsTrigger value="grammar-topics">
              <BookOpen className="h-4 w-4 mr-2" />
              Grammar Topics
            </TabsTrigger>
            <TabsTrigger value="quick-reference" className="hidden lg:flex">
              <Star className="h-4 w-4 mr-2" />
              Quick Reference
            </TabsTrigger>
          </TabsList>

          {/* Parts of Speech Tab */}
          <TabsContent value="parts-of-speech">
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="capitalize"
                >
                  {cat}
                </Button>
              ))}
            </div>

            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-6 pr-4">
                {filteredData.map((item) => (
                  <GrammarCard key={item.id} item={item} />
                ))}
                {filteredData.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No grammar topics found.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Grammar Topics Tab */}
          <TabsContent value="grammar-topics">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4 pr-4">
                {grammarTopicsData
                  .filter(
                    (topic) =>
                      topic.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      topic.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                  )
                  .map((topic) => (
                    <TopicCard key={topic.id} topic={topic} />
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Quick Reference Tab */}
          <TabsContent value="quick-reference">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Summary Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Parts of Speech Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Part of Speech</TableHead>
                        <TableHead>Function</TableHead>
                        <TableHead>Example</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Noun</TableCell>
                        <TableCell>Person, place, thing, idea</TableCell>
                        <TableCell>dog, city, love</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Pronoun</TableCell>
                        <TableCell>Replaces noun</TableCell>
                        <TableCell>he, she, it, they</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Verb</TableCell>
                        <TableCell>Action or state</TableCell>
                        <TableCell>run, is, think</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Adjective</TableCell>
                        <TableCell>Describes noun</TableCell>
                        <TableCell>beautiful, tall</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Adverb</TableCell>
                        <TableCell>Describes verb/adjective</TableCell>
                        <TableCell>quickly, very</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Preposition</TableCell>
                        <TableCell>Shows relationship</TableCell>
                        <TableCell>in, on, at, for</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Conjunction</TableCell>
                        <TableCell>Connects words/clauses</TableCell>
                        <TableCell>and, but, or</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Interjection</TableCell>
                        <TableCell>Expresses emotion</TableCell>
                        <TableCell>wow, ouch, hey</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Article</TableCell>
                        <TableCell>Specifies noun</TableCell>
                        <TableCell>a, an, the</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Verb Tenses Quick Reference */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Verb Tenses Quick Reference
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-blue-600">
                        Present
                      </h4>
                      <p className="text-sm">
                        Simple: I work | Continuous: I am working | Perfect: I
                        have worked
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-yellow-600">
                        Past
                      </h4>
                      <p className="text-sm">
                        Simple: I worked | Continuous: I was working | Perfect:
                        I had worked
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-green-600">
                        Future
                      </h4>
                      <p className="text-sm">
                        Simple: I will work | Continuous: I will be working |
                        Perfect: I will have worked
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Common Prepositions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Common Prepositions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Time: at, on, in, during, for, since</div>
                    <div>Place: at, on, in, under, above, between</div>
                    <div>Movement: to, into, onto, through, across</div>
                    <div>Manner: by, with, without, like</div>
                    <div>Cause: for, because of, due to</div>
                  </div>
                </CardContent>
              </Card>

              {/* Conjunctions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Conjunctions (FANBOYS)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-mono font-bold">F</span> - For
                    </div>
                    <div>
                      <span className="font-mono font-bold">A</span> - And
                    </div>
                    <div>
                      <span className="font-mono font-bold">N</span> - Nor
                    </div>
                    <div>
                      <span className="font-mono font-bold">B</span> - But
                    </div>
                    <div>
                      <span className="font-mono font-bold">O</span> - Or
                    </div>
                    <div>
                      <span className="font-mono font-bold">Y</span> - Yet
                    </div>
                    <div>
                      <span className="font-mono font-bold">S</span> - So
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
