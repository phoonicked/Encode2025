import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function FileInputNode() {
  return (
    <>
      <Handle type="source" position={Position.Bottom} id="output" />
      <Card>
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
          <CardDescription>Accept a file input (PDF, CSV, etc).</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="file" />
        </CardContent>
      </Card>
    </>
  );
}
