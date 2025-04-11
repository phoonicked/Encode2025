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
  type Connection,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  useReactFlow,
  getOutgoers,
  getIncomers,
  getConnectedEdges,
  IsValidConnection,
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

  // Get helpers from React Flow if needed
  const { getNodes, getEdges } = useReactFlow();

  // Connection validation function
  const isValidConnection: IsValidConnection = useCallback(
    (connection) => {
      // 1) Get current nodes/edges
      const currentNodes = getNodes();
      const currentEdges = getEdges();
  
      // 2) Find the source and target node objects
      const sourceNode = currentNodes.find((n) => n.id === connection.source);
      const targetNode = currentNodes.find((n) => n.id === connection.target);
  
      // If source or target node does not exist, disallow connection
      if (!sourceNode || !targetNode) {
        return false;
      }

      // Check if connection.source == connection.target (everything after /)
      if (connection.sourceHandle!.split('/').slice(-1)[0] !== connection.targetHandle!.split('/').slice(-1)[0]) {
        return false;
      }
  
      // Prevent self-connection
      if (sourceNode.id === targetNode.id) return false;
  
      // 4) **Cycle check** (keeps your existing anti-cycle logic)
      const hasCycle = (node: Node, visited = new Set<string>()): boolean => {
        if (visited.has(node.id)) return false;
        visited.add(node.id);
  
        for (const outgoer of getOutgoers(node, currentNodes, currentEdges)) {
          // if the outgoer is the source of the new connection, it forms a cycle
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
        return false;
      };
  
      // 5) Extra safeguard: disallow if source == target
      if (targetNode.id === sourceNode.id) {
        return false;
      }
  
      // 6) Return the inverse of "cycle detected"
      return !hasCycle(targetNode);
    },
    [getNodes, getEdges]
  );
  
  

  // Handler to add a node at a random position
  const handleAddNode = (option: AvailableNodeOption) => {
    const defaultData = { label: option.label };
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

  // Handler to log nodes and edges
  const handleLogFlowData = useCallback(() => {
    console.log("Nodes:", nodes);
    console.log("Edges:", edges);
  }, [nodes, edges]);

  // Handler for nodes deletion (unchanged)
  const onNodesDelete = useCallback(
    (deleted: any) => {
      setEdges(
        deleted.reduce((acc: any, node: any) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);
          const remainingEdges = acc.filter(
            (edge: any) => !connectedEdges.includes(edge)
          );
          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );
          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
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
      <header className="flex justify-between items-center p-4 bg-zinc-900">
        <h1 className="text-xl font-bold text-purple-300">Agent Flow Editor</h1>
        <div className="space-x-2">
          <Button className="bg-purple-300 text-black" variant="default" onClick={() => {
            const saved = {
              name: "My Agent",
              description: "This is a test agent",
              nodes,
              edges
            }
            console.log(saved);
            
          }}>Save</Button>
          <Button className='bg-purple-300' variant="ghost">Help</Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden bg-zinc-800 text-gray-300">
        {/* Sidebar */}
        <aside className="w-[20%] p-4 space-y-4 bg-zinc-900">
          <Card className='bg-zinc-800'>
            <CardHeader className="text-left text-purple-300">
              <CardTitle>Components</CardTitle>
            </CardHeader>
            <CardContent className="text-left text-purple-300">
              <Input
                className="w-full mb-2 bg-white text-black"
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="max-h-[40%] overflow-y-auto">
                <ul className="space-y-2 text-left">
                  {filteredNodes.map((nodeOption) => (
                    <li key={nodeOption.label}>
                      <Button
                        className="w-[80%] text-left bg-purple-300 text-black"
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
        <main className="flex-1">
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
