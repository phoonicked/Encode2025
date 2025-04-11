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
    const defaultData = { label: option.label }; // expand this per type if needed
  
    const newNode: Node = {
      id: `${Date.now()}`,
      data: defaultData,
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
    { label: 'Text Input', type: 'input/text' },
    { label: 'Webhook Trigger', type: 'input/webhook' },
    { label: 'File Upload', type: 'input/file' },
    { label: 'Scheduled Trigger', type: 'input/scheduled' },
    { label: 'Email Listener', type: 'input/email' },
    { label: 'Form Input', type: 'input/form' },
    { label: 'Location Input', type: 'input/location' },
    { label: 'Voice Input', type: 'input/speech' },
    { label: 'OpenAI Agent', type: 'ai/openai' },
    { label: 'If / Else', type: 'logic/if-else' },
    { label: 'Switch', type: 'logic/switch' },
    { label: 'Loop', type: 'logic/loop' },
    { label: 'Wait', type: 'logic/wait' },
    { label: 'Try / Catch', type: 'logic/try-catch' },
    { label: 'Chat Output', type: 'output/chat' },
    { label: 'Email Output', type: 'output/email' },
    { label: 'Webhook Output', type: 'output/webhook' },
    { label: 'Blockchain Output', type: 'output/blockchain' },
    { label: 'Log Output', type: 'output/log' },


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
        <aside className="w-[20%] p-4 border-r space-y-4">
        <Card>
          <CardHeader className="text-left">
            <CardTitle>Components</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              className="w-full mb-2"
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="max-h-170 overflow-y-auto">
              <ul className="space-y-2 text-left">
                {filteredNodes.map((nodeOption) => (
                  <li key={nodeOption.label}>
                    <Button
                      className="w-[80%] text-left"
                      variant="outline"
                      onClick={() => handleAddNode(nodeOption)}
                    >
                      {nodeOption.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
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
