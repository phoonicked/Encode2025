import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function TextInputNode() {
  return (
    <>
      <Handle type="source" position={Position.Bottom} id="output" />
      <Card>
        <CardHeader>
          <CardTitle>Text Input</CardTitle>
          <CardDescription>Static or dynamic text input.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Enter text..." className="w-full" />
        </CardContent>
      </Card>
    </>
  );
}
