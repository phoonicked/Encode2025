import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

export default function TryCatchNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} id="input" />
      <Handle type="source" position={Position.Bottom} id="try" />
      <Handle type="source" position={Position.Bottom} id="catch" style={{ left: '80%' }} />
      <Card>
        <CardHeader>
          <CardTitle>Try / Catch</CardTitle>
          <CardDescription>Execute with fallback on error.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Connect outputs to try and catch branches.</p>
        </CardContent>
      </Card>
    </>
  );
}
