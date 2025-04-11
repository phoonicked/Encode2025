// src/components/nodes/TextOutputNode.tsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TextOutputNodeData } from '@/types';

interface TextOutputNodeProps {
  data: TextOutputNodeData;
}

export default function TextOutputNode({ data }: TextOutputNodeProps) {
  return (
    <div className="w-[250px]">
      {/* Input handle on the left */}
      <Handle type="target" position={Position.Left} id="input/text" data-nodetype="output/text" />
      <Card>
        <CardHeader>
          <CardTitle>Text Output</CardTitle>
          <CardDescription>Display text output.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            {data.outputText || '...'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
