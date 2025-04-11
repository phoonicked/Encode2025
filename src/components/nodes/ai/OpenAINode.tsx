// src/components/nodes/OpenAINode.tsx
import React from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea component
import { OpenAINodeData } from '@/types';

interface OpenAINodeProps {
  data: OpenAINodeData;
  id: string;
  updateNodeData: (id: string, updates: Partial<OpenAINodeData>) => void;
}

export default function OpenAINode({ data, id }: OpenAINodeProps) {

  const { updateNodeData } = useReactFlow();

  return (
    <div className="w-[250px]">
      {/* Input handle on the left */}
      <Handle type="target" position={Position.Left} id="input/text" data-type="input/text" />
      <Card>
        <CardHeader>
          <CardTitle>OpenAI Agent</CardTitle>
          <CardDescription>Connect to an OpenAI LLM agent.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* System Prompt */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="system-prompt">System Prompt</Label>
            <Textarea
              id="system-prompt"
              placeholder="Enter system prompt..."
              value={data.systemPrompt || ''}
              onChange={(e) => updateNodeData(id, { systemPrompt: e.target.value })}
            />
          </div>

          {/* Model Selection */}
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
            <Label htmlFor="model">AI Model</Label>
            <Select
              value={data.model || ''}
              onValueChange={(value) => updateNodeData(id, { model: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="AI Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-3.5-turbo">GPT 3.5 Turbo</SelectItem>
                <SelectItem value="gpt-4">GPT 4.0</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Toggle for Function Definition */}
          <div className="mt-4 flex items-center">
            <Switch
              checked={data.enableFunctions || false}
              onCheckedChange={(enabled) => updateNodeData(id, { enableFunctions: enabled })}
              className="mr-2"
            />
            <span className="text-sm">Enable Function Definition</span>
          </div>

          {/* Function Definition UI */}
          {data.enableFunctions && (
            <div className="mt-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="function-description">Function Description</Label>
                <Textarea
                  id="function-description"
                  placeholder="Enter function description..."
                  value={data.function?.description || ''}
                  onChange={(e) =>
                    updateNodeData(id, {
                      function: { ...data.function, description: e.target.value },
                    })
                  }
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                <Label htmlFor="output-type">Output Type</Label>
                <Select
                  value={data.function?.outputType || 'Text'}
                  onValueChange={(value) =>
                    updateNodeData(id, {
                      function: { ...data.function, outputType: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Output Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Distribute vertically */}
      <div className="flex-grow flex flex-col justify-between items-center">
        <Handle type="source" position={Position.Right} id="output/a" data-type="output/text" style={{ top: data.enableFunctions ? '33%' : '50%' }} />
        <Handle type="source" position={Position.Right} id="output/b" data-type={`output/${data.function?.outputType}`} style={{
          top: '66%',
          display: data.enableFunctions ? 'block' : 'none'
        }} />
      </div>
    </div>
  );
}
