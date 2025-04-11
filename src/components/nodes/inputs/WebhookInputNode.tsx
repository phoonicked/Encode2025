import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function WebhookInputNode() {
  return (
    <>
      <Handle type="source" position={Position.Bottom} id="output" />
      <Card>
        <CardHeader>
          <CardTitle>Webhook Trigger</CardTitle>
          <CardDescription>Start flow from external trigger.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="https://webhook.url" className="w-full" />
        </CardContent>
      </Card>
    </>
  );
}
