import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function FormInputNode() {
  return (
    <>
      <Handle type="source" position={Position.Bottom} id="output" />
      <Card>
        <CardHeader>
          <CardTitle>Form Input</CardTitle>
          <CardDescription>Capture structured form values.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input placeholder="Name" />
          <Input placeholder="Email" />
        </CardContent>
      </Card>
    </>
  );
}
