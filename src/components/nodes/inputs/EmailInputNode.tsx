import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function EmailInputNode() {
  return (
    <>
      <Handle type="source" position={Position.Bottom} id="output" />
      <Card>
        <CardHeader>
          <CardTitle>Email Listener</CardTitle>
          <CardDescription>Trigger flow from incoming emails.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="agent@yourdomain.com" className="w-full" />
        </CardContent>
      </Card>
    </>
  );
}
