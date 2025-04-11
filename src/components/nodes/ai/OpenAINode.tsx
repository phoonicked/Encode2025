// src/components/nodes/OpenAINode.tsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { OpenAINodeData } from '@/types';

interface OpenAINodeProps {
  data: OpenAINodeData;
}

export default function OpenAINode({ data }: OpenAINodeProps) {
  const updateFunction = (key: string, value: string) => {
    data.function = { ...data.function, [key]: value }; // Update React Flow data
  };

  const toggleEnableFunctions = (enabled: boolean) => {
    data.enableFunctions = enabled; // Update React Flow data
  };

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
          {/* Model Selection */}
          <Select
            value={data.model || ''}
            onValueChange={(value) => (data.model = value)} // Update React Flow data
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="AI Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-3.5-turbo">GPT 3.5 Turbo</SelectItem>
              <SelectItem value="gpt-4">GPT 4.0</SelectItem>
            </SelectContent>
          </Select>

          {/* Toggle for Function Definition */}
          <div className="mt-4 flex items-center">
            <Switch
              checked={data.enableFunctions || false}
              onCheckedChange={toggleEnableFunctions}
              className="mr-2"
            />
            <span className="text-sm">Enable Function Definition</span>
          </div>

          {/* Function Definition UI */}
          {data.enableFunctions && (
            <div className="mt-4">
              <h4 className="text-sm font-medium">Define ChatGPT Function</h4>
              <Input
                className="mt-2"
                placeholder="Function Description"
                value={data.function?.description || ''}
                onChange={(e) => updateFunction('description', e.target.value)}
              />
              <Select
                // className="mt-2"
                value={data.function?.outputType || 'Text'}
                onValueChange={(value) => updateFunction('outputType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Output Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Text">Text</SelectItem>
                  <SelectItem value="NFT">NFT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Output handle on the right */}
      <Handle type="source" position={Position.Right} id="output/text"/>
    </div>
  );
}
