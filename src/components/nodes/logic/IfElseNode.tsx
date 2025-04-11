import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function IfElseNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} id="input" />
      <Handle type="source" position={Position.Bottom} id="true" />
      <Handle type="source" position={Position.Bottom} id="false" style={{ left: '80%' }} />
      <Card>
        <CardHeader>
          <CardTitle>If / Else</CardTitle>
          <CardDescription>Branch flow based on a condition.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="e.g. input.includes('hello')" />
        </CardContent>
      </Card>
    </>
  );
}
