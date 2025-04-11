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
import OpenAINode from './nodes/ai/OpenAINode';
import '@xyflow/react/dist/style.css';
import TextInputNode from './nodes/inputs/TextInputNode';
import TextOutputNode from './nodes/output/TextOutputNode';
import NFTOutputNode from './nodes/output/NFTOutputNode';
import "./flow.css";
import MintNode from './nodes/chain/MintNode';

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
  const nodeTypes = useMemo(
    () => ({
      'ai/openai': OpenAINode,
      'chain/mint': MintNode,
      'input/text': TextInputNode,
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
      colorMode='dark'
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
