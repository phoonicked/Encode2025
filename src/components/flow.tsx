// src/components/Flow.tsx
import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  IsValidConnection,
  OnNodesDelete,
} from '@xyflow/react';
import GenericNode from './nodes/GenericNode';
import OpenAINode from './nodes/ai/OpenAINode';
import '@xyflow/react/dist/style.css';
import TextInputNode from './nodes/inputs/TextInputNode';
import TextOutputNode from './nodes/output/TextOutputNode';
import NFTOutputNode from './nodes/output/NFTOutputNode';


interface FlowProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onNodesDelete: OnNodesDelete;
  onEdgesChange: OnEdgesChange;
  isValidConnection: IsValidConnection;
  onConnect: OnConnect;
  onLoad?: (instance: any) => void;
}

export default function Flow({
  nodes,
  edges,
  onNodesChange,
  onNodesDelete,
  onEdgesChange,
  onConnect,
  isValidConnection,
  onLoad,
}: FlowProps) {
  // Map the available node types to components.
  const nodeTypes = useMemo(
    () => ({
      generic: GenericNode,
      'ai/openai': OpenAINode,
  
      // Input nodes
      'input/text': TextInputNode,
      // Output nodes
      'output/text': TextOutputNode,
      'output/nft': NFTOutputNode,
    }),
    []
  );
  
  

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onNodesDelete={onNodesDelete}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      isValidConnection={isValidConnection}
      onLoad={onLoad}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
