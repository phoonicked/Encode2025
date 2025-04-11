// src/components/nodes/TextInputNode.tsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TextInputNodeData } from '@/types';

interface TextInputNodeProps {
  data: TextInputNodeData;
}

export default function TextInputNode({ data }: TextInputNodeProps) {
  return (
    <div className="w-[250px]">
      {/* Since this is an input node, we show only the output handle on the right */}
      <Card>
        <CardHeader>
          <CardTitle>Text Input</CardTitle>
          <CardDescription>Enter text data.</CardDescription>
        </CardHeader>
      </Card>
      {/* Output handle on the right */}
      <Handle type="source" position={Position.Right} id="output/text" data-type="output/text"/>

    </div>
  );
}
