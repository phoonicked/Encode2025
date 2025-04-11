import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function BlockchainOutputNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} id="input" />
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Output</CardTitle>
          <CardDescription>Write data to a smart contract.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Contract address" className="mb-2" />
          <Input placeholder="Function name" />
        </CardContent>
      </Card>
    </>
  );
}
