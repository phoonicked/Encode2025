import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

export default function TextOutputNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} id="input" />
      <Card>
        <CardHeader>
          <CardTitle>Text Output</CardTitle>
          <CardDescription>Sends output in text format.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">...</p>
        </CardContent>
      </Card>
    </>
  );
}
