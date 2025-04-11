// src/components/nodes/OpenAINode.tsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OpenAINodeData } from '@/types';

interface OpenAINodeProps {
  data: OpenAINodeData;
}

export default function OpenAINode({ data }: OpenAINodeProps) {
  return (
    <div className="w-[250px]">
      {/* Input handle on the left */}
      <Handle type="target" position={Position.Left} id="input/text"/>
      <Card>
        <CardHeader>
          <CardTitle>OpenAI Agent</CardTitle>
          <CardDescription>Connect to an OpenAI LLM agent.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="AI Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-3.5-turbo">GPT 3.5 Turbo</SelectItem>
              <SelectItem value="gpt-4">GPT 4.0</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      {/* Output handle on the right */}
      <Handle type="source" position={Position.Right} id="output/text"/>
    </div>
  );
}
