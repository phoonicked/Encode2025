// src/components/nodes/GenericNode.tsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Button } from '@/components/ui/button'; // Adjust path if needed

interface GenericNodeProps {
  data: {
    value: string;
  };
}

export default function GenericNode({ data }: GenericNodeProps) {
  return (
    <div className="p-2 bg-white border rounded shadow">
      <Handle type="target" position={Position.Top} className="bg-gray-300" />
      <Button variant="ghost" className="w-full">
        {data.value}
      </Button>
      
      <Handle type="source" position={Position.Bottom} className="bg-gray-300" />
    </div>
  );
}
