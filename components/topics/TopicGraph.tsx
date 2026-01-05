// components/topics/TopicGraph.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Network, ZoomIn, ZoomOut, RefreshCw,
  Filter, Target, Link as LinkIcon,
  Eye, EyeOff, Maximize2, Minimize2,
  MousePointer, Lock, Unlock, Share2,
  Download, Settings, Sparkles
} from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  notesCount: number;
  verses: string[];
}

interface Connection {
  from: string;
  to: string;
  strength: number;
  type: 'theological' | 'practical' | 'devotional' | 'historical';
}

interface TopicGraphProps {
  topics: Topic[];
  connections: Connection[];
}

const TopicGraph: React.FC<TopicGraphProps> = ({ topics, connections }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'force' | 'radial' | 'hierarchy'>('force');
  const [showLabels, setShowLabels] = useState(true);
  const [showConnections, setShowConnections] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate node positions based on view mode
  const calculateNodePositions = () => {
    const centerX = 400;
    const centerY = 300;
    const radius = 200;

    switch (viewMode) {
      case 'radial':
        return topics.map((topic, index) => {
          const angle = (index / topics.length) * 2 * Math.PI;
          return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
            topic
          };
        });
      
      case 'hierarchy':
        return topics.map((topic, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          return {
            x: 200 + col * 200,
            y: 100 + row * 150,
            topic
          };
        });
      
      default: // force-directed
        return topics.map((topic, index) => {
          // Simulate force-directed layout
          const angle = Math.random() * 2 * Math.PI;
          const distance = 100 + Math.random() * 150;
          return {
            x: centerX + distance * Math.cos(angle),
            y: centerY + distance * Math.sin(angle),
            topic
          };
        });
    }
  };

  const nodePositions = calculateNodePositions();

  const connectionColors = {
    theological: '#7C3AED',
    practical: '#10B981',
    devotional: '#F43F5E',
    historical: '#F59E0B'
  };

  const getTopicColor = (colorString: string) => {
    const colors: Record<string, string> = {
      'from-purple-500 to-pink-500': '#EC4899',
      'from-emerald-500 to-teal-500': '#10B981',
      'from-rose-500 to-red-500': '#F43F5E',
      'from-amber-500 to-orange-500': '#F59E0B',
      'from-blue-500 to-indigo-500': '#4F46E5',
    };
    return colors[colorString] || '#6B7280';
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply transform for zoom and pan
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.scale(zoom, zoom);

    // Draw connections
    if (showConnections) {
      connections.forEach(conn => {
        const fromNode = nodePositions.find(np => np.topic.name === conn.from);
        const toNode = nodePositions.find(np => np.topic.name === conn.to);
        
        if (fromNode && toNode) {
          // Draw connection line
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = connectionColors[conn.type] + (selectedConnection === conn ? 'FF' : '66');
          ctx.lineWidth = conn.strength * 4;
          ctx.stroke();

          // Draw connection type indicator
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          
          ctx.fillStyle = connectionColors[conn.type];
          ctx.beginPath();
          ctx.arc(midX, midY, 8, 0, Math.PI * 2);
          ctx.fill();
          
          // Connection type label
          if (showLabels) {
            ctx.fillStyle = '#1F2937';
            ctx.font = '12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(conn.type.charAt(0).toUpperCase(), midX, midY + 4);
          }
        }
      });
    }

    // Draw nodes
    nodePositions.forEach(({ x, y, topic }) => {
      const isSelected = selectedNode === topic.id;
      const nodeRadius = 24 + (topic.notesCount / 10);
      const color = getTopicColor(topic.color);

      // Node glow effect
      if (isSelected) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
      }

      // Draw node
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = color + (isSelected ? 'FF' : 'DD');
      ctx.fill();

      // Node border
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isSelected ? '#FFFFFF' : color;
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.stroke();

      // Reset shadow
      ctx.shadowBlur = 0;

      // Draw icon/text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(topic.icon, x, y);

      // Draw label
      if (showLabels) {
        ctx.fillStyle = '#1F2937';
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText(topic.name, x, y + nodeRadius + 20);
        
        // Notes count
        ctx.fillStyle = '#6B7280';
        ctx.font = '12px Inter, sans-serif';
        ctx.fillText(`${topic.notesCount} notes`, x, y + nodeRadius + 38);
      }

      // Selection indicator
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius + 8, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    ctx.restore();
  };

  useEffect(() => {
    drawGraph();
  }, [selectedNode, zoom, position, viewMode, showLabels, showConnections, selectedConnection]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isLocked) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isLocked) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - position.x) / zoom;
    const y = (e.clientY - rect.top - position.y) / zoom;

    // Check if clicked on a node
    const clickedNode = nodePositions.find(({ x: nodeX, y: nodeY, topic }) => {
      const distance = Math.sqrt(Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2));
      const nodeRadius = 24 + (topic.notesCount / 10);
      return distance < nodeRadius;
    });

    if (clickedNode) {
      setSelectedNode(clickedNode.topic.id);
      setSelectedConnection(null);
    } else {
      // Check if clicked on a connection
      const clickedConnection = connections.find(conn => {
        const fromNode = nodePositions.find(np => np.topic.name === conn.from);
        const toNode = nodePositions.find(np => np.topic.name === conn.to);
        
        if (!fromNode || !toNode) return false;

        // Calculate distance from point to line
        const A = { x: fromNode.x, y: fromNode.y };
        const B = { x: toNode.x, y: toNode.y };
        const P = { x, y };

        const area = Math.abs(
          (B.x - A.x) * (P.y - A.y) - (P.x - A.x) * (B.y - A.y)
        );
        const distance = area / Math.sqrt(
          Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2)
        );

        return distance < 10; // Click tolerance
      });

      if (clickedConnection) {
        setSelectedConnection(clickedConnection);
        setSelectedNode(null);
      } else {
        setSelectedNode(null);
        setSelectedConnection(null);
      }
    }
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'topic-graph.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const selectedTopic = topics.find(t => t.id === selectedNode);

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-white p-6' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-100 to-indigo-100">
            <Network className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Topic Relationship Map</h3>
            <p className="text-slate-600">
              {topics.length} topics • {connections.length} connections
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5 text-slate-600" />
            ) : (
              <Maximize2 className="h-5 w-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Graph Container */}
      <div className="relative rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        {/* Controls */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-slate-100 rounded-lg"
              title="Zoom In"
            >
              <ZoomIn className="h-5 w-5 text-slate-600" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-slate-100 rounded-lg"
              title="Zoom Out"
            >
              <ZoomOut className="h-5 w-5 text-slate-600" />
            </button>
            <button
              onClick={handleResetView}
              className="p-2 hover:bg-slate-100 rounded-lg"
              title="Reset View"
            >
              <RefreshCw className="h-5 w-5 text-slate-600" />
            </button>
            <div className="w-px h-6 bg-slate-300" />
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`p-2 rounded-lg ${
                showLabels ? 'bg-purple-100 text-purple-600' : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="Toggle Labels"
            >
              {showLabels ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsLocked(!isLocked)}
              className={`p-2 rounded-lg ${
                isLocked ? 'bg-amber-100 text-amber-600' : 'hover:bg-slate-100 text-slate-600'
              }`}
              title={isLocked ? 'Unlock' : 'Lock View'}
            >
              {isLocked ? (
                <Lock className="h-5 w-5" />
              ) : (
                <Unlock className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* View Mode Selector */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
            <div className="flex items-center gap-1">
              {['force', 'radial', 'hierarchy'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg capitalize ${
                    viewMode === mode
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
            <button
              onClick={handleExport}
              className="p-2 hover:bg-slate-100 rounded-lg"
              title="Export as PNG"
            >
              <Download className="h-5 w-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg" title="Share">
              <Share2 className="h-5 w-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg" title="Settings">
              <Settings className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          {/* Connection Types */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Connections</span>
            </div>
            <div className="space-y-2">
              {Object.entries(connectionColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-slate-600 capitalize">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={containerRef}
          className="relative h-[600px] cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleCanvasClick}
        >
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="absolute inset-0"
          />

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MousePointer className="h-4 w-4" />
              <span>Click nodes for details • Drag to pan • Scroll to zoom</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Details */}
      {(selectedTopic || selectedConnection) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Selected Topic Details */}
          {selectedTopic && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${selectedTopic.color} text-white`}>
                  <span className="text-2xl">{selectedTopic.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{selectedTopic.name}</h3>
                  <p className="text-slate-600">{selectedTopic.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="text-2xl font-bold text-slate-800">{selectedTopic.notesCount}</div>
                  <div className="text-sm text-slate-600">Notes</div>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50">
                  <div className="text-xl font-bold text-slate-800">
                    {connections.filter(c => c.from === selectedTopic.name || c.to === selectedTopic.name).length}
                  </div>
                  <div className="text-sm text-slate-600">Connections</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-3">Key Verses</h4>
                <div className="space-y-2">
                  {selectedTopic.verses.map((verse, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer"
                    >
                      <div className="font-medium">{verse}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Selected Connection Details */}
          {selectedConnection && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-3 rounded-xl text-white"
                  style={{ backgroundColor: connectionColors[selectedConnection.type] }}
                >
                  <LinkIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 capitalize">
                    {selectedConnection.type} Connection
                  </h3>
                  <p className="text-slate-600">
                    {selectedConnection.from} ↔ {selectedConnection.to}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Relationship Strength</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${selectedConnection.strength * 100}%`,
                          backgroundColor: connectionColors[selectedConnection.type]
                        }}
                      />
                    </div>
                    <span className="font-bold text-slate-800">
                      {Math.round(selectedConnection.strength * 100)}%
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Connection Type</h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                    style={{
                      backgroundColor: connectionColors[selectedConnection.type] + '20',
                      color: connectionColors[selectedConnection.type]
                    }}
                  >
                    <Sparkles className="h-4 w-4" />
                    <span className="capitalize">{selectedConnection.type}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Shared Themes</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Love', 'Grace', 'Faith', 'Salvation'].map((theme, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Key Cross-References</h4>
                  <div className="space-y-2">
                    {['John 3:16', 'Romans 5:8', '1 John 4:8'].map((verse, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer"
                      >
                        <div className="text-sm">{verse}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-slate-800">Graph Legend</h4>
          <button
            onClick={() => setShowConnections(!showConnections)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              showConnections ? 'bg-purple-100 text-purple-700' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {showConnections ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
            <span className="text-sm">Connections</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h5 className="text-sm font-medium text-slate-700 mb-3">Node Size</h5>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <span className="text-lg">❤️</span>
                </div>
                <span className="text-xs text-slate-600 mt-2">Small (Few notes)</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                  <span className="text-xl">🙏</span>
                </div>
                <span className="text-xs text-slate-600 mt-2">Medium</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white">
                  <span className="text-2xl">👑</span>
                </div>
                <span className="text-xs text-slate-600 mt-2">Large (Many notes)</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-slate-700 mb-3">Connection Types</h5>
            <div className="space-y-2">
              {Object.entries(connectionColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-3">
                  <div
                    className="w-8 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex-1">
                    <span className="text-sm text-slate-700 capitalize">{type}</span>
                    <div className="text-xs text-slate-500">
                      {type === 'theological' && 'Doctrinal relationships'}
                      {type === 'practical' && 'Life application links'}
                      {type === 'devotional' && 'Spiritual growth connections'}
                      {type === 'historical' && 'Historical & contextual links'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-slate-700 mb-3">Interaction Guide</h5>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MousePointer className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600">Click nodes for details</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600">Click connections for relationship info</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600">Drag to pan, scroll to zoom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicGraph;