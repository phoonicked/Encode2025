import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function SwitchNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} id="input" />
      <Handle type="source" position={Position.Bottom} id="case1" />
      <Handle type="source" position={Position.Bottom} id="case2" style={{ left: '80%' }} />
      <Card>
        <CardHeader>
          <CardTitle>Switch</CardTitle>
          <CardDescription>Route based on matching values.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Key to switch on (e.g. input.type)" />
        </CardContent>
      </Card>
    </>
  );
}
