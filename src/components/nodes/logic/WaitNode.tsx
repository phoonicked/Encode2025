import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function WaitNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} id="input" />
      <Handle type="source" position={Position.Bottom} id="output" />
      <Card>
        <CardHeader>
          <CardTitle>Wait</CardTitle>
          <CardDescription>Pause the flow for a duration.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="number" placeholder="Time in seconds" />
        </CardContent>
      </Card>
    </>
  );
}
