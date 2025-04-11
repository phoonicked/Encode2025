import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

export default function ChatOutputNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} id="input" />
      <Card>
        <CardHeader>
          <CardTitle>Chat Output</CardTitle>
          <CardDescription>Sends output to the in-app chat interface.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Connect any AI output here to display it in chat.</p>
        </CardContent>
      </Card>
    </>
  );
}
