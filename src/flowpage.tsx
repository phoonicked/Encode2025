// src/components/FlowPage.tsx
import React, { useState, useCallback } from 'react';
import Flow from './components/flow'; // Your stateless Flow component
// Import your UI components (adjust the paths as needed)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from '@xyflow/react';

interface AvailableNodeOption {
  label: string;
  type: string;
}

export function FlowPage() {
  // State for nodes and edges
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  // State for the search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Callbacks to update nodes and edges
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  // Handler to add a new node at a random position
  const handleAddNode = (option: AvailableNodeOption) => {
    const newNode: Node = {
      id: `${Date.now()}`,
      data: { value: option.label },
      position: {
        x: Math.random() * 250 + 100,
        y: Math.random() * 250 + 100,
      },
      type: option.type,
    };

    setNodes((nds) => [...nds, newNode]);
  };

  // List of available node options (each with a label and a type)
  const availableNodes: AvailableNodeOption[] = [
    { label: 'Input Node', type: 'generic' },
    { label: 'Process Node', type: 'generic' },
    { label: 'Output Node', type: 'generic' },
    { label: 'OpenAI Agent', type: 'ai/openai' },
  ];

  // Filter based on search query (case-insensitive)
  const filteredNodes = availableNodes.filter((nodeItem) =>
    nodeItem.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <header className="flex justify-between items-center p-4 border-b border-2">
        <h1 className="text-xl font-bold">Agent Flow Editor</h1>
        <div className="space-x-2">
          <Button variant="default">Save</Button>
          <Button variant="outline">Export</Button>
          <Button variant="ghost">Help</Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 p-4 border-r space-y-4">
          <Card>
            <CardHeader className="text-left">
              <CardTitle>Components</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-left">
                <Input
                  className="w-full"
                  placeholder="Search nodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {filteredNodes.map((nodeOption) => (
                  <li key={nodeOption.label}>
                    <Button
                      variant="outline"
                      onClick={() => handleAddNode(nodeOption)}
                    >
                      {nodeOption.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>

        {/* Main React Flow Area */}
        <main className="flex-1 border-2">
          <Flow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          />
        </main>
      </div>
    </div>
  );
}

export default FlowPage;
