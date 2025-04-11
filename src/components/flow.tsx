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
import TextInputNode from './nodes/inputs/TextInputNode';
import WebhookInputNode from './nodes/inputs/WebhookInputNode';
import FileInputNode from './nodes/inputs/FileInputNode';
import ScheduledInputNode from './nodes/inputs/ScheduledInputNode';
import EmailInputNode from './nodes/inputs/EmailInputNode';
import FormInputNode from './nodes/inputs/FormInputNode';
import LocationInputNode from './nodes/inputs/LocationInputNode';
import SpeechInputNode from './nodes/inputs/SpeechInputNode';
import IfElseNode from './nodes/logic/IfElseNode';
import SwitchNode from './nodes/logic/SwitchNode';
import LoopNode from './nodes/logic/LoopNode';
import WaitNode from './nodes/logic/WaitNode';
import TryCatchNode from './nodes/logic/TryCatchNode';
import ChatOutputNode from './nodes/output/ChatOutputNode';
import EmailOutputNode from './nodes/output/EmailOutputNode';
import WebhookOutputNode from './nodes/output/WebhookOutputNode';
import BlockchainOutputNode from './nodes/output/BlockchainOutputNode';
import LogOutputNode from './nodes/output/LogOutputNode';


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
  
      // Input nodes
      'input/text': TextInputNode,
      'input/webhook': WebhookInputNode,
      'input/file': FileInputNode,
      'input/scheduled': ScheduledInputNode,
      'input/email': EmailInputNode,
      'input/form': FormInputNode,
      'input/location': LocationInputNode,
      'input/speech': SpeechInputNode,
      // Logic nodes
      'logic/if-else': IfElseNode,
      'logic/switch': SwitchNode,
      'logic/loop': LoopNode,
      'logic/wait': WaitNode,
      'logic/try-catch': TryCatchNode,
      // Output nodes
      'output/chat': ChatOutputNode,
      'output/email': EmailOutputNode,
      'output/webhook': WebhookOutputNode,
      'output/blockchain': BlockchainOutputNode,
      'output/log': LogOutputNode,
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
