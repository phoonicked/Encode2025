import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

export default function LogOutputNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} id="input" />
      <Card>
        <CardHeader>
          <CardTitle>Log Output</CardTitle>
          <CardDescription>Console logs the result for debugging.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Useful for inspecting what the agent outputs.</p>
        </CardContent>
      </Card>
    </>
  );
}
