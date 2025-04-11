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
} from '@xyflow/react';
import GenericNode from './nodes/GenericNode';
import OpenAINode from './nodes/ai/OpenAINode';
import '@xyflow/react/dist/style.css';

interface FlowProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onLoad?: (instance: any) => void;
}

export default function Flow({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onLoad,
}: FlowProps) {
  // Map the available node types to components.
  const nodeTypes = useMemo(
    () => ({
      generic: GenericNode,
      'ai/openai': OpenAINode,
    }),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onLoad={onLoad}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
