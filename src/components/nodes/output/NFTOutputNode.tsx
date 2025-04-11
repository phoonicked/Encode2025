// src/components/nodes/NFTOutputNode.tsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NFTOutputNodeData } from '@/types';

interface NFTOutputNodeProps {
  data: NFTOutputNodeData;
}

export default function NFTOutputNode({ data }: NFTOutputNodeProps) {
  return (
    <div className="w-[250px]">
      {/* Input handle on the left */}
      <Handle type="target" position={Position.Left} id="input/nft" data-nodetype="output/nft"/>
      <Card>
        <CardHeader>
          <CardTitle>NFT Output</CardTitle>
          <CardDescription>Output an NFT.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Contract address"
            className="mb-2"
            value={data.contractAddress}
            readOnly
          />
        </CardContent>
      </Card>
    </div>
  );
}
