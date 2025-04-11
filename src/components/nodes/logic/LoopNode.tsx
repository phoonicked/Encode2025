import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function LoopNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} id="input" />
      <Handle type="source" position={Position.Bottom} id="output" />
      <Card>
        <CardHeader>
          <CardTitle>Loop</CardTitle>
          <CardDescription>Iterate over a list of items.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Array expression (e.g. input.items)" />
        </CardContent>
      </Card>
    </>
  );
}
