import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';

export default function WebhookOutputNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} id="input" />
      <Card>
        <CardHeader>
          <CardTitle>Webhook Output</CardTitle>
          <CardDescription>POST data to a webhook URL.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="https://yourapi.com/endpoint" />
        </CardContent>
      </Card>
    </>
  );
}
