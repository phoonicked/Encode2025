import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function NFTOutputNode() {
  return (
    <>
      <Handle type="target" position={Position.Left} id="input" />
      <Card>
        <CardHeader>
          <CardTitle>NFT Output</CardTitle>
          <CardDescription>Output an NFT.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Contract address" className="mb-2" />
        </CardContent>
      </Card>
    </>
  );
}
