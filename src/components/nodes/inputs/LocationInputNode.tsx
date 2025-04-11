import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function LocationInputNode() {
  return (
    <>
      <Handle type="source" position={Position.Bottom} id="output" />
      <Card>
        <CardHeader>
          <CardTitle>Location Input</CardTitle>
          <CardDescription>Provide or auto-detect location.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Enter coordinates or city..." className="w-full" />
        </CardContent>
      </Card>
    </>
  );
}
