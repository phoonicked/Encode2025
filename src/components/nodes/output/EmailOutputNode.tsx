import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function EmailOutputNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} id="input" />
      <Card>
        <CardHeader>
          <CardTitle>Email Output</CardTitle>
          <CardDescription>Send output as an email.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="recipient@example.com" />
        </CardContent>
      </Card>
    </>
  );
}
