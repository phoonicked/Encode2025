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
  useReactFlow,
  getOutgoers,
  getIncomers,
  getConnectedEdges,
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

  const { getNodes, getEdges } = useReactFlow();

  const isValidConnection = useCallback(
    (connection: any) => {
      // we are using getNodes and getEdges helpers here
      // to make sure we create isValidConnection function only once
      const nodes = getNodes();
      const edges = getEdges();
      const target = nodes.find((node) => node.id === connection.target);
      const hasCycle = (node: any, visited = new Set()) => {
        if (visited.has(node.id)) return false;
 
        visited.add(node.id);
 
        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };
 
      if (target!.id === connection.source) return false;
      return !hasCycle(target);
    },
    [getNodes, getEdges],
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

  const onNodesDelete = useCallback(
    (deleted: any) => {
      setEdges(
        deleted.reduce((acc: any, node: any) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);
 
          const remainingEdges = acc.filter(
            (edge: any) => !connectedEdges.includes(edge),
          );
 
          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            })),
          );
 
          return [...remainingEdges, ...createdEdges];
        }, edges),
      );
    },
    [nodes, edges],
  );
  

  // List of available node options (each with a label and a type)
  const availableNodes: AvailableNodeOption[] = [
    { label: 'Text Input', type: 'input/text' },
    { label: 'OpenAI Agent', type: 'ai/openai' },
    { label: 'Text Output', type: 'output/text' },
    { label: 'NFT Output', type: 'output/nft' },
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
          <Button variant="default" onClick={() => {
            const saved = {
              name: "My Agent",
              description: "This is a test agent",
              nodes,
              edges
            }
            console.log(saved);
            
          }}>Save</Button>
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
            onNodesDelete={onNodesDelete}
            onEdgesChange={onEdgesChange}
            isValidConnection={isValidConnection}
            onConnect={onConnect}
          />
        </main>
      </div>
    </div>
  );
}

export default FlowPage;
