"use client";

import { useState, useMemo } from "react";
import {
  Layers,
  Link as LinkIcon,
  TrendingUp,
  BookOpen,
  Users,
  Zap,
  ChevronRight,
  Network,
  Filter,
  Grid,
  List,
  Plus,
  Search,
  Sparkles,
  Target,
  Brain,
  Lightbulb,
  Globe,
  Clock,
  Hash,
  Star,
  MoreVertical,
  Download,
  Share2,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import TopicGraph from "@/components/topics/TopicGraph";
import TopicCard from "@/components/topics/TopicCard";
import VerseExplorer from "@/components/topics/VerseExplorer";
import { DEMO_DATA } from "@/lib/demo-data/generate";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Extended connection types
const CONNECTION_TYPES = {
  theological: { label: "Theological", color: "bg-purple-500", icon: "✝️" },
  practical: { label: "Practical", color: "bg-blue-500", icon: "🛠️" },
  devotional: { label: "Devotional", color: "bg-pink-500", icon: "🙏" },
  historical: { label: "Historical", color: "bg-amber-500", icon: "📜" },
  ethical: { label: "Ethical", color: "bg-emerald-500", icon: "⚖️" },
};

export default function TopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState(DEMO_DATA.topics[0]);
  const [viewMode, setViewMode] = useState<"graph" | "grid" | "list">("graph");
  const [searchQuery, setSearchQuery] = useState("");
  const [showConnections, setShowConnections] = useState(true);
  const [discoveryMode, setDiscoveryMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Enhanced connections with more data
  const connections = useMemo(
    () => [
      {
        id: "1",
        from: "Grace & Mercy",
        to: "God's Love",
        strength: 0.9,
        type: "theological",
        sharedVerses: ["John 3:16", "Ephesians 2:8-9"],
        description: "God's love is expressed through grace and mercy",
      },
      {
        id: "2",
        from: "Faith & Trust",
        to: "Prayer & Worship",
        strength: 0.7,
        type: "practical",
        sharedVerses: ["Hebrews 11:1", "Philippians 4:6"],
        description: "Faith empowers authentic prayer and worship",
      },
      {
        id: "3",
        from: "Kingdom of God",
        to: "Faith & Trust",
        strength: 0.8,
        type: "theological",
        sharedVerses: ["Matthew 6:33", "Mark 11:22-24"],
        description: "Seeking God's kingdom requires faith",
      },
      {
        id: "4",
        from: "God's Love",
        to: "Prayer & Worship",
        strength: 0.6,
        type: "devotional",
        sharedVerses: ["1 John 4:19", "Psalm 95:6"],
        description: "Love for God inspires worship",
      },
      {
        id: "5",
        from: "Salvation",
        to: "Grace & Mercy",
        strength: 0.95,
        type: "theological",
        sharedVerses: ["Ephesians 2:8", "Titus 3:5"],
        description: "Salvation is by grace through faith",
      },
    ],
    []
  );

  // Filtered topics based on search
  const filteredTopics = useMemo(() => {
    if (!searchQuery) return DEMO_DATA.topics;
    
    const query = searchQuery.toLowerCase();
    return DEMO_DATA.topics.filter(
      (topic) =>
        topic.name.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query) ||
        topic.verses.some((verse) => verse.toLowerCase().includes(query)) ||
        topic.subTopics?.some((sub) => sub.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Discovery algorithm - suggests topics based on user interests
  const discoverySuggestions = useMemo(() => {
    if (!discoveryMode || !selectedTopic) return [];
    
    // Simple algorithm to find related topics
    return DEMO_DATA.topics
      .filter((topic) => {
        const isRelated = connections.some(
          (conn) => 
            (conn.from === selectedTopic.name && conn.to === topic.name) ||
            (conn.to === selectedTopic.name && conn.from === topic.name)
        );
        return isRelated && topic.id !== selectedTopic.id;
      })
      .slice(0, 3);
  }, [selectedTopic, discoveryMode, connections]);

  // Calculate topic coverage percentage
  const calculateCoverage = (topicId: string) => {
    const topicConnections = connections.filter(
      (conn) => conn.from === topicId || conn.to === topicId
    ).length;
    return Math.min((topicConnections / 5) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Enhanced Header with Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span>Theology</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-emerald-700">Topics</span>
          </nav>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Theological Topics
                  </h1>
                  <p className="text-slate-600 mt-1 flex items-center gap-2">
                    <span>Explore interconnected biblical themes</span>
                    <Sparkles className="h-4 w-4 text-amber-500" />
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg">
                <Plus className="h-5 w-5" />
                New Topic
              </Button>
            </div>
          </div>
        </div>

        {/* Interactive Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              onClick={() => setViewMode("graph")}
              variant={viewMode === "graph" ? "default" : "outline"}
              className="gap-2"
            >
              <Network className="h-4 w-4" />
              Graph
            </Button>
            <Button
              onClick={() => setViewMode("grid")}
              variant={viewMode === "grid" ? "default" : "outline"}
              className="gap-2"
            >
              <Grid className="h-4 w-4" />
              Grid
            </Button>
            <Button
              onClick={() => setViewMode("list")}
              variant={viewMode === "list" ? "default" : "outline"}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              List
            </Button>
            
            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="flex items-center gap-2">
                <Switch
                  id="connections"
                  checked={showConnections}
                  onCheckedChange={setShowConnections}
                />
                <Label htmlFor="connections" className="text-sm">
                  Show Connections
                </Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  id="discovery"
                  checked={discoveryMode}
                  onCheckedChange={setDiscoveryMode}
                />
                <Label htmlFor="discovery" className="text-sm">
                  <span className="flex items-center gap-1">
                    Discovery Mode
                    <Sparkles className="h-3 w-3 text-amber-500" />
                  </span>
                </Label>
              </div>
            </div>
          </div>
          
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search topics, verses, or doctrines..."
              className="pl-10 pr-4 py-2 w-full sm:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Discovery Banner */}
        {discoveryMode && discoverySuggestions.length > 0 && (
          <div className="mb-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="h-5 w-5 text-amber-600" />
              <h3 className="font-bold text-amber-800">Discovery Suggestions</h3>
            </div>
            <p className="text-amber-700 text-sm mb-4">
              Based on your interest in <strong>{selectedTopic.name}</strong>, you might want to explore:
            </p>
            <div className="flex flex-wrap gap-2">
              {discoverySuggestions.map((topic) => (
                <Button
                  key={topic.id}
                  variant="outline"
                  className="gap-2 border-amber-300 text-amber-700 hover:bg-amber-50"
                  onClick={() => setSelectedTopic(topic)}
                >
                  {topic.icon}
                  {topic.name}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        {viewMode === "graph" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Graph Visualization Panel */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-none shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Globe className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Topic Network</h3>
                          <p className="text-sm text-slate-600">
                            Interactive visualization of theological relationships
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="gap-1">
                          <Target className="h-3 w-3" />
                          {filteredTopics.length} Topics
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Export as Image
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share View
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                  <div className="h-[500px] p-2">
                    <TopicGraph
                      topics={filteredTopics}
                      connections={showConnections ? connections : []}
                      onNodeClick={setSelectedTopic}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Topic Details */}
              {selectedTopic && (
                <Card className="border-none shadow-xl">
                  <CardContent className="p-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid grid-cols-4 mb-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="verses">Verses</TabsTrigger>
                        <TabsTrigger value="connections">Connections</TabsTrigger>
                        <TabsTrigger value="insights">Insights</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="space-y-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                              <span className="text-3xl">{selectedTopic.icon}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold">{selectedTopic.name}</h2>
                                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500">
                                  {selectedTopic.category}
                                </Badge>
                              </div>
                              <p className="text-slate-700">{selectedTopic.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm">
                              <Bookmark className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Open in Study
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Export Notes
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <BookOpen className="h-4 w-4 text-emerald-600" />
                              <span className="text-sm text-slate-600">Verses</span>
                            </div>
                            <div className="text-2xl font-bold">{selectedTopic.verses.length}</div>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <LinkIcon className="h-4 w-4 text-blue-600" />
                              <span className="text-sm text-slate-600">Connections</span>
                            </div>
                            <div className="text-2xl font-bold">
                              {connections.filter(c => c.from === selectedTopic.name || c.to === selectedTopic.name).length}
                            </div>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4 text-purple-600" />
                              <span className="text-sm text-slate-600">Sub-topics</span>
                            </div>
                            <div className="text-2xl font-bold">{selectedTopic.subTopics?.length || 0}</div>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="h-4 w-4 text-amber-600" />
                              <span className="text-sm text-slate-600">Coverage</span>
                            </div>
                            <div className="text-2xl font-bold">
                              {calculateCoverage(selectedTopic.id).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="verses">
                        <div className="space-y-3">
                          {selectedTopic.verses.map((verse, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors group cursor-pointer"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="font-semibold text-lg mb-1 group-hover:text-emerald-700">
                                    {verse}
                                  </div>
                                  <p className="text-slate-600 text-sm">
                                    Reference description or commentary would appear here...
                                  </p>
                                </div>
                                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="connections">
                        <div className="space-y-4">
                          {connections
                            .filter(c => c.from === selectedTopic.name || c.to === selectedTopic.name)
                            .map((conn) => (
                              <div key={conn.id} className="p-4 rounded-xl border border-slate-200">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${CONNECTION_TYPES[conn.type].color}`} />
                                    <span className="text-sm font-medium text-slate-700">
                                      {conn.from === selectedTopic.name ? conn.to : conn.from}
                                    </span>
                                  </div>
                                  <Badge variant="outline">
                                    {CONNECTION_TYPES[conn.type].label}
                                  </Badge>
                                </div>
                                <p className="text-slate-600 text-sm mb-3">{conn.description}</p>
                                <div className="flex items-center gap-2">
                                  <Hash className="h-4 w-4 text-slate-400" />
                                  <span className="text-sm text-slate-500">
                                    Shared verses: {conn.sharedVerses.join(", ")}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="insights">
                        <div className="space-y-4">
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                            <h4 className="font-bold mb-2 flex items-center gap-2">
                              <Star className="h-4 w-4 text-blue-600" />
                              Key Insight
                            </h4>
                            <p className="text-slate-700">
                              This topic is most strongly connected to "
                              {connections
                                .filter(c => c.from === selectedTopic.name || c.to === selectedTopic.name)
                                .sort((a, b) => b.strength - a.strength)[0]?.to
                              }" with {Math.max(...connections.filter(c => c.from === selectedTopic.name || c.to === selectedTopic.name).map(c => c.strength)) * 100}% strength.
                            </p>
                          </div>
                          <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                            <h4 className="font-bold mb-2">Study Progress</h4>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Verse Coverage</span>
                                  <span>{selectedTopic.verses.length}/20 verses</span>
                                </div>
                                <Progress value={(selectedTopic.verses.length / 20) * 100} />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Connection Depth</span>
                                  <span>{calculateCoverage(selectedTopic.id).toFixed(0)}%</span>
                                </div>
                                <Progress value={calculateCoverage(selectedTopic.id)} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Topic List Card */}
              <Card className="border-none shadow-xl sticky top-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">All Topics</h3>
                    <Badge variant="secondary">{filteredTopics.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {filteredTopics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic)}
                        className={`w-full p-4 rounded-xl text-left transition-all group hover:shadow-md ${
                          selectedTopic.id === topic.id
                            ? "ring-2 ring-emerald-500 bg-gradient-to-r from-emerald-50/80 to-teal-50/80"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${topic.color.replace('bg-', 'bg-').replace('/20', '/10')}`}>
                              <span className="text-xl">{topic.icon}</span>
                            </div>
                            <div>
                              <h4 className="font-bold group-hover:text-emerald-700">{topic.name}</h4>
                              <p className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Updated 2d ago
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-500" />
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">{topic.notesCount} notes</span>
                            <span className="font-medium">{calculateCoverage(topic.id).toFixed(0)}%</span>
                          </div>
                          <div className={`h-1.5 rounded-full mt-1 ${topic.color}`}>
                            <div 
                              className={`h-full rounded-full ${topic.color.replace('bg-', 'bg-').replace('/20', '')}`}
                              style={{ width: `${calculateCoverage(topic.id)}%` }}
                            />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {filteredTopics.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <Search className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                      <p>No topics found matching "{searchQuery}"</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Connection Types Legend */}
              <Card className="border-none shadow-xl">
                <CardContent className="p-6">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    Connection Types
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(CONNECTION_TYPES).map(([key, type]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${type.color}`} />
                          <span className="text-sm">{type.label}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {connections.filter(c => c.type === key).length}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                isSelected={selectedTopic.id === topic.id}
                onSelect={setSelectedTopic}
                connectionCount={connections.filter(c => c.from === topic.name || c.to === topic.name).length}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-slate-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100">
                      <span className="text-2xl">{topic.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{topic.name}</h3>
                      <p className="text-slate-600 max-w-2xl">{topic.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {topic.verses.length} verses
                        </span>
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <LinkIcon className="h-4 w-4" />
                          {connections.filter(c => c.from === topic.name || c.to === topic.name).length} connections
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">
                      {topic.notesCount}
                    </div>
                    <div className="text-sm text-slate-500">notes</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Quick Actions Bar */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <Button
            size="lg"
            className="rounded-full shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full shadow-lg backdrop-blur-sm bg-white/80"
            onClick={() => setDiscoveryMode(!discoveryMode)}
          >
            <Sparkles className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <VerseExplorer />
    </div>
  );
}