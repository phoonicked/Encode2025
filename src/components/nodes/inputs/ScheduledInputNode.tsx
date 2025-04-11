import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function ScheduledInputNode() {
  return (
    <>
      <Handle type="source" position={Position.Bottom} id="output" />
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Trigger</CardTitle>
          <CardDescription>Run the agent at fixed intervals.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Cron (e.g. 0 * * * *)" className="w-full" />
        </CardContent>
      </Card>
    </>
  );
}
