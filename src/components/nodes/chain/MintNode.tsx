// src/components/nodes/MintNode.tsx
import React from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface MintNodeData {
  chain: string;
  metadata: string;
}

interface MintNodeProps {
  data: MintNodeData;
  id: string;
  updateNodeData: (id: string, updates: Partial<MintNodeData>) => void;
}

export default function MintNode({ data, id }: MintNodeProps) {
  const { updateNodeData } = useReactFlow();

  return (
    <div className="w-[250px]">
      {/* Input handle for text */}
      <Handle type="target" position={Position.Left} id="input/text" data-type="input/text" />
      <Card>
        <CardHeader>
          <CardTitle className='text-purple-300'>Mint NFT</CardTitle>
          <CardDescription className='text-purple-200'>Mint an NFT on a specific blockchain.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Chain Selection */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className='text-purple-200' htmlFor="chain">Blockchain</Label>
            <Select
              value={data.chain || ''}
              onValueChange={(value) => updateNodeData(id, { chain: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
                <SelectItem value="solana">Solana</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Metadata Input */}
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
            <Label className='text-purple-200' htmlFor="metadata">NFT Metadata</Label>
            <Textarea
              id="metadata"
              placeholder="Enter NFT metadata..."
              value={data.metadata || ''}
              onChange={(e) => updateNodeData(id, { metadata: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
      {/* Output handle for NFT */}
      <Handle type="source" position={Position.Right} id="output/nft" data-type="output/nft" />
    </div>
  );
}
