// src/components/nodes/NFTOutputNode.tsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NFTOutputNodeData } from '@/types';

interface NFTOutputNodeProps {
  data: NFTOutputNodeData;
}

export default function NFTOutputNode({ data }: NFTOutputNodeProps) {
  return (
    <div className="w-[250px]">
      {/* Input handle on the left */}
      <Handle type="target" position={Position.Left} id="input/nft" data-type="input/nft"/>
      <Card>
        <CardHeader>
          <CardTitle className='text-purple-300'>NFT Output</CardTitle>
          <CardDescription className='text-purple-200'>Output an NFT.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
