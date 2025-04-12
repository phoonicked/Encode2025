// src/components/nodes/TextOutputNode.tsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TextOutputNodeData } from '@/types';

interface TextOutputNodeProps {
  data: TextOutputNodeData;
}

export default function TextOutputNode({ data }: TextOutputNodeProps) {
  return (
    <div className="w-[250px]">
      {/* Input handle on the left */}
      <Handle type="target" position={Position.Left} id="input/text" data-type="input/text"/>
      <Card>
        <CardHeader>
          <CardTitle className='text-purple-300'>Text Output</CardTitle>
          <CardDescription className='text-purple-200'>Display text output.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
