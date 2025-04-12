// src/components/FlowPage.tsx
import React, { useState, useCallback, useEffect, DragEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';  // Import useParams for route parameters
import Flow from './components/flow'; // Your stateless Flow component
// Import your UI components (adjust the paths as needed)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// Import Firestore functions, including getDoc for loading agent data
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

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
  IsValidConnection,
} from '@xyflow/react';
import { ArrowLeft } from 'lucide-react';

interface AvailableNodeOption {
  label: string;
  type: string;
}

export function FlowPage() {
  // Get the agentId from the URL parameters (if editing an existing agent)
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const reactFlowInstance = useReactFlow();

  // State for nodes and edges
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  // State for the search query used in the sidebar
  const [searchQuery, setSearchQuery] = useState<string>('');

  // If an agentId is provided, load its nodes/edges from Firestore on mount
  useEffect(() => {
    if (agentId) {
      const agentDocRef = doc(db, "agents", agentId);
      getDoc(agentDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            // Set nodes and edges from the saved document (default to empty arrays if not present)
            setNodes(data.nodes || []);
            setEdges(data.edges || []);
          } else {
            console.warn("Agent not found");
          }
        })
        .catch((error) => {
          console.error("Error loading agent data:", error);
        });
    }
  }, [agentId]);

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

      // Get element with id sourceHandle:
      const sourceHandle = document.querySelector("[data-handleid='" + connection.sourceHandle + "']");
      const targetHandle = document.querySelector("[data-handleid='" + connection.targetHandle + "']");

      // Get the data-type property on the elements
      const sourceType = sourceHandle?.getAttribute('data-type');
      const targetType = targetHandle?.getAttribute('data-type');

      // Check if the connection types match (comparing the type postfix after the /)
      if (sourceType!.split('/').slice(-1)[0] !== targetType!.split('/').slice(-1)[0]) {
        return false;
      }
  
      // Prevent self-connection
      if (sourceNode.id === targetNode.id) return false;
  
      // 4) Cycle check
      const hasCycle = (node: Node, visited = new Set<string>()): boolean => {
        if (visited.has(node.id)) return false;
        visited.add(node.id);
 
        for (const outgoer of getOutgoers(node, currentNodes, currentEdges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
        return false;
      };
  
      // Extra safeguard: disallow if source equals target
      if (targetNode.id === sourceNode.id) {
        return false;
      }
  
      // Return true if no cycle is detected
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

  // Handler for drag start
  const onDragStart = (event: DragEvent<HTMLButtonElement>, nodeOption: AvailableNodeOption) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeOption));
    event.dataTransfer.effectAllowed = 'move';
  };

  // Handler for drag over
  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handler for drop
  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      // Get the drop position
      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      if (!reactFlowBounds || !reactFlowInstance) return;

      const nodeOptionString = event.dataTransfer.getData('application/reactflow');
      if (!nodeOptionString) return;
      
      const nodeOption = JSON.parse(nodeOptionString) as AvailableNodeOption;

      // Calculate the position where the node should be created
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left + 230,
        y: event.clientY - reactFlowBounds.top,
      });

      // Create a new node
      const newNode: Node = {
        id: `${Date.now()}`,
        type: nodeOption.type,
        position,
        data: { label: nodeOption.label },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance]
  );

  // Save data handler: updates existing agent if agentId exists; otherwise creates a new document
  const handleSaveData = async () => {
    const savedData = {
      name: "My Agent", // You can allow editing these properties
      description: "This is a test agent",
      nodes,
      edges,
      createdAt: new Date(),
    };

    console.log(savedData);

    try {
      // If agentId exists, update that document; if not, create a new one
      const agentDocRef = agentId
        ? doc(db, "agents", agentId)
        : doc(collection(db, "agents"));
      await setDoc(agentDocRef, savedData);
      console.log("Agent saved successfully with ID:", agentDocRef.id);
    } catch (error) {
      console.error("Error saving agent data:", error);
    }
  };

  // Handler to log nodes and edges for debugging
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
    { label: 'Mint NFT', type: 'chain/mint' },
    { label: 'Text Output', type: 'output/text' },
    { label: 'NFT Output', type: 'output/nft' },
  ];

  // Filter available nodes based on the search query (case-insensitive)
  const filteredNodes = availableNodes.filter((nodeItem) =>
    nodeItem.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <header className="flex justify-between items-center p-4 bg-zinc-900">
        <h1 className="text-4xl font-bold text-purple-300">Agent Flow Editor</h1>
        <div className="space-x-2">
          <Button className="bg-purple-300 text-black" variant="ghost" onClick={handleSaveData}>Save</Button>
          <Button className="bg-purple-300 text-black" variant="ghost">Help</Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden text-gray-300 bg-zinc-900">
        {/* Sidebar */}
        <aside className="w-[24%] pl-4 pr-4 space-y-4 bg-zinc-900 flex flex-col justify-between">
          <Card className='bg-zinc-800 h-full'>
            <CardHeader className="text-3xl text-left text-purple-300">
              <CardTitle>Components</CardTitle>
            </CardHeader>
            <CardContent className="text-left text-purple-300">
              <Input
                className="w-full mb-5 bg-white text-black rounded-2xl"
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="max-h-[80%] overflow-y-auto">
                <ul className="space-y-2 text-left">
                  {filteredNodes.map((nodeOption) => (
                    <li key={nodeOption.label}>
                      <Button
                        className="w-full text-left bg-purple-300 text-black"
                        variant="outline"
                        onClick={() => handleAddNode(nodeOption)}
                        draggable
                        onDragStart={(event) => onDragStart(event, nodeOption)}
                      >
                        {nodeOption.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          <div className='pb-4'>
          <Link
              to="/agents"
              className="flex items-center gap-2 text-lg mb-8 text-purple-300"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </Link>
          </div>
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
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
        </main>
      </div>
    </div>
  );
}

export default FlowPage;